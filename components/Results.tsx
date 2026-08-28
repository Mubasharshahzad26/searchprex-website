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

// Written answer-first so an AI summariser can lift a complete, attributable
// fact out of any single entry: who, what changed, by how much, over what
// period. Each links to the service page that explains the work, not just to
// the case study — contextual internal linking rather than a repeated
// "learn more" pointing at one destination.
const results = [
  {
    label: "Ecommerce · United States",
    title:
      "SMK Store's monthly revenue went from $5,832 to $19,100 between April and June 2026, after I recovered a 35,000-product catalog from mass non-indexing.",
    metric: "+227% revenue",
    href: "/case-studies/ecommerce/smk-store",
    service: { label: "How I do ecommerce SEO", href: "/services/ecommerce-seo" },
  },
  {
    label: "Technical · Michigan, United States",
    title:
      "Michigan Outdoor Sports went from roughly 3,000 indexed pages to 11,549 between May and July 2026 — and US organic clicks rose 83% over the same period.",
    metric: "+285% indexed",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
    service: { label: "How I fix indexing", href: "/services/technical-seo" },
  },
  {
    label: "Local · United States",
    title:
      "HVAC Services Team reached the Google map pack top 3 and earned an AI Overview placement in 60 days, starting from no local visibility at all.",
    metric: "Top 3 maps",
    href: "/case-studies/hvac/local-hvac-services",
    service: { label: "How I do local SEO", href: "/services/local-seo" },
  },
];

const videos = [
  { id: "gFod-dTY-bg", client: "SMK Store", note: "Ecommerce · +227% store revenue" },
  { id: "Y5PxSECNGP0", client: "Michigan Outdoor Sports", note: "Technical · +285% indexed" },
  { id: "g_1TfDU4YeA", client: "Local HVAC Services", note: "Local · Top 3 map pack" },
  { id: "zRcTc2HqDwU", client: "Glendora Kitchens", note: "Local · Top 10 rankings" },
];

export default function Results() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden border-y border-[#e6e8f0] bg-[#f8f9fc]"
      id="results"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3eb489]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="grid gap-6 border-b border-[#e6e8f0] pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-[#196b4d]">
              Undeniable Proof
            </p>
            <h2 className="text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
              Every number below has a live recording behind it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#566070]">
              Screenshots can be faked. Slide decks can be manipulated. That's why I record live video walkthroughs of my clients' actual Google Search Console accounts. See the exact dates, properties, and revenue growth. Nothing is hidden.
            </p>
          </div>
          <Link
            href="/all-case-studies"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0a0f2e] transition-colors hover:bg-[#f8f9fc] ring-1 ring-[#e6e8f0]"
          >
            Browse all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Case cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {results.map((r) => (
            <div key={r.href} className="flex flex-col">
              <Link
                href={r.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e6e8f0] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#534AB7]/40 hover:shadow-lg"
              >
                
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#534AB7]">
                  {r.label}
                </p>
                <h3 className="relative z-10 mb-8 text-lg font-bold leading-snug text-[#0a0f2e] transition-colors">
                  {r.title}
                </h3>
                
                <div className="mt-auto flex items-center justify-between border-t border-[#eef0f6] pt-5">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#3eb489]/10 px-3.5 py-1.5 text-sm font-black text-[#196b4d] ring-1 ring-[#3eb489]/30">
                    <ShieldCheck className="h-4 w-4" /> {r.metric}
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#94a3b8] transition-transform group-hover:translate-x-1 group-hover:text-[#534AB7]" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* The recordings — same section, directly under the claims */}
        <p
          className="mb-6 mt-16 text-xs font-black uppercase tracking-widest text-[#534AB7]"
        >
          Watch the Live Search Console Sessions
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVideo(v.id)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0f172a] text-left shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#534AB7]/20 hover:ring-[#534AB7]/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={`${v.client} — live Google Search Console screen recording`}
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e] via-[#0a0f2e]/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3eb489] shadow-xl shadow-[#3eb489]/20 transition-transform duration-300 group-hover:scale-110"
                >
                  <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-base font-bold text-white">{v.client}</p>
                <p className="mt-1 text-xs font-medium text-[#3eb489]">{v.note}</p>
              </div>
            </button>
          ))}
        </div>

        {/* One CTA, the same offer as everywhere else */}
        <div
          className="mt-16 flex flex-col items-center justify-center gap-5 border-t border-[#e6e8f0] pt-12 sm:flex-row"
        >
          <span className="text-sm font-semibold text-[#566070]">
            Ready to be the next result?
          </span>
          <Link
            href={OFFER_HREF}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1a7d59] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#1a7d59]/20 transition-all hover:-translate-y-0.5"
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
