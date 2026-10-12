'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function TempePainBanner() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Current Legal Marketing Reality
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Two Traps That Stagnate Tempe Law Firm Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Most managing partners in Maricopa County find themselves trapped between opaque marketing promises and the sunk cost of failed past agencies.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Confusion & Vanity Metrics */}
          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">1. Agency Obfuscation & Vanity Metrics</h3>
                  <p className="text-xs text-slate-500">Impressions without signed client retainers</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                Generalist agencies send monthly PDF reports packed with impressions, clicks, and keyword jumps for meaningless terms. When you ask why your phone is not ringing with qualified retainers, they cite vague algorithmic timelines while continuing their monthly invoice.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Reporting ranking gains for national legal definitions that never generate paying clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Treating Tempe as a mere suburb of Phoenix without building local court citations or East Valley silos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Hiding technical site flaws behind vanity metrics instead of verifying qualified telephone intake.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">The Strategic Solution:</span>
              <Link
                href="/case-studies"
                className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
              >
                View Verifiable Retainer Proof
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Burned by Prior SEO Agencies */}
          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">2. Burnt by 12-Month Vendor Contracts</h3>
                  <p className="text-xs text-slate-500">Locked into costly agreements with zero accountability</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                You invested \$3,000+ per month for a year with a corporate vendor who delegated your account to offshore juniors. They published generic AI blog posts that violated Arizona State Bar compliance guidelines and failed to outrank Phoenix legal aggregators.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Rigid 12-month non-refundable contracts that protect the agency rather than deliver results.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Simultaneously taking payments from your direct Tempe competitors across the exact same practice area.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Zero technical expertise regarding Arizona Revised Statutes or Maricopa County court filings.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">The Strategic Solution:</span>
              <Link
                href="/about"
                className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
              >
                Meet Founder Mubashar Sharif
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
