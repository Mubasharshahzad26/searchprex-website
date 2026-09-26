// app/sitemap.ts
// Next.js App Router auto-detects this file and serves it at /sitemap.xml
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

import type { MetadataRoute } from "next";

import { db } from "@/lib/db";
import { caseStudies, detailUrl } from "./case-studies/data";
import { posts as blogPosts } from "./blog/data";
import { getAllCitySlugs } from "@/lib/kansas-cities";
import { getAllCityParams } from "@/lib/city-pages";
import { getDynamicStateHubSlugs } from "@/lib/locations";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { isGatedRoute } from "@/lib/gated-routes";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

/**
 * The sitemap is CMS-driven: a page's presence, priority and lastModified all
 * come from the `Page` table, so unpublishing a page in the admin removes it
 * from the sitemap without a deploy.
 *
 * Four things worth knowing:
 *
 * 0. `lastModified` is set only where a real date exists — the CMS row's
 *    updatedAt, a news spoke's updatedAt, a blog post's date. Everything else
 *    omits it. It used to be `new Date()` on almost every URL, which claimed
 *    the whole site changed at crawl time; once this route became per-request
 *    that timestamp also moved on every fetch. A lastmod Google cannot trust
 *    is one it ignores, and an omitted one costs nothing.
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

// Rendered per request, not at build. The sitemap is CMS-driven: pages and
// news articles are published straight into the database, and a build-time
// snapshot left every one of them out of the sitemap until the next deploy.
// /news-sitemap.xml already does this for the same reason.
export const dynamic = "force-dynamic";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: Entry["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/law-firm-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ecommerce-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/local-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/technical-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/experts", priority: 0.6, changeFrequency: "monthly" },
  { path: "/why-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/news", priority: 0.6, changeFrequency: "weekly" },
  { path: "/resources/law-firm-seo-audit-checklist", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/schema-generator", priority: 0.6, changeFrequency: "monthly" },
  // The page shipped — it is committed and returns 200. The note that used to
  // sit here ("the directory was never committed, so it 404s") outlived the
  // problem it described, and kept a live, indexable page out of the sitemap.
  { path: "/tools/serp-checker", priority: 0.8, changeFrequency: "weekly" },
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
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
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
/**
 * Routes that resolve, but are not their own canonical URL.
 *
 * A sitemap should list canonical, 200-status URLs only — listing a redirect or
 * a page that points its canonical elsewhere asks Google to crawl a URL it is
 * then told to ignore, and shows up in Search Console as "Alternate page with
 * proper canonical tag".
 *
 *   /nicheseopro       308s to /tools/keyword-research (next.config redirect)
 *   /all-case-studies  308s to /case-studies (next.config redirect)
 *   /action-plan       declares canonical /free-audit (app/action-plan/page.tsx)
 *
 * Both have published CMS rows, so removing them from STATIC_ROUTES is not
 * enough — the CMS loop re-adds them. Same reason the gated-route guard lives
 * inside `add`.
 */
const NON_CANONICAL_ROUTES = new Set(["/nicheseopro", "/all-case-studies", "/action-plan"]);

/**
 * Routes whose page sets `robots: noindex` in its own `metadata` export.
 *
 * The CMS loop below drops a page when its *CMS row* says noindex, but a route
 * noindexed in code leaves that row still saying "index, follow" — and listing a
 * noindexed URL in the sitemap sends Google two contradictory instructions about
 * the same page. Add a route here whenever you noindex it in code, and remove it
 * when the robots block goes.
 */
// /pricing-plan stays live (a payment provider's verification points at it)
// but is noindexed so it no longer competes with /pricing.
//
// /home-page-test is a CRO layout test of the homepage. Two near-identical
// homepages competing for the same terms is exactly the duplication this file
// exists to prevent, so it is noindexed in code and kept out of the sitemap.
const NOINDEX_ROUTES = new Set<string>(["/pricing-plan", "/home-page-test"]);

