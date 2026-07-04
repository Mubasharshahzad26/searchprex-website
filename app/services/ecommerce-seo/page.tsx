// app/services/ecommerce-seo/page.tsx
// Server Component. Owns metadata (canonical, Open Graph, Twitter Card)
// and JSON-LD (Service + BreadcrumbList + FAQPage). The interactive UI
// lives in EcommerceSEOClient (a client island).
 
import type { Metadata } from "next";
import EcommerceSEOClient from "./EcommerceSEOClient";
 
const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/services/ecommerce-seo`;
const OG_IMAGE = `${SITE}/images/og-ecommerce-seo.jpg`; // TODO: add this image to /public/images if it doesn't exist yet
 
export const metadata: Metadata = {
  title: "Ecommerce SEO Services — Fix Indexing & Grow Revenue | SearchPrex",
  description:
    "Founder-led ecommerce SEO for Shopify and WooCommerce stores. We fix mass non-indexing, thin content, and Core Web Vitals — then build organic revenue that compounds. See how we grew SMK Store's US revenue by 75% in 2 months.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Ecommerce SEO Services — Fix Indexing & Grow Revenue | SearchPrex",
    description:
      "Founder-led ecommerce SEO for Shopify and WooCommerce stores. Fix mass non-indexing, thin content, and Core Web Vitals — verified Google Search Console results.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SearchPrex Ecommerce SEO Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce SEO Services — Fix Indexing & Grow Revenue | SearchPrex",
    description:
      "Founder-led ecommerce SEO for Shopify and WooCommerce stores. Verified Google Search Console results — no vanity metrics.",
    images: [OG_IMAGE],
  },
};
 
export default function Page() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Ecommerce SEO",
    name: "Ecommerce SEO Services",
    description:
      "Technical SEO, product page optimization, category page SEO, and content strategy for Shopify and WooCommerce stores — fixing mass non-indexing, thin content, and Core Web Vitals issues.",
    provider: {
      "@type": "Organization",
      name: "SearchPrex",
      url: SITE,
      founder: {
        "@type": "Person",
        name: "Mubashar Shahzad",
        jobTitle: "SEO Analyst & Founder",
        sameAs: ["https://www.linkedin.com/in/mubashar-shahzad-seo"],
      },
    },
    areaServed: ["United States", "United Kingdom", "United Arab Emirates"],
    audience: {
      "@type": "Audience",
      audienceType: "Ecommerce store owners on Shopify and WooCommerce",
    },
  };
 
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
      { "@type": "ListItem", position: 3, name: "Ecommerce SEO", item: PAGE_URL },
    ],
  };
 
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you work with Shopify and WooCommerce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — both platforms and more. We understand the specific technical quirks of Shopify (duplicate URLs, pagination, collection filters) and WooCommerce (plugin conflicts, crawl waste) at a deep level.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle thousands of product pages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use a batch-based approach — prioritizing high-revenue categories and brands first, then working through the catalog systematically. We've done this on a live 35,000+ SKU store.",
        },
      },
      {
        "@type": "Question",
        name: "How long before I see revenue impact?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most stores see indexation improvements in 30–45 days and ranking gains in 60–90 days.",
        },
      },
      {
        "@type": "Question",
        name: "Can you fix our non-indexing problem?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we've solved mass non-indexing for multiple stores. The root cause is usually thin/duplicate content, which we rewrite brand by brand and resubmit in waves to GSC.",
        },
      },
      {
        "@type": "Question",
        name: "Is your content aligned with Google's 2026 core updates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Completely. Every page follows Google's people-first, E-E-A-T, and Helpful Content guidelines — original, experience-driven content, never written to word counts or stuffed with keywords.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a contract?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No long-term contracts. We earn your business every month with results.",
        },
      },
    ],
  };
 
  const schemas = [serviceSchema, breadcrumbSchema, faqSchema];
 
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <EcommerceSEOClient />
    </>
  );
}
 