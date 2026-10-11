'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ArrowRight, CheckCircle2, MapPin, Building, ShieldCheck } from 'lucide-react';

export default function WoodlandsVillages() {
  const [activeVillage, setActiveVillage] = useState<number>(0);

  const villages = [
    {
      name: 'Alden Bridge',
      county: 'Montgomery County',
      schools: 'Conroe ISD (The Woodlands HS)',
      intent: 'Established family village. High demand for estate planning, pour-over wills, revocable living trusts, and family law for long-time homeowners.',
      sampleSearches: [
        '"estate planning attorney Alden Bridge"',
        '"family lawyer Alden Bridge TX"',
        '"Alden Bridge living trust lawyer"',
      ],
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO',
    },
    {
      name: 'Sterling Ridge',
      county: 'Montgomery County',
      schools: 'Conroe ISD (The Woodlands HS / College Park)',
      intent: 'Affluent village characterized by luxury estates, executives, and business owners. High-asset divorce, corporate valuation, and asset protection.',
      sampleSearches: [
        '"high asset divorce lawyer Sterling Ridge"',
        '"Sterling Ridge probate attorney"',
        '"executive divorce attorney The Woodlands"',
      ],
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Family Law SEO',
    },
    {
      name: "Cochran's Crossing",
      county: 'Montgomery County',
      schools: 'Conroe ISD (The Woodlands HS)',
      intent: 'Centrally located village home to The Woodlands Country Club. High-volume searches for probate administration, muniment of title, and wealth transfer.',
      sampleSearches: [
        '"probate attorney Cochran\'s Crossing"',
        '"will dispute lawyer The Woodlands"',
        '"Cochran\'s Crossing estate planning"',
      ],
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning & Probate SEO',
    },
    {
      name: 'Panther Creek',
      county: 'Montgomery County',
      schools: 'Conroe ISD (The Woodlands HS)',
      intent: 'Scenic lakeside village along Lake Woodlands. Mature resident demographic seeking elder law, medical powers of attorney, and guardianship counsel.',
      sampleSearches: [
        '"estate lawyer Panther Creek The Woodlands"',
        '"guardianship attorney Montgomery County"',
        '"Panther Creek trust attorney"',
      ],
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Elder Law & Estate SEO',
    },
    {
      name: "Grogan's Mill",
      county: 'Montgomery County',
      schools: 'Conroe ISD',
      intent: "The founding village adjacent to Town Center, The Woodlands Waterway, and I-45. Severe commercial traffic leads to serious auto and pedestrian injury inquiries.",
      sampleSearches: [
        '"personal injury lawyer Grogan\'s Mill"',
        '"Waterway car accident attorney The Woodlands"',
        '"I-45 crash lawyer Woodlands"',
      ],
      linkHref: '/services/law-firm-seo/personal-injury',
      linkText: 'Personal Injury SEO',
    },
    {
      name: 'Creekside Park',
      county: 'Harris County (Houston Courts)',
      schools: 'Tomball ISD',
      intent: 'Located south of Spring Creek in Harris County. Requires dual-county legal knowledge; residents file in downtown Houston, not Conroe.',
      sampleSearches: [
        '"Creekside Park family lawyer"',
        '"Creekside Park estate planning"',
        '"Harris County divorce attorney Creekside"',
      ],
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Harris County Venue SEO',
    },
    {
      name: 'Indian Springs',
      county: 'Montgomery County',
      schools: 'Conroe ISD',
      intent: 'Custom residential enclaves with hilly terrain. Families and entrepreneurs requiring LLC formation, operating agreements, and blended-family trusts.',
      sampleSearches: [
        '"business succession attorney Indian Springs"',
        '"living trust lawyer Indian Springs TX"',
        '"Indian Springs family law"',
      ],
      linkHref: '/services/law-firm-seo',
      linkText: 'Business Law SEO',
    },
    {
      name: 'College Park',
      county: 'Montgomery County',
      schools: 'Conroe ISD (College Park HS) & Lone Star College',
      intent: 'Education and medical corridor along SH 242. College student defense, DWI defense, medical malpractice, and healthcare worker employment issues.',
      sampleSearches: [
        '"student defense attorney College Park Woodlands"',
        '"SH 242 car accident lawyer"',
        '"College Park criminal defense"',
      ],
      linkHref: '/services/law-firm-seo/personal-injury',
      linkText: 'Defense & Injury SEO',
    },
  ];

  const current = villages[activeVillage];

  return (
    <section id="villages" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-slate-50/70 rounded-3xl border border-slate-200/80 my-10">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-3">
          <Home className="w-3.5 h-3.5 text-[#534AB7]" />
          Village-Level Search Silos
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          One Page Per Village: Alden Bridge, Sterling Ridge, Creekside Park & Beyond
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Woodlands residents search by their specific village because identity and school zoning run deep. Google awards page-one rankings to firms that respect these local micro-markets rather than publishing a single generic suburban landing page.
        </p>
      </div>

      {/* Village Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {villages.map((v, idx) => {
          const isActive = activeVillage === idx;
          return (
            <button
              key={v.name}
              onClick={() => setActiveVillage(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                isActive
                  ? 'bg-[#534AB7] text-white border-indigo-600 shadow-md shadow-indigo-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {v.name}
            </button>
          );
        })}
      </div>

      {/* Selected Village Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-2xl font-bold text-slate-900">{current.name} Village</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-[#3C3489]">
                {current.county}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>School Zoning: {current.schools}</span>
            </div>
          </div>

          <Link
            href={current.linkHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#534AB7] hover:bg-[#3C3489] transition-all self-start lg:self-auto"
          >
            <span>{current.linkText} Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Local Legal Search Intent & Resident Demographics:
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{current.intent}</p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                SearchPrex builds dedicated sub-pages for {current.name} embedded with authentic HOA, shopping center (e.g. Village Centers), and park landmarks to dominate local Map Pack geo-grids.
              </span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              High-Converting Village Keyword Targets:
            </h4>
            <div className="space-y-2">
              {current.sampleSearches.map((kw, kwIdx) => (
                <div
                  key={kwIdx}
                  className="px-3.5 py-2 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs font-mono text-[#3C3489] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#534AB7]" />
                  <span>{kw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
