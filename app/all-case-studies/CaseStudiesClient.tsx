"use client";

/**
 * CaseStudiesClient (Semrush Enterprise Style)
 *
 * Design principles applied (from https://enterprise.semrush.com/customer-stories/):
 * - Text OUTSIDE image cards (never overlaid)
 * - Muted olive/sage brand thumbnails instead of photo overlays
 * - 3-column grid, first card featured (spans 2 cols on desktop)
 * - Filter chips at top ("Show all" + vertical filters)
 * - Enterprise, quiet-confidence aesthetic
 */

import { useMemo, useState, useEffect, useCallback, useDeferredValue } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, TrendingUp, Filter } from "lucide-react";

import type { CaseStudy, SeoType, Metric } from "./data";
import { caseStudies, detailUrl } from "./data";

// ─────────────────────────────────────────────────────────────
// SEMRUSH-INSPIRED THEME (light, enterprise, muted)
// ─────────────────────────────────────────────────────────────
const CARD_BACKGROUNDS = [
  { bg: "#e8ebe0", ink: "#1a1a1a" },  // olive
  { bg: "#1a1a1a", ink: "#ffffff" },  // dark
  { bg: "#f0ebe4", ink: "#1a1a1a" },  // sage
  { bg: "#2a2a2a", ink: "#ffffff" },  // charcoal
  { bg: "#e5e8e0", ink: "#1a1a1a" },  // sage-2
  { bg: "#1a1a1a", ink: "#ffffff" },  // dark
];

// ─────────────────────────────────────────────────────────────
// Filter categories (map to vertical string enum)
// ─────────────────────────────────────────────────────────────
type FilterKey = "all" | "law-firm" | "local" | "technical" | "ecommerce";

// Each filter chip maps to the `seoType` values that actually exist in data.ts.
const VERTICAL_FILTERS: { key: FilterKey; label: string; seoType?: SeoType }[] = [
  { key: "all", label: "Show all" },
  { key: "law-firm", label: "Law Firm SEO", seoType: "Law Firm SEO" },
  { key: "local", label: "Local SEO", seoType: "Local SEO" },
  { key: "technical", label: "Technical SEO", seoType: "Technical SEO" },
  { key: "ecommerce", label: "E-commerce SEO", seoType: "Ecommerce SEO" },
];

const SEO_TYPE_BY_FILTER = new Map<FilterKey, SeoType>(
  VERTICAL_FILTERS.flatMap((f) => (f.seoType ? [[f.key, f.seoType] as const] : []))
);

