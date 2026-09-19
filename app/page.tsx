import type { Metadata } from "next";
// import { getPageSEO } from "@/lib/admin-seo";
// Homepage section components (root /components folder)
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
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
import FounderSection from "../components/FounderSection";
import FAQ from "../components/FAQ";
import EmotionalLeadForm from "../components/EmotionalLeadForm";
import FreeResources from "../components/FreeResources";
import BlogTeaser from "../components/BlogTeaser";
import Reveal from "@/components/Reveal";
import ChatWidgetLazy from "@/components/ChatWidgetLazy";

import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

// The title, the H1 in components/Hero.tsx and this description all lead with
// the same phrase. They used to disagree: the title said "Boutique SEO Agency
// USA", the H1 said "Law Firm SEO", and "SEO agency" appeared nowhere in the
// body. The title is 53 characters and the description 144, so Google shows
// both whole instead of truncating at ~60 and ~155.
const HOME_TITLE = "Founder-Led SEO Agency for US Businesses | SearchPrex";
const HOME_DESCRIPTION =
  "Founder-led SEO agency for US law firms, Shopify stores and local service businesses. Senior work only, backed by unedited Search Console proof.";

const baseMetadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { 
    canonical: SITE,
    languages: {
      "en-US": SITE,
      "x-default": SITE,
    }
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata;
}

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    // Organization, founder and WebSite come from lib/site-schema.ts via the
    // root layout. This graph only adds what is specific to the homepage and
    // points at those by @id.
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        "url": SITE,
        "name": HOME_TITLE,
        "description": HOME_DESCRIPTION,
        "isPartOf": websiteRef,
        "about": organizationRef,
        // The generated default card (app/opengraph-image.tsx). This was
        // `${SITE}/og-image.jpg`, a file that has never existed in public/, so
        // the structured data pointed Google at a 404.
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${SITE}/opengraph-image`
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
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-08-07",
        "representativeOfPage": false
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-smk-revenue-before`,
        "contentUrl": `${SITE}/images/proof/smk-revenue-before.png`,
        "caption":
          "SMK Store WooCommerce net sales for April 2026: $5,832.02 for the month, top seller at 200 units.",
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-04-30"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-smk-revenue-after`,
        "contentUrl": `${SITE}/images/proof/smk-revenue-after.png`,
        "caption":
          "SMK Store WooCommerce net sales for June 2026: $19,100.71 for the month, top seller at 300 units — a 227% increase over April.",
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-06-30"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-revenue-before`,
        "contentUrl": `${SITE}/images/proof/mso-revenue-1-jul20.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 20 July 2026: $0.00 for the month.",
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-07-20"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-revenue-mid`,
        "contentUrl": `${SITE}/images/proof/mso-revenue-2-aug06.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 6 August 2026: $206.63 for the month.",
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-08-06"
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE}/#proof-revenue-after`,
        "contentUrl": `${SITE}/images/proof/mso-revenue-3-aug17.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 17 August 2026: $311.05 month to date.",
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-08-17"
      }
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
        <Reveal><TrustpilotReviewSection /></Reveal>

        {/* Directly after the de-indexing recovery, because that recovery is
            this tool's own first case study — same client, same run. Anywhere
            further down and it reads as an unrelated upsell instead of the
            answer to "how did one person ship 11,549 pages?" */}
        <Reveal><NicheSeoProShowcase /></Reveal>

        <Reveal><LawFirmProof /></Reveal>

        <Reveal><FounderSection /></Reveal>

        {/* 10. Emotional Lead Form */}
        <Reveal><EmotionalLeadForm /></Reveal>

        <Reveal><Process /></Reveal>
        
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