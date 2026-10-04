"use client";

// app/case-studies/[industry]/[client]/CaseStudyDetail.tsx
//
// Enterprise Customer Story Island — Semrush Inspired Light Theme Architecture
// Features:
// - Crisp radiant Light-Theme Hero with brand colors (#534AB7 purple, #3eb489 emerald)
//   and the signature Semrush Equalizer Waveform frequency bars.
// - Dedicated In-Depth Boxes for The Outcome, The Challenge, and The Strategy (fully defined multi-phase execution).
// - Ultra-modern, animated Baseline vs. Results Comparative Reality Matrix.
// - 2-Column Responsive Layout: Sticky Sidebar with Table of Contents, Executive Author Profile & Tech Stack.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, CheckCircle, CheckCircle2, MapPin, Play, Youtube, X,
  BarChart3, ZoomIn, ChevronRight, TrendingUp, Quote, Copy, Check,
  Share2, AlertTriangle, Layers, Cpu, Sparkles, CheckCheck, Clock,
} from "lucide-react";
import { detailUrl, type CaseStudy } from "../../data";
import {
  CASE_DETAILS,
  DEFAULT_FIXES,
  EXTRA_PROOF,
  OPERATIONAL_VISUALS,
  BEFORE_AFTER_MATRIX,
  PULL_QUOTES,
  DEFAULT_PULL_QUOTE,
  KEY_TAKEAWAYS,
  DEFAULT_KEY_TAKEAWAYS,
  TECH_STACK_TAGS,
  DEFAULT_TECH_STACK,
  OUTCOME_BOXES,
  DEFAULT_OUTCOME_BOX,
  CHALLENGE_BOXES,
  DEFAULT_CHALLENGE_BOX,
  STRATEGY_BOXES,
  DEFAULT_STRATEGY_BOX,
} from "../../details";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import type { Guide } from "@/lib/guides";
import ProofImage from "@/components/ProofImage";

const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";

