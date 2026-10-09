// components/SemrushCompetitorMatrix.tsx
//
// Semrush-Inspired Competitor Gap Teardown Matrix for Law Firm SEO.
// Directly compares TV mega-firms, national directories, and SearchPrex's
// single-firm organic architecture across 7 tangible metrics.

import React from "react";
import Link from "next/link";
import { Check, X, ShieldCheck, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function SemrushCompetitorMatrix({ page }: { page: CityPage }) {
  const comparisonRows = [
    {
      metric: "Local Map 3-Pack Presence",
      tvFirms: "Weak outside 1 downtown radius",
      tvStatus: false,
      directories: "Never eligible (Directories cannot rank in Map Pack)",
      dirStatus: false,
      searchprex: `Top 3 positions geofenced across ${page.county}`,
      spStatus: true,
    },
    {
      metric: "Cost per Client Lead",
      tvFirms: "$400–$800+ via TV & PPC ad burn",
      tvStatus: false,
      directories: "$150–$300 per shared non-exclusive click",
      dirStatus: false,
      searchprex: "Zero cost-per-click (Compounds on flat retainer)",
      spStatus: true,
    },
    {
      metric: "Lead Exclusivity",
      tvFirms: "Exclusive to their firm",
      tvStatus: true,
      directories: "Zero exclusivity (Resold to 3–5 competing firms)",
      dirStatus: false,
      searchprex: `100% Exclusive — 1 firm per practice in ${page.city}`,
      spStatus: true,
    },
    {
      metric: "Statutory Law Specificity",
      tvFirms: "Generic 1-page &apos;Personal Injury&apos; filler",
      tvStatus: false,
      directories: "Generic templated directory profiles",
      dirStatus: false,
      searchprex: `Deep silos citing ${page.courts[0]} & state rules`,
      spStatus: true,
    },
    {
      metric: "AI Overview & ChatGPT Citation",
      tvFirms: "Rarely quoted by LLMs",
      tvStatus: false,
      directories: "De-prioritized by AI answer engines",
      dirStatus: false,
      searchprex: "Ranked as primary expert source in Gemini & ChatGPT",
      spStatus: true,
    },
    {
      metric: "Asset Ownership",
      tvFirms: "Locked in agency retainer",
      tvStatus: false,
      directories: "Zero ownership (Rented profiles disappear upon cancel)",
      dirStatus: false,
      searchprex: "You own 100% of your domain, content, and rankings",
      spStatus: true,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      {/* Matrix Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ff642d] border border-orange-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Competitor Gap Audit · {page.county}</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0a0f2e] sm:text-3xl">
              How Your Firm Out-Ranks {page.city} Competitors
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#566070] max-w-2xl">
              Why spending $20,000/mo on billboards or buying shared leads from Avvo fails against precision local SEO in {page.state}.
            </p>
          </div>

          <div className="rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs hidden md:block">
            <span className="block text-[11px] text-slate-500 font-medium">Exclusive Agency Model</span>
            <span className="text-xs font-bold text-emerald-600">1 Firm Per Legal Niche</span>
          </div>
        </div>
      </div>

      {/* Responsive Table / Matrix Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-4 px-5 sm:px-6 w-[28%]">Strategic Comparison</th>
              <th className="py-4 px-4 w-[24%] text-slate-600">TV Mega-Firms</th>
              <th className="py-4 px-4 w-[24%] text-slate-600">Directories (Avvo/Justia)</th>
              <th className="py-4 px-5 sm:px-6 w-[24%] bg-indigo-50/70 text-[#534AB7] border-l border-r border-indigo-100">
                SearchPrex Architecture
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {comparisonRows.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors hover:bg-slate-50/70 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                }`}
              >
                {/* Metric Name */}
                <td className="py-4 px-5 sm:px-6 font-bold text-[#0a0f2e]">
                  {row.metric}
                </td>

                {/* TV Mega-Firms */}
                <td className="py-4 px-4 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    {row.tvStatus ? (
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span>{row.tvFirms}</span>
                  </div>
                </td>

                {/* Directory Aggregators */}
                <td className="py-4 px-4 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    {row.dirStatus ? (
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span>{row.directories}</span>
                  </div>
                </td>

                {/* SearchPrex Architecture */}
                <td className="py-4 px-5 sm:px-6 text-xs font-semibold text-[#0a0f2e] bg-indigo-50/40 border-l border-r border-indigo-100">
                  <div className="flex items-start gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-emerald-950">{row.searchprex}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>
            We enforce strict territorial exclusivity: your direct competitor in {page.city} will never be our client.
          </span>
        </div>
        <Link
          href="/free-audit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0a0f2e] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1a2366] transition-colors"
        >
          <span>Claim {page.city} Practice Exclusivity</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
