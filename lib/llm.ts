// lib/llm.ts
//
// One place to call a language model from, so switching providers is a config
// change rather than a rewrite.
//
// Currently Gemini, because GEMINI_API_KEY is the key that actually works.
// Anthropic is wired but disabled: the key on this project is an AgentRouter
// relay key, and AgentRouter rejects anything that isn't the Claude Code CLI
// ("unauthorized client detected" on every endpoint, including /v1/models). If
// a normal Anthropic key is added later, set LLM_PROVIDER=anthropic and this
// module needs no other change.
//
// Model note: "gemini-flash-latest" is an alias that tracks the current Flash
// release. Pinned ids like gemini-2.5-flash and gemini-2.0-flash both return
// 404 "no longer available to new users" on this key, so pinning is actively
// worse here — the alias keeps working as Google rotates releases.

import { generateWithPool } from "@/lib/gemini-pool";

const GEMINI_MODEL = "gemini-flash-latest";
const ANTHROPIC_MODEL = "claude-sonnet-4-5";

export type LlmProvider = "gemini" | "anthropic";

export function activeProvider(): LlmProvider {
  const forced = process.env.LLM_PROVIDER as LlmProvider | undefined;
  if (forced === "anthropic" && process.env.ANTHROPIC_API_KEY) return "anthropic";
  return "gemini";
}

export class LlmError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "LlmError";
  }
}

/**
 * Runs `prompt` and parses the reply as JSON.
 *
 * Both providers are asked for JSON natively rather than being trusted to
 * follow "reply in JSON" in prose — models wrap output in ``` fences often
 * enough that parsing free text is a real source of 500s.
 */
export async function generateJson<T>(prompt: string, temperature = 0.4): Promise<T> {
  const provider = activeProvider();
  const raw =
    provider === "anthropic"
      ? await callAnthropic(prompt, temperature)
      : await callGemini(prompt, temperature);

  try {
    return JSON.parse(stripFence(raw)) as T;
  } catch {
    throw new LlmError("Model did not return valid JSON.");
  }
}

/** Removes a ```json fence if the model added one anyway. */
function stripFence(text: string): string {
  const t = text.trim();
  if (!t.startsWith("```")) return t;
  return t.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
}

/**
 * Goes through the shared 30-key pool rather than a single key, so a key that
 * has spent its free daily quota is skipped instead of failing the request.
 * The pool falls back to GEMINI_API_KEY when no pool is configured, so nothing
 * here depends on the paid key still existing.
 */
async function callGemini(prompt: string, temperature: number): Promise<string> {
  try {
    return await generateWithPool(prompt, {
      model: GEMINI_MODEL,
      temperature,
      json: true,
    });
  } catch (err) {
    const message = (err as Error).message ?? "Gemini call failed.";
    const status = (err as { status?: number }).status;
    throw new LlmError(message, status ?? (/no gemini keys/i.test(message) ? 503 : undefined));
  }
}

async function callAnthropic(prompt: string, temperature: number): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new LlmError("ANTHROPIC_API_KEY is not set.", 503);

  // Honours a relay/base-url override if one is ever configured.
  const base = (process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com").replace(/\/$/, "");

  const res = await fetch(`${base}/v1/messages`, {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 4096,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new LlmError(json?.error?.message ?? `Anthropic HTTP ${res.status}`, res.status);
  }

  const text = json?.content?.[0]?.text;
  if (typeof text !== "string" || !text) throw new LlmError("Anthropic returned no content.");
  return text;
}
