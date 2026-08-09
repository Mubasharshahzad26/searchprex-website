// app/api/law-firm-keywords/route.ts
//
// Practice area × US state keyword metrics for the law firm keyword tool.
//
// There is deliberately NO estimated fallback. If credentials or account
// balance are missing the response is source:"unavailable" with every metric
// null, and the UI shows placeholders. The tool this replaced derived CPC from
// a hash of the keyword string — "cleaning service" always returned the same
// invented $5.85 — which is the opposite of the accuracy this page claims.
//
// Endpoint: dataforseo_labs/google/keyword_overview/live takes a list of
// keywords and returns keyword_info (volume, cpc, competition,
// monthly_searches), keyword_properties (keyword_difficulty) and
// search_intent_info — the exact field set a Semrush keyword overview shows.

import { NextRequest, NextResponse } from "next/server";
import {
  buildKeywordSet,
  findPracticeArea,
  US_STATES,
  type LawKeywordIntent,
  type LawKeywordResponse,
  type LawKeywordRow,
} from "@/lib/law-firm-keywords";
import { DAILY_KEYWORD_QUOTA, recordUsage, usageToday, visitorHashFor } from "@/lib/serp-cache";
import { generateJson } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const OVERVIEW_ENDPOINT =
  "https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live";

/**
 * DataForSEO expects US states as "<State>,United States". Verified with
 * scripts/verify-dataforseo.ts before this route is trusted — if state-level
 * targeting turns out to be unsupported on the account's plan, the script
 * reports it and we fall back to country level rather than shipping wrong geo.
 */
function locationNameFor(state: string): string {
  return `${state},United States`;
}

type RawItem = {
  keyword?: string;
  keyword_info?: {
    search_volume?: number | null;
    cpc?: number | null;
    competition?: number | null;
    monthly_searches?: Array<{ search_volume?: number | null }> | null;
  } | null;
  keyword_properties?: { keyword_difficulty?: number | null } | null;
  search_intent_info?: { main_intent?: string | null } | null;
};

const INTENTS: LawKeywordIntent[] = [
  "informational",
  "commercial",
  "transactional",
  "navigational",
];

function normaliseIntent(value: unknown): LawKeywordIntent | null {
  if (typeof value !== "string") return null;
  const v = value.toLowerCase();
  return INTENTS.includes(v as LawKeywordIntent) ? (v as LawKeywordIntent) : null;
}

/**
 * Oldest-first monthly volumes, at most 12 points. DataForSEO returns them
 * newest-first, which would draw the trend chart backwards.
 */
function buildTrend(
  monthly: Array<{ search_volume?: number | null }> | null | undefined
): number[] {
  if (!Array.isArray(monthly)) return [];
  return monthly
    .slice(0, 12)
    .map((m) => Number(m?.search_volume ?? 0))
    .reverse();
}

/**
 * Asks the model what page to build for each keyword.
 *
 * This is the layer Semrush doesn't have, and it's the only part of the response
 * a model is allowed to produce — it's editorial judgement, not measurement.
 * Volume, CPC and difficulty never come from here.
 *
 * Never throws: a failed enrichment leaves rows without a content angle, which
 * the UI already handles. The metrics are the product; this is the bonus.
 */
