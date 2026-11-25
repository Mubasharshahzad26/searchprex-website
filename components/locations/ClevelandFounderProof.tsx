"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  FileCheck2,
  ZoomIn,
  X,
} from "lucide-react";

interface CertificateItem {
  title: string;
  category: string;
  issuer: string;
  certId: string;
  examId: string;
  expires: string;
  imgSrc: string;
  summary: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    title: "On-Page SEO and AI Search Essentials with Semrush",
    category: "AI Search, GEO & On-Page Architecture",
    issuer: "Semrush Academy",
    certId: "6ccc15ccf5",
    examId: "Exam id-25",
    expires: "16.11.2027",
    imgSrc: "/images/certificates/semrush-onpage-ai-search.webp",
    summary:
      "Validates advanced methodology in AI Search, Google AI Overviews (GEO/AEO), entity-based semantic indexing, and search intent alignment for legal markets.",
  },
  {
    title: "How to Optimize for Mobile: The CRAFT of Mobile SEO",
    category: "Mobile Performance & Local Conversion (CRAFT)",
    issuer: "Semrush Academy",
    certId: "0bdda3567e",
    examId: "Exam id-15",
    expires: "16.11.2027",
    imgSrc: "/images/certificates/semrush-mobile-seo.webp",
    summary:
      "Validates mobile crawl budget optimization, Core Web Vitals (LCP/INP), and mobile conversion journeys for urgent emergency room & roadside searches.",
  },
];

export default function ClevelandFounderProof({
  practiceName = "Personal Injury",
  eyebrow = "Step 5 · Proven, Founder-Led Execution",
  heading = "Work Directly With Mubashar Sharif—Semrush Certified SEO & AI Search Strategist",
  body = "Large legal marketing agencies pitch you with a senior partner and then hand your Cuyahoga County campaign to junior coordinators who do not understand Ohio tort caps or I-90 crash corridors. At SearchPrex, founder Mubashar Sharif personally audits your Google Business Profile, maps your competitors, and oversees every technical deployment.",
  ctaText = "Request My Personal 24h PI Audit",
}: {
  practiceName?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaText?: string;
}) {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* 1. Founder Real Photo & Direct Commitment */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

            {/* Left 5 Cols: Real Photo of Mubashar Sharif */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[380px] bg-slate-900 overflow-hidden group">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt={`Mubashar Sharif, Founder and Lead Legal SEO Strategist at SearchPrex for ${practiceName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-neutral-900" />
                <span className="text-xs font-bold text-neutral-950">
                  Mubashar Sharif · Founder &amp; Lead Strategist
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 block mb-0.5 drop-shadow-xs">
                  Direct Founder Accountability
                </span>
                <p className="text-sm font-bold text-white leading-snug drop-shadow-xs">
                  &ldquo;Every Cleveland {practiceName} audit and strategy is built and reviewed by me personally—never handed off to junior reps.&rdquo;
                </p>
              </div>
            </div>

            {/* Right 7 Cols: Executive Narrative & Exclusivity */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider w-fit">
                <Award className="w-3.5 h-3.5 text-neutral-800" />
                <span>{eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                {heading}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {body}
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-neutral-950 block">
                      Strict 1-Firm Cuyahoga Exclusivity
                    </strong>
                    <span className="text-xs text-slate-600">
                      We never represent competing {practiceName.toLowerCase()} firms in Cleveland. Once you claim your territory, your local competitors are locked out.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-neutral-950 block">
                      Direct Strategist Access &amp; Signed-Case Attribution
                    </strong>
                    <span className="text-xs text-slate-600">
                      Direct communication for strategy calls, intake tuning, and monthly call-tracking reconciliation—no ticketing queues.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-neutral-950 block">
                      Flat $1,200/mo Retainer · Month-to-Month Flexibility
                    </strong>
                    <span className="text-xs text-slate-600">
                      No 12-month lock-in contracts. You stay because compounding organic visibility and signed Cleveland retainers pay for themselves.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/locations/ohio/cleveland#reality-check"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3.5 text-xs sm:text-sm shadow-sm transition-all"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-xs text-slate-500 font-medium">
                  Delivered in &lt;24 hours · Video teardown included
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Verified Semrush Academy Certificates */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                <FileCheck2 className="w-3.5 h-3.5 text-neutral-800" />
                <span>Verified Semrush Academy Credentials</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                Certified Expertise in AI Search (GEO/AEO) &amp; Mobile Conversion
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                Click either credential below to inspect the official Semrush Academy certification backing our Cuyahoga County legal SEO and mobile speed-to-lead framework:
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-neutral-900 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>Semrush Certified · Valid Thru 2027</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.certId}
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col justify-between transition-all hover:border-neutral-900/50 hover:bg-white hover:shadow-sm"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full aspect-16/10 rounded-xl overflow-hidden border border-slate-200 bg-white mb-4 block text-left cursor-pointer"
                  >
                    <Image
                      src={cert.imgSrc}
                      alt={`${cert.title} - ${cert.issuer} Certificate for Mubashar Sharif`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute bottom-2 right-2 bg-neutral-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                      <ZoomIn className="w-3 h-3" />
                      <span>Inspect Certificate</span>
                    </div>
                  </button>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {cert.category}
                  </span>
                  <h4 className="text-base font-bold text-neutral-950 mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cert.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-600">
                  <span>{cert.issuer} · {cert.examId}</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-neutral-900 font-semibold">
                    ID: {cert.certId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Zoom Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-950">{selectedCert.title}</h4>
                <span className="text-xs text-slate-500">
                  {selectedCert.issuer} · Certificate ID: {selectedCert.certId} · Valid thru {selectedCert.expires}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-neutral-900"
                aria-label="Close certificate preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-4/3 w-full bg-slate-50">
              <Image
                src={selectedCert.imgSrc}
                alt={selectedCert.title}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
