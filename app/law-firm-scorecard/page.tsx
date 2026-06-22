import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScorecardClient from "./ScorecardClient";
 
const SITE = "https://www.searchprex.com";
const URL = `${SITE}/law-firm-scorecard`;
 
export const metadata: Metadata = {
  title: "Law Firm SEO Scorecard — Grade Your Firm's Visibility | SearchPrex",
  description:
    "Free tool: see if Google and AI recommend your law firm. Instantly grade your Map Pack, organic rankings, AI visibility (AEO), legal E-E-A-T & schema, and practice-area content — with prioritized fixes.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Law Firm SEO Scorecard | SearchPrex",
    description:
      "Will Google and AI recommend your law firm? Grade your visibility across 5 pillars in seconds, with a prioritized action plan.",
    url: URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm SEO Scorecard | SearchPrex",
    description:
      "Grade your law firm's Map Pack, organic, AI visibility, E-E-A-T & content — free, in seconds.",
  },
};
 
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${URL}#app`,
      name: "Law Firm SEO Scorecard",
      url: URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
      description:
        "A free tool that grades a law firm's search visibility across five pillars — Google Map Pack, organic rankings, AI visibility (AEO), legal E-E-A-T & schema, and practice-area content — and returns a prioritized action plan.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Law Firm SEO Scorecard", item: URL },
      ],
    },
  ],
};
 
export default function LawFirmScorecardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <ScorecardClient />
      </main>
    </>
  );
}
 