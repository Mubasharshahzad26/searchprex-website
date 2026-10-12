'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Scale } from 'lucide-react';

export default function WoodlandsFounderBio() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neutral-800 via-slate-400 to-neutral-700" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Photo & Badge */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-xl mb-4">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif - CEO & Principal Strategist"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Mubashar Sharif</h3>
              <div className="text-sm font-semibold text-neutral-900">CEO & Principal Strategist</div>
              <div className="text-xs text-slate-500">SearchPrex Legal Advisory</div>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-neutral-900 border border-slate-100">
                10+ Years Legal SEO
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-neutral-900 border border-slate-100">
                Texas Entity Specialist
              </span>
            </div>
          </div>

          {/* Bio & Philosophy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-neutral-900 border border-slate-100">
              <Scale className="w-3.5 h-3.5 text-neutral-900" />
              Direct Founder Oversight
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              "We Don't Sell Billboard Fluff. We Build Durable Practice Equity."
            </h2>

            <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
              <p>
                In high-net-worth communities like The Woodlands, traditional legal marketing breaks down. Aggressive billboard advertising and loud pay-per-click slogans alienate corporate executives, physicians, and business founders who prize discretion above all else.
              </p>
              <p>
                At SearchPrex, I personally design the architectural blueprint for every Woodlands law firm we accept. We solve the Montgomery County versus Harris County venue dilemma, build hyper-local village landing hubs across Alden Bridge, Sterling Ridge, and Creekside, and structure statutory answers that earn trusted citations across both Google AI Overviews and ChatGPT.
              </p>
            </div>

            {/* Certifications and Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Exclusivity:</strong> We only partner with one firm per practice vertical in The Woodlands.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Discretion:</strong> All client intake channels, search audits, and metrics are confidential.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  <strong>No Account Managers:</strong> You collaborate directly with senior technical strategists.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <span>
                  <strong>Texas Statutory Fidelity:</strong> Thorough compliance with Texas Estates and Family Codes.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="#diagnosis-tool"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-md shadow-neutral-900/20"
              >
                Schedule Private Strategy Session
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-500">
                Direct consultation with Mubashar Sharif • 30 Minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
