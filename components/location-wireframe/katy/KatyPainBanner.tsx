"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, AlertOctagon, CheckCircle2, ArrowRight } from "lucide-react";

interface KatyPainBannerProps {
  id?: string;
  variant?: "top" | "bottom";
}

export default function KatyPainBanner({
  id = "painband-top",
  variant = "top",
}: KatyPainBannerProps) {
  if (variant === "bottom") {
    return (
      <section id={id} className="py-16 bg-neutral-900 text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-neutral-900 border border-slate-700/60 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-700/10 text-slate-400 text-xs font-bold uppercase tracking-wider border border-neutral-700/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The SearchPrex Retainer Guarantee</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Burnt by Previous Agencies with Zero Results? We Deliver Signed Retainers.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Too many Katy managing partners have spent $3,000+ monthly on vanity metrics, keyword spreadsheets, and vague &quot;brand impressions&quot; while the firm&apos;s intake phone stays silent. We measure success strictly by verified phone calls, consultation bookings, and signed retainers in Harris, Fort Bend, and Waller counties.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="#tear-down-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm shadow-md transition-all text-center"
                >
                  <span>Claim Your Free Katy Tear-Down</span>
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
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-neutral-950 tracking-tight">
                  Confused Between Choosing an SEO Agency in Katy? We Help You.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  National agencies do not understand why a Katy divorce filed in Harris County follows different venue rules than one filed in Fort Bend County. We provide clear, objective frameworks so you can audit any provider without confusing technical jargon.
                </p>
                <div className="pt-1">
                  <a
                    href="#process"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
                  >
                    <span>See our 3-step audit process</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Burnt by previous agencies */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-neutral-950 tracking-tight">
                  Didn&apos;t Get Results from SEO Before? We Are Here with Real Growth.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We don&apos;t hide behind vanity traffic spikes from out-of-state bot clicks. With month-to-month terms, weekly Monday updates, and written milestones, you see exactly which practice silos generate retained local cases.
                </p>
                <div className="pt-1">
                  <a
                    href="#county-crossroads"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:underline"
                  >
                    <span>See why Houston mega-firms fail here</span>
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
