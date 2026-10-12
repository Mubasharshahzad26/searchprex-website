'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ScottsdaleProblemTable() {
  const teardownRows = [
    {
      symptom: "Receiving low-retainer inquiries rather than high-net-worth North Scottsdale clients.",
      diagnosis: "Content focuses on generic definitions rather than sophisticated community property and asset division topics (A.R.S. § 25-211).",
      fix: "Deploy high-asset statutory hubs detailing business equity, executive stock options, and private trust structures.",
    },
    {
      symptom: "Phoenix law firms outrank your local office for 'Scottsdale divorce lawyer' searches.",
      diagnosis: "Your Google Business Profile lacks localized entity geotags, citation consistency, and local court relationships.",
      fix: "Execute hyper-local Maricopa County citation sync and build statutory content silos directly referencing Scottsdale City Court.",
    },
    {
      symptom: "Google Ads budget burns out rapidly at $310+ per click with zero equity.",
      diagnosis: "Bidding on broad keywords against venture-backed national conglomerates and aggregator networks.",
      fix: "Transition ad spend into permanent organic equity, dominating high-intent long-tail phrases that cost nothing per click.",
    },
    {
      symptom: "Map Pack rankings collapse outside a 1-mile perimeter of your physical office.",
      diagnosis: "Weak localized geographic signals fail to project Google Maps centroid proximity across North Scottsdale and DC Ranch.",
      fix: "Engineer localized submarket pages for Old Town, Gainey Ranch, DC Ranch, and Silverleaf with unique jurisdictional schema.",
    },
    {
      symptom: "ChatGPT and Google AI Overviews cite Justia or FindLaw instead of your attorneys.",
      diagnosis: "Legal content is formatted as dense narrative prose without structured answer-first schema or extractable bulleted standards.",
      fix: "Implement Answer Engine Optimization (AEO) with direct statutory definitions, legal Q&A blocks, and verified schema markup.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Technical Diagnosis Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Why Scottsdale Law Firm Websites Fail (And How We Fix Them)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A granular comparison between superficial agency excuses and the architectural solutions that produce signed retainers.
          </p>
        </div>

        {/* Semrush-Style Responsive Data Table */}
        <div className="overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <th className="py-4 px-6 w-1/3">What You Experience (Symptom)</th>
                  <th className="py-4 px-6 w-1/3">Root Technical Cause (Diagnosis)</th>
                  <th className="py-4 px-6 w-1/3 text-neutral-950">SearchPrex Fix (Engineered Solution)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                {teardownRows.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 align-top">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-slate-500">{index + 1}.</span>
                        <span>{row.symptom}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 align-top bg-slate-50/40">
                      {row.diagnosis}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900 align-top">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-neutral-950">•</span>
                        <span>{row.fix}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            Want to see exactly where your Scottsdale website is losing cases to Phoenix competitors?
          </p>
          <Link
            href="/tools/serp-checker"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-neutral-950 shrink-0"
          >
            Run Instant SERP Diagnostic
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
