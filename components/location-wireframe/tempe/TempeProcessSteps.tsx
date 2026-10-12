'use client';

import React from 'react';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TempeProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Technical Foundation & Proximity Fix",
      timeline: "Days 1 to 14",
      summary:
        "We correct fundamental technical architecture errors, eliminate crawling roadblocks, and align your Google Business Profile directly with Tempe municipal centroids.",
      deliverables: [
        "Sub-second Core Web Vitals load-speed optimization for mobile searchers.",
        "Maricopa County legal citation cleanup and canonical URL restructuring.",
        "Primary GBP category restructuring for DUI, criminal defense, and injury.",
      ],
    },
    {
      number: "02",
      title: "Arizona Statutory Silos & Court Mapping",
      timeline: "Days 15 to 30",
      summary:
        "We author deep, statute-specific practice pages that directly answer complex Arizona legal questions before your competitors can respond.",
      deliverables: [
        "Statutory pages for Extreme DUI (A.R.S. § 28-1382) and ASU student violations.",
        "Dedicated procedural guides for Tempe Municipal and Southeast Superior Court.",
        "Structured FAQPage and LegalService Schema deployment for AI engine citation.",
      ],
    },
    {
      number: "03",
      title: "East Valley Entity Authority & Digital PR",
      timeline: "Days 31 to 60",
      summary:
        "We build genuine local search authority across the East Valley through verified legal citations, local press coverage, and jurisdictional backlinks.",
      deliverables: [
        "Acquisition of Arizona legal directory citations and local press coverage.",
        "Submarket expansion into South Tempe, Chandler, Mesa, and Papago corridors.",
        "Review generation system setup to outpace competing Phoenix practices.",
      ],
    },
    {
      number: "04",
      title: "AI Answer Optimization & Retainer Scaling",
      timeline: "Days 61 to 90+",
      summary:
        "We secure top placement in Google AI Overviews and ChatGPT answer engines, converting increased visibility into signed client retainers.",
      deliverables: [
        "Answer Engine Optimization (AEO) to capture conversational legal queries.",
        "Call tracking and intake attribution analysis to measure signed cases.",
        "Ongoing monthly technical iteration with zero long-term contract lock-in.",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            Systematic Execution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            The 90-Day Tempe Legal Search Dominance Roadmap
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A methodical, milestone-driven protocol engineered to establish undeniable search authority across Tempe and Maricopa County.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-[#4338ca]">
                    {step.number}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.summary}
                </p>

                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-800 mb-2">Key Milestones:</p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {step.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold text-slate-900">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
