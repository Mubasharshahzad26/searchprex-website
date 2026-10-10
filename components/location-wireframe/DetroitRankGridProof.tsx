"use client";

// components/location-wireframe/DetroitRankGridProof.tsx
//
// Matches user's exact final layout:
// - H2: Results we already Produced across Detroit & Michigan
// - Interactive 7x7 Local Rank Grid heatmap (Before vs After 6 months)
// - H3: Download Free Local MAP Pack Checklist (Interactive CTA & resource)
// - Verified metrics: Calls, Directions, Signed Cases, CPL

import React, { useState } from "react";
import { PhoneCall, Navigation, Star, FileCheck, CheckCircle2, Download, ArrowRight, ShieldCheck } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitRankGridProof({ page }: { page: CityPage }) {
  const [viewState, setViewState] = useState<"before" | "after">("after");

  // 7x7 Grid data
  const beforeGrid = [
    [16, 18, 20, 17, 19, 16, 18],
    [20, 13, 15, 12, 14, 16, 17],
    [19, 12, 10, 12, 9, 15, 16],
    [18, 16, 9, 7, 8, 14, 20],
    [17, 15, 8, 10, 12, 13, 19],
    [16, 14, 16, 13, 15, 12, 18],
    [20, 17, 19, 16, 18, 20, 17],
  ];

  const afterGrid = [
    [2, 3, 2, 1, 2, 3, 2],
    [2, 1, 1, 1, 2, 2, 3],
    [1, 1, 1, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 2, 3],
    [3, 2, 1, 2, 2, 3, 4],
    [3, 3, 2, 2, 3, 4, 4],
  ];

  const currentGrid = viewState === "before" ? beforeGrid : afterGrid;

  function getBadgeColor(val: number) {
    if (val <= 3) return "bg-emerald-500 text-white font-bold";
    if (val <= 10) return "bg-amber-400 text-slate-900 font-bold";
    return "bg-rose-100 text-rose-800 font-semibold";
  }

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ── Section Header (Section 6) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
              VERIFIED RANKINGS &amp; REVENUE TELEMETRY
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
              Local SEO Results: Map Pack Rankings, Calls and Signed Cases
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Real numbers from real campaigns, labeled by client type and date range, measuring local 3-pack dominance across Wayne County and Michigan courts.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#EEEDFE] px-4 py-2 rounded-xl border border-[#534AB7]/20 shrink-0">
            <ShieldCheck className="h-4 w-4 text-[#534AB7]" />
            <span className="text-xs font-bold text-[#534AB7]">Live Local Falcon Verification</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 7x7 Heatmap Grid */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Detroit Map Pack Results: 7x7 Local Rank Grid for &ldquo;Personal Injury Lawyer&rdquo;
              </h3>

              {/* Before / After toggle */}
              <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewState("before")}
                  className={`rounded-md px-3 py-1 transition-all cursor-pointer ${
                    viewState === "before"
                      ? "bg-white text-slate-900 shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Month 1 (Before)
                </button>
                <button
                  type="button"
                  onClick={() => setViewState("after")}
                  className={`rounded-md px-3 py-1 transition-all cursor-pointer ${
                    viewState === "after"
                      ? "bg-[#534AB7] text-white shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Month 6 (SearchPrex)
                </button>
              </div>
            </div>

            {/* Grid Matrix */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 max-w-md mx-auto aspect-square">
              {currentGrid.flat().map((val, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center rounded-lg text-xs sm:text-sm transition-all duration-300 shadow-2xs ${getBadgeColor(
                    val
                  )}`}
                >
                  {val}
                </div>
              ))}
            </div>

            {/* Legend & Caption */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" /> Top 3 (Map Pack)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-amber-400" /> Rank 4–10
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-200" /> Rank 11+
                </span>
              </div>
              <p className="text-[10px] text-center font-mono text-slate-400">
                Personal Injury Law Practice, &ldquo;personal injury lawyer detroit&rdquo;, Month 1 vs Month 6, source: Local Falcon.
              </p>
            </div>
          </div>

          {/* Right Column: Key Outcomes & Download Free Checklist CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-black text-[#0a0f2e] block">+227%</span>
                <span className="text-xs font-bold text-slate-700 mt-1 block">Phone calls from Google Business Profile</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">CallRail verified high-intent calls</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-black text-[#3eb489] block">#1 Rank</span>
                <span className="text-xs font-bold text-slate-700 mt-1 block">Wayne County Map Pack position</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Across 18 high-intent zip codes</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-black text-[#534AB7] block">14 to 38</span>
                <span className="text-xs font-bold text-slate-700 mt-1 block">Signed retainers per month</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Intake acceleration across Wayne Co.</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-black text-[#0a0f2e] block">-58%</span>
                <span className="text-xs font-bold text-slate-700 mt-1 block">Cost per signed case versus paid ads</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Vs Google Ads pay-per-click spend</span>
              </div>
            </div>

            {/* ── Section 7: Free Law Firm Local SEO Checklist ── */}
            <div className="rounded-2xl border-2 border-[#534AB7] bg-[#EEEDFE]/40 p-6 space-y-3 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#534AB7] block">
                COMPLIMENTARY LAW FIRM RESOURCE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a0f2e]">
                Free Law Firm Local SEO Checklist: 10 Points to Diagnose Your Map Pack Ranking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use the same diagnostic we run on Michigan law firm profiles: category errors, citation mismatches, suspension risks and review velocity. Download it free, no email required.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#free-checklist"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download the Free 10-Point Checklist</span>
                </a>
                <span className="text-xs text-slate-500">Instant PDF download · Zero opt-in required</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
