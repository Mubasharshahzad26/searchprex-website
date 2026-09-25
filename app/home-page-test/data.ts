// app/home-page-test/data.ts
//
// Content for the /home-page-test layout. Kept out of the page file so the
// server component stays readable, and out of a client module so the page can
// build its FAQPage schema from the same array the accordion renders.

// Hero content is shared with the live homepage so the two cannot drift apart
// while this page is being used to trial changes to it.
export {
  HERO_PARAGRAPH,
  HERO_STATS,
  PHONE_DISPLAY,
  PHONE_HREF,
  TRUSTPILOT_REVIEW_COUNT,
  TRUSTPILOT_URL,
} from "@/lib/hero-content";

/**
 * Block 03 — four doors: law firms, local businesses, ecommerce, technical.
 *
 * Three of these are audiences and one is a capability, which is why Technical
 * SEO is a door but is not named in the H1. "SEO Agency for Law Firms, Local
 * Businesses, Ecommerce & Technical SEO" breaks grammatically — the last item
 * does not follow "for" — and a list that mixes who-you-serve with what-you-do
 * reads as careless to a buyer and gives Google a muddled topic. The H1 names
 * the three audiences; technical work is named in the hero paragraph and gets
 * equal weight here, where the doors are about what you need rather than who
 * you are.
 */
export const DOORS = [
  {
    title: "Law Firm SEO",
    href: "/services/law-firm-seo",
    blurb: "Signed cases, not clicks. Personal injury, family law, criminal defense, estate planning and mass torts — each with its own page, not one page trying to rank for all five.",
    bullets: ["Practice-area pages", "YMYL E-E-A-T bios", "City-level targeting"],
    cta: "See law firm results",
  },
  {
    title: "Local Business SEO",
    href: "/services/local-seo",
    blurb: "Google Business Profile, service-area pages and citations, reported on calls and forms rather than ranking screenshots nobody can act on.",
    bullets: ["GBP & map pack", "Service-area pages", "Calls tracked, not clicks"],
    cta: "See local results",
  },
  {
    title: "Ecommerce SEO",
    href: "/services/ecommerce-seo",
    blurb: "Shopify and WooCommerce stores where the products exist but do not sell: indexing at catalogue scale, product-page content and schema.",
    bullets: ["Catalogue-scale indexing", "Product page content", "Revenue, not sessions"],
    cta: "See ecommerce results",
  },
  {
    title: "Technical SEO",
    href: "/services/technical-seo",
    blurb: "When the pages exist but Google will not keep them: de-indexing recovery, crawl waste, Core Web Vitals and migrations that do not lose traffic.",
    bullets: ["Indexing recovery", "Crawl budget & facets", "Migrations"],
    cta: "See technical results",
  },
] as const;


/**
 * Block 04 — proof. Three screenshots that exist in public/images/proof, each
 * with its capture date and the case study it belongs to.
 *
 * Note on the third one: the live hero says "Map Pack Top 3" for the local
 * persona, but there is no map-pack screenshot in the repo. What IS captured is
 * an AI Overview citation plus a #1 organic result. This card claims that
 * instead — a claim with a screenshot behind it beats a stronger claim without.
 */
export const PROOF = [
  {
    src: "/images/proof/mso-gsc-indexing-full.png",
    alt: "Google Search Console page indexing for Michigan Outdoor Sports rising from about 3,000 indexed pages in May 2026 to 11,549 on 25 July 2026.",
    headline: "3,000 → 11,549 pages indexed",
    caption: "Michigan Outdoor Sports · Search Console · May to July 2026",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/proof/smk-revenue-after.png",
    alt: "SMK Store WooCommerce net sales for June 2026 showing $19,100.71 for the month.",
    headline: "$5,832 → $19,100 net sales / mo",
    caption: "SMK Store · WooCommerce · April to June 2026",
    href: "/case-studies/ecommerce/smk-store",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/proof/local-dolls-ai-overview-rank1.png",
    alt: "Google AI Overview naming D.O.L.L.S. Cleaning first for post construction cleaning in Chesterfield, Michigan, with the same site ranked first organically below it.",
    headline: "Named first in the AI Overview",
    caption: "D.O.L.L.S. Cleaning · “post construction cleaning in Chesterfield, MI” · also #1 organic",
    href: "/case-studies/cleaning/dolls-cleaning",
    width: 1600,
    height: 900,
  },
] as const;

/** Block 07 — what happens after the form. Commitments, each one datable. */
export const PROCESS = [
  { when: "Day 0", what: "You send a URL and an email. Two fields, nothing else." },
  { when: "Day 1", what: "The tear-down lands in your inbox: what your top three competitors do that you do not, where the content gaps are, and whether Google's AI names you or them." },
  { when: "Day 7", what: "If you want one, a 30/60/90 plan with the work named and priced. No obligation to take it." },
  { when: "Every Monday", what: "Once you are a client: rankings, calls, form fills and what changed — in plain English, from me." },
] as const;

/** Block 08 — six questions, each answered in the first sentence so an AI
 *  Overview can lift the answer without the paragraph around it. */
export const FAQS = [
  {
    q: "Who actually does the work?",
    a: "Mubashar Sharif does, personally. SearchPrex is not a reseller with a sales layer in front of contractors — the person who audits your site is the person who writes the pages and sends the Monday report.",
  },
  {
    q: "How fast will I rank?",
    a: "Long-tail city and practice-area terms typically start moving in four to eight weeks; competitive head terms take six months or more. Anyone quoting page one in 30 days for a competitive term is quoting a number they cannot control.",
  },
  {
    q: "What does the free tear-down include?",
    a: "A written analysis of your top three competitors, your content gaps and whether Google's AI Overviews name you or them. It arrives within 24 hours, it is free, and there is no call required to get it.",
  },
  {
    q: "What does it cost if I hire you?",
    a: "Monthly retainers run from $800 for local SEO to $4,000 for larger ecommerce programmes, with law firm work typically between $1,200 and $2,500. The exact number depends on how many pages and cities the plan covers.",
  },
  {
    q: "What does “one client per city” mean?",
    a: "Once a law firm in a city signs, no competing firm in that city can hire SearchPrex. It exists because two clients chasing the same map pack cannot both be served honestly.",
  },
  {
    q: "Which US states do you cover?",
    a: "There are live city pages in nine states today: Kansas, Texas, Michigan, Louisiana, Ohio, Pennsylvania, California, Arizona and New Mexico. Work is not limited to those — that is simply where pages exist rather than where clients can be.",
  },
] as const;
