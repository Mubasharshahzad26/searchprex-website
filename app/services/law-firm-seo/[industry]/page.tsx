// app/services/law-firm-seo/[industry]/page.tsx
//
// Law firm SEO by practice area, on the topical band layout of the service
// pages (components/ServiceBands). Copy lives in
// lib/industry-pages.ts. There is no published law firm case study, so where
// the local and ecommerce pages show proof this page shows the plan, labelled
// as the plan (ABA Model Rule 7.1: no misleading communications).
//
// Replaces a page with a "30 days free SaaS" bonus box, keyword chips, a
// Google Maps embed with no API key, a phone-only CTA band and no lead form,
// schema or FAQ.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Scale } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  Band,
  BandIntro,
  CheckList,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  PriceCard,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { CITY_PAGES } from "@/lib/city-pages";
import { RETAINER_PLANS } from "@/lib/pricing";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const SITE = "https://www.searchprex.com";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-09-26";

const PROCESS = [
  { when: "Day 1", title: "Free tear-down", body: "Your URL in, a written look back within 24 hours: your pages, your Profile and the firms outranking you in your city." },
  { when: "Weeks 1–2", title: "Deep audit", body: "Site, competitors and the local legal market, mapped into a plan for your city and practice area." },
  { when: "Weeks 3–8", title: "Foundation & pages", body: "Technical fixes, attorney and FAQ schema, Business Profile, then practice-area and city pages." },
  { when: "Every Monday", title: "Report", body: "Rankings, calls and form fills — what moved, what did not, and what happens next." },
];

