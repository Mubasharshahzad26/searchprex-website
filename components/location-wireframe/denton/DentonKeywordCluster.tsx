"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function DentonKeywordCluster() {
  const [selectedCluster, setSelectedCluster] = useState<number>(0);

  const clusters = [
    {
      name: "Criminal Defense, DWI & Student Offenses",
      tagline: "UNT/TWU Student Offenses & Denton County Criminal Courts",
      coreTopics: "Texas DWI statutes · Minor in possession (MIP) · Possession of controlled substances · Deferred adjudication · Occupational driver's license · Expunction of records · Order of nondisclosure · Denton County Jail bond · Student disciplinary defense",
      longTail: '"DWI lawyer Denton TX" · "minor in possession attorney Denton" · "expunction lawyer Denton County" · "UNT student criminal defense attorney"',
      intentSummary: "High urgency, mobile search dominance, frequently initiated by parents remotely looking for immediate bail and arraignment steps.",
      siloLink: "/services/law-firm-seo/criminal-defense",
      siloName: "Denton Criminal Defense Silo",
    },
    {
      name: "Family Law & Child Custody",
      tagline: "Texas Conservatorship & Community Property Division",
      coreTopics: "Child custody (managing vs possessory conservatorship) · Texas standard possession order · Child support calculations · Fault vs no-fault divorce · Marital property division · Denton County Family District Court · Modifications",
      longTail: '"child custody attorney Denton TX" · "divorce lawyer Denton County" · "family law attorney Flower Mound" · "conservatorship lawyer Denton"',
      intentSummary: "Substantive evaluation windows, transition from statutory rights queries into high-retainer contested representation.",
      siloLink: "/services/law-firm-seo/family-law",
      siloName: "Family Law & Divorce Silo",
    },
    {
      name: "Landlord-Tenant & Property Disputes",
      tagline: "Texas Property Code Chapter 92 & Student Housing",
      coreTopics: "Security deposit return bad faith · Eviction defense & notice to vacate · Denton County Justice of the Peace Courts · Warranty of habitability · Off-campus student housing lease breaches · Commercial lease disputes",
      longTail: '"security deposit lawyer Denton" · "eviction attorney Denton TX" · "landlord tenant lawyer Denton County" · "Justice of the Peace eviction defense"',
      intentSummary: "High volume of dispute inquiries requiring step-by-step statutory timelines under Texas Property Code.",
      siloLink: "/services/law-firm-seo",
      siloName: "Property & Civil Litigation Silo",
    },
  ];

  const current = clusters[selectedCluster];

  return (
    <section id="keywords" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Semantic Entity Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Denton Legal Keywords: The Semantic Topics Google &amp; AI Expect
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Google AI Overviews and search algorithms rank a Denton law firm website based on statutory entity breadth — covering Texas codes, local court procedures, and campus entities rather than generic keyword stuffing.
          </p>
        </div>

        {/* Cluster Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {clusters.map((cluster, idx) => {
            const isActive = selectedCluster === idx;
            return (
              <button
                key={cluster.name}
                onClick={() => setSelectedCluster(idx)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isActive
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cluster.name.split(",")[0]}
              </button>
            );
          })}
        </div>

        {/* 3 Detail Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Core Statutory Topics */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Statutory Entities</span>
              </div>
              <h3 className="text-base font-extrabold text-neutral-950 mb-3">
                {current.name} Topic Cloud
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {current.coreTopics}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 mt-6">
              Required for Google AI Overview citations
            </div>
          </div>

          {/* Card 2: Local Long-Tail Queries */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>High-Converting Long-Tail</span>
              </div>
              <h3 className="text-base font-extrabold text-neutral-950 mb-3">
                Targeted Search Phrases
              </h3>
              <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                {current.longTail}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 mt-6">
              Parent &amp; student high-converting volume
            </div>
          </div>

          {/* Card 3: Intent & Dedicated Silo */}
          <div className="p-7 rounded-2xl bg-neutral-900 text-white border border-[#262626] shadow-md flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Search Intent Profile</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {current.intentSummary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href={current.siloLink}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:underline"
              >
                <span>Explore {current.siloName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Breadcrumb Contextual Navigation */}
        <div className="text-xs sm:text-sm text-slate-500 pt-4 flex flex-wrap items-center gap-3">
          <span>Explore related legal markets:</span>
          <Link href="/locations/texas" className="text-neutral-900 hover:underline font-semibold">
            All Texas Practice Hubs
          </Link>
          <span>·</span>
          <Link href="/locations" className="text-neutral-900 hover:underline font-semibold">
            All Covered Locations
          </Link>
          <span>·</span>
          <Link href="/resources/law-firm-seo-audit-checklist" className="text-neutral-900 hover:underline font-semibold">
            Free Law Firm SEO Checklist
          </Link>
        </div>
      </div>
    </section>
  );
}
