"use client";

// components/ProofImage.tsx
// A screenshot that behaves like evidence: it says where it came from and
// when, puts the figure it proves in type a visitor can read without opening
// it, and opens full size on click.
//
// Evidence is only persuasive if it can be inspected. A dashboard screenshot
// scaled down to fit a card is decoration — the visitor can see that a figure
// exists but not read it, which is the same as asking them to take your word
// for it. Hover magnifies; click opens the full-resolution capture in a
// dialog where the numbers and dates are legible.
//
// The evidence-card layer is optional. Source, property and date come from
// lib/proof-meta.ts by path (or from props), and put the capture in a browser
// frame naming the tool it was taken in; pass `figure` and the number leads
// the card. A path with no entry renders as a plain framed capture.
//
// Built on the same Radix Dialog as the video modal, so it gets a real focus
// trap, Escape handling and focus restore rather than a hand-rolled overlay.

import Image from "next/image";
import { useState } from "react";
import { BarChart3, MapPin, Maximize2, Search, ShoppingCart, Sparkles, type LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { color, radius } from "@/lib/design-tokens";
import { PROOF_META } from "@/lib/proof-meta";

/** Where a capture was taken. Drives the icon and the address in the frame. */
export type ProofSource =
  | "Google Search Console"
  | "Google Search"
  | "Google AI Overview"
  | "Google Business Profile"
  | "WooCommerce";

const SOURCE_META: Record<ProofSource, { icon: LucideIcon; host: (domain?: string) => string }> = {
  "Google Search Console": { icon: BarChart3, host: (d) => (d ? `search.google.com · ${d}` : "search.google.com/search-console") },
  "Google Search": { icon: Search, host: () => "google.com/search" },
  "Google AI Overview": { icon: Sparkles, host: () => "google.com/search" },
  "Google Business Profile": { icon: MapPin, host: () => "business.google.com" },
  WooCommerce: { icon: ShoppingCart, host: (d) => (d ? `${d}/wp-admin` : "wp-admin · WooCommerce") },
};

export type ProofImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short label shown under the image. Optional so a caller that presents
   *  the figure itself above the frame is not forced to render an empty line. */
  caption?: string;
  /** CSS aspect-ratio for a fixed frame, e.g. "16 / 9". When set, the capture
   *  is letterboxed inside it with object-contain instead of setting its own
   *  height. Use it when several captures of DIFFERENT native aspect ratios sit
   *  in one row: without it their heights differ, and every caption below them
   *  lands at a different vertical position. Deliberately object-contain, never
   *  object-cover — cropping a proof screenshot to tidy a layout removes the
   *  evidence the screenshot exists to carry. */
  frameAspect?: string;
  /** Optional second line of context. */
  note?: string;
  /** Rendered above the card as a small eyebrow, e.g. "Before". */
  stage?: string;
  stageTone?: string;
  sizes?: string;
  eager?: boolean;
  /** Tool the capture was taken in. Turns on the header and browser frame. */
  source?: ProofSource;
  /** Capture date or the period shown, e.g. "21 Aug 2026" or "Jan–Dec 2024". */
  when?: string;
  /** Site or property in the capture, shown in the frame's address bar. */
  domain?: string;
  /** The number this capture proves, shown large above it, e.g. "113K". */
  figure?: string;
  figureLabel?: string;
  /** Change against the comparison period, e.g. "+214% vs 2023". */
  delta?: string;
};

