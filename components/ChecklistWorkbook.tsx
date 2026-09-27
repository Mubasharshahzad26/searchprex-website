"use client";

// components/ChecklistWorkbook.tsx
//
// The interactive, ungated checklist: tick boxes saved in this browser, a
// progress rail, print-to-PDF, and one offer at the end. Generalised from the
// law firm checklist so every checklist page (law, Google Business Profile,
// WooCommerce, technical SEO) behaves the same.
//
// Deliberately NOT a lead magnet: no email wall, no modal. The point of these
// pages is that search engines and answer engines can read every word — the
// gated PDFs are offered elsewhere, on the service pages.
//
// Data comes in as props from a server page, so it is read from the same
// lib/*-checklist.ts files the PDFs are built from.

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin, Search, Bot, Scale, FileText, Star, Link as LinkIcon, Eye, Gauge, Code2, ShoppingCart, Layers,
  Printer, RotateCcw, ArrowRight, Check, AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { color, heading, radius, text, focusRing, surface } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_MICROCOPY } from "@/lib/offer";
import type { ChecklistPillar } from "@/lib/law-firm-checklist";

const ICONS: Record<string, LucideIcon> = {
  MapPin, Search, Bot, Scale, FileText, Star, Link: LinkIcon, Eye, Gauge, Code2, ShoppingCart, Layers,
};

export interface ChecklistWorkbookProps {
  pillars: ChecklistPillar[];
  /** localStorage key; bump the version suffix if check ids change. */
  storageKey: string;
  closerTitle: string;
  closerBody: string;
  ctaLabel: string;
  /** Optional small print under the closer. */
  disclaimer?: string;
}

export default function ChecklistWorkbook({ pillars, storageKey, closerTitle, closerBody, ctaLabel, disclaimer }: ChecklistWorkbookProps) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const total = pillars.reduce((n, p) => n + p.checks.length, 0);

  // Read after mount, never during render — the server has no localStorage.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // Private mode, blocked site data or malformed JSON: works without it.
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(done));
    } catch {
      /* see above */
    }
  }, [done, loaded, storageKey]);

  const count = Object.values(done).filter(Boolean).length;
  const pct = Math.round((count / total) * 100);
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <>
      <style>{`
        @media print {
          header, footer, .sp-no-print { display: none !important; }
          .sp-check-card { break-inside: avoid; border-color: #cbd5e1 !important; }
          .sp-pillar { break-before: page; }
          .sp-pillar:first-of-type { break-before: auto; }
          a[href]::after { content: ""; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* Progress rail. top-20 matches the fixed site header's height. */}
      <div className="sp-no-print sticky top-20 z-30 border-b backdrop-blur" style={{ background: "rgba(255,255,255,0.92)", borderColor: color.border }}>
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex-1">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className={text.caption} style={{ color: color.muted }}>
                {loaded ? `${count} of ${total} checked` : `${total} checks`}
              </span>
              <span className="text-xs font-semibold" style={{ color: color.primary }}>
                {loaded ? `${pct}%` : ""}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: color.surfaceAlt }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${loaded ? pct : 0}%`, background: color.primary }} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className={`inline-flex shrink-0 items-center gap-1.5 ${radius.control} border px-3 py-2 text-xs font-semibold transition-colors hover:bg-[#f8f9fc] ${focusRing}`}
            style={{ borderColor: color.borderStrong, color: color.ink }}
          >
            <Printer className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Save as PDF</span>
          </button>
          {count > 0 ? (
            <button
              type="button"
              onClick={() => setDone({})}
              className={`inline-flex shrink-0 items-center gap-1.5 ${radius.control} px-2 py-2 text-xs font-medium transition-colors hover:bg-[#f8f9fc] ${focusRing}`}
              style={{ color: color.subtle }}
              aria-label="Reset all checks"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {pillars.map((pillar, pi) => {
          const Icon = ICONS[pillar.icon] ?? FileText;
          const pillarDone = pillar.checks.filter((c) => done[c.id]).length;
          return (
            <section key={pillar.id} id={pillar.id} className={`sp-pillar ${pi > 0 ? "mt-16" : ""}`} aria-labelledby={`${pillar.id}-heading`}>
              <div className="mb-6 flex items-start gap-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center ${radius.chip}`} style={{ background: color.primarySoft }}>
                  <Icon className="h-6 w-6" style={{ color: color.primary }} aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 id={`${pillar.id}-heading`} className={heading.h3} style={{ color: color.ink }}>
                      {pillar.name}
                    </h2>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: pillarDone === pillar.checks.length ? color.successDark : color.subtle }}>
                      {pillarDone}/{pillar.checks.length}
                    </span>
                  </div>
                  <p className={text.small} style={{ color: color.muted }}>
                    {pillar.blurb}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {pillar.checks.map((c) => {
                  const isDone = Boolean(done[c.id]);
                  return (
                    <li key={c.id}>
                      <div
                        className={`sp-check-card ${radius.card} border p-4 transition-colors sm:p-5`}
                        style={{ borderColor: isDone ? color.success : color.border, background: isDone ? "#f6fdfa" : color.white }}
                      >
                        <div className="flex items-start gap-3.5">
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={isDone}
                            aria-label={c.title}
                            onClick={() => toggle(c.id)}
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${focusRing}`}
                            style={{ borderColor: isDone ? color.successButton : color.borderStrong, background: isDone ? color.successButton : "transparent" }}
                          >
                            {isDone ? <Check className="h-3.5 w-3.5 text-white" aria-hidden /> : null}
                          </button>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <h3 className="text-[15px] font-semibold leading-snug" style={{ color: color.ink }}>
                                {c.title}
                              </h3>
                              {c.critical ? (
                                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "#fef2f2", color: "#b91c1c" }}>
                                  <AlertTriangle className="h-2.5 w-2.5" aria-hidden />
                                  Fix first
                                </span>
                              ) : null}
                            </div>
                            <p className={text.small} style={{ color: color.muted }}>
                              {c.how}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <div className={`mt-16 ${radius.card} border p-7 sm:p-9`} style={{ borderColor: color.border, background: color.surface }}>
          <h2 className={`${heading.h3} mb-3`} style={{ color: color.ink }}>
            {closerTitle}
          </h2>
          <p className={`${text.body} mb-6`} style={{ color: color.muted }}>
            {closerBody}
          </p>
          <div className="sp-no-print flex flex-wrap items-center gap-3">
            <Link href={OFFER_HREF} className={`${surface.ctaPrimary} ${focusRing}`}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className={`${text.caption} mt-4`} style={{ color: color.subtle }}>
            {OFFER_MICROCOPY}
          </p>
        </div>

        {disclaimer ? (
          <p className={`${text.caption} mt-10`} style={{ color: color.subtle }}>
            {disclaimer}
          </p>
        ) : null}
      </div>
    </>
  );
}
