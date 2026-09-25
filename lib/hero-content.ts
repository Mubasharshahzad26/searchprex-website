// lib/hero-content.ts
//
// Content for the homepage hero, outside the component so both the live hero
// and the /home-page-test copy read the same strings, and so a server component
// can import them (components/HeroV2.tsx is "use client").

/**
 * The number already used in tel: links across /about, /pricing, /faq,
 * /experts, the city template and the 404 page. Imported rather than retyped so
 * there is one number on the site.
 *
 * Worth a decision: it is a +92 mobile and the buyer is a US law firm owner. A
 * US forwarding number would convert better. That is a business call, not
 * something to invent in code.
 */
export const PHONE_HREF = "tel:+923059158010";
export const PHONE_DISPLAY = "+92 305 915 8010";

/**
 * How many reviews are actually published on the Trustpilot profile.
 *
 * Stated as a number, and in the singular while it is one, because five gold
 * stars beside the words "verified reviews" reads as an average across many —
 * a rating claim rather than a link. components/TrustpilotReviewSection.tsx
 * removed a "3.8 out of 5" for the same reason: it sat above two 5-star reviews
 * and contradicted them.
 */
export const TRUSTPILOT_REVIEW_COUNT = 1;
export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/searchprex.com";

/**
 * The hero's descriptive paragraph, as segments so the internal links are data
 * rather than JSX buried in the component.
 *
 * Only routes that return 200 are linked. An earlier draft listed "New York,
 * California, Texas, Dallas, North Virginia, Malta, Orlando" — of which Dallas
 * and Orlando are cities, North Virginia is not a state, Malta is a country,
 * and /locations/new-york, /locations/virginia and /locations/florida all 404.
 * /locations/california 308-redirects because that state has one city and
 * therefore no hub. One of the seven was linkable.
 *
 * Five links, not eight: every extra link in one paragraph divides the weight
 * the others carry.
 */
export const HERO_PARAGRAPH: Array<{ text: string; href?: string }> = [
  { text: "I run SEO for law firms across " },
  { text: "Texas, Kansas and seven more states", href: "/locations" },
  { text: " — " },
  { text: "family law", href: "/services/law-firm-seo/family-law" },
  { text: ", " },
  { text: "personal injury", href: "/services/law-firm-seo/personal-injury" },
  { text: " and " },
  { text: "criminal defense", href: "/services/law-firm-seo/criminal-defense" },
  {
    text: " — plus local service businesses, Shopify and WooCommerce stores, and the ",
  },
  { text: "technical work", href: "/services/technical-seo" },
  {
    text: " behind all of it: indexing recovery, crawl waste, migrations. Enquiries are qualified by a ",
  },
  { text: "free AI intake assistant", href: "/intake-assistant" },
  { text: " before they reach you." },
];

/** Each figure links to the page carrying the screenshot it came from. */
export const HERO_STATS = [
  {
    value: "+227%",
    label: "Store revenue",
    detail: "$5,832 → $19,100 / mo",
    href: "/case-studies/ecommerce/smk-store",
  },
  {
    value: "+285%",
    label: "Pages indexed",
    detail: "3,000 → 11,549, GSC",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
  },
  {
    value: "#1",
    label: "In the AI Overview",
    detail: "Named first, then ranked #1",
    href: "/case-studies/cleaning/dolls-cleaning",
  },
] as const;
