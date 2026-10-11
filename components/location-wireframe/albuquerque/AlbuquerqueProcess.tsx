"use client";

import React, { useState } from "react";
import { Headphones, Compass, Code2, LineChart, CheckCircle2, ArrowRight } from "lucide-react";

export default function AlbuquerqueProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: 1,
      title: "Listen",
      heading: "We Listen to Your Firm First",
      desc: "An in-depth intake consultation with your managing partners. We define your ideal case profile, case capacity, target submarkets (Rio Rancho, Westside, Santa Fe), and courtroom history. We never pitch cookie-cutter packages.",
      clientFeel: "Understood, respected, and never sold to.",
      icon: Headphones,
      deliverable: "Firm intake blueprint & capacity scope",
    },
    {
      step: 2,
      title: "Map",
      heading: "We Map the Albuquerque Opportunity",
      desc: "Comprehensive competitor geo-grid audit, directory gap analysis, and bilingual keyword mapping in English and Spanish. We uncover where national aggregators outspend you and where high-intent case volume is undefended.",
      clientFeel: "Complete clarity about where your practice stands.",
      icon: Compass,
      deliverable: "Albuquerque Opportunity Map & Keyword Architecture",
    },
    {
      step: 3,
      title: "Build",
      heading: "We Build with Your Authentic Voice",
      desc: "We write and launch jurisdiction-grounded practice silos, optimize your Google Business Profile, implement Spanish hreflang architectures, and deploy LegalService JSON-LD schema — with your attorneys reviewing every legal claim.",
      clientFeel: "Proud of high-authority content carrying your name.",
      icon: Code2,
      deliverable: "Fully indexed practice silos & verified citations",
    },
    {
      step: 4,
      title: "Prove",
      heading: "We Show the Numbers & Retainers",
      desc: "Transparent monthly performance reviews tracking Whisper call recordings, signed retainers, Google Map Pack grid coordinates, and AI citation frequency. Zero vanity fluff or confusing 50-page metric dumps.",
      clientFeel: "Confidence, steady inquiries, and peace of mind.",
      icon: LineChart,
      deliverable: "Monthly Call Attribution & Signed Case Revenue Report",
    },
  ];

  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Listen. Map. Build. Prove.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            How we partner with Albuquerque law firms to build compounding organic dominance. Every step is transparent, methodical, and founder-supervised.
          </p>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx;
            const StepIcon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isActive
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-md shadow-[#534AB7]/20"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                    Phase {item.step}
                  </span>
                  <StepIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#534AB7]"}`} />
                </div>
                <div className="font-extrabold text-base sm:text-lg">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Main What We Do Card */}
          <div className="md:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#534AB7] uppercase tracking-wider mb-2">
                <Icon className="w-4 h-4 text-[#534AB7]" />
                <span>Phase {current.step} Deliverable</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#0a0f2e] mb-4">
                {current.heading}
              </h3>
              <p className="text-base text-slate-700 leading-relaxed mb-6">
                {current.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700">
              <span>Primary Milestone:</span>
              <span className="text-[#534AB7] font-bold">{current.deliverable}</span>
            </div>
          </div>

          {/* What You Feel Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 rounded-2xl border-2 border-[#534AB7]/30 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-bold text-[#1a7d59] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7d59]" />
                <span>What Managing Partners Experience</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-500 mb-2">
                Client Peace of Mind
              </h4>
              <p className="text-xl sm:text-2xl font-extrabold text-[#0a0f2e] leading-snug">
                &quot;{current.clientFeel}&quot;
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80">
              <a
                href="#reality-check"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#534AB7] hover:text-[#3C3489] transition-colors"
              >
                <span>Initiate Step 1 with a Free Reality Check</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
