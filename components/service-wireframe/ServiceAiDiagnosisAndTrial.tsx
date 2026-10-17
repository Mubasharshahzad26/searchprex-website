"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Cpu,
  ArrowRight,
  Loader2,
  Check,
  ShieldCheck,
  Clock,
} from "lucide-react";

export interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

interface ServiceAiDiagnosisAndTrialProps {
  serviceType: "law-firm-seo" | "ecommerce-seo" | "local-seo" | "technical-seo";
  heading: string;
  answerCapsule: string;
  placeholder: string;
  painChips: string[];
  lookingForOptions: string[];
  initialItems: DiagnosticItem[];
  initialRecommendation: string;
  trialDeliverablesLeft: string[];
  trialDeliverablesRight: string[];
}

const LAW_FIRM_US_MARKET_OPTIONS = [
  "Cleveland, Ohio (OH)",
  "Sugar Land, Texas (TX)",
  "The Woodlands, Texas (TX)",
  "Katy / Plano / Denton, Texas (TX)",
  "Detroit / Grand Rapids, Michigan (MI)",
  "Philadelphia, Pennsylvania (PA)",
  "Tempe / Scottsdale, Arizona (AZ)",
  "San Jose, California (CA)",
  "Baton Rouge / Shreveport, Louisiana (LA)",
  "Albuquerque, New Mexico (NM)",
  "Wichita / Overland Park / Kansas City (KS)",
  "Other US State / City (Law Firm SEO)",
];

const GENERAL_USA_SCOPE_OPTIONS = [
  "United States — Nationwide (All 50 States)",
  "United States — Single-Metro Local Market",
  "United States — Multi-Location / Regional Brand",
  "United States — Direct-to-Consumer (DTC) / Online Catalog",
];

