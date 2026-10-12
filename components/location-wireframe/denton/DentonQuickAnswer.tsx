"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, UserCheck, Calendar, ShieldCheck } from "lucide-react";

export default function DentonQuickAnswer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div
        id="quick-answer"
        className="relative rounded-2xl bg-white border-2 border-slate-300 p-6 sm:p-8 shadow-sm hover:border-slate-300 transition-all"
      >
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Answer · Google AI Overview Grounded</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4">
          What is Law Firm SEO in Denton, Texas?
        </h2>

        {/* Answer-first summary */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          <strong className="text-slate-900 font-bold">
            Law firm SEO in Denton is the specialized practice of ranking your firm in Google&apos;s Local 3-Pack, organic page one, and generative AI search overviews
          </strong>{" "}
          when residents in Denton, Lewisville, Flower Mound, and Little Elm search for legal representation — including the anxious parents searching three hours away for college-age students at UNT and TWU. SearchPrex builds Denton County practice silos, executes hyper-local{" "}
          <Link
            href="/services/law-firm-seo/google-business-profile-for-lawyers"
            className="text-neutral-900 underline decoration-[#171717]/40 hover:decoration-[#171717] font-semibold transition-colors"
          >
            Google Business Profile optimization
          </Link>
          , and secures authoritative entity citations across{" "}
          <Link
            href="/ai-search"
            className="text-neutral-900 underline decoration-[#171717]/40 hover:decoration-[#171717] font-semibold transition-colors"
          >
            Google AI Overviews and Gemini search engines
          </Link>
          . Every engagement is founder-led, month-to-month, and backed by a 90-day money-back milestone guarantee. Discover{" "}
          <Link
            href="/services/law-firm-seo"
            className="text-neutral-900 underline decoration-[#171717]/40 hover:decoration-[#171717] font-semibold transition-colors"
          >
            how our legal SEO methodology drives signed retainers
          </Link>
          .
        </p>

        {/* E-E-A-T Credibility Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-neutral-900" />
            <span>
              Written by{" "}
              <Link
                href="/experts"
                className="font-bold text-neutral-950 hover:text-neutral-900 underline decoration-slate-300"
              >
                Mubashar Sharif
              </Link>
              , Certified SEO Analyst &amp; Legal Search Strategist
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-neutral-800" />
              State Bar of Texas Compliance Grounded
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Updated October 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
