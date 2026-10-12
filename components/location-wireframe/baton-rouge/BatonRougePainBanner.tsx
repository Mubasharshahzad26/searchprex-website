'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function BatonRougePainBanner() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Market Realities in the Capital Area
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Two Traps That Stagnate Baton Rouge Law Firm Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Managing partners in East Baton Rouge Parish burn substantial marketing budgets fighting New Orleans billboard giants while missing hyper-local parish retainers.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Out-of-Parish Aggregators */}
          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">1. Out-of-Parish New Orleans Mega-Agencies</h3>
                  <p className="text-xs text-slate-500">Broad Louisiana ad spend with zero 19th JDC relevance</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                Large New Orleans law firms bid aggressively on broad Louisiana legal terms using legacy domain authority. However, when an injured plant worker in West Baton Rouge or a commuter on I-12 searches for immediate counsel, they want an established local Baton Rouge attorney who knows the 19th Judicial District Court.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Treating East Baton Rouge as a secondary branch market rather than an independent legal epicenter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Publishing outdated common-law articles that ignore Louisiana Civil Code art. 3493.1 prescription rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Failing to capture high-volume search clusters across Gonzales, Denham Springs, and Port Allen.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">The Strategic Solution:</span>
              <Link
                href="/case-studies"
                className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
              >
                View Capital Area Retainer Proof
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Burned by Rigid Annual Contracts */}
          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">2. Burnt by 12-Month Rigid Agency Contracts</h3>
                  <p className="text-xs text-slate-500">Locked into costly vendor retainers with zero accountability</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                You paid $3,500+ per month to a national legal agency that promised Capital Area domination. Instead, they handed your account to junior coordinators who published boilerplate blogs with zero knowledge of Louisiana civil law or local parish procedures.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Rigid 12-month lock-in contracts that eliminate vendor accountability and prevent course correction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Simultaneously taking fees from your direct Baton Rouge competitors in the same practice specialty.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Zero comprehension of Louisiana Civil Code comparative fault reforms (art. 2323 51% bar) or successions.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">The Strategic Solution:</span>
              <a
                href="#pricing"
                className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
              >
                Inspect Month-to-Month Terms
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
