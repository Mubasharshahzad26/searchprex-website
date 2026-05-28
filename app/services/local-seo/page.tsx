"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, X, ArrowRight, Phone, Star, Shield, Clock,
  TrendingUp, MapPin, FileText, Link2, BarChart2,
  Settings, ChevronDown, ChevronUp, Zap, Search, Users,
} from "lucide-react";
 
/* ─── DATA ─── */
const heroStats = [
  { val: "3x",    lbl: "Local visibility"    },
  { val: "#1",    lbl: "Google Maps pack"    },
  { val: "+312%", lbl: "Organic calls"       },
  { val: "48hr",  lbl: "Audit turnaround"    },
];
 
const painPoints = [
  {
    icon: MapPin,
    color: "#ef4444",
    bg:   "#fef2f2",
    tag:  "The local invisibility trap",
    title: "Your Neighbors Can't Find You Online?",
    body:  "When someone in your city searches for your service, you don't show up. That customer calls your competitor instead — and they do this every single day while you sleep.",
    stat:  "78% of local searches result in a same-day purchase or call",
  },
  {
    icon: TrendingUp,
    color: "#f59e0b",
    bg:   "#fffbeb",
    tag:  "The Google Maps gap",
    title: "Missing From the Local Pack?",
    body:  "The local pack — those top 3 Google Maps results — captures 44% of all local clicks. If you're not there, nearly half your potential customers never even see you exist.",
    stat:  "Local pack captures 44% of all local search clicks",
  },
  {
    icon: BarChart2,
    color: "#534AB7",
    bg:   "#f5f3ff",
    tag:  "The reputation problem",
    title: "Fewer Reviews Than Your Competitors?",
    body:  "93% of consumers read reviews before choosing a local business. If your competitor has 200 reviews and you have 12, the decision is already made — before they even visit your site.",
    stat:  "93% of buyers read reviews before choosing locally",
  },
];
 
const strengths = [
  { icon: MapPin,   title: "Neighborhood-level keyword targeting",  body: "We target every district, suburb, and neighborhood in your market — so locals find you before anyone else, no matter where they're searching from." },
  { icon: Settings, title: "Google Business Profile domination",    body: "Full GBP optimization — categories, services, photos, posts, Q&A, and review responses — turning your profile into a lead-generation machine." },
  { icon: Users,    title: "Review velocity program",               body: "Systematic strategy to generate consistent 5-star reviews from happy customers — more reviews, better rankings, more trust, more calls." },
  { icon: Link2,    title: "Citation building across 50+ directories", body: "NAP-consistent listings across Google, Yelp, Bing, Apple Maps, and 50+ niche directories — the foundation of local authority." },
];
 
const process = [
  { week: "Week 1–2", title: "Local Audit",       body: "We audit your GBP, citations, reviews, local rankings, and competitor landscape — then build your city-specific strategy.", icon: "🔍" },
  { week: "Week 3–4", title: "Foundation Setup",  body: "GBP optimization, citation cleanup, NAP consistency across directories, and local schema markup.", icon: "🏗️" },
  { week: "Week 5–8", title: "Content & Reviews", body: "Location landing pages, neighborhood content, and a review generation program that runs on autopilot.", icon: "✍️" },
  { week: "Week 9+",  title: "Local Dominance",   body: "Local pack rankings climb, calls increase, weekly reports every Monday. We double down on every area gaining traction.", icon: "📍" },
];
 
const caseStudies = [
  {
    badge: "Law Firm",
    badgeColor: "#534AB7",
    badgeBg:   "#f5f3ff",
    city:  "Dallas, TX · 60 days",
    name:  "Morrison Family Law",
    before: ["Page 6 for 'Dallas family lawyer'", "3 organic leads/month", "No local pack presence"],
    after:  ["#1 for 'Dallas family lawyer'", "47 organic leads/month", "#1 in Google Maps local pack"],
    stats: [
      { val: "#1",    lbl: "Local pack",      color: "#534AB7" },
      { val: "+75%",  lbl: "Visibility",      color: "#16a34a" },
      { val: "47",    lbl: "Leads/month",     color: "#534AB7" },
      { val: "6wks",  lbl: "To rank #1",      color: "#16a34a" },
    ],
  },
  {
    badge: "Ecommerce",
    badgeColor: "#0891b2",
    badgeBg:   "#ecfeff",
    city:  "Chicago, IL · 6 months",
    name:  "TacticalEdge Store",
    before: ["Invisible in local searches", "0 local pack appearances", "Losing to big-box stores"],
    after:  ["#1 for 20+ local keywords", "Local pack for all categories", "3x local foot traffic"],
    stats: [
      { val: "+683%", lbl: "Local traffic",   color: "#534AB7" },
      { val: "+285%", lbl: "Revenue",         color: "#16a34a" },
      { val: "200+",  lbl: "Keywords P1",     color: "#534AB7" },
      { val: "3x",    lbl: "Foot traffic",    color: "#16a34a" },
    ],
  },
  {
    badge: "Local Business",
    badgeColor: "#d97706",
    badgeBg:   "#fffbeb",
    city:  "Michigan · 90 days",
    name:  "Michigan Sports Outdoor",
    before: ["Zero GSC visibility", "No local keyword rankings", "Thin brand pages"],
    after:  ["+476% organic clicks", "Ranking for 50+ local terms", "Dominant in Michigan region"],
    stats: [
      { val: "+476%", lbl: "Organic clicks",  color: "#534AB7" },
      { val: "3.85K", lbl: "Pages indexed",   color: "#16a34a" },
      { val: "6.49K", lbl: "Impressions",     color: "#534AB7" },
      { val: "4.1%",  lbl: "CTR",             color: "#16a34a" },
    ],
  },
];
 
