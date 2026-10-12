"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight, Compass, Search } from "lucide-react";

const STOPS = [
  {
    name: "Center City",
    intent: "Courthouse-adjacent, urgent, mobile 'near me' searches for personal injury, commercial disputes, and criminal defense.",
    whatWeBuild: "Center City court practice cluster tied directly to the Philadelphia Court of Common Pleas (City Hall), backed by tuned GBP local signals.",
    searches: ['"personal injury lawyer Center City"', '"DUI attorney near City Hall Philadelphia"', '"business litigation lawyer Center City"'],
    siloHref: "/services/law-firm-seo/personal-injury",
    siloLabel: "Personal Injury & Litigation SEO",
  },
  {
    name: "South Philly",
    intent: "Tight-knit, multi-generational community that rigorously verifies local reviews and community reputation before calling.",
    whatWeBuild: "South Philadelphia neighborhood hub featuring automated local review acquisition and regional community citation anchors.",
    searches: ['"car accident lawyer South Philadelphia"', '"slip and fall attorney Passyunk"', '"probate lawyer South Philly"'],
    siloHref: "/services/law-firm-seo/personal-injury",
    siloLabel: "Community Law Practice SEO",
  },
  {
    name: "Northeast Philly",
    intent: "Expansive residential district generating heavy search volume for workers' comp claims, family disputes, and auto collisions.",
    whatWeBuild: "Northeast Philadelphia practice silo cluster mapped to Roosevelt Boulevard corridor incident searches and family court FAQs.",
    searches: ['"workers comp attorney Northeast Philly"', '"custody lawyer Northeast Philadelphia"', '"Roosevelt Blvd crash attorney"'],
    siloHref: "/services/law-firm-seo/family-law",
    siloLabel: "Family Law & Injury SEO",
  },
  {
    name: "Fishtown",
    intent: "Rapidly growing creative and tech sector with inquiries regarding landlord-tenant disputes, employment agreements, and motor vehicle crashes.",
    whatWeBuild: "Fishtown and Kensington commercial landing pages supported by local tech and business directory profile citations.",
    searches: ['"employment lawyer Fishtown"', '"tenant rights attorney Fishtown OH"', '"motorcycle accident lawyer Frankford Ave"'],
    siloHref: "/services/law-firm-seo",
    siloLabel: "Employment & Civil Litigation SEO",
  },
  {
    name: "University City",
    intent: "Major academic and medical research hub (Penn, CHOP, Drexel) driving complex medical malpractice, healthcare employment, and IP claims.",
    whatWeBuild: "High-authority University City hospital corridor silo emphasizing medical negligence and institutional employment law.",
    searches: ['"medical malpractice attorney University City"', '"hospital negligence lawyer Philadelphia"', '"physician contract attorney Philly"'],
    siloHref: "/services/law-firm-seo/personal-injury",
    siloLabel: "Medical Malpractice SEO",
  },
  {
    name: "Manayunk",
    intent: "Distinct regional queries in northwestern Philadelphia that out-of-state competitors completely overlook.",
    whatWeBuild: "Manayunk, Roxborough, and East Falls neighborhood pages with authentic local community landmarks and court venue routing.",
    searches: ['"family law attorney Manayunk"', '"estate planning lawyer Roxborough"', '"criminal defense lawyer Main St Manayunk"'],
    siloHref: "/services/law-firm-seo/estate-planning",
    siloLabel: "Estate & Family Practice SEO",
  },
  {
    name: "Delaware Co. / Suburbs",
    intent: "Suburban commuters in Media, Upper Darby, and Delco who work and suffer injuries in Philadelphia and cross court boundaries.",
    whatWeBuild: "Suburban bridge pages that link county searchers to Philadelphia venues and Media/Montgomery County courthouses where appropriate.",
    searches: ['"personal injury lawyer Delaware County PA"', '"workers comp attorney Media PA"', '"car crash lawyer Upper Darby"'],
    siloHref: "/services/law-firm-seo/personal-injury",
    siloLabel: "Regional County Cross-Venue SEO",
  },
];

export default function PhiladelphiaNeighborhoodRoute() {
  const [activeStop, setActiveStop] = useState(0);
  const current = STOPS[activeStop];

  return (
    <section id="neighborhood-route" className="border-b border-slate-200 bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Compass className="h-4 w-4" />
            <span>Hyper-Local Geographic Silos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Every Neighborhood Is a Stop: Most Law Firms Skip All of Them
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Google's local algorithm treats Center City, South Philly, and Northeast Philadelphia as distinct geo-markets. Tap a stop below to inspect the localized intent and the exact silo SearchPrex constructs for it.
          </p>
        </div>

        {/* Interactive Route Timeline / Selector */}
        <div className="mt-10 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          {/* Progress Route Line */}
          <div className="relative mb-8 hidden md:block">
            <div className="h-2 w-full bg-slate-200 rounded-full" />
            <div
              className="absolute top-0 h-2 bg-neutral-900 rounded-full transition-all duration-300"
              style={{ width: `${((activeStop + 1) / STOPS.length) * 100}%` }}
            />
            <div className="absolute -top-3.5 flex w-full justify-between">
              {STOPS.map((st, idx) => (
                <button
                  key={st.name}
                  onClick={() => setActiveStop(idx)}
                  className={`flex flex-col items-center group cursor-pointer transition-transform hover:scale-110`}
                >
                  <div
                    className={`h-9 w-9 rounded-full border-4 flex items-center justify-center transition-all ${
                      idx <= activeStop
                        ? "border-white bg-neutral-900 text-white shadow-md shadow-sm"
                        : "border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    <span className="text-[11px] font-bold">{idx + 1}</span>
                  </div>
                  <span
                    className={`text-xs mt-2 font-bold transition-colors ${
                      idx === activeStop ? "text-neutral-900" : "text-slate-500 group-hover:text-slate-800"
                    }`}
                  >
                    {st.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile chips */}
          <div className="flex flex-wrap gap-2 md:hidden mb-6">
            {STOPS.map((st, idx) => (
              <button
                key={st.name}
                onClick={() => setActiveStop(idx)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeStop === idx
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>

          {/* 3-Column Stop Detail Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            
            {/* Column 1: Local Search Intent */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Local Search Intent
              </span>
              <h4 className="text-lg font-extrabold text-neutral-950">
                {current.name} Client Demand
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {current.intent}
              </p>
            </div>

            {/* Column 2: What SearchPrex Builds */}
            <div className="rounded-2xl border border-slate-100 bg-slate-100 p-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Architecture Deliverable
              </span>
              <h4 className="text-lg font-extrabold text-neutral-950">
                What We Build for Your Firm
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {current.whatWeBuild}
              </p>
            </div>

            {/* Column 3: Example Searches & Practice Silo Link */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
                  Target Search Queries
                </span>
                <h4 className="text-lg font-extrabold text-neutral-950">
                  High-Converting Inquiries
                </h4>
                <div className="space-y-1.5 mt-2">
                  {current.searches.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-mono text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200"
                    >
                      <Search className="h-3 w-3 text-neutral-900 shrink-0" />
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={current.siloHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
                >
                  <span>{current.siloLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
