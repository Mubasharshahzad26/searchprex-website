// app/sitemap.ts
// Next.js App Router auto-detects this file and serves it at /sitemap.xml
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import type { MetadataRoute } from "next";

import { db } from "@/lib/db";
import { caseStudies, detailUrl } from "./all-case-studies/data";
import { posts as blogPosts } from "./blog/data";
import { getAllCitySlugs } from "@/lib/kansas-cities";
import { getAllCityParams } from "@/lib/city-pages";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

/**
 * The sitemap is CMS-driven: a page's presence, priority and lastModified all
 * come from the `Page` table, so unpublishing a page in the admin removes it
 * from the sitemap without a deploy.
 *
 * Three things worth knowing:
 *
 * 1. `STATIC_ROUTES` is a *fallback*, not the source of truth. If the database
 *    is unreachable (or hasn't been seeded yet) we still serve a valid sitemap
 *    rather than a 500 — an empty or erroring sitemap is worse for crawling
 *    than a slightly stale one.
 * 2. `noindex` pages are excluded. Listing a page you've told Google not to
 *    index is a contradictory signal and shows up as an error in Search Console.
 * 3. URLs are de-duplicated by their final absolute form. The old hand-written
 *    list contained `/ai-search` twice, and DB rows can collide with the
 *    fallback list, so the merge runs through a Map keyed on URL.
 */

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: Entry["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/law-firm-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ecommerce-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/local-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/technical-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/experts", priority: 0.6, changeFrequency: "monthly" },
  { path: "/why-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/all-case-studies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/news", priority: 0.6, changeFrequency: "weekly" },
  { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/schema-generator", priority: 0.6, changeFrequency: "monthly" },
  // /tools/serp-checker is deliberately absent: the page directory was never
  // committed, so it 404s in production. Listing a 404 in the sitemap is an
  // error in Search Console. Re-add it the same day the page ships.
  { path: "/intake-assistant", priority: 0.7, changeFrequency: "monthly" },
  { path: "/case-calculator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/law-firm-scorecard", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ai-search", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ai-visibility", priority: 0.7, changeFrequency: "monthly" },
  { path: "/content-generator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bulk-generation", priority: 0.6, changeFrequency: "monthly" },
  { path: "/tools/keyword-research", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tool", priority: 0.7, changeFrequency: "monthly" },
  // /autopilot is deliberately absent: it is an internal dashboard rendering
  // client names and run history, and now carries robots noindex. Listing a
  // noindex page here is the contradictory signal this file's own header warns
  // about, and it shows up as an error in Search Console.
  { path: "/free-audit", priority: 0.9, changeFrequency: "monthly" },
  { path: "/growth-plan", priority: 0.8, changeFrequency: "monthly" },
  { path: "/action-plan", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing-plan", priority: 0.7, changeFrequency: "monthly" },
  // Location pages are appended below from lib/kansas-cities, not listed here.
  // The previous comment claimed /locations/kansas "always calls notFound()" —
  // it does not: it is a working hub that returns 200 and links to all eight
  // city pages. Excluding it, and the eight cities, left them discoverable only
  // by internal link. All eight are live with 460–800 words each and every one
  // had zero impressions in Search Console while Wichita — the only one in the
  // sitemap — sat at position 6.3. That is a discovery problem, not a content
  // one, and it is the same crawled-but-not-indexed pattern we fix for clients.
  //
  // /coming-soon stays excluded as a non-indexable holding page.
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund", priority: 0.3, changeFrequency: "yearly" },
];

/** Absolute URL with no trailing slash, so `/about` and `/about/` can't both appear. */
function absolute(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `${SITE}/`;
  return `${SITE}${clean.replace(/\/+$/, "")}`;
}

/** Depth-based guess for pages the CMS knows about but the fallback list doesn't. */
function derivePriority(path: string): number {
  if (path === "/") return 1.0;
  const depth = path.split("/").filter(Boolean).length;
  return depth <= 1 ? 0.7 : 0.6;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = new Map<string, Entry>();

  const add = (entry: Entry) => {
    const existing = entries.get(entry.url);
    // Higher priority wins, so a CMS row can't silently demote the homepage.
    if (!existing || (entry.priority ?? 0) > (existing.priority ?? 0)) {
      entries.set(entry.url, entry);
    }
  };

  for (const route of STATIC_ROUTES) {
    add({
      url: absolute(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  // ── CMS pages ───────────────────────────────────────────────────────────
  try {
    const pages = await db.page.findMany({
      where: { status: "published" },
      select: { slug: true, robots: true, canonicalUrl: true, updatedAt: true },
    });

    for (const page of pages) {
      if (page.robots?.includes("noindex")) {
        entries.delete(absolute(page.slug));
        continue;
      }

      const url = page.canonicalUrl || absolute(page.slug);
      const known = STATIC_ROUTES.find((route) => absolute(route.path) === url);

      add({
        url,
        lastModified: page.updatedAt,
        changeFrequency: known?.changeFrequency ?? "monthly",
        priority: known?.priority ?? derivePriority(page.slug),
      });
    }
  } catch (error) {
    console.error("[sitemap] CMS pages unavailable, serving static fallback:", error);
  }

  // ── Archived/draft cleanup ──────────────────────────────────────────────
  // A page the CMS explicitly marks draft or archived should drop out even
  // though it appears in the fallback list above.
  try {
    const hidden = await db.page.findMany({
      where: { status: { in: ["draft", "archived"] } },
      select: { slug: true },
    });
    for (const page of hidden) entries.delete(absolute(page.slug));
  } catch {
    // Already logged above; the fallback list stands.
  }

  // ── Location pages ───────────────────────────────────────────────────────
  // Derived from the city data so adding a city is one entry, not two. The hub
  // is listed above its cities because it is the page that links them together.
  add({
    url: absolute("/locations/kansas"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  for (const { city } of getAllCitySlugs()) {
    add({
      url: absolute(`/locations/kansas/${city}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  // The /locations/[state]/[city] pages. Priority sits above the Kansas set
  // because every one of these targets a query Search Console or Semrush has
  // already shown demand for, rather than a city we happened to write first.
  for (const { state, city } of getAllCityParams()) {
    add({
      url: absolute(`/locations/${state}/${city}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  // ── Case studies (file-sourced, not yet in the CMS) ──────────────────────
  for (const cs of caseStudies) {
    add({
      url: absolute(detailUrl(cs)),
      lastModified: now,
      changeFrequency: "monthly",
      priority: cs.featured ? 0.85 : 0.7,
    });
  }

  // ── Blog posts (file-sourced, not yet in the CMS) ────────────────────────
  // Deliberately NOT the `BlogPost` Prisma model: that table is the autopilot
  // generator's output — it's scoped to a `clientId` and publishes to each
  // client's own WordPress site (`wpPostId`, `liveUrl`), so its rows are not
  // searchprex.com URLs and it has no `slug` column. Phase 4 introduces a real
  // model for this blog; until then `app/blog/data.ts` is the source of truth.
  for (const post of blogPosts) {
    add({
      url: absolute(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: post.featured ? 0.7 : 0.6,
    });
  }

  return Array.from(entries.values()).sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
