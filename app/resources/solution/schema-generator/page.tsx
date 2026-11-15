import type { Metadata } from "next";
import Link from "next/link";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import {
  Breadcrumb,
  CardGrid,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
} from "@/components/layout";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import SchemaGeneratorClient from "@/app/tools/schema-generator/SchemaGeneratorClient";

const PAGE_URL = `${SITE}/resources/solution/schema-generator`;
const TITLE = "Free Schema Markup Generator (JSON-LD Tool)";
const DESCRIPTION =
  "Generate 100% valid JSON-LD schema markup for US local businesses, law firms, eCommerce stores, articles, and reviews. Boost Google rich results with zero code.";
const LAST_REVIEWED = "2026-11-12";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: `${TITLE} | SearchPrex`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const STATS = [
  { value: "100%", label: "Google Rich Results Valid" },
  { value: "0", label: "Cost & Zero Coding Required" },
  { value: "7", label: "Schema Types Supported" },
  { value: "< 60s", label: "Average Generation Time" },
];

const WHICH_SCHEMAS = [
  {
    title: "US Local Businesses & Contractors",
    label: "LocalBusiness Schema",
    body: "Essential for US local contractors, plumbers, electricians, HVAC services, and storefronts. Specifies your official legal business name, street address, local phone number (NAP), operating hours, and price range. For maximum Google Maps 3-Pack rankings, your schema NAP must match your Google Business Profile (GBP) and US local citations exactly.",
  },
  {
    title: "Law Firms & Attorneys",
    label: "LegalService Schema",
    body: "Tailored specifically for US personal injury, criminal defense, family law, and commercial litigation practices. Pairs LegalService at the firm level with individual Person schemas for attorneys. Connects your practice areas via knowsAbout and your geographic jurisdiction via areaServed (city, county, or state).",
  },
  {
    title: "Shopify & eCommerce Stores",
    label: "Product & Offer Schema",
    body: "Critical for eCommerce product pages. Automatically marks up SKU, brand, GTIN/UPC, currency, and stock availability. Qualifies your products for Google Shopping rich snippets showing real-time price drops, star ratings, and 'In Stock' badges that dramatically lift click-through rate.",
  },
  {
    title: "Articles, Guides & Blog Posts",
    label: "Article & BlogPosting",
    body: "Designed for content hubs, news desks, and authority blogs. Signals author entity, datePublished, dateModified, and publisher details. Crucial for E-E-A-T grounding in Google AI Overviews and appearing in Google Discover feeds.",
  },
  {
    title: "Service Pages & Agency Offerings",
    label: "Service Schema",
    body: "Perfect for B2B consultancies, marketing agencies, and professional services. Maps service types, provider hierarchy, areaServed, and serviceOutput for entity disambiguation in Google's Knowledge Graph.",
  },
  {
    title: "FAQ Sections",
    label: "FAQPage Schema",
    body: "Turns accordion FAQs into structured question-and-answer pairs. While Google has restricted public FAQ rich results primarily to authoritative government and health sites, JSON-LD FAQ data remains heavily indexed and cited by Google AI Mode and LLM answer engines.",
  },
];

const FAQS = [
  {
    q: "What is schema markup and why does it matter for SEO?",
    a: "Schema markup is code (written in JSON-LD format) that you place on your website to help search engines understand your content. Instead of Google guessing what your page is about, schema explicitly tells Google: 'This is a local plumbing business in Dallas, Texas, with phone number (214) 555-0199 and 4.9 stars from 127 reviews.' This enables rich snippets in search results.",
  },
  {
    q: "How do I add this generated schema markup to my website?",
    a: "Copy the generated script tag and paste it into the <head> section of your HTML page. If you use WordPress, you can use a plugin like WPCode or paste it into your theme's header settings. If you use Shopify, add it to theme.liquid or into a custom Liquid section on your product template.",
  },
  {
    q: "How do I verify that my schema markup is error-free?",
    a: "Google provides two official free testing tools: the Rich Results Test (which verifies eligibility for rich snippets) and the Schema Markup Validator (validator.schema.org, which verifies compliance with the Schema.org vocabulary). Both accept either a live URL or raw code.",
  },
  {
    q: "Will adding schema markup automatically give me rich snippets?",
    a: "Schema markup makes your page eligible for rich snippets, but Google decides whether to display them based on page quality, site authority, and query relevance. Correct schema is a prerequisite — without it, rich results are technically impossible.",
  },
  {
    q: "Is this tool completely free to use?",
    a: "Yes, 100% free with no email required, no sign-up wall, and unlimited generations. Built by the SearchPrex engineering team as a gift to the SEO community.",
  },
];

export default function SchemaGeneratorSolutionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#app`,
        name: "SearchPrex Schema Markup Generator",
        url: PAGE_URL,
        description: DESCRIPTION,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: organizationRef,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        isPartOf: websiteRef,
        mainEntity: { "@id": `${PAGE_URL}#app` },
        author: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
          { "@type": "ListItem", position: 4, name: "Schema Generator", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-24 sm:pt-28">
        <PageHero
          pillText="Free Technical SEO Tool"
          title={
            <>
              Schema Markup Generator <Accent color="teal">(JSON-LD)</Accent>
            </>
          }
          subtitle="Generate clean, Google-compliant JSON-LD structured data in seconds. Boost click-through rates, qualify for rich snippets, and feed entity signals directly into Google Knowledge Graph."
          date="Updated November 2026 • Verified Google Rich Results Spec"
        />

        <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Solutions", href: "/resources/solution" },
              { label: "Schema Generator" },
            ]}
          />
        </div>

        <StatStrip stats={STATS} />

        <section id="generator" className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SchemaGeneratorClient />
          </div>
        </section>

        <Section width="default">
          <SectionHeading
            eyebrow="Supported Schemas"
            title="Which Schema Markup Does Your Website Need?"
            intro="Select the schema type that matches your page's primary intent to maximize rich result visibility."
          />
          <CardGrid columns={3}>
            {WHICH_SCHEMAS.map((item) => (
              <FeatureCard key={item.title} title={item.title} eyebrow={item.label} body={item.body} />
            ))}
          </CardGrid>
        </Section>

        <Section width="reading">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Schema Markup & Structured Data Questions, Answered"
            intro="Everything you need to know about JSON-LD structured data, rich result eligibility, testing, and Google guidelines."
          />
          <FaqList faqs={FAQS} name="schema-generator-solution-faq" />
        </Section>

        <ArticleLeadMagnet
          variant="bottom"
          source="schema-generator-solution"
          copy={{
            headline: "Not sure if your schema markup is working in Google? Let us audit it.",
            sub: "We will inspect your structured data, audit your search console errors, and send back a prioritized technical action plan — 100% free within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
