import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, MessageSquareText, ShieldCheck, Filter } from "lucide-react";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import { Breadcrumb, CardGrid, FaqList, FeatureCard, PageHero, Section, SectionHeading, Accent } from "@/components/layout";
import { LAW_CHECKLIST_GUIDE } from "@/lib/guides";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/resources/solution/intake-assistant`;
const TITLE = "AI Intake Assistant for Law Firms: Live Demo";
const DESCRIPTION =
  "An AI intake assistant for US law firms that asks the right questions, screens the lead and hands your team a clean case summary. Try the live demo free.";

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
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const DOES = [
  {
    icon: MessageSquareText,
    title: "Asks one question at a time",
    body: "It responds to what the person actually said, with empathy, and asks one short question at a time — the way a good intake specialist does, not a form with twenty fields.",
  },
  {
    icon: ClipboardList,
    title: "Gathers what the attorney needs",
    body: "What happened, when, the injuries and treatment, who was at fault, insurance, whether there is a police or incident report, whether another attorney is involved, and where it happened.",
  },
  {
    icon: Filter,
    title: "Screens the lead for your team",
    body: "Each conversation ends with an internal signal — qualified, needs review, or likely not viable — and a one-line reason, so your team knows which call to return first.",
  },
  {
    icon: ShieldCheck,
    title: "Stays inside the lines",
    body: "It never gives legal advice, filing deadlines or case values, never promises an outcome, and never tells someone they \"have a case\". It closes by saying the firm will follow up.",
  },
];

const SUMMARY_FIELDS = [
  ["Case type", "A short label, such as auto accident or slip and fall."],
  ["Incident date", "As the person stated it."],
  ["Overview", "Two or three plain-English sentences on what happened and the injuries."],
  ["Key facts", "The details your attorney would ask about first."],
  ["Screening signal", "Qualified, needs review, or likely not viable — with the reason. An internal signal, not a legal judgment."],
  ["Recommended next step", "For example, schedule a consultation within 24 hours."],
];

const FAQS = [
  {
    q: "What is an AI intake assistant for a law firm?",
    a: "It is a chat assistant on your website that talks to potential clients when your team cannot — evenings, weekends, busy afternoons. It asks about what happened, gathers the facts an attorney needs, and gives your firm a structured summary so someone can follow up quickly.",
  },
  {
    q: "Does the AI intake assistant give legal advice?",
    a: "No. It is built not to. It does not give legal advice, filing deadlines or case-value estimates, does not promise outcomes, and reminds the person that the conversation was information-gathering only. Your attorneys review and advise.",
  },
  {
    q: "Which practice areas does it handle?",
    a: "The demo on this page is set up for a personal injury firm. The assistant can be given a firm's own name and practice areas, so the questions fit the matters that firm takes.",
  },
  {
    q: "Does it replace our intake staff?",
    a: "No. It covers the moments nobody is available and does the first round of questions, so your staff start the follow-up call with the facts already written down.",
  },
  {
    q: "Does it answer phone calls?",
    a: "No. It is a chat assistant for your website. Phone calls still need a person or an answering service; the assistant covers the people who would rather type, or who visit when your office is closed.",
  },
  {
    q: "How do I get it on my firm's website?",
    a: "Try the demo above, then use the form at the end of the conversation, or ask for a free audit below. Setup depends on your site and practice areas, so it is scoped with you first.",
  },
];

export default function IntakeAssistantSolutionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: websiteRef,
        author: founderRef,
      },
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#tool`,
        name: "SearchPrex AI Intake Assistant",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: PAGE_URL,
        description:
          "An AI intake assistant for law firms that gathers a potential client's facts, screens the lead and produces a structured case summary for the firm.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free live demo" },
        provider: organizationRef,
        audience: {
          "@type": "Audience",
          audienceType: "Law firms",
          geographicArea: { "@type": "Country", name: "United States" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
          { "@type": "ListItem", position: 4, name: "AI Intake Assistant", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const link = "font-semibold text-neutral-950 underline underline-offset-2";

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script id="ld-intake-assistant" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-24 sm:pt-28">
        <PageHero
          centered
          eyebrow="Law firm tool · Free live demo"
          title={
            <>
              AI intake assistant <Accent>for law firms</Accent>
            </>
          }
          subtitle="The person who finds your firm at 2 a.m. wants to tell someone what happened. This assistant listens, asks the questions an attorney would, and hands your team a clean case summary by morning. Try it below as if you were a potential client."
          trustPoints={["No legal advice given", "Screens every lead", "Built for US law firms"]}
        />

        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Solutions", href: "/resources/solution" },
              { label: "AI Intake Assistant" },
            ]}
          />
        </div>

        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <IntakeAssistant />
        </section>

        <Section tone="surface">
          <SectionHeading eyebrow="How it works" title="Built for law firm intake, not generic chat" />
          <CardGrid columns={2}>
            {DOES.map((item) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title} body={item.body} />
            ))}
          </CardGrid>
        </Section>

        <Section width="reading">
          <SectionHeading eyebrow="Output" title="What the firm gets after every conversation" />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
            <dl className="divide-y divide-slate-100">
              {SUMMARY_FIELDS.map(([name, detail]) => (
                <div key={name} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                  <dt className="text-sm font-semibold text-neutral-900">{name}</dt>
                  <dd className="mt-1 text-sm text-[#5b6472] sm:col-span-2 sm:mt-0">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section width="reading">
          <SectionHeading eyebrow="FAQ" title="AI intake assistant questions, answered" />
          <FaqList faqs={FAQS} name="intake-assistant-solution-faq" />
        </Section>

        <Section tight width="reading">
          <GuideMagnet guide={LAW_CHECKLIST_GUIDE} />
        </Section>

        <ArticleLeadMagnet
          variant="bottom"
          source="solution:intake-assistant"
          copy={{
            headline: "Want this assistant configured for your firm's practice areas?",
            sub: "Send over your website URL and we'll audit your intake friction and give you a free implementation roadmap within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
