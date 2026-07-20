// app/sitemap.ts
// Next.js App Router auto-detects this file and serves it at /sitemap.xml
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 
import type { MetadataRoute } from "next";
import { caseStudies, detailUrl } from "./all-case-studies/data";
 
const SITE = "https://www.searchprex.com";
 
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
 
  // ── 1. Static top-level pages ──────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/services/law-firm-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/services/ecommerce-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/services/local-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/services/technical-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/experts`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/why-us`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/all-case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/resources/news`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/intake-assistant`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/case-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/law-firm-scorecard`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-search`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/content-generator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/nicheseopro`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/free-audit`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/pricing-plan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/locations/kansas/wichita`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/ai-search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
 
  // ── 2. Dynamic case study pages (pulled from your data.ts, so new
  //      case studies you add automatically show up here — no manual edits) ──
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE}${detailUrl(cs)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: cs.featured ? 0.85 : 0.7,
  }));
 
  return [...staticRoutes, ...caseStudyRoutes];
}

 