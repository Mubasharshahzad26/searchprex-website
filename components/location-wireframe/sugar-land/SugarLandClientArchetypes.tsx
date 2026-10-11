"use client";

import React, { useState } from "react";
import { Shield, Clock, Globe2, AlertCircle, Briefcase, CheckCircle2, HeartHandshake } from "lucide-react";

export default function SugarLandClientArchetypes() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const archetypes = [
    {
      name: "Legacy Protectors",
      icon: Shield,
      feeling: "Protecting what they built over decades",
      risk: "Unfair asset division, public exposure of wealth, or losing control of family holdings.",
      trustFactors: "Board certification credentials, absolute privacy discretion, transparent fee structures, and calm judicial authority.",
      practices: "High-Asset Divorce, QDROs, Revocable Living Trusts, Executive Estate Planning",
      badgeColor: "bg-[#534AB7]/10 text-[#534AB7]",
    },
    {
      name: "Time-Poor Professionals",
      icon: Clock,
      feeling: "High stakes, demanding executive schedule, zero time to waste",
      risk: "Protracted litigation dragging out for months, slow attorney communication, and billable hour waste.",
      trustFactors: "Immediate callback protocols, seamless digital intake, online consultation booking, and crisp, direct counsel.",
      practices: "Executive Employment Agreements, Corporate Governance, Fast-Track Uncontested Divorce",
      badgeColor: "bg-[#1a7d59]/10 text-[#1a7d59]",
    },
    {
      name: "Multilingual Families",
      icon: Globe2,
      feeling: "Desiring cultural respect, precise language clarity, and generational protection",
      risk: "Procedural misinterpretation, complex USCIS delays, or unintended probate loss across borders.",
      trustFactors: "Verified bilingual communication (Spanish, Mandarin, Hindi), cultural fluency, and cross-border estate structures.",
      practices: "EB-5 & Investor Immigration, Family Visa Petitions, Transnational Estate Planning",
      badgeColor: "bg-[#3C3489]/10 text-[#3C3489]",
    },
    {
      name: "Commuters in Crisis",
      icon: AlertCircle,
      feeling: "Shaken, physically injured, and overwhelmed by predatory insurance adjusters",
      risk: "Mounting medical debt, lost executive earnings, and being pressured into premature settlements.",
      trustFactors: "Direct attorney access from day one, plain-English guidance on Texas fault rules, and proven trial results.",
      practices: "Highway 6 Collisions, I-69 / US-59 Commercial Freight Crashes, Catastrophic Injury",
      badgeColor: "bg-[#1a7d59]/10 text-[#1a7d59]",
    },
    {
      name: "Local Business Owners",
      icon: Briefcase,
      feeling: "Fierce pride in enterprise combined with commercial vulnerability",
      risk: "Partner deadlock, vendor breach, or employment disputes that threaten business viability.",
      trustFactors: "Commercial acumen, pragmatic dispute resolution, and contractual clarity without legalese.",
      practices: "Commercial Leases, Shareholder Operating Agreements, Partnership Dissolution",
      badgeColor: "bg-[#534AB7]/10 text-[#534AB7]",
    },
  ];

  const current = archetypes[selectedIdx];
  const Icon = current.icon;

  return (
    <section id="archetypes" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Target Searcher Psychology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Sugar Land Clients Are Not Shopping. They Are Protecting Something.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Fort Bend County is affluent, educated, and culturally diverse. Searchers do not respond to generic marketing hype—they look for counsel who understands their precise life situation. Select an archetype to inspect their search psychology:
          </p>
        </div>

        {/* Archetype Selector Chips */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {archetypes.map((a, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={a.name}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#0a0f2e] text-white border-[#0a0f2e] shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>

        {/* Selected Archetype Insight Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#534AB7]/10 text-[#534AB7] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${current.badgeColor}`}>
                    Searcher Archetype
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight mt-1">
                    {current.name}
                  </h3>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-slate-200/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    What They Are Experiencing:
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {current.feeling}
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-2xl bg-white border border-slate-200/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Their Biggest Fear &amp; Perceived Risk:
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {current.risk}
                  </p>
                </div>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-[#EEEDFE]/40 border border-[#534AB7]/30">
                <div className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                  What Truly Earns Their Retainer:
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {current.trustFactors}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Relevant Practice Silos:
              </div>
              <div className="text-sm font-extrabold text-[#0a0f2e] leading-relaxed">
                {current.practices}
              </div>
              <div className="pt-2 text-xs text-slate-600 leading-relaxed">
                We engineer dedicated content hubs answering the exact jurisdictional nuances these high-asset searchers look for before calling an attorney.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
