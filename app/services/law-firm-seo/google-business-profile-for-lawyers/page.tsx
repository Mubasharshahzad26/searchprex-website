// app/services/law-firm-seo/google-business-profile-for-lawyers/page.tsx
//
// Spoke of /services/law-firm-seo. A static segment, so it takes precedence
// over the [industry] route beside it.

import type { Metadata } from "next";

import LawGbpClient from "./LawGbpClient";
import { CAPSULES, FAQS, META } from "./data";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import { RETAINER_PLANS } from "@/lib/pricing";

const SITE = "https://www.searchprex.com";
const URL = `${SITE}/services/law-firm-seo/google-business-profile-for-lawyers`;

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-10-04";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

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
    images: [{ url: `${SITE}/services/law-firm-seo/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: META.title, description: META.description },
  robots: { index: true, follow: true },
};

export default function LawFirmGbpPage() {
  // Built from the same arrays the page renders.
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
        name: "Google Business Profile optimization for law firms",
        serviceType: "Law firm Google Business Profile optimization",
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", audienceType: "Law firms" },
        description: META.description,
        url: URL,
        ...(LAW_PLAN
          ? {
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: LAW_PLAN.min,
                  maxPrice: LAW_PLAN.max,
                  priceCurrency: "USD",
                  unitText: "MONTH",
                },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
          { "@type": "ListItem", position: 3, name: "Law Firm SEO", item: `${SITE}/services/law-firm-seo` },
          { "@type": "ListItem", position: 4, name: "Google Business Profile", item: URL },
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
      <script id="ld-law-firm-gbp" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LawGbpClient />
    </>
  );
}
