// components/ServiceProofStrip.tsx
//
// One or two real client captures directly under a service page's hero, so a
// visitor sees evidence before the long explanation starts. Until now each
// service page opened with text only and kept its screenshots far down the
// page.
//
// Each shot uses ProofImage, which frames the capture, names the tool it came
// from (lib/proof-meta.ts) and opens full size on click. Every figure passed
// here must be readable in the capture itself; the caption says what it shows
// and, where the client isn't the page's audience, says so.

import Link from "next/link";
import ProofImage, { type ProofImageProps } from "@/components/ProofImage";
import { Section } from "@/components/layout";
import { color, heading, text } from "@/lib/design-tokens";

export type ProofShot = Pick<
  ProofImageProps,
  "src" | "alt" | "width" | "height" | "caption" | "note" | "figure" | "figureLabel" | "delta"
>;

export default function ServiceProofStrip({
  id,
  title,
  shots,
  footnote,
  moreHref,
  moreLabel = "See the full case studies",
}: {
  /** Anchor for an in-page link, e.g. the hero's "See the proof". */
  id?: string;
  title: string;
  shots: ProofShot[];
  /** A plain line under the captures, e.g. who the clients are. */
  footnote?: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  const two = shots.length > 1;
  return (
    <Section id={id} tone="surface" tight>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={heading.eyebrow} style={{ color: color.primary }}>
            Proof, not promises
          </p>
          <h2 className={`${heading.h3} mt-1`} style={{ color: color.ink }}>
            {title}
          </h2>
        </div>
        {moreHref ? (
          <Link href={moreHref} className="text-sm font-semibold underline underline-offset-2" style={{ color: color.primary }}>
            {moreLabel}
          </Link>
        ) : null}
      </div>
      <div className={`grid gap-6 ${two ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
        {shots.map((s) => (
          <ProofImage
            key={s.src}
            {...s}
            // Two captures of different shapes in one row: a shared frame keeps
            // their captions level. Letterboxed, never cropped.
            frameAspect={two ? "16 / 7" : undefined}
            sizes={two ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 768px, 100vw"}
          />
        ))}
      </div>
      {footnote ? (
        <p className={`${text.small} mt-5`} style={{ color: color.muted }}>
          {footnote}
        </p>
      ) : null}
    </Section>
  );
}
