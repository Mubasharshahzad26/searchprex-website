"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, DollarSign, ArrowRight, TrendingUp, HelpCircle } from "lucide-react";

export default function SugarLandPricingAndPpcComparison() {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default Growth
  const [selectedPpcBudget, setSelectedPpcBudget] = useState(6000); // Default $6,000

  const plans = [
    {
      name: "Starter",
      tag: "For Solo Practitioners",
      price: "$1,200",
      numericPrice: 1200,
      description: "Ideal for solo attorneys seeking dominant local visibility for a single core practice in Sugar Land.",
      features: [
        "1 primary practice area (Sugar Land focus)",
        "Google Business Profile optimization & geo-calibration",
        "Whisper call tracking with lead attribution",
        "Monthly performance & ranking reports",
        "Month-to-month terms (zero lock-in)",
      ],
      popular: false,
    },
    {
      name: "Growth",
      tag: "Most Popular in Fort Bend",
      price: "$1,800",
      numericPrice: 1800,
      description: "Tailored for growing boutique firms targeting multiple practices and surrounding Fort Bend submarkets.",
      features: [
        "2 core practice areas (e.g. High-Asset Divorce + Estate)",
        "Dedicated nearby city hubs (Missouri City, Richmond)",
        "Authority citation & local directory syndication",
        "Review generation engine & AI citation tracking",
        "Bi-weekly executive strategy call with Mubashar",
        "90-Day Written Milestone Guarantee",
      ],
      popular: true,
    },
    {
      name: "Premier",
      tag: "For Multi-Attorney Practices",
      price: "$2,500",
      numericPrice: 2500,
      description: "Complete organic market capture across all of Fort Bend County and high-wealth suburban enclaves.",
      features: [
        "3+ practice areas across Greater Sugar Land",
        "Complete submarket coverage (Stafford, Rosenberg, Fulshear)",
        "Real-time partner executive intake dashboard",
        "Priority founder cell access & fast-track execution",
        "Multilingual content expansion framework",
        "Quarterly competitive SERP defense audit",
      ],
      popular: false,
    },
  ];

  const ppcOptions = [3000, 6000, 10000];
  const currentPlan = plans[selectedPlan];
  const currentPlanPrice = currentPlan.numericPrice;
  const monthlySavings = selectedPpcBudget - currentPlanPrice;
  const annualSavings = monthlySavings * 12;

  return (
    <section id="pricing" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Premium Performance · Zero Contract Handcuffs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Law Firm SEO Pricing in Sugar Land: $1,200 to $2,500 / Month
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Premium organic results for Fort Bend&apos;s most lucrative legal demographics without long-term contract lock-in. Protected by our written 90-day milestone guarantee.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((p, idx) => {
            const isSelected = selectedPlan === idx;
            return (
              <div
                key={p.name}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all cursor-pointer relative ${
                  p.popular
                    ? "bg-[#0a0f2e] text-white shadow-2xl ring-2 ring-[#534AB7] scale-105 z-10"
                    : isSelected
                    ? "bg-slate-50 text-slate-900 border-2 border-[#534AB7] shadow-lg"
                    : "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#534AB7] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Most Popular in Fort Bend
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        p.popular
                          ? "bg-white/10 text-emerald-400"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight">
                    {p.name}
                  </h3>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                      {p.price}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        p.popular ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      / month
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      p.popular ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {p.description}
                  </p>

                  <div
                    className={`pt-4 border-t space-y-3 ${
                      p.popular ? "border-slate-800" : "border-slate-200"
                    }`}
                  >
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            p.popular ? "text-emerald-400" : "text-[#1a7d59]"
                          }`}
                        />
                        <span className={p.popular ? "text-slate-200" : "text-slate-700"}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href="#rescue-form"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm text-center block transition-all ${
                      p.popular
                        ? "bg-[#534AB7] hover:bg-[#3C3489] text-white shadow-lg shadow-indigo-950/50"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    Select {p.name} Plan
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Written Guarantee Box */}
        <div className="bg-[#EEEDFE]/40 border-2 border-[#534AB7]/20 rounded-3xl p-8 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#534AB7] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a0f2e]">
                The SearchPrex 90-Day Written Milestone Guarantee
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We agree upon transparent, documented deliverables before your campaign begins. If agreed technical health, indexing, and local visibility benchmarks are not achieved by Day 90, we refund your monthly fees in full. Zero questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive PPC Budget Comparison Tool */}
        <div id="ppc-compare" className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm scroll-mt-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: PPC Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Ad Auction Comparison Tool</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight">
                Compare SEO Investment with Your Monthly PPC Ad Budget
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In Greater Houston and Fort Bend County, Google Ads clicks for competitive practice areas cost between $150 and $350+ each. Select your approximate monthly ad spend below:
              </p>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Select Current or Projected Monthly Google Ads Spend:
                </div>
                <div className="flex flex-wrap gap-3">
                  {ppcOptions.map((budget) => {
                    const isSelected = selectedPpcBudget === budget;
                    return (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setSelectedPpcBudget(budget)}
                        className={`px-5 py-3 rounded-xl font-extrabold text-sm transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-[#0a0f2e] text-white border-[#0a0f2e] shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        ${budget.toLocaleString()} / mo
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Why this matters:</strong> Pay-per-click traffic is rented—inquiries stop the exact instant your credit card stops running. Organic search builds lasting digital practice equity that continues generating retainers for years.
              </p>
            </div>

            {/* Right: Savings & Asset Value Display */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">
                    Monthly SEO Fee ({currentPlan.name}):
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    ${currentPlanPrice.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">
                    Current Monthly PPC Spend:
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-red-600">
                    ${selectedPpcBudget.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Monthly Capital Saved or Reallocated:
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1a7d59] tracking-tight">
                  +${monthlySavings.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-slate-500">/ month</span>
                </div>
                <div className="text-xs font-bold text-slate-600">
                  That is over <span className="text-[#1a7d59] font-extrabold">${annualSavings.toLocaleString()}</span> in retained cash annually while building an owned organic asset.
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#rescue-form"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-sm shadow-md transition-all text-center"
                >
                  <span>Build Your Owned Organic Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
