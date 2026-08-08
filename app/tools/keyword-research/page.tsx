// app/tools/keyword-research/page.tsx
// Server Component. Owns metadata and JSON-LD; the tool UI is in
// KeywordResearchClient.
//
// This route replaces /nicheseopro, which is 301-redirected here in
// next.config.mjs so its existing Search Console history carries over.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import KeywordResearchClient from "./KeywordResearchClient";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/tools/keyword-research`;

const baseMetadata: Metadata = {
  title: "Free AI Keyword Research Tool — Intent & Content Angles",
  description:
    "Free keyword research for law firms, ecommerce and local business. Get keywords grouped by topic, the search intent behind each, and the exact page to build. No signup.",
  keywords: [
    "free keyword research tool",
    "keyword research for law firms",
    "search intent tool",
    "keyword clustering tool",
    "AI keyword research",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Free AI Keyword Research Tool | SearchPrex",
    description:
      "Keywords grouped by topic, with search intent and the page to build for each. No signup, no paywall.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Keyword Research Tool | SearchPrex",
    description: "Keywords grouped by topic, with search intent and the page to build for each.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/keyword-research", baseMetadata);
}

export default function Page() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SearchPrex Keyword Research Tool",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Free AI keyword research: keyword ideas grouped into topic clusters, with search intent and a content angle for each.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
      { "@type": "ListItem", position: 3, name: "Keyword Research", item: PAGE_URL },
    ],
  };

  return (
    <>
      {[appSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <KeywordResearchClient />
    </>
  );
}
