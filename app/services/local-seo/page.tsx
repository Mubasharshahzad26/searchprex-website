"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, MapPin, FileText, Link2, BarChart2,
  Settings, ChevronDown, ChevronUp, Zap, Search, Linkedin, BadgeCheck, Sparkles, Play, Youtube,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
const HVAC_VIDEO = "g_1TfDU4YeA";
 
/* ─── DATA ─── */
const stats = [
  { val: "Top 3",   lbl: "Maps pack"        },
  { val: "Featured", lbl: "AI Overview"     },
  { val: "+5.7x",   lbl: "Organic calls"    },
  { val: "60d",     lbl: "To rank"          },
];
 
const painPoints = [
  {
    icon: TrendingUp,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The PPC trap",
    title: "Paying for Every Local Click?",
    body:  "Local Service Ads and Google Ads charge $20–80 per click — and the moment you pause, your phone stops ringing. You're renting visibility you can never own.",
    stat:  "Avg. local business PPC waste: 58%",
  },
  {
    icon: MapPin,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The invisible business",
    title: "Not Showing in the Map Pack?",
    body:  "76% of 'near me' searches end in a same-day visit or call. If you're not in the top 3 Google Maps results, those customers call your competitor — right now.",
    stat:  "76% of 'near me' searches convert same-day",
  },
  {
    icon: Search,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The AI Overview shift",
    title: "Missing From Google's AI Answers?",
    body:  "Google's 2026 AI Overviews now answer local queries directly. If your business isn't structured to be cited, you're invisible in the exact moment customers decide.",
    stat:  "AI Overviews appear on 40%+ of local searches",
  },
];
 
const strengths = [
  { icon: MapPin,    title: "Google Business Profile mastery", body: "Full GBP optimization — categories, services, weekly posts, Q&A, and photos that push you into the top 3 local pack." },
  { icon: Link2,     title: "Citation building at scale",      body: "Consistent NAP across 50+ directories — Google, Bing, Apple Maps, Yelp, and niche local citations that build trust." },
  { icon: FileText,  title: "Local landing pages",             body: "City and neighborhood pages with genuinely useful local content — built to rank for every service-area keyword you target." },
  { icon: Star,      title: "Review velocity program",         body: "A systematic strategy to generate consistent, authentic 5-star reviews — the strongest local ranking and trust signal." },
];
 
const process = [
  { week: "Week 1–2", title: "Local Audit",        body: "We audit your GBP, citations, competitors, and local landscape — then build a city-specific ranking roadmap.", icon: "🔍" },
  { week: "Week 3–4", title: "GBP & Citations",    body: "Full Google Business Profile optimization and NAP citation cleanup across 50+ directories.", icon: "🔧" },
  { week: "Week 5–8", title: "Content & Reviews",  body: "Local landing pages, service-area content, and a review generation engine — all running in parallel.", icon: "✍️" },
  { week: "Week 9+",  title: "Rank & Convert",     body: "You climb into the map pack and AI Overviews, calls increase, and we report progress every Monday.", icon: "📈" },
];
 
const services = [
  { icon: MapPin,    title: "Google Business Profile",   body: "Category optimization, weekly posts, Q&A management, and photo strategy for top-3 local pack rankings.",  color: "#059669", bg: "#ecfdf5" },
  { icon: Link2,     title: "Citation Building",          body: "NAP consistency across 50+ directories — Google, Bing, Apple Maps, Yelp, and niche local sources.",        color: "#0891b2", bg: "#ecfeff" },
  { icon: FileText,  title: "Local Landing Pages",        body: "City and service-area pages with useful local content built to rank for every 'near me' keyword.",          color: "#534AB7", bg: "#f5f3ff" },
  { icon: Star,      title: "Review Generation",          body: "Systematic 5-star review strategy — the strongest local ranking and conversion signal there is.",            color: "#d97706", bg: "#fffbeb" },
  { icon: BarChart2, title: "Weekly Reports",             body: "Map pack rankings, calls, direction requests, and GBP insights — plain-English every Monday.",             color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Sparkles,  title: "AI Overview Optimization",   body: "Structured content and schema so your business gets cited in Google AI Overviews for local queries.",        color: "#be185d", bg: "#fdf2f8" },
];
 
