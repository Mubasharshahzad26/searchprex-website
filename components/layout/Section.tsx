// components/layout/Section.tsx
// The vertical band every page is built from. Owns background, hairline border,
// vertical rhythm, and container width so no page hand-rolls them again.

import { color, layout } from "@/lib/design-tokens";

export type SectionTone = "white" | "surface" | "ink";
export type SectionWidth = "default" | "narrow" | "reading";

const toneStyle: Record<SectionTone, React.CSSProperties> = {
  white: { background: color.white },
  surface: { background: color.surface },
  ink: { background: color.ink },
};

const widthClass: Record<SectionWidth, string> = {
  /** Full page width — grids, tables, 3-up cards. */
  default: layout.container,
  /** Demos, author cards, centred CTAs. */
  narrow: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
  /** Long-form prose and FAQ lists — capped for line length. */
  reading: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
};

export interface SectionProps {
  children: React.ReactNode;
  /** Background band. Alternate white/surface down a page; `ink` for the closer. */
  tone?: SectionTone;
  /** Container width. */
  width?: SectionWidth;
  /** Hairline rule at the bottom edge. Skip on the last section before the footer. */
  bordered?: boolean;
  /** Tighter rhythm when two related bands sit next to each other. */
  tight?: boolean;
  /** Anchor target for in-page nav. */
  id?: string;
  className?: string;
}

export default function Section({
  children,
  tone = "white",
  width = "default",
  bordered = true,
  tight = false,
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={bordered ? "border-b" : undefined}
      style={{ ...toneStyle[tone], borderColor: tone === "ink" ? "transparent" : color.border }}
    >
      <div className={`${widthClass[width]} ${tight ? layout.sectionTight : layout.section} ${className}`}>
        {children}
      </div>
    </section>
  );
}
