// lib/offer.ts
// Single source of truth for the ONE primary conversion offer.
//
// Why this file exists: the homepage used to run five differently-named
// conversion paths at once — "Get My Growth Plan" (nav), a Calendly call
// (hero), an "AI Visibility Check" (audit strip), a "custom SEO game plan"
// (lead wizard) and a "Free SEO Audit" (lead capture form). Two of those
// posted to the same endpoint with the same three fields. When every section
// asks for something different, visitors resolve the ambiguity by doing
// nothing.
//
// One offer, one name, one destination. Import from here — never retype a CTA
// label or href inline, or the drift comes straight back.

/** Where every primary CTA on the site points. */
export const OFFER_HREF = "/free-audit";

/** The default primary CTA label. Persona variants live in OFFER_CTA_BY_PERSONA. */
export const OFFER_CTA = "Get my free SEO audit";

/** Short form, for tight spaces (nav, sticky mobile bar). */
export const OFFER_CTA_SHORT = "Get my free audit";

/** The offer, in one sentence. Use verbatim in section copy. */
export const OFFER_PROMISE =
  "The founder personally reviews your site and sends a prioritized fix list within 24 hours.";

/** Reassurance line that sits under a CTA. */
export const OFFER_MICROCOPY = "Free · No obligation · Reply within 24 hours";

/**
 * Secondary action. Deliberately NOT a second offer — it is the same
 * conversation, for people who would rather talk than fill in a form.
 */
export const CALL_HREF = "https://calendly.com/contact-searchprex/30min";
export const CALL_CTA = "Prefer to talk? Book a 30-min call";

/**
 * Persona-specific wording for the hero. Same offer, same destination —
 * only the noun changes, so each segment sees itself without splitting the
 * funnel. Keys match the persona ids in components/Hero.tsx.
 */
export const OFFER_CTA_BY_PERSONA: Record<string, string> = {
  "law-firm": "Get my free law firm SEO audit",
  ecommerce: "Get my free ecommerce SEO audit",
  local: "Get my free local SEO audit",
};
