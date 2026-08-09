"use client";

// app/tools/keyword-research/KeywordResearchClient.tsx
//
// Law firm keyword research: practice area × US state, in a Semrush-style
// overview layout — Volume, KD %, CPC, Competitive Density, Intent, Trend.
//
// Two deliberate choices:
//
// 1. No blank keyword box. An attorney thinks "I do personal injury in
//    Michigan", not in keywords. The tool asks it that way and builds the set.
//
// 2. When live data isn't connected, metrics render as "—". They are never
//    estimated. The tool this replaced derived CPC from a hash of the keyword,
//    so the same word always produced the same invented figure.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, TriangleAlert, Scale, MapPin, Lightbulb } from "lucide-react";
import {
  Breadcrumb,
  CtaButton,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, focusRing, heading, radius, text } from "@/lib/design-tokens";
import {
  PRACTICE_AREAS,
  US_STATES,
  type LawKeywordResponse,
  type LawKeywordRow,
} from "@/lib/law-firm-keywords";

const INTENT_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  transactional: { label: "Transactional", color: "#2f9670", bg: "#eafaf3" },
  commercial: { label: "Commercial", color: "#8a5300", bg: "#fff4e0" },
  informational: { label: "Informational", color: "#1a5fb4", bg: "#e8f0fe" },
  navigational: { label: "Navigational", color: "#64748b", bg: "#f1f5f9" },
};

/** Semrush-style difficulty banding. */
function kdBand(kd: number): { label: string; color: string } {
  if (kd < 15) return { label: "Very easy", color: "#2f9670" };
  if (kd < 30) return { label: "Easy", color: "#7cb342" };
  if (kd < 50) return { label: "Possible", color: "#c9a227" };
  if (kd < 70) return { label: "Difficult", color: "#e07a1f" };
  if (kd < 85) return { label: "Hard", color: "#d9534f" };
  return { label: "Very hard", color: "#b02a26" };
}

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n);

