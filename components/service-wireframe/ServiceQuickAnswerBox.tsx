"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface QuickAnswerBullet {
  label: string;
  detail: React.ReactNode;
}

interface ServiceQuickAnswerBoxProps {
  h2: string;
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
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          id="quick-answer"
          className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50/80 via-white to-white p-6 sm:p-10 shadow-xs"
        >
          {/* Top Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Direct Answer Capsule &middot; AEO &amp; AI Overview Standard</span>
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Updated for 2026 Google Search &amp; ChatGPT Telemetry
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            {h2}
          </h2>

          {/* 45-60 Word Direct Answer Capsule — Clean, Crisp, High-Contrast */}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
            <p className="text-base sm:text-lg font-bold leading-relaxed text-neutral-950">
              {answerCapsule}
            </p>
          </div>

          {contextParagraph ? (
            <div className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {contextParagraph}
            </div>
          ) : null}

          {/* 4 Clean, Concise Numbered Pillar Takeaways (2x2 Grid) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bullets.map((b, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs sm:text-sm text-slate-700 hover:border-neutral-950 hover:bg-white transition-all"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-950 text-[11px] font-black text-white mt-0.5">
                  0{idx + 1}
                </span>
                <div className="leading-snug">
                  <strong className="text-neutral-950 font-bold block mb-0.5">
                    {b.label}
                  </strong>
                  <span className="text-slate-600 text-xs sm:text-sm">{b.detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Modern Attribution Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-semibold text-neutral-950">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
              <span>
                Founder-Led Architecture &middot; {complianceBadge}
              </span>
            </div>

            <a
              href="#diagnose"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 underline hover:text-slate-700"
            >
              <span>Run Interactive AI Diagnosis</span>
              <ArrowRight className="h-3.5 w-3.5 text-neutral-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
