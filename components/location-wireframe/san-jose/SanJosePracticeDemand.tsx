'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Briefcase, Cpu, Car, ArrowRight } from 'lucide-react';

export default function SanJosePracticeDemand() {
  const practices = [
    {
      title: "Tech Employment & Executive Severance",
      statute: "Cal. Bus. & Prof. Code § 16600 & Cal. Labor Code",
      icon: Briefcase,
      metrics: { volume: "Very High", kd: "Low-Med", intent: "Executive Retainer" },
      description:
        "California strictly voids non-compete clauses under Business and Professions Code § 16600. Tech directors, software engineers, and executives faced with layoffs, non-solicitation threats, or wrongful termination search urgently for specialized Santa Clara County employment counsel.",
      bulletPoints: [
        "Executive severance agreement review and equity acceleration negotiation.",
        "Non-compete and non-solicitation voidance defense under SB 699 & AB 1076.",
        "Whistleblower protection and FEHA retaliation claims in Silicon Valley tech firms.",
      ],
      link: "/services/law-firm-seo/family-law",
      linkText: "Employment Law SEO Strategy",
    },
    {
      title: "High-Asset Divorce & Equity Valuation",
      statute: "Cal. Fam. Code § 760 (Huggins / Nelson Formulas)",
      icon: Scale,
      metrics: { volume: "High", kd: "Low", intent: "Maximum Retainer Value" },
      description:
        "Silicon Valley compensation heavily relies on restricted stock units (RSUs) and incentive stock options (ISOs) with multi-year vesting periods. Determining community versus separate property interests requires specialized mathematical time-rule formulas that generalist divorce sites ignore.",
      bulletPoints: [
        "Apportionment of unvested RSUs and stock options between spouses.",
        "Valuation of privately held startup equity and founder shares.",
        "Division of luxury real estate portfolios in Willow Glen, Cupertino, and Palo Alto.",
      ],
      link: "/services/law-firm-seo/family-law",
      linkText: "High-Asset Family Law Strategy",
    },
    {
      title: "Startup IP & Founder Disputes",
      statute: "Cal. Civ. Code § 3426 (CUTSA) & Defend Trade Secrets Act",
      icon: Cpu,
      metrics: { volume: "Moderate", kd: "Low", intent: "Commercial Retainer" },
      description:
        "Silicon Valley's dense venture capital ecosystem produces fierce partnership dissolutions, trade secret misappropriation accusations, and intellectual property disputes requiring aggressive pre-trial injunctive relief in federal and state courts.",
      bulletPoints: [
        "Preliminary injunctions regarding trade secret claims under CUTSA.",
        "Founder equity vesting disputes and shareholder deadlock resolutions.",
        "Commercial breach of contract and intellectual property licensing defense.",
      ],
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Commercial Litigation Hub",
    },
    {
      title: "Freeway & Commuter Injury Claims",
      statute: "Cal. Civ. Code § 1714 (Ordinary Care & Negligence)",
      icon: Car,
      metrics: { volume: "High", kd: "Moderate", intent: "High Case Value" },
      description:
        "Severe congestion along US-101, I-280, I-880, and SR-85 leads to catastrophic multi-vehicle commuter and commercial truck collisions. California's pure comparative fault doctrine allows victims to recover damages even if partially responsible, requiring authoritative trial positioning.",
      bulletPoints: [
        "Multi-vehicle pileups along the US-101 high-density tech commuter corridor.",
        "Commercial trucking accidents along the I-880 industrial freight route.",
        "Pedestrian and micromobility collisions throughout Downtown San Jose.",
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
            High-Volume, Low-KD Practice Demand in San Jose
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            SearchPrex builds targeted statutory architectures aligned with the specific Silicon Valley legal search queries that generate signed retainers for San Jose attorneys.
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
