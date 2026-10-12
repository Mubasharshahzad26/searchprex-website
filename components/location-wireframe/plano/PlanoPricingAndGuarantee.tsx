'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Clock, Lock } from 'lucide-react';

export default function PlanoPricingAndGuarantee() {
  return (
    <section id="pricing" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Risk · High Conviction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Free Reality Check & 7-Day Free Trial for Plano Firms
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We review where your PPC budget is leaking, which Collin County submarkets you are missing, and which competitors rank above you, then start your 7-day trial of the Complete Package.
          </p>
        </div>

        {/* 2-Column Pricing / Trial Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Trial Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#534AB7] p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#534AB7] text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Complete Package Trial
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#534AB7] flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0a0f2e]">7-Day Free Trial</h3>
                  <p className="text-xs text-slate-500 font-semibold">Test the system before spending a single dollar</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                Included in the 7-day trial with <strong>zero credit card required</strong> and <strong>no automatic renewal</strong>:
              </p>

              <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-slate-700 mb-8">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full site, GBP, citation & AI visibility audit</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Keyword and intent map for Plano & Collin County</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quick-win fixes deployed during the 7 days</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Call tracking, SMS text-back & intake setup</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Live client dashboard & reporting templates</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct strategy consultation with Mubashar Sharif</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                You keep the complete audit and roadmap either way.
              </span>
              <a
                href="#reality-check-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-sm shadow-md transition-all"
              >
                Start My 7-Day Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Retainer & Exclusivity Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0a0f2e] to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between border border-indigo-900">
            <div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/20 w-fit mb-4">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict Market Exclusivity</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">Month-to-Month Retainer</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                No 12-month lock-in contracts. We earn your business every 30 days based on verified intake calls and consultation bookings.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-white">Monthly Retainer Range</span>
                  <span className="font-extrabold text-indigo-300 text-sm">$1,200 – $2,500/mo</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-white">Exclusivity Rule</span>
                  <span className="font-extrabold text-emerald-400 text-xs">1 Firm Per Practice Area</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="font-semibold text-white">Asset Ownership</span>
                  <span className="font-extrabold text-white text-xs">100% Owned by Your Firm</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If your firm is accepted, we lock out all competing firms in your practice area across Plano and Collin County.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