const coreUpdate2026 = [
  { title: "AI Overview Local Citations", body: "Google's 2026 AI Overviews answer local questions directly. We structure your content and schema so your business is the one cited — not your competitor." },
  { title: "Real Experience Signals", body: "Genuine photos, real reviews, accurate service details — the first-hand experience signals Google now weighs most heavily for local trust." },
  { title: "Local Entity Authority", body: "We build your business as a recognized local entity across Google's knowledge systems — consistent NAP, citations, and structured data." },
  { title: "People-First Local Content", body: "Service-area pages written to genuinely help local customers — never thin doorway pages that the Helpful Content system demotes." },
];
 
const faqs = [
  { q: "How fast can I rank in the Google Maps local pack?", a: "Most local businesses see map pack movement in 30–60 days. Our HVAC client reached the top 3 and captured an AI Overview placement within 60 days of our GBP and citation work." },
  { q: "Do you optimize for 'near me' searches?", a: "Yes — 'near me' and service-area queries are the core of local SEO. We build city and neighborhood landing pages plus GBP signals that capture this high-intent traffic." },
  { q: "What is AI Overview optimization?", a: "Google's 2026 AI Overviews answer local queries directly above the map pack. We structure your content, reviews, and schema so Google cites your business in those answers." },
  { q: "Which local businesses do you work with?", a: "HVAC, plumbers, electricians, restaurants, clinics, contractors, salons, and other service businesses targeting a specific city or service area." },
  { q: "Is your work aligned with Google's 2026 core updates?", a: "Completely. Every local page is people-first, E-E-A-T compliant, and built around real experience signals — never thin doorway pages that get demoted." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results — more calls, more map pack visibility, more local customers." },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
/* ─── PAGE ─── */
export default function LocalSEO() {
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
                  <MapPin className="h-3.5 w-3.5" /> Local SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Own Every Corner<br />
                <span style={{ color: GREEN }}>Of Your City</span><br />
                On Google
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#475569] leading-relaxed">
                Your customers are searching &quot;near me&quot; right now. We put your business in the top 3 Google Maps results and Google&apos;s 2026 AI Overviews — so they call you, not your competitor.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN, boxShadow: "0 10px 25px -5px rgba(62,180,137,0.4)" }}
                >
                  Get Free Local Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-study"
                  className="flex items-center gap-2 rounded-xl border border-[#cbd0db] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#3eb489] hover:text-[#2f9670]"
                >
                  See Case Study
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "Results in 60 days", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4" style={{ color: GREEN }} />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
 
            {/* Right — stats card (HVAC, real) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-1 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">Live results</span>
                </div>
                <p className="mb-4 text-sm font-semibold text-[#0a0f2e]">Local HVAC Services — United States</p>
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
              Local Customers Are Searching.<br />Are They Finding You?
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
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Our local SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                We Make Google See You<br />As The Local Authority
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#475569] leading-relaxed">
                Local SEO isn&apos;t generic SEO with a city name added. We understand how Google ranks the map pack, what triggers AI Overview citations, and how local customers actually decide who to call.
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
                { color: "#059669", title: "Map pack domination",       body: "We optimize every signal Google uses for the local 3-pack — proximity, prominence, and relevance — to push you to the top." },
                { color: "#0891b2", title: "NAP consistency",           body: "Inconsistent name, address, and phone data across the web confuses Google. We clean it up across 50+ directories." },
                { color: "#d97706", title: "AI Overview visibility",    body: "Get cited in Google AI Overviews and ChatGPT when locals ask about services in your city — the new top of search." },
                { color: GREEN,     title: "Review velocity",           body: "A steady stream of authentic 5-star reviews — the strongest signal for both local rankings and customer trust." },
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
              Local SEO That Wins in the<br />AI Search Era
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-base text-[#475569] leading-relaxed">
              Google&apos;s 2026 updates put AI Overviews above the map pack and reward real local experience signals. Here&apos;s how we keep your business at the top.
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
              From Audit to Map Pack in 60 Days
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
 
      {/* ── CASE STUDY — Toptal-style video block (HVAC) ── */}
      <section id="case-study" className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Featured case study · Verified GSC data</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              How We Took a Local HVAC Business to Top 3 + AI Overview
            </motion.h2>
          </motion.div>
 
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
                src={`https://img.youtube.com/vi/${HVAC_VIDEO}/maxresdefault.jpg`}
                alt="Local HVAC SEO case study — top 3 map pack and AI Overview walkthrough"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${HVAC_VIDEO}/hqdefault.jpg`; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-[#0a0f2e]/20 to-transparent" />
              <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: GREEN }}>
                <Youtube className="h-3 w-3" /> Watch on YouTube
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-lg transition-all group-hover:scale-110" style={{ background: GREEN }}>
                  <Play className="ml-1 h-7 w-7 fill-white text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                <p className="text-sm font-bold text-white">Local HVAC Services — United States</p>
                <p className="text-xs text-white/70">Live walkthrough · Map pack + AI Overview domination</p>
              </div>
            </div>
 
            {/* RIGHT — Challenge / Solution / Outcome */}
            <div className="p-8 lg:p-10">
              <h3 className="mb-6 text-xl font-black leading-snug text-[#0a0f2e]">
                Top 3 map pack and a Google AI Overview placement — from zero local visibility in 60 days.
              </h3>
 
              <div className="space-y-5">
                <div>
                  <p className="mb-1 text-sm font-bold" style={{ color: "#ef4444" }}>Challenge</p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    A local HVAC service business had no map pack presence, no &quot;near me&quot; rankings, and zero visibility in Google&apos;s new AI Overview results for high-intent emergency service searches.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold" style={{ color: GREEN_DARK }}>Solution</p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    We fully optimized the Google Business Profile, fixed NAP consistency across 50+ directories, built service-area landing pages, launched a review generation program, and structured content to be cited in AI Overviews.
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold" style={{ color: "#534AB7" }}>Outcome</p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    The business reached the top 3 Google Maps pack for its primary service keywords, earned a featured AI Overview placement, and grew organic clicks 5.7x in 60 days — driving consistent inbound calls.
                  </p>
                </div>
              </div>
 
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { v: "Top 3", l: "Maps pack" },
                  { v: "Featured", l: "AI Overview" },
                  { v: "+5.7x", l: "Organic calls" },
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
                alt="Mubashar Shahzad — Founder & Lead Local SEO Strategist at SearchPrex"
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
              <p className="mb-3 text-sm font-semibold text-[#534AB7]">Founder &amp; Lead Local SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                &quot;Local SEO is won on real signals — accurate GBP data, genuine reviews, and content that actually helps your neighbors. I personally took a local HVAC business to the top 3 map pack and an AI Overview placement in 60 days. When you work with SearchPrex, you work directly with me — not a junior.&quot;
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
              What&apos;s in Your Local SEO Package
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
              Local SEO — Your Questions Answered
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
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>Ready to own your city?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Stop Renting Clicks.<br />Start Owning Your Map Pack.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70 leading-relaxed">
              Get a free local SEO audit — the founder personally reviews your Google Business Profile, citations, and local rankings, and delivers a 60-day local growth plan within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Get Free Local Audit <ArrowRight className="h-4 w-4" />
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
                src={`https://www.youtube.com/embed/${HVAC_VIDEO}?autoplay=1&rel=0&modestbranding=1`}
                title="Local HVAC SEO case study"
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
 
















































