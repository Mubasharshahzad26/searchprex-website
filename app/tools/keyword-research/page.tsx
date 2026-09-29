// app/tools/keyword-research/page.tsx
// Server Component. Owns metadata and JSON-LD; the tool UI is in
// KeywordResearchClient.
//
// This route replaces /nicheseopro, which is 301-redirected here in
// next.config.mjs so its existing Search Console history carries over.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import Link from "next/link";
import KeywordResearchClient from "./KeywordResearchClient";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import { CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";
import { LAW_CHECKLIST_GUIDE } from "@/lib/guides";
import { PRACTICE_AREAS } from "@/lib/law-firm-keywords";

const AREA_NAMES = PRACTICE_AREAS.map((a) => a.label);

const STEPS = [
  { step: "01", title: "Pick a practice area and state", body: `Choose from ${PRACTICE_AREAS.length} practice areas and any US state. The keyword list is built for that state, because a car accident search in Michigan is a different market from Texas.` },
  { step: "02", title: "Read the list", body: "You get the searches clients use for that practice area in that state, with a one-line suggestion for the page or section that would win each one." },
  { step: "03", title: "Turn it into pages", body: "Group the keywords by matter, give each group one page, and put the place in the title. The guide below walks through it step by step." },
];

const FAQS = [
  {
    q: "What does the law firm keyword tool show?",
    a: "For a practice area and US state, it lists the searches clients use and suggests the page or section to build for each. Search volume, keyword difficulty and Google Ads CPC come from licensed data and appear once that data is connected; until then the tool shows a dash rather than a guess.",
  },
  {
    q: "Which practice areas does it cover?",
    a: `${AREA_NAMES.slice(0, -1).join(", ")} and ${AREA_NAMES[AREA_NAMES.length - 1]}.`,
  },
  {
    q: "Why doesn't it show search volume right now?",
    a: "Real search volume and CPC are licensed data. A language model cannot know how many people searched for something last month, and a made-up number you plan around is worse than none, so the tool leaves those columns empty until the data source is connected.",
  },
  {
    q: "How do I find search volume for free in the meantime?",
    a: "Google Ads Keyword Planner is free inside an Ads account and gives ranges. Your own Google Search Console shows the searches your site already appears for, and your Google Business Profile performance report lists the terms people used to find your profile.",
  },
  {
    q: "Is the keyword tool free?",
    a: "Yes. No signup, no email. If you want the list turned into a plan for your firm, ask for the free tear-down at the bottom of the page.",
  },
];

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/tools/keyword-research`;

const baseMetadata: Metadata = {
  title: "Keyword Research Tool for Lawyers, by State",
  description:
    "Pick a practice area and US state to get the keywords clients search and the page to build for each. Free. Volume and CPC show once live data is connected.",
  keywords: [
    "law firm keyword research",
    "attorney keyword tool",
    "personal injury keyword volume",
    "law firm SEO keywords by state",
    "lawyer CPC by state",
    "free keyword tool for attorneys",
  ],
  alternates: { 
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    }
  },
  openGraph: {
    title: "Keyword Research Tool for Lawyers, by State | SearchPrex",
    description:
      "Pick a practice area and US state to get the keywords clients search and the page to build for each. Free. Volume and CPC show once live data is connected.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Law Firm Keyword Tool | SearchPrex",
    description:
      "The keywords clients search, by practice area and US state, with the page to build for each.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/keyword-research", baseMetadata);
}

export default function Page() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SearchPrex Law Firm Keyword Tool",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Free keyword research for US law firms: pick a practice area and state to see the keywords clients search and the page to build for each. Search volume, difficulty and CPC appear when licensed data is connected.",
    audience: {
      "@type": "Audience",
      audienceType: "Law firms and attorneys in the United States",
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Law Firm Keyword Research",
        item: PAGE_URL,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const link = "font-semibold text-[#534AB7] underline underline-offset-2";

  return (
    <main>
      {[appSchema, breadcrumbSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <KeywordResearchClient />

      <Section tone="surface">
        <SectionHeading eyebrow="How to use it" title="Keyword research for lawyers in three steps" />
        <CardGrid columns={3}>
          {STEPS.map((s) => (
            <FeatureCard key={s.step} step={s.step} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section width="reading">
        <SectionHeading eyebrow="Next steps" title="From a keyword list to pages that rank" />
        <div className="space-y-4 text-base leading-relaxed text-[#374151]">
          <p>
            A keyword list is only useful once each keyword has a home. Give every matter the firm takes its own page —
            divorce, child custody and child support are three pages, not one — and add the city or county you serve to
            the title. Questions people ask before hiring belong in guides that link to those pages.
          </p>
          <p>
            The full method, with the free data sources and the bar rules on words like &ldquo;specialist&rdquo;, is in{" "}
            <Link href="/blog/keyword-research-for-law-firms" className={link}>
              keyword research for lawyers and law firms
            </Link>
            . To see how it comes together for one practice area, look at{" "}
            <Link href="/services/law-firm-seo/family-law" className={link}>
              family law and divorce SEO
            </Link>{" "}
            or{" "}
            <Link href="/services/law-firm-seo/personal-injury" className={link}>
              personal injury SEO
            </Link>
            , and check titles with the{" "}
            <Link href="/tools/serp-simulator" className={link}>
              SERP simulator
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section tight>
        <GuideMagnet guide={LAW_CHECKLIST_GUIDE} source="keyword-research" eyebrow="Free for law firms" />
      </Section>

      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Law firm keyword tool questions, answered" />
        <FaqList faqs={FAQS} name="keyword-research-faq" />
      </Section>

      <ArticleLeadMagnet
        variant="bottom"
        source="keyword-research"
        copy={{
          headline: "Want this turned into a plan for your firm? Send me your URL.",
          sub: "I'll match these searches against your pages and the firms outranking you, and send back which to win first — within 24 hours.",
        }}
      />
    </main>
  );
}
