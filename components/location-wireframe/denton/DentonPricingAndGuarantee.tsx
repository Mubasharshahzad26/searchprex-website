"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, Calculator, ArrowRight, Sparkles } from "lucide-react";

export default function DentonPricingAndGuarantee() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(1); // Default to Growth ($1,400)
  const [selectedFee, setSelectedFee] = useState<number>(5000); // Default to $5,000 average case fee

  const plans = [
    {
      name: "Starter",
      price: 900,
      tag: "For Solo Practitioners",
      isPopular: false,
      features: [
        "1 Core Practice Area in Denton",
        "Google Business Profile & Local Foundation",
        "Whisper Call Tracking & Monthly Lead Report",
        "Written 90-Day Money-Back Milestone Guarantee",
      ],
    },
    {
      name: "Growth",
      price: 1400,
      tag: "Most Popular in Denton",
      isPopular: true,
      features: [
        "2 Practice Areas + Lewisville & Flower Mound Silos",
        "Comprehensive Local Citations & AI Citation Tracking",
        "Automated Client Review Acquisition Flow",
        "Direct Weekly Monday Updates with Founder",
      ],
    },
    {
      name: "Premier",
      price: 2000,
      tag: "For Competitive Litigation Firms",
      isPopular: false,
      features: [
        "3+ Practice Areas Across Denton & Submarkets",
        "Dedicated UNT & TWU Student/Parent Content Architecture",
        "Custom Lead Scoring Dashboard & Intake Review",
        "Priority Founder Direct Access & 24hr Turnaround",
      ],
    },
  ];

  const caseFees = [2500, 5000, 10000];
  const currentPlan = plans[selectedPlanIndex];
  const monthsCovered = (selectedFee / currentPlan.price).toFixed(1);

  return (
    <section id="guarantee" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fair Pricing &amp; Risk Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Denton Law Firm SEO Pricing & 90-Day Guarantee
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Transparent fixed monthly retainers with zero 12-month lock-in contracts. Every partnership is protected by our written milestone guarantee.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 items-stretch">
          {plans.map((p, idx) => {
            const isSelected = selectedPlanIndex === idx;
            return (
              <div
                key={p.name}
                onClick={() => setSelectedPlanIndex(idx)}
                className={`rounded-2xl p-7 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-2 border-neutral-900 shadow-xl shadow-neutral-950/10 transform -translate-y-1"
                    : "bg-white/80 border border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        p.isPopular
                          ? "bg-slate-100 text-neutral-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {p.tag}
                    </span>
                    {p.isPopular && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-neutral-900">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-neutral-950 mb-2">{p.name}</h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-neutral-950">
                      ${p.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">/ month</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    isSelected
                      ? "bg-neutral-900 hover:bg-neutral-800 text-white shadow-md shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {isSelected ? "Selected Tier" : `Choose ${p.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* 2 Bottom Columns: Guarantee Terms & Arithmetic Break-Even */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Column 1: 90-Day Money-Back Guarantee Box */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm">
            <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-neutral-800" />
              <span>The 90-Day Money-Back Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-4">
              If We Miss Our Agreed Milestones, You Get Your Money Back
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                <p><strong>Written Milestone Agreement:</strong> We define tangible deliverables (indexing, citations, GBP audit, and call tracking) in writing before Day 1.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                <p><strong>Transparent Checkpoints:</strong> You receive comprehensive progress updates at Day 30, Day 60, and Day 90.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                <p><strong>No-Questions-Asked Refund:</strong> If our agreed milestones are not met by Day 90, we promptly refund your service fees.</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              Zero fine print. We take on the financial risk so you can invest with total confidence.
            </div>
          </div>

          {/* Column 2: Interactive Arithmetic Calculator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-neutral-900" />
              <span>Client Acquisition Arithmetic</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-2">
              One Signed Case Covers How Many Months?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Select your firm&apos;s typical legal fee per signed retainer to see your coverage against the selected {currentPlan.name} plan (${currentPlan.price}/mo).
            </p>

            <div className="flex flex-wrap gap-2.5 mb-6">
              {caseFees.map((fee) => (
                <button
                  key={fee}
                  onClick={() => setSelectedFee(fee)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                    selectedFee === fee
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  ${fee.toLocaleString()} Average Retainer
                </button>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center mb-6">
              <div className="text-4xl sm:text-5xl font-black text-neutral-900 mb-1">
                {monthsCovered} Months
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700">
                Of your {currentPlan.name} plan paid for by just ONE signed client.
              </div>
            </div>

            <a
              href="#talk-to-me"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Lock In Exclusivity for Your Practice</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
