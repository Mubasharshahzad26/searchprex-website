"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight, ShieldCheck, Building2 } from "lucide-react";

export default function DentonNearbySubmarkets() {
  const [selectedArea, setSelectedArea] = useState<number>(0);

  const submarkets = [
    {
      name: "Lewisville",
      county: "Denton County · Southern Commercial Hub",
      intent: "Major employment and retail city along I-35E with heavy commercial trucking collision, family law, and criminal defense search volume.",
      searches: '"DWI lawyer Lewisville TX" · "car accident lawyer Lewisville" · "divorce attorney"',
      linkHref: "/services/law-firm-seo/criminal-defense",
      linkLabel: "Criminal Defense Practice Silo",
    },
    {
      name: "Flower Mound",
      county: "Denton County · Master-Planned Community",
      intent: "Affluent master-planned suburb generating high-net-worth divorce, complex estate planning, and child custody litigation retainers.",
      searches: '"family law attorney Flower Mound" · "estate planning lawyer Flower Mound TX"',
      linkHref: "/services/law-firm-seo/family-law",
      linkLabel: "Family Law & Divorce Silo",
    },
    {
      name: "Frisco (Denton Side)",
      county: "Denton & Collin County Border Hub",
      intent: "Rapidly exploding population where the county line dictates whether filings go to Denton County or Collin County district courts in McKinney.",
      searches: '"divorce lawyer Frisco TX" · "child custody lawyer Frisco Denton County"',
      linkHref: "/services/law-firm-seo/family-law",
      linkLabel: "Border County Silo Strategy",
    },
    {
      name: "Little Elm",
      county: "Denton County · Lakefront Growth Corridor",
      intent: "High-density young family relocation market along Lewisville Lake with continuous child support, custody, and misdemeanor representation demand.",
      searches: '"child custody attorney Little Elm" · "DWI lawyer Little Elm TX"',
      linkHref: "/services/law-firm-seo/family-law",
      linkLabel: "Custody & Family Law SEO",
    },
    {
      name: "Corinth",
      county: "Denton County · Direct Commuter Suburb",
      intent: "Adjacent suburban community south of Denton along I-35E with distinct local resident searches for personal injury and estate guidance.",
      searches: '"car accident lawyer Corinth TX" · "probate attorney Corinth"',
      linkHref: "/services/law-firm-seo/car-accident",
      linkLabel: "Motor Vehicle Accident Silo",
    },
    {
      name: "The Colony",
      county: "Denton & Collin Counties · SH 121 Corridor",
      intent: "Entertainment and retail growth center where clients require attorneys familiar with Denton County criminal court scheduling.",
      searches: '"personal injury attorney The Colony" · "criminal defense lawyer The Colony TX"',
      linkHref: "/services/law-firm-seo/personal-injury",
      linkLabel: "Personal Injury Practice Silo",
    },
  ];

  const current = submarkets[selectedArea];

  return (
    <section id="nearby" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Submarket Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Law Firm SEO Near Denton: Lewisville, Flower Mound, Frisco &amp; Little Elm
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Denton County clients search by their specific city and municipality. Furthermore, cities like Frisco and The Colony straddle county lines where venue selection is critical. Dedicated suburban silos capture clients where generic Denton pages fail.
          </p>
        </div>

        {/* Submarket Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {submarkets.map((sub, idx) => {
            const isActive = selectedArea === idx;
            return (
              <button
                key={sub.name}
                onClick={() => setSelectedArea(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  isActive
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>

        {/* 4 Detail Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: County & Venue */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                County &amp; Venue
              </div>
              <h3 className="text-base font-extrabold text-[#0a0f2e]">
                {current.county}
              </h3>
            </div>
            <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500 mt-4">
              Local court jurisdiction
            </div>
          </div>

          {/* Card 2: Local Intent */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Local Search Intent
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.intent}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500 mt-4">
              Searcher demographic profile
            </div>
          </div>

          {/* Card 3: Top Targeted Searches */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Targeted Queries
              </div>
              <p className="text-xs sm:text-sm font-bold font-mono text-slate-800 leading-relaxed">
                {current.searches}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500 mt-4">
              High commercial intent
            </div>
          </div>

          {/* Card 4: Recommended Silo */}
          <div className="p-6 rounded-2xl bg-[#0a0f2e] text-white border border-[#3C3489] shadow-md flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#EEEDFE] mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Recommended Silo</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                {current.linkLabel}
              </h4>
              <p className="text-xs text-slate-300">
                Deploying a localized hub captures suburban case retainers before Dallas-Fort Worth mega-firms react.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4">
              <Link
                href={current.linkHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EEEDFE] hover:underline"
              >
                <span>View Practice Methodology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
