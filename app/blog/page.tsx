"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Clock, ChevronRight, ArrowRight,
  TrendingUp, Settings, MapPin, ShoppingCart,
  Link2, FileText, CheckCircle, Mail
} from "lucide-react";
 
// ── CATEGORIES ─────────────────────────────────────────────────────────
const categories = [
  {
    icon: Settings,
    label: "Technical SEO",
    slug: "technical-seo",
    desc: "Crawl budget, Core Web Vitals, indexation fixes, site architecture, and everything under the hood.",
  },
  {
    icon: FileText,
    label: "On-Page SEO",
    slug: "on-page-seo",
    desc: "Title tags, meta descriptions, schema markup, E-E-A-T signals, and content optimization at scale.",
  },
  {
    icon: MapPin,
    label: "Local SEO",
    slug: "local-seo",
    desc: "Google Business Profile, local citations, NAP consistency, and map pack domination strategies.",
  },
  {
    icon: ShoppingCart,
    label: "E-commerce SEO",
    slug: "ecommerce-seo",
    desc: "Product page optimization, faceted navigation, category SEO, and duplicate content fixes.",
  },
  {
    icon: Link2,
    label: "Link Building",
    slug: "link-building",
    desc: "Digital PR, guest posts, broken link building, and white-hat authority building tactics.",
  },
  {
    icon: TrendingUp,
    label: "Content Strategy",
    slug: "content-strategy",
    desc: "Topical authority maps, content clusters, search intent mapping, and AI-ready content formats.",
  },
];
 
// ── BLOG POSTS (dummy — replace with Sanity fetch) ─────────────────────
const posts = [
  {
    slug: "crawl-budget-optimization-guide",
    category: "Technical SEO",
    subcategory: "Crawl Optimization",
    title: "Crawl Budget Optimization: The Complete 2026 Guide for Large E-commerce Sites",
    excerpt: "If Google isn't crawling your most important pages, they won't rank. Here's exactly how to audit and fix crawl budget issues at scale.",
    readTime: "12-minute read",
    image: "/blog/crawl-budget.jpg",
    author: { name: "Mubashar Shahzad", role: "Verified SEO Expert", avatar: "/founder.jpg" },
    authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO. He has managed 40,000+ page sites and solved mass non-indexing issues for multiple brands.",
    featured: true,
  },
  {
    slug: "google-indexing-api-python",
    category: "Technical SEO",
    subcategory: "Indexing",
    title: "Google Indexing API: How to Submit 1,000 URLs/Day with Python",
    excerpt: "The standard GSC submission is slow. This step-by-step guide shows you how to build a 5-account rotator system for mass URL submission.",
    readTime: "18-minute read",
    image: "/blog/indexing-api.jpg",
    author: { name: "Mubashar Shahzad", role: "Verified SEO Expert", avatar: "/founder.jpg" },
    authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.",
    featured: false,
  },
  {
    slug: "ecommerce-product-page-seo",
    category: "E-commerce SEO",
    subcategory: "Product Pages",
    title: "Product Page SEO at Scale: How to Write Unique Content for 10,000+ SKUs",
    excerpt: "Duplicate boilerplate content is the #1 reason e-commerce product pages fail to index. Here's the brand-by-brand rewriting strategy that works.",
    readTime: "15-minute read",
    image: "/blog/product-seo.jpg",
    author: { name: "Mubashar Shahzad", role: "Verified SEO Expert", avatar: "/founder.jpg" },
    authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.",
    featured: false,
  },
  {
    slug: "core-web-vitals-ecommerce",
    category: "Technical SEO",
    subcategory: "Core Web Vitals",
    title: "Core Web Vitals for E-commerce: Fix LCP, INP & CLS in 2026",
    excerpt: "Google's page experience signals directly impact rankings. Learn how to diagnose and fix all three Core Web Vitals on Shopify, WooCommerce, and custom platforms.",
    readTime: "20-minute read",
    image: "/blog/core-web-vitals.jpg",
    author: { name: "Mubashar Shahzad", role: "Verified SEO Expert", avatar: "/founder.jpg" },
    authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.",
    featured: false,
  },
  {
    slug: "local-seo-law-firms",
    category: "Local SEO",
    subcategory: "Law Firms",
    title: "Local SEO for Law Firms: How to Rank in the Map Pack in 2026",
    excerpt: "Law firm SEO is hyper-competitive. This guide covers GBP optimization, local citations, review strategy, and the content that actually moves the needle.",
    readTime: "14-minute read",
    image: "/blog/local-seo.jpg",
    author: { name: "Mubashar Shahzad", role: "Verified SEO Expert", avatar: "/founder.jpg" },
    authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.",
    featured: false,
  },
  {
    slug: "topical-authority-content-clusters",
    category: "Content Strategy",
    subcategory: "Topical Authority",
    title: "How to Build Topical Authority with Content Clusters (Step-by-Step)",
    excerpt: "Google rewards sites that prove deep expertise on a subject. Here's how to map, build, and interlink content clusters that establish true topical authority.",
    readTime: "16-minute read",
    image: "/blog/topical-authority.jpg",
    author: { name: "Mubashar Shahzad", role: "Verified SEO Expert", avatar: "/founder.jpg" },
    authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.",
    featured: false,
  },
];
 
