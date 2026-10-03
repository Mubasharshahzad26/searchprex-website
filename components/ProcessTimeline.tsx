// components/ProcessTimeline.tsx
//
// The "how it works" steps on the service pages, drawn as a timeline: an icon
// node per step, a line joining them, and the timing as a label. The steps
// used to be four identical cards, which read as four separate features
// rather than one sequence a client moves through.
//
// Horizontal from lg up, vertical below it. No client JavaScript; the lines
// are plain CSS, and the list is a real <ol>, so the order survives without
// styles and for screen readers.

import type { LucideIcon } from "lucide-react";
import { color, heading, text } from "@/lib/design-tokens";

export type TimelineStep = {
  title: string;
  body: string;
  /** When it happens, e.g. "Week 1–2" or "Every Monday". */
  when?: string;
  icon: LucideIcon;
};

export default function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative">
      {/* The joining line on wide screens, through the centre of the nodes. */}
      <span
        aria-hidden
        className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 lg:block"
        style={{ background: `linear-gradient(90deg, ${color.primary}, ${color.primarySoft})` }}
      />
      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const last = i === steps.length - 1;
          return (
            <li key={s.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center">
              {/* The joining line on narrow screens, from this node down to the next. */}
              {!last ? (
                <span
                  aria-hidden
                  className="absolute left-7 top-14 w-0.5 lg:hidden"
                  style={{ background: color.border, height: "calc(100% - 1rem)" }}
                />
              ) : null}
              <span
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-white shadow-sm"
                style={{ borderColor: color.primary }}
              >
                <Icon className="h-6 w-6" style={{ color: color.primary }} aria-hidden />
                <span
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: color.primary }}
                  aria-hidden
                >
                  {i + 1}
                </span>
              </span>
              <div className="min-w-0 pb-2">
                {s.when ? (
                  <span
                    className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ background: color.surface, color: color.primary, border: `1px solid ${color.border}` }}
                  >
                    {s.when}
                  </span>
                ) : null}
                <h3 className={heading.h4} style={{ color: color.ink }}>
                  {s.title}
                </h3>
                <p className={`${text.small} mt-2`} style={{ color: color.muted }}>
                  {s.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
