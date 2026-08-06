// components/layout/CtaBand.tsx
// The dark closing section. Standardises the near-black that pages had drifted
// to (#0a0a0a, #191a1f, #0f0f0f) onto the brand ink, and reuses CtaButton so the
// buttons match the rest of the site.

import { color, heading, layout, text } from "@/lib/design-tokens";
import CtaButton, { type CtaVariant } from "./CtaButton";

export interface CtaBandAction {
  href: string;
  label: string;
  variant?: CtaVariant;
  icon?: React.ReactNode;
}

export interface CtaBandProps {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  actions?: CtaBandAction[];
  /** Reassurance line under the buttons. */
  trustPoints?: string[];
}

export default function CtaBand({ eyebrow, title, body, actions, trustPoints }: CtaBandProps) {
  return (
    <section style={{ background: color.ink }}>
      <div className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${layout.section} text-center`}>
        {eyebrow ? (
          <span className={`${heading.eyebrow} mb-3 block`} style={{ color: "#A79FED" }}>
            {eyebrow}
          </span>
        ) : null}

        <h2 className={`${heading.h2} mb-5 text-white`}>{title}</h2>

        {body ? (
          <p className={`${text.lead} mx-auto mb-10 max-w-xl text-white/60`}>{body}</p>
        ) : null}

        {actions?.length ? (
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {actions.map((a) => (
              <CtaButton key={a.href} href={a.href} variant={a.variant ?? "primary"} icon={a.icon}>
                {a.label}
              </CtaButton>
            ))}
          </div>
        ) : null}

        {trustPoints?.length ? (
          <ul className={`flex flex-wrap justify-center gap-x-6 gap-y-2 ${text.small} text-white/50`}>
            {trustPoints.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A79FED"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
