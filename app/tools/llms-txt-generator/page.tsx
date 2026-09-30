// app/tools/llms-txt-generator/page.tsx
//
// Free llms.txt & AI Crawler (robots.txt) Generator.
// Targets high-growth 2026 GEO / technical SEO queries: "llms.txt generator",
// "ai crawler robots.txt generator", "oai-searchbot allow", "perplexitybot robots.txt".

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPageSEO } from "@/lib/admin-seo";
import {
  Breadcrumb,
  CtaBand,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import LlmsTxtClient from "./LlmsTxtClient";

const PAGE_URL = `${SITE}/tools/llms-txt-generator`;
const TITLE = "Free llms.txt & AI Crawler robots.txt Generator (2026)";
const DESCRIPTION =
  "Generate a spec-compliant /llms.txt file and AI crawler robots.txt rules (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) for Law Firms, Ecommerce & Local Businesses. Free, instant, runs in your browser.";
const LAST_REVIEWED = "2026-09-30";

const FAQS = [
  {
    q: "What is an llms.txt file and where does it go?",
    a: "An llms.txt file is a clean Markdown file placed at the root of your website (https://yourdomain.com/llms.txt). Unlike XML sitemaps that list thousands of raw URLs, llms.txt gives large language models and AI answer engines a concise entity summary, core facts, and an annotated map of your most authoritative pages without HTML navigation clutter.",
  },
  {
    q: "Does llms.txt replace robots.txt or sitemap.xml?",
    a: "No. robots.txt tells crawlers what they are allowed or disallowed to fetch, and sitemap.xml lists every canonical indexable URL for search engines. llms.txt complements both by summarizing your business entity and pointing AI grounding systems at your highest-value pages first.",
  },
  {
    q: "What is the difference between OAI-SearchBot and GPTBot?",
    a: "OpenAI uses separate user-agents for search vs model training. OAI-SearchBot crawls pages to show live links and citations inside ChatGPT Search. GPTBot crawls content to train foundational language models. If you want referral traffic from ChatGPT Search while opting out of training, allow OAI-SearchBot and disallow GPTBot in your robots.txt.",
  },
  {
    q: "Does blocking Google-Extended hurt my Google Search rankings or AI Overviews?",
    a: "Google-Extended is a standalone token that controls whether your content is used to train Gemini models and Vertex AI generative APIs. It does not block Googlebot, and Google Search AI Overviews rely on standard Googlebot indexing rather than Google-Extended.",
  },
  {
    q: "Is anything I enter into this generator stored?",
    a: "No. This generator runs 100% client-side in your browser. Your URLs, entity descriptions, and rules are never sent to a server.",
  },
];

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} | SearchPrex`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/llms-txt-generator", baseMetadata);
}

export default function LlmsTxtGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#app`,
        name: "llms.txt & AI Crawler Generator",
        url: PAGE_URL,
        description: DESCRIPTION,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any (runs in the browser)",
        isAccessibleForFree: true,
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
          { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
          { "@type": "ListItem", position: 3, name: "llms.txt Generator", item: PAGE_URL },
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

  const inlineLink = "font-semibold underline underline-offset-2";

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Free SEO Tools", href: "/tools" },
          { label: "llms.txt & AI Crawler Generator" },
        ]}
      />

      <PageHero
        compactTop
        centered
        eyebrow="Free GEO & Technical SEO Tool · No signup"
        title={
          <>
            Free <Accent>llms.txt</Accent> &amp; AI Crawler Generator
          </>
        }
        subtitle={
          <>
            Generate a clean, spec-valid <code className="font-mono">/llms.txt</code> Markdown file and granular{" "}
            <code className="font-mono">/robots.txt</code> directives for ChatGPT Search (<code className="font-mono">OAI-SearchBot</code>),
            Perplexity (<code className="font-mono">PerplexityBot</code>), Claude, and Gemini.
          </>
        }
      />

      {/* Interactive Generator Section */}
      <Section tight>
        <LlmsTxtClient />
      </Section>

      {/* Why llms.txt + AI Crawler Rules Matter */}
      <Section tone="surface" width="narrow">
        <SectionHeading
          eyebrow="How AI Grounding Works in 2026"
          title="Why search crawlers and AI answer engines need different signals"
          subtitle="When someone asks ChatGPT, Perplexity, or Google AI Overviews for the best lawyer or product in your market, the engine retrieves and chunks live web pages under a strict token budget."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "1. Allow Search Bots, Block Junk Scrapers",
              body: "Blocking all AI bots in robots.txt also blocks OAI-SearchBot and PerplexityBot — removing your brand from live AI citations. Separate search bots from bulk training scrapers like CCBot.",
            },
            {
              title: "2. Give LLMs Clean Entity Facts",
              body: "Standard HTML pages bury your core facts (bar admissions, licensing, shipping origin, pricing model) under megamenus and scripts. /llms.txt surfaces them in plain Markdown.",
            },
            {
              title: "3. Pair With Structured Data",
              body: "An llms.txt file is not a substitute for on-page JSON-LD. Pair it with valid Organization, LegalService, or Product schema so Googlebot and LLMs read identical facts.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`${radius.card} border bg-white p-6`}
              style={{ borderColor: color.border }}
            >
              <h3 className={heading.h4} style={{ color: color.ink }}>
                {card.title}
              </h3>
              <p className={`${text.small} mt-2`} style={{ color: color.muted }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <p className={`${text.small} mt-6`} style={{ color: color.muted }}>
          Need JSON-LD structured data to match your <code className="font-mono">llms.txt</code> entity facts? Use our{" "}
          <Link href="/tools/schema-generator" className={inlineLink} style={{ color: color.primary }}>
            Free JSON-LD Schema Markup Generator
          </Link>{" "}
          or audit your crawl and indexing setup with the{" "}
          <Link href="/resources/technical-seo-checklist" className={inlineLink} style={{ color: color.primary }}>
            Technical SEO Audit Checklist
          </Link>
          .
        </p>
      </Section>

      {/* FAQ Section */}
      <Section width="narrow">
        <SectionHeading
          centered
          eyebrow="FAQ"
          title="llms.txt & AI Crawler Questions, Answered"
        />
        <div className="mt-10">
          <FaqList items={FAQS} />
        </div>
      </Section>

      <CtaBand
        eyebrow="Want your site cited in Google AI Overviews & ChatGPT?"
        title="Get a founder-led Technical & AI Visibility Audit"
        body="We check your robots.txt, crawl budget, schema graph, and AI Overview citations across your highest-value keywords — free, delivered within 24 hours."
        actions={[
          {
            href: "/free-audit",
            label: "Get Free SEO Audit",
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          },
        ]}
      />
    </main>
  );
}
