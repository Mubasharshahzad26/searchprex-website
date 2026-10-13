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

import Link from "next/link";

const COMPARISON_TRAPS = [
  {
    trap: "The 12-Month Contract Lock-In",
    theyDo: "Locked your firm into an inflexible 12 to 24-month agreement, claiming legal SEO takes a year before any progress, while billing monthly for minimal technical output.",
    weDo: (
      <span>
        Month-to-month partnership. We earn your retainer every 30 days. You see indexation, ranking movements, and early inquiries within the first 60 to 90 days of our{" "}
        <Link href="/services/law-firm-seo" className="font-semibold text-neutral-900 underline hover:text-neutral-950">
          law firm SEO sprint
        </Link>
        .
      </span>
    ),
    icon: Lock,
  },
  {
    trap: "Vanity Traffic with Zero Inbound Calls",
    theyDo: "Emailed automated graphs showing thousands of impressions for national legal terms that never produced a single consultation in Cuyahoga County.",
    weDo: (
      <span>
        Whisper call tracking on every campaign line. Your intake team hears "SearchPrex Legal Inbound" before answering. We track real signed cases and consult requests, not hollow clicks.
      </span>
    ),
    icon: PhoneCall,
  },
  {
    trap: "De-Indexed AI-Generated Articles",
    theyDo: "Spammed your blog with 40 generic AI articles that Google demoted, and which generative engines like ChatGPT and Google AI Overviews ignore as authoritative sources.",
    weDo: (
      <span>
        Ohio BWC and Cuyahoga County court-aligned procedural guides. Answer-first content engineered with structured schema and verified citations via our{" "}
        <Link href="/ai-search" className="font-semibold text-neutral-900 underline hover:text-neutral-950">
          AI search optimization (GEO)
        </Link>{" "}
        framework.
      </span>
    ),
    icon: FileText,
  },
  {
    trap: "Junior Account Manager Hand-Off",
    theyDo: "Pitched by senior executives, then immediately handed off to an entry-level coordinator managing 30+ non-legal clients simultaneously.",
    weDo: (
      <span>
        Direct CEO execution. Mubashar Sharif personally audits your site, directs technical repairs, and optimizes your{" "}
        <Link href="/services/law-firm-seo/google-business-profile-for-lawyers" className="font-semibold text-neutral-900 underline hover:text-neutral-950">
          Google Business Profile
        </Link>
        .
      </span>
    ),
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
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            <ShieldCheck className="h-4 w-4 text-neutral-900" />
            <span>Accountability & Signed Case Attribution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Burned by Previous SEO Agencies?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Most managing partners who reach out to SearchPrex have already spent thousands on previous agencies that delivered traffic reports instead of paying clients. Review our{" "}
            <Link href="/case-studies" className="font-semibold text-neutral-900 underline hover:text-neutral-950">
              verified law firm case studies
            </Link>{" "}
            to see how we replace empty promises with transparent monthly case attribution.
          </p>
        </div>

        {/* 4 Traps vs SearchPrex Results Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {COMPARISON_TRAPS.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sm hover:border-neutral-900/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Past Agency Trap 0{idx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950">
                    {item.trap}
                  </h3>
                </div>
              </div>

              {/* What Past Agency Did */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  What Past Agencies Did:
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.theyDo}
                </p>
              </div>

              {/* What SearchPrex Delivers */}
              <div className="rounded-2xl border border-slate-300/30 bg-slate-50/40 p-4 space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-neutral-800 shrink-0" />
                  How SearchPrex Solves It:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {item.weDo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Before vs After Audit Reality Teardown Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-neutral-900/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left: Typical Failed Agency Retainer */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-slate-50/70 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/80 px-3 py-1 text-xs font-bold text-slate-700">
                <XCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Typical Agency Retainer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                \$3,000–\$5,000 / mo Spent on Vanity Traffic
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Call Tracking:</strong> Partners cannot tell whether inquiries came from SEO, referrals, or billboards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong>Generic Out-of-State Content:</strong> Misses Ohio Bureau of Workers' Compensation (BWC) and local court rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong>12-Month Lock-In:</strong> Massive financial penalties for exiting when performance stalls.</span>
                </li>
              </ul>
            </div>

            {/* Right: The SearchPrex Transparent Standard */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-50/40 via-white to-white space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-neutral-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-neutral-800" />
                <span>SearchPrex Accountable Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                Verifiable Case Attribution & Month-to-Month Flexibility
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span><strong>Whisper Call Attribution:</strong> Immediate audio confirmation whenever an inbound call originates from organic search.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span><strong>Cuyahoga Court Silos:</strong> Targeted localized practice silos for Lakewood, Parma, Beachwood, and Downtown Cleveland.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                  <span><strong>100% Asset Ownership:</strong> You permanently own your code, content, schema, and citation listings.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Action Strip */}
          <div className="bg-slate-50 p-5 sm:p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-extrabold text-neutral-950">
                Want to know why your previous SEO failed?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                We will teardown your existing site, identify technical indexing bottlenecks, and inspect local Cuyahoga competitors in 24 hours.
              </p>
            </div>
            <button
              onClick={scrollToRealityCheck}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
