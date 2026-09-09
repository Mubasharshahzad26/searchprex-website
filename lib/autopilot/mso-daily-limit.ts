// lib/autopilot/mso-daily-limit.ts
//
// The MSO daily publishing cap, shared with NicheSEO Pro.
//
// Both engines work the same product queue from opposite ends (Searchprex
// takes the front, NicheSEO Pro the back), and both record what they publish
// as an AutopilotPage row in the same Neon database. So the cap has to be
// counted there, not from either engine's own run stats — two engines each
// enforcing "1000 a day" locally publishes 2000 a day.
//
// The limit itself lives in `mso_cloud_config` so it can be changed once and
// take effect on both sides without a redeploy.

import { db } from '@/lib/db';

export const DEFAULT_MSO_DAILY_LIMIT = 1000;

const LIMIT_CACHE_TTL_MS = 60 * 1000;
let cachedLimit: number | null = null;
let cachedLimitAt = 0;

/**
 * The publishing day runs on Pakistan time (UTC+5) because that is the clock
 * the daily summary and the Google Sheet are reported against. A UTC day would
 * roll over at 5am PKT and split a night's output across two reports.
 */
export function getMsoCycleStart(now: Date = new Date()): Date {
  const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  return new Date(
    Date.UTC(pkt.getUTCFullYear(), pkt.getUTCMonth(), pkt.getUTCDate(), 0, 0, 0) -
      5 * 60 * 60 * 1000
  );
}

export function getMsoCycleLabel(now: Date = new Date()): string {
  const pkt = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  return `${pkt.getUTCMonth() + 1}/${pkt.getUTCDate()}/${pkt.getUTCFullYear()}`;
}

export async function getMsoDailyLimit(forceRefresh = false): Promise<number> {
  const envLimit = Number(process.env.MSO_DAILY_LIMIT);
  if (Number.isFinite(envLimit) && envLimit > 0) return envLimit;

  const now = Date.now();
  if (!forceRefresh && cachedLimit !== null && now - cachedLimitAt < LIMIT_CACHE_TTL_MS) {
    return cachedLimit;
  }

  try {
    const rows = await db.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM mso_cloud_config WHERE key = 'mso_daily_limit'
    `;
    const parsed = Number(rows?.[0]?.value);
    if (Number.isFinite(parsed) && parsed > 0) {
      cachedLimit = parsed;
      cachedLimitAt = now;
      return parsed;
    }
  } catch (err) {
    console.warn('[mso-limit] Could not read the shared limit:', (err as Error).message);
  }

  return cachedLimit ?? DEFAULT_MSO_DAILY_LIMIT;
}

export async function setMsoDailyLimit(limit: number): Promise<number> {
  const valid = Math.max(1, Math.min(5000, Math.round(limit)));
  await db.$executeRaw`
    INSERT INTO mso_cloud_config (key, value)
    VALUES ('mso_daily_limit', ${String(valid)})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
  cachedLimit = valid;
  cachedLimitAt = Date.now();
  return valid;
}

/** Product pages published today by either engine. */
export async function getMsoPublishedToday(now: Date = new Date()): Promise<number> {
  return db.autopilotPage.count({
    where: {
      status: 'published',
      publishedAt: { gte: getMsoCycleStart(now) },
      pageUrl: { contains: '/product/' },
    },
  });
}

export interface MsoQuota {
  limit: number;
  publishedToday: number;
  remainingToday: number;
  limitReached: boolean;
  cycleDateLabel: string;
  cycleStartUtc: string;
}

export async function getMsoQuota(now: Date = new Date()): Promise<MsoQuota> {
  const [limit, publishedToday] = await Promise.all([
    getMsoDailyLimit(),
    getMsoPublishedToday(now),
  ]);

  return {
    limit,
    publishedToday,
    remainingToday: Math.max(0, limit - publishedToday),
    limitReached: publishedToday >= limit,
    cycleDateLabel: getMsoCycleLabel(now),
    cycleStartUtc: getMsoCycleStart(now).toISOString(),
  };
}
