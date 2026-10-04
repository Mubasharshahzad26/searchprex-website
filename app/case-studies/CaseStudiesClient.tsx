"use client";

/**
 * CaseStudiesClient (Semrush Enterprise Customer Stories Style)
 *
 * Matching Semrush Enterprise:
 * 1. Dark charcoal hero (#16181d) with "Real results from remarkable brands"
 *    and 3 prominent featured brand cards directly in the hero.
 * 2. Signature SpikeField (dense triangular needles, purple to mint gradient)
 *    transitioning into the pure white content canvas.
 * 3. "Enterprise wins worth exploring" with pill filters (Show all, Ecommerce, Local, Technical, Law Firm).
 * 4. 3-column card grid with brand containers and text OUTSIDE the container.
 * 5. In-grid "Ready to create your own success story?" magnet card.
 * 6. "LATEST RESOURCES" educational guide cards.
 * 7. Atmospheric bottom CTA section with enterprise audit request form.
 */

import { useMemo, useState, useEffect, useCallback, useDeferredValue } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, TrendingUp, Filter, Sparkles, CheckCircle2, Shield, Play } from "lucide-react";

import type { CaseStudy, SeoType, Metric } from "./data";
import { caseStudies, detailUrl } from "./data";
import { posts as fallbackBlogPosts } from "@/app/blog/data";

// ─────────────────────────────────────────────────────────────
// SEMRUSH LG-STYLE SPIKE FIELD
// ─────────────────────────────────────────────────────────────
const SPIKE_COUNT = 110;
const SPIKE_VB_W = 1100;
const SPIKE_VB_H = 200;
const SPIKES = Array.from({ length: SPIKE_COUNT }, (_, i) => {
  const step = SPIKE_VB_W / SPIKE_COUNT;
  const wobble = Math.sin(i * 1.7) * 0.06 + Math.sin(i * 0.37) * 0.05;
  const h = SPIKE_VB_H * (0.86 + wobble);
  const x = i * step;
  return `${x.toFixed(2)},${SPIKE_VB_H} ${(x + step / 2).toFixed(2)},${(SPIKE_VB_H - h).toFixed(2)} ${(x + step).toFixed(2)},${SPIKE_VB_H}`;
});

