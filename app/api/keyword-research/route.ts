// app/api/keyword-research/route.ts
//
// AI keyword research for the free tool. Returns keyword ideas grouped into
// topic clusters, each with a search intent and a content angle.
//
// It returns no search volume, CPC or difficulty on purpose. A language model
// does not know those numbers and would produce plausible-looking fiction —
// the same failure the SERP Checker shipped with. Real metrics require a data
// provider; see lib/keyword-research-types.ts.

import { NextRequest, NextResponse } from "next/server";
import { generateJson, activeProvider, LlmError } from "@/lib/llm";
import {
  CLUSTER_TARGET,
  KEYWORDS_PER_CLUSTER,
  MAX_SEED_LENGTH,
  type KeywordCluster,
  type KeywordIntent,
  type KeywordResearchResponse,
} from "@/lib/keyword-research-types";
import { DAILY_KEYWORD_QUOTA, recordUsage, usageToday, visitorHashFor } from "@/lib/serp-cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const VALID_INTENTS: KeywordIntent[] = [
  "informational",
  "commercial",
  "transactional",
  "navigational",
];

function buildPrompt(seed: string, location: string): string {
  return `You are a senior SEO strategist. Produce keyword research for the seed term "${seed}" targeting ${location}.

Return exactly ${CLUSTER_TARGET} topic clusters. Each cluster has ${KEYWORDS_PER_CLUSTER} keywords.

Rules:
- Favour realistic long-tail phrases people actually type, not single broad words.
- Include location-modified variants where they make commercial sense.
- "intent" must be exactly one of: informational, commercial, transactional, navigational.
- "rationale" is ONE short sentence on why the keyword is worth targeting.
- "contentAngle" is the specific page or section to build for it.
- Never invent search volumes, CPC, difficulty scores or any numeric metric.

Return ONLY this JSON shape, with no commentary and no markdown fence:
{
  "clusters": [
    {
      "name": "short topic name",
      "summary": "one sentence on who searches this cluster and what they want",
      "keywords": [
        {
          "keyword": "the search phrase",
          "intent": "informational",
          "rationale": "one short sentence",
          "contentAngle": "the page to build"
        }
      ]
    }
  ]
}`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  // Namespaced so this tool's quota is tracked separately from the SERP
  // Checker's while reusing the same durable counter.
  const visitor = `kw:${visitorHashFor(ip)}`;

  let body: { seed?: unknown; location?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const seed = typeof body.seed === "string" ? body.seed.trim().replace(/\s+/g, " ") : "";
  if (!seed) {
    return NextResponse.json(
      { error: "Enter a keyword or topic to research." },
      { status: 400 }
    );
  }
  if (seed.length > MAX_SEED_LENGTH) {
    return NextResponse.json(
      { error: `Keep it under ${MAX_SEED_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const location =
    typeof body.location === "string" && body.location.trim()
      ? body.location.trim().slice(0, 60)
      : "United States";

  const spent = await usageToday(visitor);
  if (spent >= DAILY_KEYWORD_QUOTA) {
    return NextResponse.json(
      {
        error: `You've used today's ${DAILY_KEYWORD_QUOTA} free searches. They reset at midnight UTC — or get a free founder-reviewed audit instead.`,
      },
      { status: 429 }
    );
  }

  try {
    const raw = await generateJson<{ clusters?: unknown }>(buildPrompt(seed, location));
    const clusters = sanitiseClusters(raw?.clusters);

    if (clusters.length === 0) {
      return NextResponse.json(
        { error: "Couldn't generate ideas for that term. Try a broader one." },
        { status: 502 }
      );
    }

    await recordUsage(visitor, 1);

    return NextResponse.json({
      seed,
      location,
      provider: activeProvider(),
      clusters,
      generatedAt: new Date().toISOString(),
    } satisfies KeywordResearchResponse);
  } catch (err) {
    // Never surface a provider error verbatim — it can carry key fragments,
    // model ids and internal endpoints.
    const status = err instanceof LlmError && err.status === 503 ? 503 : 502;
    console.error("[keyword-research]", err);
    return NextResponse.json(
      { error: "The research service is unavailable right now. Please try again shortly." },
      { status }
    );
  }
}

/**
 * Trusts nothing the model returned. A generative response is untrusted input:
 * fields can be missing, intents can be invented, and arrays can be the wrong
 * shape — all of which would otherwise reach the UI as undefined.
 */
function sanitiseClusters(input: unknown): KeywordCluster[] {
  if (!Array.isArray(input)) return [];

  return input
    .slice(0, CLUSTER_TARGET)
    .map((c): KeywordCluster | null => {
      if (!c || typeof c !== "object") return null;
      const cluster = c as Record<string, unknown>;

      const name = typeof cluster.name === "string" ? cluster.name.trim() : "";
      if (!name) return null;

      const keywords = Array.isArray(cluster.keywords)
        ? cluster.keywords
            .slice(0, KEYWORDS_PER_CLUSTER)
            .map((k) => {
              if (!k || typeof k !== "object") return null;
              const kw = k as Record<string, unknown>;
              const keyword = typeof kw.keyword === "string" ? kw.keyword.trim() : "";
              if (!keyword) return null;

              const intent = VALID_INTENTS.includes(kw.intent as KeywordIntent)
                ? (kw.intent as KeywordIntent)
                : "informational";

              return {
                keyword,
                intent,
                rationale: typeof kw.rationale === "string" ? kw.rationale.trim() : "",
                contentAngle: typeof kw.contentAngle === "string" ? kw.contentAngle.trim() : "",
              };
            })
            .filter((k): k is NonNullable<typeof k> => k !== null)
        : [];

      if (keywords.length === 0) return null;

      return {
        name,
        summary: typeof cluster.summary === "string" ? cluster.summary.trim() : "",
        keywords,
      };
    })
    .filter((c): c is KeywordCluster => c !== null);
}
