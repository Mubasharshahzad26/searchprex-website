"use client";

import React from "react";
import Link from "next/link";
import { Info, UserCheck, Calendar, ShieldCheck } from "lucide-react";

export default function ClevelandQuickAnswer() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div
        id="quick-answer"
        className="group relative overflow-hidden rounded-3xl border-2 border-[#534AB7]/25 bg-gradient-to-br from-white via-indigo-50/20 to-white p-6 sm:p-10 shadow-lg shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#534AB7]/15 hover:border-[#534AB7]/40 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#534AB7] before:via-indigo-400 before:to-[#1a7d59]"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-4 transition-transform group-hover:scale-105">
          <Info className="h-4 w-4" />
          <span>Quick Answer · For Cuyahoga County Attorneys</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a0f2e]">
          What is law firm SEO in Cleveland?
        </h2>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
          <strong className="text-[#0a0f2e] font-bold">
            Law firm SEO in Cleveland is the systematic work of making your practice appear in Google's Map Pack (local 3-pack), top organic positions, and generative AI answers (Google AI Overviews & ChatGPT) when residents across Cleveland, Lakewood, Parma, Beachwood, Westlake, and Shaker Heights search for legal counsel.
          </strong>{" "}
          SearchPrex engineers Cuyahoga County court-aligned practice silos, optimizes your{" "}
          <Link
            href="/services/law-firm-seo/google-business-profile-for-lawyers"
            className="font-bold text-[#534AB7] underline underline-offset-2 hover:text-[#3C3489] transition-colors"
          >
            Google Business Profile
          </Link>
          , and attributes every incoming call and signed case in a transparent monthly ledger with live{" "}
          <Link
            href="/ai-search"
            className="font-bold text-[#534AB7] underline underline-offset-2 hover:text-[#3C3489] transition-colors"
          >
            AI search visibility tracking
          </Link>
          . Flexible month-to-month partnership, backed by a complimentary 24-hour market reality check first. Learn more about{" "}
          <Link
            href="/services/law-firm-seo"
            className="font-bold text-[#534AB7] underline underline-offset-2 hover:text-[#3C3489] transition-colors"
          >
            how our modern law firm SEO works
          </Link>
          .
        </p>

        {/* E-E-A-T Author & Reviewer Attribution Box */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <UserCheck className="h-4 w-4 text-[#534AB7]" />
              Written by{" "}
              <Link href="/about" className="font-bold text-[#534AB7] hover:underline">
                Mubashar Sharif, CEO & Founder
              </Link>
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#1a7d59]" />
              Reviewed by Ohio Legal Counsel
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-slate-400" />
              Last updated: October 2026
            </span>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-[#534AB7] bg-[#EEEDFE] px-2.5 py-1 rounded-md transition-transform group-hover:scale-105">
            MRPC & Ohio Rule 7 Aligned
          </div>
        </div>
      </div>
    </section>
  );
}
