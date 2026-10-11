"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Building2 } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface DentonHeroProps {
  page: CityPage;
}

export default function DentonHero({ page }: DentonHeroProps) {
  // 12 Sun rays for sunrise over the Denton Courthouse Square
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return {
      x1: 900 + Math.cos(a) * 90,
      y1: 235 + Math.sin(a) * 90,
      x2: 900 + Math.cos(a) * (i % 2 ? 130 : 145),
      y2: 235 + Math.sin(a) * (i % 2 ? 130 : 145),
    };
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EEEDFE]/60 via-white to-white pt-10 sm:pt-16 pb-20 border-b border-slate-200">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#534AB7]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Law Firm SEO · Denton, Texas</span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0f2e] tracking-tight leading-[1.12] mb-6">
              Law Firm SEO in Denton, Texas: You Don&apos;t Have to Carry This Alone
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl">
              I know the skyrocketing Google ad bills, the quiet Mondays, and the generic Dallas–Fort Worth mega-firms sitting above you on search results. I&apos;m Mubashar. Let me take the client acquisition burden off your shoulders with qualified Denton County retainers that compound organically.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <a
                href="#talk-to-me"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-base shadow-lg shadow-[#534AB7]/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Talk to Me Directly</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#guarantee"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border-2 border-slate-200 transition-all"
              >
                <span>See the 90-Day Guarantee</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#1a7d59] shrink-0" />
              <span>Founder-led · One firm per practice area in Denton · 90-day money-back guarantee</span>
            </div>
          </div>

          {/* Right Hero Graphic: Historic Denton County Courthouse-on-the-Square Dome & Sunrise */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-slate-200 p-6 shadow-xl shadow-indigo-950/5 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a7d59]" />
                  <span className="text-xs font-bold text-[#0a0f2e] uppercase tracking-wider">
                    Denton County Courthouse Square
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded">
                  60,000+ Student Hub (UNT &amp; TWU)
                </span>
              </div>

              {/* Stylized SVG: Historic Denton Square Dome Silhouette & Sunrise */}
              <div className="relative w-full h-72 rounded-xl bg-gradient-to-b from-[#EEEDFE]/40 via-sky-50/30 to-[#0a0f2e]/10 overflow-hidden border border-slate-100 flex items-end">
                <svg
                  viewBox="0 0 1360 400"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMax slice"
                  aria-label="Historic Denton County Courthouse on the Square sunrise illustration"
                >
                  <defs>
                    <linearGradient id="dentonSun" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#534AB7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3C3489" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3C3489" />
                      <stop offset="100%" stopColor="#0a0f2e" />
                    </linearGradient>
                  </defs>

                  {/* Rising Sun & Rays in Brand Indigo */}
                  <g>
                    <circle cx="900" cy="235" r="120" fill="#EEEDFE" opacity="0.8" />
                    <g>
                      {rays.map((r, i) => (
                        <line
                          key={i}
                          x1={r.x1}
                          y1={r.y1}
                          x2={r.x2}
                          y2={r.y2}
                          stroke="#534AB7"
                          strokeWidth="5"
                          strokeLinecap="round"
                          opacity="0.45"
                        />
                      ))}
                    </g>
                    <circle cx="900" cy="235" r="76" fill="url(#dentonSun)" />
                  </g>

                  {/* Gentle Tree Hills */}
                  <ellipse cx="260" cy="340" rx="150" ry="70" fill="#3C3489" opacity="0.6" />
                  <ellipse cx="470" cy="352" rx="120" ry="52" fill="#534AB7" opacity="0.5" />
                  <ellipse cx="1180" cy="338" rx="170" ry="74" fill="#3C3489" opacity="0.6" />
                  <ellipse cx="1320" cy="354" rx="110" ry="50" fill="#534AB7" opacity="0.5" />

                  {/* Historic Courthouse Architecture (1896 Denton County Courthouse-on-the-Square) */}
                  <rect x="760" y="290" width="280" height="70" fill="url(#domeGrad)" />
                  <rect x="800" y="262" width="200" height="30" fill="url(#domeGrad)" />
                  <rect x="866" y="190" width="68" height="80" fill="url(#domeGrad)" />
                  <polygon points="856,192 900,140 944,192" fill="#534AB7" />
                  <rect x="893" y="118" width="14" height="28" fill="#3C3489" />

                  {/* Glowing Courthouse Windows in Soft Indigo Tint */}
                  <circle cx="900" cy="222" r="14" fill="#EEEDFE" />
                  <rect x="790" y="300" width="14" height="22" rx="2" fill="#EEEDFE" />
                  <rect x="830" y="300" width="14" height="22" rx="2" fill="#EEEDFE" />
                  <rect x="956" y="300" width="14" height="22" rx="2" fill="#EEEDFE" />
                  <rect x="996" y="300" width="14" height="22" rx="2" fill="#EEEDFE" />

                  {/* Base ground line */}
                  <rect x="0" y="360" width="1360" height="40" fill="#0a0f2e" />
                </svg>
              </div>

              {/* Status pill */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-[#0a0f2e]">
                  <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
                  Denton County Courts Optimized
                </span>
                <span className="text-slate-500">Parent &amp; Student Inquiries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corridor Ticker Ribbon */}
      <div className="mt-14 w-full bg-[#0a0f2e] text-slate-300 py-3.5 overflow-hidden border-y border-slate-800">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300 px-4">
            <span className="text-[#EEEDFE]">SERVING DENTON COUNTY</span>
            <span>•</span>
            <span>HISTORIC DENTON SQUARE</span>
            <span>•</span>
            <span>UNT &amp; TWU CAMPUS</span>
            <span>•</span>
            <span>LEWISVILLE</span>
            <span>•</span>
            <span>FLOWER MOUND</span>
            <span>•</span>
            <span>FRISCO</span>
            <span>•</span>
            <span>LITTLE ELM</span>
            <span>•</span>
            <span>CORINTH</span>
            <span>•</span>
            <span>THE COLONY</span>
            <span>•</span>
            <span className="text-[#EEEDFE]">DISPLACING DFW MEGA-FIRMS</span>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300 px-4" aria-hidden="true">
            <span className="text-[#EEEDFE]">SERVING DENTON COUNTY</span>
            <span>•</span>
            <span>HISTORIC DENTON SQUARE</span>
            <span>•</span>
            <span>UNT &amp; TWU CAMPUS</span>
            <span>•</span>
            <span>LEWISVILLE</span>
            <span>•</span>
            <span>FLOWER MOUND</span>
            <span>•</span>
            <span>FRISCO</span>
            <span>•</span>
            <span>LITTLE ELM</span>
            <span>•</span>
            <span>CORINTH</span>
            <span>•</span>
            <span>THE COLONY</span>
            <span>•</span>
            <span className="text-[#EEEDFE]">DISPLACING DFW MEGA-FIRMS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
