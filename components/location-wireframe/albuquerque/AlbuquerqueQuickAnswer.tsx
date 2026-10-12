"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, UserCheck, Calendar, ShieldCheck } from "lucide-react";

export default function AlbuquerqueQuickAnswer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div
        id="quick-answer"
        className="relative rounded-2xl bg-white border-2 border-slate-300 p-6 sm:p-8 shadow-sm hover:border-slate-300 transition-all"
      >
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Answer · AI Overview Optimized</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4">
          What is Law Firm SEO in Albuquerque?
        </h2>

        {/* Answer-first summary */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          <strong className="text-slate-900 font-bold">
            Law firm SEO in Albuquerque is the specialized process of positioning your legal practice at the top of Google&apos;s Local 3-Pack, organic rankings, and generative AI search overviews
          </strong>{" "}
          across Bernalillo County, Rio Rancho, and Santa Fe in both English and Spanish. Unlike generic marketing agencies, SearchPrex architects jurisdiction-grounded practice silos, executes hyper-local{" "}
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
          . Every partnership is founder-led, month-to-month, and backed by a comprehensive reality check before any retainer begins. Discover{" "}
          <Link
            href="/services/law-firm-seo"
            className="text-neutral-900 underline decoration-[#171717]/40 hover:decoration-[#171717] font-semibold transition-colors"
          >
            how our law firm SEO process drives signed cases
          </Link>
          .
        </p>

        {/* E-E-A-T Credibility Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-neutral-900" />
            <span>
              Author:{" "}
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
              State Bar of NM Compliance Verified
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
