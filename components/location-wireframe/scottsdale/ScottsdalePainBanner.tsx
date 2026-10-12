'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function ScottsdalePainBanner() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Market Realities in Scottsdale
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Two Traps That Stifle Scottsdale Law Firm Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Managing partners in Scottsdale routinely waste tens of thousands on vanity traffic while failing to sign the high-net-worth clients they built their firm to serve.
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
                  <h3 className="text-lg font-bold text-slate-900">1. Vanity Traffic Without Retainer Value</h3>
                  <p className="text-xs text-slate-500">Thousands of visitors, zero qualified consultations</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                National agencies deliver keyword reports showing rankings for national legal terms. While search volume charts look impressive, your firm receives zero calls from Paradise Valley executives or DC Ranch homeowners looking to retain premium counsel.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Ranking for definitions that attract students rather than high-net-worth clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Treating Scottsdale as a generic Phoenix satellite instead of an elite, independent market.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Ignoring critical Arizona community property statutes (A.R.S. § 25-211) that wealthy clients research.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">The Strategic Solution:</span>
              <Link
                href="/case-studies"
                className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
              >
                View High-Asset Retainer Proof
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Burned by Rigid Agency Lock-Ins */}
          <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">2. Burnt by Inflexible Annual Contracts</h3>
                  <p className="text-xs text-slate-500">Paying \$4,000+ monthly with zero contractual accountability</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                You signed a 12-month agreement with a legacy legal marketing agency. After onboarding, your file was handed to an account coordinator who simultaneously handled three of your direct competitors along Scottsdale Road.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Rigid 12-month handcuffs that shield poor agency performance from cancellation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Zero practice exclusivity—optimizing competing Scottsdale family law firms at the same time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Shallow, generic blog content that damages your reputation with sophisticated local clients.</span>
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
