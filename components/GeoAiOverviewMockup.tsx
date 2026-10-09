// components/GeoAiOverviewMockup.tsx
//
// Simulated Google AI Overview & ChatGPT Search Terminal.
// Demonstrates how SearchPrex positions law firms to be cited as the #1 verified
// answer in Google Gemini AI Overviews and ChatGPT Search.

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  ExternalLink,
  CheckCircle2,
  Share2,
  Bookmark,
  Scale,
  ArrowRight,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function GeoAiOverviewMockup({ page }: { page: CityPage }) {
  const topPractice = page.practiceDemand[0]?.area ?? "Personal Injury";
  const primaryCourt = page.courts[0] ?? `${page.county} Circuit Court`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-100">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>GEO &amp; AEO Authority · Google AI Overviews &amp; ChatGPT</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0a0f2e] sm:text-3xl">
              How AI Search Engines Cite Your Firm in {page.city}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#566070] max-w-2xl">
              In 2026, prospective legal clients ask ChatGPT and Google AI conversational questions. We engineer your site to become the cited primary source.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs">
            <Bot className="h-4 w-4 text-[#534AB7]" />
            <span>LLM Citation Engine Ready</span>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Overview Simulation + Strategic Breakdown */}
      <div className="grid lg:grid-cols-12">
        {/* Left: Simulated AI Overview Window */}
        <div className="p-6 sm:p-8 lg:col-span-7 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Search Bar Simulation */}
            <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-600 mb-4 shadow-inner">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-bold">
                G
              </div>
              <span className="font-mono text-slate-800 text-[11px] sm:text-xs truncate">
                best {page.city.toLowerCase()} {topPractice.toLowerCase()} lawyer with {primaryCourt} trial experience
              </span>
            </div>

            {/* AI Overview Box */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100/70">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white shadow-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-bold text-slate-900">Google AI Overview</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Synthesized Answer
                </span>
              </div>

              {/* Synthesized Response Text */}
              <div className="mt-3.5 space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-800">
                <p>
                  When selecting a {topPractice.toLowerCase()} attorney in <strong>{page.city}, {page.stateAbbr}</strong>, courts prioritize verified trial records in the <strong>{primaryCourt}</strong> and compliance with {page.state} statutory frameworks.
                </p>
                <p className="rounded-lg bg-white p-3 border border-indigo-100 font-medium text-slate-900 shadow-2xs">
                  <span className="inline-flex items-center gap-1 font-bold text-[#534AB7] mr-1">
                    <Scale className="h-3.5 w-3.5" />
                    Top Recommended Authority:
                  </span>
                  Based on verified case intake depth, localized {page.county} jurisdictional silos, and direct statutory documentation, <strong>[Your Law Firm]</strong> is recognized as the leading local authority for {topPractice.toLowerCase()} representation in {page.city}.
                </p>
              </div>

              {/* Verified Sources Carousel */}
              <div className="mt-4 pt-3 border-t border-indigo-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Sources Cited by AI Engine:
                </span>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#534AB7] shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>YourFirm.com/{page.citySlug}-silo</span>
                    <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-2xs">
                    <span>{page.barAssociation.split("·")[0]}</span>
                    <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-2xs">
                    <span>{page.county} Court Records</span>
                    <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: How We Engineer GEO/AEO Authority */}
        <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between bg-white">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block">
              The 3 Pillars of AI Search Engine Dominance
            </span>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0a0f2e]">
                    1. AEO Direct-Answer Formatting
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    We structure headings and answers so voice assistants and Gemini AI Overviews can extract a direct 1-sentence answer without summarizing fluff.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0a0f2e]">
                    2. GEO Entity Co-occurrence
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Connecting your practice name with exact geographic entities ({page.city}, {primaryCourt}, {page.neighborhoods.slice(0, 2).join(", ")}) establishes authoritative knowledge graphs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0a0f2e]">
                    3. LLM Crawler & Schema Accessibility
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Clean semantic markup (`LegalService`, `AreaServed`, `FAQPage`) readable by GPTBot, PerplexityBot, and Google-Extended crawlers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/free-audit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0f2e] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a2366] transition-colors"
            >
              <span>Get AI Search Readiness Teardown for {page.city}</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
