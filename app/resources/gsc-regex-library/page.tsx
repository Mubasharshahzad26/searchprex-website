// app/resources/gsc-regex-library/page.tsx
//
// Interactive Google Search Console RE2 Regex Library & Custom Filter Builder.
// Ungated practitioner resource targeting "google search console regex",
// "gsc regex filter", "track ai overviews in gsc", and niche query filtering.

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
import { GSC_REGEX_PATTERNS } from "@/lib/gsc-regex-data";
import GscRegexClient from "./GscRegexClient";

const PAGE_URL = `${SITE}/resources/gsc-regex-library`;
const TITLE = "Google Search Console Regex Library & Custom Filter Builder (2026)";
const DESCRIPTION =
  "25+ copy-paste RE2 regular expressions for Google Search Console: filter AI Overview conversational queries, non-branded traffic, law firm case intent, ecommerce SKUs, and indexing bloat.";

const FAQS = [
  {
    q: "Where do I paste a regex filter in Google Search Console?",
    a: "Open Google Search Console, go to Performance > Search results, click '+ New' in the filter bar at the top, choose either 'Query...' or 'Page...', select 'Custom (regex)' from the dropdown, and paste the expression.",
  },
  {
    q: "What regex syntax does Google Search Console use?",
    a: "Google Search Console uses Google's RE2 regular expression syntax. RE2 supports standard character classes, word boundaries (\\b), alternation (|), quantifiers ({n,m}) and case-insensitive flags ((?i)), but does not support lookaheads or lookbehinds. Every pattern on this page is strictly valid RE2.",
  },
  {
    q: "How can I use regex in Search Console to spot AI Overview queries?",
    a: "Google does not provide a separate 'AI Overviews' filter in Search Console, and clicks/impressions inside AI Overviews are folded into standard Web search totals. However, filtering Query by 8+ or 10+ words (`^([^\" \"]+\\s){7,}[^\" \"]+$`) surfaces the conversational, prompt-style searches where AI Overviews appear most often. High impressions paired with a sudden CTR drop on those queries usually means an AI Overview is answering the query above organic links.",
  },
  {
    q: "How do I filter out branded queries in Google Search Console?",
    a: "Use the Custom Brand Regex Builder at the top of this page: enter your brand name, common misspellings, and founder/attorney names separated by commas. Then in Search Console choose Query > Custom (regex) > Doesn't match regex and paste the generated `(?i)\\b(...)\\b` pattern.",
  },
  {
    q: "What is the character limit for a Search Console regex filter?",
    a: "Search Console allows up to 4,096 characters in a single custom regex filter. Keep alternation lists concise using word boundaries (`\\b(term1|term2|term3)\\b`) rather than repeating full phrases.",
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
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/resources/gsc-regex-library", baseMetadata);
}

export default function GscRegexLibraryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        author: founderRef,
        publisher: organizationRef,
        isPartOf: websiteRef,
        dateModified: "2026-09-30",
        about: [
          { "@type": "Thing", name: "Google Search Console" },
          { "@type": "Thing", name: "Regular expressions (RE2)" },
          { "@type": "Thing", name: "Technical SEO" },
          { "@type": "Thing", name: "Answer Engine Optimization" },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#patterns`,
        name: "Google Search Console RE2 Regex Patterns",
        numberOfItems: GSC_REGEX_PATTERNS.length,
        itemListElement: GSC_REGEX_PATTERNS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          description: p.whatItFinds,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "GSC Regex Library", item: PAGE_URL },
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
          { label: "Resources", href: "/resources" },
          { label: "GSC Regex Library" },
        ]}
      />

      <PageHero
        compactTop
        centered
        eyebrow="Free resource · RE2-verified · No signup"
        title={
          <>
            Google Search Console <Accent>Regex Library</Accent> &amp; Filter Builder
          </>
        }
        subtitle={
          <>
            {GSC_REGEX_PATTERNS.length} copy-paste RE2 regular expressions we use inside client Search Console
            properties to isolate AI Overview prompts, non-branded buyer intent, law firm case queries, and crawl-wasting
            parameter URLs.
          </>
        }
      />

      {/* Context Callout */}
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div
          className={`${radius.card} border p-5 sm:p-6`}
          style={{ borderColor: color.border, background: color.surface }}
        >
          <p className={text.small} style={{ color: color.muted }}>
            <strong style={{ color: color.ink }}>How to use this vault.</strong> Every pattern below is written in
            Google&apos;s RE2 syntax and tells you whether to apply it to the{" "}
            <strong style={{ color: color.ink }}>Query</strong> or <strong style={{ color: color.ink }}>Page</strong>{" "}
            dimension in Search Console. Running a full audit? Pair these filters with our{" "}
            <Link href="/resources/technical-seo-checklist" className={inlineLink} style={{ color: color.primary }}>
              Technical SEO Audit Checklist
            </Link>
            ,{" "}
            <Link href="/resources/law-firm-seo-audit-checklist" className={inlineLink} style={{ color: color.primary }}>
              Law Firm SEO Checklist
            </Link>{" "}
            or{" "}
            <Link href="/resources/woocommerce-seo-checklist" className={inlineLink} style={{ color: color.primary }}>
              WooCommerce SEO Checklist
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Main Interactive Regex Vault */}
      <Section>
        <GscRegexClient />
      </Section>

      {/* Quick Reference Guide: How RE2 Works in GSC */}
      <Section tone="surface" width="narrow">
        <SectionHeading
          eyebrow="RE2 Syntax Cheat Sheet"
          title="5 RE2 tokens that do 90% of the work in Search Console"
          subtitle="Google Search Console rejects PCRE lookaheads like (?!brand). Stick to these five RE2 primitives and your filters will never error."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              token: "(?i)",
              name: "Case-insensitive flag",
              desc: "Place at the very start of your pattern so uppercase and lowercase URLs or queries both match.",
            },
            {
              token: "\\b(word1|word2)\\b",
              name: "Whole-word alternation",
              desc: "Matches any word in the group without accidentally matching substrings (so 'car' does not match 'scar').",
            },
            {
              token: "^ and $",
              name: "Start and end anchors",
              desc: "Use ^http:// to match only URLs starting with HTTP, or ^([^\" \"]+\\s){7,} to count words from the start of a query.",
            },
            {
              token: "\\?.*=",
              name: "Escaped query string check",
              desc: "Because ? is a quantifier in regex, escape it as \\? when hunting parameterized URLs in the Page filter.",
            },
          ].map((item) => (
            <div
              key={item.token}
              className={`${radius.card} border bg-white p-5`}
              style={{ borderColor: color.border }}
            >
              <code
                className="inline-block font-mono text-sm font-bold px-2.5 py-1 rounded mb-2"
                style={{ background: color.primarySoft, color: color.primary }}
              >
                {item.token}
              </code>
              <h3 className={heading.h4} style={{ color: color.ink }}>
                {item.name}
              </h3>
              <p className={`${text.small} mt-1`} style={{ color: color.muted }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section width="narrow">
        <SectionHeading
          centered
          eyebrow="FAQ"
          title="Google Search Console Regex Questions, Answered"
        />
        <div className="mt-10">
          <FaqList faqs={FAQS} name="gsc-regex-faq" />
        </div>
      </Section>

      <CtaBand
        eyebrow="Found a leak in your Search Console data?"
        title="Want a founder-led tear-down of your Search Console property?"
        body="We audit your indexing coverage, query cannibalization, and AI Overview visibility directly from real Search Console data — delivered within 24 hours."
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
