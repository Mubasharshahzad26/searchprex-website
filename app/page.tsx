import type { Metadata } from "next";

// Sab ke sath '../components' likh diya hai kyunki folder baahir chala gaya hai
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import TrustBar from "../components/TrustBar";
import Services from "../components/Services";
import PersonaSelector from "../components/PersonaSelector";
import Results from "../components/Results";
import ToolsShowcase from "@/components/ToolsShowcase";
import VideoSection from "../components/VideoSection";
import FounderSection from "../components/FounderSection";
import Process from "../components/Process";
import AITool from "../components/AITool";
import NicheSEOPro from "../components/NicheSEOPro";
import Pricing from "../components/Pricing";
import LeadCaptureForm from "../components/LeadCaptureForm";
import MultipleCTAs from "../components/MultipleCTAs";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import BlogTeaser from "../components/BlogTeaser";
import ChatWidget from "../components/ChatWidget";
import { client } from "@/sanity/lib/client";

// Single source of truth for the canonical origin.
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

export default async function Home() {
  const homeData = await client.fetch(query);

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

        {/* 01 — HERO */}
        <Hero />

        {/* 02 — CLIENT LOGOS */}
        <ClientLogos />

        {/* 03 — TRUST BAR */}
        <TrustBar />

        {/* 04 — SERVICES */}
        <Services />

        {/* 05 — PERSONA SELECTOR */}
        <PersonaSelector />

        {/* 06 — RESULTS */}
        <Results />

        {/* 07 — VIDEO PROOF */}
        <VideoSection />

        {/* 08 — FOUNDER */}
        <FounderSection />

        {/* 09 — PROCESS */}
        <Process />

        {/* 09 — PROCESS */}
        <Process />

        {/* 10 — FREE TOOLS (bento) */}
        <ToolsShowcase />

        {/* 11 — PRICING */}
        <Pricing />

        {/* 12 — PRICING */}
        <Pricing />

        {/* 13 — LEAD CAPTURE FORM */}
        <LeadCaptureForm />

        {/* 14 — MULTIPLE CTAS */}
        <MultipleCTAs />

        {/* 15 — FAQ */}
        <FAQ />

        {/* 16 — FINAL CTA */}
        <CTA />

      </main>

      <ChatWidget />
    </>
  );
}