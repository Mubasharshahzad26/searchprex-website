'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import type { CityFaq } from '@/lib/city-pages';
import TaglinePainBand from '@/components/location-wireframe/TaglinePainBand';

interface TempeFaqAndCtaProps {
  faqs?: CityFaq[];
}

export default function TempeFaqAndCta({ faqs }: TempeFaqAndCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: CityFaq[] = [
    {
      q: "Why is Tempe law firm SEO more cost-effective than Google Ads?",
      a: "Tempe law firm SEO delivers compounding organic retainers at a fixed monthly cost, whereas Google Ads for Tempe DUI or personal injury keywords cost $180 to $320 per individual click with zero residual equity.",
    },
    {
      q: "How does SearchPrex help Tempe attorneys outrank large Phoenix legal conglomerates?",
      a: "We outrank large Phoenix law firms by building hyper-localized East Valley content silos, earning local citations, and mapping your practice directly to Tempe Municipal Court and Maricopa County venues that national directories overlook.",
    },
    {
      q: "What practice areas yield the highest organic search return in Tempe?",
      a: "DUI defense (standard and Extreme DUI under A.R.S. § 28-1382), ASU student criminal defense, and motor vehicle accidents along the Loop 101/202 corridors generate the highest search velocity and fastest client conversion in Tempe.",
    },
    {
      q: "How does Arizona's Extreme DUI statute impact legal search intent?",
      a: "Extreme DUI charges trigger immediate high-intent mobile searches because Arizona imposes mandatory 30-day jail sentences at 0.15% BAC, forcing defendants to search for specialized counsel within hours of release from custody.",
    },
    {
      q: "Can my law firm rank across Mesa, Chandler, and Gilbert from a Tempe office?",
      a: "Yes. By engineering dedicated East Valley submarket pages with unique jurisdictional signals, localized case studies, and localized Schema markup, your Tempe office can rank across neighboring municipal boundaries.",
    },
    {
      q: "How does SearchPrex optimize for Google AI Overviews and ChatGPT?",
      a: "We format legal insights with direct, answer-first opening sentences, clear bulleted legal standards, and structured FAQPage schema that AI synthesis models extract directly as primary authoritative sources.",
    },
    {
      q: "Do you lock Tempe law firms into long-term contracts?",
      a: "No. SearchPrex operates strictly on a month-to-month retainer with zero long-term contracts and provides full geographic practice area exclusivity so we never work with your direct competitors.",
    },
    {
      q: "How quickly can a Tempe law firm expect to see improved Map Pack rankings?",
      a: "Most Tempe law firms see measurable Google Map Pack movement and improved local keyword visibility within 60 to 90 days following our technical GBP overhaul and localized citation cleanup.",
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
              Frequently Asked Questions: Tempe Legal SEO
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Direct, unvarnished answers to common questions about East Valley law firm search strategy.
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
                        isOpen ? 'rotate-180 text-neutral-950' : ''
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
            <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
            Claim Your Tempe Geographic Moat
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto mb-4">
            Stop Surrendering East Valley Cases to Phoenix Competitors
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every day your firm sits outside the Tempe Google 3-Pack, high-retainer Extreme DUI, student defense, and injury cases default to generic multi-location directories. Take control of your local search market today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reality-check-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-md shadow-slate-100"
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
