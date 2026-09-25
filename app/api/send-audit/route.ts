// app/api/send-audit/route.ts
//
// The endpoint behind OFFER_HREF. Every primary CTA on this site ends here, so
// this is the most consequential route in the repo.
//
// WHAT WAS WRONG
//
// On 25 September 2026 this route returned 500 in production:
//
//     POST https://www.searchprex.com/api/send-audit
//     -> {"error":"Invalid API key"}
//
// The Supabase anon key was invalid, so the insert into `audit_requests` failed
// every time. Every visitor who filled in the form got an error, and before
// FreeAuditClient started checking res.ok they were shown "Audit Request
// Received!" while nothing was stored. No lead had ever reached storage.
//
// Nothing surfaced it because a lead form only fails in a way anyone notices
// when someone is watching for leads that never arrive.
//
// WHAT CHANGED
//
// 1. A Google Sheet is now the primary store (scripts/leads-sheet-apps-script.gs).
//    It has no API key to expire, the owner can read it without logging into a
//    dashboard, and the same script sends the alert email — so the row and the
//    notification share one dependency rather than two.
//
// 2. Supabase is a fallback, not the path. If it is configured and working the
//    lead is written there too; if it is not, that is logged and ignored.
//
// 3. THE RULE: never report success unless the lead actually landed somewhere.
//    If every store fails, this returns 500 and the visitor is told honestly.
//    A lead that is lost silently is worse than a lead that is refused loudly,
//    because the second one can be retried and the first cannot.
//
// 4. GET returns a configuration health check. The Supabase breakage was
//    invisible precisely because checking it required submitting a fake lead;
//    now `curl https://www.searchprex.com/api/send-audit` answers it. No secret
//    values are returned, only whether each one is present.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

interface LeadPayload {
  name?: string;
  email?: string;
  website?: string;
  business?: string;
  message?: string;
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
  referrer?: string;
}

/** Deliberately permissive: rejecting a real lead over a valid-but-unusual
 *  address costs far more than accepting one typo. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Write the lead into the Google Sheet.
 *
 * Apps Script answers a POST with a 302 to script.googleusercontent.com, so
 * redirects must be followed — the default for fetch, noted here because
 * turning it off would break this silently. It also answers 200 with
 * `{ok:false}` for its own errors rather than an HTTP error code, so the body
 * has to be read; res.ok alone is not enough.
 */
async function writeToSheet(lead: LeadPayload): Promise<{ ok: boolean; detail: string }> {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  const secret = process.env.LEADS_SHEET_SECRET;

  if (!url || !secret) {
    return { ok: false, detail: "LEADS_SHEET_WEBHOOK_URL or LEADS_SHEET_SECRET not set" };
  }

  try {
    // A hung Google request must not hold the visitor's form open forever.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret }),
      signal: AbortSignal.timeout(10_000),
      redirect: "follow",
    });

    const text = await res.text();
    if (!res.ok) return { ok: false, detail: `sheet HTTP ${res.status}: ${text.slice(0, 200)}` };

    try {
      const parsed = JSON.parse(text);
      if (parsed?.ok) return { ok: true, detail: `row ${parsed.row}` };
      return { ok: false, detail: `sheet refused: ${parsed?.error ?? text.slice(0, 200)}` };
    } catch {
      // HTML back usually means the deployment is set to "Anyone with a Google
      // account" and Google served a sign-in page instead of running doPost.
      return { ok: false, detail: `sheet returned non-JSON: ${text.slice(0, 200)}` };
    }
  } catch (err) {
    return { ok: false, detail: `sheet request failed: ${String(err).slice(0, 200)}` };
  }
}

/** Secondary store. Best-effort by design — it is the one that broke. */
async function writeToSupabase(lead: LeadPayload): Promise<{ ok: boolean; detail: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return { ok: false, detail: "supabase env not set" };

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    const { error } = await supabase.from("audit_requests").insert({
      name: lead.name ?? null,
      email: lead.email,
      website: lead.website ?? null,
      business: lead.business ?? null,
    });
    if (error) return { ok: false, detail: `supabase: ${error.message}` };
    return { ok: true, detail: "inserted" };
  } catch (err) {
    return { ok: false, detail: `supabase threw: ${String(err).slice(0, 200)}` };
  }
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  if (!email || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  const lead: LeadPayload = {
    name: String(body.name ?? "").trim(),
    email,
    website: String(body.website ?? "").trim(),
    business: String(body.business ?? "").trim(),
    message: String(body.message ?? "").trim(),
    source: String(body.source ?? "").trim() || req.headers.get("referer") || "",
    utmSource: String(body.utmSource ?? "").trim(),
    utmCampaign: String(body.utmCampaign ?? "").trim(),
    referrer: String(body.referrer ?? "").trim(),
  };

  // Both are attempted. The sheet decides the response; Supabase is a bonus.
  const [sheet, supabase] = await Promise.all([writeToSheet(lead), writeToSupabase(lead)]);

  if (!sheet.ok) console.error("[send-audit] sheet write failed:", sheet.detail);
  if (!supabase.ok) console.warn("[send-audit] supabase write skipped/failed:", supabase.detail);

  if (!sheet.ok && !supabase.ok) {
    // Nothing stored the lead. Say so. The client keeps what was typed and the
    // visitor can retry or email instead — both of which beat a lost enquiry.
    console.error("[send-audit] LEAD LOST — no store accepted it:", { sheet: sheet.detail, supabase: supabase.detail });
    return NextResponse.json(
      { error: "We could not record your request. Please email contact@searchprex.com and it will be handled." },
      { status: 500 }
    );
  }

  console.log("[send-audit] lead stored", { sheet: sheet.ok, supabase: supabase.ok });
  return NextResponse.json({ success: true });
}

/**
 * Configuration health check. Returns presence, never values.
 *
 * `curl https://www.searchprex.com/api/send-audit`
 */
export async function GET() {
  const sheetConfigured = Boolean(
    process.env.LEADS_SHEET_WEBHOOK_URL && process.env.LEADS_SHEET_SECRET
  );
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  return NextResponse.json({
    route: "send-audit",
    canAcceptLeads: sheetConfigured || supabaseConfigured,
    stores: {
      googleSheet: sheetConfigured ? "configured" : "NOT CONFIGURED",
      supabase: supabaseConfigured ? "configured" : "not configured",
    },
    note: sheetConfigured
      ? "Configured only means the variables are present. Submit one real lead and confirm the row appears."
      : "Set LEADS_SHEET_WEBHOOK_URL and LEADS_SHEET_SECRET — see scripts/leads-sheet-apps-script.gs.",
  });
}
