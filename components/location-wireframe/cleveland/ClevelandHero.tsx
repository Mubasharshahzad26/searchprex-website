"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Scale, ShieldCheck, CheckCircle2, FileText, ChevronRight, Sparkles } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface ClevelandHeroProps {
  page: CityPage;
}

const DEMAND_AREAS = [
  {
    name: "Workers' comp",
    badge: "State-Fund BWC",
    why: "Ohio runs workers' compensation through a state fund (BWC) rather than private insurers. The claim and Industrial Commission appeal process is unique, and injured workers research it heavily.",
    searches: ['"Ohio BWC claim denied"', '"workers comp lawyer Cleveland"', '"Industrial Commission appeal lawyer"'],
  },
  {
    name: "Personal injury",
    badge: "High Intent",
    why: "Dense I-90 and I-77 highway corridors plus older commercial and residential structures generate steady crash, premises liability, and wrongful death searches.",
    searches: ['"car accident lawyer Cleveland"', '"slip and fall attorney Cuyahoga"', '"truck collision attorney I-90"'],
  },
  {
    name: "Medical malpractice",
    badge: "Hospital Corridor",
    why: "Major regional hospital and research networks (Cleveland Clinic, University Hospitals, MetroHealth) anchor the metro, leading to complex medical error and malpractice searches.",
    searches: ['"medical malpractice attorney Cleveland"', '"hospital negligence lawyer Ohio"', '"birth injury attorney Cleveland"'],
  },
  {
    name: "Criminal defense",
    badge: "Courthouse Proximity",
    why: "Close proximity to the Cuyahoga County Justice Center and Cleveland Municipal Court creates high-urgency searches for immediate arraignment and OVI defense.",
    searches: ['"OVI lawyer Cleveland"', '"criminal defense attorney near me"', '"Cuyahoga County bail lawyer"'],
  },
  {
    name: "Employment law",
    badge: "Workplace Rights",
    why: "Regional manufacturing, healthcare systems, and logistics centers produce steady search volume for wage disputes, discrimination, and severance reviews.",
    searches: ['"wrongful termination lawyer Cleveland"', '"overtime pay dispute attorney OH"', '"EEOC complaint lawyer Cleveland"'],
  },
  {
    name: "Estate & probate",
    badge: "Asset Succession",
    why: "Established property owners and family enterprises in Lakewood, Beachwood, and Westlake drive high-value probate, trust, and wealth succession queries.",
    searches: ['"estate planning attorney Lakewood OH"', '"probate lawyer Beachwood"', '"trust administration attorney Cuyahoga"'],
  },
];

export default function ClevelandHero({ page }: ClevelandHeroProps) {
  const [selectedDemand, setSelectedDemand] = useState(0);
  const current = DEMAND_AREAS[selectedDemand];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Background blueprint grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(#0a0f2e 1px, transparent 1px), linear-gradient(90deg, #0a0f2e 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#534AB7]/20 bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] shadow-2xs hover:shadow-xs transition-shadow">
              <Scale className="h-3.5 w-3.5" />
              <span>Law Firm SEO · Cleveland, Ohio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-[#0a0f2e] leading-[1.12]">
              Law Firm SEO in Cleveland, Ohio: Predictable Leads,{" "}
              <span className="relative inline-block rounded-xl bg-[#EEEDFE] px-3 py-0.5 text-[#534AB7] border border-[#534AB7]/20 shadow-xs">
                Proven Numbers
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Cleveland attorneys do not buy hype. They buy results they can audit. We build dedicated{" "}
              <Link href="/services/law-firm-seo" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
                law firm SEO
              </Link>{" "}
              that earns signed cases across Cuyahoga County, then show you every number behind it in a monthly ledger.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("reality-check")}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#534AB7] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all duration-300 hover:bg-[#3C3489] hover:shadow-xl hover:shadow-[#534AB7]/35 hover:-translate-y-1 active:translate-y-0"
              >
                <span>Get My Free Reality Check</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("cost-ledger")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-[#0a0f2e] shadow-xs transition-all duration-300 hover:border-[#534AB7] hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span>See the cost ledger</span>
              </button>
            </div>

            {/* Trust points bar */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 transition-colors hover:text-[#0a0f2e]">
                  <CheckCircle2 className="h-4 w-4 text-[#1a7d59]" />
                  1 Firm Per Practice Area
                </span>
                <span className="flex items-center gap-1.5 transition-colors hover:text-[#0a0f2e]">
                  <CheckCircle2 className="h-4 w-4 text-[#1a7d59]" />
                  No Long Contract (Month-to-Month)
                </span>
                <span className="flex items-center gap-1.5 transition-colors hover:text-[#0a0f2e]">
                  <ShieldCheck className="h-4 w-4 text-[#534AB7]" />
                  Founder-Led Execution
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Cleveland Demand Ledger */}
          <div className="lg:col-span-5">
            <div className="group relative rounded-3xl border-2 border-slate-200/90 bg-white p-6 sm:p-7 shadow-xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#534AB7]/40 hover:shadow-2xl hover:shadow-[#534AB7]/10">
              {/* Subtle top gradient accent glow */}
              <div className="absolute inset-x-8 -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-[#534AB7] to-transparent rounded-t-full opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                    Live Cuyahoga County Intelligence
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0a0f2e] mt-0.5">
                    Cleveland Demand Ledger
                  </h3>
                </div>
                
                {/* Live pulse radar beacon */}
                <div className="relative flex items-center justify-center h-4 w-4" title="Live Cuyahoga County search index">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-500">
                Tap a practice area below to see what drives searches in Cuyahoga County:
              </p>

              {/* Chips selector */}
              <div className="mt-4 flex flex-wrap gap-2">
                {DEMAND_AREAS.map((item, idx) => {
                  const isSelected = selectedDemand === idx;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setSelectedDemand(idx)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 text-left ${
                        isSelected
                          ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/30 scale-[1.02]"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:scale-[1.01]"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* Selected practice detail card with smooth animation */}
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/90 to-indigo-50/20 p-4 sm:p-5 space-y-3 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-[#0a0f2e]">{current.name}</h4>
                  <span className="rounded-full bg-[#EEEDFE] px-2.5 py-0.5 text-[11px] font-bold text-[#534AB7] shadow-2xs">
                    {current.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {current.why}
                </p>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Target Search Queries in Cleveland:
                  </span>
                  <div className="space-y-1.5">
                    {current.searches.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:border-[#534AB7]/40 hover:bg-indigo-50/30 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3 text-[#534AB7] shrink-0" />
                        <span className="truncate">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span>Verified in SEMrush & Google GSC</span>
                <button
                  onClick={() => scrollToSection("diagnose")}
                  className="font-bold text-[#534AB7] hover:text-[#3C3489] hover:underline transition-colors"
                >
                  Diagnose this practice →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
