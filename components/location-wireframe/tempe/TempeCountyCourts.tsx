'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, Scale, MapPin, ArrowRight } from 'lucide-react';

export default function TempeCountyCourts() {
  const courts = [
    {
      name: "Tempe Municipal Court",
      address: "505 S. Forest Ave, Tempe, AZ 85281",
      jurisdiction: "Misdemeanors & City Citations",
      statutes: "A.R.S. § 28-1381 (Standard DUI), § 28-1382 (Extreme DUI), Tempe City Code",
      description:
        "Handles all misdemeanor criminal charges and DUI arrests initiated by the Tempe Police Department and ASU Police. Crucial search terms include 'Tempe Municipal Court lawyer' and 'Tempe arraignment DUI attorney'.",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Explore Criminal Defense SEO",
    },
    {
      name: "Southeast Regional Superior Court Complex",
      address: "222 E. Javelina Ave, Mesa, AZ 85210",
      jurisdiction: "Felonies, Major Injury & Family Law",
      statutes: "A.R.S. § 28-1383 (Aggravated DUI), § 12-2505 (Comparative Negligence), § 25-211 (Community Property)",
      description:
        "The Maricopa County Superior Court venue for all East Valley felony matters, high-asset divorces, and multi-vehicle catastrophic personal injury suits originating on East Valley freeways.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Explore Personal Injury SEO",
    },
    {
      name: "Kyrene & University Lakes Justice Courts",
      address: "201 E. Chicago St, Chandler, AZ 85225",
      jurisdiction: "County Misdemeanors & Highway Patrol",
      statutes: "A.R.S. Title 28 Traffic Violations, County Civil Filings",
      description:
        "Presides over misdemeanor offenses and DUI arrests made by the Arizona Department of Public Safety (DPS) along Loop 101, Loop 202, and US-60 within the Tempe jurisdictional boundary.",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Explore DUI Defense SEO",
    },
    {
      name: "U.S. District Court, District of Arizona",
      address: "401 W. Washington St, Phoenix, AZ 85003",
      jurisdiction: "Federal Civil & Criminal Jurisdiction",
      statutes: "Title 18 U.S.C. Criminal Offenses, Federal Civil Rights",
      description:
        "Sandra Day O'Connor U.S. Courthouse hearing federal white-collar matters, ASU federal Title IX civil litigation, and interstate corporate disputes involving Tempe technology companies.",
      link: "/services/law-firm-seo/family-law",
      linkText: "Explore Family Law SEO",
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
            Google&apos;s local algorithm and AI search engines penalize generic legal websites that claim to serve all of Arizona without citing actual court venues. SearchPrex builds dedicated statutory content hubs mapped to every venue where your Tempe clients appear.
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
