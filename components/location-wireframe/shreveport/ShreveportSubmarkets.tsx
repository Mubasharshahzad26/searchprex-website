'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function ShreveportSubmarkets() {
  const submarkets = [
    {
      name: "Downtown & Riverfront",
      zipCodes: "71101",
      role: "Caddo Parish Legal Core & Government District",
      intent: "1st JDC trial litigation, federal court filings, commercial contracts, and criminal defense.",
    },
    {
      name: "Highland & South Highlands",
      zipCodes: "71104, 71105",
      role: "Historic Residential & High-Asset Professionals",
      intent: "High-net-worth divorce, contested succession, estate planning, and trust litigation.",
    },
    {
      name: "Broadmoor & Anderson Island",
      zipCodes: "71105",
      role: "Established Commercial & Family Neighborhoods",
      intent: "Family law, custody modifications, motor vehicle collisions, and residential succession.",
    },
    {
      name: "Bossier City & East Bank",
      zipCodes: "71111, 71112",
      role: "Bossier Parish Gateway & Commercial District",
      intent: "26th JDC court filings, casino gaming premises liability, and Barksdale AFB military divorce.",
    },
    {
      name: "Southern Hills & Industrial Loop",
      zipCodes: "71118, 71129",
      role: "Logistics Corridor & Manufacturing Hub",
      intent: "Heavy equipment workplace injury, industrial workers' compensation, and forklift accidents.",
    },
    {
      name: "Ark-La-Tex Border Corridor (Greenwood, Minden, Ruston)",
      zipCodes: "71033, 71055, 71270",
      role: "Tri-State Interstate Freight Confluence",
      intent: "I-20 multi-state commercial truck crashes, cross-border jurisdiction, and Texas choice-of-law disputes.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Geographic Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Six Ark-La-Tex Submarkets Engineered for Targeted Client Acquisition
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            High-value legal search in the Shreveport metropolitan area spans across parish lines and state borders. SearchPrex builds hyper-local submarket hubs that capture qualified clients across Caddo, Bossier, and the interstate border corridors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submarkets.map((sm) => (
            <div
              key={sm.name}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  <span>ZIP: {sm.zipCodes}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{sm.name}</h3>
                <p className="text-xs font-semibold text-neutral-950 mb-3">{sm.role}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sm.intent}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Parish Silo Active</span>
                <Link
                  href="/locations/louisiana/shreveport"
                  className="text-xs font-bold text-neutral-950 hover:text-neutral-950 inline-flex items-center gap-1"
                >
                  Explore Silo
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
