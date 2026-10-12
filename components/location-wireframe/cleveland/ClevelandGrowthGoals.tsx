"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Target, AlertCircle, Compass, CheckCircle, Sparkles } from "lucide-react";

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
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            02 · How you want to grow
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Cleveland Law Practice Growth Goals
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select your firm's primary objective to see how our{" "}
            <Link href="/services/law-firm-seo" className="font-semibold text-neutral-900 underline hover:text-neutral-950">
              law firm SEO strategy
            </Link>{" "}
            navigates local competition and builds a consistent case pipeline:
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
                className={`rounded-xl px-4 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-md shadow-sm scale-[1.02]"
                    : "border-2 border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:scale-[1.01]"
                }`}
              >
                {goal.name}
              </button>
            );
          })}
        </div>

        {/* 3-Column Goal Analysis Cards with hover lift and glow */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Your Priority */}
          <div className="group relative rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-xs hover:shadow-xl hover:shadow-sm hover:border-neutral-900/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <Target className="h-4 w-4 text-neutral-900 group-hover:scale-110 transition-transform" />
                <span>Your Strategic Priority</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-950">
                {current.short}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {current.priority}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400">
              Target Outcome
            </div>
          </div>

          {/* Card 2: Likely Hurdle */}
          <div className="group relative rounded-3xl border-2 border-slate-200 bg-slate-50/90 p-7 shadow-xs hover:shadow-xl hover:shadow-sm hover:border-neutral-900/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                <AlertCircle className="h-4 w-4 text-slate-500 group-hover:scale-110 transition-transform" />
                <span>Cuyahoga County Hurdle</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-950">
                What Stands in the Way
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {current.hurdle}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-slate-500">
              Market Challenge Addressed
            </div>
          </div>

          {/* Card 3: SearchPrex Path */}
          <div className="group relative rounded-3xl border-2 border-neutral-900 bg-gradient-to-br from-[#f1f5f9] via-white to-white p-7 shadow-md hover:shadow-2xl hover:shadow-sm hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            {/* Top highlight bar */}
            <div className="absolute inset-x-8 -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent rounded-t-full opacity-80" />

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <Compass className="h-4 w-4 text-neutral-900 group-hover:rotate-45 transition-transform duration-300" />
                <span>Our SearchPrex Path</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-950">
                Architected Roadmap
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 font-medium">
                {current.path}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-900/20 text-xs font-bold text-neutral-900 flex items-center justify-between">
              <span>Execution Blueprint</span>
              <span className="group-hover:translate-x-1 transition-transform">•</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
