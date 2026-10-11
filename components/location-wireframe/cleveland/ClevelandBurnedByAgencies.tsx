"use client";

import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  TrendingUp,
  PhoneCall,
  FileText,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
} from "lucide-react";

const COMPARISON_TRAPS = [
  {
    trap: "The 12-Month Lock-In Excuse",
    theyDo: "Locked your firm into an expensive 12 to 24-month contract, claimed 'SEO takes a year before anything happens,' and collected checks while doing minimal monthly work.",
    weDo: "Month-to-month partnership. We earn your business every 30 days with transparent milestones starting in your first 30 days.",
    icon: Lock,
  },
  {
    trap: "Vanity Traffic with Zero Phone Calls",
    theyDo: "Sent automated PDF charts boasting 'thousands of impressions' for national informational queries that never resulted in a single Cuyahoga County client consultation.",
    weDo: "Whisper call tracking on every line. Your intake coordinator hears 'SearchPrex Legal Inbound' before every call connects. We track signed cases, not empty clicks.",
    icon: PhoneCall,
  },
  {
    trap: "De-Indexed AI Fluff Content",
    theyDo: "Spammed your website with 50 generic AI articles that Google penalized or de-indexed, and which Google AI Overviews and ChatGPT refuse to cite as legal authorities.",
    weDo: "Ohio BWC and Cuyahoga County court-aligned procedural guides. Answer-first content structured with llms.txt protocol so AI search models cite your firm as the primary authority.",
    icon: FileText,
  },
  {
    trap: "The Junior Account Manager Bait-and-Switch",
    theyDo: "You were sold by an impressive agency founder or VP of sales, but the moment you signed, your account was dumped onto a junior intern managing 35 other law firms.",
    weDo: "Direct CEO strategy with Mubashar Sharif. Every audit, practice silo architecture, and Google Business Profile optimization is overseen personally.",
    icon: ShieldCheck,
  },
];

export default function ClevelandBurnedByAgencies() {
  const scrollToRealityCheck = () => {
    const el = document.getElementById("reality-check");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="burned-by-agencies" className="border-b border-slate-200 bg-slate-50/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 border border-rose-200 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <span>Accountability & Real Signed Case Attribution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
            Didn't Get Results from Your Previous SEO Agency? We Are Here with Real Results.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Most managing partners who contact SearchPrex have already spent \$15,000 to \$50,000 on past marketing agencies that delivered nothing but fluff reports and excuses. Here is why your past agency failed—and how SearchPrex replaces empty promises with verifiable signed cases.
          </p>
        </div>

        {/* 4 Traps vs SearchPrex Results Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {COMPARISON_TRAPS.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEEDFE] text-[#534AB7] group-hover:bg-[#534AB7] group-hover:text-white transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Past Agency Trap 0{idx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0a0f2e]">
                    {item.trap}
                  </h3>
                </div>
              </div>

              {/* What Past Agency Did */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 mb-4 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                  What Past Agencies Did:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.theyDo}
                </p>
              </div>

              {/* What SearchPrex Delivers */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1a7d59] shrink-0" />
                  How SearchPrex Delivers Real Results:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {item.weDo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Before vs After Audit Reality Teardown Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-[#534AB7]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left: Typical Failed Agency Retainer */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-slate-50/50 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                <XCircle className="h-3.5 w-3.5" />
                <span>Typical Failed Agency Retainer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a0f2e]">
                \$3,000–\$5,000 / mo Burned on Empty Metrics
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Call Attribution:</strong> Partners have no idea whether incoming calls came from SEO or referrals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Generic Boilerplate:</strong> No differentiation between Ohio Bureau of Workers' Compensation and other states.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Trapped in Contracts:</strong> Penalties of \$10,000+ if you attempt to leave early.</span>
                </li>
              </ul>
            </div>

            {/* Right: The SearchPrex Transparent Standard */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-indigo-50/40 via-white to-white space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1a7d59]" />
                <span>The SearchPrex Real Results Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a0f2e]">
                Verifiable Signed Cases & Month-to-Month Freedom
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span><strong>Whisper Inbound Audio:</strong> Instant verification that your intake team is speaking to an SEO lead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span><strong>Cuyahoga Court Silos:</strong> Targeted landing architecture for Lakewood, Parma, Beachwood & Cleveland.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span><strong>100% Asset Ownership:</strong> You own all rankings, schema markup, content, and citations permanently.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Action Strip */}
          <div className="bg-slate-50 p-5 sm:p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-extrabold text-[#0a0f2e]">
                Want to know why your previous SEO failed?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                We will teardown your existing site, identify technical indexing bottlenecks, and inspect local Cuyahoga competitors in 24 hours.
              </p>
            </div>
            <button
              onClick={scrollToRealityCheck}
              className="inline-flex items-center gap-2 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md shadow-[#534AB7]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get Free 24h Forensic Teardown</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
