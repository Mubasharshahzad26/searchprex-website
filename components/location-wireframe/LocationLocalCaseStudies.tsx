"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";
import { caseStudies, detailUrl, type CaseStudy } from "@/app/case-studies/data";

// Priority ordering by state so each location page leads with the closest regional proof
const STATE_PRIORITY_CLIENTS: Record<string, string[]> = {
  michigan: ["dolls-cleaning", "carpet-cleaning", "door-doctor"],
  texas: ["mammoth-roofing", "door-doctor", "local-hvac-services"],
  california: ["local-hvac-services", "kitchen-cabinets", "hvac-team"],
  arizona: ["local-hvac-services", "mammoth-roofing", "door-doctor"],
  "new-mexico": ["mammoth-roofing", "local-hvac-services", "door-doctor"],
  ohio: ["dolls-cleaning", "door-doctor", "mammoth-roofing"],
  pennsylvania: ["dolls-cleaning", "local-hvac-services", "door-doctor"],
  louisiana: ["mammoth-roofing", "door-doctor", "dolls-cleaning"],
  kansas: ["dolls-cleaning", "mammoth-roofing", "local-hvac-services"],
};

const FALLBACK_IMAGE_BY_CLIENT: Record<string, string> = {
  "local-hvac-services": "/images/hvac-ranking.JPG",
  "kitchen-cabinets": "https://img.youtube.com/vi/zRcTc2HqDwU/hqdefault.jpg",
};

export default function LocationLocalCaseStudies({ page }: { page: CityPage }) {
  const prioritySlugs = STATE_PRIORITY_CLIENTS[page.stateSlug] || [
    "dolls-cleaning",
    "mammoth-roofing",
    "local-hvac-services",
  ];

  const byClientSlug = new Map(caseStudies.map((cs) => [cs.slug.client, cs]));
  const selected: CaseStudy[] = [];

  for (const slug of prioritySlugs) {
    const cs = byClientSlug.get(slug);
    if (cs) selected.push(cs);
  }

  // Fill up to 3 if needed from remaining Local SEO case studies
  for (const cs of caseStudies) {
    if (selected.length >= 3) break;
    if (
      cs.seoType === "Local SEO" &&
      !selected.some((s) => s.id === cs.id)
    ) {
      selected.push(cs);
    }
  }

  return (
    <section
      id="verified-local-case-studies"
      className="py-16 sm:py-20 bg-white border-b border-slate-200 font-sans"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-900 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-neutral-900" />
              <span>Verified Google Search Console &amp; GBP Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950">
              Verified Local SEO Case Studies Behind Our {page.city} Framework
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              The same Google Business Profile engineering, service-area entity architecture, and AI Overview citation protocols we deploy for {page.city}, {page.stateAbbr} law firms — backed by unedited Google Search Console and GBP Performance data.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors shrink-0"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3-Column Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {selected.map((cs) => {
            const imgSrc =
              cs.image ||
              FALLBACK_IMAGE_BY_CLIENT[cs.slug.client] ||
              "/images/dolls-cleaning-ranking.JPG";

            return (
              <div
                key={cs.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-2xs transition-all duration-300 hover:border-neutral-900 hover:shadow-md"
              >
                {/* Screenshot / Proof Visual */}
                <Link
                  href={detailUrl(cs)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 border-b border-slate-200 group"
                >
                  <Image
                    src={imgSrc}
                    alt={`${cs.client} — ${cs.seoType} Case Study (${cs.location})`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-neutral-900/90 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {cs.seoType}
                    </span>
                    <span className="rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-neutral-900 border border-slate-200">
                      {cs.location}
                    </span>
                  </div>
                </Link>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    <span>{cs.client}</span>
                    {cs.period && <span>{cs.period}</span>}
                  </div>

                  <h3 className="text-lg font-black text-neutral-950 leading-snug mb-4">
                    {cs.headline}
                  </h3>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                    {cs.metrics.slice(0, 3).map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-white border border-slate-200 p-3 text-center"
                      >
                        <p className="text-base sm:text-lg font-black text-neutral-950 leading-none">
                          {m.v}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-500 mt-1 leading-tight">
                          {m.l}
                        </p>
                      </div>
                    ))}
                  </div>

                  {cs.outcome && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-3">
                      {cs.outcome}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {cs.verifiedVia
                        ? `Verified in ${cs.verifiedVia}`
                        : "Verified GSC Screenshot"}
                    </span>
                    <Link
                      href={detailUrl(cs)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-neutral-700 transition-colors"
                    >
                      <span>Inspect Proof</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* E-E-A-T Independent Entity & Trust Verification Bar */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 block">
              E-E-A-T Independent Entity Verification
            </span>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verify SearchPrex and Founder Mubashar Sharif across independent directories and live Google Search Console video walkthroughs:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://clutch.co/profile/searchprex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                C
              </span>
              <span>Clutch · Company Profile</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href="https://www.trustpilot.com/review/searchprex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                T
              </span>
              <span>Trustpilot · 1 Verified Review</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href="https://www.linkedin.com/company/searchprex/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                in
              </span>
              <span>LinkedIn · Company Page</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                in
              </span>
              <span>Founder LinkedIn</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
