
"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, CheckCircle, Users, MapPin,
  Play, Youtube, X, Phone,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
/* ─── DATA — Toptal-style, video where available ─── */
const caseStudies = [
  {
    id: 1,
    category: "Ecommerce SEO",
    location: "United States",
    badgeColor: "#0891b2",
    badgeBg: "#ecfeff",
    client: "SMK Store",
    headline: "+75% US revenue in 2 months by fixing mass non-indexing across a 35,000-product catalog.",
    video: "gFod-dTY-bg",
    challenge: "SMK Store's 35,000+ product pages were barely indexed. Thin, near-identical boilerplate descriptions triggered Google's duplicate-content filters, Core Web Vitals were failing, and US organic revenue had stalled.",
    solution: "We rewrote product content brand by brand with unique, people-first descriptions, optimized crawl budget, implemented product schema, fixed Core Web Vitals, and resubmitted pages to GSC in batches — aligned with Google's 2026 Helpful Content standards.",
    outcome: "Indexing rate jumped +285%, over 12,000 product pages got indexed and started ranking, and US revenue grew 75% within two months — with no additional ad spend. All verified via Google Search Console.",
    metrics: [{ v: "+75%", l: "US revenue" }, { v: "+285%", l: "Indexing rate" }, { v: "12K+", l: "Pages indexed" }],
  },
  {
    id: 2,
    category: "Local SEO",
    location: "United States",
    badgeColor: "#059669",
    badgeBg: "#ecfdf5",
    client: "Local HVAC Services",
    headline: "Top 3 map pack and a Google AI Overview placement — from zero local visibility in 60 days.",
    video: "g_1TfDU4YeA",
    challenge: "A local HVAC service business had no map pack presence, no 'near me' rankings, and zero visibility in Google's new AI Overview results for high-intent emergency service searches.",
    solution: "We fully optimized the Google Business Profile, fixed NAP consistency across 50+ directories, built service-area landing pages, launched a review generation program, and structured content to be cited in AI Overviews.",
    outcome: "The business reached the top 3 Google Maps pack for its primary service keywords, earned a featured AI Overview placement, and grew organic clicks 5.7x in 60 days — driving consistent inbound calls.",
    metrics: [{ v: "Top 3", l: "Maps pack" }, { v: "Featured", l: "AI Overview" }, { v: "+5.7x", l: "Organic calls" }],
  },
  {
    id: 3,
    category: "Technical SEO",
    location: "Michigan, USA",
    badgeColor: "#185FA5",
    badgeBg: "#E6F1FB",
    client: "Michigan Outdoor Sports",
    headline: "+476% organic clicks and +285% indexing rate — recovered from near-zero GSC visibility.",
    video: "Y5PxSECNGP0",
    challenge: "Brand pages were never properly submitted to GSC, thin content caused mass non-indexing, and crawl budget was being wasted — leaving thousands of pages invisible despite being a real physical business.",
    solution: "We submitted sitemaps directly to GSC, fixed indexation blocks and crawl waste, rewrote brand pages with unique content, and resubmitted in batches — backed by a Michigan-specific local keyword strategy.",
    outcome: "+476% organic clicks and a +285% indexing rate within 90 days — 12,000+ pages indexed from near-zero, CTR well above industry average, with no ad spend.",
    metrics: [{ v: "+476%", l: "Organic clicks" }, { v: "+285%", l: "Indexing rate" }, { v: "12K+", l: "Pages indexed" }],
  },
];
 
