"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

const MILESTONES = [
  {
    name: "First 30 Days",
    percent: "25%",
    whatWeDo: "Technical indexing baseline, Whisper call tracking installation, Google Business Profile corrections, and Philadelphia County competitor audit. Your paid ads continue running uninterrupted.",
    whatGoesInLedger: "Baseline inbound phone inquiries, initial local 3-pack geo-grid position across Center City and Northeast Philly, and baseline PPC cost per signed case.",
  },
  {
    name: "Day 90",
    percent: "50%",
    whatWeDo: "Priority Philadelphia practice silos published, citations aligned across Pennsylvania State Bar and local legal directories, and automated client review acquisition launched.",
    whatGoesInLedger: "First Map Pack upward trajectory, new statutory page indexation, and early organic inquiries recorded in your live dashboard.",
  },
  {
    name: "Day 180 (6 Months)",
    percent: "75%",
    whatWeDo: "Authority expansion: high-trust editorial mentions, suburban expansion silos (Upper Darby, King of Prussia, Bensalem), and Google AI Overview answer-first content integration.",
    whatGoesInLedger: "Signed retainers directly from organic search, measurable AI citation rate growth, and declining cost per case trend.",
  },
  {
    name: "Day 365 (12 Months)",
    percent: "100%",
    whatWeDo: "Compounding phase: expand practice niches, mature suburban rankings, and strategically reduce PPC ad budget where organic search dominates.",
    whatGoesInLedger: "Full-year ledger analysis, verified return on investment, and blended cost per case reduction versus paid ads alone.",
  },
];

const METRIC_ROWS = [
  { metric: "Monthly inbound calls", d0: "5 calls", d90: "16 calls", d180: "38 calls", d365: "80+ calls" },
  { metric: "Local Map Pack position", d0: "Position #15+", d90: "Position #4–#6", d180: "Top 3-Pack", d365: "#1–#2 Across Metro" },
  { metric: "Signed cases from search", d0: "1 case", d90: "3 cases", d180: "7 cases", d365: "15+ cases/mo" },
  { metric: "AI Overview citation rate", d0: "8%", d90: "30%", d180: "60%", d365: "80%+" },
  { metric: "Cost per signed case", d0: "$3,800 (PPC)", d90: "$2,200", d180: "$1,200", d365: "$690 (Compounding)" },
];

export default function PhiladelphiaTwelveMonthTimeline() {
  const [activeIdx, setActiveIdx] = useState(1); // default Day 90
  const current = MILESTONES[activeIdx];

  return (
    <section className="border-b border-slate-200 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Clock className="h-4 w-4" />
            <span>Campaign Progression & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Philadelphia SEO Performance Timeline: 30, 90, 180 & 365-Day Benchmarks
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Select a milestone below to inspect the concrete deliverables we deploy and what gets documented in your monthly performance ledger.
          </p>
        </div>

        {/* Progress Bar & Milestone Tabs */}
        <div className="mt-10">
          <div className="h-2 w-full bg-slate-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-2 bg-neutral-900 transition-all duration-300"
              style={{ width: current.percent }}
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {MILESTONES.map((m, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={m.name}
                  onClick={() => setActiveIdx(idx)}
                  className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white shadow-md shadow-sm scale-102"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {m.name} ({m.percent})
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Deliverables Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
              What SearchPrex Executes
            </span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {current.whatWeDo}
            </p>
          </div>

          <div className="rounded-3xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
              What Goes in Your Monthly Ledger
            </span>
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
              {current.whatGoesInLedger}
            </p>
          </div>
        </div>

        {/* Progression Table */}
        <div className="mt-10 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-xs sm:text-sm font-bold text-slate-900">
                  <th className="py-4 px-6">Performance Metric</th>
                  <th className="py-4 px-6 text-slate-500 font-mono">Day 0 (Baseline)</th>
                  <th className="py-4 px-6 text-slate-700 font-mono">Day 90</th>
                  <th className="py-4 px-6 text-slate-800 font-mono">Day 180</th>
                  <th className="py-4 px-6 text-neutral-900 font-mono bg-slate-100">Day 365 (Compounding)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {METRIC_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-neutral-950">
                      {row.metric}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-500">
                      {row.d0}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700">
                      {row.d90}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-800">
                      {row.d180}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-neutral-900 bg-slate-100">
                      {row.d365}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>* Benchmark averages derived from multi-location litigation campaigns. Performance tracked monthly.</span>
            <Link href="/case-studies" className="font-bold text-neutral-900 underline hover:text-neutral-950">
              Explore verified case study results →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
