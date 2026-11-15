/**
 * Single source of truth for SEO News categories.
 * Maps clean URL slugs to category metadata, display titles, and database/spoke filter keys.
 */

export interface NewsCategoryConfig {
  id: string; // The URL slug segment, e.g. "technical", "law-firm"
  name: string; // Display name
  tagLabel: string; // Compact tag
  filterKey: string; // Key used to match CMS & static spokes
  title: string; // SEO Page Title
  desc: string; // Meta description
  h1: string; // Primary page heading
  intro: string; // Lead paragraph
}

export const NEWS_CATEGORIES: Record<string, NewsCategoryConfig> = {
  "technical": {
    id: "technical",
    name: "Technical SEO News",
    tagLabel: "Technical",
    filterKey: "Technical",
    title: "Technical SEO News: Crawling, Indexing & CWV Updates (2026)",
    desc: "Core Web Vitals, rendering, crawling, and indexing news. Stay ahead of Google's technical SEO requirements and algorithm shifts.",
    h1: "Technical SEO News: Crawling, Indexing & Architecture",
    intro: "Crawling, rendering, indexing and Core Web Vitals — the changes that decide whether Google keeps your pages at all.",
  },
  "ai-geo": {
    id: "ai-geo",
    name: "AI & GEO News",
    tagLabel: "AI & GEO",
    filterKey: "AI Visibility",
    title: "AI Visibility & GEO News: Google AI Mode, Gemini, ChatGPT Search",
    desc: "Track AI Visibility news across Google AI Mode, AI Overviews, Gemini 4 Argon, ChatGPT search, and Generative Engine Optimization (GEO).",
    h1: "AI Visibility & GEO News Today",
    intro: "How Google AI Mode, AI Overviews, and answer engines select, cite, and rank brands across commercial and informational prompts.",
  },
  "ecommerce": {
    id: "ecommerce",
    name: "Ecommerce Store SEO News",
    tagLabel: "Ecommerce",
    filterKey: "Ecommerce",
    title: "Ecommerce Store SEO News: Retail Search Updates & Algorithm Changes (2026)",
    desc: "Latest Ecommerce SEO news, merchant center updates, shopping graph changes, and retail algorithm shifts that impact online stores in 2026.",
    h1: "Ecommerce Store SEO News & Merchant Updates",
    intro: "Merchant Center, Shopping Graph and product-search changes, read for what they do to indexed products and store revenue.",
  },
  "tools": {
    id: "tools",
    name: "SEO Tools & GSC News",
    tagLabel: "Tools & GSC",
    filterKey: "Tools",
    title: "SEO Tools & Search Console News: Latest Updates & Feature Changes (2026)",
    desc: "Stay updated on the newest SEO tools, feature releases, and technical marketing software updates. Find out what works best for technical and local SEO.",
    h1: "SEO Tools & Google Search Console News",
    intro: "Search Console, Google Business Profile and third-party tool changes, explained by what they let you measure that you could not before.",
  },
  "law-firm": {
    id: "law-firm",
    name: "Law Firm SEO News",
    tagLabel: "Law Firm",
    filterKey: "Law Firm",
    title: "Law Firm SEO News: Legal Search, LSA & Map Pack Updates (2026)",
    desc: "Latest Law Firm SEO news covering Google Business Profile for lawyers, Local Service Ads (LSAs), state bar entity signals, and legal AI Mode rankings.",
    h1: "Law Firm SEO News & Legal Map Pack Updates",
    intro: "Confirmed Google updates, Local Service Ads changes, and Map Pack shifts analyzed specifically for personal injury, trial, and multi-office law firms.",
  },
  "shopify-store": {
    id: "shopify-store",
    name: "Shopify Store SEO News",
    tagLabel: "Shopify Store",
    filterKey: "Shopify",
    title: "Shopify Store SEO News: Liquid Themes, Merchant Center & AI Checkout",
    desc: "Latest Shopify store SEO news, covering Google Merchant Center UCP checkout, /collections/ canonical updates, Liquid speed, and ecommerce search changes.",
    h1: "Shopify Store SEO News & Technical Releases",
    intro: "Shopify platform releases, Merchant Center Next integrations, and technical SEO updates that affect indexed SKUs and storefront revenue.",
  },
  "wordpress": {
    id: "wordpress",
    name: "WordPress & WooCommerce News",
    tagLabel: "WordPress & Woo",
    filterKey: "WordPress",
    title: "WordPress & WooCommerce SEO News: Core Releases, Security & CWV (2026)",
    desc: "Latest WordPress and WooCommerce SEO news, core security patches, Core Web Vitals updates, and structured data changes.",
    h1: "WordPress & WooCommerce SEO News",
    intro: "WordPress core updates, WooCommerce performance changes, and plugin vulnerabilities that affect crawling, rendering, and rankings.",
  },
  "usa": {
    id: "usa",
    name: "USA Regional & Local SEO News",
    tagLabel: "USA Regional",
    filterKey: "USA",
    title: "USA Search & Regional SEO News: TX, CA, NY, FL & Local Updates (2026)",
    desc: "Regional USA SEO news and local Map Pack volatility across Texas, California, New York, Florida, Arizona, Michigan, and Ohio.",
    h1: "USA Regional Search & Local SEO News Desk",
    intro: "US metro SERP telemetry, state-level Map Pack shifts, and Google Business Profile enforcement across major American markets.",
  },
};

export const NEWS_CATEGORY_SLUGS = Object.keys(NEWS_CATEGORIES);

/**
 * Maps query parameters, messy strings, or old pillar keys to clean category slugs.
 */
export function resolveToCategorySlug(raw?: string): string | undefined {
  if (!raw) return undefined;
  const s = raw.toLowerCase().trim();
  if (NEWS_CATEGORIES[s]) return s;
  if (s.includes("law") || s.includes("legal")) return "law-firm";
  if (s.includes("shopify")) return "shopify-store";
  if (s.includes("wordpress") || s.includes("woo")) return "wordpress";
  if (s.includes("usa") || s.includes("local")) return "usa";
  if (s.includes("geo") || s.includes("ai") || s.includes("llm") || s.includes("visibility") || s.includes("sge")) return "ai-geo";
  if (s.includes("ecom") || s.includes("retail")) return "ecommerce";
  if (s.includes("tool") || s.includes("console") || s.includes("gsc")) return "tools";
  if (s.includes("tech") || s.includes("crawl") || s.includes("index")) return "technical";
  return undefined;
}
