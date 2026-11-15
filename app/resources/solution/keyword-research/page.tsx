import type { Metadata } from "next";
import Link from "next/link";
import KeywordResearchClient from "@/app/tools/keyword-research/KeywordResearchClient";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import { Breadcrumb, CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";
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
    a: "Yes. No signup, no email. If you want the list turned into a plan for your firm, ask for the free audit at the bottom of the page.",
  },
];

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/resources/solution/keyword-research`;

export const metadata: Metadata = {
  title: "Keyword Research Tool for Lawyers, by State",
  description:
    "Pick a practice area and US state to get the keywords clients search and the page to build for each. Free. Volume and CPC show once live data is connected.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
    },
  },
  openGraph: {
    title: "Keyword Research Tool for Lawyers, by State | SearchPrex",
    description: "Keywords for law firms by practice area and US state.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function KeywordResearchSolutionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
      { "@type": "ListItem", position: 4, name: "Law Firm Keyword Research", item: PAGE_URL },
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Law Firm Keyword Research Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "US law firm keyword research intelligence by practice area and state.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const link = "font-semibold text-neutral-950 underline underline-offset-2";

  return (
    <main id="main-content" className="bg-white pt-24 sm:pt-28 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Solutions", href: "/resources/solution" },
            { label: "Keyword Research" },
          ]}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <KeywordResearchClient />
      </div>

      <Section>
        <SectionHeading eyebrow="How to use it" title="How to turn the list into practice-area rankings" />
        <CardGrid columns={3}>
          {STEPS.map((s) => (
            <FeatureCard key={s.step} step={s.step} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="Step by step" title="How we run keyword research for a client firm" />
        <div className="space-y-4 text-base leading-relaxed text-[#374151]">
          <p>
            The keywords clients search in your city are not a mystery. Google suggests them in autocomplete, shows them in
            the &ldquo;people also ask&rdquo; box, and lists them at the bottom of the page under related searches. For a
            complete guide to extracting those with free tools, see our{" "}
            <Link href="/blog/keyword-research-for-law-firms" className={link}>
              law firm keyword research guide
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section width="reading">
        <SectionHeading eyebrow="FAQ" title="Law firm keyword research questions, answered" />
        <FaqList faqs={FAQS} name="keyword-research-solution-faq" />
      </Section>

      <Section tight width="reading">
        <GuideMagnet guide={LAW_CHECKLIST_GUIDE} />
      </Section>

      <ArticleLeadMagnet
        variant="bottom"
        source="solution:keyword-research"
        copy={{
          headline: "Want these keywords mapped to pages for your firm?",
          sub: "I’ll map the practice areas you take to the pages you have, the ones to add, and where your competitors outrank you — written by me, within 24 hours.",
        }}
      />
    </main>
  );
}
