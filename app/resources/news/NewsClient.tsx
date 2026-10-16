"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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
  Share2,
  Copy,
  Check,
  Heart,
  MessageSquare,
  Flame,
  SlidersHorizontal,
  Clock,
  Filter,
  RotateCcw,
  ArrowUp,
  Pin,
  Send,
} from "lucide-react";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import NewsCommentModal from "@/components/news/NewsCommentModal";
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

/* ─── SEMRUSH-INSPIRED FILTER & SORT DEFINITIONS ─── */
const CATEGORY_TABS = [
  { id: "all", label: "All News" },
  { id: "core", label: "Core Updates" },
  { id: "spam", label: "Spam Updates" },
  { id: "ai", label: "AI Search & GEO" },
  { id: "gsc", label: "Search Console" },
  { id: "local", label: "Local SEO" },
  { id: "technical", label: "Technical SEO" },
  { id: "ecommerce", label: "Ecommerce" },
];

const DATE_OPTIONS = [
  { id: "all", label: "All Time" },
  { id: "48h", label: "Past 48 Hours" },
  { id: "7d", label: "Past 7 Days" },
  { id: "30d", label: "Past 30 Days" },
  { id: "custom", label: "Custom Range" },
];

const SORT_OPTIONS = [
  { id: "latest", label: "Most Recent" },
  { id: "trending", label: "Most Trending" },
  { id: "oldest", label: "Oldest First" },
];

/** Stable slug used for likes/comments on external (non-spoke) news items. */
const newsSlug = (title: string) =>
  (title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50);

function matchesCategory(categoryStr: string, filterId: string): boolean {
  if (!filterId || filterId === "all") return true;
  const c = (categoryStr || "").toLowerCase();
  switch (filterId) {
    case "core":
      return c.includes("core") || c.includes("algorithm");
    case "spam":
      return c.includes("spam") || c.includes("manual action");
    case "ai":
      return (
        c.includes("ai") ||
        c.includes("llm") ||
        c.includes("geo") ||
        c.includes("sge") ||
        c.includes("overviews") ||
        c.includes("discover")
      );
    case "gsc":
      return c.includes("search console") || c.includes("gsc") || c.includes("tool") || c.includes("indexing");
    case "local":
      return c.includes("local") || c.includes("maps") || c.includes("business profile") || c.includes("gbp");
    case "technical":
      return c.includes("technical") || c.includes("crawl") || c.includes("vitals") || c.includes("schema") || c.includes("pdf");
    case "ecommerce":
      return c.includes("ecommerce") || c.includes("merchant") || c.includes("checkout") || c.includes("shopping");
    default:
      return true;
  }
}

function matchesDateFilter(
  dateVal: string | Date,
  filterId: string,
  customFrom?: string,
  customTo?: string
): boolean {
  if (!filterId || filterId === "all") return true;
  const d = new Date(dateVal);
  if (Number.isNaN(d.getTime())) return true;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const DAY = 24 * 60 * 60 * 1000;

  switch (filterId) {
    case "48h":
      return diffMs <= 2 * DAY;
    case "7d":
      return diffMs <= 7 * DAY;
    case "30d":
      return diffMs <= 30 * DAY;
    case "custom": {
      if (customFrom) {
        const from = new Date(`${customFrom}T00:00:00Z`);
        if (!Number.isNaN(from.getTime()) && d < from) return false;
      }
      if (customTo) {
        const to = new Date(`${customTo}T23:59:59Z`);
        if (!Number.isNaN(to.getTime()) && d > to) return false;
      }
      return true;
    }
    default:
      return true;
  }
}

/* ─── BRAND ICONS FOR SOCIAL MEDIA SHARING ─── */
function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function RedditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.609a1.24 1.24 0 0 1 1.108-.693zM8.617 10.774c-.907 0-1.644.737-1.644 1.644 0 .907.737 1.644 1.644 1.644.907 0 1.644-.737 1.644-1.644 0-.907-.737-1.644-1.644-1.644zm6.766 0c-.907 0-1.644.737-1.644 1.644 0 .907.737 1.644 1.644 1.644.907 0 1.644-.737 1.644-1.644 0-.907-.737-1.644-1.644-1.644zm-5.114 4.316a.417.417 0 0 0-.11.586c.62.91 1.572 1.24 2.84 1.24 1.27 0 2.22-.33 2.84-1.24a.417.417 0 0 0-.698-.46c-.456.67-1.196.883-2.142.883-.946 0-1.686-.213-2.142-.883a.417.417 0 0 0-.588-.126z" />
    </svg>
  );
}

function QuoraIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 0C5.373 0 0 5.373 0 12s5.373 12 12.001 12c2.404 0 4.636-.713 6.516-1.933l1.838 1.838a1.002 1.002 0 0 0 1.417-1.417l-1.838-1.838A11.935 11.935 0 0 0 24 12c0-6.627-5.373-12-11.999-12zm0 21.818c-5.422 0-9.818-4.396-9.818-9.818S6.579 2.182 12.001 2.182 21.82 6.578 21.82 12c0 2.138-.687 4.117-1.852 5.728l-2.455-2.455a4.727 4.727 0 1 0-1.545 1.545l2.455 2.455a9.764 9.764 0 0 1-6.422 2.545zm0-12.364a2.545 2.545 0 1 0 0 5.091 2.545 2.545 0 0 0 0-5.091z" />
    </svg>
  );
}

function MediumIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

