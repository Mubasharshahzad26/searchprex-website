
"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, Settings, FileText, Link2, BarChart2,
  ChevronDown, ChevronUp, Zap, Search, AlertTriangle, Code,
} from "lucide-react";
 
/* ─── DATA ─── */
const heroStats = [
  { val: "+476%", lbl: "Impressions boost"   },
  { val: "3.85K", lbl: "Pages indexed"       },
  { val: "92",    lbl: "PageSpeed score"     },
  { val: "48hr",  lbl: "Audit turnaround"    },
];
 
const painPoints = [
  {
    icon: AlertTriangle,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The indexation crisis",
    title: "Google Ignoring Thousands of Your Pages?",
    body:  "Near-identical boilerplate content, crawl budget waste, and poor site architecture mean Google skips most of your site. Every unindexed page is invisible — and costs you real revenue every day.",
    stat:  "80% of non-indexing is caused by thin or duplicate content",
  },
  {
    icon: Zap,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The speed problem",
    title: "Slow Site Killing Your Rankings?",
    body:  "Google's Core Web Vitals directly impact your rankings. A site that loads in 4 seconds loses 25% of visitors before they even see your content — and gets penalized in search results.",
    stat:  "1-second delay = 7% conversion rate drop",
  },
  {
    icon: Code,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The structural breakdown",
    title: "Broken Architecture Confusing Google?",
    body:  "Broken internal links, missing canonical tags, incorrect redirects, and schema errors send mixed signals to Google. The result: lower rankings, wasted crawl budget, and confused bots.",
    stat:  "Technical errors affect 65% of websites audited",
  },
];
 
const strengths = [
  { icon: Search,       title: "Deep crawl & log file analysis",       body: "We crawl your entire site the way Google does — identifying every crawl error, redirect chain, orphan page, and indexation issue before fixing them." },
  { icon: Zap,          title: "Core Web Vitals optimization",          body: "LCP, INP, and CLS — we diagnose and fix every performance issue affecting your Google rankings and user experience." },
  { icon: Code,         title: "Schema markup & structured data",       body: "JSON-LD schema for every page type — products, articles, FAQs, local business, and more — maximizing rich results in search." },
  { icon: Settings,     title: "Site architecture & internal linking",  body: "Strategic information architecture and internal linking that distribute authority to your most important pages efficiently." },
];
 
const process = [
  { week: "Week 1",   title: "Full Site Crawl",      body: "We crawl every URL, analyze log files, and map every technical issue — building a prioritized fix list by revenue impact.",   icon: "🔍" },
  { week: "Week 2",   title: "Priority Fixes",       body: "Critical issues first — indexation blocks, canonical errors, redirect chains, and Core Web Vitals that are actively hurting rankings.", icon: "🔧" },
  { week: "Week 3–4", title: "Schema & Structure",   body: "JSON-LD schema across all page types, internal linking improvements, and site architecture optimization.",                    icon: "🏗️" },
  { week: "Week 5+",  title: "Monitor & Improve",    body: "GSC monitoring, crawl re-analysis, and continuous fixes as your site evolves — technical SEO is never one-and-done.",          icon: "📊" },
];
 
