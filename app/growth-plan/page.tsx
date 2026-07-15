import type { Metadata } from "next";
import Script from "next/script";
import GrowthPlanClient from "./GrowthPlanClient";
 
const PAGE_URL = "https://www.searchprex.com/growth-plan";
const OG_IMAGE = "https://www.searchprex.com/og/growth-plan.jpg";
 
export const metadata: Metadata = {
  title: "Get Your SEO Growth Plan | Free 90-Day Roadmap | SearchPrex",
  description:
    "Get a founder-reviewed SEO growth plan in 5 minutes. Site audit, competitor benchmark, and 90-day action roadmap — delivered within 24 hours. No commitment, no credit card.",
  keywords: [
    "free SEO audit",
    "SEO growth plan",
    "SEO consulting",
    "SEO strategy",
    "SEO roadmap",
    "ecommerce SEO audit",
    "law firm SEO audit",
    "local SEO audit",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "SearchPrex",
    title: "Get Your SEO Growth Plan | SearchPrex",
    description:
      "Founder-reviewed audit + 90-day roadmap. Delivered within 24 hours. No commitment.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "SearchPrex Growth Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your SEO Growth Plan | SearchPrex",
    description:
      "Founder-reviewed audit + 90-day roadmap. Delivered within 24 hours. No commitment.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};
 
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "SEO Growth Plan Audit",
  serviceType: "SEO Consultation",
  url: PAGE_URL,
  description:
    "Free founder-reviewed SEO audit with technical analysis, competitor benchmarking, and a 90-day action roadmap delivered within 24 hours.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.searchprex.com/#organization",
    name: "SearchPrex",
    url: "https://www.searchprex.com",
    founder: {
      "@type": "Person",
      name: "Mubashar Shahzad",
      sameAs: ["https://www.linkedin.com/in/mubashar-shahzad/"],
    },
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free SEO Growth Plan audit — no commitment required",
  },
};
 
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
    { "@type": "ListItem", position: 2, name: "Growth Plan", item: PAGE_URL },
  ],
};
 
export default function GrowthPlanPage() {
  return (
    <>
      <Script
        id="growth-plan-service-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="growth-plan-breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GrowthPlanClient />
    </>
  );
}
 