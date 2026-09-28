// app/experts/page.tsx
//
// The founder's profile, aimed at the searches Search Console shows landing
// here ("local search marketing expert", "local search experts", "seo experts
// for attorneys") and at E-E-A-T: who does the work, what they have done, and
// how to check it.
//
// This page used to show five "Joining Soon" team members — invented names on
// blurred stock photos, with certifications — beside a founder card listing
// Google Analytics and Ahrefs certifications the founder does not hold.
// SearchPrex is founder-led; the page now says so and lists only confirmed
// facts (5+ years, Semrush and HubSpot certified, 20+ clients, the published
// case studies). Written in the first person, as the founder's own page.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Linkedin } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import WhySearchPrex from "@/components/WhySearchPrex";
import { CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";
import { getPageSEO } from "@/lib/admin-seo";
import { SITE, founderRef, websiteRef } from "@/lib/site-schema";
import { caseStudies, detailUrl } from "@/app/case-studies/data";

const PAGE_URL = `${SITE}/experts`;
const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const TITLE = "Local SEO Expert: Mubashar Sharif";
const DESCRIPTION =
  "Mubashar Sharif, founder of SearchPrex: a local SEO and law firm SEO expert who does every audit and report. Semrush and HubSpot certified, 20+ clients.";

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: `${TITLE} | SearchPrex`, description: DESCRIPTION, url: PAGE_URL, siteName: "SearchPrex", type: "profile" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/experts", baseMetadata);
}

const RESULT_CLIENTS = ["local-hvac-services", "mammoth-roofing", "door-doctor", "dolls-cleaning", "smk-store", "michigan-outdoor-sports"];

const FOCUS = [
  {
    title: "Local SEO",
    href: "/services/local-seo",
    body: "Google Business Profile, citations, reviews and service-area pages for trades and local service businesses — the work behind the map pack.",
  },
  {
    title: "Law firm SEO",
    href: "/services/law-firm-seo",
    body: "Practice-area and city pages, county courts, and content written within bar advertising rules, for firms that want calls in their own market.",
  },
  {
    title: "Ecommerce and technical SEO",
    href: "/services/ecommerce-seo",
    body: "Indexing, product content and crawl problems on large catalogues — including a 35,000-product WooCommerce store.",
  },
];

const HOW_TO_CHOOSE = [
  {
    title: "Ask who will do the work",
    body: "Many agencies sell with a senior person and deliver with juniors. Ask who writes the pages, who changes your Business Profile and who sends the report.",
  },
  {
    title: "Ask for screenshots, not claims",
    body: "Real results come from the client's own Search Console, Business Profile or store dashboard. A number without a screenshot and a date is a claim.",
  },
  {
    title: "Walk away from ranking guarantees",
    body: "Nobody can guarantee a position on Google, because Google decides. Guarantees on the work and on progress are reasonable; a promise of #1 is not.",
  },
  {
    title: "Check the contract and the price",
    body: "Month-to-month terms and a published price range tell you the expert expects to earn the next month. Long lock-ins with no exit tell you the opposite.",
  },
];

const FAQS = [
  {
    q: "Who is Mubashar Sharif?",
    a: "I'm the founder of SearchPrex, a founder-led SEO agency for US law firms, local service businesses and online stores. I have 5+ years of hands-on SEO experience, hold Semrush and HubSpot certifications, and have worked with 20+ clients.",
  },
  {
    q: "Is SearchPrex a team or one person?",
    a: "SearchPrex is founder-led. I run every audit, write every plan and send every report myself — there are no account managers or juniors between you and the work. That is also why I take one client per city.",
  },
  {
    q: "What does a local SEO expert actually do?",
    a: "Makes sure a local business shows up when nearby customers search: a complete, accurate Google Business Profile, consistent listings across directories, pages for each service and area served, a steady flow of genuine reviews, and a site Google can crawl. Then measures calls and map pack positions, not just traffic.",
  },
  {
    q: "Do you work with law firms?",
    a: "Yes. Law firm SEO is one of my three focus areas: practice-area and city pages, Google Business Profile work and content written within bar advertising rules. There is no published law firm case study yet, and the law pages say so.",
  },
  {
    q: "Where are you based, and do you work with US businesses?",
    a: "I work remotely with businesses across the United States, during US business hours. You get calls at a time that suits you, a written plan and a report every Monday.",
  },
  {
    q: "How do I start?",
    a: "Send your website below for a free tear-down. I'll look at your site, your Business Profile and the businesses ranking above you, and send back what to fix first within 24 hours.",
  },
];

