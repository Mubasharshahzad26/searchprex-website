"use client";

import React, { useState } from "react";
import { CheckCircle2, Waves, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function SugarLandRescueSteps() {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      stepNumber: "Step 1",
      name: "Stabilize",
      progress: "25%",
      timeline: "Days 1 – 30",
      actions:
        "Deploy Whisper call tracking with lead attribution, fix critical Google Business Profile categories, run full crawl audit, and benchmark existing AI citation presence. Your current paid campaigns remain running without disruption.",
      feeling: "Relief. You finally see verified numbers and stop guessing where consultation inquiries originate.",
      milestone: "Technical health score 90+ & call recording live.",
    },
    {
      stepNumber: "Step 2",
      name: "Surface",
      progress: "50%",
      timeline: "Days 30 – 60",
      actions:
        "Priority high-asset practice pages and Fort Bend community hubs (First Colony, Riverstone, Sweetwater) go live with LegalService and FAQPage schema. Richmond court venue pages begin indexing.",
      feeling: "Momentum. Inbound intake calls start to feel local, educated, and directly aligned with your target retainer value.",
      milestone: "Local Fort Bend practice hubs fully crawled and indexed by Google.",
    },
    {
      stepNumber: "Step 3",
      name: "Secure",
      progress: "75%",
      timeline: "Days 60 – 75",
      actions:
        "Systematic client review collection workflows launch. High-authority Texas legal citations and local Fort Bend citations build local entity trust. Generative AI citation rate across Perplexity and ChatGPT climbs.",
      feeling: "Confidence. Prospective clients mention finding your glowing client reviews and citable answers in Google.",
      milestone: "First wave of Local 3-Pack rank expansion across Sugar Land and Missouri City.",
    },
    {
      stepNumber: "Step 4",
      name: "Scale",
      progress: "100%",
      timeline: "Days 75 – 90+",
      actions:
        "Expand practice silos into adjacent Fort Bend submarkets (Stafford, Richmond, Rosenberg) and optional multilingual hubs. Evaluate call volume data to begin trimming bloated PPC spend without sacrificing signed retainers.",
      feeling: "Calm. Your firm's caseload no longer depends on an expensive daily ad budget. You own your organic pipeline.",
      milestone: "90-Day Written Milestone Review & ROI assessment.",
    },
  ];

  const current = steps[selectedStep];

  return (
    <section id="rescue-steps" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Waves className="w-3.5 h-3.5" />
            <span>The 90-Day Rescue Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Four Steps From Drowning in Ads to Calm Water
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A methodical, milestone-driven transition from fragile pay-per-click dependency to an enduring, high-equity organic practice presence in Sugar Land.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#534AB7] h-full transition-all duration-500 rounded-full"
            style={{ width: current.progress }}
          />
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {steps.map((s, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setSelectedStep(idx)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0a0f2e] text-white border-[#0a0f2e] shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? "text-emerald-400" : "text-slate-400"}`}>
                  {s.stepNumber}
                </div>
                <div className="text-lg font-extrabold tracking-tight mt-0.5">
                  {s.name}
                </div>
                <div className={`text-xs mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                  {s.timeline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{current.stepNumber}: {current.name} Roadmap</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight">
                What We Execute for Your Firm
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {current.actions}
              </p>

              <div className="p-4 rounded-2xl bg-[#EEEDFE]/40 border border-[#534AB7]/30 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#534AB7] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Contractual Guarantee Checkpoint:</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  {current.milestone}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-7 border border-slate-200 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#534AB7]" />
                <span>What You &amp; Your Firm Experience:</span>
              </div>
              <p className="text-lg sm:text-xl font-extrabold text-[#0a0f2e] leading-snug">
                &quot;{current.feeling}&quot;
              </p>
              <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                Every step is backed by weekly Monday reporting from Mubashar Sharif, so you always know where your practice stands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
