"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, ShoppingBag, FileText, Link2, BarChart2,
  Settings, ChevronDown, ChevronUp, Zap, Search, Linkedin, BadgeCheck, Sparkles, Play, Youtube,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const GREY = "#eaecf3";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
const SMK_VIDEO = "gFod-dTY-bg";
 
/* ─── DATA ─── */
const stats = [
  { val: "+75%",  lbl: "US revenue (2 mo)" },
  { val: "+285%", lbl: "Indexing rate"     },
  { val: "12K+",  lbl: "Pages indexed"     },
  { val: "35K+",  lbl: "SKUs optimized"    },
];
 
const painPoints = [
  {
    icon: TrendingUp,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The paid ads trap",
    title: "Burning Ad Budget With No Real Asset?",
    body:  "Every dollar on Google Shopping or Meta ads disappears the moment you pause. You're renting traffic you can never keep — while competitors build organic rankings that cost nothing to maintain.",
    stat:  "Avg. ecommerce PPC spend wasted: 62%",
  },
  {
    icon: Search,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The thin content problem",
    title: "Thousands of Product Pages Not Ranking?",
    body:  "Duplicate descriptions, boilerplate content, and near-identical product pages cause Google's 2026 Helpful Content systems to ignore your entire catalog. We fix this at scale, brand by brand.",
    stat:  "Thin content causes 80% of ecommerce non-indexing",
  },
  {
    icon: BarChart2,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The indexation crisis",
    title: "Google Ignoring Most of Your Store?",
    body:  "Crawl budget issues, faceted navigation errors, and duplicate URLs mean Google only sees a fraction of your store. Every unindexed page is lost revenue, every single day.",
    stat:  "Top 3 organic results capture 68% of purchase clicks",
  },
];
 
const strengths = [
  { icon: ShoppingBag, title: "Product page optimization at scale", body: "Unique titles, meta descriptions, product schema, and rich descriptions for every product — proven across catalogs of 35,000+ SKUs." },
  { icon: Settings,    title: "Technical SEO for Shopify & WooCommerce", body: "Crawl budget optimization, Core Web Vitals (LCP/INP/CLS), faceted navigation handling, pagination, and canonicalization." },
  { icon: FileText,    title: "Category & collection page SEO",          body: "Category pages drive the most revenue — we optimize them with targeted copy, internal links, and structured data." },
  { icon: Zap,         title: "Product schema & rich results",            body: "Price, availability, ratings, and reviews shown directly in Google — higher click-through rates, more revenue." },
];
 
const process = [
  { week: "Week 1–2", title: "Full Store Audit",    body: "We audit every page type, crawl budget, indexation status, and competitor gap — building your custom roadmap.", icon: "🔍" },
  { week: "Week 3–4", title: "Technical Fixes",     body: "Core Web Vitals, crawl errors, canonical tags, sitemap cleanup — fixing the foundation so Google can index your store.", icon: "🔧" },
  { week: "Week 5–8", title: "Content at Scale",    body: "Unique product descriptions, category pages, buying guides — all written people-first for buyer-intent keywords.", icon: "✍️" },
  { week: "Week 9+",  title: "Revenue & Rankings",  body: "Products climb to page 1, revenue grows, GSC impressions multiply. Plain-English reports every Monday.", icon: "📈" },
];
 
const beforeAfter = {
  before: [
    "35,000+ products, near-zero indexed",
    "Thin templated boilerplate content",
    "Failing Core Web Vitals",
    "Stagnant US revenue",
  ],
  after: [
    "12,000+ product pages indexed",
    "Unique, brand-by-brand content",
    "Core Web Vitals 'Good' across catalog",
    "+75% US revenue in 2 months",
  ],
};
 
const services = [
  { icon: Settings,    title: "Technical SEO",          body: "Crawl budget, Core Web Vitals, faceted nav, duplicate content, sitemaps, and canonicals.",     color: "#534AB7", bg: "#f5f3ff" },
  { icon: ShoppingBag, title: "Product Page SEO",        body: "Unique descriptions, schema markup, title optimization, and internal linking at scale.",        color: "#0891b2", bg: "#ecfeff" },
  { icon: FileText,    title: "Category Page SEO",       body: "Targeted copy, FAQ sections, and structured data for your highest-revenue collection pages.",   color: "#059669", bg: "#ecfdf5" },
  { icon: Link2,       title: "Link Building",           body: "Niche-relevant backlinks, digital PR, and brand mentions that lift your entire domain authority.", color: "#d97706", bg: "#fffbeb" },
  { icon: BarChart2,   title: "Weekly GSC Reports",      body: "Impressions, clicks, indexed pages, and revenue data — plain-English every Monday.",            color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Star,        title: "AI & GEO Optimization",   body: "Get your products cited in ChatGPT, Perplexity, and Google AI Overviews for buying queries.",   color: "#be185d", bg: "#fdf2f8" },
];
 
