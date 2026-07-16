import type { Metadata } from "next";
import Script from "next/script";
import LawFirmSEOClient from "./LawFirmSEOClient";

const PAGE_URL = "https://www.searchprex.com/services/law-firm-seo";
const OG_IMAGE = "https://www.searchprex.com/og/law-firm-seo.jpg";

export const metadata: Metadata = {
  title: "Law Firm SEO Services | Rank in Local Pack & AI Overviews | SearchPrex",
  description:
    "Founder-led SEO for law firms. Attorney E-E-A-T content, practice area pages, local pack rankings, and AI Overview citations — replace expensive Google Ads with organic cases.",
  keywords: [
    "law firm SEO", "attorney SEO", "legal SEO services",
    "law firm local SEO", "attorney AI Overview", "YMYL legal content",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Law Firm SEO Services | SearchPrex",
    description:
      "Rank #1 in your city, dominate the map pack, and get cited in Google AI Overviews. Founder-led SEO built for YMYL legal content.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "SearchPrex Law Firm SEO Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm SEO Services | SearchPrex",
    description: "Map pack + AI Overview citations for law firms. Founder-led, YMYL-aligned.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function LawFirmSEOPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Law Firm SEO Services",
        serviceType: "Law Firm SEO",
        provider: { "@type": "Organization", name: "SearchPrex", url: "https://www.searchprex.com" },
        areaServed: { "@type": "Country", name: "United States" },
        description:
          "SEO for law firms — attorney E-E-A-T content, practice area pages, local pack rankings, review generation, technical SEO, and AI Overview citations.",
        url: PAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.searchprex.com/services" },
          { "@type": "ListItem", position: 3, name: "Law Firm SEO", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How long before I see results?",
            acceptedAnswer: { "@type": "Answer", text: "Most law firms see ranking improvements in 30–60 days. First-page and local pack rankings typically follow in 60–90 days." } },
          { "@type": "Question", name: "What is GEO / AIO / LLMs optimization?",
            acceptedAnswer: { "@type": "Answer", text: "It's optimizing so your firm gets cited in AI answers — Google AI Overviews, ChatGPT, Perplexity, and Gemini." } },
          { "@type": "Question", name: "Are you compliant with Google's 2026 core updates?",
            acceptedAnswer: { "@type": "Answer", text: "Completely. Legal content is YMYL, so we build every page around E-E-A-T — attorney credentials, real experience, authoritative sourcing." } },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="ld-law-firm-seo" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LawFirmSEOClient />
    </>
  );
}