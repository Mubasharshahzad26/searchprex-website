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

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/resources/news", baseMetadata);
}

import { db } from "@/lib/db";

export default async function Page() {
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

  const dbSpokes = await db.marketingBlog.findMany({
    where: { published: true, category: { contains: "SEO News", mode: "insensitive" } },
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
