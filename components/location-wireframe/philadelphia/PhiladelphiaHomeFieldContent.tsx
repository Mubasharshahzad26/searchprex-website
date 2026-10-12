"use client";

import React from "react";
import Link from "next/link";
import { Scale, Clock, ShieldCheck, Landmark, ArrowRight, FileCheck } from "lucide-react";

const STATUTORY_TOPICS = [
  {
    title: "Two-Year Statute of Limitations",
    statute: "42 Pa.C.S. § 5524",
    desc: "Plain-English legal guides addressing the strict two-year filing deadline for personal injury and wrongful death claims in Pennsylvania, including the discovery rule exceptions.",
    link: "/services/law-firm-seo/personal-injury",
    linkLabel: "Injury SEO architecture",
  },
  {
    title: "51% Modified Comparative Fault",
    statute: "42 Pa.C.S. § 7102",
    desc: "Explanations of how Pennsylvania's comparative negligence statute impacts recovery, ensuring clients understand that recovery is barred only if their fault exceeds 50%.",
    link: "/services/law-firm-seo/personal-injury",
    linkLabel: "Tort claim content silos",
  },
  {
    title: "Limited vs. Full Tort Insurance",
    statute: "75 Pa.C.S. § 1705",
    desc: "High-converting content addressing the auto insurance election that blindsides Philadelphia drivers, detailing statutory exceptions for serious injury and commercial vehicles.",
    link: "/services/law-firm-seo/personal-injury",
    linkLabel: "Motor vehicle accident SEO",
  },
  {
    title: "Local Court Venues & Complex Litigation",
    statute: "First Judicial District of PA",
    desc: "What injured clients and criminal defendants should expect at the Philadelphia Court of Common Pleas (City Hall), the Complex Litigation Center, and Municipal Court.",
    link: "/services/law-firm-seo/criminal-defense",
    linkLabel: "Court venue authority pages",
  },
];

export default function PhiladelphiaHomeFieldContent() {
  return (
    <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Scale className="h-4 w-4" />
            <span>Pennsylvania Statutory Authority</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Pennsylvania Answers a Filing-Address Firm Cannot Write
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Specific, legally accurate local content is what earns trust, Google Map Pack calls, and AI citations. National directories regurgitate cookie-cutter national definitions; SearchPrex writes to the statutory reality of Pennsylvania practice.
          </p>
        </div>

        {/* 4-Column Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATUTORY_TOPICS.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-sm hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900 bg-slate-100 px-2.5 py-1 rounded-md inline-block mb-3">
                  {item.statute}
                </span>

                <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 group-hover:text-neutral-900 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
                >
                  <span>{item.linkLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
