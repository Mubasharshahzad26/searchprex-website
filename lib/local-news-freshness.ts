// When the Local SEO News hub last changed, shared by the page (dateModified,
// title month) and the sitemap (lastmod) so the two can't disagree.
import { staticNewsSpokes } from "@/lib/static-news-spokes";
import { NEWS_FALLBACK_ARTICLES } from "@/lib/news-fallback";
import { localSeoNewsUpdates } from "@/components/news/LocalSeoNewsTimeline";

/** Local news articles the hub lists: committed spokes plus repo-kept CMS articles. */
export function localNewsArticles() {
  const spokes = staticNewsSpokes
    .filter((s) => s.category.toLowerCase().includes("local") && s.slug !== "local-seo-updates")
    .map((s) => ({ slug: s.slug, title: s.title, excerpt: s.excerpt, date: s.date, readTime: s.readTime }));
  const archived = NEWS_FALLBACK_ARTICLES
    .filter((a) => a.category.toLowerCase().includes("local") && !spokes.some((s) => s.slug === a.slug))
    .map((a) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.published, readTime: a.readTime }));
  return [...spokes, ...archived].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * The local hub is only as fresh as its newest dated entry, so its
 * dateModified (and the month in its title) come from the latest article or
 * logged update rather than a hand-set date that drifts.
 */
export function localNewsLastUpdated(): string {
  const times = [
    ...localNewsArticles().map((a) => Date.parse(`${a.date}T12:00:00Z`)),
    ...localSeoNewsUpdates.map((u) => Date.parse(`${u.date} 12:00:00 UTC`)),
  ].filter((t) => Number.isFinite(t));
  return new Date(Math.max(...times)).toISOString();
}
