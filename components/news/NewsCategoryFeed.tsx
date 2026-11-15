import React from "react";
import NewsClient from "@/app/resources/news/NewsClient";
import { db } from "@/lib/db";
import { staticNewsSpokes } from "@/lib/static-news-spokes";
import { NEWS_FALLBACK_ARTICLES } from "@/lib/news-fallback";
import { NEWS_CATEGORIES, NewsCategoryConfig } from "@/lib/news-categories";

const SITE = "https://www.searchprex.com";
const NEWS_DB_TIMEOUT_MS = 1500;

async function queryNewsWithFallback<T>(query: Promise<T>, label: string): Promise<T | null> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      query,
      new Promise<null>((resolve) => {
        timeout = setTimeout(() => resolve(null), NEWS_DB_TIMEOUT_MS);
      }),
    ]);
    if (result === null) console.warn(`[SEO News Category] ${label} timed out; using static articles.`);
    return result;
  } catch (error) {
    console.error(`[SEO News Category] ${label} unavailable; using static articles:`, error);
    return null;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export default async function NewsCategoryFeed({ categoryConfig }: { categoryConfig: NewsCategoryConfig }) {
  const category = categoryConfig.filterKey;
  const pageUrl = `${SITE}/resources/news/${categoryConfig.id}`;

  const [newsResult, spokesResult] = await Promise.all([
    queryNewsWithFallback(
      db.marketingNews.findMany({
        where: { published: true },
        orderBy: { newsDate: "desc" },
      }),
      "Category news feed query"
    ),
    queryNewsWithFallback(
      db.marketingBlog.findMany({
        where: {
          published: true,
          AND: [
            { category: { contains: "News", mode: "insensitive" } },
            { category: { contains: category, mode: "insensitive" } },
          ],
        },
        orderBy: { publishedAt: "desc" },
      }),
      "Category spoke query"
    ),
  ]);

  let dbNews: any[] = newsResult || [];
  let dbSpokes: any[] = spokesResult || [];

  const staticSpokes = staticNewsSpokes
    .filter((s) => s.category.toLowerCase().includes(category.toLowerCase()))
    .map((s) => ({
      id: s.slug,
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      category: s.category,
      author: s.author.name,
      coverImage: s.heroImage,
      readTime: s.readTime,
      publishedAt: new Date(s.date),
      updatedAt: new Date(s.dateModified || s.date),
    }));

  const fallbackSpokes = NEWS_FALLBACK_ARTICLES
    .filter((s) => s.category.toLowerCase().includes(category.toLowerCase()))
    .map((s) => ({
      id: s.slug,
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      category: s.category,
      author: "Mubashar Sharif",
      coverImage: s.coverImage,
      readTime: s.readTime,
      publishedAt: new Date(`${s.published}T12:00:00.000Z`),
      updatedAt: new Date(`${s.modified}T12:00:00.000Z`),
    }));

  const spokeBySlug = new Map<string, any>();
  for (const spoke of [...staticSpokes, ...fallbackSpokes, ...dbSpokes]) {
    if (!spokeBySlug.has(spoke.slug)) spokeBySlug.set(spoke.slug, spoke);
  }
  dbSpokes = [...spokeBySlug.values()].sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  );

  if (dbNews.length === 0) {
    dbNews = [
      ...staticNewsSpokes.map((s) => ({
        id: s.slug,
        title: s.title,
        summary: s.excerpt,
        tag: s.tags[0] || "News",
        sourceLabel: "SearchPrex Verified",
        sourceHref: s.canonicalUrl,
        newsDate: new Date(s.date),
      })),
      ...NEWS_FALLBACK_ARTICLES.map((s) => ({
        id: s.slug,
        title: s.title,
        summary: s.excerpt,
        tag: (s.category.split("—").pop() ?? "News").trim(),
        sourceLabel: "SearchPrex Verified",
        sourceHref: `/resources/news/${s.slug}`,
        newsDate: new Date(`${s.published}T12:00:00.000Z`),
      })),
    ];
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "SEO News", item: `${SITE}/resources/news` },
      { "@type": "ListItem", position: 4, name: categoryConfig.name, item: pageUrl },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: categoryConfig.h1,
    description: categoryConfig.desc,
    url: pageUrl,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: {
      "@type": "Organization",
      name: "SearchPrex",
      url: SITE,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <NewsClient
        initialNews={dbNews}
        initialSpokes={dbSpokes}
        category={categoryConfig.filterKey}
        heading={categoryConfig.h1}
        intro={categoryConfig.intro}
      />
    </>
  );
}
