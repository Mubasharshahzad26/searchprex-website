"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check, X, ArrowRight, Phone, MapPin, Star, Play, Youtube,
  ChevronDown, ChevronUp, Linkedin, BadgeCheck,
} from "lucide-react";
 
/* ─── SEMRUSH-STYLE THEME ─── */
const ACCENT = "#ff642d";        // Semrush orange
const ACCENT_DARK = "#e5501c";
const INK = "#0f0f0f";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const BG_SOFT = "#fafafa";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
const HVAC_VIDEO = "g_1TfDU4YeA";
 
/* ─── DATA ─── */
const heroStats = [
  { val: "Top 3", lbl: "Google Maps pack" },
  { val: "Featured", lbl: "AI Overview" },
  { val: "5.7x", lbl: "Organic calls" },
  { val: "60 days", lbl: "Time to rank" },
];
 
const services = [
  { title: "Google Business Profile", body: "Category optimization, weekly posts, Q&A, photo strategy, and services setup for top-3 local pack rankings." },
  { title: "Citation Building",       body: "NAP consistency across 50+ directories — Google, Bing, Apple Maps, Yelp, and niche local sources." },
  { title: "Local Landing Pages",     body: "City and service-area pages built around real 'near me' search intent — no thin doorway pages." },
  { title: "Review Velocity Program", body: "Systematic 5-star review generation — the strongest local ranking and trust signal there is." },
  { title: "AI Overview Optimization", body: "Structured content and schema so your business gets cited in Google AI Overviews for local queries." },
  { title: "Weekly Reporting",        body: "Map pack rankings, calls, direction requests, and GBP insights — plain-English every Monday." },
];
 
const comparison = [
  { label: "Google Maps top 3 rankings",       us: true, ppc: false, generic: "sometimes" },
  { label: "AI Overview local citations",      us: true, ppc: false, generic: false },
  { label: "GBP + citations at scale (50+)",   us: true, ppc: false, generic: "sometimes" },
  { label: "Systematic review generation",     us: true, ppc: false, generic: false },
  { label: "Ranks that stay when you pause",   us: true, ppc: false, generic: "sometimes" },
  { label: "Founder-led (no juniors)",         us: true, ppc: false, generic: false },
  { label: "Cost per lead over time",          us: "Down", ppc: "Up", generic: "Flat" },
];
 
const process = [
  { step: "01", week: "Week 1–2", title: "Local audit",       body: "GBP, citations, competitors, and local landscape — mapped into a city-specific ranking roadmap." },
  { step: "02", week: "Week 3–4", title: "GBP & citations",    body: "Full Google Business Profile optimization and NAP citation cleanup across 50+ directories." },
  { step: "03", week: "Week 5–8", title: "Content & reviews", body: "Local landing pages, service-area content, and review generation running in parallel." },
  { step: "04", week: "Week 9+",  title: "Rank & convert",    body: "Climb the map pack and AI Overviews, calls increase, weekly reporting every Monday." },
];
 
const coreUpdate2026 = [
  { title: "AI Overview local citations", body: "Google's 2026 AI Overviews answer local questions directly. We structure content and schema so your business is the one cited." },
  { title: "Real experience signals",     body: "Genuine photos, real reviews, accurate service data — the first-hand signals Google now weighs most heavily for local trust." },
  { title: "Local entity authority",      body: "We build your business as a recognized local entity — consistent NAP, citations, and structured data across the knowledge graph." },
  { title: "People-first local content",  body: "Service-area pages written to genuinely help local customers — never thin doorway pages the Helpful Content system demotes." },
];
 
