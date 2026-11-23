"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Key, ArrowRight, ShieldCheck, Scale, Compass } from "lucide-react";

const KEYWORD_CLUSTERS = [
  {
    name: "Personal injury & Accidents",
    badge: "$180 – $350+ PPC CPC · $15k–$100k+ Case Value",
    coreTopics: "Ohio R.C. 2305.10 statute of limitations · modified comparative fault (51% bar) · non-economic damages caps (R.C. 2315.18) · third-party commercial liability · Cuyahoga County Court of Common Pleas · I-90, I-480 & I-77 crash corridors",
    longTail: [
      '"car accident lawyer Cleveland OH"',
      '"truck accident attorney Cuyahoga County"',
      '"car accident lawyer Parma OH"',
      '"24 hour personal injury lawyer near me"'
    ],
    intent: "Urgent, mobile-first inquiries following vehicular collisions requiring immediate under-60-second intake before prospects call competing billboard firms.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal Injury SEO Architecture",
  },
  {
    name: "Medical malpractice",
    badge: "$180 – $300+ PPC CPC · $50k–$250k+ Case Value",
    coreTopics: "Ohio 180-day letter · Affidavit of Merit (Ohio Civ. R. 10(D)(2)) · 1-year statute of limitations (R.C. 2305.113) · Cleveland Clinic & University Hospitals (UH) jurisdiction · birth injury & surgical error expert testimony",
    longTail: [
      '"medical malpractice lawyer Cleveland"',
      '"birth injury attorney Cleveland Ohio"',
      '"hospital negligence lawyer Beachwood OH"',
      '"Cleveland Clinic malpractice attorney"'
    ],
    intent: "High-net-worth liability investigations requiring authoritative medical-legal E-E-A-T and deep institutional hospital jurisdiction silos.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Catastrophic & Malpractice SEO Architecture",
  },
  {
    name: "OVI & Criminal defense",
    badge: "$80 – $160 PPC CPC · $3,500–$15,000 Retainer",
    coreTopics: "Ohio R.C. 4511.19 OVI · Administrative License Suspension (ALS) · 30-day appeal window · breathalyzer & chemical test suppression · SB 288 record sealing · Cleveland Municipal Court & Cuyahoga Justice Center arraignments",
    longTail: [
      '"OVI lawyer Cleveland"',
      '"24 hour criminal defense lawyer Cleveland"',
      '"arrested for OVI in Cuyahoga County what to do"',
      '"OVI lawyer Lakewood Ohio"'
    ],
    intent: "Emergency after-hours queries occurring between 8 PM and 3 AM immediately following arrests, requiring 24/7 automated SMS triage.",
    href: "/services/law-firm-seo/criminal-defense",
    linkLabel: "Criminal Defense SEO Architecture",
  },
  {
    name: "Workers' compensation (BWC)",
    badge: "$70 – $140 PPC CPC · $5,000–$25,000 Value",
    coreTopics: "Ohio BWC · FROI-1 First Report of Injury · Industrial Commission district hearings (615 W. Superior Ave) · allowed medical conditions · Temporary Total Disability (TTD) · Permanent Partial (PPD) · VSSR claims · Cuyahoga Common Pleas appeals",
    longTail: [
      '"workers comp lawyer Cleveland"',
      '"Ohio BWC attorney Cleveland"',
      '"denied workers comp claim appeal lawyer Ohio"',
      '"Industrial Commission hearing lawyer Cleveland"'
    ],
    intent: "Procedure-heavy statutory searches where injured industrial workers seek concrete step-by-step administrative guidance rather than generic marketing promises.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Workers' Comp & BWC SEO Architecture",
  },
  {
    name: "Family law & High-asset divorce",
    badge: "$45 – $95 PPC CPC · $4,000–$20,000 Retainer",
    coreTopics: "Cuyahoga County Domestic Relations Court · high-net-worth asset division · Ohio R.C. 3119 child support calculations · shared parenting plans · separate vs marital property tracing · spousal support guidelines",
    longTail: [
      '"divorce lawyer Cleveland OH"',
      '"child custody attorney Cuyahoga County"',
      '"divorce attorney Westlake OH"',
      '"high net worth divorce lawyer Beachwood OH"'
    ],
    intent: "Emotional, discrete inquiries researching local judicial procedures, asset valuation, and affluent suburban legal representation.",
    href: "/services/law-firm-seo/family-law",
    linkLabel: "Family Law & Divorce SEO Architecture",
  },
];

