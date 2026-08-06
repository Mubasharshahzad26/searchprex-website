"use client";

// components/layout/CaseStudyPanel.tsx
// A case study rendered as video + metrics + Challenge / Strategy / Outcome.
//
// The three-part narrative is the point: a metric with no story behind it reads
// as a boast, and it's the story that makes the page quotable by an AI answer
// engine. Keep all three filled in.
//
// The YouTube iframe is only mounted once the user opens the modal — embedding
// it on load would pull ~700KB of YouTube JS into every page that shows a case
// study, for a video most visitors never play.

import { useEffect, useState } from "react";
import { Play, X, Youtube } from "lucide-react";
import { color, focusRing, heading, radius, text } from "@/lib/design-tokens";

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyPanelProps {
  /** YouTube video id. */
  videoId: string;
  /** Alt text for the poster frame, and the modal's accessible title. */
  videoTitle: string;
  metrics: CaseStudyMetric[];
  challenge: string;
  /** The plan. Labelled "Strategy" in the UI. */
  strategy: string;
  outcome: string;
  /** Label on the play button under the narrative. */
  ctaLabel?: string;
}

export default function CaseStudyPanel({
  videoId,
  videoTitle,
  metrics,
  challenge,
  strategy,
  outcome,
  ctaLabel = "Watch full case study",
}: CaseStudyPanelProps) {
  const [open, setOpen] = useState(false);

  // Escape closes the modal, and the page behind it must not scroll while it's
  // up — both are things a bare conditional render doesn't give you.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div
        className={`overflow-hidden ${radius.card} border bg-white lg:grid lg:grid-cols-2`}
        style={{ borderColor: color.border }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play video: ${videoTitle}`}
          className={`group relative min-h-[320px] w-full cursor-pointer lg:min-h-full ${focusRing}`}
          style={{ background: color.ink }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-1.5 ${radius.chip} px-2.5 py-1 text-xs font-semibold text-white`}
            style={{ background: color.primary }}
          >
            <Youtube className="h-3 w-3" aria-hidden /> Watch walkthrough
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-transform group-hover:scale-105"
              style={{ background: color.primary }}
            >
              <Play className="ml-1 h-7 w-7 fill-white text-white" aria-hidden />
            </span>
          </span>
        </button>

        <div className="p-8 lg:p-10">
          <dl className="mb-8 grid grid-cols-3 gap-6 border-b pb-8" style={{ borderColor: color.border }}>
            {metrics.map((m) => (
              <div key={m.label}>
                <dd className="text-2xl font-bold tracking-tight" style={{ color: color.ink }}>
                  {m.value}
                </dd>
                <dt className={`${heading.eyebrow} mt-1`} style={{ color: color.muted }}>
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="space-y-6">
            <NarrativeRow label="Challenge" body={challenge} />
            <NarrativeRow label="Strategy" body={strategy} />
            <NarrativeRow label="Outcome" body={outcome} />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`mt-8 inline-flex items-center gap-2 ${radius.control} px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#3C3489] ${focusRing}`}
            style={{ background: color.primary }}
          >
            <Play className="h-4 w-4 fill-white" aria-hidden /> {ctaLabel}
          </button>
        </div>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={videoTitle}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white ${focusRing}`}
            >
              Close <X className="h-5 w-5" aria-hidden />
            </button>
            <div className={`relative aspect-video overflow-hidden ${radius.card} bg-black`}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={videoTitle}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function NarrativeRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[110px_1fr]">
      <p className={heading.eyebrow} style={{ color: color.primary }}>
        {label}
      </p>
      <p className={text.small} style={{ color: color.muted }}>
        {body}
      </p>
    </div>
  );
}
