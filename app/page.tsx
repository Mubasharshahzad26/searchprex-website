import type { Metadata } from "next";
// import { getPageSEO } from "@/lib/admin-seo";
// Homepage section components (root /components folder)
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import ProofStrip from "../components/ProofStrip";
import RevenueProof from "../components/RevenueProof";
import QuickAuditBar from "../components/QuickAuditBar";
import RecoveryStory from "../components/RecoveryStory";
import LocalSeoProof from "../components/LocalSeoProof";
import LawFirmProof from "../components/LawFirmProof";
import PersonaSolutions from "../components/PersonaSolutions";
import NicheSeoProShowcase from "../components/NicheSeoProShowcase";
import AuditWalkthrough from "../components/AuditWalkthrough";
import TrustBar from "../components/TrustBar";
import LeadWizard from "../components/LeadWizard";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import StickyMobileCTA from "../components/StickyMobileCTA";
import Services from "../components/Services";
import AuroraBackground from "../components/AuroraBackground";
import Results from "../components/Results";
import AIVisibilityShowcase from "../components/AIVisibilityShowcase";
import TrustpilotReviewSection from "@/components/TrustpilotReviewSection";
import { trustpilotReviewSchema } from "@/lib/trustpilot-review-schema";
import FounderSection from "../components/FounderSection";
import FAQ from "../components/FAQ";
import EmotionalLeadForm from "../components/EmotionalLeadForm";
import FreeResources from "../components/FreeResources";
import BlogTeaser from "../components/BlogTeaser";
import Reveal from "@/components/Reveal";
import ChatWidgetLazy from "@/components/ChatWidgetLazy";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

