"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Key, ArrowRight, ShieldCheck, Scale, Compass } from "lucide-react";

const KEYWORD_CLUSTERS = [
  {
    name: "Workers' compensation",
    coreTopics: "Ohio BWC · FROI-1 First Report of Injury · Industrial Commission district hearings · allowed medical conditions · Temporary Total Disability (TTD) · Permanent Partial Disability (PPD) · VSSR violations · claim appeal to Cuyahoga Common Pleas",
    longTail: ['"workers comp lawyer Cleveland"', '"BWC claim denied attorney Cuyahoga County"', '"Industrial Commission hearing lawyer Cleveland"'],
    intent: "Procedure-heavy, high-intent searches where injured workers seek step-by-step statutory clarity rather than generic legal marketing fluff.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal Injury & Workers' Comp SEO",
  },
  {
    name: "Personal injury",
    coreTopics: "Ohio R.C. 2305.10 statute of limitations · modified comparative negligence (51% bar) · non-economic damages caps (R.C. 2315.18) · third-party liability · Cuyahoga County Court of Common Pleas · wrongful death claims",
    longTail: ['"car accident lawyer Cleveland"', '"truck accident attorney Cuyahoga County"', '"slip and fall lawyer Parma OH"'],
    intent: "Urgent, mobile-first inquiries following vehicular collisions on I-90, I-77, and I-480 requiring rapid intake and immediate attorney engagement.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal injury SEO architecture",
  },
  {
    name: "OVI & criminal defense",
    coreTopics: "Ohio R.C. 4511.19 OVI · Administrative License Suspension (ALS) · 30-day appeal windows · breathalyzer & chemical test suppression · record expungement under SB 288 · Cleveland Municipal Court arraignments",
    longTail: ['"OVI lawyer Cleveland"', '"record sealing attorney Cuyahoga County"', '"Cleveland Justice Center criminal lawyer"'],
    intent: "High-urgency, fear-driven searches occurring within 24 to 48 hours of an arrest, demanding immediate telephone consultation routing.",
    href: "/services/law-firm-seo/criminal-defense",
    linkLabel: "Criminal defense SEO architecture",
  },
];

export default function ClevelandKeywordCluster() {
  const [selectedCluster, setSelectedCluster] = useState(0);
  const current = KEYWORD_CLUSTERS[selectedCluster];

  return (
    <section id="keywords" className="scroll-mt-20 border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            Legal keywords and semantics
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Law Firm SEO Keywords for Cleveland: The Legal Topics Google Expects
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Google's Helpful Content System and AI search tools judge a Cleveland landing page by whether it accurately covers the statutory concepts Ohio residents search, reinforced by local modifiers like Cuyahoga County and suburban courts.
          </p>
        </div>

        {/* Cluster tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {KEYWORD_CLUSTERS.map((cl, idx) => {
            const isSelected = selectedCluster === idx;
            return (
              <button
                key={cl.name}
                onClick={() => setSelectedCluster(idx)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                }`}
              >
                {cl.name}
              </button>
            );
          })}
        </div>

        {/* 3-Column Semantic Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Core Legal Topics */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-2">
              Ohio Statutory Topics
            </span>
            <h4 className="text-base font-bold text-[#0a0f2e] mb-3">
              Core Legal Topics Google Expects
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-mono text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              {current.coreTopics}
            </p>
          </div>

          {/* Card 2: Local Long-Tail We Target */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a7d59] block mb-1">
              Local High-Intent Modifiers
            </span>
            <h4 className="text-base font-bold text-[#0a0f2e] mb-2">
              Local Long-Tail Phrases We Target
            </h4>
            <div className="space-y-2">
              {current.longTail.map((phrase, i) => (
                <div key={i} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {phrase}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Intent and Linked Silo */}
          <div className="rounded-3xl border-2 border-[#534AB7] bg-gradient-to-br from-[#EEEDFE]/80 to-white p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-2">
                User Intent & Silo Linking
              </span>
              <h4 className="text-base font-bold text-[#0a0f2e] mb-2">
                Conversion Intent Profile
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {current.intent}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#534AB7]/20">
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#534AB7] hover:underline"
              >
                <span>{current.linkLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Cross-linking navigation strip */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
          <span className="font-bold text-slate-900">Explore more locations:</span>
          <Link href="/locations" className="text-[#534AB7] font-semibold hover:underline">
            All State & City Landing Pages
          </Link>
          <span>·</span>
          <Link href="/locations/michigan/detroit" className="text-[#534AB7] font-semibold hover:underline">
            Law Firm SEO Detroit
          </Link>
          <span>·</span>
          <Link href="/locations/michigan/grand-rapids" className="text-[#534AB7] font-semibold hover:underline">
            Law Firm SEO Grand Rapids
          </Link>
          <span>·</span>
          <Link href="/resources/law-firm-seo-audit-checklist" className="text-[#534AB7] font-semibold hover:underline">
            Law Firm SEO Checklist
          </Link>
          <span>·</span>
          <Link href="/resources/news/local-seo-updates" className="text-[#534AB7] font-semibold hover:underline">
            Local SEO Algorithm News
          </Link>
        </div>

      </div>
    </section>
  );
}
