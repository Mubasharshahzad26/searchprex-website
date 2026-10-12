"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";

interface DentonPainBannerProps {
  id?: string;
  variant?: "top" | "bottom";
}

export default function DentonPainBanner({
  id = "pain-banner",
  variant = "top",
}: DentonPainBannerProps) {
  if (variant === "bottom") {
    return (
      <section id={id} className="w-full bg-neutral-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-700/10 border border-slate-400/20 text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-200" />
                90-Day Money-Back Guarantee · Zero Risk
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Tired of Massive Ad Invoices While Dallas Firms Take Denton Retainers?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                DFW mega-agencies charge Dallas rates without ever addressing Denton County courts, UNT student arrests, or the worried out-of-town parents searching for help. We build dedicated local practice authority that belongs exclusively to your firm.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-neutral-700/20 rounded-2xl p-6 sm:p-7 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                We Deliver Real Signed Case Retainers, Not Fluff
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed">
                One law firm per practice area in Denton. Month-to-month flexibility with a written 90-day milestone guarantee so your partnership is completely protected.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#talk-to-me"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  <span>Talk to Mubashar Sharif</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/services/law-firm-seo"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
                >
                  <span>Our Legal Methodology</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="w-full bg-neutral-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Problem 1: Confused Between Agencies */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-slate-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Confused Between Choosing an SEO Agency in Denton?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                Most agencies treat Denton as an afterthought attached to Dallas–Fort Worth packages. They don&apos;t understand the 60,000 university student demographic or the procedural differences in Denton County Courts.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-800" />
                We provide founder-led strategy tailored specifically to Denton County.
              </span>
            </div>
          </div>

          {/* Problem 2: Didn't Get Results */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Burnt by Previous SEO Agencies with Zero Retainers?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                If your last agency sent pretty charts of keyword &quot;impressions&quot; while your consultation calendar remained empty, you paid for vanity instead of qualified case intake.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-800" />
                We measure performance by qualified phone calls and signed case retainers.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
