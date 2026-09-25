// app/api/reality-check/route.ts
//
// The "Get a reality check" modal on /services/ecommerce-seo posts here
// (app/services/ecommerce-seo/EcommerceSEOClient.tsx). This route did not
// exist. A POST to a missing API path in the App Router falls through to the
// page tree and comes back as HTML, so `res.ok` was true and the modal showed
// "sent" — a form that congratulated the visitor and threw the lead away, the
// same failure /api/send-audit had before it was fixed.
//
// Found on 25 September 2026 while auditing every endpoint a form posts to,
// after two separate lead routes turned out to be returning 500 in production.
//
// It collects name, email, website and phone. Storage is lib/leads-store.ts,
// shared with /api/send-audit and /api/leads.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { leadStoreHealth, looksLikeEmail, normaliseLead, storeLead } from "@/lib/leads-store";

export const dynamic = "force-dynamic";

// The store does up to four sequential round-trips to Apps Script (write,
// confirm, write, confirm) totalling about 33 seconds in the worst case. At 30
// the final confirmation was cut off every time — which is the one step that
// catches a row Google wrote without answering.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lead = normaliseLead(body, "reality-check");

  if (!lead.email || !looksLikeEmail(lead.email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const result = await storeLead(lead, "leads");

  if (!result.stored) {
    return NextResponse.json({ error: "Could not save your request" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

/** `curl https://www.searchprex.com/api/reality-check` — presence, never values. */
export async function GET() {
  return NextResponse.json({ route: "reality-check", ...leadStoreHealth() });
}
