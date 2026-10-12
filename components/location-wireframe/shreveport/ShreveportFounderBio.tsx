'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function ShreveportFounderBio() {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Image Column */}
            <div className="md:col-span-4 text-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-2xl overflow-hidden border-2 border-slate-300 shadow-md">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, Founder and Lead Legal SEO Strategist at SearchPrex"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-slate-900">Mubashar Sharif</h3>
                <p className="text-xs text-[#4338ca] font-semibold">Founder & Technical Search Director</p>
                <p className="text-xs text-slate-500 mt-0.5">SearchPrex Legal Practice Group</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                Direct Strategic Accountability
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                Why I Personally Oversee Every Shreveport Legal Account
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Most legal marketing agencies operate on a volume sales model: an articulate salesperson pitches you an ambitious vision, and within days your firm is handed off to an entry-level coordinator who has never analyzed an interstate trucking accident or read Louisiana Civil Code prescription statutes.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                At SearchPrex, we refuse that approach. When you partner with us for Shreveport law firm SEO, you collaborate directly with me. Every Caddo Parish entity signal, statutory content silo, and Google Business Profile optimization is executed under my direct oversight. We deliver transparent, compounding caseload results without hiding behind bureaucratic account managers.
              </p>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Direct Communication: mubashar@searchprex.com</span>
                </div>

                <Link
                  href="/contact"
                  className="font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
                >
                  Schedule Founder Consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
