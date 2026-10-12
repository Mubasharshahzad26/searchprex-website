"use client";

import React from "react";

const CORRIDOR_CARDS = [
  {
    tag: "Cross-Border Freight · I-20 & I-49",
    title: "East Texas & Louisiana Interstate Crash Jurisdiction",
    desc: "When a Texas driver from Marshall or Longview is injured by a commercial carrier on I-20 in Caddo or Bossier Parish, Louisiana's 2-year delictual prescription (La. Civ. Code Art. 3493.11) and 1st/26th JDC venue rules govern the claim. Our cross-border content silos capture both Louisiana residents and out-of-state motorists searching for local Shreveport trial counsel.",
    metrics: ["501 Texas St (1st JDC)", "300 Fannin St (Federal W.D. LA)"],
  },
  {
    tag: "Barksdale Air Force Base · Bossier Parish",
    title: "Military Divorce, SCRA & 26th JDC Family Law",
    desc: "With over 15,000 active-duty, reserve, and civilian personnel tied to Barksdale AFB, Bossier Parish generates continuous demand for military pension division (USFSPA), Servicemembers Civil Relief Act (SCRA) stays, and interstate custody modifications.",
    metrics: ["204 Burt Blvd (26th JDC Benton)", "Bossier City & Airline Dr Silos"],
  },
  {
    tag: "Haynesville Shale & Port of Caddo-Bossier",
    title: "Oilfield, Pipeline & Industrial Work Injury Silos",
    desc: "Drilling rig blowouts, compressor station accidents, and heavy industrial injuries across DeSoto, Caddo, and Red River parishes require third-party tort investigation beyond standard workers' compensation.",
    metrics: ["Ochsner LSU Level I Trauma Alignment", "Haynesville Basin Entity Mapping"],
  },
];

export default function ShreveportArkLaTexCorridorMap() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-md bg-white border border-slate-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
            Ark-La-Tex Regional Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Caddo & Bossier Dual-Parish Case Capture
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Shreveport and Bossier City operate as one metro split by the Red River into two separate judicial districts. We build dedicated organic corridors for both parishes plus cross-border I-20 traffic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORRIDOR_CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-neutral-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  {card.tag}
                </span>
                <h3 className="text-lg font-bold text-neutral-950 leading-snug">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-1.5">
                {card.metrics.map((m) => (
                  <div key={m} className="text-xs font-mono text-neutral-900 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    • {m}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
