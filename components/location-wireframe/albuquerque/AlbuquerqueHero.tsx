"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Languages, CheckCircle2 } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface AlbuquerqueHeroProps {
  page: CityPage;
}

export default function AlbuquerqueHero({ page }: AlbuquerqueHeroProps) {
  const [lang, setLang] = useState<"en" | "es">("en");

  const copy = {
    en: {
      tag: "Law Firm SEO · Albuquerque, New Mexico",
      h1: "Law Firm SEO in Albuquerque: Be the Lawyer Your Community Trusts",
      sub: "Your reputation was built face to face across Bernalillo County. We translate your authority into Google's Map Pack, organic page one, and AI answers in English and Spanish — so high-stakes clients call you first.",
      cta1: "Get My Free Reality Check",
      cta2: "See How It Works",
      note: "One firm per practice area · Month-to-month terms · Founder-led strategy",
      switchLabel: "Switch to Español",
    },
    es: {
      tag: "SEO para Abogados · Albuquerque, Nuevo México",
      h1: "SEO para Abogados en Albuquerque: Que Su Comunidad lo Encuentre",
      sub: "Su reputación se construyó cara a cara en el Condado de Bernalillo. Llevamos su autoridad a Google Maps, resultados orgánicos y respuestas de IA en inglés y español para que lo elijan cuando más lo necesitan.",
      cta1: "Quiero Mi Diagnóstico Gratis",
      cta2: "Ver Cómo Funciona",
      note: "Exclusividad por área de práctica · Términos mes a mes · Dirigido por el fundador",
      switchLabel: "Cambiar a English",
    },
  };

  const current = copy[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EEEDFE]/60 via-white to-white pt-10 sm:pt-16 pb-20 border-b border-slate-200">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#534AB7]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bilingual Language Switcher */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center p-1 bg-white border border-slate-200 rounded-full shadow-xs">
            <button
              onClick={() => setLang("en")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                lang === "en"
                  ? "bg-[#534AB7] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              English
            </button>
            <button
              onClick={() => setLang("es")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                lang === "es"
                  ? "bg-[#534AB7] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              Español
            </button>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {lang === "en" ? "Bilingual search strategy active" : "Estrategia bilingüe activa"}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.tag}</span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0f2e] tracking-tight leading-[1.1] mb-6">
              {current.h1}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl">
              {current.sub}
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <a
                href="#reality-check"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-base shadow-lg shadow-[#534AB7]/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>{current.cta1}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border-2 border-slate-200 transition-all"
              >
                <span>{current.cta2}</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#1a7d59] shrink-0" />
              <span>{current.note}</span>
            </div>
          </div>

          {/* Right Hero Graphic: Sandia Mountains & Hot Air Balloons (Albuquerque Balloon Fiesta Theme in Brand Indigo & Emerald) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-slate-200 p-6 shadow-xl shadow-indigo-950/5 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a7d59]" />
                  <span className="text-xs font-bold text-[#0a0f2e] uppercase tracking-wider">
                    Albuquerque Legal Airspace & Entity Rank
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded">
                  Bernalillo County Hub
                </span>
              </div>

              {/* Stylized SVG: Hot Air Balloons Rising Over Sandia Crest */}
              <div className="relative w-full h-72 rounded-xl bg-gradient-to-b from-[#EEEDFE]/40 via-sky-50/30 to-[#0a0f2e]/5 overflow-hidden border border-slate-100 flex items-end">
                <svg
                  viewBox="0 0 600 360"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMax slice"
                  aria-label="Albuquerque Sandia Mountains and rising SEO hot air balloons diagram"
                >
                  <defs>
                    <linearGradient id="sandiaGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#534AB7" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#3C3489" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="sandiaGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3C3489" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#0a0f2e" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="balloonMain" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#534AB7" />
                      <stop offset="50%" stopColor="#3C3489" />
                      <stop offset="100%" stopColor="#1a7d59" />
                    </linearGradient>
                    <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#534AB7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#EEEDFE" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Morning Sun Halo in Brand Indigo */}
                  <circle cx="480" cy="110" r="85" fill="url(#sunGlow)" />
                  <circle cx="480" cy="110" r="42" fill="#534AB7" fillOpacity="0.12" />

                  {/* Clouds */}
                  <g opacity="0.6">
                    <ellipse cx="120" cy="70" rx="60" ry="16" fill="#ffffff" />
                    <ellipse cx="160" cy="62" rx="45" ry="14" fill="#ffffff" />
                    <ellipse cx="380" cy="95" rx="50" ry="13" fill="#ffffff" />
                  </g>

                  {/* Sandia Mountain Ridge 1 (Distant Range) */}
                  <path
                    d="M0 240 L60 210 L130 225 L210 160 L280 190 L360 145 L430 185 L510 150 L600 215 L600 360 L0 360 Z"
                    fill="url(#sandiaGrad1)"
                    opacity="0.6"
                  />

                  {/* Sandia Mountain Ridge 2 (Front Foothills) */}
                  <path
                    d="M0 275 L80 240 L160 260 L260 205 L350 240 L450 190 L540 235 L600 210 L600 360 L0 360 Z"
                    fill="url(#sandiaGrad2)"
                  />

                  {/* Hot Air Balloon 1: SearchPrex Authority Firm (Highest Elevation) */}
                  <g transform="translate(180, 75)" className="animate-pulse">
                    <ellipse cx="0" cy="0" rx="30" ry="38" fill="url(#balloonMain)" />
                    <path d="M -12 -34 Q -22 0 -8 34 L 8 34 Q 22 0 12 -34 Z" fill="#EEEDFE" opacity="0.65" />
                    <line x1="-16" y1="34" x2="-8" y2="60" stroke="#0a0f2e" strokeWidth="1.5" />
                    <line x1="16" y1="34" x2="8" y2="60" stroke="#0a0f2e" strokeWidth="1.5" />
                    <rect x="-10" y="60" width="20" height="12" rx="2" fill="#0a0f2e" />
                    {/* Badge */}
                    <rect x="25" y="-12" width="105" height="22" rx="11" fill="#0a0f2e" />
                    <text x="77" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      #1 Map Pack Spot
                    </text>
                  </g>

                  {/* Hot Air Balloon 2: Bilingual Practice Page (Mid Elevation) */}
                  <g transform="translate(360, 115)">
                    <ellipse cx="0" cy="0" rx="22" ry="28" fill="#1a7d59" />
                    <path d="M -8 -25 Q -16 0 -5 25 L 5 25 Q 16 0 8 -25 Z" fill="#ffffff" opacity="0.75" />
                    <line x1="-11" y1="25" x2="-6" y2="44" stroke="#0a0f2e" strokeWidth="1.2" />
                    <line x1="11" y1="25" x2="6" y2="44" stroke="#0a0f2e" strokeWidth="1.2" />
                    <rect x="-7" y="44" width="14" height="9" rx="1" fill="#0a0f2e" />
                    {/* Badge */}
                    <rect x="18" y="-10" width="90" height="20" rx="10" fill="#1a7d59" />
                    <text x="63" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                      Bilingual Authority
                    </text>
                  </g>

                  {/* Hot Air Balloon 3: AI Overview Citation (Ascending) */}
                  <g transform="translate(485, 60)">
                    <ellipse cx="0" cy="0" rx="18" ry="24" fill="#3C3489" />
                    <path d="M -6 -21 Q -12 0 -4 21 L 4 21 Q 12 0 6 -21 Z" fill="#EEEDFE" opacity="0.8" />
                    <line x1="-9" y1="21" x2="-5" y2="38" stroke="#0a0f2e" strokeWidth="1.2" />
                    <line x1="9" y1="21" x2="5" y2="38" stroke="#0a0f2e" strokeWidth="1.2" />
                    <rect x="-6" y="38" width="12" height="8" rx="1" fill="#0a0f2e" />
                  </g>
                </svg>
              </div>

              {/* Status Pill Below Graphic */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-[#0a0f2e]">
                  <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
                  Second Judicial District Court Ready
                </span>
                <span className="text-slate-500">Albuquerque Metro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corridor Ticker Ribbon */}
      <div className="mt-14 w-full bg-[#0a0f2e] text-slate-300 py-3.5 overflow-hidden border-y border-slate-800">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300 px-4">
            <span className="text-[#EEEDFE]">SERVING GREATER ALBUQUERQUE METRO</span>
            <span>•</span>
            <span>NOB HILL</span>
            <span>•</span>
            <span>NORTH VALLEY</span>
            <span>•</span>
            <span>WESTSIDE</span>
            <span>•</span>
            <span>NORTHEAST HEIGHTS</span>
            <span>•</span>
            <span>RIO RANCHO</span>
            <span>•</span>
            <span>SANTA FE</span>
            <span>•</span>
            <span>LOS LUNAS</span>
            <span>•</span>
            <span>LAS CRUCES</span>
            <span>•</span>
            <span className="text-[#EEEDFE]">BERNALILLO COUNTY LEGAL CORRIDOR</span>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300 px-4" aria-hidden="true">
            <span className="text-[#EEEDFE]">SERVING GREATER ALBUQUERQUE METRO</span>
            <span>•</span>
            <span>NOB HILL</span>
            <span>•</span>
            <span>NORTH VALLEY</span>
            <span>•</span>
            <span>WESTSIDE</span>
            <span>•</span>
            <span>NORTHEAST HEIGHTS</span>
            <span>•</span>
            <span>RIO RANCHO</span>
            <span>•</span>
            <span>SANTA FE</span>
            <span>•</span>
            <span>LOS LUNAS</span>
            <span>•</span>
            <span>LAS CRUCES</span>
            <span>•</span>
            <span className="text-[#EEEDFE]">BERNALILLO COUNTY LEGAL CORRIDOR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
