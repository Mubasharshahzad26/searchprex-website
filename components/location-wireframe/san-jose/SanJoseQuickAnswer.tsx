'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, ArrowRight } from 'lucide-react';

export default function SanJoseQuickAnswer() {
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
            Quick Answer: How San Jose Law Firm SEO Secures High-Value Tech Retainers
          </h2>

          {/* Answer-first primary paragraph */}
          <p className="text-base text-slate-800 font-medium leading-relaxed mb-5 pb-5 border-b border-slate-200">
            San Jose law firm SEO secures top placement in Google&apos;s local 3-Pack and generative AI engines for high-intent queries such as &ldquo;San Jose tech employment attorney&rdquo; and &ldquo;Silicon Valley RSU divorce lawyer,&rdquo; capturing high-income Santa Clara County retainers before San Francisco mega-firms can outspend you.
          </p>

          {/* Three Key Execution Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">1. South Bay Entity Authority</p>
              <p className="text-xs text-slate-600">
                Optimizing Google Business Profile signals directly across San Jose, Sunnyvale, Cupertino, and Mountain View.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">2. California Statutory Depth</p>
              <p className="text-xs text-slate-600">
                Building authoritative hubs for Cal. Bus. & Prof. Code § 16600 (non-competes) and Huggins/Nelson RSU division formulas.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">3. Executive Intake Design</p>
              <p className="text-xs text-slate-600">
                Discrete, sub-second conversion funnels tailored for corporate executives, founders, and engineers seeking private counsel.
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
