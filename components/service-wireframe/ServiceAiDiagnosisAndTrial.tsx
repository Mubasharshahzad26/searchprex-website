"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ArrowRight, Loader2, Check } from "lucide-react";

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
        {/* Section Header (Top Pill Removed) + SearchPrex Care Representative Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
              {heading}
            </h2>

            {/* 45-60 Word Answer Capsule under H2 */}
            <p className="mt-4 rounded-xl border-l-4 border-l-neutral-950 border border-slate-200 bg-white p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed shadow-2xs">
              {answerCapsule}
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              <strong className="text-neutral-950">We know you are stressed — we have the solution.</strong>{" "}
              Type your exact SEO, ranking, or lead-generation challenge in the AI search bar below (or select the problem chips), and our diagnostic engine will identify the bottleneck and how we fix it.
            </p>
          </div>

          {/* Right Column: SearchPrex Care Representative Card (Clean Monochrome Badge) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-16/11 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/images/services/law-firm/searchprex-law-firm-care-representative.webp"
                  alt="SearchPrex Client Care & Legal Strategy Representative supporting solo attorneys and law firm partners with empathetic, revenue-focused SEO guidance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-md bg-white/95 backdrop-blur-md border border-slate-300 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-950 shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                  <span>SearchPrex Legal Client Care</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-white border-t border-slate-100 space-y-2">
                <p className="text-sm sm:text-base font-black text-neutral-950 leading-snug">
                  Dedicated Care for Solo Attorneys &amp; Law Firm Partners
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We treat your practice budget like our own — direct 1-on-1 support, weekly Monday call &amp; consultation reporting, and a 7-Day Free Trial so you feel supported from day one.
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-neutral-950">
                  <span>US Hours: Mon–Fri, 8 AM – 6 PM EST/CST/PST</span>
                  <span>$1,200 – $2,500 / mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Search Input Bar & Pain Chip Selector */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xs">
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
                className="w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 py-4 text-sm sm:text-base font-medium text-neutral-950 placeholder-slate-400 focus:border-neutral-950 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleDiagnose}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-7 py-4 text-sm sm:text-base font-bold text-white transition hover:bg-neutral-800 disabled:opacity-75 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  <span>Diagnosing via Gemini AI...</span>
                </>
              ) : (
                <>
                  <span>Diagnose My Problem</span>
                  <ArrowRight className="h-4 w-4 text-white" aria-hidden />
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
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-neutral-950 text-white shadow-2xs"
                        : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        isSelected ? "bg-white" : "bg-neutral-950"
                      }`}
                    />
                    <span>{chip}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Grid — Clean Black Numbering & Bullets */}
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
              <div className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-neutral-900">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                <span>{isAiGenerated ? "Live Gemini AI Analysis" : "Verified USA Diagnostic Engine"}</span>
              </div>
            </div>

            {recommendation ? (
              <div className="rounded-xl border-l-4 border-l-neutral-950 border border-slate-200 bg-white p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Founder Prescription &middot; Mubashar Sharif (5+ Years SEO Mastery)
                </p>
                <p className="mt-1 text-sm sm:text-base font-bold text-neutral-950 leading-relaxed">
                  &ldquo;{recommendation}&rdquo;
                </p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-black text-neutral-950">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-950 text-[10px] font-black text-white">
                        0{idx + 1}
                      </span>
                      <span>{item.n.replace(/^\d+\.\s*/, "")}</span>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                        <span>Why This Happens (The Problem)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        {item.why}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-950 flex items-center gap-2 mb-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                        <span>How We Solve It (The Solution)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-900 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 font-medium">
                        {item.fix}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Execution Stack:</span>
                    <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 font-bold text-neutral-950">
                      {item.tool}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL — CLEAN LIGHT BLUE / WHITE BACKGROUND */}
        <div
          id="7-day-trial"
          className="mt-12 overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/85 via-white to-blue-50/60 p-6 sm:p-10 text-neutral-950 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-950 border border-slate-300 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Limited-Time Offer &middot; 7-Day Free Trial (No Credit Card Required)</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Direct Founder Execution &middot; Weekly Reporting
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950">
            Tell Us What You Are Looking For &amp; Test Our Law Firm SEO With a 7-Day Free Trial
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Do not get locked into another blind retainer. Come forward and test our engineering, local market precision, and direct communication for 7 days free—you keep the complete audit, keyword roadmap, and initial quick-win fixes regardless.
          </p>

          {/* 4-Step "How Our 7-Day Free Trial & First 90 Days Work" Process Strip */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                num: "01",
                phase: "Days 1–2",
                title: "Technical, YMYL & GBP Audit",
                desc: "40-point crawl, ABA Rule 7.1 check, primary GBP category review & county competitor gap analysis.",
              },
              {
                num: "02",
                phase: "Days 3–5",
                title: "Live Quick-Win Fixes & Schema",
                desc: "We draft your 45–60 word AI Overview Answer Capsule and prepare LegalService & Attorney JSON-LD.",
              },
              {
                num: "03",
                phase: "Day 7",
                title: "1-on-1 Review with Founder",
                desc: "Walk through every finding and 90-day caseload roadmap live with Mubashar Sharif before paying $0.",
              },
              {
                num: "04",
                phase: "Days 8–90",
                title: "Practice Silos & Map Pack Top 3",
                desc: "Full county-court practice page deployment, State Bar citation sync, and weekly Monday call reports.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-950 text-[11px] font-black text-white">
                      {step.num}
                    </span>
                    <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-950">
                      {step.phase}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-neutral-950 leading-snug">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 2-Column 7-Day Trial Deliverables — Clean White Cards with Black Numbering & Bullets */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xs">
            <div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-950 mb-3 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-950 text-[10px] font-black text-white">
                  01
                </span>
                <span>What We Deliver During Your 7-Day Free Trial</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {trialDeliverablesLeft.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-1.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-950 mb-3 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-950 text-[10px] font-black text-white">
                  02
                </span>
                <span>Revenue, Lead &amp; AI Visibility Systems Included</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {trialDeliverablesRight.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-1.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive "Tell Us What You Are Looking For" Form — Clean Light Inputs */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            {trialDone ? (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 text-center space-y-2 shadow-2xs">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white font-black">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <h4 className="text-xl font-black text-neutral-950">
                  7-Day Free Trial &amp; Custom Solution Request Received
                </h4>
                <p className="text-sm text-slate-600 max-w-xl mx-auto">
                  Thank you. Mubashar Sharif (Founder) will personally review your website, target US market ({targetMarket}), and selected priorities, and send your 24-hour tear-down + 7-day trial onboarding plan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Step 1: Select What You Are Looking For */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-950 mb-2.5">
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
                          className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                            active
                              ? "bg-neutral-950 text-white shadow-2xs"
                              : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              active ? "bg-white" : "bg-neutral-950"
                            }`}
                          />
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Target US Market & Custom Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`market-${serviceType}`} className="block text-xs font-bold text-neutral-950 mb-1.5">
                      {serviceType === "law-firm-seo"
                        ? "2. Your Target USA State / City Market"
                        : "2. Your USA Market Scope"}
                    </label>
                    <select
                      id={`market-${serviceType}`}
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-neutral-950 focus:border-neutral-950 focus:outline-none"
                    >
                      {marketOptions.map((m) => (
                        <option key={m} value={m} className="bg-white text-neutral-950">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`need-${serviceType}`} className="block text-xs font-bold text-neutral-950 mb-1.5">
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
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-neutral-950 placeholder-slate-400 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Step 3: Contact & Website Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-950 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={trialName}
                      onChange={(e) => setTrialName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-neutral-950 placeholder-slate-400 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-950 mb-1">Website URL *</label>
                    <input
                      type="text"
                      required
                      value={trialWebsite}
                      onChange={(e) => setTrialWebsite(e.target.value)}
                      placeholder="yourwebsite.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-neutral-950 placeholder-slate-400 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-950 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-neutral-950 placeholder-slate-400 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-950 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={trialPhone}
                      onChange={(e) => setTrialPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-neutral-950 placeholder-slate-400 focus:border-neutral-950 focus:outline-none"
                    />
                  </div>
                </div>

                {trialError ? (
                  <p className="text-xs font-bold text-red-600">{trialError}</p>
                ) : null}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submittingTrial}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-8 py-4 text-sm sm:text-base font-black text-white transition hover:bg-neutral-800 disabled:opacity-70 cursor-pointer shadow-xs"
                  >
                    {submittingTrial ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Claim My 7-Day Free Trial &amp; Written Plan</span>
                        <ArrowRight className="h-4 w-4 text-white" aria-hidden />
                      </>
                    )}
                  </button>

                  <span className="text-xs font-medium text-slate-600">
                    7 days free &middot; Zero obligation &middot; Reply from Mubashar Sharif within 24 hours
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
