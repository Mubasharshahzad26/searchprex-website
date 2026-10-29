"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Linkedin, ExternalLink } from "lucide-react";

export default function LawFirmFounderSpotlight() {
  const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";

  return (
    <section className="border-b border-slate-200 bg-white py-16 sm:py-24 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Executive Picture Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Border Frame */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-neutral-950 bg-slate-100 p-2 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-900">
                  <Image
                    src="/images/mubashar-sharif.jpg"
                    alt="Mubashar Sharif — Founder & Lead Legal SEO Strategist at SearchPrex"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  
                  {/* Floating Frame Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-black tracking-tight">Mubashar Sharif</p>
                    <p className="text-xs text-slate-300 font-medium">Founder &middot; 5+ Years of Hands-On SEO</p>
                  </div>
                </div>
              </div>

              {/* Verified Authority Pill Badge */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-950">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-950 text-[10px] font-black text-white">
                    #1
                  </span>
                  <span>Ranked #1 for &ldquo;law firm SEO Cleveland Ohio&rdquo;</span>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold">
                  &ldquo;Law Firm SEO Cleveland Ohio&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Introduction & Philosophy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 border border-slate-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Direct Founder Execution &middot; No Junior Hand-Offs</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
              Engineered by Founder Mubashar Sharif — Not Junior Account Managers
            </h2>

            <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Most legal marketing agencies pitch you with a smooth executive, then quietly hand your law firm over to an intern or entry-level account manager who recycles generic blog posts and sells useless &ldquo;Domain Authority&rdquo; (DA) vanity metrics.
              </p>
              <p>
                I founded SearchPrex on one non-negotiable principle: <strong className="text-neutral-950">direct founder-led technical execution for every single firm we partner with</strong>. I personally engineer your county courthouse silos, draft your AI Overview Answer Capsules, structure your LegalService JSON-LD schema, and monitor your Google Business Profile rankings every week.
              </p>
              <p className="font-semibold text-neutral-900">
                &ldquo;Law firm SEO is won on verifiable trust—state bar credentials, genuine client reviews, county-venue pages, and Google YMYL precision. I build search architectures that earn signed retainers, not just empty clicks.&rdquo;
              </p>
            </div>

            {/* 3 Founder Commitments */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200 text-xs sm:text-sm text-slate-800">
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-950">Strict 1-Firm Practice Exclusivity:</strong> We never take on competing personal injury, family law, or criminal defense firms in your city.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-950">Weekly Monday Reports:</strong> Direct Search Console clicks, Map Pack phone calls, and ranking telemetry delivered every Monday.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-950">Month-to-Month Terms:</strong> Backed by our 90-day money-back guarantee. We earn your partnership every 30 days.
                </span>
              </div>
            </div>

            {/* Direct Connect Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-white hover:border-neutral-950 px-4 py-2.5 text-xs font-bold text-neutral-950 transition"
              >
                <Linkedin className="h-4 w-4 text-[#0077b5]" />
                <span>Verify on LinkedIn</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>

              <a
                href="https://wa.me/923059158010?text=Hi%20Mubashar,%20I'm%20a%20US%20managing%20partner%20and%20would%20like%20to%20discuss%20our%20firm's%20SEO."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 px-5 py-2.5 text-xs font-bold text-white transition"
              >
                <span>Direct Message Mubashar</span>
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
