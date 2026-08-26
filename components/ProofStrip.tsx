// components/ProofStrip.tsx
// Three verified numbers plus the Search Console chart behind them.
//
// STATIC BY DESIGN. These figures previously animated up from zero on scroll
// (CountUp). A number that spins into place reads as decoration; one that is
// simply stated reads as a record. A buyer scrolling fast also saw a
// half-finished number, which is worse than no animation at all.
//
// EVERY FIGURE HERE IS TRACEABLE. Each is Michigan Outdoor Sports, measured in
// Google Search Console, over stated windows, and the indexing chart below is
// the unedited GSC screenshot the first figure comes from. Figures that could
// not be traced to a source were removed rather than restated:
//
//   - "+476% organic clicks" was replaced with +83%, which is what the two
//     comparable GSC Performance exports actually show (84 clicks for
//     1 May-11 Jun, 154 clicks for 12 Jun-26 Jul, both Web / United States).
//   - "+75% US revenue growth (SMK Store)" was removed. The only revenue
//     screenshots available are Michigan Outdoor Sports, not SMK, and they
//     show $0.00 -> $206.63 -> $311.05 monthly net sales, which does not
//     support the claim and is not a figure worth publishing.
//
// If better source data exists for either, restore the figure WITH the export
// it came from — not from memory.

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";

type Stat = {
  value: string;
  label: string;
  detail: string;
  window: string;
};

const stats: Stat[] = [
  {
    value: "+285%",
    label: "Pages indexed",
    detail: "≈3,000 → 11,549 indexed pages",
    window: "18 May – 25 Jul 2026",
  },
  {
    value: "+83%",
    label: "US organic clicks",
    detail: "84 → 154 clicks, like-for-like windows",
    window: "1 May – 26 Jul 2026",
  },
  {
    value: "3.5% → 5.2%",
    label: "US click-through rate",
    detail: "Same queries, same country filter",
    window: "1 May – 26 Jul 2026",
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
        <div className="mb-9 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p
              id="proof-strip-heading"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: color.successDark }}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              One account · Google Search Console
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight" style={{ color: color.ink }}>
              Michigan Outdoor Sports, May to July 2026.
            </h2>
            <p className="mt-1 text-sm" style={{ color: color.muted }}>
              One client, one reporting period, one source — not a highlight reel.
            </p>
          </div>
          <Link
            href="/case-studies/ecommerce/michigan-outdoor-sports"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold"
            style={{ color: color.primary }}
          >
            Read the full case study <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Figures — a definition list, not cards. Hairline rules, tabular
              figures, aligned baselines. */}
          <dl className="border-t" style={{ borderColor: color.border }}>
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-4 border-b py-4"
                style={{ borderColor: color.border }}
              >
                <div className="min-w-0">
                  <dt className="text-sm font-bold" style={{ color: color.ink }}>
                    {s.label}
                  </dt>
                  <p className="mt-0.5 text-xs" style={{ color: color.muted }}>
                    {s.detail}
                  </p>
                  <p className="text-xs tabular-nums" style={{ color: color.muted }}>
                    {s.window}
                  </p>
                </div>
                <dd
                  className="shrink-0 text-3xl font-black leading-none tracking-tight tabular-nums sm:text-4xl"
                  style={{ color: color.primary }}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* The chart the first figure comes from. Unedited apart from a crop
              that removes the account avatar, the site URL and the left nav. */}
          <figure className="m-0">
            <div
              className={`overflow-hidden border ${radius.card}`}
              style={{ borderColor: color.border, background: color.white }}
            >
              <Image
                src="/images/proof/mso-indexing-growth.png"
                alt="Google Search Console page-indexing chart for Michigan Outdoor Sports, showing indexed pages rising from roughly 3,000 in mid-May 2026 to 11,549 on 25 July 2026."
                width={745}
                height={236}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed" style={{ color: color.muted }}>
              Unedited Google Search Console screenshot — Page indexing, all known pages.
              Cropped only to remove the account avatar and site URL.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
