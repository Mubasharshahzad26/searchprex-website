"use client";

// components/layout/VideoGallery.tsx
// A grid of video cards sharing one lightbox.
//
// Same reasoning as CaseStudyPanel: the YouTube iframe mounts only after a
// click. Rendering two embeds on load would cost well over a megabyte of
// third-party JS and tank the very Core Web Vitals the technical SEO page is
// selling.

import { useEffect, useState } from "react";
import { Play, X, Youtube } from "lucide-react";
import { color, focusRing, heading, radius, text } from "@/lib/design-tokens";

export interface GalleryVideo {
  /** YouTube video id. */
  id: string;
  title: string;
  /** Caption under the title. */
  sub: string;
}

export interface VideoGalleryProps {
  videos: GalleryVideo[];
  /** Ribbon shown on each thumbnail. */
  badge?: string;
}

export default function VideoGallery({ videos, badge = "Live walkthrough" }: VideoGalleryProps) {
  const [active, setActive] = useState<GalleryVideo | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((v) => (
          <div
            key={v.id}
            className={`overflow-hidden ${radius.card} border bg-white`}
            style={{ borderColor: color.border }}
          >
            <button
              type="button"
              onClick={() => setActive(v)}
              aria-label={`Play video: ${v.title}`}
              className={`group relative block aspect-video w-full cursor-pointer ${focusRing}`}
              style={{ background: color.ink }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
                }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span
                className={`absolute left-4 top-4 inline-flex items-center gap-1.5 ${radius.chip} px-2.5 py-1 text-xs font-semibold text-white`}
                style={{ background: color.primary }}
              >
                <Youtube className="h-3 w-3" aria-hidden /> {badge}
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

            <div className="p-6">
              <h3 className={`${heading.h4} mb-1`} style={{ color: color.ink }}>
                {v.title}
              </h3>
              <p className={text.small} style={{ color: color.muted }}>
                {v.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActive(null)}
              className={`absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white ${focusRing}`}
            >
              Close <X className="h-5 w-5" aria-hidden />
            </button>
            <div className={`relative aspect-video overflow-hidden ${radius.card} bg-black`}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                title={active.title}
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

/** Challenge / Strategy / Outcome as a three-column card. */
export function NarrativeCard({
  challenge,
  strategy,
  outcome,
}: {
  challenge: string;
  strategy: string;
  outcome: string;
}) {
  const rows = [
    ["Challenge", challenge],
    ["Strategy", strategy],
    ["Outcome", outcome],
  ] as const;

  return (
    <div
      className={`mb-8 grid gap-8 ${radius.card} border bg-white p-8 md:grid-cols-3`}
      style={{ borderColor: color.border }}
    >
      {rows.map(([label, body]) => (
        <div key={label}>
          <p className={`${heading.eyebrow} mb-2`} style={{ color: color.primary }}>
            {label}
          </p>
          <p className={text.small} style={{ color: color.muted }}>
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}
