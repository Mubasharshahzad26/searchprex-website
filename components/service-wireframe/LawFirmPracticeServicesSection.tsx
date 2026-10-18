"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PracticeServiceCard {
  num: string;
  title: string;
  href: string;
  ctaLabel: string;
  priceRange: string;
  priceNote: string;
  usaWorkingHours: string;
  summary: string;
  deliverables: string[];
  keyMarkets: Array<{ label: string; href: string }>;
}

const LAW_FIRM_SERVICES: PracticeServiceCard[] = [
  {
    num: "01",
    title: "Personal Injury Law Firm SEO",
    href: "/services/law-firm-seo/personal-injury",
    ctaLabel: "Explore Personal Injury SEO",
    priceRange: "$1,500 – $2,500 / mo",
    priceNote: "7-Day Free Trial · Month-to-Month",
    usaWorkingHours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST · 24/7 Intake Monitoring",
    summary:
      "Replace $200–$350+ Google Ads clicks with permanent organic rankings for car accidents, commercial truck crashes, catastrophic injury, and wrongful death across your county and highway corridors.",
    deliverables: [
      "Injury-type & highway corridor silos (trucking, motorcycle, rideshare, TBI)",
      "State comparative fault & no-fault statutory Answer Capsules for AI Overviews",
      "2 a.m. mobile conversion engineering & tap-to-call intake path",
    ],
    keyMarkets: [
      { label: "Cleveland, OH", href: "/locations/ohio/cleveland" },
      { label: "Detroit, MI", href: "/locations/michigan/detroit" },
      { label: "Philadelphia, PA", href: "/locations/pennsylvania/philadelphia" },
      { label: "Baton Rouge, LA", href: "/locations/louisiana/baton-rouge" },
    ],
  },
  {
    num: "02",
    title: "Family Law & Divorce Attorney SEO",
    href: "/services/law-firm-seo/family-law",
    ctaLabel: "Explore Family Law SEO",
    priceRange: "$1,200 – $2,200 / mo",
    priceNote: "7-Day Free Trial · Month-to-Month",
    usaWorkingHours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST / PST",
    summary:
      "Capture high-asset divorce, child custody, spousal support, and RSU/business division clients weeks before they call—with county family court pages built for privacy and trust.",
    deliverables: [
      "Dedicated pages for contested/uncontested divorce, custody & complex asset division",
      "County family court venue guides (mediation, parenting plans & filing procedures)",
      "Privacy-safe organic acquisition without invasive retargeting ads",
    ],
    keyMarkets: [
      { label: "Sugar Land, TX", href: "/locations/texas/sugar-land" },
      { label: "The Woodlands, TX", href: "/locations/texas/the-woodlands" },
      { label: "San Jose, CA", href: "/locations/california/san-jose" },
      { label: "Scottsdale, AZ", href: "/locations/arizona/scottsdale" },
    ],
  },
  {
    num: "03",
    title: "Criminal Defense & DUI/OVI Lawyer SEO",
    href: "/services/law-firm-seo/criminal-defense",
    ctaLabel: "Explore Criminal Defense SEO",
    priceRange: "$1,200 – $2,200 / mo",
    priceNote: "7-Day Free Trial · Month-to-Month",
    usaWorkingHours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST · 24/7 Urgent Call Path",
    summary:
      "Win urgent late-night searches from defendants and family members with charge-specific pages for DUI/OVI/DWI, felony defense, bail/booking procedures, and record expungement.",
    deliverables: [
      "Charge-level silos (first-offense OVI/DWI, felony charges, probation & expungement)",
      "Local municipal court, county jail booking & bail process guides for families",
      "Sub-2.5s mobile load speed & 24/7 immediate phone/AI intake capture",
    ],
    keyMarkets: [
      { label: "Cleveland, OH", href: "/locations/ohio/cleveland" },
      { label: "Tempe, AZ", href: "/locations/arizona/tempe" },
      { label: "Denton, TX", href: "/locations/texas/denton" },
      { label: "Albuquerque, NM", href: "/locations/new-mexico/albuquerque" },
    ],
  },
  {
    num: "04",
    title: "Estate Planning & Probate Attorney SEO",
    href: "/services/law-firm-seo/estate-planning",
    ctaLabel: "Explore Estate Planning SEO",
    priceRange: "$1,200 – $2,000 / mo",
    priceNote: "7-Day Free Trial · Month-to-Month",
    usaWorkingHours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST / PST",
    summary:
      "Connect with affluent families, business owners, and out-of-state executors searching for revocable living trusts, wealth transfer, and county probate administration.",
    deliverables: [
      "Separate silos for wills, revocable living trusts, elder law & business succession",
      "County-specific probate court timelines and executor step-by-step checklists",
      "Authoritative YMYL content showing why custom trusts beat generic DIY templates",
    ],
    keyMarkets: [
      { label: "The Woodlands, TX", href: "/locations/texas/the-woodlands" },
      { label: "Sugar Land, TX", href: "/locations/texas/sugar-land" },
      { label: "Grand Rapids, MI", href: "/locations/michigan/grand-rapids" },
      { label: "Katy, TX", href: "/locations/texas/katy" },
    ],
  },
  {
    num: "05",
    title: "Mass Torts & MDL Docket SEO",
    href: "/services/law-firm-seo/mass-torts",
    ctaLabel: "Explore Mass Torts SEO",
    priceRange: "$1,800 – $2,500 / mo",
    priceNote: "7-Day Free Trial · Month-to-Month",
    usaWorkingHours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST · Rapid Docket Publishing",
    summary:
      "Publish docket-ready MDL campaign hubs within days of FDA recalls or JPML orders—capturing claimants from early symptom research through eligibility and co-counsel referrals.",
    deliverables: [
      "Symptom-to-recall-to-lawsuit search architecture ready when new dockets open",
      "Structured eligibility criteria & injury timelines engineered for AI Overviews",
      "Co-counsel & attorney referral pages to capture high-value firm-to-firm intakes",
    ],
    keyMarkets: [
      { label: "Philadelphia, PA", href: "/locations/pennsylvania/philadelphia" },
      { label: "Detroit, MI", href: "/locations/michigan/detroit" },
      { label: "Baton Rouge, LA", href: "/locations/louisiana/baton-rouge" },
      { label: "All US Venues", href: "/locations" },
    ],
  },
  {
    num: "06",
    title: "Google Business Profile (GBP) Optimization for Lawyers",
    href: "/services/law-firm-seo/google-business-profile-for-lawyers",
    ctaLabel: "Explore GBP for Lawyers",
    priceRange: "$800 – $1,500 / mo",
    priceNote: "Included in Full Retainer or Standalone",
    usaWorkingHours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST · Urgent Suspension Support",
    summary:
      "Earn top-3 Google Map Pack phone calls and protect your firm against 2026 virtual-office suspensions with practice-specific primary categories and State Bar citation alignment.",
    deliverables: [
      "Primary & secondary GBP category precision mapped to your highest-value caseload",
      "State Bar, Avvo, Justia & county courthouse NAP entity reconciliation",
      "Bar-compliant review generation & virtual-office suspension reinstatement defence",
    ],
    keyMarkets: [
      { label: "Cleveland, OH (#1 Ranked)", href: "/locations/ohio/cleveland" },
      { label: "Plano, TX", href: "/locations/texas/plano" },
      { label: "Shreveport, LA", href: "/locations/louisiana/shreveport" },
      { label: "Kansas Markets", href: "/locations/kansas" },
    ],
  },
];