export default function ServiceAiDiagnosisAndTrial({
  serviceType,
  heading,
  answerCapsule,
  placeholder,
  painChips,
  lookingForOptions,
  initialItems,
  initialRecommendation,
  trialDeliverablesLeft,
  trialDeliverablesRight,
}: ServiceAiDiagnosisAndTrialProps) {
  const marketOptions =
    serviceType === "law-firm-seo" ? LAW_FIRM_US_MARKET_OPTIONS : GENERAL_USA_SCOPE_OPTIONS;
  const [query, setQuery] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>(painChips.slice(0, 2));
  const [items, setItems] = useState<DiagnosticItem[]>(initialItems);
  const [recommendation, setRecommendation] = useState(initialRecommendation);
  const [loading, setLoading] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  // "Tell Us What You Are Looking For" + 7-Day Free Trial Form State
  const [selectedGoals, setSelectedGoals] = useState<string[]>(lookingForOptions.slice(0, 2));
  const [targetMarket, setTargetMarket] = useState(marketOptions[0]);
  const [trialName, setTrialName] = useState("");
  const [trialWebsite, setTrialWebsite] = useState("");
  const [trialEmail, setTrialEmail] = useState("");
  const [trialPhone, setTrialPhone] = useState("");
  const [customNeed, setCustomNeed] = useState("");
  const [submittingTrial, setSubmittingTrial] = useState(false);
  const [trialDone, setTrialDone] = useState(false);
  const [trialError, setTrialError] = useState("");

  const handleChipToggle = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleDiagnose = async () => {
    if (!query.trim() && selectedChips.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/diagnose-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          query: query.trim(),
          selectedChips,
        }),
      });
      if (!res.ok) throw new Error("Diagnosis request failed");
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setItems(data.items);
        if (data.recommendation) setRecommendation(data.recommendation);
        setIsAiGenerated(Boolean(data.isAiGenerated));
      }
    } catch (err) {
      console.warn("Diagnosis fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail || !trialName) {
      setTrialError("Please enter your name and work email.");
      return;
    }

    setSubmittingTrial(true);
    setTrialError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trialName,
          email: trialEmail,
          website: trialWebsite,
          phone: trialPhone,
          notes: `7-Day Free Trial & Custom Solution Request (${serviceType}). US Market: ${targetMarket} | Looking For: ${selectedGoals.join(", ")} | Custom Need: ${customNeed || "None"} | AI Query: ${query || "None"} | Pain Chips: ${selectedChips.join(", ")}`,
          source: `${serviceType}-7day-trial`,
        }),
      });

      if (res.ok) {
        setTrialDone(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setTrialError(data.error || "Could not submit your request. Please try again.");
      }
    } catch {
      setTrialError("Network error. Please try again.");
    } finally {
      setSubmittingTrial(false);
    }
  };

  return (
    <section id="diagnose" className="scroll-mt-20 border-b border-slate-200 bg-slate-50 py-16 sm:py-24 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + 45-60 Word AI Overview Answer Capsule */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-neutral-900" aria-hidden />
            <span>Interactive AI Search &amp; Problem Diagnosis · Gemini 30-Key AI Pool</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            {heading}
          </h2>

          {/* 45-60 Word Answer Capsule under H2 */}
          <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-white p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed shadow-2xs">
            {answerCapsule}
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong className="text-neutral-950">We know you are stressed — we have the solution.</strong>{" "}
            Type your exact SEO, ranking, or lead-generation challenge in the AI search bar below (or select the problem chips), and our diagnostic engine will identify the bottleneck and how we fix it.
          </p>
        </div>

        {/* AI Search Input Bar & Pain Chip Selector */}
        <div className="mt-8 rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDiagnose();
                }}
                placeholder={placeholder}
                aria-label="Describe your SEO or lead generation challenge"
                className="w-full rounded-2xl border-2 border-slate-300 bg-white pl-12 pr-4 py-4 text-sm sm:text-base font-medium text-neutral-950 placeholder-slate-400 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleDiagnose}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-7 py-4 text-sm sm:text-base font-bold text-white transition hover:bg-neutral-800 disabled:opacity-75 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  <span>Diagnosing via Gemini AI...</span>
                </>
              ) : (
                <>
                  <span>Diagnose My Problem</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          </div>

          {/* Quick-Select Pain Chips */}
          <div className="mt-5 pt-5 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-3">
              <span>Select the challenges hurting your growth right now:</span>
              <span className="text-slate-400 hidden sm:inline">Click chips + Diagnose to customize</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {painChips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    type="button"
                    key={chip}
                    onClick={() => handleChipToggle(chip)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 text-slate-300 shrink-0" aria-hidden />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                    )}
                    <span>{chip}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Grid */}
        {items.length > 0 ? (
          <div className="mt-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                  Root Cause Diagnosis &amp; SearchPrex Engineering Fix
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Problem-solution architecture tailored for USA search markets and AI answer engines
                </p>
              </div>
              {isAiGenerated ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-1 text-xs font-bold text-neutral-900">
                  <Sparkles className="h-3.5 w-3.5 text-neutral-900" aria-hidden />
                  <span>Live Gemini AI Analysis</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                  <Cpu className="h-3.5 w-3.5 text-slate-600" aria-hidden />
                  <span>Verified USA Diagnostic Engine</span>
                </div>
              )}
            </div>

            {recommendation ? (
              <div className="rounded-2xl border-l-4 border-l-neutral-900 border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-neutral-900 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Founder Prescription · Mubashar Sharif (5+ Years SEO Mastery)
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-bold text-neutral-950 leading-relaxed">
                      &ldquo;{recommendation}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-neutral-950">
                      <span>{item.n}</span>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-slate-600" aria-hidden />
                        <span>Why This Happens (The Problem)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        {item.why}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-950 flex items-center gap-1.5 mb-1.5">
                        <Wrench className="h-3.5 w-3.5 text-neutral-900" aria-hidden />
                        <span>How We Solve It (The Solution)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-900 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 font-medium">
                        {item.fix}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Execution Stack:</span>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 font-bold text-neutral-900">
                      {item.tool}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL (LIMITED-TIME OFFER) FORM */}
        <div
          id="7-day-trial"
          className="mt-12 overflow-hidden rounded-3xl border-2 border-neutral-900 bg-neutral-950 p-6 sm:p-10 text-white shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              <Clock className="h-3.5 w-3.5 text-slate-300" aria-hidden />
              <span>Limited-Time Offer · 7-Day Free Trial (No Credit Card Required)</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Direct Founder Execution · Weekly Reporting
            </span>
          </div>

          <h3 className="!text-white text-2xl sm:text-3xl font-black tracking-tight">
            Tell Us What You Are Looking For &amp; Test Us With a 7-Day Free Trial
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Do not get locked into another blind retainer. Come forward and test our engineering, local market precision, and direct communication for 7 days free—you keep the complete audit, keyword roadmap, and initial quick-win fixes regardless.
          </p>

          {/* 2-Column 7-Day Trial Deliverables */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-white/5 border border-white/10 p-5 sm:p-6">
            <div>
              <h4 className="!text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-slate-300" aria-hidden />
                <span>What We Deliver During Your 7-Day Free Trial</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {trialDeliverablesLeft.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-white">&bull;</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="!text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-slate-300" aria-hidden />
                <span>Revenue, Lead &amp; AI Visibility Systems Included</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {trialDeliverablesRight.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-white">&bull;</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive "Tell Us What You Are Looking For" Form */}
          <div className="mt-8 pt-6 border-t border-white/15">
            {trialDone ? (
              <div className="rounded-2xl bg-white/10 border border-white/20 p-6 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-white mx-auto" aria-hidden />
                <h4 className="!text-white text-xl font-black">
                  7-Day Free Trial &amp; Custom Solution Request Received
                </h4>
                <p className="text-sm text-slate-200 max-w-xl mx-auto">
                  Thank you. Mubashar Sharif (Founder) will personally review your website, target US market ({targetMarket}), and selected priorities, and send your 24-hour tear-down + 7-day trial onboarding plan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Step 1: Select What You Are Looking For */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                    1. Tell Us What You Are Looking For (Select All That Apply):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {lookingForOptions.map((opt) => {
                      const active = selectedGoals.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handleGoalToggle(opt)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                            active
                              ? "bg-white text-neutral-950 shadow-sm"
                              : "border border-white/20 bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {active ? <Check className="h-3.5 w-3.5 text-neutral-950" aria-hidden /> : null}
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Target US Market & Custom Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`market-${serviceType}`} className="block text-xs font-bold text-slate-200 mb-1.5">
                      {serviceType === "law-firm-seo"
                        ? "2. Your Target USA State / City Market"
                        : "2. Your USA Market Scope"}
                    </label>
                    <select
                      id={`market-${serviceType}`}
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-neutral-900 px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
                    >
                      {marketOptions.map((m) => (
                        <option key={m} value={m} className="bg-neutral-900 text-white">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`need-${serviceType}`} className="block text-xs font-bold text-slate-200 mb-1.5">
                      Specific Goal or Challenge (Optional)
                    </label>
                    <input
                      id={`need-${serviceType}`}
                      type="text"
                      value={customNeed}
                      onChange={(e) => setCustomNeed(e.target.value)}
                      placeholder={
                        serviceType === "law-firm-seo"
                          ? "e.g. Need more Family Law / Criminal Defense / PI calls in Cleveland or Sugar Land"
                          : "e.g. Need more indexed pages, Map Pack calls, or organic revenue in the USA"
                      }
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Step 3: Contact & Website Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={trialName}
                      onChange={(e) => setTrialName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Website URL *</label>
                    <input
                      type="text"
                      required
                      value={trialWebsite}
                      onChange={(e) => setTrialWebsite(e.target.value)}
                      placeholder="yourwebsite.com"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={trialPhone}
                      onChange={(e) => setTrialPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {trialError ? (
                  <p className="text-xs font-bold text-amber-300">{trialError}</p>
                ) : null}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submittingTrial}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm sm:text-base font-black text-neutral-950 transition hover:bg-slate-100 disabled:opacity-70 cursor-pointer"
                  >
                    {submittingTrial ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-neutral-900" aria-hidden />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Claim My 7-Day Free Trial &amp; Written Plan</span>
                        <ArrowRight className="h-4 w-4 text-neutral-950" aria-hidden />
                      </>
                    )}
                  </button>

                  <span className="text-xs text-slate-300">
                    7 days free · Zero obligation · Reply from Mubashar Sharif within 24 hours
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
