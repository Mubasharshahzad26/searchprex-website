// lib/autopilot-news/harvester.ts
import { db } from "@/lib/db";
import { SEO_NEWS_SOURCES, fetchFeedItems, RawNewsItem } from "./sources";

export interface EnrichedNewsItem extends RawNewsItem {
  alreadyCovered: boolean;
  existingSlug?: string;
  relevanceScore: number;
}

const SEO_KEYWORD_WEIGHTS: Record<string, number> = {
  "core update": 10,
  "algorithm update": 10,
  "google update": 10,
  "spam update": 9,
  "helpful content": 9,
  "ai overviews": 9,
  "searchgpt": 8,
  "google discover": 8,
  "search console": 8,
  "indexing": 7,
  "crawling": 7,
  "serp": 7,
  "ranking": 7,
  "google": 6,
  "sitemap": 6,
  "technical seo": 6,
  "backlink": 6,
  "e-e-a-t": 6,
  "schema": 5,
  "rich results": 5,
  "llm": 5,
  "gemini": 5,
};

const EXCLUDE_PATTERNS = [
  /webinar/i,
  /sponsored/i,
  /jobs?/i,
  /hiring/i,
  /smx\s+conference/i,
  /podcast\s+episode/i,
];

function calculateRelevance(title: string, summary: string): number {
  const combined = `${title} ${summary}`.toLowerCase();

  for (const pat of EXCLUDE_PATTERNS) {
    if (pat.test(combined)) return 0;
  }

  let score = 0;
  for (const [kw, weight] of Object.entries(SEO_KEYWORD_WEIGHTS)) {
    if (combined.includes(kw)) {
      score += weight;
    }
  }

  // Base score for general SEO mentions
  if (combined.includes("seo") || combined.includes("search engine")) {
    score += 4;
  }

  return Math.min(score, 100);
}

function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function harvestLatestNews(): Promise<EnrichedNewsItem[]> {
  // 1. Fetch all feeds concurrently
  const feedPromises = SEO_NEWS_SOURCES.filter((s) => s.enabled).map((s) => fetchFeedItems(s));
  const feedResults = await Promise.all(feedPromises);
  const allRawItems: RawNewsItem[] = feedResults.flat();

  // 2. Fetch existing blogs & news from DB to check duplicates
  const [existingBlogs, existingNews] = await Promise.all([
    db.marketingBlog.findMany({
      select: { slug: true, title: true, canonicalUrl: true },
      take: 200,
      orderBy: { createdAt: "desc" },
    }),
    db.marketingNews.findMany({
      select: { sourceHref: true, title: true },
      take: 200,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const existingUrls = new Set<string>();
  const normalizedExistingTitles = new Map<string, string>();

  for (const b of existingBlogs) {
    if (b.canonicalUrl) existingUrls.add(b.canonicalUrl.trim().toLowerCase());
    normalizedExistingTitles.set(normalizeTitle(b.title), b.slug);
  }
  for (const n of existingNews) {
    if (n.sourceHref) existingUrls.add(n.sourceHref.trim().toLowerCase());
  }

  // 3. Enrich & Deduplicate
  const seenUrls = new Set<string>();
  const enriched: EnrichedNewsItem[] = [];

  for (const item of allRawItems) {
    const cleanUrl = item.link.trim().toLowerCase();
    if (seenUrls.has(cleanUrl)) continue;
    seenUrls.add(cleanUrl);

    const normTitle = normalizeTitle(item.title);
    const matchedSlug = normalizedExistingTitles.get(normTitle);
    const isUrlCovered = existingUrls.has(cleanUrl);
    const alreadyCovered = isUrlCovered || Boolean(matchedSlug);

    const relevanceScore = calculateRelevance(item.title, item.summary || "");

    enriched.push({
      ...item,
      alreadyCovered,
      existingSlug: matchedSlug,
      relevanceScore,
    });
  }

  // Sort by relevance (high first) and freshness
  return enriched.sort((a, b) => {
    if (a.alreadyCovered !== b.alreadyCovered) {
      return a.alreadyCovered ? 1 : -1; // Uncovered items first
    }
    return b.relevanceScore - a.relevanceScore;
  });
}