export default function KeywordResearchClient() {
  const [areaId, setAreaId] = useState(PRACTICE_AREAS[0].id);
  const [state, setState] = useState("Michigan");
  const [data, setData] = useState<LawKeywordResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const area = PRACTICE_AREAS.find((a) => a.id === areaId)!;

  const run = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/law-firm-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ practiceArea: areaId, state }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong.");
      setData(json as LawKeywordResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const live = data?.source === "dataforseo";

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Free SEO Tools", href: "/tools" },
          { label: "Law Firm Keyword Research" },
        ]}
      />

      <PageHero
        compactTop
        eyebrow="Free Law Firm Keyword Tool"
        title={
          <>
            What your practice area is
            <br />
            <Accent>worth in your state.</Accent>
          </>
        }
        subtitle="Pick your practice area and state. You get the keywords clients actually search, what each is worth per click on Google Ads, and how hard it is to rank — so you can see exactly what you're paying for instead of earning."
        actions={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
            className="w-full max-w-3xl"
          >
            <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto]">
              <label className="block">
                <span className={`${heading.eyebrow} mb-1.5 block`} style={{ color: color.muted }}>
                  Practice area
                </span>
                <div className="relative">
                  <Scale
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: color.subtle }}
                    aria-hidden
                  />
                  <select
                    value={areaId}
                    onChange={(e) => setAreaId(e.target.value)}
                    className={`h-12 w-full appearance-none ${radius.control} border bg-white pl-9 pr-3 text-sm font-medium ${focusRing}`}
                    style={{ borderColor: color.border, color: color.ink }}
                  >
                    {PRACTICE_AREAS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="block">
                <span className={`${heading.eyebrow} mb-1.5 block`} style={{ color: color.muted }}>
                  State
                </span>
                <div className="relative">
                  <MapPin
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: color.subtle }}
                    aria-hidden
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`h-12 w-full appearance-none ${radius.control} border bg-white pl-9 pr-3 text-sm font-medium ${focusRing}`}
                    style={{ borderColor: color.border, color: color.ink }}
                  >
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex h-12 items-center gap-2 ${radius.control} bg-[#534AB7] px-6 text-sm font-semibold text-white transition-all hover:bg-[#3C3489] disabled:opacity-50 ${focusRing}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Checking
                    </>
                  ) : (
                    <>
                      Get keywords <ArrowRight className="h-4 w-4" aria-hidden />
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className={`${text.caption} mt-3`} style={{ color: color.muted }}>
              {area.blurb}
            </p>
          </form>
        }
      />

      {/* ── RESULTS ── */}
      <Section tone="surface">
        {error ? (
          <div
            className={`${radius.card} border p-6`}
            style={{ borderColor: "#f5c2c7", background: "#fdf2f3" }}
          >
            <p className="font-semibold" style={{ color: color.danger }}>
              {error}
            </p>
            <CtaButton href="/free-audit" compact className="mt-4">
              Get a free audit instead
            </CtaButton>
          </div>
        ) : null}

        {loading ? (
          <div className="py-16 text-center">
            <Loader2
              className="mx-auto mb-4 h-8 w-8 animate-spin"
              style={{ color: color.primary }}
              aria-hidden
            />
            <p className={text.small} style={{ color: color.muted }}>
              Pulling live search data…
            </p>
          </div>
        ) : null}

        {data ? (
          <>
            {!live && data.reason ? (
              <div
                className={`mb-6 flex items-start gap-2 ${radius.control} border px-4 py-3 ${text.small}`}
                style={{ borderColor: "#ffe2a8", background: "#fff7e6", color: "#92660a" }}
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{data.reason}</span>
              </div>
            ) : null}

            {/* Overview cards — the Semrush layout */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <OverviewCard
                label="Total monthly volume"
                value={data.summary.totalVolume === null ? null : fmt(data.summary.totalVolume)}
                sub={`${data.rows.length} keywords · ${data.location}`}
              />
              <OverviewCard
                label="Avg. keyword difficulty"
                value={data.summary.avgDifficulty === null ? null : `${data.summary.avgDifficulty}%`}
                sub={
                  data.summary.avgDifficulty === null
                    ? "—"
                    : kdBand(data.summary.avgDifficulty).label
                }
              />
              <OverviewCard
                label="Highest CPC"
                value={data.summary.maxCpc === null ? null : `$${data.summary.maxCpc.toFixed(2)}`}
                sub="What one Google Ads click costs"
                highlight
              />
            </div>

            {/* Keyword table */}
            <div
              className={`relative overflow-x-auto ${radius.card} border`}
              style={{ borderColor: color.border, background: color.white }}
            >
              <table className="w-full min-w-[760px] border-collapse text-left">
                <caption className="sr-only">
                  {data.practiceAreaLabel} keyword metrics for {data.location}
                </caption>
                <thead>
                  <tr className="border-b" style={{ borderColor: color.border }}>
                    <th scope="col" className={`${heading.eyebrow} px-5 py-3`} style={{ color: color.muted }}>
                      Keyword
                    </th>
                    <th scope="col" className={`${heading.eyebrow} px-4 py-3 text-right`} style={{ color: color.muted }}>
                      Volume
                    </th>
                    <th scope="col" className={`${heading.eyebrow} px-4 py-3 text-right`} style={{ color: color.muted }}>
                      KD %
                    </th>
                    <th scope="col" className={`${heading.eyebrow} px-4 py-3 text-right`} style={{ color: color.muted }}>
                      CPC
                    </th>
                    <th scope="col" className={`${heading.eyebrow} px-4 py-3 text-right`} style={{ color: color.muted }}>
                      Com.
                    </th>
                    <th scope="col" className={`${heading.eyebrow} px-4 py-3`} style={{ color: color.muted }}>
                      Intent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, i) => (
                    <Row key={row.keyword} row={row} striped={i % 2 === 1} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* The argument the numbers make */}
            {live && data.summary.maxCpc !== null && data.summary.maxCpc > 0 ? (
              <div
                className={`mt-6 ${radius.card} border p-6`}
                style={{ borderColor: color.border, background: color.white }}
              >
                <h2 className={`${heading.h4} mb-2`} style={{ color: color.ink }}>
                  You&apos;re paying up to ${data.summary.maxCpc.toFixed(2)} for one click.
                </h2>
                <p className={text.small} style={{ color: color.muted }}>
                  That&apos;s per click, not per case — and it stops the moment you pause the
                  budget. Ranking organically for these same {data.rows.length} keywords in{" "}
                  {data.location} costs nothing per click and holds when you stop paying.
                </p>
                <CtaButton
                  href="/free-audit"
                  compact
                  className="mt-4"
                  icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                >
                  See what it takes to rank in {data.location}
                </CtaButton>
              </div>
            ) : null}
          </>
        ) : null}

        {!data && !loading && !error ? (
          <div className="py-12 text-center">
            <p className={text.lead} style={{ color: color.muted }}>
              Pick a practice area and state to see what it&apos;s worth.
            </p>
          </div>
        ) : null}
      </Section>

      {/* ── HONESTY NOTE ── */}
      <Section width="reading" bordered={false}>
        <SectionHeading
          eyebrow="How this works"
          title="Where these numbers come from"
          intro="Volume, difficulty, CPC and competition are licensed search data — the same class of data Semrush and Ahrefs sell."
        />
        <div className={`${text.body} space-y-4`} style={{ color: color.muted }}>
          <p>
            They are not estimates, and they are not generated by AI. A language model does not
            know how many people searched for something last month; asked anyway, it produces a
            confident-looking guess. When our data provider is unreachable this tool shows{" "}
            <strong>&ldquo;—&rdquo;</strong> rather than a number, because a wrong figure you plan
            around is worse than no figure.
          </p>
          <p>
            Volumes are state-level, not national. &ldquo;Car accident lawyer&rdquo; in Michigan is
            a different market from Texas, and a national average helps neither.{" "}
            <Link
              href="/free-audit"
              className="font-semibold underline"
              style={{ color: color.primary }}
            >
              Ask for the free audit
            </Link>{" "}
            and we&apos;ll add city-level breakdowns, your current rankings, and which of these you
            can realistically win first.
          </p>
        </div>
      </Section>
    </main>
  );
}