const SERVICE_HREF: Record<string, string> = {
  "Ecommerce SEO": "/services/ecommerce-seo",
  "Local SEO": "/services/local-seo",
  "Technical SEO": "/services/technical-seo",
  "Law Firm SEO": "/services/law-firm-seo",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ── SEMRUSH LG-STYLE SPIKE FIELD (hero bottom edge) ──
// Dense row of thin triangular needles, filled with one shared vertical
// gradient (brand violet on top → brand mint at the base). Heights come from a
// fixed sine mix rather than Math.random so server and client markup match.
const SPIKE_COUNT = 110;
const SPIKE_VB_W = 1100;
const SPIKE_VB_H = 200;
const SPIKES = Array.from({ length: SPIKE_COUNT }, (_, i) => {
  const step = SPIKE_VB_W / SPIKE_COUNT;
  const wobble = Math.sin(i * 1.7) * 0.06 + Math.sin(i * 0.37) * 0.05;
  const h = SPIKE_VB_H * (0.86 + wobble);
  const x = i * step;
  return `${x.toFixed(2)},${SPIKE_VB_H} ${(x + step / 2).toFixed(2)},${(SPIKE_VB_H - h).toFixed(2)} ${(x + step).toFixed(2)},${SPIKE_VB_H}`;
});

function SpikeField() {
  return (
    <motion.svg
      aria-hidden
      viewBox={`0 0 ${SPIKE_VB_W} ${SPIKE_VB_H}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[150px] w-full sm:h-[190px] lg:h-[220px]"
      style={{ transformOrigin: "bottom" }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <defs>
        <linearGradient id="cs-spike-grad" x1="0" y1="0" x2="0" y2={SPIKE_VB_H} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#9b8cff" />
          <stop offset="62%" stopColor="#8f7cf7" />
          <stop offset="85%" stopColor="#3ee0b0" />
          <stop offset="100%" stopColor="#3eb489" />
        </linearGradient>
      </defs>
      <g fill="url(#cs-spike-grad)">
        {SPIKES.map((pts, i) => (
          <polygon key={i} points={pts} />
        ))}
      </g>
    </motion.svg>
  );
}

export default function CaseStudyDetail({ cs, related, guide }: { cs: CaseStudy; related: CaseStudy[]; guide?: Guide }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const detail = CASE_DETAILS[cs.slug.client];
  const fixes = detail?.fixes ?? DEFAULT_FIXES;
  const proof = detail?.proof ?? EXTRA_PROOF[cs.slug.client] ?? [];
  const operationalVisual = detail?.operationalVisual ?? OPERATIONAL_VISUALS[cs.slug.client];
  const beforeAfter = detail?.beforeAfter ?? BEFORE_AFTER_MATRIX[cs.slug.client] ?? [];
  const pullQuote = detail?.pullQuote ?? PULL_QUOTES[cs.slug.client] ?? DEFAULT_PULL_QUOTE;
  const takeaways = detail?.keyTakeaways ?? KEY_TAKEAWAYS[cs.slug.client] ?? DEFAULT_KEY_TAKEAWAYS;
  const techStack = detail?.techStack ?? TECH_STACK_TAGS[cs.slug.client] ?? DEFAULT_TECH_STACK;
  const leadSource = `case-study:${cs.slug.client}`;

  const outcomeBox = detail?.outcomeBox ?? OUTCOME_BOXES[cs.slug.client] ?? DEFAULT_OUTCOME_BOX;
  const challengeBox = detail?.challengeBox ?? CHALLENGE_BOXES[cs.slug.client] ?? DEFAULT_CHALLENGE_BOX;
  const strategyBox = detail?.strategyBox ?? STRATEGY_BOXES[cs.slug.client] ?? DEFAULT_STRATEGY_BOX;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white">

      {/* ── 1. SEMRUSH LG-STYLE HERO: dark canvas, big white headline, spike field ── */}
      <section className="relative overflow-hidden bg-[#16181d] text-white">
        <SpikeField />
        {/* Darken the spike tips directly behind the headline so the text stays readable */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-b from-[#16181d] via-transparent to-transparent sm:h-[190px] lg:h-[220px]" style={{ opacity: 0.55 }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pt-36 lg:pb-28">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.nav variants={fadeUp} aria-label="Breadcrumb"
              className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              <Link href="/case-studies" className="transition-colors hover:text-white">Case Studies</Link>
              <ChevronRight className="h-3 w-3 text-white/35" />
              <span className="text-white/45">{cs.industry}</span>
            </motion.nav>

            <motion.h1 variants={fadeUp}
              className="max-w-[17ch] text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.025em] text-white [text-shadow:0_2px_24px_rgba(22,24,29,0.65)] sm:text-6xl lg:text-[4.5rem]">
              {cs.headline}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ── 1b. KEY RESULTS STRIP (white, directly under the hero) ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: PURPLE }}>
                  {cs.seoType}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  <MapPin className="h-3.5 w-3.5 text-[#2f9670]" />{cs.location}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  <Shield className="h-3.5 w-3.5 text-[#2f9670]" /> Verified Search Console Data
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
                {cs.metrics.map((m, i) => (
                  <motion.div key={m.l}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className={i > 0 ? "sm:pl-6" : ""}>
                    <p className="text-4xl font-semibold tracking-tight text-[#0a0f2e] lg:text-5xl">{m.v}</p>
                    <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{m.l}</p>
                  </motion.div>
                ))}
              </div>

              {(cs.period || cs.verifiedVia) && (
                <p className="mt-5 text-xs text-slate-500">
                  {cs.period && (
                    <>Measured over <strong className="font-semibold text-slate-800">{cs.period}</strong></>
                  )}
                  {cs.period && cs.verifiedVia && " · "}
                  {cs.verifiedVia && (
                    <>Verified in <strong className="font-semibold text-slate-800">{cs.verifiedVia}</strong></>
                  )}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
              <Link href="/free-audit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: GREEN }}>
                <BarChart3 className="h-4 w-4" /> Get Results Like These — Free Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {cs.video && (
                <button onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:bg-slate-50">
                  <Play className="h-4 w-4 text-[#2f9670]" /> Watch GSC Walkthrough
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN EDITORIAL CANVAS ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          {/* Mobile Jump Navigation (< lg only) */}
          <div className="mb-10 lg:hidden overflow-x-auto pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-[#64748b]">
              <span className="shrink-0 uppercase text-[10px] tracking-wider text-[#94a3b8]">Chapters:</span>
              <a href="#the-outcome" className="shrink-0 rounded-full bg-emerald-50 text-emerald-800 px-3 py-1.5">01. Outcome</a>
              <a href="#the-challenge" className="shrink-0 rounded-full bg-rose-50 text-rose-800 px-3 py-1.5">02. Challenge</a>
              <a href="#the-strategy" className="shrink-0 rounded-full bg-[#f3f0ff] text-[#534AB7] px-3 py-1.5">03. Strategy</a>
              {beforeAfter.length > 0 && (
                <a href="#before-after" className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-slate-800">04. Results Matrix</a>
              )}
              {operationalVisual && (
                <a href="#operational-impact" className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-slate-800">05. Business Impact</a>
              )}
              {proof.length > 0 && (
                <a href="#the-proof" className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-slate-800">06. Evidence</a>
              )}
              {takeaways.length > 0 && (
                <a href="#key-takeaways" className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-slate-800">07. Takeaways</a>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16 items-start">

            {/* ── LEFT STICKY SIDEBAR (Semrush Executive Layout) ── */}
            <aside className="hidden lg:block w-[320px] xl:w-[340px] shrink-0 sticky top-28 self-start space-y-6">
              
              {/* Sticky Table of Contents (Semrush Clean Uppercase Style) */}
              <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-6 shadow-xs">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#0a0f2e] mb-4">
                  Table of Contents
                </p>
                <nav aria-label="Table of contents" className="relative space-y-1.5 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-slate-200">
                  <a href="#the-outcome" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                    01. THE OUTCOME
                  </a>
                  <a href="#the-challenge" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                    02. THE CHALLENGE
                  </a>
                  <a href="#the-strategy" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                    03. THE STRATEGY &amp; SOLUTION
                  </a>
                  {beforeAfter.length > 0 && (
                    <a href="#before-after" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                      04. BASELINE VS. RESULTS
                    </a>
                  )}
                  {operationalVisual && (
                    <a href="#operational-impact" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                      05. OPERATIONAL IMPACT
                    </a>
                  )}
                  {proof.length > 0 && (
                    <a href="#the-proof" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                      06. UNEDITED EVIDENCE (GSC)
                    </a>
                  )}
                  {takeaways.length > 0 && (
                    <a href="#key-takeaways" className="block pl-3.5 py-1 text-xs font-bold text-slate-600 hover:text-[#534AB7] hover:border-l-2 hover:border-[#534AB7] -ml-[1px] transition-all">
                      07. STRATEGIC LESSONS
                    </a>
                  )}
                </nav>
              </div>

              {/* Strategist / Author Snapshot (Just like Semrush LG VP block) */}
              <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a0f2e] text-xs font-black text-white shadow-xs">
                    MS
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0a0f2e]">Mubashar Sharif</p>
                    <p className="text-[11px] text-slate-500">Lead Technical SEO Strategist &amp; Founder, SearchPrex</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Share Story:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
                      title="Copy case study link"
                    >
                      {copied ? <Check className="h-3 w-3 text-[#2f9670]" /> : <Copy className="h-3 w-3 text-slate-500" />}
                      <span>{copied ? "Copied" : "Copy Link"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* At a Glance Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-6 shadow-xs">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#64748b] mb-4">
                  Project At a Glance
                </p>
                <dl className="space-y-3.5 text-xs">
                  <div className="flex justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <dt className="text-slate-500">Client</dt>
                    <dd className="font-bold text-[#0a0f2e] text-right">{cs.client}</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <dt className="text-slate-500">Industry</dt>
                    <dd className="font-bold text-[#0a0f2e] text-right">{cs.industry}</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <dt className="text-slate-500">Location</dt>
                    <dd className="font-bold text-[#0a0f2e] text-right">{cs.location}</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <dt className="text-slate-500">Service</dt>
                    <dd className="font-bold text-[#534AB7] text-right">
                      <Link href={SERVICE_HREF[cs.seoType] ?? "/services"} className="hover:underline">
                        {cs.seoType}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-500">Verification</dt>
                    <dd className="font-bold text-[#2f9670] flex items-center gap-1 text-right">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" /> {cs.verifiedVia ?? "GSC Live Telemetry"}
                    </dd>
                  </div>
                </dl>

                {techStack.length > 0 && (
                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2.5">
                      Capabilities &amp; Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.map((tech) => (
                        <span key={tech} className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-2xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Action Card */}
              <div className="rounded-2xl border border-[#bfe3d3] bg-[#eefaf4] p-6 text-center shadow-xs">
                <span className="inline-block rounded-full bg-[#2f9670]/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#2f9670]">
                  Free Reality Check
                </span>
                <h4 className="mt-2 text-sm font-black text-[#0a0f2e]">
                  Facing this drop on your store?
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#374151]">
                  Get an itemized crawl &amp; indexing audit in 24 hours.
                </p>
                <Link href="/free-audit"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}>
                  Audit My Site Free <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </aside>

            {/* ── RIGHT DYNAMIC EDITORIAL CANVAS ── */}
            <div className="flex-1 min-w-0 max-w-4xl space-y-16">

              {/* Lead-in Context (Semrush Style introductory paragraph) */}
              <div className="text-base sm:text-lg font-medium leading-relaxed text-slate-700 border-l-4 border-[#534AB7] pl-5 py-1">
                {cs.client} partnered with SearchPrex to eliminate severe organic search bottlenecks, overcome algorithmic indexing suppression, and establish sustainable organic commercial acquisition.
              </div>

              {/* ── BOX 01: THE OUTCOME (Semrush Style Dedicated Box) ── */}
              <section id="the-outcome" className="scroll-mt-32">
                <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 via-white to-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-[#534AB7]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#534AB7]">
                      The Outcome
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0a0f2e] sm:text-3xl lg:text-4xl">
                    {outcomeBox.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    {outcomeBox.summary}
                  </p>

                  {/* Bullet Highlights with Green Checkmarks */}
                  <div className="mt-6 space-y-3">
                    {outcomeBox.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2f9670]" />
                        <span className="text-sm font-medium leading-snug text-slate-800">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Primary Visual Showcase (Video or Screenshot) */}
                  <div className="mt-8">
                    {cs.video ? (
                      <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl bg-[#080b1e] shadow-lg"
                        onClick={() => setVideoOpen(true)}>
                        <img src={`https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`}
                          alt={`${cs.client} ${cs.seoType} case study — live Google Search Console screen recording`}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cs.video}/hqdefault.jpg`; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080b1e]/90 via-[#080b1e]/20 to-transparent" />
                        <div className="absolute left-5 top-5 z-20 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md"
                          style={{ background: GREEN }}>
                          <Youtube className="h-3.5 w-3.5" /> Live GSC screen recording
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-2xl transition-all group-hover:scale-110"
                            style={{ background: GREEN }}>
                            <Play className="ml-1 h-7 w-7 fill-white text-white" />
                          </div>
                        </div>
                      </div>
                    ) : cs.image ? (
                      <button onClick={() => setLightbox(cs.image!)}
                        className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <img src={cs.image}
                          alt={`${cs.client} ${cs.seoType} results — Google Search Console / rankings screenshot`}
                          className="w-full transition-transform duration-300 group-hover:scale-[1.01]" />
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: "#0a0f2e" }}>
                          <ZoomIn className="h-3.5 w-3.5" /> Click to inspect data
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* ── BOX 02: THE CHALLENGE (Semrush Style Dedicated Box) ── */}
              <section id="the-challenge" className="scroll-mt-32">
                <div className="rounded-3xl border border-rose-200/90 bg-gradient-to-br from-rose-50/35 via-white to-white p-7 sm:p-9 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#ef4444]">
                      The Challenge
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0a0f2e] sm:text-3xl lg:text-4xl">
                    {challengeBox.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    {challengeBox.summary}
                  </p>

                  {/* Deep-dive sub-sections for each bottleneck */}
                  <div className="mt-8 space-y-6">
                    {challengeBox.points.map((point, idx) => (
                      <div key={idx} className="rounded-2xl border border-rose-100 bg-rose-50/30 p-5">
                        <h3 className="text-base font-black text-[#0a0f2e] flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-[#ef4444] shrink-0" />
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── BOX 03: THE STRATEGY & SOLUTION (FULL, DETAILED MULTI-PHASE BLUEPRINT) ── */}
              <section id="the-strategy" className="scroll-mt-32">
                <div className="rounded-3xl border border-[#534AB7]/30 bg-gradient-to-br from-[#534AB7]/[0.03] via-white to-[#3eb489]/[0.03] p-7 sm:p-9 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-[#534AB7]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#534AB7]">
                      The Strategy &amp; Solution
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0a0f2e] sm:text-3xl lg:text-4xl">
                    {strategyBox.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    {strategyBox.summary}
                  </p>

                  {/* Complete, In-Depth Multi-Phase Breakdown */}
                  <div className="mt-8 space-y-6">
                    {strategyBox.phases.map((ph, idx) => (
                      <div key={ph.phase} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-[#534AB7]/40 hover:shadow-md">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[#534AB7] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-2xs">
                            {ph.phase}
                          </span>
                          <h3 className="text-base font-black text-[#0a0f2e]">
                            {ph.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">
                          {ph.description}
                        </p>

                        {/* Deliverables checklist */}
                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                            Key Architectural Deliverables:
                          </p>
                          <ul className="space-y-1.5">
                            {ph.deliverables.map((deliv, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                                <CheckCheck className="h-3.5 w-3.5 text-[#2f9670] shrink-0 mt-0.5" />
                                <span>{deliv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Visibility Impact Banner */}
                  {detail?.aiVisibility && (
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#d9d5f5] bg-[#f5f3ff] p-4 text-sm text-[#3C3489]">
                      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#534AB7]" aria-hidden />
                      <span><strong>AI Visibility Impact:</strong> {detail.aiVisibility}</span>
                    </div>
                  )}
                </div>

                {/* Editorial Pull-Quote (Strategist Voice) */}
                {pullQuote && (
                  <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-[#f8f9fc] p-7 shadow-sm sm:p-9">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <Quote className="h-10 w-10 shrink-0 text-[#534AB7]/30" aria-hidden />
                      <div>
                        <p className="text-base italic leading-relaxed text-slate-800 sm:text-lg">
                          &ldquo;{pullQuote.quote}&rdquo;
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a0f2e] text-xs font-black text-white shadow-xs">
                            MS
                          </div>
                          <div>
                            <p className="text-sm font-black text-[#0a0f2e]">{pullQuote.author}</p>
                            <p className="text-xs text-slate-500">{pullQuote.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* ── CHAPTER 04: STARTING BASELINE VS SEARCHPREX RESULTS (IMAGE 2 UPGRADE WITH ANIMATED EFFECTS) ── */}
              {beforeAfter.length > 0 && (
                <section id="before-after" className="scroll-mt-32">
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sm:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                      <div>
                        <span className="inline-block rounded-full bg-[#534AB7]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#534AB7]">
                          Chapter 04 · Reality Matrix
                        </span>
                        <h2 className="mt-2 text-2xl font-black text-[#0a0f2e] sm:text-3xl">
                          Starting Baseline vs. SearchPrex Results
                        </h2>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold"
                        style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                        <span className="h-2 w-2 rounded-full bg-[#2f9670] animate-pulse" />
                        <TrendingUp className="h-3.5 w-3.5" /> Direct Measured Impact
                      </span>
                    </div>

                    {/* Animated Bento Grid Rows */}
                    <div className="mt-6 space-y-4">
                      {beforeAfter.map((m, idx) => (
                        <motion.div
                          key={m.label}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="group rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50/60 via-white to-slate-50/30 p-5 shadow-2xs hover:shadow-md hover:border-[#3eb489]/50 transition-all duration-300"
                        >
                          {/* Row Header & Impact Pill */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <p className="text-sm font-black text-[#0a0f2e] flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold">
                                {idx + 1}
                              </span>
                              {m.label}
                            </p>
                            <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-black text-white shadow-xs"
                              style={{ background: "linear-gradient(135deg, #534AB7 0%, #7b61ff 100%)" }}>
                              <TrendingUp className="h-3 w-3" />
                              {m.delta}
                            </span>
                          </div>

                          {/* Side-by-Side Comparison Bento */}
                          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
                            {/* Baseline Box (Red) */}
                            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-left transition-colors group-hover:bg-rose-50">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ef4444]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                                Starting Baseline
                              </div>
                              <p className="mt-1 text-xs font-bold text-[#991b1b]">{m.before}</p>
                            </div>

                            {/* Center Animated Dynamic Arrow */}
                            <div className="hidden sm:flex items-center justify-center">
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[#534AB7] shadow-2xs"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </motion.div>
                            </div>

                            {/* Outcome Box (Green) */}
                            <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-3.5 text-left shadow-2xs transition-colors group-hover:bg-emerald-50">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                                <Sparkles className="h-3 w-3 text-[#2f9670]" />
                                SearchPrex Outcome
                              </div>
                              <p className="mt-1 text-xs font-black text-[#065f46]">{m.after}</p>
                            </div>
                          </div>

                          {/* Animated Growth Progress Bar */}
                          <div className="mt-3 pt-2">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                              <span>Baseline (Before)</span>
                              <span className="text-[#2f9670] font-black">Verified Growth Jump</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
                              <motion.div
                                initial={{ width: "25%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + idx * 0.1 }}
                                className="h-full rounded-full bg-gradient-to-r from-rose-400 via-[#534AB7] to-[#3eb489]"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── CHAPTER 05: REAL-WORLD OPERATIONAL OUTCOME ── */}
              {operationalVisual && (
                <section id="operational-impact" className="scroll-mt-32">
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-[#080b1e] text-white shadow-xl">
                    <div className="grid items-center md:grid-cols-[1.1fr_1fr]">
                      <div className="relative aspect-[16/10] min-h-[280px] w-full overflow-hidden md:aspect-auto md:h-full">
                        <Image
                          src={operationalVisual.src}
                          alt={operationalVisual.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080b1e] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#080b1e]" />
                      </div>
                      <div className="p-7 sm:p-9">
                        <span
                          className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm"
                          style={{ background: GREEN_DARK }}
                        >
                          {operationalVisual.badge}
                        </span>
                        <h3 className="mt-4 text-xl font-black leading-snug tracking-tight text-white sm:text-2xl">
                          {operationalVisual.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/80">
                          {operationalVisual.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ── CHAPTER 06: UNEDITED EVIDENCE & SCREENSHOTS ── */}
              {proof.length > 0 && (
                <section id="the-proof" className="scroll-mt-32">
                  <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <span className="inline-block rounded-full bg-[#534AB7]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#534AB7]">
                      Chapter 06 · Verified Evidence
                    </span>
                    <h2 className="mt-2 text-2xl font-black text-[#0a0f2e] sm:text-3xl">
                      Unedited Google Search Console Captures
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Click any screenshot to inspect the exact numbers yourself.</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      {proof.map((shot) => (
                        <ProofImage key={shot.src} {...shot} frameAspect="16 / 9" />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── CHAPTER 07: STRATEGIC TAKEAWAYS FOR OWNERS ── */}
              {takeaways.length > 0 && (
                <section id="key-takeaways" className="scroll-mt-32">
                  <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <span className="inline-block rounded-full bg-[#534AB7]/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#534AB7]">
                      Chapter 07 · Strategic Blueprint
                    </span>
                    <h2 className="mt-2 text-2xl font-black text-[#0a0f2e] sm:text-3xl">
                      3 Key Lessons for {cs.industry} Websites
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Actionable optimization principles discovered during this engagement that you can audit on your own site today.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {takeaways.map((item, idx) => (
                        <div key={item.title} className="flex flex-col rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 shadow-2xs">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white"
                            style={{ background: PURPLE }}>
                            {idx + 1}
                          </span>
                          <h3 className="mt-3 text-sm font-black text-[#0a0f2e]">{item.title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── CHAPTER 08: HIGH-CONVERTING BOTTOM LEAD MAGNET ── */}
              <div className="pt-4">
                {guide ? (
                  <GuideMagnet guide={guide} source={`case-study:${cs.slug.client}`} eyebrow={`How ${cs.client} was fixed, step by step`} />
                ) : (
                  <ArticleLeadMagnet
                    variant="banner"
                    source={leadSource}
                    copy={{
                      eyebrow: `Same problems as ${cs.client}?`,
                      headline: "Find out what is holding your site back.",
                      sub: "Send me your URL. I\u2019ll check it against the issues on this page \u2014 crawling, indexing, content, structure \u2014 and tell you what to fix first. Free, within 24 hours.",
                    }}
                  />
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 3. RELATED CASE STUDIES ── */}
      {related.length > 0 && (
        <section className="bg-[#f8fafc] border-t border-slate-200 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">Customer Success</span>
                <h2 className="mt-1 text-2xl font-black text-[#0a0f2e]">More {cs.seoType} Results</h2>
              </div>
              <Link href="/case-studies"
                className="inline-flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-80"
                style={{ color: PURPLE }}>
                View all stories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={detailUrl(r)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    {r.video ? (
                      <img src={`https://img.youtube.com/vi/${r.video}/hqdefault.jpg`} alt={r.client}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    ) : r.image ? (
                      <img src={r.image} alt={r.client}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${PURPLE}, #3C3489)` }}>
                        <span className="text-lg font-black text-white">{r.client}</span>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                      style={{ backgroundColor: r.badgeBg || PURPLE }}>
                      {r.seoType}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-3 text-sm font-bold leading-snug text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors">
                      {r.headline}
                    </h3>
                    <div className="mt-auto flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#2f9670]">{r.metrics[0].v}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{r.metrics[0].l}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      {videoOpen && cs.video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${cs.video}?autoplay=1`}
              title={`${cs.client} case study video`}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button onClick={() => setVideoOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              aria-label="Close video">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}>
          <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Enlarged proof capture" className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl" />
            <button onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              aria-label="Close preview">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
