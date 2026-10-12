"use client";

import React from "react";
import { Scale, Navigation, GraduationCap, ShieldAlert } from "lucide-react";

const MATRIX_ROWS = [
  {
    corridor: "ASU Main Campus & Mill Ave",
    statute: "ARS § 28-1381 / § 28-1382 & ABOR Code",
    queries: '"Tempe DUI lawyer", "ASU student conduct attorney", "fake ID defense Tempe"',
    cpc: "$195 – $310",
    siloStrategy: "Dual-audience pages written for both out-of-state parents and local students facing Tempe Municipal Court arraignments.",
  },
  {
    corridor: "Loop 101 (Price Fwy) & US-60",
    statute: "ARS § 12-542 (2-Yr Tort Limitations)",
    queries: '"Loop 101 car accident lawyer", "Tempe truck crash attorney", "US-60 rear-end injury"',
    cpc: "$280 – $440",
    siloStrategy: "Interchange-specific collision reconstruction pages aligned with Banner Desert trauma documentation and Maricopa Superior Court filing venues.",
  },
  {
    corridor: "Tempe Town Lake & Marina Heights",
    statute: "ARS Title 23 & Commercial Code",
    queries: '"Tempe employment lawyer", "commercial lease dispute Tempe", "tech executive severance AZ"',
    cpc: "$145 – $230",
    siloStrategy: "Corporate corridor entity silos targeting enterprise employees, SaaS founders, and commercial landlords across Rio Salado.",
  },
];

export default function TempeAsuAndCorridorMatrix() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-md bg-white border border-slate-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
            East Valley Search Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Tempe Corridor & Statutory Search Matrix
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Phoenix mega-firms treat Tempe as a footnote. We segment your organic architecture around the three distinct economic and legal corridors that generate 85% of signed retainers in Tempe.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-white text-xs uppercase tracking-wider">
                <th className="py-4 px-5 font-semibold">Tempe Micro-Corridor</th>
                <th className="py-4 px-5 font-semibold">Governing Arizona Statute</th>
                <th className="py-4 px-5 font-semibold">High-Intent Search Queries</th>
                <th className="py-4 px-5 font-semibold">Est. Google Ads CPC</th>
                <th className="py-4 px-5 font-semibold">Organic Silo Execution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {MATRIX_ROWS.map((r) => (
                <tr key={r.corridor} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-bold text-neutral-950">{r.corridor}</td>
                  <td className="py-4 px-5 font-mono text-xs text-slate-700">{r.statute}</td>
                  <td className="py-4 px-5 font-mono text-xs text-neutral-900">{r.queries}</td>
                  <td className="py-4 px-5 font-bold text-neutral-950">{r.cpc}</td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed">{r.siloStrategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
