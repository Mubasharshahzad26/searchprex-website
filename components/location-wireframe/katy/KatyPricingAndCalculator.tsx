"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Calculator, ArrowRight, DollarSign, HelpCircle } from "lucide-react";

export default function KatyPricingAndCalculator() {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default Growth

  // ROI Calculator state
  const [caseValue, setCaseValue] = useState(6500); // Average Katy case value
  const [monthlyRetainers, setMonthlyRetainers] = useState(2); // Retainers gained

  const plans = [
    {
      name: "Starter",
      tag: "For Solo Practitioners",
      price: "$1,200",
      numericPrice: 1200,
      description: "Designed for solo practitioners dominating a single high-intent practice area in Greater Katy.",
      features: [
        "1 primary practice area in Katy",
        "Google Business Profile & local geo-signals",
        "Call tracking with Whisper recording",
        "Monthly performance & case attribution report",
        "100% Month-to-month (zero lock-in)",
      ],
      popular: false,
    },
    {
      name: "Growth",
      tag: "Most Popular in Katy",
      price: "$1,800",
      numericPrice: 1800,
      description: "Ideal for growing boutique firms competing across two core practices and suburban enclaves.",
      features: [
        "2 core practice areas (e.g. Family Law + Injury)",
        "Harris & Fort Bend county venue pages",
        "3 community hubs (Cinco Ranch, Fulshear, Firethorne)",
        "AI citation tracking (ChatGPT, Perplexity, Gemini)",
        "Weekly Monday updates direct from Mubashar",
        "90-Day Written Milestone Guarantee",
      ],
      popular: true,
    },
    {
      name: "Premier",
      tag: "For Multi-Attorney Practices",
      price: "$2,500",
      numericPrice: 2500,
      description: "Comprehensive dominance across all three counties and high-intent highway corridors.",
      features: [
        "3+ practice areas across Greater Katy",
        "All three county page sets (Harris, Fort Bend, Waller)",
        "Complete community cluster (8 localized hubs)",
        "I-10 & Grand Parkway crash corridor pages",
        "Real-time partner executive dashboard",
        "Direct founder cell access & priority turnaround",
      ],
      popular: false,
    },
  ];

  const currentPlan = plans[selectedPlan];
  const monthlyCost = currentPlan.numericPrice;
  const annualCost = monthlyCost * 12;
  const grossMonthlyRevenue = caseValue * monthlyRetainers;
  const netMonthlyProfit = grossMonthlyRevenue - monthlyCost;
  const annualNetProfit = netMonthlyProfit * 12;
  const roiMultiplier = Math.round((grossMonthlyRevenue / monthlyCost) * 10) / 10;

  return (
    <section id="pricing" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Transparent Investment · Month-to-Month</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Law Firm SEO Pricing in Katy: $1,200 to $2,500 / Month
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Straightforward pricing sized to your firm&apos;s growth goals. Zero annual contracts, exclusive geographic territory per practice area, and backed by our written 90-day milestone guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((p, idx) => {
            const isSelected = selectedPlan === idx;
            return (
              <div
                key={p.name}
                onClick={() => setSelectedPlan(idx)}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all cursor-pointer relative ${
                  p.popular
                    ? "bg-neutral-900 text-white shadow-2xl ring-2 ring-neutral-900 scale-105 z-10"
                    : isSelected
                    ? "bg-slate-50 text-slate-900 border-2 border-neutral-900 shadow-lg"
                    : "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neutral-900 text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Most Popular in Katy
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        p.popular
                          ? "bg-white/10 text-slate-400"
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
                            p.popular ? "text-slate-400" : "text-neutral-800"
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
                    href="#tear-down-form"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm text-center block transition-all ${
                      p.popular
                        ? "bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg shadow-neutral-950/50"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    Choose {p.name} Plan
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Written Guarantee Box */}
        <div className="bg-slate-100 border-2 border-slate-300 rounded-3xl p-8 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
                The SearchPrex 90-Day Written Milestone Guarantee
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Before commencing work, we agree in writing upon specific technical deliverables, indexing benchmarks, and local search visibility milestones. If agreed milestones are not met by Day 90, we refund your monthly management fees in full. Zero disputes, zero excuses.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Case ROI Calculator */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Katy Case Fee Arithmetic</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                Calculate Your Real Net Caseload Return
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In Katy, legal retainers range from $3,500 to over $25,000+. Adjust the average fee per signed case and your expected monthly retainers to see the exact return on your SearchPrex investment.
              </p>

              {/* Slider 1: Average Case Fee */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>Average Fee per Retained Case:</span>
                  <span className="text-neutral-900 font-extrabold text-base">
                    ${caseValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="25000"
                  step="500"
                  value={caseValue}
                  onChange={(e) => setCaseValue(Number(e.target.value))}
                  className="w-full accent-[#171717] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>$2,500 (Misdemeanor / Uncontested)</span>
                  <span>$25,000+ (Catastrophic Injury / High Asset)</span>
                </div>
              </div>

              {/* Slider 2: Retainers Gained */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>New Retainers Generated per Month:</span>
                  <span className="text-neutral-800 font-extrabold text-base">
                    {monthlyRetainers} signed {monthlyRetainers === 1 ? "case" : "cases"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={monthlyRetainers}
                  onChange={(e) => setMonthlyRetainers(Number(e.target.value))}
                  className="w-full accent-[#334155] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>1 client / mo</span>
                  <span>8 clients / mo</span>
                </div>
              </div>
            </div>

            {/* Right: ROI Calculation Display */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">
                    Monthly SEO Investment ({currentPlan.name}):
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-800">
                    ${monthlyCost.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">
                    New Monthly Gross Fees:
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-neutral-800">
                    ${grossMonthlyRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Estimated Net Annual Revenue Added:
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                  +${annualNetProfit.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-slate-500">/ year</span>
                </div>
                <div className="text-xs font-bold text-neutral-800">
                  {roiMultiplier}x ROI on your SearchPrex management fee
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#tear-down-form"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm shadow-md transition-all text-center"
                >
                  <span>Lock in Exclusive Katy Territory</span>
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
