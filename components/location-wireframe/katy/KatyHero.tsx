"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface KatyHeroProps {
  page: CityPage;
}

export default function KatyHero({ page }: KatyHeroProps) {
  return (
    <div className="relative bg-[#0a0f2e] text-white overflow-hidden border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#534AB7]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-48 sm:pb-56 relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEEDFE] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 border border-white/15 backdrop-blur-sm">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>The Tri-County Crossroads · Harris, Fort Bend &amp; Waller Counties</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Law Firm SEO in Katy, Texas:{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-indigo-200">
            Be the Firm at the Crossroads.
          </span>
        </h1>

        {/* Lead paragraph */}
        <p className="text-lg sm:text-2xl text-slate-200 leading-relaxed max-w-3xl mb-8 font-normal">
          Harris, Fort Bend, and Waller counties converge right in Katy. When local residents search for an attorney close to home, generic downtown Houston firms never clarify which courthouse has jurisdiction. We position your firm as the authoritative, local answer they find first.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          <a
            href="#tear-down-form"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-base sm:text-lg shadow-xl shadow-indigo-950/50 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Get My Free Katy Tear-Down</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#county-crossroads"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base sm:text-lg border border-white/20 backdrop-blur-sm transition-all"
          >
            <span>Which Courthouse?</span>
          </a>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Founder-Led Architecture</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>One Law Firm Per Practice Area</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Month-to-Month Terms (Zero Lock-In)</span>
          </div>
        </div>
      </div>

      {/* SVG Graphic: Katy I-10 & SH 99 Highway Crossroads */}
      <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1360 280"
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-auto max-h-56 block opacity-95"
          aria-hidden="true"
        >
          {/* Distant Suburban Silhouette */}
          <rect x="40" y="110" width="44" height="60" fill="#1e293b" opacity="0.6" />
          <rect x="96" y="90" width="52" height="80" fill="#334155" opacity="0.5" />
          <rect x="160" y="125" width="40" height="45" fill="#1e293b" opacity="0.6" />
          <rect x="480" y="105" width="58" height="65" fill="#1e293b" opacity="0.6" />
          <rect x="550" y="130" width="44" height="40" fill="#334155" opacity="0.5" />
          <rect x="720" y="95" width="50" height="75" fill="#1e293b" opacity="0.6" />
          <rect x="860" y="115" width="46" height="55" fill="#334155" opacity="0.5" />

          {/* I-10 Katy Freeway Multi-Lane Highway Deck */}
          <rect x="0" y="170" width="1360" height="110" fill="#0f172a" />
          <line x1="0" y1="175" x2="1360" y2="175" stroke="#475569" strokeWidth="2.5" />
          <line x1="0" y1="275" x2="1360" y2="275" stroke="#475569" strokeWidth="2.5" />

          {/* Dashed Lane Dividers in Brand White & Emerald */}
          <line
            x1="0"
            y1="205"
            x2="1400"
            y2="205"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeDasharray="45 45"
            opacity="0.85"
          />
          <line
            x1="0"
            y1="240"
            x2="1400"
            y2="240"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeDasharray="40 40"
            opacity="0.6"
          />

          {/* Stylized Modern Commuter Vehicles */}
          {/* Car 1: Emerald Compact */}
          <g transform="translate(180 185)">
            <rect y="4" width="60" height="16" rx="4" fill="#1a7d59" />
            <rect x="12" width="32" height="11" rx="3" fill="#1a7d59" />
            <circle cx="14" cy="21" r="5" fill="#020617" />
            <circle cx="46" cy="21" r="5" fill="#020617" />
          </g>

          {/* Car 2: White SUV */}
          <g transform="translate(560 215)">
            <rect y="4" width="68" height="18" rx="4" fill="#f8fafc" />
            <rect x="14" width="36" height="13" rx="3" fill="#f8fafc" />
            <circle cx="16" cy="24" r="5.5" fill="#020617" />
            <circle cx="52" cy="24" r="5.5" fill="#020617" />
          </g>

          {/* Car 3: Brand Indigo Sedan */}
          <g transform="translate(940 185)">
            <rect y="4" width="64" height="17" rx="4" fill="#534AB7" />
            <rect x="14" width="34" height="12" rx="3" fill="#534AB7" />
            <circle cx="15" cy="23" r="5" fill="#020617" />
            <circle cx="49" cy="23" r="5" fill="#020617" />
          </g>

          {/* Overhead Interstate Highway Gantry Sign */}
          <rect x="1040" y="25" width="8" height="165" fill="#64748b" />
          <rect x="1290" y="25" width="8" height="165" fill="#64748b" />
          <rect x="1030" y="25" width="276" height="8" fill="#64748b" />

          {/* Texas Interstate Highway Sign: KATY / I-10 / 3 COUNTIES */}
          <g>
            <rect
              x="1050"
              y="35"
              width="232"
              height="95"
              rx="6"
              fill="#1a7d59"
              stroke="#ffffff"
              strokeWidth="3.5"
            />
            <text
              x="1166"
              y="80"
              textAnchor="middle"
              fontSize="38"
              fontWeight="900"
              fill="#ffffff"
              fontFamily="system-ui, sans-serif"
              letterSpacing="2"
            >
              KATY
            </text>
            <text
              x="1166"
              y="110"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#ffffff"
              fontFamily="system-ui, sans-serif"
              letterSpacing="1"
            >
              I-10 · SH 99 · 3 COUNTIES
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
