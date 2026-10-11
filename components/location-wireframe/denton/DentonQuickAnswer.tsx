"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, UserCheck, Calendar, ShieldCheck } from "lucide-react";

export default function DentonQuickAnswer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div
        id="quick-answer"
        className="relative rounded-2xl bg-white border-2 border-[#534AB7]/20 p-6 sm:p-8 shadow-sm hover:border-[#534AB7]/40 transition-all"
      >
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Answer · Google AI Overview Grounded</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
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
          . Every engagement is founder-led, month-to-month, and backed by a 90-day money-back milestone guarantee. Discover{" "}
          <Link
            href="/services/law-firm-seo"
            className="text-[#534AB7] underline decoration-[#534AB7]/40 hover:decoration-[#534AB7] font-semibold transition-colors"
          >
            how our legal SEO methodology drives signed retainers
          </Link>
          .
        </p>

        {/* E-E-A-T Credibility Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#534AB7]" />
            <span>
              Written by{" "}
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
