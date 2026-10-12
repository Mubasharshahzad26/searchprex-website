'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, ShieldCheck, Mail } from 'lucide-react';

export default function TempeFounderBio() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-md mb-4 bg-slate-200">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, Technical Director at SearchPrex"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, 224px"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mubashar Sharif</h3>
              <p className="text-xs font-semibold text-neutral-950 uppercase tracking-wider mt-0.5">
                Technical Director & Founder
              </p>
              <p className="text-xs text-slate-500 mt-1">SearchPrex Legal Search Practice</p>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
                Founder-Led Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-4">
                Direct Technical Leadership with Zero Middlemen
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                When you partner with SearchPrex, your firm is not passed off to an entry-level account manager or outsourced offshore team. I personally architect your website&apos;s technical hierarchy, oversee every statutory court silo, and continuously optimize your Maricopa County search signals.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                Over the past decade, I have engineered legal search systems for boutique and mid-sized law firms across competitive jurisdictions. My focus is singular: turning organic search into an owned, predictable stream of signed retainers so managing partners can practice law with complete financial confidence.
              </p>

              {/* Three Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-slate-200 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Direct Slack and phone access to senior strategy.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>10+ years specializing in law firm search algorithms.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900">•</span>
                  <span>Full compliance with State Bar of Arizona advertising ethics.</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  Read Founder Background
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
                >
                  Direct Confidential Inquiry
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
