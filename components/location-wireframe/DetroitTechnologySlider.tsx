"use client";

// components/location-wireframe/DetroitTechnologySlider.tsx
//
// Matches user request:
// - Removed the lower "How Each Platform Powers Your Detroit Rankings" card carousel (red X in screenshot)
// - Greatly upgraded "Technology We Used" slider:
//   * High-fidelity, authentic vector logos for GA4, Semrush, GSC, Screaming Frog, BrightLocal, Local Falcon, NicheSEO PRO, CallRail, WordPress, Google Ads, Meta
//   * Hardware-accelerated continuous infinite marquee for 60fps performance
//   * Premium dark-navy container with ambient edge fades & responsive layout

import React, { useState } from "react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitTechnologySlider({ page }: { page: CityPage }) {
  const [isPaused, setIsPaused] = useState(false);

  const marqueeLogos = [
    {
      name: "Google Analytics 4",
      tag: "Conversion Telemetry",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#F9AB00" fillOpacity="0.15" />
          <rect x="8" y="22" width="6" height="12" rx="3" fill="#E37400" />
          <rect x="17" y="14" width="6" height="20" rx="3" fill="#F9AB00" />
          <rect x="26" y="7" width="6" height="27" rx="3" fill="#FBBC04" />
        </svg>
      ),
    },
    {
      name: "Semrush",
      tag: "Competitive Intelligence",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#FF642D" fillOpacity="0.15" />
          <path
            d="M12 25C15 28 20 28.5 24 27C28 25 30 21 29 17C28.5 13 24 9.5 19 10C14 10.5 11 14.5 11 19"
            stroke="#FF642D"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M21 14L26 19L21 24"
            stroke="#FF642D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Google Search Console",
      tag: "Indexation & Clicks",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#4285F4" fillOpacity="0.15" />
          <path d="M11 27V21M17 27V16M23 27V19M29 27V12" stroke="#4285F4" strokeWidth="3" strokeLinecap="round" />
          <path d="M11 21L17 16L23 19L29 12" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Screaming Frog",
      tag: "Crawl Diagnostics",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#16A34A" fillOpacity="0.15" />
          <ellipse cx="20" cy="22" rx="9" ry="7" fill="#16A34A" />
          <circle cx="15" cy="15" r="4.5" fill="#16A34A" />
          <circle cx="25" cy="15" r="4.5" fill="#16A34A" />
          <circle cx="15" cy="15" r="2.5" fill="white" />
          <circle cx="25" cy="15" r="2.5" fill="white" />
          <circle cx="16" cy="14.5" r="1.2" fill="#0A0F2E" />
          <circle cx="24" cy="14.5" r="1.2" fill="#0A0F2E" />
        </svg>
      ),
    },
    {
      name: "BrightLocal",
      tag: "Citation Footprint",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#2563EB" fillOpacity="0.15" />
          <circle cx="20" cy="20" r="11" stroke="#2563EB" strokeWidth="2.5" />
          <path
            d="M20 12L22.5 17.5L28.5 18.5L24 22.5L25.5 28.5L20 25.5L14.5 28.5L16 22.5L11.5 18.5L17.5 17.5L20 12Z"
            fill="#F59E0B"
          />
        </svg>
      ),
    },
    {
      name: "Local Falcon",
      tag: "7x7 Geo-Grid Tracking",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#F97316" fillOpacity="0.15" />
          <circle cx="20" cy="20" r="12" stroke="#F97316" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="7" stroke="#F97316" strokeWidth="2" />
          <circle cx="20" cy="20" r="3" fill="#F97316" />
        </svg>
      ),
    },
    {
      name: "NicheSEO PRO",
      tag: "Proprietary Automation",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#534AB7" fillOpacity="0.25" />
          <rect x="12" y="12" width="16" height="16" rx="4" stroke="#a594fd" strokeWidth="2" />
          <circle cx="20" cy="20" r="3" fill="#3eb489" />
          <path d="M20 8V12M20 28V32M8 20H12M28 20H32" stroke="#a594fd" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "CallRail",
      tag: "Intake Attribution",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0084FF" fillOpacity="0.15" />
          <path
            d="M13 13C13 11.9 13.9 11 15 11H25C26.1 11 27 11.9 27 13V23C27 24.1 26.1 25 25 25H18L13 29V13Z"
            fill="#0084FF"
          />
          <path d="M17 18H23M17 15H21" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "WordPress",
      tag: "CMS Engine",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#21759B" fillOpacity="0.15" />
          <circle cx="20" cy="20" r="11" stroke="#21759B" strokeWidth="2" />
          <path
            d="M12.5 19.5L17.5 28L15 22L12.5 19.5ZM20 27L23 18.5L25.5 24L20 27ZM23.5 14C22.5 14 21 14.5 21 15.5C21 17 23 17 23 18.5C23 19.5 22 20.5 20.5 20.5"
            stroke="#21759B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Google Ads",
      tag: "Paid Telemetry",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#4285F4" fillOpacity="0.15" />
          <ellipse cx="16" cy="24" rx="4" ry="7" transform="rotate(-30 16 24)" fill="#FBBC04" />
          <ellipse cx="24" cy="18" rx="4" ry="10" transform="rotate(30 24 18)" fill="#4285F4" />
          <circle cx="13" cy="27" r="3.5" fill="#34A853" />
        </svg>
      ),
    },
    {
      name: "Meta Suite",
      tag: "Social Citations",
      svg: (
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0081FB" fillOpacity="0.15" />
          <path
            d="M13 23C11 20 11 16 14 14C17 12 20 16 20 18C20 16 23 12 26 14C29 16 29 20 27 23C24 27 21 21 20 19C19 21 16 27 13 23Z"
            stroke="#0081FB"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-[#070b24] text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-56 w-[600px] rounded-full bg-[#534AB7]/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a594fd] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            ENTERPRISE SEO INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            The Law Firm SEO Tech Stack Behind Our Detroit Rankings
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We use Semrush for competitive research, Google Search Console for real query data, Screaming Frog for technical crawls, BrightLocal for citations, Local Falcon for 7x7 geo-grid tracking, CallRail for call attribution, GA4 for conversions and our own NicheSEO PRO platform for indexing and AI citation monitoring.
          </p>
        </div>

        {/* Continuous Infinite Marquee Track with Smooth CSS Animation */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative w-full overflow-hidden py-4 rounded-2xl bg-white/[0.02] border border-white/10"
        >
          {/* Gradient Edge Masks for Smooth Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#070b24] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#070b24] to-transparent z-10" />

          {/* Marquee Row: Doubled for Seamless Loop */}
          <div
            className="flex items-center gap-5 sm:gap-8 w-max will-change-transform"
            style={{
              animation: isPaused
                ? "none"
                : "marqueeScroll 32s linear infinite",
            }}
          >
            {[...marqueeLogos, ...marqueeLogos].map((tool, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-[#534AB7]/80 transition-all shrink-0 cursor-default group shadow-sm"
              >
                <div className="shrink-0 transition-transform group-hover:scale-110">
                  {tool.svg}
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white whitespace-nowrap group-hover:text-[#a594fd] transition-colors">
                    {tool.name}
                  </span>
                  <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                    {tool.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Sub-Caption */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#3eb489]" />
            <span>Direct API integrations for sub-2h indexation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#a594fd]" />
            <span>Multi-channel call tracking with CallRail</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F97316]" />
            <span>0.5-mile radius 7x7 geo-grid tracking</span>
          </div>
        </div>

      </div>

      {/* Global Style for Smooth Continuous Marquee */}
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
