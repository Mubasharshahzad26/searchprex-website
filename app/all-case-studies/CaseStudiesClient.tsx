"use client";
 
/**
 * CaseStudiesClient (Semrush Enterprise Style)
 *
 * Design principles applied (from https://enterprise.semrush.com/customer-stories/):
 * - Text OUTSIDE image cards (never overlaid)
 * - Muted olive/sage brand thumbnails (#e8ebe0) instead of photo overlays
 * - 3-column grid, first card featured (spans 2 cols on desktop)
 * - Simple typography hierarchy: 18px title bold + 14px description muted
 * - Filter chips at top ("Show all" + vertical filters)
 * - Enterprise, quiet-confidence aesthetic
 * - All original functionality preserved: filtering, URL sync, framer-motion, keyboard nav
 */
 
import { useMemo, useState, useEffect, useCallback, Suspense, useDeferredValue } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, TrendingUp, Award, Zap, Filter } from "lucide-react";
 
import type { CaseStudy } from "./data";
import { caseStudies, detailUrl } from "./data";
 
const RelatedCaseStudies = dynamic(() => import("./RelatedCaseStudies").catch(() => ({ default: () => null })), {
  ssr: false,
});
 
// ─────────────────────────────────────────────────────────────
// SEMRUSH-INSPIRED THEME (light, enterprise, muted)
// ─────────────────────────────────────────────────────────────
const THEME = {
  bg: "#ffffff",
  bgSoft: "#fafafa",
  cardBg: "#e8ebe0",         // Semrush's signature muted olive
  cardBgAlt: "#f0ebe4",      // secondary sage tone
  cardBgDark: "#1a1a1a",     // for dark variant thumbnails
  ink: "#0a0f2e",
  muted: "#5a6270",
  border: "#e5e7eb",
  accent: "#7b61ff",
  accentSoft: "#f0edff",
};
 
// Card background rotation (Semrush uses varied muted tones per card)
const CARD_BACKGROUNDS = [
  { bg: "#e8ebe0", ink: "#1a1a1a" },  // olive
  { bg: "#1a1a1a", ink: "#ffffff" },  // dark
  { bg: "#f0ebe4", ink: "#1a1a1a" },  // sage
  { bg: "#2a2a2a", ink: "#ffffff" },  // charcoal
  { bg: "#e5e8e0", ink: "#1a1a1a" },  // sage-2
  { bg: "#1a1a1a", ink: "#ffffff" },  // dark
];
 
// ─────────────────────────────────────────────────────────────
// Filter categories (vertical facets)
// ─────────────────────────────────────────────────────────────
const VERTICAL_FILTERS = [
  { key: "all", label: "Show all" },
  { key: "law-firm", label: "Law Firm SEO" },
  { key: "local", label: "Local SEO" },
  { key: "technical", label: "Technical SEO" },
  { key: "ecommerce", label: "E-commerce SEO" },
];
 
// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function CaseStudiesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
 
  const initialVertical = searchParams.get("vertical") || "all";
  const [activeVertical, setActiveVertical] = useState<string>(initialVertical);
  const deferredVertical = useDeferredValue(activeVertical);
 
  // Sync filter to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeVertical === "all") {
      params.delete("vertical");
    } else {
      params.set("vertical", activeVertical);
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVertical]);
 
  // Filter case studies
  const filteredStudies = useMemo(() => {
    if (deferredVertical === "all") return caseStudies;
    return caseStudies.filter((cs) => cs.vertical?.toLowerCase().includes(deferredVertical.replace("-", " ")) || cs.vertical?.toLowerCase().includes(deferredVertical));
  }, [deferredVertical]);
 
  const handleFilterChange = useCallback((vertical: string) => {
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
 
      {/* ─────────── CASE STUDIES GRID (Semrush layout) ─────────── */}
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
                    // First card featured (spans 2 cols on desktop)
                    featured={i === 0}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
 
      {/* ─────────── CTA SECTION (Semrush "Ready to..." style) ─────────── */}
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
 
      {/* ─────────── RELATED (preserved from original) ─────────── */}
      <Suspense fallback={null}>
        <RelatedCaseStudies />
      </Suspense>
 
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
 
  // Top KPI (largest metric to highlight)
  const topKpi = cs.kpiTiles?.[0];
 
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      className={`group ${featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
      <Link href={detailUrl(cs)} className="block">
        {/* IMAGE CARD (no text overlay — pure brand/logo/metric focus) */}
        <div
          className="relative mb-5 overflow-hidden rounded-xl transition-all group-hover:-translate-y-1 group-hover:shadow-xl"
          style={{
            background: bgConfig.bg,
            aspectRatio: featured ? "16 / 9" : "4 / 3",
          }}
        >
          {/* Brand identity — clean centered display */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {cs.coverImage ? (
              <img
                src={cs.coverImage}
                alt=""
                className="max-h-full max-w-full object-contain opacity-90 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <BrandFallback
                title={cs.title}
                vertical={cs.vertical}
                isDark={isDark}
                topKpi={topKpi}
              />
            )}
          </div>
 
          {/* Top-right badge — vertical tag (subtle) */}
          <div
            className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm"
            style={{
              background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
              color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)",
            }}
          >
            {cs.vertical || "SEO"}
          </div>
 
          {/* Hover overlay arrow */}
          <div
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowUpRight className={`h-4 w-4 ${isDark ? "text-white" : "text-[#0a0f2e]"}`} />
          </div>
        </div>
 
        {/* TEXT — OUTSIDE THE CARD (Semrush signature) */}
        <div>
          <h3
            className={`mb-2 font-semibold leading-snug text-[#0a0f2e] transition-colors group-hover:text-[#7b61ff] ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {cs.title}
          </h3>
          {cs.subtitle && (
            <p className={`leading-relaxed text-[#5a6270] ${featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
              {cs.subtitle}
            </p>
          )}
          {/* Location + KPIs strip */}
          {(cs.city || cs.state || cs.country || cs.kpiTiles?.length) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5a6270]">
              {(cs.city || cs.state || cs.country) && (
                <span className="uppercase tracking-widest">
                  {[cs.city, cs.state, cs.country].filter(Boolean).join(", ")}
                </span>
              )}
              {cs.kpiTiles?.slice(0, 2).map((k, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 font-semibold text-[#0a0f2e]">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  {k.value} {k.label}
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
  title,
  vertical,
  isDark,
  topKpi,
}: {
  title: string;
  vertical?: string;
  isDark: boolean;
  topKpi?: { value: string; label: string; tone?: string };
}) {
  // Extract brand name from title (first meaningful noun/company)
  const brandName = title.split(/[—–-]|:/)[0].trim().split(" ").slice(0, 3).join(" ");
 
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {topKpi ? (
        <>
          <div
            className={`text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl`}
            style={{ color: isDark ? "#ffffff" : "#0a0f2e" }}
          >
            {topKpi.value}
          </div>
          <div
            className={`mt-2 text-xs font-semibold uppercase tracking-widest`}
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
          >
            {topKpi.label}
          </div>
        </>
      ) : (
        <div
          className={`text-3xl font-bold tracking-tight sm:text-4xl`}
          style={{ color: isDark ? "#ffffff" : "#0a0f2e" }}
        >
          {brandName}
        </div>
      )}
    </div>
  );
}
 