"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, MapPin, FileText, Link2, BarChart2, Award,
  Settings, ChevronDown, ChevronUp,
} from "lucide-react";
 
/* ─── DATA ─── */
const stats = [
  { val: "#1",    lbl: "Dallas Family Law" },
  { val: "+75%",  lbl: "Visibility"        },
  { val: "47",    lbl: "Leads / month"     },
  { val: "6 wks", lbl: "To rank #1"        },
];
 
const painPoints = [
  {
    icon: TrendingUp,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The PPC trap",
    title: "Google Ads Bleeding You Dry?",
    body:  "At $50–100 per click with a 60% bounce rate, you're renting visibility you can never keep. Pause the ads — the traffic vanishes overnight.",
    stat:  "Avg. law firm PPC spend: $5,000/mo",
  },
  {
    icon: MapPin,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The invisible firm",
    title: "Invisible to Local Clients?",
    body:  "78% of legal searches end in a same-day call. If you're not on page 1, those clients call your competitor — right now.",
    stat:  "Local legal search conversion: 78% same-day",
  },
  {
    icon: BarChart2,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The competitor gap",
    title: "Competitors Outranking You?",
    body:  "Bigger firms dominate Google with content and authority. Without SEO, the gap widens every single month.",
    stat:  "Top 3 results capture 68% of all clicks",
  },
];
 
const strengths = [
  { icon: Award,    title: "Attorney E-E-A-T signals",  body: "Expertise, authority, and trust signals Google specifically rewards for legal content — we build all three systematically." },
  { icon: MapPin,   title: "Local pack domination",     body: "GBP optimization, NAP citations across 50+ directories, and neighborhood-level content that puts you in the top 3." },
  { icon: FileText, title: "Legal content strategy",    body: "Practice area pages, city pages, FAQs with schema, and blog content written around how your clients actually search." },
  { icon: Settings, title: "Attorney schema markup",    body: "Structured data that tells Google exactly who you are, your practice areas, reviews, and location — maximizing rich results." },
];
 
const process = [
  { week: "Week 1–2", title: "Deep Audit",       body: "We audit your site, competitors, and local landscape — then build your fully custom strategy.", icon: "🔍" },
  { week: "Week 3–4", title: "Foundation Fix",   body: "Technical SEO, GBP optimization, citation cleanup — a solid base for rankings to build on.",  icon: "🔧" },
  { week: "Week 5–8", title: "Content & Links",  body: "Practice area content, local landing pages, and authority link building begin in parallel.",   icon: "✍️" },
  { week: "Week 9+",  title: "Rankings & Growth", body: "Keywords climb, leads increase, weekly reports every Monday — then we double down on what works.", icon: "📈" },
];
 
const beforeAfter = {
  before: [
    "Page 6 for 'Dallas family lawyer'",
    "3 organic leads per month",
    "$4,200/mo on Google Ads",
    "No Google Business presence",
  ],
  after: [
    "#1 for 'Dallas family lawyer'",
    "47 organic leads per month",
    "$0 on Google Ads",
    "#1 in Google Maps local pack",
  ],
};
 
const services = [
  { icon: Settings,  title: "Technical SEO",      body: "Site speed, Core Web Vitals, schema markup, indexation, and mobile optimization.",          color: "#534AB7", bg: "#f5f3ff" },
  { icon: MapPin,    title: "Local SEO",           body: "GBP optimization, citations, local pack rankings, and review generation strategy.",          color: "#0891b2", bg: "#ecfeff" },
  { icon: FileText,  title: "Content Strategy",    body: "Practice area pages, city pages, FAQ schema, and blog content that ranks and converts.",     color: "#059669", bg: "#ecfdf5" },
  { icon: Link2,     title: "Link Building",       body: "Legal directory listings, digital PR, and authority backlinks built specifically for law firms.", color: "#d97706", bg: "#fffbeb" },
  { icon: BarChart2, title: "Weekly Reports",      body: "Plain-English reports every Monday — rankings, traffic, leads, and next action items.",       color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Star,      title: "AI & GEO",            body: "Citations in ChatGPT, Perplexity, and Google AI Overviews for local legal searches.",         color: "#be185d", bg: "#fdf2f8" },
];
 
