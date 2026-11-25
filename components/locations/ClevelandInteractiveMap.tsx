"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Building2, Activity, ShieldAlert, ExternalLink } from "lucide-react";

interface VenuePin {
  id: string;
  name: string;
  category: "Court Anchor" | "Level 1 Trauma" | "Crash Hotspot" | "Freight Corridor";
  address: string;
  query: string;
  jurisdictionDetail: string;
  colorClass: string;
}

const VENUES: VenuePin[] = [
  {
    id: "pin-1",
    name: "Cuyahoga County Court of Common Pleas",
    category: "Court Anchor",
    address: "1200 Ontario St, Cleveland, OH 44113",
    query: "1200+Ontario+St,+Cleveland,+OH+44113",
    jurisdictionDetail: "General Division civil trial jurisdiction for major auto collisions, wrongful death, and jury verdicts >$25,000.",
    colorClass: "border-neutral-900 bg-neutral-900 text-white",
  },
  {
    id: "pin-2",
    name: "MetroHealth Medical Center",
    category: "Level 1 Trauma",
    address: "2500 MetroHealth Dr, Cleveland, OH 44109",
    query: "2500+MetroHealth+Dr,+Cleveland,+OH+44109",
    jurisdictionDetail: "Main campus Level 1 Adult Trauma Center where over 64% of catastrophic injury patients search legal counsel.",
    colorClass: "border-neutral-900 bg-neutral-900 text-white",
  },
  {
    id: "pin-3",
    name: "University Hospitals Cleveland Medical Center",
    category: "Level 1 Trauma",
    address: "11100 Euclid Ave, Cleveland, OH 44106",
    query: "11100+Euclid+Ave,+Cleveland,+OH+44106",
    jurisdictionDetail: "University Circle flagship tertiary trauma center and neurological rehabilitation referral hub.",
    colorClass: "border-neutral-900 bg-neutral-900 text-white",
  },
  {
    id: "pin-4",
    name: "I-90 Innerbelt / Dead Man's Curve",
    category: "Crash Hotspot",
    address: "I-90 Innerbelt at Superior Ave, Cleveland, OH",
    query: "Dead+Man's+Curve,+Cleveland,+OH",
    jurisdictionDetail: "Ohio's notorious 90-degree freeway turn with frequent multi-vehicle pileups and jackknifed commercial trucks.",
    colorClass: "border-neutral-900 bg-neutral-900 text-white",
  },
  {
    id: "pin-5",
    name: "I-480 Valley View Bridge",
    category: "Freight Corridor",
    address: "I-480 over Cuyahoga River Valley, Independence, OH",
    query: "Valley+View+Bridge,+Independence,+OH",
    jurisdictionDetail: "Busiest commercial freight crossing in Ohio linking Hopkins logistics centers with high-speed interstate traffic.",
    colorClass: "border-neutral-900 bg-neutral-900 text-white",
  },
];

export default function ClevelandInteractiveMap() {
  const [activePin, setActivePin] = useState<VenuePin>(VENUES[0]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left 35%: Pin Legend & Clickable Venue List */}
        <div className="lg:col-span-5 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-neutral-900" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Interactive Jurisdiction Legend
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight mb-2">
              Explore Cuyahoga Courts, Hospitals &amp; Crash Hotspots
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              Click any jurisdiction anchor below to focus the interactive map on that specific court, trauma center, or high-collision corridor:
            </p>

            <div className="space-y-2.5">
              {VENUES.map((venue, idx) => {
                const isSelected = activePin.id === venue.id;
                return (
                  <button
                    key={venue.id}
                    type="button"
                    onClick={() => setActivePin(venue)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? "border-neutral-900 bg-white shadow-xs ring-1 ring-neutral-900/10"
                        : "border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${
                        isSelected ? venue.colorClass : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-xs font-bold text-neutral-950 truncate">
                          {venue.name}
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                          {venue.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mb-1">
                        {venue.address}
                      </p>
                      {isSelected && (
                        <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 leading-relaxed mt-1">
                          {venue.jurisdictionDetail}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1 font-semibold text-neutral-900">
              <Navigation className="w-3.5 h-3.5 text-neutral-900" />
              Active: {activePin.name}
            </span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${activePin.query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 font-bold hover:underline flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right 65%: Embedded Google Map */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[420px] bg-slate-100 flex flex-col">
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs text-[11px] font-semibold text-neutral-900 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-900" />
            <span>Targeting: {activePin.name}</span>
          </div>

          <iframe
            key={activePin.id}
            src={`https://maps.google.com/maps?q=${activePin.query}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            title="Cuyahoga County Personal Injury Courts, Trauma Centers, and Highway Corridors Map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
          />

          <div className="p-3 bg-white border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-500">
              Interactive service-area map showing key Cuyahoga County civil courts, Level 1 trauma centers, and high-frequency crash corridors.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
