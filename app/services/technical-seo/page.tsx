import type { Metadata } from "next";
import Script from "next/script";
import TechnicalSEOClient from "./TechnicalSEOClient";

const PAGE_URL = "https://www.searchprex.com/services/technical-seo";
const OG_IMAGE = "https://www.searchprex.com/og/technical-seo.jpg";

export const metadata: Metadata = {
  title: "Technical SEO Services | Indexation, Core Web Vitals, Schema | SearchPrex",
  description:
    "Founder-led technical SEO for large sites. Crawl budget recovery, indexation fixes, Core Web Vitals (LCP/INP/CLS), schema markup, and site architecture — proven at 12K+ page scale.",
  keywords: [
    "technical SEO services", "Core Web Vitals optimization", "indexation recovery",
    "schema markup", "crawl budget", "site architecture SEO", "INP optimization",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Technical SEO Services | SearchPrex",
    description:
      "Recover mass non-indexing, fix Core Web Vitals, and structure your site for Google's 2026 algorithm. +476% clicks, +285% indexing on Michigan Outdoor Sports.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "SearchPrex Technical SEO Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical SEO Services | SearchPrex",
    description: "Indexation recovery, CWV, schema — proven at 12K+ page scale.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function TechnicalSEOPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Technical SEO Services",
        serviceType: "Technical SEO",
        provider: { "@type": "Organization", name: "SearchPrex", url: "https://www.searchprex.com" },
        areaServed: { "@type": "Country", name: "United States" },
        description:
          "Technical SEO — full site crawl, indexation recovery, Core Web Vitals (LCP/INP/CLS), schema markup, site architecture, and log file analysis.",
        url: PAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.searchprex.com/services" },
          { "@type": "ListItem", position: 3, name: "Technical SEO", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "My site has thousands of pages — can you handle that?",
            acceptedAnswer: { "@type": "Answer", text: "Yes — large-scale technical SEO is our specialty. We took Michigan Outdoor Sports from near-zero to 12K+ indexed pages and a +285% indexing rate." } },
          { "@type": "Question", name: "What are Core Web Vitals and why do they matter?",
            acceptedAnswer: { "@type": "Answer", text: "Core Web Vitals (LCP, INP, CLS) are Google's user experience metrics that directly impact rankings in 2026. We diagnose and fix all three." } },
          { "@type": "Question", name: "How quickly will I see results from technical fixes?",
            acceptedAnswer: { "@type": "Answer", text: "Indexation fixes show GSC improvements in 2–4 weeks after Googlebot recrawls. Core Web Vitals improvements show up in Google's data within 28 days." } },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="ld-technical-seo" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TechnicalSEOClient />
    </>
  );
}