const faqs = [
  {
    q: "How long before I see results?",
    a: "Most law firms see ranking improvements in 30–45 days. First-page rankings typically happen in 60–90 days depending on competition in your city and practice area.",
  },
  {
    q: "Do you work with all practice areas?",
    a: "Yes — family law, personal injury, criminal defense, estate planning, immigration, employment law, and more. We tailor every strategy to your specific practice.",
  },
  {
    q: "Can I keep running Google Ads?",
    a: "You can, but our goal is to replace that spend with free organic traffic. Most clients reduce ad spend by 80%+ within 6 months of working with us.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We specialize in law firm SEO specifically — no juniors, no generic templates. The founder works every account and understands legal buyer psychology at a deep level.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. We earn your business every month with results. Most clients stay because they see ROI within 60 days — not because they're locked in.",
  },
  {
    q: "How do you track ROI?",
    a: "We connect Google Search Console and GA4 to a live dashboard you can access 24/7. Every Monday you get a report showing keyword rankings, organic traffic, and leads.",
  },
];
 
/* ─── MOTION VARIANTS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
/* ─── COMPONENT ─── */
export default function LawFirmSEO() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
 
  return (
    <main className="bg-white">
 
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20">
        {/* Subtle grid bg */}
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
                  Law Firm SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0f0f1a] sm:text-5xl lg:text-6xl">
                Get More Cases<br />
                <span className="text-[#534AB7]">From Google</span><br />
                in 2026
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#64748b] leading-relaxed">
                While you're paying thousands per click on Google Ads, your competitors are getting free organic traffic. We help law firms rank #1 in their city — and keep those rankings forever.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/30 transition-all hover:bg-[#3C3489] hover:shadow-[#534AB7]/50 hover:-translate-y-0.5"
                >
                  Claim Free Law Firm Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-study"
                  className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  See Case Study
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "Results in 60 days", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Check className="h-4 w-4 text-[#16a34a]" />{t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
 
            {/* Right — live stats card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-slate-100">
                <div className="mb-1 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#16a34a]">Live results</span>
                </div>
                <p className="mb-4 text-sm font-semibold text-[#0f0f1a]">Morrison Family Law — Dallas, TX</p>
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
 
              {/* Trust pills */}
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
              Law Firms Deserve Better<br />Than Paying $80 Per Click
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
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Our law firm SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
                We Know Legal SEO<br />Better Than Anyone
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#64748b] leading-relaxed">
                We don't apply generic SEO to law firms. We understand the legal niche — buyer psychology, E-E-A-T signals Google uses for attorneys, and how local clients search for legal help in your city.
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
                { color: "#534AB7", title: "Practice area pages", body: "Dedicated, keyword-optimized pages for each practice area — family law, personal injury, criminal defense, and more." },
                { color: "#0891b2", title: "Local pack rankings", body: "Appear in the top 3 Google Maps results — the most visible real estate in local legal search." },
                { color: "#d97706", title: "AI search visibility", body: "Get cited in ChatGPT, Perplexity, and Google AI Overviews when people ask about legal help in your city." },
                { color: "#16a34a", title: "Review velocity program", body: "Systematic strategy to generate consistent 5-star reviews — more trust, better rankings, more calls." },
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
              From Audit to #1 in 60 Days
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
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
              Morrison Family Law — #1 in Dallas in 6 Weeks
            </motion.h2>
          </motion.div>
 
          <div className="grid gap-6 md:grid-cols-2">
            {/* Before */}
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
            {/* After */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <p className="mb-4 text-sm font-bold text-green-600 uppercase tracking-widest">After 60 days</p>
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
              { val: "#1",      lbl: "Dallas Family Lawyer", color: "#534AB7" },
              { val: "+1,467%", lbl: "Organic traffic",      color: "#16a34a" },
              { val: "47",      lbl: "Leads / month",        color: "#534AB7" },
              { val: "$0",      lbl: "Ad spend now",         color: "#16a34a" },
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
              What's in Your Law Firm SEO Package
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
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#c4b5fd]">
              Ready to get started?
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Stop Paying Per Click.<br />Start Owning Your Market.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-[#c4b5fd] leading-relaxed">
              Get a free law firm SEO audit — no tools, no templates. The founder personally reviews your site and delivers a 90-day growth roadmap within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#534AB7] shadow-lg transition-all hover:bg-[#f5f3ff] hover:-translate-y-0.5"
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
 