export default function ClevelandKeywordCluster() {
  const [selectedCluster, setSelectedCluster] = useState(0);
  const current = KEYWORD_CLUSTERS[selectedCluster];

  return (
    <section id="keywords" className="scroll-mt-20 border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Semantic Authority & Statutory Entities
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Cleveland Legal Keyword Clusters
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
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-md shadow-sm scale-[1.02]"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 hover:scale-[1.01]"
                }`}
              >
                {cl.name}
              </button>
            );
          })}
        </div>

        {/* Active Practice Economics Badge */}
        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-bold text-emerald-800">
            <Scale className="h-3.5 w-3.5 text-emerald-700" />
            <span>Cleveland Legal Economics: {current.badge}</span>
          </span>
        </div>

        {/* 3-Column Semantic Grid with animated card hover */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Core Legal Topics */}
          <div className="group rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-sm hover:border-neutral-900/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2">
                Ohio Statutory Topics
              </span>
              <h4 className="text-base font-bold text-neutral-950 mb-3 group-hover:text-neutral-900 transition-colors">
                Core Legal Topics Google Expects
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-mono text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200 group-hover:bg-slate-50/20 transition-colors">
                {current.coreTopics}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-400">
              Statutory Semantic Coverage
            </div>
          </div>

          {/* Card 2: Local Long-Tail We Target */}
          <div className="group rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-sm hover:border-slate-300/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                Local High-Intent Modifiers
              </span>
              <h4 className="text-base font-bold text-neutral-950 mb-3 group-hover:text-neutral-800 transition-colors">
                Local Long-Tail Phrases We Target
              </h4>
              <div className="space-y-2">
                {current.longTail.map((phrase, i) => (
                  <div key={i} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 group-hover:bg-slate-50/20 transition-colors">
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-neutral-800">
              High Conversion Density
            </div>
          </div>

          {/* Card 3: Intent and Linked Silo */}
          <div className="group rounded-3xl border-2 border-neutral-900 bg-gradient-to-br from-slate-50 via-white to-white p-6 sm:p-7 shadow-md hover:shadow-2xl hover:shadow-sm hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2">
                User Intent & Silo Linking
              </span>
              <h4 className="text-base font-bold text-neutral-950 mb-2">
                Conversion Intent Profile
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {current.intent}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-900/20">
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 hover:underline"
              >
                <span>{current.linkLabel}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Cross-linking navigation strip */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
          <span className="font-bold text-slate-900">Explore more locations:</span>
          <Link href="/locations" className="text-neutral-900 font-semibold hover:underline">
            All State & City Landing Pages
          </Link>
          <span>·</span>
          <Link href="/locations/michigan/detroit" className="text-neutral-900 font-semibold hover:underline">
            Law Firm SEO Detroit
          </Link>
          <span>·</span>
          <Link href="/locations/michigan/grand-rapids" className="text-neutral-900 font-semibold hover:underline">
            Law Firm SEO Grand Rapids
          </Link>
          <span>·</span>
          <Link href="/resources/law-firm-seo-audit-checklist" className="text-neutral-900 font-semibold hover:underline">
            Law Firm SEO Checklist
          </Link>
          <span>·</span>
          <Link href="/resources/news/local-seo-updates" className="text-neutral-900 font-semibold hover:underline">
            Local SEO Algorithm News
          </Link>
        </div>

      </div>
    </section>
  );
}
