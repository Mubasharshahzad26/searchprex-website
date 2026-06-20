import type { Metadata } from "next";
 
// Homepage section components (root /components folder)
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import Results from "../components/Results";
import ToolsShowcase from "@/components/ToolsShowcase";
import VideoSection from "../components/VideoSection";
import FounderSection from "../components/FounderSection";
import Process from "../components/Process";
// COMMENTED OUT: Comparison uses usePersona hook which requires PersonaProvider context
// import Comparison from "../components/Comparison";
import Pricing from "../components/Pricing";
import LeadCaptureForm from "../components/LeadCaptureForm";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import ChatWidget from "../components/ChatWidget";
import Reveal from "@/components/Reveal";
import BlogTeaser from "../components/BlogTeaser";
import PersonaSelector from "../components/PersonaSelector";
import { client } from "@/sanity/lib/client";
 
const SITE = "https://www.searchprex.com";
 
const query = `*[_type == "homePage"][0]{
  heroHeadline,
  heroSubheadline,
  heroCtaText,
  stat1Number,
  stat1Label,
  stat2Number,
  stat2Label,
  stat3Number,
  stat3Label,
  heroImage { asset-> },
}`;
 
export const metadata: Metadata = {
  title: "SEO Agency USA | Law Firm & Ecommerce SEO and Local SEO | SearchPrex",
  description: "SearchPrex is a US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
  alternates: {
    canonical: SITE,
  },
  openGraph: {
    title: "SEO Agency USA | Law Firm & Ecommerce SEO and Local SEO| SearchPrex",
    description: "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses. Verified GSC results.",
    url: SITE,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Agency USA | Law Firm & Ecommerce SEO | SearchPrex",
    description: "US-Focused SEO agency — law firm, ecommerce & local SEO. Verified GSC results.",
  },
};
 
export default async function Home() {
  let homeData;
  try {
    homeData = await client.fetch(query);
  } catch (error) {
    console.log("Sanity fetch error:", error);
    homeData = null;
  }
 
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "SearchPrex",
        url: SITE,
        logo: `${SITE}/logo.png`,
        description: "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
        email: "contact@searchprex.com",
        founder: { "@id": `${SITE}/#founder` },
        areaServed: { "@type": "Country", name: "United States" },
        knowsAbout: ["Law Firm SEO", "Ecommerce SEO", "Shopify SEO", "Local SEO", "Technical SEO", "Core Web Vitals", "E-E-A-T", "AI Overviews (GEO/AEO)"],
        sameAs: ["https://www.linkedin.com/company/searchprex/", "https://www.youtube.com/@SearchPrex"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "SEO Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Law Firm SEO", url: `${SITE}/services/law-firm-seo` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ecommerce & Shopify SEO", url: `${SITE}/services/ecommerce-seo` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO", url: `${SITE}/services/local-seo` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO Audit", url: `${SITE}/services/technical-seo` } },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#founder`,
        name: "Mubashar Shahzad",
        jobTitle: "Founder & SEO Strategist",
        worksFor: { "@id": `${SITE}/#organization` },
        knowsAbout: ["Technical SEO", "Ecommerce SEO", "Local SEO", "AEO/GEO/AIO"],
        sameAs: ["https://www.linkedin.com/in/mubashar-shahzad-seo/", "https://www.upwork.com/freelancers/~01400266ea842005be", "https://medium.com/@mubasharshahzad726"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "SearchPrex",
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: SITE,
        name: "SEO Agency USA | Law Firm & Ecommerce SEO | SearchPrex",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
      },
    ],
  };
 
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main-content">
 
        {/* 01 — HERO (above the fold — no reveal) */}
        <Hero />
 
        {/* 02 — CLIENT LOGOS */}
        <Reveal><ClientLogos /></Reveal>
 
        {/* 03 — TRUST BAR */}
        <Reveal><TrustBar /></Reveal>
 
        {/* 04 — SERVICES */}
        <Reveal><Services /></Reveal>
 
        {/* 05 — PERSONA SELECTOR (Tell us about yourself) */}
        <Reveal><PersonaSelector /></Reveal>
 
        {/* 06 — RESULTS */}
        <Reveal><Results /></Reveal>
 
        {/* 07 — VIDEO PROOF */}
        <Reveal><VideoSection /></Reveal>
 
        {/* 08 — FOUNDER */}
        <Reveal><FounderSection /></Reveal>
 
        {/* 09 — PROCESS */}
        <Reveal><Process /></Reveal>
 
        {/* 10 — FREE TOOLS (bento — self-animated, no wrapper) */}
        <ToolsShowcase />
 
        {/* 
          11 — WHY US (comparison table — COMMENTED OUT)
          REASON: Uses usePersona hook which requires PersonaProvider context
          STATUS: Temporarily disabled for production deployment
          TODO: Will be re-enabled after fixing PersonaContext setup
        */}
        {/* <Comparison /> */}
 
        {/* 12 — PRICING */}
        <Reveal><Pricing /></Reveal>
 
        {/* 13 — LEAD CAPTURE FORM */}
        <Reveal><LeadCaptureForm /></Reveal>
 
        {/* 14 — FAQ */}
        <Reveal><FAQ /></Reveal>
 
        {/* 15 — FROM THE BLOG */}
        <Reveal><BlogTeaser /></Reveal>
 
        {/* 16 — FINAL CTA */}
        <Reveal><CTA /></Reveal>
 
      </main>
 
      <ChatWidget />
    </>
  );
}
 