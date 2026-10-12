"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, DollarSign, TrendingDown, Sparkles } from "lucide-react";

export default function GrandRapidsRoiCalculator() {
  const [adSpend, setAdSpend] = useState<number>(6000);
  const [adCases, setAdCases] = useState<number>(2);
  const [seoBudget, setSeoBudget] = useState<number>(3000);

  // Calculations
  const ppcCostPerCase = adCases > 0 ? Math.round(adSpend / adCases) : 0;
  const organicCasesNeeded = ppcCostPerCase > 0 ? (seoBudget / ppcCostPerCase).toFixed(1) : "0.0";
  const monthlySavingsAt2OrganicCases = Math.max(0, ppcCostPerCase * 2 - seoBudget);

  return (
    <section id="roi-calculator" className="bg-white py-16 sm:py-24 border-b border-slate-200 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            THE MATH NOBODY SHOWS YOU
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mt-4 tracking-tight">
            Your True PPC Cost Per Signed Case
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Pick your numbers. We do the arithmetic. These are your assumptions, not promises.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: INTERACTIVE CONTROLS */}
          <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-8">
            
            {/* Input 1: Monthly Ad Spend */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-neutral-950">
                  1. Monthly Google Ads / PPC Spend
                </label>
                <span className="text-base font-extrabold text-neutral-800">
                  ${adSpend.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {[3000, 6000, 10000, 15000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAdSpend(val)}
                    className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      adSpend === val
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    ${val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Signed cases from ads per month */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-neutral-950">
                  2. Signed Cases From Ads Per Month
                </label>
                <span className="text-base font-extrabold text-neutral-800">
                  {adCases} {adCases === 1 ? "case" : "cases"}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {[1, 2, 4, 6].map((cases) => (
                  <button
                    key={cases}
                    type="button"
                    onClick={() => setAdCases(cases)}
                    className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      adCases === cases
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {cases} {cases === 1 ? "Case" : "Cases"}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Monthly SEO budget you'd consider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-neutral-950">
                  3. Monthly SEO Budget You&apos;d Consider
                </label>
                <span className="text-base font-extrabold text-neutral-800">
                  ${seoBudget.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[1500, 3000, 5000].map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setSeoBudget(budget)}
                    className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      seoBudget === budget
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    ${budget.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 italic pt-2 border-t border-slate-200">
              Note: Law firms in Grand Rapids typically see click costs of $80–$250 in personal injury and $35–$95 in family and criminal law. Real intake numbers vary by practice.
            </p>

          </div>

          {/* RIGHT: LIVE CALCULATION METRICS */}
          <div className="lg:col-span-5 bg-neutral-900 rounded-2xl p-7 sm:p-8 text-white shadow-xl">
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <Calculator className="w-4 h-4" />
              Your Intake Arithmetic
            </div>

            {/* Metric 1: PPC Cost Per Signed Case */}
            <div className="mt-6 pb-6 border-b border-white/10">
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                Your PPC cost per signed case
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight">
                ${ppcCostPerCase.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                (${adSpend.toLocaleString()} ad spend ÷ {adCases} signed {adCases === 1 ? "case" : "cases"})
              </p>
            </div>

            {/* Metric 2: Organic Cases Needed */}
            <div className="mt-6 pb-6 border-b border-white/10">
              <div className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                Organic signed cases per month needed to match that cost
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight flex items-baseline gap-2">
                {organicCasesNeeded}
                <span className="text-lg font-normal text-slate-300">cases/mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                At your ${seoBudget.toLocaleString()} SEO budget, signing just {organicCasesNeeded} case covers the investment.
              </p>
            </div>

            {/* Bottom Explanatory Callout */}
            <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Compounding Advantage:</span> After matching that threshold, each extra organic case lowers your blended cost per signed case. We never ask you to cut ads before organic proves itself.
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-2">
              <a
                href="#ppc-audit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 !text-neutral-950 font-semibold text-sm shadow-md transition-all border border-white"
              >
                <span>Audit My Firm&apos;s Kent County PPC Spend</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
