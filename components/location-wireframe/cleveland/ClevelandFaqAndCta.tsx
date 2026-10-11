"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import ClevelandPainBanner from "./ClevelandPainBanner";

const FAQS = [
  {
    q: "How competitive is law firm SEO in Cleveland?",
    a: "Less contested than a metro of this size suggests. Keyword difficulty for many Cleveland attorney searches sits at 2–5 out of 100 in SEMrush, because page one is held largely by national aggregators (Justia, Avvo, FindLaw) rather than local Cleveland law firms. National directories rank on raw domain authority rather than local relevance; an authoritative Cuyahoga County practice page that directly answers the searcher's question can displace them.",
  },
  {
    q: "Why is Ohio workers' compensation content such a massive opportunity?",
    a: "Ohio runs workers' compensation through a state-fund monopoly administered by the Bureau of Workers' Compensation (BWC) rather than private insurance carriers. That means claim filings, Industrial Commission hearings, and allowed conditions operate completely differently from almost every other state. National legal websites publish generic advice that is confidently incorrect for Ohio workers. A Cleveland firm explaining the actual BWC process step-by-step faces almost zero direct local competition.",
  },
  {
    q: "How long before SEO produces signed cases in Cleveland?",
    a: "Initial Map Pack (3-pack) positioning and technical indexation traction typically begin within the first 60 to 90 days. Organic rankings and signed case volume compound steadily through months 6 to 12. Google Ads PPC is faster at first, which is why we recommend maintaining a blended approach until your monthly ledger proves organic inquiries are carrying the caseload.",
  },
  {
    q: "Do I need separate pages for Lakewood, Parma, Beachwood, and Westlake?",
    a: "Yes, absolutely. Lakewood, Parma, Beachwood, Euclid, and Westlake are searched as distinct geographical submarkets with their own municipal court venues. A single downtown Cleveland page will not reliably surface in their local map packs. Each suburb requires its own dedicated localized silo with genuine municipal citations, not find-and-replace duplicate text.",
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
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Cleveland Legal SEO FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Questions from Cleveland attorneys
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Clear, honest answers about keyword difficulty, Ohio BWC content, and realistic ranking timelines.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0a0f2e] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#534AB7] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
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
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a0f2e] via-[#3C3489] to-[#0a0f2e] py-16 lg:py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/15">
            Transparent Ledger Guarantee
          </span>

          {/* Heading with explicit !text-white to avoid app/globals.css black text overwrite */}
          <h2 className="!text-white text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Show me the numbers.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Get your comprehensive Cleveland Market Reality Check within 24 hours. Reviewed personally by Mubashar Shahzad.
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToRealityCheck}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0a0f2e] font-black px-8 py-4 text-base shadow-xl transition-all hover:scale-105"
            >
              <span>Request my reality check</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Pain Band */}
      <ClevelandPainBanner id="painband-bottom" variant="bottom" />
    </div>
  );
}
