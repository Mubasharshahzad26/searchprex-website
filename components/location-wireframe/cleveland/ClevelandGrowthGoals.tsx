"use client";

import React, { useState } from "react";
import { Target, AlertCircle, Compass, CheckCircle } from "lucide-react";

const GOALS = [
  {
    name: "More cases from current practice",
    short: "Current practice",
    priority: "Fill your partner and associate calendars with the exact case types you already handle best and generate highest fee margins on.",
    hurdle: "National aggregators (Justia, FindLaw, Avvo) hold organic page one for broad terms, pushing solo and boutique firms below the fold.",
    path: "Win the local Map Pack (3-pack) and architect one deep, answer-first silo per core case type, with every call tracked to signed cases.",
  },
  {
    name: "Add a new practice area",
    short: "New practice line",
    priority: "Launch a secondary revenue line (e.g., adding Ohio BWC workers' comp or estate planning) without burning a year of capital.",
    hurdle: "A single thin, generic practice page will neither rank in competitive Cuyahoga County SERPs nor convince a cautious client to call.",
    path: "Comprehensive intent research first, followed by a dedicated 5-page topical cluster that establishes immediate statutory depth without cannibalizing existing pages.",
  },
  {
    name: "Cut PPC & lead-vendor dependence",
    short: "Cut PPC dependence",
    priority: "Drastically reduce cost per signed case and stop paying $300+/click or buying non-exclusive recycled leads from third-party vendors.",
    hurdle: "Cutting paid ads cold turkey drops call volume overnight before organic rankings have matured.",
    path: "Deploy organic alongside current PPC campaigns, prove case acquisition in your monthly ledger, then surgically trim ad spend only where organic carries the load.",
  },
  {
    name: "Reach the affluent suburbs",
    short: "Suburban expansion",
    priority: "Capture high-value clients across Lakewood, Parma, Beachwood, Westlake, Euclid, and Shaker Heights.",
    hurdle: "A single Downtown Cleveland address fails to trigger Map Pack and organic rankings across Cuyahoga County's suburban clusters.",
    path: "Build dedicated suburban localized silos with unique municipal court anchors, community references, and localized entity schema.",
  },
];

export default function ClevelandGrowthGoals() {
  const [selectedGoal, setSelectedGoal] = useState(0);
  const current = GOALS[selectedGoal];

  return (
    <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            02 · How you want to grow
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            What is your growth goal for the next 12 months?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select your firm's primary objective to see how SearchPrex navigates the local hurdle and builds a reliable pipeline:
          </p>
        </div>

        {/* Goal selector tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {GOALS.map((goal, idx) => {
            const isSelected = selectedGoal === idx;
            return (
              <button
                key={goal.name}
                onClick={() => setSelectedGoal(idx)}
                className={`rounded-xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25"
                    : "border-2 border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                {goal.name}
              </button>
            );
          })}
        </div>

        {/* 3-Column Goal Analysis Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Your Priority */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
              <Target className="h-4 w-4" />
              <span>Your Strategic Priority</span>
            </div>
            <h3 className="text-lg font-bold text-[#0a0f2e]">
              {current.short}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {current.priority}
            </p>
          </div>

          {/* Card 2: Likely Hurdle */}
          <div className="rounded-3xl border-2 border-slate-200 bg-rose-50/40 p-7 shadow-sm border-rose-200/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-3">
              <AlertCircle className="h-4 w-4" />
              <span>Cuyahoga County Hurdle</span>
            </div>
            <h3 className="text-lg font-bold text-[#0a0f2e]">
              What Stands in the Way
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {current.hurdle}
            </p>
          </div>

          {/* Card 3: SearchPrex Path */}
          <div className="rounded-3xl border-2 border-[#534AB7] bg-gradient-to-br from-[#EEEDFE]/80 to-white p-7 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
              <Compass className="h-4 w-4 text-[#534AB7]" />
              <span>Our SearchPrex Path</span>
            </div>
            <h3 className="text-lg font-bold text-[#0a0f2e]">
              Architected Roadmap
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 font-medium">
              {current.path}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
