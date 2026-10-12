'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function ShreveportCountyCourts() {
  const courts = [
    {
      name: "1st Judicial District Court (Civil & Criminal)",
      address: "501 Texas St, Shreveport, LA 71101",
      jurisdiction: "Caddo Parish Primary Trial Courthouse",
      statutes: "La. Civ. Code art. 3493.1 (Prescription), art. 2323 (51% Comparative Fault Bar)",
      description:
        "The primary trial court for major personal injury actions, I-20 commercial trucking litigation, contested successions, and felony criminal trials across Caddo Parish.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Injury Litigation SEO Hub",
    },
    {
      name: "Shreveport City Court",
      address: "1244 Texas Ave, Shreveport, LA 71101",
      jurisdiction: "Municipal & Limited Civil Claims",
      statutes: "La. Code of Civil Procedure (Civil Claims Under $35,000), City DWI & Traffic Code",
      description:
        "Presides over municipal criminal dockets, city DWI prosecutions, eviction hearings, and limited civil claims arising within the municipal boundaries of Shreveport.",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense SEO Strategy",
    },
    {
      name: "U.S. District Court, Western District of Louisiana",
      address: "300 Fannin St, Shreveport, LA 71101",
      jurisdiction: "Federal Trial Practice & Multi-State Diversity",
      statutes: "28 U.S.C. § 1332 (Diversity Jurisdiction), Federal Interstate Commerce, Civil Rights",
      description:
        "Adjudicates complex federal multi-state lawsuits, cross-border commercial disputes involving Texas and Arkansas corporations, and federal criminal prosecutions.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Federal Trial Practice Hub",
    },
    {
      name: "Louisiana 2nd Circuit Court of Appeal",
      address: "430 Fannin St, Shreveport, LA 71101",
      jurisdiction: "Northwest Louisiana Appellate Review",
      statutes: "Louisiana Constitution Art. V, § 10, Louisiana Uniform Rules of Courts of Appeal",
      description:
        "Hears appellate challenges and supervisory writ applications originating from the 1st Judicial District Court (Caddo) and 26th Judicial District Court (Bossier/Webster).",
      link: "/services/law-firm-seo/family-law",
      linkText: "Appellate & Civil Strategy",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-300">
            Jurisdictional Authority
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Caddo Parish Court Silos That Prove Local Trial Authority
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Google&apos;s local algorithm and generative AI search engines reward law firms that demonstrate verified court venue relevance. SearchPrex builds dedicated statutory content hubs mapped directly to the Northwest Louisiana courtrooms where your attorneys litigate.
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
                <span className="text-xs font-semibold text-slate-500">Practice Alignment:</span>
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
