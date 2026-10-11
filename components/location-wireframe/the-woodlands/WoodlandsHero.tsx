'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Sparkles, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

export default function WoodlandsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0f2e] via-[#10194a] to-[#0a0f2e] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            The Woodlands & Montgomery County Legal Market
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Zero-Conflict Exclusivity: 1 Firm Per Practice Area
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Law Firm SEO in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-[#EEEDFE] to-indigo-200">
                The Woodlands, TX
              </span>
              : Built for Montgomery County Venue & Village Intent
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
              The Woodlands is an affluent master-planned township split between Montgomery County (Conroe courts) and Harris County (Creekside Park). We build answer-first practice silos, village hubs, and AI citation engines that turn high-net-worth inquiries into signed retainers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#diagnosis-tool"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white bg-[#534AB7] hover:bg-[#3C3489] transition-all duration-200 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-indigo-200" />
                Diagnose Your Woodlands Firm
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all duration-200"
              >
                View Plans & 90-Day Guarantee
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Fast Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">$145k+</div>
                <div className="text-xs text-slate-400 mt-0.5">Median Household Income</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-300 tracking-tight">8 Villages</div>
                <div className="text-xs text-slate-400 mt-0.5">Alden Bridge to Creekside</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-emerald-400 tracking-tight">2 Counties</div>
                <div className="text-xs text-slate-400 mt-0.5">Montgomery (90%) & Harris</div>
              </div>
            </div>
          </div>

          {/* Decorative Pine & Waterway Vector Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-indigo-950/60 border border-indigo-900/50 p-6 shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Waterway & Pines Sunrise SVG */}
              <div className="w-full h-44 rounded-xl bg-gradient-to-b from-[#11183c] to-[#0c102a] border border-indigo-900/40 relative overflow-hidden flex items-end justify-center mb-5">
                <svg
                  viewBox="0 0 400 180"
                  className="w-full h-full object-cover"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e1b4b" />
                      <stop offset="60%" stopColor="#312e81" />
                      <stop offset="100%" stopColor="#4338ca" />
                    </linearGradient>
                    <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3730a3" />
                      <stop offset="100%" stopColor="#1e1b4b" />
                    </linearGradient>
                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Sky */}
                  <rect width="400" height="120" fill="url(#skyGrad)" />
                  {/* Subtle Morning Sun */}
                  <circle cx="200" cy="70" r="38" fill="url(#sunGlow)" />
                  <circle cx="200" cy="70" r="16" fill="#e0e7ff" opacity="0.9" />

                  {/* Silhouette Pines */}
                  <path d="M 20 120 L 35 70 L 50 120 Z" fill="#1e1b4b" opacity="0.8" />
                  <path d="M 40 120 L 58 60 L 76 120 Z" fill="#0f172a" />
                  <path d="M 70 120 L 85 75 L 100 120 Z" fill="#1e1b4b" opacity="0.8" />
                  
                  <path d="M 300 120 L 315 72 L 330 120 Z" fill="#1e1b4b" opacity="0.8" />
                  <path d="M 320 120 L 340 58 L 360 120 Z" fill="#0f172a" />
                  <path d="M 350 120 L 368 68 L 386 120 Z" fill="#1e1b4b" opacity="0.8" />

                  {/* The Woodlands Waterway canal */}
                  <rect y="120" width="400" height="60" fill="url(#waterGrad)" />
                  {/* Water reflections */}
                  <ellipse cx="200" cy="132" rx="70" ry="2" fill="#c7d2fe" opacity="0.4" />
                  <ellipse cx="200" cy="144" rx="90" ry="2.5" fill="#a5b4fc" opacity="0.3" />
                  <ellipse cx="200" cy="158" rx="120" ry="3" fill="#818cf8" opacity="0.2" />
                </svg>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-900/80 text-indigo-200 border border-indigo-700/50">
                  Town Center Waterway
                </div>
              </div>

              <h2 className="text-base font-semibold text-white mb-2">
                The Woodlands Legal Architecture
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Montgomery Court filing:</strong> Conroe district venue rules for 90% of township.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Harris Court filing:</strong> Creekside Park exceptions clarified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Executive wealth intent:</strong> Trusts, muniment of title, & executive equity.</span>
                </li>
              </ul>

              <div className="mt-5 pt-4 border-t border-indigo-950 flex items-center justify-between text-xs">
                <span className="text-slate-400">Led by Founder</span>
                <span className="font-medium text-indigo-300">Mubashar Sharif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
