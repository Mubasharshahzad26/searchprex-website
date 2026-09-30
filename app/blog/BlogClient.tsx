"use client";

// app/blog/BlogClient.tsx
// Toptal Insights / Engineering style blog index with:
// - Real-time Voice Search (live interim transcript, punctuation sanitization, error diagnostics)
// - Functional Newsletter Subscription (/api/newsletter/subscribe -> Postgres + Resend + New-Post Alerts)
// - Architectural Toptal Category Matrix, Verified Expert Bylines, and Lead Story layout.

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Settings,
  MapPin,
  ShoppingCart,
  Link2,
  FileText,
  CheckCircle,
  Mail,
  Mic,
  MicOff,
  BarChart3,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Loader2,
  X,
  BookOpen,
} from "lucide-react";
import { categories as categoryData, posts, mostRead, type Post } from "./data";

const GREEN = "#3eb489";

const QUICK_TOPICS = [
  "Crawl Budget",
  "Not Indexed",
  "Core Web Vitals",
  "Law Firm SEO",
  "10,000+ SKUs",
];

const fmtDate = (iso: string) => {
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

const categoryIcons: Record<string, any> = {
  "Technical SEO": Settings,
  "On-Page SEO": FileText,
  "Local SEO": MapPin,
  "E-commerce SEO": ShoppingCart,
  "Link Building": Link2,
  "Content Strategy": TrendingUp,
};

function getAuthorInitials(name: string): string {
  const parts = (name || "Mubashar Sharif").trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] || "M").toUpperCase();
}

function BlogImage({
  rank,
  category,
  imgUrl,
  featured = false,
}: {
  rank?: number;
  category: string;
  imgUrl?: string;
  featured?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const gradients: Record<string, string> = {
    "Technical SEO": "from-[#0a0f2e] to-[#3C3489]",
    "E-commerce SEO": "from-[#0f2027] to-[#203a43]",
    "Local SEO": "from-[#1a1a2e] to-[#16213e]",
    "Content Strategy": "from-[#0d1b2a] to-[#1b263b]",
    "On-Page SEO": "from-[#1a0533] to-[#341070]",
    "Link Building": "from-[#0b3d2e] to-[#1a6b4e]",
  };

  const covers: Record<string, string> = {
    "Technical SEO":
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    "On-Page SEO":
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80",
    "Local SEO":
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    "E-commerce SEO":
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    "Link Building":
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    "Content Strategy":
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  };

  const cover =
    imgUrl ||
    covers[category] ||
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80";

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0f2e]">
      {/* Branded gradient fallback */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradients[category] || "from-[#0a0f2e] to-[#3C3489]"
        } flex items-center justify-center`}
      >
        <div className="text-center opacity-30">
          <div className="text-4xl mb-2">📊</div>
          <div className="text-white text-xs font-mono uppercase tracking-wider">{category}</div>
        </div>
      </div>

      {!imgError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={`${category} — SearchPrex blog`}
          loading={featured ? "eager" : "lazy"}
          onError={() => setImgError(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Subtle editorial vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/45 via-transparent to-transparent pointer-events-none" />

      {featured && (
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-md bg-[#0a0f2e]/90 backdrop-blur-sm border border-white/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#3eb489]">
          <Sparkles className="h-3 w-3" /> Featured Deep-Dive
        </div>
      )}

      {rank && (
        <div className="absolute top-3.5 left-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-[#0a0f2e]/90 border border-white/20 shadow-md">
          <span className="text-[#3eb489] text-xs font-black tracking-tight">
            {String(rank).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}

/* Toptal-style Category Breadcrumb Kicker (hides trailing chevron when subcategory is empty) */
function CategoryKicker({
  category,
  subcategory,
  size = "sm",
}: {
  category: string;
  subcategory?: string;
  size?: "sm" | "md";
}) {
  const textClass =
    size === "md"
      ? "text-[11px] font-extrabold uppercase tracking-[0.12em]"
      : "text-[10px] font-extrabold uppercase tracking-[0.12em]";

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className={`${textClass} text-[#3C3489]`}>{category || "Technical SEO"}</span>
      {subcategory && subcategory.trim() !== "" && (
        <>
          <ChevronRight className="h-3 w-3 text-[#94a3b8] flex-shrink-0" />
          <span className={`${textClass} text-[#64748b]`}>{subcategory}</span>
        </>
      )}
    </div>
  );
}

