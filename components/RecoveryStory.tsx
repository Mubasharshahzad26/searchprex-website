// components/RecoveryStory.tsx
// How the indexing was recovered, and what happened to revenue after.
//
// This section exists because the honest version of this story is the more
// persuasive one. Michigan Outdoor Sports peaked at +476% organic clicks in
// March 2026, then gradually de-indexed — a real setback, on a real account.
// What follows is the recovery: indexed pages back from roughly 3,000 to
// 11,549, and store revenue restarting from a genuine zero.
//
// Agencies publish the peak and hide the dip. Publishing both is what makes
// the numbers checkable, and a prospect who has lived through a de-indexing
// event recognises the shape of this immediately.
//
// Static by design — no counters, no carousel. Every figure is a plain number
// next to the screenshot it came from.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingDown, Wrench, TrendingUp } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_CTA } from "@/lib/offer";

const revenueSteps = [
  { src: "/images/proof/mso-revenue-1-jul20.png", date: "20 July 2026", note: "Recovery underway, store revenue still at zero" },
  { src: "/images/proof/mso-revenue-2-aug06.png", date: "6 August 2026", note: "First month of sales after re-indexing" },
  { src: "/images/proof/mso-revenue-3-aug17.png", date: "17 August 2026", note: "Month-to-date, tracking above the previous month" },
];

const phases = [
  {
    icon: TrendingDown,
    tone: "#8a5b08",
    stage: "The setback",
    when: "March – May 2026",
    body: "The account peaked at +476% organic clicks in March, then gradually de-indexed. Indexed pages fell back to roughly 3,000 while crawled-but-unindexed URLs piled up.",
  },
  {
    icon: Wrench,
    tone: "#534AB7",
    stage: "The fix",
    when: "May – July 2026",
    body: "Crawl budget reclaimed from faceted and parameter URLs, canonicals corrected, thin product pages rewritten with unique copy, and high-value URLs pushed through the Indexing API in priority batches.",
  },
  {
    icon: TrendingUp,
    tone: "#196b4d",
    stage: "The recovery",
    when: "July – August 2026",
    body: "Indexed pages back to 11,549 — a 285% increase from the floor — with US organic clicks up 83% and CTR from 3.5% to 5.2%. Store revenue restarted the month after.",
  },
];

export default function RecoveryStory() {
  return (
    <section
      id="recovery"
      className="border-y py-20 sm:py-24"
      style={{ background: color.surfaceAlt, borderColor: color.border }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: color.primary }}
          >
            Michigan Outdoor Sports · the full picture
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: color.ink }}
          >
            We hit +476%, lost it to a de-indexing, and rebuilt it.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: color.muted }}>
            Most agencies would publish the March peak and stop there. Here is the whole
            curve — including the part that went backwards — because the recovery is the
            part that is actually hard, and it is the part you are hiring for.
          </p>
        </div>

        {/* Three phases. Numbered because the order is the information. */}
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {phases.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.stage}
                className={`border p-6 ${radius.card}`}
                style={{ background: color.white, borderColor: color.border }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${p.tone}14` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: p.tone }} aria-hidden="true" />
                  </span>
                  <span
                    className="text-xs font-black tabular-nums"
                    style={{ color: p.tone }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-black" style={{ color: color.ink }}>
                  {p.stage}
                </h3>
                <p
                  className="mt-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color: p.tone }}
                >
                  {p.when}
                </p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: color.muted }}>
                  {p.body}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Revenue: three dated WooCommerce panels, in order. */}
        <div className="mt-14">
          <h3 className="text-lg font-black" style={{ color: color.ink }}>
            What re-indexing did to store revenue
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: color.muted }}>
            Net sales from the client&apos;s own WooCommerce dashboard, published with their
            permission. The store was at a standstill in July. These are early months on a
            catalog still being rebuilt — the point is the direction and the dates, not the
            size of the figure.
          </p>

          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {revenueSteps.map((r) => (
              <li key={r.src}>
                <figure className="m-0">
                  <div
                    className={`overflow-hidden border ${radius.card}`}
                    style={{ borderColor: color.border, background: color.white }}
                  >
                    <Image
                      src={r.src}
                      alt={`WooCommerce net sales panel for Michigan Outdoor Sports, ${r.date}`}
                      width={562}
                      height={96}
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2">
                    <span
                      className="block text-xs font-bold tabular-nums"
                      style={{ color: color.ink }}
                    >
                      {r.date}
                    </span>
                    <span className="block text-xs" style={{ color: color.muted }}>
                      {r.note}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-xs leading-relaxed" style={{ color: color.muted }}>
            Screenshots cropped to the WooCommerce Status panel only — account names, admin
            usernames and unrelated store data removed.
          </p>
        </div>

        <div
          className="mt-12 flex flex-col items-start gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: color.border }}
        >
          <p className="text-sm font-semibold" style={{ color: color.muted }}>
            If your pages are dropping out of the index, this is the work.
          </p>
          <Link
            href={OFFER_HREF}
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: color.primary }}
          >
            {OFFER_CTA} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
