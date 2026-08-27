import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone, Star, Sparkles, TrendingUp } from "lucide-react";
import {
  Breadcrumb,
  CardGrid,
  CtaBand,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  Accent,
  FeatureCard
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { CITY_PAGES } from "@/lib/city-pages";
import ChatWidgetLazy from "@/components/ChatWidgetLazy";

const SITE = "https://www.searchprex.com";

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((page) => ({
    industry: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === industry);
  if (!page) return {};

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "article",
    },
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
  
  const mentionedCities = page.locationsMentioned
    .map(slug => CITY_PAGES.find(c => c.citySlug === slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Law Firm SEO", href: "/services/law-firm-seo" },
          { label: page.name },
        ]}
      />

      {/* ── PRACTICE AREAS SUB-HEADER ── */}
      <div className="border-b bg-slate-50 overflow-x-auto" style={{ borderColor: color.border }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex space-x-6 text-sm font-medium" aria-label="Practice Areas">
            <Link href="/services/law-firm-seo" className="text-slate-500 hover:text-slate-900 whitespace-nowrap">
              Overview
            </Link>
            {INDUSTRY_PAGES.map((ind) => (
              <Link 
                key={ind.slug} 
                href={`/services/law-firm-seo/${ind.slug}`} 
                className={`whitespace-nowrap transition-colors ${
                  ind.slug === industry 
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-3 -mb-3' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {ind.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main>
        <PageHero
          compactTop
          eyebrow={`Law Firm SEO · ${page.name}`}
          title={page.h1}
          subtitle={page.heroSub}
          primaryCta={{
            href: "/free-audit",
            label: `Get a free SEO audit`,
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          }}
          secondaryCta={{ href: "/tools/keyword-research", label: "See keyword data for your practice area" }}
          trustPoints={["No contracts", "Founder works your account", "24-hour audit turnaround"]}
        />

        {/* ── AI INTAKE OFFER ── */}
        <Section tone="surface" tight>
          <div className={`p-6 md:p-8 ${radius.card} border bg-white shadow-sm flex flex-col md:flex-row items-center gap-6`} style={{ borderColor: color.primary }}>
            <div className="flex-shrink-0 bg-blue-50 p-4 rounded-full text-blue-600">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h3 className={`${heading.h4} mb-2`} style={{ color: color.ink }}>Special SaaS Offer</h3>
              <p className={text.body} style={{ color: color.muted }}>{page.aiIntakeOffer}</p>
            </div>
          </div>
        </Section>

        {/* ── UNIQUE SECTIONS ── */}
        <Section width="reading">
          <div className="flex flex-col gap-12">
            {page.uniqueSections.map((section, idx) => (
              <div key={idx}>
                <h2 className={`${heading.h3} mb-4`} style={{ color: color.ink }}>
                  <Accent>{section.heading}</Accent>
                </h2>
                <p className={text.body} style={{ color: color.muted }}>{section.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SEMANTIC KEYWORDS ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Targeted Intent"
            title="Semantic & Localized Keywords We Target"
            intro="We don't just chase vanity metrics. We target high-intent, localized, and semantic search queries that actually drive cases."
          />
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {page.semanticKeywords.map((kw, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm border border-blue-100">
                <TrendingUp className="h-4 w-4" />
                {kw}
              </span>
            ))}
          </div>
        </Section>

        {/* ── CASE STUDY & MAP ── */}
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Local SEO Case Study"
                title={page.caseStudy.title}
                intro={page.caseStudy.description}
                align="left"
              />
              <p className={`mt-4 font-semibold text-lg`} style={{ color: color.primary }}>
                Become our next first-page case study.
              </p>
            </div>
            <div className="relative w-full h-80 rounded-xl overflow-hidden border shadow-sm">
              <iframe
                title={`Google Map for ${page.caseStudy.mapQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(page.caseStudy.mapQuery)}`}
              ></iframe>
            </div>
          </div>
        </Section>

        {/* ── USPS ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Why SearchPrex?"
            title="Our Commitment To You"
          />
          <ul className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto mt-8">
            {page.usps.map((usp, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white p-5 rounded-lg border shadow-sm" style={{ borderColor: color.border }}>
                <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: color.primary }} aria-hidden />
                <span className={text.body} style={{ color: color.ink }}>
                  {usp}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── LOCATIONS ── */}
        {mentionedCities.length > 0 && (
          <Section>
            <SectionHeading
              eyebrow="Service Areas"
              title={`Where we provide ${page.name}`}
            />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {mentionedCities.map(city => (
                <Link
                  key={city.citySlug}
                  href={`/locations/${city.stateSlug}/${city.citySlug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white px-4 py-1.5 text-sm font-medium transition-colors hover:bg-slate-50"
                  style={{ color: color.ink, borderColor: color.border }}
                >
                  <MapPin className="h-3.5 w-3.5" style={{ color: color.primary }} aria-hidden />
                  {city.city}, {city.stateAbbr}
                </Link>
              ))}
            </div>
          </Section>
        )}

        <CtaBand
          eyebrow="Get Started"
          title={<>Ready to dominate<br />{page.name} search?</>}
          body="Let's build a customized semantic SEO and map pack strategy for your law firm."
          actions={[
            {
              href: "/free-audit",
              label: "Get a free audit",
              icon: <ArrowRight className="h-4 w-4" aria-hidden />,
            },
            {
              href: "tel:+923106526316",
              label: "+92 310 652 6316",
              variant: "onDark",
              icon: <Phone className="h-4 w-4" aria-hidden />,
            },
          ]}
          trustPoints={["30-Day Free AI Intake SaaS", "No contracts", "Founder does the audit"]}
        />

        <ChatWidgetLazy />
      </main>
    </>
  );
}
