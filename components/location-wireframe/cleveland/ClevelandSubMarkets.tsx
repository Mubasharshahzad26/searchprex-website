"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Landmark, ArrowRight, Compass, Shield } from "lucide-react";

const SUBURB_LIST = [
  "Downtown",
  "Ohio City",
  "Tremont",
  "University Circle",
  "Lakewood",
  "Parma",
  "Euclid",
  "Beachwood",
  "Westlake",
  "Shaker Heights",
];

const SUBURB_DETAILS = [
  {
    name: "Lakewood",
    countyVenue: "Cuyahoga County · Lakewood Municipal Court",
    intent: "Dense inner-ring west-side suburb with heavy search volume for vehicle accidents, family law disputes, and residential tenancy litigation.",
    searches: ['"family lawyer Lakewood OH"', '"car accident attorney Lakewood"', '"injury lawyer Detroit Ave"'],
    href: "/services/law-firm-seo/family-law",
    linkLabel: "Family law SEO architecture",
  },
  {
    name: "Parma",
    countyVenue: "Cuyahoga County · Parma Municipal Court",
    intent: "Cuyahoga County's largest suburb, anchored by manufacturing and healthcare workers generating continuous workers' comp and collision searches.",
    searches: ['"workers comp lawyer Parma OH"', '"injury attorney Parma Ridge Rd"', '"BWC claim attorney Parma"'],
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal injury SEO architecture",
  },
  {
    name: "Beachwood",
    countyVenue: "Cuyahoga County · Chagrin Valley Corridor",
    intent: "Prestigious east-side commercial and professional hub with high-net-worth estate planning, probate, and business litigation inquiries.",
    searches: ['"estate planning attorney Beachwood"', '"business litigation Beachwood OH"', '"trust lawyer Chagrin Blvd"'],
    href: "/services/law-firm-seo/estate-planning",
    linkLabel: "Estate planning SEO architecture",
  },
  {
    name: "Shaker Heights",
    countyVenue: "Cuyahoga County · Shaker Heights Municipal Court",
    intent: "Established east-side community with sophisticated high-asset divorce, child custody, and family trust administration search intent.",
    searches: ['"divorce lawyer Shaker Heights"', '"probate attorney Shaker Heights"', '"custody lawyer Cuyahoga"'],
    href: "/services/law-firm-seo/family-law",
    linkLabel: "Family law SEO architecture",
  },
  {
    name: "Westlake",
    countyVenue: "Cuyahoga County · Rocky River Municipal Court",
    intent: "Affluent west-side commercial hub along I-90 with demand for corporate formation, commercial contracts, and asset protection counsel.",
    searches: ['"business attorney Westlake OH"', '"wealth protection lawyer Westlake"', '"corporate counsel Crocker Park"'],
    href: "/services/law-firm-seo",
    linkLabel: "Law firm SEO services overview",
  },
  {
    name: "Akron",
    countyVenue: "Summit County · Summit County Common Pleas",
    intent: "A distinct metro market in an adjacent county with independent courthouses, manufacturing clusters, and regional hospital networks.",
    searches: ['"personal injury lawyer Akron OH"', '"workers comp lawyer Akron"', '"car accident attorney Summit County"'],
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Regional Personal injury SEO",
  },
];

export default function ClevelandSubMarkets() {
  const [selectedSuburb, setSelectedSuburb] = useState(0);
  const current = SUBURB_DETAILS[selectedSuburb];

  return (
    <section id="nearby" className="scroll-mt-20 border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Coverage Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            08 · Cleveland coverage
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Built for Cuyahoga County, suburb by suburb
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            A single Downtown Cleveland landing page will not reliably trigger Google's 3-pack or AI search across the suburbs. We architect hyper-localized silos anchored by local courts and municipal jurisdictions.
          </p>
        </div>

        {/* Suburb Badges */}
        <div className="mt-8 flex flex-wrap gap-2">
          {SUBURB_LIST.map((sub) => (
            <span
              key={sub}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs"
            >
              <MapPin className="h-3.5 w-3.5 text-[#534AB7]" />
              <span>{sub}</span>
            </span>
          ))}
        </div>

        {/* Localized Venues Callout */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-xs sm:text-sm text-slate-700 space-y-1">
          <strong className="text-[#0a0f2e] font-bold block mb-1">
            Local Court and Statutory Anchors Embedded in Your Content:
          </strong>
          <p className="leading-relaxed">
            Cuyahoga County Court of Common Pleas · Cleveland Municipal Court · U.S. District Court, Northern District of Ohio · Cleveland Metropolitan Bar Association · Ohio State Bar Association.
          </p>
        </div>

        {/* Detailed Interactive Suburb Hub */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
              Nearby Submarket Intelligence
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] mt-1">
              Law Firm SEO Near Cleveland: Lakewood, Parma, Beachwood & Akron
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Tap a submarket below to inspect the localized intent, county courthouses, and search phrases that capture high-margin cases outside downtown:
            </p>
          </div>

          {/* Suburb selector buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SUBURB_DETAILS.map((sub, idx) => {
              const isSelected = selectedSuburb === idx;
              return (
                <button
                  key={sub.name}
                  onClick={() => setSelectedSuburb(idx)}
                  className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>

          {/* 4-Column detail display card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. County and Venue */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-2">
                County & Courthouses
              </span>
              <h4 className="text-base font-bold text-[#0a0f2e]">
                {current.name}
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {current.countyVenue}
              </p>
            </div>

            {/* 2. Local Intent */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a7d59] block mb-2">
                Search Intent
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {current.intent}
              </p>
            </div>

            {/* 3. Live Searches */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Sample Suburb Queries
              </span>
              {current.searches.map((s, i) => (
                <div key={i} className="text-xs font-mono text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-200">
                  {s}
                </div>
              ))}
            </div>

            {/* 4. Linked Practice Silo */}
            <div className="rounded-3xl border-2 border-[#534AB7] bg-gradient-to-br from-[#EEEDFE]/80 to-white p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-2">
                  Targeted Silo Architecture
                </span>
                <p className="text-sm font-bold text-[#0a0f2e]">
                  Linked Practice Page:
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {current.linkLabel}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#534AB7]/20">
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#534AB7] hover:underline"
                >
                  <span>Explore practice silo</span>
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
