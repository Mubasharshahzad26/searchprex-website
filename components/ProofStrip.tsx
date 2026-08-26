// components/ProofStrip.tsx
// Three verified numbers, immediately under the client logos.
//
// These stat cards used to live in the middle of the Results section, roughly
// four screens down. They are the strongest thing on the site and the only
// claims that are independently checkable, so a visitor should meet them
// within one scroll — not after passing a second hero, a services grid and a
// process explainer.
//
// STATIC BY DESIGN. The numbers previously animated up from zero on scroll
// (CountUp). Counting animations read as marketing decoration; a figure that
// spins into place invites less trust than one that is simply stated, and a
// buyer scrolling fast sees a half-finished number. A verified metric should
// behave like a figure in a report, not like a slot machine.
//
// Each column carries the client, the measurement window and the source, so
// the number is attributable rather than floating. That is the difference
// between a statistic and a claim.

import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { color } from "@/lib/design-tokens";

type Stat = {
  value: string;
  label: string;
  client: string;
  window: string;
  source: string;
  href: string;
};

const stats: Stat[] = [
  {
    value: "+476%",
    label: "Organic clicks recovered",
    client: "Michigan Outdoor Sports",
    window: "From near-zero visibility",
    source: "Google Search Console",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
  },
  {
    value: "+75%",
    label: "US revenue growth",
    client: "SMK Store",
    window: "Two months",
    source: "Client store analytics",
    href: "/case-studies/ecommerce/smk-store",
  },
  {
    value: "+285%",
    label: "Product pages indexed",
    client: "35,000-product catalog",
    window: "Six weeks",
    source: "Google Search Console",
    href: "/case-studies/ecommerce/smk-store",
  },
];

export default function ProofStrip() {
  return (
    <section
      className="border-b py-14 sm:py-16"
      style={{ background: color.white, borderColor: color.border }}
      aria-labelledby="proof-strip-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p
              id="proof-strip-heading"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: color.successDark }}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Verified client results
            </p>
            <p className="mt-2 text-sm" style={{ color: color.muted }}>
              Each figure is attributable to a named account and a stated source.
            </p>
          </div>
          <Link
            href="/all-case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-bold"
            style={{ color: color.primary }}
          >
            How each was measured <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* A data table rendered as three columns, not three "cards": hairline
            rules instead of shadows, tabular figures, aligned baselines. */}
        <dl
          className="grid grid-cols-1 gap-px border sm:grid-cols-3"
          style={{ background: color.border, borderColor: color.border }}
        >
          {stats.map((s) => (
            <div key={s.label} className="group" style={{ background: color.white }}>
              <Link href={s.href} className="block h-full px-6 py-7">
                <dd
                  className="text-5xl font-black leading-none tracking-tight tabular-nums"
                  style={{ color: color.primary }}
                >
                  {s.value}
                </dd>
                <dt
                  className="mt-3 text-sm font-bold"
                  style={{ color: color.ink }}
                >
                  {s.label}
                </dt>

                <div
                  className="mt-4 space-y-1 border-t pt-3 text-xs"
                  style={{ borderColor: color.border, color: color.muted }}
                >
                  <p>
                    <span className="font-semibold" style={{ color: color.ink }}>
                      Account:
                    </span>{" "}
                    {s.client}
                  </p>
                  <p>
                    <span className="font-semibold" style={{ color: color.ink }}>
                      Window:
                    </span>{" "}
                    {s.window}
                  </p>
                  <p>
                    <span className="font-semibold" style={{ color: color.ink }}>
                      Source:
                    </span>{" "}
                    {s.source}
                  </p>
                </div>

                <span
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold underline-offset-4 group-hover:underline"
                  style={{ color: color.successDark }}
                >
                  Read the case study <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