const trustSignals = [
  { icon: Shield,      text: "All results verified with real GSC data" },
  { icon: CheckCircle, text: "No vanity metrics — clicks, leads & revenue" },
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
 
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── HERO ── */}
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
            <motion.span variants={fadeUp} className="mb-4 inline-block rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
              Verified Results · Real GSC Data
            </motion.span>
            <motion.h1 variants={fadeUp} className="mb-4 text-5xl font-black tracking-tight text-[#0a0f2e] sm:text-6xl">
              Case Studies
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-[#475569] leading-relaxed">
              Real results from real clients — most backed by live Google Search Console screen recordings. No vanity metrics. Just clicks, rankings, leads, and revenue.
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
 
      {/* ── CASE STUDIES (Toptal-style, alternating) ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {caseStudies.map((cs, index) => {
              const videoLeft = index % 2 === 0; // alternate sides
              return (
                <motion.article
                  key={cs.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm lg:grid-cols-2"
                >
                  {/* VISUAL (video or gradient) */}
                  <div className={`${videoLeft ? "" : "lg:order-2"}`}>
                    {cs.video ? (
                      <div
                        className="group relative h-full min-h-[300px] cursor-pointer bg-[#0a0f2e]"
                        onClick={() => setActiveVideo(cs.video)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`}
                          alt={`${cs.client} SEO case study`}
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cs.video}/hqdefault.jpg`; }}
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
                          <p className="text-sm font-bold text-white">{cs.client} — {cs.location}</p>
                          <p className="text-xs text-white/70">Live GSC screen recording</p>
                        </div>
                      </div>
                    ) : (
                      /* No video — branded gradient panel */
                      <div className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#534AB7] to-[#3C3489] p-8">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
                        <div className="relative text-center">
                          <Shield className="mx-auto mb-4 h-12 w-12 text-white/80" />
                          <p className="text-2xl font-black text-white">{cs.client}</p>
                          <p className="mt-1 text-sm text-white/70">{cs.location}</p>
                          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white">
                            <CheckCircle className="h-3.5 w-3.5" /> #1 Dallas Family Law
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
 
                  {/* CONTENT */}
                  <div className={`flex flex-col p-8 lg:p-10 ${videoLeft ? "" : "lg:order-1"}`}>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: cs.badgeBg, color: cs.badgeColor }}>
                        {cs.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#64748b]">
                        <MapPin className="h-3.5 w-3.5" />{cs.location}
                      </span>
                    </div>
 
                    <h2 className="mb-6 text-xl font-black leading-snug text-[#0a0f2e]">{cs.headline}</h2>
 
                    <div className="space-y-4">
                      <div>
                        <p className="mb-1 text-sm font-bold" style={{ color: "#ef4444" }}>Challenge</p>
                        <p className="text-sm text-[#475569] leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-bold" style={{ color: GREEN_DARK }}>Solution</p>
                        <p className="text-sm text-[#475569] leading-relaxed">{cs.solution}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-bold" style={{ color: "#534AB7" }}>Outcome</p>
                        <p className="text-sm text-[#475569] leading-relaxed">{cs.outcome}</p>
                      </div>
                    </div>
 
                    {/* metric chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {cs.metrics.map((m) => (
                        <span key={m.l} className="inline-flex items-baseline gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: "rgba(62,180,137,0.3)", background: "rgba(62,180,137,0.08)", color: GREEN_DARK }}>
                          <span className="text-sm font-black">{m.v}</span> {m.l}
                        </span>
                      ))}
                    </div>
 
                    {cs.video && (
                      <button
                        onClick={() => setActiveVideo(cs.video)}
                        className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                        style={{ background: GREEN }}
                      >
                        <Play className="h-4 w-4 fill-white" /> Watch Full Case Study
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ── BOTTOM CTA — dark navy + green ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>
              Ready to be our next case study?
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white">
              Your Business. Your Results.<br />
              <span style={{ color: GREEN }}>Let&apos;s Build the Story.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70 leading-relaxed">
              Get a free SEO audit — the founder personally reviews your site and delivers a 90-day growth roadmap within 24 hours. No tools, no templates, no juniors.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Get Free SEO Audit <ArrowRight className="h-4 w-4" />
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
                  <CheckCircle className="h-4 w-4" style={{ color: GREEN }} />{t}
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
                title="SearchPrex case study"
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
 