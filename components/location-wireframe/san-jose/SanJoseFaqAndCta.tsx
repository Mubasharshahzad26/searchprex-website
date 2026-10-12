'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import type { CityFaq } from '@/lib/city-pages';
import TaglinePainBand from '@/components/location-wireframe/TaglinePainBand';

interface SanJoseFaqAndCtaProps {
  faqs?: CityFaq[];
}

export default function SanJoseFaqAndCta({ faqs }: SanJoseFaqAndCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: CityFaq[] = [
    {
      q: "Why is San Jose law firm SEO more cost-effective than Google Ads in Silicon Valley?",
      a: "San Jose law firm SEO builds permanent organic equity and generates high-value retainers at a fixed monthly cost, whereas Google Ads for Silicon Valley employment or injury terms cost $240 to $340 per click with zero compounding value.",
    },
    {
      q: "How does SearchPrex help San Jose firms outrank San Francisco mega-agencies?",
      a: "We outrank San Francisco firms by engineering hyper-localized Santa Clara County content silos, optimizing for South Bay municipal entities, and structuring venue pages directly mapped to Santa Clara County Superior Court.",
    },
    {
      q: "Are non-compete agreements enforceable against tech employees in California?",
      a: "No. Under California Business and Professions Code § 16600, non-compete agreements are void as a matter of public policy, creating continuous search demand from tech workers seeking severance and trade secret counsel.",
    },
    {
      q: "How are unvested RSUs and stock options divided in a San Jose divorce?",
      a: "Unvested stock options and RSUs are apportioned between community and separate property using judicial time-rule formulas such as the Huggins or Nelson standards, depending on whether the grant was awarded for past performance or future retention.",
    },
    {
      q: "Can a San Jose law firm capture clients across Sunnyvale, Cupertino, and Mountain View?",
      a: "Yes. By establishing localized South Bay submarket pages with unique jurisdictional signals, localized case studies, and Schema markup, your San Jose office can rank across neighboring municipal boundaries.",
    },
    {
      q: "How does SearchPrex optimize for Google AI Overviews and ChatGPT in Silicon Valley?",
      a: "We structure legal insights with answer-first opening sentences, clear statutory definitions, and verified FAQPage Schema that generative search models extract directly as primary authoritative sources.",
    },
    {
      q: "Do you lock San Jose law firms into annual contracts?",
      a: "No. SearchPrex operates on a month-to-month retainer with zero long-term contracts and provides full geographic practice area exclusivity so we never work with your direct competitors.",
    },
    {
      q: "How quickly can a San Jose law firm expect to see improved Map Pack rankings?",
      a: "Most San Jose law firms see measurable Google Map Pack movement and improved local keyword visibility within 60 to 90 days following our technical GBP overhaul and localized citation cleanup.",
    },
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-300">
              People Also Ask (PAA)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
              Frequently Asked Questions: Silicon Valley Legal SEO
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Direct answers to common questions regarding Santa Clara County law firm search strategy.
            </p>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-100/80 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#4338ca]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conversion Final CTA Banner */}
      <section className="py-16 bg-slate-100/80 border-b border-slate-200 text-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-slate-800 border border-slate-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#4338ca]" />
            Claim Your Silicon Valley Geographic Moat
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto mb-4">
            Stop Surrendering Santa Clara County Cases to San Francisco Agencies
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every day your firm sits outside the San Jose Google 3-Pack, high-retainer tech employment, RSU divorce, and corporate IP cases default to out-of-market directories. Take control of your South Bay search positioning today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reality-check-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold text-white bg-[#4338ca] hover:bg-[#3730a3] transition-all shadow-md shadow-indigo-100"
            >
              Request Free Practice Reality Check
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-slate-600" />
              Direct Founder Consultation
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">•</span>
              Zero-Commitment 24-Hour Review
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">•</span>
              One Firm Exclusivity Protection
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">•</span>
              Month-to-Month Transparency
            </span>
          </div>
        </div>
      </section>

      {/* Universal Tagline Pain Band */}
      <TaglinePainBand />
    </>
  );
}
