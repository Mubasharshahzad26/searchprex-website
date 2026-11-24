// app/locations/ohio/cleveland/[practice]/page.tsx
// Hyper-targeted practice-specific sub-pages for Cleveland, Ohio law firm SEO.
// 100% Light Theme aligned with the main Cleveland page.
// Server Component with complete Schema.org JSON-LD (Service, FAQPage, BreadcrumbList).

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Scale,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Building2,
  FileText
} from "lucide-react";
import { Breadcrumb } from "@/components/layout";
import {
  CLEVELAND_PRACTICES,
  getClevelandPractice,
  type ClevelandPracticePage
} from "@/lib/cleveland-practice-pages";
import { organizationRef, SITE } from "@/lib/site-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLEVELAND_PRACTICES.map((p) => ({ practice: p.slug }));
}

interface PageProps {
  params: Promise<{ practice: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { practice: slug } = await params;
  const practice = getClevelandPractice(slug);
  if (!practice) return {};

  const url = `${SITE}/locations/ohio/cleveland/${practice.slug}`;

  return {
    title: practice.metaTitle,
    description: practice.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: practice.metaTitle,
      description: practice.metaDescription,
      url,
      siteName: "SearchPrex",
      type: "website",
      images: [
        {
          url: `${SITE}/images/services/law-firm/city-cleveland-ohio-law-firm-seo.webp`,
          width: 1200,
          height: 630,
          alt: `${practice.practiceTitle} - SearchPrex Legal SEO`,
        },
      ],
    },
  };
}

