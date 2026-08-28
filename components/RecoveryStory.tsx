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
//
// SMK Store's revenue proof used to live here as a second account. It moved to
// components/RevenueProof.tsx, directly under the client logos, because
// $5,832 -> $19,100 is the strongest business outcome on the site and it was
// sitting at position 11 of 19. This section keeps what it is actually about:
// one account's peak, de-indexing and rebuild.

import Link from "next/link";
import { ArrowRight, TrendingDown, Wrench, TrendingUp, Zap } from "lucide-react";
import ProofImage from "@/components/ProofImage";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_CTA } from "@/lib/offer";

// Before / after / and the gradual climb in between — each a dated capture
// from the client's own WooCommerce dashboard.
const revenueSteps = [
  {
    src: "/images/proof/mso-revenue-1-jul20.png",
    width: 1040,
    height: 605,
    stage: "Before",
    tone: "#8a5b08",
    figure: "$0.00",
    date: "20 July 2026",
    note: "Store at a standstill. Pages were still out of the index, so nothing was being found.",
  },
  {
    src: "/images/proof/mso-revenue-2-aug06.png",
    width: 1366,
    height: 607,
    stage: "Two weeks later",
    tone: "#534AB7",
    figure: "$206.63",
    date: "6 August 2026",
    note: "First sales after re-indexing. Top seller moving 2 units.",
  },
  {
    src: "/images/proof/mso-revenue-3-aug17.png",
    width: 1366,
    height: 611,
    stage: "After",
    tone: "#196b4d",
    figure: "$311.05",
    date: "17 August 2026",
    note: "Month-to-date, already ahead of the previous full month. Top seller now moving 4 units.",
  },
];

const phases = [
  {
    icon: TrendingDown,
    tone: "#8a5b08",
    stage: "The setback",
    when: "March – May 2026",
    body: "The account peaked at +476% organic clicks in March, then gradually de-indexed. Indexed pages fell back to roughly 3,000 while crawled-but-unindexed URLs piled up.",
    metric: { value: "≈3,000", label: "Indexed pages at the floor" },
  },
  {
    icon: Wrench,
    tone: "#534AB7",
    stage: "The fix",
    when: "May – July 2026",
    body: "Crawl budget reclaimed from faceted and parameter URLs, canonicals corrected, and thin product pages rewritten with unique copy. The re-indexing itself ran on NicheSEO Pro Autopilot, which pushed high-value URLs through the Indexing API in priority batches and then verified each page had actually gone live.",
    metric: { value: "+3,723", label: "Newly indexed, 11 – 25 Jul 2026" },
    // The tool is named because it did the work, and because its own Search
    // Console captures for this account are the source of the figure above.
    tool: { label: "Run on NicheSEO Pro Autopilot", href: "#nicheseo-pro" },
  },
  {
    icon: TrendingUp,
    tone: "#196b4d",
    stage: "The recovery",
    when: "July – August 2026",
    body: "Indexed pages back to 11,549 — a 285% increase from the floor — with US organic clicks up 83% and CTR from 3.5% to 5.2%. Store revenue restarted the month after.",
    metric: { value: "11,549", label: "Indexed pages, 25 Jul 2026" },
  },
];

