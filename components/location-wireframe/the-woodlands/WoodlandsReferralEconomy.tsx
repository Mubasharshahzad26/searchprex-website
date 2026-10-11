'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserCheck, Sparkles, Shield, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function WoodlandsReferralEconomy() {
  const [activeRef, setActiveRef] = useState<number>(0);

  const referralSources = [
    {
      title: 'CPAs & Wealth Advisors',
      whatHappens:
        'A wealth manager in Town Center recommends your firm for an estate plan or complex divorce. Before scheduling, the high-net-worth client searches your name and your firm online to verify reputation, case depth, and peer standing.',
      whatWeEnsure:
        'They find an authoritative, dignified digital presence: verified credentials, deep Texas statutory explanations, spotless reviews, and zero gaudy ads that would demean the referral.',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning Authority Strategy',
    },
    {
      title: 'Referring Fellow Attorneys',
      whatHappens:
        'Colleagues in Houston or Dallas refer matters outside their practice area or jurisdiction. They need to confirm immediately whether you actively practice in Montgomery County courts in Conroe.',
      whatWeEnsure:
        'Clear jurisdictional boundaries, detailed court venue procedures, and prominent attorney bios that establish you as the definitive local counsel for The Woodlands.',
      linkHref: '/services/law-firm-seo',
      linkText: 'Law Firm SEO Services',
    },
    {
      title: 'AI Assistants (ChatGPT & Gemini)',
      whatHappens:
        'Affluent prospective clients prompt AI assistants: "Who is the best estate planning lawyer in The Woodlands for high net worth families?" Large language models synthesize trusted sources, structured schema, and editorial citations.',
      whatWeEnsure:
        'Answer-first practice silos, structured LegalService JSON-LD schema, and an llms.txt protocol so AI search models explicitly cite your firm as the premier recommendation.',
      linkHref: '/ai-search',
      linkText: 'Explore AI Overview & LLM Optimization',
    },
  ];

  const current = referralSources[activeRef];

  return (
    <section id="referral" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Referral Economy Section */}
      <div>
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#534AB7]" />
            Modern Referral Dynamics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Your Best Clients Are Referred. Now AI Is a Referral Too.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In The Woodlands, referrals from wealth managers, CPAs, and colleagues remain vital—but every referred client Googles your name before calling. Simultaneously, prospective clients now ask AI assistants for recommendations. We ensure both validation channels confirm your authority.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {referralSources.map((r, idx) => {
            const isActive = activeRef === idx;
            return (
              <button
                key={r.title}
                onClick={() => setActiveRef(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                  isActive
                    ? 'bg-[#534AB7] text-white border-indigo-600 shadow-md shadow-indigo-900/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {r.title}
              </button>
            );
          })}
        </div>

        {/* Dual Card Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-3 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                What Actually Happens Behind the Scenes:
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{current.title} Verification Flow</h3>
              <p className="text-sm text-slate-700 leading-relaxed mt-3">
                {current.whatHappens}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Cross-checked across Google reviews, entity panels, and AI overviews.
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#10194a] to-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-lg flex flex-col justify-between border border-indigo-900/60">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  What SearchPrex Ensures They Find:
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-2">Dignified Credibility & Instant Validation</h3>
              <p className="text-sm text-slate-200 leading-relaxed mt-3">
                {current.whatWeEnsure}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href={current.linkHref}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-300 hover:text-white"
              >
                <span>{current.linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Discretion Promise Section */}
      <div className="rounded-3xl bg-[#0a0f2e] border border-indigo-950 p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            The SearchPrex Discretion Promise
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Premium Law Firm Marketing That Stays Quiet
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Your clients arrive at their most sensitive, private life junctures. Your firm marketing should reflect that solemnity: calm, discreet, and never sensationalized.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-900/40 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 font-bold text-sm">
              01
            </div>
            <h4 className="font-bold text-white text-base">Confidential Reviews</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your audit, analytics, and intake volumes are strictly protected and never shared with competing practices.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-900/40 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 font-bold text-sm">
              02
            </div>
            <h4 className="font-bold text-white text-base">1 Firm Per Practice</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never take on two competing estate planning or divorce firms in The Woodlands. We work exclusively for you.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-900/40 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 font-bold text-sm">
              03
            </div>
            <h4 className="font-bold text-white text-base">Zero Shared Leads</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inbound inquiries are 100% exclusive to your office. Nothing is resold to aggregators, directories, or call centers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-900/40 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 font-bold text-sm">
              04
            </div>
            <h4 className="font-bold text-white text-base">Dignified Tone</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every word reflects elite statutory precision and calm reassurance—protecting your personal and professional brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
