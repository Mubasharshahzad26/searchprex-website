
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
 
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SearchPrex - USA SEO Agency",
    "description": "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
    "url": "https://searchprex.com",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "SearchPrex",
      "description": "Senior-led SEO services for law firms, ecommerce stores, and local businesses across the USA.",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1250 Executive Place, Suite 450", // ⚠️ VERIFY: real US address or remove
        "addressLocality": "Geneva",
        "addressRegion": "IL",
        "postalCode": "60134",
        "addressCountry": "US"
      },
      "telephone": "+1-800-555-1234", // ⚠️ PLACEHOLDER (555) — replace with real number or remove
      "email": "hello@searchprex.com", // ⚠️ VERIFY this inbox exists
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "founder": {
        "@type": "Person",
        "name": "Mubashar Shahzad",
        "sameAs": [
          "https://linkedin.com/in/mubi00", // ⚠️ VERIFY — earlier real URL was linkedin.com/in/mubashar-shahzad-seo/
          "https://researchgate.net/profile/Mubashar-Shahzad"
        ]
      }
      // ⚠️ aggregateRating REMOVED — fake review counts (87 reviews / 5★) risk a Google manual action.
      //    Re-add ONLY when you have real, verifiable reviews:
      // "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "87" }
    }
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
 
        {/* 02 — CLIENT LOGOS: "these brands trust us" */}
        <ClientLogos />
 
        {/* 03 — TRUST BAR: certifications & verified-on badges (moved up — credibility belongs near the top) */}
        <TrustBar />
 
        {/* ═══ WHAT WE DO + PICK YOUR PATH ═══ */}
        {/* 04 — SERVICES */}
        <Services />
 
        {/* 05 — PERSONA SELECTOR: route by industry  (NOTE: Hero already has a persona toggle — consider removing if redundant) */}
        <PersonaSelector />
 
        {/* ═══ PROOF ═══ */}
        {/* 06 — RESULTS: real GSC stat cards */}
        <Results />
 
        {/* 07 — VIDEO PROOF: full GSC video case studies */}
        <VideoSection />
 
        {/* ═══ WHO + HOW ═══ */}
        {/* 08 — FOUNDER: founder-led, E-E-A-T */}
        <FounderSection />
 
        {/* 09 — PROCESS: how we work, step by step */}
        <Process />
 
        {/* ═══ ENGAGE + DIFFERENTIATE ═══ */}
        {/* 10 — AI TOOL: free SEO audit (lead magnet / mid-page conversion) */}
        <AITool />
 
        {/* 11 — NICHE SEO PRO: our proprietary AI platform (differentiator) */}
        <NicheSEOPro />
 
        {/* ═══ CONVERT ═══ */}
        {/* 12 — PRICING */}
        <Pricing />
 
        {/* 13 — MULTIPLE CTAS: conversion paths */}
        <MultipleCTAs />
 
        {/* 14 — FAQ: final objections + FAQ schema for AI Overviews */}
        <FAQ />
 
        {/* 15 — FINAL CTA */}
        <CTA />
 
      </main>
 
      <ChatWidget />
    </>
  );
}
