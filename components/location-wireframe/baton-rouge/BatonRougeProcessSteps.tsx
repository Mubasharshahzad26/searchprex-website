'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function BatonRougeProcessSteps() {
  const steps = [
    {
      phase: "Phase 1: Days 1–14",
      title: "Parish Audit & Civil Code Architecture",
      items: [
        "Complete technical crawl and indexation audit of existing firm domain.",
        "Disavow toxic spam backlinks and clean legacy NAP citation inconsistencies.",
        "Map statutory Civil Code topics (prescription, fault, succession) to target URLs.",
      ],
    },
    {
      phase: "Phase 2: Days 15–30",
      title: "Google Business Profile & 3-Pack Overhaul",
      items: [
        "Audit primary and secondary GBP categories for maximum local search radius.",
        "Geocode practice photos and establish verified 19th JDC court proximity signals.",
        "Implement systematic, compliant review generation protocol for satisfied clients.",
      ],
    },
    {
      phase: "Phase 3: Days 31–60",
      title: "Practice Area Silos & AEO Structuring",
      items: [
        "Publish hyper-localized practice hubs for trucking, industrial plant, and succession cases.",
        "Format direct answer-first paragraphs for Google AI Overviews and ChatGPT citation.",
        "Inject validated LegalService, Attorney, and FAQPage JSON-LD Schema markup.",
      ],
    },
    {
      phase: "Phase 4: Days 61–90",
      title: "Capital Area Digital PR & Authority Links",
      items: [
        "Earn authoritative editorial backlinks from Louisiana legal journals and regional press.",
        "Publish Capital Area submarket pages for Ascension and Livingston Parishes.",
        "Review inbound case intake data and scale high-converting organic search queries.",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            Execution Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Our 90-Day Systematic Baton Rouge SEO Protocol
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A battle-tested four-phase implementation process designed to establish permanent organic search equity for your Baton Rouge law firm.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.phase}
              className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-colors"
            >
              <div>
                <span className="text-xs font-mono font-bold text-neutral-950 uppercase block mb-1">
                  Step {idx + 1}
                </span>
                <span className="text-xs font-bold text-slate-500 block mb-2">{s.phase}</span>
                <h3 className="text-base font-bold text-slate-900 mb-4">{s.title}</h3>

                <ul className="space-y-2.5 text-xs text-slate-600">
                  {s.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="font-bold text-slate-900 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-200" />
                <span>Deliverable Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
