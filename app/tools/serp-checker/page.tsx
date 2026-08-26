// app/tools/serp-checker/page.tsx
// Server Component — owns the SEO layer: metadata + www canonical + OG,
// BreadcrumbList, SoftwareApplication and FAQPage schema. UI lives in
// SerpCheckerClient. FAQs are declared here (server file) on purpose: exporting
// arrays from a "use client" file and importing them server-side breaks the build.

import type { Metadata } from "next";
import SerpCheckerClient from "./SerpCheckerClient";

import { getPageSEO } from "@/lib/admin-seo";
const SITE = "https://www.searchprex.com";

// These are rendered on the page AND emitted as FAQPage schema, so they have to
// describe the tool as it actually behaves right now. The previous set opened
// with "It pulls the live Google results page for your keyword" — untrue while
// the tool runs in preview mode, and untrue in structured data is a worse
// problem than untrue in body copy.
export const SERP_FAQS = [
  {
    q: "Is the SERP Checker live yet?",
    a: "It runs in preview mode today. That means it shows you which SERP features are in play for a query and what a top-10 layout looks like, but it will not tell you your position — because it cannot measure it yet. Live position tracking switches on once the data provider is connected. Until then, the founder will check your keywords by hand and send you the real numbers free within 24 hours.",
  },
  {
    q: "Why won't the tool just estimate my ranking?",
    a: "Because an estimate dressed up as a position is worse than no answer. An invented '#47' next to your domain looks exactly like a real measurement, and you would make decisions on it. When we don't know, the tool says so.",
  },
  {
    q: "How will the SERP checker find my ranking once it's live?",
    a: "It pulls the Google results page for your keyword and location, then scans the top 100 organic positions for your domain — subdomains included. You get the exact position, the URL that ranks, and the competitors sitting above you.",
  },
  {
    q: "Why does my position differ from what I see in Google?",
    a: "Your own searches are personalised by location, search history and device, and they often show your site higher than it really ranks. A clean, un-personalised check for the country you pick is the number worth tracking.",
  },
  {
    q: "What is a SERP feature?",
    a: "Anything on a Google results page that isn't a plain blue link — AI Overviews, featured snippets, People Also Ask boxes, local packs, image rows, top stories, shopping listings and knowledge panels. They push organic results down the page, so ranking #1 beneath three of them can earn fewer clicks than ranking #4 on a clean SERP.",
  },
  {
    q: "What does the AI Overview row mean?",
    a: "Google increasingly answers queries with an AI Overview above the classic results. When your domain is cited there it matters more than position #1, so the tool flags it separately from your organic rank.",
  },
  {
    q: "Is it really free, and is there a limit?",
    a: "Free, no signup and no email gate. You can check up to 5 keywords per run. For continuous tracking across hundreds of keywords, that's what NicheSEO Pro is for.",
  },
];

const baseMetadata: Metadata = {
  // No "| SearchPrex" suffix here — app/layout.tsx applies
  // title.template = "%s | SearchPrex" and would double it.
  title: "Free SERP Checker — Check Your Google Ranking Position",
  // Describes what a visitor actually gets today. Promising "your exact position
  // in the top 100" while the tool runs in preview mode buys a click and loses
  // the trust it was bought with.
  description:
    "See which SERP features (AI Overview, local pack, People Also Ask) own any Google query and what the top 10 looks like. Free, no signup — plus a founder-run check of your real ranking within 24 hours.",
  alternates: { canonical: `${SITE}/tools/serp-checker` },
  openGraph: {
    title: "Free SERP Checker — Check Your Google Ranking Position | SearchPrex",
    description:
      "See which SERP features own any Google query, what the top 10 looks like, and get your real ranking checked free within 24 hours.",
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
      "Check which SERP features are in play for any keyword and country, and what the top 10 looks like. Live position tracking in preview.",
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