const caseStudies = [
  {
    badge: "Ecommerce",
    badgeColor: "#0891b2",
    badgeBg:   "#ecfeff",
    city:  "Chicago, IL · 90 days",
    name:  "TacticalEdge Store",
    before: ["7,000+ pages not indexed", "LCP score: 8.2s", "Duplicate content sitewide", "0 rich results"],
    after:  ["6,800+ pages indexed", "LCP score: 1.4s", "Unique content per product", "400+ rich results active"],
    stats: [
      { val: "+476%", lbl: "Impressions",  color: "#534AB7" },
      { val: "1.4s",  lbl: "LCP score",   color: "#16a34a" },
      { val: "6.8K",  lbl: "Pages indexed", color: "#534AB7" },
      { val: "92",    lbl: "Speed score",  color: "#16a34a" },
    ],
  },
  {
    badge: "Local Business",
    badgeColor: "#d97706",
    badgeBg:   "#fffbeb",
    city:  "Michigan · 60 days",
    name:  "Michigan Sports Outdoor",
    before: ["Sitemap not submitted", "1,000 brand pages ignored", "No schema markup", "Crawl budget wasted"],
    after:  ["All sitemaps submitted to GSC", "Brand pages indexing", "Full schema implemented", "Crawl budget optimized"],
    stats: [
      { val: "+476%", lbl: "Clicks",      color: "#534AB7" },
      { val: "3.85K", lbl: "Indexed",    color: "#16a34a" },
      { val: "6.49K", lbl: "Impressions", color: "#534AB7" },
      { val: "4.1%",  lbl: "CTR",        color: "#16a34a" },
    ],
  },
  {
    badge: "Law Firm",
    badgeColor: "#534AB7",
    badgeBg:   "#f5f3ff",
    city:  "Dallas, TX · 45 days",
    name:  "Morrison Family Law",
    before: ["No schema markup", "Poor mobile experience", "Broken internal links", "Missing meta data"],
    after:  ["Attorney + FAQ schema", "Mobile score: 94", "All links fixed & mapped", "Full meta optimization"],
    stats: [
      { val: "#1",    lbl: "Dallas Law",  color: "#534AB7" },
      { val: "94",    lbl: "Mobile score", color: "#16a34a" },
      { val: "+75%",  lbl: "Visibility",  color: "#534AB7" },
      { val: "6wks",  lbl: "To rank #1", color: "#16a34a" },
    ],
  },
];
 
const services = [
  { icon: Search,       title: "Technical SEO Audit",           body: "Full crawl analysis — indexation, redirects, canonicals, orphan pages, crawl budget, and log file review.",            color: "#534AB7", bg: "#f5f3ff" },
  { icon: Zap,          title: "Core Web Vitals (LCP/INP/CLS)", body: "Diagnose and fix all performance issues impacting your Google rankings and real user experience.",                        color: "#0891b2", bg: "#ecfeff" },
  { icon: Code,         title: "Schema & Structured Data",      body: "JSON-LD markup for every page type — products, FAQs, local business, articles, breadcrumbs, and reviews.",               color: "#059669", bg: "#ecfdf5" },
  { icon: Settings,     title: "Site Architecture",             body: "Information architecture audit, silo structure, internal linking strategy, and crawl depth optimization.",                color: "#d97706", bg: "#fffbeb" },
  { icon: AlertTriangle,title: "Indexation & Crawl Budget",     body: "Identify and fix every reason Google ignores your pages — robots.txt, noindex tags, and duplicate content at scale.",     color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Link2,        title: "Redirect & Canonical Audit",    body: "Redirect chain cleanup, canonical tag implementation, and hreflang setup for multi-language or multi-region sites.",      color: "#be185d", bg: "#fdf2f8" },
];
 
