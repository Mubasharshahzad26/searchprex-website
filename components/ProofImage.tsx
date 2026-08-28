"use client";

// components/ProofImage.tsx
// A screenshot that behaves like evidence: it magnifies on hover, and opens
// full size on click.
//
// Evidence is only persuasive if it can be inspected. A dashboard screenshot
// scaled down to fit a card is decoration — the visitor can see that a figure
// exists but not read it, which is the same as asking them to take your word
// for it. Hover magnifies; click opens the full-resolution capture in a
// dialog where the numbers and dates are legible.
//
// Built on the same Radix Dialog as the video modal, so it gets a real focus
// trap, Escape handling and focus restore rather than a hand-rolled overlay.

import Image from "next/image";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { color, radius } from "@/lib/design-tokens";

export type ProofImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short label shown under the image, e.g. the capture date. Optional so a
   *  caller that presents the figure itself above the frame is not forced to
   *  render an empty line here. */
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
  /** Rendered above the image as a small eyebrow, e.g. "Before". */
  stage?: string;
  stageTone?: string;
  sizes?: string;
  eager?: boolean;
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
  sizes = "(max-width: 640px) 100vw, 380px",
  eager = false,
  frameAspect,
}: ProofImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure className="m-0">
        {stage && (
          <p
            className="mb-2 text-xs font-black uppercase tracking-widest"
            style={{ color: stageTone }}
          >
            {stage}
          </p>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge screenshot: ${caption || alt}`}
          className={`group relative block w-full cursor-zoom-in overflow-hidden border transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2 ${radius.card}`}
          style={{ borderColor: color.border, background: color.white }}
        >
          <span
            className="block w-full"
            style={frameAspect ? { aspectRatio: frameAspect, background: color.surface } : undefined}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              loading={eager ? "eager" : "lazy"}
              // Magnify in place. The wrapper clips, so the screenshot grows
              // into the frame rather than pushing the layout around.
              className={`origin-center transition-transform duration-500 ease-out group-hover:scale-[1.18] motion-reduce:transform-none motion-reduce:transition-none ${
                frameAspect ? "h-full w-full object-contain" : "h-auto w-full"
              }`}
            />
          </span>

          {/* Affordance — a screenshot that magnifies has to look like it will.
              This used to be opacity-0 until :hover, which meant that on every
              touch device — where there is no hover — the badge never appeared
              at all and the screenshots looked like flat images. The evidence
              is only persuasive if the visitor knows it can be inspected, so
              the badge is now always present and merely strengthens on hover. */}
          <span
            className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold text-white opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ background: "rgba(10,15,46,0.82)" }}
          >
            <Maximize2 className="h-3 w-3" aria-hidden="true" /> Click to enlarge
          </span>
        </button>

        <figcaption className="mt-2">
          {caption && (
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
        <DialogContent
          className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div
            className={`overflow-hidden border-4 border-white shadow-2xl ${radius.card}`}
            style={{ background: color.white }}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="h-auto w-full"
            />
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            <p className="text-center text-sm font-semibold text-white">{caption}</p>
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
