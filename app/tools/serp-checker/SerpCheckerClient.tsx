"use client";
// app/tools/serp-checker/SerpCheckerClient.tsx
// SERP Checker UI. Styling follows ToolsClient.tsx: navy #0a0f2e, purple #534AB7,
// green #3eb489 on the #eeeef5 page background, framer-motion fade-ups, lucide icons.

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Loader2, TriangleAlert, ChevronDown, X, Plus, ArrowRight,
  BarChart3, Trophy, Sparkles, Globe, Database, ExternalLink, Target, Lock,
} from "lucide-react";
import {
  MAX_KEYWORDS,
  SERP_COUNTRIES,
  SERP_FEATURE_META,
  domainMatches,
  normalizeDomain,
  positionBand,
  type SerpKeywordResult,
  type SerpResponse,
} from "@/lib/serp-types";

const GREEN = "#3eb489";
const PURPLE = "#534AB7";

type Faq = { q: string; a: string };

export default function SerpCheckerClient({ faqs }: { faqs: Faq[] }) {
  const [domain, setDomain] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [country, setCountry] = useState(SERP_COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SerpResponse | null>(null);

  const atLimit = keywords.length >= MAX_KEYWORDS;

  function addKeyword() {
    const k = draft.trim().replace(/\s+/g, " ");
    if (!k || atLimit) return;
    if (keywords.some((x) => x.toLowerCase() === k.toLowerCase())) {
      setDraft("");
      return;
    }
    setKeywords((prev) => [...prev, k]);
    setDraft("");
  }

  function removeKeyword(k: string) {
    setKeywords((prev) => prev.filter((x) => x !== k));
  }

  async function runCheck(e?: React.FormEvent) {
    e?.preventDefault();
    if (loading) return;

    // Include a keyword still sitting in the input so the button never "does nothing".
    const pending = draft.trim().replace(/\s+/g, " ");
    const all = pending && !keywords.some((x) => x.toLowerCase() === pending.toLowerCase())
      ? [...keywords, pending].slice(0, MAX_KEYWORDS)
      : keywords;

    if (!normalizeDomain(domain)) {
      setError("Enter a valid domain, e.g. searchprex.com");
      return;
    }
    if (all.length === 0) {
      setError("Add at least one keyword to check.");
      return;
    }

    setKeywords(all);
    setDraft("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/serp-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, keywords: all, country: country.code }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Check failed. Please try again.");
      setData(json as SerpResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const isPreview = data?.source === "preview";
  // Only meaningful when we actually looked. In preview mode every result has
  // found === false, which would have printed "5 of your keywords aren't in the
  // top 100" — a claim the tool has no basis for making.
  const missing = data && !isPreview ? data.results.filter((r) => !r.found).length : 0;

  // Carries the visitor's work across to the audit form instead of making them
  // retype it. See the useEffect in app/free-audit/FreeAuditClient.tsx.
  const auditHref = data
    ? `/free-audit?website=${encodeURIComponent(data.domain)}&keywords=${encodeURIComponent(
        data.results.map((r) => r.keyword).join(", "),
      )}`
    : "/free-audit";

  return (
    <main className="bg-[#eeeef5] min-h-screen">

      {/* ── Hero + form ── */}
      <section className="pt-28 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[#64748b] text-sm hover:text-[#0a0f2e] transition-colors">Home</Link>
            <span className="text-[#94a3b8]">›</span>
            <Link href="/tools" className="text-[#64748b] text-sm hover:text-[#0a0f2e] transition-colors">Free SEO Tools</Link>
            <span className="text-[#94a3b8]">›</span>
            <span className="text-[#534AB7] text-sm font-semibold">SERP Checker</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#EEEDFE] border border-[#534AB7]/30 rounded-full px-4 py-2 mb-5">
            <Target className="h-3.5 w-3.5 text-[#534AB7]" />
            <span className="text-xs font-bold text-[#534AB7] uppercase tracking-widest">Free SERP Checker</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#0a0f2e] mb-4 leading-tight">
            Where do you actually <br />
            <span className="text-[#534AB7]">rank on Google?</span>
          </h1>
          <p className="text-[#64748b] text-lg max-w-2xl leading-relaxed mb-8">
            Your own searches are personalised — they flatter you. Enter a domain and up to{" "}
            {MAX_KEYWORDS} keywords to see which SERP features own each query and what the top 10
            looks like in the country you pick. Live position tracking is in preview; for your real
            numbers,{" "}
            <Link href="/free-audit" className="font-semibold text-[#534AB7] underline underline-offset-2">
              the founder checks them by hand, free, within 24 hours
            </Link>
            .
          </p>

          {/* Form */}
          <form onSubmit={runCheck} className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">

            {/* Domain + country */}
            <label className="block text-xs font-bold uppercase tracking-widest text-[#64748b] mb-2">
              Your domain
            </label>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="searchprex.com"
                  aria-label="Your domain"
                  className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-white pl-11 pr-4 text-base font-medium text-[#0a0f2e] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/20"
                />
              </div>

              {/* Country picker */}
              <div className="relative sm:w-56">
                <button
                  type="button"
                  onClick={() => setCountryOpen((v) => !v)}
                  className="flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-sm font-medium text-[#0a0f2e] transition-colors hover:bg-[#f8f9fc]"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-lg leading-none">{country.flag}</span>
                    <span className="truncate">{country.name}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-[#64748b] transition-transform ${countryOpen ? "rotate-180" : ""}`} />
                </button>
                {countryOpen && (
                  <div className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white py-1 shadow-lg">
                    {SERP_COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => { setCountry(c); setCountryOpen(false); }}
                        className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-[#0a0f2e] transition-colors hover:bg-[#f8f9fc]"
                      >
                        <span className="text-lg leading-none">{c.flag}</span>
                        <span className="flex-1">{c.name}</span>
                        <span className="text-xs text-[#94a3b8]">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Keywords */}
            <label className="block text-xs font-bold uppercase tracking-widest text-[#64748b] mb-2">
              Keywords <span className="text-[#94a3b8] normal-case tracking-normal font-medium">({keywords.length}/{MAX_KEYWORDS})</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addKeyword(); }
                  }}
                  disabled={atLimit}
                  placeholder={atLimit ? `Limit of ${MAX_KEYWORDS} keywords reached` : "personal injury lawyer wichita"}
                  aria-label="Keyword to check"
                  className="h-12 w-full rounded-xl border border-[#e5e7eb] bg-white pl-11 pr-4 text-base font-medium text-[#0a0f2e] placeholder-[#9ca3af] outline-none transition-colors focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/20 disabled:bg-[#f8f9fc] disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="button"
                onClick={addKeyword}
                disabled={atLimit || !draft.trim()}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-5 text-sm font-bold text-[#0a0f2e] transition-colors hover:bg-[#f8f9fc] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>

            {keywords.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-[#AFA9EC] bg-[#EEEDFE] px-3 py-1.5 text-xs font-semibold text-[#534AB7]">
                    {k}
                    <button type="button" onClick={() => removeKeyword(k)} aria-label={`Remove ${k}`} className="transition-opacity hover:opacity-60">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 font-bold text-white transition-colors hover:bg-[#3d35a0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              {loading ? "Checking Google…" : "Check My Rankings"}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <TriangleAlert className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </section>

      {/* ── Results ── */}
      {data && (
        <section className="pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

            <SourceBanner source={data.source} />

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-2xl font-black text-[#0a0f2e]">
                {data.domain}
              </h2>
              <span className="text-sm text-[#64748b]">
                {data.results.length} keyword{data.results.length === 1 ? "" : "s"} · {data.location}
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {data.results.map((r, i) => (
                <motion.div
                  key={r.keyword}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ResultCard result={r} />
                </motion.div>
              ))}
            </div>

            {/* Conversion hook — matches the /tools mid-page CTA.
                Preview mode gets its own version: the tool can't tell the visitor
                where they rank, so the offer becomes "a human will". That is a
                stronger promise than the automated number anyway. */}
            {isPreview && (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-[#AFA9EC] bg-white p-8 text-center">
                <p className="text-xl font-black text-[#0a0f2e]">
                  Want the real position for {data.domain}?
                </p>
                <p className="max-w-xl text-sm text-[#64748b]">
                  Automated position tracking isn&apos;t switched on yet — but the founder will run
                  {data.results.length === 1 ? " your keyword " : ` all ${data.results.length} of your keywords `}
                  by hand and send back the actual numbers, who&apos;s outranking you, and a 90-day
                  plan. Free, within 24 hours.
                </p>
                <Link href={auditHref}
                  className="group mt-2 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}>
                  <BarChart3 className="h-4 w-4" /> Get My Real Rankings
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="text-xs text-[#94a3b8]">
                  No credit card. Your domain and keywords carry over.
                </p>
              </div>
            )}

            {missing > 0 && (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center">
                <p className="text-xl font-black text-[#0a0f2e]">
                  {missing} of your keyword{missing === 1 ? "" : "s"} {missing === 1 ? "isn't" : "aren't"} in the top 100.
                </p>
                <p className="max-w-xl text-sm text-[#64748b]">
                  A missing ranking is a symptom, not the problem. Get the founder to review the whole
                  picture — free, with a 90-day roadmap, within 24 hours.
                </p>
                <Link href={auditHref}
                  className="group mt-2 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}>
                  <BarChart3 className="h-4 w-4" /> Get Free SEO Audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── How to read the results ──
          The page was previously a form, a results area and an FAQ — nothing for
          Google to rank when the visitor hasn't run a check yet, which is the
          state every crawler and most first-time visitors see. These three
          sections are the body copy that state was missing. */}
      <section className="pb-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-black text-[#0a0f2e]">How to read your results</h2>
          <div className="space-y-4">
            {[
              {
                n: "1",
                t: "Your position is a range, not a fact",
                d: "Google returns slightly different results by city, device and time of day. A keyword sitting at #8 today and #11 tomorrow hasn't moved in any meaningful sense — it's one position, wobbling. Treat anything inside ±3 as noise and watch the trend over weeks.",
              },
              {
                n: "2",
                t: "The URL that ranks matters more than the number",
                d: "If Google is ranking your homepage for a service keyword, that's usually a content problem, not a rankings problem — you don't have a page that deserves the query yet. Building the right page often beats trying to push the wrong one up.",
              },
              {
                n: "3",
                t: "Position #1 isn't the top of the page any more",
                d: "AI Overviews, featured snippets, local packs and People Also Ask boxes all sit above the first organic result. Ranking #1 underneath three SERP features can earn fewer clicks than ranking #4 on a clean results page. Read the features list before you celebrate the number.",
              },
              {
                n: "4",
                t: "Who's above you tells you what to build",
                d: "If the top 10 is directories and listicles, you need a comparison page. If it's all local businesses, your Google Business Profile is the lever. If it's Reddit and forums, Google has decided this query wants opinion, not marketing copy.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEEDFE] text-sm font-black text-[#534AB7]">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-bold text-[#0a0f2e]">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERP feature glossary — reuses the hints already written for the chips ── */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl font-black text-[#0a0f2e]">
            What each SERP feature means
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#64748b]">
            A SERP feature is anything Google puts on the results page that isn&apos;t a plain blue
            link. Each one takes clicks away from the organic results — and each one is its own
            opportunity to appear.
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(SERP_FEATURE_META) as Array<keyof typeof SERP_FEATURE_META>).map((key) => {
              const meta = SERP_FEATURE_META[key];
              return (
                <div key={key} className="rounded-2xl border border-[#e5e7eb] bg-white p-4">
                  <dt>
                    <span
                      className="inline-block rounded-lg px-2.5 py-1 text-[11px] font-bold"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      {meta.label}
                    </span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#475569]">{meta.hint}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ── Why your own searches lie to you ── */}
      <section className="pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-black text-[#0a0f2e]">
            Why your position looks different when you search
          </h2>
          <div className="space-y-3">
            {[
              ["Search history", "Google knows you've visited your own site hundreds of times. It ranks what you engage with higher — for you, and only for you."],
              ["Location", "Results shift between countries, cities and even neighbourhoods. Checking from your office is checking one very specific SERP."],
              ["Device and account", "Desktop and mobile return different results, and being signed in changes them again. An incognito window helps but does not fully strip personalisation."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                <h3 className="font-bold text-[#0a0f2e]">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#64748b]">
            This is why an un-personalised check is the number worth tracking — and why the
            position you see in your own browser is almost always flattering.
          </p>
        </div>
      </section>

      {/* ── FAQ (matches FAQPage schema) ── */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-2xl font-black text-[#0a0f2e]">Quick Answers</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#e5e7eb] bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0a0f2e]">
                  {f.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#64748b] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── NicheSEO Pro banner ── */}
      <section className="py-16 border-t border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#0a0f2e] px-8 py-10 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">Tracking more than 5 keywords?</h2>
              <p className="max-w-xl text-blue-200">
                NicheSEO Pro tracks hundreds of keywords on a schedule, with position history,
                competitor movement alerts and white-label reports.
              </p>
            </div>
            <Link href="/tools/keyword-research"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-[#534AB7] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#3d35a0]">
              <Sparkles className="h-4 w-4" /> Try NicheSEO Pro
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Floating CTA ── */}
      <Link href="/free-audit"
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5"
        style={{ background: GREEN }}>
        <BarChart3 className="h-4 w-4" /> Reality Check
      </Link>
    </main>
  );
}

/* ------------------------------- Sub-components ---------------------------- */

function SourceBanner({ source }: { source: "dataforseo" | "preview" }) {
  if (source === "dataforseo") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        <Database className="h-4 w-4 shrink-0" />
        Live Google SERP data.
      </div>
    );
  }
  // Preview mode. This banner used to say "Sample data — these positions are
  // illustrative", underneath a card that still printed a confident "#47" beside
  // the visitor's own domain. The disclaimer never had a chance against the
  // number. Now the card reports no position at all, and this explains why.
  return (
    <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        <strong>Preview mode.</strong> Live position tracking isn&apos;t switched on yet, so we
        won&apos;t guess where you rank — the results below show what a SERP looks like and which
        features are in play, with no position attached. Want your real numbers?{" "}
        <Link href="/free-audit" className="font-bold underline underline-offset-2">
          Get a founder-run check, free, within 24 hours.
        </Link>
      </span>
    </div>
  );
}

function ResultCard({ result: r }: { result: SerpKeywordResult }) {
  const isPreview = r.source === "preview";
  const band = positionBand(r.position);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
      <div className="h-1 w-full" style={{ background: r.found ? PURPLE : "#e5e7eb" }} />

      <div className="p-6">
        {/* Header: keyword + position */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8]">Keyword</p>
            <h3 className="mt-1 text-lg font-black text-[#0a0f2e] break-words">{r.keyword}</h3>
          </div>
          <div className="flex items-center gap-3">
            {/* In preview mode there is no position to show. Printing "—" with a red
                "Not in top 100" badge would be its own kind of lie: we haven't
                looked, which is not the same as "you don't rank". */}
            {isPreview ? (
              <div className="text-right">
                <Lock className="ml-auto h-6 w-6 text-[#94a3b8]" aria-hidden />
                <span className="mt-1.5 inline-block rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[10px] font-bold text-[#475569]">
                  Not measured
                </span>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-3xl font-black leading-none" style={{ color: band.color }}>
                  {r.position !== null ? `#${r.position}` : "—"}
                </p>
                <span className="mt-1.5 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{ background: band.bg, color: band.color }}>
                  {band.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* AI Overview callout */}
        {r.isAiOverview && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#AFA9EC] bg-[#EEEDFE] px-4 py-3 text-sm font-semibold text-[#534AB7]">
            <Sparkles className="h-4 w-4 shrink-0" />
            You&apos;re cited in Google&apos;s AI Overview for this query.
          </div>
        )}

        {/* Your ranking URL */}
        {r.yourResult && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
              <Trophy className="h-3.5 w-3.5" /> Your ranking page
            </div>
            <p className="mt-1.5 font-bold text-[#0a0f2e] break-words">{r.yourResult.title}</p>
            <a href={r.yourResult.url} target="_blank" rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-800 break-all hover:underline">
              {r.yourResult.url} <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>
        )}

        {!r.found && (
          <div className="mt-4 rounded-xl border border-[#e5e7eb] bg-[#f8f9fc] px-4 py-3 text-sm text-[#64748b]">
            {isPreview ? (
              <>
                We haven&apos;t checked where{" "}
                <strong className="text-[#0a0f2e]">{r.yourDomain}</strong> ranks for this keyword —
                that needs a live reading of Google, which isn&apos;t switched on yet.
              </>
            ) : (
              <>
                <strong className="text-[#0a0f2e]">{r.yourDomain}</strong> doesn&apos;t appear in the
                top 100 for this keyword in {r.location}.
              </>
            )}
          </div>
        )}

        {/* SERP features */}
        {r.features.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
              {isPreview ? "SERP features to watch on this query type" : "SERP features"}
            </p>
            <div className="flex flex-wrap gap-2">
              {r.features.map((f) => {
                const meta = SERP_FEATURE_META[f];
                return (
                  <span key={f} title={meta.hint}
                    className="cursor-help rounded-lg px-2.5 py-1 text-[11px] font-bold"
                    style={{ background: meta.bg, color: meta.color }}>
                    {meta.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Top 10 */}
        {r.top10.length > 0 && (
          <div className="mt-6">
            <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
              {isPreview ? `Example top ${r.top10.length} — layout only` : `Top ${r.top10.length} results`}
            </p>
            <ol className="space-y-1.5">
              {r.top10.map((item) => {
                const isYou = domainMatches(item.domain, r.yourDomain);
                return (
                  <li key={item.rank}
                    className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 ${
                      isYou ? "border-emerald-200 bg-emerald-50" : "border-transparent bg-[#f8f9fc]"
                    }`}>
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-black ${
                      isYou ? "bg-emerald-600 text-white" : "bg-white text-[#64748b] border border-[#e5e7eb]"
                    }`}>
                      {item.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#0a0f2e]">{item.title || item.domain}</p>
                      <p className={`truncate text-xs ${isYou ? "text-emerald-700 font-semibold" : "text-[#64748b]"}`}>
                        {item.domain}{isYou && " — that's you"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* Competitors */}
        {r.competitors.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
              {isPreview ? "Example competitor set" : "Domains owning this SERP"}
            </p>
            <div className="flex flex-wrap gap-2">
              {r.competitors.map((c) => (
                <span key={c.domain}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                    domainMatches(c.domain, r.yourDomain)
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-[#e5e7eb] bg-white text-[#475569]"
                  }`}>
                  {c.domain}
                  {c.count > 1 && <span className="text-[#94a3b8]">×{c.count}</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
