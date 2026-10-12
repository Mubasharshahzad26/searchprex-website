'use client';

import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';

export default function ShreveportReliefQuote() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          {/* Subtle Quote Watermark */}
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
                &ldquo;How poor are they that have not patience! What wound did ever heal but by degrees?&rdquo;
              </p>
              <footer className="mt-3 text-xs font-bold tracking-wide text-slate-500 uppercase">
                — William Shakespeare, <cite className="font-normal italic">Othello</cite> (Act II, Scene III)
              </footer>
            </blockquote>

            {/* Editorial Relief Message */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Lifting the Burden of Ark-La-Tex Legal Marketing Anxiety
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Directing a law practice in Northwest Louisiana requires steady resilience. Between managing complex cross-border cases at the Caddo Parish Courthouse, enduring statewide legislative changes, and watching Pay-Per-Click bids climb to unreasonable heights, managing partners face constant pressure. You should not have to endure the persistent stress of unpredictable client acquisition.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                SearchPrex serves as your dependable source of relief. We eliminate the frustration of wasteful advertising clicks and confusing agency retainers by engineering a durable, compounding organic search framework that systematically captures qualified Caddo Parish and Ark-La-Tex retainers month after month.
              </p>
            </div>

            {/* Key Reassurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Transparent month-to-month terms with zero lock-in contracts.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Direct collaboration with senior legal search directors.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Guaranteed practice exclusivity across Caddo Parish and Bossier City.</span>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-medium text-slate-600">
                Ready to replace marketing anxiety with calm, predictable caseload growth?
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
