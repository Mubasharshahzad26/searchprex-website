'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Bot, Award, PhoneCall, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PlanoProcessSteps() {
  const steps = [
    {
      num: '01',
      title: 'Win the Map Pack in Plano and Surrounding Cities',
      icon: MapPin,
      desc: 'In an affluent, newcomer-heavy market like Plano, a verified Google Business Profile with recent reviews and proper service area setup decides who gets called first. We build review velocity, correct postal entities, and track geo-grids.',
      linkText: 'Explore local SERP checker',
      linkHref: '/tools/serp-checker',
    },
    {
      num: '02',
      title: 'Get Cited by Google AI Overviews, ChatGPT & Gemini',
      icon: Bot,
      desc: 'AI engines cite pages that answer legal questions first, name actual court venues, and cite verified author credentials. We deploy LegalService schema, publish an llms.txt file, and test your firm against real Collin County prompts.',
      linkText: 'See our AI search methodology',
      linkHref: '/ai-search',
    },
    {
      num: '03',
      title: 'Earn the Authoritative Citations AI Systems Trust',
      icon: Award,
      desc: 'Consistent name, address, and phone (NAP) data across the State Bar of Texas, Collin County Bar Association, and premier legal directories provide Google with multiple agreeing sources confirming your active practice.',
      linkText: 'Check our legal case studies',
      linkHref: '/case-studies',
    },
    {
      num: '04',
      title: 'Make Intake Efficient So High-Asset Inquiries Sign',
      icon: PhoneCall,
      desc: 'Traffic is meaningless if inquiries go to voicemail. We equip your firm with CallRail call tracking, missed-call text-back, instant form routing, lead scoring, and automated follow-up sequences so retainers get signed.',
      linkText: 'Review Complete Package features',
      linkHref: '#pricing',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-[#534AB7] border border-indigo-100 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            End-to-End Growth Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Plano Law Firm SEO Services: Map Pack, AI Answers & Signed Retainers
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We do not sell isolated technical tasks. We build an integrated client acquisition system that captures executives at the exact moment they look for Collin County counsel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#534AB7] text-white flex items-center justify-center font-bold text-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-300">{s.num}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#0a0f2e] mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <Link
                    href={s.linkHref}
                    className="text-xs font-bold text-[#534AB7] hover:text-[#3C3489] inline-flex items-center gap-1"
                  >
                    {s.linkText} <ArrowRight className="w-3.5 h-3.5" />
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
