// app/case-studies/details.ts
//
// The long form of each case study: what was wrong when the work started, what
// was fixed, and the screenshots that show the result. Kept apart from
// data.ts, which feeds the cards, marquee and schema across the site, so the
// short summary and the full story can each change without touching the other.
//
// Keyed by the `client` slug in data.ts. Every figure in a caption is read off
// the screenshot it captions.

export interface ProofShot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface CaseDetail {
  /** What was wrong when the engagement started. */
  issues: string[];
  /** What was done about it. */
  fixes: Array<{ title: string; body: string }>;
  /** Dated screenshots, each captioned only with what it shows. */
  proof: ProofShot[];
  /** One line on AI-search visibility, where there is something to say. */
  aiVisibility?: string;
}

/** The shared starting point on both WooCommerce stores. */
const STORE_ISSUES = [
  "Low-quality, thin product and brand pages",
  "Crawl budget wasted on low-value URLs",
  "Thousands of pages crawled but not indexed",
  "UI/UX problems on product and category templates",
  "Slow pages and failing Core Web Vitals",
  "Weak internal linking between brands, categories and products",
  "Near-duplicate manufacturer descriptions",
  "No structured data implemented at all",
  "No backlinks",
  "No E-E-A-T signals — no clear author, brand or trust pages",
];

const STORE_FIXES = [
  {
    title: "A content autopilot for thin pages",
    body: "SearchPrex built its own content autopilot to rewrite thin product and brand pages at scale — unique, useful copy per page instead of the manufacturer's boilerplate — published in batches and re-measured in Search Console before the next batch went out.",
  },
  {
    title: "Crawling and indexing",
    body: "Crawl waste removed, sitemaps rebuilt and submitted directly, and pages resubmitted in batches so Google spent its visits on the pages that sell.",
  },
  {
    title: "Speed and Core Web Vitals",
    body: "Template-level performance fixes, so every product page got faster at once rather than one at a time.",
  },
  {
    title: "UI/UX on the templates that convert",
    body: "Product and category templates restructured so shoppers — and Google — can see what a page is for.",
  },
  {
    title: "Internal linking",
    body: "Brands, categories and products linked to each other deliberately, so authority flows to the pages that earn money.",
  },
  {
    title: "Structured data",
    body: "Product, Offer, Breadcrumb and Organization markup built from the data each page already renders.",
  },
  {
    title: "Backlinks and E-E-A-T",
    body: "Link building started from zero, alongside the brand, author and trust signals the site had none of.",
  },
];

