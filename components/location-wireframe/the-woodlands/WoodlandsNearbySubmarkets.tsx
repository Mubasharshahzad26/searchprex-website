'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export default function WoodlandsNearbySubmarkets() {
  const [activeMarket, setActiveMarket] = useState<number>(0);

  const submarkets = [
    {
      name: 'Conroe',
      county: 'Montgomery County Seat',
      venue: 'Montgomery County District & County Courts (Main St, Conroe)',
      intent: 'Substantial local search volume tied to the courthouse. Heavy demand for probate administration, contested wills, family law, and felony criminal defense.',
      sampleSearches: '"probate lawyer Conroe TX", "family law attorney Conroe", "car accident lawyer Conroe TX"',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO',
    },
    {
      name: 'Spring',
      county: 'Harris & Montgomery Border',
      venue: 'Harris County Courts (Downtown Houston) / Montgomery Court (Conroe)',
      intent: 'High-density commuter suburb south of The Woodlands. Family law and personal injury searches dominate along the Grand Parkway (SH 99) and I-45 corridors.',
      sampleSearches: '"family lawyer Spring TX", "divorce attorney Spring Texas", "Spring car crash attorney"',
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Family Law SEO',
    },
    {
      name: 'Shenandoah',
      county: 'Montgomery County',
      venue: 'Montgomery County Courts (Conroe)',
      intent: 'Commercial and healthcare nucleus adjoining The Woodlands Town Center. High volume of business litigation, commercial leases, and executive employment disputes.',
      sampleSearches: '"business attorney Shenandoah TX", "estate planning Shenandoah", "commercial dispute lawyer"',
      linkHref: '/services/law-firm-seo',
      linkText: 'Law Firm SEO Services',
    },
    {
      name: 'Oak Ridge North',
      county: 'Montgomery County',
      venue: 'Montgomery County Courts (Conroe)',
      intent: 'Established suburban community east of I-45. Strong demand for wills, trusts, elder law, and domestic relations.',
      sampleSearches: '"estate planning lawyer Oak Ridge North", "divorce attorney Oak Ridge North TX"',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO',
    },
    {
      name: 'Tomball',
      county: 'Harris & Montgomery Counties',
      venue: 'Harris County Courts (Downtown Houston) / Montgomery (Conroe)',
      intent: 'Booming western corridor with historic town center. High growth leads to family law, probate, and SH 249 commercial truck collision inquiries.',
      sampleSearches: '"family lawyer Tomball TX", "injury attorney Tomball", "probate lawyer Tomball TX"',
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Family Law SEO',
    },
    {
      name: 'Magnolia',
      county: 'Montgomery County',
      venue: 'Montgomery County Courts (Conroe)',
      intent: 'Rapidly expanding western master-planned enclaves. Young executive families searching for trust creation, wills, and guardian designation.',
      sampleSearches: '"estate planning Magnolia TX", "Magnolia divorce lawyer", "living trust attorney Magnolia"',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO',
    },
    {
      name: 'Kingwood',
      county: 'Harris & Montgomery (Livable Forest)',
      venue: 'Harris County Courts (Downtown Houston)',
      intent: 'Established master-planned enclave in northeast Houston. Generational wealth planning, high-asset divorce, and trust administration.',
      sampleSearches: '"divorce attorney Kingwood TX", "probate lawyer Kingwood", "estate attorney Kingwood TX"',
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Family Law SEO',
    },
    {
      name: 'Willis',
      county: 'Montgomery County',
      venue: 'Montgomery County Courts (Conroe)',
      intent: 'Northern Montgomery County market near Lake Conroe. Frequent commuter injury inquiries along the I-45 freight corridor.',
      sampleSearches: '"car accident lawyer Willis TX", "Willis probate attorney", "truck crash lawyer I-45 Willis"',
      linkHref: '/services/law-firm-seo/car-accident',
      linkText: 'Car Accident Law Firm SEO',
    },
  ];

  const current = submarkets[activeMarket];

  return (
    <section id="nearby" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#534AB7]" />
          Regional Suburban Geo-Grid Hubs
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Law Firm SEO Near The Woodlands: Conroe, Spring, Shenandoah & Beyond
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Woodlands-area clients also search for Conroe, Spring, Shenandoah, Oak Ridge North, Tomball, Magnolia, Kingwood, and Willis. Google treats these as separate local searches with distinct court jurisdictions. SearchPrex builds dedicated regional hubs to capture cases across the entire northern Houston corridor.
        </p>
      </div>

      {/* Submarket Selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {submarkets.map((sm, idx) => {
          const isActive = activeMarket === idx;
          return (
            <button
              key={sm.name}
              onClick={() => setActiveMarket(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                isActive
                  ? 'bg-[#534AB7] text-white border-indigo-600 shadow-md shadow-indigo-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {sm.name}
            </button>
          );
        })}
      </div>

      {/* Active Submarket Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-slate-900">{current.name}, Texas</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                {current.county}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Governing Venue: {current.venue}</span>
            </div>
          </div>

          <Link
            href={current.linkHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#534AB7] hover:bg-[#3C3489] transition-all self-start lg:self-auto"
          >
            <span>{current.linkText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Submarket Search Intent & Court Realities:
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{current.intent}</p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                SearchPrex structures your site architecture so your Woodlands location ranks across {current.name} without creating duplicate doorway content.
              </span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              High-Value Queries Captured:
            </h4>
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
              <div className="text-xs font-mono text-[#3C3489] leading-relaxed">
                {current.sampleSearches}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 italic">
              Targeted with local municipal schema and verified citation signals.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
