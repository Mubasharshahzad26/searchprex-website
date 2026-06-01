"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, MapPin, FileText, Link2, BarChart2, Award,
  Settings, ChevronDown, ChevronUp, Scale, Sparkles, Linkedin, BadgeCheck, Gavel, Search,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
/* ─── DATA ─── */
const painPoints = [
  {
    icon: TrendingUp,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The PPC trap",
    title: "Google Ads Bleeding You Dry?",
    body:  "At $50–100 per click with high bounce rates, you're renting visibility you can never keep. Pause the ads — the leads vanish overnight, and you start from zero again.",
    stat:  "Avg. law firm PPC spend: $5,000+/mo",
  },
  {
    icon: MapPin,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The invisible firm",
    title: "Invisible to Local Clients?",
    body:  "Most legal searches end in a same-day call. If you're not in the top 3 of the Dallas (or your city's) local pack, those clients are calling your competitor — right now.",
    stat:  "78% of local legal searches convert same-day",
  },
  {
    icon: Search,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The AI search shift",
    title: "Missing From AI Answers?",
    body:  "Google's 2026 AI Overviews and tools like ChatGPT now answer 'best attorney near me' directly. If your firm isn't structured to be cited, you're invisible at the decision moment.",
    stat:  "AI Overviews now appear on 40%+ of legal queries",
  },
];
 
const strengths = [
  { icon: Award,    title: "Attorney E-E-A-T signals",  body: "Expertise, Experience, Authority, and Trust — the four signals Google specifically rewards for legal YMYL content. We build all of them systematically." },
  { icon: MapPin,   title: "Local pack domination",     body: "GBP optimization, NAP citations across 50+ directories, and city-level content that puts your firm in the top 3 Google Maps results." },
  { icon: FileText, title: "Practice area & city pages", body: "Dedicated pages for each practice area and target city — 'personal injury lawyer Dallas', 'family law attorney Dallas' — written around how clients actually search." },
  { icon: Sparkles, title: "GEO / AIO / LLMs visibility", body: "Generative Engine Optimization so your firm gets cited in Google AI Overviews, ChatGPT, and Perplexity when people ask for legal help in your city." },
];
 
const process = [
  { week: "Week 1–2", title: "Deep Audit",        body: "We audit your site, competitors, and local legal landscape — then build a fully custom, city-specific strategy.", icon: "🔍" },
  { week: "Week 3–4", title: "Foundation Fix",    body: "Technical SEO, attorney + FAQ schema, GBP optimization, and citation cleanup — a solid base for rankings.", icon: "🔧" },
  { week: "Week 5–8", title: "Content & Authority", body: "Practice-area pages, city pages, and E-E-A-T legal content, plus authority link building in parallel.", icon: "✍️" },
  { week: "Week 9+",  title: "Rankings & Cases",  body: "Keywords climb, qualified consultations increase, and you get plain-English reports every Monday.", icon: "📈" },
];
 
const services = [
  { icon: Settings,  title: "Technical SEO",        body: "Site speed, Core Web Vitals, attorney schema, indexation, and mobile optimization for legal sites.",       color: "#534AB7", bg: "#f5f3ff" },
  { icon: MapPin,    title: "Local SEO",             body: "GBP optimization, citations, local pack rankings, and review generation for your city.",                   color: "#0891b2", bg: "#ecfeff" },
  { icon: FileText,  title: "Practice Area Pages",   body: "Keyword-optimized pages for each practice area and target city, written for real client search intent.",   color: "#059669", bg: "#ecfdf5" },
  { icon: Link2,     title: "Legal Link Building",   body: "Legal directory listings, digital PR, and authority backlinks built specifically for law firms.",          color: "#d97706", bg: "#fffbeb" },
  { icon: BarChart2, title: "Weekly Reports",        body: "Plain-English reports every Monday — rankings, traffic, leads, and next action items.",                    color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Sparkles,  title: "GEO / AIO / LLMs SEO",  body: "Get cited in Google AI Overviews, ChatGPT, and Perplexity for local legal queries — the new top of search.", color: "#be185d", bg: "#fdf2f8" },
];
 
