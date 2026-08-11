// lib/serp-cache.ts
//
// Durable per-visitor quota for the free, public keyword and SERP tools.
//
// The limiter this replaced was a module-level Map. On Vercel each lambda
// instance holds its own copy and instances churn constantly, so a per-IP limit
// held in memory is effectively unenforced in production — which matters on an
// endpoint anyone can call that costs money per request.
//
// The SERP result cache that used to live here has been removed. It wrote to a
// SerpCache table that no longer exists in either prisma/schema.prisma or the
// database, so every call could only throw. When the SERP Checker ships with
// live DataForSEO credentials the cache should come back — caching is what makes
// a paid API affordable on a free public page — but dead code referencing a
// dropped table is worse than no code.

import { createHash } from "crypto";
import { db } from "@/lib/db";

/** Live provider calls one visitor may trigger per UTC day. */
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

function utcDay(): string {
  return new Date().toISOString().slice(0, 10);
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
    // budget. Report 0 so the tool keeps working; the provider's own account
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
