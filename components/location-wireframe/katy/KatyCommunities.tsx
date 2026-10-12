"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Home, Users, Search, CheckCircle2 } from "lucide-react";

export default function KatyCommunities() {
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to Cinco Ranch

  const communities = [
    {
      name: "Cinco Ranch",
      county: "Fort Bend County",
      intent: "Affluent master-planned development with over 18,000 homes. Primary legal demand centers on high-asset divorce, complex child custody, and estate administration.",
      query: '"divorce attorney Cinco Ranch", "family lawyer Cinco Ranch TX", "estate planning Cinco Ranch"',
      practiceHref: "/services/law-firm-seo/family-law",
      practiceLabel: "Family Law & Divorce SEO",
      highlight: "High net-worth households ($140k+ avg income)",
    },
    {
      name: "Old Town Katy",
      county: "Harris / Waller Counties",
      intent: "The historic heritage center of Katy. High search frequency for small business contracts, commercial property disputes, municipal hearings, and local estate probate.",
      query: '"family lawyer Old Town Katy", "small business attorney Katy", "probate lawyer Old Town Katy"',
      practiceHref: "/services/law-firm-seo",
      practiceLabel: "Law Firm SEO Services",
      highlight: "Historic retail & small business district",
    },
    {
      name: "Cross Creek Ranch",
      county: "Fort Bend County",
      intent: "Rapidly expanding master-planned neighborhood attracting young executive families. Strong intent for wills, guardianship designations, and revocable living trusts.",
      query: '"wills and trusts Cross Creek Ranch", "estate planning Cross Creek Katy"',
      practiceHref: "/services/law-firm-seo/estate-planning",
      practiceLabel: "Estate Planning & Probate SEO",
      highlight: "High concentration of growing young families",
    },
    {
      name: "Firethorne",
      county: "Fort Bend County",
      intent: "Established residential enclave along FM 1463 with high vehicle commute rates along I-10. High volume of family law modifications and commuter traffic collision searches.",
      query: '"family lawyer Firethorne Katy", "child custody attorney Firethorne", "car accident lawyer Firethorne"',
      practiceHref: "/services/law-firm-seo/family-law",
      practiceLabel: "Family Law & Child Custody SEO",
      highlight: "Commuter families along FM 1463",
    },
    {
      name: "Seven Meadows",
      county: "Fort Bend County",
      intent: "Suburban golf-course community positioned near the Grand Parkway. Strong commercial intent for highway collision representation and marital property agreements.",
      query: '"car accident lawyer Seven Meadows Katy", "divorce lawyer Seven Meadows"',
      practiceHref: "/services/law-firm-seo/car-accident",
      practiceLabel: "Car Accident Law Firm SEO",
      highlight: "Direct proximity to SH 99 Grand Parkway",
    },
    {
      name: "Grand Lakes",
      county: "Fort Bend County",
      intent: "Established luxury community with mature homeowner demographics. Consistent demand for elder law, asset protection, and formal probate litigation.",
      query: '"estate planning Grand Lakes Katy", "probate attorney Grand Lakes"',
      practiceHref: "/services/law-firm-seo/estate-planning",
      practiceLabel: "Estate Planning & Asset Protection SEO",
      highlight: "Mature homeowners & legacy estates",
    },
    {
      name: "Fulshear",
      county: "Fort Bend County",
      intent: "One of the fastest-growing municipalities in Texas, searched completely independently from Katy. Requires a dedicated submarket hub to rank for local municipal queries.",
      query: '"family lawyer Fulshear TX", "estate planning attorney Fulshear", "car crash lawyer Fulshear"',
      practiceHref: "/services/law-firm-seo/family-law",
      practiceLabel: "Family Law & Submarket SEO",
      highlight: "Fastest-growing Texas submarket",
    },
    {
      name: "Brookshire",
      county: "Waller County",
      intent: "The western industrial and agricultural corridor of Greater Katy along I-10. High-stakes searches for commercial 18-wheeler accidents, distribution center injuries, and Waller district court matters.",
      query: '"accident lawyer Brookshire TX", "truck accident attorney Brookshire", "Waller County injury lawyer"',
      practiceHref: "/services/law-firm-seo/personal-injury",
      practiceLabel: "Personal Injury & Truck Accident SEO",
      highlight: "Major freight & logistics distribution corridor",
    },
  ];

  const active = communities[selectedIdx];

  return (
    <section id="communities" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Master-Planned Community Silos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            One Page per Community: Cinco Ranch, Fulshear, Brookshire and More
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            <strong>Katy residents identify strongly with their specific neighborhood or master-planned enclave.</strong> When a Cinco Ranch resident searches for an estate planning or divorce attorney, Google prioritizes pages with verified local community signals over generic Houston-wide sites. Select a community below to inspect the search intent.
          </p>
        </div>

        {/* Community Pills */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {communities.map((c, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Selected Community Detail Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider">
                  {active.county}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {active.highlight}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {active.name} Practice Hub Strategy
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {active.intent}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Targeted Local Search Queries:</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 font-mono">
                  {active.query}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-1 text-left lg:text-right">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Core Practice Silo
                </div>
                <div className="font-extrabold text-lg text-neutral-950">
                  {active.practiceLabel}
                </div>
              </div>

              <Link
                href={active.practiceHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-sm transition-all"
              >
                <span>View Practice Framework</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
