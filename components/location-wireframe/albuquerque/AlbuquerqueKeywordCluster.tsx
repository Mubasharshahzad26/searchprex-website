"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AlbuquerqueKeywordCluster() {
  const [selectedCluster, setSelectedCluster] = useState<number>(0);

  const clusters = [
    {
      name: "DWI Defense",
      tagline: "Strict NM Statutes & Metropolitan Court Docket",
      coreTopics: "New Mexico DWI statutes · Ignition interlock license requirements · 10-day MVD revocation hearing · Implied consent · Aggravated DWI blood test refusal · Bernalillo County Metropolitan Court · Abogado de DWI en Albuquerque",
      longTail: '"DWI lawyer Albuquerque" · "DWI attorney Rio Rancho NM" · "abogado de DWI cerca de mí" · "how to save license after DWI Albuquerque"',
      intentSummary: "Extreme urgency, mobile search majority, high emotional vulnerability requiring immediate procedural clarity.",
      siloLink: "/services/law-firm-seo/criminal-defense",
      siloName: "DWI Defense SEO Blueprint",
    },
    {
      name: "Family Law & Divorce",
      tagline: "50/50 Community Property & Parenting Plans",
      coreTopics: "Dissolution of marriage · New Mexico community property division · Separate vs marital assets · Second Judicial District Family Court · Child support guidelines · Custody parenting plans · Divorcio bienes comunitarios",
      longTail: '"divorce lawyer Albuquerque" · "community property attorney New Mexico" · "child custody lawyer Albuquerque NM" · "abogado de divorcio"',
      intentSummary: "High research depth, long evaluation windows, transition from informational statute queries to high-retainer consultations.",
      siloLink: "/services/law-firm-seo/family-law",
      siloName: "Family Law SEO Blueprint",
    },
    {
      name: "Personal Injury & Collisions",
      tagline: "Pure Comparative Fault & I-25 / I-40 Highway Corridors",
      coreTopics: "New Mexico pure comparative fault rule · 3-year statute of limitations · Uninsured / underinsured motorist coverage · New Mexico Tort Claims Act · Commercial trucking collisions · Paseo del Norte crashes",
      longTail: '"car accident lawyer Albuquerque" · "truck accident attorney New Mexico" · "abogado de accidentes en Albuquerque" · "who pays medical bills after car wreck"',
      intentSummary: "Urgent mobile search, high average fee value, intense directory competition easily disrupted by hyper-local procedural silos.",
      siloLink: "/services/law-firm-seo/personal-injury",
      siloName: "Personal Injury SEO Blueprint",
    },
  ];

  const current = clusters[selectedCluster];

  return (
    <section id="keywords" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Semantic Entity Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Albuquerque Legal Keywords: The Semantic Topics Google &amp; AI Expect
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Google AI Overviews and search algorithms judge an Albuquerque law firm website not by generic keyword stuffing, but by comprehensive coverage of New Mexico statutory entities in both English and Spanish.
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
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cluster.name}
              </button>
            );
          })}
        </div>

        {/* 3 Detail Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Core Statutory Topics */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Statutory Entities</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0a0f2e] mb-3">
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
              <div className="text-xs font-bold uppercase tracking-wider text-[#1a7d59] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>High-Converting Long-Tail</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0a0f2e] mb-3">
                Targeted Search Phrases
              </h3>
              <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                {current.longTail}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 mt-6">
              Bilingual English &amp; Español volume
            </div>
          </div>

          {/* Card 3: Intent & Dedicated Silo */}
          <div className="p-7 rounded-2xl bg-[#0a0f2e] text-white border border-[#3C3489] shadow-md flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#EEEDFE] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Search Intent Profile</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {current.intentSummary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href={current.siloLink}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EEEDFE] hover:underline"
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
          <Link href="/locations/texas" className="text-[#534AB7] hover:underline font-semibold">
            All Texas Practice Hubs
          </Link>
          <span>·</span>
          <Link href="/locations" className="text-[#534AB7] hover:underline font-semibold">
            All Covered Locations
          </Link>
          <span>·</span>
          <Link href="/resources/law-firm-seo-audit-checklist" className="text-[#534AB7] hover:underline font-semibold">
            Free Law Firm SEO Checklist
          </Link>
        </div>
      </div>
    </section>
  );
}
