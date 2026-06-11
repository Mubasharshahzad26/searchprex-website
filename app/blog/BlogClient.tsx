"use client";
 
// app/blog/BlogClient.tsx
// Toptal-style blog listing:
// - One large FEATURED card + compact cards grid (like Toptal's "Trending
//   Publications" — big card left, light cards right)
// - Compact bylines ("By Mubashar Shahzad ✓") instead of a heavy bio block
//   on every card; full bio only on the featured card
// - Search + voice search, category filter, newsletter — all preserved
// - Fake pagination removed (6 posts don't need it); audit CTA added (CRO)
 
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Clock, ChevronRight, ArrowRight, TrendingUp, Settings, MapPin,
  ShoppingCart, Link2, FileText, CheckCircle, Mail, Mic, MicOff, BarChart3,
} from "lucide-react";
import { categories as categoryData, posts, mostRead, type Post } from "./data";
 
const GREEN = "#3eb489";
 
const categoryIcons: Record<string, any> = {
  "Technical SEO": Settings,
  "On-Page SEO": FileText,
  "Local SEO": MapPin,
  "E-commerce SEO": ShoppingCart,
  "Link Building": Link2,
  "Content Strategy": TrendingUp,
};
 
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
 
/* Compact byline — Toptal-style "By Author" */
function Byline({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full bg-[#534AB7] flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-[10px]">M</span>
      </div>
      <span className="text-xs text-[#64748b]">By</span>
      <span className="text-xs font-bold text-[#0a0f2e]">{post.author.name}</span>
      <CheckCircle className="h-3.5 w-3.5 text-[#534AB7]" />
    </div>
  );
}
 
export default function BlogClient() {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const postsRef = useRef<HTMLElement>(null);
  const recognitionRef = useRef<any>(null);
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setVoiceSupported(!!SpeechRecognition);
    }
  }, []);
 
  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      setTimeout(() => { postsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 300);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };
 
  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      setTimeout(() => { postsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 200);
    }
  };
 
  const filtered = posts.filter((p) => {
    const matchQ = query === "" || p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchC = activeCategory === "All" || p.category === activeCategory;
    return matchQ && matchC;
  });
 
  const isFiltering = activeCategory !== "All" || query !== "";
  const featuredPost = posts.find((p) => p.featured);
  const compactPosts = isFiltering ? filtered : posts.filter((p) => !p.featured);
 
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formspree.io/f/mqejawpd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "New Blog Subscriber — SearchPrex" }),
      });
      setSubscribed(true); setEmail("");
    } catch { setSubscribed(true); }
  };
 
  return (
    <main className="bg-transparent min-h-screen">
 
      {/* ── 01 HERO ── */}
      <section className="bg-[#eeeef5] relative overflow-hidden pt-28 pb-0">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0f2e] mb-5 leading-tight">SearchPrex Blog</h1>
            <p className="text-lg text-[#64748b] max-w-2xl mb-8 leading-relaxed">
              Founder-written SEO guides on Technical SEO, E-commerce, Local SEO, and Content Strategy — built for practitioners, not beginners.
            </p>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center gap-2 border border-[#e5e7eb] bg-white rounded-lg px-4 py-2 text-[#64748b] text-sm">
                <span>🔗</span>
                <span className="font-semibold text-[#0a0f2e]">4.2K SHARES</span>
              </div>
            </div>
          </motion.div>
 
          {/* Search bar */}
          <div className="relative max-w-4xl">
            <div className={`flex items-center bg-white rounded-t-xl overflow-hidden shadow-2xl transition-all ${isListening ? "ring-2 ring-red-400" : ""}`}>
              <div className="pl-5 pr-3 text-[#94a3b8]"><Search className="h-5 w-5" /></div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={isListening ? "🎙️ Listening..." : "What are you looking for?"}
                className="flex-1 py-5 pr-3 text-lg text-[#0a0f2e] placeholder-[#94a3b8] outline-none font-medium"
              />
              {query && !isListening && (
                <button onClick={() => setQuery("")} className="px-3 text-[#94a3b8] hover:text-[#0a0f2e] text-sm">Clear</button>
              )}
              <div className="w-px h-6 bg-[#e5e7eb] mx-1" />
              {voiceSupported && (
                <button onClick={handleVoiceSearch} title={isListening ? "Stop listening" : "Search by voice"}
                  className={`px-4 py-5 transition-all flex items-center gap-1.5 text-sm font-medium ${isListening ? "text-red-500 animate-pulse" : "text-[#534AB7] hover:text-[#3d35a0]"}`}>
                  {isListening ? <><MicOff className="h-5 w-5" /><span className="text-xs hidden sm:inline">Stop</span></> : <><Mic className="h-5 w-5" /><span className="text-xs hidden sm:inline">Voice</span></>}
                </button>
              )}
            </div>
            {query && (
              <div className="bg-white border-t border-[#f1f5f9] px-5 py-2 text-xs text-[#64748b] rounded-b-xl">
                {filtered.length === 0 ? `No results for "${query}"` : `${filtered.length} article${filtered.length !== 1 ? "s" : ""} found for "${query}"`}
              </div>
            )}
          </div>
        </div>
      </section>
 
      {/* ── 02 CATEGORIES (Toptal skillsets-style bordered grid) ── */}
      <section className="bg-[#eeeef5] border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e5e7eb] rounded-xl overflow-hidden">
            {categoryData.map((cat, i) => {
              const Icon = categoryIcons[cat.label] || Settings;
              return (
                <button key={cat.slug}
                  onClick={() => { setActiveCategory(activeCategory === cat.label ? "All" : cat.label); setTimeout(() => postsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200); }}
                  className={`text-left p-8 border-[#e5e7eb] transition-all hover:bg-white group ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 === 0 ? "sm:border-r lg:border-r-0" : ""} ${i < 4 ? "border-b" : ""} ${i % 3 !== 2 && i < 3 ? "lg:border-r" : ""} ${activeCategory === cat.label ? "bg-white shadow-inner" : "bg-[#eeeef5]"}`}
                >
                  <Icon className={`h-7 w-7 mb-4 transition-colors ${activeCategory === cat.label ? "text-[#534AB7]" : "text-[#94a3b8] group-hover:text-[#1a3c8f]"}`} />
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${activeCategory === cat.label ? "text-[#534AB7]" : "text-[#0a0f2e]"}`}>{cat.label}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{cat.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ── 03 NEWSLETTER ── */}
      <section className="bg-[#eeeef5] py-14 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl font-black text-[#0a0f2e] max-w-sm leading-tight">Expert SEO insights, delivered weekly.</h2>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-lg">
                <CheckCircle className="h-6 w-6" />
                You&apos;re subscribed — check your inbox!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0 w-full max-w-lg">
                <div className="flex items-center bg-white rounded-l-xl flex-1 px-4 border border-[#e5e7eb]">
                  <Mail className="h-4 w-4 text-[#94a3b8] mr-2 flex-shrink-0" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                    className="flex-1 py-4 text-[#0a0f2e] placeholder-[#94a3b8] outline-none text-sm" />
                </div>
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-4 rounded-r-xl transition-colors text-sm whitespace-nowrap">
                  Sign Me Up
                </button>
              </form>
            )}
          </div>
          <p className="text-[#94a3b8] text-xs mt-4">
            By entering your email, you agree to our{" "}
            <Link href="/privacy" className="underline hover:text-[#64748b]">privacy policy</Link>.
          </p>
        </div>
      </section>
 
      {/* ── 04 POSTS — Toptal trending layout: featured + compact grid ── */}
      <section ref={postsRef} id="posts-grid" className="py-20 bg-[#eeeef5] scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isFiltering && (
            <div className="flex items-center gap-3 mb-10 flex-wrap">
              {query && (
                <div className="flex items-center gap-2 bg-[#f1f5f9] text-[#64748b] px-4 py-1.5 rounded-full text-sm font-semibold">
                  🔍 &quot;{query}&quot; <button onClick={() => setQuery("")} className="ml-1 hover:opacity-70">×</button>
                </div>
              )}
              {activeCategory !== "All" && (
                <div className="flex items-center gap-2 bg-[#EEEDFE] text-[#534AB7] px-4 py-1.5 rounded-full text-sm font-semibold">
                  {activeCategory} <button onClick={() => setActiveCategory("All")} className="ml-1 hover:opacity-70">×</button>
                </div>
              )}
              <span className="text-sm text-[#94a3b8]">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}
 
          {isFiltering && filtered.length === 0 ? (
            <div className="text-center py-20 text-[#64748b]">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg mb-2">No articles found for &quot;<strong>{query}</strong>&quot;</p>
              <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="text-[#534AB7] text-sm font-semibold hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 
              {/* FEATURED (large, Toptal-style — only when not filtering) */}
              {!isFiltering && featuredPost && (
                <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="lg:row-span-2 flex flex-col bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-all">
                  <Link href={`/blog/${featuredPost.slug}`} className="block aspect-[16/10] overflow-hidden hover:opacity-90 transition-opacity">
                    <BlogImage category={featuredPost.category} />
                  </Link>
                  <div className="flex flex-col flex-1 p-7">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">{featuredPost.category}</span>
                      <ChevronRight className="h-3 w-3 text-[#94a3b8]" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">{featuredPost.subcategory}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-[#0a0f2e] font-black text-2xl leading-snug mb-4 hover:text-[#1a3c8f] transition-colors">{featuredPost.title}</h2>
                    </Link>
                    <p className="text-[#64748b] text-sm leading-relaxed mb-5">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-[#94a3b8] text-xs font-semibold uppercase tracking-wide mb-6">
                      <Clock className="h-3.5 w-3.5" />{featuredPost.readTime}
                    </div>
                    {/* Full author bio — featured card only (E-E-A-T) */}
                    <div className="mt-auto border-t border-[#e5e7eb] pt-5">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#534AB7] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-bold text-[#0a0f2e]">{featuredPost.author.name}</span>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#534AB7]">
                              <CheckCircle className="h-3.5 w-3.5" /> {featuredPost.author.role}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">{featuredPost.authorBio}</p>
                        </div>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-[#1a3c8f] text-sm font-bold uppercase tracking-wide hover:gap-2 transition-all">
                      Continue Reading <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              )}
 
              {/* COMPACT CARDS (light, Toptal-style) */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${!isFiltering && featuredPost ? "lg:col-span-2" : "lg:col-span-3 lg:grid-cols-3"}`}>
                {compactPosts.map((post, i) => (
                  <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex flex-col bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-all">
                    <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden hover:opacity-90 transition-opacity">
                      <BlogImage category={post.category} />
                    </Link>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">{post.category}</span>
                        <ChevronRight className="h-3 w-3 text-[#94a3b8]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#534AB7]">{post.subcategory}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-[#0a0f2e] font-black text-base leading-snug mb-3 hover:text-[#1a3c8f] transition-colors">{post.title}</h2>
                      </Link>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <Byline post={post} />
                        <div className="flex items-center gap-1.5 text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap">
                          <Clock className="h-3.5 w-3.5" />{post.readTime}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
 
          {/* ── Audit CTA (CRO) — reader is a hand-raiser ── */}
          <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center">
            <p className="text-xl font-black text-[#0a0f2e]">Reading about the problem? We fix it for a living.</p>
            <p className="max-w-xl text-sm text-[#64748b]">
              Get a free, founder-reviewed SEO audit of your site — with a 90-day roadmap, within 24 hours.
            </p>
            <Link href="/free-audit"
              className="group mt-2 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: GREEN }}>
              <BarChart3 className="h-4 w-4" /> Get Free SEO Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── 05 MOST READ ── */}
      <section className="py-20 bg-[#eeeef5] border-t border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#0a0f2e] mb-10">Most-read Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mostRead.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-[#e5e7eb] p-5 hover:shadow-lg transition-all">
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 relative">
                  <BlogImage rank={post.rank} category={post.category} />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">{post.category}</span>
                  <ChevronRight className="h-3 w-3 text-[#94a3b8]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">{post.subcategory}</span>
                </div>
                <h3 className="text-[#0a0f2e] font-black text-lg leading-snug mb-2 group-hover:text-[#1a3c8f] transition-colors">{post.title}</h3>
                <div className="flex items-center gap-1.5 text-[#94a3b8] text-xs font-semibold uppercase tracking-wide">
                  <Clock className="h-3.5 w-3.5" />{post.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
    </main>
  );
}
 