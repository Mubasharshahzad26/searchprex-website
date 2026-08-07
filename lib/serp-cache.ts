// lib/serp-cache.ts
//
// Cost control for the free, public SERP Checker.
//
// Two problems this solves:
//
//   1. DataForSEO bills per keyword. The endpoint is public and
//      unauthenticated, and one request fans out to up to MAX_KEYWORDS live
//      calls. Most of that traffic is repeat queries — "personal injury lawyer
//      detroit" returns the same SERP for everyone who asks within the hour —
//      so caching collapses spend without changing what a visitor sees.
//
//   2. The route's original limiter was a module-level Map. On Vercel each
//      lambda instance holds its own copy and instances churn constantly, so
//      the per-IP limit was effectively unenforced in production. The quota
//      here lives in Postgres and survives across instances.
//
// Cache hits deliberately do NOT consume quota: they cost nothing, so charging
// a visitor for them would only make the tool feel broken.

import { createHash } from "crypto";
import { db } from "@/lib/db";
import type { SerpKeywordResult } from "@/lib/serp-types";

/** How long a cached SERP stays fresh. Rankings don't move meaningfully faster. */
export const CACHE_TTL_HOURS = 24;

/** Live DataForSEO calls one visitor may trigger per UTC day. */
export const DAILY_KEYWORD_QUOTA = 15;

/**
 * Salted SHA-256 of the caller's IP. The raw address is personal data and there
 * is no product reason to store it — we only need to recognise a repeat caller
 * within a day. Falls back to a constant salt so a missing env var degrades to
 * "quota still enforced" rather than "quota disabled".
 */
export function visitorHashFor(ip: string): string {
  const salt = process.env.CRON_SECRET ?? "searchprex-serp-quota";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/** Normalised cache key. Keyword casing and spacing must not fragment the cache. */
export function cacheKeyFor(keyword: string, location: string): string {
  return `${keyword.trim().toLowerCase().replace(/\s+/g, " ")}|${location.toLowerCase()}|desktop`;
}

function utcDay(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Cached result for this keyword+location, or null when absent or stale. */
export async function readCache(
  keyword: string,
  location: string
): Promise<SerpKeywordResult | null> {
  try {
    const row = await db.serpCache.findUnique({ where: { cacheKey: cacheKeyFor(keyword, location) } });
    if (!row || row.expiresAt < new Date()) return null;

    // Fire-and-forget: a failed counter must never fail the request.
    db.serpCache
      .update({ where: { id: row.id }, data: { hits: { increment: 1 } } })
      .catch(() => {});

    return row.payload as unknown as SerpKeywordResult;
  } catch {
    // A cache that is down must degrade to "miss", never to an error page.
    return null;
  }
}

/** Stores a freshly fetched result. Never throws. */
export async function writeCache(
  keyword: string,
  location: string,
  payload: SerpKeywordResult
): Promise<void> {
  const key = cacheKeyFor(keyword, location);
  const expiresAt = new Date(Date.now() + CACHE_TTL_HOURS * 60 * 60 * 1000);
  try {
    await db.serpCache.upsert({
      where: { cacheKey: key },
      create: { cacheKey: key, keyword, location, payload: payload as never, expiresAt },
      update: { payload: payload as never, expiresAt, createdAt: new Date() },
    });
  } catch {
    /* caching is an optimisation — losing a write is not an error */
  }
}

/** Live calls this visitor has already spent today. */
export async function usageToday(visitorHash: string): Promise<number> {
  try {
    const row = await db.serpUsage.findUnique({
      where: { visitorHash_day: { visitorHash, day: utcDay() } },
    });
    return row?.count ?? 0;
  } catch {
    // If the quota store is unreachable we cannot prove the caller is over
    // budget. Report 0 so the tool keeps working; the DataForSEO account-level
    // spending cap is the backstop.
    return 0;
  }
}

/** Records `amount` live calls against this visitor's daily quota. */
export async function recordUsage(visitorHash: string, amount: number): Promise<void> {
  if (amount <= 0) return;
  const day = utcDay();
  try {
    await db.serpUsage.upsert({
      where: { visitorHash_day: { visitorHash, day } },
      create: { visitorHash, day, count: amount },
      update: { count: { increment: amount } },
    });
  } catch {
    /* non-fatal */
  }
}

/** Drops expired rows. Safe to call from a cron route. */
export async function pruneExpired(): Promise<number> {
  try {
    const { count } = await db.serpCache.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    return count;
  } catch {
    return 0;
  }
}
