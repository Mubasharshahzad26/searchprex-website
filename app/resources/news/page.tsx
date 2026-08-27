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

const baseMetadata: Metadata = {
  title: "SEO News Today: Latest Google Algorithm Updates & Trends (2026)",
  description:
    "Stay ahead with the latest SEO news today. We break down Google core algorithm updates, AI Overviews, and local SEO changes. See what actually changed.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO News Today: Latest Google Algorithm Updates & Trends (2026)",
    description:
      "Stay ahead with the latest SEO news today. We break down Google core algorithm updates, AI Overviews, and local SEO changes.",
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

const CATEGORY_META: Record<string, { title: string, desc: string }> = {
  "AI SEO": {
    title: "AI SEO News: ChatGPT, Generative Engine Optimization (GEO)",
    desc: "The latest AI SEO news, covering Generative Engine Optimization (GEO), ChatGPT search integration, and how LLMs are changing the SEO landscape in 2026.",
  },
  "LLMs": {
    title: "LLMs in SEO: News & Updates on Answer Engine Optimization (AEO)",
    desc: "How Large Language Models (LLMs) are redefining search. News on AI Overviews, Answer Engine Optimization (AEO), and LLM ranking algorithms.",
  },
  "Tools": {
    title: "SEO Tools News: Latest Updates, Features & Reviews (2026)",
    desc: "Stay updated on the newest SEO tools, feature releases, and technical marketing software updates. Find out what works best for technical and local SEO.",
  },
  "Ecommerce": {
    title: "Ecommerce SEO News: Retail Search Updates & Algorithm Changes",
    desc: "Latest Ecommerce SEO news, merchant center updates, shopping graph changes, and retail algorithm shifts that impact online stores in 2026.",
  },
  "Technical": {
    title: "Technical SEO News: Crawling, Indexing & Architecture Updates",
    desc: "Core Web Vitals, rendering, crawling, and indexing news. Stay ahead of Google's technical SEO requirements and algorithm shifts.",
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
  const { category } = await searchParams;
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "News", item: PAGE_URL },
    ],
  };

  const dbNews = await db.marketingNews.findMany({
    where: { published: true },
    orderBy: { newsDate: "desc" },
  });

  // If a subcategory is selected, filter by it. Otherwise, match anything with "SEO News"
  const filterCat = category ? category : "SEO News";
  const dbSpokes = await db.marketingBlog.findMany({
    where: { published: true, category: { contains: filterCat, mode: "insensitive" } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewsClient initialNews={dbNews} initialSpokes={dbSpokes} />
    </>
  );
}
