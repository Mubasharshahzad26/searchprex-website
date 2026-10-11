"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, CheckCircle2, ArrowRight, Layers, FileCode2, LineChart, ShieldCheck } from "lucide-react";

export default function KatyProcessExits() {
  const [selectedExit, setSelectedExit] = useState(0);

  const exits = [
    {
      kicker: "Exit 1 of 3 · Discovery & Baseline",
      name: "Exit 1 · The Katy & Tri-County Audit",
      headline: "See Exactly Where You Stand Against Houston Giants",
      body: "We audit your current website crawl, Google Business Profile radius, and the downtown Houston firms outranking you across Harris, Fort Bend, and Waller counties. We establish a definitive baseline of where your firm is cited in AI Overviews, Perplexity, and ChatGPT today.",
      links: [
        { label: "Request a free Katy tear-down", href: "#tear-down-form" },
        { label: "Try the live SERP checker", href: "/tools/serp-checker" },
      ],
      progress: "33%",
      icon: Compass,
      deliverables: [
        "Crawl-level technical indexing audit",
        "Tri-county venue page gap analysis",
        "Competitor citation & backlink audit",
        "Generative AI baseline citation score",
      ],
    },
    {
      kicker: "Exit 2 of 3 · Architecture & Content",
      name: "Exit 2 · Build County, Community & Answer Hubs",
      headline: "Deploy Hyper-Local Silos with Machine-Readable Schema",
      body: "We author jurisdictional county pages (Harris, Fort Bend, Waller), dedicated community hubs (Cinco Ranch, Fulshear, Brookshire), answer-first legal content, and embed LegalService and FAQPage JSON-LD schema alongside a clean llms.txt file so LLM crawlers understand your exact practice boundaries.",
      links: [
        { label: "Use schema markup generator", href: "/tools/schema-generator" },
        { label: "Generate an llms.txt file", href: "/tools/llms-txt-generator" },
      ],
      progress: "66%",
      icon: Layers,
      deliverables: [
        "3 county courthouse jurisdictional hubs",
        "Cinco Ranch & Fulshear community pages",
        "High-intent highway crash corridor hubs",
        "Custom LegalService & FAQPage schemas",
      ],
    },
    {
      kicker: "Exit 3 of 3 · Attribution & Retainers",
      name: "Exit 3 · Prove Results in Calls & Signed Retainers",
      headline: "Transparent Monthly Reporting Tied Directly to Revenue",
      body: "No vague 'impressions' or vanity traffic graphs. You receive a structured monthly report covering Google Map Pack geo-grid movements, tracked intake phone calls, signed client retainers, and ongoing AI citation rates—giving every dollar invested a transparent answer.",
      links: [
        { label: "Read our law firm case studies", href: "/case-studies" },
        { label: "Run the free SEO checklist", href: "/resources/law-firm-seo-audit-checklist" },
      ],
      progress: "100%",
      icon: LineChart,
      deliverables: [
        "Whisper call recording & lead attribution",
        "Local 3-Pack geo-grid radius reports",
        "Quarterly signed case revenue analysis",
        "Written 90-day milestone review",
      ],
    },
  ];

  const current = exits[selectedExit];
  const Icon = current.icon;

  return (
    <section id="process" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>The SearchPrex Implementation Highway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Three Exits From Invisible to Found in Katy
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A structured, milestones-driven roadmap designed specifically for law firms competing at the crossroads of Harris, Fort Bend, and Waller counties.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#534AB7] h-full transition-all duration-500 rounded-full"
            style={{ width: current.progress }}
          />
        </div>

        {/* Exit Switcher Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {exits.map((e, idx) => {
            const isSelected = selectedExit === idx;
            return (
              <button
                key={e.name}
                type="button"
                onClick={() => setSelectedExit(idx)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all border flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#0a0f2e] text-white border-[#0a0f2e] shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>{e.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Exit Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider">
                <Icon className="w-3.5 h-3.5" />
                <span>{current.kicker}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight">
                {current.headline}
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {current.body}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm font-bold text-[#534AB7]">
                {current.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 hover:text-[#3C3489] hover:underline"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Exit Deliverables &amp; Milestones:
              </div>
              {current.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
