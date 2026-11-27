// app/robots.ts
// Next.js App Router auto-detects this file and serves it at /robots.txt
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

import type { MetadataRoute } from "next";

const SITE = "https://www.searchprex.com";

/**
 * Private, authenticated, and internal automation surfaces that legitimate
 * search engines and AI citation crawlers must never crawl or index.
 *
 * Security note: All sensitive admin/internal surfaces below are ALSO gated at
 * the server/middleware layer (middleware.ts + requireAdmin/CRON_SECRET) so bots
 * that ignore robots.txt still receive 307/401/403 responses.
 */
const PRIVATE_PATHS = [
  "/api/",
  "/admin",
  "/admin/*",
  "/admin-login",
  "/admin-login/*",
  "/content-admin",
  "/content-admin/*",
  "/autopilot",
  "/autopilot/*",
  "/bulk-generation",
  "/bulk-generation/*",
  "/content-generator",
  "/content-generator/*",
  "/studio",
  "/studio/*",
  "/dashboard",
  "/dashboard/*",
  "/lb-preview",
  "/lb-preview/*",
  "/preview-links",
  "/preview-links/*",
  "/login",
  "/register",
  "/onboarding",
  "/action-plan",
];

// Keep Search & AEO/GEO answer-engine crawlers explicitly welcomed on public pages.
const AI_SEARCH_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
];

// Aggressive pure-scraping & junk crawlers that add load without SEO/AEO value.
// (Note: SemrushBot is intentionally NOT blocked so Semrush Site Audits work.)
const BLOCKED_SCRAPER_BOTS = [
  "Bytespider",
  "CCBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "PetalBot",
  "Sogou",
  "MegaIndex.ru",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
      ...BLOCKED_SCRAPER_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: [
      `${SITE}/sitemap.xml`,
      `${SITE}/news-sitemap.xml`,
      `${SITE}/image-sitemap.xml`,
      `${SITE}/video-sitemap.xml`,
    ],
  };
}
