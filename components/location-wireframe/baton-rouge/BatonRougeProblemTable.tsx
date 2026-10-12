'use client';

import React from 'react';
import { Table, ArrowRight } from 'lucide-react';

export default function BatonRougeProblemTable() {
  const issues = [
    {
      symptom: "Losing Map Pack placement to out-of-parish New Orleans firms",
      cause: "Weak local East Baton Rouge geo-signals and unoptimized Google Business Profile primary categories.",
      solution: "Hyper-localized East Baton Rouge Parish citation network and geocoded 19th JDC venue proximity signals.",
    },
    {
      symptom: "Website traffic doesn't convert into signed retainers",
      cause: "Outdated common-law terminology and lack of Louisiana Civil Code statutory answers.",
      solution: "Authoritative Civil Code content silos citing art. 3493.1 prescription and art. 2323 comparative fault.",
    },
    {
      symptom: "Exhausted ad budgets on $260+ PPC clicks",
      cause: "Relying strictly on Google Ads auctions dominated by multi-million dollar statewide billboard firms.",
      solution: "Owned organic search framework that captures high-intent Capital Area searches at zero cost-per-click.",
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
            Baton Rouge Law Firm SEO Diagnosis: Why Standard Marketing Fails
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A granular comparison between standard agency failure points and SearchPrex&apos;s proprietary legal engineering methodology in East Baton Rouge Parish.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-neutral-950" />
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
                    <td className="py-4 px-4 sm:px-6 text-neutral-950 font-medium align-top">
                      {row.solution}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <span>Want a customized technical teardown of your Baton Rouge law firm website?</span>
            <a
              href="#reality-check-form"
              className="inline-flex items-center gap-1.5 font-bold text-neutral-950 hover:text-neutral-950"
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
