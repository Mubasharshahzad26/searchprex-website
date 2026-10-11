"use client";

import React, { useState } from "react";
import { Clock, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

interface PhaseData {
  days: string;
  badge: string;
  title: string;
  objective: string;
  items: string[];
  adStatus: string;
}

const PHASES: PhaseData[] = [
  {
    days: "Days 1-30",
    badge: "STOP THE LEAKS",
    title: "Measure first, fix the obvious",
    objective:
      "Call tracking, Business Profile cleanup and establishing a firm baseline of your real PPC cost per signed case in Kent County.",
    items: [
      "Set up CallRail dynamic call tracking across your website and Google Business Profile",
      "Audit existing Google Ads search term reports to identify negative keyword waste ($500–$2,000/mo leak typical)",
      "Audit and normalize NAP citations across legal directories (Avvo, Justia, Martindale, State Bar of Michigan)",
      "Re-optimize primary GBP categories, service menus, and local geo-signals for Grand Rapids",
    ],
    adStatus: "Your Google Ads keep running uninterrupted while we build the foundation.",
  },
  {
    days: "Days 31-60",
    badge: "BUILD THE ASSETS",
    title: "Kent County practice silos & citation hardening",
    objective:
      "Publish high-intent statutory pages answering real legal questions, displacing thin directory listings from page one.",
    items: [
      "Publish dedicated Kent County practice area pages (e.g., high-asset divorce, auto torts, OWI defense)",
      "Implement deep LegalService and FAQPage JSON-LD schema referencing the 17th Circuit and 61st District Courts",
      "Deploy localized suburb landing pages for Wyoming, Kentwood, and Walker/Grandville",
      "Launch automated client review generation pipeline to outpace local Grand Rapids competitors in review velocity",
    ],
    adStatus: "Ads still running. Initial organic impressions and Map Pack position improvements begin appearing.",
  },
  {
    days: "Days 61-90",
    badge: "SCALE & TRIM PPC",
    title: "Map Pack top-3 entry & strategic ad spend reduction",
    objective:
      "Break into the Kent County Local 3-Pack, capture organic signed retainers, and trim waste from paid ad campaigns.",
    items: [
      "Break into top-3 Map Pack rankings for primary high-value legal searches in your territory",
      "First wave of verified organic phone calls and signed retainers logged in your CallRail dashboard",
      "Review organic case attribution against PPC cost-per-case data with founder Mubashar Shahzad",
      "Safely trim or pause expensive Google Ads keywords that your organic pages now dominate",
    ],
    adStatus: "Begin safely reallocating budget: trim wasted ad spend while organic intake sustains and compounds.",
  },
];

export default function GrandRapidsNinetyDayPlan() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const current = PHASES[activeTab];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-[#1a7d59] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            YOUR FIRST 90 DAYS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0f2e] mt-4 tracking-tight">
            No big bang. Proof first, then savings.
          </h2>
          <p className="text-[#566070] text-sm sm:text-base mt-2">
            We don’t ask you to make blind leaps of faith. We measure intake, establish your true baseline, and only trim ad spend when organic case data proves it is safe.
          </p>
        </div>

        {/* Phase Buttons */}
        <div className="flex flex-wrap gap-2.5 pb-6 border-b border-slate-200">
          {PHASES.map((phase, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-[#0a0f2e] !text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              {phase.days}
            </button>
          ))}
        </div>

        {/* Selected Phase Card */}
        <div className="mt-8 bg-slate-50/70 rounded-2xl p-7 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a7d59] bg-emerald-100 px-3 py-1 rounded-full">
                {current.badge}
              </span>
              <h3 className="text-2xl font-bold text-[#0a0f2e] mt-2">
                {current.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase">Phase Window</span>
              <p className="text-lg font-bold text-[#534AB7]">{current.days}</p>
            </div>
          </div>

          <p className="text-base text-[#566070] my-6 font-medium leading-relaxed">
            {current.objective}
          </p>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0a0f2e]">
              Exact Deliverables Executed:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {current.items.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1a7d59] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Status Indicator */}
          <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs sm:text-sm text-amber-900">
            <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <strong>Ad Spend Strategy: </strong>
              {current.adStatus}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
