// lib/ecommerce-industries.ts
//
// Ecommerce SEO sub-pages — /services/ecommerce-seo/[industry].
//
// Two platforms and one niche, chosen because of what can be shown:
//   - woocommerce: both case-study stores (SMK Store, Michigan Sports &
//     Outdoor) run on WooCommerce.
//   - outdoor-knife-stores: both of them also sell knives and outdoor gear.
//   - shopify: no Shopify case study exists yet, and the page says so up
//     front (`honestNote`) instead of borrowing WooCommerce results.
//
// Figures on the pages are read from app/case-studies/data.ts by client slug,
// screenshots from app/case-studies/details.ts. Same shape as
// lib/local-industries.ts.
//
// No ecommerce location pages: a store sells nationwide, so "ecommerce SEO
// Dallas" pages would differ only by city name — doorway pages.

import type { QA } from "@/lib/local-industries";

export interface EcommerceIndustry {
  slug: string;
  name: string;
  h1: string;
  accent: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  /** Case study `client` slugs; empty where there is no case study yet. */
  caseClients: string[];
  /** Shown straight after the hero when the page has no case study of its own. */
  honestNote?: string;
  problems: Array<{ title: string; check: string; costs: string }>;
  capsules: QA[];
  included: Array<{ title: string; body: string }>;
  faqs: QA[];
}

