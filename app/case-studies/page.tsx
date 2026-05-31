
"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, TrendingUp, Users, DollarSign, Globe,
  Shield, CheckCircle, BarChart2, Search, MapPin,
} from "lucide-react";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
/* ─── DATA ─── */
const caseStudies = [
  {
    id: 1,
    category: "Law Firm SEO",
    location: "Dallas, TX",
    badge: { color: "#534AB7", bg: "#f5f3ff" },
    title: "Morrison Family Law",
    tagline: "From Page 6 to #1 in Dallas — in 6 Weeks",
    icon: Shield,
    iconColor: "#534AB7",
    iconBg: "#f5f3ff",
    timeline: "60 days",
    metrics: [
      { icon: TrendingUp, value: "+380%", label: "Organic Visibility", color: "#534AB7" },
      { icon: Users,      value: "47",    label: "Leads / Month",      color: "#16a34a" },
      { icon: Globe,      value: "#1",    label: "Dallas Family Law",  color: "#534AB7" },
    ],
    challenge:
      "Morrison Family Law was invisible in Dallas search results — sitting on page 6 for their most important keyword, generating only 3 organic leads per month, and spending $4,200/mo on Google Ads with no brand presence.",
    solution:
      "We built a full local SEO strategy — E-E-A-T content highlighting attorney credentials, Google Business Profile optimization, citation building across 50+ directories, attorney schema markup, and local pack targeting for all Dallas practice area keywords.",
    results: [
      "Ranked #1 for 'family law attorney Dallas' within 6 weeks",
      "+380% increase in organic visibility across all keywords",
      "47 new client consultations per month from organic search",
      "Google Maps local pack — top 3 for all primary practice areas",
      "$0 Google Ads spend — fully replaced by organic traffic",
    ],
    gscNote: "All data verified via Google Search Console screenshots",
  },
  {
    id: 2,
    category: "Shopify SEO",
    location: "United States",
    badge: { color: "#0891b2", bg: "#ecfeff" },
    title: "SMK Store",
    tagline: "+75% Revenue Growth — Tactical Gear, USA",
    icon: BarChart2,
    iconColor: "#0891b2",
    iconBg: "#ecfeff",
    timeline: "2 months",
    metrics: [
      { icon: DollarSign,  value: "+75%",   label: "Revenue Growth",   color: "#16a34a" },
      { icon: Search,      value: "12K+",   label: "Pages Indexed",    color: "#534AB7" },
      { icon: TrendingUp,  value: "+285%",  label: "Indexing Rate",    color: "#16a34a" },
    ],
    challenge:
      "SMK Store had a 35,000+ product catalog suffering mass non-indexing — near-identical boilerplate descriptions across thousands of SKUs caused Google to skip indexing most product pages, and Core Web Vitals were failing.",
    solution:
      "Brand-by-brand unique content rewriting at scale, crawl budget optimization, product schema implementation, batch GSC resubmission in waves, and Core Web Vitals fixes — all verified against real Google Search Console data.",
    results: [
      "+75% US revenue growth within 2 months",
      "Indexing rate jumped +285% after content rewrites",
      "12,000+ product pages now indexed and ranking",
      "Core Web Vitals improved to 'Good' across the catalog",
      "Buyer-intent product keywords ranking page one",
    ],
    gscNote: "All data verified via Google Search Console screenshots",
  },
  {
    id: 3,
    category: "Local SEO",
    location: "United States",
    badge: { color: "#059669", bg: "#ecfdf5" },
    title: "Local HVAC Services",
    tagline: "Top 3 Map Pack + AI Overview Placement",
    icon: MapPin,
    iconColor: "#059669",
    iconBg: "#ecfdf5",
    timeline: "60 days",
    metrics: [
      { icon: Globe,      value: "Top 3",   label: "Local Map Pack",   color: "#16a34a" },
      { icon: Search,     value: "Featured",label: "AI Overview",      color: "#534AB7" },
      { icon: TrendingUp, value: "+5.7x",   label: "Clicks in 60 days",color: "#16a34a" },
    ],
    challenge:
      "A local HVAC service business had zero local visibility — not appearing in the Google Maps local pack, no 'near me' rankings, and no presence in Google's new AI Overview results for high-intent emergency service searches.",
    solution:
      "Full local SEO build — Google Business Profile optimization, NAP citation consistency across 50+ directories, location landing pages, review generation, and structured content built to capture AI Overview placements for service keywords.",
    results: [
      "Top 3 Google Maps local pack for primary service keywords",
      "Featured in Google AI Overview for high-intent searches",
      "+5.7x organic clicks within 60 days",
      "Ranking for 'near me' and emergency service queries",
      "Consistent inbound calls from organic local search",
    ],
    gscNote: "All data verified via Google Search Console screenshots",
  },
  {
    id: 4,
    category: "Technical SEO",
    location: "Michigan, USA",
    badge: { color: "#185FA5", bg: "#E6F1FB" },
    title: "Michigan Outdoor Sports",
    tagline: "+476% Organic Clicks — Zero Ad Spend",
    icon: Search,
    iconColor: "#185FA5",
    iconBg: "#E6F1FB",
    timeline: "90 days",
    metrics: [
      { icon: TrendingUp, value: "+476%",  label: "Organic Clicks",   color: "#16a34a" },
      { icon: Search,     value: "+285%",  label: "Indexing Rate",    color: "#534AB7" },
      { icon: Globe,      value: "12K+",   label: "Pages Indexed",    color: "#16a34a" },
    ],
    challenge:
      "Michigan Outdoor Sports had zero GSC visibility — their brand pages had never been properly submitted to Google Search Console, thin content was causing non-indexing, and they had no local keyword rankings despite being a real physical business.",
    solution:
      "Submitted brand sitemap directly to GSC, fixed technical indexation blocks, resolved crawl budget waste, rewrote brand pages with unique content, and built a Michigan-specific keyword strategy targeting outdoor sports buyers statewide.",
    results: [
      "+476% organic clicks within 90 days of technical fixes",
      "Indexing rate improved +285% (near-zero to 12K+ pages)",
      "Monthly impressions established from scratch",
      "CTR significantly above industry average",
      "Ranking for 50+ Michigan local outdoor keywords",
    ],
    gscNote: "All data verified via Google Search Console screenshots",
  },
];
 
