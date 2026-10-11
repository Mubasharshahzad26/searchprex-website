"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  ArrowRight,
  Calendar,
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
  BookOpen,
  Table,
} from "lucide-react";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { CALL_HREF } from "@/lib/offer";
 
/* ─── THEME ─── */
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
 
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
  "Algorithms": "#b91c1c",
};
const tagColor = (tag: string) => TAG_COLORS[tag] || PURPLE;

const shortCategory = (category?: string) => {
  if (!category) return "SEO News";
  const parts = category.split("—");
  return (parts.length > 1 ? parts[parts.length - 1] : parts[0]).trim();
};

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const QUICK_NEWS_TOPICS = [
  "Spam Update",
  "Search Console",
  "Manual Actions",
  "AI Overviews",
  "Core Update",
  "Algorithms",
];

const PILLAR_SLUGS = [
  "local-seo-updates",
  "google-algorithm-updates",
  "state-of-seo-2026",
  "ai-sge-seo-news",
  "llm-seo-news-2026",
  "technical-seo-news-2026",
  "seo-tools-news-2026",
  "ecommerce-seo-news-2026",
];

/* ─── 8 TOPIC GUIDES (PILLAR PAGES) ─── */
const TOPIC_GUIDES = [
  {
    slug: "local-seo-updates",
    title: "Local SEO News 2026: What Confirmed Updates Mean for the Map Pack",
    category: "Local SEO",
    tagColor: "#c2410c",
    badge: "Pinned Pillar",
    updatedDate: "Oct 11, 2026",
    description: "A dated, sourced log of local search changes — GBP suggested edits, the concluded spam update, review sign-in, and what each means for map pack rankings.",
  },
  {
    slug: "google-algorithm-updates",
    title: "Google Algorithm Updates 2026: Every Confirmed Update, Dated",
    category: "Algorithm Radar",
    tagColor: "#7c3aed",
    updatedDate: "Sep 28, 2026",
    description: "Every Google algorithm update confirmed in 2026, with exact start and end dates — Discover, core, and spam updates — and what each one actually changed.",
  },
  {
    slug: "state-of-seo-2026",
    title: "The State of SEO in 2026: What Eight Months of Updates Actually Taught Us",
    category: "SEO Review",
    tagColor: "#534AB7",
    updatedDate: "Sep 18, 2026",
    description: "A grounded 2026 SEO review built on confirmed updates and Google's own announcements — what changed, what didn't, and where to put your organic effort.",
  },
  {
    slug: "ai-sge-seo-news",
    title: "AI SEO News 2026: AI Overviews at 2.5B Users and What Google Now Reports",
    category: "AI Search",
    tagColor: "#2f9670",
    updatedDate: "Sep 18, 2026",
    description: "The 2026 AI SEO record: AI Overviews at 2.5B monthly users, AI Mode at 1B, and Search Console's first generative AI reports. Dated, sourced, and actionable.",
  },
  {
    slug: "llm-seo-news-2026",
    title: "LLM SEO News 2026: Answer Engines, Citations and What Can Be Measured",
    category: "AEO / LLMs",
    tagColor: "#0284c7",
    updatedDate: "Sep 18, 2026",
    description: "How LLM answer engines changed in 2026 — Gemini 3.5 Flash in AI Mode, Search Console's AI reports, crawler control, and what AEO can honestly be measured on.",
  },
  {
    slug: "technical-seo-news-2026",
    title: "Technical SEO News 2026: FAQ Rich Results Gone, AI Crawlers, and Crawl Control",
    category: "Technical SEO",
    tagColor: "#0f766e",
    updatedDate: "Sep 18, 2026",
    description: "The 2026 technical SEO changes that matter: FAQ rich results removed, Search Console API changes, and how to control AI crawlers without losing citations.",
  },
  {
    slug: "seo-tools-news-2026",
    title: "SEO Tools News 2026: Every Search Console Change That Landed This Year",
    category: "Tools & GSC",
    tagColor: "#0369a1",
    updatedDate: "Sep 18, 2026",
    description: "The 2026 SEO tooling record: Search Console's generative AI reports, platform properties for social and video, and the FAQ report removal. Dated and sourced.",
  },
  {
    slug: "ecommerce-seo-news-2026",
    title: "Ecommerce SEO News 2026: UCP, Universal Cart and Agentic Checkout",
    category: "Ecommerce SEO",
    tagColor: "#be185d",
    updatedDate: "Sep 18, 2026",
    description: "Google's Universal Commerce Protocol, Universal Cart and agentic checkout in AI Mode — what launched in 2026, when, and what it changes for online stores.",
  },
];

