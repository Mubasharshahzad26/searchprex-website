// components/layout/PageHero.tsx
// The one hero every page uses. Guarantees exactly one <h1> with a consistent
// type scale — previously each page picked its own size (text-[44px], text-4xl,
// text-3xl, clamp(22px,6vw,34px)) and its own accent colour.

import { color, heading, layout, text } from "@/lib/design-tokens";
import CtaButton from "./CtaButton";

export interface HeroCta {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export interface PageHeroProps {
  /** Uppercase kicker — usually the service or page category. */
  eyebrow?: string;
  /**
   * The page h1. Pass a string, or a fragment when part of it is accented —
   * wrap the accented run in <Accent>.
   */
  title: React.ReactNode;
  /** Subhead. Keep it to two lines on desktop. */
  subtitle?: React.ReactNode;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  /** Short reassurance items shown under the CTAs. */
  trustPoints?: string[];
  /** Optional right-hand panel — a checklist card, form, or screenshot. */
  aside?: React.ReactNode;
  /** Centre everything. Use when there's no aside. */
  centered?: boolean;
  /**
   * Reduce the top padding. Set this when a Breadcrumb sits directly above the
   * hero — the breadcrumb already supplies the clearance under the fixed nav,
   * and stacking both leaves a dead band of whitespace.
   */
  compactTop?: boolean;
}

/** Accented run inside a hero or section title. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: color.primary }}>{children}</span>;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  trustPoints,
  aside,
  centered = false,
  compactTop = false,
}: PageHeroProps) {
  const hasAside = Boolean(aside) && !centered;

  const body = (
    <div className={centered ? "mx-auto max-w-3xl text-center" : undefined}>
      {eyebrow ? (
        <span
          className={`${heading.eyebrow} mb-5 inline-flex items-center gap-2`}
          style={{ color: color.primary }}
        >
          <span className="h-px w-8" style={{ background: color.primary }} aria-hidden />
          {eyebrow}
        </span>
      ) : null}

      <h1 className={`${heading.h1} mb-6`} style={{ color: color.ink }}>
        {title}
      </h1>

      {subtitle ? (
        <p
          className={`${text.lead} mb-8 ${centered ? "mx-auto max-w-2xl" : "max-w-xl"}`}
          style={{ color: color.muted }}
        >
          {subtitle}
        </p>
      ) : null}

      {primaryCta || secondaryCta ? (
        <div className={`mb-8 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
          {primaryCta ? (
            <CtaButton href={primaryCta.href} icon={primaryCta.icon}>
              {primaryCta.label}
            </CtaButton>
          ) : null}
          {secondaryCta ? (
            <CtaButton href={secondaryCta.href} variant="secondary" icon={secondaryCta.icon}>
              {secondaryCta.label}
            </CtaButton>
          ) : null}
        </div>
      ) : null}

      {trustPoints?.length ? (
        <ul
          className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${text.small} ${
            centered ? "justify-center" : ""
          }`}
          style={{ color: color.muted }}
        >
          {trustPoints.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <CheckGlyph />
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <section className="border-b" style={{ background: color.white, borderColor: color.border }}>
      <div
        className={`${layout.container} pb-16 lg:pb-24 ${
          compactTop ? "pt-8 lg:pt-10" : "pt-20 lg:pt-28"
        }`}
      >
        {hasAside ? (
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            {body}
            <div className="lg:pt-2">{aside}</div>
          </div>
        ) : (
          body
        )}
      </div>
    </section>
  );
}

function CheckGlyph() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color.primary}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
