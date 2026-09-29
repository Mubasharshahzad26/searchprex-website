// app/case-calculator/page.tsx
//
// The personal injury Lost Case Calculator, as a landing page. It already sits
// around position 8 in Search Console for its name; below the tool the page
// now explains exactly how the estimate is built (the same formula as
// app/components/case-calculator/case-calculator.tsx), labels the defaults as
// assumptions, and offers the law firm checklist and the tear-down.

import type { Metadata } from "next";
import Link from "next/link";
import CaseCalculator from "@/app/components/case-calculator/case-calculator";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import { CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";
import { LAW_CHECKLIST_GUIDE } from "@/lib/guides";
import { getPageSEO } from "@/lib/admin-seo";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/case-calculator`;
const TITLE = "Personal Injury Lost Case Calculator";
const DESCRIPTION =
  "Estimate how many signed cases your personal injury firm loses to search visibility gaps and slow intake, from your own numbers. Free, no signup.";

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: `${TITLE} | SearchPrex`, description: DESCRIPTION, url: PAGE_URL, siteName: "SearchPrex", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/case-calculator", baseMetadata);
}

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
    a: "An injured person can contact several firms in the same evening, and the one that responds first and makes the next step clear has the advantage. The calculator reflects that with assumptions — a response under five minutes counts as no loss and next-day follow-up as the largest — which you can change if your own data says otherwise.",
  },
  {
    q: "Is anything I enter saved?",
    a: "No. The calculation runs in your browser; only the practice area and city are sent to look up search demand, and nothing is stored. Your details are only saved if you choose to submit the form for a tear-down.",
  },
];

export default function CaseCalculatorPage() {
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
        dateModified: "2026-09-29",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
          { "@type": "ListItem", position: 3, name: TITLE, item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const link = "font-semibold text-[#534AB7] underline underline-offset-2";

  return (
    <main id="main-content" className="bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-4xl">
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

      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="Use your own numbers" title="Replace the defaults for a better answer" />
        <div className="space-y-4 text-base leading-relaxed text-[#374151]">
          <p>
            The defaults are there so the calculator works the moment you open it. They are not measurements of your
            market. The most useful thing you can do is replace them: your real monthly leads from calls and forms, your
            sign rate, and your average fee per signed case. If you know your search demand from Google Ads Keyword Planner
            or your own Search Console, that is better than any default.
          </p>
          <p>
            Two numbers usually move the result most. The first is your current monthly leads — if it is already close to
            what the top three results would bring, the visibility gap is small and intake is where the money is. The second
            is response time, which the calculator treats as the biggest intake lever: moving from hours to minutes
            changes the intake estimate more than any other setting.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="What to do next" title="Closing each gap" />
        <CardGrid columns={2}>
          <FeatureCard
            title="If the visibility gap is larger"
            body={
              <>
                You are not showing up for enough of the searches in your market. The fix is practice-area and location pages,
                a Business Profile built for the map pack, and content injured people actually search. See{" "}
                <Link href="/services/law-firm-seo/personal-injury" className={link}>
                  personal injury law firm SEO
                </Link>{" "}
                and{" "}
                <Link href="/blog/keyword-research-for-law-firms" className={link}>
                  keyword research for law firms
                </Link>
                .
              </>
            }
          />
          <FeatureCard
            title="If the intake gap is larger"
            body={
              <>
                You are losing cases you have already paid to attract. The fix is faster response and cover outside office
                hours — someone, or something, that answers every enquiry and gets the facts down. Try the{" "}
                <Link href="/intake-assistant" className={link}>
                  AI intake assistant demo
                </Link>
                .
              </>
            }
          />
        </CardGrid>
      </Section>

      <Section tight>
        <GuideMagnet guide={LAW_CHECKLIST_GUIDE} source="case-calculator" eyebrow="Free for personal injury firms" />
      </Section>

      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Lost Case Calculator questions, answered" />
        <FaqList faqs={FAQS} name="case-calculator-faq" />
      </Section>

      <ArticleLeadMagnet
        variant="bottom"
        source="case-calculator"
        copy={{
          headline: "Want your real numbers instead of an estimate? Send me your firm's URL.",
          sub: "I'll check your practice-area pages, Business Profile and the firms outranking you, and send back what to fix first — within 24 hours.",
        }}
      />
    </main>
  );
}
