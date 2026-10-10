"use client";

// components/location-wireframe/DetroitProblemFix.tsx
//
// Matches user request:
// - Removed tick (✓) and cross (✗) icons from both headers
// - Bullet points in plain solid black colour in both boxes
// - Two clean, modern comparison cards: What's going wrong vs What we build instead

import React from "react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitProblemFix({ page }: { page: CityPage }) {
  const problems = [
    `Generic "${page.state} attorney" pages that match no real search intent`,
    "Google Business Profile ignored, so the Map Pack goes to rivals",
    "Thin practice pages with no proof, no E-E-A-T for a high-stakes legal niche",
    "Traffic with no tracking, so nobody knows which keyword actually brings cases",
  ];

  const fixes = [
    `One page per practice area × ${page.city}-area search intent`,
    "Optimized GBP, local court citations and active review engine",
    "Attorney-authored content with bar credentials, case results and schema",
    "Call and form tracking tied to keywords, reported monthly with signed case metrics",
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
            THE PROBLEM → THE FIX
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
            Why Most Detroit Law Firm Websites Don&apos;t Get the Call (and How We Fix It)
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: What's going wrong (No cross icon, plain black bullets) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
            <div>
              <div className="pb-4 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  INEFFECTIVE FOUNDATION
                </span>
                <h3 className="text-xl font-black text-black">
                  What&apos;s going wrong
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {problems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-black shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: What we build instead (No checkmark icon, plain black bullets) */}
          <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div>
              <div className="pb-4 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#534AB7] block mb-1">
                  SEARCHPREX STANDARDS
                </span>
                <h3 className="text-xl font-black text-black">
                  What we build instead
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {fixes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-900 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-black shrink-0 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
