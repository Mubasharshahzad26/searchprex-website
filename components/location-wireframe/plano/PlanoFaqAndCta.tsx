'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, ArrowRight, HelpCircle, PhoneCall, ShieldCheck } from 'lucide-react';

export default function PlanoFaqAndCta() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is law firm SEO in Plano?',
      a: "Law firm SEO in Plano is the work of making your firm visible in Google's Map Pack, organic results and AI answers when executives, newcomers and families search for a lawyer. It combines a tuned Business Profile, Collin County practice pages, local citations and tracking.",
    },
    {
      q: 'Which court hears a divorce for someone who lives in Plano?',
      a: 'Most Plano divorces are filed in the Collin County district courts in McKinney, though addresses that fall into Denton County file in Denton. Texas requires six months in the state and 90 days in the county before filing (Tex. Fam. Code § 6.301).',
    },
    {
      q: 'How much does law firm SEO cost in Plano?',
      a: 'Pricing depends on practice areas and how many Collin and Denton county cities the plan covers. Plans are month-to-month, and the free audit comes first.',
    },
    {
      q: 'How long does law firm SEO take in Plano?',
      a: 'Map Pack progress can begin within a few months, while competitive organic terms usually take longer. We agree on milestones up front so expectations are clear.',
    },
    {
      q: 'Do you cover Frisco, Allen, McKinney and Richardson?',
      a: 'Yes, each gets its own page where you serve it, because Google treats them as separate local searches and the county lines decide the courthouse. We name the correct court for each.',
    },
    {
      q: 'How do you handle firms near the Collin and Denton county line?',
      a: 'We build separate, county-correct content for each side of the line, so searchers know which courthouse handles their matter. Frisco and West Plano addresses receive distinct pages that prevent client confusion.',
    },
    {
      q: 'Can SEO help my firm appear in ChatGPT and Google AI Overviews?',
      a: 'It improves the odds, because AI engines quote clear, structured, well-cited pages that answer questions first. We add schema, publish an llms.txt file and track citation rates.',
    },
    {
      q: 'Can SEO help our firm win business immigration and corporate relocations?',
      a: 'Yes, because incoming executives and HR managers search for L-1, H-1B and PERM help on Google and through AI tools before they arrive. We target the corporate corridor terms that match their intent.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 text-neutral-900 border border-slate-100 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Plano Law Firm SEO: Common Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear, straight answers to the questions Plano managing partners ask before partnering with SearchPrex.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-neutral-950 hover:text-neutral-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 bg-white">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final CTA Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 via-neutral-900 to-neutral-900 text-white border border-neutral-900 shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="grid sm:grid-cols-12 gap-8 items-center">
            <div className="sm:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-700/10 text-slate-300 border border-neutral-700/20">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Zero Conflict · 1 Firm Per Practice Area
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to Be the Firm Plano Newcomers Find in Week One?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Get your free Plano reality check, lock out your Collin County competitors, and start your 7-day free trial today.
              </p>
            </div>
            <div className="sm:col-span-4 flex flex-col gap-3 justify-center sm:justify-end">
              <a
                href="#reality-check-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 transition shadow-lg shadow-neutral-950/50 text-center"
              >
                <Sparkles className="w-4 h-4 text-slate-200" />
                Get Free Reality Check
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition text-center"
              >
                Schedule Confidential Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
