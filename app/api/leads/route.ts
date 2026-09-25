// app/api/leads/route.ts
//
// Where every tool on the site posts its captured email: /ai-search,
// /case-calculator, /intake-assistant, /ai-visibility, QuickAuditBar,
// LeadWizard, PersonaSelector and EmotionalLeadForm — eight callers.
//
// It returned 500 in production until 25 September 2026:
//
//     POST /api/leads  ->  {"error":"Server not configured"}
//
// SUPABASE_SERVICE_ROLE_KEY was never set, so every tool on the site was
// refusing leads. /api/send-audit was broken at the same time for a different
// Supabase reason, through a second, separately-written integration — which is
// the argument for the shared lib/leads-store.ts both routes now use. A store
// that breaks should break once, be fixed once, and be reported by one health
// check.
//
// The response contract is unchanged: `{ ok: true }` with 200 on success, an
// error status otherwise. All eight callers branch on res.ok.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { leadStoreHealth, looksLikeEmail, normaliseLead, storeLead } from "@/lib/leads-store";

export const dynamic = "force-dynamic";

// The Apps Script call can take over ten seconds on a cold start, and the
// platform default would kill the function mid-write — storing the lead while
// telling the visitor it failed.
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lead = normaliseLead(body, "tool-lead-form");

  if (!lead.email || !looksLikeEmail(lead.email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // `leads`, not `audit_requests`: this route's Supabase table is its own, and
  // the sheet keeps them together with the source column telling them apart.
  const result = await storeLead(lead, "leads");

  if (!result.stored) {
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

/** `curl https://www.searchprex.com/api/leads` — presence, never values. */
export async function GET() {
  return NextResponse.json({ route: "leads", ...leadStoreHealth() });
}