export default function ExpertsPage() {
  const cases = RESULT_CLIENTS.map((c) => caseStudies.find((cs) => cs.slug.client === c)).filter(
    (c): c is NonNullable<typeof c> => c !== undefined,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: websiteRef,
        mainEntity: founderRef,
        dateModified: "2026-09-28",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Mubashar Sharif", item: PAGE_URL },
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main-content">
        {/* HERO — the person */}
        <section className="bg-[#f8f9fc] px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">Founder · SearchPrex</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-[#0a0f2e] sm:text-5xl">
                Mubashar Sharif, <span className="text-[#534AB7]">local SEO expert</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#374151]">
                I help US law firms, local service businesses and online stores get found — and I do the work myself. Every
                audit, every page plan and every Monday report comes from me, not an account manager.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                {["5+ years of hands-on SEO", "Semrush certified", "HubSpot certified", "20+ clients"].map((c) => (
                  <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 font-semibold text-[#0a0f2e]">
                    <BadgeCheck className="h-4 w-4 text-[#1a7d59]" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href="#start" className="inline-flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3 text-sm font-bold text-white hover:bg-[#433a9e]">
                  Get a free tear-down <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a0f2e] hover:text-[#0a66c2]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn profile
                </a>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl shadow-xl">
              <Image src="/images/mubashar-sharif.jpg" alt="Mubashar Sharif, founder of SearchPrex" fill priority sizes="360px" className="object-cover object-top" />
            </div>
          </div>
        </section>

        {/* FOCUS */}
        <Section>
          <SectionHeading eyebrow="What I work on" title="Three areas, done in depth" />
          <div className="grid gap-5 md:grid-cols-3">
            {FOCUS.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#534AB7] hover:shadow-md"
              >
                <h3 className="text-lg font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#374151]">{f.body}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                  Open <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* RESULTS */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Results"
            title="Work you can check"
            intro="Each result below links to its case study, with screenshots from the client's own Search Console, Business Profile or store dashboard."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((cs) => (
              <Link
                key={cs.slug.client}
                href={detailUrl(cs)}
                className="group rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#534AB7] hover:shadow-md"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                  {cs.seoType} · {cs.location}
                </p>
                <p className="mt-2 text-base font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{cs.client}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#374151]">{cs.headline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                  Read the case study <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#5b6472]">
            <Link href="/case-studies" className={link}>
              All case studies
            </Link>
          </p>
        </Section>

        <WhySearchPrex variant="local" service="local SEO" tone="white" />

        {/* HOW TO CHOOSE */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Choosing an expert"
            title="How to choose a local SEO expert"
            intro="Whether you hire me or someone else, these four questions separate the experts from the sales pitches."
          />
          <CardGrid columns={2}>
            {HOW_TO_CHOOSE.map((h) => (
              <FeatureCard key={h.title} title={h.title} body={h.body} />
            ))}
          </CardGrid>
        </Section>

        {/* FAQ */}
        <Section width="reading">
          <SectionHeading eyebrow="FAQ" title="Questions about working with me" />
          <FaqList faqs={FAQS} name="experts-faq" />
        </Section>

        <div id="start">
          <ArticleLeadMagnet
            variant="bottom"
            source="experts"
            copy={{
              headline: "Send me your URL. I'll tell you what is holding your business back on Google.",
              sub: "Two fields. A written look at your site, Business Profile and competitors — from me, within 24 hours.",
            }}
          />
        </div>
      </main>

      <ChatWidget />
    </>
  );
}
