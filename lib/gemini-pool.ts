// lib/gemini-pool.ts
//
// 30-key Gemini rotation pool — the free-tier replacement for the single
// paid GEMINI_API_KEY that every generator on this project used to share.
//
// Why a pool at all: one free key is ~200-1000 requests/day depending on the
// model, which is nowhere near a 1,000-page/day autopilot. Thirty free keys
// are, but only if a key that hits its daily quota is taken out of rotation
// instead of being retried — otherwise the first exhausted key fails the run
// while twenty-nine good keys sit idle.
//
// Key source, in order: GEMINI_API_KEYS (comma-separated) -> the shared Neon
// `mso_cloud_config` row -> the legacy single GEMINI_API_KEY. Neon is the same
// database NicheSEO Pro reads, so both engines rotate the same 30 keys and
// adding a key in one place covers both.
//
// This deliberately calls the REST endpoint rather than @google/generative-ai:
// the SDK binds a key at construction time, and the whole point here is
// choosing the key per request.

import { db } from '@/lib/db';

const DEFAULT_MODEL = 'gemini-flash-lite-latest';
const FALLBACK_MODEL = 'gemini-flash-latest';
const KEYS_CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 120_000;

let cachedKeys: string[] = [];
let cachedKeysAt = 0;
let currentIndex = 0;

/** key -> epoch ms until which it must not be used */
const blockedUntil = new Map<string, number>();

function parseKeyList(raw: string | undefined | null): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 5);
}

function maskKey(key: string): string {
  return key.length <= 12 ? key : `${key.slice(0, 8)}...${key.slice(-4)}`;
}

/**
 * Google's free-tier daily quota resets at midnight Pacific, not at midnight
 * local or UTC. Blocking an exhausted key until then is the difference between
 * retiring it for a few hours and retiring it for a day and a half.
 */
function nextPacificMidnight(): number {
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(7, 0, 0, 0);
  if (next <= now) next.setUTCDate(next.getUTCDate() + 1);
  return next.getTime();
}

