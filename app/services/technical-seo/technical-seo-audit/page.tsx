// app/services/technical-seo/technical-seo-audit/page.tsx
//
// Spoke of /services/technical-seo.

import type { Metadata } from "next";

import AuditClient from "./AuditClient";
import { CAPSULES, FAQS, META } from "./data";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const SITE = "https://www.searchprex.com";
const URL = `${SITE}/services/technical-seo/technical-seo-audit`;

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-10-03";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: { canonical: URL },
  openGraph: {
    title: META.title,
    description: META.description,
    url: URL,
    siteName: "SearchPrex",
    type: "website",
    images: [{ url: `${SITE}/services/technical-seo/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: META.title, description: META.description },
  robots: { index: true, follow: true },
};

export default function TechnicalSeoAuditPage() {
  // Built from the same arrays the page renders, so the FAQPage always
  // matches what a visitor can read. No Offer: the audit fixes are quoted per
  // project and lib/pricing has no technical retainer.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: META.h1,
        isPartOf: websiteRef,
        about: { "@id": `${URL}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "Service",
        "@id": `${URL}#service`,
        name: META.h1,
        serviceType: "Technical SEO audit",
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        description: META.description,
        url: URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
          { "@type": "ListItem", position: 3, name: "Technical SEO", item: `${SITE}/services/technical-seo` },
          { "@type": "ListItem", position: 4, name: "Technical SEO Audit", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        mainEntity: [...CAPSULES, ...FAQS].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script id="ld-technical-seo-audit" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AuditClient />
    </>
  );
}
