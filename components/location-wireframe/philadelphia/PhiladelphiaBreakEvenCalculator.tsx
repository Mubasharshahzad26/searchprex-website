"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, DollarSign, CheckCircle2 } from "lucide-react";

const AVERAGE_FEES = [
  { label: "$3,000 / case", value: 3000, sub: "Typical workers' comp / simple injury" },
  { label: "$7,500 / case", value: 7500, sub: "Standard motor vehicle collision" },
  { label: "$15,000 / case", value: 15000, sub: "Serious injury, trucking or commercial" },
];

const MONTHLY_RETAINERS = [
  { label: "$1,200 / mo", value: 1200, sub: "Solo practice local starter" },
  { label: "$1,800 / mo", value: 1800, sub: "Multi-neighborhood growth tier" },
  { label: "$2,500 / mo", value: 2500, sub: "Firm-wide multi-practice dominance" },
];

export default function PhiladelphiaBreakEvenCalculator() {
  const [selectedFeeIdx, setSelectedFeeIdx] = useState(1); // default $7,500
  const [selectedRetainerIdx, setSelectedRetainerIdx] = useState(1); // default $1,800

  const fee = AVERAGE_FEES[selectedFeeIdx].value;
  const monthly = MONTHLY_RETAINERS[selectedRetainerIdx].value;

  const annual = monthly * 12;
  const breakEvenCases = annual / fee;
  const casesPerMonth = breakEvenCases / 12;

  return (
    <section id="cost-ledger" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Calculator className="h-4 w-4" />
            <span>Financial Modeling & ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Philadelphia Law Practice Break-Even: How Many Cases Pay for a Year of SEO?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Select your numbers below. This is straightforward business arithmetic, not an inflated sales pitch. See exactly how few signed retainers are required to make your digital asset break even.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 rounded-3xl border-2 border-slate-200 bg-slate-50/80 p-6 sm:p-8 space-y-6">
            {/* Fee selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Average Value / Fee Per Signed Case
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {AVERAGE_FEES.map((item, idx) => {
                  const isSelected = selectedFeeIdx === idx;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedFeeIdx(idx)}
                      className={`rounded-2xl p-3.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-md shadow-sm scale-102"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span className="font-extrabold text-sm sm:text-base block">{item.label}</span>
                      <span className={`text-[11px] block mt-0.5 ${isSelected ? "text-slate-100" : "text-slate-500"}`}>
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monthly Retainer Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Monthly SEO Investment
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {MONTHLY_RETAINERS.map((item, idx) => {
                  const isSelected = selectedRetainerIdx === idx;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedRetainerIdx(idx)}
                      className={`rounded-2xl p-3.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-md shadow-slate-900/20 scale-102"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span className="font-extrabold text-sm sm:text-base block">{item.label}</span>
                      <span className={`text-[11px] block mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-slate-400">
              * Flat month-to-month retainers. Ranges are illustrative planning inputs. Exact scope is confirmed following our free 24-hour reality check.
            </p>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-6 rounded-3xl border-2 border-neutral-900 bg-gradient-to-br from-slate-50/40 via-white to-white p-7 sm:p-9 shadow-xl shadow-slate-100/50 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Total Annual Campaign Investment
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-mono">
                  ${annual.toLocaleString()}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-100 p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                  Signed Cases Needed to Break Even Over 12 Months
                </span>
                <div className="text-5xl sm:text-6xl font-black text-neutral-900 font-mono leading-none">
                  {breakEvenCases.toFixed(1)} <span className="text-xl font-bold text-slate-700">cases</span>
                </div>
                <p className="text-sm text-slate-700 pt-1 font-medium">
                  That is just <strong className="text-neutral-950">{casesPerMonth.toFixed(1)} cases per month</strong>. Every signed case beyond that represents 100% net profit margin and compounding firm equity.
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0" />
                  <span>No PPC auction spikes or paying per click when users research competitors.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0" />
                  <span>Permanent asset ownership: code, content, citations, and call logs belong to you.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Month-to-month · Cancel anytime
              </span>
              <a
                href="#reality-check"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
              >
                <span>Request Reality Check</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
