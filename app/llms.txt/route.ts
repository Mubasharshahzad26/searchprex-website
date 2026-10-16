// ─────────────────────────────────────────────────────────────────────────────
//  /llms.txt — the brand summary and page index AI assistants read
//
//  This used to be a hand-written file in /public. It fell behind the site —
//  ten location pages listed while the Kansas hub, its eight cities, Tempe,
//  Scottsdale and the newer service spokes were missing — and it carried a
//  credential that is not real ("Certified Senior SEO Analyst"; the founder's
//  certifications are Semrush and HubSpot). It is now built from the same data
//  the pages and the sitemap use, so a new page appears here without an edit.
//
//  Only verified facts go in the header. Case studies are listed by client and
//  type, without figures: their numbers are on the pages, where each one
//  carries its own period and source.
// ─────────────────────────────────────────────────────────────────────────────

import { db } from "@/lib/db";
import { caseStudies, detailUrl } from "../case-studies/data";
import { posts as blogPosts } from "../blog/data";
import { CITY_PAGES } from "@/lib/city-pages";
import { kansasCities } from "@/lib/kansas-cities";
import { KANSAS_SEO_CITIES } from "@/lib/kansas-seo-cities";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { isLocationIndexable } from "@/lib/location-indexing";
import { getDynamicStateHubSlugs, getLocationState } from "@/lib/locations";

export const revalidate = 3600;

const SITE = "https://www.searchprex.com";

const link = (title: string, path: string, desc?: string) =>
  `- [${title}](${SITE}${path})${desc ? `: ${desc.replace(/\s+/g, " ").trim()}` : ""}`;

const SERVICES: Array<[string, string, string]> = [
  ["All SEO Services", "/services", "Overview of SearchPrex technical, local, law firm, ecommerce and AI search SEO services."],
  ["Law Firm SEO", "/services/law-firm-seo", "SEO for personal injury, family law, criminal defense and other practices: Map Pack, practice-area pages and AI answer visibility."],
  ["Google Business Profile for Lawyers", "/services/law-firm-seo/google-business-profile-for-lawyers", "Profile setup, categories, reviews and suspension prevention for law firms."],
  ["Ecommerce SEO", "/services/ecommerce-seo", "Shopify and WooCommerce SEO: indexing, category architecture and product pages."],
  ["Product Page SEO", "/services/ecommerce-seo/product-page-seo", "Product titles, descriptions, schema and thin or duplicate content fixes."],
  ["Local SEO", "/services/local-seo", "Google Business Profile, citations and Map Pack visibility for local businesses."],
  ["Google Business Profile Optimization", "/services/local-seo/google-business-profile-optimization", "Categories, services, photos, posts and reviews on Google Business Profile."],
  ["Suspended Google Business Profile Recovery", "/services/local-seo/google-business-profile-suspended", "Diagnosing and appealing suspended Google Business Profiles."],
  ["Technical SEO", "/services/technical-seo", "Crawling, rendering, Core Web Vitals and site architecture."],
  ["Technical SEO Audit", "/services/technical-seo/technical-seo-audit", "A full technical audit with a prioritised fix list."],
  ["Indexing Recovery", "/services/technical-seo/indexing-recovery", "Getting pages that Google skips crawled and indexed again."],
  ["AI Search Optimization (GEO & AEO)", "/ai-search", "Visibility in Google AI Mode, AI Overviews, ChatGPT, Gemini and Perplexity."],
];

const PLATFORM_HUBS: Array<[string, string, string]> = [
  ["01. SEO & Industry News Desk", "/resources/news", "Dated, source-verified coverage across Core SEO News, Law Firm SEO News, Ecommerce Store SEO News, Shopify Store News, WordPress News, AI Visibility News, and USA Search News."],
  ["02. SEO, Industry & US Regional Discussion Forum", "/resources/discussions", "Open technical Q&A and community discussion threads across SEO, Law Firms, Ecommerce, Shopify, WordPress, AI Search, and US regional markets (New York, Texas, California, Dallas, Orlando, Arizona)."],
  ["03. SEO & Platform Issues & Solutions Library", "/resources/solutions", "Root-cause diagnostics and production-ready code fixes for Google Search Console indexing errors, Law Firm GBP suspensions, Ecommerce faceted navigation, Shopify Liquid canonicalization, and WordPress Core Web Vitals."],
  ["04. SEO Learning Hub & Industry Playbooks", "/resources/learning-hub", "Structured 20-module curriculum and interactive readiness checklists across Core SEO, Law Firm SEO, Ecommerce Store SEO, Shopify Store SEO, and WordPress SEO."],
];

