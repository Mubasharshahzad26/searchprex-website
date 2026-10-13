'use client';

import React, { useState } from 'react';
import { submitLead, LEAD_FAILED_MESSAGE } from "@/lib/submit-lead";
import {
  Search,
  Loader2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Scale,
  BrainCircuit,
} from 'lucide-react';

interface DiagnosticItem {
  n: string;
  why: string;
  fix: string;
  tool: string;
}

export default function WoodlandsDiagnosisTool() {
  const [query, setQuery] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDiagnosed, setHasDiagnosed] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [recommendation, setRecommendation] = useState<string>('');
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  // Form lead submission state
  const [leadUrl, setLeadUrl] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPractice, setLeadPractice] = useState('Estate Planning & Wealth Preservation');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const chips = [
    'Unincorporated Township & County Venue Split',
    'Village Search Intent Fragmentation',
    'AI Search & Referral Network Invisibility',
    'Overshadowed by North Houston & Mega-Firms',
    'High-Asset Estate & Executive Wealth Intent Void',
    'Traffic is low or not growing',
    'Intake Inefficiency & Slow Follow-Up',
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
      const res = await fetch('/api/diagnose-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          selectedChips,
          city: 'The Woodlands',
          state: 'Texas',
          county: 'Montgomery & Harris Counties',
        }),
      });

      if (!res.ok) throw new Error('Diagnosis request failed');

      const data = await res.json();
      setDiagnostics(data.items || []);
      setRecommendation(data.recommendation || '');
      setIsAiGenerated(Boolean(data.isAiGenerated));
      setHasDiagnosed(true);
    } catch (err) {
      console.error(err);
      // Deterministic Woodlands fallback
      setDiagnostics([
        {
          n: 'Unincorporated Township & County Venue Split',
          why: 'The Woodlands is not an incorporated municipality. Over 90% is in Montgomery County (court in Conroe), while Creekside Park is in Harris County (court in downtown Houston). Generic Houston pages fail to guide searchers to the right bench.',
          fix: 'Deploy Montgomery and Harris county venue guides detailing Conroe district court filing protocols and Creekside Park jurisdictional boundaries.',
          tool: 'Montgomery & Harris Venue Silo Suite',
        },
        {
          n: 'Village Search Intent Fragmentation',
          why: 'Woodlands residents search by their specific village (Alden Bridge, Sterling Ridge, Creekside Park). When firms lump all queries onto a generic page, Google awards rankings to neighborhood-specific competitors.',
          fix: 'Engineer dedicated village landing pages with authentic neighborhood boundaries, school district zoning, and executive wealth topics.',
          tool: 'Woodlands Village Indexer',
        },
        {
          n: 'High-Asset Estate & Executive Wealth Intent Void',
          why: 'With median household incomes exceeding $145k+, Woodlands residents seek counsel for corporate succession, Texas revocable living trusts, and muniment of title. Generic copy fails to earn their trust.',
          fix: 'Deploy authoritative wealth preservation and Texas Estates Code silos addressing oil & gas royalties, business succession, and Conroe probate procedures.',
          tool: 'Executive Estate & Asset Protection Suite',
        },
      ]);
      setRecommendation(
        'Anchor your firm to Montgomery County court procedures in Conroe and executive wealth intent before losing affluent village referrals to downtown Houston firms.'
      );
      setIsAiGenerated(false);
      setHasDiagnosed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    const ok = await submitLead({
      email: leadEmail,
      website: leadUrl,
      phone: leadPhone,
      business: leadPractice,
      message: query ? `Diagnosis question: ${query}` : undefined,
      source: 'the-woodlands:diagnosis-lead-form',
    });
    setIsSubmittingLead(false);
    if (ok) setLeadSubmitted(true);
    else window.alert(LEAD_FAILED_MESSAGE);
  };

  return (
    <section id="diagnosis-tool" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-neutral-900 to-slate-900 border border-neutral-900/60 p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-700/10 text-slate-300 border border-neutral-700/20 mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-slate-400" />
            Live Gemini SEO Diagnostic Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            The Woodlands Law Firm SEO Diagnosis
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Select the issues holding your firm back or enter your firm's current visibility challenge. Our engine evaluates your positioning against Montgomery County courts in Conroe, Harris County Creekside exceptions, and Woodlands village-level search intent.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleRunDiagnosis} className="space-y-6 mb-8">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Select Your Observed Growth Roadblocks
            </label>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => toggleChip(chip)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 border ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-slate-400 shadow-md shadow-neutral-900/40'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {isSelected ? '• ' : '+ '}
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Or Describe Your Specific Search Visibility Problem
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Losing high-net-worth estate planning searches in Alden Bridge to downtown Houston firms..."
                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Evaluates Montgomery County (Conroe) venue & 8 village hubs
            </span>
            <button
              type="submit"
              disabled={isLoading || (!query.trim() && selectedChips.length === 0)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/40 disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing The Woodlands SERP...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-200" />
                  Run Instant Woodlands Audit
                </>
              )}
            </button>
          </div>
        </form>

        {/* Diagnosis Results Section */}
        {hasDiagnosed && (
          <div className="mt-10 pt-8 border-t border-neutral-900/60 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">The Woodlands Diagnostic Findings</span>
                {isAiGenerated ? (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-700/20 text-slate-300 border border-neutral-700/30">
                    Live Gemini Output
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-700/20 text-slate-300 border border-neutral-700/30">
                    Verified Benchmark Rules
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">
                Found {diagnostics.length} high-impact strategic finding{diagnostics.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Findings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnostics.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-800/90 border border-neutral-900/50 p-5 space-y-3 shadow-md hover:border-neutral-800/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-bold text-white leading-snug">{item.n}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900/80 text-slate-200 border border-neutral-800/60 whitespace-nowrap">
                      {item.tool}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Why This Happens in The Woodlands:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.why}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-700/70">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                      SearchPrex Resolution:
                    </div>
                    <p className="text-xs text-slate-200/90 leading-relaxed">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Executive Recommendation from Mubashar Sharif */}
            {recommendation && (
              <div className="rounded-2xl bg-neutral-950/70 border border-neutral-800/60 p-6 flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 rounded-xl bg-neutral-900 text-white shrink-0">
                  <Scale className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Executive Recommendation from Mubashar Sharif (CEO):
                  </div>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                    "{recommendation}"
                  </p>
                </div>
              </div>
            )}

            {/* In-Line Lead Capture for Deep Strategy */}
            <div className="mt-8 rounded-2xl bg-slate-900/90 border border-neutral-900/50 p-6 sm:p-8">
              <div className="max-w-2xl">
                <h4 className="text-xl font-bold text-white mb-2">
                  Request Your Complimentary Venue & AI Visibility Review
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Receive a complete map of your firm's Montgomery vs Harris County venue gaps, missing village hubs, and baseline citation rate across 20+ ChatGPT and Gemini prompts. Confidential and no obligation.
                </p>

                {leadSubmitted ? (
                  <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/50 text-slate-200 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                    <span>
                      Thank you. Founder Mubashar Sharif will personally audit your firm and deliver your confidential review within 48 hours.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        Law Firm Website URL
                      </label>
                      <input
                        type="url"
                        required
                        value={leadUrl}
                        onChange={(e) => setLeadUrl(e.target.value)}
                        placeholder="https://yourwoodlandsfirm.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        Primary Practice Focus
                      </label>
                      <select
                        value={leadPractice}
                        onChange={(e) => setLeadPractice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                      >
                        <option>Estate Planning & Wealth Preservation</option>
                        <option>High-Asset Divorce & Family Law</option>
                        <option>Probate Administration & Muniment of Title</option>
                        <option>Business Succession & Corporate</option>
                        <option>Serious Personal Injury & I-45 Crashes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        Work Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="attorney@yourwoodlandsfirm.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        Direct Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="(281) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Strictly confidential • Never shared with competing firms
                      </span>
                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-900 transition-all shadow-md flex items-center gap-2"
                      >
                        {isSubmittingLead ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Queuing Audit...
                          </>
                        ) : (
                          <>
                            Request Free Confidential Review
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
