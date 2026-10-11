"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  ArrowRight,
  Calendar,
  Clock,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Activity,
  Search,
  X,
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { CALL_HREF } from "@/lib/offer";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
 
/*
  ─── NEWS ITEM STYLING ───
  The items themselves live in the MarketingNews table and are edited at
  /content-admin/news. Nothing is hardcoded here on purpose: a hardcoded card
  cannot be corrected once the story moves on, and this page previously served a
  "core update rolling out" item for three months after that rollout finished.
*/
const TAG_COLORS: Record<string, string> = {
  "Core Update": PURPLE,
  "Spam Update": "#b91c1c",
  "AI Search": GREEN_DARK,
  "Search Console": "#0369a1",
  "Structured Data": "#b45309",
  "Discover": "#7c3aed",
  "Ecommerce": "#be185d",
  "Technical": "#0f766e",
  "Local": "#c2410c",
};
const tagColor = (tag: string) => TAG_COLORS[tag] || PURPLE;

/*
  Spoke categories are stored as "SEO News — AI SEO" so that the hub query
  (contains "SEO News") and each subnav query (contains "AI SEO") both match the
  same row. Only the subcategory half belongs on the card badge.
*/
const shortCategory = (category?: string) => {
  if (!category) return "SEO News";
  const parts = category.split("—");
  return (parts.length > 1 ? parts[parts.length - 1] : parts[0]).trim();
};

/*
 * Locale and time zone are both pinned. Bare toLocaleDateString() resolves
 * against the host's locale, so the server rendered "27/08/2026" while the
 * browser rendered "8/27/2026" -- a hydration mismatch that threw on every
 * visit. Pinning the time zone additionally stops a UTC server and a
 * west-of-UTC visitor disagreeing about which calendar day a timestamp is.
 */
const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/* 🔮 MOTION 🔮 */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const QUICK_NEWS_TOPICS = [
  "Spam Update",
  "Search Console",
  "Manual Actions",
  "AI Overviews",
  "Core Update",
  "Algorithms",
];
 
