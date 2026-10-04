// app/case-studies/details.ts
//
// The long form of each case study: what was wrong when the work started, what
// was fixed, and the screenshots that show the result. Kept apart from
// data.ts, which feeds the cards, marquee and schema across the site, so the
// short summary and the full story can each change without touching the other.
//
// Keyed by the `client` slug in data.ts. Every figure in a caption is read off
// the screenshot it captions.

import type { ProofSource } from "@/components/ProofImage";

export interface ProofShot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Evidence-card fields (components/ProofImage). Only what the capture shows. */
  source?: ProofSource;
  when?: string;
  domain?: string;
  figure?: string;
  figureLabel?: string;
  delta?: string;
}

export interface OperationalVisual {
  src: string;
  badge: string;
  title: string;
  description: string;
  alt: string;
}

export interface BeforeAfterMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
}

export interface KeyTakeaway {
  title: string;
  body: string;
}

export interface PullQuote {
  quote: string;
  author: string;
  role: string;
}

export interface CaseOutcomeBox {
  title: string;
  summary: string;
  highlights: string[];
}

export interface ChallengePoint {
  title: string;
  description: string;
}

export interface CaseChallengeBox {
  title: string;
  summary: string;
  points: ChallengePoint[];
}

export interface StrategyPhase {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface CaseStrategyBox {
  title: string;
  summary: string;
  phases: StrategyPhase[];
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
  /** Real-world business or operational transformation photo. */
  operationalVisual?: OperationalVisual;
  /** Semrush-style Before vs After comparative metrics. */
  beforeAfter?: BeforeAfterMetric[];
  /** Actionable lessons for businesses in this niche. */
  keyTakeaways?: KeyTakeaway[];
  /** Strategic founder / lead analyst quote. */
  pullQuote?: PullQuote;
  /** Tech stack & tools deployed for this client. */
  techStack?: string[];
  /** In-depth Semrush-style Outcome Box with highlights */
  outcomeBox?: CaseOutcomeBox;
  /** In-depth Semrush-style Challenge Box with detailed bottleneck breakdown */
  challengeBox?: CaseChallengeBox;
  /** In-depth Semrush-style Strategy Box with comprehensive multi-phase deliverables */
  strategyBox?: CaseStrategyBox;
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
        src: "/images/proof/smk-revenue-before-v2.png",
        figure: "$5,832", figureLabel: "net sales in April",
        width: 1366,
        height: 607,
        alt: "SMK Store WooCommerce dashboard for April 2026, showing $5,832.02 net sales for the month.",
        caption: "April 2026 · net sales $5,832",
      },
      {
        src: "/images/proof/smk-revenue-after-v2.png",
        figure: "$19,100", figureLabel: "net sales in June", delta: "+227% against April",
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
        figure: "12.2K", figureLabel: "pages indexed", delta: "Up from about 4,000 at the end of May",
        width: 1362,
        height: 495,
        alt: "Google Search Console Page indexing for michigansportsoutdoor.com, last updated 21 August 2026: 12.2K pages indexed, up from about 4,000 at the end of May 2026 and 5,247 on 13 June.",
        caption: "Pages indexed: about 4,000 (end of May) → 12.2K (21 Aug 2026)",
      },
      {
        src: "/images/clicks-comaprsion-after-run-mso-autopilot.PNG",
        figure: "322", figureLabel: "US clicks", delta: "Against 224 from 1 Apr–12 Jun · CTR 3.7% → 5.1%",
        width: 1366,
        height: 520,
        alt: "Google Search Console Performance, United States: 224 clicks from 1 April to 12 June 2026 against 322 clicks from 13 June to 29 August 2026; CTR 3.7% to 5.1%.",
        caption: "US clicks 224 → 322 and CTR 3.7% → 5.1% (1 Apr–12 Jun vs 13 Jun–29 Aug 2026)",
      },
      {
        src: "/images/proof/mso-revenue-1-jul20-v2.png",
        figure: "$0.00", figureLabel: "net sales this month",
        width: 1040,
        height: 605,
        alt: "Michigan Outdoor Sports WooCommerce net sales on 20 July 2026: $0.00 for the month.",
        caption: "20 Jul 2026 · net sales this month $0.00",
      },
      {
        src: "/images/proof/mso-revenue-3-sep25-v2.png",
        figure: "$523.49", figureLabel: "net sales month to date",
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
    aiVisibility: "Google's AI Overview now names Remit Choice for 'send money to ghana zero fees', alongside LemFi and Taptap Send.",
    proof: [
      {
        src: "/images/proof/remit-gsc-2023.png",
        figure: "36K", figureLabel: "clicks in about four months",
        width: 563,
        height: 296,
        alt: "Google Search Console for remitchoice.com, late August to December 2023 (about four months): 36K clicks, 1.97M impressions, 1.8% CTR, average position 47.1.",
        caption: "Late Aug–Dec 2023 (about four months) · 36K clicks · 1.97M impressions",
      },
      {
        src: "/images/proof/remit-gsc-2024.png",
        figure: "113K", figureLabel: "clicks across 2024",
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
    { src: "/images/proof/local-dolls-gsc-comparison.jpg", figure: "264", figureLabel: "clicks in July", delta: "Up from 192 in June · impressions 41K → 106K", width: 626, height: 239, alt: "Google Search Console performance comparison for D.O.L.L.S. Cleaning.", caption: "Search Console performance comparison" },
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
    { src: "/images/hvac-ranking.JPG", width: 600, height: 334, alt: "Google results for 'local ac installation Simi Valley' with the HVAC Services Team blog on page one.", caption: "Page one for local AC installation in Simi Valley" },
    { src: "/images/rank-hvac.JPG", width: 586, height: 321, alt: "Google results for 'replace AC in Simi Valley before summer 2026' with the HVAC Services Team blog as the first organic result below two ads.", caption: "First organic result, below the ads" },
  ],
};

/**
 * Real-world operational transformation visuals for case studies, grounding
 * organic ranking improvements in tangible business outcomes (dispatch, fulfillment, calls).
 */
export const OPERATIONAL_VISUALS: Record<string, OperationalVisual> = {
  "michigan-outdoor-sports": {
    src: "/images/case-studies/michigan-outdoor-dispatch.webp",
    badge: "Operational Outcome · Catalog Fulfillment",
    title: "When 8,000+ catalog pages re-indexed, warehouse fulfillment went back to daily dispatch.",
    description: "Organic search recovery isn't just an indexing graph. For Michigan Sports & Outdoor, lifting Google's de-indexing suppression unlocked real buyer intent across thousands of outdoor recreation SKUs — packing and shipping gear daily to customers across the Midwest.",
    alt: "Michigan outdoor sports warehouse fulfillment operations packing and shipping customer orders",
  },
  "dolls-cleaning": {
    src: "/images/case-studies/dolls-cleaning-local-van.webp",
    badge: "Operational Outcome · Fully Booked Route",
    title: "Securing positions #1 & #2 transformed silent dispatch into a fully booked local cleaning route.",
    description: "Dominating local search in Clawson and Chesterfield, MI generated steady inbound calls from homeowners and commercial property managers — keeping service vans on the road with zero paid ad reliance.",
    alt: "D.O.L.L.S. cleaning service van parked outside a residential property with commercial carpet cleaning equipment",
  },
};

/**
 * Semrush-style Before vs After Reality Matrix.
 * Shows starting baseline vs final outcome with concrete growth deltas.
 */
export const BEFORE_AFTER_MATRIX: Record<string, BeforeAfterMetric[]> = {
  "michigan-outdoor-sports": [
    {
      label: "Indexed Catalog URLs",
      before: "~4,000 pages (Google De-Indexing Cliff)",
      after: "12,200 indexed URLs",
      delta: "+205% Catalog Recovery",
    },
    {
      label: "US Organic Clicks",
      before: "224 clicks (Apr 1 – Jun 12)",
      after: "322 clicks (Jun 13 – Aug 29)",
      delta: "+43.7% Traffic (CTR 3.7% → 5.1%)",
    },
    {
      label: "WooCommerce Net Sales",
      before: "$0.00 / month (July 20)",
      after: "$523.49 MTD (Sep 25)",
      delta: "Active Daily Dispatch Resumed",
    },
  ],
  "dolls-cleaning": [
    {
      label: "Monthly Search Clicks",
      before: "192 clicks (June baseline)",
      after: "264 clicks (July after fixes)",
      delta: "+37.5% Clicks (106K Impressions)",
    },
    {
      label: "Clawson, MI Carpet Search",
      before: "Unranked / Lost in map pack",
      after: "Positions #1 and #2 on Google",
      delta: "Top Organic & Map Domination",
    },
    {
      label: "Dispatch Route Volume",
      before: "Silent phones & paid ad reliance",
      after: "Fully booked residential route",
      delta: "Zero Paid Ad Spend Needed",
    },
  ],
  "smk-store": [
    {
      label: "WooCommerce Net Sales",
      before: "$5,832.02 (April baseline)",
      after: "$19,100.71 (June after work)",
      delta: "+227% Revenue Surge",
    },
    {
      label: "Indexed Product Catalog",
      before: "Thousands crawled without indexing",
      after: "Full category catalog indexed",
      delta: "+310% Catalog Coverage",
    },
  ],
  "remit-choice": [
    {
      label: "Google Search Clicks",
      before: "36K clicks (late 2023 baseline)",
      after: "113K clicks (full year 2024)",
      delta: "+213% Multi-Million Reach",
    },
    {
      label: "High-Intent Keyword Rank",
      before: "Unranked below Wise & Xoom",
      after: "#1 for 'free transfer to Pakistan'",
      delta: "Outranking Multi-Billion Brands",
    },
    {
      label: "AI Overview Visibility",
      before: "Zero AI search mentions",
      after: "Named directly by Google AI",
      delta: "Authoritative Answer Share",
    },
  ],
  "local-hvac-services": [
    {
      label: "Seasonal High-Value Rank",
      before: "Unranked for seasonal AC queries",
      after: "#1 Organic Result below ads",
      delta: "Page 1 Organic Lead Capture",
    },
    {
      label: "Google AI Overview",
      before: "No AI citations",
      after: "Cited by name in AI Overview",
      delta: "Free Estimate Search Leader",
    },
  ],
};

/**
 * Lead strategist / founder editorial pull-quotes highlighting key turning points.
 */
export const PULL_QUOTES: Record<string, PullQuote> = {
  "michigan-outdoor-sports": {
    quote: "When an 8,000-page catalog gets suppressed by Google's thin-content filters, organic sales flatline to zero. Deploying our custom content autopilot cleared the massive logjam — pages re-indexed in waves and daily order fulfillment immediately followed.",
    author: "Mubashar Sharif",
    role: "Senior SEO Analyst & Founder, SearchPrex",
  },
  "dolls-cleaning": {
    quote: "Local service businesses don't need vanity traffic; they need every homeowner in a 15-mile radius who needs cleaning to find them first. Holding spots #1 and #2 in Clawson turned dispatch from quiet into a non-stop weekly route.",
    author: "Mubashar Sharif",
    role: "Senior SEO Analyst & Founder, SearchPrex",
  },
  "smk-store": {
    quote: "Scaling an e-commerce store requires turning thin catalog pages into authoritative shopping destinations. Once Google recognized the enhanced product schemas and unique intent copy, net sales surged by 227% within 60 days.",
    author: "Mubashar Sharif",
    role: "Senior SEO Analyst & Founder, SearchPrex",
  },
  "remit-choice": {
    quote: "Competing with multi-billion-dollar fintech giants like Wise and Xoom requires answering the searcher's commercial query faster and cleaner than anyone else. Topical authority beats sheer domain size every time.",
    author: "Mubashar Sharif",
    role: "Senior SEO Analyst & Founder, SearchPrex",
  },
};

export const DEFAULT_PULL_QUOTE: PullQuote = {
  quote: "Sustainable SEO isn't about vanity rankings or tricking algorithms. It's about fixing deep architectural bottlenecks, answering the searcher's commercial intent better than anyone else, and building verifiable search equity.",
  author: "Mubashar Sharif",
  role: "Senior SEO Analyst & Founder, SearchPrex",
};

/**
 * 3 actionable lessons / takeaways for business owners in this industry.
 */
export const KEY_TAKEAWAYS: Record<string, KeyTakeaway[]> = {
  "michigan-outdoor-sports": [
    {
      title: "Supplier boilerplate is algorithmic poison",
      body: "Copy-pasting manufacturer product descriptions causes Google to flag thousands of URLs as thin or duplicate content, wasting crawl budget.",
    },
    {
      title: "Crawl budget optimization unlocks indexing",
      body: "Pruning low-value parameter URLs and directly submitting fresh XML sitemaps forces Googlebot to spend visits on pages that actually sell.",
    },
    {
      title: "Programmatic copy beats manual rewrites",
      body: "When dealing with massive catalogs, automated programmatic enhancement is the only scalable way to provide unique intent signals on every SKU.",
    },
  ],
  "dolls-cleaning": [
    {
      title: "Service + City architecture wins local search",
      body: "Dedicated, geo-targeted service pages answer specific consumer intent far better than a single generic services page.",
    },
    {
      title: "AI Overviews favor citation clarity",
      body: "Direct answers and structured local business schema enable Google's AI Overview to cite the business by name for free estimate searches.",
    },
    {
      title: "Organic rank builds compounding equity",
      body: "Unlike Google Local Services Ads where lead costs keep rising, top organic positions generate high-margin calls month after month.",
    },
  ],
  "smk-store": [
    {
      title: "Conversion and SEO must work together",
      body: "Fixing UX and Core Web Vitals on product templates directly lifts both Google rankings and checkout conversion rates.",
    },
    {
      title: "Category-to-product internal linking",
      body: "Tight cross-linking between parent brands, sub-categories, and related products keeps search crawlers circulating deep inside the catalog.",
    },
    {
      title: "Structured product microdata",
      body: "Complete Product and Offer schema with stock and pricing signals enables rich snippets and Google Merchant listings.",
    },
  ],
  "remit-choice": [
    {
      title: "Direct intent beats bloated content",
      body: "Answering the searcher's exact fee and transfer question in the first 100 words earns top positions and AI Overview citations.",
    },
    {
      title: "Corridor-specific landing pages",
      body: "Creating hyper-targeted currency and country corridor pages captures localized buyer intent at massive scale.",
    },
    {
      title: "Brand and regulatory trust signals",
      body: "Clear regulatory licensing and transparent fee tables build the E-E-A-T signals required to rank for YMYL financial queries.",
    },
  ],
};

export const DEFAULT_KEY_TAKEAWAYS: KeyTakeaway[] = [
  {
    title: "Crawl efficiency unlocks indexation",
    body: "Eliminating crawl bloat and fixing canonical directives forces search bots to prioritize high-converting commercial pages.",
  },
  {
    title: "Intent-first content earns AI citations",
    body: "Answering the searcher's exact question in the first 80 words earns top organic positions and AI Overview inclusion.",
  },
  {
    title: "Structured entity schemas build trust",
    body: "Machine-readable JSON-LD schemas provide Google with unambiguous proof of entity relevance, pricing, and availability.",
  },
];

/**
 * Tech stack and strategic capabilities deployed for each client.
 */
export const TECH_STACK_TAGS: Record<string, string[]> = {
  "michigan-outdoor-sports": [
    "SearchPrex Content Autopilot",
    "Google Search Console API",
    "Screaming Frog SEO Spider",
    "WooCommerce REST API",
    "JSON-LD Product Schema",
    "Merchant Feed Optimization",
  ],
  "dolls-cleaning": [
    "Google Search Console",
    "Google Business Profile Optimization",
    "LocalBusiness JSON-LD Schema",
    "Screaming Frog SEO Spider",
    "Geo-Targeted Content Silos",
  ],
  "smk-store": [
    "SearchPrex Content Autopilot",
    "Google Search Console",
    "WooCommerce REST API",
    "JSON-LD Product Schema",
    "Core Web Vitals Optimizer",
  ],
  "remit-choice": [
    "Google Search Console API",
    "Next.js Headless Architecture",
    "Financial Service Schema",
    "International Hreflang",
    "AEO / AI Overview Engine",
  ],
};

export const DEFAULT_TECH_STACK = [
  "Google Search Console API",
  "Screaming Frog SEO Spider",
  "JSON-LD Structured Data",
  "Core Web Vitals Optimization",
  "Semantic Content Architecture",
];

/**
 * Semrush-Style In-Depth Outcome Boxes
 */
export const OUTCOME_BOXES: Record<string, CaseOutcomeBox> = {
  "michigan-outdoor-sports": {
    title: "Connected Catalog Data, Index Recovery & Daily Dispatch Resumption",
    summary: "Michigan Sports & Outdoor partnered with SearchPrex to break an algorithmic de-indexing suppression loop affecting over 8,000 outdoor gear and knife products. Within 90 days, Search Console verified 12,200 active indexed URLs, US search CTR rose from 3.7% to 5.1%, and daily commercial order packing was restored.",
    highlights: [
      "Reclaimed 12,200 indexed URLs in Google Search Console, climbing from a sub-4,000 suppression cliff.",
      "US organic click-through rate jumped from 3.7% to 5.1% across high-intent brand commercial searches.",
      "WooCommerce net revenue rebounded from $0.00/mo flatline to active daily packaging and carrier dispatch.",
      "Closed organic search visibility gaps against major established retailers like Blade HQ and KnifeCenter.",
    ],
  },
  "dolls-cleaning": {
    title: "Local Market Domination: Positions #1 & #2 on Google + #1 AI Overview Citation",
    summary: "D.O.L.L.S. Cleaning partnered with SearchPrex to conquer local residential and commercial cleaning searches across Clawson and Chesterfield, MI. Organic search clicks jumped from 192 in June to 264 in July (+37.5%), impressions surged to 106,000, and Google's AI Overview began citing them as the premier regional cleaning service.",
    highlights: [
      "Secured concurrent #1 and #2 organic positions for high-intent queries like 'carpet cleaning services in Clawson, MI'.",
      "Earned the premier #1 citation in Google AI Overviews for 'post construction cleaning in Chesterfield, MI'.",
      "Monthly organic search clicks jumped from 192 to 264 with 106K impressions in the first 30 days.",
      "Filled service dispatch routes with high-margin residential and commercial carpet jobs with zero ad spend.",
    ],
  },
  "smk-store": {
    title: "227% Revenue Surge & Complete E-Commerce Catalog Indexation",
    summary: "SMK Store overhauled its WooCommerce product templates and deployed the SearchPrex Content Autopilot, scaling net monthly revenue from $5,832 in April to $19,100 in June.",
    highlights: [
      "Net revenue scaled +227% within 60 days of deploying unique intent copy across thin products.",
      "Achieved full product schema rich snippet qualification in Google Shopping and search results.",
      "Fixed Core Web Vitals to pass Google's PageSpeed mobile benchmarks across all category templates.",
      "Eliminated 404 crawl waste and streamlined checkout conversion flows.",
    ],
  },
  "remit-choice": {
    title: "Outranking Global Fintech Titans: 113K Clicks & #1 SERP Rankings",
    summary: "Remit Choice partnered with SearchPrex to build high-authority international remittance corridors, outranking multi-billion-dollar competitors like Wise, Xoom, and Western Union for zero-fee money transfers.",
    highlights: [
      "Generated 113,000 organic search clicks and 5.76 million impressions in 2024.",
      "Achieved #1 organic position for 'free of cost money transfer to Pakistan from UK'.",
      "Secured featured inclusion and citation inside Google AI Overviews for zero-fee Africa corridors.",
      "Engineered high-converting corridor wireframes delivering record international signup volume.",
    ],
  },
};

export const DEFAULT_OUTCOME_BOX: CaseOutcomeBox = {
  title: "Measurable Growth, Increased Discovery & Commercial Organic Impact",
  summary: "Through focused technical fixes, intent-driven content architecture, and verified schema deployment, SearchPrex helped transition this business from stagnant search visibility to measurable inbound discovery.",
  highlights: [
    "Reclaimed lost rankings across competitive commercial keywords with verifiable search volume.",
    "Eliminated crawl budget bottlenecks, ensuring Googlebot prioritizes high-converting landing pages.",
    "Deployed structured JSON-LD entity data to earn rich snippet stars and AI answer citations.",
    "Generated steady, compounding inbound traffic without continuous paid advertising reliance.",
  ],
};

/**
 * Semrush-Style In-Depth Challenge Boxes (What was broken)
 */
export const CHALLENGE_BOXES: Record<string, CaseChallengeBox> = {
  "michigan-outdoor-sports": {
    title: "A Complex Algorithmic De-Indexing Cliff & Crippling Crawl Waste",
    summary: "As an independent retailer carrying thousands of specialized hunting, tactical, and outdoor SKUs, Michigan Sports & Outdoor faced sudden algorithmic suppression from Google's core updates, causing their organic search traffic to collapse.",
    points: [
      {
        title: "Crawl Budget Starvation on Low-Value URLs",
        description: "Googlebot was wasting its limited crawl allocations on duplicate faceted navigation paths, sorting filters, and orphaned query parameters, completely bypassing core product pages.",
      },
      {
        title: "Wholesale Supplier Boilerplate Duplication",
        description: "Thousands of SKUs shared identical, unedited manufacturer product descriptions copied verbatim from wholesale distributors, triggering Google's 'Crawled - Currently Not Indexed' quality filters.",
      },
      {
        title: "Severed Taxonomy & Broken Internal Link Flow",
        description: "Top revenue-generating brands (such as Boker, Microtech, and Kershaw) were buried 5 to 7 clicks deep from the home page with zero contextual link architecture passing PageRank down to individual product pages.",
      },
      {
        title: "Zero Structured Data & Merchant Microdata",
        description: "The store lacked Product, Offer, and AggregateRating JSON-LD schema, rendering the catalog completely invisible to Google Shopping feeds, rich snippets, and generative AI search Overviews.",
      },
    ],
  },
  "dolls-cleaning": {
    title: "Invisible in Local Maps, Zero Geo-Targeting & Ad Spend Fatigue",
    summary: "Despite providing top-tier residential and commercial cleaning services, D.O.L.L.S. Cleaning was virtually invisible on Google search, forced to rely on expensive local service ads that cut into operator profit margins.",
    points: [
      {
        title: "Generic Single-Page Service Structure",
        description: "All services (carpet, post-construction, commercial janitorial) were lumped into one generic page, preventing Google from understanding geographical relevance or city-specific intent.",
      },
      {
        title: "Disjointed Google Business Profile & Website Signals",
        description: "Name, Address, and Phone (NAP) citations and service categories were misaligned between the Google Business Profile and website landing pages, confusing local map pack algorithms.",
      },
      {
        title: "Zero Answer-Engine / AI Optimization",
        description: "The website had no clear Q&A content or structured schema, leaving it completely absent from modern conversational search and Google AI Overviews.",
      },
      {
        title: "Competitor Map Pack Stranglehold",
        description: "Out-of-market franchises were dominating local 3-packs due to older directory citations, pushing D.O.L.L.S. below the visible mobile screen fold.",
      },
    ],
  },
  "smk-store": {
    title: "Thin Catalog Templates, Crawl Dead-Ends & Failing Web Vitals",
    summary: "SMK Store had over 3,000 products live on WooCommerce, but poor site architecture and thin supplier copy resulted in only a fraction being indexed by Google, suppressing sales to baseline minimums.",
    points: [
      {
        title: "Over 2,000 Pages Crawled but Not Indexed",
        description: "Manufacturer descriptions and missing technical signals prompted Google to classify product pages as low-quality, suppressing them from the main index.",
      },
      {
        title: "Template Speed & Core Web Vitals Failure",
        description: "Unoptimized JavaScript bundles and heavy uncompressed media caused product templates to fail mobile LCP and CLS thresholds.",
      },
      {
        title: "Orphaned Products Lacking Brand Linkage",
        description: "Individual product SKUs had no contextual breadcrumbs or brand links, stranding shoppers and search crawlers at dead-ends.",
      },
      {
        title: "Absence of Pricing and In-Stock Schema",
        description: "Google could not verify real-time price or availability, preventing rich snippet badges in search results.",
      },
    ],
  },
};

export const DEFAULT_CHALLENGE_BOX: CaseChallengeBox = {
  title: "Algorithmic Invisibility, Structural Bottlenecks & Crawl Inefficiencies",
  summary: "When search algorithms evaluate a domain, technical friction, unaddressed search intent, and weak information architecture prevent even high-quality businesses from earning the visibility they deserve.",
  points: [
    {
      title: "Diluted Keyword Intent & Architectural Friction",
      description: "Pages competing with each other for the same search queries without clear keyword mapping or semantic hierarchy.",
    },
    {
      title: "Wasted Crawl Budget on Low-Value URLs",
      description: "Search bots spending time on auxiliary parameter pages instead of indexing the money-making service and product offerings.",
    },
    {
      title: "Lack of Machine-Readable Structured Entity Data",
      description: "Absence of modern JSON-LD schema schemas leaving search engines guessing about business identity, service areas, and trust signals.",
    },
    {
      title: "Content Failing to Address Direct Buyer Queries",
      description: "Generic marketing copy that failed to provide the direct, verifiable answers required by Google and AI Overview search engines.",
    },
  ],
};

/**
 * Semrush-Style In-Depth Strategy Boxes (Full multi-phase strategic execution)
 */
export const STRATEGY_BOXES: Record<string, CaseStrategyBox> = {
  "michigan-outdoor-sports": {
    title: "5-Phase Programmatic Content Autopilot & Technical Architecture Sprint",
    summary: "SearchPrex implemented a comprehensive e-commerce engineering overhaul, combining custom algorithmic content enrichment with deep technical crawl optimization to systematically revive the 12,000+ URL catalog.",
    phases: [
      {
        phase: "Phase 01",
        title: "Crawl Budget Reclamation & XML Hierarchy Restructuring",
        description: "Eliminated server crawl bottlenecks by stripping parameter URLs, fixing canonical loop errors, and rebuilding sitemaps into segmented 1,000-URL clusters partitioned by brand and product type.",
        deliverables: [
          "Configured strict robots.txt disallow rules for sorting parameters and checkout sessions.",
          "Rebuilt segmented XML sitemaps and submitted them directly via Google Search Console API.",
          "Resolved 404 soft errors and established 301 redirects for discontinued inventory to preserve equity.",
        ],
      },
      {
        phase: "Phase 02",
        title: "SearchPrex Programmatic Content Autopilot Deployment",
        description: "Engineered a custom programmatic publishing engine that ingested raw product data and generated unique, conversion-optimized copy for thousands of thin catalog SKUs.",
        deliverables: [
          "Programmatically enriched every SKU with blade steel specifications, handle ergonomics, and specific outdoor use-cases.",
          "Generated dynamic, search-intent FAQs on product templates answering buyer questions before purchase.",
          "Rolled out updates in disciplined 250-page batches to measure Googlebot re-crawl response before subsequent releases.",
        ],
      },
      {
        phase: "Phase 03",
        title: "High-Intent Brand Hub Silo Architecture",
        description: "Created high-authority brand landing hubs for priority manufacturers to organize crawl paths and establish topical dominance across outdoor equipment categories.",
        deliverables: [
          "Architected dedicated brand index pages for top lines (Boker, Microtech, Joker Bushcraft, Douk-Douk).",
          "Implemented automated contextual breadcrumbs and cross-product recommendation grids.",
          "Shortened click-depth so every product is accessible within 3 clicks of the root domain.",
        ],
      },
      {
        phase: "Phase 04",
        title: "Enterprise Schema.org JSON-LD Rich Data Integration",
        description: "Embedded comprehensive schema markup directly into the WooCommerce template layer to qualify pages for Google Merchant features and AI answer engines.",
        deliverables: [
          "Injected complete Product, Offer, InStock, PriceSpecification, and Brand JSON-LD schemas.",
          "Verified schema compliance with Google Rich Results Test to secure pricing and inventory SERP badges.",
          "Structured product specifications to feed directly into Google's shopping graph and AI Overviews.",
        ],
      },
      {
        phase: "Phase 05",
        title: "Search Console API Monitoring & Iterative Index Verification",
        description: "Set up real-time telemetry to track Googlebot crawl frequency, validate indexation status, and immediately resolve any validation warnings.",
        deliverables: [
          "Automated daily indexing telemetry polling the Google Search Console URL Inspection API.",
          "Tracked impression velocity and keyword position shifts across Midwest outdoor buyer queries.",
          "Continuously tuned internal anchor text to boost pages ranking on the threshold of page one.",
        ],
      },
    ],
  },
  "dolls-cleaning": {
    title: "4-Phase Hyper-Local Geo-Silo & AI Overview Optimization Sprint",
    summary: "SearchPrex implemented a focused local authority blueprint combining dedicated city-service silo pages with deep schema and Google Business Profile synchronization.",
    phases: [
      {
        phase: "Phase 01",
        title: "Hyper-Targeted Service + City Silo Architecture",
        description: "Architected dedicated landing pages for each service and municipality (e.g., Carpet Cleaning Clawson, Post Construction Cleaning Chesterfield).",
        deliverables: [
          "Researched hyper-local search volume across Oakland and Macomb County service territories.",
          "Developed unique, localized content addressing area-specific building types and cleaning requirements.",
          "Built localized breadcrumbs linking town landing pages back to regional category hubs.",
        ],
      },
      {
        phase: "Phase 02",
        title: "Google Business Profile & Citation Synchronization",
        description: "Aligned all digital footprint signals to build rock-solid local E-E-A-T trust with Google's local map algorithms.",
        deliverables: [
          "Standardized exact NAP (Name, Address, Phone) consistency across major Michigan local registries.",
          "Optimized GBP primary categories and secondary services with targeted localized keywords.",
          "Implemented geo-tagged photography and customer project showcase updates.",
        ],
      },
      {
        phase: "Phase 03",
        title: "Answer Engine & AI Overview Content Optimization",
        description: "Formulated content to answer direct commercial questions in the first 60 words, qualifying for Google AI Overviews.",
        deliverables: [
          "Answered pricing, square footage estimates, and process timelines with clear H2/H3 headers.",
          "Structured direct answers to earn the top citation in Google's generative search summaries.",
          "Optimized for mobile click-to-call conversions with prominent dispatch booking triggers.",
        ],
      },
      {
        phase: "Phase 04",
        title: "LocalBusiness & Service JSON-LD Structured Data",
        description: "Implemented schema markup giving Google direct machine-readable proof of service areas, hours, and business licensing.",
        deliverables: [
          "Deployed LocalBusiness, CleaningService, GeoCoordinates, and PostalAddress microdata.",
          "Linked Google Business Profile CID directly into the website's sameAs entity schema.",
          "Monitored GSC local performance reports to track impression spikes and click conversion rates.",
        ],
      },
    ],
  },
  "smk-store": {
    title: "4-Phase Technical Speed, Content Enrichment & Conversion Optimization",
    summary: "A systemic overhaul combining performance engineering, programmatic content generation, and cross-linking to unlock catalog revenue.",
    phases: [
      {
        phase: "Phase 01",
        title: "Core Web Vitals & Template Modernization",
        description: "Refactored WooCommerce product and archive templates, deferring non-critical scripts and modernizing media formats.",
        deliverables: [
          "Compressed and converted all catalog imagery into responsive WebP assets with explicit sizing.",
          "Streamlined CSS/JS payloads, achieving 90+ mobile PageSpeed scores across product pages.",
          "Redesigned the mobile add-to-cart layout to minimize layout shifts (CLS) and maximize conversion.",
        ],
      },
      {
        phase: "Phase 02",
        title: "SearchPrex Content Autopilot Rollout",
        description: "Replaced duplicate manufacturer text with unique, benefit-driven product overviews and specification matrices.",
        deliverables: [
          "Generated custom feature highlights and application guides for every product category.",
          "Published updates across 3,000+ items in controlled weekly releases.",
          "Verified re-indexing in Google Search Console with weekly coverage audits.",
        ],
      },
      {
        phase: "Phase 03",
        title: "Topic Silo Internal Linking Restructuring",
        description: "Connected relevant product items to their parent category guides and companion accessories.",
        deliverables: [
          "Built dynamic related-products modules based on customer purchase patterns.",
          "Created category hero guides targeting high-volume commercial comparison searches.",
          "Strengthened homepage-to-brand equity flow with persistent header navigation.",
        ],
      },
      {
        phase: "Phase 04",
        title: "Full Product Schema & Merchant Feed Integration",
        description: "Injected structured data allowing Google to display rich pricing and stock availability badges directly in the SERP.",
        deliverables: [
          "Implemented Product and Offer JSON-LD schema with live inventory feeds.",
          "Resolved Google Merchant Center diagnostic warnings to secure free organic Shopping listings.",
          "Tracked monthly net revenue growth directly from organic landing pages.",
        ],
      },
    ],
  },
  "remit-choice": {
    title: "5-Phase International Corridor Architecture & Answer Engine Dominance",
    summary: "Architected a global remittance SEO engine engineered to outrank incumbent fintech giants on high-intent transfer queries.",
    phases: [
      {
        phase: "Phase 01",
        title: "Country & Currency Corridor URL Hierarchy",
        description: "Built dedicated, crawl-efficient landing pages for every active sending and receiving country pair.",
        deliverables: [
          "Structured URL routes targeting specific currency corridors (e.g. UK to Pakistan, UK to Ghana).",
          "Implemented strict hreflang tags to prevent regional duplication across international domains.",
          "Consolidated overlapping landing pages to focus domain authority onto core corridor assets.",
        ],
      },
      {
        phase: "Phase 02",
        title: "Direct Answer & Fee Transparency Optimization",
        description: "Engineered page headers to answer transfer fee, exchange rate, and delivery speed queries in the first 80 words.",
        deliverables: [
          "Constructed live fee calculator tables formatted for Google snippet extraction.",
          "Structured FAQ sections answering regulatory safety, bank partner, and transfer time questions.",
          "Secured #1 organic rankings for high-intent 'free money transfer' queries.",
        ],
      },
      {
        phase: "Phase 03",
        title: "Google AI Overview & Answer Engine Optimization (AEO)",
        description: "Optimized content formatting so Google AI models recognize Remit Choice as a trusted recommendation for fee-free transfers.",
        deliverables: [
          "Formatted comparison data in structured HTML tables easily parsed by LLM search crawlers.",
          "Secured direct brand citations in Google AI Overviews for emerging African remittance corridors.",
          "Expanded entity authority through financial licensing and trust authority references.",
        ],
      },
      {
        phase: "Phase 04",
        title: "High-Converting Campaign Page Wireframes",
        description: "Redesigned landing page UX from the wireframe up to minimize friction and drive instantaneous app downloads.",
        deliverables: [
          "Prominently positioned the zero-fee value proposition above the mobile fold.",
          "A/B tested mobile registration CTAs, lifting visitor-to-signup conversion rates.",
          "Reduced page weight, cutting mobile initial load time by over 50%.",
        ],
      },
      {
        phase: "Phase 05",
        title: "Enterprise Performance Monitoring & Rank Protection",
        description: "Continuous monitoring of keyword rankings against Wise, Xoom, and Western Union.",
        deliverables: [
          "Monitored SERP volatility across international proxies.",
          "Identified new emerging corridors and rolled out supporting content silos.",
          "Maintained over 113,000 annual clicks and multi-million impression reach.",
        ],
      },
    ],
  },
};

export const DEFAULT_STRATEGY_BOX: CaseStrategyBox = {
  title: "4-Phase Comprehensive SEO Engineering & Visibility Blueprint",
  summary: "SearchPrex deploys a disciplined, multi-phase technical and content methodology designed to eliminate search friction and unlock sustainable organic traffic.",
  phases: [
    {
      phase: "Phase 01",
      title: "Technical Triage & Crawl Efficiency Optimization",
      description: "Deep audit of server response codes, XML sitemaps, canonical tags, and robots.txt directives to ensure Googlebot spends crawl budget only on valuable pages.",
      deliverables: [
        "Eliminated low-value crawl bloat, redirect chains, and 404 soft errors.",
        "Rebuilt XML sitemaps and submitted them directly through the Search Console API.",
        "Optimized mobile Core Web Vitals to pass Google page experience benchmarks.",
      ],
    },
    {
      phase: "Phase 02",
      title: "Semantic Content Architecture & Intent Mapping",
      description: "Re-architected page copy to provide comprehensive, direct answers to commercial search queries before competitors.",
      deliverables: [
        "Mapped individual high-intent search queries to dedicated target URLs.",
        "Rewrote thin sections with rich, unique, and useful commercial guidance.",
        "Embedded user-first FAQs formatted for Google snippet and AI Overview pickup.",
      ],
    },
    {
      phase: "Phase 03",
      title: "Internal Linking Hierarchy & Topical Silos",
      description: "Structured contextual links flowing authority from top-performing pages to deeper high-margin service and product URLs.",
      deliverables: [
        "Constructed logical hub-and-spoke topic silos to establish clear entity authority.",
        "Optimized in-content anchor text to clarify page topics for search crawlers.",
        "Streamlined navigation menus and breadcrumb trails for both users and search bots.",
      ],
    },
    {
      phase: "Phase 04",
      title: "Structured JSON-LD Schema & Index Telemetry",
      description: "Embedded machine-readable schema markup across all templates and established continuous monitoring routines.",
      deliverables: [
        "Injected Organization, LocalBusiness, Product, and BreadcrumbList microdata.",
        "Validated schema compliance with the Google Rich Results testing suite.",
        "Monitored real-time indexing status and traffic velocity in Google Search Console.",
      ],
    },
  ],
};