/* March 2026 core update alignment — E-E-A-T helpful content */
const coreUpdate2026 = [
  { title: "People-First Product Content", body: "Google's 2026 Helpful Content systems reward content written for shoppers, not search engines. We write unique descriptions that genuinely help buyers decide — never mass-produced filler." },
  { title: "Real Experience (the extra 'E')", body: "Every product page demonstrates first-hand experience — real specs, real use cases, honest comparisons — the experience signal Google now weighs heavily in YMYL and commercial queries." },
  { title: "Entity & Schema Clarity", body: "Structured Product, Review, and Brand schema so Google (and AI Overviews) understand exactly what you sell, who makes it, and why it's trustworthy." },
  { title: "Site Reputation & Authority", body: "We strengthen topical authority around your categories so your store is treated as a genuine destination — not a thin affiliate-style catalog the core update demotes." },
];
 
const faqs = [
  { q: "Do you work with Shopify and WooCommerce?", a: "Yes — both platforms and more. We understand the specific technical quirks of Shopify (duplicate URLs, pagination, collection filters) and WooCommerce (plugin conflicts, crawl waste) at a deep level." },
  { q: "How do you handle thousands of product pages?", a: "We use a batch-based approach — prioritizing high-revenue categories and brands first, then working through the catalog systematically. We've done this on a live 35,000+ SKU store (SMK Store, USA)." },
  { q: "How long before I see revenue impact?", a: "Most stores see indexation improvements in 30–45 days and ranking gains in 60–90 days. SMK Store saw +75% US revenue within 2 months of our content and technical work." },
  { q: "Can you fix our non-indexing problem?", a: "Yes — we've solved mass non-indexing for multiple stores. The root cause is usually thin/duplicate content. We rewrite it brand by brand and resubmit batches to GSC in waves." },
  { q: "Is your content aligned with Google's 2026 core updates?", a: "Completely. Every page follows Google's people-first, E-E-A-T, and Helpful Content guidelines — original, experience-driven content, never written to word counts or stuffed with keywords." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results. Most clients stay because they see clear revenue growth — not because they're locked in." },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
/* ─── PAGE ─── */
export default function EcommerceSEO() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
 
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── HERO — grey ── */}
      <section className="relative overflow-hidden bg-[#eaecf3] pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
 
            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest shadow-sm" style={{ borderColor: "#cbeadd", color: GREEN_DARK }}>
                  <ShoppingBag className="h-3.5 w-3.5" /> Ecommerce SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Turn Your Store Into<br />
                <span style={{ color: GREEN }}>A Revenue Machine</span><br />
                Without Paid Ads
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#475569] leading-relaxed">
                Crawl budget issues, thin content, and non-indexed pages are killing your organic revenue. We fix the root cause — then build a people-first content engine that compounds month after month, fully aligned with Google&apos;s 2026 core updates.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN, boxShadow: "0 10px 25px -5px rgba(62,180,137,0.4)" }}
                >
                  Get Free Store Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-study"
                  className="flex items-center gap-2 rounded-xl border border-[#cbd0db] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#3eb489] hover:text-[#2f9670]"
                >
                  See Case Study
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "Results in 90 days", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4" style={{ color: GREEN }} />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
 
            {/* Right — stats card (SMK Store, real) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-1 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">Live results</span>
                </div>
                <p className="mb-4 text-sm font-semibold text-[#0a0f2e]">SMK Store — United States</p>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.lbl} className="rounded-xl bg-[#f8fafc] p-4 text-center">
                      <div className="text-2xl font-black tracking-tight" style={{ color: GREEN_DARK }}>{s.val}</div>
                      <div className="mt-1 text-xs text-[#64748b]">{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "rgba(62,180,137,0.1)" }}>
                  <span className="text-xs font-medium" style={{ color: GREEN_DARK }}>Verified Google Search Console data</span>
                  <Shield className="h-4 w-4" style={{ color: GREEN_DARK }} />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[{ icon: Shield, t: "100% Confidential" }, { icon: Clock, t: "24hr Turnaround" }, { icon: Star, t: "No Obligation" }].map(({ icon: Icon, t }) => (
                  <div key={t} className="flex items-center gap-1.5 rounded-full border border-[#cbd0db] bg-white px-3 py-1.5 text-xs text-[#64748b]">
                    <Icon className="h-3.5 w-3.5" style={{ color: GREEN_DARK }} />{t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── PAIN POINTS — white ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>We understand your frustration</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Your Store Deserves More Than<br />Paying Per Click Forever
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
            {painPoints.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
                <div style={{ backgroundColor: p.bg, borderBottom: `3px solid ${p.color}` }} className="p-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: p.color }}>{p.tag}</p>
                  <h3 className="text-lg font-black text-[#0a0f2e]">{p.title}</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-sm text-[#64748b] leading-relaxed">{p.body}</p>
                  <div className="rounded-lg bg-[#f8fafc] px-4 py-3 text-xs font-medium text-[#374151]">{p.stat}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── WHY SEARCHPREX — grey ── */}
      <section className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Our ecommerce SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                We Understand Your Niche<br />&amp; Your Buyers&apos; Journey
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#475569] leading-relaxed">
                We don&apos;t apply generic SEO to ecommerce stores. We study how your customers search, what triggers them to buy, and which pages drive the most revenue — then optimize for that specifically.
              </motion.p>
              <div className="space-y-5">
                {strengths.map((s) => (
                  <motion.div key={s.title} variants={fadeUp} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(62,180,137,0.12)" }}>
                      <s.icon className="h-5 w-5" style={{ color: GREEN_DARK }} />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-[#0a0f2e]">{s.title}</h4>
                      <p className="text-sm text-[#64748b] leading-relaxed">{s.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
 
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
              {[
                { color: "#534AB7", title: "Brand & category page authority", body: "We build topical authority around your product categories — so Google sees you as the definitive source in your niche." },
                { color: "#0891b2", title: "Internal linking at scale",         body: "Strategic internal links that pass authority from high-ranking pages to your product and category pages." },
                { color: "#d97706", title: "Buying guide content",              body: "Long-form buying guides that capture high-intent shoppers before they even reach product pages." },
                { color: GREEN,     title: "GSC resubmission batches",          body: "After fixing content, we systematically resubmit pages to GSC in waves — accelerating indexation at scale." },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp}
                  style={{ borderLeftColor: item.color }}
                  className="rounded-r-xl border-l-4 bg-white p-5 shadow-sm">
                  <h4 className="mb-1.5 font-bold text-[#0a0f2e]">{item.title}</h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── GOOGLE 2026 CORE UPDATE SECTION (NEW) ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.span variants={fadeUp} className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
              <Sparkles className="h-3.5 w-3.5" /> Built for Google&apos;s 2026 Core Updates
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              SEO That Survives Every<br />Algorithm Update
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-base text-[#475569] leading-relaxed">
              Cheap, mass-produced SEO gets wiped out with every core update. Our work is built on the exact signals Google rewards in 2026 — so your rankings compound instead of collapse.
            </motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 sm:grid-cols-2">
            {coreUpdate2026.map((c) => (
              <motion.div key={c.title} variants={fadeUp} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6">
                <div className="mb-3 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5" style={{ color: GREEN_DARK }} />
                  <h3 className="font-black text-[#0a0f2e]">{c.title}</h3>
                </div>
                <p className="text-sm text-[#64748b] leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── PROCESS — dark navy ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>How we work</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              From Audit to Revenue Growth in 90 Days
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: GREEN }}>{i + 1}</div>
                  <span className="text-xs font-semibold" style={{ color: GREEN }}>{p.week}</span>
                </div>
                <div className="mb-1 text-2xl">{p.icon}</div>
                <h3 className="mb-2 font-black text-white">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── CASE STUDY — Toptal-style video + Challenge/Solution/Outcome ── */}
      <section id="case-study" className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Featured case study · Verified GSC data</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              How We Grew SMK Store&apos;s US Revenue by 75%
            </motion.h2>
          </motion.div>
 
          {/* Two-column: video left, content right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm lg:grid-cols-2"
          >
            {/* LEFT — video */}
            <div
              className="group relative min-h-[300px] cursor-pointer bg-[#0a0f2e] lg:min-h-full"
              onClick={() => setVideoOpen(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${SMK_VIDEO}/maxresdefault.jpg`}
                alt="SMK Store SEO case study — real GSC performance walkthrough"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${SMK_VIDEO}/hqdefault.jpg`; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-[#0a0f2e]/20 to-transparent" />
              {/* YouTube badge */}
              <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: GREEN }}>
                <Youtube className="h-3 w-3" /> Watch on YouTube
              </div>
              {/* Play button */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-lg transition-all group-hover:scale-110" style={{ background: GREEN }}>
                  <Play className="ml-1 h-7 w-7 fill-white text-white" />
                </div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                <p className="text-sm font-bold text-white">SMK Store — United States</p>
                <p className="text-xs text-white/70">Live GSC screen recording · Tactical gear · 35,000+ SKUs</p>
              </div>
            </div>
 
            {/* RIGHT — Challenge / Solution / Outcome */}
            <div className="p-8 lg:p-10">
              <h3 className="mb-6 text-xl font-black leading-snug text-[#0a0f2e]">
                +75% revenue in 2 months by fixing mass non-indexing across a 35,000-product catalog.
              </h3>
 
              <div className="space-y-5">
                <div>
                  <p className="mb-1 text-sm font-bold" style={{ color: "#ef4444" }}>Challenge</p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    SMK Store&apos;s 35,000+ product pages were barely indexed. Thin, near-identical boilerplate descriptions triggered Google&apos;s duplicate-content filters, Core Web Vitals were failing, and US organic revenue had stalled.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold" style={{ color: GREEN_DARK }}>Solution</p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    We rewrote product content brand by brand with unique, people-first descriptions, optimized crawl budget, implemented product schema, fixed Core Web Vitals, and resubmitted pages to GSC in batches — all aligned with Google&apos;s 2026 Helpful Content standards.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold" style={{ color: "#534AB7" }}>Outcome</p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    Indexing rate jumped +285%, over 12,000 product pages got indexed and started ranking, and US revenue grew 75% within two months — with no additional ad spend. All verified via Google Search Console.
                  </p>
                </div>
              </div>
 
              {/* metric chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { v: "+75%", l: "US revenue" },
                  { v: "+285%", l: "Indexing rate" },
                  { v: "12K+", l: "Pages indexed" },
                ].map((m) => (
                  <span key={m.l} className="inline-flex items-baseline gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: "rgba(62,180,137,0.3)", background: "rgba(62,180,137,0.08)", color: GREEN_DARK }}>
                    <span className="text-sm font-black">{m.v}</span> {m.l}
                  </span>
                ))}
              </div>
 
              <button
                onClick={() => setVideoOpen(true)}
                className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                <Play className="h-4 w-4 fill-white" /> Watch Full Case Study
              </button>
            </div>
          </motion.div>
 
          <div className="mt-6 text-center">
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5" style={{ color: GREEN_DARK }}>
              See all case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── AUTHOR / E-E-A-T (Mubashar) ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] p-8 sm:flex sm:items-center sm:gap-8"
          >
            <div className="relative mx-auto mb-6 h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[#534AB7] shadow-md sm:mb-0">
              <Image
                src="/images/mubashar-shahzad.jpg"
                alt="Mubashar Shahzad — Founder & Lead Ecommerce SEO Strategist at SearchPrex"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-black text-[#0a0f2e]">Mubashar Shahzad</h3>
                <span className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                  <BadgeCheck className="h-3 w-3" /> Verified SEO Expert
                </span>
              </div>
              <p className="mb-3 text-sm font-semibold text-[#534AB7]">Founder &amp; Lead Ecommerce SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                &quot;Ecommerce SEO is what I do every single day. I personally fixed mass non-indexing on SMK Store&apos;s 35,000-product catalog and grew their US revenue 75% in two months — using real GSC data, brand-by-brand unique content, and people-first work that holds up to every Google core update. When you work with SearchPrex, you work directly with me.&quot;
              </p>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#0a66c2] transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>
 
      {/* ── SERVICES — grey ── */}
      <section className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Everything included</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              What&apos;s in Your Ecommerce SEO Package
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <motion.div key={s.title} variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: s.bg }}>
                  <s.icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-[#0a0f2e]">{s.title}</h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── FAQ — white ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Common questions</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Ecommerce SEO — Your Questions Answered
            </motion.h2>
          </motion.div>
          <div className="divide-y divide-[#e2e8f0] rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#f8fafc]"
                >
                  <span className="font-bold text-[#0a0f2e]">{f.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 shrink-0" style={{ color: GREEN_DARK }} />
                    : <ChevronDown className="h-4 w-4 text-[#64748b] shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-[#64748b] leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FINAL CTA — dark navy + green ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>Ready to grow?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Stop Renting Traffic.<br />Start Owning Revenue.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70 leading-relaxed">
              Get a free ecommerce SEO audit — the founder personally reviews your store, identifies your biggest indexation and content issues, and delivers a 90-day revenue growth plan within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Get Free Store Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +92 310 652 6316
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6">
              {["24hr turnaround", "No contracts", "Founder does the audit"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm text-white/60">
                  <Check className="h-4 w-4" style={{ color: GREEN }} />{t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
 
          {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${SMK_VIDEO}?autoplay=1&rel=0&modestbranding=1`}
                title="SMK Store SEO case study"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
 
    </main>
  );
}
 












































