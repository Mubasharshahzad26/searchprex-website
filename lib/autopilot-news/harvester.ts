// lib/autopilot-news/harvester.ts
import { db } from "@/lib/db";
import { SEO_NEWS_SOURCES, fetchFeedItems, RawNewsItem } from "./sources";
import { MAX_NEWS_AGE_HOURS, hoursSince } from "./config";

export interface EnrichedNewsItem extends RawNewsItem {
  alreadyCovered: boolean;
  existingSlug?: string;
  relevanceScore: number;
  /** Hours since the source published it; null when the feed gave no date. */
  ageHours: number | null;
  /** Older than MAX_NEWS_AGE_HOURS, or undated. The cron never picks these. */
  isStale: boolean;
  /**
   * Recent coverage that looks like the same story under another headline —
   * Roundtable and SEJ routinely report the same announcement, and our own
   * titles are rewritten, so an exact-title match misses both.
   */
  similarCoverage?: { title: string; slug?: string };
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
  // Not a bare /jobs?/: that also dropped real news about Google for Jobs and
  // JobPosting structured data.
  /\bjob (?:opening|vacanc|listing)/i,
  /\bhiring\b/i,
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

// Words that appear in most SEO headlines and say nothing about which story it is.
const STORY_STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "into", "about", "after", "over", "than", "that", "this",
  "your", "you", "what", "how", "why", "when", "who", "will", "can", "are", "its", "has", "have",
  "now", "new", "says", "said", "report", "reports", "via", "more", "not", "all", "out", "just",
  "google", "search", "seo", "means", "mean", "sites", "site", "website", "websites",
]);

function storyTokens(title: string): Set<string> {
  return new Set(
    normalizeTitle(title)
      .split(" ")
      .filter((w) => w.length >= 3 && !STORY_STOPWORDS.has(w))
      .map((w) => (w.length > 4 ? w.replace(/s$/, "") : w))
  );
}

/**
 * Share of the shorter headline's distinctive words that the other one also
 * uses. At least two shared words are required, so a lone "core" or "spam"
 * doesn't tie two different updates together.
 */
function storyOverlap(a: Set<string>, b: Set<string>): number {
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  if (shared < 2) return 0;
  return shared / Math.min(a.size, b.size);
}

const SIMILAR_STORY_THRESHOLD = 0.6;
const SIMILAR_STORY_WINDOW_DAYS = 30;

export async function harvestLatestNews(): Promise<EnrichedNewsItem[]> {
  // 1. Fetch all feeds concurrently
  const feedPromises = SEO_NEWS_SOURCES.filter((s) => s.enabled).map((s) => fetchFeedItems(s));
  const feedResults = await Promise.all(feedPromises);
  const allRawItems: RawNewsItem[] = feedResults.flat();

  // 2. Fetch existing blogs & news from DB to check duplicates
  const [existingBlogs, existingNews] = await Promise.all([
    db.marketingBlog.findMany({
      select: { slug: true, title: true, canonicalUrl: true, category: true, createdAt: true },
      take: 200,
      orderBy: { createdAt: "desc" },
    }),
    db.marketingNews.findMany({
      select: { sourceHref: true, title: true, createdAt: true },
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

  const windowStart = Date.now() - SIMILAR_STORY_WINDOW_DAYS * 864e5;
  const recentCoverage: Array<{ title: string; slug?: string; tokens: Set<string> }> = [];
  for (const b of existingBlogs) {
    if (b.createdAt.getTime() < windowStart) continue;
    if (!b.category?.toLowerCase().includes("seo news")) continue;
    recentCoverage.push({ title: b.title, slug: b.slug, tokens: storyTokens(b.title) });
  }
  for (const n of existingNews) {
    if (n.createdAt.getTime() < windowStart) continue;
    // Autopilot saves the same headline to both tables; keep the one with a slug.
    if (recentCoverage.some((c) => c.title === n.title)) continue;
    recentCoverage.push({ title: n.title, tokens: storyTokens(n.title) });
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
    const ageHours = hoursSince(item.publishedAt);
    const isStale = ageHours === null || ageHours > MAX_NEWS_AGE_HOURS;

    let similarCoverage: EnrichedNewsItem["similarCoverage"];
    if (!alreadyCovered) {
      const tokens = storyTokens(item.title);
      let best = 0;
      for (const c of recentCoverage) {
        const overlap = storyOverlap(tokens, c.tokens);
        if (overlap >= SIMILAR_STORY_THRESHOLD && overlap > best) {
          best = overlap;
          similarCoverage = { title: c.title, slug: c.slug };
        }
      }
    }

    enriched.push({
      ...item,
      alreadyCovered,
      existingSlug: matchedSlug,
      relevanceScore,
      ageHours,
      isStale,
      similarCoverage,
    });
  }

  // Actionable first (uncovered, fresh, not a repeat), then relevance, then recency.
  const rank = (i: EnrichedNewsItem) => (i.alreadyCovered ? 2 : i.isStale || i.similarCoverage ? 1 : 0);
  return enriched.sort((a, b) => {
    if (rank(a) !== rank(b)) return rank(a) - rank(b);
    if (a.relevanceScore !== b.relevanceScore) return b.relevanceScore - a.relevanceScore;
    return (a.ageHours ?? Number.MAX_SAFE_INTEGER) - (b.ageHours ?? Number.MAX_SAFE_INTEGER);
  });
}
