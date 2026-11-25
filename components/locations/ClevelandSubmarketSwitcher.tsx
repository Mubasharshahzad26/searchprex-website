"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Scale, Car } from "lucide-react";
import type { SubmarketItem } from "@/lib/cleveland-practice-pages";

const DEFAULT_PI_SUBMARKETS: SubmarketItem[] = [
  {
    id: "downtown",
    name: "Downtown Cleveland",
    regionBadge: "Cuyahoga Central Hub",
    photoUrl: "/images/services/law-firm/cleveland-ohio-personal-injury-law-firm-seo-district.webp",
    photoAlt: "Downtown Cleveland legal district near Cuyahoga County Justice Center for personal injury law firm SEO",
    courtName: "Cuyahoga County Court of Common Pleas & Cleveland Municipal Court",
    courtAddress: "1200 Ontario St, Cleveland, OH 44113",
    corridors: "I-90 Innerbelt, Shoreway (Route 2), Superior Ave, Ontario St",
    corridorsLabel: "Primary Collision Corridors",
    marketReality: "Dense concentration of high-stakes commercial vehicle collisions, pedestrian accidents near Public Square, and major jury litigation in Cuyahoga County Court of Common Pleas.",
    targetKeywords: [
      "personal injury lawyer cleveland",
      "car accident attorney downtown cleveland",
      "cuyahoga county truck accident lawyer",
    ],
    mapQuery: "1200+Ontario+St,+Cleveland,+OH+44113",
  },
  {
    id: "lakewood-westlake",
    name: "Lakewood & Westlake",
    regionBadge: "West Side Corridor",
    photoUrl: "/images/services/law-firm/cleveland-lakewood-westlake-corridor.webp",
    photoAlt: "Lakewood Ohio Detroit Avenue neighborhood personal injury market",
    courtName: "Lakewood Municipal Court & Rocky River Municipal Court",
    courtAddress: "12650 Detroit Ave, Lakewood, OH & 21012 Hilliard Blvd, Rocky River, OH",
    corridors: "Detroit Ave, Clifton Blvd, I-90 West, Columbia Rd (Westlake)",
    corridorsLabel: "Primary Collision Corridors",
    marketReality: "High-earning West Side suburbs generate high-value motor vehicle accident claims and slip-and-fall torts along dense commercial strips on Detroit Avenue and Clifton Boulevard.",
    targetKeywords: [
      "car accident lawyer westlake oh",
      "slip and fall attorney lakewood ohio",
      "personal injury lawyer rocky river oh",
    ],
    mapQuery: "12650+Detroit+Ave,+Lakewood,+OH+44107",
  },
  {
    id: "parma-strongsville",
    name: "Parma & Strongsville",
    regionBadge: "South County Influx",
    photoUrl: "/images/services/law-firm/cleveland-parma-strongsville-corridor.webp",
    photoAlt: "Parma Ohio Ridge Road corridor local law firm SEO",
    courtName: "Parma Municipal Court",
    courtAddress: "5555 Powers Blvd, Parma, OH 44129",
    corridors: "Ridge Rd, Pearl Rd (Route 42), I-71 South, I-480 West Interchange",
    corridorsLabel: "Primary Collision Corridors",
    marketReality: "Cuyahoga County's most populous suburban submarket, experiencing heavy multi-car collisions on Ridge Road and high-speed commuter rear-end crashes feeding into the I-71 corridor.",
    targetKeywords: [
      "car accident lawyer parma oh",
      "injury attorney strongsville ohio",
      "parma municipal court accident lawyer",
    ],
    mapQuery: "5555+Powers+Blvd,+Parma,+OH+44129",
  },
  {
    id: "beachwood-shaker",
    name: "Beachwood & Shaker Heights",
    regionBadge: "East Side Corporate Corridor",
    photoUrl: "/images/services/law-firm/cleveland-beachwood-shaker-corridor.webp",
    photoAlt: "Beachwood Ohio Chagrin Boulevard legal and corporate district",
    courtName: "Shaker Heights Municipal Court",
    courtAddress: "3355 Lee Rd, Shaker Heights, OH 44120",
    corridors: "Chagrin Blvd, I-271 Express/Local Lanes, Harvard Rd, Richmond Rd",
    corridorsLabel: "Primary Collision Corridors",
    marketReality: "Affluent corporate and medical offices generate high-policy-limit injury litigation, commercial rideshare collisions, and severe crashes along the high-traffic I-271 interchange.",
    targetKeywords: [
      "injury attorney beachwood ohio",
      "car accident lawyer shaker heights oh",
      "chagrin boulevard accident attorney",
    ],
    mapQuery: "3355+Lee+Rd,+Shaker+Heights,+OH+44120",
  },
];