/* ─── ALGORITHM UPDATE TRACKER TABLE DATA ─── */
const ALGORITHM_UPDATES_TRACKER = [
  {
    name: "September 2026 spam update",
    type: "Spam",
    typeBadge: "bg-rose-100 text-rose-800 border-rose-200",
    started: "Sep 24, 2026",
    completed: "Oct 8, 2026",
    duration: "14 days",
    postHref: "/resources/news/google-september-2026-spam-update",
    postLabel: "Concluded breakdown →",
  },
  {
    name: "August 2026 spam update",
    type: "Spam",
    typeBadge: "bg-rose-100 text-rose-800 border-rose-200",
    started: "Aug 18, 2026",
    completed: "Aug 21, 2026",
    duration: "~2 days, 16 hours",
    postHref: "/resources/news/google-algorithm-updates",
    postLabel: "Rollout log →",
  },
  {
    name: "June 2026 spam update",
    type: "Spam",
    typeBadge: "bg-rose-100 text-rose-800 border-rose-200",
    started: "Jun 24, 2026",
    completed: "Jun 28, 2026",
    duration: "Under 4 days",
    postHref: "/resources/news/google-algorithm-updates",
    postLabel: "Spam log →",
  },
  {
    name: "May 2026 core update",
    type: "Core",
    typeBadge: "bg-purple-100 text-purple-800 border-purple-200",
    started: "May 21, 2026",
    completed: "Jun 2, 2026",
    duration: "12 days",
    postHref: "/resources/news/google-algorithm-updates",
    postLabel: "Impact details →",
  },
  {
    name: "March 2026 core update",
    type: "Core",
    typeBadge: "bg-purple-100 text-purple-800 border-purple-200",
    started: "Mar 27, 2026",
    completed: "Apr 8, 2026",
    duration: "12 days, 4 hours",
    postHref: "/resources/news/google-algorithm-updates",
    postLabel: "Core review →",
  },
  {
    name: "March 2026 spam update",
    type: "Spam",
    typeBadge: "bg-rose-100 text-rose-800 border-rose-200",
    started: "Mar 24, 2026",
    completed: "Mar 25, 2026",
    duration: "~19.5 hours (fastest on record)",
    postHref: "/resources/news/google-algorithm-updates",
    postLabel: "Rollout log →",
  },
  {
    name: "Discover core update (first Discover-only)",
    type: "Core",
    typeBadge: "bg-purple-100 text-purple-800 border-purple-200",
    started: "Feb 5, 2026",
    completed: "Feb 27, 2026",
    duration: "~22 days",
    postHref: "/resources/news/google-algorithm-updates",
    postLabel: "Verified log →",
  },
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

  const leadSource = category ? `news-category:${category}` : "news-hub";
  const dbNewsFormatted = initialNews.map((n: any) => ({
    id: n.id,
    date: formatDate(n.newsDate),
    rawDate: n.newsDate,
    tag: n.tag || "SEO News",
    tagColor: tagColor(n.tag || ""),
    title: n.title,
    summary: n.summary,
    sourceLabel: n.sourceLabel || "Source",
    sourceHref: n.sourceHref || "#",
  }));
  const news = dbNewsFormatted;

  // Separate non-pillar articles so the 8 pillar Topic Guides are not duplicated in the Latest SEO News feed
  const nonPillarSpokes = initialSpokes.filter((s: any) => !PILLAR_SLUGS.includes(s.slug));

  const filteredSpokes = nonPillarSpokes.filter((spoke: any) => {
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

  // Dynamic Recent Intel (Past 2–7 Days)
  // Check if any news is from the last 48 hours; otherwise fallback gracefully to the past 7 days
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const hasRecent48Hours = initialNews.some((n: any) => new Date(n.newsDate) >= twoDaysAgo);

  return (
    <main className="bg-[#f8f9fc]">
      {/* ── HERO (GOOGLE-STYLE INSTANT LIVE SEARCH) ── */}
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
            {heading ?? "SEO News Today: Google Updates, Dated and Sourced"}
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#64748b] leading-relaxed">
            {intro ??
              "Plain-English breakdowns of Google algorithm changes, core updates, and AI-search shifts that actually affect your rankings — curated, dated, and verified."}
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
                      {filteredSpokes.map((spoke: any) => (
                        <Link
                          key={spoke.slug}
                          href={`/resources/news/${spoke.slug}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="group block p-4 hover:bg-[#f8fafd] transition-colors"
                        >
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

                          <h4 className="text-base font-bold text-[#1a0dab] group-hover:underline leading-snug">
                            {spoke.title}
                          </h4>

                          <p className="mt-1 text-xs sm:text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                            <span className="text-[#70757a] font-medium mr-1.5">
                              {formatDate(spoke.publishedAt || spoke.createdAt)} —
                            </span>
                            {spoke.excerpt || spoke.metaDescription || "Read the full analysis and what it means for your rankings."}
                          </p>
                        </Link>
                      ))}

                      {filteredNews.map((item: any) => (
                        <a
                          key={item.title}
                          href={item.sourceHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block p-4 hover:bg-[#f8fafd] transition-colors"
                        >
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

                          <h4 className="text-base font-bold text-[#1a0dab] group-hover:underline leading-snug flex items-center gap-1.5">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-xs sm:text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                            <span className="text-[#70757a] font-medium mr-1.5">{item.date} —</span>
                            {item.summary}
                          </p>
                        </a>
                      ))}
                    </div>
                  )}

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

      {/* ── SECTION 1 & 9: SEO NEWS PAST 2 DAYS (DYNAMIC & EVERGREEN H2) ── */}
      <section className="border-b border-[#e5e7eb] bg-[#f8f9fc] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#dfe3ec] bg-white shadow-xl shadow-indigo-950/5">
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
                    {hasRecent48Hours ? "LIVE ALGORITHM INTEL • PAST 48 HOURS" : "LIVE ALGORITHM RADAR • LATEST FROM PAST 7 DAYS"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748b]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Updated: October 11, 2026</span>
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

              {/* Evergreen Target H2 */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0a0f2e] leading-snug mb-3">
                SEO News Past 2 Days
              </h2>

              {/* Status Note & Direct Factual Summary */}
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                {hasRecent48Hours
                  ? "Confirmed 48-Hour Rollout Activity:"
                  : "No active rollout in the past 48 hours — showing verified updates from the past 7 days:"}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#334155] mb-8 font-normal">
                Google officially concluded its September 2026 Spam Update on October 8 after a 14-day global rollout. Recent confirmed changes also include expanded Google Search Console reporting for AI Overviews and multimodal search types, alongside Search Central guidance enforcing element-level human verification for AI metadata.
              </p>

              {/* 3 Metric Intelligence Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {/* Card 1: Spam Update Concluded */}
                <div className="group rounded-2xl border border-rose-200/80 bg-rose-50/30 hover:bg-rose-50/60 p-5 transition-all hover:shadow-md hover:border-rose-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-rose-500 rounded-l" />
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="inline-flex p-1.5 rounded-lg bg-rose-100 text-rose-700">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-extrabold tracking-wider text-rose-900 uppercase">
                      Spam Update Concluded
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    14-day global rollout completed October 8. Search Console manual action alerts observed for &ldquo;Scaled Content Abuse&rdquo; and &ldquo;Pure Spam&rdquo;.
                  </p>
                  <div className="mt-3.5 pt-2.5 border-t border-rose-100/80 flex items-center justify-between text-[11px] font-bold text-rose-700">
                    <span>Rollout Status</span>
                    <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-800">Concluded (14 Days)</span>
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
                      Search Console Split
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Search Console has divided Web search types into text-based and multimodal filtering, providing granular queries across visual and AI interfaces.
                  </p>
                  <div className="mt-3.5 pt-2.5 border-t border-indigo-100/80 flex items-center justify-between text-[11px] font-bold text-[#534AB7]">
                    <span>Reporting Mode</span>
                    <span className="rounded bg-indigo-100 px-2 py-0.5 text-[#3C3489]">Multimodal Active</span>
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
                      AI Overviews &amp; UCP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Expanded AI Overviews reporting in GSC tracks generative impressions, alongside Merchant Center Universal Commerce Protocol checkouts.
                  </p>
                  <div className="mt-3.5 pt-2.5 border-t border-emerald-100/80 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                    <span>Commerce &amp; AI</span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-800">UCP Integration</span>
                  </div>
                </div>
              </div>

              {/* Action & Source Verification Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#f1f5f9]">
                <Link
                  href="/resources/news/google-september-2026-spam-update"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#534AB7]/20 transition-all hover:bg-[#433c99] hover:gap-3 hover:shadow-lg"
                >
                  Read September 2026 Spam Update Concluded Analysis <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-xs text-[#94a3b8] flex items-center gap-1.5">
                  <span>Primary Sources:</span>
                  <a
                    href="https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu"
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

      {/* ── SECTION 3: TOPIC GUIDES (8 PILLAR PAGES AT THE TOP) ── */}
      <section className="py-16 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#534AB7]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Pillar Architecture
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0f2e]">
              Topic Guides
            </h2>
            <p className="mt-2 text-base text-[#64748b]">
              In-depth strategic guides on confirmed algorithm movements, AI answer engines, and search architecture — continuously updated and verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOPIC_GUIDES.map((guide, idx) => (
              <Link
                key={guide.slug}
                href={`/resources/news/${guide.slug}`}
                className={`group block rounded-2xl border p-6 transition-all hover:shadow-xl hover:border-[#534AB7] ${
                  idx === 0
                    ? "border-emerald-300 bg-gradient-to-br from-emerald-50/40 via-white to-white ring-2 ring-emerald-500/20 shadow-md"
                    : "border-[#e5e7eb] bg-[#f8f9fc] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: guide.tagColor }}
                    >
                      {guide.category}
                    </span>
                    {guide.badge && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-800">
                        {guide.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#64748b]">
                    Updated {guide.updatedDate}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#64748b] mb-4">
                  {guide.description}
                </p>

                <div className="inline-flex items-center gap-1.5 font-bold text-sm text-[#534AB7] group-hover:gap-2.5 transition-all">
                  <span>Explore Topic Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
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

      {/* ── SECTION 2: LATEST SEO NEWS (CHRONOLOGICAL FEED, ALL CARDS H3) ── */}
      <section className="py-16 bg-[#f8f9fc] border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0f2e]">
              Latest SEO News
            </h2>
            <p className="mt-2 text-base text-[#64748b]">
              Chronological updates, deep-dives, and confirmed announcements from Google Search Central and industry releases.
            </p>
          </div>

          {filteredSpokes.length === 0 && filteredNews.length === 0 ? (
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
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              {/* Deep-Dive Article Cards */}
              {filteredSpokes.map((spoke: any) => (
                <motion.article
                  key={spoke.slug}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-7 transition-all hover:shadow-lg hover:border-[#534AB7]"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#534AB7] text-white">
                        {shortCategory(spoke.category)}
                      </span>
                      <span className="text-xs font-semibold text-[#64748b]">
                        {formatDate(spoke.publishedAt || spoke.createdAt)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Deep-Dive
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#0a0f2e] hover:text-[#534AB7] transition-colors leading-snug">
                    <Link href={`/resources/news/${spoke.slug}`}>
                      {spoke.title}
                    </Link>
                  </h3>

                  <p className="text-sm leading-relaxed text-[#64748b] mb-4">
                    {spoke.excerpt || spoke.metaDescription || "Read the full analysis and what it means for your rankings."}
                  </p>

                  <Link
                    href={`/resources/news/${spoke.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-[#534AB7] hover:gap-2.5 transition-all"
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.article>
              ))}

              {/* Feed & Quick Updates */}
              {filteredNews.map((item: any) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-7 transition-all hover:shadow-md hover:border-[#534AB7]/40"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: `${item.tagColor}1a`, color: item.tagColor }}
                      >
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-[#94a3b8]">
                        <Calendar className="h-3 w-3" /> {item.date}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#64748b]">
                      {item.sourceLabel}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#0a0f2e] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-[#64748b]">
                    {item.summary}
                  </p>

                  <a
                    href={item.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                    style={{ color: GREEN_DARK }}
                  >
                    Primary Source: {item.sourceLabel} <ExternalLink className="h-3 w-3" />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          )}

          <p className="mt-8 text-center text-sm text-[#94a3b8]">
            Updated as major SEO news breaks. Summaries are verified against primary announcements.
          </p>
        </div>
      </section>

      {/* ── GOOGLE ALGORITHM UPDATE TRACKER TABLE (TEMPLATE IMPLEMENTATION) ── */}
      <section className="py-16 bg-white border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-700 border border-purple-200 mb-3">
              <Table className="h-3.5 w-3.5" /> Historical Record
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0f2e]">
              Google Algorithm Update Tracker
            </h2>
            <p className="mt-2 text-base text-[#64748b]">
              Every confirmed core and spam update in 2026, with verified start and completion dates from the Google Search Status Dashboard.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
            <table className="w-full text-left text-sm text-[#334155] border-collapse">
              <thead className="bg-[#f8fafd] border-b border-[#e2e8f0] text-xs uppercase tracking-wider font-extrabold text-[#475569]">
                <tr>
                  <th scope="col" className="py-4 px-5">Update</th>
                  <th scope="col" className="py-4 px-4">Type</th>
                  <th scope="col" className="py-4 px-4">Started</th>
                  <th scope="col" className="py-4 px-4">Completed</th>
                  <th scope="col" className="py-4 px-4">Duration</th>
                  <th scope="col" className="py-4 px-5">Post / Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {ALGORITHM_UPDATES_TRACKER.map((item) => (
                  <tr key={item.name} className="hover:bg-[#f8fafd] transition-colors">
                    <td className="py-3.5 px-5 font-bold text-[#0a0f2e] whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold border ${item.typeBadge}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">{item.started}</td>
                    <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap">{item.completed}</td>
                    <td className="py-3.5 px-4 text-[#475569] whitespace-nowrap font-medium">{item.duration}</td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <Link
                        href={item.postHref}
                        className="font-bold text-[#534AB7] hover:underline inline-flex items-center gap-1"
                      >
                        {item.postLabel}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SEARCH CONSOLE NEWS & KNOWN ISSUES TRACKER ── */}
      <section className="py-16 bg-[#f8f9fc] border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 border border-sky-200 mb-3">
              <Activity className="h-3.5 w-3.5" /> Search Console Intel
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0f2e]">
              Search Console News &amp; Known Issues Tracker
            </h2>
            <p className="mt-3 text-base text-[#64748b] max-w-2xl mx-auto">
              Real-time monitoring of Google Search Console reporting latency, manual action penalty spikes, and Performance report discrepancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">GSC Manual Action Wave: October 2026</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Following the completion of the September 2026 Spam Update on October 8, Search Console is issuing an elevated volume of manual action notices for <strong>Scaled Content Abuse</strong> and <strong>Pure Spam</strong>. If your site experienced a sudden cliff in impressions, inspect <em>Security &amp; Manual Actions</em> inside GSC immediately.
              </p>
              <div className="rounded-lg bg-[#f8fafd] border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Action:</strong> Audit mass programmatic directories, remove unedited AI content, and verify factual claims before submitting a reconsideration request.
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">AI Overview Click &amp; Impression Metrics</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Search Console Performance reports continue to record an impression whenever a URL appears inside a Google AI Overview card, but CTR is compressing on informational head terms. Sites cited in AI Overviews retain brand authority while zero-click queries suppress standard organic sessions.
              </p>
              <div className="rounded-lg bg-[#f8fafd] border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Action:</strong> Filter GSC Performance by query CTR to identify high-impression, low-CTR queries being satisfied directly by Gemini answers.
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">Crawled - Currently Not Indexed Status</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Google&rsquo;s automated classifiers are aggressively routing thin AI pages to &ldquo;Crawled – currently not indexed&rdquo;. This is an algorithmic quality filter rather than a technical crawling error. Pages lacking original data or unique analysis are deprioritized during render passes.
              </p>
              <div className="rounded-lg bg-[#f8fafd] border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Action:</strong> Consolidate thin URLs into bidirectional topical clusters and provide first-party proof to satisfy E-E-A-T thresholds.
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#534AB7]" />
                <h3 className="font-bold text-[#0a0f2e] text-lg">Search Console Data Freshness &amp; Latency</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#475569] mb-4">
                Google Search Console reporting latency currently operates within normal parameters (data delay of approximately 12–24 hours). The URL Inspection API remains stable for real-time live tests and index status verification across production URLs.
              </p>
              <div className="rounded-lg bg-[#f8fafd] border border-[#e2e8f0] p-3 text-xs text-[#64748b]">
                <strong>Status:</strong> Normal operations. Last verified across SearchPrex client telemetry October 11, 2026.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION (GEO & RICH SNIPPET PARITY) ── */}
      <section className="py-16 bg-white border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0f2e]">
              Frequently Asked Questions: SEO &amp; Algorithm News
            </h2>
            <p className="mt-2 text-sm text-[#64748b]">
              Clear answers on recent algorithm rollouts, Search Console manual actions, and Google AI Overviews.
            </p>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-[#e2e8f0] bg-[#f8fafd] p-5 transition-all [&_summary::-webkit-details-marker]:hidden" open>
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                What is the latest SEO news in the past 2 days?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Over the past few days, Google completed its September 2026 Spam Update following a 14-day global rollout that concluded on October 8. Recent Search Console updates also expanded reporting for AI Overviews and multimodal search types, alongside new Search Central guidance highlighting element-level fact checking for AI-assisted metadata.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-[#f8fafd] p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                What is the latest Google Search Console news and updates?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Recent Search Console changes covered on this page: Web search type is now split into text-based and multimodal, AI Overviews reporting has been expanded, generative AI reports show impressions only (no clicks), and Platform properties are now open to everyone. Each change links to its original source in the news list below.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-[#f8fafd] p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                Did Google roll out an algorithm update recently?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Yes. Google launched the September 2026 Spam Update on September 24, which concluded on October 8, 2026. This follows the August 2026 Spam Update, marking two major global spam overhauls in under six weeks.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-[#f8fafd] p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                How do I check if my website received a Google Search Console manual action?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                Log into Google Search Console, navigate to the &ldquo;Security &amp; Manual Actions&rdquo; section in the left sidebar, and click &ldquo;Manual Actions&rdquo;. If your property is impacted, Google will display the specific policy violation (such as Scaled Content Abuse or Pure Spam) and the affected URL paths.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#e2e8f0] bg-[#f8fafd] p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-base">
                Is there a Google algorithm update rolling out right now?
                <ChevronDown className="h-5 w-5 text-[#64748b] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                No. Google is not actively rolling out a confirmed algorithm update right now. The most recent confirmed rollout was the September 2026 Spam Update, which officially concluded on October 8, 2026, after a 14-day global deployment. All updates are verified against the Google Search Status Dashboard.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: REAL-TIME ALGORITHM RADAR & INTELLIGENCE DISPATCH (NON-HEADING CTA) ── */}
      <section className="relative overflow-hidden bg-[#070b1e] text-white py-20 lg:py-24 border-t border-[#1e293b]">
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
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 backdrop-blur-xl shadow-2xl shadow-indigo-950/50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-[#534AB7] to-cyan-400" />

            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-4 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Live SERP Radar &amp; Algorithm Feed
              </div>

              {/* Converted from H2 to non-heading paragraph for clean heading hierarchy */}
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
                Stay Ahead of the Next Google Rollout.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When Google deploys a core update, penalizes content patterns, or shifts AI Overview citations, we dispatch plain-English impact analyses and fix checklists before your traffic drops.
              </p>
            </div>

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