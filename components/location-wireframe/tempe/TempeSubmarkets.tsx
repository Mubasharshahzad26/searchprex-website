'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TempeSubmarkets() {
  const submarkets = [
    {
      name: "Downtown Tempe & Mill Avenue",
      zip: "85281",
      focus: "DUI & Pedestrian Collision",
      description:
        "High-density nightlife corridor along Mill Avenue and Tempe Town Lake generating concentrated weekend DUI arrests, rideshare incidents, and misdemeanor alcohol citations.",
      targetKeyword: "Downtown Tempe DUI lawyer",
    },
    {
      name: "ASU Campus & University Corridor",
      zip: "85287 / 85281",
      focus: "Student Criminal Defense & Title IX",
      description:
        "Home to Arizona State University's main campus with 75,000+ enrolled students. Drives continuous demand for underage drinking (MIP), drug possession, and student disciplinary defense.",
      targetKeyword: "ASU student defense attorney",
    },
    {
      name: "South Tempe & Kyrene Enclave",
      zip: "85283 / 85284",
      focus: "High-Asset Divorce & Estate Planning",
      description:
        "Affluent residential neighborhoods bordering Chandler characterized by high median household incomes, substantial 401(k) / equity accounts, and complex community property divisions.",
      targetKeyword: "South Tempe divorce attorney",
    },
    {
      name: "Mesa East Valley Border & US-60",
      zip: "85201 / 85202",
      focus: "Multi-Vehicle Highway Injury",
      description:
        "The heavily congested junction of US-60 (Superstition Freeway) and Loop 101, generating severe multi-vehicle commercial trucking and commuter injury litigation.",
      targetKeyword: "East Valley car accident lawyer",
    },
    {
      name: "Chandler Price Road Tech Corridor",
      zip: "85224 / 85226",
      focus: "Executive Divorce & Employment",
      description:
        "Adjacent technology and semiconductor hubs where corporate relocations trigger high-value prenuptial agreements, non-compete litigation, and equity disputes.",
      targetKeyword: "Price Corridor legal counsel",
    },
    {
      name: "Scottsdale / Papago Park Border",
      zip: "85257 / 85281",
      focus: "Cross-Municipal Jurisdiction",
      description:
        "Northern corridor linking Tempe directly to South Scottsdale and Old Town nightlife, creating complex jurisdictional crossovers between Tempe Municipal and Scottsdale City Court.",
      targetKeyword: "Scottsdale-Tempe legal representation",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
              East Valley Geographic Saturation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2">
              Six Submarkets Your Tempe Firm Must Dominate
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Local clients do not just search for &ldquo;Arizona lawyer&rdquo;—they search for counsel familiar with their exact street, campus, or highway junction.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/locations/arizona/scottsdale"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"
            >
              Explore Scottsdale Law Firm SEO
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </Link>
          </div>
        </div>

        {/* Submarkets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submarkets.map((sub) => (
            <div
              key={sub.name}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Zip: {sub.zip}
                  </span>
                  <span className="font-semibold text-neutral-950 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {sub.focus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{sub.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {sub.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">
                  High-Yield Organic Query:
                </span>
                <span className="text-xs font-mono font-medium text-slate-800">
                  &ldquo;{sub.targetKeyword}&rdquo;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
