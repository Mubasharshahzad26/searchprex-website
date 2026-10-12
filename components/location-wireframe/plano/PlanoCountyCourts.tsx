'use client';

import React from 'react';
import { Landmark, Scale, FileText, AlertCircle, MapPin } from 'lucide-react';

export default function PlanoCountyCourts() {
  const courts = [
    {
      name: 'Collin County District & County Courts',
      location: 'Russell A. Steindam Courts Building, McKinney, TX',
      jurisdiction: 'Felonies, high-asset divorces, civil claims > $250,000, and estate probate.',
      insight: 'The principal venue for almost all major Plano litigation and contested family law matters.',
    },
    {
      name: 'Plano Municipal Court',
      location: '900 E 15th St, Plano, TX 75074',
      jurisdiction: 'Class C misdemeanors, city ordinance violations, traffic citations, and juvenile dockets.',
      insight: 'Fast-resolution venue; high search volume for traffic defense and deferred disposition.',
    },
    {
      name: 'Denton County Courts (Dual Jurisdiction Addresses)',
      location: 'Denton County Courts Building, Denton, TX',
      jurisdiction: 'Addresses in West Plano and Frisco crossing the Denton County line.',
      insight: 'Crucial for multi-county content architecture: searchers often file in the wrong courthouse.',
    },
    {
      name: 'U.S. District Court, Eastern District of Texas',
      location: 'Paul Brown Federal Building, Sherman Division',
      jurisdiction: 'Federal litigation, corporate disputes, intellectual property, and federal criminal defense.',
      insight: 'Frequent forum for North Texas corporate and patent infringement disputes.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 text-neutral-900 border border-slate-100 mb-3">
            <Scale className="w-3.5 h-3.5" />
            Collin County Venue Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Which Court Hears a Plano Case? Collin County Courts in McKinney
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most Plano cases are heard in the Collin County district and county courts in McKinney, while some western Plano and Frisco neighborhoods fall into Denton County. For divorce, Texas requires six months in the state and 90 days in the county before filing (Tex. Fam. Code § 6.301). Texas is a community property state, which directly dictates how stock grants, restricted stock units (RSUs), and deferred executive compensation are divided.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courts.map((court, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors shadow-sm space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-950">{court.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {court.location}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                <strong>Jurisdiction:</strong> {court.jurisdiction}
              </p>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600">
                <strong className="text-neutral-900 block font-semibold mb-0.5">SEO Architecture Insight:</strong>
                {court.insight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