const faqs = [
  {
    q: "How is a technical SEO audit different from a general SEO audit?",
    a: "A technical SEO audit focuses exclusively on how your website is built and configured — crawlability, indexability, site speed, structured data, and architecture. It doesn't cover content or links. We often find that technical issues are the root cause of ranking problems even when content is good.",
  },
  {
    q: "My site has thousands of pages — can you handle that?",
    a: "Yes — large-scale technical SEO is our specialty. We've audited and fixed sites with 50,000+ pages. We use prioritization frameworks to tackle the highest-impact issues first, working in batches to maximize indexation gains quickly.",
  },
  {
    q: "What are Core Web Vitals and why do they matter?",
    a: "Core Web Vitals (LCP, INP, CLS) are Google's user experience metrics that directly impact search rankings. LCP measures loading speed, INP measures interactivity, CLS measures visual stability. Poor scores hurt your rankings — we diagnose and fix all three.",
  },
  {
    q: "How quickly will I see results from technical fixes?",
    a: "Critical fixes like resolving indexation blocks can show GSC improvements in 2–4 weeks after Googlebot recrawls. Core Web Vitals improvements show up in Google's data within 28 days of deployment.",
  },
  {
    q: "Do you work with Shopify, WordPress, and custom sites?",
    a: "Yes — all platforms. We understand the specific technical quirks of Shopify (faceted nav, duplicate URLs), WordPress (plugin conflicts, bloat), and custom-built sites. Platform-agnostic technical SEO.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. We earn your business every month with results. Technical SEO has a clear audit-and-fix phase, and we're happy to work on a project or monthly retainer basis depending on your needs.",
  },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
/* ─── PAGE ─── */
export default function TechnicalSEO() {
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
                  Technical SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0f0f1a] sm:text-5xl lg:text-6xl">
                Fix the Foundation.<br />
                <span className="text-[#534AB7]">Make Google</span><br />
                Love Your Site.
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#64748b] leading-relaxed">
                Crawl budget waste, indexation blocks, slow Core Web Vitals, and broken architecture are silently destroying your rankings. We diagnose every technical issue and fix them — systematically, at scale.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/30 transition-all hover:bg-[#3C3489] hover:shadow-[#534AB7]/50 hover:-translate-y-0.5"
                >
                  Get Free Technical Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-studies"
                  className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  See Case Studies
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "48hr audit delivery", "Founder works your account"].map((t) => (
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
                <p className="mb-4 text-sm font-semibold text-[#0f0f1a]">Michigan Sports Outdoor — 90 days</p>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {heroStats.map((s) => (
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
                {[{ icon: Shield, t: "100% Confidential" }, { icon: Clock, t: "48hr Audit Delivery" }, { icon: Star, t: "No Obligation" }].map(({ icon: Icon, t }) => (
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
              Good Content. Bad Rankings.<br />Technical Issues Are Why.
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
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Our technical SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
                We Don't Just Find Issues.<br />We Fix Them at Scale.
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#64748b] leading-relaxed">
                Most agencies hand you a 200-page report and call it a day. We give you a prioritized fix list and implement every change — from crawl budget optimization to Core Web Vitals to schema markup — all done for you.
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
                { color: "#534AB7", title: "Screaming Frog + GSC + log files",   body: "We use the industry's best tools — Screaming Frog, Google Search Console, Ahrefs, and server log analysis — to find every issue other agencies miss." },
                { color: "#0891b2", title: "Prioritized by revenue impact",       body: "Not all technical issues matter equally. We fix the ones that will move your rankings and revenue first — not waste time on cosmetic issues." },
                { color: "#d97706", title: "Large-scale indexation recovery",     body: "We've recovered sites with 50,000+ non-indexed pages. Batch content fixes + GSC resubmission waves = rapid indexation gains." },
                { color: "#16a34a", title: "Implementation included",             body: "We don't just audit. We implement every fix directly on your site or guide your developer with exact code-level instructions." },
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
              Audit to Implementation in 4 Weeks
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
 
      {/* ── CASE STUDIES (3 cards) ── */}
      <section id="case-studies" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Real results · Verified GSC data</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
              Technical Fixes That Moved Rankings<br />& Recovered Revenue
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <motion.div key={cs.name} variants={fadeUp} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
                <div className="border-b border-[#e2e8f0] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-lg px-3 py-1 text-xs font-bold" style={{ backgroundColor: cs.badgeBg, color: cs.badgeColor }}>{cs.badge}</span>
                    <span className="text-xs text-[#64748b]">{cs.city}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#0f0f1a]">{cs.name}</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#e2e8f0]">
                  <div className="p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-400">Before</p>
                    <div className="space-y-2">
                      {cs.before.map((t) => (
                        <div key={t} className="flex items-start gap-1.5 text-xs text-[#64748b]">
                          <X className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />{t}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-green-500">After</p>
                    <div className="space-y-2">
                      {cs.after.map((t) => (
                        <div key={t} className="flex items-start gap-1.5 text-xs text-[#64748b]">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 divide-x divide-[#e2e8f0] border-t border-[#e2e8f0]">
                  {cs.stats.map((s) => (
                    <div key={s.lbl} className="p-3 text-center">
                      <div className="text-sm font-black tracking-tight" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-[9px] text-[#64748b] leading-tight mt-0.5">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
 
      {/* ── SERVICES (6 cards) ── */}
      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Everything included</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
              What's in Your Technical SEO Package
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
              Technical SEO — Your Questions Answered
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
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#c4b5fd]">Ready to fix the foundation?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Great Content Deserves<br />Great Technical Health.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-[#c4b5fd] leading-relaxed">
              Get a free technical SEO audit — the founder personally crawls your site, identifies your biggest indexation, speed, and architecture issues, and delivers a prioritized fix plan within 48 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#534AB7] shadow-lg transition-all hover:bg-[#f5f3ff] hover:-translate-y-0.5"
              >
                Get Free Technical Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +92 310 652 6316
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6">
              {["48hr audit delivery", "No contracts", "Founder does the audit"].map((t) => (
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