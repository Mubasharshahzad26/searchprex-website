"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Lock,
} from "lucide-react";
import DentonPainBanner from "./DentonPainBanner";

export default function DentonFaqAndCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form state
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [practiceArea, setPracticeArea] = useState("Criminal defense");
  const [startPreference, setStartPreference] = useState("24-hour site review");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const practiceAreas = [
    "Criminal defense",
    "Family law",
    "Injury",
    "Landlord-tenant",
    "Other",
  ];

  const startPreferences = ["30-minute call", "24-hour site review"];

  const faqs = [
    {
      q: "How does the 90-day money-back guarantee work?",
      a: "We agree on specific baseline milestones in writing before work begins. If agreed visibility and technical milestones are not achieved by Day 90, we refund your monthly management fees in full. It is not an arbitrary keyword promise because Google controls its algorithm, but a real, contractually documented guarantee on deliverables, technical indexing, and local visibility progress.",
    },
    {
      q: "I was burned by an agency before. Why is this different?",
      a: "You deal directly with me, Founder Mubashar Sharif, not a junior account manager. You get structured weekly Monday progress updates, full transparency into crawl and ranking data, 100% ownership of all published content and assets, and our 90-day milestone guarantee.",
    },
    {
      q: "Is it really affordable for a solo or boutique Denton firm?",
      a: "Plans start at $900 per month. In Denton County, a single retained criminal defense matter ($2,500–$5,000) or contested divorce case ($5,000–$15,000) easily covers many months of service. There are zero long-term contracts; everything operates on simple month-to-month terms.",
    },
    {
      q: "Do I have to stop running our Google Ads?",
      a: "No. We run organic and Local Map Pack SEO alongside your existing paid campaigns. We only suggest trimming ad spend once your organic call volume and retainer pipeline reliably replace costly pay-per-click traffic.",
    },
    {
      q: "Will our firm appear in ChatGPT, Perplexity, and Google AI Overviews?",
      a: "We maximize AI citation probability by engineering authoritative legal schemas, local Denton entity references (Denton County courts, UNT/TWU jurisdiction, local ordinances), and clean topical silos. We actively monitor your AI citation frequency across search platforms.",
    },
    {
      q: "Why do Dallas and Fort Worth firms rank above local Denton lawyers?",
      a: "DFW mega-firms often rank on broad legacy domain authority, but they lack hyper-local Denton County content. When we build topical authority around Denton courts, judges, student diversion programs, and local filing procedures, local algorithms favor your authentic Denton presence.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      {/* 24-Hour Review Intake Form */}
      <section id="review-intake" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Reassurance */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>No Pressure · Founder-Led Audit</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
                Let&apos;s talk. I&apos;ll review your Denton firm&apos;s site within 24 hours.
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Send your website URL and I will personally analyze what is holding your firm back in Denton County and what to fix first. No sales reps, no automated PDF pitch, and zero high-pressure follow-up.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    Your Local 3-Pack and Google AI Overview visibility gaps
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    Exact analysis of DFW firms outranking you in Denton County
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1a7d59] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-semibold text-slate-800">
                    A realistic roadmap sized to your firm&apos;s caseload goals
                  </span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Confidential review. Your inquiries are never shared with competing Denton attorneys.</span>
              </div>
            </div>

            {/* Right Column: Direct Intake Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg relative">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#0a0f2e] tracking-tight mb-1">
                        Request Your 24-Hour Review
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Direct analysis by Mubashar Sharif, CEO &amp; Principal Strategist.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Attorney Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Firm Website
                      </label>
                      <input
                        type="text"
                        required
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="e.g. dentondefensefirm.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Direct Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@yourfirm.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Primary Practice Area
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {practiceAreas.map((pa) => (
                          <button
                            key={pa}
                            type="button"
                            onClick={() => setPracticeArea(pa)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              practiceArea === pa
                                ? "bg-[#534AB7] text-white border-[#534AB7]"
                                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {pa}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        How would you like to start?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {startPreferences.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setStartPreference(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              startPreference === opt
                                ? "bg-[#1a7d59] text-white border-[#1a7d59]"
                                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-6 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>{submitting ? "Analyzing..." : "Send My Review Request"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-[11px] text-slate-500 text-center">
                      Strictly confidential · Never shared with other law firms · Zero spam guarantee
                    </p>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0a0f2e]">
                      Thank you, {name || "Counsel"}.
                    </h3>
                    <p className="text-sm text-slate-700 max-w-md mx-auto">
                      I have received your website ({website}). I will personally conduct your crawl-level review and reach out within 1 business day via {email}.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs text-[#534AB7] font-bold hover:underline"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions Denton Attorneys Ask Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
              Clear, Direct Answers for Denton Legal Practitioners
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Straight answers regarding guarantees, pricing, local DFW competition, and AI search visibility.
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

      {/* Contextual Resource Links Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Explore Related Legal SEO Resources &amp; Locations
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-700">
            <Link
              href="/locations/texas"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              All Texas Cities
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Every State &amp; City We Cover
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/resources/law-firm-seo-audit-checklist"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Free Law Firm SEO Checklist
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/resources/news/local-seo-updates"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Local SEO News &amp; Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-[#534AB7] via-[#3C3489] to-[#0a0f2e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEEDFE] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Exclusivity Guaranteed · One Law Firm Per Practice Area</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            You Don&apos;t Have to Carry This Alone.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-8">
            Talk directly to Mubashar Sharif. The initial crawl-level website review is completely free, with zero automated sales pressure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#review-intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0a0f2e] font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Talk to Me Directly</span>
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
              90-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Solution / Pain Band */}
      <DentonPainBanner id="painband-bottom" variant="bottom" />
    </>
  );
}
