'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Building2, Search } from 'lucide-react';

export default function PlanoDiagnosisTool() {
  const [website, setWebsite] = useState('');
  const [practice, setPractice] = useState('executive-divorce');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="reality-check-form" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#534AB7]/10 text-[#534AB7] border border-[#534AB7]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Collin County Practice Audit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Get Your Free Plano SEO Reality Check
          </h2>
          <p className="mt-3 text-base text-slate-600">
            See where your firm is leaking leads to Dallas directories, which Collin County submarket pages you are missing, and where AI assistants cite your competitors first.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a0f2e]">Reality Check Received!</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Mubashar Sharif will personally audit your Plano and Collin County presence and send your bespoke action plan within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="website" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Law Firm Website URL
                  </label>
                  <div className="relative">
                    <input
                      id="website"
                      type="text"
                      required
                      placeholder="e.g., www.planofamilylawyer.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:border-transparent transition"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Direct Email (For Audit Delivery)
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="partner@yourfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Practice Area
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'executive-divorce', label: 'Executive Divorce' },
                    { id: 'business-immigration', label: 'Business Immigration' },
                    { id: 'estate-planning', label: 'Estate & Trust' },
                    { id: 'criminal-defense', label: 'Criminal / DWI' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPractice(item.id)}
                      className={`px-4 py-3 rounded-xl text-xs font-semibold border transition text-center ${
                        practice === item.id
                          ? 'bg-[#534AB7] text-white border-[#534AB7] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* What the audit covers */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <p className="font-bold text-slate-800">Included in your 24-hour Reality Check:</p>
                <div className="grid sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Collin County Map Pack rankings</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>AI Overviews & ChatGPT mentions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Missing Frisco/Allen/McKinney hubs</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>No credit card required · 100% confidential under NDA</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#534AB7] hover:bg-[#3C3489] transition-all shadow-md shadow-indigo-900/30 hover:shadow-indigo-900/50"
                >
                  {isSubmitting ? (
                    'Generating Analysis...'
                  ) : (
                    <>
                      <span>Generate My Plano Reality Check</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
