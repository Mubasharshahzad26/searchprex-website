// app/case-studies/page.tsx
// Server Component. Owns metadata + JSON-LD (CollectionPage, ItemList, FAQPage,
// BreadcrumbList). The interactive UI lives in CaseStudiesClient (a client
// island). It is NOT wrapped in Suspense: the island reads its ?vertical= deep
// link from window.location after mount rather than via useSearchParams, so
// nothing suspends and the full page prerenders into the static HTML.
//
// This is the one case-study hub. There used to be two: this URL showed three
// featured stories, and /all-case-studies carried the full filterable grid,
// with near-identical titles competing for the same queries. The grid moved
// here because this is the URL every detail page sits under
// (/case-studies/{industry}/{client}) and the one that already ranked;
// /all-case-studies now 308s here (next.config.mjs), ?vertical= included.

import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";
import { caseStudies, detailUrl, FAQS } from "./data";
import { getPageSEO } from "@/lib/admin-seo";
import { db } from "@/lib/db";
import { SITE, organizationRef, websiteRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/case-studies`;
const LINKEDIN_URL = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const DESCRIPTION =
  "Real SEO case studies with Google Search Console proof — ecommerce indexing recovery, local map pack wins, and technical SEO turnarounds. Filter by niche. No vanity metrics.";

const baseMetadata: Metadata = {
  title: "SEO Case Studies — Verified GSC Results",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO Case Studies — Verified GSC Results | SearchPrex",
    description:
      "Real SEO case studies with Google Search Console proof. Ecommerce, local, and technical SEO results you can inspect.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Case Studies — Verified GSC Results | SearchPrex",
    description: "Real SEO case studies with Google Search Console proof.",
  },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/case-studies", baseMetadata);
}

export default async function Page() {
  // CMS-added case studies are extra, not essential: the ten in data.ts render
  // regardless. Without the catch, one dropped database connection turned the
  // whole hub into an error page.
  const dbCaseStudies = await db.marketingCaseStudy
    .findMany({ where: { published: true }, orderBy: { createdAt: "desc" } })
    .catch((err) => {
      console.error("[case-studies] CMS case studies unavailable:", err);
      return [];
    });

  // Organization, founder and WebSite come from lib/site-schema.ts via the root
  // layout. The old /all-case-studies page redefined all three under a second
  // set of @ids (…com#organization, no slash), splitting each entity in two.
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "SEO Case Studies — Verified GSC Results",
        description: DESCRIPTION,
        isPartOf: websiteRef,
        publisher: organizationRef,
        inLanguage: "en-US",
        mainEntity: {
          "@type": "ItemList",
          name: "SearchPrex SEO Case Studies",
          numberOfItems: caseStudies.length,
          itemListElement: caseStudies.map((cs, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}${detailUrl(cs)}`,
            name: `${cs.client} — ${cs.seoType}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <CaseStudiesClient linkedinUrl={LINKEDIN_URL} initialCaseStudies={dbCaseStudies} />
    </>
  );
}
