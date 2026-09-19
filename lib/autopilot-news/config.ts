// lib/autopilot-news/config.ts
//
// Shared by server code and the admin client, so nothing here may import db or
// any other server-only module.

/**
 * News older than this is not "breaking" any more. The hub once shipped a
 * "core update rolling out" card months after the rollout had finished, so the
 * cron refuses anything past this age and a manual publish needs an explicit
 * sign-off.
 */
export const MAX_NEWS_AGE_HOURS = 72;

export const MAX_SLUG_LENGTH = 80;

export function sanitizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/^-+|-+$/g, "");
}

export function hoursSince(iso: string | Date | null | undefined, now = new Date()): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return (now.getTime() - t) / 36e5;
}
