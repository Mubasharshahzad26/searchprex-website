// app/resources/news/page.tsx
// Server Component. Owns metadata; the list lives in NewsClient.
//
// Previously "use client" and therefore served the root layout's default
// (homepage) title.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import NewsClient from "./NewsClient";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/resources/news`;

// The hub deliberately does NOT target local head terms. It was ranking 61 for
// "local seo news" and 67 for "local seo update" against the dedicated spoke's
// 19 and 21 -- the same queries, two URLs, split signals. The spoke at
// /resources/news/local-seo-updates owns local; the hub owns the broad terms.
const baseMetadata: Metadata = {
  title: "SEO News Today: Latest Google Algorithm Updates & Trends (2026)",
  description:
    "Stay ahead with the latest SEO news today. We break down Google core algorithm updates, AI Overviews, and spam updates. See what actually changed.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO News Today: Latest Google Algorithm Updates & Trends (2026)",
    description:
      "Stay ahead with the latest SEO news today. We break down Google core algorithm updates, AI Overviews, and spam updates.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO News Today | SearchPrex",
    description: "Breakdowns of Google core algorithm updates and AI Overviews.",
  },
};

/**
 * One entry per category filter the nav and sitemap link to.
 *
 * `h1` and `intro` exist because every category page used to render the
 * hub's own H1 and intro — "SEO & Google Update News" on ?category=Local and
 * ?category=Technical alike. Six URLs with one heading and one paragraph read
 * to Google as near-duplicates of each other and of the hub, which is the
 * opposite of what a category page is for.
 *
 * Local is angled at Google Business Profile and the map pack rather than
 * "local SEO news": /resources/news/local-seo-updates owns those head terms
 * (see the note on baseMetadata), and a category page competing with its own
 * spoke splits the signal between two URLs.
 */
const CATEGORY_META: Record<string, { title: string; desc: string; h1: string; intro: string }> = {
  "AI SEO": {
    title: "AI SEO News: ChatGPT, Generative Engine Optimization (GEO)",
    desc: "The latest AI SEO news, covering Generative Engine Optimization (GEO), ChatGPT search integration, and how LLMs are changing the SEO landscape in 2026.",
    h1: "AI SEO News",
    intro: "How AI Overviews, ChatGPT search and generative engines decide which businesses get named — and what changed this month.",
  },
  "LLMs": {
    title: "LLMs in SEO: News & Updates on Answer Engine Optimization (AEO)",
    desc: "How Large Language Models (LLMs) are redefining search. News on AI Overviews, Answer Engine Optimization (AEO), and LLM ranking algorithms.",
    h1: "LLM & Answer Engine News",
    intro: "What large language models read, cite and ignore — the answer-engine changes that decide whether your site is the source or the bystander.",
  },
  "Tools": {
    title: "SEO Tools News: Latest Updates, Features & Reviews (2026)",
    desc: "Stay updated on the newest SEO tools, feature releases, and technical marketing software updates. Find out what works best for technical and local SEO.",
    h1: "SEO Tools News",
    intro: "Search Console, Google Business Profile and third-party tool changes, explained by what they let you measure that you could not before.",
  },
  "Ecommerce": {
    title: "Ecommerce SEO News: Retail Search Updates & Algorithm Changes",
    desc: "Latest Ecommerce SEO news, merchant center updates, shopping graph changes, and retail algorithm shifts that impact online stores in 2026.",
    h1: "Ecommerce SEO News",
    intro: "Merchant Center, Shopping Graph and product-search changes, read for what they do to indexed products and store revenue.",
  },
  "Technical": {
    title: "Technical SEO News: Crawling, Indexing & Architecture Updates",
    desc: "Core Web Vitals, rendering, crawling, and indexing news. Stay ahead of Google's technical SEO requirements and algorithm shifts.",
    h1: "Technical SEO News",
    intro: "Crawling, rendering, indexing and Core Web Vitals — the changes that decide whether Google keeps your pages at all.",
  },
  "Local": {
    title: "Google Business Profile & Map Pack News (2026)",
    desc: "Google Business Profile policy changes, suggested edits, reviews and map pack ranking shifts — what each one means for a local business's calls.",
    h1: "Google Business Profile & Map Pack News",
    intro: "Profile policy, suggested edits, reviews and map pack changes — each one read for what it does to the calls a local business gets.",
  },
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
  const { category } = await searchParams;
  
  if (category && CATEGORY_META[category]) {
    const metaInfo = CATEGORY_META[category];
    const catUrl = `${PAGE_URL}?category=${encodeURIComponent(category)}`;
    return {
      title: metaInfo.title,
      description: metaInfo.desc,
      alternates: { canonical: catUrl },
      openGraph: {
        title: metaInfo.title,
        description: metaInfo.desc,
        url: catUrl,
        siteName: "SearchPrex",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaInfo.title,
        description: metaInfo.desc,
      },
    };
  }

  return getPageSEO("/resources/news", baseMetadata);
}

import { db } from "@/lib/db";

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: rawCategory } = await searchParams;
  // Unknown values are ignored rather than filtered on. Any string used to
  // produce its own filtered page with the hub's metadata — an unbounded set of
  // thin URLs for a crawler to find.
  const category = rawCategory && CATEGORY_META[rawCategory] ? rawCategory : undefined;
  const meta = category ? CATEGORY_META[category] : undefined;
  const pageUrl = category ? `${PAGE_URL}?category=${encodeURIComponent(category)}` : PAGE_URL;

  const dbNews = await db.marketingNews.findMany({
    where: { published: true },
    orderBy: { newsDate: "desc" },
  });

  // Every spoke must be an SEO News row. The category filter used to be
  // `contains: category` alone, so ?category=Local would match any blog post
  // whose category merely contained "Local" — and its card linked to
  // /resources/news/<slug>, which 404s for anything that is not SEO News.
  const dbSpokes = await db.marketingBlog.findMany({
    where: {
      published: true,
      AND: [
        { category: { contains: "SEO News", mode: "insensitive" } },
        ...(category ? [{ category: { contains: category, mode: "insensitive" as const } }] : []),
      ],
    },
    orderBy: { publishedAt: "desc" },
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "SEO News", item: PAGE_URL },
      ...(meta ? [{ "@type": "ListItem", position: 4, name: meta.h1, item: pageUrl }] : []),
    ],
  };

  // CollectionPage + ItemList: a machine-readable index of the articles on
  // this page, which is what answer engines use to understand what a listing
  // page covers. Only emitted when there is something to list.
  const collectionSchema =
    dbSpokes.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: meta?.h1 ?? "SEO & Google Update News",
          description: meta?.desc ?? baseMetadata.description,
          url: pageUrl,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: dbSpokes.slice(0, 20).map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${PAGE_URL}/${s.slug}`,
              name: s.title,
            })),
          },
        }
      : null;

  return (
    <>
      {[breadcrumbSchema, collectionSchema].filter(Boolean).map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <NewsClient
        initialNews={dbNews}
        initialSpokes={dbSpokes}
        category={category}
        heading={meta?.h1}
        intro={meta?.intro}
        categories={Object.entries(CATEGORY_META).map(([key, v]) => ({ key, label: v.h1 }))}
      />
    </>
  );
}