// Only the practice areas in lib/industry-pages.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((page) => ({ industry: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === industry);
  if (!page) return {};

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.h1} | SearchPrex`,
      description: page.metaDescription,
      url,
      siteName: "SearchPrex",
      type: "website",
      images: [{ url: `${SITE}/services/law-firm-seo/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.h1} | SearchPrex`,
      description: page.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === industry);
  if (!page) notFound();

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;
  const source = `service:law-firm-seo/${page.slug}`;
  const area = page.name.toLowerCase();
  const cities = page.locationsMentioned
    .map((slug) => CITY_PAGES.find((c) => c.citySlug === slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Built from the same arrays the page renders, so the FAQPage always
  // matches what a visitor can read.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.h1,
        isPartOf: websiteRef,
        about: { "@id": `${url}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: `Law firm SEO for ${page.name}`,
        provider: organizationRef,
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", audienceType: `${page.name} law firms` },
        description: page.metaDescription,
        url,
        ...(LAW_PLAN
          ? {
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: LAW_PLAN.min,
                  maxPrice: LAW_PLAN.max,
                  priceCurrency: "USD",
                  unitText: "MONTH",
                },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
          { "@type": "ListItem", position: 3, name: "Law Firm SEO", item: `${SITE}/services/law-firm-seo` },
          { "@type": "ListItem", position: 4, name: page.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [...page.capsules, ...page.faqs].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        id={`ld-law-firm-seo-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServiceHero
        crumb={page.name}
        parent={{ label: "Law Firm SEO", href: "/services/law-firm-seo" }}
        above={
          <nav aria-label="Law firm SEO by practice area" className="mt-4 overflow-x-auto border-y bg-slate-50" style={{ borderColor: "#e5e7eb" }}>
            <div className="mx-auto flex max-w-6xl gap-6 px-4 py-3 text-sm font-medium sm:px-6 lg:px-8">
              <Link href="/services/law-firm-seo" className="whitespace-nowrap text-slate-500 hover:text-slate-900">
                All law firm SEO
              </Link>
              {INDUSTRY_PAGES.map((p) =>
                p.slug === page.slug ? (
                  <span key={p.slug} aria-current="page" className="whitespace-nowrap font-bold text-[#534AB7]">
                    {p.name}
                  </span>
                ) : (
                  <Link key={p.slug} href={`/services/law-firm-seo/${p.slug}`} className="whitespace-nowrap text-slate-500 hover:text-slate-900">
                    {p.name}
                  </Link>
                ),
              )}
            </div>
          </nav>
        }
        eyebrow={`Law firm SEO · ${page.name}`}
        title={page.h1}
        accent={page.accent}
        subtitle={page.heroSub}
        primary={{ href: "#approach", label: "See the approach" }}
        secondary={{ href: "/services/law-firm-seo#intake-demo", label: "Try the intake demo" }}
        trustPoints={["One firm per city", "The founder does the work", "90-day money-back guarantee"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={source}
            copy={{
              headline: `Free ${area} tear-down`,
              sub: "Send your URL. I’ll check your practice-area pages, Business Profile and the firms outranking you in your city — within 24 hours.",
            }}
          />
        }
      />

      {/* THE STRAIGHT ANSWER · in place of proof that does not exist */}
      <Band id="approach">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>A straight answer first</Eyebrow>
          <H2 center>{page.approach.title}</H2>
          <Lead center>{page.approach.body}</Lead>
          <TextLink href="/case-studies">See the verified results I do have</TextLink>
        </div>
      </Band>

      {/* WHAT RANKS FOR THIS PRACTICE AREA */}
      <Band dark>
        <BandIntro
          dark
          eyebrow={`${page.name} search`}
          title={`What ranks for ${area} firms`}
          lead="How people search for this practice area, and what the work does about it."
        />
        <RuleGrid columns={2}>
          {page.sections.map((s) => (
            <RuleItem
              key={s.heading}
              dark
              icon={<Scale className="h-5 w-5 flex-shrink-0 text-[#b9b3f5]" aria-hidden />}
              title={s.heading}
              body={s.body}
            />
          ))}
        </RuleGrid>
      </Band>

      {/* INTAKE DEMO · the live product */}
      <Band muted>
        <BandIntro
          eyebrow="Live demo · AI intake assistant"
          title="Ranking is half of it. Answering at 2am is the other half."
          lead="Try the AI intake assistant live — play a potential client and watch it qualify the enquiry in seconds."
        />
        <div className="text-center">
          <TextLink href="/services/law-firm-seo#intake-demo">Open the live demo</TextLink>
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark>
        <BandIntro dark eyebrow="How it works" title="From free tear-down to more consultations" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: `Get my free ${area} tear-down` }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One firm per city, one person doing the work</H2>
            <Lead>
              You work with the person who builds your pages. Every recommendation is made for your city, this practice area and the firms you compete with.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "Market exclusivity: one firm per city and practice area",
                  "A written plan before you pay anything",
                  "Built to YMYL and bar-advertising rules",
                  "A plain-English report every Monday",
                  "Month to month, no long contract",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {LAW_PLAN ? (
              <PriceCard
                plan={LAW_PLAN}
                label={`${page.name} SEO`}
                note="Where a firm lands in the range depends on how many practice areas and cities the plan covers. Month to month."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;I won&rsquo;t show you an ecommerce number and let the layout imply it was a law firm. What I can show you is the work, and a free tear-down of your own firm before you pay anything. When you work with SearchPrex, you work with me.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* CITIES & RELATED */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="Keep reading"
          title={cities.length ? `${page.name} SEO where I have city pages` : "More on law firm SEO"}
          lead={cities.length ? "Each city page covers what changes locally — the courts, the competition, the searches." : undefined}
        />
        {cities.length ? (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {cities.map((c) => (
              <Link
                key={c.citySlug}
                href={`/locations/${c.stateSlug}/${c.citySlug}`}
                className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                style={{ borderColor: "rgba(185,179,245,0.45)" }}
              >
                <MapPin className="h-3.5 w-3.5 text-[#b9b3f5]" aria-hidden />
                {c.city}, {c.stateAbbr}
              </Link>
            ))}
          </div>
        ) : null}
        <RuleGrid>
          <RuleItem dark href="/services/law-firm-seo" title="Law firm SEO services" body="The full approach: practice-area pages, attorney E-E-A-T, Business Profile and AI answers." />
          <RuleItem dark href="/resources/law-firm-seo-audit-checklist" title="Law firm SEO audit checklist" body="40 checks, written out in full. Free, no email." />
          <RuleItem dark href="/blog/keyword-research-for-law-firms" title="Keyword research for law firms" body="A step-by-step guide using free data." />
        </RuleGrid>
      </Band>

      {/* FAQ — the FAQPage schema above is built from the same arrays */}
      <FaqBand title={`${page.name} SEO questions, answered`}>
        <FaqList faqs={[...page.capsules, ...page.faqs]} name={`law-firm-seo-${page.slug}-faq`} />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={source}
          copy={{
            headline: `Send me your URL. I’ll tell you what is keeping your ${area} firm off page one.`,
            sub: "Two fields. A written look at your pages, profile and the firms above you — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
