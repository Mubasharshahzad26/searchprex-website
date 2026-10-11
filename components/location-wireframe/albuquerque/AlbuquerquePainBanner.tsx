"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";

interface AlbuquerquePainBannerProps {
  id?: string;
  variant?: "top" | "bottom";
}

export default function AlbuquerquePainBanner({
  id = "pain-banner",
  variant = "top",
}: AlbuquerquePainBannerProps) {
  if (variant === "bottom") {
    return (
      <section id={id} className="w-full bg-[#0a0f2e] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-[#EEEDFE] text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldAlert className="w-3.5 h-3.5 text-[#EEEDFE]" />
                Zero Vanity Metrics · Signed Case Retention
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Tired of SEO Agencies That Promise Traffic but Deliver Zero Retainers?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Most generalist agencies treat Albuquerque like any standard market. They ignore New Mexico&apos;s 50/50 community property nuances, overlook DWI MVD hearing deadlines, and leave the 49.8% bilingual Spanish search population completely untouched.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 sm:p-7 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                We Fix the Disconnect with High-Intent Local Authority
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed">
                We work month-to-month with one firm per practice area in Albuquerque. No 12-month lock-in contracts, no outsourced junior account managers, and no generic blog posts.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#reality-check"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-xs sm:text-sm transition-all"
                >
                  <span>Request Albuquerque Reality Check</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/services/law-firm-seo"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
                >
                  <span>Our Methodology</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="w-full bg-[#0a0f2e] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Problem 1: Confused Between Agencies */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#534AB7]/20 border border-[#534AB7]/30 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-[#EEEDFE]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Confused Between Choosing an SEO Agency in Albuquerque?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                Out-of-state agencies pitch national cookie-cutter packages that treat Albuquerque the same as Dallas or Phoenix. They don&apos;t know the difference between the Second Judicial District Court and Bernalillo County Metropolitan Court.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#EEEDFE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#1a7d59]" />
                We provide founder-led legal strategy tailored to New Mexico.
              </span>
            </div>
          </div>

          {/* Problem 2: Didn't Get Results */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#1a7d59]/20 border border-[#1a7d59]/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Burnt by Previous SEO Agencies with Zero Case Inquiries?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2">
                If your previous agency handed you 40-page PDF reports filled with &quot;impressions&quot; and vanity keyword rankings while your phone remained silent, you suffered an intent mismatch.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#1a7d59]" />
                We track qualified client calls, intake speed, and signed case revenue.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
