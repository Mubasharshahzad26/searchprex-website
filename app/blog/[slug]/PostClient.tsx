"use client";

// app/blog/[slug]/PostClient.tsx
// Presentation only. The post is resolved server-side in page.tsx, which also
// owns metadata and JSON-LD.

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, ChevronRight, ArrowRight,
  CheckCircle, CheckCircle2, Share2, Copy, Check, Linkedin, TrendingUp, Mail, Loader2,
  Heart, MessageSquare, ArrowUp, Send, AlertCircle, Globe,
} from "lucide-react";
import { useState, useEffect } from "react";
import parse, { Element } from 'html-react-parser';
import { getRelated } from "./posts";
import { renderArticle, extractArticleToc } from "@/lib/render-article";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ArticleExitOffer from "@/components/ArticleExitOffer";
import NewsDiscussionSection from "@/components/news/NewsDiscussionSection";
import { localSeoNewsUpdates } from "@/components/news/LocalSeoNewsTimeline";
import LocalSeoNewsActions from "@/components/news/LocalSeoNewsActions";
import LocalSeoResearchNote from "@/components/news/LocalSeoResearchNote";
import LocalSeoNewsExplorer from "@/components/news/LocalSeoNewsExplorer";
import type { LocalSeoNewsPost } from "@/components/news/LocalSeoNewsPosts";

/* ─── BRAND ICONS FOR SOCIAL MEDIA SHARING STRAP ─── */
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

