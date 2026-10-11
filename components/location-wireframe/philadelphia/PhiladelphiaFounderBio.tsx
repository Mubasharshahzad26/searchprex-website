"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function PhiladelphiaFounderBio() {
  return (
    <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Founder Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative">
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 overflow-hidden rounded-3xl border-4 border-[#534AB7]/20 shadow-2xl">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, CEO & Principal Strategist at SearchPrex"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 -right-2 rounded-2xl bg-[#0a0f2e] border-2 border-[#534AB7] px-4 py-1.5 text-xs font-bold text-white shadow-lg flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Direct CEO Oversight</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-extrabold text-[#0a0f2e]">
                Mubashar Sharif
              </h3>
              <p className="text-sm font-semibold text-[#534AB7] mt-0.5">
                CEO & Principal Strategist
              </p>
            </div>
          </div>

          {/* Bio Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
              The Brain Behind Your Campaign
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
              Personal Strategic Direction: No Juniors, No Agency Hand-Offs
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Your Philadelphia campaign is planned and audited directly by our founder. At large national agencies, managing partners are wooed by senior executives only to be handed to junior out-of-state account coordinators managing 40+ law firms. At SearchPrex, the strategist who conducts your competitive audit directs your technical execution and speaks with you each month.
            </p>

            {/* Credential Chips */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs">
                <Award className="h-4 w-4 text-[#534AB7]" />
                Semrush Certified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-[#1a7d59]" />
                8+ Years Law Firm SEO Specialization
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-[#534AB7]" />
                AI Search & GEO Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-4 w-4 text-[#1a7d59]" />
                1 Firm Exclusivity Model
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-bold text-[#534AB7] hover:text-[#3C3489] underline hover:no-underline text-sm"
              >
                <span>Read our executive background and leadership story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
