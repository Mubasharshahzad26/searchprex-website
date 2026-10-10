"use client";

// components/location-wireframe/DetroitApproachAndPillars.tsx
//
// Matches user's exact final layout:
// - H2: See Our Approach
// - Highly relevant localized legal consultation image (/images/locations/detroit-law-consultation.webp)
// - Old-School vs SearchPrex comparison
// - 3 Core Pillars with interactive execution drawer & mobile responsive design

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, Search, Sparkles, UserCheck, ChevronRight, ShieldCheck, Award } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitApproachAndPillars({ page }: { page: CityPage }) {
  const [activePillar, setActivePillar] = useState<number | null>(0);

  const oldSchool = [
    "Chases keyword rankings",
    "Buys link volume and directory listings",
    "Reports positions, not cases",
    "Optimizes for blue links only",
    "Treats your firm as a website",
  ];

  const searchprexApproach = [
    "Builds firm and attorney brand authority",
    "Earns mentions that Google and AI trust",
    "Reports calls, signed cases and revenue",
    "Wins Maps, AI Overviews and AI answers",
    "Treats your firm as an entity worth citing",
  ];

  const pillars = [
    {
      number: "PILLAR 1",
      title: "Be Found",
      h3: "Be Found: Local SEO and Google Map Pack Rankings for Detroit Lawyers",
      icon: Search,
      tag: "Local 3-Pack & Maps",
      desc: "Google Business Profile optimization, consistent name-address-phone data, practice-area pages and technical health, so you show up when someone searches \"personal injury lawyer Detroit\".",
      tactics: ["GBP Proximity Geofencing", "Local Court Citation Authority", "Core Web Vitals <1.2s"],
    },
    {
      number: "PILLAR 2",
      title: "Be Cited",
      h3: "Be Cited: AI Overviews, ChatGPT and Perplexity Visibility for Law Firms",
      icon: Sparkles,
      tag: "AI Overviews & LLMs",
      desc: "Answer-first content, structured data and earned mentions that raise the odds AI tools cite your firm. We track your AI citation rate monthly. We cannot guarantee any platform's output.",
      tactics: ["JSON-LD LegalService Schema", "Perplexity & Gemini Citations", "Statutory Threshold Answers"],
    },
    {
      number: "PILLAR 3",
      title: "Be Chosen",
      h3: "Be Chosen: Reviews, Intake Speed and Conversion",
      icon: UserCheck,
      tag: "Intake & Conversion",
      desc: "A compliant review flow, case-result proof and fast intake, because a ranking only matters if the phone gets answered.",
      tactics: ["Compliant Review Flow", "Verified Verdict Feeds", "CallRail Intake Telemetry"],
    },
  ];

  return (
    <section id="see-approach" className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* ── Section Header: H2: Our Detroit Law Firm SEO Approach ── */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
            PROVEN REVENUE FRAMEWORK · {page.city.toUpperCase()}, {page.stateAbbr}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0a0f2e]">
            Our Detroit Law Firm SEO Approach: Local SEO, AI Visibility and Brand Authority
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Detroit legal consumers compare Google Maps results, AI Overviews and reviews on their phones before they dial. We build one connected presence across all three, so your firm is found, cited and chosen.
          </p>
        </div>

        {/* ── Highly Relevant Localized Legal Image + Comparison Block ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Highly Relevant Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src="/images/locations/detroit-case-strategy.jpg"
                alt="Law firm team reviewing a local SEO and Map Pack strategy in Detroit"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/85 via-transparent to-transparent" />
              
              {/* Image Overlays */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#534AB7]/90 text-white backdrop-blur-xs mb-1.5 border border-white/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#3eb489]" />
                  <span>Detroit Litigation Case Briefing</span>
                </span>
                <p className="text-xs font-semibold text-slate-200">
                  Senior Michigan statutory strategy focused on signed cases, not vanity clicks.
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Verified Wayne County Case Velocity</span>
              <span className="text-[#534AB7] font-bold">Written with MRPC Rule 7 in mind</span>
            </div>
          </div>

          {/* Right Column: Old-School vs SearchPrex Comparison */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {/* Old-School */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-all shadow-xs hover:border-slate-300">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4 pb-3 border-b border-slate-100">
                OLD-SCHOOL LOCAL SEO
              </span>
              <ul className="space-y-3.5">
                {oldSchool.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-600">
                    <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SearchPrex Approach */}
            <div className="rounded-2xl border-2 border-[#534AB7] bg-gradient-to-b from-white via-white to-[#EEEDFE]/25 p-6 shadow-md hover:shadow-lg transition-all">
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>THE SEARCHPREX APPROACH</span>
                <span className="text-[10px] font-bold text-[#196b4d] bg-[#3eb489]/15 px-2.5 py-0.5 rounded-full">
                  Revenue-First
                </span>
              </span>
              <ul className="space-y-3.5">
                {searchprexApproach.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-[13px] font-semibold text-[#0a0f2e]">
                    <span className="font-mono text-[11px] font-bold text-[#534AB7] bg-[#EEEDFE] px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── 3 Core Pillars: Interactive Cards ── */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              OUR 3 EXECUTION PILLARS
            </span>
            <span className="text-xs text-[#534AB7] font-semibold">
              Tap any pillar to view tactical roadmap
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = activePillar === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActivePillar(isSelected ? null : idx)}
                  className={`rounded-2xl border bg-white p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
                    isSelected
                      ? "border-[#534AB7] ring-2 ring-[#534AB7]/20 bg-[#EEEDFE]/20"
                      : "border-slate-200 hover:border-[#534AB7]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#534AB7]">
                        {p.number}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {p.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mt-3">
                      <div className="p-2 rounded-xl bg-[#EEEDFE] text-[#534AB7]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-black text-[#0a0f2e]">
                        {p.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-[#534AB7]">
                      <span>Technical Execution</span>
                      <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                    </div>

                    {isSelected && (
                      <ul className="mt-3 space-y-1.5 animate-in fade-in duration-200">
                        {p.tactics.map((tac, tIdx) => (
                          <li key={tIdx} className="text-xs text-slate-700 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#534AB7]" />
                            <span>{tac}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
