"use client";

import React, { useState } from "react";
import { Search, Loader2, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

export default function DentonDiagnosisTool() {
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
  const [leadPractice, setLeadPractice] = useState("Criminal Defense & DWI");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const chips = [
    "UNT & TWU Student Demographic",
    "Worried Parent Remote Intake",
    "DFW Mega-Firm Displacement",
    "Denton County Court Venues",
    "Ad Budget Treadmill & Quiet Mondays",
    "Map Pack Stagnation on Square",
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
          city: "Denton",
          state: "Texas",
          county: "Denton County",
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
          n: "UNT & TWU Student Intent & DFW Mega-Firm Void",
          why: "Over 60,000 university students and anxious out-of-town parents search in Denton County for student defense, while DFW mega-firms hold page one without a single sentence of Denton County court content.",
          fix: "Architect hyper-local practice silos anchored to the Denton County Courthouse-on-the-Square and student defense intake workflows.",
          tool: "Denton Practice Silo & Parent Intake Suite",
        },
        {
          n: "Local Map Pack & AI Visibility Deficit",
          why: "DFW regional directory aggregators capture broad organic positions while unoptimized Denton Square listings miss out on local 3-pack and Google AI Overview citations.",
          fix: "Restructure GBP primary categories, embed localized geo-signals (Denton County Courthouse, campus corridors), and deploy LegalService structured schema.",
          tool: "Geo-Grid Rank Tracker & AI Citation Engine",
        },
      ]);
      setRecommendation("Target parent reassurance search queries and anchor localized pages to the Denton County Criminal Courts to displace generic Dallas-Fort Worth mega-firms.");
      setIsAiGenerated(false);
      setHasDiagnosed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadUrl || !leadEmail) return;

    setIsSubmittingLead(true);
    try {
      await fetch("/api/reality-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: leadUrl,
          email: leadEmail,
          phone: leadPhone,
          practiceArea: leadPractice,
          location: "Denton, TX",
          selectedChips,
          query,
        }),
      });
      setLeadSubmitted(true);
    } catch {
      setLeadSubmitted(true);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <section id="diagnosis-tool" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Engine · Gemini AI Powered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Diagnose Your Denton Law Firm&apos;s Organic Stagnation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Type your firm&apos;s primary visibility challenge or click the specific Denton County legal market symptoms below. Our system synthesizes immediate strategic directives.
          </p>
        </div>

        {/* Diagnosis Input & Chips Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          <form onSubmit={handleRunDiagnosis} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., We spend $4,000/mo on ads but DFW firms still beat us on Google for Denton student DWI..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm sm:text-base transition-all disabled:opacity-60 shadow-md shadow-sm shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Denton Diagnosis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Issue Chips */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-900" />
              <span>Or select local symptoms you are currently experiencing in Denton:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg border transition-all ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Card */}
        {hasDiagnosed && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Diagnostic Findings
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                    Denton Legal Market Strategic Analysis
                  </h3>
                </div>
                {isAiGenerated && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Gemini AI Synthesis Verified
                  </span>
                )}
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {diagnostics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-neutral-900 shrink-0" />
                        <h4 className="font-bold text-neutral-950 text-base">{item.n}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                        <strong className="text-slate-800">Why in Denton County:</strong> {item.why}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <strong className="text-neutral-800">Strategic Fix:</strong> {item.fix}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Tool: {item.tool}</span>
                      <span className="text-neutral-900 font-semibold">Included in Retainer</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Executive Recommendation */}
              {recommendation && (
                <div className="p-5 rounded-xl bg-gradient-to-r from-slate-50/80 via-white to-slate-50 border border-slate-200 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                      MS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                        Executive Recommendation · Mubashar Sharif, CEO
                      </div>
                      <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                        &quot;{recommendation}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Lead Magnet: Talk to Mubashar Directly */}
              <div id="talk-to-me" className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8">
                {leadSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Request Received by Mubashar Sharif</h4>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      I will personally review your site against Denton County competitors and send your confidential analysis within 24 hours. Talk soon.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="max-w-2xl mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        No Pressure · Founder-Reviewed · 90-Day Money-Back Guarantee
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white mt-1 mb-2">
                        Get Your Free Denton Reality Check &amp; Strategy Audit
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        Send your website. I will personally examine where Dallas–Fort Worth firms are intercepting your local Denton retainers and outline your exact 90-day roadmap.
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <input
                        type="url"
                        required
                        value={leadUrl}
                        onChange={(e) => setLeadUrl(e.target.value)}
                        placeholder="Firm Website (e.g., dentonlaw.com)"
                        className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-neutral-900"
                      />
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="Your Direct Email"
                        className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-neutral-900"
                      />
                      <select
                        value={leadPractice}
                        onChange={(e) => setLeadPractice(e.target.value)}
                        className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-neutral-900"
                      >
                        <option value="Criminal Defense & DWI">Criminal Defense &amp; DWI</option>
                        <option value="Family Law & Divorce">Family Law &amp; Divorce</option>
                        <option value="Personal Injury">Personal Injury</option>
                        <option value="Student Disciplinary Defense">Student Disciplinary Defense</option>
                        <option value="Landlord-Tenant Law">Landlord-Tenant Law</option>
                      </select>
                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="px-5 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
                      >
                        {isSubmittingLead ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Send to Mubashar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
                      <span>100% Confidential. Never shared with competitor firms in Denton.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
