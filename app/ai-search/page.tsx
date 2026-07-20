import type { Metadata } from "next";
import Script from "next/script";
import AIToolClient from "./AIToolClient";
 
const PAGE_URL = "https://www.searchprex.com/ai-search";
const OG_IMAGE = "https://www.searchprex.com/og/ai-search.jpg";
 
export const metadata: Metadata = {
  title: "Free AI SEO Audit Tool | Instant Website Analysis for US Businesses | SearchPrex",
  description:
    "Free AI-powered SEO audit tool for US businesses. Get an instant website analysis, a personalized 90-day SEO roadmap, or book a free consultation — no login, no credit card, results in seconds.",
  keywords: [
    "free SEO audit tool",
    "AI SEO analysis",
    "website SEO checker USA",
    "instant SEO audit",
    "SEO roadmap generator",
    "free SEO consultation",
    "AI-powered SEO tool",
    "SEO audit for small business",
    "USA SEO analyzer",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Free AI SEO Audit Tool | Instant Website Analysis | SearchPrex",
    description:
      "Get a free AI-powered SEO audit in seconds. Instant scores for page speed, schema, backlinks, and Core Web Vitals — plus a personalized 90-day roadmap. Built for US businesses.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SearchPrex AI SEO Audit Tool — free instant website analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI SEO Audit Tool | SearchPrex",
    description:
      "Instant SEO audit, personalized 90-day roadmap, or free consultation — no login required.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
  },
};
 
export default function AISearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Free AI SEO Audit Tool — Instant Website Analysis",
        description:
          "Free AI-powered SEO audit tool for US businesses. Instant website analysis, personalized 90-day SEO roadmap, and free consultation.",
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.searchprex.com/#website",
          url: "https://www.searchprex.com",
          name: "SearchPrex",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#tool`,
        name: "SearchPrex AI SEO Audit Tool",
        applicationCategory: "SEOApplication",
        operatingSystem: "Web",
        url: PAGE_URL,
        description:
          "AI-powered SEO audit tool that scans websites for Core Web Vitals, schema markup, backlinks, mobile UX, and content depth — delivering an instant SEO score and prioritized fix plan.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Instant SEO score (0–100)",
          "Core Web Vitals analysis",
          "Schema markup audit",
          "Backlink profile check",
          "Mobile UX evaluation",
          "Content depth review",
          "Personalized 90-day SEO roadmap",
          "Free 30-minute expert consultation",
        ],
        provider: {
          "@type": "Organization",
          name: "SearchPrex",
          url: "https://www.searchprex.com",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "20",
          bestRating: "5",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "AI SEO Audit", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the SearchPrex AI SEO audit tool really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes — completely free. No login, no credit card, no email required for the instant audit. Enter your URL and get results in seconds.",
            },
          },
          {
            "@type": "Question",
            name: "What does the AI SEO audit check?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The audit analyzes six critical SEO signals: page speed and Core Web Vitals (LCP, INP, CLS), title tags and meta descriptions, schema markup, backlink profile, mobile UX, and content depth — with an overall SEO score out of 100.",
            },
          },
          {
            "@type": "Question",
            name: "Is this SEO tool built for US businesses?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The tool is optimized for US businesses across law firms, local service businesses, e-commerce, healthcare, and real estate — with Google 2026 core update alignment (INP, AI Overviews, E-E-A-T).",
            },
          },
          {
            "@type": "Question",
            name: "What is the 90-day SEO roadmap?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A personalized 12-week SEO plan based on your industry, goals, and budget — covering technical fixes, keyword strategy, content optimization, link building, and reporting.",
            },
          },
          {
            "@type": "Question",
            name: "How do I book the free 30-minute consultation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fill out the consultation form on the page. We reply within 24 hours to confirm your free strategy call — no commitment required.",
            },
          },
        ],
      },
    ],
  };
 
  return (
    <>
      <Script
        id="ld-ai-search"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIToolClient />
    </>
  );
}
 