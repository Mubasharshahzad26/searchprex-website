'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Map, BookOpen, HeartHandshake, ArrowRight } from 'lucide-react';

export default function ShreveportPracticeDemand() {
  const practices = [
    {
      title: "Commercial Trucking & I-20/I-49 Freight Crashes",
      icon: Truck,
      volume: "Very High Search Demand",
      statutes: "La. Civ. Code art. 3493.1 (2-Yr Prescription) & art. 2323 (51% Bar)",
      description:
        "The convergence of I-20 and I-49 serves as the major freight artery linking Texas with the Deep South. Catastrophic 18-wheeler collisions require immediate evidence preservation before multi-state trucking defense insurers deploy corporate adjusters.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Truck Accident SEO Strategy",
    },
    {
      title: "Ark-La-Tex Cross-Border Tri-State Disputes",
      icon: Map,
      volume: "High-Margin Regional Caseloads",
      statutes: "Louisiana Civil Code Conflicts of Law (arts. 3515-3549), Federal Diversity",
      description:
        "Residents frequently live in Bossier City, work in East Texas, or cross into Arkansas. Complex choice-of-law disputes, competing statutes of limitations, and multi-state venue contests require specialized content that national legal directories completely ignore.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Multi-State Practice Strategy",
    },
    {
      title: "Louisiana Civil Code Successions & Forced Heirship",
      icon: BookOpen,
      volume: "Steady High-Value Retainers",
      statutes: "La. Civ. Code art. 1493 (Forced Heirship), Succession Without Administration",
      description:
        "Louisiana's distinct civil succession system replaces common-law probate. Contested wills, forced heirship rights for children under 24, and oil, gas, and timber mineral right inheritances in Caddo Parish require precise, authoritative local content.",
      link: "/services/law-firm-seo/family-law",
      linkText: "Succession & Estate Strategy",
    },
    {
      title: "Family Law, Covenant Marriage & Military Dissolution",
      icon: HeartHandshake,
      volume: "Continuous Retainer Demand",
      statutes: "La. Civ. Code art. 2338 (Community Property), Covenant Marriage Act (La. R.S. 9:272)",
      description:
        "Caddo Parish families and service members connected to nearby Barksdale Air Force Base navigate complex military pension division, covenant marriage dissolution, and multi-jurisdictional child custody agreements.",
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
            Shreveport Legal Demand: High-Value Caseload Realities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Generic legal SEO agencies optimize for vanity keywords that bring unqualified inquiries. SearchPrex builds precision statutory search funnels mapped directly to high-margin practice areas in Northwest Louisiana.
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
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#4338ca] shrink-0">
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
                    className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
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
