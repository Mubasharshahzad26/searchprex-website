// lib/leads-store.ts
//
// One place that knows how to store a lead, used by every route that captures
// one.
//
// WHY IT IS SHARED
//
// On 25 September 2026 both lead routes were dead in production and neither
// failure was visible:
//
//     POST /api/send-audit  ->  {"error":"Invalid API key"}       (Supabase anon key)
//     POST /api/leads       ->  {"error":"Server not configured"}  (no service-role key)
//
// /api/send-audit is where every primary CTA points. /api/leads is where every
// tool on the site posts — /ai-search, /case-calculator, /intake-assistant,
// /ai-visibility, QuickAuditBar, LeadWizard, PersonaSelector and
// EmotionalLeadForm, eight callers in all. So every route that could capture a
// lead was refusing them, through two separately-written Supabase integrations
// that had to be fixed, and in future watched, one at a time.
//
// They share one implementation now. A store that breaks breaks once, is fixed
// once, and is reported by one health check.
//
// THE RULE
//
// Never report success unless the lead actually landed somewhere. A lead lost
// silently cannot be retried; one refused loudly can. `storeLead` returns what
// happened and lets the route decide the status code — but the intended use is
// to 500 when `stored` is false.

export interface Lead {
  email: string;
  name?: string;
  website?: string;
  /** Law firm owners leave a number far more often than they write a message. */
  phone?: string;
  /** Business type, practice area or industry — whatever the form collected. */
  business?: string;
  /** Free text the visitor wrote. The most valuable field when it is filled. */
  message?: string;
  /** Which form or tool this came from, e.g. "homepage-hero", "case-calculator". */
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
  referrer?: string;
}

export interface StoreResult {
  /** True when at least one store accepted the lead. */
  stored: boolean;
  sheet: { ok: boolean; detail: string };
  supabase: { ok: boolean; detail: string };
}

/** Permissive by design: rejecting a real lead over an unusual-but-valid
 *  address costs far more than accepting one typo. */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Google Sheet, via the Apps Script web app in
 * scripts/leads-sheet-apps-script.gs. Primary store: no API key to expire, and
 * the owner reads it without a dashboard login.
 *
 * Two behaviours worth knowing. Apps Script answers a POST with a 302 to
 * script.googleusercontent.com, so redirects must be followed — the fetch
 * default, noted because turning it off breaks this silently. And it answers
 * 200 with `{ok:false}` for its own errors rather than an HTTP error code, so
 * the body must be read; res.ok alone is not enough.
 */
async function postToSheet(
  url: string,
  secret: string,
  lead: Lead,
  requestId: string,
  timeoutMs: number
): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, requestId, secret }),
      signal: AbortSignal.timeout(timeoutMs),
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
      // account", so Google served a sign-in page instead of running doPost.
      return { ok: false, detail: `sheet returned non-JSON: ${text.slice(0, 200)}` };
    }
  } catch (err) {
    return { ok: false, detail: `sheet request failed: ${String(err).slice(0, 200)}` };
  }
}

/**
 * Write to the sheet, and find out what actually happened when that fails.
 *
 * The failure this is built around is not "the write failed" — it is "the write
 * succeeded and the response never arrived". Google runs doPost, appends the
 * row, and returns nothing. Observed repeatedly on production, most recently on
 * a real submission from the live homepage: the visitor saw an error, the row
 * was in the sheet.
 *
 * So after a failed attempt the next move is to ASK, not to retry blindly:
 *
 *   1. write          short, mostly to wake a cold container
 *   2. confirm        did it land anyway? catches the common case, cheaply
 *   3. write again    only if it genuinely did not land
 *   4. confirm again  same question, last chance
 *
 * The shared requestId makes every step safe: doPost caches it, so a second
 * write after a first that secretly succeeded returns the existing row instead
 * of appending, and confirm reads that same cache entry.
 *
 * The budget matters, and getting it wrong is what let the live submission fail.
 * The steps have to fit inside the route's maxDuration or the last one never
 * runs: 9 + 18 + 12 against a 30s limit meant the confirmation — the one check
 * that would have found the row — was cut off every single time. It is
 * 9 + 6 + 12 + 6 = 33s against 60 now, with room for the requests themselves.
 */
async function writeToSheet(lead: Lead): Promise<{ ok: boolean; detail: string }> {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  const secret = process.env.LEADS_SHEET_SECRET;

  if (!url || !secret) {
    return { ok: false, detail: "LEADS_SHEET_WEBHOOK_URL or LEADS_SHEET_SECRET not set" };
  }

  const requestId = crypto.randomUUID();
  const notes: string[] = [];

  const first = await postToSheet(url, secret, lead, requestId, 9_000);
  if (first.ok) return first;
  notes.push(`write 1: ${first.detail}`);

  const afterFirst = await confirmWrite(url, requestId, 6_000);
  if (afterFirst.ok) {
    console.log("[leads] write 1 reported failure but the row is present:", afterFirst.detail);
    return { ok: true, detail: `${afterFirst.detail} (confirmed after write 1)` };
  }
  notes.push(`confirm 1: ${afterFirst.detail}`);

  const second = await postToSheet(url, secret, lead, requestId, 12_000);
  if (second.ok) return { ok: true, detail: `${second.detail} (on retry)` };
  notes.push(`write 2: ${second.detail}`);

  const afterSecond = await confirmWrite(url, requestId, 6_000);
  if (afterSecond.ok) {
    console.log("[leads] both writes reported failure but the row is present:", afterSecond.detail);
    return { ok: true, detail: `${afterSecond.detail} (confirmed after write 2)` };
  }
  notes.push(`confirm 2: ${afterSecond.detail}`);

  return { ok: false, detail: notes.join(" | ") };
}

