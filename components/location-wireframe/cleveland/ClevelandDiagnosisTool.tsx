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
  ShieldAlert,
  Loader2,
  Check,
  Building,
} from "lucide-react";

interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

const DEFAULT_CHIPS = [
  "Traffic is low or not growing",
  "Low visibility on Google and AI",
  "Citations and mentions are not coming",
  "Not ranking in the Map Pack",
  "We target the wrong keywords",
  "Leads are not qualified",
  "Intake is slow or leaking",
];

const INITIAL_ITEMS: DiagnosticItem[] = [
  {
    n: "Leads are not qualified",
    why: "Pages attract non-actionable or out-of-jurisdiction traffic, phone numbers lack source attribution, and web forms don't screen case criteria in Cuyahoga County.",
    fix: "Case-type targeting with clear Ohio statutory filters, dynamic call tracking with Whisper screening, and automated lead scoring so only viable claims reach your attorneys.",
    tool: "Call Tracking & Lead Scoring Suite",
  },
  {
    n: "Not ranking in the Map Pack",
    why: "Missing or incorrect primary Google Business Profile categories, few recent reviews from local Cleveland clients, and weak proximity signals for downtown and suburban courts.",
    fix: "GBP category realignment, automated compliant client review collection flow, court corridor geofencing, and geo-grid localized tracking across Cuyahoga County.",
    tool: "Local Rank Grid & Review Suite",
  },
];

