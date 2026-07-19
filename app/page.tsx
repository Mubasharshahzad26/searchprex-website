import type { Metadata } from "next";
 
// Homepage section components (root /components folder)
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import TrustBar from "../components/TrustBar";
import SEOAuditStrip from "../components/SEOAuditStrip";
import LeadWizard from "../components/LeadWizard";
import Services from "../components/Services";
import AdvantageBand from "../components/AdvantageBand";
import AuroraBackground from "../components/AuroraBackground";
import Results from "../components/Results";
import VideoSection from "../components/VideoSection";
import AIVisibilityShowcase from "../components/AIVisibilityShowcase";
import SolutionsCarousel from "../components/SolutionsCarousel";
import ReviewsSection from "@/components/ReviewsSection";
import TrustpilotReviewSection from "@/components/TrustpilotReviewSection";  // ← NEW
import { trustpilotReviewSchema } from "@/lib/trustpilot-review-schema";  // ← NEW
import NicheSEOProPromo from "../components/NicheSEOProPromo";
import FounderSection from "../components/FounderSection";
import LeadCaptureForm from "../components/LeadCaptureForm";
import FAQ from "../components/FAQ";
import BlogTeaser from "../components/BlogTeaser";
import ChatWidget from "../components/ChatWidget";
import Reveal from "@/components/Reveal";

 
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
      },
      trustpilotReviewSchema  // ← ADDED
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
 
        <Hero />
        <Reveal><ClientLogos /></Reveal>
        <Reveal><TrustBar /></Reveal>
        <SEOAuditStrip />
 
        <AuroraBackground variant="light">
          <Reveal><Services /></Reveal>
        </AuroraBackground>
 
        <AdvantageBand />
        <LeadWizard />
        <Reveal><Results /></Reveal>
        <Reveal><VideoSection /></Reveal>
        <Reveal><FounderSection /></Reveal>
        <AIVisibilityShowcase />
 
        <SolutionsCarousel />
        <ReviewsSection />
        <TrustpilotReviewSection />  {/* ← ADDED HERE */}
 
        <NicheSEOProPromo />
        <Reveal><LeadCaptureForm /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><BlogTeaser /></Reveal>
 
      </main>
 
      <ChatWidget />
    </>
  );
}