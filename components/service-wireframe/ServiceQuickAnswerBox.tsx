"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface QuickAnswerBullet {
  label: string;
  detail: React.ReactNode;
}

interface ServiceQuickAnswerBoxProps {
  eyebrow?: string;
  h2: string;
  /** 45-to-60-word direct Answer Capsule engineered for Google AI Overviews, Featured Snippets, and ChatGPT Search */
  answerCapsule: string;
  contextParagraph?: React.ReactNode;
  bullets: QuickAnswerBullet[];
  complianceBadge?: string;
  showLocationLink?: boolean;
}

export default function ServiceQuickAnswerBox({
  h2,
  answerCapsule,
  contextParagraph,
  bullets,
  complianceBadge = "ABA Model Rule 7.1 & Google YMYL Aligned",
  showLocationLink = false,
}: ServiceQuickAnswerBoxProps) {
  return (
    <section className="bg-slate-50/70 py-12 sm:py-16 border-b border-slate-200 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          id="quick-answer"
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-2xs"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            {h2}
          </h2>

          {/* 45-60 Word Direct AI Overview & Featured Snippet Answer Capsule */}
          <div className="mt-5 rounded-xl border-l-4 border-l-neutral-950 border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-base sm:text-lg font-bold leading-relaxed text-neutral-950">
              {answerCapsule}
            </p>
          </div>

          {contextParagraph ? (
            <div className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
              {contextParagraph}
            </div>
          ) : null}

          {/* Clean Numbered Entity Takeaways (No Colored Icons or Emojis) */}
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {bullets.map((b, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs sm:text-sm text-slate-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-950 text-[11px] font-black text-white mt-0.5">
                  0{idx + 1}
                </span>
                <div className="leading-relaxed">
                  <strong className="text-neutral-950 font-bold">{b.label}:</strong> {b.detail}
                </div>
              </li>
            ))}
          </ul>

          {/* Clean Monochrome E-E-A-T Attribution Bar */}
          <div className="mt-7 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-2 font-semibold text-neutral-950">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
                <span>
                  Strategy by{" "}
                  <Link href="/about" className="font-bold underline hover:text-neutral-700">
                    Mubashar Sharif, Founder
                  </Link>{" "}
                  (5+ Years SEO Mastery)
                </span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="flex items-center gap-2 font-medium text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
                <span>
                  Ranked #1 on Google in Ohio for{" "}
                  {showLocationLink ? (
                    <Link href="/locations/ohio/cleveland" className="font-bold text-neutral-950 underline">
                      &ldquo;Law Firm SEO Cleveland Ohio&rdquo;
                    </Link>
                  ) : (
                    <strong className="font-bold text-neutral-950">
                      &ldquo;Law Firm SEO Cleveland Ohio&rdquo;
                    </strong>
                  )}
                </span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
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
                <ArrowRight className="h-3.5 w-3.5 text-neutral-950" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
