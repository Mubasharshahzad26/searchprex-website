'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function ShreveportDiagnosisTool() {
  const [practice, setPractice] = useState('injury');
  const [targetRadius, setTargetRadius] = useState('caddo-core');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const metrics: Record<string, { lostClicks: number; estRetainers: number; adSavings: string }> = {
    injury: { lostClicks: 390, estRetainers: 5, adSavings: '$24,800/mo' },
    arklatex: { lostClicks: 270, estRetainers: 4, adSavings: '$19,400/mo' },
    succession: { lostClicks: 240, estRetainers: 4, adSavings: '$15,600/mo' },
    family: { lostClicks: 310, estRetainers: 5, adSavings: '$18,200/mo' },
  };

  const currentMetric = metrics[practice] || metrics.injury;

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
            Shreveport Law Firm Search Opportunity Diagnosis
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Evaluate high-intent Caddo Parish and Ark-La-Tex legal search traffic currently siphoned away by distant South Louisiana firms and generic directories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Configuration */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-neutral-950" />
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
                    { id: 'injury', label: 'Freeway Truck Injury' },
                    { id: 'arklatex', label: 'Ark-La-Tex Cross-Border' },
                    { id: 'succession', label: 'Succession & Estates' },
                    { id: 'family', label: 'Family & Divorce' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPractice(p.id)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                        practice === p.id
                          ? 'bg-neutral-900 text-white border-neutral-900'
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
                    { id: 'caddo-core', label: 'Shreveport Core & Caddo Parish' },
                    { id: 'bossier-crossover', label: 'Shreveport-Bossier Metro' },
                    { id: 'arklatex-region', label: 'Tri-State Ark-La-Tex Corridor' },
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

              {/* URL & Email Input */}
              <form onSubmit={handleSubmit} className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label htmlFor="shv-firm-url" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Law Firm Website URL
                  </label>
                  <input
                    id="shv-firm-url"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="e.g. www.shreveportlawfirm.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="shv-firm-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Managing Partner Work Email
                  </label>
                  <input
                    id="shv-firm-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@firm.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#171717] focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-150 shadow-md shadow-slate-100"
                >
                  Generate Northwest Louisiana Search Diagnosis
                </button>
              </form>

              {submitted && (
                <div className="p-4 bg-slate-200 border border-slate-200 rounded-lg text-xs text-slate-200">
                  <p className="font-bold mb-1">Diagnosis Request Received</p>
                  <p>Our senior legal strategist is analyzing your domain against top Shreveport competitors and will deliver your complete audit to {email} within 24 hours.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Projections Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Step 2: Ark-La-Tex Projection</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Estimated Recoverable Search Value
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Estimated monthly organic opportunity for top 3 Google Map Pack placement in Caddo Parish.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Monthly Lost Legal Clicks</span>
                  <span className="text-2xl font-bold text-slate-900">{currentMetric.lostClicks} clicks/mo</span>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
                  High-Intent
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Estimated Retained Caseload</span>
                  <span className="text-2xl font-bold text-neutral-950">+{currentMetric.estRetainers} retainers/mo</span>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
                  Qualified
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Equivalent Google Ads Ad Spend</span>
                  <span className="text-2xl font-bold text-slate-900">{currentMetric.adSavings}</span>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
                  Saved Budget
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">Why Organic Beats Paid Ads in Shreveport:</p>
              <p>
                Northwest Louisiana clients dealing with serious injury collisions or family estate successions deliberately bypass paid ads to hire reputable local counsel with verified Google 3-Pack authority.
              </p>
            </div>

            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
            >
              Explore Transparent Retainer Plans
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