export default function NewsClient({
  initialNews = [],
  initialSpokes = [],
  category,
  heading,
  intro,
  categories = [],
}: {
  initialNews?: any[];
  initialSpokes?: any[];
  /** The ?category= filter, when one is active and recognised. */
  category?: string;
  heading?: string;
  intro?: string;
  categories?: Array<{ key: string; label: string }>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterAlreadySubscribed, setNewsletterAlreadySubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setSubmittingNewsletter(true);
    setNewsletterError(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          source: "news-hub-bottom-alerts",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNewsletterError(
          data.error || "Failed to subscribe. Please try again."
        );
        setSubmittingNewsletter(false);
        return;
      }

      setNewsletterSubscribed(true);
      if (data.alreadySubscribed) {
        setNewsletterAlreadySubscribed(true);
      }
      setSubmittingNewsletter(false);
    } catch {
      setNewsletterError("Network error while subscribing. Please try again.");
      setSubmittingNewsletter(false);
    }
  };

  // Which listing produced the lead — "news-hub" or "news-category:Local".
  const leadSource = category ? `news-category:${category}` : "news-hub";
  const dbNewsFormatted = initialNews.map((n: any) => ({
    id: n.id,
    date: formatDate(n.newsDate),
    tag: n.tag || "SEO News",
    tagColor: tagColor(n.tag || ""),
    title: n.title,
    summary: n.summary,
    sourceLabel: n.sourceLabel || "Source",
    sourceHref: n.sourceHref || "#",
  }));
  const news = dbNewsFormatted;

  const filteredSpokes = initialSpokes.filter((spoke: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (spoke.title && spoke.title.toLowerCase().includes(q)) ||
      (spoke.excerpt && spoke.excerpt.toLowerCase().includes(q)) ||
      (spoke.metaDescription && spoke.metaDescription.toLowerCase().includes(q)) ||
      (spoke.category && spoke.category.toLowerCase().includes(q))
    );
  });

  const filteredNews = news.filter((item: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.summary && item.summary.toLowerCase().includes(q)) ||
      (item.tag && item.tag.toLowerCase().includes(q))
    );
  });
 
  return (
    <main className="bg-[#f8f9fc]">
 
      {/* ── HERO (PLAIN WHITE DESIGN WITH GOOGLE-STYLE INSTANT LIVE SEARCH) ── */}
      <section className="relative overflow-visible border-b border-[#e5e7eb] bg-white pt-24 pb-14">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] transition-colors hover:text-[#534AB7]"
          >
            ← Back to Resources
          </Link>

          <div>
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-sm"
              style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}
            >
              <Newspaper className="h-3.5 w-3.5" /> Latest SEO News &amp; Algorithm Radar
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#0a0f2e] sm:text-5xl">
            {heading ?? <>SEO &amp; Google Update News</>}
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#64748b] leading-relaxed">
            {intro ??
              "Plain-English breakdowns of the algorithm changes, core updates, and AI-search shifts that actually affect your rankings — curated and explained."}
          </p>

          {/* ── GOOGLE SEARCH BAR WITH DYNAMIC INSTANT SERP RESULTS ── */}
          <div ref={searchContainerRef} className="relative mt-8 mb-5 mx-auto max-w-2xl">
            <div
              className={`relative flex items-center bg-white rounded-2xl border transition-all duration-200 ${
                isSearchFocused && searchQuery.trim().length > 0
                  ? "border-[#534AB7] ring-4 ring-[#534AB7]/15 shadow-xl"
                  : "border-[#dfe3ec] shadow-md hover:shadow-lg hover:border-[#534AB7]/40 focus-within:border-[#534AB7] focus-within:ring-4 focus-within:ring-[#534AB7]/15"
              }`}
            >
              <div className="pl-4 pr-2 text-[#534AB7]">
                <Search className="h-5 w-5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsSearchFocused(false);
                }}
                placeholder="Search SEO updates, GSC alerts, manual actions, or keywords..."
                aria-label="Search SEO news and algorithm updates"
                className="flex-1 py-3.5 pr-3 text-sm sm:text-base text-[#0a0f2e] placeholder-[#94a3b8] outline-none font-medium bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchFocused(false);
                    searchInputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 mr-2 text-[#64748b] hover:text-[#0a0f2e] text-xs font-bold uppercase tracking-wider flex items-center gap-1 rounded-md hover:bg-[#f1f5f9] transition-colors"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>

            {/* ── GOOGLE SEARCH ENGINE STYLE INSTANT LIVE RESULTS POPUP ── */}
            <AnimatePresence>
              {searchQuery.trim().length > 0 && isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.99 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-[#dfe3ec] bg-white shadow-2xl shadow-indigo-950/20 overflow-hidden text-left"
                >
                  {/* Google SERP Style Result Counter & Header */}
                  <div className="flex items-center justify-between border-b border-[#f1f5f9] px-4 py-2.5 bg-[#f8fafd] text-xs text-[#70757a]">
                    <div className="flex items-center gap-1.5">
                      <Search className="h-3.5 w-3.5 text-[#534AB7]" />
                      <span>
                        About {filteredSpokes.length + filteredNews.length} instant results for{" "}
                        <strong className="text-[#202124]">&ldquo;{searchQuery}&rdquo;</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                      className="text-xs font-semibold text-[#534AB7] hover:underline"
                    >
                      Clear
                    </button>
                  </div>

                  {filteredSpokes.length === 0 && filteredNews.length === 0 ? (
                    <div className="p-6 text-sm text-[#4d5156]">
                      <p className="font-semibold text-[#202124] mb-1">
                        Your search - <span className="font-bold">&ldquo;{searchQuery}&rdquo;</span> - did not match any algorithm updates.
                      </p>
                      <p className="text-xs text-[#70757a] mt-2">Suggestions:</p>
                      <ul className="list-disc pl-5 mt-1 text-xs text-[#70757a] space-y-1">
                        <li>Make sure all words are spelled correctly.</li>
                        <li>Try different keywords (e.g. &ldquo;Spam Update&rdquo;, &ldquo;Core Update&rdquo;, &ldquo;Search Console&rdquo;).</li>
                        <li>Try more general search terms.</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="max-h-[440px] overflow-y-auto divide-y divide-[#f1f5f9]">
                      {/* Group 1: Deep Dives (Spokes) */}
                      {filteredSpokes.map((spoke: any) => (
                        <Link
                          key={spoke.slug}
                          href={`/resources/news/${spoke.slug}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="group block p-4 hover:bg-[#f8fafd] transition-colors"
                        >
                          {/* Google Breadcrumb / URL */}
                          <div className="flex items-center gap-1.5 text-[11px] text-[#4d5156] mb-1">
                            <span className="font-medium text-[#202124]">searchprex.com</span>
                            <span className="text-[#9aa0a6]">›</span>
                            <span>resources</span>
                            <span className="text-[#9aa0a6]">›</span>
                            <span>news</span>
                            <span className="text-[#9aa0a6]">›</span>
                            <span className="text-[#5f6368] truncate max-w-[200px]">{spoke.slug}</span>
                            <span className="ml-auto inline-flex items-center rounded-full bg-[#534AB7]/10 px-2 py-0.5 text-[10px] font-bold text-[#534AB7]">
                              {shortCategory(spoke.category)}
                            </span>
                          </div>

                          {/* Google Signature Blue Title */}
                          <h4 className="text-base font-bold text-[#1a0dab] group-hover:underline leading-snug">
                            {spoke.title}
                          </h4>

                          {/* Google Snippet with Date */}
                          <p className="mt-1 text-xs sm:text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                            <span className="text-[#70757a] font-medium mr-1.5">
                              {formatDate(spoke.publishedAt || spoke.createdAt)} —
                            </span>
                            {spoke.excerpt || spoke.metaDescription || "Read the full analysis and what it means for your rankings."}
                          </p>
                        </Link>
                      ))}

                      {/* Group 2: News Feed Items */}
                      {filteredNews.map((item: any) => (
                        <a
                          key={item.title}
                          href={item.sourceHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block p-4 hover:bg-[#f8fafd] transition-colors"
                        >
                          {/* Google Breadcrumb / Source */}
                          <div className="flex items-center gap-1.5 text-[11px] text-[#4d5156] mb-1">
                            <span className="font-medium text-[#202124]">{item.sourceLabel || "Google Status"}</span>
                            <span className="text-[#9aa0a6]">›</span>
                            <span className="text-[#5f6368]">{item.tag}</span>
                            <span
                              className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                              style={{ color: item.tagColor }}
                            >
                              External Intel <ExternalLink className="h-2.5 w-2.5" />
                            </span>
                          </div>

                          {/* Google Signature Blue Title */}
                          <h4 className="text-base font-bold text-[#1a0dab] group-hover:underline leading-snug flex items-center gap-1.5">
                            {item.title}
                          </h4>

                          {/* Snippet with Date */}
                          <p className="mt-1 text-xs sm:text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                            <span className="text-[#70757a] font-medium mr-1.5">{item.date} —</span>
                            {item.summary}
                          </p>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Google Footer Action */}
                  <div className="border-t border-[#f1f5f9] bg-[#f8fafd] px-4 py-2 text-center text-xs text-[#70757a]">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#dfe3ec] text-[11px] font-mono text-[#202124]">Esc</kbd> or click outside to close.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Topic Chips */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[11px] font-semibold text-[#94a3b8] mr-1">Trending:</span>
              {QUICK_NEWS_TOPICS.map((topic) => {
                const active = searchQuery.toLowerCase() === topic.toLowerCase();
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      const next = active ? "" : topic;
                      setSearchQuery(next);
                      if (next) setIsSearchFocused(true);
                    }}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all shadow-sm ${
                      active
                        ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/20 scale-105"
                        : "bg-[#f8f9fc] text-[#475569] border border-[#e2e8f0] hover:border-[#534AB7] hover:text-[#534AB7] hover:bg-white"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category links */}
          {categories.length > 0 && (
            <nav aria-label="News categories" className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/resources/news"
                aria-current={!category ? "page" : undefined}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm ${
                  !category
                    ? "border-[#534AB7] bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/15"
                    : "border-[#dfe3ec] bg-[#f8f9fc] text-[#475569] hover:border-[#534AB7] hover:bg-white"
                }`}
              >
                All news
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.key}
                  href={`/resources/news?category=${encodeURIComponent(c.key)}`}
                  aria-current={category === c.key ? "page" : undefined}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm ${
                    category === c.key
                      ? "border-[#534AB7] bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/15"
                      : "border-[#dfe3ec] bg-[#f8f9fc] text-[#475569] hover:border-[#534AB7] hover:bg-white"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      {/* ── 48-HOUR LIVE INTELLIGENCE BRIEF (ELEVATED SENIOR UI/UX REDESIGN) ── */}
      <section className="border-b border-[#e5e7eb] bg-[#f8f9fc] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Executive Intelligence Container */}
          <div className="relative overflow-hidden rounded-3xl border border-[#dfe3ec] bg-white shadow-xl shadow-indigo-950/5">
            {/* Top Multi-Color Accent Gradient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-[#534AB7] to-indigo-600" />

            <div className="p-6 sm:p-8 md:p-10">
              {/* Header Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-[#f1f5f9]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-emerald-800 border border-emerald-200/80 shadow-sm shadow-emerald-500/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    LIVE ALGORITHM INTEL • PAST 48 HOURS
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748b]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Updated October 2026</span>
                  <span className="text-[#cbd5e1]">•</span>
                  <a
                    href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0a0f2e] hover:text-[#534AB7] transition-colors underline decoration-[#cbd5e1] hover:decoration-[#534AB7]"
                  >
                    Verified by Mubashar Sharif
                  </a>
                </div>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a0f2e] leading-snug mb-4">
                SEO News Past 2 Days: Google September 2026 Spam Update Concludes &amp; GSC Manual Actions Surge
              </h2>

              {/* Direct-Answer Quotable Block (Engineered for Google AI Overview extraction) */}
              <p className="text-base sm:text-lg leading-relaxed text-[#334155] mb-8 font-normal">
                Over the past 48 hours, Google officially completed its September 2026 Spam Update after an extensive 14-day global rollout. The completion triggered an immediate surge in Google Search Console manual actions targeting scaled AI content, alongside new Search Central guidance enforcing element-level human review for metadata and structured data.
              </p>

              {/* 3 Metric Intelligence Cards with Premium Visual Styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {/* Card 1: GSC Manual Actions */}
                <div className="group rounded-2xl border border-rose-200/80 bg-rose-50/30 hover:bg-rose-50/60 p-5 transition-all hover:shadow-md hover:border-rose-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-rose-500 rounded-l" />
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="inline-flex p-1.5 rounded-lg bg-rose-100 text-rose-700">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-extrabold tracking-wider text-rose-900 uppercase">
                      GSC Manual Actions
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Noticeable spike in &ldquo;Scaled Content Abuse&rdquo; and &ldquo;Pure Spam&rdquo; flags inside Google Search Console security tabs.
                  </p>
                  <div className="mt-3.5 pt-2.5 border-t border-rose-100/80 flex items-center justify-between text-[11px] font-bold text-rose-700">
                    <span>Severity Level</span>
                    <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-800">High Alert</span>
                  </div>
                </div>

                {/* Card 2: Algorithmic Shift */}
                <div className="group rounded-2xl border border-indigo-200/80 bg-indigo-50/30 hover:bg-indigo-50/60 p-5 transition-all hover:shadow-md hover:border-indigo-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#534AB7] rounded-l" />
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="inline-flex p-1.5 rounded-lg bg-indigo-100 text-[#534AB7]">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-extrabold tracking-wider text-[#3C3489] uppercase">
                      Algorithmic Shift
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Unlinked programmatic doorway pages experienced 50%–70% indexation compression, while verified topical clusters held firm.
                  </p>
                  <div className="mt-3.5 pt-2.5 border-t border-indigo-100/80 flex items-center justify-between text-[11px] font-bold text-[#534AB7]">
                    <span>Index Compression</span>
                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-[#3C3489]">50%–70% Drop</span>
                  </div>
                </div>

                {/* Card 3: AI Overviews (GEO) */}
                <div className="group rounded-2xl border border-emerald-200/80 bg-emerald-50/30 hover:bg-emerald-50/60 p-5 transition-all hover:shadow-md hover:border-emerald-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500 rounded-l" />
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="inline-flex p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-extrabold tracking-wider text-emerald-900 uppercase">
                      AI Overviews (GEO)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Gemini citations prioritize concise direct definitions, fresh verified author schema, and structured FAQ entities.
                  </p>
                  <div className="mt-3.5 pt-2.5 border-t border-emerald-100/80 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                    <span>Citation Engine</span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-800">Q&amp;A Schema</span>
                  </div>
                </div>
              </div>

              {/* Action & Source Verification Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#f1f5f9]">
                <Link
                  href="/resources/news/google-september-2026-spam-update-completed"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#534AB7]/20 transition-all hover:bg-[#433c99] hover:gap-3 hover:shadow-lg"
                >
                  Read Full Rollout &amp; Penalty Analysis <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-xs text-[#94a3b8] flex items-center gap-1.5">
                  <span>Source Verification:</span>
                  <a
                    href="https://status.search.google.com/incidents/september-2026-spam-update"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#64748b] hover:text-[#534AB7] underline decoration-[#cbd5e1]"
                  >
                    Google Search Status
                  </a>
                  <span>&amp;</span>
                  <a
                    href="https://searchengineland.com/google-september-2026-spam-update-completed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#64748b] hover:text-[#534AB7] underline decoration-[#cbd5e1]"
                  >
                    Search Engine Land
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEEP DIVES (SPOKES) ── */}
      {filteredSpokes.length > 0 && (
        <section className="py-16 border-b border-[#e5e7eb] bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-[#0a0f2e] text-center">
              {searchQuery ? `Deep-Dives Matching "${searchQuery}"` : "Comprehensive SEO News Deep-Dives"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSpokes.map((spoke: any) => (
                <Link key={spoke.slug} href={`/resources/news/${spoke.slug}`} className="group block rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] p-6 transition-all hover:shadow-lg hover:border-[#534AB7]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#534AB7] text-white">
                      {shortCategory(spoke.category)}
                    </span>
                    <span className="text-xs font-semibold text-[#64748b]">{formatDate(spoke.publishedAt || spoke.createdAt)}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors">{spoke.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748b] mb-4">{spoke.excerpt || spoke.metaDescription || "Read the full analysis and what it means for your rankings."}</p>
                  <span className="inline-flex items-center gap-1 font-bold text-sm text-[#534AB7] group-hover:gap-2 transition-all">Read Full Article <ArrowRight className="w-4 h-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state for spokes if search returns 0 */}
      {searchQuery && filteredSpokes.length === 0 && (
        <section className="py-8 bg-white border-b border-[#e5e7eb] text-center">
          <p className="text-sm text-[#64748b]">No comprehensive deep-dives matching &ldquo;{searchQuery}&rdquo;. Check quick updates below.</p>
        </section>
      )}

      {/* ── LEAD MAGNET — between the deep-dives and the feed, where a reader
          who came for one story has just decided whether to keep reading. ── */}
      <section className="bg-[#f8f9fc] pt-4">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ArticleLeadMagnet
            variant="banner"
            source={leadSource}
            copy={{
              eyebrow: "Reading about an update?",
              headline: "Find out whether it touched your site.",
              sub: "Send me your URL. I’ll check it myself against the changes on this page — what moved, what didn’t, and whether Google’s AI names you or a competitor. Free, reply within 24 hours.",
            }}
            buttonText="Inspect My Site For Algorithm Impact →"
          />
        </div>
      </section>

      {/* ── NEWS FEED ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-[#0a0f2e] text-center">
            {searchQuery ? `Quick Updates Matching "${searchQuery}"` : "Live Algorithm Tracker & Quick Updates"}
          </h2>
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8">
              <Search className="h-10 w-10 text-[#94a3b8] mx-auto mb-3" />
              <p className="text-base font-bold text-[#0a0f2e]">No updates found matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-sm text-[#64748b] mt-1 mb-4">Try searching for broader terms like Spam Update, Manual Actions, or Search Console.</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#534AB7] text-white text-xs font-bold hover:bg-[#433c99] transition-all"
              >
                Reset Search Filter
              </button>
            </div>
          ) : (
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
              {filteredNews.map((item) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:shadow-md hover:border-[#534AB7]/40"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${item.tagColor}1a`, color: item.tagColor }}>
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#94a3b8]">
                      <Calendar className="h-3 w-3" /> {item.date}
                    </span>
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-[#0a0f2e]">{item.title}</h2>
                  <p className="mb-4 text-sm leading-relaxed text-[#64748b]">{item.summary}</p>
                  <a
                    href={item.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                    style={{ color: GREEN_DARK }}
                  >
                    Source: {item.sourceLabel} <ExternalLink className="h-3 w-3" />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-[#94a3b8]"
          >
            Updated as major SEO news breaks. Summaries are our own; always check the linked source for full details.
          </motion.p>
        </div>
      </section>

      {/* ── SEARCH CONSOLE NEWS & LIVE STATUS TRACKER ── */}
      <section className="py-16 bg-white border-t border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-200 mb-3">
              <Activity className="h-3.5 w-3.5" /> Search Console Intel
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0a0f2e]">
              Google Search Console News &amp; Known Issues Tracker
            </h2>
            <p className="mt-3 text-base text-[#64748b] max-w-2xl mx-auto">
              Real-time monitoring of Google Search Console reporting latency, manual action penalty spikes, and Performance report discrepancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">GSC Manual Action Wave: October 2026</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Following the completion of the September 2026 Spam Update on October 8, Search Console is issuing an elevated volume of manual action notices for <strong>Scaled Content Abuse</strong> and <strong>Pure Spam</strong>. If your site experienced a sudden cliff in impressions, inspect <em>Security &amp; Manual Actions</em> inside GSC immediately.
              </p>
              <div className="rounded-lg bg-white border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Action:</strong> Audit mass programmatic directories, remove unedited AI content, and verify factual claims before submitting a reconsideration request.
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">AI Overview Click &amp; Impression Metrics</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Search Console Performance reports continue to record an impression whenever a URL appears inside a Google AI Overview card, but CTR is compressing on informational head terms. Sites cited in AI Overviews retain brand authority while zero-click queries suppress standard organic sessions.
              </p>
              <div className="rounded-lg bg-white border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Action:</strong> Filter GSC Performance by query CTR to identify high-impression, low-CTR queries being satisfied directly by Gemini answers.
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">Crawled – Currently Not Indexed Status</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Google&rsquo;s automated classifiers are aggressively routing thin AI pages to &ldquo;Crawled – currently not indexed&rdquo;. This is an algorithmic quality filter rather than a technical crawling error. Pages lacking original data or unique analysis are deprioritized during render passes.
              </p>
              <div className="rounded-lg bg-white border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Action:</strong> Consolidate thin URLs into bidirectional topical clusters and provide first-party proof to satisfy E-E-A-T thresholds.
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#534AB7]" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">Search Console Data Freshness &amp; Latency</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Google Search Console reporting latency currently operates within normal parameters (data delay of approximately 12–24 hours). The URL Inspection API remains stable for real-time live tests and index status verification across production URLs.
              </p>
              <div className="rounded-lg bg-white border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Status:</strong> Normal operations. Last verified across SearchPrex client telemetry October 11, 2026.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (GEO & RICH SNIPPET PARITY) ── */}
      <section className="py-16 bg-[#f8f9fc] border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#0a0f2e]">
              Frequently Asked Questions: SEO &amp; Algorithm News
            </h2>
            <p className="mt-2 text-sm text-[#64748b]">
              Clear answers on recent algorithm rollouts, Search Console manual actions, and Google AI Overviews.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 transition-all [&_summary::-webkit-details-marker]:hidden" open>
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                What is the latest SEO news in the past 2 days?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Over the past 48 hours, Google officially concluded its September 2026 Spam Update after an extensive 14-day global rollout. The completion triggered an immediate surge in Google Search Console manual actions targeting scaled AI content, alongside new Search Central guidance enforcing element-level human review for metadata and structured data.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                What is the latest Google Search Console news and updates?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Recent Google Search Console developments include widespread manual action notifications for &ldquo;Scaled Content Abuse&rdquo; and &ldquo;Pure Spam&rdquo;, ongoing calibration of AI Overview click-through metrics in Performance reports, and enhanced URL Inspection data reflecting Google&rsquo;s tighter spam classification thresholds.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                Did Google roll out an algorithm update recently?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Yes. Google launched the September 2026 Spam Update on September 24, which concluded on October 8, 2026. This follows the August 2026 Spam Update, marking two major global spam overhauls in under six weeks.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                How do I check if my website received a Google Search Console manual action?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Log into Google Search Console, navigate to the &ldquo;Security &amp; Manual Actions&rdquo; section in the left sidebar, and click &ldquo;Manual Actions&rdquo;. If your property is impacted, Google will display the specific policy violation (such as Scaled Content Abuse or Pure Spam) and the affected URL paths.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ── REAL-TIME ALGORITHM RADAR & INTELLIGENCE DISPATCH ── */}
      <section className="relative overflow-hidden bg-[#070b1e] text-white py-20 lg:py-24 border-t border-[#1e293b]">
        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#534AB7]/25 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Main Dispatch Container */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 backdrop-blur-xl shadow-2xl shadow-indigo-950/50">
            {/* Top Multi-Color Accent Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-[#534AB7] to-cyan-400" />

            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-4 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Live SERP Radar &amp; Algorithm Feed
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
                Stay Ahead of the Next Google Rollout.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When Google deploys a core update, penalizes content patterns, or shifts AI Overview citations, we dispatch plain-English impact analyses and fix checklists before your traffic drops.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-center">
                <p className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">⚡ 0-Day Rollouts</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Spam &amp; Core update rollout tracking with zero delay.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-center">
                <p className="text-xs font-extrabold text-indigo-300 uppercase tracking-wide">🛡️ GSC Penalty Alerts</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Manual action waves &amp; index compression triage.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-center">
                <p className="text-xs font-extrabold text-cyan-300 uppercase tracking-wide">🤖 AI Overview Shifts</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">Gemini citation changes &amp; zero-click SERP protection.</p>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="max-w-xl mx-auto">
              {newsletterSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-emerald-500/15 border border-emerald-400/40 p-6 text-white text-center"
                >
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-extrabold text-lg text-white">
                    {newsletterAlreadySubscribed
                      ? "You're already on our active alert list!"
                      : "You're subscribed to SearchPrex Algorithm Alerts!"}
                  </p>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    We&apos;ll dispatch an instant breakdown directly to your inbox whenever Google initiates or concludes a confirmed update.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubscribe} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-md focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all">
                    <div className="flex items-center flex-1 px-3">
                      <Mail className="h-4 w-4 text-slate-400 mr-2.5 flex-shrink-0" />
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (newsletterError) setNewsletterError(null);
                        }}
                        placeholder="Enter your work email address..."
                        aria-label="Email for algorithm updates"
                        className="w-full bg-transparent text-white placeholder-slate-400 text-sm font-medium outline-none py-3"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingNewsletter}
                      className="bg-gradient-to-r from-emerald-500 to-[#1a7d59] hover:from-emerald-400 hover:to-emerald-600 disabled:opacity-60 text-white font-extrabold px-7 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                    >
                      {submittingNewsletter ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Algorithm Alerts</span> <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {newsletterError && (
                    <p className="text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                      {newsletterError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 px-2 mt-1">
                    <span>🔒 100% Free · No spam ever · 1-click unsubscribe</span>
                    <span>Curated by Senior SEO Analyst Mubashar Sharif</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Consultation Bridge (Clean single line, no repetitive form) */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-400">
              Dealing with an active traffic drop or Google Search Console manual action?{" "}
              <a
                href={CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-emerald-400 underline decoration-slate-600 hover:decoration-emerald-400 transition-colors inline-flex items-center gap-1"
              >
                Book a 30-min algorithm recovery session <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
 