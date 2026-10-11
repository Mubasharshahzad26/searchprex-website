"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserCheck, Award, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AlbuquerqueFounderBio() {
  const credentials = [
    "Semrush Certified SEO Analyst",
    "HubSpot Certified Content Specialist",
    "5+ Years Law Firm & Local SEO Focus",
    "AI Overview & Entity Citation Strategist",
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Photo Card */}
            <div className="lg:col-span-4 text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden border-4 border-[#534AB7]/20 shadow-xl mb-4 group">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, Founder and Lead Legal SEO Strategist at SearchPrex"
                  fill
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Legal Strategist</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Founder-Led Architecture
              </div>
            </div>

            {/* Right: Bio Information & Credentials */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
                <UserCheck className="w-3.5 h-3.5" />
                <span>The Strategist Behind Your Growth</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-3">
                Mubashar Sharif, CEO &amp; Principal Legal SEO Analyst
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                When you partner with SearchPrex, you do not get passed off to an entry-level coordinator or overseas junior copywriter. You talk directly to the strategist who reverse-engineers the Albuquerque legal market, conducts your technical audits, and architects your bilingual practice silos.
              </p>

              {/* Credentials Badges */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {credentials.map((cred, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#534AB7] shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {/* Direct Communication Action */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                <a
                  href="#reality-check"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-sm shadow-md shadow-[#534AB7]/20 transition-all"
                >
                  <span>Request Founder Reality Check</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/experts"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
                >
                  <span>View Full SEO Advisory Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
