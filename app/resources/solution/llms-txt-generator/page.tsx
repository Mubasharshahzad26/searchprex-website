import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
import LlmsTxtClient from "@/app/tools/llms-txt-generator/LlmsTxtClient";

const PAGE_URL = `${SITE}/resources/solution/llms-txt-generator`;
const TITLE = "Free llms.txt & AI Crawler robots.txt Generator";
const DESCRIPTION =
  "Generate an /llms.txt file and robots.txt rules for AI crawlers (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended). Free, runs in your browser.";
const LAST_REVIEWED = "2026-11-12";

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

export const metadata: Metadata = {
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

export default function LlmsTxtGeneratorSolutionPage() {
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
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
          { "@type": "ListItem", position: 4, name: "llms.txt Generator", item: PAGE_URL },
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-24 sm:pt-28">
        <PageHero
          pillText="Technical SEO & GEO Utility"
          title={
            <>
              Generate your <Accent color="teal">/llms.txt</Accent> &amp; AI
              crawler directives
            </>
          }
          subtitle="Direct answer engines to your highest-value pages. Generate spec-compliant Markdown for /llms.txt and calibrated robots.txt rules for OAI-SearchBot, PerplexityBot, ClaudeBot, and Google-Extended."
          date="Updated for 2026 Search & Answer Engines"
          ctaPrimary={
            <a
              href="#generator"
              className={`inline-flex items-center gap-2 px-5 py-2.5 ${radius.md} ${color.bgDark} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}
            >
              Start generating
              <ArrowRight className="h-4 w-4" />
            </a>
          }
          ctaSecondary={
            <Link
              href="/resources/news/ai-geo"
              className={`inline-flex items-center gap-2 px-5 py-2.5 ${radius.md} ${color.borderNeutral} ${color.bgBase} ${text.primary} font-semibold text-sm hover:${color.bgLight} transition-colors`}
            >
              Read AI search telemetry
            </Link>
          }
        />

        <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Solutions", href: "/resources/solution" },
              { label: "llms.txt Generator" },
            ]}
          />
        </div>

        <section id="generator" className="py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <LlmsTxtClient />
          </div>
        </section>

        <Section background="light">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="AI search crawlers, answer engines, and /llms.txt"
            subtitle="Straight answers on crawler management and large language model visibility."
          />
          <FaqList faqs={FAQS} />
        </Section>

        <CtaBand
          badge="Generative Engine Optimization"
          title="Need your enterprise domain verified for AI answer engines?"
          description="We engineer information gain architectures, structured entity graphs, and /llms.txt directories that get cited inside Google AI Mode and ChatGPT Search."
          primaryCta={{
            label: "Get a Technical Audit",
            href: "/free-audit",
          }}
          secondaryCta={{
            label: "Explore Solutions Library",
            href: "/resources/solution",
          }}
        />
      </div>
    </>
  );
}
