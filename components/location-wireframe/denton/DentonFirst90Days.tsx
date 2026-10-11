"use client";

import React, { useState } from "react";
import { Calendar, CheckCircle2, ShieldCheck, ArrowRight, Clock } from "lucide-react";

export default function DentonFirst90Days() {
  const [activeDay, setActiveDay] = useState<number>(0);

  const checkpoints = [
    {
      day: "Day 1",
      name: "Kickoff & Foundation Audit",
      progress: "10%",
      whatIDo: "Kickoff onboarding call, Google Search Console & Business Profile access, call tracking setup, and a deep technical audit of your website and DFW competitors.",
      whatYouFeel: "Instant relief: someone experienced finally has their hands on the wheel.",
      checkpoint: "Tangible performance milestones agreed and documented in writing.",
    },
    {
      day: "Day 30",
      name: "Technical Remediation & First Hub",
      progress: "35%",
      whatIDo: "All crawl errors and schema gaps resolved, Google Business Profile fully optimized, and your first primary Denton County practice silo published.",
      whatYouFeel: "Clear visibility: you see indexation improvements and tangible progress.",
      checkpoint: "First 30-day formal milestone review with Founder Mubashar Sharif.",
    },
    {
      day: "Day 60",
      name: "Submarket Expansion & Citations",
      progress: "68%",
      whatIDo: "Lewisville and Flower Mound silos live, local Denton Bar citations verified, automated review flow active, and initial AI Overview citation baseline established.",
      whatYouFeel: "Real momentum: phone inquiries start shifting toward high-value retainers.",
      checkpoint: "Second 60-day milestone calibration and review adjustment.",
    },
    {
      day: "Day 90",
      name: "Retainer ROI & Guarantee Review",
      progress: "100%",
      whatIDo: "Comprehensive quarterly report analyzing Whisper call volume, signed retainers, Local 3-Pack rank gains, and generative AI citation frequency.",
      whatYouFeel: "Unshakable confidence and peace of mind about your firm's pipeline.",
      checkpoint: "Guarantee fulfillment: milestones confirmed or 100% service fee refund.",
    },
  ];

  const current = checkpoints[activeDay];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Structured Implementation Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Your First 90 Days: You Will Never Wonder What Is Happening
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Unlike agencies that vanish after receiving your first invoice, SearchPrex follows an exact 90-day execution protocol with weekly Monday updates and formal milestone reviews.
          </p>
        </div>

        {/* Progress Timeline Header */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <span>Onboarding &amp; Execution Progress</span>
            <span className="text-[#534AB7]">{current.day}: {current.name}</span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-[#534AB7] to-[#1a7d59] transition-all duration-500 rounded-full"
              style={{ width: current.progress }}
            />
          </div>

          {/* Timeline Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {checkpoints.map((cp, idx) => {
              const isActive = activeDay === idx;
              return (
                <button
                  key={cp.day}
                  onClick={() => setActiveDay(idx)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isActive
                      ? "bg-[#534AB7] text-white border-[#534AB7] shadow-md shadow-[#534AB7]/20"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#534AB7]"}`} />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                      {cp.day}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm sm:text-base">
                    {cp.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Detail Columns for Selected Day */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Col 1: What I Do */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#534AB7] uppercase tracking-wider mb-3">
                1. What I Execute
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
                {current.whatIDo}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 text-xs text-slate-500 mt-6">
              Hands-on founder execution
            </div>
          </div>

          {/* Col 2: What You Feel */}
          <div className="bg-[#EEEDFE]/40 rounded-2xl p-6 sm:p-7 border border-[#534AB7]/30 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#1a7d59] uppercase tracking-wider mb-3">
                2. What You Feel
              </div>
              <p className="text-base sm:text-lg text-[#0a0f2e] leading-relaxed font-bold italic">
                &quot;{current.whatYouFeel}&quot;
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-100 text-xs text-slate-500 mt-6">
              Client experience milestone
            </div>
          </div>

          {/* Col 3: Guarantee Checkpoint */}
          <div className="bg-[#0a0f2e] text-white rounded-2xl p-6 sm:p-7 border border-[#3C3489] shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>3. Guarantee Checkpoint</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-semibold">
                {current.checkpoint}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-emerald-400 font-bold mt-6">
              Protected by written agreement
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
