'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, Calculator, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export default function WoodlandsPricingAndGuarantee() {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [caseValue, setCaseValue] = useState<number>(7500);
  const [newCases, setNewCases] = useState<number>(2);

  const plans = [
    {
      name: 'Essential',
      price: '$1,200',
      period: '/month',
      tag: 'For Solo Attorneys',
      description: 'Ideal for solo practitioners building dominant local foundation in a single legal vertical.',
      features: [
        '1 core practice area in The Woodlands',
        'Google Business Profile complete calibration',
        'Montgomery County & Conroe venue silo',
        'Whisper call tracking & recording',
        'Monthly lead attribution reporting',
        '100% month-to-month flexibility',
      ],
      popular: false,
    },
    {
      name: 'Signature',
      price: '$1,800',
      period: '/month',
      tag: 'Most Popular for Woodlands Firms',
      description: 'Comprehensive multi-village visibility for growing boutique practices competing against Houston mega-firms.',
      features: [
        '2 practice areas (e.g. Estate & Family Law)',
        'Montgomery & Harris dual-county venue silos',
        '3 dedicated village pages (Alden Bridge, etc.)',
        'AI citation engine (ChatGPT & Gemini)',
        'Weekly Monday executive check-ins',
        'Lead scoring & consultation routing',
      ],
      popular: true,
    },
    {
      name: 'Concierge',
      price: '$2,500',
      period: '/month',
      tag: 'For Multi-Partner Practices',
      description: 'Total regional market dominance across all 8 villages and suburban commuter corridors.',
      features: [
        '3+ practice areas & commercial litigation',
        'Full set of 8 village hubs & submarket pages',
        'Real-time executive analytics dashboard',
        'Direct priority access to Founder Mubashar Sharif',
        'Quarterly competitor displacement review',
        'llms.txt AI feed & syndication protocol',
      ],
      popular: false,
    },
  ];

  const currentPlan = plans[selectedPlan];
  const monthlyCost = [1200, 1800, 2500][selectedPlan];
  const projectedRevenue = caseValue * newCases;
  const netMonthlyGain = projectedRevenue - monthlyCost;
  const roiPercentage = Math.round((netMonthlyGain / monthlyCost) * 100);

  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Pricing Header */}
      <div>
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#534AB7]" />
            Transparent Investment & Zero Lock-In
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Simple, Transparent Retainers for The Woodlands Law Firms
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every engagement begins with our complimentary Venue & AI Visibility Review so you inspect our strategic blueprint before spending a dime. No hidden setup fees, no multi-year lock-in contracts, and zero shared client inquiries.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, idx) => {
            const isSelected = selectedPlan === idx;
            return (
              <div
                key={p.name}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                  p.popular
                    ? 'bg-gradient-to-b from-indigo-950 to-[#0a0f2e] text-white border-2 border-indigo-500 shadow-xl shadow-indigo-950/30'
                    : 'bg-white text-slate-900 border border-slate-200 hover:border-indigo-300 shadow-sm'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#534AB7] text-white shadow-sm border border-indigo-400">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        p.popular ? 'text-indigo-300' : 'text-indigo-700'
                      }`}
                    >
                      {p.tag}
                    </span>
                    {isSelected && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                        Selected Plan
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{p.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
                      <span className={`text-xs ${p.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                        {p.period}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      p.popular ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {p.description}
                  </p>

                  <div
                    className={`pt-4 border-t space-y-2.5 ${
                      p.popular ? 'border-indigo-900/80' : 'border-slate-100'
                    }`}
                  >
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            p.popular ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={p.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(idx);
                    }}
                    className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      p.popular
                        ? 'bg-[#534AB7] hover:bg-[#3C3489] text-white shadow-lg shadow-indigo-900/50'
                        : 'bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-[#534AB7] border border-slate-200'
                    }`}
                  >
                    Select {p.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 90-Day Milestone Guarantee Box */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0a1f18] to-slate-900 border border-emerald-800/40 p-8 sm:p-10 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              The SearchPrex 90-Day Performance Milestone Guarantee
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Accountability You Can Measure in Retainers
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If your firm does not experience documented growth in Google Map Pack impressions, verified ranking expansions across Montgomery County court queries, and qualified inbound inquiries within your initial 90 days, we continue working for free until those performance benchmarks are met.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#diagnosis-tool"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-md shadow-emerald-950/50 whitespace-nowrap"
            >
              Start With Free Review
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Case ROI Calculator */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#534AB7]" />
            Law Firm Case ROI Arithmetic
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            How Quickly Does a Woodlands SEO Campaign Pay For Itself?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
            In an affluent enclave like The Woodlands, attorney case values are exceptionally high. Slide the controls below to calculate your projected return against our {currentPlan.name} plan (${monthlyCost.toLocaleString()}/mo).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Average Retainer / Case Value:</span>
                <span className="text-sm font-bold text-[#534AB7]">
                  ${caseValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={25000}
                step={500}
                value={caseValue}
                onChange={(e) => setCaseValue(Number(e.target.value))}
                className="w-full accent-[#534AB7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$3,000 (Estate Will)</span>
                <span>$10,000 (High-Asset Divorce)</span>
                <span>$25,000+ (Complex Litigation)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Target New Signed Cases Per Month:</span>
                <span className="text-sm font-bold text-[#534AB7]">
                  {newCases} case{newCases > 1 ? 's' : ''} / month
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                step={1}
                value={newCases}
                onChange={(e) => setNewCases(Number(e.target.value))}
                className="w-full accent-[#534AB7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 Case</span>
                <span>3 Cases</span>
                <span>6 Cases</span>
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-50 border border-slate-200/90 p-6 space-y-4">
            <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
              <span className="text-xs text-slate-600">Selected Retainer:</span>
              <span className="text-sm font-bold text-slate-900">
                {currentPlan.name} (${monthlyCost.toLocaleString()}/mo)
              </span>
            </div>

            <div className="flex items-baseline justify-between border-b border-slate-200 pb-3">
              <span className="text-xs text-slate-600">Gross Monthly Casework:</span>
              <span className="text-base font-bold text-slate-900">
                ${projectedRevenue.toLocaleString()}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Net Monthly Revenue Gain:
                </div>
                <div className="text-2xl font-black text-emerald-800">
                  +${netMonthlyGain.toLocaleString()}/mo
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                  {roiPercentage}% Projected ROI
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-tight pt-2 border-t border-slate-200">
              *A single signed high-asset divorce or estate planning client covers 3–6 months of your entire SearchPrex engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
