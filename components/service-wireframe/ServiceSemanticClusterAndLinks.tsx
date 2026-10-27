"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, ArrowRight, Wrench, Newspaper, Compass, CheckCircle2 } from "lucide-react";

export interface SemanticKeywordClusterItem {
  tabName: string;
  coreEntities: string;
  lowHangingKeywords: string[];
  psychologyAndIntent: string;
  siloHref: string;
  siloLabel: string;
}

interface ServiceSemanticClusterAndLinksProps {
  eyebrow: string;
  h2: string;
  answerCapsule: string;
  clusters: SemanticKeywordClusterItem[];
}

export default function ServiceSemanticClusterAndLinks({
  eyebrow,
  h2,
  answerCapsule,
  clusters,
}: ServiceSemanticClusterAndLinksProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = clusters[selectedIdx] ?? clusters[0];

  return (
    <section
      id="semantic-keywords-and-links"
      className="scroll-mt-20 border-b border-slate-200 bg-white py-16 sm:py-24 font-sans"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Semantic H2 + 45-60 Word AI Overview Answer Capsule */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Layers className="h-4 w-4 text-neutral-900" aria-hidden />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            {h2}
          </h2>

          <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed">
            {answerCapsule}
          </p>
        </div>

        {/* Interactive Cluster Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {clusters.map((c, idx) => {
            const active = selectedIdx === idx;
            return (
              <button
                type="button"
                key={c.tabName}
                onClick={() => setSelectedIdx(idx)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  active
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {c.tabName}
              </button>
            );
          })}
        </div>

        {/* 3-Column Semantic Entity & Low-Hanging Long-Tail Grid */}
        {current ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Core Semantic Entities */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  AEO / GEO Entity Signals
                </span>
                <h3 className="text-base sm:text-lg font-black text-neutral-950 mb-3">
                  Core Topics Google &amp; ChatGPT Expect
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {current.coreEntities}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                Verified Entity &amp; Schema Alignment
              </div>
            </div>

            {/* Column 2: USA Low-Hanging Long-Tail Keywords */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Low-KD High-Converting Terms
                </span>
                <h3 className="text-base sm:text-lg font-black text-neutral-950 mb-3">
                  USA Long-Tail Keywords We Target
                </h3>
                <div className="space-y-2">
                  {current.lowHangingKeywords.map((kw, i) => (
                    <div
                      key={i}
                      className="text-xs font-mono font-semibold text-neutral-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                    >
                      {kw}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-neutral-900">
                Commercial &amp; Transactional Search Intent
              </div>
            </div>

            {/* Column 3: Buyer Psychology & Dedicated Silo Link */}
            <div className="rounded-2xl border-2 border-neutral-900 bg-slate-50 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1.5">
                  Target Audience Psychology
                </span>
                <h3 className="text-base sm:text-lg font-black text-neutral-950 mb-3">
                  Why This Converts into Revenue
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {current.psychologyAndIntent}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200">
                <Link
                  href={current.siloHref}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-neutral-950 underline hover:text-neutral-700"
                >
                  <span>{current.siloLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {/* High-Velocity Contextual Internal Linking Matrix (Tools, News Hub, Services & Locations) */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Core SEO & AI Free Tools */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-950">
                <Wrench className="h-4 w-4 text-neutral-900" aria-hidden />
                <span>Essential 2026 Free SEO &amp; AI Tools</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm font-semibold">
                <li>
                  <Link href="/law-firm-scorecard" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Law Firm SEO &amp; AI Visibility Scorecard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/schema-generator" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>JSON-LD Schema Markup Generator</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/llms-txt-generator" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>llms.txt AI Crawler File Builder</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/keyword-research" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>USA Keyword Research &amp; Intent Tool</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/serp-checker" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Live Google SERP &amp; Map Pack Checker</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: 2026 SEO News & Algorithm Intelligence */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-950">
                <Newspaper className="h-4 w-4 text-neutral-900" aria-hidden />
                <span>2026 Search Telemetry &amp; News Hub</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm font-semibold">
                <li>
                  <Link href="/resources/news" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Latest SEO News &amp; 2026 Algorithm Log</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/news/local-seo-updates" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>US Regional Map Pack &amp; GBP Updates</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/news/llm-seo-news-2026" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>AI Overviews, ChatGPT &amp; GEO Research</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/news/google-algorithm-updates" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Google Core &amp; Indexing Updates</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/solutions" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>2026 Technical &amp; GBP Playbooks</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Core Service Silos & Proof */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-950">
                <Compass className="h-4 w-4 text-neutral-900" aria-hidden />
                <span>Core USA Services &amp; Verified Proof</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm font-semibold">
                <li>
                  <Link href="/services/law-firm-seo" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>USA Law Firm SEO &amp; Attorney E-E-A-T</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/local-seo" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Local SEO &amp; Google Map Pack Top 3</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/ecommerce-seo" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Shopify &amp; WooCommerce Ecommerce SEO</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/technical-seo" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Technical SEO Audit &amp; Indexing Recovery</span>
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-neutral-900 hover:underline flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>Verified GSC Case Studies &amp; Pricing</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
