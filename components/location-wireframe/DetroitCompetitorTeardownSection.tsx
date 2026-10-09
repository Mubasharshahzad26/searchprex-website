"use client";

// components/location-wireframe/DetroitCompetitorTeardownSection.tsx
//
// Matches Page 7:
// 1. "COMPETITOR TEARDOWN (SAMPLE): See exactly why they outrank you" (Data comparison table)
// 2. Dark card (#0a0f2e): "FREE AUDIT: Check where your firm ranks in Detroit" with instant submit form.

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldAlert, BarChart3, AlertCircle } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitCompetitorTeardownSection({ page }: { page: CityPage }) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const teardownMetrics = [
    {
      metric: "Map Pack position",
      yourFirm: "Unranked (#18)",
      competitor: "#2 (Downtown Pack)",
      gap: "Lost Map Pack phone calls",
      status: "danger",
    },
    {
      metric: "Google reviews",
      yourFirm: "14 reviews (4.2 ★)",
      competitor: "88 reviews (4.9 ★)",
      gap: "+74 review trust deficit",
      status: "danger",
    },
    {
      metric: "Practice pages",
      yourFirm: '1 generic "Practice Areas" page',
      competitor: "12 localized statutory silos",
      gap: "Zero statutory search relevance",
      status: "danger",
    },
    {
      metric: "Referring domains",
      yourFirm: "32 domains",
      competitor: "140 domains",
      gap: "Missing State Bar & Wayne Co. links",
      status: "danger",
    },
    {
      metric: "Core Web Vitals (mobile)",
      yourFirm: "Fail (4.2s LCP)",
      competitor: "Pass (1.8s LCP)",
      gap: "Mobile UX ranking penalty",
      status: "danger",
    },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!website || !email) return;
    setSubmitted(true);
  }

  return (
    <section id="competitor-teardown" className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: Competitor Teardown Sample Table */}
        <div className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
              COMPETITOR TEARDOWN (SAMPLE)
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
              See exactly why they outrank you
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              A sample of what you receive within 24 hours: real data on the firms outranking you in {page.city}, their citation footprint, and your exact ranking gap.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-5 w-[28%] text-white">Metric</th>
                  <th className="py-4 px-5 w-[24%] text-slate-300">Your Firm</th>
                  <th className="py-4 px-5 w-[24%] text-white font-bold">Top Competitor</th>
                  <th className="py-4 px-5 w-[24%] bg-[#534AB7] text-white font-black">
                    Competitive Gap
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {teardownMetrics.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
                  >
                    <td className="py-4 px-5 font-bold text-[#0a0f2e]">
                      {row.metric}
                    </td>
                    <td className="py-4 px-5 text-slate-600">
                      {row.yourFirm}
                    </td>
                    <td className="py-4 px-5 font-semibold text-[#0a0f2e]">
                      {row.competitor}
                    </td>
                    <td className="py-4 px-5 font-bold text-rose-700 bg-rose-50/40">
                      {row.gap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Sample format based on real Wayne County law firm diagnostic teardowns.
          </p>
        </div>

        {/* Lower: Free Audit Lead Capture Card */}
        <div className="rounded-3xl bg-[#0a0f2e] text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a594fd] block">
                FREE AUDIT
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
                Check where your firm ranks in {page.city}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                Send your website URL. Mubashar Sharif will audit your Google Business Profile and the firms outranking you in {page.county} within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-6 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Audit Request Received</h4>
                <p className="text-xs text-slate-300">
                  We are running your {page.city} competitor teardown now. Check your inbox within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 max-w-lg mx-auto">
                <div className="text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Firm website
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="yourfirm.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#534AB7] focus:outline-none"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@yourfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#534AB7] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] py-3.5 text-sm font-bold text-white shadow-md transition-colors cursor-pointer"
                >
                  <span>Show My Ranking</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] text-slate-400 pt-1">
                  No spam. Report delivered personally within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
