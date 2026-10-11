"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, UserCheck, Calendar, ShieldCheck } from "lucide-react";

export default function AlbuquerqueQuickAnswer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div
        id="quick-answer"
        className="relative rounded-2xl bg-white border-2 border-[#534AB7]/20 p-6 sm:p-8 shadow-sm hover:border-[#534AB7]/40 transition-all"
      >
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Answer · AI Overview Optimized</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
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
            className="text-[#534AB7] underline decoration-[#534AB7]/40 hover:decoration-[#534AB7] font-semibold transition-colors"
          >
            Google Business Profile optimization
          </Link>
          , and secures authoritative entity citations across{" "}
          <Link
            href="/ai-search"
            className="text-[#534AB7] underline decoration-[#534AB7]/40 hover:decoration-[#534AB7] font-semibold transition-colors"
          >
            Google AI Overviews and Gemini search engines
          </Link>
          . Every partnership is founder-led, month-to-month, and backed by a comprehensive reality check before any retainer begins. Discover{" "}
          <Link
            href="/services/law-firm-seo"
            className="text-[#534AB7] underline decoration-[#534AB7]/40 hover:decoration-[#534AB7] font-semibold transition-colors"
          >
            how our law firm SEO process drives signed cases
          </Link>
          .
        </p>

        {/* E-E-A-T Credibility Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#534AB7]" />
            <span>
              Author:{" "}
              <Link
                href="/experts"
                className="font-bold text-[#0a0f2e] hover:text-[#534AB7] underline decoration-slate-300"
              >
                Mubashar Sharif
              </Link>
              , Certified SEO Analyst &amp; Legal Search Strategist
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
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
