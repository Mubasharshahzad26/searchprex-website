import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryClient from "./IndustryClient";
import { LOCAL_INDUSTRIES, getLocalIndustry } from "@/lib/local-industries";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import { RETAINER_PLANS } from "@/lib/pricing";

const SITE = "https://www.searchprex.com";

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-09-26";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

// Only the trades in lib/local-industries.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getLocalIndustry(slug);
  if (!industry) return {};

  const url = `${SITE}/services/local-seo/${industry.slug}`;
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${industry.h1} | SearchPrex`,
      description: industry.metaDescription,
      url,
      siteName: "SearchPrex",
      type: "website",
      images: [{ url: `${SITE}/services/local-seo/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.h1} | SearchPrex`,
      description: industry.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocalIndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = getLocalIndustry(slug);
  if (!industry) notFound();

  const url = `${SITE}/services/local-seo/${industry.slug}`;

  // Built from the same arrays the page renders, so the FAQPage always
  // matches what a visitor can read.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: industry.h1,
        isPartOf: websiteRef,
        about: { "@id": `${url}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: industry.h1,
        serviceType: `Local SEO for ${industry.name}`,
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        description: industry.metaDescription,
        url,
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
          { "@type": "ListItem", position: 4, name: industry.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [...industry.capsules, ...industry.faqs].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        id={`ld-local-seo-${industry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryClient slug={industry.slug} />
    </>
  );
}
