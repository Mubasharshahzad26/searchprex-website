"use client";

import React from "react";
import Link from "next/link";
import { Navigation, AlertTriangle, ArrowRight, ShieldCheck, Car, Truck } from "lucide-react";

export default function KatyHighwayCorridors() {
  const corridors = [
    {
      name: "I-10 · Katy Freeway",
      icon: Truck,
      subtitle: "Major Interstate Freight & Commuter Artery",
      desc: "One of the widest freeways in the world, carrying intense commercial 18-wheeler freight traffic between Houston and San Antonio alongside tens of thousands of daily commuters. Severe multi-vehicle collisions frequently lead to high-value commercial liability and catastrophic injury claims.",
      query: '"truck accident lawyer I-10 Katy", "Katy Freeway 18 wheeler attorney"',
      href: "/services/law-firm-seo/car-accident",
      color: "border-[#1a7d59] bg-[#1a7d59]/5",
      badge: "bg-[#1a7d59] text-white",
    },
    {
      name: "SH 99 · Grand Parkway",
      icon: Navigation,
      subtitle: "Regional High-Speed Outer Loop Corridor",
      desc: "The critical circumferential highway connecting Katy directly with Cypress to the north and Sugar Land to the south. High-speed merges and constant ongoing construction produce frequent intersection T-bone and rollover wrecks.",
      query: '"Grand Parkway crash attorney Katy", "SH 99 accident lawyer Katy"',
      href: "/services/law-firm-seo/car-accident",
      color: "border-[#534AB7] bg-[#534AB7]/5",
      badge: "bg-[#534AB7] text-white",
    },
    {
      name: "Westpark Tollway",
      icon: Car,
      subtitle: "Direct Cinco Ranch & Fort Bend Commuter Route",
      desc: "The primary high-speed commuter artery linking Cinco Ranch, Grand Lakes, and southern Katy directly into the Houston Galleria and Midtown. Rush-hour rear-end and express lane collisions generate urgent, high-intent searches.",
      query: '"Westpark Tollway accident lawyer", "tollway crash lawyer Katy TX"',
      href: "/services/law-firm-seo/personal-injury",
      color: "border-[#3C3489] bg-[#3C3489]/5",
      badge: "bg-[#3C3489] text-white",
    },
  ];

  return (
    <section id="corridors" className="py-20 bg-slate-900 text-white border-b border-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/20">
            <Navigation className="w-3.5 h-3.5" />
            <span>High-Intent Transit Corridors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            I-10, Grand Parkway &amp; Westpark Tollway: High-Stakes Injury Searches
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            When serious collisions happen on Greater Katy freeways, victims and their families don&apos;t just search for generic terms—they search for the exact highway where the crash occurred. We architect accident corridor hubs backed by TxDOT crash data.
          </p>
        </div>

        {/* 3 Corridor Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {corridors.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-7 sm:p-8 flex flex-col justify-between hover:border-slate-500 transition-all space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${c.badge}`}>
                      Corridor #{idx + 1}
                    </span>
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {c.name}
                  </h3>

                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {c.subtitle}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {c.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Target Search Queries:
                    </div>
                    <div className="text-xs font-semibold text-emerald-300 font-mono">
                      {c.query}
                    </div>
                  </div>

                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-emerald-300 hover:underline transition-colors"
                  >
                    <span>View Injury SEO Framework</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
