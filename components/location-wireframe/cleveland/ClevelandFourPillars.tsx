"use client";

import React from "react";
import { DollarSign, BarChart3, KeyRound, Sparkles } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "Predictability",
    icon: DollarSign,
    body: "A budget you can plan around, not an ad auction that spikes. Flat monthly fee with documented milestones across Cuyahoga County.",
  },
  {
    num: "02",
    title: "Proof",
    icon: BarChart3,
    body: "Inbound calls, signed cases, and cost per case reported in a transparent monthly ledger, not a vanity impressions report.",
  },
  {
    num: "03",
    title: "Control",
    icon: KeyRound,
    body: "You own your Google Business Profile, website code, analytics, and tracking numbers. No proprietary CMS lock-in, no hostage digital assets.",
  },
  {
    num: "04",
    title: "No hype",
    icon: Sparkles,
    body: "Transparent expectations. PPC delivers faster initial inquiries while SEO builds compounding equity. Zero fake ranking guarantees.",
  },
];

export default function ClevelandFourPillars() {
  return (
    <section className="border-b border-slate-200 bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            01 · What you actually want
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Four things Cleveland attorneys ask us for
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Before we talk technical architecture, we align with what a solo practitioner or a partner-track firm needs to feel completely safe investing in SEO.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="group relative rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-xs hover:shadow-xl hover:shadow-[#534AB7]/15 hover:border-[#534AB7]/50 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glowing top accent indicator */}
                <div className="absolute inset-x-8 -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-[#534AB7] to-transparent rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="rounded-2xl bg-[#EEEDFE] p-3.5 text-[#534AB7] group-hover:bg-[#534AB7] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-2xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-2xl font-extrabold text-slate-300 group-hover:text-[#534AB7] transition-colors duration-300">
                      {p.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors duration-200">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#534AB7]">
                  <span>SearchPrex Standard</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
