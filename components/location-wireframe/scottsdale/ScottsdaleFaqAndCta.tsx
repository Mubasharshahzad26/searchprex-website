'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import type { CityFaq } from '@/lib/city-pages';
import TaglinePainBand from '@/components/location-wireframe/TaglinePainBand';

interface ScottsdaleFaqAndCtaProps {
  faqs?: CityFaq[];
}

export default function ScottsdaleFaqAndCta({ faqs }: ScottsdaleFaqAndCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: CityFaq[] = [
    {
      q: "Why is Scottsdale law firm SEO more lucrative than advertising in Phoenix?",
      a: "Scottsdale law firm SEO targets high-net-worth clients with substantially higher retainer values and case sizes for high-asset divorce, estate planning, and injury, yielding far greater ROI than competing for lower-value broad Phoenix traffic.",
    },
    {
      q: "How does SearchPrex position Scottsdale firms for high-asset divorce retainers?",
      a: "We engineer deep statutory content silos addressing Arizona community property laws (A.R.S. § 25-211), executive stock option valuation, and business asset division that educate affluent clients and secure top AI Overview citations.",
    },
    {
      q: "What makes Old Town Scottsdale DUI search intent distinct from general traffic?",
      a: "Old Town DUI searches occur primarily between 11 PM and 4 AM on mobile devices following arrests near the entertainment district, requiring sub-second mobile page loads and instant click-to-call intake.",
    },
    {
      q: "How does SearchPrex capture searches from North Scottsdale and Paradise Valley?",
      a: "We develop dedicated submarket landing pages optimized for affluent residential pockets such as DC Ranch, Silverleaf, Troon, and Paradise Valley, capturing local searchers seeking discrete, premium representation.",
    },
    {
      q: "Can a Scottsdale law firm rank in Google's local 3-Pack without long-term contracts?",
      a: "Yes. SearchPrex operates on a 100% month-to-month basis with zero long-term contracts, delivering verified Google Map Pack placement through technical Google Business Profile optimization and localized citation authority.",
    },
    {
      q: "How do you optimize Scottsdale legal content for ChatGPT and Google Gemini?",
      a: "We structure legal insights with answer-first opening sentences, clear statutory definitions, and verified FAQPage Schema that generative search engines extract directly as trusted legal citations.",
    },
    {
      q: "Do you guarantee practice area exclusivity in Scottsdale?",
      a: "Yes. SearchPrex strictly enforces a 1-firm-per-practice exclusivity policy in Scottsdale, guaranteeing that we will never partner with or optimize a direct competitor in your primary legal specialty.",
    },
    {
      q: "How does Arizona's 60-day divorce waiting period influence search behavior?",
      a: "Under A.R.S. § 25-329, no divorce decree may be entered until 60 days after service, creating extended informational search journeys where clients continuously research temporary orders, custody, and asset disclosures.",
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
              Frequently Asked Questions: Scottsdale Legal SEO
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Direct answers to common questions about high-asset law firm search strategy in Scottsdale.
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
            Claim Your Scottsdale Geographic Moat
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto mb-4">
            Stop Surrendering High-Net-Worth Retainers to Phoenix Aggregators
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every day your firm sits outside the Scottsdale Google 3-Pack, lucrative high-asset divorce, trust administration, and Extreme DUI retainers default to out-of-market directories. Secure your premier positioning today.
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
