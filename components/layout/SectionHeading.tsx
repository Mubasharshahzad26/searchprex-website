// components/layout/SectionHeading.tsx
// Eyebrow + h2 + intro. Every section title on the site goes through this so the
// type scale and the accent colour stay identical page to page.
//
// The eyebrow is a <span>, not a heading — it must not enter the document
// outline, otherwise the h1→h2→h3 order breaks for screen readers and Google.

import { color, heading, text } from "@/lib/design-tokens";

export interface SectionHeadingProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  /** The section title. Rendered as h2 by default. */
  title: React.ReactNode;
  /** Supporting paragraph under (or beside) the title. */
  intro?: React.ReactNode;
  /**
   * `stacked` — title then intro, left aligned. The default.
   * `split`   — title left, intro in a second column on large screens.
   * `center`  — both centred, for CTA and demo bands.
   */
  variant?: "stacked" | "split" | "center";
  /** Drop to h3 when this heading sits inside an already-h2 section. */
  as?: "h2" | "h3";
  /** Renders light-on-dark for `tone="ink"` sections. */
  onDark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  variant = "stacked",
  as: Tag = "h2",
  onDark = false,
  className = "",
}: SectionHeadingProps) {
  const titleColor = onDark ? color.white : color.ink;
  const introColor = onDark ? "rgba(255,255,255,0.62)" : color.muted;
  const eyebrowColor = onDark ? "#A79FED" : color.primary;

  const eyebrowEl = eyebrow ? (
    <span className={`${heading.eyebrow} mb-3 block`} style={{ color: eyebrowColor }}>
      {eyebrow}
    </span>
  ) : null;

  const titleEl = (
    <Tag className={Tag === "h2" ? heading.h2 : heading.h3} style={{ color: titleColor }}>
      {title}
    </Tag>
  );

  const introEl = intro ? (
    <p className={`${text.lead} ${variant === "split" ? "lg:mt-2" : "mt-4"}`} style={{ color: introColor }}>
      {intro}
    </p>
  ) : null;

  if (variant === "split") {
    return (
      <div className={`mb-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16 ${className}`}>
        <div>
          {eyebrowEl}
          {titleEl}
        </div>
        {introEl}
      </div>
    );
  }

  if (variant === "center") {
    return (
      <div className={`mb-10 text-center ${className}`}>
        {eyebrowEl}
        {titleEl}
        {intro ? (
          <p className={`${text.lead} mx-auto mt-4 max-w-2xl`} style={{ color: introColor }}>
            {intro}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`mb-10 max-w-2xl ${className}`}>
      {eyebrowEl}
      {titleEl}
      {introEl}
    </div>
  );
}
