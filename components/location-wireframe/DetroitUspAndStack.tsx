"use client";

// components/location-wireframe/DetroitUspAndStack.tsx
//
// 1. WHY SEARCHPREX: "Our core expertise" (User requested heading change)
//    - 4 Interactive 3D Flip cards (Legal-only focus, Cases not clicks, Detroit-first locality, Proprietary stack)
//    - Mobile-friendly touch swipe & tap-to-flip animations
// 2. "Technologies We Use" banner (Matching user uploaded wireframe image)
//    - Continuous infinite scrolling marquee of logos (GA4, Semrush, GSC, Screaming Frog, BrightLocal, Local Falcon, NicheSEO PRO, CallRail, WordPress, Google Ads, Meta)
//    - Interactive tool deep-dive carousel with mobile touch swipe gestures & auto-advance timer

import React, { useState, useEffect, useRef } from "react";
import {
  Scale,
  TrendingUp,
  MapPin,
  Cpu,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCw,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitUspAndStack({ page }: { page: CityPage }) {
  // ── 1. Core Expertise Cards (Flip state & content) ──
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [activeUspIndex, setActiveUspIndex] = useState(0);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const usps = [
    {
      icon: Scale,
      title: "Legal-only focus",
      desc: "Law firm SEO is all we do, from YMYL statutory compliance to high-stakes practice-area intent.",
      backHeadline: "Precision Legal Architecture",
      backPoints: [
        "Strict Michigan Rules of Professional Conduct (MRPC 7.1–7.3) compliance",
        "Deep statutory silos (MCL § 500.3101 No-Fault, catastrophic torts)",
        "Zero generic out-of-the-box local SEO boilerplate",
      ],
      metric: "100% Legal Specialization",
    },
    {
      icon: TrendingUp,
      title: "Cases, not clicks",
      desc: "Reporting follows incoming calls, intake forms and signed retainers, not vanity traffic.",
      backHeadline: "Retainer Value Attribution",
      backPoints: [
        "CallRail multi-touch telephone call & SMS attribution",
        "CRM intake pipeline tracking through to signed retainers",
        "Monthly executive KPI dashboard showing cost-per-signed-case",
      ],
      metric: "ROI & Revenue Telemetry",
    },
    {
      icon: MapPin,
      title: "Detroit-first locality",
      desc: `Neighborhood pages, local links and GBP signals built directly around Metro Detroit & Wayne County.`,
      backHeadline: "Tri-County Proximity Dominance",
      backPoints: [
        "Local Falcon 7x7 geo-grid map tracking at 0.5-mile intervals",
        "Court venue landing pages (36th District, Wayne County 3rd Circuit)",
        "Oakland (Southfield/Troy) and Macomb county regional corridors",
      ],
      metric: "Wayne, Oakland & Macomb",
    },
    {
      icon: Cpu,
      title: "Proprietary stack",
      desc: "NicheSEO PRO automates indexing, briefs and citation monitoring alongside senior human strategy.",
      backHeadline: "NicheSEO PRO Engine",
      backPoints: [
        "Sub-2-hour Google Search Console API re-indexing triggers",
        "Knowledge graph entity co-occurrence modeling for AI answers",
        "Direct algorithmic citation tracking across Perplexity & Gemini",
      ],
      metric: "NicheSEO PRO Platform",
    },
  ];

  // ── Touch swipe for mobile USP cards ──
  const [touchStartUsp, setTouchStartUsp] = useState<number | null>(null);
  const handleTouchStartUsp = (e: React.TouchEvent) => setTouchStartUsp(e.touches[0].clientX);
  const handleTouchEndUsp = (e: React.TouchEvent) => {
    if (touchStartUsp === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartUsp - touchEnd;
    if (diff > 50) {
      setActiveUspIndex((prev) => (prev + 1) % usps.length);
    } else if (diff < -50) {
      setActiveUspIndex((prev) => (prev === 0 ? usps.length - 1 : prev - 1));
    }
    setTouchStartUsp(null);
  };

  // ── 2. Technologies We Use (Infinite Marquee & Deep Stack) ──
  const marqueeLogos = [
    {
      name: "Google Analytics 4",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#F9AB00" />
          <rect x="10" y="19" width="4" height="9" rx="2" fill="#E37400" />
          <rect x="16" y="14" width="4" height="14" rx="2" fill="white" />
          <rect x="22" y="9" width="4" height="19" rx="2" fill="#0A0F2E" />
        </svg>
      ),
    },
    {
      name: "SEMRUSH",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#FF642D" />
          <path d="M10 23C12.5 25.5 16 26.5 19.5 25.5C23.5 24.5 26 21 26 17C26 13 22 9.5 17.5 10C13 10.5 10 14 10 18.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 14L22 18L18 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Google Search Console",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#4285F4" />
          <path d="M10 24V18M15 24V13M20 24V16M25 24V10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 18L15 13L20 16L25 10" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Screaming Frog",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#16A34A" />
          <ellipse cx="18" cy="19" rx="7" ry="5.5" fill="white" />
          <circle cx="14" cy="13.5" r="3" fill="white" />
          <circle cx="22" cy="13.5" r="3" fill="white" />
          <circle cx="14" cy="13.5" r="1.3" fill="#16A34A" />
          <circle cx="22" cy="13.5" r="1.3" fill="#16A34A" />
        </svg>
      ),
    },
    {
      name: "BrightLocal",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#2563EB" />
          <circle cx="18" cy="18" r="9" stroke="#F59E0B" strokeWidth="2" />
          <path d="M18 12L20 16L24 17L21 20L22 24L18 21.5L14 24L15 20L12 17L16 16L18 12Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Local Falcon",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#0EA5E9" />
          <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="18" cy="18" r="3.5" fill="#F59E0B" />
          <path d="M18 9V12M18 24V27M9 18H12M24 18H27" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "NicheSEO PRO",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#534AB7" />
          <circle cx="18" cy="18" r="7" stroke="#EEEDFE" strokeWidth="2" />
          <circle cx="18" cy="18" r="2.5" fill="#3EB489" />
          <path d="M11 18H13.5M22.5 18H25M18 11V13.5M18 22.5V25" stroke="#EEEDFE" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "WordPress",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#21759B" />
          <circle cx="18" cy="18" r="10" stroke="white" strokeWidth="1.5" />
          <path d="M13 13L16 23L18 16L20 23L23 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "CallRail Tracking",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#0284C7" />
          <path d="M13 14C13 20 16 23 22 23L24 20L21 17L19 18C18 17 17 16 16 15L17 13L14 11L13 14Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Google Ads",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#4385F4" />
          <path d="M13 25L23 11" stroke="#FBBC04" strokeWidth="4" strokeLinecap="round" />
          <circle cx="15" cy="22" r="3" fill="#34A853" />
        </svg>
      ),
    },
    {
      name: "Meta / Social Signals",
      svg: (
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <rect width="36" height="36" rx="8" fill="#0081FB" />
          <path d="M12 21C14 17 16 15 18 17C20 15 22 17 24 21C22 25 20 21 18 19C16 21 14 25 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // Detailed tool items for deep-dive
  const tools = [
    {
      id: "semrush",
      name: "Semrush",
      category: "Competitive Intelligence",
      tagline: "Keyword gap audits, position telemetry & rival CPC monitoring.",
      detail: "Live tracking of all high-intent personal injury and criminal defense search queries across Metro Detroit with competitor PPC budget burn monitoring.",
      badge: "Market Intelligence",
      logo: marqueeLogos[1].svg,
    },
    {
      id: "gsc",
      name: "Google Search Console",
      category: "First-Party Google Telemetry",
      tagline: "Direct Google bot crawl telemetry & AI Overview impression verification.",
      detail: "Direct connection to your firm's primary domain data for granular tracking of organic clicks, queries, and verified Google AI Overview citation sources.",
      badge: "Direct Google API",
      logo: marqueeLogos[2].svg,
    },
    {
      id: "local-falcon",
      name: "Local Falcon",
      category: "Geo-Grid Map Radar",
      tagline: "Pinpoint 7x7 Local 3-Pack radius tracking across Wayne County.",
      detail: "Multi-coordinate radar measurements showing your firm's Google Business Profile rank at 0.5-mile intervals from Downtown Detroit through suburbs.",
      badge: "Local 3-Pack Scanner",
      logo: marqueeLogos[5].svg,
    },
    {
      id: "screaming-frog",
      name: "Screaming Frog SEO Spider",
      category: "Technical Crawl Diagnostics",
      tagline: "Deep technical site crawling, orphan page detection & schema validation.",
      detail: "Audits every practice area URL, canonical chain, JSON-LD LegalService entity block, and server response time to ensure zero crawl budget is wasted.",
      badge: "Technical Crawler",
      logo: marqueeLogos[3].svg,
    },
    {
      id: "brightlocal",
      name: "BrightLocal",
      category: "Local Citation & Reputation",
      tagline: "NAP citation synchronization & legal directory footprint monitoring.",
      detail: "Monitors and cleans law firm citations across 40+ authoritative legal directories (Justia, Avvo, FindLaw, State Bar) to prevent citation fragmentation.",
      badge: "Legal Directory Sync",
      logo: marqueeLogos[4].svg,
    },
    {
      id: "ga4",
      name: "Google Analytics 4 (GA4)",
      category: "Intake & Attribution",
      tagline: "Multi-touch legal client journey tracking and phone call attribution.",
      detail: "Measures exact visitor pathways from organic search entry to click-to-call events, free consultation form submissions, and chat consultations.",
      badge: "Conversion Attribution",
      logo: marqueeLogos[0].svg,
    },
    {
      id: "nicheseo-pro",
      name: "NicheSEO PRO",
      category: "Autonomous Search Architecture",
      tagline: "Autonomous indexing, topical graph modeling & LLM citation tracking.",
      detail: "Our proprietary sister platform that monitors Google Search Console API feeds, synchronizes legal topical authority, and models LLM citation co-occurrences.",
      badge: "Proprietary Platform",
      logo: marqueeLogos[6].svg,
    },
  ];

  const [toolIndex, setToolIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advancing tool deep-dive timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setToolIndex((prev) => (prev + 1) % tools.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, tools.length]);

  const prevTool = () => setToolIndex((prev) => (prev === 0 ? tools.length - 1 : prev - 1));
  const nextTool = () => setToolIndex((prev) => (prev === tools.length - 1 ? 0 : prev + 1));

  // Touch swipe for tool cards on mobile
  const [touchStartTool, setTouchStartTool] = useState<number | null>(null);
  const handleTouchStartTool = (e: React.TouchEvent) => setTouchStartTool(e.touches[0].clientX);
  const handleTouchEndTool = (e: React.TouchEvent) => {
    if (touchStartTool === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartTool - touchEnd;
    if (diff > 50) nextTool();
    else if (diff < -50) prevTool();
    setTouchStartTool(null);
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── Top Block: WHY SEARCHPREX - "Our core expertise" (User requested heading) ── */}
        <div className="rounded-3xl bg-[#0a0f2e] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Subtle background ambient purple glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#534AB7]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#3eb489]/15 blur-3xl" />

          {/* Header */}
          <div className="relative max-w-3xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a594fd] block">
                WHY SEARCHPREX
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Our core expertise
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                Tap or click any card below to flip and inspect our tactical execution standards for {page.city} law firms.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-[#a594fd] bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
              <RotateCw className="h-3.5 w-3.5 text-[#3eb489] animate-spin-slow" />
              <span>Interactive 3D Flip Cards</span>
            </div>
          </div>

          {/* Desktop Grid & Mobile Swipeable Flip Cards */}
          <div
            onTouchStart={handleTouchStartUsp}
            onTouchEnd={handleTouchEndUsp}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {usps.map((usp, idx) => {
              const Icon = usp.icon;
              const isFlipped = !!flippedCards[idx];

              return (
                <div
                  key={idx}
                  onClick={() => toggleFlip(idx)}
                  className="group relative h-[270px] sm:h-[285px] w-full [perspective:1000px] cursor-pointer"
                >
                  {/* Inner Flipper Container with 3D transition */}
                  <div
                    className={`relative h-full w-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* ── CARD FRONT ── */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden] hover:bg-white/10 hover:border-[#534AB7]/60 transition-all shadow-md">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#534AB7]/30 text-[#a594fd] border border-[#534AB7]/50 shadow-inner group-hover:scale-105 transition-transform">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 flex items-center gap-1">
                            <RotateCw className="h-2.5 w-2.5 text-[#a594fd]" />
                            <span>Flip</span>
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                          {usp.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {usp.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-[#a594fd]">
                        <span>{usp.metric}</span>
                        <span className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                          Details →
                        </span>
                      </div>
                    </div>

                    {/* ── CARD BACK (Flipped 180deg) ── */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl border-2 border-[#534AB7] bg-[#101740] p-5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                          <span className="text-xs font-bold text-[#3eb489] uppercase tracking-wider">
                            {usp.backHeadline}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <RotateCw className="h-2.5 w-2.5 text-slate-300" />
                            <span>Back</span>
                          </span>
                        </div>
                        <ul className="space-y-2 mt-2">
                          {usp.backPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-200 leading-snug">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#3eb489] shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#a594fd]">
                        <span className="font-semibold text-white">SearchPrex Standard</span>
                        <span className="underline text-slate-300 hover:text-white">Tap to close ↩</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile swipe helper indicator */}
          <div className="sm:hidden mt-4 text-center">
            <span className="text-[11px] text-slate-400 font-medium inline-flex items-center gap-1.5">
              <span>Swipe or tap any card to flip</span>
            </span>
          </div>
        </div>


        {/* ── Lower Block: "Technologies We Use" (Matching uploaded wireframe banner) ── */}
        <div className="space-y-10">
          
          {/* Wireframe Banner: Technologies We Use */}
          <div className="rounded-3xl bg-gradient-to-r from-[#070b24] via-[#0d164d] to-[#070b24] text-white p-8 sm:p-12 shadow-xl border border-slate-800 text-center relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#534AB7] to-transparent" />
            <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-96 rounded-full bg-[#534AB7]/30 blur-3xl" />

            <div className="relative max-w-3xl mx-auto space-y-3 mb-8">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Technology We Used
              </h2>
              <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
                The platforms we use to build, track, and report on your marketing.
              </p>
            </div>

            {/* Seamless Infinite Continuous Marquee Track */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative w-full overflow-hidden py-3"
            >
              {/* Left & Right gradient fade masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#070b24] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#070b24] to-transparent z-10" />

              {/* Scrolling track: doubled for seamless loop */}
              <div className={`flex items-center gap-6 sm:gap-10 w-max ${isPaused ? "" : "animate-scroll"}`}>
                {[...marqueeLogos, ...marqueeLogos].map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all shrink-0 cursor-default"
                  >
                    <div className="shrink-0">{tool.svg}</div>
                    <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Detailed Interactive Tool Deep-Dive (Mobile swipe + Auto-advancing) */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
                  TECHNICAL STACK SPECIFICATION
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#0a0f2e]">
                  How Each Platform Powers Your Detroit Rankings
                </h4>
              </div>

              {/* Tool Navigation Pill Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {tools.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setToolIndex(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      toolIndex === i
                        ? "bg-[#534AB7] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Tool Spotlight Card with Touch Swipe */}
            <div
              onTouchStart={handleTouchStartTool}
              onTouchEnd={handleTouchEndTool}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8 shadow-sm relative overflow-hidden transition-all"
            >
              {/* Category & Status Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-[#534AB7]">
                  <span className="h-2 w-2 rounded-full bg-[#3eb489] animate-pulse" />
                  <span>{tools[toolIndex].category}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">
                  {isPaused ? "Paused" : `Auto-advancing (${toolIndex + 1} of ${tools.length})`}
                </span>
              </div>

              {/* Spotlight Content with Prev / Next Buttons */}
              <div className="flex items-center justify-between gap-3 sm:gap-6 pt-6">
                <button
                  type="button"
                  onClick={prevTool}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Previous tool"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex-1 max-w-lg px-2 text-center space-y-3">
                  <div className="flex justify-center mb-1">
                    <div className="p-3 rounded-2xl bg-white shadow-xs border border-slate-200">
                      {tools[toolIndex].logo}
                    </div>
                  </div>

                  <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#EEEDFE] text-[#534AB7] border border-[#534AB7]/20">
                    {tools[toolIndex].badge}
                  </span>

                  <h5 className="text-xl sm:text-2xl font-black text-[#0a0f2e]">
                    {tools[toolIndex].name}
                  </h5>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    {tools[toolIndex].tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tools[toolIndex].detail}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={nextTool}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Next tool"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Pagination Dots with Active Animation */}
              <div className="mt-6 flex justify-center items-center gap-2">
                {tools.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setToolIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      toolIndex === i ? "w-7 bg-[#534AB7]" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to tool ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