/* Toptal-style Verified Author Byline */
function Byline({ post }: { post: Post }) {
  const initials = getAuthorInitials(post.author.name);
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#3C3489] to-[#534AB7] flex items-center justify-center flex-shrink-0 ring-2 ring-[#EEEDFE]">
          <span className="text-white font-extrabold text-[10px] tracking-tighter">
            {initials}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#64748b]">By</span>
            <span className="text-xs font-bold text-[#0a0f2e] truncate">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-[#15803d]">
            <ShieldCheck className="h-3 w-3 text-[#3eb489] flex-shrink-0" />
            <span>Verified Expert in SEO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogClient({
  initialPosts,
  initialMostRead,
}: {
  initialPosts?: Array<Post & { heroImage?: string; tags?: string[] }>;
  initialMostRead?: any[];
}) {
  const activePosts: Array<Post & { heroImage?: string; tags?: string[] }> =
    initialPosts && initialPosts.length > 0 ? initialPosts : posts;
  const activeMostRead =
    initialMostRead && initialMostRead.length > 0 ? initialMostRead : mostRead;

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Voice search state
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const postsRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setVoiceSupported(Boolean(SpeechRecognition));
    }

    // Keyboard shortcut "/" or Cmd/Ctrl+K to focus search
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA") ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      recognitionRef.current?.abort?.();
    };
  }, []);

  /** Sanitizes spoken transcripts so trailing periods/commas don't break substring matching */
  const sanitizeTranscript = (raw: string): string => {
    return raw.replace(/[.,!?]+$/g, "").replace(/\s+/g, " ").trim();
  };

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;
    setVoiceMessage(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceMessage(
        "Voice search is supported in Chrome, Edge, and Safari. Please type your search query above."
      );
      searchInputRef.current?.focus();
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore stop error
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceMessage("Listening... Speak an SEO topic (e.g. 'Crawl Budget' or 'Not Indexed')");
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const piece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += piece;
          } else {
            interimTranscript += piece;
          }
        }

        const spoken = sanitizeTranscript(finalTranscript || interimTranscript);
        if (spoken) {
          setQuery(spoken);
        }

        if (finalTranscript) {
          setIsListening(false);
          setVoiceMessage(null);
          setTimeout(() => {
            postsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 250);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        const code = event?.error;
        if (code === "not-allowed" || code === "service-not-allowed") {
          setVoiceMessage(
            "Microphone access was blocked. Please allow microphone permission in your browser's address bar and try again."
          );
        } else if (code === "no-speech") {
          setVoiceMessage("No speech was detected. Click 'Voice' and speak clearly into your mic.");
        } else if (code === "audio-capture") {
          setVoiceMessage("No microphone was detected on your device.");
        } else if (code === "network") {
          setVoiceMessage("Browser speech service network error. Please try again or type above.");
        } else if (code !== "aborted") {
          setVoiceMessage("Could not capture voice input. Please try again or type your query.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceMessage("Unable to start microphone. Please check your browser permissions.");
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (voiceMessage) setVoiceMessage(null);
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = activePosts.filter((p) => {
    const matchQ =
      normalizedQuery === "" ||
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(normalizedQuery)) ||
      p.excerpt.toLowerCase().includes(normalizedQuery) ||
      (Array.isArray(p.tags) &&
        p.tags.some((t) => t.toLowerCase().includes(normalizedQuery)));

    const matchC =
      activeCategory === "All" ||
      p.category.toLowerCase() === activeCategory.toLowerCase();
    return matchQ && matchC;
  });

  const isFiltering = activeCategory !== "All" || normalizedQuery !== "";
  const featuredPost = activePosts.find((p) => p.featured) || activePosts[0];
  const compactPosts = isFiltering
    ? filtered
    : activePosts.filter((p) => p.slug !== featuredPost?.slug);

  // Count articles per category for the Toptal Category Matrix
  const getCategoryCount = (catLabel: string) => {
    const count = activePosts.filter(
      (p) => p.category.toLowerCase() === catLabel.toLowerCase()
    ).length;
    return count;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setSubmittingNewsletter(true);
    setNewsletterError(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          source: "blog-index-newsletter",
          categories: activeCategory !== "All" ? [activeCategory] : [],
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setNewsletterError(
          data.error || "Could not subscribe right now. Please check your email and try again."
        );
        setSubmittingNewsletter(false);
        return;
      }

      setAlreadySubscribed(Boolean(data.alreadySubscribed));
      setSubscribed(true);
      setEmail("");
    } catch {
      setNewsletterError("Network error while subscribing. Please try again.");
    } finally {
      setSubmittingNewsletter(false);
    }
  };

  const postHref = (post: { slug: string; category?: string }) =>
    post.category?.toLowerCase().includes("seo news")
      ? `/resources/news/${post.slug}`
      : `/blog/${post.slug}`;

  return (
    <main className="bg-[#f8f9fc] min-h-screen">
      {/* ══════════════════════════════════════════════════════════════════
          01. TOPTAL-STYLE EDITORIAL HERO + VOICE/COMMAND SEARCH
         ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-b from-[#0a0f2e] via-[#0f173d] to-[#131b47] text-white pt-28 pb-12 border-b border-white/10 overflow-hidden">
        {/* Subtle architectural grid background */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[#534AB7]/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top Editorial Kicker Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-7 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded bg-[#3eb489]/15 border border-[#3eb489]/40 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#3eb489]">
                  <ShieldCheck className="h-3.5 w-3.5" /> SearchPrex Engineering &amp; SEO Insights
                </span>
                <span className="hidden sm:inline text-xs text-white/50">
                  Peer-reviewed playbooks by senior SEO practitioners
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-white/70">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-3 py-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#3eb489]" />
                  <span className="font-bold text-white">{activePosts.length}</span>
                  <span>In-Depth Guides</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-3 py-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-[#a5b4fc]" />
                  <span className="font-bold text-white">4.2K</span>
                  <span>Practitioner Shares</span>
                </div>
              </div>
            </div>

            {/* Main Headline & Subtitle */}
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[54px]">
                SearchPrex SEO Blog
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
                Founder-written technical breakdowns on Crawl Budget, E-commerce Indexation, Core
                Web Vitals, Local Map Pack engineering, and AI Search — built for practitioners,
                not beginners.
              </p>
            </div>
          </motion.div>

          {/* Elevated Command + Voice Search Bar */}
          <div className="relative max-w-4xl">
            <div
              className={`flex items-center bg-white rounded-xl overflow-hidden shadow-2xl border transition-all ${
                isListening
                  ? "border-red-500 ring-4 ring-red-500/25"
                  : "border-white/20 focus-within:ring-4 focus-within:ring-[#534AB7]/30"
              }`}
            >
              <div className="pl-5 pr-3 text-[#64748b]">
                <Search className="h-5 w-5" />
              </div>

              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    postsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                placeholder={
                  isListening
                    ? "Listening... Speak your SEO topic now"
                    : "Search guides by topic, issue, or keyword (Press '/' to focus)..."
                }
                aria-label="Search blog articles"
                className="flex-1 py-4 sm:py-5 pr-3 text-base sm:text-lg text-[#0a0f2e] placeholder-[#94a3b8] outline-none font-medium bg-transparent"
              />

              {query && !isListening && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="px-3 py-2 text-[#64748b] hover:text-[#0a0f2e] text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              )}

              <div className="w-px h-7 bg-[#e5e7eb] mx-1" />

              {/* Voice Search Button — Always visible with clear feedback */}
              <button
                type="button"
                onClick={handleVoiceSearch}
                title={
                  isListening
                    ? "Stop voice search"
                    : voiceSupported
                    ? "Search articles by voice"
                    : "Voice search (Chrome / Edge / Safari)"
                }
                aria-label={isListening ? "Stop voice search" : "Start voice search"}
                className={`px-4 sm:px-5 py-4 sm:py-5 transition-all flex items-center gap-2 text-sm font-bold whitespace-nowrap ${
                  isListening
                    ? "bg-red-50 text-red-600"
                    : "text-[#3C3489] hover:bg-[#f8f9fc] hover:text-[#0a0f2e]"
                }`}
              >
                {isListening ? (
                  <>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                    </span>
                    <MicOff className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">Stop</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 text-[#534AB7]" />
                    <span className="text-xs sm:text-sm">Voice Search</span>
                  </>
                )}
              </button>
            </div>

            {/* Voice status / diagnostic feedback banner */}
            <AnimatePresence>
              {voiceMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={`mt-2.5 flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-xs font-medium border ${
                    isListening
                      ? "bg-[#1e1b4b] border-[#534AB7] text-white"
                      : "bg-amber-500/15 border-amber-400/40 text-amber-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#3eb489]" />
                    <span>{voiceMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVoiceMessage(null)}
                    className="text-white/60 hover:text-white"
                    aria-label="Dismiss voice notification"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Topic Filter Pills & Live Result Count */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50 mr-1">
                  Popular Topics:
                </span>
                {QUICK_TOPICS.map((topic) => {
                  const isActive = query.toLowerCase() === topic.toLowerCase();
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        const next = isActive ? "" : topic;
                        setQuery(next);
                        if (next) {
                          setTimeout(() => {
                            postsRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }, 150);
                        }
                      }}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                        isActive
                          ? "bg-[#3eb489] border-[#3eb489] text-[#0a0f2e]"
                          : "bg-white/5 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              {query && (
                <div className="text-xs font-bold text-[#3eb489]">
                  {filtered.length === 0
                    ? `No matches for "${query}"`
                    : `${filtered.length} article${filtered.length !== 1 ? "s" : ""} matched`}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          02. TOPTAL ARCHITECTURAL CATEGORY MATRIX
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white border-b border-[#e5e7eb]"
        aria-labelledby="blog-categories"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#534AB7] mb-1.5">
                Explore By Discipline
              </p>
              <h2 id="blog-categories" className="text-2xl font-extrabold text-[#0a0f2e]">
                Browse Practitioner Guides by Category
              </h2>
            </div>
            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#534AB7] hover:text-[#0a0f2e]"
              >
                <X className="h-3.5 w-3.5" /> Reset Filter (Showing {activeCategory})
              </button>
            )}
          </div>

          {/* 1px Crisp Toptal Matrix using gap-px on a border-colored container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#dce1eb] border border-[#dce1eb] rounded-xl overflow-hidden shadow-sm">
            {categoryData.map((cat) => {
              const Icon = categoryIcons[cat.label] || Settings;
              const isSelected = activeCategory === cat.label;
              const count = getCategoryCount(cat.label);

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => {
                    setActiveCategory(isSelected ? "All" : cat.label);
                    setTimeout(
                      () =>
                        postsRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        }),
                      180
                    );
                  }}
                  className={`relative text-left p-7 transition-all group flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#f8f7ff]"
                      : "bg-white hover:bg-[#fcfdff]"
                  }`}
                >
                  {/* Top accent bar on hover / active */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 transition-opacity ${
                      isSelected
                        ? "bg-[#534AB7] opacity-100"
                        : "bg-[#3eb489] opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
                          isSelected
                            ? "bg-[#534AB7] border-[#534AB7] text-white"
                            : "bg-[#f8f9fc] border-[#e5e7eb] text-[#3C3489] group-hover:border-[#534AB7]/40 group-hover:bg-[#EEEDFE]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {count > 0 && (
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            isSelected
                              ? "bg-[#534AB7] text-white"
                              : "bg-[#f1f5f9] text-[#64748b]"
                          }`}
                        >
                          {count} {count === 1 ? "Guide" : "Guides"}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-extrabold mb-2 transition-colors ${
                        isSelected
                          ? "text-[#534AB7]"
                          : "text-[#0a0f2e] group-hover:text-[#3C3489]"
                      }`}
                    >
                      {cat.label}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed mb-5">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#534AB7]">
                    <span>{isSelected ? "Active Filter" : "View Articles"}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          03. TOPTAL EDITORIAL NEWSLETTER BAND (REAL SUBSCRIPTION + ALERTS)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#0a0f2e] via-[#131b4d] to-[#1e1b4b] text-white py-12 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#3eb489] mb-2">
                <Mail className="h-3.5 w-3.5" /> Instant Publication Alerts
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                Get notified whenever we publish a new SEO guide.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Subscribe to the SearchPrex Editorial Briefing. Every time a new technical guide or
                case breakdown goes live, we send the full breakdown directly to your inbox.
              </p>
            </div>

            <div className="w-full max-w-lg">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-emerald-500/15 border border-emerald-400/40 p-5 text-white"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#3eb489] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-base text-white">
                        {alreadySubscribed
                          ? "You're already on our active subscriber list!"
                          : "You're subscribed to SearchPrex SEO Insights!"}
                      </p>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {alreadySubscribed
                          ? "We'll continue emailing you as soon as our next blog post is published."
                          : "Check your inbox for a welcome confirmation. You'll automatically receive an email notification whenever our next blog post is published."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex items-center bg-white rounded-xl flex-1 px-4 border border-white/20 focus-within:ring-2 focus-within:ring-[#3eb489]">
                      <Mail className="h-4 w-4 text-[#64748b] mr-2.5 flex-shrink-0" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (newsletterError) setNewsletterError(null);
                        }}
                        placeholder="Enter your work or personal email..."
                        aria-label="Email address for blog updates"
                        className="flex-1 py-3.5 text-[#0a0f2e] placeholder-[#94a3b8] outline-none text-sm font-medium bg-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingNewsletter}
                      className="bg-[#3eb489] hover:bg-[#34a078] disabled:opacity-60 text-[#0a0f2e] font-extrabold px-6 py-3.5 rounded-xl transition-all text-sm whitespace-nowrap inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      {submittingNewsletter ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {newsletterError && (
                    <p className="text-xs font-semibold text-red-300 flex items-center gap-1.5 mt-1">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                      {newsletterError}
                    </p>
                  )}

                  <p className="text-slate-400 text-[11px] mt-1">
                    Zero spam. One-click unsubscribe in every email. Read our{" "}
                    <Link href="/privacy" className="underline hover:text-white">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          04. TOPTAL EDITORIAL POSTS GRID (FEATURED LEAD + COMPACT CARDS)
         ══════════════════════════════════════════════════════════════════ */}
      <section ref={postsRef} id="posts-grid" className="py-16 sm:py-20 bg-[#f8f9fc] scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Active Filter Bar */}
          {isFiltering && (
            <div className="flex items-center justify-between gap-4 mb-10 bg-white border border-[#e5e7eb] rounded-xl px-5 py-3.5 shadow-sm flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#64748b]">
                  Active Filters:
                </span>
                {query && (
                  <span className="inline-flex items-center gap-1.5 bg-[#f1f5f9] text-[#0a0f2e] px-3 py-1 rounded-md text-xs font-bold">
                    Search: &ldquo;{query}&rdquo;
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-[#64748b] hover:text-[#0a0f2e]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {activeCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#EEEDFE] text-[#534AB7] px-3 py-1 rounded-md text-xs font-bold">
                    Topic: {activeCategory}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("All")}
                      className="text-[#534AB7] hover:text-[#0a0f2e]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                <span className="text-xs font-semibold text-[#64748b]">
                  ({filtered.length} {filtered.length === 1 ? "article" : "articles"})
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs font-bold text-[#534AB7] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {isFiltering && filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#e5e7eb] px-6">
              <Search className="h-12 w-12 mx-auto mb-4 text-[#94a3b8]" />
              <h3 className="text-xl font-extrabold text-[#0a0f2e] mb-2">
                No articles matched &ldquo;{query || activeCategory}&rdquo;
              </h3>
              <p className="text-sm text-[#64748b] max-w-md mx-auto mb-6">
                Try searching for a broader SEO term like <strong>Crawl Budget</strong>,{" "}
                <strong>Indexed</strong>, <strong>E-commerce</strong>, or{" "}
                <strong>Law Firm</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0a0f2e] text-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider hover:bg-[#3C3489] transition-colors"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* FEATURED LEAD ARTICLE (5 cols on desktop, spans 2 rows) */}
              {!isFiltering && featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:col-span-5 flex flex-col bg-white rounded-xl border border-[#dce1eb] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#534AB7]/50 transition-all group"
                >
                  <Link
                    href={postHref(featuredPost)}
                    className="block aspect-[16/10] overflow-hidden relative"
                  >
                    <BlogImage
                      category={featuredPost.category}
                      imgUrl={featuredPost.heroImage}
                      featured
                    />
                  </Link>

                  <div className="flex flex-col flex-1 p-7 sm:p-8">
                    <div className="mb-3">
                      <CategoryKicker
                        category={featuredPost.category}
                        subcategory={featuredPost.subcategory}
                        size="md"
                      />
                    </div>

                    <Link href={postHref(featuredPost)}>
                      <h2 className="text-[#0a0f2e] font-extrabold text-2xl sm:text-[26px] leading-[1.28] mb-4 group-hover:text-[#3C3489] transition-colors">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-[#475569] text-sm sm:text-[15px] leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-2.5 text-[#64748b] text-xs font-bold uppercase tracking-wider mb-6">
                      <span>{fmtDate(featuredPost.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-[#cbd5e1]" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#534AB7]" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    {/* Toptal Full Verified Author Card — Featured Article */}
                    <div className="mt-auto rounded-xl bg-[#f8f9fc] border border-[#e5e7eb] p-4">
                      <div className="flex items-start gap-3.5">
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#3C3489] to-[#534AB7] flex items-center justify-center flex-shrink-0 ring-2 ring-[#EEEDFE]">
                          <span className="text-white font-black text-sm">
                            {getAuthorInitials(featuredPost.author.name)}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-sm font-extrabold text-[#0a0f2e]">
                              {featuredPost.author.name}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                              <ShieldCheck className="h-3 w-3 text-[#3eb489]" />
                              {featuredPost.author.role || "Verified SEO Expert"}
                            </span>
                          </div>
                          {featuredPost.authorBio && (
                            <p className="text-xs text-[#64748b] leading-relaxed line-clamp-2">
                              {featuredPost.authorBio}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={postHref(featuredPost)}
                      className="mt-6 inline-flex items-center gap-1.5 text-[#3C3489] text-xs font-extrabold uppercase tracking-widest group-hover:gap-2.5 transition-all"
                    >
                      Read Full Technical Guide <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              )}

              {/* COMPACT EDITORIAL CARDS */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
                  !isFiltering && featuredPost
                    ? "lg:col-span-7"
                    : "lg:col-span-12 lg:grid-cols-3"
                }`}
              >
                {compactPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                    className="flex flex-col bg-white rounded-xl border border-[#dce1eb] overflow-hidden shadow-sm hover:shadow-lg hover:border-[#534AB7]/40 transition-all group"
                  >
                    <Link
                      href={postHref(post)}
                      className="block aspect-[16/9] overflow-hidden relative"
                    >
                      <BlogImage category={post.category} imgUrl={post.heroImage} />
                    </Link>

                    <div className="flex flex-col flex-1 p-6">
                      <div className="mb-2.5">
                        <CategoryKicker
                          category={post.category}
                          subcategory={post.subcategory}
                          size="sm"
                        />
                      </div>

                      <Link href={postHref(post)}>
                        <h2 className="text-[#0a0f2e] font-extrabold text-lg leading-snug mb-2.5 group-hover:text-[#3C3489] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      {post.excerpt && (
                        <p className="text-xs text-[#64748b] leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-[#94a3b8] text-[11px] font-bold uppercase tracking-wider mb-4">
                        <span>{fmtDate(post.date)}</span>
                        <span className="h-1 w-1 rounded-full bg-[#cbd5e1]" />
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#534AB7]" />
                          {post.readTime}
                        </span>
                      </div>

                      <div className="mt-auto pt-4 border-t border-[#f1f5f9] flex items-center justify-between gap-2">
                        <Byline post={post} />
                        <Link
                          href={postHref(post)}
                          aria-label={`Read ${post.title}`}
                          className="h-8 w-8 rounded-lg bg-[#f8f9fc] border border-[#e5e7eb] flex items-center justify-center text-[#534AB7] group-hover:bg-[#534AB7] group-hover:text-white transition-colors flex-shrink-0"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* ── Audit CTA (CRO) ── */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-[#dce1eb] bg-white p-8 sm:p-10 shadow-sm">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#534AB7] mb-2">
                Hands-On Technical SEO Engineering
              </span>
              <p className="text-2xl font-extrabold text-[#0a0f2e] mb-2">
                Reading about the problem? We fix it for a living.
              </p>
              <p className="text-sm text-[#64748b] leading-relaxed">
                Get a free, founder-reviewed SEO audit of your site — complete with crawl
                diagnostics and a prioritized 90-day engineering roadmap within 24 hours.
              </p>
            </div>
            <Link
              href="/free-audit"
              className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-sm font-extrabold text-[#0a0f2e] shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              style={{ background: GREEN }}
            >
              <BarChart3 className="h-4 w-4" /> Get Free SEO Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          05. MOST-READ ARTICLES (TOPTAL RANKED ROW)
         ══════════════════════════════════════════════════════════════════ */}
      {activeMostRead.length > 0 && (
        <section className="py-20 bg-white border-t border-[#e5e7eb]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#534AB7] mb-1.5">
                  Reader Favorites
                </p>
                <h2 className="text-2xl font-extrabold text-[#0a0f2e]">Most-Read Guides</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeMostRead.map((post) => (
                <Link
                  key={post.slug}
                  href={postHref(post)}
                  className="group flex flex-col bg-[#f8f9fc] rounded-xl border border-[#dce1eb] p-5 hover:bg-white hover:shadow-lg hover:border-[#534AB7]/40 transition-all"
                >
                  <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4 relative">
                    <BlogImage
                      rank={post.rank}
                      category={post.category}
                      imgUrl={post.heroImage}
                    />
                  </div>
                  <div className="mb-2">
                    <CategoryKicker
                      category={post.category}
                      subcategory={post.subcategory}
                      size="sm"
                    />
                  </div>
                  <h3 className="text-[#0a0f2e] font-extrabold text-base leading-snug mb-3 group-hover:text-[#3C3489] transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-[#94a3b8] text-xs font-bold uppercase tracking-wider">
                    <span>{fmtDate(post.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-[#cbd5e1]" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#534AB7]" />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
