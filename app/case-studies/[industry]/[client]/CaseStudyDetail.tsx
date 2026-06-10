"use client";
 
// app/case-studies/[industry]/[client]/CaseStudyDetail.tsx
// Client island for the individual case study page. Layout is aligned with the
// main /case-studies page (same #eaecf3 background, navy CTA band, green
// accents). CRO: hero CTA, sticky floating CTA, proof-first layout, related
// studies for continued engagement.
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, CheckCircle, MapPin, Play, Youtube, X, Phone,
  BarChart3, ZoomIn, ChevronRight,
} from "lucide-react";
import { detailUrl, type CaseStudy } from "../../../all-case-studies/data";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
const NAVY = "#0a0f2e";
 
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
export default function CaseStudyDetail({ cs, related }: { cs: CaseStudy; related: CaseStudy[] }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
 
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── BREADCRUMB + HERO ── */}
      <section className="relative overflow-hidden border-b border-[#d4d8e3] pt-28 pb-14">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="show">
 
            {/* Breadcrumb (matches BreadcrumbList schema) */}
            <motion.nav variants={fadeUp} aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#64748b]">
              <Link href="/case-studies" className="transition-colors hover:text-[#534AB7]">Case Studies</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/all-case-studies?industry=${cs.slug.industry}`} className="transition-colors hover:text-[#534AB7]">{cs.industry}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-[#0a0f2e]">{cs.client}</span>
            </motion.nav>
 
            <motion.div variants={fadeUp} className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: cs.badgeBg, color: cs.badgeColor }}>{cs.seoType}</span>
              <span className="flex items-center gap-1 text-xs text-[#64748b]">
                <MapPin className="h-3.5 w-3.5" />{cs.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                <Shield className="h-3.5 w-3.5" /> Verified GSC data
              </span>
            </motion.div>
 
            <motion.h1 variants={fadeUp}
              className="mb-6 max-w-4xl text-3xl font-black leading-tight tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
              {cs.headline}
            </motion.h1>
 
            {/* Hero metrics — big, proof-first (CRO) */}
            <motion.div variants={fadeUp} className="mb-8 grid max-w-2xl grid-cols-3 gap-4">
              {cs.metrics.map((m) => (
                <div key={m.l} className="rounded-2xl border border-[#d4d8e3] bg-white p-4 text-center">
                  <p className="text-2xl font-black sm:text-3xl" style={{ color: GREEN }}>{m.v}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-[#64748b]">{m.l}</p>
                </div>
              ))}
            </motion.div>
 
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/free-audit"
                className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}>
                <BarChart3 className="h-4 w-4" /> Get Results Like These — Free Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {cs.video && (
                <button onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ borderColor: NAVY, color: NAVY }}>
                  <Play className="h-4 w-4" /> Watch the GSC Recording
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
 
      {/* ── PROOF + FACTS ── */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-3">
 
            {/* Visual proof (video or screenshot) */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55 }} className="lg:col-span-2">
              {cs.video ? (
                <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl bg-[#0a0f2e] shadow-sm"
                  onClick={() => setVideoOpen(true)}>
                  <img src={`https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`}
                    alt={`${cs.client} ${cs.seoType} case study — live Google Search Console screen recording`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cs.video}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-[#0a0f2e]/20 to-transparent" />
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white"
                    style={{ background: GREEN }}>
                    <Youtube className="h-3 w-3" /> Live GSC screen recording
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-lg transition-all group-hover:scale-110"
                      style={{ background: GREEN }}>
                      <Play className="ml-1 h-7 w-7 fill-white text-white" />
                    </div>
                  </div>
                </div>
              ) : cs.image ? (
                <button onClick={() => setLightbox(cs.image!)}
                  className="group relative block w-full overflow-hidden rounded-3xl border border-[#d4d8e3] bg-white shadow-sm">
                  <img src={cs.image}
                    alt={`${cs.client} ${cs.seoType} results — Google Search Console / rankings screenshot`}
                    className="w-full transition-transform duration-300 group-hover:scale-[1.02]" />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: NAVY }}>
                    <ZoomIn className="h-3.5 w-3.5" /> Click to enlarge
                  </span>
                </button>
              ) : null}
            </motion.div>
 
            {/* Quick facts panel (Toptal-style) */}
            <motion.aside initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col rounded-3xl border border-[#d4d8e3] bg-white p-7">
              <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-[#64748b]">At a glance</h2>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#f1f5f9] pb-3">
                  <dt className="text-[#64748b]">Client</dt>
                  <dd className="text-right font-bold text-[#0a0f2e]">{cs.client}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#f1f5f9] pb-3">
                  <dt className="text-[#64748b]">Industry</dt>
                  <dd className="text-right font-bold text-[#0a0f2e]">{cs.industry}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#f1f5f9] pb-3">
                  <dt className="text-[#64748b]">Location</dt>
                  <dd className="text-right font-bold text-[#0a0f2e]">{cs.location}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#f1f5f9] pb-3">
                  <dt className="text-[#64748b]">Service</dt>
                  <dd className="text-right font-bold text-[#0a0f2e]">{cs.seoType}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#64748b]">Proof</dt>
                  <dd className="inline-flex items-center gap-1 text-right font-bold" style={{ color: GREEN_DARK }}>
                    <CheckCircle className="h-4 w-4" /> GSC verified
                  </dd>
                </div>
              </dl>
              <Link href="/free-audit"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 pt-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, marginTop: "1.75rem" }}>
                Start Your Story <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>
 
      {/* ── CHALLENGE / SOLUTION / OUTCOME ── */}
      <section className="pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {[
              { label: "The Challenge", color: "#ef4444", text: cs.challenge },
              { label: "The Solution", color: GREEN_DARK, text: cs.solution },
              { label: "The Outcome", color: PURPLE, text: cs.outcome },
            ].map(({ label, color, text }) =>
              text ? (
                <motion.article key={label}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl border border-[#d4d8e3] bg-white p-7 md:p-9"
                  style={{ borderLeft: `4px solid ${color}` }}>
                  <h2 className="mb-3 text-lg font-black" style={{ color }}>{label}</h2>
                  <p className="leading-relaxed text-[#475569]">{text}</p>
                </motion.article>
              ) : null
            )}
          </div>
 
          {/* Mid-page CTA (CRO: after the story, before related) */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-[#d4d8e3] bg-white p-8 text-center">
            <p className="text-lg font-black text-[#0a0f2e]">
              Facing the same problem as {cs.client}?
            </p>
            <p className="max-w-xl text-sm text-[#64748b]">
              The founder personally reviews your site and shows you exactly what&apos;s holding it back — free, within 24 hours.
            </p>
            <Link href="/free-audit"
              className="group mt-2 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: GREEN }}>
              <BarChart3 className="h-4 w-4" /> Reality Check
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
 
      {/* ── RELATED CASE STUDIES (internal links — SEO) ── */}
      {related.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-black text-[#0a0f2e]">More {cs.seoType} results</h2>
              <Link href="/all-case-studies"
                className="inline-flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-80"
                style={{ color: PURPLE }}>
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={detailUrl(r)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d4d8e3] bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0f2e]">
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
                    <span className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ backgroundColor: r.badgeBg, color: r.badgeColor }}>{r.seoType}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-3 text-sm font-bold leading-snug text-[#0a0f2e]">{r.headline}</h3>
                    <div className="mt-auto flex items-baseline gap-2">
                      <span className="text-2xl font-black" style={{ color: GREEN }}>{r.metrics[0].v}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">{r.metrics[0].l}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
 
      {/* ── FINAL CTA — navy, same as main case studies page ── */}
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
              <Link href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}>
                Get Free SEO Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
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
 
      {/* ── FLOATING STICKY CTA (CRO) ── */}
      <Link href="/free-audit"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105"
        style={{ background: GREEN }}>
        <BarChart3 className="h-4 w-4" /> Reality Check
      </Link>
 
      {/* ── VIDEO MODAL ── */}
      {videoOpen && cs.video && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video">
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${cs.video}?autoplay=1&rel=0&modestbranding=1`}
                title={`${cs.client} SEO case study`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          </div>
        </div>
      )}
 
      {/* ── IMAGE LIGHTBOX ── */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}>
          <div className="relative max-h-[90vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close image">
              Close <X className="h-5 w-5" />
            </button>
            <img src={lightbox} alt={`${cs.client} results screenshot — full size`}
              className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </main>
  );
}
 






