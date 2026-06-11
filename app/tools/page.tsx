// app/tools/page.tsx
// Server Component — owns the SEO layer the old client-only page was missing:
// metadata + www canonical + OG, BreadcrumbList, ItemList of free tools
// (SoftwareApplication, price 0) and FAQPage schema. UI lives in ToolsClient.
 
import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";
 
const SITE = "https://www.searchprex.com";
 
// FAQ lives HERE (server file) — never export arrays from a "use client" file
// and import them in a server component; it breaks the build (client reference).
export const FAQS = [
  {
    q: "Are these tools really free?",
    a: "Yes — completely free, no signup, no email gate, no trial limits. They're the same utilities our founder uses daily on client projects; publishing them costs us nothing extra.",
  },
  {
    q: "How accurate are the results?",
    a: "Each tool follows Google's official documentation — the schema generator outputs spec-valid JSON-LD you can verify in Google's Rich Results Test. They're built and tested by a practicing SEO analyst, not a marketing team.",
  },
  {
    q: "When do the 'coming soon' tools launch?",
    a: "We ship one tool at a time and only release it once it's accurate enough to use on real client work. Meanwhile, the Schema Markup Generator is live, and NicheSEO Pro covers the advanced use cases at scale.",
  },
];
 
export const metadata: Metadata = {
  title: "Free SEO Tools — Schema Generator, SERP Simulator & More | SearchPrex",
  description:
    "Free SEO tools built by a practicing SEO analyst: JSON-LD schema markup generator, SERP simulator, meta tag analyzer, robots.txt tester and more. No signup, no paywalls.",
  alternates: { canonical: `${SITE}/tools` },
  openGraph: {
    title: "Free SEO Tools — Schema Generator, SERP Simulator & More | SearchPrex",
    description:
      "Free, no-signup SEO tools built by a practicing analyst — schema generator, SERP simulator, meta analyzer and more.",
    url: `${SITE}/tools`,
    type: "website",
  },
};
 
const toolSchemaList = [
  { name: "Schema Markup Generator", url: `${SITE}/tools/schema-generator`, desc: "Generate JSON-LD schema for Local Business, Law Firm, Product, FAQ, Article & Review." },
  { name: "SERP Simulator", url: `${SITE}/tools/serp-simulator`, desc: "Preview how your page looks in Google search results." },
  { name: "Meta Tag Analyzer", url: `${SITE}/tools/meta-tag-analyzer`, desc: "Audit any URL's title, meta description, Open Graph and Twitter Card tags." },
  { name: "Robots.txt Tester", url: `${SITE}/tools/robots-txt-tester`, desc: "Test if Googlebot can crawl any URL on your site." },
  { name: "Keyword Difficulty Checker", url: `${SITE}/tools/keyword-difficulty`, desc: "Estimate ranking difficulty for any keyword." },
];
 
export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
    ],
  };
 
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SearchPrex Free SEO Tools",
    itemListElement: toolSchemaList.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: t.name,
        url: t.url,
        description: t.desc,
        applicationCategory: "SEO Tool",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "SearchPrex", url: SITE },
      },
    })),
  };
 
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
 
  return (
    <>
      {[breadcrumbSchema, itemListSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ToolsClient faqs={FAQS} />
    </>
  );
}