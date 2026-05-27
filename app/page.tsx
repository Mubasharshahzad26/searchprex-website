import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PersonaSelector from "@/components/PersonaSelector";
import SEOAuditForm from "@/components/SEOAuditForm";
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
 
        {/* 04 — FREE SEO AUDIT FORM */}
        <section style={{ background: "#0a0f2e", padding: "96px 24px" }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "64px",
            alignItems: "center",
          }}>
            {/* Left — Copy */}
            <div style={{ color: "#fff" }}>
              <span style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "6px 14px",
                borderRadius: "6px",
                marginBottom: "20px",
              }}>
                FREE SEO AUDIT
              </span>
 
              <h2 style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "0 0 20px",
                color: "#fff",
              }}>
                Dominate Your Market<br />in 2026
              </h2>
 
              <p style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}>
                Get a comprehensive SEO audit tailored to Google&apos;s March 2026
                core update. We&apos;ll analyze your site&apos;s technical health, content
                quality, E-E-A-T signals, and competitor positions.
              </p>
 
              <ul style={{
                listStyle: "none",
                margin: "0 0 28px",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
                {[
                  "Full technical SEO analysis",
                  "Top keyword opportunities for your niche",
                  "Competitor gap analysis",
                  "Actionable recommendations — not generic advice",
                  "Delivered in 48 hours, completely free",
                ].map((f) => (
                  <li key={f} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.85)",
                  }}>
                    <span>✅</span> {f}
                  </li>
                ))}
              </ul>
 
              <div style={{
                display: "flex",
                gap: "20px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "24px",
                flexWrap: "wrap",
              }}>
                <span>🔒 100% Confidential</span>
                <span>⏱ 48hr Turnaround</span>
                <span>⭐ No Obligation</span>
              </div>
 
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "10px",
                padding: "14px 18px",
              }}>
                <span style={{
                  width: "10px",
                  height: "10px",
                  background: "#22c55e",
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: "4px",
                  display: "inline-block",
                }} />
                <div>
                  <strong style={{ display: "block", color: "#22c55e", fontSize: "14px", marginBottom: "2px" }}>
                    Only 3 Audit Spots Remaining This Month
                  </strong>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: 0 }}>
                    Due to high demand, we limit audits to ensure quality
                  </p>
                </div>
              </div>
            </div>
 
            {/* Right — Form */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SEOAuditForm />
            </div>
          </div>
        </section>
 
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
 








