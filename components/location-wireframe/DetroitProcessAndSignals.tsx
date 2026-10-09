"use client";

// components/location-wireframe/DetroitProcessAndSignals.tsx
//
// Matches Page 3:
// 1. "OUR UNIQUE PROCESS: Our 7-Step Law Firm Local SEO and AI Visibility Process" (Interactive step switcher)
// 2. "HOW WE RANK YOU: Three signals Google weighs for law firms" (Progress bars for Relevance, Prominence, Proximity & Trust).

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitProcessAndSignals({ page }: { page: CityPage }) {
  const steps = [
    {
      num: "1",
      name: "Revenue audit",
      stage: "BE FOUND · BASELINE",
      title: "Revenue audit and AI visibility baseline",
      desc: "We map your case values and intake funnel, audit Google Business Profile and site health, then test the real client questions in Google AI Overviews, ChatGPT, Gemini and Perplexity to see who gets cited today.",
      deliverable: "Teardown of 3 rivals · AI citation baseline · intake gap report",
      kpi: "Baseline calls, rank grid, AI citation rate",
    },
    {
      num: "2",
      name: "Local foundation",
      stage: "BE FOUND · GEOFENCE",
      title: "Primary GBP and local court entity sync",
      desc: "Clearing duplicate map pins, aligning NAP across 40+ authoritative Michigan legal directories, and anchoring your Google Business Profile to courthouse radius polygons.",
      deliverable: "Clean citation directory · verified local categories · primary schema",
      kpi: "Map Pack proximity radius expansion",
    },
    {
      num: "3",
      name: "Intent pages",
      stage: "BE FOUND · STATUTES",
      title: "Statutory practice silo architecture",
      desc: `Building out discrete statutory pages for Michigan no-fault insurance, wrongful death, and criminal defense tailored specifically to ${page.county} court procedures.`,
      deliverable: "8-12 localized practice silos with attorney authorship",
      kpi: "Organic top 3 keyword rankings",
    },
    {
      num: "4",
      name: "Brand and entity",
      stage: "BE CITED · KNOWLEDGE GRAPH",
      title: "Attorney entity and schema interconnection",
      desc: "Connecting attorney bar admissions, published articles, and case verdicts directly to the firm entity graph so search engines recognize individual partner credentials.",
      deliverable: "Person schema · Organization schema · LegalService graph sync",
      kpi: "Entity recognition in Google Knowledge Graph",
    },
    {
      num: "5",
      name: "AI citation engine",
      stage: "BE CITED · AEO / GEO",
      title: "LLM answer-first optimization",
      desc: "Optimizing content formats for direct quotation by generative answer engines (ChatGPT, Google Gemini, and Claude) when clients ask natural-language questions.",
      deliverable: "Structured Q&A modules · statutory citations · prompt testing matrix",
      kpi: "AI citation rate increase (+45%–120%)",
    },
    {
      num: "6",
      name: "Reviews",
      stage: "BE CHOSEN · TRUST",
      title: "Automated review acceleration engine",
      desc: "Deploying bar-compliant, automated review request sequences post-settlement that prompt satisfied clients to leave authentic reviews mentioning key case types.",
      deliverable: "Review acquisition funnel · review response templates",
      kpi: "Review velocity & 4.9+ star rating preservation",
    },
    {
      num: "7",
      name: "Convert and scale",
      stage: "BE CHOSEN · REVENUE",
      title: "Intake tracking and multi-city expansion",
      desc: "Call tracking dynamic number insertion (DNI) connected to CRM revenue metrics, scaling dominance into surrounding sub-markets.",
      deliverable: "Monthly executive ROI report · signed case attribution",
      kpi: "Cost per signed client retainer",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  const signals = [
    {
      name: "Relevance",
      focusShare: "35% Focus",
      percentage: 35,
      detail: "Practice-area pages, FAQs, LegalService schema and intent-matched statutory copy.",
    },
    {
      name: "Prominence",
      focusShare: "40% Focus",
      percentage: 40,
      detail: "Google reviews, local bar links, authoritative legal directories, and digital PR.",
    },
    {
      name: "Proximity and Trust",
      focusShare: "25% Focus",
      percentage: 25,
      detail: "GBP verification, NAP consistency, attorney credentials, and E-E-A-T proof.",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: 7-Step Process */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              OUR UNIQUE PROCESS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
              Our 7-Step Law Firm Local SEO and AI Visibility Process
            </h2>
          </div>

          {/* Step Pills */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
            {steps.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeStep === idx
                    ? "bg-[#534AB7] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  activeStep === idx ? "bg-white text-[#534AB7] font-black" : "bg-slate-200 text-slate-700"
                }`}>
                  {s.num}
                </span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block">
                {current.stage}
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-black text-[#0a0f2e]">
                {current.title}
              </h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-3xl">
                {current.desc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs sm:text-sm">
              <div className="rounded-xl bg-white border border-slate-200 p-4">
                <span className="font-bold text-slate-900 block mb-1">What you get:</span>
                <span className="text-slate-600">{current.deliverable}</span>
              </div>
              <div className="rounded-xl bg-white border border-slate-200 p-4">
                <span className="font-bold text-slate-900 block mb-1">KPI we track:</span>
                <span className="text-slate-600">{current.kpi}</span>
              </div>
            </div>

            {/* AI Citation Rate Formula Banner */}
            <div className="rounded-xl bg-[#0a0f2e] text-white p-5 text-xs sm:text-sm space-y-2 border border-slate-800">
              <div className="flex items-center gap-2 text-[#a594fd] font-bold">
                <Sparkles className="h-4 w-4 text-[#3eb489]" />
                <span>AI Citation Rate Formula:</span>
              </div>
              <p className="text-slate-300 font-mono text-xs">
                AI citation rate = AI answers mentioning your firm ÷ total answers tested across Google AI Overviews, ChatGPT, Gemini &amp; Perplexity.
              </p>
              <p className="text-[11px] text-slate-400">
                We improve the odds of being cited as the verified source. We cannot guarantee any specific third-party AI platform output.
              </p>
            </div>
          </div>
        </div>

        {/* Lower: Three Signals Google Weighs for Law Firms */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              HOW WE RANK YOU
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#0a0f2e]">
              Three signals Google weighs for law firms
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Our work split by signal. Bars show focus share, illustrative only.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {signals.map((sig, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-[#534AB7]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-[#0a0f2e]">{sig.name}</h4>
                    <span className="text-xs font-bold text-[#534AB7]">{sig.focusShare}</span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sig.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#534AB7]"
                      style={{ width: `${sig.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
