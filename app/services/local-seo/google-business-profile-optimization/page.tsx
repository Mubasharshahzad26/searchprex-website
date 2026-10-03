// app/services/local-seo/google-business-profile-optimization/page.tsx
//
// Spoke of /services/local-seo. A static segment, so it takes precedence over
// the [industry] route beside it.

import type { Metadata } from "next";

import GbpClient from "./GbpClient";
import { CAPSULES, FAQS, META } from "./data";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import { RETAINER_PLANS } from "@/lib/pricing";

const SITE = "https://www.searchprex.com";
const URL = `${SITE}/services/local-seo/google-business-profile-optimization`;

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-10-03";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

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

export default function GbpOptimizationPage() {
  // Built from the same arrays the page renders, so the FAQPage always
  // matches what a visitor can read.
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
        serviceType: "Google Business Profile optimization",
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", audienceType: "Local service and storefront businesses" },
        description: META.description,
        url: URL,
        ...(LOCAL_PLAN
          ? {
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: LOCAL_PLAN.min,
                  maxPrice: LOCAL_PLAN.max,
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
          { "@type": "ListItem", position: 3, name: "Local SEO", item: `${SITE}/services/local-seo` },
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
      <script id="ld-gbp-optimization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GbpClient />
    </>
  );
}