const services = [
  { icon: MapPin,    title: "Google Business Profile",    body: "Full GBP setup & optimization — categories, photos, posts, products, Q&A, review responses, and weekly updates.",        color: "#534AB7", bg: "#f5f3ff" },
  { icon: Settings,  title: "Technical Local SEO",        body: "Local schema markup, mobile optimization, page speed, and Core Web Vitals — technical signals that boost local rankings.", color: "#0891b2", bg: "#ecfeff" },
  { icon: FileText,  title: "Local Landing Pages",        body: "City, neighborhood, and service area pages with unique keyword-targeted content — reaching every corner of your market.",  color: "#059669", bg: "#ecfdf5" },
  { icon: Link2,     title: "Citation Building",          body: "NAP-consistent listings across 50+ directories — Google, Yelp, Bing, Apple Maps, and niche-specific platforms.",           color: "#d97706", bg: "#fffbeb" },
  { icon: Users,     title: "Review Generation",          body: "Systematic review program that turns happy customers into 5-star reviews — consistently, automatically, ethically.",         color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Zap,       title: "AI Local Optimization",      body: "Get cited in ChatGPT, Perplexity, and Google AI Overviews when people ask about local services in your city.",              color: "#be185d", bg: "#fdf2f8" },
];
 
const faqs = [
  {
    q: "How long before I appear in the local pack?",
    a: "Most businesses see Google Maps ranking improvements in 30–60 days. Full local pack domination typically happens in 60–90 days depending on your competition and current GBP health.",
  },
  {
    q: "My business has multiple locations — can you help?",
    a: "Absolutely. We build individual local SEO strategies for each location — separate GBP profiles, location-specific landing pages, and city-by-city citation building.",
  },
  {
    q: "Do I need a website for local SEO?",
    a: "A website helps significantly, but we can start with GBP optimization alone. Most clients see major improvements from GBP + citations even before we touch their website.",
  },
  {
    q: "How do you get more reviews ethically?",
    a: "We set up a review request system — post-purchase or post-service messages that make it easy for happy customers to leave a review. No fake reviews, no incentivizing, fully Google-compliant.",
  },
  {
    q: "What's a citation and why does it matter?",
    a: "A citation is any mention of your business name, address, and phone number (NAP) online. Consistent citations across directories tell Google your business is legitimate and trustworthy — directly impacting local rankings.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. We earn your business every month with results. Most clients see ROI within 60 days and stay because it works — not because they're locked in.",
  },
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
                  Local SEO Specialists
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0f0f1a] sm:text-5xl lg:text-6xl">
                Own Every Corner<br />
                <span className="text-[#534AB7]">Of Your Local Market</span><br />
                in 2026
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-lg text-lg text-[#64748b] leading-relaxed">
                Your customers are searching for you right now — in your city, your neighborhood, your street. We make sure they find you first, every time, on Google Maps and organic search.
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="flex items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/30 transition-all hover:bg-[#3C3489] hover:shadow-[#534AB7]/50 hover:-translate-y-0.5"
                >
                  Get Free Local SEO Audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#case-studies"
                  className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  See Case Studies
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2">
                {["No contracts", "Local pack in 60 days", "Founder works your account"].map((t) => (
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
                <p className="mb-4 text-sm font-semibold text-[#0f0f1a]">Michigan Sports Outdoor — Michigan</p>
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
              Your Best Customers Are Searching.<br />They Just Can't Find You.
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
              <motion.p variants={fadeUp} className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#534AB7]">Our local SEO edge</motion.p>
              <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-[#0f0f1a] sm:text-4xl">
                We Get Your Message to<br />Every Corner of Your City
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base text-[#64748b] leading-relaxed">
                We don't do generic local SEO. We study your city, your neighborhoods, your competitors, and your buyers — then build a hyper-local strategy that puts you in front of the right people at exactly the right moment.
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
                { color: "#534AB7", title: "Local pack in the top 3",           body: "We optimize every signal Google uses for Maps rankings — proximity, relevance, and prominence — to push you into the coveted top 3." },
                { color: "#0891b2", title: "Brand reputation that precedes you", body: "Consistent NAP, glowing reviews, and E-E-A-T content that makes locals trust you before they've even clicked your listing." },
                { color: "#d97706", title: "Competitor displacement strategy",   body: "We analyze exactly why your competitors outrank you and systematically close the gap — then overtake them." },
                { color: "#16a34a", title: "Revenue-focused reporting",          body: "We track calls, direction requests, and website visits from local search — not just rankings. Real business outcomes every Monday." },
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
              From Invisible to #1 in Your City in 60 Days
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
              Local Businesses We've Helped Dominate<br />Their Markets
            </motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <motion.div key={cs.name} variants={fadeUp} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
                {/* Card header */}
                <div className="border-b border-[#e2e8f0] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-lg px-3 py-1 text-xs font-bold" style={{ backgroundColor: cs.badgeBg, color: cs.badgeColor }}>{cs.badge}</span>
                    <span className="text-xs text-[#64748b]">{cs.city}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#0f0f1a]">{cs.name}</h3>
                </div>
                {/* Before / After */}
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
                {/* Stats */}
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
              What's in Your Local SEO Package
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
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#c4b5fd]">Ready to dominate locally?</motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Your City Is Searching.<br />Make Sure They Find You.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-[#c4b5fd] leading-relaxed">
              Get a free local SEO audit — the founder personally reviews your GBP, citations, reviews, and local rankings, then delivers a 90-day plan to dominate your city within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#534AB7] shadow-lg transition-all hover:bg-[#f5f3ff] hover:-translate-y-0.5"
              >
                Get Free Local SEO Audit <ArrowRight className="h-4 w-4" />
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
 





