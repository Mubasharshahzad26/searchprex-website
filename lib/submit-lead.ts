// ─────────────────────────────────────────────────────────────────────────────
//  submitLead — the one client-side path from a form to the leads Google Sheet
//
//  Fourteen forms (most location-page diagnosis tools, the Detroit growth plan,
//  Wichita, case studies, the law-firm scorecard) showed "submitted" without
//  sending anything: a setTimeout, or just setSubmitted(true). Every lead typed
//  into them was lost. They now call this, which posts to /api/leads (stored
//  through lib/leads-store.ts into the Sheet, with Supabase as backup) and
//  reports success only when the server confirms it.
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadFields {
  email: string;
  name?: string;
  website?: string;
  phone?: string;
  /** Practice area, industry or business type. */
  business?: string;
  message?: string;
  /** Which form this is, e.g. "tempe:diagnosis-tool". Shown in the sheet's source column. */
  source: string;
}

export async function submitLead(fields: LeadFields): Promise<boolean> {
  let utmSource = "";
  let utmCampaign = "";
  let referrer = "";
  try {
    const params = new URLSearchParams(window.location.search);
    utmSource = params.get("utm_source") || "";
    utmCampaign = params.get("utm_campaign") || "";
    referrer = window.location.pathname;
  } catch {}

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, utmSource, utmCampaign, referrer }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Shown when the store refused the lead, so nobody believes it was sent. */
export const LEAD_FAILED_MESSAGE =
  "Sorry — your details could not be sent. Please try again in a moment.";
