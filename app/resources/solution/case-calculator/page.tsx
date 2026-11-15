import type { Metadata } from "next";
import Link from "next/link";
import CaseCalculator from "@/app/components/case-calculator/case-calculator";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import { Breadcrumb, CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";
import { LAW_CHECKLIST_GUIDE } from "@/lib/guides";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/resources/solution/case-calculator`;
const TITLE = "Personal Injury Lost Case Calculator";
const DESCRIPTION =
  "Estimate how many signed cases your personal injury firm loses to search visibility gaps and slow intake, from your own numbers. Free, no signup.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
    },
  },
  openGraph: {
    title: `${TITLE} | SearchPrex`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const STEPS = [
  {
    step: "01",
    title: "Monthly searches",
    body: "How many people search for your practice area in your market each month — live search data when it is connected, otherwise a rough default for that practice area, clearly labelled as an estimate.",
  },
  {
    step: "02",
    title: "Leads you could be getting",
    body: "Searches × the share that click the top three results (30% by default) × the share of visitors who become a call or form (4% by default).",
  },
  {
    step: "03",
    title: "The visibility gap",
    body: "Those potential leads minus the leads you get today, × your lead-to-signed rate × your average fee per signed case.",
  },
  {
    step: "04",
    title: "The intake gap",
    body: "A share of the cases you already sign, lost to slow response and after-hours gaps: 0% for under five minutes up to 35% for next-day, plus up to 12% with no after-hours cover, capped at 50%.",
  },
];

const FAQS = [
  {
    q: "What does the Lost Case Calculator measure?",
    a: "Two gaps for a personal injury firm: the cases it could sign if it ranked in the top three for its practice area and market, and the cases it loses through slow response and no after-hours cover. It adds both and shows a monthly and yearly estimate.",
  },
  {
    q: "How accurate is the estimate?",
    a: "It is directional, not a forecast. It uses your own leads, sign rate and average fee, plus default assumptions for search demand, click share, lead rate and intake loss. Those defaults are starting points, not measured data — replace them with your own figures for a better estimate.",
  },
  {
    q: "Where do the search numbers come from?",
    a: "From licensed search data when it is connected. Until then the calculator uses a rough default for each practice area and marks it as an estimate, so you can see which number is live and which is assumed.",
  },
  {
    q: "Why does response time matter so much in personal injury?",
    a: "An injured person can contact several firms in the same evening, and the one that responds first and makes the next step clear has the advantage. The calculator reflects that with assumptions — a response under five minutes counts as no loss and next-day follow-up as the largest.",
  },
  {
    q: "Is anything I enter saved?",
    a: "No. The calculation runs in your browser; only the practice area and city are sent to look up search demand, and nothing is stored.",
  },
];

export default function CaseCalculatorSolutionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#app`,
        name: TITLE,
        url: PAGE_URL,
        description: DESCRIPTION,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: organizationRef,
        audience: { "@type": "Audience", audienceType: "Personal injury law firms", geographicArea: { "@type": "Country", name: "United States" } },
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        isPartOf: websiteRef,
        mainEntity: { "@id": `${PAGE_URL}#app` },
        author: founderRef,
        dateModified: "2026-11-12",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
          { "@type": "ListItem", position: 4, name: "Lost Case Calculator", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main id="main-content" className="bg-white pt-24 sm:pt-28 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Solutions", href: "/resources/solution" },
            { label: "Lost Case Calculator" },
          ]}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <CaseCalculator />
      </div>

      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="How the Lost Case Calculator builds the estimate"
          intro="The same four steps the calculator runs, with the default assumptions it starts from. Every default can be changed in the tool."
        />
        <CardGrid columns={4}>
          {STEPS.map((s) => (
            <FeatureCard key={s.step} step={s.step} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section width="reading">
        <SectionHeading eyebrow="FAQ" title="Lost Case Calculator questions, answered" />
        <FaqList faqs={FAQS} name="case-calculator-solution-faq" />
      </Section>

      <Section tight width="reading">
        <GuideMagnet guide={LAW_CHECKLIST_GUIDE} />
      </Section>

      <ArticleLeadMagnet
        variant="bottom"
        source="solution:case-calculator"
        copy={{
          headline: "Want to see what ranking in the top three would take for your firm?",
          sub: "I’ll look at your market, your competitors in the map pack, and what separates them from you — written by me, within 24 hours.",
        }}
      />
    </main>
  );
}
