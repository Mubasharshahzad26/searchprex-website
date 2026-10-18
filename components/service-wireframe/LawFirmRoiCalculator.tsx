"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";

interface NicheRoi {
  id: string;
  label: string;
  avgCaseValue: string;
  avgFeeValue: number;
  seoCost: number;
  adCostPerClick: string;
  ad10ClicksCost: string;
  casesForFullRoi: string;
  netRoiPercent: string;
  verdict: string;
}

const NICHES: NicheRoi[] = [
  {
    id: "pi",
    label: "Personal Injury",
    avgCaseValue: "$30,000 – $100,000+",
    avgFeeValue: 12000,
    seoCost: 2000,
    adCostPerClick: "$200 – $350 / click",
    ad10ClicksCost: "$2,000 – $3,500 burned on 10 clicks",
    casesForFullRoi: "Just 1 signed car crash or truck case",
    netRoiPercent: "500% – 1,000% ROI",
    verdict: "A single signed personal injury case covers your entire SearchPrex retainer for 6 to 12 months.",
  },
  {
    id: "family",
    label: "Family Law & Divorce",
    avgCaseValue: "$4,500 – $12,000",
    avgFeeValue: 5500,
    seoCost: 1800,
    adCostPerClick: "$90 – $180 / click",
    ad10ClicksCost: "$1,200 burned on 8 clicks",
    casesForFullRoi: "Just 1 high-asset divorce or custody retainer",
    netRoiPercent: "200% – 400% ROI",
    verdict: "One contested divorce or custody client pays for 3 months of SearchPrex SEO immediately.",
  },
  {
    id: "criminal",
    label: "Criminal Defense & DUI",
    avgCaseValue: "$3,500 – $10,000",
    avgFeeValue: 4000,
    seoCost: 1700,
    adCostPerClick: "$120 – $220 / click",
    ad10ClicksCost: "$1,500 burned on 8 clicks",
    casesForFullRoi: "Just 1 felony or DUI/OVI defense retainer",
    netRoiPercent: "150% – 300% ROI",
    verdict: "One late-night felony or DUI retainer completely funds your monthly organic search campaign.",
  },
  {
    id: "estate",
    label: "Estate Planning & Probate",
    avgCaseValue: "$3,000 – $8,500",
    avgFeeValue: 3500,
    seoCost: 1500,
    adCostPerClick: "$70 – $140 / click",
    ad10ClicksCost: "$1,000 burned on 10 clicks",
    casesForFullRoi: "Just 1 living trust package or probate filing",
    netRoiPercent: "130% – 250% ROI",
    verdict: "A single revocable living trust or probate client pays for multiple months of local Map Pack SEO.",
  },
];

export default function LawFirmRoiCalculator() {
  const [selectedId, setSelectedId] = useState("pi");
  const current = NICHES.find((n) => n.id === selectedId) || NICHES[0];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 font-sans shadow-xs my-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 border border-slate-200">
          <Calculator className="h-3.5 w-3.5 text-neutral-900" />
          <span>Interactive ROI Calculator &middot; Signed Cases vs. Ad Waste</span>
        </div>
        <span className="text-xs font-bold text-slate-500">
          Transparent Math &middot; Month-to-Month
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
        Why 1 Signed Case Per Month Pays for Your Entire SearchPrex Retainer
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
        Select your firm&apos;s primary practice area below to see how organic Map Pack &amp; county silo rankings compare against burning budget on Google Ads clicks:
      </p>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {NICHES.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setSelectedId(n.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              selectedId === n.id
                ? "bg-neutral-950 text-white shadow-xs"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-400"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Interactive Metric Comparison Card */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Avg Case Value */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Average Retainer / Settlement
          </p>
          <p className="mt-1.5 text-2xl font-black text-neutral-950">
            {current.avgCaseValue}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Gross case revenue for your firm
          </p>
        </div>

        {/* Metric 2: Ad Spend Waste */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Typical Google Ads Cost
          </p>
          <p className="mt-1.5 text-2xl font-black text-red-600">
            {current.adCostPerClick}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            {current.ad10ClicksCost}
          </p>
        </div>

        {/* Metric 3: Organic Net ROI */}
        <div className="rounded-2xl border border-neutral-950 bg-neutral-950 text-white p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Net ROI On 1 Signed Case
          </p>
          <p className="mt-1.5 text-2xl font-black text-white">
            {current.netRoiPercent}
          </p>
          <p className="mt-1 text-xs text-slate-300 font-medium">
            {current.casesForFullRoi}
          </p>
        </div>
      </div>

      {/* Bottom Verdict Strip */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-neutral-950 font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span>{current.verdict}</span>
        </div>
        <Link
          href="#7-day-trial"
          className="inline-flex items-center gap-1.5 font-bold text-neutral-950 underline hover:text-slate-700 shrink-0"
        >
          <span>Test with 7-Day Free Trial &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
