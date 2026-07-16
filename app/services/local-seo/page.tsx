import type { Metadata } from "next";
import Script from "next/script";
import LocalSEOClient from "./LocalSEOClient";

const PAGE_URL = "https://www.searchprex.com/services/local-seo";
const OG_IMAGE = "https://www.searchprex.com/og/local-seo.jpg";

export const metadata: Metadata = {
  title: "Local SEO Services | Own the Map Pack & AI Overviews | SearchPrex",
  description:
    "Founder-led local SEO that puts your business in the top 3 Google Maps pack and 2026 AI Overviews. GBP optimization, citations, review velocity, and city-level landing pages.",
  keywords: [
    "local SEO services", "Google Maps SEO", "GBP optimization",
    "local pack ranking", "near me SEO", "AI Overview local SEO",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Local SEO Services | SearchPrex",
    description:
      "Rank in the Google Maps top 3 and get cited in AI Overviews for local queries. Founder-led local SEO for service businesses.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "SearchPrex Local SEO Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local SEO Services | SearchPrex",
    description: "Top 3 map pack + AI Overview visibility. Founder-led local SEO.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function LocalSEOPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Local SEO Services",
        serviceType: "Local SEO",
        provider: { "@type": "Organization", name: "SearchPrex", url: "https://www.searchprex.com" },
        areaServed: { "@type": "Country", name: "United States" },
        description:
          "Local SEO for service businesses — Google Business Profile optimization, citation building, local landing pages, review generation, and AI Overview citations.",
        url: PAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.searchprex.com/services" },
          { "@type": "ListItem", position: 3, name: "Local SEO", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How fast can I rank in the Google Maps local pack?",
            acceptedAnswer: { "@type": "Answer", text: "Most local businesses see map pack movement in 30–60 days. Our HVAC client reached the top 3 and captured an AI Overview placement within 60 days." } },
          { "@type": "Question", name: "What is AI Overview optimization?",
            acceptedAnswer: { "@type": "Answer", text: "Google's 2026 AI Overviews answer local queries directly above the map pack. We structure your content, reviews, and schema so Google cites your business in those answers." } },
          { "@type": "Question", name: "Which local businesses do you work with?",
            acceptedAnswer: { "@type": "Answer", text: "HVAC, plumbers, electricians, restaurants, clinics, contractors, salons, and other service businesses targeting a specific city or service area." } },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="ld-local-seo" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocalSEOClient />
    </>
  );
}