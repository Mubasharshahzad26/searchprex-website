"use client";

import React from "react";
import Link from "next/link";
import { Info, UserCheck, Calendar, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export interface QuickAnswerBullet {
  label: string;
  detail: React.ReactNode;
}

interface ServiceQuickAnswerBoxProps {
  eyebrow: string;
  h2: string;
  /** 45-to-60-word direct Answer Capsule engineered for Google AI Overviews, Featured Snippets, and ChatGPT Search */
  answerCapsule: string;
  contextParagraph?: React.ReactNode;
  bullets: QuickAnswerBullet[];
  complianceBadge?: string;
  showLocationLink?: boolean;
}

export default function ServiceQuickAnswerBox({
  eyebrow,
  h2,
  answerCapsule,
  contextParagraph,
  bullets,
  complianceBadge = "USA Market · AEO & GEO Citation Standard",
  showLocationLink = false,
}: ServiceQuickAnswerBoxProps) {
  return (
    <section className="bg-white py-10 sm:py-14 border-b border-slate-200 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          id="quick-answer"
          className="relative overflow-hidden rounded-3xl border-2 border-neutral-900/20 bg-gradient-to-br from-white via-slate-50/40 to-white p-6 sm:p-10 shadow-sm before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-neutral-900"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
            <Info className="h-4 w-4 text-neutral-900" aria-hidden />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            {h2}
          </h2>

          {/* 45-60 Word Direct AI Overview & Featured Snippet Answer Capsule */}
          <div className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
              AI Overview &amp; ChatGPT Direct Answer Summary
            </p>
            <p className="text-base sm:text-lg font-bold leading-relaxed text-neutral-950">
              {answerCapsule}
            </p>
          </div>

          {contextParagraph ? (
            <div className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {contextParagraph}
            </div>
          ) : null}

          {/* Structured Entity Takeaways for RAG / LLM Scrapers */}
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {bullets.map((b, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-700"
              >
                <CheckCircle2 className="h-4 w-4 text-neutral-900 shrink-0 mt-0.5" aria-hidden />
                <div>
                  <strong className="text-neutral-950">{b.label}:</strong> {b.detail}
                </div>
              </li>
            ))}
          </ul>

          {/* E-E-A-T Author, #1 Cleveland Mastery & Reviewer Attribution Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                <UserCheck className="h-4 w-4 text-neutral-900" aria-hidden />
                <span>
                  Strategy by{" "}
                  <Link href="/about" className="font-bold underline hover:text-neutral-700">
                    Mubashar Sharif, Founder
                  </Link>{" "}
                  (5+ Years SEO Mastery)
                </span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4 text-neutral-900" aria-hidden />
                <span>
                  #1 Ranked in{" "}
                  {showLocationLink ? (
                    <Link href="/locations/ohio/cleveland" className="font-bold text-neutral-900 underline">
                      Cleveland, Ohio USA
                    </Link>
                  ) : (
                    <strong className="font-bold text-neutral-900">Cleveland, Ohio USA</strong>
                  )}{" "}
                  Local SEO Mastery
                </span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-500" aria-hidden />
                <span>Reviewed: October 2026</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                {complianceBadge}
              </span>
              <a
                href="#diagnose"
                className="inline-flex items-center gap-1 text-xs font-bold text-neutral-950 hover:underline"
              >
                <span>Run AI Diagnosis</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