/* SEO + GEO + AIO + LLMs + March 2026 core update */
const coreUpdate2026 = [
  { title: "Attorney E-E-A-T (YMYL)", body: "Legal content is Your-Money-Your-Life — Google holds it to the highest trust bar. We surface attorney credentials, bar admissions, real case experience, and author authority on every page." },
  { title: "AI Overview Legal Citations", body: "Google's 2026 AI Overviews answer 'best lawyer near me' directly. We structure your content, reviews, and schema so your firm is the one cited — not a competitor or directory." },
  { title: "GEO & LLM Visibility", body: "Generative Engine Optimization gets your firm referenced in ChatGPT, Perplexity, and Gemini when potential clients research legal help in your city." },
  { title: "People-First Legal Content", body: "Every page genuinely helps prospective clients understand their situation — never thin, keyword-stuffed pages the Helpful Content system demotes." },
];
 
const faqs = [
  { q: "How long before I see results?", a: "Most law firms see ranking improvements in 30–60 days. First-page and local pack rankings typically follow in 60–90 days, depending on competition in your city and practice area." },
  { q: "Do you work with all practice areas?", a: "Yes — family law, personal injury, criminal defense, estate planning, immigration, employment law, and more. Every strategy is tailored to your specific practice and city." },
  { q: "What is GEO / AIO / LLMs optimization?", a: "It's optimizing so your firm gets cited in AI answers — Google AI Overviews, ChatGPT, Perplexity, and Gemini. As more clients research lawyers through AI, this is becoming as important as ranking #1." },
  { q: "Are you compliant with Google's 2026 core updates?", a: "Completely. Legal content is YMYL, so we build every page around E-E-A-T — attorney credentials, real experience, authoritative sourcing, and people-first content that survives every core update." },
  { q: "Can I keep running Google Ads?", a: "You can, but our goal is to replace that spend with free organic traffic. Most clients significantly reduce ad spend within months as organic leads grow." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results — more qualified consultations, more local visibility, more cases." },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
/* ─── PAGE ─── */
export default function LawFirmSEO() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
 
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
                  <Scale className="h-3.5 w-3.5" /> Law Firm SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Get More Cases<br />
                <span style={{ color: GREEN }}>From Google</span><br />
                in 2026
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#475569] leading-relaxed">
                While you pay thousands per click on Google Ads, your competitors get free organic traffic. We help law firms rank #1 in their city — and get cited in Google&apos;s 2026 AI Overviews — so qualified clients call you first.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN, boxShadow: "0 10px 25px -5px rgba(62,180,137,0.4)" }}
                >
                  Claim Free Law Firm Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#approach"
                  className="flex items-center gap-2 rounded-xl border border-[#cbd0db] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#3eb489] hover:text-[#2f9670]"
                >
                  See Our Approach
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "Results in 60–90 days", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4" style={{ color: GREEN }} />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
 
            {/* Right — what's included card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="mb-4 flex items-center gap-2">
                  <Gavel className="h-4 w-4" style={{ color: GREEN_DARK }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Built for law firms</span>
                </div>
                <div className="space-y-3">
                  {[
                    "Rank #1 for your city's practice-area keywords",
                    "Dominate the Google Maps local pack",
                    "Get cited in Google AI Overviews & ChatGPT",
                    "Attorney E-E-A-T content (YMYL compliant)",
                    "Replace expensive Google Ads with organic leads",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: GREEN }}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-[#374151]">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "rgba(62,180,137,0.1)" }}>
                  <span className="text-xs font-medium" style={{ color: GREEN_DARK }}>Google 2026 core update aligned</span>
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
              Law Firms Deserve Better<br />Than Paying $80 Per Click
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
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Our law firm SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                We Know Legal SEO<br />&amp; The AI Search Era
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#475569] leading-relaxed">
                We don&apos;t apply generic SEO to law firms. We understand the legal niche — YMYL E-E-A-T standards, how local clients search, and how to get cited in the AI answers that increasingly decide who gets the call.
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
                { color: "#534AB7", title: "Practice area pages", body: "Dedicated, keyword-optimized pages for each practice area — family law, personal injury, criminal defense, and more." },
                { color: "#0891b2", title: "Local pack rankings", body: "Appear in the top 3 Google Maps results — the most visible real estate in local legal search." },
                { color: "#d97706", title: "AI search visibility", body: "Get cited in ChatGPT, Perplexity, Gemini, and Google AI Overviews when people ask about legal help in your city." },
                { color: GREEN,     title: "Review velocity program", body: "A systematic strategy to generate consistent 5-star reviews — more trust, better rankings, more calls." },
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
 
      {/* ── GOOGLE 2026 CORE UPDATE + GEO/AIO/LLMs ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.span variants={fadeUp} className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
              <Sparkles className="h-3.5 w-3.5" /> SEO · GEO · AIO · LLMs · 2026 Core Update
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Legal SEO Built for Google &amp;<br />the AI Answer Era
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-base text-[#475569] leading-relaxed">
              Legal is YMYL — Google holds it to the highest trust bar, and AI Overviews now answer legal questions directly. Here&apos;s how we keep your firm visible everywhere clients look.
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
 
      {/* ── PROCESS / APPROACH — dark navy ── */}
      <section id="approach" className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>Our approach</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              From Audit to More Cases in 90 Days
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
 
      {/* ── BE OUR FIRST LAW FIRM CASE STUDY (honest, no fake data) ── */}
      <section className="bg-[#eaecf3] py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm lg:grid lg:grid-cols-2"
          >
            {/* Left — proof of method */}
            <div className="bg-gradient-to-br from-[#534AB7] to-[#3C3489] p-8 lg:p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              <div className="relative">
                <Scale className="mb-4 h-10 w-10 text-white/80" />
                <h3 className="mb-3 text-2xl font-black leading-snug">Be Our First Law Firm Case Study</h3>
                <p className="mb-6 text-sm text-white/70 leading-relaxed">
                  We&apos;ve delivered proven, GSC-verified results in ecommerce, local, and technical SEO — including a local service business reaching the top 3 map pack and a Google AI Overview placement in 60 days. Now we&apos;re bringing that same methodology to law firms.
                </p>
                <div className="space-y-2.5">
                  {["Proven local pack & AI Overview methodology", "Founder-led — not handed to a junior", "Transparent GSC reporting from day one"].map((t) => (
                    <div key={t} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#86efac" }} />{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right — CTA */}
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <h4 className="mb-3 text-xl font-black text-[#0a0f2e]">Your firm could be the next #1 in your city.</h4>
              <p className="mb-6 text-sm text-[#475569] leading-relaxed">
                We&apos;re selectively partnering with law firms ready to own their local market organically. Get a free audit and we&apos;ll show you exactly what it takes to rank — and get cited in AI answers — in your city and practice area.
              </p>
              <Link
                href="/free-audit"
                className="inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Claim Free Law Firm Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs text-[#94a3b8]">No obligation · 24-hour turnaround · Founder reviews it personally</p>
            </div>
          </motion.div>
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
                alt="Mubashar Shahzad — Founder & Lead SEO Strategist at SearchPrex"
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
              <p className="mb-3 text-sm font-semibold text-[#534AB7]">Founder &amp; Lead SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm text-[#475569] leading-relaxed">
                &quot;Law firm SEO is won on trust — real attorney credentials, genuine reviews, and content built to Google&apos;s YMYL E-E-A-T standards. I&apos;ve taken local service businesses to the top 3 map pack and Google AI Overview placements, and I bring that exact methodology to every firm I work with. You work directly with me — not a junior.&quot;
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
              What&apos;s in Your Law Firm SEO Package
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
              Law Firm SEO — Your Questions Answered
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
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>Ready to get more cases?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Stop Paying Per Click.<br />Start Owning Your Market.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70 leading-relaxed">
              Get a free law firm SEO audit — the founder personally reviews your site, local rankings, and AI search visibility, and delivers a 90-day growth roadmap within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Claim Free Law Firm Audit <ArrowRight className="h-4 w-4" />
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
 
    </main>
  );
}
 


















































