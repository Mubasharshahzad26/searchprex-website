'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function BatonRougeSubmarkets() {
  const submarkets = [
    {
      name: "Downtown & Riverfront",
      zipCodes: "70801, 70802",
      role: "Capital Government & Legal District",
      intent: "Commercial litigation, civil rights, criminal trials, and 19th JDC court filings.",
    },
    {
      name: "Mid City & Garden District",
      zipCodes: "70806, 70808",
      role: "Historic Center & Urban Professional",
      intent: "Estate succession planning, contested probate, family law, and small business disputes.",
    },
    {
      name: "Shenandoah & Bocage",
      zipCodes: "70817, 70809",
      role: "Affluent Executive Residential Corridor",
      intent: "High-net-worth divorce, community property partitions, and corporate executive counsel.",
    },
    {
      name: "Zachary & Central",
      zipCodes: "70791, 70739",
      role: "High-Growth Northern EBR Suburbs",
      intent: "Family law, local custody modifications, auto collisions, and residential estate succession.",
    },
    {
      name: "Ascension Parish (Gonzales & Prairieville)",
      zipCodes: "70737, 70769",
      role: "Petrochemical Industrial Hub & I-10 South",
      intent: "Industrial plant chemical exposure, refinery worker injury, and highway commercial trucking collisions.",
    },
    {
      name: "Livingston Parish (Denham Springs & Walker)",
      zipCodes: "70726, 70785",
      role: "Rapid Commuter Inflow & I-12 Corridor",
      intent: "High-speed interstate collisions, wrongful death, and cross-parish family law litigation.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Geographic Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Six Capital Area Submarkets Engineered for Targeted Client Acquisition
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            High-value legal search in the Baton Rouge metropolitan area spans beyond city boundaries. SearchPrex builds hyper-local submarket hubs that capture qualified clients across East Baton Rouge, Ascension, and Livingston Parishes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submarkets.map((sm) => (
            <div
              key={sm.name}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  <span>ZIP: {sm.zipCodes}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{sm.name}</h3>
                <p className="text-xs font-semibold text-[#4338ca] mb-3">{sm.role}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sm.intent}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Parish Silo Active</span>
                <Link
                  href="/locations/louisiana/baton-rouge"
                  className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
                >
                  Explore Silo
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