export default function ProofImage({
  src,
  alt,
  width,
  height,
  caption,
  note,
  stage,
  stageTone = color.primary,
  sizes = "(max-width: 640px) 100vw, 420px",
  eager = false,
  frameAspect,
  source: sourceProp,
  when: whenProp,
  domain: domainProp,
  figure,
  figureLabel,
  delta,
}: ProofImageProps) {
  const [open, setOpen] = useState(false);
  // Explicit props win; otherwise the capture's entry in lib/proof-meta.ts.
  const known = PROOF_META[src];
  const source = sourceProp ?? known?.source;
  const when = whenProp ?? known?.when;
  const domain = domainProp ?? known?.domain;
  const meta = source ? SOURCE_META[source] : undefined;
  const Icon = meta?.icon;

  const capture = (
    <span
      className="relative block w-full overflow-hidden"
      style={frameAspect ? { aspectRatio: frameAspect, background: color.white } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        // Magnify in place. The wrapper clips, so the screenshot grows into
        // the frame rather than pushing the layout around.
        className={`origin-center transition-transform duration-500 ease-out group-hover:scale-[1.12] motion-reduce:transform-none motion-reduce:transition-none ${
          frameAspect ? "h-full w-full object-contain" : "h-auto w-full"
        }`}
      />
    </span>
  );

  return (
    <>
      <figure className="m-0">
        {stage && (
          <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: stageTone }}>
            {stage}
          </p>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge screenshot: ${caption || alt}`}
          className={`group relative block w-full cursor-zoom-in overflow-hidden border text-left transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2 ${radius.card}`}
          style={{ borderColor: color.border, background: color.white }}
        >
          {/* Header — where the capture came from, and when. */}
          {meta && Icon ? (
            <span className="flex items-center justify-between gap-3 border-b px-3.5 py-2.5" style={{ borderColor: color.border }}>
              <span className="flex min-w-0 items-center gap-1.5 text-xs font-bold" style={{ color: color.ink }}>
                <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: color.primary }} aria-hidden="true" />
                <span className="truncate">{source}</span>
              </span>
              <span className="flex-shrink-0 rounded-md bg-[#e8f6ef] px-2 py-0.5 text-[11px] font-bold text-[#11643f]">
                {/* "Original", not "Unedited": some captures are cropped to
                    the relevant rows, and the pages say so. */}
                Original{when ? ` · ${when}` : ""}
              </span>
            </span>
          ) : null}

          {/* The figure the capture proves, readable without opening it. */}
          {figure ? (
            <span className="block px-3.5 pt-3">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-2xl font-black tabular-nums" style={{ color: color.ink }}>
                  {figure}
                </span>
                {figureLabel ? (
                  <span className="text-sm" style={{ color: color.muted }}>
                    {figureLabel}
                  </span>
                ) : null}
              </span>
              {delta ? <span className="mt-0.5 block text-xs font-bold text-[#11643f]">{delta}</span> : null}
            </span>
          ) : null}

          {meta ? (
            // Browser frame: the address bar names the tool (and property)
            // the screenshot was taken in.
            <span className="m-3 block overflow-hidden rounded-lg border" style={{ borderColor: color.border }}>
              <span className="flex items-center gap-1.5 border-b px-2.5 py-1.5" style={{ borderColor: color.border, background: color.surface }}>
                <span className="h-2 w-2 rounded-full bg-[#d4d8e3]" />
                <span className="h-2 w-2 rounded-full bg-[#d4d8e3]" />
                <span className="h-2 w-2 rounded-full bg-[#d4d8e3]" />
                <span className="ml-2 truncate text-[11px]" style={{ color: color.muted }}>
                  {meta.host(domain)}
                </span>
              </span>
              {capture}
            </span>
          ) : (
            capture
          )}

          {/* Affordance — always visible, because touch devices have no hover
              and a screenshot that can be inspected has to look like it. */}
          <span
            className={`pointer-events-none absolute flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold text-white opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
              meta ? "bottom-5 right-5" : "right-2 top-2"
            }`}
            style={{ background: "rgba(10,15,46,0.82)" }}
          >
            <Maximize2 className="h-3 w-3" aria-hidden="true" /> View full size
          </span>
        </button>

        <figcaption className="mt-2">
          {/* With a figure on the card the caption only repeats it; it still
              labels the enlarge button and the full-size view. */}
          {caption && !figure && (
            <span className="block text-sm font-bold tabular-nums" style={{ color: color.ink }}>
              {caption}
            </span>
          )}
          {note && (
            <span className="block text-xs leading-snug" style={{ color: color.muted }}>
              {note}
            </span>
          )}
        </figcaption>
      </figure>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl" showCloseButton={false}>
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className={`overflow-hidden border-4 border-white shadow-2xl ${radius.card}`} style={{ background: color.white }}>
            <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 1024px) 100vw, 960px" className="h-auto w-full" />
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            {source ? (
              <p className="text-center text-xs font-bold uppercase tracking-widest text-white/70">
                {source}
                {domain ? ` · ${domain}` : ""}
                {when ? ` · ${when}` : ""}
              </p>
            ) : null}
            {caption ? <p className="text-center text-sm font-semibold text-white">{caption}</p> : null}
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
