'use client';

import React from 'react';
import Link from 'next/link';
import { ClipboardCheck, Hammer, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WoodlandsProcessSteps() {
  const steps = [
    {
      step: '01',
      title: 'Review: Map Venues & AI Gaps',
      subtitle: 'See exactly where your firm stands today',
      description:
        'We conduct an exhaustive forensic audit: identifying Montgomery vs Harris County venue gaps, missing village hubs (Alden Bridge, Sterling Ridge, Creekside), Google Business Profile category misalignments, and test citation rates across 20+ generative AI prompts.',
      features: [
        'Montgomery & Harris venue audit',
        '8 village keyword gap analysis',
        'ChatGPT & Gemini citation baseline',
        '1-page executive summary & video walkthrough',
      ],
      links: [
        { href: '/free-audit', label: 'Request Complimentary Review' },
        { href: '/tools/serp-checker', label: 'Try Free SERP Checker' },
      ],
      icon: ClipboardCheck,
    },
    {
      step: '02',
      title: 'Build: Author Venue & Village Silos',
      subtitle: 'Construct compounding organic legal equity',
      description:
        'We engineer county-correct practice pages anchored to Conroe district court and Creekside Park procedures. We deploy structured LegalService and FAQPage JSON-LD schemas, optimize Google Business Profile geo-grids, and publish an llms.txt protocol.',
      features: [
        'Texas Estates & Family Code answer-first hubs',
        'Dedicated village landing architecture',
        'LegalService & FAQPage schema deployment',
        'Custom llms.txt for AI assistant ingestion',
      ],
      links: [
        { href: '/tools/schema-generator', label: 'Schema Markup Generator' },
        { href: '/tools/llms-txt-generator', label: 'Generate llms.txt File' },
      ],
      icon: Hammer,
    },
    {
      step: '03',
      title: 'Prove: Measure Retainers & Citations',
      subtitle: 'Transparent reporting tied directly to revenue',
      description:
        'We deliver monthly attribution reports tracking Local 3-Pack rank movements, inbound qualified phone calls, Whisper call tracking recordings, signed client retainers, and AI assistant citation visibility percentages.',
      features: [
        'Whisper call tracking & lead scoring',
        'Map Pack 3-pack geo-grid tracking',
        'Monthly signed retainer attribution',
        '90-day milestone guarantee review',
      ],
      links: [
        { href: '/case-studies', label: 'Read Our Case Studies' },
        { href: '/resources/law-firm-seo-audit-checklist', label: 'Run Free SEO Checklist' },
      ],
      icon: Award,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-neutral-900 border border-slate-100 mb-3">
          <Award className="w-3.5 h-3.5 text-neutral-900" />
          Structured Three-Phase Methodology
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Three Steps From Review to Referral-Ready
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          No generic fluff or months of silent billing. We execute a disciplined, transparent roadmap built specifically for The Woodlands legal marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-neutral-900/30 group-hover:text-neutral-900 transition-colors">
                    {st.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-neutral-900 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{st.title}</h3>
                  <div className="text-xs font-semibold text-neutral-800 mt-0.5">{st.subtitle}</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {st.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-800 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 space-y-2">
                {st.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.href}
                    className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-neutral-900 transition-colors p-2 rounded-lg hover:bg-slate-50/50"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