// ── MOST READ ──────────────────────────────────────────────────────────
const mostRead = [
  {
    slug: "non-indexing-fix-ecommerce",
    category: "Technical SEO",
    subcategory: "Indexing",
    title: "Why 80% of Your E-commerce Pages Aren't Indexed (And How to Fix It)",
    readTime: "10-minute read",
    image: "/blog/non-indexing.jpg",
    rank: 1,
  },
  {
    slug: "schema-markup-ecommerce",
    category: "On-Page SEO",
    subcategory: "Schema",
    title: "Product Schema Markup: The Complete JSON-LD Guide for E-commerce",
    readTime: "8-minute read",
    image: "/blog/schema.jpg",
    rank: 2,
  },
  {
    slug: "google-ai-overviews-seo",
    category: "Content Strategy",
    subcategory: "AIO",
    title: "How to Appear in Google AI Overviews: GEO Strategy for 2026",
    readTime: "11-minute read",
    image: "/blog/geo.jpg",
    rank: 3,
  },
];
 
// ── IMAGE PLACEHOLDER (until real images exist) ────────────────────────
function BlogImage({ rank, category }: { rank?: number; category: string }) {
  const colors: Record<string, string> = {
    "Technical SEO": "from-[#0a0f2e] to-[#1a3c8f]",
    "E-commerce SEO": "from-[#0f2027] to-[#203a43]",
    "Local SEO": "from-[#1a1a2e] to-[#16213e]",
    "Content Strategy": "from-[#0d1b2a] to-[#1b263b]",
    "On-Page SEO": "from-[#1a0533] to-[#341070]",
    "Link Building": "from-[#0b3d2e] to-[#1a6b4e]",
  };
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${colors[category] || "from-[#0a0f2e] to-[#1a3c8f]"} flex items-center justify-center`}>
      {rank && (
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#534AB7] flex items-center justify-center">
          <span className="text-white text-xs font-bold">{rank}</span>
        </div>
      )}
      <div className="text-center opacity-30">
        <div className="text-5xl mb-2">📊</div>
        <div className="text-white text-xs font-mono">{category}</div>
      </div>
    </div>
  );
}
 
export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
 
  const filtered = posts.filter((p) => {
    const matchQ = query === "" || p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
    const matchC = activeCategory === "All" || p.category === activeCategory;
    return matchQ && matchC;
  });
 
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formspree.io/f/mqejawpd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "New Blog Subscriber — SearchPrex" }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  };
 
  return (
    <main className="bg-white min-h-screen">
 
      {/* ── 01 HERO ── */}
      <section className="bg-[#0a0f2e] relative overflow-hidden pt-28 pb-0">
        {/* Network pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4a6cf7 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              SearchPrex Blog
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mb-8 leading-relaxed">
              Founder-written SEO guides on Technical SEO, E-commerce, Local SEO, and Content Strategy — built for practitioners, not beginners.
            </p>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2 text-white/60 text-sm">
                <span>🔗</span>
                <span className="font-semibold text-white">4.2K SHARES</span>
              </div>
            </div>
          </motion.div>
 
          {/* Search bar */}
          <div className="relative max-w-4xl">
            <div className="flex items-center bg-white rounded-t-xl overflow-hidden border-b-0 shadow-2xl">
              <div className="pl-5 pr-3 text-[#94a3b8]">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 py-5 pr-5 text-lg text-[#0a0f2e] placeholder-[#94a3b8] outline-none font-medium"
              />
              {query && (
                <button onClick={() => setQuery("")} className="pr-5 text-[#94a3b8] hover:text-[#0a0f2e] text-sm">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── 02 CATEGORIES ── */}
      <section className="bg-[#f8f9fc] border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e5e7eb] rounded-xl overflow-hidden">
            {categories.map((cat, i) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(activeCategory === cat.label ? "All" : cat.label)}
                className={`text-left p-8 border-[#e5e7eb] transition-all hover:bg-white group
                  ${i % 3 !== 2 ? "border-r" : ""}
                  ${i < 3 ? "border-b" : ""}
                  ${activeCategory === cat.label ? "bg-white shadow-inner" : "bg-[#f8f9fc]"}
                `}
              >
                <cat.icon className={`h-7 w-7 mb-4 transition-colors ${activeCategory === cat.label ? "text-[#534AB7]" : "text-[#94a3b8] group-hover:text-[#1a3c8f]"}`} />
                <h3 className={`text-xl font-bold mb-2 transition-colors ${activeCategory === cat.label ? "text-[#534AB7]" : "text-[#0a0f2e]"}`}>
                  {cat.label}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 03 NEWSLETTER ── */}
      <section className="bg-[#0a0f2e] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl font-black text-white max-w-sm leading-tight">
              Expert SEO insights, delivered weekly.
            </h2>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
                <CheckCircle className="h-6 w-6" />
                You're subscribed — check your inbox!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0 w-full max-w-lg">
                <div className="flex items-center bg-white rounded-l-xl flex-1 px-4">
                  <Mail className="h-4 w-4 text-[#94a3b8] mr-2 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 py-4 text-[#0a0f2e] placeholder-[#94a3b8] outline-none text-sm"
                  />
                </div>
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-4 rounded-r-xl transition-colors text-sm whitespace-nowrap">
                  Sign Me Up
                </button>
              </form>
            )}
          </div>
          <p className="text-blue-300/60 text-xs mt-4">
            By entering your email, you agree to our{" "}
            <Link href="/privacy" className="underline hover:text-blue-300">privacy policy</Link>.
          </p>
        </div>
      </section>
 
      {/* ── 04 POSTS GRID ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
          {/* Active filter pill */}
          {activeCategory !== "All" && (
            <div className="flex items-center gap-3 mb-10">
              <span className="text-sm text-[#64748b]">Showing:</span>
              <div className="flex items-center gap-2 bg-[#EEEDFE] text-[#534AB7] px-4 py-1.5 rounded-full text-sm font-semibold">
                {activeCategory}
                <button onClick={() => setActiveCategory("All")} className="ml-1 hover:opacity-70">×</button>
              </div>
            </div>
          )}
 
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#64748b]">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No articles found for "<strong>{query}</strong>"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col"
                >
                  {/* Image */}
                  <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] rounded-xl overflow-hidden mb-5 hover:opacity-90 transition-opacity">
                    <BlogImage category={post.category} />
                  </Link>
 
                  {/* Category breadcrumb */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">{post.category}</span>
                    <ChevronRight className="h-3 w-3 text-[#94a3b8]" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">{post.subcategory}</span>
                  </div>
 
                  {/* Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-[#0a0f2e] font-black text-xl leading-snug mb-3 hover:text-[#1a3c8f] transition-colors">
                      {post.title}
                    </h2>
                  </Link>
 
                  {/* Excerpt */}
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
 
                  {/* Read time + CTA */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1.5 text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-[#1a3c8f] text-xs font-bold uppercase tracking-wide hover:gap-2 transition-all"
                    >
                      Continue Reading <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
 
                  {/* Author */}
                  <div className="border-t border-[#e5e7eb] pt-5">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#534AB7] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">M</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs text-[#64748b]">By</span>
                          <span className="text-sm font-bold text-[#0a0f2e]">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#534AB7]" />
                          <span className="text-xs font-semibold text-[#534AB7]">{post.author.role}</span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">
                          {post.authorBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
 
          {/* ── PAGINATION ── */}
          <div className="flex items-center justify-center gap-2 mt-16 flex-wrap">
            {["First", "Previous", "1", "2", "3", "4", "...", "Last"].map((p) => (
              <button
                key={p}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all
                  ${p === "1"
                    ? "bg-[#0a0f2e] text-white"
                    : "text-[#64748b] hover:text-[#0a0f2e] hover:bg-[#f8f9fc] border border-transparent hover:border-[#e5e7eb]"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 05 MOST READ ── */}
      <section className="py-20 bg-[#f8f9fc] border-t border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#0a0f2e] mb-10">
            Most-read Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostRead.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 relative">
                  <BlogImage rank={post.rank} category={post.category} />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">{post.category}</span>
                  <ChevronRight className="h-3 w-3 text-[#94a3b8]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">{post.subcategory}</span>
                </div>
                <h3 className="text-[#0a0f2e] font-black text-lg leading-snug mb-2 group-hover:text-[#1a3c8f] transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
    </main>
  );
}
 



