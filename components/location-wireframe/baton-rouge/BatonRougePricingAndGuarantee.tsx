'use client';

import React from 'react';

export default function BatonRougePricingAndGuarantee() {
  const tiers = [
    {
      name: "Boutique / Solo Practice",
      price: "$1,200",
      period: "per month",
      focus: "Single Practice Domination",
      description:
        "Engineered for solo practitioners and boutique partnerships seeking reliable Map Pack placement for one core practice area in Baton Rouge.",
      features: [
        "19th Judicial District Court statutory content silo.",
        "Google Business Profile optimization and citation cleanup.",
        "Mobile conversion tuning for urgent consultation calls.",
        "Monthly executive caseload attribution report.",
        "One practice area exclusivity in Baton Rouge.",
      ],
      ctaText: "Start 7-Day Free Trial",
      ctaHref: "#reality-check-form",
      popular: false,
    },
    {
      name: "Competitive Growth Tier",
      price: "$1,850",
      period: "per month",
      focus: "Multi-Practice & Capital Area",
      description:
        "Designed for established firms competing against large New Orleans marketing budgets across 2-3 practice areas throughout East Baton Rouge Parish.",
      features: [
        "Comprehensive coverage of Baton Rouge, Gonzales, and Denham Springs.",
        "Advanced Louisiana Civil Code hubs with LegalService Schema.",
        "Targeted digital PR and Capital Area legal authority citations.",
        "AI Search Optimization (ChatGPT and Gemini citation).",
        "Direct weekly access to founder and senior strategist.",
      ],
      ctaText: "Claim Capital Area Exclusivity",
      ctaHref: "#reality-check-form",
      popular: true,
    },
    {
      name: "Market Dominance Engine",
      price: "$2,500",
      period: "per month",
      focus: "Comprehensive Regional Saturation",
      description:
        "Built for premier freeway truck accident, industrial plant litigation, and succession trial firms aiming to control organic search across southeastern Louisiana.",
      features: [
        "Complete 6-submarket Capital Area regional network.",
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
            We operate month-to-month because our results justify the partnership. No 12-month handcuffs, no hidden vendor markups, and guaranteed practice exclusivity.
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
                  Most Requested by Baton Rouge Firms
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{tier.focus}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/{tier.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <span className="font-bold text-neutral-950 shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href={tier.ctaHref}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-bold text-center block transition-all ${
                    tier.popular
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-md shadow-slate-100'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="sm:px-4 first:pl-0">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Month-to-Month Freedom
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cancel anytime with 30 days notice. We earn your business every month through transparent rankings and caseload attribution.
              </p>
            </div>
            <div className="sm:px-4 pt-4 sm:pt-0">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Territorial Exclusivity
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strictly partner with one law firm per practice specialty in East Baton Rouge Parish. We will never represent your direct courtroom adversary.
              </p>
            </div>
            <div className="sm:px-4 pt-4 sm:pt-0">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                7-Day Free Reality Check
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test our diagnostic process with zero financial risk. We audit your technical architecture and deliver actionable findings before invoicing begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
