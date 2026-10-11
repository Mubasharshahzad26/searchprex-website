"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Landmark, Search } from "lucide-react";

export default function SugarLandNearbySubmarkets() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const submarkets = [
    {
      name: "Missouri City",
      county: "Fort Bend & Harris Counties",
      intent: "Major residential suburb where your client's exact home address decides whether a case is filed in Richmond or downtown Houston.",
      searches: '"family lawyer Missouri City TX", "divorce attorney Missouri City"',
      href: "/services/law-firm-seo/family-law",
      linkText: "Family Law & Divorce SEO",
    },
    {
      name: "Stafford",
      county: "Fort Bend & Harris Counties",
      intent: "Commercial and retail center along US-90A with high commercial traffic, small business disputes, and vehicle crash claims.",
      searches: '"personal injury lawyer Stafford TX", "business attorney Stafford"',
      href: "/services/law-firm-seo/personal-injury",
      linkText: "Personal Injury & Accident SEO",
    },
    {
      name: "Richmond",
      county: "Fort Bend County Seat",
      intent: "The judicial heart of the county. High commercial intent for filings at the Fort Bend County Justice Center across from historic Richmond.",
      searches: '"divorce attorney Richmond TX", "Fort Bend County court lawyer"',
      href: "/services/law-firm-seo/family-law",
      linkText: "Richmond Court Venue SEO",
    },
    {
      name: "Rosenberg",
      county: "Fort Bend County",
      intent: "Rapidly expanding historic rail and manufacturing hub with active municipal and criminal court dockets.",
      searches: '"criminal defense attorney Rosenberg TX", "DWI lawyer Rosenberg"',
      href: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense & DWI SEO",
    },
    {
      name: "Fulshear",
      county: "Fort Bend County",
      intent: "One of Texas's wealthiest, fastest-growing suburbs. Exceptional commercial intent for trusts, wills, and executive family law.",
      searches: '"estate planning Fulshear TX", "family lawyer Fulshear"',
      href: "/services/law-firm-seo/estate-planning",
      linkText: "Estate Planning & Wealth SEO",
    },
    {
      name: "Pearland",
      county: "Brazoria, Fort Bend & Harris Counties",
      intent: "Large suburban center spanning three county lines, creating complex jurisdictional and business formation queries.",
      searches: '"business attorney Pearland TX", "commercial contract lawyer Pearland"',
      href: "/services/law-firm-seo",
      linkText: "Business Law & Entity SEO",
    },
  ];

  const active = submarkets[selectedIdx];

  return (
    <section id="nearby" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Fort Bend Regional Expansion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Law Firm SEO Near Sugar Land: Missouri City, Stafford, Richmond and Beyond
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            <strong>Fort Bend County residents search by their specific municipality.</strong> Richmond is the county seat housing all district courts, while Missouri City and Stafford straddle county lines where filing venue can dictate outcome. We build dedicated submarket hubs for every jurisdiction you serve.
          </p>
        </div>

        {/* Submarket Selector Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {submarkets.map((s, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        {/* Submarket Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5" />
                <span>{active.county}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight">
                {active.name} Legal Search Dynamics
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {active.intent}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#534AB7]" />
                  <span>Targeted Local Search Queries:</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 font-mono">
                  {active.searches}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-1 text-left lg:text-right">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Target Practice Hub
                </div>
                <div className="font-extrabold text-lg text-[#0a0f2e]">
                  {active.linkText}
                </div>
              </div>

              <Link
                href={active.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-sm shadow-sm transition-all"
              >
                <span>View Strategy Framework</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
