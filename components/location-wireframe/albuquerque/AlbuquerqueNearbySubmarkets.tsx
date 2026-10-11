"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight, ShieldCheck, Building2 } from "lucide-react";

export default function AlbuquerqueNearbySubmarkets() {
  const [selectedArea, setSelectedArea] = useState<number>(0);

  const submarkets = [
    {
      name: "Rio Rancho",
      county: "Sandoval County · 13th Judicial District",
      intent: "Fast-growing residential commuter city. Residents actively search for local legal counsel to avoid crossing into downtown Albuquerque.",
      searches: '"family lawyer Rio Rancho NM" · "DWI attorney Rio Rancho" · "divorce lawyer near me"',
      linkHref: "/services/law-firm-seo/family-law",
      linkLabel: "Family Law Practice Silo",
    },
    {
      name: "Santa Fe",
      county: "Santa Fe County · First Judicial District",
      intent: "State capital with affluent state government workforce, art institutions, and high-net-worth marital asset divisions.",
      searches: '"divorce attorney Santa Fe NM" · "estate planning lawyer Santa Fe" · "medical malpractice lawyer"',
      linkHref: "/services/law-firm-seo/family-law",
      linkLabel: "High-Asset Divorce SEO",
    },
    {
      name: "Los Lunas",
      county: "Valencia County · 13th Judicial District",
      intent: "Major industrial and tech logistics hub along the I-25 corridor generating commercial trucking and catastrophic injury claims.",
      searches: '"car accident lawyer Los Lunas" · "DWI attorney Los Lunas NM" · "personal injury attorney"',
      linkHref: "/services/law-firm-seo/personal-injury",
      linkLabel: "Personal Injury SEO",
    },
    {
      name: "Corrales",
      county: "Sandoval County · Rural Affluent Village",
      intent: "Close-knit village along the Rio Grande with equestrian properties, farm water rights, and high-value estate planning needs.",
      searches: '"estate planning attorney Corrales" · "probate lawyer Sandoval County"',
      linkHref: "/services/law-firm-seo/estate-planning",
      linkLabel: "Estate Planning SEO",
    },
    {
      name: "Belen",
      county: "Valencia County · Southern Rail Hub",
      intent: "Rail and transportation center south of Albuquerque with active municipal court and district court litigation dockets.",
      searches: '"car accident lawyer Belen NM" · "criminal defense attorney Belen"',
      linkHref: "/services/law-firm-seo/criminal-defense",
      linkLabel: "Criminal Defense SEO",
    },
    {
      name: "Las Cruces",
      county: "Doña Ana County · Third Judicial District",
      intent: "Second-largest metropolitan area in New Mexico. Strong regional demand for border logistics, Spanish-language defense, and injury counsel.",
      searches: '"abogado de accidentes Las Cruces" · "criminal defense lawyer Las Cruces NM"',
      linkHref: "/services/law-firm-seo/personal-injury",
      linkLabel: "Regional Trial SEO",
    },
  ];

  const current = submarkets[selectedArea];

  return (
    <section id="nearby" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nearby Geographic Submarkets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Law Firm SEO Near Albuquerque: Rio Rancho, Santa Fe, Los Lunas &amp; Las Cruces
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            New Mexico searchers identify intensely with their specific town and county court venue. To capture clients beyond central Bernalillo County, your firm requires dedicated submarket silos configured with localized geographic schema.
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
              Local judicial jurisdiction
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

          {/* Card 4: Linked Practice Silo */}
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
                Deploying a sub-county practice hub captures suburban case retainers before competitors realize the demand exists.
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
