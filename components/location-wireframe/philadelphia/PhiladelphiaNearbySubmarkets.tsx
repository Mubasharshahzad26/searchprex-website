"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Building, Landmark, Compass } from "lucide-react";

const SUBURB_LIST = [
  {
    name: "Upper Darby",
    county: "Delaware County · Courts in Media, PA",
    intent: "Dense, populated western border suburb with high search volume for motor vehicle crashes, workers' compensation, and municipal disputes.",
    searches: ['"car accident lawyer Upper Darby"', '"personal injury attorney 69th St"', '"workers comp lawyer Delco"'],
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal Injury SEO Architecture",
  },
  {
    name: "King of Prussia",
    county: "Montgomery County · Courts in Norristown, PA",
    intent: "Major corporate, retail, and healthcare corridor along I-76 generating commercial litigation, employment disputes, and high-net-worth estate matters.",
    searches: ['"business attorney King of Prussia"', '"corporate litigation Norristown"', '"estate planning lawyer KOP"'],
    href: "/services/law-firm-seo",
    linkLabel: "Commercial Litigation & Practice SEO",
  },
  {
    name: "Bensalem",
    county: "Bucks County · Courts in Doylestown, PA",
    intent: "Key northeastern transportation crossroads generating constant highway collision (I-95 and PA Turnpike), workers' comp, and criminal defense searches.",
    searches: ['"DUI lawyer Bensalem PA"', '"truck accident lawyer Bucks County"', '"criminal defense attorney Bensalem"'],
    href: "/services/law-firm-seo/criminal-defense",
    linkLabel: "Criminal Defense & DUI SEO",
  },
  {
    name: "Conshohocken",
    county: "Montgomery County · Schuylkill River Valley",
    intent: "Professional-services, finance, and biotech hub with high demand for executive severance, family law, and trust administration.",
    searches: ['"estate planning lawyer Conshohocken"', '"divorce attorney Montgomery County"', '"employment lawyer Conshohocken"'],
    href: "/services/law-firm-seo/estate-planning",
    linkLabel: "Estate & Family Practice SEO",
  },
  {
    name: "Chester",
    county: "Delaware County · Waterfront Industrial Corridor",
    intent: "Separate manufacturing and logistics enclave producing consistent workplace injury, heavy machinery claims, and civil rights disputes.",
    searches: ['"workers comp attorney Chester PA"', '"industrial accident lawyer Delco"', '"injury lawyer Chester PA"'],
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Workers' Comp & Injury SEO",
  },
  {
    name: "Cherry Hill, NJ",
    county: "Camden County, NJ · South Jersey Cross-River",
    intent: "High-volume cross-river commuters needing dual-licensed Pennsylvania and New Jersey attorneys for cross-border transit crashes.",
    searches: ['"dual licensed PA NJ accident lawyer"', '"personal injury lawyer near Philadelphia NJ"', '"cross border injury attorney"'],
    href: "/services/law-firm-seo",
    linkLabel: "Cross-Jurisdiction Law Firm SEO",
  },
];

export default function PhiladelphiaNearbySubmarkets() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SUBURB_LIST[selectedIdx];

  return (
    <section id="nearby" className="scroll-mt-20 border-b border-slate-200 bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Compass className="h-4 w-4" />
            <span>Regional Tri-County Expansion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Law Firm SEO Near Philadelphia: Upper Darby, King of Prussia, Bensalem & Conshohocken
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Philadelphia clients reside across three suburban counties (Delaware, Montgomery, and Bucks), each possessing its own independent courthouse and jury dynamics. Tap a submarket below to inspect the localized intent and court venues:
          </p>
        </div>

        {/* Suburb Selector Chips */}
        <div className="mt-10 flex flex-wrap gap-2.5 mb-8">
          {SUBURB_LIST.map((sub, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={sub.name}
                onClick={() => setSelectedIdx(idx)}
                className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-md shadow-sm scale-102"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* 4-Column Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. County and Venue */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
              County & Court Venue
            </span>
            <h4 className="text-base font-bold text-neutral-950">
              {current.name}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {current.county}
            </p>
          </div>

          {/* 2. Local Intent */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
              Search Intent Profile
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">
              {current.intent}
            </p>
          </div>

          {/* 3. Sample Searches */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Sample Submarket Queries
            </span>
            <div className="space-y-1.5 pt-1">
              {current.searches.map((s, i) => (
                <div key={i} className="text-xs font-mono text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Linked Practice Silo */}
          <div className="rounded-3xl border-2 border-neutral-900 bg-gradient-to-br from-slate-50 via-white to-white p-6 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                Target Silo Architecture
              </span>
              <p className="text-sm font-bold text-neutral-950">
                Connected Practice Hub:
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {current.linkLabel}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-300">
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-neutral-900 hover:underline"
              >
                <span>Explore Practice Silo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
