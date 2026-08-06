// app/free-audit/page.tsx
// Server Component. Owns metadata; the form lives in FreeAuditClient.
//
// Previously "use client", so this route could not export metadata and served
// the root layout's default (homepage) title. It is a conversion page — the
// title and description are what a searcher sees before deciding to click.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import FreeAuditClient from "./FreeAuditClient";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/free-audit`;

const baseMetadata: Metadata = {
  title: "Free SEO Audit — Reviewed by the Founder in 24 Hours",
  description:
    "Get a free SEO audit for your law firm, ecommerce store, or local business. The founder personally reviews your site and sends a 90-day roadmap within 24 hours. No contracts.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Free SEO Audit — Reviewed by the Founder in 24 Hours | SearchPrex",
    description:
      "Founder-reviewed SEO audit with a 90-day roadmap, delivered in 24 hours. No obligation.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SEO Audit — Reviewed by the Founder in 24 Hours | SearchPrex",
    description: "Founder-reviewed SEO audit with a 90-day roadmap, delivered in 24 hours.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/free-audit", baseMetadata);
}

export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free SEO Audit",
    serviceType: "SEO Audit",
    url: PAGE_URL,
    provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
    areaServed: { "@type": "Country", name: "United States" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free SEO Audit", item: PAGE_URL },
    ],
  };

  return (
    <>
      {[serviceSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <FreeAuditClient />
    </>
  );
}