function SpikeField() {
  return (
    <motion.svg
      aria-hidden
      viewBox={`0 0 ${SPIKE_VB_W} ${SPIKE_VB_H}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[140px] w-full sm:h-[180px] lg:h-[210px] pointer-events-none"
      style={{ transformOrigin: "bottom" }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <defs>
        <linearGradient id="hub-spike-grad" x1="0" y1="0" x2="0" y2={SPIKE_VB_H} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#9b8cff" />
          <stop offset="62%" stopColor="#8f7cf7" />
          <stop offset="85%" stopColor="#3ee0b0" />
          <stop offset="100%" stopColor="#3eb489" />
        </linearGradient>
      </defs>
      <g fill="url(#hub-spike-grad)">
        {SPIKES.map((pts, i) => (
          <polygon key={i} points={pts} />
        ))}
      </g>
    </motion.svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SEMRUSH-INSPIRED CARD PALETTE (olive, charcoal, sage, sand)
// ─────────────────────────────────────────────────────────────
const CARD_BACKGROUNDS = [
  { bg: "#dce2d5", ink: "#14181f" },  // Semrush olive
  { bg: "#1a1d24", ink: "#ffffff" },  // Dark charcoal
  { bg: "#e8ede2", ink: "#14181f" },  // Light sage
  { bg: "#252932", ink: "#ffffff" },  // Slate charcoal
  { bg: "#ece7de", ink: "#14181f" },  // Muted sand
  { bg: "#1f232b", ink: "#ffffff" },  // Dark charcoal 2
];

// ─────────────────────────────────────────────────────────────
// Filter categories (map to vertical string enum)
// ─────────────────────────────────────────────────────────────
type FilterKey = "all" | "law-firm" | "local" | "technical" | "ecommerce";

const VERTICAL_FILTERS: { key: FilterKey; label: string; seoType?: SeoType }[] = [
  { key: "all", label: "Show all" },
  { key: "ecommerce", label: "E-commerce SEO", seoType: "Ecommerce SEO" },
  { key: "local", label: "Local SEO", seoType: "Local SEO" },
  { key: "technical", label: "Technical SEO", seoType: "Technical SEO" },
  { key: "law-firm", label: "Law Firm SEO", seoType: "Law Firm SEO" },
];

const SEO_TYPE_BY_FILTER = new Map<FilterKey, SeoType>(
  VERTICAL_FILTERS.flatMap((f) => (f.seoType ? [[f.key, f.seoType] as const] : []))
);

const isFilterKey = (v: string | null): v is FilterKey =>
  !!v && VERTICAL_FILTERS.some((f) => f.key === v);

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function CaseStudiesClient({
  linkedinUrl,
  initialCaseStudies = [],
  latestBlogs = [],
}: {
  linkedinUrl?: string;
  initialCaseStudies?: any[];
  latestBlogs?: any[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeVertical, setActiveVertical] = useState<FilterKey>("all");
  const [hydrated, setHydrated] = useState(false);
  const deferredVertical = useDeferredValue(activeVertical);

  // Quick form state for bottom CTA
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", service: "Ecommerce SEO" });

  const blogsToDisplay = (latestBlogs && latestBlogs.length > 0)
    ? latestBlogs.slice(0, 4)
    : fallbackBlogPosts.slice(0, 4);

  const dbCaseStudiesFormatted: CaseStudy[] = initialCaseStudies.flatMap((cs) => {
    const [industry, client] = String(cs.slug ?? "").split("/");
    if (!industry || !client || !cs.clientName || !cs.title) return [];

    return [{
      id: cs.id,
      client: cs.clientName,
      seoType: "Technical SEO" as SeoType,
      industry,
      location: cs.location ?? "—",
      headline: cs.title,
      metrics: [] as Metric[],
      image: cs.coverImage || "/images/case-studies/default.jpg",
      featured: false,
      badgeColor: "#534AB7",
      badgeBg: "#EEEDFE",
      slug: { industry, client },
    }];
  });

  const allCaseStudies = [...dbCaseStudiesFormatted, ...caseStudies];

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("vertical");
    if (isFilterKey(raw)) setActiveVertical(raw);
    setHydrated(true);
  }, []);

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

  // Top 3 featured case studies for the Semrush dark hero section
  const heroFeaturedStudies = useMemo(() => {
    const mso = allCaseStudies.find((c) => c.slug.client === "michigan-outdoor-sports");
    const dolls = allCaseStudies.find((c) => c.slug.client === "dolls-cleaning");
    const remit = allCaseStudies.find((c) => c.slug.client === "remit-choice");
    const smk = allCaseStudies.find((c) => c.slug.client === "smk-store");
    return [mso, dolls, remit || smk].filter(Boolean) as CaseStudy[];
  }, [allCaseStudies]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website && formData.email) {
      setFormSubmitted(true);
    }
  };

  return (
    <main className="bg-white text-[#0a0f2e]">

      {/* ─────────── 1. SEMRUSH DARK SPIKE HERO WITH 3 FEATURED CARDS ─────────── */}
      <section className="relative overflow-hidden bg-[#16181d] text-white pt-32 pb-36 lg:pt-36 lg:pb-44">
        {/* Background glow and spike field */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#534AB7]/20 blur-[140px]" />
          <div className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-[#3eb489]/15 blur-[130px]" />
        </div>

        <SpikeField />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Eyebrow & Title */}
          <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <span className="h-px w-6 bg-[#3eb489]" />
              Case Studies
              <span className="h-px w-6 bg-[#3eb489]" />
            </div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Real results from<br />
              <span className="text-white">remarkable brands</span>
            </h1>
          </div>

          {/* 3 Featured Cards in the Dark Hero (Semrush Signature Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {heroFeaturedStudies.map((cs, idx) => {
              const bgPalette = idx === 0 ? "#dce2d5" : idx === 1 ? "#1e222a" : "#dce2d5";
              const isDark = bgPalette === "#1e222a";
              const topKpi = cs.metrics?.[0];

              return (
                <Link
                  key={cs.id}
                  href={detailUrl(cs)}
                  className="group block transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* Brand Container Box */}
                  <div
                    className="relative rounded-2xl overflow-hidden aspect-[16/11] flex items-center justify-center p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl"
                    style={{ backgroundColor: bgPalette }}
                  >
                    {cs.video ? (
                      <div className="absolute inset-0 bg-[#080b1e]">
                        <img
                          src={`https://img.youtube.com/vi/${cs.video}/hqdefault.jpg`}
                          alt={cs.client}
                          className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3eb489] text-white shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="ml-1 h-5 w-5 fill-white text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center z-10">
                        <span
                          className={`text-2xl sm:text-3xl font-black tracking-tight uppercase ${
                            isDark ? "text-white" : "text-[#14181f]"
                          }`}
                        >
                          {cs.client}
                        </span>
                        {topKpi && (
                          <div className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black"
                            style={{
                              backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(20,24,31,0.08)",
                              color: isDark ? "#3eb489" : "#2f9670",
                            }}>
                            <TrendingUp className="h-3 w-3" />
                            {topKpi.v} {topKpi.l}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Top pill badge */}
                    <div className="absolute top-3.5 right-3.5 z-20 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm bg-black/40 text-white">
                      {cs.seoType}
                    </div>
                  </div>

                  {/* Text OUTSIDE the container (on the dark hero) */}
                  <div className="mt-4 px-1">
                    <h3 className="text-base font-semibold leading-snug text-white transition-colors group-hover:text-[#3eb489]">
                      {cs.headline}
                    </h3>
                    <p className="mt-1.5 text-xs text-white/60 line-clamp-1">
                      {cs.location} · {cs.verifiedVia ?? "GSC Verified"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── 2. ENTERPRISE WINS WORTH EXPLORING (WHITE CANVAS) ─────────── */}
      <section className="bg-white pt-16 pb-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Filter Bar */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a0f2e]">
              Enterprise wins worth exploring
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
              Real businesses, measurable organic turnarounds, verified directly from Google Search Console.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {VERTICAL_FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterChange(filter.key)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    activeVertical === filter.key
                      ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Grid of All Case Studies */}
          <AnimatePresence mode="wait">
            <motion.div
              key={deferredVertical}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredStudies.map((cs, i) => (
                <CaseStudyCard
                  key={cs.id}
                  cs={cs}
                  index={i}
                  featured={false}
                />
              ))}

              {/* Interspersed Success Story Card (Semrush Image 3 pattern) */}
              <div className="rounded-2xl bg-[#dce2d5] p-8 flex flex-col justify-between text-left shadow-xs transition-transform hover:-translate-y-1">
                <div>
                  <span className="inline-block rounded-full bg-[#14181f]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#14181f]">
                    Next Success Story
                  </span>
                  <h3 className="mt-6 text-2xl font-black leading-tight text-[#14181f]">
                    READY TO CREATE YOUR OWN SUCCESS STORY?
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#14181f]/80">
                    Send me your website URL. I&apos;ll run an itemized crawl &amp; indexing audit in 24 hours to uncover your exact bottlenecks.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/free-audit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#14181f] px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                  >
                    Get Free 24h Audit <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ─────────── 3. LATEST RESOURCES (Semrush Image 4 Pattern) ─────────── */}
      <section className="bg-[#f8fafc] py-20 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#534AB7] mb-2">
                Knowledge &amp; Frameworks
              </p>
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e]">
                LATEST RESOURCES
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Discover what&apos;s shaping tomorrow&apos;s search and generative AI visibility strategies.
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#534AB7] hover:underline"
            >
              Browse all guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogsToDisplay.map((blog: any, i: number) => (
              <Link
                key={blog.slug || i}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#534AB7]/40"
              >
                {/* Real Blog Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.heroImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80"}
                    alt={blog.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {blog.category || "Technical SEO"}
                    </span>
                  </div>

                  {/* Read Time Pill */}
                  {blog.readTime && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-[#0a0f2e]">
                        {blog.readTime}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#534AB7]">
                      {blog.subcategory || "Verified SEO Guide"}
                    </span>
                    <h3 className="mt-1.5 text-sm sm:text-base font-black leading-snug text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#534AB7] group-hover:text-[#7b61ff]">
                    <span>Read full guide</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 4. BOTTOM ENTERPRISE CTA SECTION (Semrush Image 5 Pattern) ─────────── */}
      <section className="relative overflow-hidden bg-[#16181d] text-white py-20 lg:py-28">
        {/* Ambient wave luminous gradients */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-[#534AB7]/25 blur-[140px]" />
          <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-[#3eb489]/20 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#3eb489] backdrop-blur-sm">
                Next-Gen Search Visibility
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                Ready to get started?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70 max-w-lg">
                Independent e-commerce brands, high-growth local contractors, and scaling firms partner with SearchPrex to stay ahead of algorithm updates and AI search environments.
              </p>

              <div className="mt-8 space-y-3.5">
                {[
                  "100% GSC-verified deliverables — zero vanity metrics",
                  "Founder-led technical strategy & custom programmatic pipelines",
                  "No long-term contracts; month-to-month performance milestones",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sleek Audit Request Form */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl">
              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3eb489]/20 text-[#3eb489] mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-white">Audit Request Received!</h3>
                  <p className="mt-2 text-xs text-white/70 max-w-xs mx-auto">
                    We are analyzing your domain&apos;s crawl &amp; indexing profile. You will receive an itemized video breakdown within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-2">
                    Request Your Free 24h Technical Teardown
                  </h3>
                  
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#3eb489] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourstore.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#3eb489] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#3eb489] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1">
                      Primary Service Focus
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-[#1e222a] px-4 py-2.5 text-sm text-white focus:border-[#3eb489] focus:outline-none transition-colors"
                    >
                      <option value="Ecommerce SEO">Ecommerce SEO (Catalog &amp; Indexing)</option>
                      <option value="Local SEO">Local SEO (Maps &amp; AI Overviews)</option>
                      <option value="Technical SEO">Technical SEO &amp; Crawl Budget</option>
                      <option value="Law Firm SEO">Law Firm SEO</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:opacity-95"
                    style={{ background: "linear-gradient(135deg, #534AB7 0%, #7b61ff 100%)" }}
                  >
                    Request Free 24h Audit <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[10px] text-center text-white/40 mt-2">
                    Zero sales pressure. You receive an honest video teardown of what is holding your site back.
                  </p>
                </form>
              )}
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

  const topKpi = cs.metrics?.[0];

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
        {/* BRAND CONTAINER BOX (Semrush signature tile) */}
        <div
          className="relative mb-5 overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl"
          style={{
            background: bgConfig.bg,
            aspectRatio: "16 / 10",
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

          {/* Top-right vertical badge */}
          <div
            className="absolute right-3.5 top-3.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm z-10"
            style={{
              background: imageSrc ? "rgba(0,0,0,0.45)" : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.06)"),
              color: imageSrc ? "rgba(255,255,255,0.98)" : (isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.75)"),
            }}
          >
            {cs.seoType}
          </div>

          {/* Hover overlay arrow */}
          <div
            className="absolute bottom-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
            style={{
              background: imageSrc ? "rgba(0,0,0,0.6)" : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.1)"),
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowUpRight className={`h-4 w-4 ${(isDark || imageSrc) ? "text-white" : "text-[#0a0f2e]"}`} />
          </div>
        </div>

        {/* TEXT — OUTSIDE THE CARD (Semrush signature layout) */}
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span className="text-[#0a0f2e] font-black">{cs.client}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{cs.industry}</span>
          </div>
          <h3 className="mb-2 text-lg font-black leading-snug text-[#0a0f2e] transition-colors group-hover:text-[#534AB7]">
            {cs.headline}
          </h3>
          {cs.challenge && (
            <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
              {cs.challenge}
            </p>
          )}

          {/* Location + KPIs strip */}
          {(cs.location || cs.metrics?.length) && (
            <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
              {cs.metrics?.slice(0, 2).map((m, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-[#065f46] text-[11px]">
                  <TrendingUp className="h-3 w-3 text-[#2f9670]" />
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
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ color: isDark ? "#ffffff" : "#0a0f2e" }}
          >
            {topKpi.v}
          </div>
          <div
            className="mt-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
          >
            {topKpi.l}
          </div>
        </>
      ) : (
        <div
          className="text-2xl sm:text-3xl font-black tracking-tight uppercase"
          style={{ color: isDark ? "#ffffff" : "#0a0f2e" }}
        >
          {client}
        </div>
      )}
    </div>
  );
}