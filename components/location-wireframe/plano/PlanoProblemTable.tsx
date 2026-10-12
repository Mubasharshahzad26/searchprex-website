'use client';

import React from 'react';
import { AlertTriangle, Wrench, CheckCircle2 } from 'lucide-react';

export default function PlanoProblemTable() {
  const rows = [
    {
      see: 'Traffic is low or not growing',
      cause: 'Pages not indexed, thin practice pages, pages competing for the same search without Collin County silo hierarchy.',
      fix: 'Technical audit, practice-page map for Plano and Collin County, and deep topical internal linking.',
    },
    {
      see: 'Low visibility on Google and AI',
      cause: 'Weak Google Business Profile entity signals, missing LegalService schema, no answer-first architecture.',
      fix: 'GBP entity tune-up, LegalService & FAQPage schema, llms.txt deployment, and structured answer blocks.',
    },
    {
      see: 'Citations and mentions missing',
      cause: 'Inconsistent NAP data, missing Collin County Bar profiles, lack of trusted local business mentions.',
      fix: 'Full citation cleanup, State Bar of Texas synchronization, and legal directory tier-1 profiles.',
    },
    {
      see: 'Not ranking in the Map Pack',
      cause: 'Wrong GBP primary categories, few recent verified reviews, weak geo-signals for West Plano/Frisco.',
      fix: 'Category refinement, compliant ethical review collection flow, and localized geo-grid tracking.',
    },
    {
      see: 'Targeting the wrong keywords',
      cause: 'Broad vanity searches like "lawyer Texas" with no Collin County or submarket modifier.',
      fix: 'Intent-based keyword map targeting long-tail searches that bring clients ready to hire.',
    },
    {
      see: 'Leads are not qualified',
      cause: 'Intake flooded with low-asset inquiries, no call tracking, and zero lead qualification filters.',
      fix: 'High-asset case targeting, CallRail tracking, call scoring, and intake qualification workflows.',
    },
    {
      see: 'Intake is slow or leaking',
      cause: 'Missed calls after-hours, slow email response times, no automated SMS follow-up.',
      fix: 'Intake review, missed-call text-back automation, form routing, and instant consultation booking.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 text-neutral-900 border border-slate-200 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-neutral-900" />
            Intake Diagnosis & Resolution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Why Plano Firms Pay More for PPC and Still Miss Cases
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Tell us which of these sounds like your firm, and we will show you the exact technical and operational fix.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  <th className="py-4 px-6 w-1/4">What You See</th>
                  <th className="py-4 px-6 w-1/3">Probable Cause</th>
                  <th className="py-4 px-6">Our Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-neutral-950 align-top">
                      {row.see}
                    </td>
                    <td className="py-4 px-6 text-slate-600 align-top leading-relaxed">
                      {row.cause}
                    </td>
                    <td className="py-4 px-6 text-slate-900 align-top leading-relaxed font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                        <span>{row.fix}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
