"use client";

import React, { useState } from "react";
import { DollarSign, Calendar, TrendingDown, ArrowRight, Sparkles } from "lucide-react";

import Link from "next/link";

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
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#EEEDFE] border border-white/15 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
            <span>04 · The Cost Ledger</span>
          </div>
          <h2 className="!text-white mt-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Law Firm Budget Forecast: PPC vs. Compounding SEO
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Compare cumulative spend and long-term asset equity across 12, 24, and 36-month horizons. Learn why firms shift ad spend to{" "}
            <Link href="/services/law-firm-seo" className="font-semibold text-indigo-300 underline hover:text-white">
              high-retention law firm SEO
            </Link>
            .
          </p>
        </div>

        {/* 2-Column interactive grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-700 bg-slate-900/90 p-6 sm:p-7 space-y-6 shadow-xl shadow-black/30">
            
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
                      className={`rounded-xl py-3 px-2 text-xs sm:text-sm font-extrabold transition-all duration-200 text-center cursor-pointer ${
                        isSelected
                          ? "bg-slate-200 text-[#0a0f2e] shadow-lg scale-[1.02] ring-2 ring-white"
                          : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
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
                      className={`rounded-xl py-3 px-2 text-xs sm:text-sm font-extrabold transition-all duration-200 text-center cursor-pointer ${
                        isSelected
                          ? "bg-[#534AB7] text-white shadow-lg shadow-[#534AB7]/40 scale-[1.02] ring-2 ring-indigo-400"
                          : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
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
                      className={`rounded-xl py-2.5 px-2 text-xs sm:text-sm font-bold transition-all duration-200 text-center cursor-pointer ${
                        isSelected
                          ? "bg-white text-[#0a0f2e] font-extrabold shadow-md scale-[1.02]"
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

          {/* Right Column: Dynamic Visualizer with animated bars */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-700 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                Total Spend Over {months} Months
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300 border border-slate-700">
                Ledger Analysis
              </span>
            </div>

            {/* PPC Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-300">Google Ads (PPC Cumulative):</span>
                <span className="font-mono text-base font-extrabold text-slate-300">
                  {formatCurrency(ppcTotal)}
                </span>
              </div>
              <div className="h-6 w-full rounded-xl bg-slate-800 overflow-hidden p-1 border border-slate-700/60">
                <div
                  className="h-full rounded-lg bg-gradient-to-r from-slate-500 to-slate-400 transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${ppcPercent}%` }}
                />
              </div>
            </div>

            {/* SEO Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-300">SearchPrex SEO (Asset Cumulative):</span>
                <span className="font-mono text-base font-extrabold text-indigo-300">
                  {formatCurrency(seoTotal)}
                </span>
              </div>
              <div className="h-6 w-full rounded-xl bg-slate-800 overflow-hidden p-1 border border-slate-700/60">
                <div
                  className="h-full rounded-lg bg-gradient-to-r from-[#534AB7] to-indigo-400 transition-all duration-700 ease-out shadow-sm shadow-indigo-400/30"
                  style={{ width: `${seoPercent}%` }}
                />
              </div>
            </div>

            {/* Difference Callout */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 shadow-inner">
              <p className="text-sm font-semibold text-slate-200">
                {diff > 0 ? (
                  <span className="text-emerald-400">
                    At these chosen budgets, SEO spend is {formatCurrency(diff)} lower over {months} months — while constructing digital equity your firm retains permanently.
                  </span>
                ) : diff < 0 ? (
                  <span>
                    At these budgets, SEO costs {formatCurrency(-diff)} more initially. It compounds as permanent organic cases displace ongoing per-click auctions.
                  </span>
                ) : (
                  <span>
                    Equal dollar spend. The decisive factor is whether visibility stops or compounds when ongoing spend is reduced.
                  </span>
                )}
              </p>
            </div>

            {/* Comparative After-Effect Blocks with hover lift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4 space-y-1 hover:border-slate-500 hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs uppercase font-bold text-slate-400 block">When PPC spend ends:</span>
                <p className="text-sm font-bold text-white">Inbound leads halt immediately.</p>
                <p className="text-xs text-slate-400">Zero residual presence in Google Search or Google Maps.</p>
              </div>

              <div className="rounded-2xl border border-[#534AB7]/50 bg-[#534AB7]/20 p-4 space-y-1 hover:border-[#534AB7] hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs uppercase font-bold text-indigo-300 block">When SEO foundation matures:</span>
                <p className="text-sm font-bold text-white">Pages, 3-Pack & citations remain yours.</p>
                <p className="text-xs text-slate-300">Domain authority continues generating signed cases.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
