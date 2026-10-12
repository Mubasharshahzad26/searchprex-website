"use client";

import React from "react";
import Link from "next/link";
import { Building2, Home, CheckCircle2, XCircle, ArrowRight, Scale, ShieldAlert } from "lucide-react";

export default function PhiladelphiaOutspentVsOutranked() {
  return (
    <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Scale className="h-4 w-4" />
            <span>Competitive Market Dynamics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Philadelphia Legal Market: Outspent by National Filers, Never Outranked Locally
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Philadelphia's Complex Litigation Center in the Court of Common Pleas makes the city a national magnet for out-of-state mass tort practices with massive PPC budgets. What they cannot buy is your genuine local authority.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Out-of-State National Aggregator Card */}
          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50/80 p-7 sm:p-9 shadow-xs space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-2xl bg-slate-200 p-3 text-slate-600">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Competitor Archetype
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    National "Filing-Address" Firm
                  </h3>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Massive Google Ads & billboard overhead (\$20k–\$80k/mo)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Generic "Philadelphia Lawyer" landing pages with zero neighborhood granularity</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>No physical presence outside a virtual office or shared filing address</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Cannot credibly write about practicing in City Hall or suburban municipal courts</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
              Vulnerable to hyper-localized SEO and verified Pennsylvania community citations.
            </div>
          </div>

          {/* Local Philadelphia Law Firm Card (SearchPrex Advantage) */}
          <div className="relative rounded-3xl border-2 border-neutral-900 bg-gradient-to-b from-slate-50/40 via-white to-white p-7 sm:p-9 shadow-xl shadow-slate-100/50 space-y-6 flex flex-col justify-between">
            <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-neutral-800 to-neutral-800 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-xs">
              Home-Field Advantage
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-2xl bg-slate-100 p-3 text-neutral-900">
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                    Your True Advantage
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
                    You, an Established Philadelphia Firm
                  </h3>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span>Real physical office and verified local client reviews across Center City & suburbs</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span>Deep familiarity with Court of Common Pleas, Municipal Court & local judges</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span>Genuine community ties, Philadelphia Bar Association standing, and word of mouth</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span>The compounding organic authority SearchPrex transforms into signed retainer equity</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">
                Compounding Equity vs. Rented Ad Traffic
              </span>
              <Link
                href="/services/law-firm-seo"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
              >
                <span>Explore Law Firm SEO</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
