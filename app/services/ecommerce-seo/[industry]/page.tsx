import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryClient from "./IndustryClient";
import { ECOMMERCE_INDUSTRIES, getEcommerceIndustry } from "@/lib/ecommerce-industries";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import { RETAINER_PLANS } from "@/lib/pricing";

const SITE = "https://www.searchprex.com";

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-09-26";
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");

// Only the pages in lib/ecommerce-industries.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ECOMMERCE_INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getEcommerceIndustry(slug);
  if (!industry) return {};

  const url = `${SITE}/services/ecommerce-seo/${industry.slug}`;
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
      images: [{ url: `${SITE}/services/ecommerce-seo/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.h1} | SearchPrex`,
      description: industry.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function EcommerceIndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = getEcommerceIndustry(slug);
  if (!industry) notFound();

  const url = `${SITE}/services/ecommerce-seo/${industry.slug}`;

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
        serviceType: `Ecommerce SEO for ${industry.name}`,
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        description: industry.metaDescription,
        url,
        ...(ECOM_PLAN
          ? {
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: ECOM_PLAN.min,
                  maxPrice: ECOM_PLAN.max,
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
          { "@type": "ListItem", position: 3, name: "Ecommerce SEO", item: `${SITE}/services/ecommerce-seo` },
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
        id={`ld-ecommerce-seo-${industry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryClient slug={industry.slug} />
    </>
  );
}
