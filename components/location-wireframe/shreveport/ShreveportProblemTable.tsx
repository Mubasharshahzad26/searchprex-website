'use client';

import React from 'react';
import { Table, ArrowRight } from 'lucide-react';

export default function ShreveportProblemTable() {
  const issues = [
    {
      symptom: "Losing Map Pack placement to distant South Louisiana firms",
      cause: "Weak local Caddo Parish geo-signals and unoptimized Google Business Profile primary categories.",
      solution: "Hyper-localized Caddo Parish citation network and geocoded 1st JDC venue proximity signals.",
    },
    {
      symptom: "Ark-La-Tex border residents bounce without contacting",
      cause: "Confusing common-law content that fails to answer multi-state cross-border jurisdiction questions.",
      solution: "Authoritative tri-state comparison hubs contrasting Louisiana, Texas, and Arkansas deadlines.",
    },
    {
      symptom: "Exhausted ad budgets on $210+ PPC clicks",
      cause: "Bidding against deep-pocketed statewide billboard firms on broad Louisiana injury search terms.",
      solution: "Owned organic search framework that captures high-intent Northwest Louisiana searches at zero cost-per-click.",
    },
    {
      symptom: "Zero visibility in Google AI Overviews and ChatGPT",
      cause: "Unstructured, rambling blog content lacking direct answers and structured LegalService Schema.",
      solution: "Direct answer-first paragraph structuring and JSON-LD schema formatted for immediate LLM citation.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Systemic Diagnosis
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Shreveport Law Firm SEO Diagnosis: Why Standard Marketing Fails
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A granular comparison between standard agency failure points and SearchPrex&apos;s proprietary legal engineering methodology in Northwest Louisiana.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-[#4338ca]" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Technical Failure vs. SearchPrex Engineering Fix
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">Audit Protocol v4.2</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Symptom</th>
                  <th className="py-3 px-4 sm:px-6">Root Cause</th>
                  <th className="py-3 px-4 sm:px-6">SearchPrex Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {issues.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 align-top">
                      {row.symptom}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 align-top">
                      {row.cause}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#4338ca] font-medium align-top">
                      {row.solution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <span>Want a customized technical teardown of your Shreveport law firm website?</span>
            <a
              href="#reality-check-form"
              className="inline-flex items-center gap-1.5 font-bold text-[#4338ca] hover:text-[#3730a3]"
            >
              Request Firm Teardown
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
