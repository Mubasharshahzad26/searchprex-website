"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  X,
  FileCheck2,
  ZoomIn,
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
  relevance: string;
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
      "Validates advanced methodology in AI Search, Google AI Overviews (GEO/AEO), entity-based semantic indexing, and search intent alignment.",
    relevance:
      "Directly powers our Cleveland legal practice silos, helping Cuyahoga County law firms get cited by Gemini, ChatGPT, and Google AI Overviews.",
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
      "Validates mobile crawl budget optimization, responsive rendering speed, Core Web Vitals (LCP/INP), and mobile user journey design.",
    relevance:
      "Critical for emergency accident and arrest searches in Greater Cleveland, converting mobile searchers into immediate intake calls.",
  },
];

export default function ClevelandFounderBio() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section className="border-b border-slate-200 bg-slate-50/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. Main Founder Bio Card */}
        <div className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-sm hover:border-neutral-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] bg-slate-900 overflow-hidden">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif, CEO and Founder of SearchPrex, reviewing technical legal SEO audits"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <span className="font-mono text-xs uppercase text-slate-200 font-bold">
                  CEO & Principal Strategist
                </span>
                <h4 className="text-lg font-bold">Mubashar Sharif</h4>
              </div>
            </div>

            {/* Right Bio Column */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-transform group-hover:scale-105">
                <Award className="h-3.5 w-3.5" />
                <span>The Brain Behind It · Direct CEO Engagement</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                Founder-Led Execution: Mubashar Sharif
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Every Cleveland account is planned, audited, and reviewed personally. No junior interns, no offshore hand-offs: the person who inspects your Google Search Console profile and Cuyahoga County competitors is the exact specialist who designs and oversees your technical execution.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Semrush Academy Certified",
                  "AI Search & LLM Citations Specialist",
                  "5+ Years Law Firm & Local SEO",
                  "Ohio MRPC Rule 7 Ethics Aligned",
                ].map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-neutral-900/30 hover:scale-105 cursor-default"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-800" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <a
                  href="#reality-check"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3.5 text-sm font-bold shadow-md shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <span>Request 24h Review from Mubashar</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/about"
                  className="text-xs font-bold text-neutral-900 hover:underline"
                >
                  Learn more about our methodology →
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* 2. Verified Industry Certifications (Google E-E-A-T Proof) */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-7 sm:p-10 shadow-lg">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                <FileCheck2 className="w-3.5 h-3.5 text-neutral-800" />
                Verified Credentials · Semrush Academy
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                Google E-E-A-T Backed: Verified SEO &amp; AI Search Certifications
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Google&apos;s Search Quality Rater Guidelines prioritize demonstrable Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). Every strategy we execute for Cleveland practices is anchored in verified, industry-standard accreditations:
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Semrush Certified · Valid Thru 2027</span>
            </div>
          </div>

          {/* Certificate Cards Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.certId}
                className="group relative rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between transition-all duration-300 hover:border-neutral-900/60 hover:bg-white hover:shadow-xl"
              >
                <div>
                  
                  {/* Certificate Image Thumbnail with Click to Expand */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs cursor-pointer group/img mb-5"
                  >
                    <Image
                      src={cert.imgSrc}
                      alt={`${cert.title} - Semrush Academy Certificate awarded to Mubashar Sharif`}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to Inspect Full Certificate</span>
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-neutral-950/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border border-white/20">
                      ID: {cert.certId}
                    </div>
                  </div>

                  {/* Header Details */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {cert.issuer} · {cert.examId}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Active (Exp. {cert.expires})
                    </span>
                  </div>

                  <h4 className="mt-2 text-lg sm:text-xl font-bold text-neutral-950 leading-snug">
                    {cert.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cert.summary}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Cleveland Practice Impact:
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {cert.relevance}
                    </p>
                  </div>

                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:underline cursor-pointer"
                  >
                    <span>View Official Verification</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-600">
                    Mubashar Sharif
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 3. Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/85 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white p-4 sm:p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {selectedCert.issuer} · {selectedCert.category}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-neutral-950">
                  {selectedCert.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="rounded-lg p-2 text-slate-500 hover:text-neutral-950 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close certificate modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full-view Certificate Image */}
            <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
              <Image
                src={selectedCert.imgSrc}
                alt={selectedCert.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            {/* Verification Metadata Footer */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span>Awarded to: <strong className="text-neutral-950">Mubashar Sharif</strong></span>
                <span>•</span>
                <span>Certificate ID: <strong className="font-mono text-neutral-950">{selectedCert.certId}</strong></span>
                <span>•</span>
                <span>Exam: <strong className="font-mono text-neutral-950">{selectedCert.examId}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Active through {selectedCert.expires}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
