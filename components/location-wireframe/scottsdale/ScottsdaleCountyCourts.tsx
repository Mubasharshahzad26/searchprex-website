'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function ScottsdaleCountyCourts() {
  const courts = [
    {
      name: "Scottsdale City Court",
      address: "3700 N. 75th St, Scottsdale, AZ 85251",
      jurisdiction: "Misdemeanors & City DUI Arraignments",
      statutes: "A.R.S. § 28-1381 (Standard DUI), § 28-1382 (Extreme DUI), Scottsdale Revised City Code",
      description:
        "Adjudicates all misdemeanor criminal charges and DUI citations originated by the Scottsdale Police Department in Old Town and the entertainment district. Key terms include 'Scottsdale City Court DUI lawyer' and 'Scottsdale arraignment attorney'.",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense SEO Strategy",
    },
    {
      name: "McDowell Mountain Justice Court",
      address: "18380 N. 40th St, Phoenix, AZ 85032",
      jurisdiction: "County Misdemeanors & Highway Patrol",
      statutes: "A.R.S. Title 28 Traffic Violations, County Civil Disputes",
      description:
        "Presides over Arizona DPS citations and misdemeanor arrests occurring along the Loop 101 Pima Freeway corridor in North Scottsdale, as well as county civil claims up to $10,000.",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "DUI Defense SEO Framework",
    },
    {
      name: "Maricopa County Superior Court",
      address: "201 W. Jefferson St, Phoenix, AZ 85003",
      jurisdiction: "High-Asset Divorce, Major Injury & Probate",
      statutes: "A.R.S. § 25-211 (Community Property), § 14-3101 (Probate), § 12-2505 (Comparative Negligence)",
      description:
        "The primary venue for contested Scottsdale high-asset marital dissolutions, trust litigation, and multi-million-dollar catastrophic personal injury lawsuits arising across Northeast Maricopa County.",
      link: "/services/law-firm-seo/family-law",
      linkText: "High-Asset Family Law SEO",
    },
    {
      name: "U.S. District Court, District of Arizona",
      address: "401 W. Washington St, Phoenix, AZ 85003",
      jurisdiction: "Federal Civil & Criminal Litigation",
      statutes: "Title 18 U.S.C. Criminal Offenses, Interstate Corporate Disputes",
      description:
        "Sandra Day O'Connor U.S. Courthouse hearing federal white-collar matters, interstate trade secret disputes, and complex corporate litigation involving Scottsdale technology and healthcare entities.",
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
            Jurisdictional Domination
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Maricopa County Court Silos That Prove Local Authority
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Google&apos;s local algorithm and AI search engines reward law firms that demonstrate verified court venue relevance. SearchPrex builds dedicated statutory content hubs mapped directly to the courtrooms where your Scottsdale clients appear.
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
                  className="text-xs font-bold text-[#4338ca] hover:text-[#3730a3] inline-flex items-center gap-1"
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
