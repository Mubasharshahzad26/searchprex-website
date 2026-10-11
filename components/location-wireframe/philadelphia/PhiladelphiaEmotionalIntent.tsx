"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeartHandshake, ArrowRight, ShieldCheck, Heart } from "lucide-react";

const EMOTIONAL_SITUATIONS = [
  {
    name: "Car Collision & Tort Choice",
    feel: "Anger, pain, and total confusion about insurance elections",
    search: '"limited tort vs full tort Pennsylvania", "car accident lawyer South Philly"',
    need: "A direct, unscripted explanation of what their policy election means, statutory exceptions, and how an attorney overcomes insurance adjusters.",
    tone: "Direct, realistic, and street-smart.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal Injury & Motor Vehicle SEO",
  },
  {
    name: "Workplace Injury (Workers' Comp)",
    feel: "Deep anxiety regarding lost wages and family medical bills",
    search: '"injured at work Pennsylvania what to do", "workers comp lawyer Northeast Philly"',
    need: "Clear procedural clarity on the 120-day notice window, Petition for Benefits, and Pennsylvania Bureau of Workers' Compensation rights.",
    tone: "Reassuring, structured, and protective.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Workers' Compensation Practice SEO",
  },
  {
    name: "DUI & Criminal Charges",
    feel: "Urgent panic, reputational dread, and fear of license loss",
    search: '"DUI first offense Pennsylvania", "ARD program Philadelphia lawyer"',
    need: "Non-judgmental tactical roadmap: ARD eligibility, 30-day court windows, and license suspension defense at Philadelphia Municipal Court.",
    tone: "Immediate, composed, and non-judgmental.",
    href: "/services/law-firm-seo/criminal-defense",
    linkLabel: "DUI & Criminal Defense SEO",
  },
  {
    name: "High-Conflict Divorce & Custody",
    feel: "Overwhelming stress regarding child custody and financial division",
    search: '"custody lawyer Philadelphia", "equitable distribution Pennsylvania attorney"',
    need: "Compassionate, objective guidance through the Philadelphia Family Court division, child support calculations, and marital asset valuation.",
    tone: "Empathetic, firm, and strategically composed.",
    href: "/services/law-firm-seo/family-law",
    linkLabel: "Family Law & Domestic Relations SEO",
  },
];

export default function PhiladelphiaEmotionalIntent() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = EMOTIONAL_SITUATIONS[selectedIdx];

  return (
    <section id="feel" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
            <HeartHandshake className="h-4 w-4" />
            <span>Search Psychology & Tone of Voice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
            Client Search Psychology: Converting High-Pressure Philadelphia Inquiries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Philadelphia clients are skeptical and street-smart. They immediately detect boilerplate corporate marketing and click away. We calibrate your copy to sound authentically local, direct, and authoritative:
          </p>
        </div>

        {/* Situation Chips */}
        <div className="mt-10 flex flex-wrap gap-2.5 mb-8">
          {EMOTIONAL_SITUATIONS.map((sit, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={sit.name}
                onClick={() => setSelectedIdx(idx)}
                className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25 scale-102"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                }`}
              >
                {sit.name}
              </button>
            );
          })}
        </div>

        {/* 4-Column Psychology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: What They Feel */}
          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Emotional State
            </span>
            <h4 className="text-lg font-extrabold text-[#0a0f2e]">
              What They Feel
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {current.feel}
            </p>
          </div>

          {/* Card 2: What They Quietly Search */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-2 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block">
              Private Google Queries
            </span>
            <h4 className="text-lg font-extrabold text-[#0a0f2e]">
              What They Quietly Search
            </h4>
            <p className="text-xs font-mono text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
              {current.search}
            </p>
          </div>

          {/* Card 3: What They Need to Read */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-2 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a7d59] block">
              Conversion Trigger
            </span>
            <h4 className="text-lg font-extrabold text-[#0a0f2e]">
              What They Need to Read
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {current.need}
            </p>
          </div>

          {/* Card 4: Our Strategic Tone & Silo Link */}
          <div className="rounded-3xl border-2 border-[#534AB7] bg-gradient-to-br from-[#EEEDFE]/80 via-white to-white p-6 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-1">
                Content Execution
              </span>
              <h4 className="text-lg font-extrabold text-[#0a0f2e] mb-2">
                Our Page Tone & Voice
              </h4>
              <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                {current.tone}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#534AB7]/20">
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#534AB7] hover:underline"
              >
                <span>{current.linkLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
