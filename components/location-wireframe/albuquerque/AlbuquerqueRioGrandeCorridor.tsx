"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight, ShieldCheck, Building2 } from "lucide-react";

export default function AlbuquerqueRioGrandeCorridor() {
  const [selectedPin, setSelectedPin] = useState<number>(2); // Default to Albuquerque

  const corridorMarkets = [
    {
      name: "Santa Fe",
      county: "Santa Fe County · First Judicial District",
      tagline: "State Capitol & High-Asset Northern Hub",
      desc: "A distinct market with its own judicial district, government workforce, and affluent family-law and estate planning searches. Google does not rank Albuquerque-only pages here; a dedicated Santa Fe hub is required.",
      keySearch: '"divorce attorney Santa Fe NM"',
      x: 150,
      y: 40,
    },
    {
      name: "Rio Rancho",
      county: "Sandoval County · 13th Judicial District",
      tagline: "Fast-Growing High-Density Suburb",
      desc: "Rio Rancho is New Mexico's third-largest city, situated directly northwest of Albuquerque across the Rio Grande. Residents search specifically for local Sandoval County counsel rather than crossing into downtown Albuquerque.",
      keySearch: '"family lawyer Rio Rancho NM"',
      x: 165,
      y: 120,
    },
    {
      name: "Albuquerque",
      county: "Bernalillo County · Second Judicial District",
      tagline: "Core Metropolian Commercial & Trial Hub",
      desc: "Your primary market: dense urban neighborhood corridors including Nob Hill, North Valley, Westside, Northeast Heights, and Downtown. Handles the state's largest criminal and high-stakes civil litigation dockets.",
      keySearch: '"personal injury lawyer Albuquerque"',
      x: 160,
      y: 210,
    },
    {
      name: "Los Lunas & Belen",
      county: "Valencia County · 13th Judicial District",
      tagline: "South Valley Commuter & Industrial Hub",
      desc: "Suburban and rural communities south of Albuquerque along I-25 with significant highway collision volume, workers' comp claims, and urgent DWI arrest dockets handled in Los Lunas district court.",
      keySearch: '"DWI lawyer Los Lunas NM"',
      x: 155,
      y: 300,
    },
    {
      name: "Las Cruces",
      county: "Doña Ana County · Third Judicial District",
      tagline: "Southern New Mexico Border Corridor",
      desc: "Southern New Mexico's major population center with distinct commercial trucking and cross-border litigation. Very low organic competition from sophisticated digital law practices.",
      keySearch: '"criminal defense attorney Las Cruces"',
      x: 158,
      y: 390,
    },
  ];

  const current = corridorMarkets[selectedPin];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>Regional Submarket Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Beyond Albuquerque: One Corridor, Five Markets Google Treats Separately
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            The Rio Grande corridor spans five distinct counties and four separate judicial districts. Google’s geo-ranking algorithms treat each community as an independent search market. A generic &quot;Albuquerque metro&quot; page gets buried in Rio Rancho or Santa Fe.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Stylized Corridor SVG */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 self-start flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#534AB7]" />
              <span>Interactive Rio Grande Legal Corridor</span>
            </div>

            <div className="relative w-full max-w-[280px] h-[380px] bg-white rounded-xl border border-slate-200/80 p-2 shadow-xs">
              <svg viewBox="0 0 300 420" className="w-full h-full" role="img" aria-label="Rio Grande legal corridor map">
                {/* Rio Grande River Ribbon */}
                <path
                  d="M150 15 C190 85 120 150 165 210 C205 270 135 320 160 405"
                  fill="none"
                  stroke="#534AB7"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.25"
                />

                {/* River Flow Dashes */}
                <path
                  d="M150 15 C190 85 120 150 165 210 C205 270 135 320 160 405"
                  fill="none"
                  stroke="#534AB7"
                  strokeWidth="3"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* Interactive Market Pins */}
                {corridorMarkets.map((market, idx) => {
                  const isSelected = selectedPin === idx;
                  return (
                    <g
                      key={market.name}
                      onClick={() => setSelectedPin(idx)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse Ring when Selected */}
                      {isSelected && (
                        <circle
                          cx={market.x}
                          cy={market.y}
                          r="18"
                          fill="#534AB7"
                          opacity="0.2"
                          className="animate-ping"
                        />
                      )}

                      {/* Pin Circle */}
                      <circle
                        cx={market.x}
                        cy={market.y}
                        r={isSelected ? "11" : "8"}
                        fill={isSelected ? "#534AB7" : "#ffffff"}
                        stroke={isSelected ? "#3C3489" : "#64748b"}
                        strokeWidth={isSelected ? "3" : "2"}
                        className="transition-all"
                      />

                      {/* Label Text */}
                      <text
                        x={market.x + 18}
                        y={market.y + 4}
                        fontSize="12"
                        fontWeight={isSelected ? "bold" : "600"}
                        fill={isSelected ? "#0a0f2e" : "#475569"}
                        className="select-none transition-colors"
                      >
                        {market.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="text-[11px] text-slate-500 mt-4 text-center">
              Click any hub along the corridor to view venue requirements &amp; search intent.
            </div>
          </div>

          {/* Right Column: Selected Submarket Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border-2 border-[#534AB7]/30 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <div>
                  <span className="text-xs font-bold text-[#534AB7] uppercase tracking-wider">
                    {current.county}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0a0f2e] mt-1">
                    {current.name} Market Hub
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#1a7d59] bg-[#1a7d59]/10 px-3 py-1.5 rounded-full">
                  Dedicated Silo Target
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Jurisdictional Role:
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {current.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                {current.desc}
              </p>

              <div className="p-4 rounded-xl bg-white border border-slate-200 mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Sample High-Intent Search Term:
                </span>
                <div className="text-sm font-bold text-[#534AB7] font-mono">
                  {current.keySearch}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
                  <span>Geo-Coded Schema &amp; Suburb Silo Included</span>
                </div>
                <a
                  href="#reality-check"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#534AB7] hover:text-[#3C3489] transition-colors"
                >
                  <span>Check Territory Exclusivity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
