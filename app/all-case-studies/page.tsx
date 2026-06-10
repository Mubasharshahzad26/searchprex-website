// app/all-case-studies/page.tsx
// Server Component. Owns metadata + JSON-LD (ItemList, FAQPage, BreadcrumbList,
// Person). The interactive UI lives in CaseStudiesClient (a client island),
// wrapped in Suspense because it reads useSearchParams for URL-synced filters.
 
import { Suspense } from "react";
import type { Metadata } from "next";
import CaseStudiesClient, { FAQS } from "./CaseStudiesClient";
import { caseStudies, detailUrl } from "./data";
 
const SITE = "https://www.searchprex.com";
// TODO: replace with Mubashar's exact LinkedIn profile URL before launch.
const LINKEDIN_URL = "https://www.linkedin.com/";
 
export const metadata: Metadata = {
  title: "All SEO Case Studies — Verified GSC Results | SearchPrex",
  description:
    "Browse every SearchPrex SEO case study — ecommerce, local, technical and law firm SEO. Filter by industry and SEO type. Every result verified with Google Search Console data.",
  alternates: { canonical: `${SITE}/all-case-studies` },
  openGraph: {
    title: "All SEO Case Studies — Verified GSC Results | SearchPrex",
    description:
      "Filter real SEO case studies by industry and SEO type. Verified Google Search Console results — clicks, indexing, rankings and revenue.",
    url: `${SITE}/all-case-studies`,
    type: "website",
  },
};
 
export default function Page() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SearchPrex SEO Case Studies",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${detailUrl(cs)}`,
      name: `${cs.client} — ${cs.seoType}`,
    })),
  };
 
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/case-studies` },
      { "@type": "ListItem", position: 3, name: "All Case Studies", item: `${SITE}/all-case-studies` },
    ],
  };
 
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
 
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mubashar Shahzad",
    jobTitle: "SEO Expert & Content Strategist",
    worksFor: { "@type": "Organization", name: "SearchPrex", url: SITE },
    sameAs: [LINKEDIN_URL],
    knowsAbout: [
      "Ecommerce SEO",
      "Local SEO",
      "Technical SEO",
      "Law Firm SEO",
      "International SEO",
      "AEO / AI Overview optimization",
    ],
  };
 
  const schemas = [itemListSchema, breadcrumbSchema, faqSchema, personSchema];
 
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
 
      <Suspense fallback={null}>
        <CaseStudiesClient linkedinUrl={LINKEDIN_URL} />
      </Suspense>
    </>
  );
}
 






