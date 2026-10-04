// components/LocalSerpVisuals.tsx
//
// Bespoke, data-driven visual cards for city location pages (/locations/[state]/[city]).
// Replaces generic, repetitive stock photos with authentic legal search
// architecture and Google 3-Pack simulation tailored to each city's exact
// jurisdiction, county, bar association, and practice demand.

import React from "react";
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Search,
  Star,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

/**
 * Visual breakdown of the local legal search battlefield in a specific city.
 * Contrasts expensive PPC burn vs national directory intermediary toll vs
 * permanent Google 3-Pack & practice silo organic equity.
 */
export function LocalSerpBattlefieldCard({ page }: { page: CityPage }) {
  const topPractice = page.practiceDemand[0]?.area ?? "Legal Representation";

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-[#0a0f2e] text-white shadow-xl">
      {/* Header bar */}
      <div className="border-b border-white/10 bg-white/5 px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              The {page.city} Search Battlefield · {page.county} Market Economics
            </span>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
            {page.stateAbbr} Jurisdiction Data
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 sm:p-8 lg:p-10">
        <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Where prospective clients in {page.city} actually click
        </h3>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300 max-w-3xl">
          When an individual in {page.county} needs urgent legal help for{" "}
          <span className="font-semibold text-white">{topPractice.toLowerCase()}</span>, Google presents three channels. Here is how firms in {page.city} acquire cases—and where the biggest marketing spend gets wasted:
        </p>

        {/* 3-Channel Comparison Grid */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {/* 1. Paid Ads */}
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-red-500/20 px-2.5 py-1 text-xs font-bold text-red-300">
                  Google PPC Ads
                </span>
                <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> High Risk
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white">$150–$300+</span>
                <span className="text-xs text-slate-400 block mt-0.5">Average Cost Per Click in {page.county}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Aggressive PPC bidding wars. Once your monthly budget ends, calls stop immediately with zero lasting brand equity in {page.city}.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-500/20 text-[11px] font-medium text-red-300/80">
              ✕ High cost-per-acquisition · Dependent on daily spend
            </div>
          </div>

          {/* 2. Legal Directories */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-5 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300">
                  National Directories
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  Avvo / Justia / FindLaw
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white">Rented Space</span>
                <span className="text-xs text-slate-400 block mt-0.5">Lead Reselling Model</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Directories capture broad keywords for {page.city} and resell the exact same caller lead to 4 or 5 competing local law firms.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] font-medium text-amber-300/80">
              ✕ Shared leads · You don’t own the ranking asset
            </div>
          </div>

          {/* 3. Map Pack & Local Organic (SearchPrex) */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-5 backdrop-blur-xs flex flex-col justify-between relative ring-1 ring-emerald-500/40">
            <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-950 shadow-md">
              SearchPrex Core
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300">
                  Google Map 3-Pack & Organic
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> High ROI
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-emerald-400">70%+ Calls</span>
                <span className="text-xs text-slate-400 block mt-0.5">$0 Cost Per Click · Lasting Authority</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Dominating the local 3-pack and dedicated practice-area silos. When prospective clients in {page.city} search, your firm is their first verified choice.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
              ✓ Direct inbound calls · Exclusively retained cases
            </div>
          </div>
        </div>

        {/* Live dynamic metrics badge bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#7F77DD]" />
            <span>Target Geography: <strong className="text-white">{page.city}, {page.state} ({page.county})</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>Local Case Acquisition Cost: <strong className="text-emerald-400">~80% lower than paid ads</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual simulation of the Google Map 3-Pack and citation ecosystem for a specific city.
 * Demonstrates the 3 technical ranking pillars Google uses to evaluate local law firms.
 */
export function LocalMapPackSimulationCard({ page }: { page: CityPage }) {
  const topPractice = page.practiceDemand[0]?.area ?? "Law Firm";
  const primaryNeighborhood = page.neighborhoods[0] ?? page.city;

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Top Header */}
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#534AB7]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
              Local 3-Pack Architecture · {page.city}, {page.stateAbbr}
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Mobile Search Intent Simulation
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Simulated 3-Pack Google Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              {/* Google Search Bar Mockup */}
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-xs mb-3">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-medium truncate">
                  {topPractice.toLowerCase()} in {page.city}
                </span>
              </div>

              {/* The Map Pack Result Card Mockup */}
              <div className="rounded-xl border border-emerald-500/40 bg-white p-4 shadow-md ring-2 ring-emerald-500/20">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      #1 Map Pack Result
                    </span>
                    <h4 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                      Your Firm · {page.city} Office
                    </h4>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 font-semibold">
                  <span>5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-500 font-normal">(140+ Reviews)</span>
                </div>

                <p className="mt-2 text-xs text-slate-600">
                  {topPractice} Attorney · {primaryNeighborhood}, {page.city}
                </p>

                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Open 24 hours · Confirmed by phone call</span>
                </div>

                {/* Simulated Google Action Buttons */}
                <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                  <div className="rounded-lg bg-slate-100 py-1.5 text-[11px] font-bold text-[#534AB7]">
                    Website
                  </div>
                  <div className="rounded-lg bg-slate-100 py-1.5 text-[11px] font-bold text-slate-700">
                    Directions
                  </div>
                  <div className="rounded-lg bg-emerald-50 py-1.5 text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                    <PhoneCall className="h-3 w-3" /> Call
                  </div>
                </div>
              </div>

              <div className="mt-2.5 text-center text-[11px] text-slate-500 font-medium">
                70%+ of mobile callers in {page.city} tap directly from this 3-Pack without scrolling down.
              </div>
            </div>
          </div>

          {/* Right Column: The 3 Local Signals Google Verifies (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                Local Verification Engine
              </span>
              <h3 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
                How we place your firm in the {page.city} 3-Pack
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Google doesn&apos;t rank law firms in the Map Pack because of keyword stuffing. Rankings come from strict, verifiable geo-signals that our agency builds out:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Pillar 1 */}
              <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5">
                <div className="rounded-lg bg-[#534AB7]/10 p-2 text-[#534AB7] shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    1. Primary GBP Category & {page.county} Radius
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    Aligning your Google Business Profile primary category with verified service areas across {page.neighborhoods.slice(0, 3).join(", ") || page.city}, matching Google Maps user search radius.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5">
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-700 shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    2. Verified Local Citations & {page.barAssociation} Sync
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    100% NAP (Name, Address, Phone) consistency across the {page.barAssociation}, state bar records, local chambers, and legal authority directories.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5">
                <div className="rounded-lg bg-purple-500/10 p-2 text-purple-700 shrink-0 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    3. Jurisdiction-Specific Practice Silos ({page.stateAbbr})
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    Authoritative practice pages directly addressing {page.legalContext.heading}—giving Google the contextual depth needed to outrank legacy directories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