/**
 * Ask the script whether a given requestId was written.
 *
 * Only meaningful against script v4 or later; an older deployment ignores the
 * parameter and returns its health payload, which carries no `found` field and
 * is therefore correctly read as "not confirmed".
 */
async function confirmWrite(
  url: string,
  requestId: string,
  timeoutMs: number
): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(`${url}?requestId=${encodeURIComponent(requestId)}`, {
      method: "GET",
      signal: AbortSignal.timeout(timeoutMs),
      redirect: "follow",
      cache: "no-store",
    });
    const text = await res.text();
    if (!text.trim().startsWith("{")) return { ok: false, detail: "non-JSON response" };

    const parsed = JSON.parse(text);
    if (parsed?.found) return { ok: true, detail: `row ${parsed.row}` };
    if (parsed?.found === false) return { ok: false, detail: "row not found" };
    return { ok: false, detail: "script too old to answer" };
  } catch (err) {
    return { ok: false, detail: `confirm failed: ${String(err).slice(0, 100)}` };
  }
}
/**
 * Supabase. Secondary and best-effort by design: it is the store that broke,
 * and nothing should depend on it again until someone has proven it works.
 */
async function writeToSupabase(lead: Lead, table: string): Promise<{ ok: boolean; detail: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return { ok: false, detail: "supabase env not set" };

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    const { error } = await supabase.from(table).insert({
      name: lead.name || null,
      email: lead.email,
      website: lead.website || null,
      business: lead.business || null,
    });
    if (error) return { ok: false, detail: `supabase: ${error.message}` };
    return { ok: true, detail: "inserted" };
  } catch (err) {
    return { ok: false, detail: `supabase threw: ${String(err).slice(0, 200)}` };
  }
}

/**
 * Store a lead everywhere available. Both are attempted; the sheet is the one
 * that matters. Logging is deliberately loud on failure — the previous
 * breakage survived because nothing said anything.
 */
export async function storeLead(lead: Lead, supabaseTable = "audit_requests"): Promise<StoreResult> {
  const [sheet, supabase] = await Promise.all([
    writeToSheet(lead),
    writeToSupabase(lead, supabaseTable),
  ]);

  if (!sheet.ok) console.error("[leads] sheet write failed:", sheet.detail);
  if (!supabase.ok) console.warn("[leads] supabase write skipped/failed:", supabase.detail);

  const stored = sheet.ok || supabase.ok;
  if (!stored) {
    console.error("[leads] LEAD LOST — no store accepted it", {
      source: lead.source,
      sheet: sheet.detail,
      supabase: supabase.detail,
    });
  } else {
    console.log("[leads] stored", { source: lead.source, sheet: sheet.ok, supabase: supabase.ok });
  }

  return { stored, sheet, supabase };
}

/** Trim every string field and fall back to the request's referer for source. */
export function normaliseLead(input: Record<string, unknown>, fallbackSource: string): Lead {
  const str = (v: unknown) => String(v ?? "").trim();
  return {
    email: str(input.email),
    name: str(input.name),
    website: str(input.website),
    phone: str(input.phone),
    // /api/leads callers send `industry`; /api/send-audit sends `business`.
    business: str(input.business) || str(input.industry),
    message: str(input.message),
    source: str(input.source) || fallbackSource,
    utmSource: str(input.utmSource),
    utmCampaign: str(input.utmCampaign),
    referrer: str(input.referrer),
  };
}

/**
 * Shared configuration health check, returned by GET on both lead routes.
 *
 * It exists because the Supabase breakage stayed invisible for months:
 * confirming it meant submitting a fake lead. Shape only — presence, length,
 * whether the URL is an Apps Script /exec deployment, whether a paste left
 * stray whitespace. No values, and never the secret.
 */
export function leadStoreHealth() {
  const webhook = process.env.LEADS_SHEET_WEBHOOK_URL ?? "";
  const secret = process.env.LEADS_SHEET_SECRET ?? "";

  const sheetConfigured = Boolean(webhook && secret);
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  return {
    canAcceptLeads: sheetConfigured || supabaseConfigured,
    stores: {
      googleSheet: sheetConfigured ? "configured" : "NOT CONFIGURED",
      supabase: supabaseConfigured ? "configured" : "not configured",
    },
    sheetVars: {
      LEADS_SHEET_WEBHOOK_URL: webhook
        ? {
            present: true,
            length: webhook.length,
            looksLikeExecUrl:
              webhook.startsWith("https://script.google.com/macros/s/") && webhook.endsWith("/exec"),
            hasSurroundingWhitespace: webhook !== webhook.trim(),
          }
        : { present: false },
      LEADS_SHEET_SECRET: secret
        ? { present: true, length: secret.length, hasSurroundingWhitespace: secret !== secret.trim() }
        : { present: false },
    },
    note: sheetConfigured
      ? "Configured only means the variables are present. Submit one real lead and confirm the row appears."
      : "Set LEADS_SHEET_WEBHOOK_URL and LEADS_SHEET_SECRET for Production, then redeploy — a running deployment does not pick up new variables.",
  };
}
