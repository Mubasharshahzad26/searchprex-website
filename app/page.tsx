import type { Metadata } from "next";
 
// Homepage section components (root /components folder)
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import TrustBar from "../components/TrustBar";
import SEOAuditStrip from "../components/SEOAuditStrip";
import LeadWizard from "../components/LeadWizard";
import Services from "../components/Services";
// import WhyUs from "../components/WhyUs";                       // removed — replaced by AdvantageBand
import AdvantageBand from "../components/AdvantageBand";
// import PersonaSelector from "../components/PersonaSelector";   // removed from homepage
import AuroraBackground from "../components/AuroraBackground";
import Results from "../components/Results";
import VideoSection from "../components/VideoSection";

import AIVisibilityShowcase from "../components/AIVisibilityShowcase";
import SolutionsCarousel from "../components/SolutionsCarousel";
import NicheSEOProPromo from "../components/NicheSEOProPromo";
import FounderSection from "../components/FounderSection";
// import Process from "../components/Process";                  // removed from homepage
// import Pricing from "../components/Pricing";                  // removed from homepage
import LeadCaptureForm from "../components/LeadCaptureForm";
import FAQ from "../components/FAQ";
import BlogTeaser from "../components/BlogTeaser";
// import CTA from "../components/CTA";                          // "Dominate Your Market 2026" form — removed (no end CTA)
import ChatWidget from "../components/ChatWidget";
import Reveal from "@/components/Reveal";

 
// Single source of truth for the canonical origin.
const SITE = "https://www.searchprex.com";
 
 
export const metadata: Metadata = {
  title: "SEO Agency USA | Law Firm & Ecommerce SEO and Local SEO | SearchPrex",
  description:
    "SearchPrex is a US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
  alternates: {
    canonical: SITE,
  },
  openGraph: {
    title: "SEO Agency USA | Law Firm & Ecommerce SEO and Local SEO| SearchPrex",
    description:
      "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses. Verified GSC results.",
    url: SITE,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Agency USA | Law Firm & Ecommerce SEO | SearchPrex",
    description:
      "US-Focused SEO agency — law firm, ecommerce & local SEO. Verified GSC results.",
  },
};
 
export default function Home() {
 
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        "name": "SearchPrex",
        "url": SITE,
        "logo": `${SITE}/logo.png`,
        "description": "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
        "email": "contact@searchprex.com",
        "founder": { "@id": `${SITE}/#founder` },
        "areaServed": { "@type": "Country", "name": "United States" },
        "knowsAbout": [
          "Law Firm SEO", "Ecommerce SEO", "Shopify SEO", "Local SEO",
          "Technical SEO", "Core Web Vitals", "E-E-A-T", "AI Overviews (GEO/AEO)"
        ],
        "sameAs": [
          "https://www.linkedin.com/company/searchprex/",
          "https://www.youtube.com/@SearchPrex"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "SEO Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Law Firm SEO", "url": `${SITE}/services/law-firm-seo` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ecommerce & Shopify SEO", "url": `${SITE}/services/ecommerce-seo` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO", "url": `${SITE}/services/local-seo` } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audit", "url": `${SITE}/services/technical-seo` } }
          ]
        }
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#founder`,
        "name": "Mubashar Shahzad",
        "jobTitle": "Founder & SEO Strategist",
        "worksFor": { "@id": `${SITE}/#organization` },
        "knowsAbout": ["Technical SEO", "Ecommerce SEO", "Local SEO", "AEO/GEO/AIO"],
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
        "publisher": { "@id": `${SITE}/#organization` }
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        "url": SITE,
        "name": "SEO Agency USA | Law Firm & Ecommerce SEO | SearchPrex",
        "isPartOf": { "@id": `${SITE}/#website` },
        "about": { "@id": `${SITE}/#organization` }
      }
    ]
  };
 
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
 
        {/* 01 — HERO (above the fold — no reveal) */}
        <Hero />
 
        {/* 02 — CLIENT LOGOS */}
        <Reveal><ClientLogos /></Reveal>
 
        {/* 03 — TRUST BAR + SEO AUDIT STRIP */}
        <Reveal><TrustBar /></Reveal>
        <SEOAuditStrip />
 
        {/* 04 — SERVICES (wrapped in aurora gradient) */}
        <AuroraBackground variant="light">
          <Reveal><Services /></Reveal>
        </AuroraBackground>
 
        {/* 05 — WHY US / ADVANTAGE (Semrush-style — self-animated, no wrapper) */}
        {/* WhyUs comparison removed — uncomment to restore
        <WhyUs />
        */}
        <AdvantageBand />
 
        {/* 06 — LEAD WIZARD (Semrush-style lead capture — self-animated) */}
<LeadWizard />
 
        {/* 07 — RESULTS */}
        <Reveal><Results /></Reveal>
 
        {/* 08 — VIDEO PROOF (Toptal-style grid + modal) */}
        <Reveal><VideoSection /></Reveal>
 
        {/* 09 — FOUNDER */}
        <Reveal><FounderSection /></Reveal>
 
        {/* 10 — PROCESS removed from homepage — uncomment to restore
        <Reveal><Process /></Reveal>
        */}
 
        {/* 11 — AI VISIBILITY (AEO dashboard — self-animated, no wrapper) */}
        <AIVisibilityShowcase />
 
        {/* 12 — FREE TOOLS (bento — self-animated, no wrapper) */}
        <SolutionsCarousel />
 
        {/* 12.5 — NICHESEOPRO SAAS PROMO (self-animated, no wrapper) */}
        <NicheSEOProPromo />
 
        {/* 13 — PRICING removed from homepage — uncomment to restore
        <AuroraBackground variant="light">
          <Reveal><Pricing /></Reveal>
        </AuroraBackground>
        */}
 
        {/* 14 — LEAD CAPTURE FORM */}
        <Reveal><LeadCaptureForm /></Reveal>
 
        {/* 15 — FAQ */}
        <Reveal><FAQ /></Reveal>
 
        {/* 16 — BLOG TEASER (page ends here — no end CTA per request) */}
        <Reveal><BlogTeaser /></Reveal>
 
        {/* 17 — FINAL CTA removed (no end CTA). "Dominate Your Market 2026" form
            lives in components/CTA.tsx — uncomment import + this to restore:
        <Reveal><CTA /></Reveal>
        */}
 
      </main>
 
      <ChatWidget />
    </>
  );
}
 