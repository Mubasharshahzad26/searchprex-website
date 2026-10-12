"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building2,
} from "lucide-react";
import SugarLandPainBanner from "./SugarLandPainBanner";

export default function SugarLandFaqAndCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Why does my Sugar Land firm rank below Houston firms?",
      a: "This occurs because large downtown Houston and Galleria firms hold multi-year legacy domain authority and massive backlink profiles, not because their content is more relevant. Many of those mega-firms don't have a single page mentioning Fort Bend County courts or First Colony neighborhoods. When we architect hyper-local practice silos that cite the Fort Bend County Justice Center in Richmond and local Texas Family Code statutes, Google prioritizes your authentic local authority over their generic Houston pages.",
    },
    {
      q: "What does SEO cost for a Sugar Land law firm?",
      a: "SearchPrex plans range from $1,200 to $2,500 per month on simple month-to-month terms. We deliver a comprehensive 24-hour tear-down and scope review before any agreement is signed. One retained high-asset divorce ($7,500–$15,000+) or estate administration client easily covers multiple months of service.",
    },
    {
      q: "Will you cover Missouri City, Stafford, and Richmond on our website?",
      a: "Yes, through dedicated submarket hubs. Google treats Missouri City, Richmond, and Stafford as distinct municipal entities. We build unique, non-overlapping location silos with specific courthouse directions and local municipal signals rather than duplicating city names.",
    },
    {
      q: "Do you support multilingual content for Fort Bend's diverse population?",
      a: "Yes. Fort Bend County is one of the most ethnically diverse counties in the nation. We engineer native-reviewed Spanish, Mandarin, and Hindi practice pages with clean bidirectional hreflang markup, allowing your firm to capture high-value international business and immigration clients.",
    },
    {
      q: "Do I have to stop running our Google Ads to do SEO?",
      a: "No. We run organic search optimization alongside your existing paid search campaigns. As organic positions and local 3-pack visibility mature, your cost-per-lead drops—allowing you to strategically trim bloated ad spend when the performance data confirms it.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Fort Bend Legal Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
              Questions from Sugar Land Attorneys
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Clear, transparent answers regarding local competition, pricing, court venues, and ad transition strategy.
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
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-base sm:text-lg text-neutral-950">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-neutral-900" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Directory Links Section */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Explore More Texas Law Firm SEO Locations &amp; Resources
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm font-semibold text-slate-700">
            <Link
              href="/locations/texas/katy"
              className="text-neutral-900 hover:text-neutral-950 hover:underline"
            >
              Law Firm SEO Katy
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas/the-woodlands"
              className="text-neutral-900 hover:text-neutral-950 hover:underline"
            >
              Law Firm SEO The Woodlands
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas/denton"
              className="text-neutral-900 hover:text-neutral-950 hover:underline"
            >
              Law Firm SEO Denton
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas/plano"
              className="text-neutral-900 hover:text-neutral-950 hover:underline"
            >
              Law Firm SEO Plano
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas"
              className="text-neutral-900 hover:text-neutral-950 hover:underline"
            >
              All Texas Cities
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations"
              className="text-neutral-900 hover:text-neutral-950 hover:underline"
            >
              Every State &amp; City We Cover
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 max-w-xl mx-auto">
            Review dated{" "}
            <Link href="/resources/news/local-seo-updates" className="text-neutral-900 underline font-semibold">
              local SEO news
            </Link>{" "}
            and benchmark your firm with our free{" "}
            <Link href="/resources/law-firm-seo-audit-checklist" className="text-neutral-900 underline font-semibold">
              law firm SEO checklist
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-slate-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Exclusivity Guaranteed · One Law Firm Per Practice Area</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Be the Sugar Land Firm Families Find First.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-8">
            Escape the Houston PPC auction and secure an exclusive, commanding organic presence in Fort Bend County. Request your free 24-hour Rescue Plan today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#rescue-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Request My Free Rescue Plan</span>
              <ArrowRight className="w-4 h-4 text-neutral-900" />
            </a>

            <a
              href="#diagnosis-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/60 text-white font-bold text-base border border-white/20 transition-all"
            >
              <span>Diagnose Issues with Gemini</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              Month-to-Month Terms
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              Direct Founder Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              90-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Solution / Pain Band */}
      <SugarLandPainBanner id="painband-bottom" variant="bottom" />
    </>
  );
}
