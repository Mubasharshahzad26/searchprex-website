// components/LocalSeoProof.tsx
// Local SEO proof for US service businesses — real SERPs, named cities.
//
// The homepage claimed "Local SEO for US Service Businesses" in an H1 and then
// evidenced it with nothing. Every proof block was ecommerce (Michigan Outdoor
// Sports, SMK) or fintech (Remit Choice). This closes that gap with local
// results in three states.
//
// WHAT IS DELIBERATELY NOT HERE. Two assets from the same folder look like
// proof and are not:
//   - door-doctor-google-my-business.JPG shows 490 Business Profile
//     interactions but -4.9% year over year. That is a decline.
//   - glendora-kitchens-gsc-perofrmance-states.JPG shows clicks halving
//     (8 -> 4), CTR 5.6% -> 0.8% and average position worsening 31.4 -> 47.
// Both were left out rather than framed creatively. If a prospect opens a
// screenshot and finds the trend runs the other way, every other number on
// this page becomes suspect.

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import ProofImage from "@/components/ProofImage";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_CTA, OFFER_MICROCOPY } from "@/lib/offer";

// Two different local clients, in two different states, both cited by name
// inside a Google AI Overview. One is a pattern; two is a method.
const aiOverviews = [
  {
    src: "/images/proof/local-dolls-ai-overview-rank1.png",
    alt: "Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically.",
    width: 628,
    height: 322,
    stage: "D.O.L.L.S. Cleaning · Michigan",
    caption: "“post construction cleaning in Chesterfield, MI”",
    note: "Named first in the AI Overview — and ranked #1 organically below it.",
  },
  {
    src: "/images/proof/local-hvac-ai-overview.png",
    alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' citing HVAC Services Team by name.",
    width: 717,
    height: 292,
    stage: "HVAC Services Team · California",
    caption: "“free cost estimation for ac installation in simi valley california”",
    note: "Cited inside the AI Overview as a provider offering free estimates.",
  },
];

const supporting = [
  {
    src: "/images/proof/local-dolls-rank-1-and-2.png",
    alt: "Google results for 'carpet cleaning services in Clawson, MI' with D.O.L.L.S. Cleaning holding both the first and second organic positions.",
    width: 627,
    height: 338,
    stage: "Michigan",
    caption: "Positions #1 and #2",
    note: "“carpet cleaning services in Clawson, MI” — both top spots on one page.",
  },
  {
    src: "/images/proof/local-hvac-blog-rank1.png",
    alt: "Google results for 'Replace AC in Simi Valley Before Summer 2026' with the HVAC Services Team blog as the first organic result below the ads.",
    width: 733,
    height: 361,
    stage: "California",
    caption: "First organic result",
    note: "“Replace AC in Simi Valley Before Summer 2026” — a blog post outranking the local competition.",
  },
  {
    src: "/images/proof/local-hvac-simi-valley.png",
    alt: "Google results for 'local ac installation Simi Valley' with HVAC Services Team ranking on page one.",
    width: 740,
    height: 418,
    stage: "California",
    caption: "Page one, service query",
    note: "“local ac installation Simi Valley” — against established local HVAC firms.",
  },
  {
    src: "/images/proof/local-mammoth-texas.png",
    alt: "Google results for 'Local Residential Roof Repair in Texas' with Mammoth Roofs ranking seventh.",
    width: 624,
    height: 334,
    stage: "Texas",
    caption: "Position #7, statewide query",
    note: "“Local Residential Roof Repair in Texas” — a statewide term, not a single city.",
  },
];

