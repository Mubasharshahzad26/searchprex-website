"use client";

// components/LocalCompetitorReportSample.tsx
//
// Replicates the "The competitor tear-down (report format)" wireframe section.
// Demonstrates the exact executive report, gap matrix, and deliverables
// a law firm receives within 24 hours of requesting a free audit.

import React from "react";
import Link from "next/link";
import {
  FileText,
  Video,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function LocalCompetitorReportSample({ page }: { page: CityPage }) {
  const topPractice = page.practiceDemand[0]?.area ?? "Personal Injury";

  const sampleRows = [
    {
      firm: "TV Advertising Mega-Firm",
      mapPack: "Pos #1 (Downtown only)",
      organic: "Pos #2",
      citations: "450+ (Generic)",
      gap: "$22,000/mo PPC burn; thin generic practice pages",
      status: "warning",
    },
    {
      firm: "National Legal Directory (Avvo/Justia)",
      mapPack: "Ineligible (Cannot rank in Map Pack)",
      organic: "Pos #3–5",
      citations: "Aggregator Directory",
      gap: "Shared leads resold to 3–5 competing firms; 0 exclusivity",
      status: "danger",
    },
    {
      firm: `Typical ${page.city} Solo / Mid-Size Firm`,
      mapPack: "Unranked (Page 2+)",
      organic: "Pos #14–26",
      citations: "22 listings (Inconsistent NAP)",
      gap: "Burning $6k–$12k/mo on Google Ads with 0 organic equity",
      status: "danger",
    },
    {
      firm: "SearchPrex Single-Firm Architecture",
      mapPack: `Top 3 Geofenced across ${page.county}`,
      organic: "Pos #1 & #2 (Dual Silo)",
      citations: "Verified Court & Bar Entity Sync",
      gap: "100% Exclusive, flat retainer, $0 CPC, compounding asset",
      status: "success",
    },
  ];

  const keyFindings = [
    {
      number: "1",
      title: "Local 3-Pack & Geofencing Gap",
      body: `Why your Google Business Profile vanishes beyond a 2-mile radius in ${page.county}, while top competitors rank across all surrounding sub-markets.`,
    },
    {
      number: "2",
      title: "Statutory Practice Silo Gap",
      body: `Why a single generic "Practice Areas" page fails against specialized silos answering ${page.state} statutory and court-specific questions.`,
    },
    {
      number: "3",
      title: "AI Overview & Entity Trust Gap",
      body: "How Google Gemini and ChatGPT extract legal answers in 2026, and why LLMs currently cite your competitors instead of your firm.",
    },
  ];

  return (
    <div id="report-sample" className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#534AB7] border border-indigo-100/80">
              <FileText className="h-3.5 w-3.5" />
              <span>Sample Deliverable · 24-Hour Reality Check</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#0a0f2e] sm:text-3xl">
              The Competitor Tear-Down (Executive Report Format)
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#566070] max-w-2xl">
              A sample of what you receive within 24 hours when you submit your URL: real data on the firms outranking you in {page.city}, their PPC spend, and your exact ranking gap.
            </p>
          </div>

          <div className="rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs">
            <span>Written Personally by Mubashar Sharif</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-900 text-[11px] font-bold uppercase tracking-wider text-slate-200">
                <th className="py-3.5 px-4 w-[28%] text-white">Law Firm / Domain</th>
                <th className="py-3.5 px-3 w-[18%]">Local 3-Pack</th>
                <th className="py-3.5 px-3 w-[16%]">Organic Rank</th>
                <th className="py-3.5 px-3 w-[18%]">Citations / NAP</th>
                <th className="py-3.5 px-4 w-[20%]">Competitor Gap Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleRows.map((row, idx) => {
                const isHighlight = row.status === "success";
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isHighlight
                        ? "bg-emerald-50/80 font-semibold text-emerald-950 border-l-4 border-l-emerald-600"
                        : idx % 2 === 0
                        ? "bg-white text-slate-700"
                        : "bg-slate-50/50 text-slate-700"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#0a0f2e]">
                      {row.firm}
                    </td>
                    <td className="py-3.5 px-3 text-xs">
                      {row.mapPack}
                    </td>
                    <td className="py-3.5 px-3 text-xs">
                      {row.organic}
                    </td>
                    <td className="py-3.5 px-3 text-xs">
                      {row.citations}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      {row.gap}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* The 3 Key Findings Strip */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-3">
            The 3 Key Findings Every {page.city} Teardown Covers:
          </span>
          <div className="grid gap-4 md:grid-cols-3">
            {keyFindings.map((f) => (
              <div
                key={f.number}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a0f2e] text-xs font-black text-white mb-3">
                    {f.number}
                  </span>
                  <h4 className="text-sm font-bold text-[#0a0f2e] leading-snug">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {f.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Breakdown Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a0f2e] block">
              What You Receive Within 24 Hours:
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span><strong>1-Page Executive Gap Summary:</strong> Specific fixes for your Google Business Profile &amp; top 3 target keywords.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span><strong>5-Minute Loom Video Walkthrough:</strong> Mubashar Sharif screenshares your live Search Console and competitors in {page.county}.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span><strong>Zero Obligation &amp; 100% Exclusive:</strong> No automated PDF pitch, no follow-up sales harassment.</span>
              </li>
            </ul>
          </div>

          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a0f2e] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#1a2366] transition-colors shrink-0"
          >
            <span>Request Free {page.city} Teardown</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
