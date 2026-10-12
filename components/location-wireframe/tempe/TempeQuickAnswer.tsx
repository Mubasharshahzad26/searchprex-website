'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TempeQuickAnswer() {
  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Header pill */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-slate-800 text-xs font-bold border border-slate-300">
              <Bot className="w-3.5 h-3.5 text-neutral-950" />
              AI Overview & Search Extraction
            </span>
            <span className="text-xs text-slate-500 font-medium">
              AEO & LLM Citation Architecture
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Quick Answer: How Tempe Law Firm SEO Captures High-Value Cases
          </h2>

          {/* Answer-first primary paragraph */}
          <p className="text-base text-slate-800 font-medium leading-relaxed mb-5 pb-5 border-b border-slate-200">
            Tempe law firm SEO secures top positions in Google's local 3-Pack and generative AI search engines for high-intent queries such as "Extreme DUI lawyer Tempe" and "ASU student defense attorney", capturing retained clients at the exact moment of legal distress before Phoenix competitors can intervene.
          </p>

          {/* Three Key Execution Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">1. Proximity Geofencing</p>
              <p className="text-xs text-slate-600">
                Aligning Google Business Profile primary categories and East Valley geotags directly with Tempe Municipal Court.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">2. Statutory Silo Design</p>
              <p className="text-xs text-slate-600">
                Engineering deep content hubs matching Arizona Revised Statutes (A.R.S. § 28-1382, § 25-211) that AI algorithms quote directly.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">3. Mobile Speed UX</p>
              <p className="text-xs text-slate-600">
                Sub-second load speeds and one-touch intake funnels optimized for late-night emergency arrests and accident victims.
              </p>
            </div>
          </div>

          {/* Author Attribution & Internal Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-300">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, Law Firm SEO Director"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900">Mubashar Sharif</p>
                <p className="text-[11px] text-slate-500">Legal Search Strategist & Founder, SearchPrex</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/tools/ai-search"
                className="font-semibold text-neutral-950 hover:text-neutral-950 inline-flex items-center gap-1"
              >
                Explore AI Search Tracking
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