export default function ClevelandSubmarketSwitcher({
  submarkets,
  practiceLabel = "Personal Injury",
}: {
  submarkets?: SubmarketItem[];
  practiceLabel?: string;
}) {
  const items = submarkets && submarkets.length > 0 ? submarkets : DEFAULT_PI_SUBMARKETS;
  const [activeTab, setActiveTab] = useState<string>(items[0].id);
  const activeSubmarket = items.find((s) => s.id === activeTab) || items[0];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
      
      {/* Submarket Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2 shrink-0">
          Target Submarket:
        </span>
        {items.map((submarket) => {
          const isActive = activeTab === submarket.id;
          return (
            <button
              key={submarket.id}
              type="button"
              onClick={() => setActiveTab(submarket.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <span>{submarket.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {submarket.regionBadge.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Submarket View */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Photo + Local Copy + Municipal Court */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Localized Photo Card */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs group">
            <Image
              src={activeSubmarket.photoUrl}
              alt={activeSubmarket.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] font-bold text-neutral-950 border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-900" />
              <span>{activeSubmarket.regionBadge}</span>
            </div>
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 block mb-0.5 drop-shadow-xs">
                Active Localized Search Basin
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white leading-tight drop-shadow-xs">
                {activeSubmarket.name} {practiceLabel} Market
              </h4>
            </div>
          </div>

          {/* Submarket Realities */}
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Local Market Characteristics
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeSubmarket.marketReality}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-950 mb-1">
                  <Scale className="w-3.5 h-3.5 text-neutral-800" />
                  <span>Jurisdiction Anchor</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {activeSubmarket.courtName}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  {activeSubmarket.courtAddress}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-950 mb-1">
                  <Car className="w-3.5 h-3.5 text-neutral-800" />
                  <span>{activeSubmarket.corridorsLabel || "Primary Local Arterials"}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {activeSubmarket.corridors}
                </p>
              </div>
            </div>

            {/* Keyword Silo Preview */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                High-Intent Keywords Captured in {activeSubmarket.name}:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeSubmarket.targetKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200"
                  >
                    &quot;{kw}&quot;
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Synced Google Map View */}
        <div className="lg:col-span-5 space-y-3">
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 min-h-[360px] sm:min-h-[440px] flex flex-col shadow-2xs">
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs font-bold text-neutral-950">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-900" />
                <span>{activeSubmarket.name} Jurisdiction Map</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Live Google Map Pin
              </span>
            </div>

            <iframe
              key={activeSubmarket.id}
              src={`https://maps.google.com/maps?q=${activeSubmarket.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              title={`${activeSubmarket.name} ${practiceLabel} Jurisdiction Map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 min-h-[350px] border-0"
            />

            <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
              <span className="text-[10px] text-slate-500">
                Centered on {activeSubmarket.courtName.split("&")[0]}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Hidden/Prerendered SEO Content for Googlebot (All Submarkets Crawlable) */}
      <div className="sr-only" aria-hidden="true">
        {items.map((submarket) => (
          <div key={`seo-${submarket.id}`}>
            <h3>{submarket.name} {practiceLabel} SEO Cleveland</h3>
            <p>{submarket.marketReality}</p>
            <p>Court: {submarket.courtName} - {submarket.courtAddress}</p>
            <p>Corridors: {submarket.corridors}</p>
            <ul>
              {submarket.targetKeywords.map((kw, i) => (
                <li key={i}>{kw}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
