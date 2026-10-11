'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, BookOpen, Scale, CheckCircle2 } from 'lucide-react';

export default function WoodlandsQuickAnswer() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#534AB7] via-indigo-400 to-emerald-500" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-[#534AB7]" />
              Quick Answer for Google AI Overviews & Search Engines
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What Is Law Firm SEO in The Woodlands, TX?
            </h2>

            <div className="text-base text-slate-700 leading-relaxed space-y-3">
              <p>
                <strong>Law firm SEO in The Woodlands</strong> is the specialized practice of optimizing a legal firm's digital footprint so it appears prominently in Google's Local 3-Pack, organic rankings, and generative AI engines (ChatGPT, Google AI Overviews, Perplexity) when affluent residents search for legal representation in The Woodlands, Montgomery County, and Harris County.
              </p>
              <p className="text-sm text-slate-600">
                Because The Woodlands is not an incorporated city but a master-planned community divided across <strong>Montgomery County (courts in Conroe, ~90%)</strong> and <strong>Harris County (Creekside Park village, courts in Houston)</strong>, effective SEO requires distinct county venue silos, dedicated village-level pages (Alden Bridge, Sterling Ridge, Cochran's Crossing), and answer-first coverage of high-asset estates, executive compensation, and Texas Family Code procedures.
              </p>
            </div>

            {/* Jump links */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Quick Navigation & Page Sections
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <a
                  href="#county-courts"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-[#534AB7] border border-slate-200 transition-colors"
                >
                  Montgomery vs Harris Venues
                </a>
                <a
                  href="#villages"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-[#534AB7] border border-slate-200 transition-colors"
                >
                  8 Woodlands Villages
                </a>
                <a
                  href="#emotional-intent"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-[#534AB7] border border-slate-200 transition-colors"
                >
                  Client Emotional Intent
                </a>
                <a
                  href="#keywords"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-[#534AB7] border border-slate-200 transition-colors"
                >
                  Texas Semantic Keywords
                </a>
                <a
                  href="#pricing"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-[#534AB7] border border-slate-200 transition-colors"
                >
                  Transparent Pricing & Guarantee
                </a>
              </div>
            </div>
          </div>

          {/* Attribution Box */}
          <div className="shrink-0 w-full lg:w-72 rounded-xl bg-slate-50 border border-slate-200/80 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200 shrink-0">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Mubashar Sharif</div>
                <div className="text-xs text-indigo-700 font-medium">CEO & Principal Strategist</div>
                <div className="text-[11px] text-slate-500">SearchPrex Legal Advisory</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              "Affluent Woodlands searchers cross-examine your reputation with AI assistants before picking up the phone. If your firm lacks structured statutory content and village signals, those cases default to large Houston firms."
            </p>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Legal Strategy
              </span>
              <span>Updated Oct 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
