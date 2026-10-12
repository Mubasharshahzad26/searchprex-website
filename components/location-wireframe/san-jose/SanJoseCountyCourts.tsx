'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function SanJoseCountyCourts() {
  const courts = [
    {
      name: "Santa Clara County Superior Court (Civil)",
      address: "191 N. 1st St, San Jose, CA 95113",
      jurisdiction: "Tech Employment & Commercial Litigation",
      statutes: "Cal. Bus. & Prof. Code § 16600 (Non-Compete Ban), Cal. Labor Code (FEHA & PAGA)",
      description:
        "The primary venue for Silicon Valley executive employment disputes, wrongful termination, non-compete voidance litigation, and commercial trade secret disputes in Santa Clara County.",
      link: "/services/law-firm-seo/family-law",
      linkText: "Employment Law Strategy",
    },
    {
      name: "Santa Clara County Family Justice Center",
      address: "201 N. 1st St, San Jose, CA 95113",
      jurisdiction: "High-Asset Divorce & Equity Valuation",
      statutes: "Cal. Fam. Code § 760 (Community Property Presumption), Huggins/Nelson Formulas",
      description:
        "Presides over contested marital dissolutions involving restricted stock units (RSUs), venture capital stock options, private business valuations, and spousal maintenance disputes.",
      link: "/services/law-firm-seo/family-law",
      linkText: "High-Asset Family Law SEO",
    },
    {
      name: "Santa Clara County Hall of Justice",
      address: "190 W. Hedding St, San Jose, CA 95110",
      jurisdiction: "Criminal Defense & California DUI",
      statutes: "Cal. Veh. Code § 23152 (DUI), Cal. Penal Code Misdemeanors & Felonies",
      description:
        "Adjudicates all felony and misdemeanor criminal prosecutions originated by the San Jose Police Department, Santa Clara County Sheriff, and California Highway Patrol (CHP).",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense SEO Framework",
    },
    {
      name: "U.S. District Court, N.D. California (San Jose)",
      address: "280 S. 1st St, San Jose, CA 95113",
      jurisdiction: "Federal IP, Securities & Trade Secrets",
      statutes: "Defend Trade Secrets Act (18 U.S.C. § 1836), Patent Act (35 U.S.C.), Federal Civil Rights",
      description:
        "Robert F. Peckham Federal Building presiding over high-stakes Silicon Valley patent infringement, federal trade secret misappropriation, and securities litigation.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Federal Trial Practice Hub",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            Jurisdictional Domination
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Santa Clara County Court Silos That Prove Local Authority
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Google&apos;s local algorithm and generative AI search models reward law firms that demonstrate verified court venue relevance. SearchPrex builds dedicated statutory content hubs mapped directly to the South Bay courtrooms where your clients appear.
          </p>
        </div>

        {/* Court Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courts.map((court, idx) => (
            <div
              key={court.name}
              className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
                      Venue {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{court.name}</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-white text-slate-800 border border-slate-200 shrink-0">
                    {court.jurisdiction}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{court.address}</span>
                </div>

                <div className="mb-4 p-2.5 bg-white rounded border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-700 block mb-0.5">Statutory Nexus:</span>
                  <span className="font-mono text-slate-900">{court.statutes}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                  {court.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Related Strategy:</span>
                <Link
                  href={court.link}
                  className="text-xs font-bold text-neutral-950 hover:text-neutral-950 inline-flex items-center gap-1"
                >
                  {court.linkText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
