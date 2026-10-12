'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function PlanoQuickAnswer() {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-7 sm:p-9 rounded-2xl bg-[#EEEDFE]/40 border border-[#534AB7]/20 shadow-sm relative overflow-hidden">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#534AB7] text-white">
              <Bot className="w-3.5 h-3.5 text-indigo-200" />
              Quick Answer · Google AI Overviews & ChatGPT
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Answer-First Legal Architecture
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            What is Law Firm SEO in Plano?
          </h2>

          {/* Core AEO paragraph (under 100 words) */}
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal mb-6">
            <strong>Law firm SEO in Plano</strong> is the work of making your firm appear in Google’s Map Pack, organic search results, and AI answers when executives, business leaders, and families in Plano, Frisco, Allen, McKinney, and Richardson search for legal representation—especially newcomers without an existing local network. SearchPrex builds Collin County practice silos, optimizes your{' '}
            <Link
              href="/services/law-firm-seo/google-business-profile-for-lawyers"
              className="text-[#534AB7] underline font-semibold hover:text-[#3C3489]"
            >
              Google Business Profile
            </Link>
            , and tracks visibility across{' '}
            <Link
              href="/ai-search"
              className="text-[#534AB7] underline font-semibold hover:text-[#3C3489]"
            >
              AI search engines
            </Link>
            , so corporate relocations and high-net-worth clients find your practice first.
          </p>

          {/* Author attribution */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-indigo-100/80 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#534AB7]/30 shrink-0">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, CEO & Principal Strategist"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  Written by{' '}
                  <Link href="/experts" className="text-[#534AB7] hover:underline">
                    Mubashar Sharif, CEO & Principal Strategist
                  </Link>
                </p>
                <p className="text-slate-500">Certified SEO Analyst · Collin County Practice Lead</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Compliant with Texas Disciplinary Rules of Professional Conduct</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
