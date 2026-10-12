'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, ShieldAlert, Car, Users, ArrowRight } from 'lucide-react';

export default function TempePracticeDemand() {
  const practices = [
    {
      title: "DUI & Extreme DUI Defense",
      statute: "A.R.S. § 28-1381 & § 28-1382",
      icon: ShieldAlert,
      metrics: { volume: "High", kd: "Low-Med", intent: "Immediate Emergency" },
      description:
        "Arizona imposes mandatory minimum jail sentences even for first-time offenders, escalating to 30 days mandatory incarceration for Extreme DUI (BAC 0.150%+). Panicked defendants search on mobile phones within hours of release from custody, demanding instant click-to-call consultation.",
      bulletPoints: [
        "First-offense DUI (A.R.S. § 28-1381): 10 days jail, mandatory ignition interlock.",
        "Extreme DUI (A.R.S. § 28-1382): 30 consecutive days jail, $2,500+ fines.",
        "Super Extreme DUI (0.200%+ BAC): 45 consecutive days jail, 18-month interlock.",
      ],
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense SEO Strategy",
    },
    {
      title: "ASU Student Criminal Defense",
      statute: "A.R.S. Title 13 & Title 4 (Liquor Laws)",
      icon: Users,
      metrics: { volume: "High", kd: "Low", intent: "Parent & Student Urgent" },
      description:
        "With 75,000+ students at ASU Tempe, campus citations and arrests require aggressive local representation to avoid permanent criminal records and university suspension. Parents across the United States actively search Google to find vetted Tempe defense attorneys.",
      bulletPoints: [
        "Minor in Possession / Consumption of Alcohol (A.R.S. § 4-244).",
        "Fake ID possession and forged instruments (A.R.S. § 13-2002).",
        "ASU Dean of Students disciplinary and Title IX administrative hearings.",
      ],
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Student Defense Optimization",
    },
    {
      title: "Personal Injury & Freeway Accidents",
      statute: "A.R.S. § 12-2505 (Pure Comparative Fault)",
      icon: Car,
      metrics: { volume: "Very High", kd: "Moderate", intent: "High Retainer Value" },
      description:
        "The dense interchange of Loop 101, Loop 202, and US-60 experiences heavy commercial freight and rush-hour congestion. Arizona's pure comparative fault standard enables injured parties to recover damages even if partially responsible, requiring authoritative educational silos.",
      bulletPoints: [
        "Multi-vehicle pileups along the Loop 101 Price Freeway corridor.",
        "Commercial trucking accidents on the I-10 and Broadway Curve.",
        "Pedestrian and e-scooter collisions near Downtown Mill Avenue.",
      ],
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Personal Injury Practice Hub",
    },
    {
      title: "Family Law & Community Property",
      statute: "A.R.S. § 25-211 & § 25-318",
      icon: Scale,
      metrics: { volume: "Moderate", kd: "Low", intent: "High Net Worth Retainer" },
      description:
        "Arizona is one of nine community property states. Divorcing couples in South Tempe and the Chandler tech corridor deal with intricate stock vesting schedules, business valuations, and real estate appreciation requiring sophisticated statutory positioning.",
      bulletPoints: [
        "Equal division of marital assets and tech equity grants under A.R.S. § 25-211.",
        "Maricopa County Southeast Regional Court custody and parenting plans.",
        "Post-decree spousal maintenance modifications and enforcement.",
      ],
      link: "/services/law-firm-seo/family-law",
      linkText: "Family Law Search Engine Silos",
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
            High-Volume, Low-KD Practice Demand in Tempe
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            SearchPrex builds targeted statutory architectures aligned with the specific legal search queries that generate signed retainers for Tempe attorneys.
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
                        <Icon className="w-5 h-5 text-neutral-950" />
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
                    <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-100 text-neutral-950">
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
                    className="text-xs font-bold text-neutral-950 hover:text-neutral-950 inline-flex items-center gap-1"
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
