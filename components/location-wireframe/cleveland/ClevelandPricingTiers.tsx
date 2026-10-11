"use client";

import React from "react";
import { Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const TIERS = [
  {
    name: "Solo",
    price: "$1,500",
    period: "/month",
    description: "Designed for solo practitioners dominating a single legal niche in Cleveland.",
    highlight: false,
    badge: null,
    features: [
      "1 primary practice area (e.g. Injury or Workers' Comp)",
      "Google Business Profile 3-pack optimization",
      "5 core Cuyahoga County ranking pages",
      "Dynamic call tracking with Whisper attribution",
      "Monthly ROI and signed case ledger",
      "Direct email access to Founder Mubashar Shahzad",
    ],
    ctaLabel: "Start Solo Engagement",
  },
  {
    name: "Growth",
    price: "$3,000",
    period: "/month",
    description: "Ideal for boutique 2–5 attorney firms expanding into suburbs and capturing AI search.",
    highlight: true,
    badge: "Most Selected in Ohio",
    features: [
      "2 core practice areas (e.g. Injury + Criminal Defense)",
      "Suburban expansion silos (Lakewood, Parma, Beachwood)",
      "Ohio Bar & high-trust legal citation sprint",
      "Google AI Overview & LLM citation tracking",
      "Intake suite: missed-call text-back & lead scoring",
      "Bi-weekly strategy calls with Mubashar Shahzad",
    ],
    ctaLabel: "Start Growth Engagement",
  },
  {
    name: "Firm",
    price: "$5,000",
    period: "/month",
    description: "Full-scale market dominance for mid-size practices seeking to displace regional giants.",
    highlight: false,
    badge: null,
    features: [
      "Multiple practice groups & partner-level silos",
      "Complete Cuyahoga County & Summit County (Akron) coverage",
      "Aggressive high-authority media mentions & digital PR",
      "Multi-attorney call routing & intake leak audit",
      "Dedicated partner reporting dashboard",
      "Weekly executive strategy and market teardowns",
    ],
    ctaLabel: "Start Firm Engagement",
  },
];

export default function ClevelandPricingTiers() {
  const scrollToContact = () => {
    const el = document.getElementById("reality-check");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            07 · What you pay
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Three engagements, no long contract
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Compared with Google Ads PPC, where you pay inflated click costs plus agency fees and inquiries halt the moment you pause spend—our engagements are 100% month-to-month, building digital assets you own forever.
          </p>
        </div>

        {/* Pricing Cards Grid with enhanced animations */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`group rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative cursor-default ${
                tier.highlight
                  ? "border-2 border-[#534AB7] bg-gradient-to-b from-indigo-50/50 via-white to-white shadow-xl shadow-indigo-100/70 ring-2 ring-[#534AB7]/20 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-[#534AB7]/25"
                  : "border-2 border-slate-200 bg-white shadow-xs hover:-translate-y-2 hover:border-[#534AB7]/40 hover:shadow-xl hover:shadow-[#534AB7]/10"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-8 rounded-full bg-[#534AB7] px-3.5 py-1 text-xs font-extrabold text-white shadow-md flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-extrabold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors duration-200">
                  {tier.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed min-h-[40px]">
                  {tier.description}
                </p>

                <div className="mt-5 pb-5 border-b border-slate-100 flex items-baseline">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-[#0a0f2e]">
                    {tier.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 ml-1">
                    {tier.period}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="h-4 w-4 text-[#1a7d59] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={scrollToContact}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer ${
                    tier.highlight
                      ? "bg-[#534AB7] hover:bg-[#3C3489] text-white shadow-md shadow-[#534AB7]/25 hover:shadow-lg hover:shadow-[#534AB7]/35 hover:scale-[1.02] active:scale-[0.98]"
                      : "border-2 border-slate-200 bg-slate-50 text-[#0a0f2e] hover:border-[#534AB7] hover:bg-white hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="mt-2 text-[11px] text-center text-slate-400">
                  Month-to-month · 30-day notice to pause · Zero hostage assets
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
