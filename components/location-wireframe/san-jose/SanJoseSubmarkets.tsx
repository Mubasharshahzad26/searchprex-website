'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SanJoseSubmarkets() {
  const submarkets = [
    {
      name: "Downtown San Jose & Innovation Core",
      zip: "95113 / 95112",
      focus: "Tech Employment & Commercial Litigation",
      description:
        "Commercial and governmental heart of Silicon Valley surrounding the Santa Clara County courthouses, Adobe global HQ, and emerging transit-oriented tech campuses.",
      targetKeyword: "Downtown San Jose employment lawyer",
    },
    {
      name: "Willow Glen & Rose Garden Enclaves",
      zip: "95125 / 95126",
      focus: "High-Asset Divorce & Family Wealth",
      description:
        "Historic high-net-worth residential neighborhoods where marital dissolutions involve tech executive deferred compensation, residential equity, and custody agreements.",
      targetKeyword: "Willow Glen divorce attorney",
    },
    {
      name: "Sunnyvale & Santa Clara Tech Corridor",
      zip: "94086 / 95054",
      focus: "Executive Severance & Non-Competes",
      description:
        "Home to major semiconductor and cloud enterprise campuses generating intense employee search demand regarding California non-compete bans and severance review.",
      targetKeyword: "Sunnyvale severance lawyer",
    },
    {
      name: "Cupertino Apple & Enterprise Corridor",
      zip: "95014",
      focus: "RSU Valuation & IP Trade Secrets",
      description:
        "High-density executive cluster characterized by multimillion-dollar equity grants, trade secret agreements, and complex California community property litigation.",
      targetKeyword: "Cupertino tech employment lawyer",
    },
    {
      name: "Mountain View & Palo Alto Border",
      zip: "94040 / 94301",
      focus: "Startup Founder Disputes & Venture Equity",
      description:
        "Global capital nexus generating high-stakes founder disagreements, corporate restructuring, and Defend Trade Secrets Act litigation in federal court.",
      targetKeyword: "Mountain View startup lawyer",
    },
    {
      name: "Almaden Valley & Silver Creek Hills",
      zip: "95120 / 95138",
      focus: "Estate Planning & Catastrophic Injury",
      description:
        "Affluent suburban foothills with median incomes exceeding $210,000, creating high demand for revocable living trusts and serious commuter accident representation.",
      targetKeyword: "Almaden Valley estate planning attorney",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
              Silicon Valley Geographic Saturation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2">
              Six Submarkets Your San Jose Firm Must Dominate
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Tech executives and local clients search for attorneys who understand their specific company campus, residential enclave, or local courthouse.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"
            >
              Explore National Location Grid
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
                  <span className="font-semibold text-[#4338ca] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
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
