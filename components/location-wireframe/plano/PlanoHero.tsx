'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Sparkles, ArrowRight, Building2, Users2, CheckCircle2 } from 'lucide-react';
import type { CityPage } from '@/lib/city-pages';

interface PlanoHeroProps {
  page?: CityPage;
}

export default function PlanoHero({ page }: PlanoHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0f2e] via-[#10194a] to-[#0a0f2e] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Plano & Collin County Legal Market
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
                Plano, Texas
              </span>
              : Be the Firm Newcomers Find in Week One
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
              Many professionals move to Plano with no local lawyer and no one to ask. Google and AI assistants are their referral network. We make sure your firm is the answer for executive divorce, business immigration, and estate planning across Collin County.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#reality-check-form"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white bg-[#534AB7] hover:bg-[#3C3489] transition-all duration-200 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-indigo-200" />
                Get My Free Reality Check
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all duration-200"
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Fast Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">$116k+</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Median Household Income</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-300 tracking-tight">Legacy West</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Corporate Relocation Corridor</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-emerald-400 tracking-tight">100% Locked</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Zip Exclusivity Protection</p>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate & Newcomer Trust Card */}
          <div className="lg:col-span-4">
            <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900/90 to-indigo-950/60 border border-indigo-500/20 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#534AB7]/20 flex items-center justify-center text-indigo-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Plano Inbound Engine</h2>
                  <p className="text-xs text-slate-400">Collin County Executive Focus</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Executive Divorce & RSUs</strong>
                    <span>Texas community property targeting for corporate equity packages.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Corporate Immigration (L-1/H-1B)</strong>
                    <span>Capturing headquarters transfers along Dallas North Tollway.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">AI Overview & Map Pack Dominance</strong>
                    <span>First-week answer citations in ChatGPT, Gemini, and Google.</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
                <span className="text-[11px] text-slate-400 tracking-wide font-medium">
                  Founder-led · One firm per practice area · Month-to-month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
