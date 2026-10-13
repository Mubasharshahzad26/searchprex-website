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

import { caseStudies, detailUrl } from "../case-studies/data";
import { CITY_PAGES } from "@/lib/city-pages";
import { kansasCities } from "@/lib/kansas-cities";
import { KANSAS_SEO_CITIES } from "@/lib/kansas-seo-cities";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { isLocationIndexable } from "@/lib/location-indexing";
import { getDynamicStateHubSlugs, getLocationState } from "@/lib/locations";

export const dynamic = "force-static";

const SITE = "https://www.searchprex.com";

const link = (title: string, path: string, desc?: string) =>
  `- [${title}](${SITE}${path})${desc ? `: ${desc.replace(/\s+/g, " ").trim()}` : ""}`;

const SERVICES: Array<[string, string, string]> = [
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
  ["AI Search Optimization", "/ai-search", "Visibility in Google AI Overviews, ChatGPT, Gemini and Perplexity."],
];

const RESOURCES: Array<[string, string, string]> = [
  ["Case Studies", "/case-studies", "Client results with the period and source of each figure."],
  ["SEO News", "/resources/news", "Dated, sourced breakdowns of Google updates and AI search changes."],
  ["Blog", "/blog", "Guides on law firm, ecommerce, local and technical SEO."],
  ["Free SEO Tools", "/tools", "Free tools, including an llms.txt generator and a SERP checker."],
  ["Free SEO Audit", "/free-audit", "Request a free audit of your site."],
  ["Law Firm SEO Scorecard", "/law-firm-scorecard", "A free visibility scorecard for law firms."],
  ["Why SearchPrex", "/why-us", "How the agency works, what it guarantees and what it does not."],
  ["About", "/about", "The founder and the remote-first, US-focused model."],
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

export function GET() {
  const body = [
    "# SearchPrex",
    "",
    "> SearchPrex is a remote-first, founder-led SEO agency serving clients across the United States. It specialises in law firm SEO, ecommerce SEO (Shopify and WooCommerce), local SEO and Google Business Profile, technical SEO and AI search visibility.",
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
    "## Locations",
    link("All locations", "/locations"),
    ...locationLines(),
    "",
    "## Case Studies",
    ...caseStudies.map((cs) => link(`${cs.client} — ${cs.seoType}`, detailUrl(cs), `${cs.industry}${cs.location ? `, ${cs.location}` : ""}`)),
    "",
    "## Resources",
    ...RESOURCES.map(([t, p, d]) => link(t, p, d)),
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