export const ECOMMERCE_INDUSTRIES: EcommerceIndustry[] = [
  {
    slug: "woocommerce",
    name: "WooCommerce",
    h1: "WooCommerce SEO Services",
    accent: "with two stores to show for it",
    metaTitle: "WooCommerce SEO Services | Indexing, Product Content & Speed",
    metaDescription:
      "WooCommerce SEO for large catalogues: filter URLs, thin product copy, indexing and speed. SMK Store's monthly net sales went from $5,832 to $19,100 in two months.",
    heroSub:
      "Filter URLs Google crawls forever, manufacturer copy every dealer shares, plugins slowing every page. WooCommerce gives you full control — and full responsibility. I have fixed exactly this on two WooCommerce stores.",
    caseClients: ["smk-store", "michigan-outdoor-sports"],
    problems: [
      {
        title: "Filter and sort URLs Google crawls forever",
        check: "Search Google for site:yourstore.com inurl:filter_ and site:yourstore.com inurl:orderby. How many results come back?",
        costs: "Every attribute filter and sort order is a new URL. Google spends its visits there instead of on the products that sell.",
      },
      {
        title: "Manufacturer descriptions, copied",
        check: "Paste one sentence from a product page into Google, in quotes.",
        costs: "If dozens of other stores show the same text, Google picks one of them to rank — usually not yours.",
      },
      {
        title: "Crawled, but not indexed",
        check: "In Search Console, open Pages. How large is “Crawled – currently not indexed”?",
        costs: "On both stores in the case studies this ran into thousands of pages. A page that is not indexed cannot sell.",
      },
      {
        title: "Plugins slowing every template",
        check: "Run one product page through PageSpeed Insights, on mobile.",
        costs: "Each plugin can add scripts to every page. A slow product template is slow on every product at once.",
      },
    ],
    capsules: [
      {
        q: "How do you do SEO for a WooCommerce store?",
        a: "Start with what Google can reach: keep filter, sort and search URLs out of the crawl, and make sure the sitemap lists only pages worth indexing. Then give products, categories and brands copy of their own instead of the manufacturer's, fix template speed once for every product, and link brands, categories and products to each other deliberately.",
      },
      {
        q: "What results has SearchPrex got on WooCommerce?",
        a: "SMK Store's monthly net sales rose from $5,832 in April 2026 to $19,100 in June 2026, per its WooCommerce dashboard. Michigan Sports & Outdoor went from about 3,000 to 11,549 indexed pages, with US organic clicks up 83% in Search Console. Both are WooCommerce stores.",
      },
      {
        q: "Does WooCommerce add product schema by itself?",
        a: "Yes — WooCommerce outputs basic Product structured data on product pages, and SEO plugins add more. The work is checking it is complete (brand, price, availability, reviews where real) and that it matches what the page shows, because conflicting markup from several plugins is common.",
      },
    ],
    included: [
      { title: "Crawl control", body: "Filter, sort, search and pagination URLs handled so Google spends its visits on products and categories." },
      { title: "Product and brand copy at scale", body: "Thin and duplicate pages rewritten with SearchPrex's content autopilot, in batches, re-measured before the next batch." },
      { title: "Indexing recovery", body: "Sitemaps rebuilt, pages resubmitted in batches and tracked in Search Console until they are indexed." },
      { title: "Template speed", body: "Plugin and theme load cut at the template, so every product page gets faster at once." },
      { title: "Structured data", body: "One clean set of Product, Offer and Breadcrumb markup instead of several plugins competing." },
      { title: "Monday reporting", body: "Indexed pages, clicks, revenue signals and what changed." },
    ],
    faqs: [
      {
        q: "Yoast or Rank Math?",
        a: "Either works. How it is configured — which page types are indexed, what goes in the sitemap — matters far more than which plugin is installed.",
      },
      {
        q: "What access do you need?",
        a: "An admin or shop-manager account on WordPress and Search Console access. Template changes are tested on a staging copy first where the host provides one.",
      },
      {
        q: "How long before results show?",
        a: "SMK Store's revenue moved within two months; Michigan Sports & Outdoor's indexing recovery took several months after a de-indexing event. It depends on catalogue size and how deep the problems go — the free tear-down gives you a realistic read.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
  {
    slug: "shopify",
    name: "Shopify",
    h1: "Shopify SEO Services",
    accent: "with a straight answer up front",
    metaTitle: "Shopify SEO Services | Collections, Apps, Speed & Product Content",
    metaDescription:
      "Shopify SEO for growing stores: duplicate collection URLs, app scripts, tag pages and thin product copy — with a plain answer on what has and hasn't been done on Shopify.",
    heroSub:
      "Shopify handles hosting and the basics well. What it leaves to you: duplicate collection URLs, app scripts on every page, tag pages Google shouldn't index, and product copy half the internet also has.",
    caseClients: [],
    honestNote:
      "SearchPrex does not have a Shopify case study yet — both stores in our case studies run on WooCommerce. The problems that held them back (thin and duplicate product copy, pages not indexed, slow templates) are the same on Shopify; the fixes are made in the theme and apps instead of plugins. If you would like to be the first Shopify case study, the tear-down is free and tells you exactly what I would change.",
    problems: [
      {
        title: "The same product under many URLs",
        check: "Open a product from a collection page. Does the address read /collections/…/products/…?",
        costs: "Shopify points those to /products/ with a canonical tag, but a theme that links to the long version still spreads crawling across duplicates.",
      },
      {
        title: "Apps loading on every page",
        check: "List your installed apps, then check which ones still load scripts — including apps you have removed.",
        costs: "Removed apps can leave code in the theme, and every script slows every page.",
      },
      {
        title: "Tag and filter pages in Google",
        check: "Search Google for site:yourstore.com/collections and look for tag or filter pages.",
        costs: "Tag and filter combinations create thin, near-duplicate collections that compete with your real ones.",
      },
      {
        title: "Manufacturer and theme copy",
        check: "Paste one sentence from a product page into Google, in quotes.",
        costs: "Copy shared with other stores gives Google no reason to rank yours.",
      },
    ],
    capsules: [
      {
        q: "Is Shopify good for SEO?",
        a: "Its defaults are solid: fast hosting, SSL, an automatic sitemap and canonical tags. Its limits are the fixed /products/ and /collections/ URL prefixes, a sitemap you cannot edit directly, and robots.txt changes made only through the robots.txt.liquid template. Most Shopify SEO problems come from themes, apps and copy rather than the platform itself.",
      },
      {
        q: "Does SearchPrex have Shopify case studies?",
        a: "Not yet. The published case studies are WooCommerce stores. The catalogue-level work — unique product copy, indexing, speed, structured data — carries over; the platform-specific fixes are different, and I say so rather than borrow results.",
      },
      {
        q: "How is Shopify SEO different from WooCommerce SEO?",
        a: "Where the fixes happen. On Shopify they are made in the Liquid theme, in apps and in robots.txt.liquid; on WooCommerce in plugins, permalinks and the server. The problems — duplicate URLs, thin copy, slow templates — are largely the same.",
      },
    ],
    included: [
      { title: "Theme audit", body: "Internal links pointed at canonical /products/ URLs, headings and templates checked in the Liquid theme." },
      { title: "App and script cleanup", body: "Leftover code from removed apps found and taken out; the scripts that stay loaded only where needed." },
      { title: "Crawl rules", body: "Tag, filter and search pages handled through robots.txt.liquid and noindex where they add nothing." },
      { title: "Collection and product copy", body: "Collection pages that explain the range, and product copy written for your store rather than shared with every reseller." },
      { title: "Structured data check", body: "The theme's Product markup checked for price, availability and brand — and fixed where apps duplicate it." },
      { title: "Monday reporting", body: "Indexed pages, clicks and what changed." },
    ],
    faqs: [
      {
        q: "Can you remove /products/ or /collections/ from my URLs?",
        a: "No — Shopify fixes those prefixes, and they do not stop a store ranking. The work goes into what those pages contain and how they link to each other.",
      },
      {
        q: "What access do you need?",
        a: "A collaborator account, which you approve from your Shopify admin — no need to share your password — plus Search Console access.",
      },
      {
        q: "Can you help with a migration to or from Shopify?",
        a: "Yes, on the SEO side: a full redirect map from old URLs to new, and checks after launch. Development work is handled with a partner where needed.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
  {
    slug: "outdoor-knife-stores",
    name: "Knife & Outdoor Stores",
    h1: "SEO for Knife & Outdoor Stores",
    accent: "from someone who has done it twice",
    metaTitle: "SEO for Knife & Outdoor Stores | Brand Pages, Specs & Indexing",
    metaDescription:
      "Ecommerce SEO for knife, tactical and outdoor gear stores. Both SearchPrex case studies are knife and outdoor retailers — one grew monthly net sales from $5,832 to $19,100.",
    heroSub:
      "Brand pages with nothing on them, the same manufacturer copy as every other dealer, and ads Google won't let you run for some knives. Both stores in my case studies sell knives and outdoor gear — this is the niche I know best.",
    caseClients: ["smk-store", "michigan-outdoor-sports"],
    problems: [
      {
        title: "Brand pages with nothing on them",
        check: "Open the page for your best-selling brand. Is there anything on it besides a product grid?",
        costs: "Knife buyers search by brand and model. A bare grid gives Google nothing to rank for those searches.",
      },
      {
        title: "The same copy as every dealer",
        check: "Paste one sentence from a product page into Google, in quotes.",
        costs: "Hundreds of dealers carry the same brands with the same manufacturer text. Google ranks one of them — rarely the one that copied last.",
      },
      {
        title: "Specs buried or missing",
        check: "Can a shopper see blade steel, blade length, lock type and weight without scrolling?",
        costs: "Buyers compare on specs, and so do their searches — steel, lock type, blade shape.",
      },
      {
        title: "Ads you can't run",
        check: "Have Google Ads or Merchant Center rejected any of your knife products?",
        costs: "Google's ad policies restrict some knife types, such as switchblades and butterfly knives, so organic search has to carry more of the traffic.",
      },
    ],
    capsules: [
      {
        q: "How do knife and outdoor stores rank on Google?",
        a: "Brand pages with real content, not just a grid; categories built around how people shop — lock type, steel, use; product copy of your own with the specs up front; and clean Product structured data. Because hundreds of dealers carry the same brands, what makes a store's page different is what it ranks on.",
      },
      {
        q: "What results has SearchPrex got for knife and outdoor stores?",
        a: "Both SearchPrex ecommerce case studies are knife and outdoor retailers. SMK Store's monthly net sales rose from $5,832 to $19,100 between April and June 2026. Michigan Sports & Outdoor went from about 3,000 to 11,549 indexed pages, with US organic clicks up 83%.",
      },
      {
        q: "Why does organic search matter more for knife stores?",
        a: "Google's ad policies restrict promoting some knife types, which limits paid search and Shopping for part of the catalogue. Searches in this niche are also heavily brand- and model-led, which organic pages can win directly.",
      },
    ],
    included: [
      { title: "Brand pages", body: "Every brand you carry gets a page worth ranking — what the maker is known for, its lines, and how to choose between them." },
      { title: "Category structure", body: "Categories built around how knife and gear buyers shop: lock type, steel, blade shape and use." },
      { title: "Product copy at scale", body: "SearchPrex's content autopilot rewrites thin product pages with the specs kept accurate — tested on catalogues of tens of thousands of products." },
      { title: "Indexing recovery", body: "Thousands of crawled-but-not-indexed pages brought back in batches, as on both case-study stores." },
      { title: "Buying guides", body: "Steel comparisons, lock types and care guides — the questions buyers search before they pick a knife." },
      { title: "Monday reporting", body: "Indexed pages, clicks, revenue signals and what changed." },
    ],
    faqs: [
      {
        q: "Do you only work with knife stores?",
        a: "No — outdoor, hunting, camping and tactical gear stores too, and any specialist catalogue where many dealers sell the same brands.",
      },
      {
        q: "How large a catalogue can you handle?",
        a: "SMK Store has more than 35,000 products. The content autopilot and batch indexing were built for catalogues that size.",
      },
      {
        q: "Will the rewritten copy keep our specs accurate?",
        a: "Yes. Specs come from your product data and are checked, not generated; the writing is what changes.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month to month, with the free tear-down first.",
      },
    ],
  },
];

export function getEcommerceIndustry(slug: string): EcommerceIndustry | undefined {
  return ECOMMERCE_INDUSTRIES.find((i) => i.slug === slug);
}
