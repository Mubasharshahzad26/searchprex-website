"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Tag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SugarLandKeywords() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const clusters = [
    {
      name: "High-Asset Family Law",
      topics:
        "Texas community property · forensic business valuation · retirement accounts & QDRO division · executive stock options & RSUs · oil & gas royalty division · prenuptial and postnuptial agreements · Texas Family Code § 6.301",
      longTail:
        '"high net worth divorce lawyer Sugar Land", "QDRO attorney Fort Bend County", "postnuptial agreement lawyer Sugar Land", "First Colony divorce lawyer"',
      intent: "High commercial intent from affluent spouses seeking discrete, sophisticated asset protection.",
      href: "/services/law-firm-seo/family-law",
      linkLabel: "Family Law & Divorce SEO",
    },
    {
      name: "Estate Planning & Probate",
      topics:
        "Wills & trusts · revocable living trusts · medical & durable powers of attorney · Fort Bend probate court in Richmond · independent estate administration · muniment of title · homestead protections · Texas Estates Code",
      longTail:
        '"estate planning lawyer Sugar Land", "probate attorney Richmond TX", "muniment of title Fort Bend County", "living trust lawyer Sugar Land"',
      intent: "Informational-to-commercial journey: searchers research probate avoidance before booking consultations.",
      href: "/services/law-firm-seo/estate-planning",
      linkLabel: "Estate Planning & Probate SEO",
    },
    {
      name: "Business Law & Executive Immigration",
      topics:
        "Corporate formation (LLC, PLLC) · shareholder operating agreements · commercial leases on HWY 6 · succession planning · employment-based immigration · EB-5 investor visas · H-1B specialty occupation petitions",
      longTail:
        '"business lawyer Sugar Land", "immigration attorney Sugar Land TX", "commercial contract lawyer Fort Bend", "investor visa attorney Sugar Land"',
      intent: "High-stakes commercial intent from tech entrepreneurs, healthcare professionals, and multinational corporate leaders.",
      href: "/services/law-firm-seo",
      linkLabel: "Business & Corporate SEO",
    },
  ];

  const active = clusters[selectedIdx];

  return (
    <section id="keywords" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Topical Authority &amp; Semantic Entities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Law Firm SEO Keywords for Sugar Land: Topics Google &amp; AI Overviews Expect
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            <strong>Google&apos;s Hummingbird and Helpful Content algorithms evaluate a legal page by its semantic depth.</strong> Out-of-state agencies write generic definitions copied from other jurisdictions. We build comprehensive entity silos matching authentic Texas statutes and Fort Bend realities.
          </p>
        </div>

        {/* Cluster Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {clusters.map((c, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Active Semantic Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Box 1: Core Topics */}
            <div className="space-y-2 p-6 rounded-2xl bg-white border border-slate-200/80">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#534AB7]" />
                <span>Core Statutory Entities:</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {active.topics}
              </p>
            </div>

            {/* Box 2: Local Long-Tail Queries */}
            <div className="space-y-2 p-6 rounded-2xl bg-white border border-slate-200/80">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#1a7d59]" />
                <span>Local Long-Tail Queries We Target:</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 font-mono leading-relaxed">
                {active.longTail}
              </p>
            </div>

            {/* Box 3: Intent & Strategy Link */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#EEEDFE]/40 border border-[#534AB7]/30 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                  Search Intent &amp; Conversion Logic:
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {active.intent}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={active.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#534AB7] hover:underline"
                >
                  <span>{active.linkLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
