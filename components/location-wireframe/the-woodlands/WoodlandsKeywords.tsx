'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export default function WoodlandsKeywords() {
  const [activeCluster, setActiveCluster] = useState<number>(0);

  const clusters = [
    {
      title: 'Estate Planning & Probate',
      tag: 'Generational Wealth & Trusts',
      coreTopics: [
        'Wills',
        'Revocable Living Trust',
        'Irrevocable Trust',
        'Durable Power of Attorney',
        'Medical Power of Attorney',
        'Guardianship Proceedings',
        'Asset Protection',
        'Estate Tax Planning',
        'Probate Administration',
        'Independent Administration',
        'Muniment of Title',
        'Texas Homestead Protection',
        'Texas Estates Code',
      ],
      longTail: [
        '"revocable living trust attorney The Woodlands"',
        '"probate lawyer Conroe TX"',
        '"muniment of title Montgomery County"',
        '"estate planning lawyer Shenandoah TX"',
        '"guardianship attorney Conroe"',
      ],
      intent: 'Informational intent initially ("how does muniment of title work?"), rapidly converting to high-value commercial hiring intent. We provide clear statutory answers first, then prompt the private consultation.',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO Architecture',
    },
    {
      title: 'High-Asset Divorce & Family Law',
      tag: 'Executive Wealth Division',
      coreTopics: [
        'High-Net-Worth Divorce',
        'Texas Community Property',
        'Forensic Business Valuation',
        'Retirement Division & QDRO',
        'Stock Options & RSUs',
        'Executive Deferred Comp',
        'Prenuptial & Postnuptial Agreements',
        'Sole Managing Conservatorship',
        'Spousal Maintenance',
        'Texas Family Code § 6.301',
      ],
      longTail: [
        '"high net worth divorce lawyer The Woodlands"',
        '"QDRO attorney Montgomery County"',
        '"postnuptial agreement lawyer The Woodlands"',
        '"conservatorship attorney Conroe"',
        '"corporate executive divorce attorney Woodlands"',
      ],
      intent: 'Extreme commercial intent from highly educated, discreet searchers who scrutinize credentials before booking. Pages must convey analytical mastery and zero sensationalism.',
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Family Law SEO Architecture',
    },
    {
      title: 'Business & Succession Law',
      tag: 'Corporate & Commercial',
      coreTopics: [
        'Texas Business Formation',
        'LLC Operating Agreements',
        'Shareholder & Partner Disputes',
        'Family Business Succession',
        'Buy-Sell Agreements',
        'Commercial Contracts',
        'Executive Employment Agreements',
        'Mergers & Asset Purchases',
      ],
      longTail: [
        '"business succession attorney The Woodlands"',
        '"LLC operating agreement lawyer Conroe"',
        '"shareholder dispute attorney Montgomery County"',
        '"commercial contract lawyer Woodlands TX"',
      ],
      intent: 'B2B commercial intent from Woodlands Town Center executives, private practice physicians, and oilfield services founders planning generational transitions.',
      linkHref: '/services/law-firm-seo',
      linkText: 'Corporate Law SEO Architecture',
    },
    {
      title: 'Catastrophic Injury & Crashes',
      tag: 'Commuter & Freight Corridors',
      coreTopics: [
        '18-Wheeler Truck Crashes',
        'I-45 Commuter Collisions',
        'Grand Parkway (SH 99) Multi-Vehicle',
        'Wrongful Death Claims',
        'Texas Proportionate Responsibility (51% Bar)',
        'Commercial Fleet Liability',
        'Spinal & Traumatic Brain Injury',
        'Underinsured Motorist Coverage',
      ],
      longTail: [
        '"truck accident lawyer I-45 The Woodlands"',
        '"wrongful death attorney Montgomery County"',
        '"car accident attorney Conroe TX"',
        '"Grand Parkway fatal collision lawyer"',
      ],
      intent: 'Urgent mobile queries originating from hospital waiting rooms or accident scenes. Requires instant answers, prominent Google Map Pack placement, and 24/7 intake responsiveness.',
      linkHref: '/services/law-firm-seo/personal-injury',
      linkText: 'Personal Injury SEO Architecture',
    },
  ];

  const current = clusters[activeCluster];

  return (
    <section id="keywords" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-neutral-900 border border-slate-100 mb-3">
          <Layers className="w-3.5 h-3.5 text-neutral-900" />
          Texas Legal Semantic Entities
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Law Firm SEO Keywords for The Woodlands: What Google & AI Expect
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Google algorithms and large language models judge a legal page by its semantic depth: whether it uses exact Texas statutory phrasing alongside authentic local modifiers like Montgomery County, Conroe, and specific Woodlands villages.
        </p>
      </div>

      {/* Cluster Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {clusters.map((c, idx) => {
          const isActive = activeCluster === idx;
          return (
            <button
              key={c.title}
              onClick={() => setActiveCluster(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                isActive
                  ? 'bg-neutral-900 text-white border-neutral-800 shadow-md shadow-neutral-900/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {c.title}
            </button>
          );
        })}
      </div>

      {/* Cluster Card */}
      <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              {current.tag}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{current.title}</h3>
          </div>
          <Link
            href={current.linkHref}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-neutral-950 group"
          >
            <span>{current.linkText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Core Legal Topics */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Texas Statutory Topics Covered:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {current.coreTopics.map((topic, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                >
                  {topic}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 pt-2 leading-relaxed">
              *All terminology structured for Texas Estates Code and Texas Family Code compliance.
            </p>
          </div>

          {/* Long Tail & Intent */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Hyper-Local Long-Tail Phrases Engineered by SearchPrex:
              </h4>
              <div className="space-y-1.5">
                {current.longTail.map((kw, kwIdx) => (
                  <div
                    key={kwIdx}
                    className="px-3 py-1.5 rounded-lg bg-slate-50/70 border border-slate-100 text-xs font-mono text-neutral-900 flex items-center gap-2"
                  >
                    <Tag className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                    <span>{kw}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Searcher Intent Strategy:</span>
              <p className="leading-relaxed">{current.intent}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
