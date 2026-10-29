"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PracticeCard {
  num: string;
  title: string;
  href: string;
  ctaLabel: string;
  price: string;
  terms: string;
  hours: string;
  outcome: string;
  bullets: string[];
  sampleCity: { label: string; href: string };
}

const SERVICES: PracticeCard[] = [
  {
    num: "01",
    title: "Personal Injury Law Firm SEO",
    href: "/services/law-firm-seo/personal-injury",
    ctaLabel: "Explore Personal Injury SEO",
    price: "$1,500 – $2,500 / mo",
    terms: "7-Day Free Trial · Month-to-Month",
    hours: "Mon–Fri: 8:00 AM – 6:00 PM EST",
    outcome:
      "Rank for car accidents, commercial trucking & wrongful death across county court corridors—replacing $250+ Google Ads clicks.",
    bullets: [
      "Highway corridor & injury-type silos (trucking, motorcycle, TBI)",
      "2 a.m. mobile intake path designed for injured callers",
    ],
    sampleCity: { label: "Cleveland, OH", href: "/locations/ohio/cleveland" },
  },
  {
    num: "02",
    title: "Family Law & Divorce Attorney SEO",
    href: "/services/law-firm-seo/family-law",
    ctaLabel: "Explore Family Law SEO",
    price: "$1,200 – $2,200 / mo",
    terms: "7-Day Free Trial · Month-to-Month",
    hours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST",
    outcome:
      "Capture high-asset divorce, child custody, and spousal support clients weeks before they call with privacy-safe county court guides.",
    bullets: [
      "Dedicated silos for contested divorce, custody & complex asset division",
      "County family court filing guides built for client discretion",
    ],
    sampleCity: { label: "Sugar Land, TX", href: "/locations/texas/sugar-land" },
  },
  {
    num: "03",
    title: "Criminal Defense & DUI/OVI Lawyer SEO",
    href: "/services/law-firm-seo/criminal-defense",
    ctaLabel: "Explore Criminal Defense SEO",
    price: "$1,200 – $2,200 / mo",
    terms: "7-Day Free Trial · Month-to-Month",
    hours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST",
    outcome:
      "Win urgent late-night searches for DUI/OVI, felony defense, and bail procedures from defendants and worried family members.",
    bullets: [
      "Charge-level silos (first-offense OVI/DWI, felony defense, expungement)",
      "Sub-2.5s mobile load speed with 24/7 urgent call routing",
    ],
    sampleCity: { label: "Detroit, MI", href: "/locations/michigan/detroit" },
  },
  {
    num: "04",
    title: "Estate Planning & Probate Attorney SEO",
    href: "/services/law-firm-seo/estate-planning",
    ctaLabel: "Explore Estate Planning SEO",
    price: "$1,200 – $2,000 / mo",
    terms: "7-Day Free Trial · Month-to-Month",
    hours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST / PST",
    outcome:
      "Connect with affluent families and executors searching for revocable living trusts, wealth preservation, and probate administration.",
    bullets: [
      "Separate silos for living trusts, wills, elder law & probate",
      "County-specific probate court timelines and executor roadmaps",
    ],
    sampleCity: { label: "The Woodlands, TX", href: "/locations/texas/the-woodlands" },
  },
  {
    num: "05",
    title: "Mass Torts & MDL Docket SEO",
    href: "/services/law-firm-seo/mass-torts",
    ctaLabel: "Explore Mass Torts SEO",
    price: "$1,800 – $2,500 / mo",
    terms: "7-Day Free Trial · Month-to-Month",
    hours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST",
    outcome:
      "Publish docket-ready MDL hubs within days of FDA recalls or JPML orders—capturing claimants from early symptom research to signed retainers.",
    bullets: [
      "Rapid symptom-to-recall-to-lawsuit architecture for active dockets",
      "Structured eligibility criteria & timelines optimized for AI Overviews",
    ],
    sampleCity: { label: "Philadelphia, PA", href: "/locations/pennsylvania/philadelphia" },
  },
  {
    num: "06",
    title: "Google Business Profile (GBP) for Lawyers",
    href: "/services/law-firm-seo/google-business-profile-for-lawyers",
    ctaLabel: "Explore GBP for Lawyers",
    price: "$800 – $1,500 / mo",
    terms: "Standalone or Included in Retainer",
    hours: "Mon–Fri: 8:00 AM – 6:00 PM EST / CST",
    outcome:
      "Lock down Map Pack Top 3 positions and protect your practice from 2026 virtual-office suspensions with verified State Bar entity citations.",
    bullets: [
      "Primary GBP category alignment mapped to highest-value caseload",
      "State Bar, Avvo, Justia & courthouse citation reconciliation",
    ],
    sampleCity: { label: "Cleveland, OH", href: "/locations/ohio/cleveland" },
  },
];

export default function LawFirmPracticeServicesSection() {
  return (
    <section
      id="law-firm-seo-services"
      className="scroll-mt-20 border-b border-slate-200 bg-white py-16 sm:py-20 font-sans"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading + Streamlined Header Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 border border-slate-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Dedicated Practice Silos &middot; 1 Firm Per US City</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
              Specialized Law Firm SEO Services &amp; Practice Areas We Offer
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              One generic &ldquo;Practice Areas&rdquo; page cannot rank against specialized rivals. We build dedicated, ABA Rule 7.1-compliant search silos for your highest-margin cases—month-to-month, with live US support.
            </p>
          </div>

          {/* Clean Quick Summary Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:w-72 shrink-0 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider">Retainer Range:</span>
              <span className="font-black text-neutral-950">$1,200 – $2,500/mo</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider">US Support:</span>
              <span className="font-semibold text-neutral-900">8 AM – 6 PM EST</span>
            </div>
            <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-neutral-950">
              <span>&bull; 7-Day Free Trial</span>
              <span className="text-slate-500">1 Firm / City</span>
            </div>
          </div>
        </div>

        {/* 6 Clean, Attention-Grabbing Practice Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.num}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-neutral-950 hover:shadow-md transition-all"
            >
              <div>
                {/* Header: Number Badge + Title */}
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

                {/* Simplified Price & Hours Badge */}
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs">
                  <span className="font-black text-neutral-950">{svc.price}</span>
                  <span className="text-[11px] font-medium text-slate-600">{svc.hours}</span>
                </div>

                {/* 1-Sentence Punchy Outcome */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {svc.outcome}
                </p>

                {/* 2 Clean Bullet Points */}
                <ul className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
                  {svc.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Direct Action Button */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Market Focus:</span>
                  <Link
                    href={svc.sampleCity.href}
                    className="font-bold text-neutral-900 hover:underline"
                  >
                    {svc.sampleCity.label} &rarr;
                  </Link>
                </div>

                <Link
                  href={svc.href}
                  className="inline-flex w-full items-center justify-between rounded-xl bg-neutral-950 hover:bg-neutral-800 px-4 py-2.5 text-xs font-bold text-white transition-colors"
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
