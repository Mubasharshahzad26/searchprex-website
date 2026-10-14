"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle, ShieldCheck } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Can SEO replace my Google Ads?",
    a: "Often it can reduce your dependence on them over time, but we keep ads running until organic data proves it is safe to trim. We never ask you to cut paid spend before organic intake is proven in your CallRail dashboard. As Map Pack and organic rankings grow, firms can usually trim low-converting PPC keywords and lower their blended cost per signed case. Results are never guaranteed.",
  },
  {
    q: "How long before I see leads from SEO in Grand Rapids?",
    a: "Kent County is significantly less saturated than Detroit or Chicago. In a market like this, Google Business Profile rankings and the first local phone calls typically start within 60 to 90 days. Suburb-specific practice pages (Wyoming, Kentwood, East Grand Rapids) typically begin ranking for high-intent queries between days 60 and 90, creating a sustainable foundation by month 4.",
  },
  {
    q: "I am a solo attorney with no time. Will this need me?",
    a: "Virtually zero technical time. We handle the entire workload: citation audits, Google Business Profile management, statutory legal content writing, schema architecture, and call tracking setup. You only give us one short 20-minute monthly strategy call to review intake and signed retainers.",
  },
  {
    q: "Do you share leads or take multiple firms in my practice area?",
    a: "Never. Unlike lead directories (Avvo, Justia) or mass agencies that sign 15 personal injury firms in the same zip code, we enforce strict exclusivity: one law firm per practice area in Grand Rapids and Kent County. If you sign with us for personal injury or family law, we lock out your local competitors.",
  },
  {
    q: "What does it cost?",
    a: "We work on a transparent, flat monthly retainer with no surprise fees and no long-term contracts (month-to-month). Our retainer is designed to be fully covered by a single signed case per month, removing the anxiety of unpredictable Google Ads bills.",
  },
  {
    q: "Do I need separate pages for Wyoming, Kentwood, Walker and Grandville?",
    a: "Yes. Google evaluates Kent County suburbs as distinct geo-targets. A resident searching 'divorce attorney Kentwood' or 'car accident lawyer Wyoming MI' expects localized content referencing their local municipal courts. We build dedicated high-intent submarket spokes for each so your firm captures cases across the entire metropolitan area.",
  },
];

export default function GrandRapidsFaqAndCta() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* FAQS SECTION */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            COMMON QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mt-4 tracking-tight">
            Grand Rapids Law Firm SEO FAQs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Clear, honest answers about legal SEO timelines, Google Ads transitions, and Kent County search dynamics.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl space-y-3.5 mb-20">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-950"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-neutral-800 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-neutral-800" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FINAL CONVERSION BANNER */}
        <div className="rounded-3xl bg-neutral-900 p-8 sm:p-14 text-white text-center shadow-xl relative overflow-hidden border border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-neutral-200 text-xs font-bold uppercase tracking-wider border border-white/20 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-neutral-300" />
              ONE LAW FIRM PER PRACTICE AREA
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight !text-white drop-shadow-sm">
              Ready to Stop Renting Leads?
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto">
              Get your free PPC Waste Audit for Grand Rapids. I review your ad exposure, Kent County search competition, and show where organic can replace paid spend.
            </p>

            <div className="pt-3">
              <a
                href="#ppc-audit"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 !text-neutral-950 font-bold text-base shadow-lg hover:shadow-xl transition-all border border-white hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>Request My Free Audit</span>
                <ArrowRight className="w-5 h-5 text-neutral-950" />
              </a>
            </div>

            <div className="pt-6 border-t border-white/15 text-xs text-slate-300 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span className="text-slate-400">Also serving Michigan:</span>
              <Link href="/locations/michigan/detroit" className="hover:text-white text-slate-200 underline underline-offset-4 font-medium">
                Detroit Law Firm SEO
              </Link>
              <span className="text-slate-500">·</span>
              <span className="text-white font-semibold">Grand Rapids</span>
              <span className="text-slate-500">·</span>
              <Link href="/locations" className="hover:text-white text-slate-200 underline underline-offset-4 font-medium">
                All US Locations
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
