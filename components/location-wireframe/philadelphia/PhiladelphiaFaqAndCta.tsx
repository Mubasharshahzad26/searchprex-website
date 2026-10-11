"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle, Sparkles, ShieldCheck } from "lucide-react";
import PhiladelphiaPainBanner from "./PhiladelphiaPainBanner";

const FAQS = [
  {
    q: "How competitive is law firm SEO in Philadelphia?",
    a: "Philadelphia is one of the most competitive legal markets in the country because the Court of Common Pleas Complex Litigation Center draws national mass tort firms with six-figure marketing budgets. However, national firms only target generic terms like 'Philadelphia injury lawyer'. Local firms hold an unbeatable advantage in neighborhood searches (Center City, Northeast, South Philly) and Pennsylvania-specific statutory topics that out-of-state aggregators cannot credibly author.",
  },
  {
    q: "Should a Philadelphia law firm build neighborhood pages?",
    a: "Yes, and it is the single highest-leverage missed opportunity in the metro. Google's geo-grid algorithm treats Center City, South Philly, Northeast Philadelphia, and University City as distinct micro-markets with separate 3-pack Map Pack rankings. Building genuine, localized practice silos captures high-converting inquiries with virtually zero national competition.",
  },
  {
    q: "Do we have to pause or cancel our existing Google Ads (PPC)?",
    a: "No. We never recommend turning off profitable paid advertising arbitrarily. We run our organic search campaign alongside your ads, establish Whisper call tracking to measure true cost per signed case across both channels, and only recommend scaling back PPC once organic search begins reliably delivering lower-cost retained cases.",
  },
  {
    q: "What is your pricing and are we locked into a long-term contract?",
    a: "We operate on a transparent, flexible month-to-month agreement. We believe if an SEO agency does not earn your business every 30 days with signed case numbers, you should have the absolute freedom to leave. Retainers typically range between $1,200 and $2,500/month depending on practice scope, and you retain 100% permanent ownership of all website code, content, citations, and call logs.",
  },
  {
    q: "How does SearchPrex protect territory exclusivity for our practice?",
    a: "We strictly uphold a 1-firm-per-practice-area exclusivity policy in each submarket. If we partner with your firm for personal injury or criminal defense in Center City or Northeast Philadelphia, we will never accept a direct competitor in that jurisdiction.",
  },
];

export default function PhiladelphiaFaqAndCta() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const scrollToRealityCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("reality-check");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="faqs" className="border-b border-slate-200 bg-white">
      {/* FAQ Accordion Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
            <HelpCircle className="h-4 w-4" />
            <span>Attorney Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Questions from Philadelphia Law Firms
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Transparent answers regarding market competition, neighbourhood silos, month-to-month contracts, and case attribution.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white transition-all hover:border-[#534AB7]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-slate-50 transition-colors"
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
                  <div className="px-5 pb-6 pt-1 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supporting Internal Links Strip */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs sm:text-sm text-slate-600 text-center space-x-2">
          <span className="font-bold text-slate-700">Explore Additional Resources:</span>
          <Link href="/services/law-firm-seo" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
            Law Firm SEO
          </Link>
          <span>·</span>
          <Link href="/locations" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
            All Covered Locations
          </Link>
          <span>·</span>
          <Link href="/case-studies" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
            Legal Case Studies
          </Link>
          <span>·</span>
          <Link href="/free-audit" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
            Free SEO Audit
          </Link>
        </div>
      </div>

      {/* Closing High-Contrast CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0a0f2e] via-[#3C3489] to-[#0a0f2e] py-16 sm:py-20 text-white text-center">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-200">
            Exclusive Territory Reserve
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            You Know Philadelphia. Let's Make Google Know It Too.
          </h2>

          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Stop letting national filing-address firms claim cases from your home court. Get your free 24-hour Philadelphia market reality check and see exactly how to win your neighborhood back.
          </p>

          <div className="pt-2">
            <a
              href="#reality-check"
              onClick={scrollToRealityCheck}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-extrabold text-[#0a0f2e] shadow-xl hover:bg-slate-100 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Request My Free Reality Check</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-200 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              1 Firm Per Practice Exclusivity
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Month-to-Month Flexibility
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              100% Asset Ownership
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Pain Band */}
      <PhiladelphiaPainBanner id="painband-bottom" variant="bottom" />
    </section>
  );
}
