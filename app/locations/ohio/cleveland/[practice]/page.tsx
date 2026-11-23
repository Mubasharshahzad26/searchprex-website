// app/locations/ohio/cleveland/[practice]/page.tsx
// Hyper-targeted practice-specific sub-pages for Cleveland, Ohio law firm SEO.
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
  DollarSign,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  BookOpen
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
        
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/20 via-slate-950 to-slate-950 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Scale className="h-3.5 w-3.5" />
              <span>{practice.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-tight">
              {practice.h1}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
              {practice.lead}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl pt-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Typical Google Ads CPC</span>
                <span className="text-xl sm:text-2xl font-black text-rose-400 mt-1 block">{practice.cpc}</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Avg. Signed Case Fee</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">{practice.caseValue}</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Cuyahoga Territory Status</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 mt-1 block">1-Firm Exclusivity</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/locations/ohio/cleveland#reality-check"
                className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-black px-7 py-3.5 text-sm sm:text-base shadow-xl transition-all duration-200 hover:scale-105"
              >
                <span>Claim Exclusive Cleveland Territory</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/locations/ohio/cleveland"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold px-6 py-3.5 text-sm transition-all"
              >
                <span>View Full Cleveland SEO Hub →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Statutory & Jurisdiction Architecture */}
        <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 sm:p-9 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>Cuyahoga Jurisdiction & Corridors</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                    High-Frequency Local Venues We Target
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {practice.courtsAndCorridors}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  Targeted geographically in Google Map Pack & Local Citations
                </div>
              </div>

              <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 sm:p-9 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    <Scale className="h-4 w-4" />
                    <span>Ohio Statutory Semantic Entity Graph</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                    Ohio Revised Code Concepts Google Expects
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {practice.statutes}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  Essential for Google AI Overviews & Knowledge Graph citation
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Targeted Keyword Matrix */}
        <section className="py-16 lg:py-22 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Keyword Dominance Architecture
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
                High-Intent Keywords That Sign Retainers
              </h2>
              <p className="mt-3 text-base text-slate-600">
                We organize your Cleveland practice area into three distinct intent silos to capture clients at every stage of their decision:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Silo 1: Commercial Keywords */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                    Direct Commercial Intent
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-4">
                    Primary Head Terms
                  </h4>
                  <div className="space-y-2">
                    {practice.targetKeywords.commercial.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <span className="mt-6 text-[11px] font-semibold text-slate-500 block border-t border-slate-200 pt-3">
                  Map Pack 3-Pack Core Targets
                </span>
              </div>

              {/* Silo 2: Urgent / Emergency Queries */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
                    Urgent After-Hours Queries
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-4">
                    Immediate Action Searches
                  </h4>
                  <div className="space-y-2">
                    {practice.targetKeywords.urgent.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <span className="mt-6 text-[11px] font-semibold text-rose-600 block border-t border-slate-200 pt-3">
                  Captured by 24/7 AI Intake Engine
                </span>
              </div>

              {/* Silo 3: Affluent Suburbs */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Affluent Suburb Modifiers
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-4">
                    High-Margin Suburb Queries
                  </h4>
                  <div className="space-y-2">
                    {practice.targetKeywords.suburb.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <span className="mt-6 text-[11px] font-semibold text-emerald-700 block border-t border-slate-200 pt-3">
                  Lower Competition · Higher Retainers
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Strategy Execution Steps */}
        <section className="py-16 lg:py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Proven Client Acquisition Framework
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">
                How We Capture {practice.name} Retainers in Cleveland
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {practice.strategySteps.map((step, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xs flex flex-col justify-between">
                  <div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm border border-emerald-500/30 mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trial Offer Box */}
            <div className="mt-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-slate-800 to-neutral-900 border border-neutral-700 p-8 sm:p-10 text-center">
              <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
                Zero Friction Risk Reversal
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Test Our 24/7 AI Legal Intake Engine Free for 14 Days
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                No credit card required. Connect our speed-to-lead triage system to your incoming web forms and phone lines to stop after-hours lead bleeding before signing an SEO retainer.
              </p>
              <div className="mt-6">
                <Link
                  href="/locations/ohio/cleveland#reality-check"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black px-7 py-3.5 text-sm transition-all hover:scale-105"
                >
                  <span>Activate 14-Day Free Intake Trial</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQs with Schema Markup */}
        <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Frequently Asked Questions
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
                {practice.name} SEO in Cleveland
              </h2>
            </div>

            <div className="space-y-4">
              {practice.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border-2 border-slate-200 bg-slate-50/40 p-6">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Related Research Guides (Cross-Links) */}
            <div className="mt-14 pt-8 border-t border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
                Recommended Cleveland Legal Marketing Studies
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/blog/cleveland-law-firm-intake-study-missed-calls"
                  className="rounded-xl border border-slate-200 p-4 hover:border-neutral-900 hover:bg-slate-50 transition-all text-xs font-bold text-neutral-950"
                >
                  How Cleveland Solo Attorneys Lose Signed Cases to Slow Intake →
                </Link>
                <Link
                  href="/blog/ohio-rule-7-3-ai-legal-intake-compliance"
                  className="rounded-xl border border-slate-200 p-4 hover:border-neutral-900 hover:bg-slate-50 transition-all text-xs font-bold text-neutral-950"
                >
                  Ohio Rule 7.3 &amp; Automated AI Intake Compliance Guide →
                </Link>
                <Link
                  href="/blog/cuyahoga-county-law-firm-seo-vs-ppc-roi"
                  className="rounded-xl border border-slate-200 p-4 hover:border-neutral-900 hover:bg-slate-50 transition-all text-xs font-bold text-neutral-950"
                >
                  Cuyahoga County SEO vs. $300 PPC Clicks: 2026 ROI Breakdown →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Other Practice Areas in Cleveland */}
        <section className="py-14 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
              Explore Other Cleveland Practice Area Silos
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherPractices.map((op) => (
                <Link
                  key={op.slug}
                  href={`/locations/ohio/cleveland/${op.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-neutral-900 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                      {op.badge}
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
