"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, Settings, FileText, Link2, BarChart2,
  ChevronDown, ChevronUp, Zap, Search, AlertTriangle, Code,
  Linkedin, BadgeCheck, Sparkles, Play, Youtube,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
/* Two Michigan videos */
const VIDEOS = [
  {
    id: "Y5PxSECNGP0",
    title: "Michigan Outdoor Sports — Performance Walkthrough",
    sub: "Live GSC recording · +476% organic clicks",
    tag: "Performance",
  },
  {
    id: "cI3BwxqaJbw",
    title: "Michigan — 0 to 285% Indexing Rate",
    sub: "Full case study · crawl + indexation fix",
    tag: "Indexing",
  },
];
 
/* ─── DATA ─── */
const heroStats = [
  { val: "+476%", lbl: "Organic clicks"  },
  { val: "+285%", lbl: "Indexing rate"   },
  { val: "12K+",  lbl: "Pages indexed"   },
  { val: "48hr",  lbl: "Audit turnaround"},
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
 
const services = [
  { icon: Search,       title: "Technical SEO Audit",           body: "Full crawl analysis — indexation, redirects, canonicals, orphan pages, crawl budget, and log file review.",            color: "#534AB7", bg: "#f5f3ff" },
  { icon: Zap,          title: "Core Web Vitals (LCP/INP/CLS)", body: "Diagnose and fix all performance issues impacting your Google rankings and real user experience.",                        color: "#0891b2", bg: "#ecfeff" },
  { icon: Code,         title: "Schema & Structured Data",      body: "JSON-LD markup for every page type — products, FAQs, local business, articles, breadcrumbs, and reviews.",               color: "#059669", bg: "#ecfdf5" },
  { icon: Settings,     title: "Site Architecture",             body: "Information architecture audit, silo structure, internal linking strategy, and crawl depth optimization.",                color: "#d97706", bg: "#fffbeb" },
  { icon: AlertTriangle,title: "Indexation & Crawl Budget",     body: "Identify and fix every reason Google ignores your pages — robots.txt, noindex tags, and duplicate content at scale.",     color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Link2,        title: "Redirect & Canonical Audit",    body: "Redirect chain cleanup, canonical tag implementation, and hreflang setup for multi-language or multi-region sites.",      color: "#be185d", bg: "#fdf2f8" },
];
 
const coreUpdate2026 = [
  { title: "Crawl Efficiency for AI Bots", body: "Google's 2026 systems and AI crawlers reward fast, clean, crawlable sites. We optimize crawl budget so every important page gets discovered and indexed quickly." },
  { title: "Core Web Vitals (INP era)", body: "INP replaced FID as a ranking signal. We tune LCP, INP, and CLS to 'Good' — directly improving both rankings and conversion in the 2026 algorithm." },
  { title: "Structured Data for Rich & AI Results", body: "Clean JSON-LD schema helps Google and AI Overviews understand your content — winning rich results and AI citations competitors miss." },
  { title: "Indexation Health at Scale", body: "We recover mass non-indexing the right way — fixing root causes (thin content, crawl waste) so gains hold through every core update, not just temporarily." },
];
 
const faqs = [
  { q: "How is a technical SEO audit different from a general SEO audit?", a: "A technical SEO audit focuses exclusively on how your website is built and configured — crawlability, indexability, site speed, structured data, and architecture. We often find technical issues are the root cause of ranking problems even when content is good." },
  { q: "My site has thousands of pages — can you handle that?", a: "Yes — large-scale technical SEO is our specialty. We took Michigan Outdoor Sports from near-zero to 12K+ indexed pages and a +285% indexing rate. We tackle the highest-impact issues first, in batches." },
  { q: "What are Core Web Vitals and why do they matter?", a: "Core Web Vitals (LCP, INP, CLS) are Google's user experience metrics that directly impact rankings in 2026. LCP measures loading, INP measures interactivity, CLS measures stability. We diagnose and fix all three." },
  { q: "How quickly will I see results from technical fixes?", a: "Critical fixes like resolving indexation blocks can show GSC improvements in 2–4 weeks after Googlebot recrawls. Core Web Vitals improvements show up in Google's data within 28 days of deployment." },
  { q: "Do you work with Shopify, WordPress, and custom sites?", a: "Yes — all platforms. We understand the technical quirks of Shopify (faceted nav, duplicate URLs), WordPress (plugin bloat), and custom-built sites. Platform-agnostic technical SEO." },
  { q: "Is there a contract?", a: "No long-term contracts. Technical SEO has a clear audit-and-fix phase, and we're happy to work on a project or monthly retainer basis depending on your needs." },
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
 
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
                  <Code className="h-3.5 w-3.5" /> Technical SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Fix the Foundation.<br />
                <span style={{ color: GREEN }}>Make Google</span><br />
                Love Your Site.
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#475569] leading-relaxed">
                Crawl budget waste, indexation blocks, slow Core Web Vitals, and broken architecture are silently destroying your rankings. We diagnose every technical issue and fix them — systematically, at scale, aligned with Google&apos;s 2026 core updates.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN, boxShadow: "0 10px 25px -5px rgba(62,180,137,0.4)" }}
                >
                  Get Free Technical Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-studies"
                  className="flex items-center gap-2 rounded-xl border border-[#cbd0db] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#3eb489] hover:text-[#2f9670]"
                >
                  See Case Studies
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "48hr audit delivery", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4" style={{ color: GREEN }} />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
 
            {/* Right — stats card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-1 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">Live results</span>
                </div>
                <p className="mb-4 text-sm font-semibold text-[#0a0f2e]">Michigan Outdoor Sports — United States</p>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {heroStats.map((s) => (
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
                {[{ icon: Shield, t: "100% Confidential" }, { icon: Clock, t: "48hr Audit Delivery" }, { icon: Star, t: "No Obligation" }].map(({ icon: Icon, t }) => (
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
              Good Content. Bad Rankings.<br />Technical Issues Are Why.
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
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Our technical SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                We Don&apos;t Just Find Issues.<br />We Fix Them at Scale.
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#475569] leading-relaxed">
                Most agencies hand you a 200-page report and call it a day. We give you a prioritized fix list and implement every change — from crawl budget optimization to Core Web Vitals to schema markup — all done for you.
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
                { color: "#534AB7", title: "Screaming Frog + GSC + log files",   body: "We use the industry's best tools — Screaming Frog, Google Search Console, Ahrefs, and server log analysis — to find every issue other agencies miss." },
                { color: "#0891b2", title: "Prioritized by revenue impact",       body: "Not all technical issues matter equally. We fix the ones that will move your rankings and revenue first — not waste time on cosmetic issues." },
                { color: "#d97706", title: "Large-scale indexation recovery",     body: "We've recovered sites with 35,000+ pages. Batch content fixes + GSC resubmission waves = rapid indexation gains, proven on Michigan Outdoor Sports." },
                { color: GREEN,     title: "Implementation included",             body: "We don't just audit. We implement every fix directly on your site or guide your developer with exact code-level instructions." },
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
 
      {/* ── GOOGLE 2026 CORE UPDATE SECTION ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.span variants={fadeUp} className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
              <Sparkles className="h-3.5 w-3.5" /> Built for Google&apos;s 2026 Core Updates
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Technical SEO Tuned for the<br />2026 Algorithm
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-base text-[#475569] leading-relaxed">
              From INP as a ranking signal to AI crawler efficiency — we build your technical foundation around the exact signals Google rewards in 2026.
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
              Audit to Implementation in 4 Weeks
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
 
      {/* ── CASE STUDY — Michigan, 2 videos (Toptal-style) ── */}
      <section id="case-studies" className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Featured case study · Verified GSC data</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Michigan Outdoor Sports — +476% Clicks &amp; +285% Indexing
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-sm text-[#64748b]">
              Two live GSC walkthroughs — performance growth and the indexing-rate recovery — both fully unfiltered.
            </motion.p>
          </motion.div>
 
          {/* Challenge / Solution / Outcome strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-8 grid gap-5 rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm md:grid-cols-3"
          >
            <div>
              <p className="mb-1 text-sm font-bold" style={{ color: "#ef4444" }}>Challenge</p>
              <p className="text-sm text-[#475569] leading-relaxed">
                Brand pages were never properly submitted to GSC, thin content caused mass non-indexing, and crawl budget was being wasted — leaving thousands of pages invisible.
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm font-bold" style={{ color: GREEN_DARK }}>Solution</p>
              <p className="text-sm text-[#475569] leading-relaxed">
                We submitted sitemaps directly to GSC, fixed indexation blocks and crawl waste, rewrote brand pages with unique content, and resubmitted in batches.
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm font-bold" style={{ color: "#534AB7" }}>Outcome</p>
              <p className="text-sm text-[#475569] leading-relaxed">
                +476% organic clicks and a +285% indexing rate within 90 days — 12,000+ pages indexed from near-zero, with no ad spend.
              </p>
            </div>
          </motion.div>
 
          {/* Two video cards */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2">
            {VIDEOS.map((v) => (
              <motion.div key={v.id} variants={fadeUp} className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm">
                <div
                  className="group relative aspect-video cursor-pointer bg-[#0a0f2e]"
                  onClick={() => setActiveVideo(v.id)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                    alt={v.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-[#0a0f2e]/20 to-transparent" />
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: GREEN }}>
                    <Youtube className="h-3 w-3" /> {v.tag}
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-lg transition-all group-hover:scale-110" style={{ background: GREEN }}>
                      <Play className="ml-1 h-7 w-7 fill-white text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-1 font-black text-[#0a0f2e] leading-snug">{v.title}</h3>
                  <p className="text-sm text-[#64748b]">{v.sub}</p>
                  <button
                    onClick={() => setActiveVideo(v.id)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-2.5"
                    style={{ color: GREEN_DARK }}
                  >
                    <Play className="h-3.5 w-3.5 fill-current" /> Watch full video
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
 
          {/* metric strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { val: "+476%", lbl: "Organic clicks", color: GREEN_DARK },
              { val: "+285%", lbl: "Indexing rate",  color: "#16a34a" },
              { val: "12K+",  lbl: "Pages indexed",  color: GREEN_DARK },
              { val: "4.1%",  lbl: "CTR",            color: "#16a34a" },
            ].map((s) => (
              <div key={s.lbl} className="rounded-xl border border-[#e2e8f0] bg-white p-5 text-center shadow-sm">
                <div className="text-3xl font-black tracking-tight" style={{ color: s.color }}>{s.val}</div>
                <div className="mt-1 text-xs text-[#64748b]">{s.lbl}</div>
              </div>
            ))}
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
                alt="Mubashar Shahzad — Founder & Lead Technical SEO Strategist at SearchPrex"
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
              <p className="mb-3 text-sm font-semibold text-[#534AB7]">Founder &amp; Lead Technical SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                &quot;Technical SEO is where I&apos;ve done my deepest work — crawl budget, indexation recovery, Core Web Vitals, schema. I personally took Michigan Outdoor Sports from near-zero indexing to 12K+ pages and +476% clicks, all verified in GSC. When you hire SearchPrex, I do the crawl and the fixes myself.&quot;
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
 
      {/* ── SERVICES (6 cards) — grey ── */}
      <section className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Everything included</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              What&apos;s in Your Technical SEO Package
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
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>Ready to fix the foundation?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Great Content Deserves<br />Great Technical Health.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70 leading-relaxed">
              Get a free technical SEO audit — the founder personally crawls your site, identifies your biggest indexation, speed, and architecture issues, and delivers a prioritized fix plan within 48 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
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
                <span key={t} className="flex items-center gap-2 text-sm text-white/60">
                  <Check className="h-4 w-4" style={{ color: GREEN }} />{t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
 
      {/* ── VIDEO MODAL ── */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Michigan technical SEO case study"
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
 


















































