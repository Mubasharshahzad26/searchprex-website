import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CTA from "@/components/CTA";
 
const SITE = "https://www.searchprex.com";
 
export const metadata: Metadata = {
  title: "Free SEO Audit — Get Your 90-Day Roadmap | SearchPrex",
  description:
    "Get a free, founder-reviewed SEO audit tailored to Google's 2026 updates. We analyze your technical health, content quality, E-E-A-T signals and competitor gaps — delivered in 48 hours, no obligation.",
  alternates: { canonical: `${SITE}/free-audit` },
  openGraph: {
    title: "Free SEO Audit — Get Your 90-Day Roadmap | SearchPrex",
    description:
      "Founder-reviewed SEO audit tailored to Google's 2026 updates. Delivered in 48 hours, completely free.",
    url: `${SITE}/free-audit`,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SEO Audit | SearchPrex",
    description:
      "Founder-reviewed SEO audit — technical, content, E-E-A-T & competitor gaps. Delivered in 48 hours.",
  },
};
 
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE}/free-audit#service`,
      name: "Free SEO Audit",
      serviceType: "SEO Audit",
      provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
      areaServed: { "@type": "Country", name: "United States" },
      description:
        "A free, founder-reviewed SEO audit covering technical health, content quality, E-E-A-T signals and competitor positioning, delivered within 48 hours.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Free SEO Audit", item: `${SITE}/free-audit` },
      ],
    },
  ],
};
 
export default function FreeAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <CTA />
      </main>
    </>
  );
}
 