export async function loadGeminiKeys(forceRefresh = false): Promise<string[]> {
  const envKeys = parseKeyList(process.env.GEMINI_API_KEYS);
  if (envKeys.length > 0) return envKeys;

  const now = Date.now();
  if (!forceRefresh && cachedKeys.length > 0 && now - cachedKeysAt < KEYS_CACHE_TTL_MS) {
    return cachedKeys;
  }

  try {
    const rows = await db.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM mso_cloud_config WHERE key = 'gemini_api_keys'
    `;
    const keys = parseKeyList(rows?.[0]?.value);
    if (keys.length > 0) {
      cachedKeys = keys;
      cachedKeysAt = now;
      console.log(`[gemini-pool] Loaded ${keys.length} keys from the shared Neon pool.`);
      return cachedKeys;
    }
  } catch (err) {
    console.warn('[gemini-pool] Neon key lookup failed:', (err as Error).message);
  }

  if (cachedKeys.length > 0) return cachedKeys;

  const single = parseKeyList(process.env.GEMINI_API_KEY);
  if (single.length > 0) {
    console.warn('[gemini-pool] Falling back to the single GEMINI_API_KEY — no pool available.');
    return single;
  }

  return [];
}

function isBlocked(key: string): boolean {
  return (blockedUntil.get(key) ?? 0) > Date.now();
}

export function markExhausted(key: string, reason = 'daily quota') {
  const until = nextPacificMidnight();
  blockedUntil.set(key, until);
  console.warn(
    `[gemini-pool] ${maskKey(key)} out until Pacific midnight (${new Date(until).toISOString()}) — ${reason}.`
  );
}

export function markRateLimited(key: string, waitMs = 15_000) {
  blockedUntil.set(key, Date.now() + waitMs);
}

/**
 * Round-robin over the keys that are not blocked. When every key is blocked the
 * caller still gets one — the one whose block expires soonest — because failing
 * with "no key available" is strictly worse than one more 429.
 */
function pickKey(keys: string[]): string {
  for (let i = 0; i < keys.length; i++) {
    const idx = (currentIndex + i) % keys.length;
    if (!isBlocked(keys[idx])) {
      currentIndex = (idx + 1) % keys.length;
      return keys[idx];
    }
  }

  let best = keys[0];
  let soonest = Infinity;
  for (const k of keys) {
    const exp = blockedUntil.get(k) ?? 0;
    if (exp < soonest) {
      soonest = exp;
      best = k;
    }
  }
  currentIndex = (currentIndex + 1) % keys.length;
  return best;
}

/**
 * A 429 carrying a retryDelay is a per-minute rate limit and the key is fine in
 * a moment. A 429 without one is the daily quota, and retrying that key today
 * is wasted work. Telling them apart is what keeps 30 keys from being retired
 * within the first hour of a run.
 */
function classify429(detail: string): { daily: boolean; retryAfterMs: number } {
  const retryStr = detail.match(/"retryDelay"\s*:\s*"(\d+(?:\.\d+)?)s"/)?.[1];
  const retryAfterMs = retryStr ? Math.ceil(Number(retryStr) * 1000) : 0;
  if (retryAfterMs > 0) return { daily: false, retryAfterMs };

  const quotaId = detail.match(/"quotaId"\s*:\s*"([^"]+)"/)?.[1] ?? '';
  if (quotaId) return { daily: /per_?day|daily/i.test(quotaId), retryAfterMs: 0 };

  return {
    daily: /per\s*day|daily limit|prepayment credits are depleted/i.test(detail),
    retryAfterMs: 0,
  };
}

export interface RotatingOptions {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  json?: boolean;
}

async function callOnce(
  prompt: string,
  key: string,
  model: string,
  opts: RotatingOptions
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: controller.signal,
        cache: 'no-store',
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: opts.temperature ?? 0.7,
            maxOutputTokens: opts.maxOutputTokens ?? 4096,
            ...(opts.json === false ? {} : { responseMimeType: 'application/json' }),
          },
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      const err = new Error(`Gemini HTTP ${res.status}: ${detail.slice(0, 300)}`) as Error & {
        status: number;
        detail: string;
      };
      err.status = res.status;
      err.detail = detail;
      throw err;
    }

    const json: any = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== 'string' || !text) throw new Error('Gemini returned no content.');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

/** Runs `prompt`, rotating to another key on quota or rate-limit failures. */
export async function generateWithPool(
  prompt: string,
  opts: RotatingOptions = {}
): Promise<string> {
  const keys = await loadGeminiKeys();
  if (keys.length === 0) {
    throw new Error('No Gemini keys configured (GEMINI_API_KEYS, Neon pool, or GEMINI_API_KEY).');
  }

  let model = opts.model ?? DEFAULT_MODEL;
  const maxAttempts = Math.min(Math.max(keys.length, 4), 12);
  let lastErr: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const key = pickKey(keys);

    try {
      return await callOnce(prompt, key, model, opts);
    } catch (err) {
      lastErr = err as Error;
      const status = (err as any).status as number | undefined;
      const detail = ((err as any).detail as string) ?? '';

      if (status === 429) {
        const { daily, retryAfterMs } = classify429(detail);
        if (daily) {
          markExhausted(key, 'daily quota');
        } else {
          markRateLimited(key, retryAfterMs || 10_000);
          // Only sleep when there is genuinely nowhere else to go. With a
          // healthy pool the next key is available immediately.
          if (!keys.some((k) => !isBlocked(k))) {
            await new Promise((r) => setTimeout(r, 10_000));
          }
        }
        continue;
      }

      // A retired model id fails on every key, so switching keys is pointless —
      // switch the model instead, once.
      if (status === 404 && model !== FALLBACK_MODEL) {
        console.warn(`[gemini-pool] ${model} returned 404; falling back to ${FALLBACK_MODEL}.`);
        model = FALLBACK_MODEL;
        continue;
      }

      if (status && ![500, 502, 503, 504].includes(status)) throw err;

      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, Math.min(attempt * 1000, 5000)));
      }
    }
  }

  throw lastErr ?? new Error('Gemini call failed across the whole key pool.');
}

/**
 * Drop-in stand-in for `new GoogleGenerativeAI(key).getGenerativeModel(...)`.
 * The response shape matches the SDK's so existing call sites — which do
 * `result.response.text()` — need no change beyond swapping the constructor.
 */
export function getPooledModel(
  config: {
    model?: string;
    generationConfig?: {
      temperature?: number;
      maxOutputTokens?: number;
      responseMimeType?: string;
    };
  } = {}
) {
  const opts: RotatingOptions = {
    model: config.model,
    temperature: config.generationConfig?.temperature,
    maxOutputTokens: config.generationConfig?.maxOutputTokens,
    json: config.generationConfig?.responseMimeType !== 'text/plain',
  };

  return {
    async generateContent(prompt: string) {
      const text = await generateWithPool(prompt, opts);
      return { response: { text: () => text } };
    },
  };
}

/**
 * Shaped like a `GoogleGenerativeAI` instance so a call site only has to swap
 * its constructor — `gemini.getGenerativeModel({...})` keeps working.
 */
export const geminiPool = { getGenerativeModel: getPooledModel };

/**
 * Whether a key source is configured at all, without touching the network.
 * Used by the guards that bail out early rather than start work they cannot
 * finish. It reports true once the Neon pool has been loaded in this process,
 * so on a cold start set GEMINI_API_KEYS (or leave GEMINI_API_KEY in place)
 * for those paths.
 */
export function hasGeminiKeySource(): boolean {
  return (
    parseKeyList(process.env.GEMINI_API_KEYS).length > 0 ||
    cachedKeys.length > 0 ||
    parseKeyList(process.env.GEMINI_API_KEY).length > 0
  );
}

export async function getPoolStatus() {
  const keys = await loadGeminiKeys(true);
  const now = Date.now();

  const detail = keys.map((k) => {
    const exp = blockedUntil.get(k) ?? 0;
    if (exp <= now) return { key: maskKey(k), status: 'active' as const, resetsInSec: 0 };
    const resetsInSec = Math.ceil((exp - now) / 1000);
    return {
      key: maskKey(k),
      status: resetsInSec > 3600 ? ('exhausted' as const) : ('rate_limited' as const),
      resetsInSec,
    };
  });

  return {
    totalKeys: keys.length,
    activeKeys: detail.filter((d) => d.status === 'active').length,
    rateLimitedKeys: detail.filter((d) => d.status === 'rate_limited').length,
    exhaustedKeys: detail.filter((d) => d.status === 'exhausted').length,
    source: process.env.GEMINI_API_KEYS ? 'env' : 'neon',
    keys: detail,
  };
}
