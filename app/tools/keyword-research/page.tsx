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
  title: "Keyword Research Tool for Lawyers, by State",
  description:
    "Pick a practice area and US state to get the keywords clients search and the page to build for each. Free. Volume and CPC show once live data is connected.",
  keywords: [
    "law firm keyword research",
    "attorney keyword tool",
    "personal injury keyword volume",
    "law firm SEO keywords by state",
    "lawyer CPC by state",
    "free keyword tool for attorneys",
  ],
  alternates: { 
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    }
  },
  openGraph: {
    title: "Keyword Research Tool for Lawyers, by State | SearchPrex",
    description:
      "Pick a practice area and US state to get the keywords clients search and the page to build for each. Free. Volume and CPC show once live data is connected.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Law Firm Keyword Tool | SearchPrex",
    description:
      "The keywords clients search, by practice area and US state, with the page to build for each.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/keyword-research", baseMetadata);
}

export default function Page() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SearchPrex Law Firm Keyword Tool",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Free keyword research for US law firms: pick a practice area and state to see the keywords clients search and the page to build for each. Search volume, difficulty and CPC appear when licensed data is connected.",
    audience: {
      "@type": "Audience",
      audienceType: "Law firms and attorneys in the United States",
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Law Firm Keyword Research",
        item: PAGE_URL,
      },
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
