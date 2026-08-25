import type { Metadata } from "next";
// import { getPageSEO } from "@/lib/admin-seo";
// Homepage section components (root /components folder)
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import TrustBar from "../components/TrustBar";
import SEOAuditStrip from "../components/SEOAuditStrip";
import LeadWizard from "../components/LeadWizard";
import Services from "../components/Services";
import LawFirmStack from "../components/LawFirmStack";
import AuroraBackground from "../components/AuroraBackground";
import Results from "../components/Results";
import VideoSection from "../components/VideoSection";
import AIVisibilityShowcase from "../components/AIVisibilityShowcase";
import SolutionsCarousel from "../components/SolutionsCarousel";
import TrustpilotReviewSection from "@/components/TrustpilotReviewSection";
import { trustpilotReviewSchema } from "@/lib/trustpilot-review-schema";
import FounderSection from "../components/FounderSection";
import LeadCaptureForm from "../components/LeadCaptureForm";
import FAQ from "../components/FAQ";
import BlogTeaser from "../components/BlogTeaser";
import ChatWidget from "../components/ChatWidget";
import Reveal from "@/components/Reveal";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

const baseMetadata: Metadata = {
  title: "SEO Agency USA | Rank Law Firms, Local & Ecommerce Sites",
  description:
    "US-focused SEO agency helping law firms, small businesses & ecommerce stores rank higher. Free SEO audit + proven results across 50 states.",
  alternates: { canonical: SITE },
  openGraph: {
    title: "SEO Agency USA | Rank Law Firms, Local & Ecommerce Sites",
    description:
      "US-focused SEO agency helping law firms, small businesses & ecommerce stores rank higher. Free SEO audit + proven results across 50 states.",
    url: SITE,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Agency USA | Rank Law Firms, Local & Ecommerce Sites",
    description:
      "US-focused SEO agency helping law firms, small businesses & ecommerce stores rank higher. Free SEO audit + proven results across 50 states.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata;
}

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        "name": "SearchPrex",
        "url": SITE,
        "logo": `${SITE}/logo.png`,
        "description":
          "US-focused SEO agency helping law firms, small businesses, and ecommerce stores rank higher through technical SEO, local SEO, and AI-powered content automation.",
        "email": "contact@searchprex.com",
        "founder": { "@id": `${SITE}/#founder` },
        "areaServed": [
          { "@type": "Country", "name": "United States" },
          { "@type": "State", "name": "California" },
          { "@type": "State", "name": "Texas" },
          { "@type": "State", "name": "New York" },
          { "@type": "State", "name": "Florida" },
          { "@type": "State", "name": "Kansas" },
          { "@type": "State", "name": "Illinois" },
          { "@type": "State", "name": "Pennsylvania" }
        ],
        "knowsAbout": [
          "Law Firm SEO",
          "Personal Injury Lawyer SEO",
          "Family Law SEO",
          "Ecommerce SEO",
          "Shopify SEO",
          "WooCommerce SEO",
          "Local SEO",
          "Technical SEO",
          "Core Web Vitals",
          "E-E-A-T",
          "AI Overviews (GEO/AEO)",
          "LLM Optimization",
          "Google Indexing Recovery",
          "Bulk Content Automation"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/searchprex/",
          "https://www.youtube.com/@SearchPrex"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "3.8",
          "reviewCount": "1",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "SEO Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Law Firm SEO",
                "url": `${SITE}/services/law-firm-seo`,
                "description":
                  "SEO for personal injury, family law, criminal defense, and general practice attorneys across the United States."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Ecommerce & Shopify SEO",
                "url": `${SITE}/services/ecommerce-seo`,
                "description":
                  "Ecommerce SEO for Shopify and WooCommerce stores. Product page optimization, indexing recovery, and bulk content at scale."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Local SEO",
                "url": `${SITE}/services/local-seo`,
                "description":
                  "Local SEO for small businesses. Google Business Profile optimization, local citations, and state-wise ranking strategy."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Technical SEO Audit",
                "url": `${SITE}/services/technical-seo`,
                "description":
                  "Technical SEO audits covering crawl errors, indexing issues, Core Web Vitals, and site architecture."
              }
            }
          ]
        }
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#founder`,
        "name": "Mubashar Shahzad",
        "jobTitle": "Founder & SEO Strategist",
        "worksFor": { "@id": `${SITE}/#organization` },
        "knowsAbout": [
          "Technical SEO",
          "Ecommerce SEO",
          "Local SEO",
          "Law Firm SEO",
          "AEO/GEO/AIO",
          "LLM Optimization",
          "Google Indexing Recovery"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/mubashar-shahzad-seo/",
          "https://www.upwork.com/freelancers/~01400266ea842005be",
          "https://medium.com/@mubasharshahzad726"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        "url": SITE,
        "name": "SearchPrex",
        "publisher": { "@id": `${SITE}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        "url": SITE,
        "name": "SEO Agency USA | Rank Law Firms, Local & Ecommerce Sites",
        "description":
          "US-focused SEO agency helping law firms, small businesses & ecommerce stores rank higher across all 50 states.",
        "isPartOf": { "@id": `${SITE}/#website` },
        "about": { "@id": `${SITE}/#organization` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${SITE}/og-image.jpg`
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#professionalservice`,
        "name": "SearchPrex SEO Agency",
        "url": SITE,
        "logo": `${SITE}/logo.png`,
        "priceRange": "$$",
        "telephone": "+923106526316",
        "email": "contact@searchprex.com",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": [
          "Law Firm SEO",
          "Ecommerce SEO",
          "Local SEO",
          "Technical SEO"
        ]
      },
      trustpilotReviewSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <Hero />
        <Reveal><ClientLogos /></Reveal>
        <Reveal><TrustBar /></Reveal>
        <SEOAuditStrip />

        <AuroraBackground variant="light">
          <Reveal><Services /></Reveal>
  
        </AuroraBackground>

    
        <LeadWizard />
        <Reveal><Results /></Reveal>
        <Reveal><VideoSection /></Reveal>
        <Reveal><FounderSection /></Reveal>
        <AIVisibilityShowcase />
        <LawFirmStack />   {/* ← Complete stack after AI positioning */}

        <SolutionsCarousel />
        <TrustpilotReviewSection />

        
        <Reveal><LeadCaptureForm /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><BlogTeaser /></Reveal>
      </main>

      <ChatWidget />
    </>
  );
}