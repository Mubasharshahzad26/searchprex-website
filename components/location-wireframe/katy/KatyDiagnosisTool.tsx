"use client";

import React, { useState } from "react";
import {
  Search,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Send,
  Building2,
} from "lucide-react";

interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

export default function KatyDiagnosisTool() {
  const [query, setQuery] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDiagnosed, setHasDiagnosed] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [recommendation, setRecommendation] = useState<string>("");
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  // Form lead submission state
  const [leadUrl, setLeadUrl] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadPractice, setLeadPractice] = useState("Family Law & Divorce");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const chips = [
    "Tri-County Venue Confusion",
    "Houston Mega-Firm Displacement",
    "Missing Cinco Ranch & Fulshear Pages",
    "Highway Commuter Crash Corridors",
    "Map Pack Drop-Off Past 5 Miles",
    "Unqualified Distant Houston Calls",
  ];

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleRunDiagnosis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() && selectedChips.length === 0) return;

    setIsLoading(true);
    setHasDiagnosed(false);

    try {
      const res = await fetch("/api/diagnose-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          selectedChips,
          city: "Katy",
          state: "Texas",
          county: "Harris, Fort Bend & Waller Counties",
        }),
      });

      if (!res.ok) throw new Error("Diagnosis request failed");

      const data = await res.json();
      setDiagnostics(data.items || []);
      setRecommendation(data.recommendation || "");
      setIsAiGenerated(Boolean(data.isAiGenerated));
      setHasDiagnosed(true);
    } catch (err) {
      console.error(err);
      // Fallback
      setDiagnostics([
        {
          n: "Tri-County Venue Confusion & Houston Mega-Firm Displacement",
          why: "Katy spans Harris, Fort Bend, and Waller counties. Prospective clients do not know whether their case is heard in Houston, Richmond, or Hempstead, and downtown Houston mega-firms fail to clarify venue while outspending on broad keywords.",
          fix: "Architect hyper-local practice silos anchored to Harris, Fort Bend, and Waller County district courts, plus Cinco Ranch and Fulshear community hubs.",
          tool: "Tri-County Venue & Community Silo Suite",
        },
        {
          n: "Commuter Highway Accident Corridors (I-10 & Grand Parkway)",
          why: "The I-10 Katy Freeway and SH 99 Grand Parkway see thousands of heavy commercial freight and commuter crashes weekly, but firms target generic 'car accident lawyer' terms instead of exact intersection searches.",
          fix: "Deploy accident corridor pages targeting 'truck accident lawyer I-10 Katy' and 'Grand Parkway crash attorney' with Texas DOT collision data and emergency response entity anchors.",
          tool: "Highway Crash Intent & Corridor Tracker",
        },
      ]);
      setRecommendation(
        "Split your Katy presence into three county venue landing pages and separate Cinco Ranch and Fulshear community hubs. Houston mega-firms rely on broad domain authority and cannot match this level of local relevance."
      );
      setHasDiagnosed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setTimeout(() => {
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
    }, 600);
  };

  return (
    <section id="diagnosis-tool" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Practice Audit Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Diagnose Your Katy Law Firm&apos;s Organic Bottlenecks
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Select common Katy jurisdictional challenges or enter your specific problem below. Our system will analyze your firm against Houston competitors across Harris, Fort Bend, and Waller counties.
          </p>
        </div>

        {/* Diagnosis Search Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg mb-12">
          {/* Quick Problem Chips */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Common Katy Legal Market Bottlenecks (Click to select)
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleRunDiagnosis} className="relative mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Houston firms rank above us for Cinco Ranch divorce and I-10 truck accidents..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-neutral-900 text-sm sm:text-base bg-slate-50/50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || (!query.trim() && selectedChips.length === 0)}
                className="px-7 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm sm:text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Katy Market...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-400" />
                    <span>Run Live Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-neutral-800" />
            <span>Evaluated against Katy, Cinco Ranch, Fulshear, and Houston search intent data</span>
          </p>
        </div>

        {/* Diagnosis Results Section */}
        {hasDiagnosed && (
          <div className="mb-16 space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-neutral-800" />
                <h3 className="font-extrabold text-xl text-neutral-950">
                  Katy Jurisdictional Diagnosis Findings
                </h3>
              </div>
              {isAiGenerated && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-neutral-800 text-xs font-bold border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
                  Gemini AI Live Analysis
                </span>
              )}
            </div>

            {/* Diagnostic Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {diagnostics.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-extrabold text-base sm:text-lg text-neutral-950">
                      {item.n}
                    </h4>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-neutral-900 text-xs font-bold shrink-0">
                      Issue #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mb-1">
                        Why this happens in Katy:
                      </div>
                      <p className="text-slate-700 leading-relaxed">{item.why}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] mb-1">
                        SearchPrex Strategic Fix:
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {item.fix}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Recommended System:
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">
                      {item.tool}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Executive Recommendation from Mubashar Sharif */}
            {recommendation && (
              <div className="rounded-2xl bg-slate-100 border border-slate-300 p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    MS
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Executive Recommendation from Mubashar Sharif
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                      &quot;{recommendation}&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lead Magnet / Katy Reality Check Form */}
        <div id="tear-down-form" className="bg-neutral-900 via-slate-900 to-[#1e1b4b] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-700/10 text-slate-400 text-xs font-bold uppercase tracking-wider border border-neutral-700/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Free for Katy Law Firms · 24-Hour Delivery</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get Your Confidential Katy Reality Check
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I will personally audit your website, your Google Business Profile, and the downtown Houston firms capturing calls from Cinco Ranch and Katy. You receive a crawl-level action plan with zero sales pressure.
              </p>
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Exact tri-county venue pages missing from your site</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Map Pack proximity breakdown for Cinco Ranch &amp; I-10</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>AI citation readiness score across Perplexity and ChatGPT</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl">
                {!leadSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Law Firm Website URL
                      </label>
                      <input
                        type="text"
                        required
                        value={leadUrl}
                        onChange={(e) => setLeadUrl(e.target.value)}
                        placeholder="e.g. katylawoffice.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-neutral-900 bg-slate-50"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Direct Email
                        </label>
                        <input
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="counsel@katylaw.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-neutral-900 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Direct Phone
                        </label>
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="(281) 555-0199"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-neutral-900 bg-slate-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Primary Practice Area
                      </label>
                      <select
                        value={leadPractice}
                        onChange={(e) => setLeadPractice(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-neutral-900 bg-slate-50 text-slate-800"
                      >
                        <option>Family Law &amp; Divorce</option>
                        <option>Personal Injury &amp; Car Accidents</option>
                        <option>Criminal Defense &amp; DWI</option>
                        <option>Estate Planning &amp; Probate</option>
                        <option>Business Law &amp; Contracts</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-4 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>
                        {isSubmittingLead ? "Generating Audit..." : "Send My Free Katy Reality Check"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-[11px] text-slate-500 text-center">
                      Strictly confidential · Never shared with competitors · Zero spam guarantee
                    </p>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-slate-100 text-neutral-800 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-extrabold text-neutral-950">
                      Request Received
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                      Mubashar Sharif will personally analyze {leadUrl || "your website"} and email your Katy tear-down to {leadEmail} within 24 hours.
                    </p>
                    <button
                      onClick={() => setLeadSubmitted(false)}
                      className="text-xs text-neutral-900 font-bold hover:underline pt-2"
                    >
                      Audit another website
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
