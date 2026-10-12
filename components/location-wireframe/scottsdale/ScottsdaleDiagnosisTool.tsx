'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function ScottsdaleDiagnosisTool() {
  const [practice, setPractice] = useState('divorce');
  const [targetRadius, setTargetRadius] = useState('north-scottsdale');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const metrics: Record<string, { lostClicks: number; estRetainers: number; adSavings: string }> = {
    divorce: { lostClicks: 380, estRetainers: 5, adSavings: '$28,400/mo' },
    dui: { lostClicks: 340, estRetainers: 6, adSavings: '$19,200/mo' },
    estate: { lostClicks: 270, estRetainers: 4, adSavings: '$14,600/mo' },
    injury: { lostClicks: 430, estRetainers: 4, adSavings: '$36,800/mo' },
  };

  const currentMetric = metrics[practice] || metrics.divorce;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="reality-check-form" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Interactive Growth Simulator
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Scottsdale Law Firm Search Opportunity Diagnosis
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Evaluate high-net-worth Maricopa County search traffic currently captured by out-of-market Phoenix law firms and national directories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Configuration */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#4338ca]" />
              Step 1: Configure Practice Parameters
            </h3>

            <div className="space-y-5">
              {/* Practice selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Legal Specialty
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'divorce', label: 'High-Asset Divorce' },
                    { id: 'dui', label: 'Old Town DUI' },
                    { id: 'estate', label: 'Estates & Trusts' },
                    { id: 'injury', label: 'Personal Injury' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPractice(p.id)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                        practice === p.id
                          ? 'bg-[#4338ca] text-white border-[#4338ca]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Geographic Scope */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Target Geographic Footprint
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'old-town', label: 'Old Town & Central' },
                    { id: 'north-scottsdale', label: 'North Scottsdale & DC Ranch' },
                    { id: 'pv-scottsdale', label: 'Scottsdale + Paradise Valley' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setTargetRadius(g.id)}
                      className={`p-2.5 rounded-lg text-xs font-semibold border transition-all text-left ${
                        targetRadius === g.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="pt-4 border-t border-slate-200 space-y-4">
                <div>
                  <label htmlFor="firm-website" className="block text-xs font-semibold text-slate-700 mb-1">
                    Firm Website URL
                  </label>
                  <input
                    id="firm-website"
                    type="text"
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://yourscottsdalefirm.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4338ca]/30 focus:border-[#4338ca] text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="firm-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Partner Email (for Confidential Report)
                  </label>
                  <input
                    id="firm-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@yourscottsdalefirm.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#4338ca]/30 focus:border-[#4338ca] text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-white bg-[#4338ca] hover:bg-[#3730a3] transition-all shadow-sm flex items-center justify-center gap-2 mt-2 disabled:bg-slate-400"
                >
                  {submitted ? (
                    <span>Diagnosis Request Received - Audit In Progress</span>
                  ) : (
                    <>
                      <span>Generate Full 24-Hour Competitive Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Zero sales pressure. Handled exclusively by senior search strategists under strict attorney confidentiality.
                </p>
              </form>
            </div>
          </div>

          {/* Right Column: Instant Projected Diagnostics */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Estimated Market Yield</span>
              <span className="text-xs font-bold text-[#4338ca] uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Live Model
              </span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-600">Uncaptured High-Intent Searches / Month</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{currentMetric.lostClicks}+</p>
                <p className="text-[11px] text-slate-500 mt-1">Currently claimed by Phoenix multi-location directories.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-600">Projected High-Value Monthly Retainers</p>
                <p className="text-3xl font-extrabold text-[#4338ca] mt-1">{currentMetric.estRetainers} - {currentMetric.estRetainers + 3} Retainers</p>
                <p className="text-[11px] text-slate-500 mt-1">Based on local 3-Pack top-tier placement.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-600">Equivalent PPC Ad Auction Cost</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{currentMetric.adSavings}</p>
                <p className="text-[11px] text-slate-500 mt-1">What you would spend on Google Ads to buy this traffic.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-900">What Happens in Your Full 24-Hr Tear-Down:</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Direct analysis of your current Scottsdale City Court keyword positions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Google Business Profile proximity radius check across 85251, 85255, and 85258.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Specific statutory gap identification for A.R.S. § 25-211 and § 28-1382.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
