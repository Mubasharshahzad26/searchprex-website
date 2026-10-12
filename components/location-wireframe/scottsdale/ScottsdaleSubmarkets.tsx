'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ScottsdaleSubmarkets() {
  const submarkets = [
    {
      name: "Old Town Scottsdale & Entertainment District",
      zip: "85251",
      focus: "Nightlife DUI & Assault Defense",
      description:
        "High-density hospitality corridor generating intense weekend DUI arrests, rideshare collisions, and misdemeanor alcohol citations prosecuted in Scottsdale City Court.",
      targetKeyword: "Old Town Scottsdale DUI lawyer",
    },
    {
      name: "North Scottsdale & DC Ranch",
      zip: "85255",
      focus: "Executive Divorce & Asset Division",
      description:
        "Affluent gated communities with high household incomes where marital dissolutions involve venture equity, business valuations, and deferred compensation packages.",
      targetKeyword: "DC Ranch divorce attorney",
    },
    {
      name: "McCormick Ranch & Gainey Ranch",
      zip: "85258",
      focus: "Trust Administration & Probate",
      description:
        "Established master-planned neighborhoods characterized by mature wealth, multigenerational trusts, and contested probate estates in Maricopa County Superior Court.",
      targetKeyword: "Gainey Ranch estate planning attorney",
    },
    {
      name: "Silverleaf & Troon North",
      zip: "85262",
      focus: "Ultra-High-Net-Worth Wealth Preservation",
      description:
        "Custom luxury estates bordering the McDowell Sonoran Preserve where clients demand bespoke asset protection structures and prenuptial agreements.",
      targetKeyword: "Silverleaf asset protection lawyer",
    },
    {
      name: "Paradise Valley Border Enclave",
      zip: "85253",
      focus: "High-Profile Family Law & Mediation",
      description:
        "Arizona's wealthiest municipality directly adjacent to Scottsdale, generating eight-figure community property divisions and complex child support calculations.",
      targetKeyword: "Paradise Valley family law attorney",
    },
    {
      name: "Scottsdale Airpark Commercial Corridor",
      zip: "85260",
      focus: "Business Litigation & Tech Employment",
      description:
        "Major East Valley employment hub with over 3,000 corporate entities generating non-compete enforcement, shareholder disputes, and commercial litigation.",
      targetKeyword: "Scottsdale Airpark business lawyer",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
              High-Net-Worth Geographic Footprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2">
              Six Submarkets Your Scottsdale Firm Must Dominate
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Affluent clients search for attorneys who understand their specific gated community, commercial center, or courthouse venue.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/locations/arizona/tempe"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"
            >
              Explore Tempe Law Firm SEO
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
