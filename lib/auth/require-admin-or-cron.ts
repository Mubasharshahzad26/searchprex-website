// lib/auth/require-admin-or-cron.ts
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { requireAdmin } from "@/lib/auth/require-admin";

/**
 * Constant-time check for `Authorization: Bearer <CRON_SECRET>`.
 * Returns false whenever CRON_SECRET is unset/empty so `Bearer undefined`
 * can never match.
 */
export function isCronAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;

  const header = req.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) return false;

  const provided = header.slice("Bearer ".length).trim();
  if (!provided) return false;

  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(secret, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Guard for internal/admin API routes that may be called either by:
 *   1. Automated cron/server jobs presenting `Authorization: Bearer <CRON_SECRET>`, or
 *   2. An authenticated admin browser session (`requireAdmin()`).
 *
 * Returns `null` when authorized, or a `401 NextResponse` otherwise.
 */
export async function requireAdminOrCron(req: Request): Promise<NextResponse | null> {
  if (isCronAuthorized(req)) {
    return null;
  }

  try {
    await requireAdmin();
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
