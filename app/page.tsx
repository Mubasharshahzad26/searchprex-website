
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import PersonaSelector from "@/components/PersonaSelector";
import Results from "@/components/Results";
import VideoSection from "@/components/VideoSection";
import FounderSection from "@/components/FounderSection";
import Process from "@/components/Process";
import AITool from "@/components/AITool";
import NicheSEOPro from "@/components/NicheSEOPro";
import Pricing from "@/components/Pricing";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import MultipleCTAs from "@/components/MultipleCTAs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ChatWidget from "@/components/ChatWidget";
import { client } from "@/sanity/lib/client";
 
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
  title: "SEO Agency USA | Law Firm & Ecommerce SEO | SearchPrex",
  description:
    "SearchPrex is a US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
  alternates: {
    canonical: "https://searchprex.com",
  },
};
 
export default async function Home() {
  const homeData = await client.fetch(query);
 
  /* ── Advanced SEO: interlinked entity @graph ──
     Organization + Person (founder) + WebSite + WebPage + Service catalog.
     knowsAbout = topical-authority signal · sameAs = real verified profiles.
     NOTE: LocalBusiness with a US address was REMOVED until you have a real
     virtual address + US phone (fake NAP risks a Google penalty). Add it back
     as a separate node once those are live. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://searchprex.com/#organization",
        "name": "SearchPrex",
        "url": "https://searchprex.com",
        "logo": "https://searchprex.com/logo.png", // ⚠️ ensure this file exists in /public
        "description": "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
        "email": "hello@searchprex.com", // ⚠️ verify this inbox is live
        "founder": { "@id": "https://searchprex.com/#founder" },
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
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Law Firm SEO", "url": "https://searchprex.com/services/law-firm-seo" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ecommerce & Shopify SEO", "url": "https://searchprex.com/services/ecommerce-seo" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO", "url": "https://searchprex.com/services/local-seo" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audit", "url": "https://searchprex.com/services/technical-seo" } }
          ]
        }
      },
      {
        "@type": "Person",
        "@id": "https://searchprex.com/#founder",
        "name": "Mubashar Shahzad",
        "jobTitle": "Founder & SEO Strategist",
        "worksFor": { "@id": "https://searchprex.com/#organization" },
        "knowsAbout": ["Technical SEO", "Ecommerce SEO", "Local SEO", "AEO/GEO/AIO"],
        "sameAs": [
          "https://www.linkedin.com/in/mubashar-shahzad-seo/",
          "https://www.upwork.com/freelancers/~01400266ea842005be",
          "https://medium.com/@mubasharshahzad726"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://searchprex.com/#website",
        "url": "https://searchprex.com",
        "name": "SearchPrex",
        "publisher": { "@id": "https://searchprex.com/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": "https://searchprex.com/#webpage",
        "url": "https://searchprex.com",
        "name": "SEO Agency USA | Law Firm & Ecommerce SEO | SearchPrex",
        "isPartOf": { "@id": "https://searchprex.com/#website" },
        "about": { "@id": "https://searchprex.com/#organization" }
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
 
        {/* ═══ HOOK + INSTANT CREDIBILITY ═══ */}
        {/* 01 — HERO: hook, lead capture, persona toggle */}
        <Hero />
 
        {/* 02 — CLIENT LOGOS */}
        <ClientLogos />
 
        {/* 03 — TRUST BAR */}
        <TrustBar />
 
        {/* ═══ WHAT WE DO + PICK YOUR PATH ═══ */}
        {/* 04 — SERVICES */}
        <Services />
 
        {/* 05 — PERSONA SELECTOR (NOTE: Hero already has a persona toggle — consider removing if redundant) */}
        <PersonaSelector />
 
        {/* ═══ PROOF ═══ */}
        {/* 06 — RESULTS */}
        <Results />
 
        {/* 07 — VIDEO PROOF */}
        <VideoSection />
 
        {/* ═══ WHO + HOW ═══ */}
        {/* 08 — FOUNDER */}
        <FounderSection />
 
        {/* 09 — PROCESS */}
        <Process />
 
        {/* ═══ ENGAGE + DIFFERENTIATE ═══ */}
        {/* 10 — AI TOOL: free SEO audit (lead magnet) */}
        <AITool />
 
        {/* 11 — NICHE SEO PRO: proprietary platform (differentiator) */}
        <NicheSEOPro />
 
        {/* ═══ CONVERT ═══ */}
        {/* 12 — PRICING */}
        <Pricing />
 
        {/* 13 — LEAD CAPTURE: low-friction form right after price (catches hesitant buyers) */}
        <LeadCaptureForm />
 
        {/* 14 — MULTIPLE CTAS */}
        <MultipleCTAs />
 
        {/* 15 — FAQ: objections + FAQ schema for AI Overviews */}
        <FAQ />
 
        {/* 16 — FINAL CTA */}
        <CTA />
 
      </main>
 
      <ChatWidget />
    </>
  );
}
