'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Flame, BookOpen, HeartHandshake, ArrowRight } from 'lucide-react';

export default function BatonRougePracticeDemand() {
  const practices = [
    {
      title: "Commercial Trucking & I-10/I-12 Corridor Crashes",
      icon: Truck,
      volume: "Very High Search Demand",
      statutes: "La. Civ. Code art. 3493.1 (2-Yr Prescription) & art. 2323 (51% Bar)",
      description:
        "The notorious Mississippi River bridge choke point and the high-speed junction of I-10 and I-12 create frequent catastrophic 18-wheeler collisions. Victims need immediate local legal representation before trucking carriers deploy rapid-response defense teams.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Truck Accident SEO Strategy",
    },
    {
      title: "Petrochemical Refinery & Maritime Jones Act Claims",
      icon: Flame,
      volume: "High Dollar Caseloads",
      statutes: "Jones Act (46 U.S.C. § 30104), LHWCA, Louisiana Environmental Tort Law",
      description:
        "The Mississippi River industrial corridor, home to massive ExxonMobil and chemical facilities, generates frequent plant explosions, chemical toxic exposure, and barge worker injuries governed by complex admiralty and workers' compensation statutes.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Industrial & Maritime SEO Hub",
    },
    {
      title: "Louisiana Civil Code Successions & Forced Heirship",
      icon: BookOpen,
      volume: "Steady High-Value Retainers",
      statutes: "La. Civ. Code art. 1493 (Forced Heirship), Succession Without Administration",
      description:
        "Louisiana's unique civil law succession framework replaces common-law probate. Contested wills, forced heirship claims for descendants under 24, and complex usufruct disputes require authoritative, specialized content that out-of-state competitors fail to understand.",
      link: "/services/law-firm-seo/family-law",
      linkText: "Succession & Estate Strategy",
    },
    {
      title: "High-Asset Divorce & Community Property Partition",
      icon: HeartHandshake,
      volume: "Continuous Retainer Demand",
      statutes: "La. Civ. Code art. 2338 (Community Property), Covenant Marriage Act (La. R.S. 9:272)",
      description:
        "East Baton Rouge professionals and corporate executives require sophisticated counsel for business valuations, retirement asset division under community property rules, and separation under Louisiana's unique covenant marriage statutes.",
      link: "/services/law-firm-seo/family-law",
      linkText: "Family Law Practice Strategy",
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
            Baton Rouge Legal Demand: High-Value Caseload Realities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Generic legal SEO agencies optimize for vanity keywords that bring irrelevant calls. SearchPrex builds precision statutory search funnels mapped directly to high-margin practice areas in East Baton Rouge Parish.
          </p>
        </div>

        {/* Practice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practices.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-neutral-950 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-white text-slate-800 border border-slate-200">
                      {p.volume}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>

                  <div className="mb-3 p-2.5 bg-white rounded border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700 block mb-0.5">Statutory Nexus:</span>
                    <span className="font-mono text-slate-900">{p.statutes}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Practice Blueprint:</span>
                  <Link
                    href={p.link}
                    className="text-xs font-bold text-neutral-950 hover:text-neutral-950 inline-flex items-center gap-1"
                  >
                    {p.linkText}
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
