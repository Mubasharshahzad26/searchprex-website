// components/LocalJurisdictionIntelligence.tsx
//
// Structured Legal Jurisdiction & Statutory Case Acquisition Section.
// Replaces long boring walls of text with scannable legal intelligence cards,
// statutory breakdown, searcher psychology, and practice-area silo architecture.

import React from "react";
import Link from "next/link";
import {
  Gavel,
  Scale,
  ShieldCheck,
  AlertCircle,
  FileText,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function LocalJurisdictionIntelligence({ page }: { page: CityPage }) {
  // Extract key statute or primary legal theme from heading or body
  const isMichigan = page.stateSlug === "michigan";
  const isTexas = page.stateSlug === "texas";
  const isCalifornia = page.stateSlug === "california";
  const isLouisiana = page.stateSlug === "louisiana";
  const isPennsylvania = page.stateSlug === "pennsylvania";
  const isOhio = page.stateSlug === "ohio";
  const isArizona = page.stateSlug === "arizona";
  const isNewMexico = page.stateSlug === "new-mexico";

  const statuteBadge = isMichigan
    ? "MCL § 500.3101 No-Fault Framework"
    : isTexas
    ? "Tex. Civ. Prac. & Rem. Code Ch. 33 (Proportionate Responsibility)"
    : isCalifornia
    ? "Cal. B&P Code § 16600 & Pure Comparative Fault"
    : isLouisiana
    ? "La. Civ. Code Art. 3492 (1-Year Prescription)"
    : isPennsylvania
    ? "Pa.R.C.P. 1006 & Complex Litigation Center"
    : isOhio
    ? "ORC § 2315.18 Damage Cap Structure"
    : isArizona
    ? "A.R.S. § 12-2505 Pure Comparative Fault"
    : isNewMexico
    ? "NMSA 1978 § 41-5-1 Malpractice Framework"
    : `${page.state} Statutory Code`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      {/* Top Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#534AB7] border border-indigo-100/80">
            <Gavel className="h-3.5 w-3.5" />
            {page.state} Statutory Framework · {page.county}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs">
            {statuteBadge}
          </span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-[#0a0f2e] sm:text-3xl leading-snug max-w-3xl">
          {page.legalContext.heading}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#566070] max-w-2xl">
          Why boilerplate national marketing fails in {page.city}: search intent is governed by {page.state} statutory nuances that only deep legal content can rank for.
        </p>
      </div>

      {/* Structured Content Grid (3 Meaningful Cards Instead of 1 Long Paragraph) */}
      <div className="p-6 sm:p-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: The Statutory Reality */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                <Scale className="h-4 w-4" />
                <span>1. The Statutory Reality</span>
              </div>
              <h4 className="mt-2 text-base font-bold text-[#0a0f2e]">
                Local Court & Legal Threshold
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                In {page.county}, case viability hinges on exact statutory standards. When prospective clients research their situation, they aren&apos;t looking for generic slogans; they need answers to the specific legal hurdles governing recovery in {page.state}.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Filters out non-viable tire-kickers</span>
            </div>
          </div>

          {/* Card 2: High-Intent Search Psychology */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Search className="h-4 w-4" />
                <span>2. Searcher Psychology</span>
              </div>
              <h4 className="mt-2 text-base font-bold text-[#0a0f2e]">
                Urgent, Specific Inquiries
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Clients searching in {page.city} type questions about filing deadlines, fault percentages, or insurance claim limits. Standard &ldquo;Hire a Lawyer&rdquo; pages never trigger for these long-tail queries, sending high-retainer clients elsewhere.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Captures pre-qualified, serious claimants</span>
            </div>
          </div>

          {/* Card 3: The SearchPrex Architecture */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                <FileText className="h-4 w-4" />
                <span>3. SearchPrex Silo Execution</span>
              </div>
              <h4 className="mt-2 text-base font-bold text-[#0a0f2e]">
                Authoritative Legal Silos
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                We engineer standalone practice-area silos and schema answering these exact {page.state} statutory questions. Google recognizes this depth as true E-E-A-T authority, awarding top map-pack and organic positions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100 text-[11px] font-medium text-[#534AB7] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#534AB7] shrink-0" />
              <span>Outranks national directories & TV spenders</span>
            </div>
          </div>
        </div>

        {/* Executive Statute Quote & Full Context Box */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-[#534AB7]">
              <AlertCircle className="h-4 w-4" />
            </span>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Official {page.city} Jurisdictional Context for Practice Intake:
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-normal">
                {page.legalContext.body}
              </p>
            </div>
          </div>
        </div>

        {/* Action Link to Relevant Practice Pages */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Target Practice Areas:</span>
            <span>{page.practiceDemand.map((p) => p.area).slice(0, 3).join(" · ")}</span>
          </div>
          <Link
            href="/services/law-firm-seo"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#534AB7] hover:underline"
          >
            <span>Explore our practice-area SEO frameworks</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