/* ─── 8 TOPIC GUIDES (PILLAR PAGES) ─── */
const TOPIC_GUIDES = [
  {
    slug: "local-seo-updates",
    title: "Local SEO News 2026: What Confirmed Updates Mean for the Map Pack",
    category: "Local SEO",
    tagColor: "#c2410c",
    badge: "Pinned Pillar",
    updatedDate: "Oct 2, 2026",
    description: "A dated, sourced log of local search changes — GBP suggested edits, the September spam update, review sign-in, and what each means for map pack rankings.",
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

  // Semrush-Inspired Interactive Filter & Sorting States
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (!category) return "all";
    const c = category.toLowerCase();
    if (c.includes("ai") || c.includes("llm")) return "ai";
    if (c.includes("tool") || c.includes("console")) return "gsc";
    if (c.includes("ecom")) return "ecommerce";
    if (c.includes("tech")) return "technical";
    if (c.includes("local")) return "local";
    if (c.includes("spam")) return "spam";
    if (c.includes("core") || c.includes("algo")) return "core";
    return "all";
  });
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("latest");
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [trackerType, setTrackerType] = useState<"All" | "Core" | "Spam">("All");

  // Scroll-driven UI (reading progress, share strap, back-to-top)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStrap, setShowStrap] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
      setShowStrap(h.scrollTop > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset pagination whenever filters change
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedCategory, selectedDateFilter, selectedSort, customFrom, customTo, searchQuery]);

  // Reader feedback form
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    industry: "",
    lookingFor: "",
    likes: "",
    website: "",
  });
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus("sending");
    setFeedbackError(null);
    try {
      const res = await fetch("/api/news/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...feedback, page: "/resources/news" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFeedbackError(data.error || "Something went wrong. Please try again.");
        setFeedbackStatus("error");
        return;
      }
      setFeedbackStatus("sent");
    } catch {
      setFeedbackError("Network error. Please try again.");
      setFeedbackStatus("error");
    }
  };

  // Social Share & Toast States
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const showToast = (message: string) => {
    setShareToast(message);
    setTimeout(() => {
      setShareToast(null);
    }, 3500);
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "https://www.searchprex.com/resources/news";
  };

  const shareTitle = "SEO News Today: Google Updates, Dated and Sourced";
  const shareText = "Real-time Google algorithm radar, GSC manual action alerts, and verified SEO updates from SearchPrex.";

  const handleShare = (platform: string, customUrl?: string, customTitle?: string) => {
    const url = customUrl || getShareUrl();
    const title = customTitle || shareTitle;
    const text = shareText;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer,width=600,height=600"
        );
        showToast("Opening LinkedIn share...");
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer,width=600,height=500"
        );
        showToast("Opening Facebook share...");
        break;
      case "x":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + " — " + text)}`,
          "_blank",
          "noopener,noreferrer,width=600,height=400"
        );
        showToast("Opening X (Twitter) share...");
        break;
      case "instagram":
        navigator.clipboard.writeText(url);
        window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
        showToast("Link copied to clipboard! Ready to paste into Instagram Story or Bio.");
        break;
      case "reddit":
        window.open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer,width=700,height=600"
        );
        showToast("Opening Reddit share...");
        break;
      case "quora":
        window.open(
          `https://www.quora.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer,width=650,height=550"
        );
        showToast("Opening Quora share...");
        break;
      case "medium":
        navigator.clipboard.writeText(`${title}\n\n${text}\n\nRead the full update: ${url}`);
        window.open("https://medium.com/new-story", "_blank", "noopener,noreferrer");
        showToast("Link & formatted summary copied! Ready to paste into Medium story.");
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
        showToast("URL copied to clipboard!");
        break;
      default:
        break;
    }
  };

  // ── News Interactions State (Likes & Comments) ──
  // Starts empty: every number rendered comes from real stored reactions (no seeded/demo counts).
  const [clientId, setClientId] = useState("");
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [userLikesMap, setUserLikesMap] = useState<Record<string, boolean>>({});
  const [commentsCountMap, setCommentsCountMap] = useState<Record<string, number>>({});
  const [likePulse, setLikePulse] = useState<string | null>(null);

  const [commentModalData, setCommentModalData] = useState<{
    isOpen: boolean;
    slug: string;
    title: string;
    category?: string;
  }>({
    isOpen: false,
    slug: "",
    title: "",
    category: "",
  });

  useEffect(() => {
    let cid = "";
    try {
      cid = localStorage.getItem("sp_news_client_id") || "";
      if (!cid) {
        cid = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem("sp_news_client_id", cid);
      }
      setClientId(cid);
    } catch {}

    const batchSlugs = Array.from(
      new Set([
        "google-september-2026-spam-update",
        ...PILLAR_SLUGS,
        ...initialSpokes.map((s: any) => s.slug).filter(Boolean),
        ...initialNews.map((n: any) => newsSlug(n.title)).filter(Boolean),
      ])
    );

    fetch("/api/news/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "batch", slugs: batchSlugs, clientId: cid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.batch) {
          const newLikes: Record<string, number> = {};
          const newUserLikes: Record<string, boolean> = {};
          const newComments: Record<string, number> = {};
          for (const [slug, item] of Object.entries<any>(data.batch)) {
            newLikes[slug] = item.likes;
            newUserLikes[slug] = item.userLiked;
            newComments[slug] = item.commentsCount;
          }
          setLikesMap((prev) => ({ ...prev, ...newLikes }));
          setUserLikesMap((prev) => ({ ...prev, ...newUserLikes }));
          setCommentsCountMap((prev) => ({ ...prev, ...newComments }));
        }
      })
      .catch((e) => console.warn("Interactions batch fetch failed:", e));
  }, []);

  const handleToggleLike = async (slug: string) => {
    const isLiked = Boolean(userLikesMap[slug]);
    const nextLiked = !isLiked;
    setUserLikesMap((prev) => ({ ...prev, [slug]: nextLiked }));
    setLikesMap((prev) => ({
      ...prev,
      [slug]: nextLiked ? (prev[slug] || 0) + 1 : Math.max(0, (prev[slug] || 1) - 1),
    }));

    if (nextLiked) {
      setLikePulse(slug);
      setTimeout(() => setLikePulse((p) => (p === slug ? null : p)), 600);
      showToast("Thanks — your like was recorded.");
    }

    try {
      const res = await fetch("/api/news/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", slug, clientId }),
      });
      const data = await res.json();
      if (data.ok) {
        setLikesMap((prev) => ({ ...prev, [slug]: data.likes }));
        setUserLikesMap((prev) => ({ ...prev, [slug]: data.userLiked }));
      }
    } catch (e) {
      console.warn("Like error:", e);
    }
  };

  const handleOpenComments = (slug: string, title: string, category?: string) => {
    setCommentModalData({
      isOpen: true,
      slug,
      title,
      category,
    });
  };

  const handleCommentAdded = (slug: string, newCount: number) => {
    setCommentsCountMap((prev) => ({ ...prev, [slug]: newCount }));
  };

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

    // ── Base feed (unfiltered): deep-dive spokes + dated news items ──
  // Like/comment numbers come only from real stored reactions (default 0, never seeded).
  const SPOKE_SOURCES_MAP: Record<string, Array<{ label: string; href: string }>> = {
    "google-gemini-4-argon-ai-mode-rollout": [
      { label: "seroundtable", href: "https://www.seroundtable.com/" },
    ],
    "how-google-ranks-pdfs-search-ai-mode-checklist": [
      { label: "searchenginejournal", href: "https://www.searchenginejournal.com/" },
    ],
    "google-discover-proactive-concierge-dive-deeper-ai-test": [
      { label: "searchengineland", href: "https://searchengineland.com/" },
      { label: "envisionitagency", href: "https://envisionitagency.com/" },
    ],
  };

  const allFeedItems = useMemo(() => {
    const newsByTitle = new Map<string, any>();
    for (const n of news) {
      if (n.title) newsByTitle.set(String(n.title).trim().toLowerCase(), n);
    }

    const spokeItems = nonPillarSpokes.map((s: any) => {
      const slug = s.slug;
      const rawDate = s.publishedAt || s.createdAt || "2026-10-01";
      const likes = likesMap[slug] ?? 0;
      const comments = commentsCountMap[slug] ?? 0;
      const matchedNews = newsByTitle.get(String(s.title || "").trim().toLowerCase());
      const externalSources =
        SPOKE_SOURCES_MAP[slug] ||
        (matchedNews?.sourceHref && matchedNews.sourceHref !== "#"
          ? [{ label: matchedNews.sourceLabel || "Source", href: matchedNews.sourceHref }]
          : []);

      return {
        id: `spoke-${slug}`,
        isSpoke: true,
        slug,
        title: s.title as string,
        summary: (s.excerpt || s.metaDescription || "Read the full analysis and what it means for your rankings.") as string,
        date: formatDate(rawDate),
        rawDate,
        category: shortCategory(s.category),
        href: `/resources/news/${slug}`,
        sourceLabel: "Analysis",
        coverImage: (s.coverImage || "") as string,
        externalSources,
        likes,
        comments,
        engagement: likes + comments * 3,
      };
    });

    const feedItems = news.map((n: any) => {
      const slug = newsSlug(n.title);
      const likes = likesMap[slug] ?? 0;
      const comments = commentsCountMap[slug] ?? 0;
      return {
        id: `feed-${n.id || slug}`,
        isSpoke: false,
        slug,
        title: n.title as string,
        summary: (n.summary || "") as string,
        date: n.date,
        rawDate: n.rawDate,
        category: (n.tag || "SEO News") as string,
        href: n.sourceHref as string,
        sourceLabel: (n.sourceLabel || "Primary Source") as string,
        coverImage: "" as string,
        externalSources:
          n.sourceHref && n.sourceHref !== "#"
            ? [{ label: (n.sourceLabel || "Source") as string, href: n.sourceHref as string }]
            : [],
        likes,
        comments,
        engagement: likes + comments * 3,
      };
    });

    //  A story with its own analysis article appeared twice — the analysis and
    //  the source item. Keep the analysis; it links its sources.
    const spokeTitles = new Set(spokeItems.map((i: any) => String(i.title).trim().toLowerCase()));
    return [...spokeItems, ...feedItems.filter((i: any) => !spokeTitles.has(String(i.title).trim().toLowerCase()))];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSpokes, initialNews, likesMap, commentsCountMap]);

  const timeOf = (d: any) => {
    const t = new Date(d).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  // Filtered + sorted feed
  const unifiedFeed = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result = allFeedItems.filter(
      (item) =>
        (!q ||
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)) &&
        matchesCategory(item.category, selectedCategory) &&
        matchesDateFilter(item.rawDate, selectedDateFilter, customFrom, customTo)
    );

    const now = Date.now();
    // Trending = real engagement (likes + 3×comments) decayed by age; ties fall back to recency.
    const trend = (i: (typeof result)[number]) =>
      i.engagement / Math.pow(Math.max(0, now - timeOf(i.rawDate)) / 86400000 + 2, 0.8);

    result.sort((a, b) => {
      if (selectedSort === "trending") {
        const diff = trend(b) - trend(a);
        if (diff !== 0) return diff;
        return timeOf(b.rawDate) - timeOf(a.rawDate);
      }
      if (selectedSort === "oldest") return timeOf(a.rawDate) - timeOf(b.rawDate);
      return timeOf(b.rawDate) - timeOf(a.rawDate);
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFeedItems, searchQuery, selectedCategory, selectedDateFilter, selectedSort, customFrom, customTo]);

  // Dynamic counts for each category filter pill
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allFeedItems.length };
    for (const tab of CATEGORY_TABS) {
      if (tab.id === "all") continue;
      counts[tab.id] = allFeedItems.filter((i) => matchesCategory(i.category, tab.id)).length;
    }
    return counts;
  }, [allFeedItems]);

  const recentItems = useMemo(
    () => [...allFeedItems].sort((a, b) => timeOf(b.rawDate) - timeOf(a.rawDate)).slice(0, 5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allFeedItems]
  );
  const popularItems = useMemo(
    () => allFeedItems.filter((i) => i.engagement > 0).sort((a, b) => b.engagement - a.engagement).slice(0, 5),
    [allFeedItems]
  );
  //  Category pages (?category=Local, or a tab click) show that category in
  //  every section, not only the feed. The algorithm tracker, the Search
  //  Console tracker and all topic guides used to repeat on every category.
  const categoryItems = useMemo(
    () =>
      allFeedItems
        .filter((i) => matchesCategory(i.category, selectedCategory))
        .sort((a, b) => timeOf(b.rawDate) - timeOf(a.rawDate)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allFeedItems, selectedCategory]
  );
  const categoryLabel = CATEGORY_TABS.find((t) => t.id === selectedCategory)?.label ?? "All News";
  const showAlgorithmContext = selectedCategory === "all" || selectedCategory === "core" || selectedCategory === "spam";
  const showGscContext = selectedCategory === "all" || selectedCategory === "gsc";
  const guidesForCategory =
    selectedCategory === "all" ? TOPIC_GUIDES : TOPIC_GUIDES.filter((g) => matchesCategory(g.category, selectedCategory));
  const latestDateLabel = categoryItems[0] ? formatDate(categoryItems[0].rawDate) : "—";

  const isFiltered = Boolean(
    searchQuery.trim() ||
      selectedCategory !== "all" ||
      selectedDateFilter !== "all" ||
      selectedSort !== "latest"
  );

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDateFilter("all");
    setSelectedSort("latest");
    setCustomFrom("");
    setCustomTo("");
  };

  const isoDay = (d: Date) => d.toISOString().slice(0, 10);
  const applyPreset = (preset: "14d" | "month" | "ytd") => {
    const now = new Date();
    if (preset === "14d") {
      const from = new Date(now.getTime() - 14 * 86400000);
      setCustomFrom(isoDay(from));
    } else if (preset === "month") {
      setCustomFrom(isoDay(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))));
    } else {
      setCustomFrom(isoDay(new Date(Date.UTC(now.getUTCFullYear(), 0, 1))));
    }
    setCustomTo(isoDay(now));
  };

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const hasRecent48Hours = categoryItems.some((i) => new Date(i.rawDate) >= twoDaysAgo);

  // ── Algorithm tracker (type filter + duration bars) ──
  const trackerRows = useMemo(() => {
    const rows = ALGORITHM_UPDATES_TRACKER.map((r) => {
      const s = new Date(`${r.started} UTC`).getTime();
      const c = new Date(`${r.completed} UTC`).getTime();
      const days = Number.isNaN(s) || Number.isNaN(c) ? 1 : Math.max(1, Math.round((c - s) / 86400000));
      return { ...r, days };
    });
    return trackerType === "All" ? rows : rows.filter((r) => r.type === trackerType);
  }, [trackerType]);
  const maxTrackerDays = Math.max(...ALGORITHM_UPDATES_TRACKER.map((r) => {
    const s = new Date(`${r.started} UTC`).getTime();
    const c = new Date(`${r.completed} UTC`).getTime();
    return Number.isNaN(s) || Number.isNaN(c) ? 1 : Math.max(1, Math.round((c - s) / 86400000));
  }));

  // ── Per-card share menu ──
  const [openShareId, setOpenShareId] = useState<string | null>(null);
  useEffect(() => {
    if (!openShareId) return;
    const close = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest("[data-share-menu]")) setOpenShareId(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openShareId]);

  const SHARE_ITEMS = [
    { id: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
    { id: "x", label: "X (Twitter)", Icon: XIcon },
    { id: "facebook", label: "Facebook", Icon: FacebookIcon },
    { id: "reddit", label: "Reddit", Icon: RedditIcon },
    { id: "quora", label: "Quora", Icon: QuoraIcon },
    { id: "medium", label: "Medium", Icon: MediumIcon },
    { id: "instagram", label: "Instagram", Icon: InstagramIcon },
  ];

  const absoluteUrl = (href: string) =>
    href.startsWith("http") ? href : `https://www.searchprex.com${href}`;

  /* Reusable reactions (like + comment) — render helper, not a component, to avoid remounts */
  const renderReactions = (slug: string, title: string, cat?: string) => {
    const liked = Boolean(userLikesMap[slug]);
    const likes = likesMap[slug] ?? 0;
    const comments = commentsCountMap[slug] ?? 0;
    return (
      <>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => handleToggleLike(slug)}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
          className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors cursor-pointer ${
            liked
              ? "border-rose-200 bg-rose-50 text-rose-600"
              : "border-[#e2e5eb] bg-white text-[#424754] hover:border-[#c5cad3] hover:text-[#171a22]"
          }`}
        >
          <motion.span
            className="inline-flex"
            animate={likePulse === slug ? { scale: [1, 1.45, 1] } : { scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
          </motion.span>
          <span className="tabular-nums">{likes > 0 ? likes : "Like"}</span>
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => handleOpenComments(slug, title, cat)}
          aria-label="Comments"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e5eb] bg-white px-2.5 text-xs font-medium text-[#424754] transition-colors hover:border-[#c5cad3] hover:text-[#171a22] cursor-pointer"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span className="tabular-nums">{comments > 0 ? comments : "Comment"}</span>
        </motion.button>
      </>
    );
  };

  const renderShareMenu = (id: string, url: string, title: string) => (
    <div className="relative" data-share-menu>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpenShareId(openShareId === id ? null : id)}
        aria-expanded={openShareId === id}
        aria-label="Share"
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e5eb] bg-white px-2.5 text-xs font-medium text-[#424754] transition-colors hover:border-[#c5cad3] hover:text-[#171a22] cursor-pointer"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Share</span>
      </motion.button>
      <AnimatePresence>
        {openShareId === id && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full z-30 mb-2 w-48 rounded-xl border border-[#e2e5eb] bg-white p-1.5 shadow-[0_12px_32px_rgba(23,26,34,0.12)]"
          >
            {SHARE_ITEMS.map(({ id: pid, label, Icon }) => (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  handleShare(pid, url, title);
                  setOpenShareId(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-[#303440] transition-colors hover:bg-[#f4f5f8] cursor-pointer"
              >
                <Icon className="h-3.5 w-3.5 text-[#6c727f]" />
                {label}
              </button>
            ))}
            <div className="my-1 h-px bg-[#f0f2f5]" />
            <button
              type="button"
              onClick={() => {
                handleShare("copy", url, title);
                setOpenShareId(null);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-[#303440] transition-colors hover:bg-[#f4f5f8] cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-[#6c727f]" />
              Copy link
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const inputCls =
    "w-full h-10 rounded-lg border border-[#d5d9e0] bg-white px-3 text-sm text-[#171a22] placeholder-[#9aa0a6] outline-none transition focus:border-[#171a22] focus:ring-2 focus:ring-[#171a22]/10";

  const FAQS = [
    {
      q: "What is the latest SEO news in the past 2 days?",
      a: "In the past 48 hours (October 15, 2026), Google rolled out Gemini 4 Argon globally in AI Mode for Google AI Pro and Ultra subscribers, clarified how PDFs are indexed and ranked across Web Search and AI Mode, and began testing a 'Dive deeper' AI feature in Google Discover as job postings point toward a 'proactive concierge' experience. Earlier on October 8, Google also completed its 14-day September 2026 Spam Update.",
    },
    {
      q: "What is the latest Google Search Console news and updates?",
      a: "Recent Search Console changes covered on this page: Web search type is now split into text-based and multimodal, AI Overviews reporting has been expanded, generative AI reports show impressions only (no clicks), and Platform properties are now open to everyone. Each change links to its original source in the news list below.",
    },
    {
      q: "Did Google roll out an algorithm update recently?",
      a: "Yes. Google launched the September 2026 Spam Update on September 24, which concluded on October 8, 2026. This follows the August 2026 Spam Update, marking two major global spam overhauls in under six weeks.",
    },
    {
      q: "How do I check if my website received a Google Search Console manual action?",
      a: "Log into Google Search Console, navigate to the “Security & Manual Actions” section in the left sidebar, and click “Manual Actions”. If your property is impacted, Google will display the specific policy violation (such as Scaled Content Abuse or Pure Spam) and the affected URL paths.",
    },
    {
      q: "Is there a Google algorithm update rolling out right now?",
      a: "No. Google is not actively rolling out a confirmed algorithm update right now. The most recent confirmed rollout was the September 2026 Spam Update, which officially concluded on October 8, 2026, after a 14-day global deployment. All updates are verified against the Google Search Status Dashboard.",
    },
  ];

  const PAST_2_DAYS_CARDS = [
    {
      icon: Sparkles,
      title: "Gemini 4 Argon in AI Mode",
      body: "Rolled out globally in AI Mode for Google AI Pro & Ultra subscribers. Deeper query fan-out reshapes AI visibility for Law Firms and eCommerce sites.",
      label: "Source",
      value: "seroundtable",
      href: "/resources/news/google-gemini-4-argon-ai-mode-rollout",
    },
    {
      icon: BookOpen,
      title: "How Google Ranks PDFs",
      body: "Google clarified how PDFs rank in Web Search & AI Mode and how to verify SEO-friendliness — critical for legal guides/forms and eCommerce catalogs.",
      label: "Source",
      value: "searchenginejournal",
      href: "/resources/news/how-google-ranks-pdfs-search-ai-mode-checklist",
    },
    {
      icon: TrendingUp,
      title: "Discover “Proactive Concierge”",
      body: "Job postings signal Google Discover evolving from a feed into a personal concierge alongside live tests of the “Dive deeper” AI feature.",
      label: "Sources",
      value: "SEL · Envisionit",
      href: "/resources/news/google-discover-proactive-concierge-dive-deeper-ai-test",
    },
  ];

  const GSC_ISSUES = [
    {
      title: "GSC Manual Action Wave: October 2026",
      body: (
        <>
          Following the completion of the September 2026 Spam Update on October 8, Search Console is issuing an elevated volume of manual action notices for <strong>Scaled Content Abuse</strong> and <strong>Pure Spam</strong>. If your site experienced a sudden cliff in impressions, inspect <em>Security &amp; Manual Actions</em> inside GSC immediately.
        </>
      ),
      noteLabel: "Action",
      note: "Audit mass programmatic directories, remove unedited AI content, and verify factual claims before submitting a reconsideration request.",
      status: "Elevated",
    },
    {
      title: "AI Overview Click & Impression Metrics",
      body: (
        <>
          Search Console Performance reports continue to record an impression whenever a URL appears inside a Google AI Overview card, but CTR is compressing on informational head terms. Sites cited in AI Overviews retain brand authority while zero-click queries suppress standard organic sessions.
        </>
      ),
      noteLabel: "Action",
      note: "Filter GSC Performance by query CTR to identify high-impression, low-CTR queries being satisfied directly by Gemini answers.",
      status: "Monitoring",
    },
    {
      title: "Crawled - Currently Not Indexed Status",
      body: (
        <>
          Google&rsquo;s automated classifiers are aggressively routing thin AI pages to &ldquo;Crawled – currently not indexed&rdquo;. This is an algorithmic quality filter rather than a technical crawling error. Pages lacking original data or unique analysis are deprioritized during render passes.
        </>
      ),
      noteLabel: "Action",
      note: "Consolidate thin URLs into bidirectional topical clusters and provide first-party proof to satisfy E-E-A-T thresholds.",
      status: "Observed",
    },
    {
      title: "Search Console Data Freshness & Latency",
      body: (
        <>
          Google Search Console reporting latency currently operates within normal parameters (data delay of approximately 12–24 hours). The URL Inspection API remains stable for real-time live tests and index status verification across production URLs.
        </>
      ),
      noteLabel: "Status",
      note: "Normal operations. Last verified across SearchPrex client telemetry October 11, 2026.",
      status: "Normal",
    },
  ];

  return (
    <main className="relative bg-white text-[#171a22]">
      {/* ── READING PROGRESS BAR ── */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]" aria-hidden="true">
        <div
          className="h-full w-full origin-left bg-[#534AB7] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            role="status"
            className="fixed bottom-20 right-4 left-4 z-[60] flex items-center gap-2.5 rounded-xl bg-[#171a22] px-4 py-3 text-xs font-medium text-white shadow-2xl sm:left-auto lg:bottom-6 lg:right-6 sm:text-sm"
          >
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
            <span>{shareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VERTICAL SHARE STRAP (DESKTOP) ── */}
      <div className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <aside
          aria-label="Share this page"
          className="flex flex-col items-center gap-1 rounded-r-2xl bg-[#2f3337] px-1.5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        >
          <span className="mb-1.5 select-none text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9ba1aa] [writing-mode:vertical-rl] rotate-180">
            Share this page
          </span>
          {SHARE_ITEMS.map(({ id, label, Icon }) => (
            <motion.button
              key={id}
              type="button"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare(id)}
              aria-label={`Share on ${label}`}
              className="group relative grid h-9 w-9 place-items-center rounded-lg text-[#c9ccd1] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#2f3337] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </motion.button>
          ))}
          <div className="my-1 h-px w-6 bg-white/15" />
          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShare("copy")}
            aria-label="Copy page link"
            className="group relative grid h-9 w-9 place-items-center rounded-lg text-[#c9ccd1] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#2f3337] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {copiedLink ? "Copied!" : "Copy link"}
            </span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group relative grid h-9 w-9 place-items-center rounded-lg text-[#c9ccd1] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#2f3337] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Back to top
            </span>
          </motion.button>
        </aside>
      </div>

      {/* ── SHARE STRAP (MOBILE, BOTTOM) ── */}
      <AnimatePresence>
        {showStrap && (
          <motion.div
            key="share-strap-mobile"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-1 bg-[#2f3337] px-3 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.2)] lg:hidden"
            aria-label="Share this page"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9ba1aa]">Share</span>
            {SHARE_ITEMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleShare(id)}
                aria-label={`Share on ${label}`}
                className="grid h-8 w-8 place-items-center rounded-lg text-[#c9ccd1] active:bg-white/10"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleShare("copy")}
              aria-label="Copy page link"
              className="grid h-8 w-8 place-items-center rounded-lg text-[#c9ccd1] active:bg-white/10"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative overflow-visible border-b border-[#e2e5eb] bg-white pt-24 pb-12">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6c727f] transition-colors hover:text-[#171a22]"
          >
            ← Back to Resources
          </Link>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#171a22] sm:text-5xl">
            {heading ?? "SEO News Today: Google Updates, Dated and Sourced"}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#6c727f] sm:text-lg">
            {intro ??
              "Plain-English breakdowns of Google algorithm changes, core updates, and AI-search shifts that actually affect your rankings — curated, dated, and verified."}
          </p>

          {/* ── INSTANT SEARCH ── */}
          <div ref={searchContainerRef} className="relative mx-auto mt-8 mb-4 max-w-2xl">
            <div
              className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                isSearchFocused
                  ? "border-[#171a22] ring-4 ring-[#171a22]/[0.06] shadow-lg"
                  : "border-[#d5d9e0] shadow-sm hover:border-[#b7bcc6]"
              }`}
            >
              <div className="pl-4 pr-2 text-[#6c727f]">
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
                className="flex-1 bg-transparent py-3.5 pr-3 text-sm font-medium text-[#171a22] placeholder-[#9aa0a6] outline-none sm:text-base"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchFocused(false);
                    searchInputRef.current?.focus();
                  }}
                  className="mr-2 flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold text-[#6c727f] transition-colors hover:bg-[#f4f5f8] hover:text-[#171a22]"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>

            <AnimatePresence>
              {searchQuery.trim().length > 0 && isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#e2e5eb] bg-white text-left shadow-[0_20px_48px_rgba(23,26,34,0.14)]"
                >
                  <div className="flex items-center justify-between border-b border-[#f0f2f5] bg-[#f7f8fa] px-4 py-2.5 text-xs text-[#6c727f]">
                    <span>
                      {filteredSpokes.length + filteredNews.length} results for{" "}
                      <strong className="text-[#171a22]">&ldquo;{searchQuery}&rdquo;</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                      className="text-xs font-semibold text-[#171a22] hover:underline"
                    >
                      Clear
                    </button>
                  </div>

                  {filteredSpokes.length === 0 && filteredNews.length === 0 ? (
                    <div className="p-6 text-sm text-[#565c69]">
                      <p className="mb-1 font-semibold text-[#171a22]">
                        No updates match &ldquo;{searchQuery}&rdquo;.
                      </p>
                      <p className="text-xs text-[#6c727f]">
                        Try &ldquo;Spam Update&rdquo;, &ldquo;Core Update&rdquo; or &ldquo;Search Console&rdquo;.
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-[420px] divide-y divide-[#f0f2f5] overflow-y-auto">
                      {filteredSpokes.map((spoke: any) => (
                        <Link
                          key={spoke.slug}
                          href={`/resources/news/${spoke.slug}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="group block p-4 transition-colors hover:bg-[#f7f8fa]"
                        >
                          <div className="mb-1 flex items-center gap-2 text-[11px] text-[#6c727f]">
                            <span className="rounded border border-[#e2e5eb] bg-[#f4f5f8] px-1.5 py-0.5 font-medium text-[#303440]">
                              {shortCategory(spoke.category)}
                            </span>
                            <span>{formatDate(spoke.publishedAt || spoke.createdAt)}</span>
                          </div>
                          <p className="text-[15px] font-semibold leading-snug text-[#171a22] group-hover:underline">
                            {spoke.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6c727f]">
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
                          className="group block p-4 transition-colors hover:bg-[#f7f8fa]"
                        >
                          <div className="mb-1 flex items-center gap-2 text-[11px] text-[#6c727f]">
                            <span className="rounded border border-[#e2e5eb] bg-[#f4f5f8] px-1.5 py-0.5 font-medium text-[#303440]">
                              {item.tag}
                            </span>
                            <span>{item.date}</span>
                            <span className="ml-auto inline-flex items-center gap-1">
                              {item.sourceLabel} <ExternalLink className="h-2.5 w-2.5" />
                            </span>
                          </div>
                          <p className="text-[15px] font-semibold leading-snug text-[#171a22] group-hover:underline">
                            {item.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6c727f]">{item.summary}</p>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick topic chips */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5">
              <span className="mr-1 text-[11px] font-medium text-[#9aa0a6]">Popular searches:</span>
              {QUICK_NEWS_TOPICS.map((topic) => {
                const active = searchQuery.toLowerCase() === topic.toLowerCase();
                return (
                  <motion.button
                    key={topic}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const next = active ? "" : topic;
                      setSearchQuery(next);
                      if (next) setIsSearchFocused(true);
                    }}
                    className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-[#171a22] text-white"
                        : "border border-[#e2e5eb] bg-white text-[#424754] hover:border-[#b7bcc6] hover:text-[#171a22]"
                    }`}
                  >
                    {topic}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Real, derived stats (no invented numbers) */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 overflow-hidden rounded-xl border border-[#e2e5eb] sm:grid-cols-4">
            {[
              {
                value: <CountUp value={categoryItems.length} />,
                label: selectedCategory === "all" ? "Updates tracked" : `${categoryLabel} updates`,
              },
              showAlgorithmContext
                ? { value: <CountUp value={ALGORITHM_UPDATES_TRACKER.length} />, label: "Confirmed updates in 2026" }
                : { value: <CountUp value={categoryItems.filter((i) => i.isSpoke).length} />, label: "Analyses" },
              { value: <CountUp value={guidesForCategory.length} />, label: "Topic guides" },
              { value: latestDateLabel, label: "Last update logged" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`bg-white px-4 py-4 text-left ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""} border-[#e2e5eb]`}
              >
                <p className="text-xl font-bold tabular-nums text-[#171a22]">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-[#6c727f]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO NEWS PAST 2 DAYS ── */}
      <section className="border-b border-[#e2e5eb] bg-[#f7f8fa] py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-2xl border border-[#e2e5eb] bg-white p-6 sm:p-8"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f2f5] pb-4">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-[#424754]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {hasRecent48Hours ? "Activity in the past 48 hours" : "No new rollout in 48 hours · latest from the past 7 days"}
              </span>
              <div className="flex items-center gap-2 text-xs text-[#6c727f]">
                <ShieldCheck className="h-4 w-4 text-[#6c727f]" />
                <span>Updated {latestDateLabel}</span>
                <span className="text-[#d5d9e0]">•</span>
                <a
                  href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#171a22] underline decoration-[#d5d9e0] underline-offset-2 hover:decoration-[#171a22]"
                >
                  Verified by Mubashar Sharif
                </a>
              </div>
            </div>

            <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#171a22] sm:text-3xl">
              {selectedCategory === "all" ? "SEO News Past 2 Days" : `Latest ${categoryLabel} News`}
            </h2>
            <p className="mb-7 max-w-3xl text-base leading-relaxed text-[#424754]">
              {showAlgorithmContext
                ? "Google rolled out Gemini 4 Argon globally in AI Mode for AI Pro & Ultra subscribers, clarified how PDFs rank in Search & AI Mode, and began testing 'Dive deeper' in Discover alongside its completed September 2026 Spam Update."
                : `The latest ${categoryLabel} entries, newest first — each dated and linked to its source or analysis.`}
            </p>

            {showAlgorithmContext && (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              {PAST_2_DAYS_CARDS.map((c: any) => (
                <motion.div
                  key={c.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="flex flex-col rounded-xl border border-[#e2e5eb] bg-white p-5 transition-shadow hover:border-[#c5cad3] hover:shadow-[0_8px_24px_rgba(23,26,34,0.06)]"
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] text-[#303440]">
                      <c.icon className="h-4 w-4" />
                    </span>
                    {c.href ? (
                      <Link href={c.href} className="text-sm font-semibold text-[#171a22] hover:text-[#534AB7] hover:underline">
                        {c.title}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-[#171a22]">{c.title}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[#565c69]">{c.body}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-[#f0f2f5] pt-3 text-[11px]">
                    <span className="font-medium text-[#6c727f]">{c.label}</span>
                    <span className="rounded-md border border-[#e2e5eb] bg-[#f4f5f8] px-2 py-0.5 font-semibold text-[#303440]">{c.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            )}

            {/* Latest dated entries (dynamic) */}
            {categoryItems.length > 0 && (
              <div className="mb-7 rounded-xl border border-[#e2e5eb]">
                <p className="border-b border-[#f0f2f5] px-4 py-2.5 text-xs font-semibold text-[#424754]">Most recent entries</p>
                <ul className="divide-y divide-[#f0f2f5]">
                  {categoryItems.slice(0, showAlgorithmContext ? 3 : 6).map((item) => (
                    <li key={item.id}>
                      {item.isSpoke ? (
                        <Link href={item.href} className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f7f8fa]">
                          <span className="w-24 flex-shrink-0 text-xs tabular-nums text-[#6c727f]">{item.date}</span>
                          <span className="flex-1 text-sm font-medium text-[#171a22] group-hover:underline">{item.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-[#9aa0a6] transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ) : (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f7f8fa]">
                          <span className="w-24 flex-shrink-0 text-xs tabular-nums text-[#6c727f]">{item.date}</span>
                          <span className="flex-1 text-sm font-medium text-[#171a22] group-hover:underline">{item.title}</span>
                          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[#9aa0a6]" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showAlgorithmContext && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0f2f5] pt-5">
              <Link
                href="/resources/news/google-september-2026-spam-update"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#171a22] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#303440]"
              >
                Read the September 2026 spam update analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs text-[#6c727f]">
                  Sources:{" "}
                  <a href="https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu" target="_blank" rel="noopener noreferrer" className="font-medium text-[#303440] underline decoration-[#d5d9e0] underline-offset-2 hover:decoration-[#171a22]">
                    Google Search Status
                  </a>{" "}
                  &amp;{" "}
                  <a href="https://searchengineland.com/google-september-2026-spam-update-completed" target="_blank" rel="noopener noreferrer" className="font-medium text-[#303440] underline decoration-[#d5d9e0] underline-offset-2 hover:decoration-[#171a22]">
                    Search Engine Land
                  </a>
                </span>
                {renderReactions(
                  "google-september-2026-spam-update",
                  "Google September 2026 Spam Update Concludes: 14-Day Rollout Triggers Manual Actions",
                  "Spam Update"
                )}
                {renderShareMenu(
                  "past-2-days",
                  "https://www.searchprex.com/resources/news/google-september-2026-spam-update",
                  "Google September 2026 Spam Update Concludes"
                )}
              </div>
            </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── LATEST SEO NEWS (FEED + NEWSLETTER SIDEBAR) ── */}
      <section id="latest-seo-news" className="scroll-mt-24 border-b border-[#e2e5eb] bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#171a22] sm:text-3xl">Latest SEO News</h2>
            <p className="mt-1.5 text-sm text-[#6c727f]">
              Chronological updates, analyses, and confirmed announcements from Google Search Central and industry sources.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* MAIN COLUMN */}
            <div>
              {/* Filter toolbar */}
              <div className="mb-5 rounded-xl border border-[#e2e5eb] bg-white p-4">
                <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-none">
                  {CATEGORY_TABS.map((cat) => {
                    const count = categoryCounts[cat.id] ?? 0;
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          isActive ? "text-white" : "border border-[#e2e5eb] bg-white text-[#424754] hover:border-[#b7bcc6] hover:text-[#171a22]"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-cat-pill"
                            className="absolute inset-0 rounded-full bg-[#171a22]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{cat.label}</span>
                        <span className={`relative rounded-full px-1.5 text-[10px] font-semibold tabular-nums ${isActive ? "bg-white/20 text-white" : "bg-[#f0f2f5] text-[#6c727f]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="my-3 h-px bg-[#f0f2f5]" />

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 font-medium text-[#6c727f]">
                      <Calendar className="h-3.5 w-3.5" /> Date
                    </span>
                    <div className="inline-flex flex-wrap rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-0.5">
                      {DATE_OPTIONS.map((df) => (
                        <button
                          key={df.id}
                          type="button"
                          onClick={() => setSelectedDateFilter(df.id)}
                          className={`rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer ${
                            selectedDateFilter === df.id
                              ? "bg-white font-semibold text-[#171a22] shadow-[0_1px_2px_rgba(23,26,34,0.08)]"
                              : "font-medium text-[#6c727f] hover:text-[#171a22]"
                          }`}
                        >
                          {df.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 font-medium text-[#6c727f]">
                      <SlidersHorizontal className="h-3.5 w-3.5" /> Sort
                    </span>
                    <div className="inline-flex rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-0.5">
                      {[
                        { id: "latest", label: "Most Recent / Latest", Icon: Clock },
                        { id: "trending", label: "Most Trending", Icon: Flame },
                        { id: "oldest", label: "Oldest", Icon: null },
                      ].map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setSelectedSort(id)}
                          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-all cursor-pointer ${
                            selectedSort === id
                              ? "bg-white font-semibold text-[#171a22] shadow-[0_1px_2px_rgba(23,26,34,0.08)]"
                              : "font-medium text-[#6c727f] hover:text-[#171a22]"
                          }`}
                        >
                          {Icon && <Icon className="h-3 w-3" />}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Custom date range */}
                <AnimatePresence initial={false}>
                  {selectedDateFilter === "custom" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-wrap items-end gap-3 rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-3">
                        <label className="flex flex-col gap-1 text-[11px] font-medium text-[#6c727f]">
                          From
                          <input
                            type="date"
                            value={customFrom}
                            max={customTo || undefined}
                            onChange={(e) => setCustomFrom(e.target.value)}
                            className="h-9 rounded-lg border border-[#d5d9e0] bg-white px-2.5 text-xs text-[#171a22] outline-none focus:border-[#171a22]"
                          />
                        </label>
                        <label className="flex flex-col gap-1 text-[11px] font-medium text-[#6c727f]">
                          To
                          <input
                            type="date"
                            value={customTo}
                            min={customFrom || undefined}
                            onChange={(e) => setCustomTo(e.target.value)}
                            className="h-9 rounded-lg border border-[#d5d9e0] bg-white px-2.5 text-xs text-[#171a22] outline-none focus:border-[#171a22]"
                          />
                        </label>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {[
                            { id: "14d" as const, label: "Last 14 days" },
                            { id: "month" as const, label: "This month" },
                            { id: "ytd" as const, label: "Year to date" },
                          ].map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => applyPreset(p.id)}
                              className="h-9 rounded-lg border border-[#e2e5eb] bg-white px-3 text-[11px] font-medium text-[#424754] transition-colors hover:border-[#b7bcc6] hover:text-[#171a22] cursor-pointer"
                            >
                              {p.label}
                            </button>
                          ))}
                          {(customFrom || customTo) && (
                            <button
                              type="button"
                              onClick={() => {
                                setCustomFrom("");
                                setCustomTo("");
                              }}
                              className="h-9 px-2 text-[11px] font-semibold text-[#171a22] hover:underline cursor-pointer"
                            >
                              Clear dates
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f2f5] pt-2.5 text-[11px] text-[#6c727f]">
                  <div>
                    Showing <strong className="tabular-nums text-[#171a22]">{Math.min(visibleCount, unifiedFeed.length)}</strong> of{" "}
                    <strong className="tabular-nums text-[#171a22]">{unifiedFeed.length}</strong> updates
                    {selectedCategory !== "all" && (
                      <span>
                        {" "}in <strong className="text-[#171a22]">{CATEGORY_TABS.find((t) => t.id === selectedCategory)?.label}</strong>
                      </span>
                    )}
                    {selectedDateFilter === "custom" && (customFrom || customTo) && (
                      <span> ({customFrom || "start"} → {customTo || "today"})</span>
                    )}
                    {selectedDateFilter !== "all" && selectedDateFilter !== "custom" && (
                      <span> ({DATE_OPTIONS.find((d) => d.id === selectedDateFilter)?.label})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedSort === "trending" && <span>Ranked by reader likes &amp; comments, then recency</span>}
                    {isFiltered && (
                      <button type="button" onClick={resetAllFilters} className="inline-flex items-center gap-1 font-semibold text-[#171a22] hover:underline cursor-pointer">
                        <RotateCcw className="h-3 w-3" /> Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Feed */}
              {unifiedFeed.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#d5d9e0] bg-white p-10 text-center">
                  <Search className="mx-auto mb-3 h-8 w-8 text-[#9aa0a6]" />
                  <p className="text-sm font-semibold text-[#171a22]">No updates match these filters</p>
                  <p className="mt-1 mb-4 text-xs text-[#6c727f]">Try All News, a wider date range, or clear the search.</p>
                  <button type="button" onClick={resetAllFilters} className="inline-flex items-center gap-1.5 rounded-lg bg-[#171a22] px-4 py-2 text-xs font-semibold text-white hover:bg-[#303440] cursor-pointer">
                    <RotateCcw className="h-3.5 w-3.5" /> Reset all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {unifiedFeed.map((item, idx) => (
                      <div key={item.id} className={`space-y-3 ${idx >= visibleCount ? "hidden" : ""}`}>
                        <motion.article
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.22 }}
                          whileHover={{ y: -2 }}
                          className="rounded-xl border border-[#e2e5eb] bg-white p-5 transition-shadow hover:border-[#c5cad3] hover:shadow-[0_8px_24px_rgba(23,26,34,0.06)] sm:p-6"
                        >
                          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center rounded-md border border-[#e2e5eb] bg-[#f4f5f8] px-2 py-0.5 text-[11px] font-medium text-[#303440]">
                                {item.category}
                              </span>
                              {item.isSpoke && (
                                <span className="inline-flex items-center rounded-md border border-[#e2e5eb] px-2 py-0.5 text-[11px] font-medium text-[#6c727f]">
                                  Analysis
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-xs text-[#6c727f]">
                                <Calendar className="h-3 w-3" />
                                <time dateTime={new Date(item.rawDate).toISOString?.() ?? undefined}>{item.date}</time>
                              </span>
                            </div>
                            {item.externalSources && item.externalSources.length > 0 ? (
                              <div className="flex flex-wrap items-center gap-1.5">
                                {item.externalSources.map((src: { label: string; href: string }) => (
                                  <a
                                    key={src.label}
                                    href={src.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full border border-[#e2e5eb] bg-[#f7f8fa] px-2.5 py-0.5 text-[11px] font-medium text-[#424754] transition-colors hover:border-[#b7bcc6] hover:text-[#171a22]"
                                  >
                                    {src.label}
                                    <ExternalLink className="h-2.5 w-2.5 text-[#9aa0a6]" />
                                  </a>
                                ))}
                              </div>
                            ) : (
                              !item.isSpoke && <span className="text-[11px] text-[#6c727f]">{item.sourceLabel}</span>
                            )}
                          </div>

                          <div className={item.coverImage ? "flex flex-col gap-4 sm:flex-row sm:items-start" : ""}>
                            <div className="min-w-0 flex-1">
                              <h3 className="mb-2 text-lg font-semibold leading-snug text-[#171a22] sm:text-xl">
                                {item.isSpoke ? (
                                  <Link href={item.href} className="transition-colors hover:text-[#534AB7]">
                                    {item.title}
                                  </Link>
                                ) : (
                                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#534AB7]">
                                    {item.title}
                                  </a>
                                )}
                              </h3>

                              <p className="mb-4 text-sm leading-relaxed text-[#565c69]">{item.summary}</p>
                            </div>

                            {item.coverImage && (
                              <Link
                                href={item.href}
                                className="group relative block w-full flex-shrink-0 overflow-hidden rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] sm:w-44"
                              >
                                <img
                                  src={item.coverImage}
                                  alt={item.title}
                                  loading="lazy"
                                  className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-28"
                                />
                              </Link>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f0f2f5] pt-3">
                            <div className="flex flex-wrap items-center gap-3">
                              {item.isSpoke ? (
                                <Link href={item.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#171a22]">
                                  Read analysis <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                              ) : (
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#171a22]">
                                  Source: {item.sourceLabel} <ExternalLink className="h-3.5 w-3.5 text-[#6c727f]" />
                                </a>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              {renderReactions(item.slug, item.title, item.category)}
                              {renderShareMenu(item.id, absoluteUrl(item.href), item.title)}
                            </div>
                          </div>
                        </motion.article>

                        {/* ── INLINE FREE DA CHECKER CTA (IN BETWEEN NEWS) ── */}
                        {(idx === 1 || (unifiedFeed.length === 1 && idx === 0) || idx === 5) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl border border-[#d5d9e0] bg-[#f7f8fa] p-5 sm:p-6"
                          >
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                              <div className="max-w-xl">
                                <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-md border border-[#e2e5eb] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#171a22]">
                                  <ShieldCheck className="h-3.5 w-3.5 text-[#2f9670]" />
                                  Free SEO Resource · Authority Benchmark
                                </div>
                                <p className="text-base font-bold text-[#171a22] sm:text-lg">
                                  Free Domain Authority (DA) &amp; Website Authority Checker
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-[#565c69] sm:text-sm">
                                  Check your website&rsquo;s Domain Authority, backlink profile strength, and trust signals before the next Google &amp; AI Mode update. Benchmark Law Firm, eCommerce, or local domains in seconds.
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <a
                                  href="https://nicheseopro.com/authority-checker"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#171a22] px-5 py-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#303440] sm:text-sm"
                                >
                                  Check Free Domain Authority
                                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </AnimatePresence>

                  {unifiedFeed.length > visibleCount && (
                    <div className="pt-3 text-center">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setVisibleCount((c) => c + 10)}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#d5d9e0] bg-white px-5 py-2.5 text-sm font-semibold text-[#171a22] transition-colors hover:border-[#171a22] cursor-pointer"
                      >
                        Show more updates
                        <span className="text-xs font-medium text-[#6c727f]">({unifiedFeed.length - visibleCount} more)</span>
                        <ChevronDown className="h-4 w-4" />
                      </motion.button>
                    </div>
                  )}
                </div>
              )}

              <p className="mt-6 text-center text-xs text-[#9aa0a6]">
                Updated as major SEO news breaks. Summaries are verified against primary announcements.
              </p>
            </div>

            {/* SIDEBAR */}
            <aside className="order-first lg:order-none">
              <div className="space-y-5 lg:sticky lg:top-24">
                {/* Newsletter (plain white) */}
                <div className="rounded-xl border border-[#e2e5eb] bg-white p-5">
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#e2e5eb] bg-[#f7f8fa]">
                      <Mail className="h-4 w-4 text-[#303440]" />
                    </span>
                    <p className="text-sm font-semibold text-[#171a22]">Subscribe to our newsletter</p>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-[#6c727f]">
                    Confirmed Google updates and what they mean for your rankings — sent only when something actually changes.
                  </p>
                  <AnimatePresence mode="wait">
                    {newsletterSubscribed ? (
                      <motion.div
                        key="subscribed"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-2 rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-3 text-xs text-[#303440]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        <span>
                          {newsletterAlreadySubscribed ? "You're already subscribed." : "You're subscribed. We'll email you when Google confirms an update."}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.form key="nl-form" onSubmit={handleNewsletterSubscribe} className="space-y-2">
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => {
                            setNewsletterEmail(e.target.value);
                            if (newsletterError) setNewsletterError(null);
                          }}
                          placeholder="Your work email"
                          aria-label="Email address for the newsletter"
                          className={inputCls}
                        />
                        <button
                          type="submit"
                          disabled={submittingNewsletter}
                          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#171a22] text-sm font-semibold text-white transition-colors hover:bg-[#303440] disabled:opacity-60 cursor-pointer"
                        >
                          {submittingNewsletter ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Subscribing...
                            </>
                          ) : (
                            "Subscribe"
                          )}
                        </button>
                        {newsletterError && (
                          <p className="flex items-center gap-1.5 text-[11px] font-medium text-rose-600">
                            <AlertCircle className="h-3.5 w-3.5" /> {newsletterError}
                          </p>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>
                  <p className="mt-2 text-[11px] text-[#9aa0a6]">Free · No spam · Unsubscribe anytime</p>
                </div>

                {/* Free DA Checker Sidebar Resource */}
                <div className="rounded-xl border border-[#e2e5eb] bg-white p-5">
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#e2e5eb] bg-[#f7f8fa]">
                      <ShieldCheck className="h-4 w-4 text-[#2f9670]" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#171a22]">Free DA Checker</p>
                      <p className="text-[11px] text-[#6c727f]">Free SEO Tool</p>
                    </div>
                  </div>
                  <p className="mb-3.5 text-xs leading-relaxed text-[#565c69]">
                    Check your website&rsquo;s Domain Authority, backlink profile, and authority score before the next algorithm update.
                  </p>
                  <a
                    href="https://nicheseopro.com/authority-checker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#171a22] bg-white px-4 text-xs font-semibold text-[#171a22] transition-colors hover:bg-[#171a22] hover:text-white"
                  >
                    Check Website Authority Free
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Popular / recent list */}
                <div className="hidden rounded-xl border border-[#e2e5eb] bg-white lg:block">
                  <p className="border-b border-[#f0f2f5] px-4 py-3 text-sm font-semibold text-[#171a22]">
                    {popularItems.length > 0 ? "Most liked & discussed" : "Recently published"}
                  </p>
                  <ol className="divide-y divide-[#f0f2f5]">
                    {(popularItems.length > 0 ? popularItems : recentItems).map((item, i) => (
                      <li key={item.id}>
                        {item.isSpoke ? (
                          <Link href={item.href} className="group flex gap-3 px-4 py-3 transition-colors hover:bg-[#f7f8fa]">
                            <span className="w-4 flex-shrink-0 text-xs font-semibold tabular-nums text-[#9aa0a6]">{i + 1}</span>
                            <span className="min-w-0">
                              <span className="line-clamp-2 text-[13px] font-medium leading-snug text-[#171a22] group-hover:underline">{item.title}</span>
                              <span className="mt-1 block text-[11px] text-[#6c727f]">
                                {item.date}
                                {item.engagement > 0 && ` · ${item.likes} likes · ${item.comments} comments`}
                              </span>
                            </span>
                          </Link>
                        ) : (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex gap-3 px-4 py-3 transition-colors hover:bg-[#f7f8fa]">
                            <span className="w-4 flex-shrink-0 text-xs font-semibold tabular-nums text-[#9aa0a6]">{i + 1}</span>
                            <span className="min-w-0">
                              <span className="line-clamp-2 text-[13px] font-medium leading-snug text-[#171a22] group-hover:underline">{item.title}</span>
                              <span className="mt-1 block text-[11px] text-[#6c727f]">
                                {item.date}
                                {item.engagement > 0 && ` · ${item.likes} likes · ${item.comments} comments`}
                              </span>
                            </span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section className="bg-white pb-4">
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

      {/* ── GOOGLE ALGORITHM UPDATE TRACKER ── */}
      {showAlgorithmContext && (
      <section className="border-y border-[#e2e5eb] bg-[#f7f8fa] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#171a22] sm:text-3xl">Google Algorithm Update Tracker</h2>
              <p className="mt-1.5 text-sm text-[#6c727f]">
                Every confirmed core and spam update in 2026, with start and completion dates from the Google Search Status Dashboard.
              </p>
            </div>
            <div className="inline-flex rounded-lg border border-[#e2e5eb] bg-white p-0.5 text-xs">
              {(["All", "Core", "Spam"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrackerType(t)}
                  className={`relative rounded-md px-3 py-1.5 font-medium transition-colors cursor-pointer ${trackerType === t ? "text-white" : "text-[#6c727f] hover:text-[#171a22]"}`}
                >
                  {trackerType === t && (
                    <motion.span layoutId="tracker-tab" className="absolute inset-0 rounded-md bg-[#171a22]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{t === "All" ? "All updates" : `${t} updates`}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#e2e5eb] bg-white">
            <table className="w-full border-collapse text-left text-sm text-[#303440]">
              <thead className="border-b border-[#e2e5eb] bg-[#f7f8fa] text-xs font-semibold text-[#6c727f]">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Update</th>
                  <th scope="col" className="px-4 py-3.5">Type</th>
                  <th scope="col" className="px-4 py-3.5">Started</th>
                  <th scope="col" className="px-4 py-3.5">Completed</th>
                  <th scope="col" className="px-4 py-3.5">Duration</th>
                  <th scope="col" className="px-5 py-3.5">Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f2f5]">
                <AnimatePresence initial={false}>
                  {trackerRows.map((item) => (
                    <motion.tr
                      key={item.name}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="transition-colors hover:bg-[#f7f8fa]"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-[#171a22]">{item.name}</td>
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e5eb] bg-[#f4f5f8] px-2 py-0.5 text-xs font-medium text-[#303440]">
                          <span className={`h-1.5 w-1.5 rounded-full ${item.type === "Core" ? "bg-[#534AB7]" : "bg-[#6c727f]"}`} />
                          {item.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-[#565c69]">{item.started}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-[#565c69]">{item.completed}</td>
                      <td className="min-w-[220px] px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-1.5 w-20 flex-shrink-0 overflow-hidden rounded-full bg-[#f0f2f5]">
                            <motion.div
                              className="h-full rounded-full bg-[#303440]"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.max(6, (item.days / maxTrackerDays) * 100)}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                          <span className="whitespace-nowrap text-xs text-[#424754]">{item.duration}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <Link href={item.postHref} className="font-medium text-[#171a22] underline decoration-[#d5d9e0] underline-offset-2 hover:decoration-[#171a22]">
                          {item.postLabel}
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      )}

      {/* ── SEARCH CONSOLE NEWS & KNOWN ISSUES TRACKER ── */}
      {showGscContext && (
      <section className="border-b border-[#e2e5eb] bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#171a22] sm:text-3xl">Search Console News &amp; Known Issues Tracker</h2>
            <p className="mt-1.5 max-w-3xl text-sm text-[#6c727f]">
              Monitoring of Google Search Console reporting latency, manual action notices, and Performance report discrepancies.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {GSC_ISSUES.map((g) => (
              <motion.div
                key={g.title}
                variants={fadeUp}
                className="flex flex-col rounded-xl border border-[#e2e5eb] bg-white p-6 transition-shadow hover:border-[#c5cad3] hover:shadow-[0_8px_24px_rgba(23,26,34,0.06)]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug text-[#171a22]">{g.title}</h3>
                  <span className="flex-shrink-0 rounded-md border border-[#e2e5eb] bg-[#f4f5f8] px-2 py-0.5 text-[11px] font-medium text-[#424754]">
                    {g.status}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#565c69]">{g.body}</p>
                <div className="mt-auto rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-3 text-xs leading-relaxed text-[#565c69]">
                  <strong className="text-[#303440]">{g.noteLabel}:</strong> {g.note}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      )}

      {/* ── TOPIC GUIDES (PILLAR PAGES) ── */}
      {guidesForCategory.length > 0 && (
      <section id="topic-guides" className="scroll-mt-24 border-b border-[#e2e5eb] bg-[#f7f8fa] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#171a22] sm:text-3xl">Topic Guides</h2>
            <p className="mt-1.5 max-w-3xl text-sm text-[#6c727f]">
              In-depth guides on confirmed algorithm movements, AI answer engines, and search architecture — continuously updated and verified.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {guidesForCategory.map((guide, idx) => (
              <motion.div
                key={guide.slug}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="flex flex-col rounded-xl border border-[#e2e5eb] bg-white p-5 transition-shadow hover:border-[#c5cad3] hover:shadow-[0_8px_24px_rgba(23,26,34,0.06)]"
              >
                <div className="mb-3 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center rounded-md border border-[#e2e5eb] bg-[#f4f5f8] px-2 py-0.5 text-[11px] font-medium text-[#303440]">
                    {guide.category}
                  </span>
                  {idx === 0 && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-[#e2e5eb] px-2 py-0.5 text-[11px] font-medium text-[#6c727f]">
                      <Pin className="h-3 w-3" /> Pinned
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-base font-semibold leading-snug text-[#171a22]">
                  <Link href={`/resources/news/${guide.slug}`} className="transition-colors hover:text-[#534AB7]">
                    {guide.title}
                  </Link>
                </h3>
                <p className="mb-3 line-clamp-4 text-[13px] leading-relaxed text-[#565c69]">{guide.description}</p>
                <p className="mb-4 text-[11px] text-[#6c727f]">Updated {guide.updatedDate}</p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#f0f2f5] pt-3">
                  <Link href={`/resources/news/${guide.slug}`} className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[#171a22]">
                    Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <div className="flex items-center gap-1">{renderReactions(guide.slug, guide.title, guide.category)}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      )}

      {/* ── FAQ ── */}
      <section className="border-b border-[#e2e5eb] bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#171a22] sm:text-3xl">Frequently Asked Questions</h2>
          <div className="divide-y divide-[#e2e5eb] overflow-hidden rounded-xl border border-[#e2e5eb] bg-white">
            {FAQS.map((f, i) => (
              <details key={f.q} className="group [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-[#171a22] transition-colors hover:bg-[#f7f8fa]">
                  {f.q}
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-[#6c727f] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#565c69]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── READER FEEDBACK (non-heading, like a CTA) ── */}
      <section className="bg-[#f7f8fa] py-14 pb-24 lg:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-[#e2e5eb] bg-white p-6 sm:p-8"
          >
            <p className="text-xl font-bold tracking-tight text-[#171a22] sm:text-2xl">Share your feedback</p>
            <p className="mt-1.5 mb-6 text-sm text-[#6c727f]">
              Help us make this news hub more useful. Tell us who you are, what you came for, and what&rsquo;s working.
            </p>

            <AnimatePresence mode="wait">
              {feedbackStatus === "sent" ? (
                <motion.div
                  key="fb-done"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center rounded-xl border border-[#e2e5eb] bg-[#f7f8fa] px-6 py-10 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                    className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#171a22]"
                  >
                    <Check className="h-6 w-6 text-white" />
                  </motion.span>
                  <p className="text-base font-semibold text-[#171a22]">Thank you, {feedback.name.split(" ")[0] || "friend"}!</p>
                  <p className="mt-1 text-sm text-[#6c727f]">Your feedback was received. It directly shapes what we cover next.</p>
                </motion.div>
              ) : (
                <motion.form key="fb-form" onSubmit={handleFeedbackSubmit} className="space-y-4" noValidate={false}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#424754]">Name *</span>
                      <input
                        type="text"
                        required
                        minLength={2}
                        value={feedback.name}
                        onChange={(e) => setFeedback((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        autoComplete="name"
                        className={inputCls}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#424754]">Email *</span>
                      <input
                        type="email"
                        required
                        value={feedback.email}
                        onChange={(e) => setFeedback((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={inputCls}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#424754]">Industry</span>
                    <div className="relative">
                      <select
                        value={feedback.industry}
                        onChange={(e) => setFeedback((f) => ({ ...f, industry: e.target.value }))}
                        className={`${inputCls} appearance-none pr-9`}
                      >
                        <option value="">Select your industry</option>
                        <option>SEO / Marketing agency</option>
                        <option>Freelance consultant</option>
                        <option>Ecommerce</option>
                        <option>Local business</option>
                        <option>SaaS / Technology</option>
                        <option>Publishing / Media</option>
                        <option>Healthcare</option>
                        <option>Finance / Legal</option>
                        <option>Education</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c727f]" />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#424754]">What are you looking for?</span>
                    <textarea
                      rows={3}
                      value={feedback.lookingFor}
                      onChange={(e) => setFeedback((f) => ({ ...f, lookingFor: e.target.value }))}
                      placeholder="e.g. faster alerts on core updates, more local SEO coverage, GSC how-tos…"
                      className={`${inputCls} h-auto resize-y py-2.5`}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-[#424754]">What do you like about this page?</span>
                    <textarea
                      rows={3}
                      value={feedback.likes}
                      onChange={(e) => setFeedback((f) => ({ ...f, likes: e.target.value }))}
                      placeholder="e.g. the algorithm tracker table, dated sources, the filters…"
                      className={`${inputCls} h-auto resize-y py-2.5`}
                    />
                  </label>

                  {/* Honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={feedback.website}
                    onChange={(e) => setFeedback((f) => ({ ...f, website: e.target.value }))}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <AnimatePresence>
                    {feedbackError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-xs font-medium text-rose-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5" /> {feedbackError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="text-[11px] text-[#9aa0a6]">We never share your email. Used only to follow up on your feedback.</p>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      disabled={feedbackStatus === "sending"}
                      className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#171a22] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#303440] disabled:opacity-60 cursor-pointer"
                    >
                      {feedbackStatus === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send feedback <Send className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* News Comment & Discussion Modal */}
      <NewsCommentModal
        isOpen={commentModalData.isOpen}
        onClose={() => setCommentModalData((prev) => ({ ...prev, isOpen: false }))}
        slug={commentModalData.slug}
        title={commentModalData.title}
        category={commentModalData.category}
        currentLikes={likesMap[commentModalData.slug] ?? 0}
        userLiked={Boolean(userLikesMap[commentModalData.slug])}
        onToggleLike={handleToggleLike}
        onCommentAdded={handleCommentAdded}
      />
    </main>
  );
}

/* ─── Animated count-up for real, derived numbers (SSR renders the final value) ─── */
function CountUp({ value, duration = 700 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value <= 0) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

