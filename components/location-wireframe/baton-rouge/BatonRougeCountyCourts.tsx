'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function BatonRougeCountyCourts() {
  const courts = [
    {
      name: "19th Judicial District Court (Civil & Criminal)",
      address: "300 North Blvd, Baton Rouge, LA 70801",
      jurisdiction: "East Baton Rouge Parish Primary Trial Venue",
      statutes: "La. Civ. Code art. 3493.1 (Prescription), art. 2323 (51% Comparative Fault Bar)",
      description:
        "The primary trial court for major personal injury actions, complex industrial chemical torts, succession disputes, and major felony criminal prosecutions across East Baton Rouge Parish.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Injury Litigation SEO Hub",
    },
    {
      name: "Baton Rouge City Court",
      address: "233 St. Louis St, Baton Rouge, LA 70802",
      jurisdiction: "Municipal & Limited Civil Claims",
      statutes: "La. Code of Civil Procedure (Civil Claims Under $35,000), City DWI & Traffic Code",
      description:
        "Presides over municipal criminal dockets, city DWI prosecutions, eviction hearings, and limited civil claims arising within the municipal city limits of Baton Rouge.",
      link: "/services/law-firm-seo/criminal-defense",
      linkText: "Criminal Defense SEO Strategy",
    },
    {
      name: "U.S. District Court, Middle District of Louisiana",
      address: "777 Florida St, Baton Rouge, LA 70801",
      jurisdiction: "Federal Trial Practice & Maritime Jones Act",
      statutes: "Jones Act (46 U.S.C. § 30104), General Maritime Law, Federal Diversity Jurisdiction",
      description:
        "Russell B. Long Federal Building adjudicating federal civil lawsuits, industrial river barge maritime claims, toxic tort mass actions, and federal white-collar criminal defenses.",
      link: "/services/law-firm-seo/personal-injury",
      linkText: "Maritime & Federal SEO Hub",
    },
    {
      name: "Louisiana 1st Circuit Court of Appeal",
      address: "1600 N. Third St, Baton Rouge, LA 70802",
      jurisdiction: "Capital Region Appellate Review",
      statutes: "Louisiana Constitution Art. V, § 10, Louisiana Uniform Rules of Courts of Appeal",
      description:
        "Hears appellate challenges and supervisory writ applications originating from the 19th Judicial District Court and surrounding Florida Parishes throughout southeastern Louisiana.",
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
            East Baton Rouge Parish Court Silos That Prove Local Expertise
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Google&apos;s local algorithm and generative AI search engines reward law firms that demonstrate verified court venue relevance. SearchPrex builds dedicated statutory content hubs mapped directly to the Capital Area courtrooms where your attorneys litigate.
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