function derivePriority(path: string): number {
  if (path === "/") return 1.0;
  const depth = path.split("/").filter(Boolean).length;
  return depth <= 1 ? 0.7 : 0.6;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = new Map<string, Entry>();

  const add = (entry: Entry) => {
    // A gated route can never be indexed — a crawler is redirected to /login
    // before it sees the page — so it must not appear here whatever its source.
    // This guard lives in `add` rather than beside the static list because the
    // CMS loop below adds pages too: /ai-search and /content-generator both
    // have published CMS rows and came straight back after being removed from
    // STATIC_ROUTES.
    const pathname = new URL(entry.url).pathname;
    if (isGatedRoute(pathname)) return;
    if (NON_CANONICAL_ROUTES.has(pathname)) return;
    if (NOINDEX_ROUTES.has(pathname)) return;

    const existing = entries.get(entry.url);
    if (!existing) {
      entries.set(entry.url, entry);
      return;
    }

    // Higher priority wins, so a CMS row can't silently demote the homepage —
    // but the date survives either way. The static list carries no
    // lastModified (it has no way to know one), so without this merge a page
    // that appears in both lists lost the real updatedAt from its CMS row.
    const winner = (entry.priority ?? 0) > (existing.priority ?? 0) ? entry : existing;
    const other = winner === entry ? existing : entry;
    entries.set(entry.url, {
      ...winner,
      lastModified: winner.lastModified ?? other.lastModified,
    });
  };

  for (const route of STATIC_ROUTES) {
    add({
      url: absolute(route.path),
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
    url: absolute("/locations"),
    changeFrequency: "monthly",
    priority: 0.7,
  });
  add({
    url: absolute("/locations/kansas"),
    changeFrequency: "monthly",
    priority: 0.7,
  });
  // State hubs exist only for states with two or more cities; see lib/locations.ts.
  for (const state of getDynamicStateHubSlugs()) {
    add({
      url: absolute(`/locations/${state}`),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const newsCategories = ["AI SEO", "LLMs", "Tools", "Ecommerce", "Technical", "Local"];
  for (const cat of newsCategories) {
    add({
      url: absolute(`/resources/news?category=${encodeURIComponent(cat)}`),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // ── SEO News deep-dives (the spokes) ─────────────────────────────────────
  // These were reachable only through news-sitemap.xml, which exists for Google
  // News and is scoped to a short freshness window -- so the articles the hub
  // is built around were absent from the main sitemap entirely. They live in
  // `MarketingBlog` under a "SEO News*" category, the same rows the hub and the
  // subcategory pages query.
  try {
    const newsSpokes = await db.marketingBlog.findMany({
      where: { published: true, category: { contains: "SEO News", mode: "insensitive" } },
      select: { slug: true, canonicalUrl: true, updatedAt: true },
    });

    for (const spoke of newsSpokes) {
      add({
        url: spoke.canonicalUrl || absolute(`/resources/news/${spoke.slug}`),
        lastModified: spoke.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error("[sitemap] SEO News spokes unavailable:", error);
  }

  for (const { city } of getAllCitySlugs()) {
    add({
      url: absolute(`/locations/kansas/${city}`),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  // The /locations/[state]/[city] pages. Priority sits above the Kansas set
  // because every one of these targets a query Search Console or Semrush has
  // already shown demand for, rather than a city we happened to write first.
  for (const page of INDUSTRY_PAGES) {
    add({
      url: absolute(`/services/law-firm-seo/${page.slug}`),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Local SEO by trade — one page per industry with a real case study behind it.
  for (const industry of LOCAL_INDUSTRIES) {
    add({
      url: absolute(`/services/local-seo/${industry.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Ecommerce SEO by platform and niche.
  for (const industry of ECOMMERCE_INDUSTRIES) {
    add({
      url: absolute(`/services/ecommerce-seo/${industry.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const { state, city } of getAllCityParams()) {
    add({
      url: absolute(`/locations/${state}/${city}`),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  // ── Case studies (file-sourced, not yet in the CMS) ──────────────────────
  for (const cs of caseStudies) {
    add({
      url: absolute(detailUrl(cs)),
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
