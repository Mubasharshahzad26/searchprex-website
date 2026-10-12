'use client';

import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';

export default function ScottsdaleReliefQuote() {
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
                &ldquo;Uneasy lies the head that wears a crown.&rdquo;
              </p>
              <footer className="mt-3 text-xs font-bold tracking-wide text-slate-500 uppercase">
                — William Shakespeare, <cite className="font-normal italic">Henry IV, Part 2</cite> (Act III, Scene I)
              </footer>
            </blockquote>

            {/* Editorial Relief Message */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Lifting the Burden of High-Stakes Marketing Stress
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Leading an elite Scottsdale law practice carries a heavy mantle. You guide high-profile clients through sensitive community property divisions, defend complex allegations, and shoulder the overhead of a premier firm. You should not have to carry the restless anxiety of fluctuating Google algorithm updates or predatory marketing retainers on top of it.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                SearchPrex is designed to provide immediate relief. We take full ownership of your technical visibility, eliminating the guesswork and delivering a steady, predictable flow of qualified Maricopa County client retainers so you can focus exclusively on advocacy.
              </p>
            </div>

            {/* Key Reassurance Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Transparent monthly agreements with zero lock-in contracts.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Direct partner collaboration with senior technical directors.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900">•</span>
                <span>Guaranteed practice exclusivity across Scottsdale and Paradise Valley.</span>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-medium text-slate-600">
                Ready to replace marketing uncertainty with calm, predictable caseload growth?
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
