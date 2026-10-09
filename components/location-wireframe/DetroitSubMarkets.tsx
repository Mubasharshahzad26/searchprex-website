"use client";

// components/location-wireframe/DetroitSubMarkets.tsx
//
// Matches user request:
// - Removed both lower redundant sections (Revenue First Approach $18.4M+ card & 5 Corridors tab box)
// - Focuses purely on the Lead Quality Problem & Solution:
//   * H2: Worried of Not Getting Qualified Law Firm Leads In Detroit, MI?
//   * H3: We Came With a Solution Instead of Traditional SEO Approach
//   * Highly relevant localized legal consultation image
//   * Concrete statutory qualification bullets

import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitSubMarkets({ page }: { page: CityPage }) {
  return (
    <section className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Lead Problem & Revenue-First Solution ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
              QUALIFIED CASE ACQUISITION · {page.city.toUpperCase()}, {page.stateAbbr}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e] leading-tight">
              Worried of Not Getting Qualified Law Firm Leads In {page.city}, {page.stateAbbr}?
            </h2>

            <h3 className="text-xl sm:text-2xl font-bold text-[#534AB7]">
              We Came With a Solution Instead of Traditional SEO Approach
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Most legal marketing agencies sell vanity traffic reports filled with out-of-state clicks and price-shoppers who never sign a retainer. In {page.city}&apos;s unique statutory environment, generic SEO fails because it ignores localized courthouse corridors and Michigan&apos;s complex statutory no-fault thresholds.
            </p>

            <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0" />
                <span>Targeting Wayne County 36th District &amp; 3rd Circuit Court proximity</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0" />
                <span>Statutory MCL § 500.3101 No-Fault distinction that drives real retainers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0" />
                <span>Zero vanity clicks — 100% phone call and intake attribution</span>
              </div>
            </div>
          </div>

          {/* Right Column: Highly Relevant Localized Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <Image
                src="/images/locations/detroit-law-consultation.webp"
                alt="Detroit Law Firm Partner Reviewing Qualified Client Retainer Intake"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/85 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#534AB7]/90 text-white backdrop-blur-xs mb-1 border border-white/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#3eb489]" />
                  <span>Qualified Case Acquisition</span>
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  Wayne County legal inquiries converted to signed retainers.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
