// app/faq/page.tsx
// Server Component. Owns metadata and FAQPage JSON-LD; the interactive UI lives
// in FaqClient.
//
// This file used to be "use client", which meant it could not export metadata at
// all — the route inherited the root layout's default and served the homepage
// title and description to Google on a page that ranks for its own queries.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import FaqClient, { type FaqGroup } from "./FaqClient";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/faq`;

const baseMetadata: Metadata = {
  title: "SEO Questions, Answered — Core Updates, E-E-A-T & AI",
  description:
    "Answers on Google's March and May 2026 core updates, E-E-A-T, AI Overviews, and GEO — plus how SearchPrex works. Written by a founder who does the work.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO Questions, Answered | SearchPrex",
    description:
      "Google 2026 core updates, E-E-A-T, AI Overviews and GEO — answered plainly.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Questions, Answered | SearchPrex",
    description: "Google 2026 core updates, E-E-A-T, AI Overviews and GEO — answered plainly.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/faq", baseMetadata);
}

/* ─── FAQ DATA — grouped, 2026 core-update aware ─── */
const faqGroups: FaqGroup[] = [
  {
    category: "Google 2026 Core Updates",
    icon: "sparkles",
    faqs: [
      {
        q: "How do the March and May 2026 Google core updates affect my rankings?",
        a: "Google rolled out two broad core updates in quick succession — the March 2026 update (March 27 to April 8) and the May 2026 update (started May 21, completing in early June). Both reward the same thing: original, people-first content from a verifiable expert. Sites that publish first-hand experience, proprietary data, and real case studies gained; thin, generic, or aggregated content that simply repeats what others say lost ground. Our entire approach is built around these exact signals.",
      },
      {
        q: "My traffic dropped after the 2026 core updates — can you help recover it?",
        a: "Yes. Core updates don't penalize sites — they re-weight quality signals and promote content that better demonstrates expertise and originality. Recovery comes from genuinely improving content quality, strengthening E-E-A-T, and removing thin or duplicate pages — not quick fixes. We audit exactly which pages and signals were affected using your Search Console data, then rebuild around what the 2026 algorithm rewards. Meaningful recovery typically takes a few weeks to a few months as Google recrawls.",
      },
      {
        q: "What is E-E-A-T and why does it matter more in 2026?",
        a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. The 2026 core updates made it clear that Google is less confident ranking content it can't attribute to a credible, named source. Content from authors with verifiable credentials and a consistent publishing history wins; anonymous or generic-profile content loses regardless of quality. We attribute every piece to a real, credentialed author and back it with first-hand experience signals.",
      },
      {
        q: "Does Google penalize AI-generated content after the 2026 updates?",
        a: "Not categorically. The March 2026 update does not penalize AI-assisted content by default. What loses is content with nothing original — no first-hand perspective, data, or expertise that exists nowhere else. Content that is AI-assisted but substantially shaped, edited, and verified by a named human expert, grounded in original insight, can still rank well. We write people-first content with genuine expertise, never mass-produced filler.",
      },
    ],
  },
  {
    category: "AI Search, AI Overviews & GEO",
    icon: "search",
    faqs: [
      {
        q: "What is AI Overview optimization (GEO / AIO)?",
        a: "Generative Engine Optimization (GEO) and AI Optimization (AIO) mean structuring your content, schema, and authority signals so your business gets cited in AI answers — Google AI Overviews, ChatGPT, Perplexity, and Gemini. With AI Overviews now serving billions of monthly users, being cited in AI answers is becoming as important as ranking #1 in traditional search. We optimize for both.",
      },
      {
        q: "Will AI Overviews reduce my organic clicks?",
        a: "AI Overviews change how clicks are distributed — for some informational queries, users get answers without clicking. That's exactly why we focus on getting your brand cited inside those AI answers, and on high-intent, transactional queries where users still click through to act. The goal is visibility everywhere your customers look, not just blue links.",
      },
      {
        q: "How do you get a business cited in ChatGPT or Google AI Overviews?",
        a: "AI engines cite sources they trust and can clearly understand. We build that trust through structured data (schema), clear entity signals, verifiable author credentials, consistent NAP and brand information, and genuinely authoritative content. The same E-E-A-T foundation that wins core updates is what gets you cited in AI answers.",
      },
    ],
  },
  {
    category: "Working With SearchPrex",
    icon: "shield",
    faqs: [
      {
        q: "What makes SearchPrex different from other SEO agencies?",
        a: "Founder-led execution — no juniors, no outsourcing. The founder personally works on your account, with verifiable Semrush certifications and real, GSC-backed client results (like +285% pages indexed and +83% US organic clicks, rebuilt after a de-indexing event). In a post-2026 world where Google rewards proven expertise over generic agencies, that hands-on, credentialed approach is exactly what moves rankings.",
      },
      {
        q: "How long before I see SEO results?",
        a: "Most clients see early movement in 30–60 days, with stronger ranking and traffic gains over 90 days and beyond. SEO is a long-term investment — the 2026 updates reward consistent, genuine quality improvements over time, not overnight tricks. We report progress transparently every Monday so you always know where things stand.",
      },
      {
        q: "Do you provide reports and proof of work?",
        a: "Yes — plain-English reports every Monday covering rankings, traffic, indexing, and next steps, all backed by real Google Search Console and Analytics data. No vanity metrics. You see exactly what's working and what's next.",
      },
      {
        q: "Is there a long-term contract?",
        a: "No long-term contracts. We earn your business every month with results — more visibility, more leads, more revenue. You can adjust or cancel anytime.",
      },
      {
        q: "Which industries and locations do you serve?",
        a: "We specialize in law firms, ecommerce/Shopify stores, and local service businesses (HVAC, dental, restaurants, contractors, and more) across all 50 U.S. states, with a focus on CA, TX, FL, NY, and IL. Every strategy is tailored to your industry and target market.",
      },
    ],
  },
];

export default function FAQPage() {
  // FAQPage schema is what makes these answers eligible to be lifted into an AI
  // Overview, so it has to carry every question the page renders.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    ),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
    ],
  };

  return (
    <>
      {[faqSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <FaqClient groups={faqGroups} />
    </>
  );
}
