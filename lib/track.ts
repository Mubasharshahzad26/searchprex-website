// lib/track.ts
//
// Conversion signals for Google Tag Manager (GTM-TV4PZGFV, loaded in
// app/layout.tsx). Leads already reach the Google Sheet with a source tag, but
// GA4 never heard about them, so it could not say which page or channel
// produced a lead. These pushes give GTM an event to trigger GA4 on.
//
// Never pass personal data here — no email, name, phone or website. Only what
// kind of form it was, the site-internal source tag and the page path.

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  fbq?: (...args: unknown[]) => void;
};

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

/** Call once, after a lead form has been accepted by the server. */
export function trackLead(formType: string, leadSource?: string) {
  push({
    event: "generate_lead",
    form_type: formType,
    lead_source: leadSource ?? "",
    page_path: typeof window === "undefined" ? "" : window.location.pathname,
  });
  // The Meta Pixel in app/layout.tsx gets its standard Lead event too.
  if (typeof window !== "undefined") (window as DataLayerWindow).fbq?.("track", "Lead", { content_category: formType });
}

/** A click on a phone, WhatsApp, email or booking link. */
export function trackContactClick(method: string) {
  push({
    event: "contact_click",
    contact_method: method,
    page_path: typeof window === "undefined" ? "" : window.location.pathname,
  });
}
