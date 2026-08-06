// components/layout/HeroPanel.tsx
// The bordered card that sits beside a hero — a console-style frame with a
// labelled header, a body, and a fine-print footer. Every service page had its
// own copy of this markup with slightly different radii and greys.
//
// Pass `live` to show the pulsing status dot used when the panel is reporting a
// real client's numbers.

import { color, heading, radius, text } from "@/lib/design-tokens";

export interface HeroPanelProps {
  /** Header label, e.g. "Built for law firms" or "Live client · HVAC · US". */
  label: string;
  /** Right-hand header note, e.g. "GSC verified" or "2026 aligned". */
  note?: string;
  /** Icon shown before the label. Omit when using `live`. */
  icon?: React.ReactNode;
  /** Shows a green status dot instead of an icon. */
  live?: boolean;
  /** Fine print along the bottom edge. */
  footer?: string;
  children: React.ReactNode;
}

export default function HeroPanel({ label, note, icon, live, footer, children }: HeroPanelProps) {
  return (
    <div className={`${radius.card} border bg-white`} style={{ borderColor: color.border }}>
      <div
        className="flex items-center justify-between gap-3 border-b px-5 py-3"
        style={{ borderColor: color.border }}
      >
        <span className="flex items-center gap-2">
          {live ? (
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: color.success }}
              aria-hidden
            />
          ) : (
            icon
          )}
          <span className={heading.eyebrow} style={{ color: color.ink }}>
            {label}
          </span>
        </span>
        {note ? (
          <span className={text.caption} style={{ color: color.muted }}>
            {note}
          </span>
        ) : null}
      </div>

      {children}

      {footer ? (
        <div
          className={`${text.caption} border-t px-5 py-3`}
          style={{ borderColor: color.border, color: color.muted }}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}

/** Two-column metric grid for use inside a HeroPanel. */
export function HeroPanelStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < stats.length - 2 ? "border-b" : ""}`}
          style={{ borderColor: color.border }}
        >
          <dd className="text-[32px] font-bold leading-none tracking-tight" style={{ color: color.ink }}>
            {s.value}
          </dd>
          <dt className={`${heading.eyebrow} mt-2`} style={{ color: color.muted }}>
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
