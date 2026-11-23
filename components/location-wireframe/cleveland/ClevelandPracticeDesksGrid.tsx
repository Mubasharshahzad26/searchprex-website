"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Scale, ShieldAlert, HeartPulse, HardHat, Users, Sparkles, Building2 } from "lucide-react";
import { CLEVELAND_PRACTICES } from "@/lib/cleveland-practice-pages";

const PRACTICE_ICONS: Record<string, React.ReactNode> = {
  "personal-injury": <Scale className="h-5 w-5 text-neutral-900" />,
  "criminal-defense": <ShieldAlert className="h-5 w-5 text-neutral-900" />,
  "family-law": <Users className="h-5 w-5 text-neutral-900" />,
  "medical-malpractice": <HeartPulse className="h-5 w-5 text-neutral-900" />,
  "workers-compensation": <HardHat className="h-5 w-5 text-neutral-900" />,
};

export default function ClevelandPracticeDesksGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10 shadow-xs">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 border border-slate-200 mb-3">
              <Building2 className="h-3.5 w-3.5 text-neutral-800" />
              <span>Cuyahoga County Specialized Practice Desks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Select Your Practice Area in Cleveland, Ohio
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Generic SEO fails in legal search. We engineer hyper-targeted practice silos aligned with Cuyahoga County court jurisdiction, local hospital networks, and Ohio statutory codes.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-950 px-3.5 py-2 text-xs font-bold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>1-Firm Exclusivity Per Practice Area</span>
            </span>
          </div>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CLEVELAND_PRACTICES.map((p) => {
            const icon = PRACTICE_ICONS[p.slug] || <Scale className="h-5 w-5 text-neutral-900" />;
            return (
              <Link
                key={p.slug}
                href={`/locations/ohio/cleveland/${p.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-neutral-950 group-hover:text-white">
                      <span className="group-hover:[&>svg]:text-white">{icon}</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                      {p.cpc.split(" ")[0]} CPC
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-950 group-hover:text-neutral-900">
                    {p.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {p.heroTakeaway}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span>Target Retainer:</span>
                    <span className="font-bold text-neutral-900">{p.caseValue.split(" ")[0]}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:text-emerald-700">
                  <span>View Practice Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}

          {/* 6th Card: Research Hub / AI Intake Banner */}
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/60 p-6 flex flex-col justify-between">
            <div>
              <div className="inline-block rounded-md bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-700 border border-slate-200 mb-3">
                Speed-to-Lead System
              </div>
              <h3 className="text-base font-bold text-neutral-950">
                Complimentary 24/7 AI Legal Intake Engine
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                78% of Cuyahoga claimants hire the first responder. Our compliant under-60-second intake engine engages after-hours leads automatically.
              </p>
            </div>
            <Link
              href="/blog/cleveland-law-firm-intake-study-missed-calls"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 hover:underline"
            >
              <span>Read Clio 48% Missed Calls Study</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
