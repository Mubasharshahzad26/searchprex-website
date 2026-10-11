"use client";

import React, { useState } from "react";
import { DollarSign, Calendar, TrendingDown, ArrowRight } from "lucide-react";

const PPC_BUDGETS = [3000, 6000, 10000];
const SEO_BUDGETS = [1500, 3000, 5000];
const MONTHS_OPTIONS = [12, 24, 36];

export default function ClevelandCostLedger() {
  const [ppcBudget, setPpcBudget] = useState(6000);
  const [seoBudget, setSeoBudget] = useState(3000);
  const [months, setMonths] = useState(12);

  const ppcTotal = ppcBudget * months;
  const seoTotal = seoBudget * months;
  const maxTotal = Math.max(ppcTotal, seoTotal);

  const ppcPercent = Math.round((ppcTotal / maxTotal) * 100);
  const seoPercent = Math.round((seoTotal / maxTotal) * 100);

  const diff = ppcTotal - seoTotal;

  const formatCurrency = (val: number) => {
    return "$" + val.toLocaleString("en-US");
  };

  return (
    <section id="cost-ledger" className="scroll-mt-20 border-b border-slate-800 bg-[#0a0f2e] py-16 lg:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            04 · The cost ledger
          </span>
          <h2 className="!text-white mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            What you pay over time: PPC vs SEO
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Pick your current monthly budgets and comparison timeline. This compares cumulative capital spend and asset retention across your investment horizon.
          </p>
        </div>

        {/* 2-Column interactive grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 sm:p-7 space-y-6">
            
            {/* Monthly PPC Budget */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Monthly PPC Ad Spend (Google Ads)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PPC_BUDGETS.map((amt) => {
                  const isSelected = ppcBudget === amt;
                  return (
                    <button
                      key={amt}
                      onClick={() => setPpcBudget(amt)}
                      className={`rounded-xl py-3 px-2 text-xs sm:text-sm font-extrabold transition-all text-center ${
                        isSelected
                          ? "bg-amber-400 text-[#0a0f2e] shadow-lg shadow-amber-400/20"
                          : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-750"
                      }`}
                    >
                      {formatCurrency(amt)}/mo
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monthly SEO Budget */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Monthly SearchPrex SEO Budget
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SEO_BUDGETS.map((amt) => {
                  const isSelected = seoBudget === amt;
                  return (
                    <button
                      key={amt}
                      onClick={() => setSeoBudget(amt)}
                      className={`rounded-xl py-3 px-2 text-xs sm:text-sm font-extrabold transition-all text-center ${
                        isSelected
                          ? "bg-[#534AB7] text-white shadow-lg shadow-[#534AB7]/30 ring-2 ring-indigo-400"
                          : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-750"
                      }`}
                    >
                      {formatCurrency(amt)}/mo
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Timeline Period
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MONTHS_OPTIONS.map((m) => {
                  const isSelected = months === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`rounded-xl py-2.5 px-2 text-xs sm:text-sm font-bold transition-all text-center ${
                        isSelected
                          ? "bg-white text-[#0a0f2e] font-extrabold"
                          : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {m} Months
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              * Based on average Cuyahoga County personal injury & litigation CPC estimates ($180–$350/click).
            </div>
          </div>

          {/* Right Column: Dynamic Visualizer */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-700 bg-slate-900/90 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Total Spend Over {months} Months
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                Ledger Analysis
              </span>
            </div>

            {/* PPC Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-300">Google Ads (PPC Cumulative):</span>
                <span className="font-mono text-base font-extrabold text-amber-400">
                  {formatCurrency(ppcTotal)}
                </span>
              </div>
              <div className="h-6 w-full rounded-xl bg-slate-800 overflow-hidden p-1">
                <div
                  className="h-full rounded-lg bg-amber-400 transition-all duration-500"
                  style={{ width: `${ppcPercent}%` }}
                />
              </div>
            </div>

            {/* SEO Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-300">SearchPrex SEO (Asset Cumulative):</span>
                <span className="font-mono text-base font-extrabold text-indigo-400">
                  {formatCurrency(seoTotal)}
                </span>
              </div>
              <div className="h-6 w-full rounded-xl bg-slate-800 overflow-hidden p-1">
                <div
                  className="h-full rounded-lg bg-[#534AB7] transition-all duration-500"
                  style={{ width: `${seoPercent}%` }}
                />
              </div>
            </div>

            {/* Difference Callout */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
              <p className="text-sm font-semibold text-slate-200">
                {diff > 0 ? (
                  <span className="text-emerald-400">
                    At these chosen budgets, SEO spend is {formatCurrency(diff)} lower over {months} months — while building equity you retain permanently.
                  </span>
                ) : diff < 0 ? (
                  <span>
                    At these budgets, SEO costs {formatCurrency(-diff)} more. It pays off when compounding organic cases exceed initial ad returns.
                  </span>
                ) : (
                  <span>
                    Equal dollar spend. The decisive question is which channel continues generating signed cases after you stop paying.
                  </span>
                )}
              </p>
            </div>

            {/* Comparative After-Effect Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1">
                <span className="text-xs uppercase font-bold text-amber-400 block">After PPC budget stops:</span>
                <p className="text-sm font-bold text-white">Inbound leads halt immediately.</p>
                <p className="text-xs text-slate-300">Zero residual presence in Google Search or Maps.</p>
              </div>

              <div className="rounded-2xl border border-[#534AB7]/50 bg-[#534AB7]/20 p-4 space-y-1">
                <span className="text-xs uppercase font-bold text-indigo-300 block">After SEO engagement stops:</span>
                <p className="text-sm font-bold text-white">Pages, Map Pack & citations stay.</p>
                <p className="text-xs text-slate-300">Established organic domain authority continues working.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
