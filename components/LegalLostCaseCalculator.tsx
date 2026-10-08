"use client";

// components/LegalLostCaseCalculator.tsx
//
// Enterprise Interactive Lost Case & Revenue Opportunity Calculator.
// Quantifies the exact monthly and annual revenue a law firm loses to
// competitors by ranking outside the Google Map 3-Pack in their city.

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  TrendingDown,
  DollarSign,
  AlertOctagon,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  PhoneMissed,
  Briefcase,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface PracticePreset {
  name: string;
  defaultAvgCaseValue: number;
  monthlySearches: number;
}

const PRACTICE_PRESETS: Record<string, PracticePreset> = {
  pi: { name: "Personal Injury & Auto Accidents", defaultAvgCaseValue: 12500, monthlySearches: 1800 },
  criminal: { name: "Criminal Defense & DUI", defaultAvgCaseValue: 4500, monthlySearches: 1200 },
  family: { name: "Family Law & Divorce", defaultAvgCaseValue: 6500, monthlySearches: 1100 },
  litigation: { name: "Commercial & Business Litigation", defaultAvgCaseValue: 25000, monthlySearches: 650 },
  estate: { name: "Estate Planning & Probate", defaultAvgCaseValue: 4000, monthlySearches: 950 },
};

export default function LegalLostCaseCalculator({ page }: { page: CityPage }) {
  const [selectedPractice, setSelectedPractice] = useState<string>("pi");
  const [avgCaseValue, setAvgCaseValue] = useState<number>(12500);
  const [currentPosition, setCurrentPosition] = useState<"pos4_10" | "page2" | "unranked">("pos4_10");

  const preset = PRACTICE_PRESETS[selectedPractice] || PRACTICE_PRESETS.pi;

  // Position multiplier: how many calls/cases are missed by not being in Top 3
  const positionMultipliers = {
    pos4_10: { missedCallsRate: 0.015, missedCasesRate: 0.003, label: "Organic Pos 4–10 (Below Map Pack)" },
    page2: { missedCallsRate: 0.025, missedCasesRate: 0.005, label: "Page 2 or Lower" },
    unranked: { missedCallsRate: 0.035, missedCasesRate: 0.0075, label: "Unranked / Not Showing in Map Pack" },
  };

  const currentMultiplier = positionMultipliers[currentPosition];

  // Estimated monthly missed calls & signed cases
  const missedCalls = Math.max(8, Math.round(preset.monthlySearches * currentMultiplier.missedCallsRate));
  const missedCases = Math.max(2, Math.round(preset.monthlySearches * currentMultiplier.missedCasesRate));
  const monthlyLostRevenue = missedCases * avgCaseValue;
  const annualLostRevenue = monthlyLostRevenue * 12;

  const fmt = (n: number) => "$" + n.toLocaleString("en-US");

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Top Header */}
      <div className="border-b border-slate-200 bg-[#0a0f2e] px-6 py-6 text-white sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400 border border-red-500/30">
              <AlertOctagon className="h-3.5 w-3.5" />
              <span>Revenue Bleed Analysis · {page.city}, {page.stateAbbr}</span>
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {page.city} Lost Case & Revenue Opportunity Calculator
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Quantify the exact fee volume your firm forfeits every month by ranking below the Google Map 3-Pack in {page.county}.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-3 text-center border border-white/10 hidden sm:block">
            <span className="block text-[11px] text-slate-300">Target Opportunity</span>
            <span className="text-sm font-bold text-emerald-400">Position #1–#3 Recovery</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Controls Column (Left) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Practice Area Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                1. Select Legal Practice Area
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(PRACTICE_PRESETS).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedPractice(key);
                      setAvgCaseValue(val.defaultAvgCaseValue);
                    }}
                    className={`rounded-xl border p-3 text-left transition-all text-xs font-semibold ${
                      selectedPractice === key
                        ? "border-[#534AB7] bg-indigo-50/70 text-[#534AB7] shadow-xs ring-1 ring-[#534AB7]"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    {val.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Current SERP Visibility */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                2. Where Does Your Firm Rank Today in {page.city}?
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  { key: "pos4_10", label: "Positions 4–10", sub: "Below Map 3-Pack" },
                  { key: "page2", label: "Page 2 or 3", sub: "Virtually Invisible" },
                  { key: "unranked", label: "Unranked / New Site", sub: "0% Map Visibility" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCurrentPosition(item.key as any)}
                    className={`rounded-xl border p-3 text-left transition-all text-xs ${
                      currentPosition === item.key
                        ? "border-red-500 bg-red-50/70 text-red-900 shadow-xs ring-1 ring-red-500"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <span className="font-bold block">{item.label}</span>
                    <span className="text-[11px] text-slate-500">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Average Retainer Value Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Average Fee Value Per Signed Case
                </label>
                <span className="font-mono text-base font-extrabold text-[#0a0f2e]">
                  {fmt(avgCaseValue)}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={50000}
                step={500}
                value={avgCaseValue}
                onChange={(e) => setAvgCaseValue(Number(e.target.value))}
                className="w-full accent-[#534AB7] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$2,000 (Standard Retainer)</span>
                <span>$25,000</span>
                <span>$50,000+ (Catastrophic/Commercial)</span>
              </div>
            </div>
          </div>

          {/* Results Display Column (Right) */}
          <div className="rounded-3xl border border-red-200 bg-gradient-to-br from-red-50/60 via-white to-slate-50 p-6 sm:p-8 lg:col-span-5 shadow-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
              <TrendingDown className="h-3.5 w-3.5" />
              Annual Competitor Capture in {page.city}
            </span>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Estimated Annual Lost Revenue
              </span>
              <div className="mt-1 font-mono text-3xl sm:text-4xl font-black text-red-600 tracking-tight">
                {fmt(annualLostRevenue)}
              </div>
              <span className="text-xs text-slate-500 block mt-1">
                ({fmt(monthlyLostRevenue)} forfeited every 30 days)
              </span>
            </div>

            <div className="mt-6 space-y-3 pt-6 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <PhoneMissed className="h-4 w-4 text-red-500" />
                  Missed Qualified Inquiries:
                </span>
                <span className="font-bold text-[#0a0f2e]">~{missedCalls} calls / mo</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-red-500" />
                  Cases Signed by Competitors:
                </span>
                <span className="font-bold text-[#0a0f2e]">~{missedCases} retained clients / mo</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200/80">
              <Link
                href="/free-audit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0f2e] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#1a2366] transition-colors"
              >
                <span>Reclaim Your {page.city} Cases</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </Link>
              <span className="block text-center text-[11px] text-slate-500 mt-2">
                Founder teardown reveals exactly who is capturing these cases in {page.county}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
