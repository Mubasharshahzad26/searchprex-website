// lib/sdr/guard.ts
//
// Admin check for the /api/sdr route handlers.
//
// middleware.ts only matches /admin, /content-admin, /dashboard and the auth
// pages, so these API routes were reachable by anyone: /api/sdr/trigger-cron
// ran the lead processor with the server's own CRON_SECRET, /api/sdr/outreach
// sent email for any lead id, and /api/sdr/hunter spent search-API credit.
// Each handler now calls this first.

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

/** Returns a 401 response for non-admins, or null when the caller may proceed. */
export async function sdrAdminGuard(): Promise<NextResponse | null> {
  try {
    await requireAdmin();
    return null;
  } catch {
    return NextResponse.json({ error: "Admin sign-in required." }, { status: 401 });
  }
}
