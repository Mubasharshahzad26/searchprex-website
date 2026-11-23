"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle, Sparkles, BookOpen } from "lucide-react";
import ClevelandPainBanner from "./ClevelandPainBanner";

const FAQS = [
  {
    q: "How does SearchPrex compare to national legal marketing agencies (FindLaw, Scorpion, Justia) in Cleveland?",
    a: "National legal directories lock Ohio law firms into $3,500–$8,000/month contracts while selling identical directory profiles to dozens of competing Cleveland attorneys. SearchPrex operates on strict 1-firm per practice area exclusivity across Cuyahoga County. We build custom Next.js architectures on your own domain, optimize for both Google Maps 3-Pack and generative AI engines (ChatGPT, Perplexity), and provide a complimentary 24/7 AI Intake Engine at an engineering-direct $1,200/mo flat retainer.",
  },
  {
    q: "Why do Cleveland personal injury firms lose cases to billboard advertisers (KNR, Elk & Elk)?",
    a: "While billboard mega-firms dominate highway awareness on I-90 and I-480, over 64% of injured motorists still research Google or ask ChatGPT before retaining counsel. The real vulnerability is speed-to-lead: Clio benchmark data proves that 78% of claimants retain the first practice that responds. If your firm takes hours to call back or misses after-hours calls, claimants immediately hire competitors. SearchPrex pairs #1 local rankings with under-60-second AI intake triage to lock in retainers before billboard firms can answer.",
  },
  {
    q: "Is 24/7 AI legal intake compliant with Ohio Board of Professional Conduct Rule 7.3?",
    a: "Yes. Ohio Rule 7.3 restricts uninvited, direct solicitation. SearchPrex's AI intake system exclusively processes inbound, opt-in inquiries submitted through your website, SMS, or click-to-call. It transparently identifies itself as an automated intake assistant, gathers preliminary incident facts, schedules consultations, and explicitly disclaims legal advice—leaving all supervisory authority with the attorney under Ohio Rule 5.3.",
  },
  {
    q: "How much does law firm SEO cost in Cleveland, Ohio?",
    a: "Traditional agencies charge $2,500 to $7,000+ per month with 12-month lock-in contracts. SearchPrex provides complete Cleveland legal SEO for a flat $1,200/month with zero onboarding fees and month-to-month flexibility. Every plan includes Google Business Profile Map Pack optimization, custom practice area silos, Ohio statutory schema, and our 24/7 AI intake engine.",
  },
  {
    q: "What is SearchPrex's 90-day performance guarantee for Cuyahoga County firms?",
    a: "We provide a 90-day progress guarantee: if your firm does not see measurable gains in target Cuyahoga County keyword rankings, organic traffic, or qualified intake inquiries within 90 days, we either work for free until those milestones are hit or refund your last 90 days of retainer fees. We do not make false guarantees of #1 rankings—Google explicitly forbids this—but we fully back our engineering execution.",
  },
  {
    q: "Why is Ohio workers' compensation content such a massive opportunity?",
    a: "Ohio operates a state-exclusive fund through the Ohio Bureau of Workers' Compensation (BWC), with appeals adjudicated by the Industrial Commission of Ohio. Because injured workers face complex procedural hurdles (filing C-92 forms, administrative hearings, VSSR claims), they search heavily for statutory guidance. Building authoritative, statute-backed content captures high-volume claims that competitors ignore.",
  },
  {
    q: "Do I have to stop my PPC campaigns when starting SEO?",
    a: "No. We never recommend turning off profitable paid ads prematurely. In Cleveland, personal injury keywords command $180 to $350+ per click. We run organic SEO alongside your current PPC campaigns, document signed case acquisition in your monthly performance ledger, and recommend trimming paid ad spend only where organic rankings have permanently secured top visibility.",
  },
  {
    q: "Do I need separate pages for Lakewood, Parma, Beachwood, and Westlake?",
    a: "Only when the firm genuinely serves that area and can provide useful, distinct information for people there. Google treats Cuyahoga County suburbs as distinct local markets. We construct verified suburb corridors addressing specific local courts and municipal ordinances rather than thin doorway pages.",
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

        {/* Curated Legal SEO & Ethics Research Guides (Spoke Silo) */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-neutral-900" />
            <h3 className="text-xl font-bold text-neutral-950">
              Cleveland Legal Marketing &amp; Intake Research
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              href="/blog/cleveland-law-firm-intake-study-missed-calls"
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:bg-white hover:border-neutral-900/40 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                  Speed-to-Lead Benchmark
                </span>
                <h4 className="text-sm font-bold text-neutral-950 group-hover:text-neutral-900 leading-snug">
                  How Many Signed Cases Do Cleveland Solo Attorneys Lose to Missed Calls?
                </h4>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                  Empirical Cuyahoga County study on why 48% of after-hours inquiries are lost and how under-60s automated intake signs cases.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold text-neutral-900 flex items-center gap-1 group-hover:underline">
                Read Study →
              </span>
            </Link>

            <Link
              href="/blog/ohio-rule-7-3-ai-legal-intake-compliance"
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:bg-white hover:border-neutral-900/40 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-2">
                  Ohio Ethics &amp; AI Law
                </span>
                <h4 className="text-sm font-bold text-neutral-950 group-hover:text-neutral-900 leading-snug">
                  Ohio Rule of Professional Conduct 7.3 &amp; AI Legal Intake Compliance
                </h4>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                  How Cleveland and Ohio law firms can safely automate inbound SMS triage and consultation booking without bar discipline.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold text-neutral-900 flex items-center gap-1 group-hover:underline">
                Read Ethics Guide →
              </span>
            </Link>

            <Link
              href="/blog/cuyahoga-county-law-firm-seo-vs-ppc-roi"
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:bg-white hover:border-neutral-900/40 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-2">
                  Legal Economics &amp; ROI
                </span>
                <h4 className="text-sm font-bold text-neutral-950 group-hover:text-neutral-900 leading-snug">
                  Cuyahoga County Law Firm SEO vs. $300 PPC Clicks (2026 ROI)
                </h4>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                  Full math model comparing $6,000/mo Google Ads burn against $1,200/mo organic authority across PI and OVI practice areas.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold text-neutral-900 flex items-center gap-1 group-hover:underline">
                Read ROI Breakdown →
              </span>
            </Link>
          </div>
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
