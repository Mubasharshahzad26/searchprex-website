'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PlanoFounderBio() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-md shrink-0">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif, CEO & Principal Strategist"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 text-neutral-900 border border-slate-100 mb-2">
                  <Award className="w-3.5 h-3.5" />
                  Direct Founder Accountability
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                  Who Builds Your Plano Strategy
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Mubashar Sharif · CEO & Principal Strategist · Certified SEO Analyst
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                I do not pass your Collin County practice to junior interns or offshore virtual assistants. With 5+ years of dedicated technical and local search expertise, I personally design the entity architecture, map your Collin County district court silos, tune your Google Business Profile, and inspect your intake conversion rates each month.
              </p>

              <div className="grid sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>Semrush Certified Technical Auditor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>5+ Years in High-Intent Legal SEO</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>Exclusive Single-Firm Representation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>Ethical Texas Bar Compliance</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <Link
                  href="/experts"
                  className="text-xs font-bold text-neutral-900 hover:text-neutral-950 inline-flex items-center gap-1"
                >
                  Meet the SearchPrex leadership team <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/why-us"
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                >
                  Why firms choose SearchPrex <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
