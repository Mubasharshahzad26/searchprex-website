"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import ClevelandPainBanner from "./ClevelandPainBanner";

const FAQS = [
  {
    q: "How competitive is law firm SEO in Cleveland?",
    a: "Competition depends on the practice area and search. We review the current results for your priority Cleveland and Cuyahoga County searches, then identify realistic opportunities based on your firm's website, profile, and competitors.",
  },
  {
    q: "Why is Ohio workers' compensation content such a massive opportunity?",
    a: "Ohio workers' compensation is administered through the Ohio Bureau of Workers' Compensation, with appeals involving the Industrial Commission. Content about this topic should reflect current Ohio sources and be reviewed for legal accuracy by the firm before publication.",
  },
  {
    q: "How long before SEO produces signed cases in Cleveland?",
    a: "Timing varies with your starting visibility, competition, website, and Google Business Profile. We set milestones after reviewing the firm's baseline and track qualified calls and form enquiries alongside visibility. SEO results and case volume are not guaranteed.",
  },
  {
    q: "Do I need separate pages for Lakewood, Parma, Beachwood, and Westlake?",
    a: "Only when the firm genuinely serves that area and can provide useful, distinct information for people there. A page that merely swaps in a suburb name is unlikely to help users; we assess each location before recommending a separate page.",
  },
  {
    q: "Do I have to stop my PPC campaigns when starting SEO?",
    a: "No. We never recommend turning off profitable paid ads prematurely. We run organic SEO alongside your current PPC campaigns, document signed case acquisition in your monthly performance ledger, and recommend trimming paid ad spend only where organic rankings have permanently secured top visibility.",
  },
];

export default function ClevelandFaqAndCta() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const scrollToRealityCheck = () => {
    const el = document.getElementById("reality-check");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* FAQ Accordion Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-950 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Cleveland Legal SEO FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Cleveland Law Firm SEO FAQs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Clear answers about local competition, Ohio-specific content, and measuring progress.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-md hover:border-slate-400"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-950 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-950 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-neutral-950" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-1 sm:px-6 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* High-Contrast Conversion CTA Banner */}
      <section className="relative overflow-hidden bg-neutral-900 border border-neutral-800 py-16 lg:py-20 text-white">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 hidden rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-200 border border-white/20 backdrop-blur-sm">
            Free Cleveland Local SEO Audit
          </span>

          {/* Heading with explicit !text-white to avoid app/globals.css black text overwrite */}
          <h2 className="!text-white text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Find the Local Search Gaps Affecting Your Firm
          </h2>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Request a free review of your website, local visibility, and competitors. Mubashar Sharif reviews each request personally.
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToRealityCheck}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-black px-8 py-4 text-base shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Get My Free Local Audit</span>
              <ArrowRight className="h-4 w-4 text-neutral-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Pain Band */}
      <ClevelandPainBanner id="painband-bottom" variant="bottom" />
    </div>
  );
}
