// app/robots.ts
// Next.js App Router auto-detects this file and serves it at /robots.txt
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 
import type { MetadataRoute } from "next";
 
const SITE = "https://www.searchprex.com";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // never let crawlers hit your API routes
          "/dashboard",     // logged-in area, no SEO value, keep private
          "/dashboard/*",
          "/login",
          "/onboarding",
          "/action-plan",   // internal client-only report pages, if not meant public
        ],
      },
      // Explicitly welcome the AI answer-engine crawlers (AEO) —
      // this is the same directive as "*" above, but naming them
      // explicitly signals intent and future-proofs if you ever
      // want to restrict general bots while keeping AI crawlers.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
 