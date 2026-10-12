"use client";

import React from "react";

const CIVIL_COMPARISONS = [
  {
    concept: "Filing Deadlines",
    genericCommonLaw: '"Statute of Limitations" (Generic out-of-state template copy)',
    louisianaCivilCode: "Liberative Prescription (La. Civ. Code Art. 3493.11 — Two-year delictual period for crashes after July 1, 2024)",
    seoImpact: "Captures injured East Baton Rouge residents and AI Overviews searching exact Louisiana statutory changes.",
  },
  {
    concept: "Estate & Probate",
    genericCommonLaw: '"Probate & Wills Attorney" (Standard 49-state terminology)',
    louisianaCivilCode: "Successions, Forced Heirship, Usufruct & Naked Ownership (La. Civ. Code Art. 871+)",
    seoImpact: "Outranks national directories (Avvo, Justia) that fail to address Louisiana succession procedure in the 19th JDC.",
  },
  {
    concept: "Child Custody & Estates",
    genericCommonLaw: '"Guardianship & Conservatorship"',
    louisianaCivilCode: "Tutorship, Continuing Tutorship & Curatorship (La. Code Civ. Proc. Art. 4031)",
    seoImpact: "Wins high-intent family law retainers across Baton Rouge, Prairieville, and Denham Springs with zero PPC waste.",
  },
];

export default function BatonRougeCivilCodeAdvantage() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-md bg-white border border-slate-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
            Louisiana Napoleonic Civil Code Edge
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Why Generic SEO Fails in Louisiana Courts
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            National legal marketing agencies copy-paste common-law articles that are legally inaccurate in Louisiana. We build your pages around authentic Louisiana Civil Code terminology that Google and AI models reward.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-white text-xs uppercase tracking-wider">
                <th className="py-4 px-5 font-semibold">Legal Area</th>
                <th className="py-4 px-5 font-semibold">Generic Out-of-State SEO Copy</th>
                <th className="py-4 px-5 font-semibold">SearchPrex Louisiana Civil Code Architecture</th>
                <th className="py-4 px-5 font-semibold">Ranking & Intake Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {CIVIL_COMPARISONS.map((row) => (
                <tr key={row.concept} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-bold text-neutral-950">{row.concept}</td>
                  <td className="py-4 px-5 text-slate-500">{row.genericCommonLaw}</td>
                  <td className="py-4 px-5 font-semibold text-neutral-950">{row.louisianaCivilCode}</td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed">{row.seoImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
