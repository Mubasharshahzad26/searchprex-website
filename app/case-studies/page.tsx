// app/case-studies/page.tsx
// Server Component. Owns metadata and JSON-LD; the interactive grid lives in
// CaseStudiesPageClient.
//
// This route used to be "use client", so it could not export metadata and
// inherited the root layout's default — it was telling Google it was the
// homepage while sitting at position 3 for its own queries.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import { caseStudies, detailUrl } from "../all-case-studies/data";
import CaseStudiesPageClient from "./CaseStudiesPageClient";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/case-studies`;

const baseMetadata: Metadata = {
  title: "SEO Case Studies — Verified GSC Results",
  description:
    "Real SEO case studies with Google Search Console proof — ecommerce indexing recovery, local map pack wins, and technical SEO turnarounds. No vanity metrics.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO Case Studies — Verified GSC Results | SearchPrex",
    description:
      "Real SEO case studies with Google Search Console proof. Ecommerce, local, and technical SEO results you can inspect.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Case Studies — Verified GSC Results | SearchPrex",
    description: "Real SEO case studies with Google Search Console proof.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/case-studies", baseMetadata);
}

export default function Page() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SearchPrex SEO Case Studies",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${detailUrl(cs)}`,
      name: cs.headline,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: PAGE_URL },
    ],
  };

  return (
    <>
      {[itemListSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CaseStudiesPageClient />
    </>
  );
}