const isFilterKey = (v: string | null): v is FilterKey =>
  !!v && VERTICAL_FILTERS.some((f) => f.key === v);

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function CaseStudiesClient({ linkedinUrl, initialCaseStudies = [] }: { linkedinUrl?: string, initialCaseStudies?: any[] }) {
  const router = useRouter();
  const pathname = usePathname();

  // Start on "all" — the state the canonical, param-free URL represents.
  //
  // A ?vertical= deep link is read after mount instead of via useSearchParams().
  // That hook is deliberately avoided: this route is prerendered, and search
  // params are unknowable at build time, so useSearchParams() makes Next.js emit
  // the enclosing Suspense fallback into the static HTML. The whole page — H1,
  // hero copy, every case study card and its internal links — was therefore
  // absent for crawlers. Reading window.location after hydration keeps the route
  // prerenderable and the markup complete.
  const [activeVertical, setActiveVertical] = useState<FilterKey>("all");
  const [hydrated, setHydrated] = useState(false);
  const deferredVertical = useDeferredValue(activeVertical);

  const dbCaseStudiesFormatted = initialCaseStudies.map((cs) => ({
    id: cs.id,
    client: cs.clientName,
    seoType: "Custom SEO",
    slug: cs.slug,
    headline: cs.title,
    description: cs.metaDescription || "Read how we improved SEO performance.",
    metrics: [],
    image: cs.coverImage || "/images/case-studies/default.jpg",
    featured: false,
    video: null
  }));
  const allCaseStudies = [...dbCaseStudiesFormatted, ...caseStudies];

  // Apply a ?vertical= deep link once, on mount.
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("vertical");
    if (isFilterKey(raw)) setActiveVertical(raw);
    setHydrated(true);
  }, []);

  // Sync filter to URL. Skipped until the deep link above has been read, so the
  // mount pass can't strip the incoming param before it is applied.
  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams(window.location.search);
    if (activeVertical === "all") {
      params.delete("vertical");
    } else {
      params.set("vertical", activeVertical);
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    if (newUrl === `${window.location.pathname}${window.location.search}`) return;
    router.replace(newUrl, { scroll: false });
  }, [activeVertical, hydrated, pathname, router]);

  // Filter case studies by seoType, featured studies first so the hero card is a strong one.
  const filteredStudies = useMemo(() => {
    const list =
      deferredVertical === "all"
        ? allCaseStudies
        : allCaseStudies.filter((cs) => cs.seoType === SEO_TYPE_BY_FILTER.get(deferredVertical));
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [deferredVertical, allCaseStudies]);

  const handleFilterChange = useCallback((vertical: FilterKey) => {
    setActiveVertical(vertical);
  }, []);

  return (
    <main className="bg-white text-[#0a0f2e]">

      {/* ─────────── HERO SECTION ─────────── */}
      <section className="border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:pt-32 lg:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b61ff]">
              <span className="h-px w-8 bg-[#7b61ff]" />
              Case Studies
              <span className="h-px w-8 bg-[#7b61ff]" />
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Real results from<br />
              <span className="text-[#7b61ff]">verified SEO wins.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#5a6270] sm:text-lg">
              Every case study below is backed by Google Search Console data — no vanity metrics, no marketing spin. Real firms, measurable outcomes, methodology you can inspect.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── FILTER BAR (sticky) ─────────── */}
      <section className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {VERTICAL_FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterChange(filter.key)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeVertical === filter.key
                      ? "bg-[#0a0f2e] text-white"
                      : "border border-[#e5e7eb] bg-white text-[#5a6270] hover:border-[#0a0f2e] hover:text-[#0a0f2e]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="hidden items-center gap-2 text-xs uppercase tracking-widest text-[#5a6270] lg:flex">
              <Filter className="h-3.5 w-3.5" />
              <span>{filteredStudies.length} {filteredStudies.length === 1 ? "story" : "stories"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── CASE STUDIES GRID ─────────── */}
      <section className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={deferredVertical}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {filteredStudies.length === 0 ? (
                <div className="col-span-full py-20 text-center">
                  <p className="text-lg text-[#5a6270]">No case studies match this filter yet.</p>
                  <button
                    onClick={() => handleFilterChange("all")}
                    className="mt-4 text-sm font-semibold text-[#7b61ff] underline"
                  >
                    Show all case studies
                  </button>
                </div>
              ) : (
                filteredStudies.map((cs, i) => (
                  <CaseStudyCard
                    key={cs.id}
                    cs={cs}
                    index={i}
                    featured={i === 0}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─────────── CTA SECTION ─────────── */}
      <section className="border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="rounded-2xl bg-[#e8ebe0] p-10 sm:p-16 lg:p-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6270]">
                Ready to create your own success story?
              </div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
                Let&apos;s make you our<br />next case study.
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#5a6270] sm:text-lg">
                Founder-led SEO for law firms, local businesses, and e-commerce brands. Free audit, no contracts, GSC-verified results.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/free-audit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a0f2e] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
                >
                  Get free audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0a0f2e]/20 px-6 py-3.5 text-sm font-semibold text-[#0a0f2e] transition-colors hover:bg-white"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// CASE STUDY CARD (Semrush style — text OUTSIDE image)
// ─────────────────────────────────────────────────────────────
function CaseStudyCard({
  cs,
  index,
  featured = false,
}: {
  cs: CaseStudy;
  index: number;
  featured?: boolean;
}) {
  const bgConfig = CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length];
  const isDark = bgConfig.ink === "#ffffff";

  // Top KPI (first metric — the headline number for this client)
  const topKpi = cs.metrics?.[0];

  // Determine image source (video thumbnail OR image)
  const imageSrc = cs.video
    ? `https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`
    : cs.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      className={`group ${featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <Link href={detailUrl(cs)} className="block">
        {/* IMAGE CARD (no text overlay — brand/metric focus) */}
        <div
          className="relative mb-5 overflow-hidden rounded-xl transition-all group-hover:-translate-y-1 group-hover:shadow-xl"
          style={{
            background: bgConfig.bg,
            aspectRatio: featured ? "16 / 9" : "4 / 3",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${cs.client} — ${cs.headline}`}
              className="absolute inset-0 h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <BrandFallback
                client={cs.client}
                isDark={isDark}
                topKpi={topKpi}
              />
            </div>
          )}

          {/* Top-right badge — vertical tag */}
          <div
            className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm z-10"
            style={{
              background: imageSrc ? "rgba(0,0,0,0.4)" : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.06)"),
              color: imageSrc ? "rgba(255,255,255,0.98)" : (isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.7)"),
            }}
          >
            {cs.seoType}
          </div>

          {/* Hover overlay arrow */}
          <div
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
            style={{
              background: imageSrc ? "rgba(0,0,0,0.5)" : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)"),
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowUpRight className={`h-4 w-4 ${(isDark || imageSrc) ? "text-white" : "text-[#0a0f2e]"}`} />
          </div>
        </div>

        {/* TEXT — OUTSIDE THE CARD (Semrush signature) */}
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5a6270]">
            <span className="text-[#0a0f2e]">{cs.client}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#c8ccd4]" />
            <span>{cs.industry}</span>
          </div>
          <h3
            className={`mb-2 font-semibold leading-snug text-[#0a0f2e] transition-colors group-hover:text-[#7b61ff] ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {cs.headline}
          </h3>
          {cs.challenge && (
            <p className={`leading-relaxed text-[#5a6270] ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
              {cs.challenge}
            </p>
          )}
          {/* Location + KPIs strip */}
          {(cs.location || cs.metrics?.length) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5a6270]">
              {cs.location && (
                <span className="uppercase tracking-widest">{cs.location}</span>
              )}
              {cs.metrics?.slice(0, 2).map((m, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 font-semibold text-[#0a0f2e]">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {m.v} {m.l}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────
// FALLBACK BRAND DISPLAY (when no cover image — big metric focus)
// ─────────────────────────────────────────────────────────────
function BrandFallback({
  client,
  isDark,
  topKpi,
}: {
  client: string;
  isDark: boolean;
  topKpi?: Metric;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {topKpi ? (
        <>
          <div
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: isDark ? "#ffffff" : "#0a0f2e" }}
          >
            {topKpi.v}
          </div>
          <div
            className="mt-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
          >
            {topKpi.l}
          </div>
        </>
      ) : (
        <div
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: isDark ? "#ffffff" : "#0a0f2e" }}
        >
          {client}
        </div>
      )}
    </div>
  );
}