/* ── Pieces ── */

function OverviewCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string | null;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`${radius.card} border p-5`}
      style={{
        borderColor: highlight ? `${color.primary}4d` : color.border,
        background: color.white,
      }}
    >
      <p className={heading.eyebrow} style={{ color: color.muted }}>
        {label}
      </p>
      <p
        className="mt-2 text-3xl font-bold tracking-tight"
        style={{ color: value === null ? color.subtle : highlight ? color.primary : color.ink }}
      >
        {value ?? "—"}
      </p>
      <p className={`${text.caption} mt-1`} style={{ color: color.muted }}>
        {sub}
      </p>
    </div>
  );
}

function Row({ row, striped }: { row: LawKeywordRow; striped: boolean }) {
  const intent = row.intent ? INTENT_STYLE[row.intent] : null;
  const band = row.difficulty === null ? null : kdBand(row.difficulty);

  return (
    <tr
      className="border-b last:border-0"
      style={{ borderColor: color.border, background: striped ? color.surface : color.white }}
    >
      <th scope="row" className="px-5 py-3 text-left font-medium" style={{ color: color.ink }}>
        {row.keyword}
        {row.contentAngle ? (
          <span
            className={`${text.caption} mt-1 flex items-start gap-1.5 font-normal`}
            style={{ color: color.muted }}
          >
            <Lightbulb
              className="mt-0.5 h-3 w-3 shrink-0"
              style={{ color: color.primary }}
              aria-hidden
            />
            {row.contentAngle}
          </span>
        ) : null}
      </th>
      <td className="px-4 py-3 text-right font-semibold" style={{ color: color.ink }}>
        {row.volume === null ? <Dash /> : fmt(row.volume)}
      </td>
      <td className="px-4 py-3 text-right">
        {row.difficulty === null || !band ? (
          <Dash />
        ) : (
          <span className="font-semibold" style={{ color: band.color }} title={band.label}>
            {row.difficulty}%
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-right font-semibold" style={{ color: color.ink }}>
        {row.cpc === null ? <Dash /> : `$${row.cpc.toFixed(2)}`}
      </td>
      <td className="px-4 py-3 text-right" style={{ color: color.muted }}>
        {row.competition === null ? <Dash /> : row.competition.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        {intent ? (
          <span
            className={`${radius.chip} px-2 py-0.5 text-[11px] font-semibold`}
            style={{ background: intent.bg, color: intent.color }}
          >
            {intent.label}
          </span>
        ) : (
          <Dash />
        )}
      </td>
    </tr>
  );
}

function Dash() {
  return (
    <span style={{ color: color.subtle }} title="Live data not connected">
      —
    </span>
  );
}
