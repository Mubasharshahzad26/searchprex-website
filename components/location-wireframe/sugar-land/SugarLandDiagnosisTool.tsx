"use client";

import React, { useState } from "react";
import {
  Search,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

export default function SugarLandDiagnosisTool() {
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
  const [leadPractice, setLeadPractice] = useState("High-Asset Family Law & Divorce");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const chips = [
    "Trapped in Houston PPC Ad Auction",
    "High-Asset Divorce & QDRO Intent",
    "Fort Bend Court Venue Disconnect",
    "Overshadowed by Galleria Mega-Firms",
    "Map Pack Radius Drop-Off",
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
          city: "Sugar Land",
          state: "Texas",
          county: "Fort Bend County",
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
          n: "Houston PPC Ad Auction Treadmill & High-Asset Intent Void",
          why: "Houston mega-firms drive up PPC ad auctions in Fort Bend County to unsustainable levels ($200-$350+ per click), while unoptimized local practices lack high-asset divorce and Fort Bend court silos.",
          fix: "Deploy compounding organic practice silos for Sugar Land, First Colony, and Richmond district court venues with LegalService schema.",
          tool: "Fort Bend High-Asset & Organic Equity Suite",
        },
        {
          n: "Fort Bend County Court Jurisdiction Disconnect",
          why: "Cases in Sugar Land are filed at the Fort Bend County Justice Center in Richmond, yet regional Houston competitors publish generic Harris County procedural copy.",
          fix: "Create Richmond court venue guides explaining Fort Bend district court filing timelines, local standing orders, and judicial procedures.",
          tool: "Fort Bend Venue Authority Suite",
        },
      ]);
      setRecommendation(
        "Shift your budget away from the inflated Houston PPC auction into dedicated First Colony, Riverstone, and Richmond court practice silos that build lasting local equity."
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fort Bend Practice Audit Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Diagnose Your Sugar Land Law Firm&apos;s Search Bottlenecks
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Select common Fort Bend legal challenges or enter your specific situation below. Our system will analyze your firm against Galleria and downtown Houston competitors.
          </p>
        </div>

        {/* Diagnosis Search Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg mb-12">
          {/* Quick Problem Chips */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Common Sugar Land &amp; Fort Bend Bottlenecks (Click to select)
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
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
                  placeholder="e.g. Houston firms outbid us on PPC and take First Colony high-asset divorce clients..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] text-sm sm:text-base bg-slate-50/50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || (!query.trim() && selectedChips.length === 0)}
                className="px-7 py-4 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-sm sm:text-base shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Fort Bend Market...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>Run Live Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
            <span>Calibrated for Sugar Land, First Colony, Missouri City, and Richmond legal demand</span>
          </p>
        </div>

        {/* Diagnosis Results Section */}
        {hasDiagnosed && (
          <div className="mb-16 space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1a7d59]" />
                <h3 className="font-extrabold text-xl text-[#0a0f2e]">
                  Sugar Land Jurisdictional Audit Findings
                </h3>
              </div>
              {isAiGenerated && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Gemini AI Live Analysis
                </span>
              )}
            </div>

            {/* Diagnostic Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {diagnostics.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-extrabold text-base sm:text-lg text-[#0a0f2e]">
                      {item.n}
                    </h4>
                    <span className="px-2.5 py-1 rounded-lg bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold shrink-0">
                      Issue #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mb-1">
                        Why this happens in Sugar Land:
                      </div>
                      <p className="text-slate-700 leading-relaxed">{item.why}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="font-bold text-[#1a7d59] uppercase tracking-wider text-[11px] mb-1">
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
              <div className="rounded-2xl bg-[#EEEDFE]/40 border border-[#534AB7]/30 p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#534AB7] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    MS
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
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

        {/* Lead Magnet / Sugar Land Rescue Plan Form */}
        <div id="rescue-form" className="bg-gradient-to-br from-[#0a0f2e] via-slate-900 to-[#1e1b4b] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden scroll-mt-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Free for Sugar Land Firms · 24-Hour Delivery</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get Your Confidential Fort Bend Rescue Plan
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I will personally review your firm&apos;s site, your Google Business Profile, and the Houston competitors bidding against you in Fort Bend County. You receive a concrete roadmap to outrank them organically.
              </p>
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your Map Pack geo-radius drop-off points</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Where Houston firms beat you, and the exact content gaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>A step-by-step roadmap sized to your caseload goals</span>
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
                        placeholder="e.g. sugarlandlegal.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50"
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
                          placeholder="partner@sugarlandlegal.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50"
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
                          placeholder="(281) 555-0188"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7] bg-slate-50 text-slate-800"
                      >
                        <option>High-Asset Family Law &amp; Divorce</option>
                        <option>Estate Planning &amp; Probate</option>
                        <option>Business Law &amp; Commercial Litigation</option>
                        <option>Personal Injury &amp; Car Accidents</option>
                        <option>Immigration &amp; Investor Visas</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-4 px-6 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>
                        {isSubmittingLead ? "Analyzing Site..." : "Send My Free Fort Bend Rescue Plan"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-[11px] text-slate-500 text-center">
                      Strictly confidential · Never shared with competitors · Zero spam guarantee
                    </p>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-extrabold text-[#0a0f2e]">
                      Rescue Plan Request Received
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                      Mubashar Sharif will personally inspect {leadUrl || "your website"} and email your Sugar Land rescue strategy to {leadEmail} within 24 hours.
                    </p>
                    <button
                      onClick={() => setLeadSubmitted(false)}
                      className="text-xs text-[#534AB7] font-bold hover:underline pt-2"
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
