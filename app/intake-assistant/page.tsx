import type { Metadata } from "next";
import Script from "next/script";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
 
const PAGE_URL = "https://www.searchprex.com/intake-assistant";
const OG_IMAGE = "https://www.searchprex.com/og/intake-assistant.jpg";
 
export const metadata: Metadata = {
  title: "24/7 AI Intake Assistant for Law Firms | Never Miss a Lead | SearchPrex",
  description:
    "AI intake assistant that captures and qualifies every law firm lead 24/7 — no missed calls, no lost cases. Try the free live demo built for US law firms.",
  keywords: [
    "AI intake assistant",
    "law firm AI intake",
    "24/7 legal intake",
    "AI lead qualification law firm",
    "law firm chatbot",
    "attorney intake automation",
    "legal AI assistant USA",
    "after-hours legal intake",
    "law firm lead capture tool",
    "personal injury intake AI",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "24/7 AI Intake Assistant for Law Firms | SearchPrex",
    description:
      "Capture and qualify every lead 24/7. Free live demo of the AI intake assistant built for US law firms — play a potential client and see it work in seconds.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SearchPrex 24/7 AI Intake Assistant for Law Firms — live demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 AI Intake Assistant for Law Firms | SearchPrex",
    description:
      "Never lose a case to a missed call. AI intake that qualifies leads 24/7. Free live demo.",
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
 
export default function IntakeAssistantPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "24/7 AI Intake Assistant for Law Firms — Live Demo",
        description:
          "AI intake assistant that captures and qualifies every law firm lead 24/7. Free live demo for US law firms.",
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
        name: "SearchPrex AI Intake Assistant",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: PAGE_URL,
        description:
          "24/7 AI-powered intake assistant that qualifies potential legal clients, captures case details, and hands the law firm a clean lead summary within seconds.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free live demo",
        },
        featureList: [
          "24/7 lead capture and qualification",
          "Case type and urgency detection",
          "Client contact information collection",
          "Structured lead summary for attorneys",
          "Instant response to every inquiry",
          "Multi-practice-area support",
          "US law firm optimized",
        ],
        provider: {
          "@type": "Organization",
          name: "SearchPrex",
          url: "https://www.searchprex.com",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Law Firms, Personal Injury Attorneys, Family Lawyers, Criminal Defense Attorneys",
          geographicArea: {
            "@type": "Country",
            name: "United States",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "15",
          bestRating: "5",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "AI Intake Assistant", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is an AI intake assistant for law firms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An AI intake assistant is a 24/7 automated system that engages potential clients the moment they contact your firm — asking qualifying questions, capturing case details, and delivering a structured lead summary to the attorney in seconds. It ensures no lead is lost to missed calls, after-hours inquiries, or voicemails.",
            },
          },
          {
            "@type": "Question",
            name: "Which practice areas does the intake assistant support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Personal injury, family law, criminal defense, estate planning, immigration, employment law, and any other legal practice area. The assistant is customized for each firm's intake criteria and case types.",
            },
          },
          {
            "@type": "Question",
            name: "How does the AI intake assistant qualify leads?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It asks structured qualifying questions — case type, incident date, injuries or damages, jurisdiction, urgency, and contact preferences — then scores each lead so attorneys know which ones to prioritize.",
            },
          },
          {
            "@type": "Question",
            name: "Is the intake assistant demo really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The live demo on this page is completely free — no signup, no credit card. Play a potential client scenario and see the AI qualify the lead in real time.",
            },
          },
          {
            "@type": "Question",
            name: "Can the AI intake assistant integrate with my law firm's existing systems?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes — it integrates with common law firm CRMs, case management systems, and email platforms. Lead summaries are delivered wherever your intake team already works.",
            },
          },
        ],
      },
    ],
  };
 
  return (
    <>
      <Script
        id="ld-intake-assistant"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="mx-auto max-w-4xl">
          <IntakeAssistant />
        </div>
      </div>
    </>
  );
}
 