const SHARE_ITEMS = [
  { id: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { id: "x", label: "X (Twitter)", Icon: XIcon },
  { id: "facebook", label: "Facebook", Icon: FacebookIcon },
  { id: "reddit", label: "Reddit", Icon: RedditIcon },
  { id: "quora", label: "Quora", Icon: QuoraIcon },
  { id: "medium", label: "Medium", Icon: MediumIcon },
  { id: "instagram", label: "Instagram", Icon: InstagramIcon },
];

/**
 * Which section of the site the post belongs to. This component is shared by
 * /blog and /resources/news; it used to hardcode "/blog" everywhere, so news
 * articles showed a "Blog" breadcrumb and their share and copy-link buttons
 * handed out /blog/<slug> URLs that 404.
 */
export type PostSection = { label: string; href: string };

const H2_BOUNDARY = /\n(?=## )|(?=<h2[\s>])/;

function injectMidContentSlot(markdown: string): string {
  const sections = markdown.split(H2_BOUNDARY);
  if (sections.length < 4) return markdown;

  const mid = Math.ceil(sections.length / 2);
  const slot = '<div id="__lead_magnet_slot__"></div>';
  return `${sections.slice(0, mid).join("\n")}\n\n${slot}\n\n${sections.slice(mid).join("\n")}`;
}

const BLOG_SECTION: PostSection = { label: "Blog", href: "/blog" };

function formatPostDate(value: string): string {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
  if (!iso) return value;

  const parsed = new Date(`${value.trim()}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getArticleTelemetry(category: string = "", slug: string = "") {
  const c = category.toLowerCase();
  const s = slug.toLowerCase();

  if (c.includes("ecommerce") || c.includes("e-commerce") || s.includes("shopify") || s.includes("woo") || s.includes("faceted")) {
    return {
      eyebrow: "Confirmed 2026 Ecommerce Search Telemetry",
      title: "Shopify OS 3.0 Canonical Liquid Directives & Duplicate Product URL Mitigation",
      newsHref: "/resources/news/shopify-os-3-canonical-liquid-directives-duplicate-url-fix",
      newsLabel: "📰 Read Shopify Liquid Audit →",
      solutionsLabel: "🛠️ View Indexing Playbook →",
      themeBg: "bg-indigo-50/75 border-indigo-200 text-indigo-950",
      pillBg: "bg-indigo-600 text-white",
      btnBorder: "border-indigo-300 text-indigo-950 hover:border-indigo-500",
      btnSolid: "bg-indigo-950 text-white hover:bg-neutral-900",
    };
  }

  if (c.includes("law") || c.includes("legal") || s.includes("lawyer") || s.includes("cases")) {
    return {
      eyebrow: "Confirmed 2026 Legal Search Telemetry",
      title: "Google Business Profile Virtual Office Suspension Enforcement & State Bar Entity Verification",
      newsHref: "/resources/news/google-business-profile-law-firm-virtual-office-enforcement-2026",
      newsLabel: "📰 Read Legal Enforcement News →",
      solutionsLabel: "🛠️ View Reinstatement Playbook →",
      themeBg: "bg-amber-50/75 border-amber-200 text-amber-950",
      pillBg: "bg-amber-600 text-white",
      btnBorder: "border-amber-300 text-amber-950 hover:border-amber-500",
      btnSolid: "bg-amber-950 text-white hover:bg-neutral-900",
    };
  }

  if (c.includes("local") || s.includes("google-business-profile") || s.includes("maps")) {
    return {
      eyebrow: "Confirmed 2026 Local Search Telemetry",
      title: "US Regional Local Pack Proximity Volatility & Geo-Coordinate Clustering",
      newsHref: "/resources/news/us-regional-seo-map-pack-proximity-compression-metro-volatility",
      newsLabel: "📰 Read Proximity Volatility Study →",
      solutionsLabel: "🛠️ View Local Playbook →",
      themeBg: "bg-emerald-50/75 border-emerald-200 text-emerald-950",
      pillBg: "bg-emerald-600 text-white",
      btnBorder: "border-emerald-300 text-emerald-950 hover:border-emerald-500",
      btnSolid: "bg-emerald-950 text-white hover:bg-neutral-900",
    };
  }

  return {
    eyebrow: "Confirmed 2026 AI Search & Technical Telemetry",
    title: "GEO Entity Density & AI Mode: How ChatGPT Search & Google AI Overviews Extract Citations",
    newsHref: "/resources/news/geo-entity-density-ai-mode-chatgpt-search-citation-factors",
    newsLabel: "📰 Read AI Citation Study →",
    solutionsLabel: "🛠️ Browse Solutions Library →",
    themeBg: "bg-cyan-50/75 border-cyan-200 text-cyan-950",
    pillBg: "bg-cyan-600 text-white",
    btnBorder: "border-cyan-300 text-cyan-950 hover:border-cyan-500",
    btnSolid: "bg-cyan-950 text-white hover:bg-neutral-900",
  };
}

export type ArticlePost = {
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  heroImage: string;
  author: { name: string; role: string; bio?: string; linkedIn?: string };
  authorQuote?: string;
  tags?: string[];
  toc?: string[];
  stat?: { value: string; label: string } | null;
};

export default function PostClient({
  post,
  section = BLOG_SECTION,
  related: relatedOverride,
  localNewsPosts,
  promo,
}: {
  post: ArticlePost;
  section?: PostSection;
  /** Server-supplied siblings. Falls back to the file-based blog posts. */
  related?: Array<Record<string, any>>;
  localNewsPosts?: LocalSeoNewsPost[];
  /** Optional time-limited offer shown at the top of the article (e.g. the Halloween card on local SEO news). */
  promo?: React.ReactNode;
}) {
  const tags = post.tags ?? [];
  const toc =
    post.toc && post.toc.length > 0 ? post.toc : extractArticleToc(post.content);
  const displayDate = formatPostDate(post.date);
  const related: Array<Record<string, any>> =
    relatedOverride ?? getRelated(post.slug, post.category);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showStrap, setShowStrap] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [localSeoHeaderHeight, setLocalSeoHeaderHeight] = useState(128);

  // Like state (synced with /api/news/interactions)
  const [clientId, setClientId] = useState("");
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [likePulse, setLikePulse] = useState(false);

  // Reader feedback state ("What do you want to hear from us?")
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    profession: "",
    feedbackText: "",
    website: "",
  });
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // Sidebar newsletter state
  const [subEmail, setSubEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);

  const showToast = (message: string) => {
    setShareToast(message);
    setTimeout(() => {
      setShareToast(null);
    }, 3500);
  };

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadingProgress(0);
      } else {
        setReadingProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
      setShowStrap(scrollTop > 320);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Load initial likes for this post
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

    fetch(`/api/news/interactions?slug=${encodeURIComponent(post.slug)}&clientId=${encodeURIComponent(cid)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setLikes(data.likes || 0);
          setUserLiked(Boolean(data.userLiked));
        }
      })
      .catch(() => {});
  }, [post.slug]);

  const postUrl = `https://www.searchprex.com${section.href}/${post.slug}`;
  const leadSource = `article:${section.href}/${post.slug}`;
  const isMubasharAuthor = post.author.name.toLowerCase().includes("mubashar");
  const isLocalUpdates = post.slug === "local-seo-updates";
  const isLocalNewsSpoke = section.href === "/resources/news" && !isLocalUpdates && (post.category || "").toLowerCase().includes("local");

  useEffect(() => {
    if (!isLocalUpdates) return;
    const header = document.querySelector<HTMLElement>('header[data-local-seo-news-header="true"]');
    if (!header) return;

    const updateHeaderHeight = () => setLocalSeoHeaderHeight(header.getBoundingClientRect().height);
    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, [isLocalUpdates]);

  const dynamicCta = (() => {
    const rawTitle = post.title || "this SEO update";
    const shortTitle =
      rawTitle.length > 68 ? `${rawTitle.slice(0, 65).trim()}...` : rawTitle;
    const cat = (post.category || "SEO").trim();
    const hay = `${rawTitle} ${cat} ${post.slug}`.toLowerCase();

    if (post.slug === "mubashar-sharif-ecommerce-indexing-recovery") {
      return {
        bannerCopy: {
          eyebrow: "FREE WOOCOMMERCE INDEXING TRIAGE",
          headline: "Find the page group behind your store’s indexing problem",
          sub: "Share your store URL and the Search Console status you’re seeing. Mubashar will review a representative sample of category, brand, and product URLs, then send practical first steps within 24 hours. No indexing guarantees.",
        },
        bannerBtn: "Get My Free Indexing Triage →",
        sidebarCopy: {
          headline: "Free Ecommerce Indexing Review",
          sub: "Get a first look at excluded product URLs, page discovery, and the next checks for your WooCommerce store.",
        },
        sidebarBtn: "Review My Store →",
        bottomCopy: {
          headline: "Not sure why Google is skipping your product pages?",
          sub: "Send your store URL and email. Mubashar Sharif will review the indexing pattern and return a prioritized first-step diagnosis within 24 hours. This is a manual review, not a promise that Google will index any URL.",
        },
        bottomBtn: "Request My Free Indexing Review →",
      };
    }

    if (
      hay.includes("flying car") ||
      hay.includes("tesla") ||
      hay.includes("alef") ||
      hay.includes("trend") ||
      hay.includes("ai overview") ||
      hay.includes("ai search") ||
      hay.includes("chatgpt") ||
      hay.includes("perplexity") ||
      hay.includes("geo")
    ) {
      return {
        bannerCopy: {
          eyebrow: `LIVE AI SEARCH & TREND AUDIT · ${cat.toUpperCase()}`,
          headline: `Want Your Brand Cited in AI Overviews for Trends Like "${shortTitle}"?`,
          sub: `Enter your website URL below. I'll personally inspect your entity schema, Answer Capsules, and QDF indexing speed so Google AI Overviews, ChatGPT, and Perplexity cite your pages first — free within 24 hours.`,
        },
        bannerBtn: "Run My AI Search & Trend Audit →",
        sidebarCopy: {
          headline: `AI & Trend Teardown for Your Site`,
          sub: `See how the strategies in "${shortTitle}" can win AI Overview citations and breakout search traffic for your domain.`,
        },
        sidebarBtn: "Get Free AI Teardown →",
        bottomCopy: {
          headline: `Turn "${shortTitle}" Into Measurable Organic Traffic & Leads`,
          sub: `Don't let breakout search trends and AI Overview citations pass your business by. Share your website URL and email — Mubashar Sharif will personally send back a custom 24-hour action plan tailored to your domain.`,
        },
        bottomBtn: "Get My Custom AI & SEO Action Plan →",
      };
    }

    if (
      hay.includes("local") ||
      hay.includes("maps") ||
      hay.includes("business profile") ||
      hay.includes("gbp") ||
      hay.includes("review")
    ) {
      return {
        bannerCopy: {
          eyebrow: `LOCAL PACK & GBP IMPACT CHECK · ${cat.toUpperCase()}`,
          headline: `Did "${shortTitle}" Impact Your Google Maps & Local Pack Rankings?`,
          sub: `Send me your website URL and I'll audit your Google Business Profile, local citations, and service-area pages against this update — free, personally reviewed within 24 hours.`,
        },
        bannerBtn: "Check My Local Pack Impact →",
        sidebarCopy: {
          headline: `Free Local SEO & GBP Teardown`,
          sub: `Find out how "${shortTitle}" affects your local map pack rankings and calls.`,
        },
        sidebarBtn: "Audit My Local Presence →",
        bottomCopy: {
          headline: `Protect & Grow Your Google Maps Rankings After "${shortTitle}"`,
          sub: `Enter your website URL and email below. I'll inspect your Google Business Profile, local competitors, and city pages and send you a step-by-step fix list within 24 hours.`,
        },
        bottomBtn: "Get My Free Local SEO Audit →",
      };
    }

    if (
      hay.includes("spam") ||
      hay.includes("core update") ||
      hay.includes("algorithm") ||
      hay.includes("volatility") ||
      hay.includes("penalty") ||
      hay.includes("drop")
    ) {
      return {
        bannerCopy: {
          eyebrow: `ALGORITHM VOLATILITY DIAGNOSTIC · ${cat.toUpperCase()}`,
          headline: `Was Your Organic Traffic Affected by "${shortTitle}"?`,
          sub: `Share your domain and I'll cross-check your Search Console query drops, indexing signals, and content quality against this rollout — free within 24 hours.`,
        },
        bannerBtn: "Run Algorithm Impact Check →",
        sidebarCopy: {
          headline: `Free Update Recovery Audit`,
          sub: `Check whether "${shortTitle}" triggered ranking shifts on your key pages.`,
        },
        sidebarBtn: "Check My Rankings →",
        bottomCopy: {
          headline: `Recover & Future-Proof Your Rankings After "${shortTitle}"`,
          sub: `Send your URL and email below. I'll personally analyze how this update affected your niche and send back a prioritized recovery roadmap within 24 hours.`,
        },
        bottomBtn: "Get My Recovery Roadmap →",
      };
    }

    return {
      bannerCopy: {
        eyebrow: `CUSTOM SEO DIAGNOSTIC · ${cat.toUpperCase()}`,
        headline: `How Does "${shortTitle}" Apply to Your Website?`,
        sub: `Send me your URL and I'll check your site personally against what you just read — technical bottlenecks, competitor gaps, and whether Google's AI names you or them. Free reply within 24 hours.`,
      },
      bannerBtn: "Run This Check on My Site →",
      sidebarCopy: {
        headline: `Apply "${shortTitle}" to Your Site`,
        sub: `I'll inspect your domain myself and send back what to fix first — within 24 hours.`,
      },
      sidebarBtn: "Send My Free Teardown →",
      bottomCopy: {
        headline: `Want the Playbook From "${shortTitle}" Applied to Your Domain?`,
        sub: `Two fields, a personal teardown within 24 hours written by Mubashar Sharif — showing the exact fixes and growth opportunities on your site.`,
      },
      bottomBtn: "Get My Free Custom Teardown →",
    };
  })();

  const exitCopy = (post as { exitOffer?: { headline: string; sub: string } }).exitOffer ?? {
    headline: dynamicCta.bottomCopy.headline,
    sub: dynamicCta.bottomCopy.sub,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    showToast("URL copied to clipboard!");
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : postUrl;
    const title = post.title;
    const text = post.excerpt || post.title;

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
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
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
        navigator.clipboard.writeText(`${title}\n\n${text}\n\nRead the full article: ${url}`);
        window.open("https://medium.com/new-story", "_blank", "noopener,noreferrer");
        showToast("Link & formatted summary copied! Ready to paste into Medium story.");
        break;
      case "copy":
        copyLink();
        break;
      default:
        break;
    }
  };

  const handleToggleLike = async () => {
    const nextLiked = !userLiked;
    setUserLiked(nextLiked);
    setLikes((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    if (nextLiked) {
      setLikePulse(true);
      setTimeout(() => setLikePulse(false), 600);
      showToast("Thanks — your like was recorded.");
    }

    try {
      const res = await fetch("/api/news/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like",
          slug: post.slug,
          clientId,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setLikes(data.likes);
        setUserLiked(data.userLiked);
      }
    } catch (e) {
      console.warn("Like error:", e);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name.trim() || !feedback.email.trim() || !feedback.feedbackText.trim()) {
      setFeedbackError("Please fill in your name, email, and what you want to hear from us.");
      return;
    }
    setFeedbackStatus("sending");
    setFeedbackError(null);
    try {
      const res = await fetch("/api/news/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: feedback.name.trim(),
          email: feedback.email.trim(),
          industry: feedback.profession.trim() || "Reader",
          lookingFor: feedback.feedbackText.trim(),
          likes: "",
          website: feedback.website,
          page: `${section.href}/${post.slug}`,
        }),
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

  const handleArticleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubmitting(true);
    setSubError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subEmail.trim(),
          source: isLocalUpdates ? "local-seo-news-subscription" : leadSource,
          categories: post.category ? [post.category] : [],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setSubError(data.error || "Could not subscribe. Try again.");
      } else {
        setSubscribed(true);
        setSubEmail("");
      }
    } catch {
      setSubError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const [daDomain, setDaDomain] = useState("");
  const handleDaCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = daDomain.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    const targetUrl = clean
      ? `https://nicheseopro.com/authority-checker?domain=${encodeURIComponent(clean)}`
      : "https://nicheseopro.com/authority-checker";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full h-10 rounded-lg border border-[#d5d9e0] bg-white px-3 text-sm text-[#171a22] placeholder-[#9aa0a6] outline-none transition focus:border-[#171a22] focus:ring-2 focus:ring-[#171a22]/10";

  return (
    <main
      className="relative min-h-screen bg-white"
      style={isLocalUpdates ? { paddingTop: `${localSeoHeaderHeight}px` } : undefined}
    >
      {/* Toptal-style Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-neutral-900 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ── TOAST NOTIFICATION ── */}
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

      {/* ── VERTICAL SHARE STRAP (DESKTOP — EXACT SAME AS NEWS PAGE) ── */}
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
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[#2f3337] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {copied ? "Copied!" : "Copy link"}
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

      {/* ── SHARE STRAP (MOBILE, BOTTOM — EXACT SAME AS NEWS PAGE) ── */}
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
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO IMAGE SECTION ══ */}
      {post.slug === "local-seo-updates" ? (
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8">
            <div>
              <div className="mb-5 flex items-center gap-2 text-slate-500">
                <Link href={section.href} className="text-sm hover:text-slate-950">{section.label}</Link>
                {post.category !== section.label && <><ChevronRight className="h-3.5 w-3.5" /><span className="text-sm font-semibold text-slate-800">{post.category}</span></>}
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Local SEO news &amp; updates</p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.7rem]"
              >
                {post.title}
              </motion.h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{post.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{displayDate}</span>
                <button type="button" onClick={copyLink} className="inline-flex items-center gap-1.5 font-semibold text-slate-800 hover:text-emerald-800">
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}{copied ? "Copied" : "Share this update"}
                </button>
              </div>
            </div>
            <figure className="relative aspect-[1200/630] overflow-hidden rounded-2xl border border-slate-200 bg-[#0b102f] shadow-sm">
              <Image
                src={post.heroImage}
                alt="Coffee shop owner welcoming customers inside her storefront"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                unoptimized
              />
              <figcaption className="sr-only">SearchPrex local SEO news and Google Business Profile update tracker.</figcaption>
            </figure>
          </div>
        </section>
      ) : (
      <section className="relative h-[460px] overflow-hidden">
        {/* Full-bleed Unsplash image */}
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        {/* Deep gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
 
        {/* Content over image */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
 
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-2 text-white/60">
              <Link href={section.href} className="text-sm hover:text-white transition-colors">{section.label}</Link>
              {/* A news spoke in the plain "SEO News" category would otherwise
                  render "SEO News > SEO News". */}
              {post.category !== section.label && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-sm text-[#e2e8f0] font-semibold">{post.category}</span>
                </>
              )}
            </div>
 
            {/* Stat badge */}
            {post.stat && (
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                <TrendingUp className="h-4 w-4 text-[#e2e8f0]" />
                <span className="text-xl font-black text-[#e2e8f0]">{post.stat.value}</span>
                <span className="text-xs font-semibold text-white/70">{post.stat.label}</span>
              </div>
            )}
 
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>
 
            {/* Meta */}
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Clock className="h-4 w-4" /> {post.readTime}
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Calendar className="h-4 w-4" /> {displayDate}
              </div>
              <button
                type="button"
                onClick={handleToggleLike}
                aria-pressed={userLiked}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                  userLiked ? "text-rose-400" : "text-white/70 hover:text-white"
                }`}
              >
                <Heart className={`h-4 w-4 ${userLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{likes > 0 ? `${likes} ${likes === 1 ? "Like" : "Likes"}` : "Like"}</span>
              </button>
              <button onClick={copyLink}
                className="flex items-center gap-1.5 text-white/60 text-sm hover:text-white transition-colors cursor-pointer">
                {copied
                  ? <CheckCircle className="h-4 w-4 text-[#e2e8f0]" />
                  : <Share2 className="h-4 w-4" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </section>
      )}
 
      {/* ══ AUTHOR BAR ══ */}
      <div className="border-b border-[#e5e7eb] bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full bg-[#f1f5f9] overflow-hidden flex-shrink-0 ring-2 ring-[#171717]/20">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt={`${post.author.name} — ${post.author.role}`}
                  fill
                  sizes="44px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[#0a0a0a] text-sm">{post.author.name}</span>
                  <span className="inline-flex items-center gap-1 bg-[#f1f5f9] px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3 text-[#171717]" />
                    <span className="text-[9px] font-bold text-[#171717]">Semrush &amp; HubSpot Certified SEO Analyst</span>
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">{post.author.role} · {displayDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <motion.button
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={handleToggleLike}
                aria-pressed={userLiked}
                className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  userLiked
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-[#e5e7eb] bg-white text-[#374151] hover:border-rose-300 hover:text-rose-600"
                }`}
              >
                <motion.span
                  className="inline-flex"
                  animate={likePulse ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.45 }}
                >
                  <Heart className={`h-4 w-4 ${userLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                </motion.span>
                <span className="tabular-nums">{likes > 0 ? `${likes} ${likes === 1 ? "Like" : "Likes"}` : "Like Post"}</span>
              </motion.button>
              <a href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#0a66c2] hover:border-[#0a66c2] transition-colors">
                <Linkedin className="h-4 w-4" /> Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
 
      {/* ══ BODY — 2 col ══ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-12 items-start">
 
          {/* Article */}
          <article className="flex-1 min-w-0 max-w-full">
            {/* Excerpt pull-quote */}
            {post.slug !== "local-seo-updates" && (
              <p className="mb-8 text-xl text-[#374151] leading-relaxed font-medium border-l-4 border-[#171717] pl-6 py-1">
                {post.excerpt}
              </p>
            )}

            {promo}

            {post.slug === "local-seo-updates" && <LocalSeoNewsExplorer posts={localNewsPosts || []} updates={localSeoNewsUpdates} />}
            {post.slug === "local-seo-updates" && <LocalSeoResearchNote />}
            {post.slug === "local-seo-updates" && <LocalSeoNewsActions />}

            {isLocalUpdates && (
              <section aria-labelledby="local-domain-authority" className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">Free NicheSEO Pro tool</p>
                  <h2 id="local-domain-authority" className="mt-1 text-xl font-bold text-slate-950">Check your domain authority</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Enter a website to open the authority checker. Domain Authority is a comparative third-party metric, not a Google local ranking score.</p>
                </div>
                <form onSubmit={handleDaCheck} className="flex flex-col gap-2 sm:flex-row">
                  <label className="sr-only" htmlFor="local-da-domain">Website domain</label>
                  <input id="local-da-domain" type="text" value={daDomain} onChange={(e) => setDaDomain(e.target.value)} placeholder="yourlawfirm.com" className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15" />
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Check authority <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                </form>
              </section>
            )}

            {/* Keep the domain authority utility on general posts; local-search readers get local tools above. */}
            {post.slug !== "local-seo-updates" && (
            <form
              onSubmit={handleDaCheck}
              className="mb-8 flex items-center justify-between gap-2 rounded-full border border-slate-200 bg-white p-1.5 pl-4 shadow-[0_4px_20px_rgba(108,60,255,0.08)] transition focus-within:border-[#6c3cff] focus-within:ring-4 focus-within:ring-[#6c3cff]/10"
            >
              <div className="flex flex-1 items-center gap-2.5 min-w-0">
                <Globe className="h-5 w-5 text-slate-400 shrink-0" aria-hidden />
                <input
                  type="text"
                  value={daDomain}
                  onChange={(e) => setDaDomain(e.target.value)}
                  placeholder="gymshark.com"
                  aria-label="Enter domain to check authority"
                  className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#6c3cff] hover:bg-[#5829e0] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
              >
                <span>Check Domain Authority</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
            )}

            {/* Mobile Table of Contents (collapsible, shown on screens < lg where sidebar is hidden) */}
            {toc.length > 0 && (
              <details className="lg:hidden mb-8 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-4 group">
                <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0a0a] text-sm select-none">
                  <span className="flex items-center gap-2">
                    <span className="text-[#171717] text-xs uppercase tracking-wider font-extrabold">Table of Contents</span>
                    <span className="text-xs text-[#64748b] font-normal">({toc.length} sections)</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#64748b] transition-transform group-open:rotate-90" />
                </summary>
                <nav className="mt-3.5 flex flex-col gap-2 pt-3 border-t border-[#e5e7eb]">
                  {toc.map((item, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="flex items-start gap-2 text-xs text-[#64748b] hover:text-[#171717] py-1 transition-colors"
                    >
                      <span className="text-[#171717] font-bold text-[11px] w-4 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </a>
                  ))}
                </nav>
              </details>
            )}

            {/* Content with Image Optimization + the mid-article lead magnet slot */}
            <div className="max-w-full overflow-hidden" style={{ lineHeight: "1.85", color: "#1a1a2e" }}>
              {parse(renderArticle(isLocalUpdates ? post.content : injectMidContentSlot(post.content)), {
                replace: (domNode) => {
                  if (!isLocalUpdates && domNode instanceof Element && domNode.tagName === 'div' && domNode.attribs?.id === '__lead_magnet_slot__') {
                    return (
                      <ArticleLeadMagnet
                        variant="banner"
                        source={leadSource}
                        copy={dynamicCta.bannerCopy}
                        buttonText={dynamicCta.bannerBtn}
                      />
                    );
                  }
                  if (domNode instanceof Element && domNode.tagName === 'img') {
                    const { src, alt } = domNode.attribs;
                    const normalizedSrc = (src || "").replace(/^https?:\/\/(www\.)?searchprex\.com/i, "");
                    return (
                      <span className="my-8 block relative w-full h-auto overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f8fafc]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={normalizedSrc}
                          alt={alt || "Article visual"}
                          loading="lazy"
                          className="w-full h-auto object-cover block"
                        />
                      </span>
                    );
                  }
                }
              })}
            </div>

            {isLocalNewsSpoke && (
              <aside className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
                <p className="text-sm leading-6 text-slate-700">Following Google Business Profile, Maps, and local search changes? Browse the <Link href="/resources/news/local-seo-updates" className="font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4">Local SEO news and updates hub</Link> for sourced updates and practical checks.</p>
              </aside>
            )}
 
            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-[#e5e7eb] pt-8">
                {tags.map((t) => (
                  <span key={t} className="text-xs font-semibold bg-[#f8fafc] border border-[#e5e7eb] text-[#64748b] px-3 py-1.5 rounded-full">
                    #{t}
                  </span>
                ))}
              </div>
            )}
 
            {/* Author bio with Mubashar Sharif Photo */}
            <section aria-label={`About the author, ${post.author.name}`} className={`mt-10 flex flex-col gap-5 rounded-2xl border bg-gradient-to-br p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-7 ${post.slug === "mubashar-sharif-ecommerce-indexing-recovery" ? "border-emerald-200 from-emerald-50/80 to-white shadow-md" : "border-slate-200 from-slate-50 to-white shadow-sm"}`}>
              <div className={`relative h-24 w-24 shrink-0 rounded-full border bg-gradient-to-br from-emerald-50 to-white p-1 shadow-md sm:h-28 sm:w-28 ${post.slug === "mubashar-sharif-ecommerce-indexing-recovery" ? "border-emerald-700/30 ring-4 ring-emerald-700/10 sm:h-32 sm:w-32" : "border-emerald-800/20"}`}>
                <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-slate-200">
                  <Image
                    src="/images/mubashar-sharif.jpg"
                    alt={`${post.author.name}, ${post.author.role} at SearchPrex`}
                    fill
                    sizes="(max-width: 639px) 96px, 112px"
                    className="scale-[1.08] object-cover object-[center_18%]"
                  />
                </div>
                <span title="Author profile" className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-800/15">
                  <CheckCircle className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">Written &amp; reviewed by</span>
                    <p className="text-lg font-black leading-tight text-slate-950 sm:text-xl">{post.author.name}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{post.author.role} at SearchPrex</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/experts" className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 transition-colors hover:border-slate-500">
                      Founder profile
                    </Link>
                    {(post.author.linkedIn || isMubasharAuthor) && (
                      <a href={post.author.linkedIn || "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a66c2]/10 px-3 py-1.5 text-xs font-bold text-[#0a66c2] transition-colors hover:bg-[#0a66c2]/20">
                        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
                {isMubasharAuthor && <div className="mb-3 flex flex-wrap gap-1.5">
                  {["5+ years hands-on SEO", "Semrush certified", "HubSpot certified", "20+ clients"].map((credential) => (
                    <span key={credential} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">{credential}</span>
                  ))}
                </div>}
                {isMubasharAuthor ? (
                  <p className="max-w-3xl text-sm leading-6 text-slate-600">
                    Mubashar leads SearchPrex’s founder-led SEO work for law firms, local businesses and ecommerce brands. He combines technical audits, Search Console data and local market research to build practical search strategies, with more than five years of hands-on experience across 20+ clients.
                  </p>
                ) : post.author.bio ? (
                  <p className="max-w-3xl text-sm leading-6 text-slate-600">{post.author.bio}</p>
                ) : null}
                {post.authorQuote ? (
                  <blockquote className="mt-5 rounded-xl border-l-4 border-emerald-700 bg-emerald-50/70 px-5 py-4 text-sm leading-6 text-slate-800 sm:text-base">
                    <p className="font-semibold">“{post.authorQuote}”</p>
                    <cite className="mt-2 block text-xs font-bold not-italic text-emerald-900">— {post.author.name}, SearchPrex</cite>
                  </blockquote>
                ) : null}
              </div>
            </section>
 
            {/* Like & Share Bar */}
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-5 py-4">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.93 }}
                  onClick={handleToggleLike}
                  aria-pressed={userLiked}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all shadow-2xs cursor-pointer ${
                    userLiked
                      ? "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-[#e5e7eb] bg-white text-[#171717] hover:border-rose-300 hover:text-rose-600"
                  }`}
                >
                  <motion.span
                    className="inline-flex"
                    animate={likePulse ? { scale: [1, 1.45, 1] } : { scale: 1 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Heart className={`h-4 w-4 ${userLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                  </motion.span>
                  <span className="tabular-nums">
                    {likes > 0 ? `${likes} ${likes === 1 ? "Like" : "Likes"}` : "Like this post"}
                  </span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748b] mr-1">Share:</span>
                {SHARE_ITEMS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleShare(id)}
                    aria-label={`Share on ${label}`}
                    title={`Share on ${label}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#374151] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-colors cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white text-[#374151] text-xs font-bold px-3.5 py-2 hover:border-[#171717] hover:text-[#171717] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </div>

            {/* Unified Community Discussion & Reader Feedback */}
            <NewsDiscussionSection
              slug={post.slug}
              title={post.title}
              category={post.category}
              pagePath={`${section.href}/${post.slug}`}
              externalLikes={likes}
              externalUserLiked={userLiked}
              onExternalToggleLike={handleToggleLike}
            />
          </article>
 
          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0 hidden lg:flex flex-col gap-5 sticky top-24">
 
            {/* TOC — omitted entirely when empty, otherwise news spokes (which
                carry no TOC) render an empty titled box. */}
            {toc.length > 0 && (
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-4">
                Table of Contents
              </p>
              <nav className="flex flex-col gap-2">
                {toc.map((item, i) => (
                  <a key={i} href={`#section-${i}`}
                    className="group flex items-start gap-2 text-sm text-[#64748b] hover:text-[#171717] transition-colors">
                    <span className="text-[#171717] font-bold text-xs mt-0.5 flex-shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline leading-snug">{item}</span>
                  </a>
                ))}
              </nav>
              </div>
            )}

            {isLocalUpdates && (
              <section aria-labelledby="local-sidebar-resources" className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 id="local-sidebar-resources" className="text-xs font-bold uppercase tracking-widest text-slate-500">Local SEO resources</h2>
                <nav aria-label="Related Local SEO services and guides" className="mt-3 flex flex-col gap-3">
                  <Link href="/services/local-seo" className="text-sm font-semibold leading-5 text-slate-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-900">Local SEO services</Link>
                  <Link href="/resources/local-seo-tips" className="text-sm font-semibold leading-5 text-slate-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-900">Local SEO tips and lead playbook</Link>
                  <Link href="/resources/google-business-profile-checklist" className="text-sm font-semibold leading-5 text-slate-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-900">Google Business Profile checklist</Link>
                </nav>
              </section>
            )}

            {isLocalUpdates && localNewsPosts && localNewsPosts.length > 0 && (
              <section aria-labelledby="local-sidebar-news" className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 id="local-sidebar-news" className="text-xs font-bold uppercase tracking-widest text-slate-500">Related Local SEO news</h2>
                <div className="mt-3 flex flex-col gap-4">
                  {localNewsPosts.slice(0, 2).map((item) => (
                    <Link key={item.slug} href={`/resources/news/${item.slug}`} className="group flex items-start gap-3">
                      <Image src={item.image} alt={item.imageAlt} width={96} height={64} sizes="96px" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                      <span className="min-w-0">
                        <span className="block text-[11px] text-slate-500">{new Date(`${item.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {item.readTime}</span>
                        <span className="mt-1 line-clamp-3 block text-sm font-semibold leading-5 text-slate-900 group-hover:text-emerald-900">{item.title}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/resources/news/local-seo-updates#local-seo-news-feed" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4">Browse all local updates <ArrowRight className="h-3 w-3" aria-hidden="true" /></Link>
              </section>
            )}

            {isLocalUpdates && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-950">
                <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-900">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Local SEO newsletter
                </div>
                <p className="mb-3 text-sm font-bold leading-snug">Get sourced Local SEO updates by email.</p>
                {subscribed ? (
                  <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-900">You&apos;re subscribed to Local SEO updates.</p>
                ) : (
                  <form onSubmit={handleArticleSubscribe} className="flex flex-col gap-2">
                    <label className="sr-only" htmlFor="local-sidebar-newsletter-email">Email address</label>
                    <input id="local-sidebar-newsletter-email" type="email" required autoComplete="email" value={subEmail} onChange={(event) => { setSubEmail(event.target.value); if (subError) setSubError(null); }} placeholder="Email address" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15" />
                    <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60">
                      {submitting ? <><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Subscribing…</> : <>Subscribe <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></>}
                    </button>
                    {subError && <p role="alert" className="text-[11px] font-medium text-red-700">{subError}</p>}
                  </form>
                )}
              </div>
            )}

            {/* Dynamic Topic-Aware Sidebar Lead Magnet */}
            {!isLocalUpdates && <ArticleLeadMagnet
              variant="sidebar"
              source={leadSource}
              copy={dynamicCta.sidebarCopy}
              buttonText={dynamicCta.sidebarBtn}
            />}

            {/* Blog Newsletter Alert Box */}
            {!isLocalUpdates && <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-neutral-950 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#e2e8f0] mb-2">
                <Mail className="h-3.5 w-3.5" /> New Guide Alerts
              </div>
              <p className="text-sm font-extrabold text-neutral-950 leading-snug mb-1.5">
                Get notified when our next SEO guide drops.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                Practitioner-grade technical SEO playbooks delivered straight to your inbox.
              </p>
              {subscribed ? (
                <div className="flex items-start gap-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 p-3 text-xs text-emerald-200 font-semibold">
                  <CheckCircle className="h-4 w-4 text-[#e2e8f0] flex-shrink-0 mt-0.5" />
                  <span>Subscribed! You&apos;ll receive an email when the next guide is published.</span>
                </div>
              ) : (
                <form onSubmit={handleArticleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => {
                      setSubEmail(e.target.value);
                      if (subError) setSubError(null);
                    }}
                    placeholder="Your email address..."
                    className="w-full rounded-lg bg-white px-3.5 py-2.5 text-xs font-medium text-[#0a0a0a] placeholder-[#94a3b8] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:opacity-60 py-2.5 text-xs font-extrabold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe to Blog <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                  {subError && <p className="text-[11px] text-red-300 font-medium">{subError}</p>}
                </form>
              )}
            </div>}

            {/* Stat card */}
            {post.stat && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#f1f5f9] to-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Verified Result</p>
                <p className="text-3xl font-black text-[#171717]">{post.stat.value}</p>
                <p className="text-sm text-[#64748b] mt-1">{post.stat.label}</p>
                <Link href="/case-studies"
                  className="mt-3 flex items-center gap-1 text-xs font-bold text-[#171717] hover:gap-2 transition-all">
                  View case studies <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="text-xs bg-[#f8fafc] border border-[#e5e7eb] text-[#64748b] px-2.5 py-1 rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
 
      {/* ══ RELATED ══ */}
      {related.length > 0 && (
        <section className="border-t border-[#e5e7eb] bg-[#f8fafc] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-[#0a0a0a] mb-8">Related articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={(p as any).href || `${section.href}/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#171717] hover:shadow-lg transition-all">
                  <div className="relative h-44 overflow-hidden bg-[#0a0a0a]">
                    {(p as any).heroImage && (
                      <Image src={(p as any).heroImage} alt={p.title} fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        sizes="350px" unoptimized />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                    {(p as any).stat && (
                      <div className="absolute bottom-3 left-3 rounded-lg bg-[#0a0a0a]/70 px-3 py-1.5">
                        <span className="text-sm font-black text-[#e2e8f0]">{(p as any).stat.value}</span>
                        <span className="ml-1.5 text-[10px] text-white/60">{(p as any).stat.label}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                      {p.category}
                      {p.subcategory && (
                        <>
                          <ChevronRight className="h-2.5 w-2.5" /> {p.subcategory}
                        </>
                      )}
                    </div>
                    <h3 className="flex-1 text-sm font-black leading-snug text-[#0a0a0a] group-hover:text-[#171717] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between border-t border-[#e5e7eb] pt-3">
                      <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                        <Clock className="h-3 w-3" /> {p.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#171717] group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
 
      {/* ══ DYNAMIC TOPIC-AWARE BOTTOM CTA ══ */}
      <ArticleLeadMagnet
        variant="bottom"
        source={leadSource}
        copy={dynamicCta.bottomCopy}
        buttonText={dynamicCta.bottomBtn}
      />

      {/* ══ EXIT OFFER — the only interruption on the page, and the only one that can
          reach a reader who finished the article and is leaving without scrolling to
          any of the three blocks above. Shows once per reader per 30 days, never to
          someone who has already submitted, never on arrival, and never as a
          full-screen cover on a phone. ══ */}
      {!isLocalUpdates && <ArticleExitOffer
        source={`${leadSource}:exit`}
        headline={exitCopy?.headline}
        sub={exitCopy?.sub}
      />}
 
    </main>
  );
}