export default function LocalSeoProof() {
  return (
    <section
      id="local-seo-proof"
      className="border-y py-20 sm:py-24"
      style={{ background: color.surface, borderColor: color.border }}
      aria-labelledby="local-seo-proof-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7F77DD]">
            <MapPin className="h-4 w-4" />
            Local SEO · Michigan, California, Texas
          </div>
          <h2 id="local-seo-proof-heading" className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            Searchprex has already produced results for USA Small businesses with Local SEO
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#5b6472]">
            Real searches, named American cities, and the client visible in the result. Every screenshot below is a
            live SERP — click any of them to read the query and the positions for yourself.
          </p>
        </div>

        {/* Two AI Overview citations, two clients, two states. Google leans on
            directories and aggregators for local queries, so being named by a
            small service business is the hardest version of this to earn. */}
        <div className="mt-10 border-l-4 pl-5" style={{ borderColor: color.primary }}>
          <h3 className="text-2xl font-black leading-snug" style={{ color: color.ink }}>
            Two of these clients are named inside Google&apos;s AI Overview.
          </h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: color.muted }}>
            Not ranked beneath it — quoted within it, before the results begin. For local
            queries Google usually leans on directories and aggregators, so a single-location
            service business being cited by name is the hardest version of this to earn. Two
            different clients, in two different states, is not a coincidence.
          </p>
        </div>

        <ul className="mt-8 grid list-none gap-8 p-0 lg:grid-cols-2">
          {aiOverviews.map((a) => (
            <li key={a.src}>
              <ProofImage
                src={a.src}
                alt={a.alt}
                width={a.width}
                height={a.height}
                stage={a.stage}
                stageTone={color.primary}
                caption={a.caption}
                note={a.note}
                sizes="(max-width: 1024px) 100vw, 540px"
              />
            </li>
          ))}
        </ul>

        {/* Supporting SERPs — organic positions across the same three states */}
        <ul className="mt-14 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {supporting.map((s) => (
            <li key={s.src}>
              <ProofImage
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                stage={s.stage}
                stageTone={color.successDark}
                caption={s.caption}
                note={s.note}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
              />
            </li>
          ))}
        </ul>

        {/* ── Did the rankings actually produce traffic? ──
            Everything above this point is a SERP screenshot, which proves
            position and nothing else. This is the same client measured in
            Search Console, so the section answers the obvious next question
            instead of leaving it hanging.

            THE CTR DROP IS STATED, NOT BURIED. Clicks and impressions both
            rose and average position improved, but CTR fell from 0.5% to 0.3%.
            That is what happens when impressions grow faster than clicks — the
            site began surfacing for a much wider set of queries it does not yet
            rank well for. A prospect who opens the capture will see the 0.3%
            immediately, so the copy names it first.

            TWO OTHER CANDIDATES WERE REJECTED for this slot, on the same
            standard that keeps door-doctor and glendora out of this file:
              - glendora-kitchens-gsc-perofrmance-states.JPG — clicks 8 -> 4,
                CTR 5.6% -> 0.8%, average position 31.4 -> 47. A decline.
              - mammoth-roofing-comparison.JPG — impressions 16.9K -> 45.2K but
                average position 55.7 -> 58.2 and CTR 1.2% -> 0.5%. Two of the
                four panels visibly run backwards, and position 58 is page six.
        */}
        <div className="mt-14 border-t pt-12" style={{ borderColor: color.border }}>
          <h3 className="text-2xl font-black leading-snug" style={{ color: color.ink }}>
            And the rankings turned into traffic.
          </h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed" style={{ color: color.muted }}>
            The same client in Google Search Console, June against July 2025. Clicks went from
            192 to 264 and average position improved from 31.2 to 22.9. Click-through rate
            fell from 0.5% to 0.3% over the same window, which is worth saying out loud:
            impressions grew far faster than clicks, because the site started appearing for a
            much wider set of queries it does not rank well for yet. The numbers that matter
            here are the clicks and the position, and both moved the right way.
          </p>

          <div className="mt-8 max-w-3xl">
            <ProofImage
              src="/images/proof/local-dolls-gsc-comparison.jpg"
              alt="Google Search Console performance comparison for D.O.L.L.S. Cleaning: 264 clicks and 106K impressions for 1-31 July 2025 against 192 clicks and 41K impressions for 1-30 June 2025, average CTR 0.3% against 0.5%, average position 22.9 against 31.2."
              width={626}
              height={239}
              stage="D.O.L.L.S. Cleaning · Michigan · Jun vs Jul 2025"
              stageTone={color.successDark}
              caption="192 → 264 clicks · position 31.2 → 22.9"
              note="Unedited Search Console comparison view. CTR fell 0.5% → 0.3% because impressions rose from 41K to 106K over the same period."
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-start gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: color.border }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: color.ink }}>
              One client per city, per service area.
            </p>
            <p className="mt-1 text-sm" style={{ color: color.muted }}>
              I do not rank two competitors against each other in the same market.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <Link
              href={OFFER_HREF}
              className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 ${radius.control}`}
              style={{ background: color.primary }}
            >
              {OFFER_CTA} <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs" style={{ color: color.muted }}>
              {OFFER_MICROCOPY}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