const trustSignals = [
  { icon: Shield,      text: "All results verified with real GSC data" },
  { icon: CheckCircle, text: "No vanity metrics — clicks, leads & revenue only" },
  { icon: Users,       text: "Real businesses, real owners, real outcomes" },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
/* ─── PAGE ─── */
export default function CaseStudiesPage() {
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── HERO — grey ── */}
      <section className="relative overflow-hidden border-b border-[#d4d8e3] bg-[#eaecf3] pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition-colors hover:text-[#534AB7]">
                ← Back to Home
              </Link>
            </motion.div>
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-block rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}
            >
              Verified Results · Real GSC Data
            </motion.span>
            <motion.h1 variants={fadeUp} className="mb-4 text-5xl font-black tracking-tight text-[#0a0f2e] sm:text-6xl">
              Case Studies
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-[#475569] leading-relaxed">
              Real results from real clients — verified with Google Search Console screenshots. No vanity metrics. Just clicks, rankings, leads, and revenue.
            </motion.p>
 
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {trustSignals.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Icon className="h-4 w-4" style={{ color: GREEN_DARK }} />{text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
 
      {/* ── CASE STUDIES ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-28">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: study.badge.bg, color: study.badge.color }}>
                    {study.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#64748b]">
                    <MapPin className="h-3.5 w-3.5" />{study.location}
                  </span>
                  <span className="text-xs text-[#64748b]">· {study.timeline}</span>
                  <span className="ml-auto flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-[10px] font-medium text-[#64748b]">
                    <Shield className="h-3 w-3 text-[#16a34a]" />
                    {study.gscNote}
                  </span>
                </div>
 
                <div className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
 
                  {/* Left — visual panel */}
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="mb-5 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
                      <div className="h-2 w-full" style={{ backgroundColor: study.badge.color }} />
                      <div className="p-6">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: study.iconBg }}>
                            <study.icon className="h-6 w-6" style={{ color: study.iconColor }} />
                          </div>
                          <div>
                            <h2 className="text-xl font-black text-[#0a0f2e]">{study.title}</h2>
                            <p className="text-sm text-[#64748b]">{study.location}</p>
                          </div>
                        </div>
                        <p className="mb-5 text-base font-bold text-[#0a0f2e] leading-snug">{study.tagline}</p>
                        <div className="grid grid-cols-3 gap-3">
                          {study.metrics.map((m) => (
                            <div key={m.label} className="rounded-xl bg-[#f8fafc] p-4 text-center">
                              <m.icon className="mx-auto mb-2 h-5 w-5" style={{ color: m.color }} />
                              <p className="text-xl font-black" style={{ color: m.color }}>{m.value}</p>
                              <p className="mt-0.5 text-[10px] text-[#64748b] leading-tight">{m.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
 
                    <div className="flex items-center gap-3 rounded-xl border border-[#d1fae5] bg-[#f0fdf4] px-4 py-3">
                      <div className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                      </div>
                      <p className="text-xs font-medium text-[#15803d]">
                        Verified Google Search Console data — not estimated, not projected
                      </p>
                    </div>
                  </div>
 
                  {/* Right — content */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <div className="mb-6 rounded-xl border-l-4 border-[#f59e0b] bg-[#fffbeb] p-5">
                      <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#92400e]">
                        <span className="text-base">⚠️</span> The Challenge
                      </h3>
                      <p className="text-sm text-[#78350f] leading-relaxed">{study.challenge}</p>
                    </div>
 
                    <div className="mb-6 rounded-xl border-l-4 border-[#534AB7] bg-[#f5f3ff] p-5">
                      <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#3730a3]">
                        <span className="text-base">🔧</span> Our Solution
                      </h3>
                      <p className="text-sm text-[#4338ca] leading-relaxed">{study.solution}</p>
                    </div>
 
                    <div className="rounded-xl border border-[#d1fae5] bg-white p-5">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#15803d]">
                        <span className="text-base">✅</span> Key Results
                      </h3>
                      <ul className="space-y-2.5">
                        {study.results.map((result) => (
                          <li key={result} className="flex items-start gap-2.5 text-sm text-[#374151]">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
 
                {index < caseStudies.length - 1 && (
                  <div className="mt-20 border-t border-dashed border-[#cbd0db]" />
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── BOTTOM CTA — green ── */}
      <section className="border-t border-[#d4d8e3] bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN_DARK }}>
              Ready to be our next case study?
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e]">
              Your Business. Your Results.<br />
              <span style={{ color: GREEN }}>Let&apos;s Build the Story.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-[#64748b] leading-relaxed">
              Get a free SEO audit — the founder personally reviews your site and delivers a 90-day growth roadmap within 24 hours. No tools, no templates, no juniors.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: "0 10px 25px -5px rgba(62,180,137,0.4)" }}
              >
                Get Free SEO Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-7 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#3eb489] hover:text-[#2f9670]"
              >
                Back to Home
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-6">
              {["24hr turnaround", "No contracts", "Founder does the audit"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                  <CheckCircle className="h-4 w-4 text-[#16a34a]" />{t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
 
    </main>
  );
}
 