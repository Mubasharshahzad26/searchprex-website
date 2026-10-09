"use client";

// components/location-wireframe/DetroitFreeToolsAndTemplates.tsx
//
// Matches user request:
// - Removed "Copy-ready templates and guides" section
// - Kept the 2 Interactive Tools:
//   1. Map Pack readiness checklist with live scoring
//   2. Case Value Calculator

import React, { useState } from "react";
import { CheckSquare, Square, Calculator, Download, CheckCircle2 } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitFreeToolsAndTemplates({ page }: { page: CityPage }) {
  // Checklist state
  const checklistItems = [
    "Google Business Profile claimed and verified",
    "Primary and secondary categories set correctly (e.g. Personal Injury Attorney)",
    "NAP identical across site and 40+ legal directories",
    "Dedicated standalone page for each practice area",
    `Detroit-area location page with verified local proof`,
    "Systematic review request process after every closed case",
    "Professional owner replies to every positive and negative Google review",
    "Click-to-call mobile buttons and dynamic call tracking on every page",
    "LegalService and LocalBusiness JSON-LD schema added",
    "Mobile pages load under 2.5 seconds and pass Core Web Vitals",
  ];

  const [checkedIndices, setCheckedIndices] = useState<number[]>([0, 1, 3]);

  const toggleItem = (idx: number) => {
    if (checkedIndices.includes(idx)) {
      setCheckedIndices(checkedIndices.filter((i) => i !== idx));
    } else {
      setCheckedIndices([...checkedIndices, idx]);
    }
  };

  const score = checkedIndices.length;

  // Calculator state
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(10);
  const [closeRate, setCloseRate] = useState<number>(0.2); // 20%
  const [feePerCase, setFeePerCase] = useState<number>(8000);

  const newCasesPerMonth = Math.round(leadsPerMonth * closeRate);
  const annualRevenue = newCasesPerMonth * feePerCase * 12;

  return (
    <section id="free-checklist" className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
            FREE RESOURCES
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
            Free tools every {page.city} law firm can use today
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            Use these even if you never hire us. Better-informed firms make better clients.
          </p>
        </div>

        {/* The 2 Side-by-Side Interactive Tools */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Tool 1: Map Pack Readiness Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h3 className="text-xl font-black text-[#0a0f2e]">
                Map Pack readiness checklist
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Tap each item you already have. Your score updates live.
              </p>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2">
              {checklistItems.map((item, idx) => {
                const isChecked = checkedIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-emerald-50/70 border-emerald-200 text-slate-900"
                        : "bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs sm:text-[13px] leading-snug">{item}</span>
                  </button>
                );
              })}
            </div>

            {/* Score Result */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-600 block">Your local audit score:</span>
                <span className="text-2xl font-black text-[#0a0f2e]">{score} / 10</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">
                {score <= 4
                  ? "Big gaps. Competitors taking your calls."
                  : score <= 7
                  ? "Moderate foundation. Room to dominate."
                  : "Excellent Map Pack readiness."}
              </span>
            </div>
          </div>

          {/* Tool 2: Case Value Calculator */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#0a0f2e]">
                Case value calculator
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                See what extra organic leads could be worth. Your assumptions, not a guarantee.
              </p>
            </div>

            <div className="space-y-5">
              {/* Row 1: Leads */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Extra qualified leads per month
                </span>
                <div className="flex gap-2">
                  {[5, 10, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setLeadsPerMonth(num)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        leadsPerMonth === num
                          ? "bg-[#0a0f2e] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Close Rate */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Lead to client close rate
                </span>
                <div className="flex gap-2">
                  {[
                    { label: "10%", val: 0.1 },
                    { label: "20%", val: 0.2 },
                    { label: "30%", val: 0.3 },
                  ].map((rate) => (
                    <button
                      key={rate.label}
                      type="button"
                      onClick={() => setCloseRate(rate.val)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        closeRate === rate.val
                          ? "bg-[#0a0f2e] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {rate.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Average Fee */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Average fee per case
                </span>
                <div className="flex gap-2">
                  {[
                    { label: "$3,000", val: 3000 },
                    { label: "$8,000", val: 8000 },
                    { label: "$15,000", val: 15000 },
                  ].map((fee) => (
                    <button
                      key={fee.label}
                      type="button"
                      onClick={() => setFeePerCase(fee.val)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        feePerCase === fee.val
                          ? "bg-[#0a0f2e] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {fee.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Result Card */}
              <div className="rounded-2xl bg-[#0a0f2e] text-white p-5 text-center shadow-md border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">
                  Estimated new cases per month: <strong>{newCasesPerMonth}</strong>
                </span>
                <div className="mt-1 text-3xl sm:text-4xl font-black text-[#3eb489]">
                  ${annualRevenue.toLocaleString()} / year
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Compounding firm revenue at $0 cost-per-click.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
