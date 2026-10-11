'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeartHandshake, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function WoodlandsEmotionalIntent() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const situations = [
    {
      title: 'Estate Planning',
      feel: 'Quiet worry about leaving family in conflict',
      search: '"how to avoid probate in Texas", "revocable living trust vs will"',
      need: 'A plain-English explanation, reassurance that it is not too late, and an orderly first step without overwhelming legal jargon.',
      tone: 'Calm, respectful, and unhurried.',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO',
    },
    {
      title: 'High-Asset Divorce',
      feel: 'Fear of losing financial control and being socially exposed',
      search: '"how are stock options divided in a Texas divorce", "keep my business in a divorce"',
      need: 'Absolute discretion, executive composure, and a clear demonstration of how Texas community property laws treat RSUs and corporate equity.',
      tone: 'Composed, discreet, and mathematically precise.',
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'High-Asset Family Law SEO',
    },
    {
      title: 'Probate After a Loss',
      feel: 'Grief, fatigue, and sudden legal overwhelm',
      search: '"what to do when a parent dies Texas house", "probate vs muniment of title"',
      need: 'Compassionate step-by-step guidance, timelines for Montgomery County probate courts, and clarity on muniments of title.',
      tone: 'Gentle, patient, and empathetic.',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Probate Administration SEO',
    },
    {
      title: 'Business Succession',
      feel: 'Deep pride in life’s work paired with anxiety over continuity',
      search: '"family business succession plan Texas", "buy-sell agreement lawyer"',
      need: 'Executive-level commercial acumen, tax awareness, and a structured legal pathway for transferring ownership.',
      tone: 'Confident, authoritative, and practical.',
      linkHref: '/services/law-firm-seo',
      linkText: 'Corporate Law SEO',
    },
    {
      title: 'Serious Commuter Injury',
      feel: 'Physical shock, trauma, and fear over mounting medical debt',
      search: '"what to do after a truck accident on I-45", "fatal crash Grand Parkway lawyer"',
      need: 'Immediate next steps, reassurance from an experienced litigator, and clarity on Texas proportionate responsibility.',
      tone: 'Direct, reassuring, and fiercely protective.',
      linkHref: '/services/law-firm-seo/personal-injury',
      linkText: 'Personal Injury SEO',
    },
  ];

  const current = situations[activeTab];

  return (
    <section id="emotional-intent" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm my-10">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-[#534AB7]" />
          Empathetic Search Psychology
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Behind Every Search Is a Family at a Vulnerable Moment
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Woodlands clients searching for an estate planning, probate, or divorce lawyer are rarely "shopping"—they are protecting a legacy, safeguarding their children, or surviving a tragedy. Your website copy must sound like an empathetic counselor who understands the gravity of their moment.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {situations.map((s, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={s.title}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                isActive
                  ? 'bg-[#534AB7] text-white border-indigo-600 shadow-md shadow-indigo-900/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      {/* 4-Card Analysis Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* Card 1: What They Feel */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              What They Feel Inside
            </span>
            <div className="text-base font-bold text-slate-900 mt-2 leading-snug">
              {current.feel}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
            Internal emotional trigger
          </div>
        </div>

        {/* Card 2: What They Search */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              What They Quietly Search
            </span>
            <div className="text-xs font-mono text-[#3C3489] mt-2 leading-relaxed bg-indigo-50/70 p-2.5 rounded-lg border border-indigo-100">
              {current.search}
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
            High-intent search query
          </div>
        </div>

        {/* Card 3: What They Need to Read */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              What They Need to Read
            </span>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {current.need}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
            Frictionless trust building
          </div>
        </div>

        {/* Card 4: Our Tone & Strategy */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0a0f2e] to-[#10194a] text-white p-5 space-y-2 flex flex-col justify-between shadow-md">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              SearchPrex Editorial Tone
            </span>
            <div className="text-sm font-semibold text-white mt-2 leading-snug">
              {current.tone}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              We eliminate loud billboard slogans in favor of dignified authority that converts executive clients.
            </p>
          </div>
          <div className="pt-3 border-t border-indigo-900/70">
            <Link
              href={current.linkHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white"
            >
              <span>{current.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
