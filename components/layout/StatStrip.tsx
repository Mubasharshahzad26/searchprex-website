// components/layout/StatStrip.tsx
// The proof band that sits directly under a hero. Numbers here must be
// defensible — this is an E-E-A-T surface, not decoration.

import { color, heading, layout } from "@/lib/design-tokens";

export interface Stat {
  /** The number itself, pre-formatted (e.g. "+285%", "60d", "24hr"). */
  value: string;
  /** What it measures. */
  label: string;
}

export interface StatStripProps {
  stats: Stat[];
  /** `surface` under a white hero, `ink` when used as a closing proof band. */
  tone?: "surface" | "ink";
}

export default function StatStrip({ stats, tone = "surface" }: StatStripProps) {
  const onDark = tone === "ink";

  return (
    <section
      className={onDark ? undefined : "border-b"}
      style={{
        background: onDark ? color.ink : color.surface,
        borderColor: color.border,
      }}
    >
      <dl
        className={`${layout.container} grid grid-cols-2 gap-8 py-10 sm:grid-cols-4`}
      >
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              {/* On the dark band these read as verified proof, which is what
                  the success colour means everywhere else on the site. */}
              <span
                className="block text-3xl font-bold tracking-tight"
                style={{ color: onDark ? color.success : color.ink }}
              >
                {s.value}
              </span>
              <span
                className={`${heading.eyebrow} mt-1 block`}
                style={{ color: onDark ? "rgba(255,255,255,0.55)" : color.muted }}
              >
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
