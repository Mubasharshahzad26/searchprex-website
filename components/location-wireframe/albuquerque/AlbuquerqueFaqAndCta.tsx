"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import AlbuquerquePainBanner from "./AlbuquerquePainBanner";

export default function AlbuquerqueFaqAndCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "You are not located in New Mexico. Why should our Albuquerque firm trust you?",
      a: "That is a completely fair and crucial question. We are a specialized remote team, and we state it openly. We do not maintain an empty vanity office in Albuquerque to mislead you. We earn your trust through month-to-month terms (zero 12-month contract handcuffs), transparent monthly call tracking and signed case revenue reports, direct access to Founder Mubashar Sharif, and references from managing attorneys.",
    },
    {
      q: "How does New Mexico's community property law affect our family law SEO?",
      a: "New Mexico is one of only nine community property states in the nation. Property acquired during marriage is owned equally 50/50 by both spouses. Generic out-of-state SEO agencies frequently write 'equitable distribution' content copied from other states, which confuses local searchers and harms your firm's credibility. We architect content grounded precisely in New Mexico statutes.",
    },
    {
      q: "Should our firm target Santa Fe, Rio Rancho, or Las Cruces on the same website?",
      a: "If you physically serve those jurisdictions, yes — but strictly through dedicated submarket hubs, never on one diluted metro page. Google evaluates physical proximity and county boundaries; a page optimized for Albuquerque will not rank reliably for a Rio Rancho or Santa Fe search.",
    },
    {
      q: "Does Spanish-language legal content really generate signed retainers?",
      a: "Substantially. With 49.8% of New Mexico's population identifying as Hispanic or Latino, thousands of high-intent searches ('abogado de DWI en Albuquerque', 'abogado de accidentes') are completely uncontested by English-only law firms. We deploy native-reviewed Spanish landing pages with bidirectional hreflang tags to capture this lucrative demand.",
    },
    {
      q: "How quickly do Albuquerque law firms see Google Map Pack results?",
      a: "Local 3-Pack geo-grid improvements typically begin within 60 to 90 days following Google Business Profile category calibration, citation synchronization, and review workflows. Organic practice silos and AI Overview citations compound steadily over 6 to 12 months.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Jurisdictional Clarity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
              Frequently Asked Questions from New Mexico Attorneys
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Straightforward, transparent answers regarding local competition, bilingual demand, and engagement terms.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-base sm:text-lg text-[#0a0f2e]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#534AB7]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-[#534AB7] via-[#3C3489] to-[#0a0f2e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEEDFE] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Exclusivity Guaranteed · One Firm Per Practice Area</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Be the Lawyer Your Albuquerque Community Finds First.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-8">
            Stop losing high-stakes retainers to billboard aggregators and out-of-state directories. Claim your free, confidential Albuquerque Reality Check today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#reality-check"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0a0f2e] font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Get My Free Reality Check</span>
              <ArrowRight className="w-4 h-4 text-[#534AB7]" />
            </a>

            <a
              href="#diagnosis-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-indigo-900/40 hover:bg-indigo-900/60 text-white font-bold text-base border border-white/20 transition-all"
            >
              <span>Diagnose Issues with Gemini</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Month-to-Month Terms
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Founder-Led Architecture
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Solution / Pain Band */}
      <AlbuquerquePainBanner id="painband-bottom" variant="bottom" />
    </>
  );
}
