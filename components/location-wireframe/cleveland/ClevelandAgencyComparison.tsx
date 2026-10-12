"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Scale,
  Building,
  UserCheck,
  ChevronDown,
} from "lucide-react";

const AGENCY_TYPES = [
  {
    title: "National 'Big-Box' Legal Agencies",
    sub: "e.g. Scorpion, FindLaw, Justia",
    fee: "$4,000 – $9,000 / mo",
    contract: "12 to 24-Month Rigid Lock-in",
    pros: ["High name recognition", "Established directory platforms"],
    cons: [
      "Handed to junior out-of-state account managers managing 40+ firms",
      "Confidential Ohio BWC & Cuyahoga court rules replaced by generic national templates",
      "Proprietary platforms: if you leave, they often keep your website & assets",
      "High cost per signed case due to massive corporate overhead",
    ],
    bestFor: "Mega-firms with \$50k/mo budgets that just want brand placement.",
    searchprexDiff: "SearchPrex gives you month-to-month freedom, 100% asset ownership, and direct CEO oversight.",
    recommended: false,
  },
  {
    title: "Generalist Web Agencies & Freelancers",
    sub: "Local Cleveland web designers & ad agencies",
    fee: "$800 – $1,800 / mo",
    contract: "Month-to-month or project-based",
    pros: ["Affordable entry price", "Quick design turnaround"],
    cons: [
      "Zero specialized legal expertise: they treat law firms like bakeries or roofing companies",
      "Dangerous Ohio MRPC Rule 7 ethics oversights (misleading claims, improper specialist titles)",
      "No programmatic Cuyahoga County court silo architecture",
      "Zero knowledge of Google AI Overviews (GEO/AEO) or legal citation authority networks",
    ],
    bestFor: "Solo practitioners needing a basic 5-page digital business card.",
    searchprexDiff: "SearchPrex builds deep legal topical authority aligned with Ohio legal ethics standards.",
    recommended: false,
  },
  {
    title: "SearchPrex Legal SEO",
    sub: "Founder-Led Cuyahoga County Law Firm SEO",
    fee: "$1,500 – $5,000 / mo",
    contract: "Month-to-Month · No Long-Term Lock-in",
    pros: [
      "Direct CEO engagement: Mubashar Sharif personally audits and directs your technical roadmap",
      "Engineered specifically for Cuyahoga County & Ohio legal search (BWC, Common Pleas, OVI)",
      "Full Whisper call tracking & transparent monthly signed case ledger",
      "Pioneering AI Search (Google AI Overviews & ChatGPT) citation engineering",
      "You own 100% of your code, content, citations, and data forever",
    ],
    cons: ["Selective client onboarding: we only partner with 1–2 firms per practice area per submarket"],
    bestFor: "Ambitious solo, boutique, and mid-sized Cleveland law firms that demand measurable signed cases.",
    searchprexDiff: "The ideal balance of enterprise-grade technical firepower and personal CEO accountability.",
    recommended: true,
  },
];

const VETTING_QUESTIONS = [
  {
    q: "Will I have direct access to the strategist doing the actual work, or an account manager?",
    why: "At big agencies, you speak to an account manager who passes notes to an offshore team. At SearchPrex, CEO Mubashar Sharif reviews your site and talks to you directly.",
  },
  {
    q: "If I cancel our agreement, do I own my website code, content, and local citations?",
    why: "Many agencies build on proprietary CMS platforms where canceling means starting from zero. With SearchPrex, you own every single asset permanently.",
  },
  {
    q: "How do you distinguish Ohio workers' comp (BWC) from typical private insurance states?",
    why: "If an agency doesn't know Ohio operates a state-fund monopoly via the BWC and Industrial Commission, they cannot write ranking content for injured workers.",
  },
  {
    q: "Do you tie your reporting to inbound phone calls and signed cases, or just keyword rankings?",
    why: "Rankings for low-intent search terms don't pay partner draws. Look for Whisper call tracking and dynamic case ledger attribution.",
  },
];

export default function ClevelandAgencyComparison() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleQuestion = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="agency-comparison" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Scale className="h-4 w-4" />
            <span>Cleveland SEO Agency Decision Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Choosing an SEO Agency in Cleveland
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Managing partners in Cuyahoga County receive multiple marketing pitches each week. Evaluating options can feel overwhelming when everyone promises "Page 1 on Google." Explore our proven{" "}
            <Link href="/services/law-firm-seo" className="font-semibold text-neutral-900 underline hover:text-neutral-950">
              law firm SEO methodology
            </Link>{" "}
            or use this objective breakdown to make an informed decision for your firm.
          </p>
        </div>

        {/* 3-Column Agency Comparison Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {AGENCY_TYPES.map((agency, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 transition-all duration-300 p-6 sm:p-8 ${
                agency.recommended
                  ? "border-neutral-900 bg-gradient-to-b from-slate-50/40 via-white to-white shadow-2xl shadow-sm hover:-translate-y-2"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {agency.recommended && (
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-[#171717] to-[#262626] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-slate-200 animate-pulse" />
                  <span>Recommended for Cleveland Firms</span>
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Option 0{idx + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
                  {agency.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {agency.sub}
                </p>

                {/* Retainer & Commitment Box */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Typical Retainer:</span>
                    <span className="font-extrabold text-neutral-950">{agency.fee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Contract Length:</span>
                    <span className="font-bold text-slate-700">{agency.contract}</span>
                  </div>
                </div>

                {/* Pros */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
                    The Advantages:
                  </span>
                  {agency.pros.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="h-4 w-4 text-neutral-800 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    The Risks & Limitations:
                  </span>
                  {agency.cons.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <X className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Recommendation Summary */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-3">
                  <strong className="text-slate-700">Best for:</strong> {agency.bestFor}
                </p>

                {agency.recommended ? (
                  <a
                    href="#reality-check"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 text-sm font-bold shadow-md shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    <span>Request 24h Reality Check</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center text-xs font-semibold text-slate-600">
                    High Overhead / Low Specialization Risk
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Essential Questions to Ask Any Agency */}
        <div className="mt-16 rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
              Attorney Vetting Guide
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
              4 Questions to Ask Any SEO Agency Before You Sign
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Protect your firm's budget and brand reputation by testing any sales pitch against these questions:
            </p>
          </div>

          <div className="space-y-3">
            {VETTING_QUESTIONS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-neutral-900/40"
                >
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-950 pr-4">
                      {idx + 1}. {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-900 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 sm:px-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                      <strong className="text-neutral-950">Why this matters:</strong> {item.why}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Callout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 text-sm text-slate-700">
          <p>
            Ready to review empirical client results? Explore our{" "}
            <Link href="/case-studies" className="font-bold text-neutral-900 underline hover:text-neutral-950">
              verified law firm SEO case studies
            </Link>{" "}
            or claim a complimentary{" "}
            <Link href="/free-audit" className="font-bold text-neutral-900 underline hover:text-neutral-950">
              technical SEO audit
            </Link>.
          </p>
          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center gap-1.5 font-bold text-neutral-900 hover:text-neutral-950"
          >
            <span>Read Case Studies</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
