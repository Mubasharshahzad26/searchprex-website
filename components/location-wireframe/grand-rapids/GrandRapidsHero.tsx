"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, Zap, RotateCcw } from "lucide-react";

export default function GrandRapidsHero() {
  const [selectedPersona, setSelectedPersona] = useState<"solo" | "mid">("solo");
  const [activeHighlight, setActiveHighlight] = useState<"all" | "organic" | "ppc">("all");
  const [animKey, setAnimKey] = useState<number>(0);

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white pt-10 pb-16 md:pt-14 md:pb-24 border-b border-slate-200">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#534AB7]/5 blur-3xl pointer-events-none" />

      {/* Embedded Animation Keyframes */}
      <style jsx>{`
        @keyframes drawPpcPath {
          0% {
            stroke-dashoffset: 460;
            opacity: 0.2;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes drawOrganicPath {
          0% {
            stroke-dashoffset: 560;
            opacity: 0.1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes fadeInGrad {
          0% {
            opacity: 0;
          }
          60% {
            opacity: 0;
          }
          100% {
            opacity: 0.35;
          }
        }
        @keyframes floatCompounding {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .anim-ppc-line {
          stroke-dasharray: 460;
          stroke-dashoffset: 0;
          animation: drawPpcPath 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .anim-organic-line {
          stroke-dasharray: 560;
          stroke-dashoffset: 0;
          animation: drawOrganicPath 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-organic-fill {
          animation: fadeInGrad 2.5s ease-out forwards;
        }
        .float-badge {
          animation: floatCompounding 3.2s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEEDFE] border border-[#534AB7]/20 text-[#534AB7] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#534AB7] animate-pulse" />
              LAW FIRM SEO · GRAND RAPIDS, MICHIGAN
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-[#0a0f2e] leading-[1.15] tracking-tight">
              Law Firm SEO in Grand Rapids:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#534AB7] to-[#1a7d59]">
                Qualified Leads Without the PPC Bill
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#566070] leading-relaxed max-w-2xl">
              For solo attorneys and mid-size firms tired of paying for clicks that never sign. We build the Map Pack, page-one and AI-answer visibility that keeps working after the ad budget stops.
            </p>

            {/* Persona Switcher Buttons */}
            <div className="pt-2">
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedPersona("solo")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    selectedPersona === "solo"
                      ? "bg-[#534AB7] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  I&apos;m a solo attorney
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPersona("mid")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    selectedPersona === "mid"
                      ? "bg-[#534AB7] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  I run a mid-size firm
                </button>
              </div>

              {/* Persona Context Helper */}
              <p className="text-xs text-slate-500 mt-2 italic">
                {selectedPersona === "solo"
                  ? "Tailored for solo practitioners who need phone-ready calls without managing an agency."
                  : "Tailored for 2-10 attorney partnerships managing associate caseloads across Kent County."}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#ppc-audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1a7d59] hover:bg-[#156748] !text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all border border-emerald-500/20"
              >
                Get Free PPC Waste Audit
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
              <a
                href="#roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0a0f2e] border border-slate-300 font-semibold text-sm sm:text-base transition-all"
              >
                Calculate Cost Per Signed Case
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#566070] border-t border-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
                One firm per practice area
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1a7d59]" />
                Month-to-month contracts
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Zap className="w-4 h-4 text-[#1a7d59]" />
                You own everything we build
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ANIMATED RENTED CLICKS VS OWNED VISIBILITY CHART */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-7 relative transition-all hover:shadow-xl group">
              
              {/* Header with Model Badge and Interactive Replay Button */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-[#0a0f2e]">
                    Rented Clicks vs Owned Visibility
                  </h2>
                  <p className="text-xs text-slate-500">
                    Why ads stop cold while organic search equity compounds
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Kent County Model
                  </span>
                  <button
                    type="button"
                    onClick={handleReplay}
                    title="Replay Trajectory Animation"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#534AB7] hover:bg-slate-100 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Chart Illustration (SVG with Custom Keyframe Animations) */}
              <div className="py-6">
                <div className="relative h-64 w-full bg-slate-50/70 rounded-xl border border-slate-200 p-4 overflow-hidden">
                  
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-x-4 top-1/4 border-b border-slate-200/50" />
                  <div className="absolute inset-x-4 top-2/4 border-b border-slate-200/50" />
                  <div className="absolute inset-x-4 top-3/4 border-b border-slate-200/50" />

                  <svg
                    key={animKey}
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 360 180"
                    fill="none"
                  >
                    <defs>
                      {/* Organic Compounding Area Fill Gradient */}
                      <linearGradient id="compoundingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1a7d59" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#3eb489" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#3eb489" stopOpacity="0" />
                      </linearGradient>

                      {/* Drop Shadow Filter for Lines */}
                      <filter id="shadowPpc" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ea580c" floodOpacity="0.25" />
                      </filter>
                      <filter id="shadowOrganic" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1a7d59" floodOpacity="0.3" />
                      </filter>
                    </defs>

                    {/* Area fill under organic compounding curve */}
                    <path
                      d="M 20 160 C 90 158, 160 150, 220 100 C 260 65, 300 35, 340 20 L 340 165 L 20 165 Z"
                      fill="url(#compoundingGradient)"
                      className="anim-organic-fill"
                      opacity={activeHighlight === "ppc" ? 0.08 : 0.4}
                      style={{ transition: "opacity 0.3s ease" }}
                    />

                    {/* PPC Line (Red/Orange): Flat high cost, then abruptly drops to zero */}
                    <path
                      d="M 20 120 L 70 65 L 180 60 L 220 62 L 230 160 L 340 160"
                      stroke="#ea580c"
                      strokeWidth={activeHighlight === "ppc" ? 4.5 : activeHighlight === "organic" ? 2 : 3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#shadowPpc)"
                      className="anim-ppc-line"
                      opacity={activeHighlight === "organic" ? 0.3 : 1}
                      style={{ transition: "opacity 0.3s ease, stroke-width 0.3s ease" }}
                    />

                    {/* Organic Visibility Line (Teal/Emerald): Compounding growth */}
                    <path
                      d="M 20 160 C 90 158, 160 150, 220 100 C 260 65, 300 35, 340 20"
                      stroke="#1a7d59"
                      strokeWidth={activeHighlight === "organic" ? 5 : activeHighlight === "ppc" ? 2 : 4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#shadowOrganic)"
                      className="anim-organic-line"
                      opacity={activeHighlight === "ppc" ? 0.3 : 1}
                      style={{ transition: "opacity 0.3s ease, stroke-width 0.3s ease" }}
                    />

                    {/* PPC Stop Point & Marker with Ping */}
                    <circle cx="230" cy="160" r="10" fill="#ea580c" opacity="0.2" className="animate-ping" />
                    <circle cx="230" cy="160" r="4.5" fill="#ea580c" />
                    
                    {/* Ads Paused Badge */}
                    <g opacity={activeHighlight === "organic" ? 0.4 : 1} style={{ transition: "opacity 0.3s ease" }}>
                      <rect
                        x="200"
                        y="120"
                        width="96"
                        height="26"
                        rx="6"
                        fill="#fff"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(234,88,12,0.15))"
                      />
                      <text x="210" y="137" fill="#ea580c" fontSize="11" fontWeight="700">
                        Ads paused → 0
                      </text>
                    </g>

                    {/* Organic Compounding Peak Dot with Active Radar Ping */}
                    <circle cx="340" cy="20" r="12" fill="#1a7d59" opacity="0.3" className="animate-ping" />
                    <circle cx="340" cy="20" r="5" fill="#1a7d59" />

                    {/* Compounding Callout Floating Badge */}
                    <g
                      className="float-badge"
                      opacity={activeHighlight === "ppc" ? 0.4 : 1}
                      style={{ transition: "opacity 0.3s ease" }}
                    >
                      <rect
                        x="165"
                        y="20"
                        width="168"
                        height="28"
                        rx="6"
                        fill="#fff"
                        stroke="#1a7d59"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 3px 6px rgba(26,125,89,0.2))"
                      />
                      <circle cx="178" cy="34" r="3" fill="#1a7d59" />
                      <text x="187" y="38" fill="#1a7d59" fontSize="11" fontWeight="700">
                        Owned visibility compounds
                      </text>
                    </g>
                  </svg>

                  {/* Time Axis Label */}
                  <div className="absolute bottom-2.5 right-4 text-[11px] font-bold text-slate-400 tracking-wider">
                    Time →
                  </div>
                </div>
              </div>

              {/* Interactive Legend with Spotlighting on Hover */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onMouseEnter={() => setActiveHighlight("organic")}
                  onMouseLeave={() => setActiveHighlight("all")}
                  onClick={() => setActiveHighlight(activeHighlight === "organic" ? "all" : "organic")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                    activeHighlight === "organic" ? "bg-emerald-50/80" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1.5 rounded-full bg-[#1a7d59]" />
                    <span className="font-bold text-slate-900">Owned Organic Equity</span>
                  </div>
                  <span className="text-slate-500 font-medium">Permanent asset on your domain</span>
                </button>

                <button
                  type="button"
                  onMouseEnter={() => setActiveHighlight("ppc")}
                  onMouseLeave={() => setActiveHighlight("all")}
                  onClick={() => setActiveHighlight(activeHighlight === "ppc" ? "all" : "ppc")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                    activeHighlight === "ppc" ? "bg-orange-50/80" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1.5 rounded-full bg-[#ea580c]" />
                    <span className="font-bold text-slate-900">Google Ads (PPC)</span>
                  </div>
                  <span className="text-slate-500 font-medium">Stops immediately when paused</span>
                </button>

                <p className="text-[11px] text-slate-400 pt-1 italic text-center">
                  Tip: Hover over the legend or tap the refresh icon to replay the intake compounding curve.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
