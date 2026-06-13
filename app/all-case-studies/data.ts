// app/case-studies/data.ts
// Single source of truth for case studies. The hub page (page.tsx),
// the filter bar, and the future detail pages all read from here.
 
export type SeoType = "Ecommerce SEO" | "Local SEO" | "Technical SEO" | "Law Firm SEO";
 
export interface Metric {
  v: string;
  l: string;
}
 
export interface CaseStudy {
  id: number;
  client: string;
  seoType: SeoType;
  industry: string;
  location: string;
  headline: string;
  metrics: Metric[];
  video?: string; // YouTube id
  image?: string;
  featured: boolean;
  badgeColor: string;
  badgeBg: string;
  // Detail page URL parts -> /case-studies/[industry]/[client]
  slug: { industry: string; client: string };
  // Full story (used on featured cards + detail page)
  challenge?: string;
  solution?: string;
  outcome?: string;
}
 
export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: "SMK Store",
    seoType: "Ecommerce SEO",
    industry: "Ecommerce",
    location: "United States",
    headline: "+75% US revenue in 2 months by fixing mass non-indexing across a 35,000-product catalog.",
    badgeColor: "#0891b2",
    badgeBg: "#ecfeff",
    video: "gFod-dTY-bg",
    featured: true,
    slug: { industry: "ecommerce", client: "smk-store" },
    metrics: [
      { v: "+75%", l: "US revenue" },
      { v: "+285%", l: "Indexing rate" },
      { v: "12K+", l: "Pages indexed" },
    ],
    challenge:
      "SMK Store's 35,000+ product pages were barely indexed. Thin, near-identical boilerplate descriptions triggered Google's duplicate-content filters, Core Web Vitals were failing, and US organic revenue had stalled.",
    solution:
      "We rewrote product content brand by brand with unique, people-first descriptions, optimized crawl budget, implemented product schema, fixed Core Web Vitals, and resubmitted pages to GSC in batches — aligned with Google's 2026 Helpful Content standards.",
    outcome:
      "Indexing rate jumped +285%, over 12,000 product pages got indexed and started ranking, and US revenue grew 75% within two months — with no additional ad spend. All verified via Google Search Console.",
  },
  {
    id: 2,
    client: "Local HVAC Services",
    seoType: "Local SEO",
    industry: "HVAC",
    location: "United States",
    headline: "Top 3 map pack and a Google AI Overview placement — from zero local visibility in 60 days.",
    badgeColor: "#059669",
    badgeBg: "#ecfdf5",
    video: "g_1TfDU4YeA",
    featured: true,
    slug: { industry: "hvac", client: "local-hvac-services" },
    metrics: [
      { v: "Top 3", l: "Maps pack" },
      { v: "Featured", l: "AI Overview" },
      { v: "+5.7x", l: "Organic calls" },
    ],
    challenge:
      "A local HVAC service business had no map pack presence, no 'near me' rankings, and zero visibility in Google's new AI Overview results for high-intent emergency service searches.",
    solution:
      "We fully optimized the Google Business Profile, fixed NAP consistency across 50+ directories, built service-area landing pages, launched a review generation program, and structured content to be cited in AI Overviews.",
    outcome:
      "The business reached the top 3 Google Maps pack for its primary service keywords, earned a featured AI Overview placement, and grew organic clicks 5.7x in 60 days — driving consistent inbound calls.",
  },
  {
    id: 3,
    client: "Michigan Outdoor Sports",
    seoType: "Technical SEO",
    industry: "Ecommerce",
    location: "Michigan, USA",
    headline: "+476% organic clicks and +285% indexing rate — recovered from near-zero GSC visibility.",
    badgeColor: "#185FA5",
    badgeBg: "#E6F1FB",
    video: "Y5PxSECNGP0",
    featured: true,
    slug: { industry: "ecommerce", client: "michigan-outdoor-sports" },
    metrics: [
      { v: "+476%", l: "Organic clicks" },
      { v: "+285%", l: "Indexing rate" },
      { v: "12K+", l: "Pages indexed" },
    ],
    challenge:
      "Brand pages were never properly submitted to GSC, thin content caused mass non-indexing, and crawl budget was being wasted — leaving thousands of pages invisible despite being a real physical business.",
    solution:
      "We submitted sitemaps directly to GSC, fixed indexation blocks and crawl waste, rewrote brand pages with unique content, and resubmitted in batches — backed by a Michigan-specific local keyword strategy.",
    outcome:
      "+476% organic clicks and a +285% indexing rate within 90 days — 12,000+ pages indexed from near-zero, CTR well above industry average, with no ad spend.",
  },
  {
    id: 4,
    client: "Doll's Cleaning",
    seoType: "Local SEO",
    industry: "Cleaning",
    location: "Chesterfield, MI",
    headline: "Ranked #1 local for core cleaning keywords with 106K impressions.",
    badgeColor: "#7c3aed",
    badgeBg: "#f3e8ff",
    image: "/images/dolls-cleaning-ranking.JPG",
    featured: false,
    slug: { industry: "cleaning", client: "dolls-cleaning" },
    challenge:
      "A local cleaning company in Chesterfield, MI was invisible for high-intent searches like 'house cleaning near me' — no map pack presence, an underused Google Business Profile, and a website with no service-area targeting.",
    solution:
      "We fully optimized the Google Business Profile, built dedicated service-area pages, fixed on-page local SEO signals, cleaned up citations, and set up a steady review-generation cadence.",
    outcome:
      "The business reached #1 local rankings for its core cleaning keywords, generating 106K impressions and +264 clicks — driving consistent inbound calls. All verified in Google Search Console.",
    metrics: [
      { v: "#1", l: "Local ranking" },
      { v: "+264", l: "Clicks" },
      { v: "106K", l: "Impressions" },
    ],
  },
  {
    id: 5,
    client: "Mammoth Roofing",
    seoType: "Local SEO",
    industry: "Roofing",
    location: "Texas",
    headline: "+210 monthly clicks and top-6 positions for competitive roofing terms.",
    badgeColor: "#ea580c",
    badgeBg: "#fef3c7",
    image: "/images/mammoth-roofing-gsc.JPG",
    featured: false,
    slug: { industry: "roofing", client: "mammoth-roofing" },
    challenge:
      "In Texas's hyper-competitive roofing market, Mammoth Roofing was stuck beyond page one for every revenue keyword, with thin service pages and weak local signals.",
    solution:
      "We mapped keywords across roofing services, built location-targeted landing pages, fixed technical SEO issues, and published content aligned with what Texas homeowners actually search for.",
    outcome:
      "Top-6 positions for competitive roofing terms, +210 monthly clicks and 45K impressions — measurable lead growth without ad spend. Verified in Google Search Console.",
    metrics: [
      { v: "+210", l: "Monthly clicks" },
      { v: "45K", l: "Impressions" },
      { v: "Top 6", l: "Position" },
    ],
  },
  {
    id: 6,
    client: "Carpet Cleaning",
    seoType: "Local SEO",
    industry: "Cleaning",
    location: "Clawson, MI",
    headline: "Ranked #1 local with a +95% jump in search visibility.",
    badgeColor: "#0369a1",
    badgeBg: "#e0f2fe",
    image: "/images/carpet-cleaning-service.JPG",
    featured: false,
    slug: { industry: "cleaning", client: "carpet-cleaning" },
    challenge:
      "A Clawson, MI carpet cleaning service had near-zero visibility, losing local customers to national directories that dominated every search result.",
    solution:
      "We rebuilt on-page local SEO, optimized the Google Business Profile, fixed citations, and created content targeting Clawson and surrounding areas.",
    outcome:
      "#1 local position for primary keywords and a +95% jump in search visibility — putting the business ahead of the directories. Verified in Google Search Console.",
    metrics: [
      { v: "#1", l: "Position" },
      { v: "+95%", l: "Visibility" },
      { v: "Top", l: "Local pack" },
    ],
  },
  {
    id: 7,
    client: "Door Doctor",
    seoType: "Local SEO",
    industry: "Home Services",
    location: "Multiple Locations",
    headline: "490+ monthly profile interactions and +78% more profile views.",
    badgeColor: "#059669",
    badgeBg: "#ecfdf5",
    image: "/images/door-doctor-google-my-business.JPG",
    featured: false,
    slug: { industry: "home-services", client: "door-doctor" },
    challenge:
      "A multi-location door repair business had inconsistent Google Business Profiles across locations — mismatched info, no posting cadence, and stagnant profile engagement.",
    solution:
      "We standardized NAP data across every location, optimized each Google Business Profile, and set up a posting and review strategy to keep profiles active.",
    outcome:
      "490+ monthly profile interactions and +78% more profile views across locations — turning dormant profiles into a steady lead source.",
    metrics: [
      { v: "490", l: "Interactions" },
      { v: "+78%", l: "Profile views" },
      { v: "Active", l: "GBP" },
    ],
  },
  {
    id: 8,
    client: "Kitchen Cabinets",
    seoType: "Local SEO",
    industry: "Remodeling",
    location: "Glendora, CA",
    headline: "Top-10 rankings for high-intent kitchen remodel keywords.",
    badgeColor: "#7c3aed",
    badgeBg: "#f3e8ff",
    video: "zRcTc2HqDwU",
    featured: false,
    slug: { industry: "remodeling", client: "kitchen-cabinets" },
    challenge:
      "A kitchen remodeling business in Glendora, CA had no rankings for remodel and cabinet keywords, relying entirely on referrals in a market full of established competitors.",
    solution:
      "We ran keyword research focused on high-intent local remodel terms, rebuilt on-page SEO, and created locally-targeted content for Glendora and nearby cities.",
    outcome:
      "Top-10 rankings for 5+ high-intent kitchen remodel keywords — the business now appears where homeowners are actively searching.",
    metrics: [
      { v: "Top 10", l: "Rankings" },
      { v: "+5", l: "Keywords" },
      { v: "Local", l: "Focus" },
    ],
  },
  {
    id: 9,
    client: "HVAC Team",
    seoType: "Local SEO",
    industry: "HVAC",
    location: "Simi Valley, CA",
    headline: "Jumped 40 positions to page one for primary service keywords.",
    badgeColor: "#dc2626",
    badgeBg: "#fee2e2",
    image: "/images/hvac-ranking.JPG",
    featured: false,
    slug: { industry: "hvac", client: "hvac-team" },
    challenge:
      "An HVAC company in Simi Valley, CA was buried on pages 4–5 for its primary service keywords — effectively invisible to local customers.",
    solution:
      "We cleaned up technical SEO issues, rebuilt the core service pages, and strengthened local relevance signals for Simi Valley searches.",
    outcome:
      "A +40 position jump to page one for primary keywords, with CTR improving as rankings climbed. Verified in Google Search Console.",
    metrics: [
      { v: "+40", l: "Position jump" },
      { v: "Page 1", l: "Ranking" },
      { v: "+0.5%", l: "CTR" },
    ],
  },
  {
    id: 10,
    client: "Remit Choice Hub",
    seoType: "Technical SEO",
    industry: "SaaS",
    location: "Global",
    headline: "AI-powered financial information hub ranked for 500+ remittance keywords with instant answer optimization.",
    badgeColor: "#185FA5",
    badgeBg: "#E6F1FB",
    video: "La-BCpoxcII",
    featured: false,
    slug: { industry: "saas", client: "remit-choice-hub" },
    metrics: [
      { v: "500+", l: "Keywords ranked" },
      { v: "AI Overview", l: "Featured" },
      { v: "100+", l: "Instant answers" },
    ],
    challenge: "Remit Choice Hub is an AI-powered information platform helping users find instant answers about money transfers, exchange rates, and remittance services.",
    solution: "We architected the information hub for featured snippets and AI Overview eligibility.",
    outcome: "The hub now ranks organically for 500+ financial information keywords.",
  },
];
 
