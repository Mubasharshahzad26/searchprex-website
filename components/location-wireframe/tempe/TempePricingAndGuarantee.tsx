'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function TempePricingAndGuarantee() {
  const tiers = [
    {
      name: "Boutique / Solo Practice",
      price: "$1,200",
      period: "per month",
      focus: "Single Practice Domination",
      description:
        "Engineered for solo practitioners and boutique partnerships seeking reliable Map Pack placement for one core practice area in Tempe.",
      features: [
        "Tempe Municipal Court statutory content silo.",
        "Google Business Profile optimization and citation cleanup.",
        "Mobile conversion tuning for urgent phone inquiries.",
        "Monthly executive retainer attribution report.",
        "One practice area exclusivity in Tempe.",
      ],
      ctaText: "Start 7-Day Free Trial",
      ctaHref: "#reality-check-form",
      popular: false,
    },
    {
      name: "Competitive Growth Tier",
      price: "$1,850",
      period: "per month",
      focus: "Multi-Practice & East Valley",
      description:
        "Designed for established firms competing against large Phoenix marketing budgets across 2-3 practice areas throughout Tempe and neighboring cities.",
      features: [
        "Comprehensive coverage of Tempe and 3 East Valley submarkets.",
        "Advanced A.R.S. statutory hubs with LegalService Schema.",
        "Targeted digital PR and Arizona legal authority citations.",
        "AI Search Optimization (ChatGPT and Gemini citation).",
        "Direct weekly access to founder and senior strategist.",
      ],
      ctaText: "Claim East Valley Exclusivity",
      ctaHref: "#reality-check-form",
      popular: true,
    },
    {
      name: "Market Dominance Engine",
      price: "$2,500",
      period: "per month",
      focus: "Comprehensive Regional Saturation",
      description:
        "Built for high-stakes personal injury and leading criminal defense firms aiming to control organic search across Maricopa County.",
      features: [
        "Complete 6-submarket East Valley saturation network.",
        "Aggressive ongoing digital PR and legal backlink acquisition.",
        "Intake conversion optimization and call recording attribution.",
        "Comprehensive AI Overviews and Map Pack protective moat.",
        "Absolute territorial lock across all chosen practice areas.",
      ],
      ctaText: "Secure Market Exclusivity",
      ctaHref: "#reality-check-form",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Transparent Investment
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Predictable Retainer Pricing with Zero Long-Term Lock-In
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            We operate month-to-month because our results justify the partnership. No 12-month handcuffs, no hidden vendor fees, and guaranteed practice exclusivity.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-7 bg-white flex flex-col justify-between shadow-sm relative transition-all ${
                tier.popular
                  ? 'border-neutral-900 ring-2 ring-[#171717]/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Most Requested by Tempe Firms
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{tier.focus}</p>
                </div>

                <div className="flex items-baseline gap-1.5 mb-4 pb-4 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{tier.period}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Included Capabilities:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-slate-900">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <a
                  href={tier.ctaHref}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-bold transition-all text-center block ${
                    tier.popular
                      ? 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {tier.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Strip */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
              <h4 className="text-sm font-bold text-slate-900 mb-1">1. Month-to-Month Flexibility</h4>
              <p className="text-xs text-slate-600">
                Cancel anytime with 30 days notice. We earn your business every month through transparent retainer production.
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
              <h4 className="text-sm font-bold text-slate-900 mb-1">2. 7-Day Free Trial</h4>
              <p className="text-xs text-slate-600">
                Review our comprehensive technical teardown and initial implementation completely free before committing a dollar.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">3. Strict Practice Exclusivity</h4>
              <p className="text-xs text-slate-600">
                We strictly partner with one firm per legal specialty in Tempe. We never work with your direct market competitors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
