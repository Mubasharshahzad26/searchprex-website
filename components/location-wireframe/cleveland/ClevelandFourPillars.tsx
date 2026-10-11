"use client";

import React from "react";
import { DollarSign, BarChart3, KeyRound, Sparkles } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "Predictability",
    icon: <DollarSign className="h-6 w-6 text-[#534AB7]" />,
    body: "A budget you can plan around, not an ad auction that spikes. Flat monthly fee with documented milestones across Cuyahoga County.",
  },
  {
    num: "02",
    title: "Proof",
    icon: <BarChart3 className="h-6 w-6 text-[#1a7d59]" />,
    body: "Inbound calls, signed cases, and cost per case reported in a transparent monthly ledger, not a vanity impressions report.",
  },
  {
    num: "03",
    title: "Control",
    icon: <KeyRound className="h-6 w-6 text-[#534AB7]" />,
    body: "You own your Google Business Profile, website code, analytics, and tracking numbers. No proprietary CMS lock-in, no hostage digital assets.",
  },
  {
    num: "04",
    title: "No hype",
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
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
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:border-[#534AB7]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-2xl bg-[#EEEDFE] p-3">
                    {p.icon}
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-slate-300">
                    {p.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0a0f2e]">
                  {p.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {p.body}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#534AB7]">
                SearchPrex Standard
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
