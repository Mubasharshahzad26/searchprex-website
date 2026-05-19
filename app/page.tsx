import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Specialists from "@/components/Specialists";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Process from "@/components/Process";
import CEOMessage from "@/components/CEOMessage";
import Pricing from "@/components/Pricing";
import NicheSEOPro from "@/components/NicheSEOPro";
import MultipleCTAs from "@/components/MultipleCTAs";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AITool from "@/components/AITool";
import FounderSection from "@/components/FounderSection";
import { client } from "@/sanity/lib/client";
import PersonaSelector from "@/components/PersonaSelector";

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
    "SearchPrex is a USA-based SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
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
    "description": "USA-based SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
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
        <PersonaSelector />
        <AITool />
        <TrustBar />
        <Specialists />
        <Services />
        <FounderSection />

        <Results />
        <Process />
       
        <Pricing />
        <NicheSEOPro />
        <MultipleCTAs />
        <About />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}