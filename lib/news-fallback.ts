// lib/news-fallback.ts
//
// When the CMS database cannot be read, the news topic guides fall back to
// a four-heading stub and the database-only articles returned 404 — including
// pages that ranked. This serves their real, sourced content from the repo
// instead. Archived entries are served before database access so published
// routes stay resilient during outages. local-seo-updates has its own handling
// and is not here.

import { NEWS_FALLBACK_CONTENT } from "./news-fallback-content";

export interface NewsFallbackEntry {
  slug: string;
  kind: "pillar" | "article";
  category: string;
  title: string;
  /** May contain a {month} token, expanded by the page like a CMS metaTitle. */
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readTime: string;
  coverImage: string;
  /** YYYY-MM-DD */
  published: string;
  /** YYYY-MM-DD */
  modified: string;
  schemaType: "Article" | "NewsArticle";
  content: string;
}

const AUTHOR = {
  name: "Mubashar Sharif",
  role: "Founder & SEO Strategist",
  bio: "Founder & SEO Strategist at SearchPrex, covering Google search updates, technical SEO and AI search.",
  linkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
};

export function getNewsFallbackEntry(slug: string): NewsFallbackEntry | undefined {
  return NEWS_FALLBACK_CONTENT[slug];
}

/** Same shape app/resources/news/[slug] builds from a CMS row. */
export function newsFallbackPost(entry: NewsFallbackEntry) {
  return {
    slug: entry.slug,
    category: (entry.category.split("—").pop() ?? "SEO News").trim(),
    subcategory: "",
    title: entry.title,
    metaTitle: entry.metaTitle,
    metaDescription: entry.metaDescription,
    excerpt: entry.excerpt,
    readTime: entry.readTime,
    date: entry.published,
    dateModified: `${entry.modified}T12:00:00.000Z`,
    author: AUTHOR,
    featured: entry.kind === "pillar",
    heroImage: entry.coverImage,
    tags: [] as string[],
    stat: null,
    toc: [] as string[],
    content: entry.content,
    canonicalUrl: `https://www.searchprex.com/resources/news/${entry.slug}`,
    schemaType: entry.schemaType,
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: "",
  };
}

export const NEWS_FALLBACK_ARTICLES = Object.values(NEWS_FALLBACK_CONTENT).filter((e) => e.kind === "article");