export default function ClevelandDiagnosisTool() {
  const [query, setQuery] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>(["Leads are not qualified", "Not ranking in the Map Pack"]);
  const [items, setItems] = useState<DiagnosticItem[]>(INITIAL_ITEMS);
  const [recommendation, setRecommendation] = useState(
    "Target Cuyahoga County high-intent procedural searches and win the Map Pack before increasing paid advertising spend."
  );
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  // 7-day trial form state
  const [trialName, setTrialName] = useState("");
  const [trialWebsite, setTrialWebsite] = useState("");
  const [trialEmail, setTrialEmail] = useState("");
  const [trialPhone, setTrialPhone] = useState("");
  const [submittingTrial, setSubmittingTrial] = useState(false);
  const [trialDone, setTrialDone] = useState(false);
  const [trialError, setTrialError] = useState("");

  const handleChipToggle = (chip: string) => {
    let next: string[];
    if (selectedChips.includes(chip)) {
      next = selectedChips.filter((c) => c !== chip);
    } else {
      next = [...selectedChips, chip];
    }
    setSelectedChips(next);
  };

  const handleDiagnose = async (customQuery?: string, chips?: string[]) => {
    const q = customQuery !== undefined ? customQuery : query;
    const c = chips !== undefined ? chips : selectedChips;

    if (!q.trim() && c.length === 0) {
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/diagnose-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q.trim(),
          selectedChips: c,
          city: "Cleveland",
          state: "Ohio",
          county: "Cuyahoga County",
        }),
      });

      if (!res.ok) throw new Error("Diagnosis engine offline");

      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setItems(data.items);
        if (data.recommendation) setRecommendation(data.recommendation);
        setIsAiGenerated(Boolean(data.isAiGenerated));
      }
    } catch (err) {
      console.warn("Diagnosis call failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail || !trialName) {
      setTrialError("Please enter your name and email.");
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
          notes: `7-Day Free Trial Request from Cleveland Wireframe. Query: ${query || "None"} | Chips: ${selectedChips.join(", ")}`,
          source: "cleveland-7day-trial",
        }),
      });

      if (res.ok) {
        setTrialDone(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setTrialError(data.error || "Could not register your trial. Please try again.");
      }
    } catch {
      setTrialError("Network error. Please try again.");
    } finally {
      setSubmittingTrial(false);
    }
  };

  return (
    <section id="diagnose" className="scroll-mt-20 border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-neutral-900 animate-pulse" />
            <span>Interactive Problem Diagnosis · Gemini 30-Key AI Pool</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
            Cleveland Law Firm SEO Diagnosis
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            <strong className="text-neutral-950">We are here for the solution because we can feel your pain.</strong>{" "}
            You are tired of traffic that never becomes signed cases, so skip the sales pitch: tell us what is going wrong, and our Gemini-powered engine will pinpoint the probable cause in Cuyahoga County and show exactly how we fix it.
          </p>
        </div>

        {/* Search input bar & Chip selector box with elevated styling */}
        <div className="mt-8 rounded-3xl border-2 border-slate-200/90 bg-gradient-to-b from-slate-50 to-white p-5 sm:p-8 shadow-lg shadow-slate-100 transition-all duration-300 hover:border-neutral-900/30 hover:shadow-xl hover:shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-neutral-900 transition-colors" />
              <input
                id="dg-q"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDiagnose();
                }}
                placeholder="e.g. We get traffic but no qualified leads, or PPC is too expensive in Cleveland"
                className="w-full rounded-2xl border-2 border-slate-300 bg-white pl-12 pr-4 py-4 text-base font-medium text-slate-900 placeholder-slate-400 shadow-inner focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 transition-all duration-200"
              />
            </div>

            <button
              onClick={() => handleDiagnose()}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-7 py-4 text-base font-bold text-white shadow-md shadow-sm hover:bg-neutral-800 hover:shadow-lg hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Diagnosing via Gemini AI...</span>
                </>
              ) : (
                <>
                  <span>Diagnose my problem</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          {/* Quick-select chips */}
          <div className="mt-5 pt-5 border-t border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-3">
              <span>Quick-select common Cleveland legal challenges:</span>
              <span className="text-slate-400 hidden sm:inline">Tap one or more chips to update diagnosis</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {DEFAULT_CHIPS.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    onClick={() => {
                      handleChipToggle(chip);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 text-white shadow-md shadow-slate-900/20 scale-[1.02] ring-2 ring-neutral-900/50"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 hover:scale-[1.01]"
                    }`}
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                    )}
                    <span>{chip}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Display */}
        {hasSearched && items.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                  What Is Happening & How We Fix It
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Tailored specifically for Cleveland law firms & Cuyahoga County courts
                </p>
              </div>

              {isAiGenerated ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold text-neutral-900 shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5 text-neutral-800 animate-pulse" />
                  <span>Live Gemini AI Intelligence Analysis</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  <Cpu className="h-3.5 w-3.5 text-slate-500" />
                  <span>Cleveland Rule-Based Diagnostic System</span>
                </div>
              )}
            </div>

            {/* Strategic Recommendation Callout with smooth glow */}
            {recommendation && (
              <div className="relative overflow-hidden rounded-2xl border-l-4 border-l-[#171717] border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-white p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Founder Takeaway · Mubashar Sharif, CEO
                    </h4>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-neutral-950 leading-relaxed">
                      "{recommendation}"
                    </p>
                  </div>
                </div>
              </div>
            )}

              {/* Diagnostic Cards Grid with animated hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-sm hover:border-neutral-900/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute inset-x-6 -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-mono font-bold text-neutral-900 group-hover:bg-slate-100 transition-colors">
                      <span>{item.n}</span>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-slate-500" />
                        <span>Technical Bottleneck</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        {item.why}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5 mb-1.5">
                        <Wrench className="h-3.5 w-3.5 text-neutral-800" />
                        <span>SearchPrex Strategic Fix</span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/60 font-medium">
                        {item.fix}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">Software stack:</span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-neutral-900 shadow-2xs">
                      {item.tool}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 7-DAY FREE TRIAL LEAD FORM CARD with glass & animated shine */}
            <div id="cleveland-trial" className="relative mt-10 scroll-mt-24 overflow-hidden rounded-3xl border-2 border-neutral-900/50 bg-neutral-900 p-6 sm:p-10 text-white shadow-2xl transition-all duration-300">
              
              {/* Subtle animated background radial glow */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-neutral-900/25 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-200 border border-white/15 mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-slate-300" />
                  <span>Complimentary Cleveland Legal Audit</span>
                </div>

                <h3 className="!text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Implementation Plan & 7-Day Trial
                </h3>

                <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                  Engineered around your firm's specific practice bottlenecks, plus call tracking and client intake tools to capture high-value inquiries.
                </p>

                {/* 2-Column deliverables breakdown */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="hover:bg-white/5 p-3 rounded-xl transition-colors">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-300" />
                      Included in the 7-day trial
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Full website, Google Business Profile, citation and AI visibility audit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Keyword and intent map for Cleveland and Cuyahoga County</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Quick-win technical and schema fixes initiated within the 7 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold">•</span>
                        <span>Transparent weekly report templates and live ranking verification</span>
                      </li>
                    </ul>
                  </div>

                  <div className="hover:bg-white/5 p-3 rounded-xl transition-colors">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-slate-400" />
                      Law firm tools (intake efficiency)
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>Call and form tracking with Whisper source attribution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>Instant missed-call text-back (never lose an urgent client)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>Intake form routing and automated lead scoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>Compliant client review collection and follow-up templates</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* No risk reassurance */}
                <p className="mt-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white">7 days free. No credit card required. No auto-charge.</strong> You retain the full audit findings regardless.
                </p>

                {/* Form or success state */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  {trialDone ? (
                    <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/50 p-6 text-center space-y-2 shadow-lg animate-in fade-in duration-300">
                      <CheckCircle2 className="h-10 w-10 text-slate-300 mx-auto" />
                      <h4 className="text-xl font-bold text-white">Trial Request Received!</h4>
                      <p className="text-sm text-slate-200 max-w-xl mx-auto">
                        Thank you. Mubashar Sharif (CEO) will personally review your Cleveland law firm URL and email your 7-day trial onboarding details within 1 business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            value={trialName}
                            onChange={(e) => setTrialName(e.target.value)}
                            placeholder="e.g. Attorney Jane Smith"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/30 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Firm Website *</label>
                          <input
                            type="text"
                            required
                            value={trialWebsite}
                            onChange={(e) => setTrialWebsite(e.target.value)}
                            placeholder="e.g. smithinjurycleveland.com"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/30 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={trialEmail}
                            onChange={(e) => setTrialEmail(e.target.value)}
                            placeholder="e.g. jane@smithinjurycleveland.com"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/30 transition-all"
                          />
                        </div>
                      </div>

                      {trialError && (
                        <p className="text-xs font-bold text-slate-300">{trialError}</p>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <button
                          type="submit"
                          disabled={submittingTrial}
                          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-extrabold px-8 py-4 text-base shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                        >
                          {submittingTrial ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin text-neutral-900" />
                              <span>Starting trial...</span>
                            </>
                          ) : (
                            <>
                              <span>Start 7-Day Free Trial</span>
                              <ArrowRight className="h-4 w-4 text-neutral-900 transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                          )}
                        </button>

                        <span className="text-xs text-slate-400">
                          100% Confidential. Never shared with competing Cleveland firms.
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
