'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function SanJosePainBanner() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Market Realities in Silicon Valley
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Two Traps That Stagnate San Jose Law Firm Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Managing partners in Santa Clara County waste substantial budgets fighting generic San Francisco competitors while missing hyper-local tech retainers.
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
                  <h3 className="text-lg font-bold text-slate-900">1. San Francisco Out-of-Market Conglomerates</h3>
                  <p className="text-xs text-slate-500">Broad Bay Area traffic with zero South Bay local intent</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                Large San Francisco firms rank for broad California terms based solely on historical domain age. However, when a tech director in Sunnyvale or an executive in Cupertino searches for local counsel, they bypass generic San Francisco directories to find immediate South Bay representation.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Treating San Jose as a secondary suburb of San Francisco rather than an independent tech legal market.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Ignoring critical California statutes including the non-compete voidance under Cal. Bus. & Prof. Code § 16600.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Failing to target high-income submarkets like Cupertino, Mountain View, and Palo Alto.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">The Strategic Solution:</span>
              <Link
                href="/case-studies"
                className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
              >
                View High-Yield Tech Retainer Proof
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
                  <h3 className="text-lg font-bold text-slate-900">2. Burnt by 12-Month Vendor Contracts</h3>
                  <p className="text-xs text-slate-500">Locked into costly agreements with zero accountability</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                You paid \$4,500+ per month to a legacy agency that promised Silicon Valley domination. They delegated your account to offshore content mills that published generic AI blogs with zero comprehension of Santa Clara County court filings or tech compensation.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Rigid 12-month lock-in contracts that prevent you from holding the agency accountable for results.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Simultaneously taking retainers from your direct San Jose competitors in the same practice specialty.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Zero technical expertise regarding Silicon Valley RSU valuation models or trade secret preliminary injunctions.</span>
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
