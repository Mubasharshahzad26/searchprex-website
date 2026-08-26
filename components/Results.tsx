"use client";

// components/Results.tsx
// Proof: the results, and the recordings behind them, in ONE section.
//
// This used to be two consecutive sections — Results (stats + case cards) and
// VideoSection (four GSC screen recordings) — each with its own eyebrow pill,
// gradient headline and centered intro. Back to back they were two thirds of a
// four-section wall of proof with no offer in between, and the recordings were
// separated from the numbers they evidence.
//
// The stat cards moved up to ProofStrip, directly under the client logos. What
// is left is the claim and its receipt, side by side.
//
// Layout is deliberately left-aligned with no gradient headline: the same
// centered-pill-and-gradient construction appears in enough sections already
// that it had stopped signalling anything.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_CTA } from "@/lib/offer";

const results = [
  {
    label: "Ecommerce SEO · United States",
    title:
      "Mass non-indexing recovered across a 35,000-product catalog — 12,581 crawled-but-unindexed pages diagnosed in Search Console.",
    metric: "Indexing recovered",
    href: "/case-studies/ecommerce/smk-store",
  },
  {
    label: "Technical SEO · Michigan, USA",
    title:
      "+285% pages indexed and +83% US organic clicks — roughly 3,000 to 11,549 indexed pages between May and July 2026.",
    metric: "+285% indexed",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
  },
  {
    label: "Local SEO · United States",
    title:
      "Top 3 map pack and a Google AI Overview placement — from zero local visibility in 60 days.",
    metric: "Top 3 maps",
    href: "/case-studies/hvac/local-hvac-services",
  },
];

const videos = [
  { id: "gFod-dTY-bg", client: "SMK Store", note: "Ecommerce · indexing recovery" },
  { id: "Y5PxSECNGP0", client: "Michigan Outdoor Sports", note: "Technical · +285% indexed" },
  { id: "g_1TfDU4YeA", client: "Local HVAC Services", note: "Local · Top 3 map pack" },
  { id: "zRcTc2HqDwU", client: "Glendora Kitchens", note: "Local · Top 10 rankings" },
];

export default function Results() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section
      className="py-20 sm:py-24"
      style={{ background: color.surface }}
      id="results"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header — left-aligned, split. Variety is how a reader knows they
            have moved to a new section. */}
        <div className="grid gap-6 border-b pb-10 lg:grid-cols-[1fr_auto] lg:items-end"
             style={{ borderColor: color.border }}>
          <div className="max-w-2xl">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: color.primary }}
            >
              Results &amp; the recordings behind them
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: color.ink }}
            >
              Every number here has a screen recording.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: color.muted }}>
              Not edited screenshots. Live Google Search Console sessions, recorded on the
              client&apos;s own property, so you can see the date range and the account they
              came from.
            </p>
          </div>
          <Link
            href="/all-case-studies"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold"
            style={{ color: color.primary }}
          >
            Browse all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Case cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`group relative flex flex-col overflow-hidden border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${radius.card}`}
              style={{ background: color.white, borderColor: color.border }}
            >
              <p
                className="mb-3 text-[11px] font-bold uppercase tracking-widest"
                style={{ color: color.primary }}
              >
                {r.label}
              </p>
              <h3
                className="mb-6 text-lg font-black leading-snug"
                style={{ color: color.ink }}
              >
                {r.title}
              </h3>
              <div
                className="mt-auto flex items-center justify-between border-t pt-4"
                style={{ borderColor: color.border }}
              >
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-black"
                  style={{ background: `${color.success}1a`, color: color.successDark }}
                >
                  <ShieldCheck className="h-4 w-4" /> {r.metric}
                </span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  style={{ color: color.muted }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* The recordings — same section, directly under the claims */}
        <p
          className="mb-4 mt-12 text-xs font-bold uppercase tracking-widest"
          style={{ color: color.muted }}
        >
          Watch the Search Console sessions
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVideo(v.id)}
              className={`group relative aspect-[4/3] overflow-hidden text-left shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${radius.card}`}
              style={{ background: color.ink }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={`${v.client} — live Google Search Console screen recording`}
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/95 via-[#0a0f2e]/35 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: color.primary }}
                >
                  <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-bold text-white">{v.client}</p>
                <p className="mt-0.5 text-[11px] text-white/80">{v.note}</p>
              </div>
            </button>
          ))}
        </div>

        {/* One CTA, the same offer as everywhere else */}
        <div
          className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-10 sm:flex-row"
          style={{ borderColor: color.border }}
        >
          <span className="text-sm font-semibold" style={{ color: color.muted }}>
            Ready to be the next result?
          </span>
          <Link
            href={OFFER_HREF}
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
            style={{ background: color.primary }}
          >
            {OFFER_CTA} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Video modal — Radix Dialog.
          The hand-rolled version had no Escape handler, no focus trap, no
          role="dialog"/aria-modal, and left the page behind focusable, so a
          keyboard user tabbed straight out of the dialog into content they
          could not see. The primitive gives all of that, plus focus restore
          to the thumbnail that opened it. */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent
          className="max-w-4xl border-0 bg-transparent p-0 shadow-none sm:max-w-4xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {videos.find((v) => v.id === activeVideo)?.client ?? "Case study"} — Google Search
            Console screen recording
          </DialogTitle>
          <div className={`relative aspect-video overflow-hidden bg-black shadow-2xl ${radius.card}`}>
            {activeVideo && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="SearchPrex case study video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="mx-auto rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>

    </section>
  );
}
