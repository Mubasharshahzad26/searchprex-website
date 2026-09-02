// app/robots.ts
// Next.js App Router auto-detects this file and serves it at /robots.txt
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 
import type { MetadataRoute } from "next";
 
const SITE = "https://www.searchprex.com";

/**
 * Paths no crawler should ever index.
 *
 * Shared across every rule on purpose: a crawler obeys only the single most
 * specific user-agent group that matches it, so a bare `{ userAgent: "GPTBot",
 * allow: "/" }` would make GPTBot ignore the "*" disallow list entirely and
 * crawl /admin. Every named group must repeat these.
 */
const PRIVATE_PATHS = [
  "/api/",          // never let crawlers hit your API routes
  "/admin",         // CMS control surface, must never be indexed
  "/admin/*",
  // The second CMS surface. Easy to miss because it is not under /admin: it
  // holds the page, blog, case-study, news and resource editors, and it was
  // crawlable until now. It is admin-gated in middleware.ts as well, and the
  // pages carry robots noindex (app/content-admin/layout.tsx) — Disallow alone
  // stops crawling but not indexing of a URL Google found via a link.
  "/content-admin",
  "/content-admin/*",
  "/studio",        // Sanity Studio route
  "/studio/*",
  "/dashboard",     // logged-in area, no SEO value, keep private
  "/dashboard/*",
  "/login",
  "/register",
  "/onboarding",
  "/action-plan",   // internal client-only report pages, if not meant public
];

// Explicitly welcome the AI answer-engine crawlers (AEO). Same directives as
// "*", but naming them signals intent and future-proofs the file if general
// bots are ever restricted while AI crawlers stay allowed.
const AI_CRAWLERS = ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    // Both sitemaps, not just the main one. /news-sitemap.xml is a valid Google
    // News sitemap that has always been served but never advertised, so its
    // only discovery path was a manual Search Console submission.
    sitemap: [`${SITE}/sitemap.xml`, `${SITE}/news-sitemap.xml`],
  };
}
 