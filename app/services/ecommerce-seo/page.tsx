"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, ShoppingBag, FileText, Link2, BarChart2, Award,
  Settings, ChevronDown, ChevronUp, Zap, Search,
} from "lucide-react";
 
/* ─── DATA ─── */
const stats = [
  { val: "+683%", lbl: "Organic traffic"   },
  { val: "+285%", lbl: "Revenue growth"    },
  { val: "200+",  lbl: "Keywords on P1"   },
  { val: "90d",   lbl: "To see results"   },
];
 
const painPoints = [
  {
    icon: TrendingUp,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The paid ads trap",
    title: "Burning Ad Budget With No Real Asset?",
    body:  "Every dollar on Google Shopping or Meta ads disappears the moment you pause. You're renting traffic you can never keep. Your competitors are building organic rankings that cost nothing to maintain.",
    stat:  "Avg. ecommerce PPC spend wasted: 62%",
  },
  {
    icon: Search,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The thin content problem",
    title: "Thousands of Product Pages Not Ranking?",
    body:  "Duplicate descriptions, boilerplate content, and near-identical product pages cause Google to ignore your entire catalog. One by one, we fix this at scale.",
    stat:  "Thin content causes 80% of ecommerce non-indexing",
  },
  {
    icon: BarChart2,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The indexation crisis",
    title: "Google Ignoring Most of Your Store?",
    body:  "Crawl budget issues, faceted navigation errors, and duplicate URLs mean Google only sees a fraction of your store. Every unindexed page is lost revenue.",
    stat:  "Top 3 organic results capture 68% of purchase clicks",
  },
];
 
const strengths = [
  { icon: ShoppingBag, title: "Product page optimization at scale", body: "Unique titles, meta descriptions, schema markup, and rich descriptions for every product — even across thousands of SKUs." },
  { icon: Settings,    title: "Technical SEO for Shopify & WooCommerce", body: "Crawl budget optimization, Core Web Vitals, faceted navigation handling, pagination, and canonicalization." },
  { icon: FileText,    title: "Category & collection page SEO",          body: "Category pages drive the most revenue — we optimize them with targeted copy, internal links, and structured data." },
  { icon: Zap,         title: "Product schema & rich results",            body: "Price, availability, ratings, and reviews in Google search results — higher click-through rates, more revenue." },
];
 
const process = [
  { week: "Week 1–2", title: "Full Store Audit",    body: "We audit every page type, crawl budget, indexation status, and competitor gap — building your custom roadmap.", icon: "🔍" },
  { week: "Week 3–4", title: "Technical Fixes",     body: "Core Web Vitals, crawl errors, canonical tags, sitemap cleanup — fixing the foundation so Google can index your store.", icon: "🔧" },
  { week: "Week 5–8", title: "Content at Scale",    body: "Product descriptions, category pages, buying guides, and blog content — all optimized for buyer-intent keywords.", icon: "✍️" },
  { week: "Week 9+",  title: "Revenue & Rankings",  body: "Products climb to page 1, revenue grows, GSC impressions multiply. Weekly reports every Monday.", icon: "📈" },
];
 
