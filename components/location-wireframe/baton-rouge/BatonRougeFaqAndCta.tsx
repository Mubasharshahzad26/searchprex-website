'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import type { CityFaq } from '@/lib/city-pages';
import TaglinePainBand from '@/components/location-wireframe/TaglinePainBand';

interface BatonRougeFaqAndCtaProps {
  faqs?: CityFaq[];
}

export default function BatonRougeFaqAndCta({ faqs }: BatonRougeFaqAndCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: CityFaq[] = [
    {
      q: "What is the prescriptive period for personal injury claims in Baton Rouge?",
      a: "Under Louisiana Civil Code art. 3493.1, personal injury claims arising after July 1, 2024 have a prescriptive period of two years from the date of injury, whereas injuries occurring prior to that date are governed by the previous one-year prescriptive period.",
    },
    {
      q: "How does Louisiana's 2026 comparative fault reform impact injury claims?",
      a: "Effective January 1, 2026, Louisiana Civil Code art. 2323 bars an injured plaintiff from recovering damages if they are found to be 51% or more at fault for the accident, shifting Louisiana from a pure comparative fault system to a modified comparative fault regime.",
    },
    {
      q: "Why is Louisiana civil law critical for local legal SEO in Baton Rouge?",
      a: "Louisiana's legal system derives from civil law rather than English common law, meaning search terms like 'succession lawyer' and 'prescription deadline' represent distinct local intent that national legal directories fail to address accurately.",
    },
    {
      q: "How does SearchPrex help Baton Rouge law firms outrank New Orleans competitors?",
      a: "We outrank out-of-parish New Orleans firms by building hyper-localized East Baton Rouge Parish content silos, earning local Capital Area citations, and aligning your firm directly with the 19th Judicial District Court.",
    },
    {
      q: "Can my Baton Rouge firm rank across Ascension, Livingston, and West Baton Rouge Parishes?",
      a: "Yes. By deploying dedicated Capital Region submarket pages with unique parish jurisdictional signals, highway corridor case studies (I-10 and I-12), and localized Schema markup, your office can capture cross-parish clients.",
    },
    {
      q: "How does SearchPrex optimize Baton Rouge legal content for Google AI Overviews and ChatGPT?",
      a: "We format legal insights with direct, answer-first opening sentences, precise Civil Code article citations, and verified FAQPage Schema that AI synthesis engines extract directly as primary authoritative sources.",
    },
    {
      q: "Do you lock Baton Rouge attorneys into long-term contracts?",
      a: "No. SearchPrex operates strictly on a month-to-month retainer with zero long-term contracts and guarantees 1-firm-per-practice exclusivity so we never work with your direct Baton Rouge competitors.",
    },
    {
      q: "What practice areas yield the fastest ROI in East Baton Rouge Parish?",
      a: "Commercial trucking collisions along the I-10/I-12 corridor, industrial plant chemical exposure claims, and contested succession litigation generate the fastest caseload conversions and highest lifetime client values.",
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
              Frequently Asked Questions: Baton Rouge Legal SEO
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Direct answers to common questions regarding East Baton Rouge Parish law firm search strategy.
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

      {/* Closing High-Conversion CTA Banner */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-[#818cf8]" />
            East Baton Rouge Practice Exclusivity
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Ready to Dominate East Baton Rouge Parish Legal Search?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop losing qualified highway injury, refinery tort, and succession retainers to out-of-parish New Orleans aggregators. Lock your exclusive practice area in Baton Rouge before your primary competitor claims it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reality-check-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-lg shadow-slate-200"
            >
              <Sparkles className="w-4 h-4" />
              Claim Free Parish Audit
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              Direct Founder Intake Call
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">•</span>
              <span>Month-to-month agreement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">•</span>
              <span>1 firm per practice area exclusivity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">•</span>
              <span>Direct access to senior search director</span>
            </div>
          </div>
        </div>
      </section>

      {/* Universal Tagline Band */}
      <TaglinePainBand />
    </>
  );
}
