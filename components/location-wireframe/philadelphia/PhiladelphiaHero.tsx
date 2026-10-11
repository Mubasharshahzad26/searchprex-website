"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Scale, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface PhiladelphiaHeroProps {
  page: CityPage;
}

const NEIGHBORHOOD_STOPS = [
  { name: "Center City", line: "Market-Frankford / Broad", desc: "Courthouse-adjacent, urgent 'near me' inquiries for injury, defense, and complex commercial matters." },
  { name: "South Philly", line: "Broad Street Line", desc: "Close-knit, multi-generational community that cross-checks local Google reviews before calling." },
  { name: "Northeast", line: "Roosevelt Blvd Corridor", desc: "Dense residential volume with heavy search demand for workers' comp, auto claims, and estate probate." },
  { name: "Fishtown", line: "Frankford Ave Corridor", desc: "Rapidly growing neighborhood generating modern tenancy, employment, and personal injury searches." },
  { name: "University City", line: "West Philly Tech & Med", desc: "Major hospital campuses (Penn, CHOP) generating specialized medical malpractice and employment claims." },
  { name: "Manayunk", line: "Schuylkill Valley Corridor", desc: "Distinct local neighborhood search volume that out-of-state national firms never target." },
  { name: "Delaware Co. / Suburbs", line: "Regional Rail Hub", desc: "Suburban commuters injured in Philadelphia whose claims cross county court boundaries." },
];