const beforeAfter = {
  before: [
    "7,000+ product pages not indexed",
    "0 page-1 keywords",
    "$6,000/mo on Google Shopping",
    "1.2% organic revenue share",
  ],
  after: [
    "6,800+ pages indexed & ranking",
    "200+ keywords on page 1",
    "$0 on Google Shopping",
    "68% organic revenue share",
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
 
const faqs = [
  {
    q: "Do you work with Shopify and WooCommerce?",
    a: "Yes — both platforms and more. We understand the specific technical quirks of Shopify (duplicate URLs, pagination, collection filters) and WooCommerce (plugin conflicts, crawl waste) at a deep level.",
  },
  {
    q: "How do you handle thousands of product pages?",
    a: "We use a batch-based approach — prioritizing high-revenue categories and brands first, then working through the catalog systematically. We've done this for stores with 50,000+ SKUs.",
  },
  {
    q: "How long before I see revenue impact?",
    a: "Most stores see indexation improvements in 30–45 days and ranking gains in 60–90 days. Revenue impact follows as rankings stabilize — typically visible by month 3.",
  },
  {
    q: "Can you fix our non-indexing problem?",
    a: "Yes — we've solved mass non-indexing for multiple stores. The root cause is usually thin/duplicate content. We fix it page by page and resubmit batches to GSC.",
  },
  {
    q: "Do you write product descriptions?",
    a: "Yes — unique, keyword-optimized descriptions for every product. We understand product niches and write content that satisfies both Google and your actual buyers.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. We earn your business every month with results. Most clients stay because they see clear revenue growth — not because they're locked in.",
  },
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
 
  return (
    <main className="bg-white">
 
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
 
            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#AFA9EC] bg-[#f5f3ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">
                  Ecommerce SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0f0f1a] sm:text-5xl lg:text-6xl">
                Turn Your Store Into<br />
                <span className="text-[#534AB7]">A Revenue Machine</span><br />
                Without Paid Ads
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#64748b] leading-relaxed">
                Crawl budget issues, thin content, and non-indexed pages are killing your organic revenue. We fix the root cause — then build a content engine that compounds month after month.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/30 transition-all hover:bg-[#3C3489] hover:shadow-[#534AB7]/50 hover:-translate-y-0.5"
                >
                  Get Free Store Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-study"
                  className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  See Case Study
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "Results in 90 days", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4 text-[#16a34a]" />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
 
            {/* Right — stats card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-slate-100">
                <div className="mb-1 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">Live results</span>
                </div>
                <p className="mb-4 text-sm font-semibold text-[#0f0f1a]">TacticalEdge Store — Chicago, IL</p>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.lbl} className="rounded-xl bg-[#f8fafc] p-4 text-center">
                      <div className="text-2xl font-black tracking-tight text-[#534AB7]">{s.val}</div>
                      <div className="mt-1 text-xs text-[#64748b]">{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f5f3ff] px-4 py-3">
                  <span className="text-xs font-medium text-[#534AB7]">Verified Google Search Console data</span>
                  <Shield className="h-4 w-4 text-[#534AB7]" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[{ icon: Shield, t: "100% Confidential" }, { icon: Clock, t: "24hr Turnaround" }, { icon: Star, t: "No Obligation" }].map(({ icon: Icon, t }) => (
                  <div key={t} className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs text-[#64748b]">
                    <Icon className="h-3.5 w-3.5 text-[#534AB7]" />{t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── PAIN POINTS ── */}
      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">We understand your frustration</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
              Your Store Deserves More Than<br />Paying Per Click Forever
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
            {painPoints.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
                <div style={{ backgroundColor: p.bg, borderBottom: `3px solid ${p.color}` }} className="p-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: p.color }}>{p.tag}</p>
                  <h3 className="text-lg font-black text-[#0f0f1a]">{p.title}</h3>
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
 
      {/* ── WHY SEARCHPREX ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Our ecommerce SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
                We Understand Your Niche<br />& Your Buyers' Journey
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#64748b] leading-relaxed">
                We don't apply generic SEO to ecommerce stores. We study how your customers search, what triggers them to buy, and which pages drive the most revenue — then we optimize for that specifically.
              </motion.p>
              <div className="space-y-5">
                {strengths.map((s) => (
                  <motion.div key={s.title} variants={fadeUp} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5f3ff]">
                      <s.icon className="h-5 w-5 text-[#534AB7]" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-[#0f0f1a]">{s.title}</h4>
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
                { color: "#16a34a", title: "GSC resubmission batches",          body: "After fixing content, we systematically resubmit pages to GSC in waves — accelerating indexation at scale." },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp}
                  style={{ borderLeftColor: item.color }}
                  className="rounded-r-xl border-l-4 bg-[#f8fafc] p-5">
                  <h4 className="mb-1.5 font-bold text-[#0f0f1a]">{item.title}</h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ── PROCESS ── */}
      <section className="bg-[#0f0f1a] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#818cf8]">How we work</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              From Audit to Revenue Growth in 90 Days
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#534AB7] text-sm font-black text-white">{i + 1}</div>
                  <span className="text-xs font-semibold text-[#818cf8]">{p.week}</span>
                </div>
                <div className="mb-1 text-2xl">{p.icon}</div>
                <h3 className="mb-2 font-black text-white">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── CASE STUDY ── */}
      <section id="case-study" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Real results · Verified GSC data</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
              TacticalEdge Store — +683% Traffic in 6 Months
            </motion.h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="mb-4 text-sm font-bold text-red-500 uppercase tracking-widest">Before SearchPrex</p>
              <div className="space-y-3">
                {beforeAfter.before.map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-[#374151]">
                    <X className="h-4 w-4 shrink-0 text-red-500" />{t}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <p className="mb-4 text-sm font-bold text-green-600 uppercase tracking-widest">After 6 months</p>
              <div className="space-y-3">
                {beforeAfter.after.map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm text-[#374151]">
                    <Check className="h-4 w-4 shrink-0 text-green-600" />{t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { val: "+683%", lbl: "Organic traffic",  color: "#534AB7" },
              { val: "+285%", lbl: "Revenue growth",   color: "#16a34a" },
              { val: "200+",  lbl: "Keywords on P1",   color: "#534AB7" },
              { val: "$0",    lbl: "Ad spend now",     color: "#16a34a" },
            ].map((s) => (
              <div key={s.lbl} className="rounded-xl border border-[#e2e8f0] bg-white p-5 text-center shadow-sm">
                <div className="text-3xl font-black tracking-tight" style={{ color: s.color }}>{s.val}</div>
                <div className="mt-1 text-xs text-[#64748b]">{s.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── SERVICES ── */}
      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Everything included</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
              What's in Your Ecommerce SEO Package
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
                  <h4 className="mb-1 font-bold text-[#0f0f1a]">{s.title}</h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Common questions</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
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
                  <span className="font-bold text-[#0f0f1a]">{f.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-[#534AB7] shrink-0" />
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
 
      {/* ── FINAL CTA ── */}
      <section className="bg-[#534AB7] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#c4b5fd]">Ready to grow?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Stop Renting Traffic.<br />Start Owning Revenue.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-[#c4b5fd] leading-relaxed">
              Get a free ecommerce SEO audit — the founder personally reviews your store, identifies your biggest indexation and content issues, and delivers a 90-day revenue growth plan within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#534AB7] shadow-lg transition-all hover:bg-[#f5f3ff] hover:-translate-y-0.5"
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
                <span key={t} className="flex items-center gap-2 text-sm text-[#c4b5fd]">
                  <Check className="h-4 w-4 text-[#86efac]" />{t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
 
    </main>
  );
}