export const CASE_DETAILS: Record<string, CaseDetail> = {
  "smk-store": {
    issues: STORE_ISSUES,
    fixes: STORE_FIXES,
    proof: [
      {
        src: "/images/proof/smk-revenue-before.png",
        width: 1366,
        height: 607,
        alt: "SMK Store WooCommerce dashboard for April 2026, showing $5,832.02 net sales for the month.",
        caption: "April 2026 · net sales $5,832",
      },
      {
        src: "/images/proof/smk-revenue-after.png",
        width: 863,
        height: 350,
        alt: "SMK Store WooCommerce dashboard for June 2026, showing $19,100.71 net sales for the month.",
        caption: "June 2026 · net sales $19,100",
      },
    ],
  },

  "michigan-outdoor-sports": {
    issues: STORE_ISSUES,
    fixes: STORE_FIXES,
    proof: [
      {
        src: "/images/indexing-comparsion-before-mso-autopilot.png",
        width: 1362,
        height: 495,
        alt: "Google Search Console Page indexing for michigansportsoutdoor.com, last updated 21 August 2026: 12.2K pages indexed, up from about 4,000 at the end of May 2026 and 5,247 on 13 June.",
        caption: "Pages indexed: about 4,000 (end of May) → 12.2K (21 Aug 2026)",
      },
      {
        src: "/images/clicks-comaprsion-after-run-mso-autopilot.PNG",
        width: 1366,
        height: 520,
        alt: "Google Search Console Performance, United States: 224 clicks from 1 April to 12 June 2026 against 322 clicks from 13 June to 29 August 2026; CTR 3.7% to 5.1%.",
        caption: "US clicks 224 → 322 and CTR 3.7% → 5.1% (1 Apr–12 Jun vs 13 Jun–29 Aug 2026)",
      },
      {
        src: "/images/proof/mso-revenue-1-jul20.png",
        width: 1040,
        height: 605,
        alt: "Michigan Outdoor Sports WooCommerce net sales on 20 July 2026: $0.00 for the month.",
        caption: "20 Jul 2026 · net sales this month $0.00",
      },
      {
        src: "/images/proof/mso-revenue-3-sep25.png",
        width: 1357,
        height: 601,
        alt: "Michigan Outdoor Sports WooCommerce net sales on 25 September 2026: $523.49 month to date.",
        caption: "25 Sep 2026 · net sales month to date $523.49",
      },
    ],
  },

  "local-hvac-services": {
    issues: [
      "No site structure — services and locations had no pages of their own",
      "No quality content for the searches customers make",
      "Technical problems holding back the pages that did exist",
      "No on-page optimisation for service + city searches",
    ],
    fixes: [
      { title: "Technical SEO", body: "The site's technical problems fixed so its pages could be crawled, indexed and understood." },
      { title: "Site structure", body: "A page for each service and the areas it serves, linked so Google can see how the business is organised." },
      { title: "On-page optimisation", body: "Titles, headings and copy matched to what people in Simi Valley actually search, answering the question first." },
      { title: "Content that answers", body: "Useful posts written for real seasonal questions — one now ranks first organically." },
    ],
    aiVisibility: "With structure and on-page fixed, Google's AI Overview began naming the business by name for a free-estimate AC installation query in Simi Valley.",
    proof: [
      {
        src: "/images/proof/local-hvac-ai-overview.png",
        width: 717,
        height: 292,
        alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' citing HVAC Services Team by name.",
        caption: "Named inside Google's AI Overview",
      },
      {
        src: "/images/proof/local-hvac-blog-rank1.png",
        width: 733,
        height: 361,
        alt: "Google results for 'Replace AC in Simi Valley Before Summer 2026' with the HVAC Services Team blog as the first organic result below the ads.",
        caption: "Blog post ranking first organically",
      },
      {
        src: "/images/proof/local-hvac-simi-valley.png",
        width: 740,
        height: 418,
        alt: "Google results for 'local ac installation Simi Valley' with HVAC Services Team ranking on page one.",
        caption: "Page one for 'local ac installation Simi Valley'",
      },
    ],
  },

  "remit-choice": {
    issues: [
      "Duplicate content across country and corridor pages",
      "Low-quality content on the pages meant to rank",
      "No heading structure — pages Google could not read as answers",
      "No keyword mapping, so pages competed with each other for the same searches",
      "No international SEO setup for a business sending money across many corridors",
    ],
    fixes: [
      { title: "International SEO", body: "Country and corridor pages set up so each market — UK to Pakistan, to Ghana and beyond — has its own page targeting its own searches." },
      { title: "Keyword mapping", body: "One primary search per page, so pages stopped competing with each other and each had a clear job." },
      { title: "Duplicate and low-quality content", body: "Duplicated copy consolidated or rewritten; thin pages replaced with content that answers the fee, rate and speed questions people ask." },
      { title: "Heading structure", body: "A clear H1–H3 hierarchy on every template, so Google and AI answers can lift the right section." },
      { title: "Campaign page wireframe", body: "The campaign landing page redesigned from the wireframe up to improve visibility and make the zero-fee offer the first thing a visitor sees." },
    ],
    aiVisibility: "Google's AI Overview now names Remit Choice for 'send money to ghana zero fees', alongside the category's largest apps.",
    proof: [
      {
        src: "/images/proof/remit-gsc-2023.png",
        width: 563,
        height: 296,
        alt: "Google Search Console for remitchoice.com, 2023: 36K clicks, 1.97M impressions, 1.8% CTR, average position 47.1.",
        caption: "2023 · 36K clicks · 1.97M impressions",
      },
      {
        src: "/images/proof/remit-gsc-2024.png",
        width: 536,
        height: 267,
        alt: "Google Search Console for remitchoice.com, 2024: 113K clicks, 5.76M impressions, 2% CTR, average position 43.4.",
        caption: "2024 · 113K clicks · 5.76M impressions",
      },
      {
        src: "/images/proof/remit-rank-1-pakistan.png",
        width: 1359,
        height: 609,
        alt: "Google results for 'free of cost money transfer to Pakistan from uk' with Remit Choice ranking first, above Meezan Bank, Xoom and Wise.",
        caption: "#1 for 'free of cost money transfer to Pakistan from uk' — above Xoom and Wise",
      },
      {
        src: "/images/proof/remit-ai-overview-ghana.png",
        width: 1355,
        height: 609,
        alt: "Google AI Overview for 'send money to ghana zero fees' naming Remit Choice among zero-fee options.",
        caption: "Named in the AI Overview for 'send money to ghana zero fees'",
      },
      {
        src: "/images/proof/remit-rank-zero-fee.png",
        width: 1355,
        height: 606,
        alt: "Google results for 'send money to pakistan at zero fee' with Remit Choice on page one alongside Sharemoney and Ria.",
        caption: "Page one for 'send money to pakistan at zero fee'",
      },
    ],
  },
};

