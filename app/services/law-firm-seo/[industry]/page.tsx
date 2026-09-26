// app/services/law-firm-seo/[industry]/page.tsx
//
// Law firm SEO by practice area, on the shared service template. Copy lives in
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
import { ArrowRight, Info, MapPin, Scale, Sparkles } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import {
  AnswerCapsules,
  AuthorCard,
  Breadcrumb,
  CardGrid,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { CITY_PAGES } from "@/lib/city-pages";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

const SITE = "https://www.searchprex.com";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-09-26";

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

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Law Firm SEO", href: "/services/law-firm-seo" },
          { label: page.name },
        ]}
      />

      {/* Sideways links between the practice areas. */}
      <nav aria-label="Law firm SEO by practice area" className="border-b border-[#e5e7eb] bg-[#f8f9fc]">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
          <Link href="/services/law-firm-seo" className="whitespace-nowrap text-[#5b6472] hover:text-[#0a0f2e]">
            All law firm SEO
          </Link>
          {INDUSTRY_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/services/law-firm-seo/${p.slug}`}
              aria-current={p.slug === page.slug ? "page" : undefined}
              className={
                p.slug === page.slug
                  ? "whitespace-nowrap text-[#534AB7] underline underline-offset-4"
                  : "whitespace-nowrap text-[#5b6472] hover:text-[#0a0f2e]"
              }
            >
              {p.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* HERO · Attention */}
      <PageHero
        compactTop
        eyebrow={`Law Firm SEO · ${page.name}`}
        title={
          <>
            {page.h1} <Accent>{page.accent}</Accent>
          </>
        }
        subtitle={page.heroSub}
        actions={
          <Link href="#approach" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#534AB7" }}>
            See the approach <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["One firm per city", "Reply within 24 hours", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={source}
            copy={{
              headline: `Free ${page.name.toLowerCase()} tear-down`,
              sub: "Send your URL. I’ll check your practice-area pages, Business Profile and the firms outranking you in your city — within 24 hours.",
            }}
          />
        }
      />

      {/* THE STRAIGHT ANSWER · in place of proof that does not exist */}
      <Section id="approach" tight>
        <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-[#d9d5f5] bg-[#f5f3ff] p-6">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#534AB7]" aria-hidden />
          <div>
            <p className="text-sm font-black text-[#0a0f2e]">{page.approach.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">{page.approach.body}</p>
            <Link href="/case-studies" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
              See the verified results we do have <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* WHAT'S DIFFERENT ABOUT THIS PRACTICE AREA · Interest */}
      <Section>
        <SectionHeading
          eyebrow={`${page.name} search`}
          title={`What ranks for ${page.name.toLowerCase()} firms`}
          intro="How people search for this practice area, and what the work does about it."
        />
        <CardGrid columns={2}>
          {page.sections.map((s) => (
            <div key={s.heading} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <p className="flex items-center gap-2 text-base font-black text-[#0a0f2e]">
                <Scale className="h-4 w-4 flex-shrink-0 text-[#534AB7]" aria-hidden />
                {s.heading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">{s.body}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* ANSWERS · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="Quick answers" title={`${page.name} SEO, answered plainly`} />
        <AnswerCapsules items={page.capsules} />
      </Section>

      {/* MID-PAGE FORM · Action */}
      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={source}
          copy={{
            eyebrow: "Want to see it on your firm first?",
            headline: "Test me on your own site before you pay anything.",
            sub: "Send your URL. A written tear-down of your practice-area pages, profile and the firms above you in your city — free, within 24 hours.",
          }}
        />
      </Section>

      {/* INTAKE DEMO · the live product, in place of the old "free SaaS" box */}
      <Section tone="surface" tight>
        <Link
          href="/services/law-firm-seo#intake-demo"
          className="group mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#534AB7] hover:shadow-md"
        >
          <Sparkles className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#534AB7]" aria-hidden />
          <span>
            <span className="block text-base font-black text-[#0a0f2e] group-hover:text-[#534AB7]">
              Ranking is half of it. Answering at 2am is the other half.
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-[#5b6472]">
              Try the AI intake assistant live — play a potential client and watch it qualify the enquiry.
            </span>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
              Open the live demo <ArrowRight className="h-3 w-3" aria-hidden />
            </span>
          </span>
        </Link>
      </Section>

      {/* CITIES · where there is demand for this practice area */}
      {cities.length > 0 ? (
        <Section>
          <SectionHeading
            eyebrow="City pages"
            title={`${page.name} SEO where we have city pages`}
            intro="Each city page covers what changes locally — the courts, the competition, the searches."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((c) => (
              <Link
                key={c.citySlug}
                href={`/locations/${c.stateSlug}/${c.citySlug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-sm font-medium text-[#0a0f2e] transition-colors hover:border-[#534AB7]"
              >
                <MapPin className="h-3.5 w-3.5 text-[#534AB7]" aria-hidden />
                {c.city}, {c.stateAbbr}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {/* PRICE */}
      {LAW_PLAN ? (
        <Section tone="surface">
          <SectionHeading eyebrow="What it costs" title={`${page.name} SEO pricing`} />
          <div className="mx-auto max-w-2xl rounded-2xl border-2 p-6 text-center" style={{ borderColor: LAW_PLAN.accent, background: LAW_PLAN.bg }}>
            <p className="text-3xl font-black" style={{ color: LAW_PLAN.accent }}>
              {formatRange(LAW_PLAN)} <span className="text-base font-bold text-[#5b6472]">/ month</span>
            </p>
            <p className="mt-2 text-sm text-[#374151]">{LAW_PLAN.best}: {LAW_PLAN.includes.join(" · ")}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#5b6472]">
              The number within the range depends on how many practice areas and cities the plan covers. Month to month.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold" style={{ color: "#534AB7" }}>
              Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {/* AUTHOR · E-E-A-T */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead Law Firm SEO Strategist · 5+ years · Semrush-certified"
          quote="&ldquo;I won&rsquo;t show you an ecommerce number and let the layout imply it was a law firm. What I can show you is the work, and a free tear-down of your own firm before you pay anything. When you work with SearchPrex, you work with me.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead Law Firm SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* FAQ · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title={`${page.name} SEO questions, answered`} />
        <FaqList faqs={page.faqs} name={`law-firm-seo-${page.slug}-faq`} />
      </Section>

      {/* CLOSE · Action */}
      <ArticleLeadMagnet
        variant="bottom"
        source={source}
        copy={{
          headline: `Send me your URL. I’ll tell you what is keeping your ${page.name.toLowerCase()} firm off page one.`,
          sub: "Two fields. A written look at your pages, profile and the firms above you — from me, within 24 hours.",
        }}
      />
    </main>
  );
}
