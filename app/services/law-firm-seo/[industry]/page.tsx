// Law firm SEO pages by practice area. The narrative and conversion copy live
// in lib/industry-pages.ts; this route keeps page copy, metadata and schema in sync.
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import PracticePage from "./PracticePage";

const SITE = "https://www.searchprex.com";
const LAST_REVIEWED = "2026-10-31";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((page) => ({ industry: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((item) => item.slug === industry);
  if (!page) return {};

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      page.primaryKeyword,
      ...page.keywordMap.commercial,
      ...page.keywordMap.problem,
      ...page.keywordMap.local,
      ...page.capsules.map((item) => item.q),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "SearchPrex",
      type: "website",
      images: [{ url: `${SITE}/services/law-firm-seo/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
    robots: { index: true, follow: true },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((item) => item.slug === industry);
  if (!page) notFound();

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;
  const questions = [...page.capsules, ...page.faqs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.h1,
        image: `${SITE}${page.visual.src}`,
        isPartOf: websiteRef,
        about: { "@id": `${url}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
        mainEntity: { "@id": `${url}#service` },
        mentions: {
          "@type": "DefinedTerm",
          name: page.framework.name,
          description: page.framework.definition,
          inDefinedTermSet: { "@type": "CreativeWork", name: "SearchPrex Law Firm SEO Frameworks", url: `${SITE}/llms.txt` },
        },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.primaryKeyword,
        serviceType: `Law firm SEO for ${page.name}`,
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", audienceType: `${page.name} law firms` },
        description: page.metaDescription,
        image: `${SITE}${page.visual.src}`,
        url,
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: page.priceRange.min,
            maxPrice: page.priceRange.max,
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
          { "@type": "ListItem", position: 3, name: "Law Firm SEO", item: `${SITE}/services/law-firm-seo` },
          { "@type": "ListItem", position: 4, name: page.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: questions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        id={`ld-law-firm-seo-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PracticePage page={page} />
    </>
  );
}
