'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ShieldAlert, Car, Shield, ArrowRight } from 'lucide-react';

export default function ScottsdalePracticeDemand() {
  const practices = [
    {
      title: "High-Asset Divorce & Asset Division",
      statute: "A.R.S. § 25-211 & § 25-318",
      icon: Scale,
      metrics: { volume: "High", kd: "Low-Med", intent: "Maximum Retainer Value" },
      description:
        "Scottsdale is home to Arizona's premier concentration of corporate executives, physicians, and business owners. Marital dissolutions demand sophisticated analysis of closely held businesses, executive RSUs, separate property tracing, and multi-home valuations under Arizona's community property statutes.",
      bulletPoints: [
        "Business goodwill and professional practice valuation in Maricopa County.",
        "Unvested stock options, deferred compensation, and private equity carried interest.",
        "Equitable division of luxury real estate portfolios across North Scottsdale and DC Ranch.",
      ],
      link: "/services/law-firm-seo/family-law",
      linkText: "High-Asset Family Law Strategy",
    },
    {
      title: "Old Town DUI & Extreme DUI Defense",
      statute: "A.R.S. § 28-1381 & § 28-1382",
      icon: ShieldAlert,
      metrics: { volume: "High", kd: "Low", intent: "Immediate Emergency" },
      description:
        "The Scottsdale Entertainment District generates concentrated nightlife DUI arrests. With Arizona mandating 30 consecutive days in jail for Extreme DUI (0.150%+ BAC), defendants and their families search on mobile phones late at night seeking aggressive private counsel before Scottsdale City Court.",
      bulletPoints: [
        "First-offense DUI (A.R.S. § 28-1381): Mandatory jail and certified ignition interlock.",
        "Extreme DUI (A.R.S. § 28-1382): 30 consecutive days jail, mandatory alcohol screening.",
        "Scottsdale Police bodycam analysis and MVD administrative license hearings.",
      ],
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense SEO Strategy",
    },
    {
      title: "Estate Planning & Wealth Preservation",
      statute: "A.R.S. Title 14 (Arizona Probate Code)",
      icon: Shield,
      metrics: { volume: "Moderate", kd: "Low", intent: "High Lifetime Value" },
      description:
        "Affluent retirees, seasonal winter residents, and tech entrepreneurs actively search for sophisticated trust administration, probate avoidance, and multi-state asset protection to shield estates from unnecessary taxation and probate exposure.",
      bulletPoints: [
        "Revocable living trusts and irrevocable dynasty wealth protection trusts.",
        "Ancillary probate administration for seasonal residents with property in multiple states.",
        "Contested probate litigation and trust dispute defense in Superior Court.",
      ],
      link: "/services/law-firm-seo/estate-planning",
      linkText: "Estate Planning Practice Hub",
    },
    {
      title: "Freeway & High-End Collision Claims",
      statute: "A.R.S. § 12-2505 (Comparative Negligence)",
      icon: Car,
      metrics: { volume: "High", kd: "Moderate", intent: "High Case Settlement" },
      description:
        "Heavy commuter traffic along the Loop 101 Pima Freeway and Scottsdale Road frequently results in high-speed, catastrophic multi-vehicle accidents. Arizona's pure comparative fault rule allows victims to recover damages even with partial fault, demanding authoritative trial positioning.",
      bulletPoints: [
        "Commercial trucking collisions near the Scottsdale Airpark commercial logistics hub.",
        "Luxury vehicle and rideshare accidents in Old Town and North Scottsdale.",
        "Catastrophic spinal and brain injury claims with multi-million-dollar umbrella policies.",
      ],
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Personal Injury Practice Hub",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            Practice Area Economics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            High-Volume, Low-KD Practice Demand in Scottsdale
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            SearchPrex builds targeted statutory architectures aligned with the specific high-asset legal search queries that generate signed retainers for Scottsdale attorneys.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice) => {
            const Icon = practice.icon;
            return (
              <div
                key={practice.title}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800">
                        <Icon className="w-5 h-5 text-[#4338ca]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{practice.title}</h3>
                        <p className="text-xs font-mono text-slate-500">{practice.statute}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metric Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-semibold">
                    <span className="bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                      Search Volume: {practice.metrics.volume}
                    </span>
                    <span className="bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                      KD: {practice.metrics.kd}
                    </span>
                    <span className="bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100 text-[#4338ca]">
                      Intent: {practice.metrics.intent}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                    {practice.description}
                  </p>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 mb-6">
                    <p className="text-xs font-bold text-slate-900 mb-2">Statutory Focus Pillars:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {practice.bulletPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold text-slate-900">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Practice Hub:</span>
                  <Link
                    href={practice.link}
                    className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
                  >
                    {practice.linkText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
