// app/services/local-seo/google-business-profile-suspended/page.tsx
//
// Spoke of /services/local-seo for owners who want a suspension handled. The
// DIY steps live in /blog/google-business-profile-suspended, which this page
// links to rather than competing with.

import type { Metadata } from "next";

import SuspendedClient from "./SuspendedClient";
import { CAPSULES, FAQS, META } from "./data";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const SITE = "https://www.searchprex.com";
const URL = `${SITE}/services/local-seo/google-business-profile-suspended`;

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-10-04";

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
    images: [{ url: `${SITE}/services/local-seo/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: META.title, description: META.description },
  robots: { index: true, follow: true },
};

export default function GbpSuspendedPage() {
  // No Offer: suspension work has no published price.
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
        name: "Google Business Profile suspension help",
        serviceType: "Google Business Profile reinstatement help",
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
          { "@type": "ListItem", position: 3, name: "Local SEO", item: `${SITE}/services/local-seo` },
          { "@type": "ListItem", position: 4, name: "GBP Suspended", item: URL },
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
      <script id="ld-gbp-suspended" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SuspendedClient />
    </>
  );
}
