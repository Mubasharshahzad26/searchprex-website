"use client";

import React from "react";
import { Check, X, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Speed to first leads",
    ppc: "Fastest: inquiries often appear within days of campaign launch",
    seo: "Measured: foundation built over initial months, then compounding indefinitely",
    ppcWinner: true,
  },
  {
    feature: "When you stop paying",
    ppc: "Visibility stops instantly. The moment budget runs out, phone stops ringing.",
    seo: "Published pages, domain authority, Google 3-pack rankings, and citations remain yours.",
    seoWinner: true,
  },
  {
    feature: "Map Pack (3-pack) presence",
    ppc: "Sponsored ads appear above it, but you don't build authentic map authority.",
    seo: "Optimized Google Business Profile and local geofencing compete directly inside the 3-pack.",
    seoWinner: true,
  },
  {
    feature: "Google AI Overview citations",
    ppc: "Not available through PPC. AI bots do not cite paid ad headlines as legal authorities.",
    seo: "Engineered through answer-first content, llms.txt protocol, and verified entity mentions.",
    seoWinner: true,
  },
  {
    feature: "Brand mentions & local citations",
    ppc: "None. Zero permanent footprint earned in Ohio directories or bar associations.",
    seo: "Earned and documented across Ohio State Bar, Cleveland legal hubs, and regional news.",
    seoWinner: true,
  },
  {
    feature: "Searcher trust & click share",
    ppc: "Flagged with 'Sponsored' tags. Sophisticated clients frequently skip past ads.",
    seo: "Organic rankings and reviews carry high perceived credibility and higher conversion rates.",
    seoWinner: true,
  },
  {
    feature: "Long-term cost trend",
    ppc: "Escalates year after year as competitors bid up Cuyahoga County personal injury keywords.",
    seo: "Predictable flat monthly fee. Cost per signed case drops as organic volume expands.",
    seoWinner: true,
  },
];

export default function ClevelandPpcVsSeoTable() {
  return (
    <section className="border-b border-slate-200 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            03 · Why SEO instead of PPC
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Cleveland Legal Marketing: Google Ads (PPC) vs. Organic Law Firm SEO
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            PPC rents temporary clicks in volatile auctions. Our{" "}
            <a href="/services/law-firm-seo" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
              modern law firm SEO
            </a>{" "}
            builds permanent digital authority across Cuyahoga County courts that your practice owns forever:
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="mt-10 overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4.5 px-6 text-sm font-extrabold text-slate-900 bg-slate-100/80 w-1/3">
                    What You Get
                  </th>
                  <th className="py-4.5 px-6 text-sm font-extrabold text-slate-700 bg-slate-50 w-1/3">
                    Google Ads (PPC)
                  </th>
                  <th className="py-4.5 px-6 text-sm font-extrabold text-white bg-gradient-to-r from-[#534AB7] to-[#3C3489] w-1/3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-200" />
                      <span>SearchPrex Legal SEO</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-indigo-50/40 transition-colors duration-200">
                    <td className="py-4 px-6 font-bold text-[#0a0f2e] bg-slate-50/30 group-hover:bg-transparent transition-colors">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                      {row.ppc}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800 bg-[#EEEDFE]/20 group-hover:bg-[#EEEDFE]/40 leading-relaxed transition-colors">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#1a7d59] shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                        <span className="font-semibold text-slate-900">{row.seo}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Market benchmark patterns based on Cuyahoga County legal search data.</span>
            <span className="font-semibold text-[#534AB7]">SearchPrex recommends a blended transition, not an abrupt stop.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
