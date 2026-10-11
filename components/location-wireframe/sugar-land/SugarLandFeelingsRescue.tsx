"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SugarLandFeelingsRescue() {
  const [selectedFeeling, setSelectedFeeling] = useState(0);

  const feelings = [
    {
      name: "Overshadowed",
      painTitle: "Houston mega-firms outrank me in my own backyard",
      painBody:
        "Downtown and Galleria firms dominate organic positions on broad legacy domain authority alone, even though they lack a single dedicated page addressing the Fort Bend County Justice Center in Richmond or First Colony neighborhoods.",
      rescueTitle: "Win the Hyper-Local Relevance Race",
      rescueBody:
        "We build authentic Fort Bend County practice silos, Richmond court filing guides, and localized entity schema that prove to Google and prospective clients that your firm is the legitimate local authority.",
    },
    {
      name: "Overbilled",
      painTitle: "I keep paying $250+ per click for tire-kickers who never sign",
      painBody:
        "The Houston legal PPC auction is brutally predatory. Large personal injury and divorce firms bid up common keywords to unsustainable levels, and incoming lead volume immediately plummets to zero the second your daily ad budget is exhausted.",
      rescueTitle: "Build Compounding Organic Practice Equity",
      rescueBody:
        "Organic practice silos, client review engines, and localized citation hubs compound indefinitely. Once established, they generate signed retainers month after month without paying Google a single cent per click.",
    },
    {
      name: "Invisible",
      painTitle: "Google Map Pack and AI search engines never cite my firm",
      painBody:
        "Prospective clients increasingly consult Google AI Overviews, Perplexity, and Apple Maps before clicking traditional organic links. Unoptimized GBP listings and unstructured pages leave your practice entirely invisible in AI recommendations.",
      rescueTitle: "Be the Authoritative Answer Where Clients Ask",
      rescueBody:
        "We craft answer-first legal definitions, deploy LegalService and FAQPage JSON-LD schema, generate machine-readable llms.txt files, and track your active citation rate across generative search engines.",
    },
  ];

  const current = feelings[selectedFeeling];

  return (
    <section id="feelings-rescue" className="py-20 bg-[#0a0f2e] text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Reality Facing Sugar Land Partners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Overshadowed. Overbilled. Invisible.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Three distinct frustrations we hear consistently from Fort Bend managing attorneys. Select a challenge to see how we systematically solve it:
          </p>
        </div>

        {/* Feeling Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {feelings.map((f, idx) => {
            const isSelected = selectedFeeling === idx;
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => setSelectedFeeling(idx)}
                className={`px-6 py-3.5 rounded-xl font-bold text-sm transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-lg shadow-indigo-950/50"
                    : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                {f.name}
              </button>
            );
          })}
        </div>

        {/* 2-Column Side-by-Side: The Pain vs The Rescue */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Pain */}
          <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-8 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>The Fort Bend Pain Point</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {current.painTitle}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {current.painBody}
            </p>
          </div>

          {/* Right: The Rescue */}
          <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-slate-900 to-[#132820] p-8 sm:p-10 space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>The SearchPrex Rescue</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-tight">
              {current.rescueTitle}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {current.rescueBody}
            </p>
            <div className="pt-4">
              <a
                href="#rescue-steps"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                <span>Explore the 4-step execution plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