const CHECKLISTS_AND_RESOURCES: Array<[string, string, string]> = [
  ["All SEO Resources", "/resources", "Central directory of SearchPrex checklists, playbooks, news, discussions, and technical guides."],
  ["55-Point Technical SEO Audit Checklist", "/resources/technical-seo-checklist", "Interactive checklist covering crawling, indexing, canonicalization, rendering, Core Web Vitals, and structured data."],
  ["Law Firm SEO Audit Checklist", "/resources/law-firm-seo-audit-checklist", "Complete legal SEO, practice-area architecture, state bar entity, and Google Business Profile audit checklist."],
  ["WooCommerce & Ecommerce SEO Checklist", "/resources/woocommerce-seo-checklist", "Technical and on-page checklist for WooCommerce and online stores."],
  ["Google Business Profile Optimization Checklist", "/resources/google-business-profile-checklist", "Step-by-step local Map Pack and GBP verification checklist."],
  ["Google Search Console Regex Library", "/resources/gsc-regex-library", "Copy-paste RE2 regular expressions for filtering Search Console queries and URLs."],
  ["Case Studies", "/case-studies", "Client results with the period and source of each figure."],
  ["SEO Blog & Deep-Dive Guides", "/blog", "In-depth guides on law firm, ecommerce, local, technical, and AI search SEO."],
  ["Free SEO Audit", "/free-audit", "Request a founder-reviewed technical and growth SEO audit of your site."],
  ["Pricing", "/pricing", "Transparent SEO retainer tiers and deliverables."],
  ["Why SearchPrex", "/why-us", "How the agency works, what it guarantees and what it does not."],
  ["Meet Our SEO Experts", "/experts", "Background on the technical SEO and growth specialists behind SearchPrex."],
  ["About SearchPrex", "/about", "The founder and the remote-first, US-focused model."],
  ["Frequently Asked Questions", "/faq", "Answers to common questions about SearchPrex deliverables, timelines, and guarantees."],
];

const FREE_TOOLS: Array<[string, string, string]> = [
  ["All Free SEO Tools", "/tools", "Interactive technical SEO, SERP, and schema utilities built by SearchPrex."],
  ["Live Google SERP Checker", "/tools/serp-checker", "Check real-time Google search rankings by location and device."],
  ["llms.txt & AI Bot Generator", "/tools/llms-txt-generator", "Generate compliant llms.txt files and AI crawler directives for GPTBot, PerplexityBot, ClaudeBot, and Google-Extended."],
  ["Schema Markup Generator", "/tools/schema-generator", "Generate validated JSON-LD structured data for LocalBusiness, LegalService, Product, FAQPage, and Article."],
  ["Google SERP Simulator", "/tools/serp-simulator", "Preview desktop and mobile Google title tags and meta descriptions by pixel width."],
  ["Law Firm Keyword Research Tool", "/tools/keyword-research", "Explore high-intent legal practice-area and city keyword combinations."],
  ["AI Legal Intake Assistant", "/intake-assistant", "Interactive AI intake workflow demo for law firms."],
  ["Law Firm Lost Case Calculator", "/case-calculator", "Estimate missed case revenue from uncaptured local Map Pack and organic legal search demand."],
];

function locationLines(): string[] {
  const lines: string[] = [];
  const kansasHub = "/locations/kansas";
  lines.push(link("Law Firm SEO in Kansas", kansasHub, "State hub for Kansas law firm SEO."));
  for (const k of kansasCities) {
    const path = `/locations/kansas/${k.slug}`;
    if (isLocationIndexable(path)) lines.push(link(`Law Firm SEO in ${k.name}, KS`, path, k.metaDescription));
  }
  for (const s of KANSAS_SEO_CITIES) {
    lines.push(link(`SEO Services in ${s.name}, KS`, `/locations/kansas/${s.slug}/seo-services`));
  }
  for (const slug of getDynamicStateHubSlugs()) {
    const state = getLocationState(slug);
    if (state && slug !== "kansas") lines.push(link(`Law Firm SEO in ${state.name}`, `/locations/${slug}`, `State hub for ${state.name}.`));
  }
  for (const c of CITY_PAGES) {
    const path = `/locations/${c.stateSlug}/${c.citySlug}`;
    if (isLocationIndexable(path)) lines.push(link(`Law Firm SEO in ${c.city}, ${c.stateAbbr}`, path, c.metaDescription));
  }
  return lines;
}

