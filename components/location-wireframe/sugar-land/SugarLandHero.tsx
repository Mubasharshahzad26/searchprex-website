"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Waves, Compass, DollarSign } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface SugarLandHeroProps {
  page: CityPage;
}

export default function SugarLandHero({ page }: SugarLandHeroProps) {
  return (
    <div className="relative bg-[#0a0f2e] text-white overflow-hidden border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#534AB7]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-48 sm:pb-56 relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEEDFE] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 border border-white/15 backdrop-blur-sm">
          <Waves className="w-4 h-4 text-emerald-400" />
          <span>Fort Bend County Legal Authority · Sugar Land, Texas</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Law Firm SEO in Sugar Land:{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-indigo-200">
            Rescue Your Practice From Houston&apos;s Ad Auction.
          </span>
        </h1>

        {/* Lead paragraph */}
        <p className="text-lg sm:text-2xl text-slate-200 leading-relaxed max-w-3xl mb-8 font-normal">
          Affluent Fort Bend families are not casually shopping—they are protecting high-asset marital estates, generational family businesses, and catastrophic crash claims. Stop paying hundreds per click to compete in Houston&apos;s bloated PPC auctions. We build compounding organic dominance that positions your firm first.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          <a
            href="#rescue-form"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-base sm:text-lg shadow-xl shadow-indigo-950/50 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Get My Free 24-Hour Rescue Plan</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#ppc-compare"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base sm:text-lg border border-white/20 backdrop-blur-sm transition-all"
          >
            <span>Compare with Ad Budget</span>
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

      {/* SVG Graphic: Sugar Land Town Square Palms & Horizon Waves */}
      <div className="absolute left-0 bottom-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1360 260"
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-auto max-h-52 block opacity-90"
          aria-hidden="true"
        >
          {/* Subtle Sugar Land Town Square Silhouettes */}
          <rect x="80" y="120" width="60" height="70" fill="#1e293b" opacity="0.6" />
          <rect x="155" y="90" width="75" height="100" fill="#334155" opacity="0.5" />
          <rect x="245" y="130" width="55" height="60" fill="#1e293b" opacity="0.6" />
          <rect x="540" y="110" width="70" height="80" fill="#1e293b" opacity="0.6" />
          <rect x="625" y="80" width="85" height="110" fill="#334155" opacity="0.5" />
          <rect x="725" y="125" width="50" height="65" fill="#1e293b" opacity="0.6" />

          {/* Stylized Palm Tree Silhouettes of First Colony */}
          <g transform="translate(420 80)">
            <path d="M20 110 Q22 50 25 10" stroke="#475569" strokeWidth="4" fill="none" />
            <path d="M25 10 Q10 -5 -10 15" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M25 10 Q35 -15 55 5" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M25 10 Q40 5 60 25" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M25 10 Q5 -15 -5 -3" stroke="#10b981" strokeWidth="3" fill="none" />
          </g>

          <g transform="translate(980 75)">
            <path d="M20 115 Q24 55 26 12" stroke="#475569" strokeWidth="4" fill="none" />
            <path d="M26 12 Q8 -3 -12 18" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M26 12 Q38 -12 58 8" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M26 12 Q42 8 62 28" stroke="#10b981" strokeWidth="3" fill="none" />
          </g>

          {/* Calm Water & Highway 6 Horizon Waves */}
          <path
            d="M0 190 Q340 170 680 190 T1360 190 L1360 260 L0 260 Z"
            fill="#0f172a"
          />
          <path
            d="M0 215 Q340 200 680 215 T1360 215"
            stroke="#10b981"
            strokeWidth="2.5"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M0 235 Q340 225 680 235 T1360 235"
            stroke="#534AB7"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}