const faqs = [
  { q: "How fast can I rank in the Google Maps local pack?", a: "Most local businesses see map pack movement in 30–60 days. Our HVAC client reached the top 3 and captured an AI Overview placement within 60 days of our GBP and citation work." },
  { q: "Do you optimize for 'near me' searches?", a: "Yes — 'near me' and service-area queries are the core of local SEO. We build city and neighborhood landing pages plus GBP signals that capture this high-intent traffic." },
  { q: "What is AI Overview optimization?", a: "Google's 2026 AI Overviews answer local queries directly above the map pack. We structure your content, reviews, and schema so Google cites your business in those answers." },
  { q: "Which local businesses do you work with?", a: "HVAC, plumbers, electricians, restaurants, clinics, contractors, salons, and other service businesses targeting a specific city or service area." },
  { q: "Is your work aligned with Google's 2026 core updates?", a: "Completely. Every local page is people-first, E-E-A-T compliant, and built around real experience signals — never thin doorway pages that get demoted." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results — more calls, more map pack visibility, more local customers." },
];
 
/* ─── PAGE ─── */
export default function LocalSEOClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoOpen, setVideoOpen] = useState(false);
 
  return (
    <main className="bg-white text-[color:var(--ink)]" style={{ ["--ink" as any]: INK, ["--muted" as any]: MUTED, ["--border" as any]: BORDER }}>
 
      {/* ── HERO — minimal, left-aligned ── */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
                <span className="h-px w-8" style={{ background: ACCENT }} /> Local SEO
              </div>
              <h1 className="mb-6 text-[44px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px]" style={{ color: INK }}>
                Own the map pack.<br />
                Get cited in <span style={{ color: ACCENT }}>AI Overviews.</span>
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
                Founder-led local SEO for service businesses. We put you in the top 3 Google Maps results and Google&apos;s 2026 AI Overviews — so the &quot;near me&quot; searcher calls you, not your competitor.
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
                <Link href="/free-audit"
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
                  style={{ background: ACCENT }}>
                  Get free local audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#case-study"
                  className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#fafafa]"
                  style={{ borderColor: BORDER, color: INK }}>
                  See case study
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: MUTED }}>
                {["No contracts", "Results in 60 days", "Founder works your account"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />{t}
                  </span>
                ))}
              </div>
            </div>
 
            {/* Right — data card, Semrush console style */}
            <div className="lg:pt-2">
              <div className="rounded-lg border bg-white" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: BORDER }}>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: "#16a34a" }} />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: INK }}>Live client · HVAC · United States</span>
                  </div>
                  <span className="text-xs" style={{ color: MUTED }}>GSC verified</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: BORDER }}>
                  {heroStats.map((s, i) => (
                    <div key={s.lbl} className={`p-6 ${i < 2 ? "border-b" : ""}`} style={{ borderColor: BORDER }}>
                      <div className="text-[32px] font-bold tracking-tight" style={{ color: INK }}>{s.val}</div>
                      <div className="mt-1 text-xs uppercase tracking-widest" style={{ color: MUTED }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t px-5 py-3 text-xs" style={{ borderColor: BORDER, color: MUTED }}>
                  60-day result · Verified in Google Search Console
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
          {[
            { v: "50+",  l: "Directories cleaned per client" },
            { v: "20+",  l: "Local businesses served" },
            { v: "5.7x", l: "Avg. call growth in 90 days" },
            { v: "60d",  l: "Median time to top 3" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-bold tracking-tight" style={{ color: INK }}>{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest" style={{ color: MUTED }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── SERVICES — grid, minimal ── */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Everything included</div>
              <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>What&apos;s in your<br />Local SEO package</h2>
            </div>
            <p className="text-base leading-relaxed lg:mt-2" style={{ color: MUTED }}>
              No add-ons. No hidden retainers. Every plan includes the six pillars proven to move local businesses from invisible to the top 3 Google Maps pack — and now, into AI Overviews.
            </p>
          </div>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: BORDER }}>
            {services.map((s) => (
              <div key={s.title} className="bg-white p-7">
                <div className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>Included</div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: INK }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── COMPARISON TABLE — Semrush signature ── */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Why SearchPrex</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Compare the approaches</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
              Most local businesses cycle between Google Ads and generic SEO agencies. Here&apos;s what actually delivers durable local visibility.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: BORDER }}>
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b text-xs font-semibold uppercase tracking-widest" style={{ borderColor: BORDER, color: MUTED }}>
              <div className="px-6 py-4"></div>
              <div className="px-6 py-4 text-center" style={{ color: ACCENT }}>SearchPrex</div>
              <div className="px-6 py-4 text-center">Google Ads</div>
              <div className="px-6 py-4 text-center">Generic agency</div>
            </div>
            {comparison.map((row, i) => (
              <div key={row.label} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b text-sm last:border-0"
                style={{ borderColor: BORDER, background: i % 2 === 1 ? BG_SOFT : "white" }}>
                <div className="px-6 py-4 font-medium" style={{ color: INK }}>{row.label}</div>
                <Cell v={row.us} accent />
                <Cell v={row.ppc} />
                <Cell v={row.generic} />
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── PROCESS — numbered steps ── */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>How we work</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>From audit to map pack in 60 days</h2>
          </div>
          <div className="grid gap-px lg:grid-cols-4" style={{ background: BORDER }}>
            {process.map((p) => (
              <div key={p.step} className="bg-white p-7">
                <div className="mb-4 text-4xl font-bold tracking-tight" style={{ color: ACCENT }}>{p.step}</div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>{p.week}</div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: INK }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CASE STUDY — big split video ── */}
      <section id="case-study" className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Case study · HVAC · United States</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Top 3 Google Maps + AI Overview in 60 days</h2>
          </div>
          <div className="overflow-hidden rounded-lg border bg-white lg:grid lg:grid-cols-2" style={{ borderColor: BORDER }}>
            <div className="group relative min-h-[320px] cursor-pointer bg-[#0a0f2e] lg:min-h-full" onClick={() => setVideoOpen(true)}>
              <img src={`https://img.youtube.com/vi/${HVAC_VIDEO}/maxresdefault.jpg`}
                alt="Local HVAC SEO case study walkthrough"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${HVAC_VIDEO}/hqdefault.jpg`; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold text-white" style={{ background: ACCENT }}>
                <Youtube className="h-3 w-3" /> Watch walkthrough
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-transform group-hover:scale-105" style={{ background: ACCENT }}>
                  <Play className="ml-1 h-7 w-7 fill-white text-white" />
                </div>
              </div>
            </div>
            <div className="p-8 lg:p-10">
              <div className="mb-8 grid grid-cols-3 gap-6 border-b pb-8" style={{ borderColor: BORDER }}>
                {[{ v: "Top 3", l: "Maps pack" }, { v: "Featured", l: "AI Overview" }, { v: "5.7x", l: "Organic calls" }].map((m) => (
                  <div key={m.l}>
                    <div className="text-2xl font-bold tracking-tight" style={{ color: INK }}>{m.v}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest" style={{ color: MUTED }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <Row label="Challenge" body="A local HVAC service business had no map pack presence, no 'near me' rankings, and zero visibility in Google's AI Overview results for high-intent emergency service searches." />
                <Row label="Solution"  body="Full GBP optimization, NAP consistency across 50+ directories, service-area landing pages, a review generation program, and AI Overview-ready structured content." />
                <Row label="Outcome"   body="Top 3 map pack for primary service keywords, a featured AI Overview placement, and 5.7x organic call growth in 60 days — all verified in GSC." />
              </div>
              <button onClick={() => setVideoOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
                style={{ background: ACCENT }}>
                <Play className="h-4 w-4 fill-white" /> Watch full case study
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── 2026 CORE UPDATE ── */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Built for the 2026 algorithm</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Local SEO tuned for AI search</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
              Google&apos;s 2026 updates placed AI Overviews above the map pack and now reward real, first-hand local experience signals.
            </p>
          </div>
          <div className="grid gap-px sm:grid-cols-2" style={{ background: BORDER }}>
            {coreUpdate2026.map((c) => (
              <div key={c.title} className="bg-white p-7">
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
                  <BadgeCheck className="h-4 w-4" /> Aligned
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: INK }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── AUTHOR / E-E-A-T ── */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-lg border bg-white p-8 sm:flex sm:items-center sm:gap-8" style={{ borderColor: BORDER }}>
            <div className="relative mx-auto mb-6 h-24 w-24 shrink-0 overflow-hidden rounded-md sm:mb-0" style={{ border: `1px solid ${BORDER}` }}>
              <Image src="/images/mubashar-shahzad.jpg" alt="Mubashar Shahzad — Founder & Lead Local SEO Strategist"
                fill className="object-cover object-top" />
            </div>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold" style={{ color: INK }}>Mubashar Shahzad</h3>
                <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest" style={{ background: `${ACCENT}15`, color: ACCENT_DARK }}>
                  <BadgeCheck className="h-3 w-3" /> Verified SEO expert
                </span>
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>Founder & Lead Local SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: MUTED }}>
                &quot;Local SEO is won on real signals — accurate GBP data, genuine reviews, content that actually helps your neighbors. I personally took a local HVAC business to the top 3 map pack and an AI Overview placement in 60 days. When you work with SearchPrex, you work directly with me.&quot;
              </p>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2] hover:text-white"
                style={{ borderColor: BORDER }}>
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── FAQ ── */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="mb-10">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>FAQ</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Local SEO questions, answered</h2>
          </div>
          <div className="border-t" style={{ borderColor: BORDER }}>
            {faqs.map((f, i) => (
              <div key={i} className="border-b" style={{ borderColor: BORDER }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="text-base font-semibold" style={{ color: INK }}>{f.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    : <ChevronDown className="h-4 w-4 shrink-0" style={{ color: MUTED }} />}
                </button>
                {openFaq === i && (
                  <p className="pb-5 pr-10 text-sm leading-relaxed" style={{ color: MUTED }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FINAL CTA — clean, high-contrast ── */}
      <section className="bg-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Ready to own your city?</div>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Stop renting clicks.<br />Start owning your map pack.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
            Free local SEO audit — the founder personally reviews your Google Business Profile, citations, and local rankings, and delivers a 60-day growth plan within 24 hours.
          </p>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Link href="/free-audit"
              className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
              style={{ background: ACCENT }}>
              Get free local audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+923106526316"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5">
              <Phone className="h-4 w-4" /> +92 310 652 6316
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            {["24hr turnaround", "No contracts", "Founder does the audit"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />{t}
              </span>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white" aria-label="Close video">
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-md bg-black">
              <iframe className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${HVAC_VIDEO}?autoplay=1&rel=0&modestbranding=1`}
                title="Local HVAC SEO case study" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>
      )}
 
    </main>
  );
}
 
/* ─── Helpers ─── */
function Cell({ v, accent = false }: { v: boolean | string; accent?: boolean }) {
  if (v === true) return (
    <div className="px-6 py-4 text-center">
      <Check className="mx-auto h-5 w-5" style={{ color: accent ? ACCENT : "#16a34a" }} />
    </div>
  );
  if (v === false) return (
    <div className="px-6 py-4 text-center">
      <X className="mx-auto h-5 w-5" style={{ color: "#9ca3af" }} />
    </div>
  );
  return (
    <div className="px-6 py-4 text-center text-sm font-medium" style={{ color: accent ? ACCENT_DARK : MUTED }}>
      {v}
    </div>
  );
}
 
function Row({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[110px_1fr]">
      <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{label}</div>
      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p>
    </div>
  );
}
 