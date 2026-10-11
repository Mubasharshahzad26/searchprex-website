"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, AlertOctagon, CheckCircle2, ArrowRight } from "lucide-react";

interface SugarLandPainBannerProps {
  id?: string;
  variant?: "top" | "bottom";
}

export default function SugarLandPainBanner({
  id = "painband-top",
  variant = "top",
}: SugarLandPainBannerProps) {
  if (variant === "bottom") {
    return (
      <section id={id} className="py-16 bg-[#0a0f2e] text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-[#0a0f2e] border border-slate-700/60 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The SearchPrex Retainer Guarantee</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Burnt by Previous Agencies with Zero Results? We Deliver Signed Retainers.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Managing partners in Sugar Land are tired of paying thousands each month for vanity keyword reports and expensive PPC click-fraud while the intake calendar remains empty. We hold ourselves accountable to verified client inquiries, consultation bookings, and signed retainers in Fort Bend County.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="#rescue-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-extrabold text-sm shadow-md transition-all text-center"
                >
                  <span>Claim Your Free Rescue Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center"
                >
                  <span>Review 90-Day Guarantee</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Box 1: Confused between choosing an SEO agency */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#534AB7]/10 text-[#534AB7] flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-[#0a0f2e] tracking-tight">
                  Confused Between Choosing an SEO Agency in Sugar Land? We Help You.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  National agencies don&apos;t know why high-asset Sugar Land divorce requires forensic business valuation content rather than generic templates. We provide transparent evaluation criteria so you never buy bloated retainers you don&apos;t need.
                </p>
                <div className="pt-1">
                  <a
                    href="#feelings-rescue"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#534AB7] hover:underline"
                  >
                    <span>See our 4-step rescue framework</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Burnt by previous agencies */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1a7d59]/10 text-[#1a7d59] flex items-center justify-center shrink-0 mt-0.5">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-[#0a0f2e] tracking-tight">
                  Didn&apos;t Get Results from SEO Before? We Are Here with Real Growth.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No vanity metrics or automated rank reports that hide lack of progress. You get direct access to Founder Mubashar Sharif, bi-weekly strategy calls, and a contractually protected 90-day milestone guarantee.
                </p>
                <div className="pt-1">
                  <a
                    href="#archetypes"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a7d59] hover:underline"
                  >
                    <span>See what Fort Bend clients actually search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