export default function RecoveryStory() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Recover from a Google De-Indexing Event for Ecommerce",
    "description": "A step-by-step technical SEO methodology used to recover an ecommerce catalog that lost 75% of its indexed pages, scaling back up to 11,549 indexed URLs.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Reclaim Crawl Budget",
        "text": "Identify and block faceted navigation and parameter URLs from consuming Googlebot's crawl budget using robots.txt and URL parameter settings."
      },
      {
        "@type": "HowToStep",
        "name": "Correct Canonical Tags",
        "text": "Audit the canonical tag structure to ensure all product variations point to the primary URL, eliminating duplicate content confusion."
      },
      {
        "@type": "HowToStep",
        "name": "Rewrite Thin Content",
        "text": "Identify product pages with thin or manufacturer-supplied descriptions and rewrite them with unique, structured copy."
      },
      {
        "@type": "HowToStep",
        "name": "Force Re-Indexing",
        "text": "Use the Google Indexing API to push high-value URLs back into the index in prioritized batches, rather than waiting for natural recrawls."
      }
    ]
  };

  return (
    <section
      id="recovery"
      className="border-y py-20 sm:py-24"
      style={{ background: color.surfaceAlt, borderColor: color.border }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7F77DD]">
            Michigan Outdoor Sports · The full picture
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            How I recovered a de-indexed store — and the revenue that followed
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#5b6472]">
            Most agencies would publish the March peak and stop there. I publish the whole
            curve — including the part that went backwards — because the recovery is the
            part that is actually hard, and it is the part you are hiring me for.
          </p>
          <p
            className="mt-5 border-l-4 pl-4 text-base italic leading-relaxed"
            style={{ borderColor: color.primary, color: color.ink }}
          >
            &ldquo;I did this work myself. Every screenshot below is from the client&apos;s own
            dashboard, on a date you can read, and I will walk you through any of it on a
            call.&rdquo;
            <span className="mt-2 block text-sm font-bold not-italic" style={{ color: color.muted }}>
              — Mubashar Shahzad, Founder
            </span>
          </p>
        </div>

        {/* ── Indexing recovery chart ──
            This is the headline evidence of the whole section, and until now it
            was the ONE screenshot on the page that could not be opened: a bare
            next/image element, while every smaller panel below it was a
            zoomable ProofImage. The copy underneath even told the visitor to
            "click any panel to read it full size", which was not true of the
            most important one. It is a ProofImage now, like everything else. */}
        {/* Capped at the capture's own 778px width. This sat in a max-w-5xl
            box and was being upscaled to ~1022px, so the one chart the whole
            section rests on rendered soft. The declared width/height were also
            1366x606 against a real 778x520, which reserved the wrong aspect box
            and shifted the layout as it loaded. */}
        <div className="mx-auto mb-16 w-full max-w-[778px]">
          <ProofImage
            src="/images/proof/mso-gsc-indexing-full.png"
            alt="Google Search Console page-indexing chart for Michigan Outdoor Sports, showing indexed pages rising from roughly 3,000 in mid-May 2026 to 11,549 on 25 July 2026."
            width={778}
            height={520}
            stage="Google Search Console · Page indexing"
            stageTone={color.successDark}
            caption="≈3,000 → 11,549 indexed pages"
            note="Unedited screenshot, all known pages, 18 May – 25 July 2026. Cropped only to remove the account avatar and site URL."
            sizes="(max-width: 778px) 100vw, 778px"
            eager
          />
        </div>

        {/* Three phases. Numbered because the order is the information. */}
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {phases.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.stage}
                className={`relative flex flex-col overflow-hidden border ${radius.card}`}
                style={{ background: color.white, borderColor: color.border }}
              >
                {/* Phase colour as a rule across the top, so the three cards
                    read as one timeline rather than three unrelated boxes. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: p.tone }}
                />

                <div className="flex flex-1 flex-col p-6 pt-7">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${p.tone}14` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: p.tone }} aria-hidden="true" />
                    </span>
                    {/* The step number was 10px and easy to miss; at this size
                        it does the sequencing work the layout was relying on. */}
                    <span
                      aria-hidden="true"
                      className="text-3xl font-black leading-none tabular-nums"
                      style={{ color: `${p.tone}33` }}
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

                  {p.tool && (
                    <Link
                      href={p.tool.href}
                      className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors hover:brightness-95"
                      style={{ background: `${p.tone}14`, color: p.tone }}
                    >
                      <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                      {p.tool.label}
                    </Link>
                  )}

                  {/* Each phase ends on the number that describes it, so the
                      row reads ≈3,000 → +3,723 → 11,549 at a glance. */}
                  <div
                    className="mt-auto border-t pt-4"
                    style={{ borderColor: color.border, marginTop: "1.5rem" }}
                  >
                    <p
                      className="text-2xl font-black tabular-nums tracking-tight"
                      style={{ color: color.ink }}
                    >
                      {p.metric.value}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: color.muted }}>
                      {p.metric.label}
                    </p>
                  </div>
                </div>
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

          {/* Connectors between the three panels. The figures are $0.00 →
              $206.63 → $311.05 and the whole point of the block is the
              direction, but as three equal cards in a row that reading had to
              be assembled by the visitor. The arrows sit in the existing grid
              gap, so they cost no layout, and they are aria-hidden because the
              <ol> already conveys the sequence to a screen reader. */}
          {/* The figure leads, the screenshot corroborates.
              Previously each cell was a screenshot with the amount tucked
              underneath at 14px, so the one thing the block exists to say —
              $0.00 -> $206.63 -> $311.05 — was the smallest text in it, and a
              visitor had to open three images to read a trend. The amount is
              now the largest element in each cell and the capture sits below it
              as the thing that proves it.

              frameAspect pins all three captures to one box. Their native
              aspects differ (1040x605, 1366x607, 1366x611), which is why the
              first panel used to stand taller than the other two and pushed its
              caption out of line with them. object-contain, so nothing is
              cropped. */}
          <ol className="mt-8 grid gap-8 lg:grid-cols-3">
            {revenueSteps.map((r, i) => (
              <li key={r.src} className="relative">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-6 top-8 hidden h-6 w-6 items-center justify-center lg:flex"
                    style={{ color: color.subtleNonText }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}

                <p
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: r.tone }}
                >
                  {r.stage}
                </p>
                <p
                  className="mt-2 text-4xl font-black tabular-nums tracking-tight"
                  style={{ color: color.ink }}
                >
                  {r.figure}
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: color.muted }}>
                  {r.date}
                </p>

                <div className="mt-4">
                  <ProofImage
                    src={r.src}
                    alt={`Michigan Outdoor Sports WooCommerce net sales panel on ${r.date}, showing ${r.figure} net sales this month.`}
                    width={r.width}
                    height={r.height}
                    frameAspect="16 / 9"
                    note={r.note}
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-4 text-xs leading-relaxed" style={{ color: color.muted }}>
            Screenshots cropped to the WooCommerce Status panel only — account names, admin
            usernames and unrelated store data removed. Click any panel to read it full
            size. The Search Console chart behind this recovery is shown above, next to the
            revenue it produced.
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
