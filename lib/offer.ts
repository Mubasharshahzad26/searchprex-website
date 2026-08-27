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
export const OFFER_CTA = "Get my free SEO + AI visibility audit";

/** Short form, for tight spaces (nav, sticky mobile bar). */
export const OFFER_CTA_SHORT = "Free SEO + AI audit";

/** The offer, in one sentence. Use verbatim in section copy. */
export const OFFER_PROMISE =
  "I run your site the same way I ran the audits on this page: a prioritized P1 / P2 / P3 fix list, a 90-day roadmap, and whether Google's AI names you or your competitor.";

/** Reassurance line that sits under a CTA. */
export const OFFER_MICROCOPY =
  "Free · No obligation · Reply within 24 hours · One client per city";

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
  "law-firm": "Get my free law firm SEO + AI audit",
  ecommerce: "Get my free ecommerce SEO + AI audit",
  local: "Get my free local SEO + AI audit",
};

/**
 * The differentiator, in one line. "Free SEO audit" is what every agency in
 * the market offers — it is the price of entry, not an offer. What is not
 * commoditised is AI-search visibility: two SearchPrex clients are currently
 * named inside Google AI Overviews, which is provable on this page. Same
 * form, same endpoint, same funnel — the offer is simply no longer generic.
 */
export const OFFER_HOOK =
  "Find out whether Google's AI mentions you — or your competitor.";

/**
 * A guarantee about PROCESS, not rankings. Nobody can honestly guarantee a
 * position; this is entirely within our control and a client can hold us to it.
 */
export const OFFER_GUARANTEE =
  "Your reality check report lands within 24 hours, or I tell you why not before the deadline — not after it.";
