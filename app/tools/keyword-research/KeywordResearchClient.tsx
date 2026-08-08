"use client";

// app/tools/keyword-research/KeywordResearchClient.tsx
//
// Replaces the old /nicheseopro tool, which displayed fabricated search volume,
// CPC and difficulty numbers. This shows only what can actually be known:
// keyword ideas grouped by topic, the search intent behind each, and the page to
// build for it. No invented metrics.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Search, Copy, Check, Lightbulb } from "lucide-react";
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
  INTENT_META,
  MAX_SEED_LENGTH,
  type KeywordResearchResponse,
} from "@/lib/keyword-research-types";

const EXAMPLES = [
  "personal injury lawyer detroit",
  "family law attorney austin",
  "shopify store not indexed",
  "hvac repair near me",
];

export default function KeywordResearchClient() {
  const [seed, setSeed] = useState("");
  const [data, setData] = useState<KeywordResearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = async (term: string) => {
    const value = term.trim();
    if (!value || loading) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/keyword-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed: value, location: "United States" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong.");
      setData(json as KeywordResearchResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    if (!data) return;
    const lines = data.clusters.flatMap((c) => [
      `## ${c.name}`,
      ...c.keywords.map((k) => `- ${k.keyword} [${k.intent}] — ${k.contentAngle}`),
      "",
    ]);
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalKeywords = data?.clusters.reduce((n, c) => n + c.keywords.length, 0) ?? 0;

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Free SEO Tools", href: "/tools" },
          { label: "Keyword Research" },
        ]}
      />

      <PageHero
        compactTop
        eyebrow="Free AI Keyword Research"
        title={
          <>
            What should you
            <br />
            <Accent>actually write about?</Accent>
          </>
        }
        subtitle="Enter a topic or service. You get keywords grouped by theme, the search intent behind each one, and the exact page to build for it — so you know what to publish, not just what to chase."
        actions={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(seed);
            }}
            className="w-full max-w-2xl"
          >
            <div
              className={`flex items-center overflow-hidden ${radius.control} border bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#534AB7]`}
              style={{ borderColor: color.border }}
            >
              <span className="pl-4 pr-2" style={{ color: color.subtle }}>
                <Search className="h-5 w-5" aria-hidden />
              </span>
              <label htmlFor="seed" className="sr-only">
                Keyword or topic to research
              </label>
              <input
                id="seed"
                value={seed}
                maxLength={MAX_SEED_LENGTH}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="personal injury lawyer detroit"
                className="flex-1 py-4 pr-3 text-base outline-none"
                style={{ color: color.ink }}
              />
              <button
                type="submit"
                disabled={loading || !seed.trim()}
                className={`m-1.5 inline-flex items-center gap-2 ${radius.chip} bg-[#534AB7] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3C3489] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Researching
                  </>
                ) : (
                  <>
                    Research <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={text.caption} style={{ color: color.muted }}>
                Try:
              </span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setSeed(ex);
                    run(ex);
                  }}
                  className={`${radius.chip} border px-2.5 py-1 ${text.caption} transition-colors hover:bg-white ${focusRing}`}
                  style={{ borderColor: color.border, color: color.muted }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </form>
        }
      />

      {/* ── RESULTS ── */}
      <Section tone="surface" bordered={!!data || !!error || loading}>
        {error ? (
          <div
            className={`${radius.card} border p-6`}
            style={{ borderColor: "#f5c2c7", background: "#fdf2f3" }}
          >
            <p className="font-semibold" style={{ color: color.danger }}>
              {error}
            </p>
            <p className={`${text.small} mt-2`} style={{ color: color.muted }}>
              If this keeps happening, get a free founder-reviewed audit instead — we&apos;ll do
              the research for you.
            </p>
            <CtaButton href="/free-audit" compact className="mt-4">
              Get a free audit
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
              Building your keyword map…
            </p>
          </div>
        ) : null}

        {data ? (
          <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={heading.eyebrow} style={{ color: color.primary }}>
                  {totalKeywords} keywords · {data.clusters.length} topic clusters
                </p>
                <h2 className={heading.h2} style={{ color: color.ink }}>
                  &ldquo;{data.seed}&rdquo;
                </h2>
              </div>
              <button
                type="button"
                onClick={copyAll}
                className={`inline-flex items-center gap-2 ${radius.control} border px-4 py-2 text-sm font-semibold transition-colors hover:bg-white ${focusRing}`}
                style={{ borderColor: color.borderStrong, color: color.ink }}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" style={{ color: color.success }} aria-hidden /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden /> Copy all
                  </>
                )}
              </button>
            </div>

            <div className="space-y-6">
              {data.clusters.map((cluster) => (
                <div
                  key={cluster.name}
                  className={`overflow-hidden ${radius.card} border bg-white`}
                  style={{ borderColor: color.border }}
                >
                  <div
                    className="border-b px-6 py-4"
                    style={{ borderColor: color.border, background: color.surface }}
                  >
                    <h3 className={heading.h4} style={{ color: color.ink }}>
                      {cluster.name}
                    </h3>
                    {cluster.summary ? (
                      <p className={`${text.small} mt-1`} style={{ color: color.muted }}>
                        {cluster.summary}
                      </p>
                    ) : null}
                  </div>

                  <ul>
                    {cluster.keywords.map((kw) => {
                      const meta = INTENT_META[kw.intent];
                      return (
                        <li
                          key={kw.keyword}
                          className="border-b px-6 py-4 last:border-0"
                          style={{ borderColor: color.border }}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold" style={{ color: color.ink }}>
                              {kw.keyword}
                            </span>
                            <span
                              className={`${radius.chip} px-2 py-0.5 text-[11px] font-semibold`}
                              style={{ background: meta.bg, color: meta.color }}
                              title={meta.hint}
                            >
                              {meta.label}
                            </span>
                          </div>
                          {kw.contentAngle ? (
                            <p
                              className={`${text.small} mt-1.5 flex items-start gap-1.5`}
                              style={{ color: color.muted }}
                            >
                              <Lightbulb
                                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                                style={{ color: color.primary }}
                                aria-hidden
                              />
                              {kw.contentAngle}
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className={`mt-10 ${radius.card} border bg-white p-8 text-center`}
              style={{ borderColor: color.border }}
            >
              <h2 className={`${heading.h3} mb-2`} style={{ color: color.ink }}>
                A keyword list isn&apos;t a strategy.
              </h2>
              <p className={`${text.small} mx-auto mb-5 max-w-xl`} style={{ color: color.muted }}>
                This tells you what to write. It doesn&apos;t tell you which of these you can
                realistically rank for, or in what order. Get the founder to review your site and
                turn this into a prioritised 90-day plan.
              </p>
              <CtaButton href="/free-audit" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
                Get a free SEO audit
              </CtaButton>
            </div>
          </>
        ) : null}

        {!data && !loading && !error ? (
          <div className="py-12 text-center">
            <p className={text.lead} style={{ color: color.muted }}>
              Enter a topic above to get started.
            </p>
          </div>
        ) : null}
      </Section>

      {/* ── HONESTY NOTE ── */}
      <Section width="reading" bordered={false}>
        <SectionHeading
          eyebrow="How this works"
          title="Why there are no search volumes here"
          intro="Most free keyword tools show you a volume, a CPC and a difficulty score. Ours doesn't, and that's deliberate."
        />
        <div className={`${text.body} space-y-4`} style={{ color: color.muted }}>
          <p>
            Those numbers come from paid data providers. A tool that shows them without paying for
            that data is estimating — and an estimate presented as a metric is just a guess with a
            decimal point. We&apos;d rather give you nothing than give you a number you might plan
            around.
          </p>
          <p>
            What you get instead is the part that actually decides whether a page ranks: the intent
            behind the search, and what the page needs to be. If you want real volume and difficulty
            figures for these keywords,{" "}
            <Link href="/free-audit" className="font-semibold underline" style={{ color: color.primary }}>
              ask for the free audit
            </Link>{" "}
            — we pull them from our licensed data and send them over.
          </p>
        </div>
      </Section>
    </main>
  );
}
