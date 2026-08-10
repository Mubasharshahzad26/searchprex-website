// app/tools/serp-checker/page.tsx
// Server Component — owns the SEO layer: metadata + www canonical + OG,
// BreadcrumbList, SoftwareApplication and FAQPage schema. UI lives in
// SerpCheckerClient. FAQs are declared here (server file) on purpose: exporting
// arrays from a "use client" file and importing them server-side breaks the build.

import type { Metadata } from "next";
import SerpCheckerClient from "./SerpCheckerClient";

import { getPageSEO } from "@/lib/admin-seo";
const SITE = "https://www.searchprex.com";

export const SERP_FAQS = [
  {
    q: "How does the SERP checker find my ranking?",
    a: "It pulls the live Google results page for your keyword and location, then scans the top 100 organic positions for your domain — subdomains included. You get the exact position, the URL that ranks, and the competitors sitting above you.",
  },
  {
    q: "Why does my position differ from what I see in Google?",
    a: "Your own searches are personalised by location, search history and device, and they often show your site higher than it really ranks. This tool checks a clean, un-personalised SERP for the country you pick, which is why it's the number worth tracking.",
  },
  {
    q: "What does the AI Overview row mean?",
    a: "Google increasingly answers queries with an AI Overview above the classic results. When your domain is cited there, it matters more than position #1 — so the tool flags it separately from your organic rank.",
  },
  {
    q: "Is it really free, and is there a limit?",
    a: "Free, no signup and no email gate. You can check up to 5 keywords per run, rate-limited to a few runs per minute so the tool stays fast for everyone. For continuous tracking across hundreds of keywords, that's what NicheSEO Pro is for.",
  },
];

const baseMetadata: Metadata = {
  // No "| SearchPrex" suffix here — app/layout.tsx applies
  // title.template = "%s | SearchPrex" and would double it.
  title: "Free SERP Checker — Check Your Google Ranking Position",
  description:
    "Check where your site ranks on Google for any keyword, in any country. See your exact position in the top 100, who outranks you, and which SERP features (AI Overview, local pack, PAA) are in play. Free, no signup.",
  alternates: { canonical: `${SITE}/tools/serp-checker` },
  openGraph: {
    title: "Free SERP Checker — Check Your Google Ranking Position | SearchPrex",
    description:
      "See your exact Google position for any keyword, who outranks you, and which SERP features are in play. Free, no signup.",
    url: `${SITE}/tools/serp-checker`,
    type: "website",
  },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/serp-checker", baseMetadata);
}

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
      { "@type": "ListItem", position: 3, name: "SERP Checker", item: `${SITE}/tools/serp-checker` },
    ],
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SERP Checker",
    url: `${SITE}/tools/serp-checker`,
    description:
      "Check your Google ranking position for any keyword and country. Shows your position in the top 100, the competing URLs above you, and the SERP features present.",
    applicationCategory: "SEO Tool",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "SearchPrex", url: SITE },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERP_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[breadcrumbSchema, appSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <SerpCheckerClient faqs={SERP_FAQS} />
    </>
  );
}