/**
 * Projects without a written long form get the approach that applied to all
 * of them — technical fixes, on-page work, content matched to search intent,
 * and structure for AI answers — without inventing specific findings.
 */
export const DEFAULT_FIXES = [
  { title: "Technical SEO", body: "Crawling, indexing and speed problems fixed first, so the pages that matter can rank at all." },
  { title: "On-page optimisation", body: "Titles, headings and copy rebuilt around the searches that bring customers." },
  { title: "Content that matches intent", body: "Each page written to answer what the searcher actually wants, in the first lines." },
  { title: "AI visibility", body: "Clear answers and structured data, so Google's AI Overviews and answer engines can name the business." },
];

/** Screenshots for the projects without a written long form. */
export const EXTRA_PROOF: Record<string, ProofShot[]> = {
  "dolls-cleaning": [
    { src: "/images/proof/local-dolls-ai-overview-rank1.png", width: 628, height: 322, alt: "Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically.", caption: "Named first in the AI Overview, #1 organic below it" },
    { src: "/images/proof/local-dolls-rank-1-and-2.png", width: 627, height: 338, alt: "Google results for 'carpet cleaning services in Clawson, MI' with D.O.L.L.S. Cleaning holding the first and second organic positions.", caption: "Positions #1 and #2 for 'carpet cleaning services in Clawson, MI'" },
    { src: "/images/proof/local-dolls-gsc-comparison.jpg", width: 626, height: 239, alt: "Google Search Console performance comparison for D.O.L.L.S. Cleaning.", caption: "Search Console performance comparison" },
  ],
  "mammoth-roofing": [
    { src: "/images/mammoth-roofing-gsc.JPG", width: 663, height: 307, alt: "Google Search Console performance for Mammoth Roofing.", caption: "Search Console performance" },
    { src: "/images/proof/local-mammoth-texas.png", width: 624, height: 334, alt: "Google results for 'Local Residential Roof Repair in Texas' with Mammoth Roofs ranking seventh.", caption: "Position #7 for a statewide query" },
    { src: "/images/mammoth-roofing-comparison.JPG", width: 626, height: 350, alt: "Google Search Console comparison for Mammoth Roofing.", caption: "Before and after comparison" },
  ],
  "carpet-cleaning": [
    { src: "/images/carpet-cleaning-service.JPG", width: 627, height: 338, alt: "Google results for a Clawson, Michigan carpet cleaning search with the client in the top positions.", caption: "Top local positions in Clawson, MI" },
  ],
  "door-doctor": [
    { src: "/images/door-doctor-google-my-business.JPG", width: 612, height: 395, alt: "Google Business Profile performance for Door Doctor.", caption: "Business Profile performance" },
  ],
  "kitchen-cabinets": [
    { src: "/images/glendora-kitchens-gsc-perofrmance-states.JPG", width: 757, height: 336, alt: "Google Search Console performance for the kitchen cabinets client.", caption: "Search Console performance" },
    { src: "/images/glendora-kitchens-top-raking.JPG", width: 700, height: 375, alt: "Google results showing the kitchen cabinets client in top positions.", caption: "Top rankings for kitchen remodel searches" },
  ],
  "hvac-team": [
    { src: "/images/hvac-ranking.JPG", width: 600, height: 334, alt: "Google results showing HVAC Team on page one for its primary service keywords.", caption: "Page one for primary service keywords" },
    { src: "/images/rank-hvac.JPG", width: 586, height: 321, alt: "Google ranking screenshot for HVAC Team.", caption: "Ranking snapshot" },
  ],
};
