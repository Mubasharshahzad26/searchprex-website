// app/api/send-audit/route.ts
//
// The endpoint behind OFFER_HREF. Every primary CTA on this site ends here, so
// this is the most consequential route in the repo.
//
// It returned 500 in production until 25 September 2026 — {"error":"Invalid API
// key"}, an expired Supabase anon key — so every visitor who filled in the form
// got an error, and before FreeAuditClient checked res.ok they were shown
// "Audit Request Received!" while nothing was stored. No lead had ever reached
// storage, and nothing surfaced it: a lead form only fails visibly when someone
// is watching for leads that never arrive.
//
// The storage itself now lives in lib/leads-store.ts, shared with /api/leads,
// which had the same class of failure written a second time. See that file for
// why the Google Sheet is primary and Supabase is best-effort.

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
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const lead = normaliseLead(body, req.headers.get("referer") || "free-audit");

  if (!lead.email || !looksLikeEmail(lead.email)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  const result = await storeLead(lead);

  if (!result.stored) {
    // Nothing stored the lead, so say so. The client keeps what was typed and
    // the visitor can retry or email instead — both beat a lost enquiry.
    return NextResponse.json(
      { error: "We could not record your request. Please email contact@searchprex.com and it will be handled." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

/** `curl https://www.searchprex.com/api/send-audit` — presence, never values. */
export async function GET() {
  return NextResponse.json({ route: "send-audit", ...leadStoreHealth() });
}
