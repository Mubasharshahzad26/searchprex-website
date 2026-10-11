"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Building2,
  TrendingUp,
  Shield,
  Navigation,
  Compass,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface SubmarketZone {
  id: string;
  name: string;
  population: string;
  courts: string;
  leadIntent: string;
  mapQuery: string;
}

const SUBMARKET_ZONES: SubmarketZone[] = [
  {
    id: "downtown",
    name: "Downtown & Justice Center",
    population: "65,000+ daytime / 20k residents",
    courts: "Cuyahoga County Common Pleas (1200 Ontario St), US District Court Northern District of Ohio",
    leadIntent: "High-stakes commercial litigation, catastrophic personal injury, criminal defense & federal appeals.",
    mapQuery: "Cuyahoga+County+Justice+Center+1200+Ontario+St+Cleveland+OH",
  },
  {
    id: "westside",
    name: "West Side (Lakewood / Westlake)",
    population: "115,000+ residents",
    courts: "Lakewood Municipal Court, Rocky River Municipal Court",
    leadIntent: "I-90 / Shoreway auto collisions, Ohio BWC manufacturing injuries, OVI defense, family law.",
    mapQuery: "Lakewood+Municipal+Court+Lakewood+OH",
  },
  {
    id: "parma",
    name: "South County (Parma / Strongsville)",
    population: "160,000+ residents",
    courts: "Parma Municipal Court, Berea Municipal Court",
    leadIntent: "Industrial machinery injuries, workplace accidents, probate disputes, divorce litigation.",
    mapQuery: "Parma+Municipal+Court+Parma+OH",
  },
  {
    id: "eastside",
    name: "East Side (Beachwood / Shaker Heights)",
    population: "95,000+ residents",
    courts: "Shaker Heights Municipal Court, Bedford Municipal Court",
    leadIntent: "High-net-worth estate planning, executive employment disputes, medical malpractice, I-271 crashes.",
    mapQuery: "Beachwood+OH+Municipal+District",
  },
];

export default function ClevelandDemographyMap() {
  const [activeZone, setActiveZone] = useState<SubmarketZone>(SUBMARKET_ZONES[0]);

  return (
    <section id="cleveland-demography" className="border-b border-slate-200 bg-slate-50/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
            <Compass className="h-4 w-4" />
            <span>Local Demography & Geofencing Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
            Cleveland & Cuyahoga County: Where High-Value Clients Search
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            With over 1.23 million residents, Cuyahoga County is Ohio's legal epicenter. A generic downtown Cleveland ranking won't capture an auto accident victim in Lakewood or an injured factory worker in Parma. Here is how SearchPrex maps and geofences your practice across every court district.
          </p>
        </div>

        {/* 4 Demography Metric Cards */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/30 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#534AB7]">
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#534AB7] transition-colors mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">County Population</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0a0f2e]">1,235,000+</div>
            <p className="mt-1 text-xs text-slate-500">Cuyahoga County total addressable market</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/30 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-indigo-400">
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2">
              <Building2 className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Court Venues</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0a0f2e]">13 Municipal</div>
            <p className="mt-1 text-xs text-slate-500">+ Cuyahoga County Common Pleas & Federal</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/30 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#1a7d59]">
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#1a7d59] transition-colors mb-2">
              <Navigation className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Geofence Radius</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0a0f2e]">7–15 Miles</div>
            <p className="mt-1 text-xs text-slate-500">Targeted Map Pack proximity grid per practice</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/30 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#534AB7]">
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#534AB7] transition-colors mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">High-Intent Traffic</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0a0f2e]">2–5 / 100 KD</div>
            <p className="mt-1 text-xs text-slate-500">SEMrush keyword difficulty for Ohio BWC & localized PI</p>
          </div>
        </div>

        {/* Interactive Map & Local Imagery Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map & Submarket Tabs Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-lg shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-[#534AB7]/30">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0a0f2e] flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#534AB7]" />
                    <span>Cuyahoga County Legal Jurisdiction Map</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a submarket zone to view local court anchors and demographic search intent.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Geofenced Coordinates
                </span>
              </div>

              {/* Submarket Selector Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {SUBMARKET_ZONES.map((zone) => {
                  const isSelected = activeZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                        isSelected
                          ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25 scale-102"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {zone.name}
                    </button>
                  );
                })}
              </div>

              {/* Responsive Google Maps Embed */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  title={`Cleveland Legal Map - ${activeZone.name}`}
                  src={`https://maps.google.com/maps?q=${activeZone.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full border-0 filter saturate-105"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Active Zone Detail Card */}
              <div className="mt-4 rounded-xl border border-indigo-100 bg-[#EEEDFE]/30 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#534AB7] uppercase tracking-wider">{activeZone.name}</span>
                  <span className="text-slate-600 font-mono">{activeZone.population}</span>
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-[#0a0f2e]">Key Court Anchors:</strong> {activeZone.courts}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-[#0a0f2e]">Searcher Demographic Intent:</strong> {activeZone.leadIntent}
                </div>
              </div>
            </div>
          </div>

          {/* Local Cleveland Photography & Geo-Authority Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Cleveland Legal District Photo */}
            <div className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#534AB7]/30 hover:-translate-y-1">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/locations/cleveland-legal-district.webp"
                  alt="Cleveland Legal District & Cuyahoga County Justice Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                    Downtown Anchor Venue
                  </span>
                  <h4 className="text-sm sm:text-base font-bold">
                    Cuyahoga County Justice Center (1200 Ontario St)
                  </h4>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Located in the heart of Downtown Cleveland, the Justice Center processes Ohio's highest civil claim volume. We align your practice page citations with local court rules and judicial clerk protocols. Learn about our{" "}
                  <Link href="/services/local-seo" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
                    local geofenced SEO setup
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Card 2: Cleveland Law Consultation Photo */}
            <div className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#534AB7]/30 hover:-translate-y-1">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/locations/cleveland-law-consultation.webp"
                  alt="Cleveland Law Firm Client Consultation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Client Conversion
                  </span>
                  <h4 className="text-sm sm:text-base font-bold">
                    Cuyahoga County Client Consultations
                  </h4>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We don't optimize for national curiosity clicks. Every call tracking number and intake form is calibrated to attract pre-qualified local residents seeking immediate representation.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
