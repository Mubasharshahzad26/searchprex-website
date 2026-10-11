'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, MapPin, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WoodlandsCountyCourts() {
  const [selectedCounty, setSelectedCounty] = useState<number>(0);

  const countyData = [
    {
      id: 'montgomery',
      title: 'Montgomery County: Conroe District Courts',
      tag: '90%+ of The Woodlands',
      badge: 'Primary Jurisdiction',
      desc: 'Most of The Woodlands (Alden Bridge, Sterling Ridge, Cochran’s Crossing, Panther Creek, Grogan’s Mill, Indian Springs, College Park) lies squarely in Montgomery County. Family, civil, and criminal matters are heard at the Montgomery County Courthouse in Conroe.',
      venueDetails: [
        'Courthouse Location: 301 N Main St, Conroe, TX 77301',
        'Filing Rules: Texas Estates Code probate administration, Montgomery County local court rules, and Conroe district standing orders.',
        'Divorce Venue: Governed by Tex. Fam. Code § 6.301 requiring 90-day residency in Montgomery County prior to filing.',
        'Why Generic Houston Copy Fails: Searchers are confused when Houston agencies reference Harris County local standing orders instead of Conroe judges.',
      ],
      sampleSearches: [
        '"Montgomery County divorce lawyer The Woodlands"',
        '"Conroe family court attorney"',
        '"probate lawyer Conroe TX"',
        '"muniment of title Montgomery County"',
      ],
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Explore Family Law SEO Architecture',
    },
    {
      id: 'harris',
      title: 'Harris County: Houston Courts (Creekside Park Exception)',
      tag: 'Creekside Park Village (~10%)',
      badge: 'Special Jurisdictional Carve-Out',
      desc: 'Creekside Park village lies on the south side of Spring Creek in Harris County. Civil suits, family cases, and probate matters originating from Creekside Park are heard in downtown Houston at the Harris County Civil and Family Law Centers.',
      venueDetails: [
        'Courthouse Location: 201 Caroline St & 1115 Congress St, Houston, TX 77002',
        'Filing Rules: Harris County District Courts and local family court administrative guidelines.',
        'Divorce Venue: Requires 90 days residency in Harris County; residents in Creekside Park do NOT file in Conroe.',
        'Strategic Opportunity: Law firms with dedicated Creekside Park practice pages win high-converting dual-county search traffic that mega-firms miss completely.',
      ],
      sampleSearches: [
        '"Creekside Park divorce lawyer"',
        '"Harris County estate planning The Woodlands"',
        '"family lawyer Creekside Park TX"',
        '"Creekside Park car accident attorney"',
      ],
      linkHref: '/locations/texas/katy',
      linkText: 'See Dual-County Venue Architecture in Katy',
    },
  ];

  const current = countyData[selectedCounty];

  return (
    <section id="county-courts" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-4 mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100">
          <Scale className="w-3.5 h-3.5 text-[#534AB7]" />
          Courthouse Jurisdictions & Procedural Silos
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Which Court Hears a Case for Someone Who Lives in The Woodlands?
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          The Woodlands is not an incorporated municipality; it is a master-planned community divided across two distinct counties. When searchers look for an attorney, their legal procedural questions must point to the exact bench hearing their case.
        </p>
      </div>

      {/* Interactive County Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {countyData.map((c, idx) => {
          const isSelected = selectedCounty === idx;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCounty(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-[#534AB7] text-white border-indigo-500 shadow-md shadow-indigo-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MapPin className={`w-4 h-4 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`} />
              <span>{c.title}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isSelected ? 'bg-indigo-700/60 text-indigo-100' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {c.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected County Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Procedural details */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-700">
                {current.badge}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{current.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Verified Texas Estates & Family Code
            </span>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {current.desc}
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Venue & Procedural Signals:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.venueDetails.map((detail, dIdx) => (
                <div
                  key={dIdx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High Intent Searches Targeted */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              High-Converting Search Intent Targeted by SearchPrex:
            </div>
            <div className="flex flex-wrap gap-2">
              {current.sampleSearches.map((s, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-indigo-50/70 text-[#3C3489] border border-indigo-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href={current.linkHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#534AB7] hover:text-[#3C3489] group"
            >
              <span>{current.linkText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side: Map & Jurisdiction Boundary Graphic */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#10194a] text-white p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-indigo-300" />
              <h4 className="font-bold text-base text-white">Jurisdictional Boundary Map</h4>
            </div>

            {/* SVG Visualizing Montgomery & Harris split */}
            <div className="w-full h-48 rounded-xl bg-slate-800/80 border border-indigo-900/50 p-2 relative overflow-hidden mb-4 flex items-center justify-center">
              <svg viewBox="0 0 260 160" className="w-full h-full">
                {/* Montgomery County Region (Top 75%) */}
                <rect
                  x="10"
                  y="10"
                  width="240"
                  height="100"
                  rx="8"
                  className={selectedCounty === 0 ? 'fill-indigo-600/40 stroke-indigo-400 stroke-2' : 'fill-slate-800 stroke-slate-700 stroke-1'}
                />
                <text x="30" y="35" className="fill-white text-[11px] font-bold">
                  Montgomery County (90%)
                </text>
                <text x="30" y="52" className="fill-slate-300 text-[9px]">
                  Courthouse: Conroe, TX
                </text>
                <text x="30" y="68" className="fill-indigo-200 text-[8px]">
                  Alden Bridge, Sterling Ridge, Panther Creek
                </text>

                {/* Spring Creek Dividing Line */}
                <line x1="10" y1="110" x2="250" y2="110" stroke="#818cf8" strokeDasharray="3 3" strokeWidth="1.5" />
                <text x="170" y="106" className="fill-indigo-300 text-[8px] font-medium">
                  Spring Creek
                </text>

                {/* Harris County Region (Bottom 25%) */}
                <rect
                  x="10"
                  y="114"
                  width="240"
                  height="36"
                  rx="6"
                  className={selectedCounty === 1 ? 'fill-emerald-600/40 stroke-emerald-400 stroke-2' : 'fill-slate-800 stroke-slate-700 stroke-1'}
                />
                <text x="30" y="132" className="fill-white text-[10px] font-bold">
                  Harris County (~10%)
                </text>
                <text x="30" y="144" className="fill-slate-300 text-[8px]">
                  Creekside Park Village • Houston Courts
                </text>
              </svg>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Google algorithms reward law firms that publish distinct pages for both jurisdictions. SearchPrex prevents venue confusion by mapping clients directly to their governing courthouse.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tex. Fam. Code § 6.301</span>
            <span className="text-emerald-400 font-medium">Verified Texas Protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
}
