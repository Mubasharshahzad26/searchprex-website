"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ChevronRight, Bot, Search } from "lucide-react";

const STEPS = [
  {
    num: "1",
    short: "1 Priorities",
    k: "Step 1",
    title: "Identify your key priorities",
    body: "We ask which cases you want, what a high-value client looks like, how fast you want to grow, and what you can invest. The architecture starts with your business model, not generic keyword lists.",
  },
  {
    num: "2",
    short: "2 Hurdles",
    k: "Step 2",
    title: "Identify what is in the way",
    body: "Competitor and AI-answer audits, Google Business Profile gaps, missing statutory schema, call-tracking holes, and intake leaks that drop the qualified leads you already receive in Cuyahoga County.",
  },
  {
    num: "3",
    short: "3 Path",
    k: "Step 3",
    title: "Map the path to fruitful leads",
    body: "We map the exact procedural searches that bring signed retainers—not just academic research traffic—and prioritize them by commercial case value and market winnability.",
  },
  {
    num: "4",
    short: "4 Strategy",
    k: "Step 4",
    title: "Design a modern, not traditional, strategy",
    body: "Entity and local proximity signals, practice-area silos, Ohio BWC statutory content, and LLM readiness (llms.txt + LegalService JSON-LD), engineered specifically for Cleveland search.",
  },
  {
    num: "5",
    short: "5 Execute",
    k: "Step 5",
    title: "Earn citations and mentions",
    body: "We publish, optimize, and build verified citations across Ohio Bar associations and regional business hubs, tracking your mention frequency in live AI prompts.",
  },
  {
    num: "6",
    short: "6 Prove it",
    k: "Step 6",
    title: "Report in signed cases",
    body: "A crystal-clear monthly ledger documenting inbound phone calls, form inquiries, signed cases, and cost per case. Every dollar invested has an immediate answer.",
  },
];

const AI_PROMPTS = [
  '"top personal injury law firm near Cleveland"',
  '"best workers\' comp lawyer in Cleveland, Ohio"',
  '"who should I call after a truck accident in Cuyahoga County"',
  '"estate planning attorney in Lakewood, OH"',
  '"experienced medical malpractice lawyers Cleveland Clinic"',
];

export default function ClevelandProcessAndAI() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            05 · Our process
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            We start with you, not with keywords
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Not traditional SEO. A 6-step roadmap built around your firm's case priorities, the hurdles in your way, and the latest 2026 search signals: verified citations, brand mentions, and Google AI Overviews.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6-Step Roadmap */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step selector tabs */}
            <div className="flex flex-wrap gap-2">
              {STEPS.map((s, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={s.num}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/30 scale-[1.02]"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:scale-[1.01]"
                    }`}
                  >
                    {s.short}
                  </button>
                );
              })}
            </div>

            {/* Active Step Highlight Card with animated glow */}
            <div className="group relative rounded-3xl border-2 border-[#534AB7]/40 bg-gradient-to-br from-[#EEEDFE]/70 via-white to-white p-7 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-[#534AB7]/10 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute inset-x-8 -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-[#534AB7] to-transparent rounded-t-full" />
              
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#534AB7]">
                {current.k}
              </span>
              <h3 className="mt-1 text-2xl font-extrabold text-[#0a0f2e]">
                {current.title}
              </h3>
              <p className="mt-3 text-base text-slate-700 leading-relaxed">
                {current.body}
              </p>
            </div>

            {/* AI Prompts We Aim to Win Card */}
            <div className="rounded-3xl border-2 border-slate-200 bg-slate-50/80 p-6 sm:p-7 space-y-3 shadow-xs hover:border-[#534AB7]/30 transition-all">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                <Bot className="h-4 w-4" />
                <span>AI Search Prompts We Position Your Firm to Win</span>
              </div>
              <p className="text-xs text-slate-500">
                Prospective clients now ask LLMs conversational questions. We structure your entity so Google Gemini & ChatGPT cite your attorneys:
              </p>

              <div className="space-y-2 pt-1">
                {AI_PROMPTS.map((prompt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-mono text-slate-800 shadow-2xs hover:border-[#534AB7]/50 hover:bg-indigo-50/30 hover:scale-[1.01] hover:text-[#534AB7] transition-all duration-200"
                  >
                    <Search className="h-3.5 w-3.5 text-[#534AB7] shrink-0" />
                    <span className="truncate">{prompt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: AI Citation Rate Tracker Gauge */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-slate-200 bg-white p-7 sm:p-8 shadow-sm space-y-6 text-center hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/40 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                  LLM Intelligence Engine
                </span>
                <h3 className="text-lg font-bold text-[#0a0f2e]">
                  AI Citation Rate Tracker
                </h3>
              </div>
              
              {/* Radar beacon */}
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active</span>
              </div>
            </div>

            {/* Gauge SVG with subtle glow */}
            <div className="relative inline-flex items-center justify-center my-2">
              <svg viewBox="0 0 160 160" className="h-44 w-44 drop-shadow-sm">
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="16"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#534AB7"
                  strokeWidth="16"
                  strokeDasharray="390"
                  strokeDashoffset="80"
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-black text-[#0a0f2e]">
                  82%
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Citation Rate
                </span>
              </div>
            </div>

            {/* Breakdown across major LLMs with hover highlight */}
            <div className="space-y-2 text-left text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-100">
                <span className="font-medium text-slate-700">Google AI Overviews</span>
                <span className="font-mono font-bold text-[#534AB7]">8 / 10 Prompts</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-100">
                <span className="font-medium text-slate-700">ChatGPT Search</span>
                <span className="font-mono font-bold text-[#534AB7]">7 / 10 Prompts</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-100">
                <span className="font-medium text-slate-700">Google Gemini</span>
                <span className="font-mono font-bold text-[#534AB7]">9 / 10 Prompts</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="font-medium text-slate-700">Perplexity Pro</span>
                <span className="font-mono font-bold text-[#534AB7]">8 / 10 Prompts</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-left pt-2 border-t border-slate-100">
              Measured against high-stakes Cuyahoga County legal intent queries. Updated in weekly client reporting.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
