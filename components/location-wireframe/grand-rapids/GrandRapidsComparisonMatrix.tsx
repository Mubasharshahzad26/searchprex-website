"use client";

import React from "react";
import { Check, X, ShieldAlert, Award, ArrowRight } from "lucide-react";

const COMPARISON_ROWS = [
  {
    question: "Speed to first leads",
    ppc: "Fastest, often within days",
    directories: "Fast (if inventory available)",
    searchprex: "Slower: 60–90 days, then compounding permanently",
    highlight: false,
  },
  {
    question: "When you stop paying",
    ppc: "Leads stop immediately",
    directories: "Leads stop immediately",
    searchprex: "Rankings, pages and domain authority stay 100% yours",
    highlight: true,
  },
  {
    question: "Lead exclusivity",
    ppc: "Yours, but you bid against rival firms",
    directories: "Often shared/resold to 3–5 competing firms",
    searchprex: "Strictly exclusive: one firm per practice area in Grand Rapids",
    highlight: true,
  },
  {
    question: "Cost trend",
    ppc: "Rises continuously as auction bids increase",
    directories: "Per-lead fees increase over time",
    searchprex: "Flat predictable monthly retainer; effort compounds",
    highlight: false,
  },
  {
    question: "Best used as",
    ppc: "Short-term bridge while launching",
    directories: "Emergency backfill only",
    searchprex: "Long-term core foundation for qualified caseload",
    highlight: false,
  },
];

export default function GrandRapidsComparisonMatrix() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-[#534AB7] uppercase tracking-wider bg-[#EEEDFE] px-3 py-1 rounded-full border border-[#534AB7]/20">
            HONEST COMPARISON
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0f2e] mt-4 tracking-tight">
            PPC vs lead directories vs owning your visibility
          </h2>
          <p className="text-[#566070] text-sm sm:text-base mt-2">
            No marketing channel is evil. Paid search is great for instant testing; directories can backfill. But here is how the economics actually compare for a Grand Rapids firm:
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs sm:text-sm">
                  <th className="py-4 px-4 sm:px-6 font-bold text-[#0a0f2e] w-1/4">
                    Comparison Factor
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-slate-600 w-1/4">
                    Google Ads (PPC)
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-slate-600 w-1/4">
                    Lead Directories (Avvo, Justia)
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-[#1a7d59] bg-emerald-50/70 border-l border-emerald-200/80 w-1/4">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#1a7d59]" />
                      SearchPrex Organic SEO
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#0a0f2e] bg-slate-50/30">
                      {row.question}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#566070] leading-relaxed">
                      {row.ppc}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#566070] leading-relaxed">
                      {row.directories}
                    </td>
                    <td className={`py-4 px-4 sm:px-6 font-semibold border-l border-emerald-200/60 leading-relaxed ${
                      row.highlight ? "text-[#1a7d59] bg-emerald-50/40" : "text-slate-900 bg-emerald-50/20"
                    }`}>
                      {row.searchprex}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
            General patterns based on Kent County legal marketing data. Validate against your firm&apos;s internal intake metrics.
          </div>
        </div>

      </div>
    </section>
  );
}
