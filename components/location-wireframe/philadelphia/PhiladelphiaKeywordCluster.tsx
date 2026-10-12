"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, ArrowRight, Compass, ShieldCheck } from "lucide-react";

const KEYWORD_CLUSTERS = [
  {
    name: "Personal Injury & Torts",
    coreTopics: "Limited tort vs full tort · 42 Pa.C.S. § 7102 modified comparative negligence · two-year statute of limitations (42 Pa.C.S. § 5524) · uninsured/underinsured motorist (UM/UIM) · Philadelphia Court of Common Pleas · Complex Litigation Center",
    longTail: ['"car accident lawyer South Philadelphia"', '"limited tort attorney Philadelphia"', '"truck accident lawyer Northeast Philly"'],
    intent: "Urgent, high-intent searches from mobile users seeking immediate consultation following collisions on I-95, I-76, or Roosevelt Boulevard.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal Injury SEO Architecture",
  },
  {
    name: "DUI & Criminal Defense",
    coreTopics: "Pennsylvania R.C. 3802 DUI · Accelerated Rehabilitative Disposition (ARD) · Administrative license suspension · record expungement under Act 5 / Clean Slate · Philadelphia Municipal Court arraignments",
    longTail: ['"DUI lawyer Center City"', '"expungement attorney Philadelphia"', '"criminal defense lawyer Northeast Philadelphia"'],
    intent: "Fear-driven, high-urgency searches occurring within 24–48 hours of an arrest or arraignment requiring immediate telephone routing.",
    href: "/services/law-firm-seo/criminal-defense",
    linkLabel: "Criminal Defense & DUI SEO",
  },
  {
    name: "Family Law & Domestic Relations",
    coreTopics: "Equitable distribution of marital property · alimony and APL (alimony pendente lite) · legal and physical child custody · Pennsylvania child support guidelines · Philadelphia Family Court (1501 Arch St)",
    longTail: ['"custody lawyer Philadelphia"', '"divorce attorney Fishtown"', '"high net worth divorce Center City"'],
    intent: "Informational research converting to high-value retainers once a partner-track firm provides transparent legal expectations.",
    href: "/services/law-firm-seo/family-law",
    linkLabel: "Family Law SEO Architecture",
  },
];

export default function PhiladelphiaKeywordCluster() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = KEYWORD_CLUSTERS[selectedIdx];

  return (
    <section id="keywords" className="scroll-mt-20 border-b border-slate-200 bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <KeyRound className="h-4 w-4" />
            <span>Semantic Entities & Topical Authority</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Philadelphia Legal Keyword Clusters: Statutory Entities Google AI Rewards
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Google's Helpful Content System and generative AI models evaluate a Philadelphia law page based on whether it covers statutory concepts in true Pennsylvania terminology, reinforced by local modifiers like the Court of Common Pleas and specific neighborhoods:
          </p>
        </div>

        {/* Cluster Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5 mb-8">
          {KEYWORD_CLUSTERS.map((cl, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={cl.name}
                onClick={() => setSelectedIdx(idx)}
                className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-md shadow-sm scale-102"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                }`}
              >
                {cl.name}
              </button>
            );
          })}
        </div>

        {/* 3-Column Semantic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Core Topics */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                Pennsylvania Statutory Topics
              </span>
              <h4 className="text-lg font-extrabold text-neutral-950 mb-2">
                Core Entities Google Expects
              </h4>
              <p className="text-xs font-mono text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 leading-relaxed">
                {current.coreTopics}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
              Statutory Semantic Grounding
            </div>
          </div>

          {/* Card 2: Local Long-Tail */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                Local High-Intent Modifiers
              </span>
              <h4 className="text-lg font-extrabold text-neutral-950 mb-2">
                Neighborhood Queries We Target
              </h4>
              <div className="space-y-2">
                {current.longTail.map((phrase, i) => (
                  <div key={i} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-neutral-800">
              High Consultation Density
            </div>
          </div>

          {/* Card 3: Intent & Linked Silo */}
          <div className="rounded-3xl border-2 border-neutral-900 bg-gradient-to-br from-slate-50 via-white to-white p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                User Search Intent
              </span>
              <h4 className="text-lg font-extrabold text-neutral-950 mb-2">
                Conversion Intent Profile
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {current.intent}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-300">
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 hover:underline"
              >
                <span>{current.linkLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