async function contentAnglesFor(
  keywords: string[],
  areaLabel: string,
  state: string
): Promise<Map<string, string>> {
  const prompt = `You are an SEO strategist for US law firms. For each keyword below, say in ONE short sentence what page or section a ${areaLabel} firm in ${state} should build to win it.

Keywords:
${keywords.map((k) => `- ${k}`).join("\n")}

Return ONLY this JSON, no fence:
{"angles":[{"keyword":"exact keyword from the list","contentAngle":"one short sentence"}]}`;

  try {
    const out = await generateJson<{ angles?: Array<{ keyword?: unknown; contentAngle?: unknown }> }>(
      prompt,
      0.3
    );
    const map = new Map<string, string>();
    for (const a of out?.angles ?? []) {
      if (typeof a?.keyword === "string" && typeof a?.contentAngle === "string") {
        map.set(a.keyword.trim().toLowerCase(), a.contentAngle.trim());
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

function emptyResponse(
  areaId: string,
  areaLabel: string,
  location: string,
  keywords: string[],
  reason: string,
  angles: Map<string, string> = new Map()
): LawKeywordResponse {
  return {
    practiceArea: areaId,
    practiceAreaLabel: areaLabel,
    location,
    source: "unavailable",
    reason,
    rows: keywords.map((keyword) => ({
      keyword,
      volume: null,
      difficulty: null,
      cpc: null,
      competition: null,
      intent: null,
      trend: [],
      contentAngle: angles.get(keyword.toLowerCase()),
    })),
    summary: { totalVolume: null, avgDifficulty: null, maxCpc: null },
    checkedAt: new Date().toISOString(),
  };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const visitor = `law:${visitorHashFor(ip)}`;

  let body: { practiceArea?: unknown; state?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const area = findPracticeArea(typeof body.practiceArea === "string" ? body.practiceArea : "");
  if (!area) {
    return NextResponse.json({ error: "Choose a practice area." }, { status: 400 });
  }

  const state = typeof body.state === "string" ? body.state.trim() : "";
  if (!US_STATES.includes(state)) {
    return NextResponse.json({ error: "Choose a US state." }, { status: 400 });
  }

  const keywords = buildKeywordSet(area, state);

  // Started, not awaited. The angles (model) and the metrics (DataForSEO) are
  // independent, so awaiting this first would make the request take as long as
  // both calls combined — roughly doubling it once live data is connected.
  const anglesPromise = contentAnglesFor(keywords, area.label, state);

  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    return NextResponse.json(
      emptyResponse(
        area.id,
        area.label,
        state,
        keywords,
        "Live search volume and CPC aren't connected yet — those come from licensed data, never from AI. The keywords and content angles below are real.",
        await anglesPromise
      )
    );
  }

  const spent = await usageToday(visitor);
  if (spent >= DAILY_KEYWORD_QUOTA) {
    return NextResponse.json(
      {
        error: `You've used today's ${DAILY_KEYWORD_QUOTA} free lookups. They reset at midnight UTC — or get a free founder-reviewed audit instead.`,
      },
      { status: 429 }
    );
  }

  try {
    const auth = Buffer.from(`${login}:${password}`).toString("base64");
    const res = await fetch(OVERVIEW_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          keywords,
          location_name: locationNameFor(state),
          language_code: "en",
        },
      ]),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`DataForSEO HTTP ${res.status}`);

    const json = await res.json();
    const task = json?.tasks?.[0];
    if (!task || task.status_code !== 20000) {
      const msg = String(task?.status_message ?? "");
      // A balance problem is the single likeliest failure on a new account, and
      // it deserves its own message rather than a generic "unavailable".
      const isBalance = /balance|payment|money|insufficient/i.test(msg);
      return NextResponse.json(
        emptyResponse(
          area.id,
          area.label,
          state,
          keywords,
          isBalance
            ? "Our data provider account needs topping up — live metrics are paused for a moment."
            : "Live search data is temporarily unavailable.",
          await anglesPromise
        )
      );
    }

    const angles = await anglesPromise;
    const items: RawItem[] = task.result?.[0]?.items ?? [];
    const byKeyword = new Map(items.map((i) => [String(i.keyword ?? "").toLowerCase(), i]));

    const rows: LawKeywordRow[] = keywords.map((keyword) => {
      const item = byKeyword.get(keyword.toLowerCase());
      const info = item?.keyword_info;
      const difficulty = item?.keyword_properties?.keyword_difficulty;

      return {
        keyword,
        volume: typeof info?.search_volume === "number" ? info.search_volume : null,
        difficulty: typeof difficulty === "number" ? Math.round(difficulty) : null,
        cpc: typeof info?.cpc === "number" ? Number(info.cpc.toFixed(2)) : null,
        competition: typeof info?.competition === "number" ? info.competition : null,
        intent: normaliseIntent(item?.search_intent_info?.main_intent),
        trend: buildTrend(info?.monthly_searches),
        contentAngle: angles.get(keyword.toLowerCase()),
      };
    });

    await recordUsage(visitor, 1);

    const volumes = rows.map((r) => r.volume).filter((v): v is number => v !== null);
    const difficulties = rows.map((r) => r.difficulty).filter((v): v is number => v !== null);
    const cpcs = rows.map((r) => r.cpc).filter((v): v is number => v !== null);

    return NextResponse.json({
      practiceArea: area.id,
      practiceAreaLabel: area.label,
      location: state,
      source: "dataforseo",
      rows,
      summary: {
        totalVolume: volumes.length ? volumes.reduce((a, b) => a + b, 0) : null,
        avgDifficulty: difficulties.length
          ? Math.round(difficulties.reduce((a, b) => a + b, 0) / difficulties.length)
          : null,
        maxCpc: cpcs.length ? Math.max(...cpcs) : null,
      },
      checkedAt: new Date().toISOString(),
    } satisfies LawKeywordResponse);
  } catch (err) {
    console.error("[law-firm-keywords]", err);
    return NextResponse.json(
      emptyResponse(
        area.id,
        area.label,
        state,
        keywords,
        "Live search data is temporarily unavailable.",
        await anglesPromise
      )
    );
  }
}
