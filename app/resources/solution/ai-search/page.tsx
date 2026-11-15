import type { Metadata } from "next";
import Link from "next/link";
import AiSearch from "@/app/components/ai-search/ai-search";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { Breadcrumb, CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/resources/solution/ai-search`;

const STEPS = [
  { step: "01", title: "Ask in plain English", body: "Type the question the way you would ask a colleague — about your law firm, your store or your local business." },
  { step: "02", title: "Get a straight answer", body: "The answer comes back in plain English, tuned to the kind of business the question is about, with links to the SearchPrex guides that go deeper." },
  { step: "03", title: "Know where it came from", body: "When live Google Search checking is available, the answer is checked against it and says so. Otherwise it is labelled as general SEO knowledge, not live search." },
];

const GUIDES = [
  { href: "/services/law-firm-seo", title: "Law firm SEO", body: "Practice-area pages, the map pack and bar rules." },
  { href: "/blog/keyword-research-for-law-firms", title: "Keyword research for law firms", body: "An eight-step method using free data." },
  { href: "/services/local-seo", title: "Local SEO", body: "Business Profile, reviews and service-area pages." },
  { href: "/resources/google-business-profile-checklist", title: "Business Profile checklist", body: "23 checks, written to Google's rules." },
  { href: "/services/ecommerce-seo", title: "Ecommerce SEO", body: "Indexing and product content for large catalogues." },
  { href: "/resources/woocommerce-seo-checklist", title: "WooCommerce SEO checklist", body: "25 checks from real store recoveries." },
  { href: "/resources/technical-seo-checklist", title: "Technical SEO checklist", body: "26 checks you can run with free Google tools." },
  { href: "/resources/news", title: "SEO news", body: "Google updates, dated and sourced." },
];

const FAQS = [
  {
    q: "Is the AI SEO answer engine free?",
    a: "Yes. There is no login, signup or credit card. Ask as many SEO questions as you like.",
  },
  {
    q: "Where do the answers come from?",
    a: "From an AI model given SEO guidance for law firms, ecommerce stores and local businesses. When live Google Search checking is available the answer is checked against it and labelled that way; otherwise it is labelled as general SEO knowledge, not live search.",
  },
  {
    q: "Can it check my website or my rankings?",
    a: "No. It answers questions; it does not crawl your site or look up your positions. For a specific site, use the SERP checker or ask for the free audit.",
  },
  {
    q: "How accurate are the answers?",
    a: "They are general guidance and can be incomplete or out of date, like any AI answer. Check anything important against Google's own documentation, and treat the answer as a starting point rather than a decision.",
  },
  {
    q: "What happens to the question I type?",
    a: "It is sent to the AI model to generate the answer and is not saved by SearchPrex. Your details are only stored if you choose to fill in the form after an answer.",
  },
];

const link = "font-bold text-[#171a22] group-hover:underline";

export const metadata: Metadata = {
  title: "AI SEO Answer Engine: Ask Law, Local & Ecommerce SEO Questions",
  description:
    "Ask any SEO question in plain English. Get grounded answers for law firms, ecommerce stores and local businesses, checked against Google search where available.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "AI SEO Answer Engine — Ask Law, Local & Ecommerce SEO Questions | SearchPrex",
    description: "Get grounded answers for law firms, ecommerce stores and local businesses in plain English.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function AiSearchSolutionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
      { "@type": "ListItem", position: 4, name: "AI Search", item: PAGE_URL },
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SearchPrex AI SEO Answer Engine",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free AI-powered search intelligence engine providing grounded answers for technical, legal, and local SEO questions.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-24 sm:pt-28">
        <div className="border-b border-slate-200 bg-slate-50 py-12 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <span className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-800">
              Free AI SEO Tool
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              AI SEO Answer Engine
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#566070] sm:text-lg">
              Ask any SEO question in plain English. Get grounded answers for law firms, ecommerce stores and local businesses.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Solutions", href: "/resources/solution" },
              { label: "AI Search" },
            ]}
          />
        </div>

        <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6 lg:px-8">
          <AiSearch />
        </div>

        <Section>
          <SectionHeading eyebrow="How it works" title="How the AI SEO answer engine works" />
          <CardGrid columns={3}>
            {STEPS.map((st) => (
              <FeatureCard key={st.step} step={st.step} title={st.title} body={st.body} />
            ))}
          </CardGrid>
        </Section>

        <Section tone="surface">
          <SectionHeading eyebrow="Use it well" title="What it is good for — and what it isn't" />
          <CardGrid columns={2}>
            <FeatureCard
              title="Good for"
              body="Strategy questions, how a Google feature works, what to fix first on a type of site, and explaining SEO terms in plain English — for law firms, stores and local businesses in the US."
            />
            <FeatureCard
              title="Not for"
              body="Your live rankings or traffic, anything that needs your own analytics, legal or financial advice, and guarantees. For your specific site, the free audit is the right tool."
            />
          </CardGrid>
        </Section>

        <Section>
          <SectionHeading eyebrow="Go deeper" title="Guides and free checklists" intro="The pages the answers most often point to." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-neutral-900 hover:shadow-md"
              >
                <p className={link}>{g.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5b6472]">{g.body}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section tone="surface" width="reading">
          <SectionHeading eyebrow="FAQ" title="AI SEO answer engine questions, answered" />
          <FaqList faqs={FAQS} name="ai-search-solution-faq" />
        </Section>

        <ArticleLeadMagnet
          variant="bottom"
          source="solution:ai-search"
          copy={{
            headline: "Want an answer about your own site? Send me your URL.",
            sub: "A written look at your site, your Business Profile and the competitors above you — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
