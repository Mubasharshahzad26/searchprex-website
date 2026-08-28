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
import TroubleshootingAEO from "../components/TroubleshootingAEO";
import PersonaProblemHeader from "../components/PersonaProblemHeader";
import SectionBridge from "../components/SectionBridge";
import { Store, MapPin, Scale } from "lucide-react";
import EmotionalLeadForm from "../components/EmotionalLeadForm";
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

        {/* 3. Ecommerce Store issue and Solution */}
        <SectionBridge 
          title="How We Increase USA Based Business Revenue" 
          subtitle="We serve all 50 US states—from New York to California—specializing in turning failing marketing campaigns into highly profitable assets." 
        />
        <Reveal>
          <PersonaProblemHeader 
            audience="We Serve All 50 States"
            painPoint="Worried for your Ecommerce Store in the USA?"
            iconName="Store"
            accentColor="#3eb489"
          >
            <p>When a large catalog drops out of Google, running expensive PPC to cover the gap destroys your margins. I fix faceted navigation traps, rebuild canonical architecture, and force Google to re-index your revenue-driving URLs using the Indexing API. See the results below.</p>
          </PersonaProblemHeader>
        </Reveal>
        <Reveal><RevenueProof /></Reveal>

        {/* 4. Local SEO Issue and Solution */}
        <Reveal>
          <PersonaProblemHeader 
            audience="Local SEO Solutions"
            painPoint="Looking to Scale Your Small Local Business?"
            iconName="MapPin"
            accentColor="#7F77DD"
          >
            <p>Traditional local SEO is dead. If directories like Yelp and Angi are stealing your leads, I restructure your site and GBP profile so Google explicitly recommends your business as the single best local entity for the job in your specific city.</p>
          </PersonaProblemHeader>
        </Reveal>
        <Reveal><LocalSeoProof /></Reveal>

        {/* 5 & 6. Technical SEO issue & Solution as Mass non indexing recovery Ecommerce Store */}
        <Reveal>
          <PersonaProblemHeader 
            audience="Mass De-Indexing Recovery"
            painPoint="Stuck with your website's online visibility?"
            iconName="AlertTriangle"
            accentColor="#eab308"
          >
            <p>I don't just talk about fixing indexing issues; I publish the full recovery curve. Here is exactly how I restored indexation and revenue for a client that vanished from Google overnight.</p>
          </PersonaProblemHeader>
        </Reveal>
        <Reveal><RecoveryStory /></Reveal>
        
        {/* Client testimonial moved after Recovery Story */}
        <SectionBridge title="Client Verification" subtitle="What happens when these solutions land?" />
        <TrustpilotReviewSection />

        {/* 7 & 8. Law Firm SEO Issue & Free SaaS Solutions subscription */}
        <Reveal>
          <PersonaProblemHeader 
            audience="See we came with a solution for you"
            painPoint="Burst with PPC campaigns for your Law Firm?"
            iconName="Scale"
            accentColor="#185FA5"
          >
            <p className="mb-4">Ranking organically for semantic keywords like &apos;Family Law Attorney&apos; and &apos;Personal Injury Lawyer&apos; is the only sustainable way to replace $150+ PPC clicks with highly qualified, free traffic.</p>
            <div className="bg-[#185FA5]/10 border border-[#185FA5]/20 rounded-xl p-6 mt-6 inline-block">
              <p className="text-[#185FA5] font-bold text-xs mb-2 uppercase tracking-widest">My Solution Offer:</p>
              <p className="text-[#0a0f2e] font-bold">I provide a FREE 30-day SaaS Solution subscription for an AI Intake Assistant to test your efficiency first, before you even contact us for the SEO plan.</p>
            </div>
          </PersonaProblemHeader>
        </Reveal>

        {/* 9. Also benefit working directly with Founder */}
        <SectionBridge title="Under My Reservation" subtitle="What edge will you get working directly with the Founder?" />
        <Reveal><FounderSection /></Reveal>

        {/* 10. Emotional Lead Form */}
        <Reveal><EmotionalLeadForm /></Reveal>

        {/* 12. Process */}
        <SectionBridge title="My Process" subtitle="How we achieve this step-by-step" />
        <Reveal><Process /></Reveal>
        
        {/* 13. All results verified with video recording */}
        <SectionBridge title="Absolute Transparency" subtitle="All results verified with live video recordings" />
        <Reveal><ProofStrip /></Reveal>
        <Reveal><Results /></Reveal>

        {/* 14. Worried for Ai visibility section */}
        <SectionBridge title="Future-Proofing" subtitle="Worried about AI Visibility?" />
        <AIVisibilityShowcase />

        {/* 15. How Audit of a Website */}
        <SectionBridge title="The Methodology" subtitle="How I audit a website to find these gaps" />
        <Reveal><AuditWalkthrough /></Reveal>

        {/* 16. Pricing */}
        <Reveal><Pricing /></Reveal>

        {/* 17. 2nd Lead form already presented on site */}
        <LeadWizard />

        {/* 18. AI overview related content */}
        <Reveal><TroubleshootingAEO /></Reveal>

        {/* 19. Faqs */}
        <Reveal><FAQ /></Reveal>
        
        {/* 20. Blogs */}
        <Reveal><BlogTeaser /></Reveal>
      </main>

      <StickyMobileCTA />
      <ChatWidgetLazy />
    </>
  );
}