export default function PhiladelphiaHero({ page }: PhiladelphiaHeroProps) {
  const [selectedStop, setSelectedStop] = useState(0);
  const current = NEIGHBORHOOD_STOPS[selectedStop];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(#0a0f2e 1px, transparent 1px), linear-gradient(90deg, #0a0f2e 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#534AB7]/20 bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] shadow-xs">
              <Scale className="h-3.5 w-3.5" />
              <span>Law Firm SEO · Philadelphia, Pennsylvania</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight text-[#0a0f2e] leading-[1.12]">
              Law Firm SEO in Philadelphia: You Can't Outspend Them.{" "}
              <span className="relative inline-block rounded-xl bg-[#EEEDFE] px-3 py-0.5 text-[#534AB7] border border-[#534AB7]/20 shadow-xs">
                Out-Local Them.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              National mass tort practices treat Philadelphia as a filing venue. You live and practice here. We turn your local neighborhood insight into Map Pack dominance, page-one rankings, and Google AI Overview citations that ad budget alone cannot buy. Explore our dedicated{" "}
              <Link href="/services/law-firm-seo" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
                law firm SEO methodology
              </Link>.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection("reality-check")}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#534AB7] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all duration-300 hover:bg-[#3C3489] hover:shadow-xl hover:shadow-[#534AB7]/35 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                <span>Get My Free Reality Check</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection("three-questions")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-[#0a0f2e] shadow-xs transition-all duration-300 hover:border-[#534AB7] hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
              >
                <span>Find My First Stop</span>
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
                  Month-to-Month Flexibility
                </span>
                <span className="flex items-center gap-1.5 transition-colors hover:text-[#0a0f2e]">
                  <ShieldCheck className="h-4 w-4 text-[#534AB7]" />
                  CEO-Led Execution by Mubashar Sharif
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Stylized Philadelphia Neighborhood Transit Diagram */}
          <div className="lg:col-span-5">
            <div className="group relative rounded-3xl border-2 border-slate-200/90 bg-white p-6 sm:p-7 shadow-xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#534AB7]/40 hover:shadow-2xl hover:shadow-[#534AB7]/10">
              {/* Top gradient accent glow */}
              <div className="absolute inset-x-8 -top-[2px] h-[3px] bg-gradient-to-r from-transparent via-[#534AB7] to-transparent rounded-t-full opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                    Cuyahoga & Philadelphia Transit Map
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0a0f2e] mt-0.5">
                    Neighborhood Territory Map
                  </h3>
                </div>
                
                {/* Live pulse radar */}
                <div className="relative flex items-center justify-center h-4 w-4" title="Live Philadelphia Neighborhood Grid">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a7d59] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1a7d59]" />
                </div>
              </div>

              {/* Transit SVG Schema */}
              <div className="my-4 rounded-2xl bg-slate-900 p-4 border border-slate-800 shadow-inner">
                <svg viewBox="0 0 460 300" className="w-full h-auto drop-shadow" role="img" aria-label="Interactive transit diagram of Philadelphia legal territories">
                  {/* Broad Street Line (Vertical) */}
                  <line x1="230" y1="20" x2="230" y2="280" stroke="#534AB7" strokeWidth="8" strokeLinecap="round" />
                  {/* Market-Frankford Line (Horizontal) */}
                  <line x1="40" y1="150" x2="420" y2="150" stroke="#3C3489" strokeWidth="8" strokeLinecap="round" />
                  {/* Diagonal Regional Connector */}
                  <line x1="80" y1="50" x2="380" y2="250" stroke="#1a7d59" strokeWidth="6" strokeLinecap="round" strokeDasharray="6 4" />

                  {/* Hub Circles */}
                  {/* Center City (Junction) */}
                  <circle cx="230" cy="150" r="18" fill="#0a0f2e" stroke="#EEEDFE" strokeWidth="4" />
                  <circle cx="230" cy="150" r="10" fill="#534AB7" className="animate-pulse" />
                  <text x="254" y="146" fontSize="13" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">Center City (City Hall)</text>

                  {/* Northeast */}
                  <circle cx="230" cy="50" r="8" fill="#0a0f2e" stroke="#534AB7" strokeWidth="3" />
                  <text x="246" y="54" fontSize="11" fontWeight="600" fill="#cbd5e1" fontFamily="sans-serif">Northeast Philly</text>

                  {/* South Philly */}
                  <circle cx="230" cy="250" r="8" fill="#0a0f2e" stroke="#534AB7" strokeWidth="3" />
                  <text x="246" y="254" fontSize="11" fontWeight="600" fill="#cbd5e1" fontFamily="sans-serif">South Philly</text>

                  {/* University City */}
                  <circle cx="90" cy="150" r="8" fill="#0a0f2e" stroke="#3C3489" strokeWidth="3" />
                  <text x="50" y="180" fontSize="11" fontWeight="600" fill="#cbd5e1" fontFamily="sans-serif">University City</text>

                  {/* Fishtown */}
                  <circle cx="370" cy="150" r="8" fill="#0a0f2e" stroke="#3C3489" strokeWidth="3" />
                  <text x="340" y="180" fontSize="11" fontWeight="600" fill="#cbd5e1" fontFamily="sans-serif">Fishtown</text>

                  {/* Manayunk */}
                  <circle cx="80" cy="50" r="7" fill="#0a0f2e" stroke="#1a7d59" strokeWidth="3" />
                  <text x="96" y="46" fontSize="11" fontWeight="600" fill="#cbd5e1" fontFamily="sans-serif">Manayunk</text>

                  {/* Delaware County */}
                  <circle cx="380" cy="250" r="7" fill="#0a0f2e" stroke="#1a7d59" strokeWidth="3" />
                  <text x="300" y="275" fontSize="11" fontWeight="600" fill="#cbd5e1" fontFamily="sans-serif">Delaware Co.</text>
                </svg>
              </div>

              {/* Stop Selector Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {NEIGHBORHOOD_STOPS.map((st, idx) => (
                  <button
                    key={st.name}
                    onClick={() => setSelectedStop(idx)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      selectedStop === idx
                        ? "bg-[#534AB7] text-white shadow-xs"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>

              {/* Active stop info box */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#0a0f2e]">{current.name}</span>
                  <span className="text-[#534AB7]">{current.line}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {current.desc}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>1 Firm Exclusivity Per Submarket</span>
                <button
                  onClick={() => scrollToSection("diagnose")}
                  className="font-bold text-[#534AB7] hover:text-[#3C3489] hover:underline cursor-pointer"
                >
                  Diagnose My Firm →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