// ── Helpers ──────────────────────────────────────────────────────────────
 
export const detailUrl = (cs: CaseStudy) =>
  `/case-studies/${cs.slug.industry}/${cs.slug.client}`;
 
// Filter options are DERIVED from the data, so a category never shows up empty.
export const seoTypeOptions = (): SeoType[] =>
  Array.from(new Set(caseStudies.map((c) => c.seoType)));
 
export const industryOptions = (): string[] =>
  Array.from(new Set(caseStudies.map((c) => c.industry))).sort();
 
export const featuredStudies = () => caseStudies.filter((c) => c.featured);
 
export const findBySlug = (industry: string, client: string) =>
  caseStudies.find(
    (c) => c.slug.industry === industry && c.slug.client === client
  );
 
// ── FAQ content ──────────────────────────────────────────────────────────
// Lives here (server-safe) so both page.tsx (FAQPage schema) and
// CaseStudiesClient.tsx (FAQ accordion) can import it. It must NOT live in
// a "use client" file, or server imports of it break at build time.
export const FAQS: Array<{ q: string; a?: string; [key: string]: any }> = [
  {
    q: "How long does it take to see SEO results?",
    a: "It depends on the starting point, but across these case studies indexing and visibility recovery typically lands in 60–90 days, with compounding growth after that. We share progress against real Google Search Console data every month.",
  },
  {
    q: "Is the data in these case studies real?",
    a: "Yes. Every result is verified with Google Search Console — clicks, impressions, indexing and rankings. Several featured studies include live screen recordings of the GSC data, not edited screenshots.",
  },
  {
    q: "Which industries and SEO types do you cover?",
    a: "Ecommerce, local services, technical and law firm SEO across both US and international markets. Use the filters above to see results for a specific SEO type or industry.",
  },
  {
    q: "Who actually works on my account?",
    a: "The founder leads every account — no juniors, no outsourced fluff. You work directly with the person who built the strategies behind these results.",
  },
];
 