export default async function ClevelandPracticeAreaPage({ params }: PageProps) {
  const { practice: slug } = await params;
  const practice = getClevelandPractice(slug);

  if (!practice) {
    notFound();
  }

  const url = `${SITE}/locations/ohio/cleveland/${practice.slug}`;
  const otherPractices = CLEVELAND_PRACTICES.filter((p) => p.slug !== practice.slug);

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: practice.practiceTitle,
        serviceType: `${practice.name} SEO`,
        description: practice.metaDescription,
        url,
        provider: organizationRef,
        areaServed: [
          { "@type": "City", name: "Cleveland", containedInPlace: { "@type": "State", name: "Ohio" } },
          { "@type": "AdministrativeArea", name: "Cuyahoga County" },
          { "@type": "City", name: "Westlake" },
          { "@type": "City", name: "Beachwood" },
          { "@type": "City", name: "Lakewood" },
          { "@type": "City", name: "Parma" },
        ],
        knowsAbout: [
          "Ohio Revised Code",
          "Cuyahoga County Court of Common Pleas",
          "Cleveland Municipal Court",
          "Ohio Rule of Professional Conduct 7.3",
          practice.statutes,
          ...(practice.statutesList ? practice.statutesList.map((s) => `${s.code}: ${s.title}`) : []),
          ...(practice.venuesList ? practice.venuesList.map((v) => v.name) : []),
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: practice.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
          { "@type": "ListItem", position: 3, name: "Ohio", item: `${SITE}/locations/ohio` },
          { "@type": "ListItem", position: 4, name: "Cleveland", item: `${SITE}/locations/ohio/cleveland` },
          { "@type": "ListItem", position: 5, name: practice.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "Ohio", href: "/locations/ohio" },
          { label: "Cleveland", href: "/locations/ohio/cleveland" },
          { label: practice.name },
        ]}
      />

      <main className="w-full bg-white text-slate-900 font-sans selection:bg-neutral-900 selection:text-white">
        
        {/* 1. Hero Section (100% Light Theme Aligned) */}
        <section className="relative overflow-hidden bg-white pt-10 pb-14 md:pt-14 md:pb-20 border-b border-slate-200">
          {/* Subtle Ambient Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            
            {/* Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                <span>{practice.eyebrowBadge || `${practice.name} SEO · Cleveland, OH`}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>1-Firm Cuyahoga Exclusivity</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 text-xs font-bold">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>{practice.badge}</span>
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 leading-[1.14] tracking-tight max-w-4xl">
              {practice.h1}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {practice.lead}
            </p>

            {/* Quick Metrics Bar (Light Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl pt-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Typical Google Ads CPC</span>
                <span className="text-xl sm:text-2xl font-black text-rose-600 mt-1 block">{practice.cpc}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">{practice.ppcMonthlyBurn}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Avg. Signed Case Value</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-700 mt-1 block">{practice.caseValue}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Estimated fee per client</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">SearchPrex Flat Retainer</span>
                <span className="text-xl sm:text-2xl font-black text-neutral-950 mt-1 block">$1,200 / mo</span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">Free 24/7 AI Intake Engine</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/locations/ohio/cleveland#reality-check"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-7 py-3.5 text-sm sm:text-base shadow-sm transition-all"
              >
                <span>{practice.slug === "personal-injury" ? "Get My Free 24-Hour Cleveland PI Audit" : `Request Free 24h ${practice.name} Audit`}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/locations/ohio/cleveland"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-neutral-900 font-semibold px-6 py-3.5 text-sm transition-all"
              >
                <span>← Back to Cleveland Law Firm SEO Hub</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Cuyahoga County Market Reality (Humanized Deep-Dive) */}
        <section className="py-12 lg:py-16 bg-slate-50/70 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <Building2 className="h-4 w-4 text-neutral-800" />
                <span>The Cuyahoga County Market Reality</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.marketRealityHeading || `Why Traditional Legal Marketing Fails for ${practice.name} in Cleveland`}
              </h2>
              
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                {practice.cuyahogaReality}
              </p>

              {/* Economic Comparison Bar */}
              <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-1">
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                    <span>Google Ads PPC Burn Rate</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Bidding on &quot;{practice.name.toLowerCase()} lawyer Cleveland&quot; costs <strong className="text-neutral-950 font-bold">{practice.cpc}</strong>. A typical monthly budget of {practice.ppcMonthlyBurn} vanishes quickly on unqualified clicks, tire-kickers, and competitor clicks. When you stop paying Google, your lead flow drops to zero overnight.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                    <TrendingUp className="h-4 w-4 text-emerald-700" />
                    <span>SearchPrex Organic Equity Model</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    At a flat <strong className="text-neutral-950 font-bold">$1,200/month</strong>, we build permanent digital equity on your domain. <strong className="text-neutral-950 font-bold">{practice.breakEvenRule}</strong> Month-to-month partnership, 1-firm exclusivity in Cuyahoga County, and full attribution in your monthly signed case ledger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Statutory & Jurisdiction Architecture */}
        <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Entity Mapping &amp; Court Alignment
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.statutesHeading || "How We Align Your Site with Ohio Law & Cuyahoga Courts"}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Google and AI engines (ChatGPT, Perplexity, Gemini) do not rank generic legal copy. They evaluate whether your site demonstrates authoritative knowledge of local courthouses, high-frequency collision corridors, trauma centers, and Ohio Revised Code statutes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>Cuyahoga Jurisdiction &amp; Corridors</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-4">
                    High-Frequency Local Venues We Target
                  </h3>
                  {practice.venuesList && practice.venuesList.length > 0 ? (
                    <div className="space-y-3">
                      {practice.venuesList.map((venue, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                            <span className="text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              {venue.name}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {venue.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-5">
                            {venue.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 text-xs font-mono text-slate-800 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed shadow-2xs">
                      {practice.courtsAndCorridors}
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-slate-500">
                  Targeted geographically in Google Map Pack &amp; Local Citations
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    <Scale className="h-4 w-4" />
                    <span>Ohio Statutory Semantic Entity Graph</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-4">
                    Ohio Revised Code Concepts Google Expects
                  </h3>
                  {practice.statutesList && practice.statutesList.length > 0 ? (
                    <div className="space-y-3">
                      {practice.statutesList.map((statute, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                            <span className="text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                              {statute.title}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {statute.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-5">
                            {statute.significance}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 text-xs font-mono text-slate-800 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed shadow-2xs">
                      {practice.statutes}
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-slate-500">
                  Essential for Google AI Overviews &amp; Knowledge Graph citation
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Targeted Keyword Matrix */}
        <section className="py-14 lg:py-20 bg-slate-50/50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Keyword Dominance Architecture
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                High-Intent Keywords That Sign Retainers
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                We organize your {practice.name.toLowerCase()} practice into three distinct intent silos to capture clients at every stage of their search:
              </p>
            </div>

            {/* Keyword Silo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Silo 1: Commercial Keywords */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                    Direct Commercial Intent
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-4">
                    Primary Head Terms
                  </h4>
                  <div className="space-y-2">
                    {practice.targetKeywords.commercial.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <span className="mt-6 text-[11px] font-semibold text-slate-500 block border-t border-slate-100 pt-3">
                  Map Pack 3-Pack Core Targets
                </span>
              </div>

              {/* Silo 2: Urgent / Emergency Queries */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                    Urgent / High-Intent Queries
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-4">
                    Immediate Action Searches
                  </h4>
                  <div className="space-y-2">
                    {practice.targetKeywords.urgent.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <span className="mt-6 text-[11px] font-semibold text-rose-600 block border-t border-slate-100 pt-3">
                  Captured by 24/7 AI Intake Engine
                </span>
              </div>

              {/* Silo 3: Affluent Suburbs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Affluent Suburb Modifiers
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-4">
                    High-Margin Suburb Queries
                  </h4>
                  <div className="space-y-2">
                    {practice.targetKeywords.suburb.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <span className="mt-6 text-[11px] font-semibold text-emerald-700 block border-t border-slate-100 pt-3">
                  Lower Competition · Higher Retainers
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Strategy Execution Steps & 24/7 AI Intake */}
        <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Execution Framework
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                How We Capture {practice.name} Retainers in Cleveland
              </h2>
            </div>

            {/* Execution Strategy Grid */}
            <div className={`grid grid-cols-1 ${practice.strategySteps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
              {practice.strategySteps.map((step, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col justify-between">
                  <div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white font-bold text-sm mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Practice-Specific Speed-to-Lead Callout */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Speed-to-Lead Triage System</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                    Under-60-Second AI Intake for {practice.name} Inquiries
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {practice.intakeWorkflow}
                  </p>
                </div>
                <div className="shrink-0">
                  <Link
                    href="/locations/ohio/cleveland#reality-check"
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3 text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <span>Test Free for 14 Days</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. FAQs with Schema Markup */}
        <section className="py-14 lg:py-20 bg-slate-50/60 border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Frequently Asked Questions
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.name} SEO in Cleveland
              </h2>
            </div>

            <div className="space-y-4">
              {practice.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Related Research Guides (Cross-Links) */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
                Recommended Cleveland Legal Marketing Studies
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/blog/cleveland-law-firm-intake-study-missed-calls"
                  className="rounded-xl border border-slate-200 bg-white p-4 hover:border-neutral-900 hover:shadow-xs transition-all text-xs font-bold text-neutral-950 flex flex-col justify-between"
                >
                  <span>How Cleveland Solo Attorneys Lose Signed Cases to Slow Intake</span>
                  <span className="text-slate-500 font-normal mt-2 flex items-center gap-1">Read Study →</span>
                </Link>
                <Link
                  href="/blog/ohio-rule-7-3-ai-legal-intake-compliance"
                  className="rounded-xl border border-slate-200 bg-white p-4 hover:border-neutral-900 hover:shadow-xs transition-all text-xs font-bold text-neutral-950 flex flex-col justify-between"
                >
                  <span>Ohio Rule 7.3 &amp; Automated AI Intake Compliance Guide</span>
                  <span className="text-slate-500 font-normal mt-2 flex items-center gap-1">Read Guide →</span>
                </Link>
                <Link
                  href="/blog/cuyahoga-county-law-firm-seo-vs-ppc-roi"
                  className="rounded-xl border border-slate-200 bg-white p-4 hover:border-neutral-900 hover:shadow-xs transition-all text-xs font-bold text-neutral-950 flex flex-col justify-between"
                >
                  <span>Cuyahoga County SEO vs. $300 PPC Clicks: 2026 ROI Breakdown</span>
                  <span className="text-slate-500 font-normal mt-2 flex items-center gap-1">View Breakdown →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Other Practice Areas in Cleveland */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
              Explore Other Cleveland Practice Area Silos
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherPractices.map((op) => (
                <Link
                  key={op.slug}
                  href={`/locations/ohio/cleveland/${op.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 hover:border-neutral-900 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                      {op.badge.split(" · ")[0]}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-950 mt-1">
                      {op.name} SEO Cleveland
                    </h4>
                  </div>
                  <span className="mt-3 text-xs font-bold text-neutral-900 flex items-center gap-1">
                    Explore Silo →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
