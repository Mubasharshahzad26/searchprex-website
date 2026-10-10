"use client";

// components/location-wireframe/DetroitPromiseAndComparison.tsx
//
// Matches Page 5:
// 1. Dark banner (#0a0f2e): "OUR PROMISE: What you can hold us to"
// 2. "WHY CHOOSE US: Why Detroit Law Firms Choose SearchPrex Over a Generic SEO Agency" (6 feature cards)
// 3. Comparison Table: "SearchPrex vs Typical SEO Agency vs DIY"

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Award, FileText, UserCheck, MapPin, TrendingUp, ChevronDown } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitPromiseAndComparison({ page }: { page: CityPage }) {
  const promises = [
    {
      title: "White-hat only",
      desc: "No link schemes, private blog networks or fake reviews.",
    },
    {
      title: "Written with Michigan advertising rules in mind",
      desc: "Pages follow MRPC Rule 7 guidance, and your attorneys approve final copy.",
    },
    {
      title: "Monthly proof",
      desc: "Rankings, calls and signed cases, plus a 90-day milestone review against agreed targets.",
    },
  ];

  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const reasons = [
    {
      icon: TrendingUp,
      title: "Paid on outcomes you care about",
      desc: "Reports show real intake phone calls, signed retainers and pipeline value, not just vanity keyword impressions.",
      kpi: "Cost Per Signed Retainer",
      execution: "We connect CallRail dynamic number insertion with Clio or Lawmatics CRM intake so you trace every signed case back to the specific search query.",
      advantage: "Generic agencies hide behind traffic charts; we measure success by retained cases.",
    },
    {
      icon: Award,
      title: "Visible in AI answers too",
      desc: "We track and improve your AI citation rate in Google Gemini, ChatGPT, and Perplexity alongside Google Maps rankings.",
      kpi: "LLM Citation Co-occurrence",
      execution: "We optimize your firm's entity schema, attorney biographies, and statutory verdict summaries so AI chatbots recommend your practice first.",
      advantage: "Most legal SEO providers ignore generative engine optimization (GEO/AEO) entirely.",
    },
    {
      icon: ShieldCheck,
      title: "Brand over backlinks",
      desc: "We build your firm and partner attorney entity authority so your rankings remain stable across core algorithm updates.",
      kpi: "Google Knowledge Graph Entity",
      execution: "We align State Bar of Michigan directories, local bar associations, and verified press to establish durable entity nodes Google trusts.",
      advantage: "Zero spam links or rented PBNs that leave law firm domains vulnerable to core algorithm penalties.",
    },
    {
      icon: FileText,
      title: "Bar-rule-aware by default",
      desc: "Claims, client reviews, and case study disclaimers are written specifically in compliance with legal advertising ethics.",
      kpi: "MRPC 7.1–7.3 Bar Compliance",
      execution: "Every practice page includes requisite disclaimers regarding prior results and jurisdiction boundaries compliant with Michigan rules.",
      advantage: "Never risk disciplinary bar inquiries from reckless agency marketing copy.",
    },
    {
      icon: MapPin,
      title: "Detroit-level local depth",
      desc: `Area-specific sub-market pages, GBP signals, and local court citations for Wayne, Oakland, and Macomb County searchers.`,
      kpi: "Tri-County Geo-Fence Relevance",
      execution: "Dedicated architecture covering 36th District Court, Coleman A. Young Municipal Center, and Southfield/Troy corridors.",
      advantage: "Generic agencies treat Metro Detroit as one uniform market and miss suburban caseloads.",
    },
    {
      icon: UserCheck,
      title: "A named strategist",
      desc: "Mubashar Shahzad serves as your dedicated strategic partner — direct founder strategy with zero junior account managers.",
      kpi: "Direct Senior Partnership",
      execution: "Weekly Slack/phone updates and bi-weekly GSC strategy syncs directly with the founder executing your technical architecture.",
      advantage: "No hand-offs to recent college graduates or generic offshore support queues.",
    },
  ];

  const comparisonRows = [
    {
      capability: "Success metric",
      searchprex: "Signed cases and revenue",
      typical: "Rankings and traffic",
      diy: "Whatever you track",
    },
    {
      capability: "Territory exclusivity",
      searchprex: "One firm per practice area",
      typical: "Often serves competing firms",
      diy: "Not applicable",
    },
    {
      capability: "Contract terms",
      searchprex: "Month-to-month",
      typical: "Frequently fixed-term",
      diy: "Salary and tools",
    },
    {
      capability: "Call tracking to signed case",
      searchprex: "CallRail + CRM",
      typical: "Rarely connected",
      diy: "Manual",
    },
    {
      capability: "AI visibility and citation tracking",
      searchprex: "Built into the process",
      typical: "Rarely included",
      diy: "Hard to measure",
    },
    {
      capability: "Brand and entity building",
      searchprex: "Core of the strategy",
      typical: "Link-building focus",
      diy: "Ad hoc",
    },
    {
      capability: "Legal advertising awareness",
      searchprex: "Built into every page",
      typical: "Generic content",
      diy: "Risky without training",
    },
    {
      capability: "Detroit local strategy",
      searchprex: "Area pages, GBP, local mentions",
      typical: "One generic city page",
      diy: "Depends on time available",
    },
    {
      capability: "Reporting",
      searchprex: "Calls to cases, monthly",
      typical: "Position reports",
      diy: "Manual",
    },
  ];

  return (
    <section className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Dark Banner: Our Promise */}
        <div className="rounded-3xl bg-[#0a0f2e] text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a594fd] block">
              OUR PROMISE
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Our Promise to Detroit Law Firms: White-Hat SEO, Bar-Rule Awareness and Monthly Proof
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {promises.map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Why Choose Us (6 Interactive Feature Cards) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
                WHY CHOOSE US · INTERACTIVE EXECUTION PROOF
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
                Why Detroit Law Firms Choose SearchPrex Over a Generic SEO Agency
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                Click any card below to explore our exact implementation methodology, verified law firm KPIs, and competitive advantage.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/why-us"
                className="text-xs font-bold text-[#534AB7] hover:underline underline-offset-4"
              >
                Explore founder philosophy →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {reasons.map((r, idx) => {
              const Icon = r.icon;
              const isExpanded = expandedCard === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                  className={`rounded-2xl border bg-white p-6 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                    isExpanded
                      ? "border-[#534AB7] ring-2 ring-[#534AB7]/30 shadow-md bg-white"
                      : "border-slate-200 shadow-2xs hover:border-[#534AB7]/50 hover:shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        isExpanded ? "bg-[#534AB7] text-white" : "bg-[#EEEDFE] text-[#534AB7]"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                        isExpanded ? "bg-[#534AB7]/10 text-[#534AB7]" : "bg-slate-100 text-slate-500"
                      }`}>
                        <span>{isExpanded ? "Active" : "Inspect"}</span>
                        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-[#0a0f2e] mb-2">
                      {r.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {r.desc}
                    </p>

                    {/* Interactive Expanded Execution Drawer */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs animate-in fade-in duration-200">
                        <div className="rounded-xl bg-[#EEEDFE]/40 p-3 border border-[#534AB7]/20">
                          <span className="font-bold text-[#534AB7] block mb-1">
                            Execution Methodology:
                          </span>
                          <p className="text-slate-700 leading-relaxed">
                            {r.execution}
                          </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                          <span className="font-bold text-slate-900 block mb-1">
                            Why Typical Agencies Fail:
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {r.advantage}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[11px] font-bold text-[#534AB7]">
                          <span>Tracked KPI:</span>
                          <span className="bg-white px-2 py-0.5 rounded border border-[#534AB7]/30">{r.kpi}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>Click to view execution proof</span>
                      <span className="text-[#534AB7]">→</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lower: Comparison Table */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-[#0a0f2e]">
            SearchPrex vs Typical Law Firm SEO Agency vs In-House SEO
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-5 w-[28%] text-white">Capability</th>
                  <th className="py-4 px-5 w-[28%] bg-[#534AB7] text-white font-black">
                    SearchPrex
                  </th>
                  <th className="py-4 px-5 w-[22%] text-slate-200">Typical SEO agency</th>
                  <th className="py-4 px-5 w-[22%] text-slate-200">In-house</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
                  >
                    <td className="py-4 px-5 font-bold text-[#0a0f2e]">
                      {row.capability}
                    </td>
                    <td className="py-4 px-5 font-bold text-[#0a0f2e] bg-amber-50/50">
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{row.searchprex}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      {row.typical}
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      {row.diy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Comparison reflects general industry patterns, not any named agency.
          </p>
        </div>
      </div>
    </section>
  );
}
