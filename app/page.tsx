import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PersonaSelector from "@/components/PersonaSelector";
import AITool from "@/components/AITool";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import FounderSection from "@/components/FounderSection";
import Results from "@/components/Results";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import NicheSEOPro from "@/components/NicheSEOPro";
import MultipleCTAs from "@/components/MultipleCTAs";
import Reviews from "@/components/Reviews";
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
        "streetAddress": "1250 Executive Place, Suite 450",
        "addressLocality": "Geneva",
        "addressRegion": "IL",
        "postalCode": "60134",
        "addressCountry": "US"
      },
      "telephone": "+1-800-555-1234",
      "email": "hello@searchprex.com",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "founder": {
        "@type": "Person",
        "name": "Mubashar Shahzad",
        "sameAs": [
          "https://linkedin.com/in/mubi00",
          "https://researchgate.net/profile/Mubashar-Shahzad"
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "87"
      }
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
 
        {/* 01 — HERO */}
        <Hero
          headline={homeData?.heroHeadline}
          subheadline={homeData?.heroSubheadline}
          ctaText={homeData?.heroCtaText}
          stat1Number={homeData?.stat1Number}
          stat1Label={homeData?.stat1Label}
          stat2Number={homeData?.stat2Number}
          stat2Label={homeData?.stat2Label}
          stat3Number={homeData?.stat3Number}
          stat3Label={homeData?.stat3Label}
          heroImage={homeData?.heroImage}
        />
 
        {/* 02 — VIDEO PROOF */}
        <VideoSection />
 
        {/* 03 — PERSONA SELECTOR */}
        <PersonaSelector />
 
        {/* 04 — AI TOOL (Free SEO audit) */}
        <AITool />
 
        {/* 05 — TRUST BAR */}
        <TrustBar />
 
        {/* 06 — SERVICES */}
        <Services />
 
        {/* 07 — FOUNDER SECTION */}
        <FounderSection />
 
        {/* 08 — RESULTS */}
        <Results />
 
        {/* 09 — PROCESS */}
        <Process />
 
        {/* 10 — PRICING */}
        <Pricing />
 
        {/* 11 — NICHE SEO PRO */}
        <NicheSEOPro />
 
        {/* 12 — MULTIPLE CTAS */}
        <MultipleCTAs />
 
        {/* 13 — REVIEWS */}
        <Reviews />
 
        {/* 14 — FAQ */}
        <FAQ />
 
        {/* 15 — FINAL CTA */}
        <CTA />
 
      </main>
 
      <ChatWidget />
    </>
  );
}
 










