'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WoodlandsPainBannerProps {
  variant?: 'confused' | 'burnt' | 'both';
}

export default function WoodlandsPainBanner({ variant = 'both' }: WoodlandsPainBannerProps) {
  return (
    <div className="space-y-6 my-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner 1: Confused between choosing an SEO agency */}
      {(variant === 'confused' || variant === 'both') && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/10 via-[#EEEDFE]/40 to-indigo-50 border border-indigo-200/80 p-6 sm:p-8 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#534AB7] text-white shrink-0 shadow-md shadow-indigo-900/20">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-[#3C3489]">
                  Woodlands Legal Positioning Guide
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Confused between choosing an SEO agency in The Woodlands? We help you.
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  Most agencies pitch generic Houston campaigns that don't know The Woodlands isn't an incorporated city. They lump Conroe courts with downtown Harris County, ignore village-level search intent (Alden Bridge, Sterling Ridge, Creekside), and burn your budget on broad clicks that never turn into retained executive clients.
                </p>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs sm:text-sm text-slate-700 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Montgomery vs Harris County venue silo clarity
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Village landing hubs for high-net-worth residents
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    100% confidential law firm exclusivity
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-indigo-100">
              <a
                href="#diagnosis-tool"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#534AB7] hover:bg-[#3C3489] transition-all shadow-md shadow-indigo-900/20 whitespace-nowrap"
              >
                Run Free Diagnostic
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-500 font-medium">Zero-obligation review</span>
            </div>
          </div>
        </div>
      )}

      {/* Banner 2: Burnt by previous agencies */}
      {(variant === 'burnt' || variant === 'both') && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-[#10194a] to-slate-900 border border-indigo-900/50 p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-800 text-indigo-300 border border-indigo-700/50 shrink-0">
                <AlertTriangle className="w-6 h-6 text-indigo-300" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Performance Guarantee & Retainer Focus
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Burnt by previous agencies with zero results? We deliver signed retainers.
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  You paid $3,000–$6,000/month for pretty keyword charts, vanity impressions, and empty traffic reports—while your competitors won the Map Pack and signed the six-figure estate and divorce cases. We measure success strictly in qualified phone calls, consultation bookings, and signed retainers backed by a 90-day milestone guarantee.
                </p>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs sm:text-sm text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    Month-to-month contracts (no lock-ins)
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    Whisper call tracking & lead attribution
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    Mubashar Sharif direct strategy oversight
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-md shadow-emerald-950/40 whitespace-nowrap"
              >
                See Retainer Guarantee
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 font-medium">90-Day Milestone Check</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
