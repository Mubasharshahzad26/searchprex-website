"use client";

import React, { useState } from "react";
import { BarChart3, Calculator, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function AlbuquerqueBreakEvenCalculator() {
  const [viewMode, setViewMode] = useState<"ads" | "seo">("seo");
  const [retainerFee, setRetainerFee] = useState<number>(4500); // average case value
  const [monthlyRetainer, setMonthlyRetainer] = useState<number>(3500); // SEO monthly investment

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const adHeights = [62, 88, 38, 92, 30, 78, 96, 34, 82, 48, 90, 42];
  const seoHeights = [12, 18, 26, 35, 46, 58, 68, 76, 84, 89, 94, 98];

  const currentHeights = viewMode === "ads" ? adHeights : seoHeights;

  // Math calculations
  const casesNeededPerMonth = (monthlyRetainer / retainerFee).toFixed(1);
  const annualInvestment = monthlyRetainer * 12;
  const annualCasesToBreakEven = Math.ceil(annualInvestment / retainerFee);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Economic Predictability &amp; ROI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Feast or Famine vs. Steady Presence: What Peace of Mind Looks Like
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Solo and boutique law firms feel every slow month. Compare how inquiries fluctuate when they depend entirely on an ad auction budget versus when they are permanently built into your local digital authority.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 12-Month Interactive Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Inbound Lead Behavior Model:
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode("ads")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "ads"
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Depends on Ad Budget (PPC)
                </button>
                <button
                  onClick={() => setViewMode("seo")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "seo"
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Built into Your Presence (SEO)
                </button>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-64 flex items-end gap-2 sm:gap-4 border-b-2 border-slate-200 pt-6 px-2">
              {currentHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-semibold">
                    {h}%
                  </div>
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      viewMode === "ads"
                        ? "bg-slate-400 group-hover:bg-slate-600"
                        : "bg-neutral-900 group-hover:bg-neutral-800"
                    }`}
                  />
                  <span className="text-[11px] font-bold text-slate-500 mt-2">
                    {months[i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Explanatory Callout */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-start gap-3">
                {viewMode === "ads" ? (
                  <AlertCircle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-neutral-950 text-sm mb-1">
                    {viewMode === "ads"
                      ? "Ad Budget Volatility: The Endless Treadmill"
                      : "Compounding Authority: Compounded Equity"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {viewMode === "ads"
                      ? "Inquiries spike only while you pay $150–$350 per click for Albuquerque legal keywords. The moment your budget ends or Google raises bids, inquiries drop to zero immediately."
                      : "Organic and Google Map Pack authority takes 90–180 days to compound, but produces permanent equity. Every optimized practice page and citation remains active without cost-per-click charges."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Break-Even Arithmetic Calculator */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-neutral-900" />
              <h3 className="text-lg font-bold text-neutral-950">
                Albuquerque Retainer Break-Even Calculator
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Legal SEO is an investment with quantifiable math. Calculate how few signed cases are required to cover your entire annual engagement.
            </p>

            {/* Input 1: Average Case Fee */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Average Value Per Signed Case:</span>
                <span className="text-neutral-900 text-sm">${retainerFee.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1500"
                max="15000"
                step="500"
                value={retainerFee}
                onChange={(e) => setRetainerFee(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#171717]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$1,500 (Simple DWI)</span>
                <span>$15,000+ (Severe Injury)</span>
              </div>
            </div>

            {/* Input 2: Monthly Retainer */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Estimated Monthly SEO Retainer:</span>
                <span className="text-neutral-900 text-sm">${monthlyRetainer.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="8000"
                step="500"
                value={monthlyRetainer}
                onChange={(e) => setMonthlyRetainer(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#171717]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$2,000 / mo</span>
                <span>$8,000 / mo</span>
              </div>
            </div>

            {/* Results Box */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg border border-slate-100">
                  <div className="text-2xl font-extrabold text-neutral-900">
                    {casesNeededPerMonth}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 mt-0.5">
                    Cases / Month to Break Even
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-100">
                  <div className="text-2xl font-extrabold text-neutral-800">
                    {annualCasesToBreakEven}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 mt-0.5">
                    Cases / Year to Break Even
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center text-xs text-slate-500">
                Annual Investment: ${annualInvestment.toLocaleString()} · Case #{annualCasesToBreakEven + 1} represents 100% net profit.
              </div>
            </div>

            <a
              href="#reality-check"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-sm transition-all"
            >
              <span>Verify Availability in Your Practice Area</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
