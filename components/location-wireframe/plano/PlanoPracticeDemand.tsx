'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Globe2, FileCheck, ShieldAlert, ArrowRight } from 'lucide-react';

export default function PlanoPracticeDemand() {
  const practices = [
    {
      title: 'Executive Divorce & High-Asset Family Law',
      icon: Scale,
      why: 'Corporate headquarters along Legacy West and the Dallas North Tollway generate complex marital estates involving RSUs, stock options, multi-state assets, and deferred executive compensation under Texas community property rules.',
      queries: ['executive divorce lawyer plano', 'high asset divorce attorney collin county', 'RSU division divorce texas'],
      link: '/services/law-firm-seo/family-law',
    },
    {
      title: 'Business & Corporate Immigration',
      icon: Globe2,
      why: 'Multinational employers (Toyota, Ericsson, NTT DATA, JPMorgan) continually sponsor international executives and engineers. Pages addressing L-1 transfers, PERM processing, and H-1B compliance capture enterprise retainers.',
      queries: ['business immigration lawyer plano', 'corporate immigration attorney legacy west', 'L1 visa lawyer collin county'],
      link: '/services/law-firm-seo',
    },
    {
      title: 'High-Net-Worth Estate Planning & Trusts',
      icon: FileCheck,
      why: 'Established tech and corporate wealth in West Plano requires sophisticated revocable living trusts, irrevocable life insurance trusts (ILITs), and family limited partnerships (FLPs) to shield multi-generational wealth from probate.',
      queries: ['estate planning attorney west plano', 'living trust lawyer collin county', 'asset protection lawyer plano tx'],
      link: '/services/law-firm-seo/estate-planning',
    },
    {
      title: 'Commercial Litigation & Corporate Counsel',
      icon: ShieldAlert,
      why: 'Breach of contract, non-compete enforcement, and partner disputes in North Texas corporate hubs require fast-acting trial counsel familiar with Collin County District Courts in McKinney.',
      queries: ['business litigation lawyer plano', 'breach of contract attorney collin county', 'non compete lawyer plano tx'],
      link: '/services/law-firm-seo',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 text-neutral-800 border border-slate-100 mb-3">
            <Scale className="w-3.5 h-3.5" />
            High-Yield Case Types
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Collin County Legal Demand by Practice
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Relocating professionals and established executives in Plano do not search for generic legal directories. They search for counsel who understand their precise financial assets and corporate reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {practices.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-neutral-900 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-lg text-neutral-950">{p.title}</h3>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{p.why}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/80 mb-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">High-Intent Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {p.queries.map((q, qIdx) => (
                        <span
                          key={qIdx}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700"
                        >
                          "{q}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href={p.link}
                    className="text-xs font-bold text-neutral-900 hover:text-neutral-950 inline-flex items-center gap-1.5"
                  >
                    View practice SEO strategy <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
