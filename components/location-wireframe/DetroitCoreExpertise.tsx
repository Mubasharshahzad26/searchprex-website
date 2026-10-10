"use client";

// components/location-wireframe/DetroitCoreExpertise.tsx
//
// Matches user request & wireframe screenshot:
// - WHY SEARCHPREX: "Our core expertise"
// - Interactive 3D Card Flip effects with smooth animation & mobile-friendly touch gestures
// - 4 Pillars: Legal-only focus, Cases not clicks, Detroit-first locality, Proprietary stack
// - Positioned higher up the page for immediate authority & conversion clarity

import React, { useState } from "react";
import {
  Scale,
  TrendingUp,
  MapPin,
  Cpu,
  RotateCw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitCoreExpertise({ page }: { page: CityPage }) {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const usps = [
    {
      icon: Scale,
      title: "Legal-specific SEO",
      desc: "Practice-area intent, YMYL content standards and Michigan advertising rules (MRPC Rule 7) built into every page.",
      backHeadline: "Precision Legal Architecture",
      backPoints: [
        "For law firms, we do legal-specific SEO only",
        "Written with MRPC Rule 7 in mind with final attorney review",
        "Deep statutory depth (MCL § 500.3135 serious impairment threshold)",
      ],
      metric: "Legal-Specific Specialization",
    },
    {
      icon: TrendingUp,
      title: "Cases, not clicks",
      desc: "Reports follow calls, intake forms and signed retainers. CallRail and your CRM show cost per signed case.",
      backHeadline: "Retainer Value Attribution",
      backPoints: [
        "CallRail multi-touch telephone call & SMS attribution",
        "Clio / Lawmatics CRM intake tracking through to signed retainers",
        "Monthly reporting showing cost per signed case vs paid ads",
      ],
      metric: "ROI & Revenue Telemetry",
    },
    {
      icon: MapPin,
      title: "Detroit-first local SEO",
      desc: "Court venue pages, Google Business Profile signals and Local Falcon grid tracking across Wayne, Oakland and Macomb.",
      backHeadline: "Tri-County Proximity Dominance",
      backPoints: [
        "Local Falcon 7x7 geo-grid map tracking across Wayne, Oakland & Macomb",
        "Court venue landing pages (36th District, Wayne County 3rd Circuit)",
        "Suburban corridor relevance (Dearborn, Southfield, Troy, Warren)",
      ],
      metric: "Wayne, Oakland & Macomb",
    },
    {
      icon: Cpu,
      title: "Proprietary stack",
      desc: "NicheSEO PRO automates indexing, content briefs and AI citation monitoring, with senior strategy on top.",
      backHeadline: "NicheSEO PRO Engine",
      backPoints: [
        "Automated indexation triggers, briefs & citation monitoring",
        "Entity co-occurrence modeling for Gemini, ChatGPT & Perplexity",
        "Senior strategy and direct founder execution on top",
      ],
      metric: "NicheSEO PRO Platform",
    },
  ];

  // Mobile swipe support
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      setActiveCardIndex((prev) => (prev + 1) % usps.length);
    } else if (diff < -50) {
      setActiveCardIndex((prev) => (prev === 0 ? usps.length - 1 : prev - 1));
    }
    setTouchStartX(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0a0f2e] text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#534AB7]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-[#196b4d]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#a594fd] block mb-2">
              WHY SEARCHPREX
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              What Makes Our Law Firm SEO in Detroit Different
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Tap or click any card below to flip and inspect our tactical execution standards for {page.city} law firms.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#a594fd] shrink-0 backdrop-blur-xs">
            <RotateCw className="h-3.5 w-3.5 text-[#3eb489] animate-spin" style={{ animationDuration: "12s" }} />
            <span className="font-semibold">Interactive 3D Flip Cards</span>
          </div>
        </div>

        {/* 4 Cards Grid with 3D Flip Effects */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {usps.map((usp, idx) => {
            const Icon = usp.icon;
            const isFlipped = !!flippedCards[idx];

            return (
              <div
                key={idx}
                onClick={() => toggleFlip(idx)}
                className="group relative h-[300px] w-full [perspective:1000px] cursor-pointer"
                title="Click or tap to flip card"
              >
                {/* Inner Flipper Container with 3D transition */}
                <div
                  className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* ── CARD FRONT ── */}
                  <div className="absolute inset-0 h-full w-full rounded-2xl border border-white/15 bg-white/[0.04] p-6 flex flex-col justify-between [backface-visibility:hidden] hover:bg-white/[0.08] hover:border-[#534AB7]/80 hover:shadow-xl hover:shadow-[#534AB7]/10 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#534AB7]/25 text-[#a594fd] border border-[#534AB7]/40 shadow-inner group-hover:scale-105 transition-transform">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1 group-hover:bg-[#534AB7] group-hover:text-white transition-colors">
                          <RotateCw className="h-2.5 w-2.5" />
                          <span>FLIP</span>
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a594fd] transition-colors">
                        {usp.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                        {usp.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#a594fd]">
                      <span className="text-[11px]">{usp.metric}</span>
                      <span className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all text-[11px]">
                        Details →
                      </span>
                    </div>
                  </div>

                  {/* ── CARD BACK (Flipped 180deg) ── */}
                  <div className="absolute inset-0 h-full w-full rounded-2xl border-2 border-[#534AB7] bg-[#0d143d] p-5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                        <span className="text-xs font-bold text-[#3eb489] uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{usp.backHeadline}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                          <RotateCw className="h-2.5 w-2.5 text-slate-300" />
                          <span>Back</span>
                        </span>
                      </div>
                      
                      <ul className="space-y-2.5 mt-2">
                        {usp.backPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-200 leading-snug">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#3eb489] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#a594fd]">
                      <span className="font-semibold text-white">SearchPrex Standard</span>
                      <span className="text-xs text-slate-300 hover:text-white underline">Tap to flip ↩</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile helper indicator */}
        <div className="sm:hidden text-center pt-2">
          <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1.5">
            <RotateCw className="h-3 w-3 text-[#a594fd]" />
            <span>Tap any card to reveal tactical standards</span>
          </span>
        </div>
      </div>
    </section>
  );
}
