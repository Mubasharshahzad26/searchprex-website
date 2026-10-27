"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle2, TrendingUp, BarChart4 } from "lucide-react";

const DURATIONS = [
  {
    name: "First 30 days",
    whatWeDo: "Technical indexing baseline, Whisper call tracking setup, Google Business Profile corrections, and Cuyahoga County competitor gap audit. Your paid ads continue running uninterrupted.",
    whatGoesInLedger: "Baseline inbound phone calls, initial local 3-pack geo-grid position, AI citation rate score, and baseline PPC cost per signed case.",
  },
  {
    name: "90 days",
    whatWeDo: "Priority Cleveland practice silos published, citations aligned across Ohio State Bar and local directories, and automated client review collection launched.",
    whatGoesInLedger: "First Map Pack upward movement, new practice page indexation, and early organic inquiries recorded in your live dashboard.",
  },
  {
    name: "6 months",
    whatWeDo: "Authority building: high-trust editorial mentions, suburb expansion silos (Lakewood, Parma, Beachwood), and Google AI Overview answer-first content integration.",
    whatGoesInLedger: "Signed retainers directly from organic search, measurable AI citation rate growth, and declining cost per case trend.",
  },
  {
    name: "12 months",
    whatWeDo: "Compounding phase: expand practice niches, mature suburban rankings, and strategically reduce PPC ad budget where organic search dominates.",
    whatGoesInLedger: "Full-year ledger analysis, verified return on investment, and blended cost per case reduction versus paid ads alone.",
  },
];

const METRIC_ROWS = [
  { metric: "Monthly inbound calls", d0: "6 calls", d90: "18 calls", d180: "42 calls", d365: "85+ calls" },
  { metric: "Local Map Pack position", d0: "Position #14", d90: "Position #5", d180: "Top 3-Pack", d365: "#1–#2 Across Metro" },
  { metric: "Signed cases from search", d0: "1 case", d90: "3 cases", d180: "8 cases", d365: "16+ cases/mo" },
  { metric: "AI Overview citation rate", d0: "10%", d90: "35%", d180: "65%", d365: "82%+" },
  { metric: "Cost per signed case", d0: "$3,500 (PPC)", d90: "$2,100", d180: "$1,150", d365: "$680 (Compounding)" },
];

export default function ClevelandDurationResults() {
  const [selectedDuration, setSelectedDuration] = useState(1); // default 90 days
  const current = DURATIONS[selectedDuration];

  return (
    <section className="border-b border-slate-200 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Campaign Progression & Milestones
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Cleveland SEO Performance Timeline
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select a milestone below to see the deliverables at each stage. The figures in the table are an illustrative example of what your report tracks, not results from a Cleveland client.
          </p>
        </div>

        {/* Duration tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {DURATIONS.map((d, idx) => {
            const isSelected = selectedDuration === idx;
            return (
              <button
                key={d.name}
                onClick={() => setSelectedDuration(idx)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-md shadow-sm scale-105"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 hover:scale-102"
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>

        {/* 2-Column deliverables card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sm hover:border-neutral-900/30 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-neutral-900">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-2 transition-transform group-hover:translate-x-1 duration-200">
              What SearchPrex Executes
            </span>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {current.whatWeDo}
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border-2 border-neutral-900/40 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sm hover:border-slate-300/50 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-neutral-900">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2 transition-transform group-hover:translate-x-1 duration-200">
              What Goes in Your Monthly Ledger
            </span>
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
              {current.whatGoesInLedger}
            </p>
          </div>
        </div>

        {/* Progression Table Container */}
        <div className="mt-10 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-sm hover:border-neutral-900/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-xs sm:text-sm font-bold text-slate-900">
                  <th className="py-4 px-6">Performance Metric</th>
                  <th className="py-4 px-6 text-slate-500 font-mono">Day 0 (Baseline)</th>
                  <th className="py-4 px-6 text-slate-700 font-mono">Day 90</th>
                  <th className="py-4 px-6 text-slate-800 font-mono">Day 180</th>
                  <th className="py-4 px-6 text-neutral-900 font-mono bg-slate-100/40">Day 365 (Compounding)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {METRIC_ROWS.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/40 transition-colors duration-200">
                    <td className="py-4 px-6 font-bold text-neutral-950">
                      {row.metric}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-500 group-hover:text-slate-700 transition-colors">
                      {row.d0}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700 group-hover:text-slate-900 transition-colors">
                      {row.d90}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-800 group-hover:text-neutral-900 transition-colors">
                      {row.d180}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-neutral-900 bg-slate-100/20 group-hover:bg-slate-100/50 transition-colors">
                      {row.d365}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>* Illustrative figures for a hypothetical firm, not client results. Your own numbers come from call tracking and your intake system.</span>
            <Link href="/case-studies" className="font-bold text-neutral-900 underline hover:text-neutral-950">
              Explore verified case study results →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