const baseMetadata: Metadata = {
  title: "SEO Agency USA | Rank Law Firms, Local & Ecommerce Sites",
  description:
    "US-focused SEO agency helping law firms, small businesses & ecommerce stores rank higher. Free SEO audit + proven results across 50 states.",
  alternates: { 
    canonical: SITE,
    languages: {
      "en-US": SITE,
      "x-default": SITE,
    }
  },
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
        // NOTE: no aggregateRating here on purpose. Google's review-snippet
        // guidelines disallow self-serving aggregate ratings on your own
        // Organization, and the value that used to sit here (3.8 from 1
        // review) contradicted both the Trustpilot section and the individual
        // Review nodes. The real reviews live in trustpilotReviewSchema below.
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
        // The generated default card (app/opengraph-image.tsx). This was
        // `${SITE}/og-image.jpg`, a file that has never existed in public/, so
        // the structured data pointed Google at a 404.
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${SITE}/opengraph-image`
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
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1250 Executive Place, Suite 450",
          "addressLocality": "Geneva",
          "addressRegion": "IL",
          "postalCode": "60134",
          "addressCountry": "US"
        }
      },
      // ── Proof images ──
      // ImageObject nodes so the evidence is machine-readable, not just a
      // picture. Each carries the capture date, what it shows, and the page it
      // lives on, which is what lets Google associate the claim with the
      // artefact rather than treating the number as an unsupported assertion.
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-indexing`,
        "contentUrl": `${SITE}/images/proof/mso-gsc-indexing-full.png`,
        "caption":
          "Google Search Console page indexing for Michigan Outdoor Sports: approximately 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026.",
        "description":
          "Unedited Google Search Console screenshot showing a 285% increase in indexed pages following technical SEO indexing recovery work.",
        "creator": { "@id": `${SITE}/#founder` },
        "creditText": "SearchPrex — Mubashar Shahzad",
        "datePublished": "2026-08-07",
        "representativeOfPage": false
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-smk-revenue-before`,
        "contentUrl": `${SITE}/images/proof/smk-revenue-before.png`,
        "caption":
          "SMK Store WooCommerce net sales for April 2026: $5,832.02 for the month, top seller at 200 units.",
        "creator": { "@id": `${SITE}/#founder` },
        "creditText": "SearchPrex — Mubashar Shahzad",
        "datePublished": "2026-04-30"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-smk-revenue-after`,
        "contentUrl": `${SITE}/images/proof/smk-revenue-after.png`,
        "caption":
          "SMK Store WooCommerce net sales for June 2026: $19,100.71 for the month, top seller at 300 units — a 227% increase over April.",
        "creator": { "@id": `${SITE}/#founder` },
        "creditText": "SearchPrex — Mubashar Shahzad",
        "datePublished": "2026-06-30"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-revenue-before`,
        "contentUrl": `${SITE}/images/proof/mso-revenue-1-jul20.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 20 July 2026: $0.00 for the month.",
        "creator": { "@id": `${SITE}/#founder` },
        "creditText": "SearchPrex — Mubashar Shahzad",
        "datePublished": "2026-07-20"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-revenue-mid`,
        "contentUrl": `${SITE}/images/proof/mso-revenue-2-aug06.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 6 August 2026: $206.63 for the month.",
        "creator": { "@id": `${SITE}/#founder` },
        "creditText": "SearchPrex — Mubashar Shahzad",
        "datePublished": "2026-08-06"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-revenue-after`,
        "contentUrl": `${SITE}/images/proof/mso-revenue-3-aug17.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 17 August 2026: $311.05 month to date.",
        "creator": { "@id": `${SITE}/#founder` },
        "creditText": "SearchPrex — Mubashar Shahzad",
        "datePublished": "2026-08-17"
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
        {/* Claim -> proof -> offer, alternating. Never three of the same kind
            in a row, and nothing links off-site before the form.
            Moved off this page in Phase 2:
              LawFirmStack     -> /services/law-firm-seo (1 of 3 personas, and
                                  it sent visitors to codeloci.com mid-funnel)
              SolutionsCarousel -> /tools (six more "things we do", after three
                                  proof sections had already run long) */}
        <Hero />
        <Reveal><ClientLogos /></Reveal>
        <Reveal><TrustBar /></Reveal>
        <Reveal><QuickAuditBar /></Reveal>

        {/* 2. Services */}
        <AuroraBackground variant="light">
          <Reveal><Services /></Reveal>
        </AuroraBackground>

        {/* 3-8. The four services, as one interactive dashboard panel.
            Replaces four separate PersonaProblemHeader blocks (~1,300px of
            centred interstitial) with a tab rail that lets the four problems
            be compared side by side and links each one to the section that
            evidences it. The proof sections themselves are unchanged and keep
            their original order below. */}
        <Reveal><PersonaSolutions /></Reveal>

        <Reveal><RevenueProof /></Reveal>
        <Reveal><LocalSeoProof /></Reveal>
        <Reveal><RecoveryStory /></Reveal>

        {/* Directly after the de-indexing recovery, because that recovery is
            this tool's own first case study — same client, same run. Anywhere
            further down and it reads as an unrelated upsell instead of the
            answer to "how did one person ship 11,549 pages?" */}
        <Reveal><NicheSeoProShowcase /></Reveal>

        <Reveal><LawFirmProof /></Reveal>

        <Reveal><TrustpilotReviewSection /></Reveal>

        <Reveal><FounderSection /></Reveal>

        {/* 10. Emotional Lead Form */}
        <Reveal><EmotionalLeadForm /></Reveal>

        <Reveal><Process /></Reveal>
        
        <Reveal><ProofStrip /></Reveal>
        <Reveal><Results /></Reveal>

        <Reveal><AIVisibilityShowcase /></Reveal>

        <Reveal><AuditWalkthrough /></Reveal>

        {/* 16. Pricing */}
        <Reveal><Pricing /></Reveal>

        {/* 17. 2nd Lead form already presented on site */}
        <LeadWizard />


        {/* 19. Faqs */}
        <Reveal><FAQ /></Reveal>
        
        {/* 20. Free, ungated resources — deliberately after the offer, never before it. */}
        <Reveal><FreeResources /></Reveal>

        {/* 21. Blogs */}
        <Reveal><BlogTeaser /></Reveal>
      </main>

      <StickyMobileCTA />
      <ChatWidgetLazy />
    </>
  );
}