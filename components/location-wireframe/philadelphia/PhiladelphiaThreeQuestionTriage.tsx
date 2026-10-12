"use client";

import React, { useState } from "react";
import { HelpCircle, Check, ArrowRight, Sparkles, Compass } from "lucide-react";

const Q1_OPTIONS = ["Not in the top 10", "On page one, not top 3", "Top 3 sometimes"];
const Q2_OPTIONS = ["Mostly a homepage", "Some practice pages", "Practice and area pages"];
const Q3_OPTIONS = ["Referrals", "PPC or directories", "A mix"];

export default function PhiladelphiaThreeQuestionTriage() {
  const [a1, setA1] = useState<number | null>(null);
  const [a2, setA2] = useState<number | null>(null);
  const [a3, setA3] = useState<number | null>(null);

  // Compute recommendation
  let recTitle = "Answer the three questions above";
  let recBody = "Your custom strategic starting point will appear here as soon as you select your current position.";
  let hasSelection = a1 !== null && a2 !== null && a3 !== null;

  if (hasSelection) {
    if (a1 === 0) {
      recTitle = "Immediate First Priority: Calibrate Google Business Profile & Local Proximity";
      recBody = "Your Google Business Profile and local citations represent your fastest revenue lever. We correct primary and secondary legal categories, clean up Philadelphia directory citations, and establish Whisper call tracking before publishing new pages.";
    } else if (a2! <= 1) {
      recTitle = "Immediate First Priority: Construct Neighborhood Practice Silos";
      recBody = "You possess local visibility but lack indexable topical depth. We construct dedicated practice-area and neighborhood pages (Center City, South Philly, Northeast) that capture high-intent inquiries from people ready to hire.";
    } else {
      recTitle = "Immediate First Priority: Earn Local Mentions & AI Citations";
      recBody = "Your technical baseline is stable. The highest-leverage growth phase is building compliant review velocity, Philadelphia Bar Association mentions, and structured data so Google AI Overviews cite your partners directly.";
    }

    if (a3 === 1) {
      recBody += " We keep your paid ads running uninterrupted while organic search compounds and proves itself in your monthly ledger.";
    }
  }

  return (
    <section id="three-questions" className="scroll-mt-20 border-b border-slate-200 bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Compass className="h-4 w-4" />
            <span>Interactive Strategic Triage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Three Questions. Your Personalized Philadelphia Roadmap.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Answer candidly below. We analyze your baseline visibility, content depth, and case acquisition mix to pinpoint where your SEO execution should begin.
          </p>
        </div>

        {/* 3 Questions Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Question 1 */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
            <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider block">
              Question 01
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-950">
              Where does your firm show on Google Maps for your core practice?
            </h3>
            <div className="space-y-2 pt-1">
              {Q1_OPTIONS.map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setA1(idx)}
                  className={`w-full text-left rounded-xl p-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    a1 === idx
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
            <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider block">
              Question 02
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-950">
              What does your website currently feature for practice & neighborhood pages?
            </h3>
            <div className="space-y-2 pt-1">
              {Q2_OPTIONS.map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setA2(idx)}
                  className={`w-full text-left rounded-xl p-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    a2 === idx
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
            <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider block">
              Question 03
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-950">
              How do most retained cases reach your office today?
            </h3>
            <div className="space-y-2 pt-1">
              {Q3_OPTIONS.map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setA3(idx)}
                  className={`w-full text-left rounded-xl p-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    a3 === idx
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Recommendation Output Box */}
        <div className="mt-8 rounded-3xl border-2 border-neutral-900 bg-white p-6 sm:p-8 shadow-lg shadow-slate-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
              <Sparkles className="h-4 w-4" />
              <span>Recommended Strategic Focus</span>
            </div>
            {hasSelection && (
              <span className="text-xs font-semibold text-slate-400">
                Personalized for Philadelphia Market
              </span>
            )}
          </div>

          <div className="pt-4 space-y-2">
            <h4 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
              {recTitle}
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
              {recBody}
            </p>
          </div>

          {hasSelection && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-semibold">
                Want us to audit this live against your top 3 competitors?
              </span>
              <a
                href="#reality-check"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 hover:underline"
              >
                <span>Request Free 24h Reality Check →</span>
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
