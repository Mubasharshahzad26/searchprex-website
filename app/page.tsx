import type { Metadata } from "next";
// import { getPageSEO } from "@/lib/admin-seo";
// Homepage section components (root /components folder)
import HeroV2 from "../components/HeroV2";
import ClientLogos from "../components/ClientLogos";
import RevenueProof from "../components/RevenueProof";
import RecoveryStory from "../components/RecoveryStory";
import LocalSeoProof from "../components/LocalSeoProof";
import LawFirmProof from "../components/LawFirmProof";
import TrustBar from "../components/TrustBar";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import StickyMobileCTA from "../components/StickyMobileCTA";
import Services from "../components/Services";
import AuroraBackground from "../components/AuroraBackground";
import TrustpilotReviewSection from "@/components/TrustpilotReviewSection";
import FounderSection from "../components/FounderSection";
import FAQ from "../components/FAQ";
import FreeResources from "../components/FreeResources";
import BlogTeaser from "../components/BlogTeaser";
import Reveal from "@/components/Reveal";
import ChatWidgetLazy from "@/components/ChatWidgetLazy";

import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

// The title, the H1 in components/Hero.tsx and this description all name the
// same three verticals with "SEO agency". They used to disagree: the title
// said "Boutique SEO Agency USA", the H1 said "Law Firm SEO", and "SEO agency"
// appeared nowhere in the body. The title is 51 characters and the description
// 134, so Google shows both whole instead of truncating at ~60 and ~155.
const HOME_TITLE = "US SEO Agency — Law Firm, Ecommerce & Local SEO | SearchPrex";
const HOME_DESCRIPTION =
  "Revenue-driven SEO for US law firms, ecommerce stores and local businesses. Founder-led, one client per city. Get your free competitor tear-down.";

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
        "contentUrl": `${SITE}/images/proof/mso-revenue-3-sep25.png`,
        "caption":
          "Michigan Outdoor Sports WooCommerce net sales, 25 September 2026: $523.49 month to date.",
        "creator": founderRef,
        "creditText": "SearchPrex — Mubashar Sharif",
        "datePublished": "2026-09-25"
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
        {/* Claim -> proof -> offer. Nothing links off-site before the offer.
            Moved off this page in Phase 2:
              LawFirmStack     -> /services/law-firm-seo (1 of 3 personas, and
                                  it sent visitors to codeloci.com mid-funnel)
              SolutionsCarousel -> /tools (six more "things we do", after three
                                  proof sections had already run long) */}
        {/* HeroV2, not Hero. The old hero hid two of its three personas behind
            tabs that replaced the lead form with a YouTube embed, ran two
            duplicate forms, and submitted nothing — both CTAs pushed to
            /free-audit where the visitor retyped everything. HeroV2 submits in
            place. components/Hero.tsx is kept for now so the change can be
            reverted in one line. */}
        <HeroV2 />
        <Reveal><ClientLogos /></Reveal>
        <Reveal><TrustBar /></Reveal>

        {/* 2. Services */}
        <AuroraBackground variant="light">
          <Reveal><Services /></Reveal>
        </AuroraBackground>

        {/* 3. Proof, all of it together: ecommerce revenue, local map pack,
            the de-indexing recovery, then where the law firm evidence stands
            (which points back at the screenshots above it). */}
        <Reveal><RevenueProof /></Reveal>
        <Reveal><LocalSeoProof /></Reveal>
        <Reveal><RecoveryStory /></Reveal>
        <Reveal><LawFirmProof /></Reveal>

        {/* 4. What clients say, then who does the work. */}
        <Reveal><TrustpilotReviewSection /></Reveal>
        <Reveal><FounderSection /></Reveal>

        {/* 5. How it works, what it costs, what people ask. The page carries
            no lead forms of its own any more (it had four); the audit CTAs
            all go to /free-audit. */}
        <Reveal><Process /></Reveal>
        <Reveal><Pricing /></Reveal>
        <Reveal><FAQ /></Reveal>

        {/* 6. Free, ungated resources — deliberately after the offer, never before it. */}
        <Reveal><FreeResources /></Reveal>
        <Reveal><BlogTeaser /></Reveal>
      </main>

      <StickyMobileCTA />
      <ChatWidgetLazy />
    </>
  );
}