export async function GET() {
  let newsLines: string[] = [];
  try {
    const spokes = await db.marketingBlog.findMany({
      where: { published: true, category: { contains: "News", mode: "insensitive" } },
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, excerpt: true, metaDescription: true },
    });
    newsLines = spokes.map((s) =>
      link(s.title, `/resources/news/${s.slug}`, s.metaDescription || s.excerpt || undefined)
    );
  } catch (err) {
    console.error("[llms.txt] Could not load dynamic news spokes:", err);
  }

  const body = [
    "# SearchPrex",
    "",
    "> SearchPrex is a remote-first, founder-led SEO agency and 4-pillar search intelligence platform serving clients across the United States. It specialises in law firm SEO, ecommerce SEO (Shopify and WooCommerce), local SEO and Google Business Profile, technical SEO, and AI search visibility (GEO/AEO).",
    "",
    "## Founder",
    "- **Founder:** Mubashar Sharif",
    "- **Certifications:** Semrush, HubSpot",
    "- **Focus:** Technical SEO, Google indexing recovery, Google Business Profile, E-E-A-T and AI search visibility",
    "",
    "## How SearchPrex works",
    "- Works US business hours; weekly reporting every Monday.",
    "- One client per city (for law firms, per city and practice area).",
    "- 90-day guarantee: if there is no measurable progress (rankings, traffic or leads) within 90 days, work continues at no extra cost, or the fees for those 90 days are refunded. Rankings are never guaranteed.",
    "",
    "## 4-Pillar Intelligence & Community Platform",
    ...PLATFORM_HUBS.map(([t, p, d]) => link(t, p, d)),
    "",
    "## Services",
    ...SERVICES.map(([t, p, d]) => link(t, p, d)),
    "",
    "## Law Firm SEO by Practice Area",
    ...INDUSTRY_PAGES.map((p) => link(p.name, `/services/law-firm-seo/${p.slug}`, p.metaDescription)),
    "",
    "## Local SEO by Industry",
    ...LOCAL_INDUSTRIES.map((p) => link(p.name, `/services/local-seo/${p.slug}`, p.metaDescription)),
    "",
    "## Ecommerce SEO by Platform and Niche",
    ...ECOMMERCE_INDUSTRIES.map((p) => link(p.name, `/services/ecommerce-seo/${p.slug}`, p.metaDescription)),
    "",
    "## Free SEO Tools & Calculators",
    ...FREE_TOOLS.map(([t, p, d]) => link(t, p, d)),
    "",
    "## Checklists & Resources",
    ...CHECKLISTS_AND_RESOURCES.map(([t, p, d]) => link(t, p, d)),
    ...(newsLines.length > 0
      ? [
          "",
          "## Latest SEO News & Google Update Analyses",
          ...newsLines,
        ]
      : []),
    "",
    "## Technical & Industry SEO Guides (Blog)",
    ...blogPosts.map((post) => link(post.title, `/blog/${post.slug}`, post.excerpt)),
    "",
    "## Locations",
    link("All locations", "/locations"),
    ...locationLines(),
    "",
    "## Case Studies",
    ...caseStudies.map((cs) => link(`${cs.client} — ${cs.seoType}`, detailUrl(cs), `${cs.industry}${cs.location ? `, ${cs.location}` : ""}`)),
    "",
    "## Sitemaps",
    `- [Main XML Sitemap](${SITE}/sitemap.xml)`,
    `- [Google News XML Sitemap](${SITE}/news-sitemap.xml)`,
    `- [Image XML Sitemap](${SITE}/image-sitemap.xml)`,
    "",
    "## Contact",
    "- **Email:** contact@searchprex.com",
    "- **Phone:** +92 305 9158010",
    "- **Address:** Mohalla Raham Colony, Near Altaf Cold Storage, Opposite Chungi No. 1, Daska, Punjab 51010, Pakistan",
    `- **Website:** ${SITE}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