export default function LawFirmPracticeServicesSection() {
  return (
    <section
      id="law-firm-seo-services"
      className="scroll-mt-20 border-b border-slate-200 bg-white py-16 sm:py-24 font-sans"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Clean Black Bold H2 + 45-60 Word AI Overview Answer Capsule */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
              Specialized Law Firm SEO Services &amp; Practice Areas We Offer
            </h2>

            <p className="mt-4 rounded-xl border-l-4 border-l-neutral-950 border border-slate-200 bg-slate-50 p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed">
              A single generic &ldquo;Practice Areas&rdquo; page cannot rank against specialized competitors. SearchPrex engineers dedicated, ABA Model Rule 7.1-compliant SEO campaigns across six core legal verticals ($1,200–$2,500/mo, month-to-month)—with live partner support aligned to US court and office hours (8:00 AM – 6:00 PM EST / CST / PST).
            </p>
          </div>

          {/* USA Pricing & Working Hours Quick Summary Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 lg:w-80 shrink-0 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                Standard Retainer
              </span>
              <span className="text-sm font-black text-neutral-950">$1,200 – $2,500 / mo</span>
            </div>
            <div className="space-y-1 text-xs text-slate-700">
              <p className="font-bold text-neutral-950">USA Working Hours (Live Support):</p>
              <p>Mon – Fri: 8:00 AM – 6:00 PM EST</p>
              <p className="text-[11px] text-slate-500">
                (7:00 AM – 5:00 PM CST &middot; 5:00 AM – 3:00 PM PST)
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-neutral-950">
              <span>&bull; 7-Day Free Trial</span>
              <Link href="/pricing" className="underline hover:text-slate-700">
                Full Pricing &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 6-Card Grid of Specialized Law Firm SEO Services with Price & USA Working Hours */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAW_FIRM_SERVICES.map((svc) => (
            <div
              key={svc.num}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-2xs transition-all hover:border-neutral-950 hover:bg-white"
            >
              <div>
                {/* Number Badge + Service Title */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-950 text-xs font-black text-white mt-0.5">
                    {svc.num}
                  </span>
                  <h3 className="text-lg font-black text-neutral-950 leading-snug">
                    <Link href={svc.href} className="hover:underline">
                      {svc.title}
                    </Link>
                  </h3>
                </div>

                {/* Transparent Price & USA Working Hours Strip */}
                <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Investment:
                    </span>
                    <span className="text-xs sm:text-sm font-black text-neutral-950">
                      {svc.priceRange}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600">
                    <span className="font-semibold text-neutral-900">Terms:</span>
                    <span>{svc.priceNote}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-600 flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-1" />
                    <span>
                      <strong className="text-neutral-950">US Hours:</strong> {svc.usaWorkingHours}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {svc.summary}
                </p>

                {/* Deliverables — Clean Black Bullet Dots */}
                <ul className="space-y-2 border-t border-slate-200 pt-3.5 text-xs text-slate-700">
                  {svc.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Markets + Direct Sub-Page CTA */}
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-3">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Priority US Markets Served:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.keyMarkets.map((m) => (
                      <Link
                        key={m.href + m.label}
                        href={m.href}
                        className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-neutral-900 hover:border-neutral-950 transition"
                      >
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href={svc.href}
                  className="inline-flex w-full items-center justify-between rounded-xl bg-neutral-950 hover:bg-neutral-800 px-4 py-2.5 text-xs font-bold text-white transition"
                >
                  <span>{svc.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
