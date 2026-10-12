'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TempeReliefQuote() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          {/* Subtle Quote Icon Watermark */}
          <div className="absolute top-4 right-6 text-slate-200 pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="relative z-10">
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white border border-slate-300 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-6">
              A Reassuring Standard of Excellence
            </div>

            {/* Shakespeare Quote */}
            <blockquote className="mb-6">
              <p className="text-xl sm:text-2xl font-serif italic text-slate-900 leading-snug">
                &ldquo;Our doubts are traitors, and make us lose the good we oft might win, by fearing to attempt.&rdquo;
              </p>
              <footer className="mt-3 text-xs font-bold tracking-wide text-slate-500 uppercase">
                — William Shakespeare, <cite className="font-normal italic">Measure for Measure</cite> (Act I, Scene IV)
              </footer>
            </blockquote>

            {/* Editorial Relief Message */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Your Source of Relief from Legal Marketing Burnout
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                For Tempe law firm partners exhausted by escalating Google Ads auction prices, volatile monthly inquiries, and opaque agency retainers, SearchPrex provides total clarity and peace of mind. We eliminate the constant dread of an empty intake calendar by establishing an owned, defensible organic presence that produces high-value Maricopa County retainers month after month.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                You went to law school to counsel clients, negotiate settlements, and advocate in the courtroom—not to troubleshoot Google algorithm updates or decode inflated agency analytics. SearchPrex shoulders the full technical weight of your practice&apos;s inbound pipeline.
              </p>
            </div>

            {/* Key Reassurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Fixed monthly fee with zero hidden management markups.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Direct access to your senior strategist, not account reps.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Guaranteed practice exclusivity across the Tempe market.</span>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-medium text-slate-600">
                Ready to replace marketing anxiety with predictable caseload growth?
              </span>
              <a
                href="#reality-check-form"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-neutral-950"
              >
                Schedule Your Diagnostic Review
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
