// components/ProofStrip.tsx
// Three verified numbers, immediately under the client logos.
//
// These stat cards used to live in the middle of the Results section, roughly
// four screens down. They are the strongest thing on the site and the only
// claims that are independently checkable, so a visitor should meet +476%
// within one scroll — not after passing a second hero, a services grid and a
// process explainer.
//
// Deliberately a thin band, not a "section": no eyebrow pill, no gradient
// headline, no centered intro paragraph. Seven sections on this page already
// share that construction. This one is just the numbers and where they come
// from, which is the whole point.

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import CountUp from "@/components/CountUp";
import { color } from "@/lib/design-tokens";

const stats = [
  {
    to: 476,
    prefix: "+",
    suffix: "%",
    label: "Organic clicks recovered",
    context: "Michigan Outdoor Sports",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
  },
  {
    to: 75,
    prefix: "+",
    suffix: "%",
    label: "US revenue growth",
    context: "SMK Store, in 2 months",
    href: "/case-studies/ecommerce/smk-store",
  },
  {
    to: 285,
    prefix: "+",
    suffix: "%",
    label: "Product pages indexed",
    context: "35,000-product catalog",
    href: "/case-studies/ecommerce/smk-store",
  },
];

export default function ProofStrip() {
  return (
    <section
      className="border-b py-12 sm:py-14"
      style={{ background: color.white, borderColor: color.border }}
      aria-labelledby="proof-strip-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p
          id="proof-strip-heading"
          className="mb-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: color.successDark }}
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Verified in Google Search Console
        </p>

        <div className="grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-3"
             style={{ background: color.border }}>
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group px-6 py-6 text-center transition-colors"
              style={{ background: color.white }}
            >
              <div
                className="text-4xl font-black tracking-tight tabular-nums sm:text-5xl"
                style={{ color: color.primary }}
              >
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-bold" style={{ color: color.ink }}>
                {s.label}
              </div>
              <div className="mt-0.5 text-xs" style={{ color: color.muted }}>
                {s.context}
              </div>
              <span
                className="mt-3 inline-block text-xs font-bold underline-offset-4 group-hover:underline"
                style={{ color: color.successDark }}
              >
                See the case study
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
