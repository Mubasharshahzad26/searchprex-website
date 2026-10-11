"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Wrench,
  Bot,
} from "lucide-react";

interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

const CHIP_LIST = [
  "Traffic is low or not growing",
  "Low visibility on Google and AI",
  "Citations and mentions are not coming",
  "Not ranking in the Map Pack",
  "We target the wrong keywords",
  "Leads are not qualified",
  "Intake is slow or leaking",
];

export default function PhiladelphiaDiagnosisTool() {
  const [query, setQuery] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [diagnosed, setDiagnosed] = useState(false);
  const [items, setItems] = useState<DiagnosticItem[]>([]);
  const [recommendation, setRecommendation] = useState("");
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 7-day trial lead form state
  const [trialName, setTrialName] = useState("");
  const [trialWebsite, setTrialWebsite] = useState("");
  const [trialEmail, setTrialEmail] = useState("");
  const [trialLoading, setTrialLoading] = useState(false);
  const [trialDone, setTrialDone] = useState(false);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleDiagnose = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query && selectedChips.length === 0) {
      setErrorMsg("Please type a problem or select at least one issue below.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/diagnose-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          selectedChips,
          city: "Philadelphia",
          state: "Pennsylvania",
          county: "Philadelphia County",
        }),
      });

      if (!res.ok) throw new Error("Diagnosis request failed");

      const data = await res.json();
      setItems(data.items || []);
      setRecommendation(data.recommendation || "");
      setIsAiGenerated(Boolean(data.isAiGenerated));
      setDiagnosed(true);
    } catch {
      setErrorMsg("Network error. Showing local deterministic diagnosis.");
      setItems([
        {
          n: "Neighborhood Search Intent Fragmentation",
          why: "Philadelphia searchers in Center City, South Philly, and the Northeast search for specific neighborhood counsel, while generic city-wide pages get buried by national mass tort aggregators.",
          fix: "Architect neighborhood-specific practice silos tied to Philadelphia Court of Common Pleas and Municipal Court procedures.",
          tool: "Crawl & Indexing Monitor",
        },
        {
          n: "Local Map Pack & AI Visibility Deficit",
          why: "Weak entity grounding, missing LegalService JSON-LD schema, and lack of direct answers to Pennsylvania statutory questions (Limited vs Full Tort, 2-year statute).",
          fix: "Deploy structured LegalService schema, optimize for Google AI Overviews with direct statutory answers, and maintain an llms.txt protocol.",
          tool: "AI Search & Citation Tracker",
        },
      ]);
      setRecommendation(
        "Focus on answering Pennsylvania statutory questions directly and capturing high-intent neighborhood searches before spending more on paid ads."
      );
      setDiagnosed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail || !trialName) return;

    setTrialLoading(true);
    try {
      await fetch("/api/reality-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trialName,
          email: trialEmail,
          website: trialWebsite,
          notes: `7-Day Trial Request from Philadelphia Diagnosis Tool. Query: "${query}". Chips: ${selectedChips.join(
            ", "
          )}`,
          source: "philadelphia-7day-trial",
        }),
      });
      setTrialDone(true);
    } catch {
      setTrialDone(true);
    } finally {
      setTrialLoading(false);
    }
  };

  return (
    <section id="diagnose" className="scroll-mt-20 border-b border-slate-200 bg-slate-50/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
            <Wrench className="h-4 w-4" />
            <span>Interactive Law Practice Diagnostics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
            Philadelphia Law Firm SEO Diagnosis: Tell Us the Problem and We Will Show the Fix
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            <strong className="text-[#0a0f2e] font-bold">
              We are here for the solution because we understand your frustration.
            </strong>{" "}
            Skip generic sales pitches. Type what is going wrong with your search visibility or intake, or select your challenges below. Our Gemini-powered engine will teardown probable causes in Philadelphia County and show our concrete technical fix.
          </p>
        </div>

        {/* Input Box Card */}
        <div className="mt-10 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-[#534AB7]/40 hover:shadow-lg">
          <form onSubmit={handleDiagnose} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. We get traffic but zero signed cases in Center City and South Philly"
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-base text-slate-900 placeholder-slate-400 focus:border-[#534AB7] focus:bg-white focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#534AB7] px-7 py-3.5 text-base font-bold text-white shadow-md shadow-[#534AB7]/25 hover:bg-[#3C3489] transition-all hover:scale-102 active:scale-98 disabled:opacity-75 cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Diagnosing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-indigo-200" />
                  <span>Diagnose My Problem</span>
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <p className="mt-3 text-xs font-semibold text-slate-700 bg-slate-100 p-2.5 rounded-lg border border-slate-300">
              {errorMsg}
            </p>
          )}

          {/* Issue Chips */}
          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Or tap issues to combine in diagnosis:
            </span>
            <div className="flex flex-wrap gap-2">
              {CHIP_LIST.map((chip) => {
                const active = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-[#534AB7] text-white shadow-xs"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {active ? "✓ " : "+ "}
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Section */}
        {diagnosed && items.length > 0 && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                  Analysis Complete
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e]">
                  Probable Bottlenecks & SearchPrex Remediation
                </h3>
              </div>
              {isAiGenerated && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-[#534AB7]">
                  <Bot className="h-3.5 w-3.5" />
                  <span>Generated via Gemini Legal Intelligence</span>
                </div>
              )}
            </div>

            {/* Recommendation callout */}
            {recommendation && (
              <div className="rounded-2xl border border-indigo-100 bg-[#EEEDFE]/60 p-5 text-sm sm:text-base text-slate-800 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#534AB7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0a0f2e] font-bold block mb-0.5">
                    Executive Strategy Directive:
                  </strong>
                  <span>{recommendation}</span>
                </div>
              </div>
            )}

            {/* 2-Column Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4 hover:border-[#534AB7]/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                      Issue 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Cuyahoga / Philly Index
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-[#0a0f2e]">{it.n}</h4>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <strong className="text-slate-800 font-bold block mb-1">
                        Probable Cause:
                      </strong>
                      <p className="text-slate-600 leading-relaxed">{it.why}</p>
                    </div>

                    <div className="rounded-xl bg-indigo-50/50 p-3 border border-indigo-100/60">
                      <strong className="text-[#534AB7] font-bold block mb-1">
                        SearchPrex Fix:
                      </strong>
                      <p className="text-slate-700 leading-relaxed">{it.fix}</p>
                    </div>

                    <div className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-100 text-emerald-900">
                      <strong className="font-bold block mb-0.5">
                        Software & Tooling We Add:
                      </strong>
                      <span>{it.tool}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Package with 7-Day Free Trial Card */}
            <div className="rounded-3xl border-2 border-[#534AB7] bg-gradient-to-br from-[#0a0f2e] via-[#3C3489] to-[#0a0f2e] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-200">
                  Recommended For Your Practice
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  The Complete Philadelphia Package, with a 7-Day Free Trial
                </h3>
                <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
                  One full-service execution package built around your firm's specific diagnosis, plus legal intake efficiency tools. Experience our work for seven days before deciding on a month-to-month partnership.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm">
                  <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <strong className="text-white font-bold block mb-1">
                      Included in Your 7-Day Trial:
                    </strong>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Full Philadelphia site & GBP audit</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Neighborhood keyword & intent map</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Quick-win technical indexation fixes</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Live dashboard & report templates</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <strong className="text-white font-bold block mb-1">
                      Intake Efficiency Toolkit:
                    </strong>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Whisper call tracking setup</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Missed-call automated text-back</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Intake lead qualification scoring</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Compliant client review workflow</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-indigo-200 pt-2">
                  7 days free · No credit card required · No auto-charge. You keep the complete audit teardown permanently.
                </p>

                {/* Trial Intake Form */}
                <div className="pt-4">
                  {trialDone ? (
                    <div className="rounded-2xl bg-emerald-950/40 border border-emerald-400/40 p-4 text-emerald-200 text-sm font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span>Thank you. Your Philadelphia 7-day trial materials will be delivered to your inbox within 24 hours.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleTrialSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <input
                        type="text"
                        required
                        value={trialName}
                        onChange={(e) => setTrialName(e.target.value)}
                        placeholder="Attorney Name *"
                        className="rounded-xl border border-indigo-400/40 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-200 focus:bg-white/20 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={trialWebsite}
                        onChange={(e) => setTrialWebsite(e.target.value)}
                        placeholder="Firm Website"
                        className="rounded-xl border border-indigo-400/40 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-200 focus:bg-white/20 focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        value={trialEmail}
                        onChange={(e) => setTrialEmail(e.target.value)}
                        placeholder="Work Email *"
                        className="rounded-xl border border-indigo-400/40 bg-white/10 px-4 py-3 text-sm text-white placeholder-indigo-200 focus:bg-white/20 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={trialLoading}
                        className="rounded-xl bg-white text-[#0a0f2e] hover:bg-slate-100 font-bold px-5 py-3 text-sm shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-75"
                      >
                        {trialLoading ? "Activating..." : "Start 7-Day Free Trial"}
                      </button>
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
