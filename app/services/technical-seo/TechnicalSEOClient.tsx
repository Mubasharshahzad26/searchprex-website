"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check, X, ArrowRight, Phone, Play, Youtube,
  ChevronDown, ChevronUp, Linkedin, BadgeCheck,
} from "lucide-react";
 
/* ─── SEMRUSH-STYLE THEME ─── */
const ACCENT = "#ff642d";
const ACCENT_DARK = "#e5501c";
const INK = "#0f0f0f";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const BG_SOFT = "#fafafa";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
const VIDEOS = [
  { id: "Y5PxSECNGP0", title: "Performance walkthrough",   sub: "Live GSC recording · +476% organic clicks" },
  { id: "cI3BwxqaJbw", title: "0 to 285% indexing rate",   sub: "Full case study · crawl + indexation fix" },
];
 
const heroStats = [
  { val: "+476%", lbl: "Organic clicks"    },
  { val: "+285%", lbl: "Indexing rate"     },
  { val: "12K+",  lbl: "Pages indexed"     },
  { val: "48hr",  lbl: "Audit turnaround"  },
];
 
const services = [
  { title: "Technical SEO Audit",           body: "Full crawl analysis — indexation, redirects, canonicals, orphan pages, crawl budget, and log file review." },
  { title: "Core Web Vitals (LCP/INP/CLS)", body: "Diagnose and fix every performance issue impacting rankings and real user experience." },
  { title: "Schema & Structured Data",      body: "JSON-LD markup for every page type — products, FAQs, local business, articles, breadcrumbs, reviews." },
  { title: "Site Architecture",             body: "Information architecture audit, silo structure, internal linking strategy, and crawl depth optimization." },
  { title: "Indexation & Crawl Budget",     body: "Fix every reason Google ignores your pages — robots.txt, noindex, duplicate content at scale." },
  { title: "Redirect & Canonical Audit",    body: "Redirect chain cleanup, canonical implementation, and hreflang setup for multi-region sites." },
];
 
const comparison = [
  { label: "Full technical audit + log files", us: true, agency: "sometimes", inhouse: false },
  { label: "Implementation, not just report",  us: true, agency: false, inhouse: "sometimes" },
  { label: "Handles 10K+ page sites",          us: true, agency: "sometimes", inhouse: false },
  { label: "Indexation recovery at scale",     us: true, agency: false, inhouse: false },
  { label: "Core Web Vitals (INP era)",        us: true, agency: "sometimes", inhouse: "sometimes" },
  { label: "Schema across every page type",    us: true, agency: false, inhouse: false },
  { label: "Turnaround from audit to fixes",   us: "4 weeks", agency: "8–12 weeks", inhouse: "Never" },
];
 
const process = [
  { step: "01", week: "Week 1",   title: "Full site crawl",   body: "Every URL analyzed, log files parsed, every issue mapped and prioritized by revenue impact." },
  { step: "02", week: "Week 2",   title: "Priority fixes",    body: "Indexation blocks, canonical errors, redirect chains, and Core Web Vitals actively hurting rankings — fixed first." },
  { step: "03", week: "Week 3–4", title: "Schema & structure", body: "JSON-LD across all page types, internal linking improvements, and site architecture optimization." },
  { step: "04", week: "Week 5+",  title: "Monitor & improve", body: "GSC monitoring, crawl re-analysis, and continuous fixes as your site evolves." },
];
 
const coreUpdate2026 = [
  { title: "Crawl efficiency for AI bots",       body: "Google's 2026 systems and AI crawlers reward fast, clean, crawlable sites. We optimize crawl budget so every important page gets discovered." },
  { title: "Core Web Vitals (INP era)",          body: "INP replaced FID as a ranking signal. We tune LCP, INP, and CLS to Good — directly improving rankings and conversion." },
  { title: "Structured data for rich & AI results", body: "Clean JSON-LD helps Google and AI Overviews understand your content — winning rich results and AI citations." },
  { title: "Indexation health at scale",         body: "We recover mass non-indexing the right way — fixing root causes so gains hold through every core update." },
];
 
const faqs = [
  { q: "How is a technical SEO audit different from a general SEO audit?", a: "A technical audit focuses exclusively on how your site is built — crawlability, indexability, site speed, structured data, and architecture. Technical issues are often the root cause of ranking problems even when content is good." },
  { q: "My site has thousands of pages — can you handle that?", a: "Yes — large-scale technical SEO is our specialty. We took Michigan Outdoor Sports from near-zero to 12K+ indexed pages and a +285% indexing rate." },
  { q: "What are Core Web Vitals and why do they matter?", a: "Core Web Vitals (LCP, INP, CLS) are Google's UX metrics that directly impact rankings in 2026. We diagnose and fix all three." },
  { q: "How quickly will I see results from technical fixes?", a: "Critical indexation fixes show GSC improvements in 2–4 weeks after Googlebot recrawls. Core Web Vitals improvements show up in Google's data within 28 days of deployment." },
  { q: "Do you work with Shopify, WordPress, and custom sites?", a: "Yes — all platforms. We understand the technical quirks of Shopify (faceted nav, duplicate URLs), WordPress (plugin bloat), and custom sites." },
  { q: "Is there a contract?", a: "No long-term contracts. Technical SEO has a clear audit-and-fix phase; we work project or retainer depending on your needs." },
];
 
export default function TechnicalSEOClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
 
  return (
    <main className="bg-white" style={{ ["--ink" as any]: INK, ["--muted" as any]: MUTED, ["--border" as any]: BORDER }}>
 
      {/* HERO */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
                <span className="h-px w-8" style={{ background: ACCENT }} /> Technical SEO
              </div>
              <h1 className="mb-6 text-[44px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px]" style={{ color: INK }}>
                Fix the foundation.<br />
                <span style={{ color: ACCENT }}>Make Google index</span> everything.
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
                Crawl budget waste, indexation blocks, slow Core Web Vitals, and broken architecture are silently killing your rankings. We find every issue and fix it — systematically, at scale, aligned with Google&apos;s 2026 algorithm.
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
                <Link href="/free-audit"
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
                  style={{ background: ACCENT }}>
                  Get free technical audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#case-studies"
                  className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-sm font-semibold hover:bg-[#fafafa]"
                  style={{ borderColor: BORDER, color: INK }}>
                  See case studies
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: MUTED }}>
                {["No contracts", "48hr audit delivery", "Founder works your account"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />{t}
                  </span>
                ))}
              </div>
            </div>
 
            <div className="lg:pt-2">
              <div className="rounded-lg border bg-white" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: BORDER }}>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: "#16a34a" }} />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: INK }}>Michigan Outdoor Sports · US</span>
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
                  90-day result · Verified in Google Search Console
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* PROOF STRIP */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
          {[
            { v: "12K+",  l: "Pages indexed on MSO" },
            { v: "+476%", l: "Organic click growth" },
            { v: "50+",   l: "Technical audits shipped" },
            { v: "48hr",  l: "Audit turnaround" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-bold tracking-tight" style={{ color: INK }}>{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest" style={{ color: MUTED }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* SERVICES */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Everything included</div>
              <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>What&apos;s in your<br />Technical SEO package</h2>
            </div>
            <p className="text-base leading-relaxed lg:mt-2" style={{ color: MUTED }}>
              A prioritized fix list, implemented — not a 200-page PDF handed off to your dev team. Every deliverable maps to a Google-facing signal we can measure in GSC.
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
 
      {/* COMPARISON */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Why SearchPrex</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Compare the approaches</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
              Most technical SEO ends at a report. Ours ends at deployment.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: BORDER }}>
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b text-xs font-semibold uppercase tracking-widest" style={{ borderColor: BORDER, color: MUTED }}>
              <div className="px-6 py-4"></div>
              <div className="px-6 py-4 text-center" style={{ color: ACCENT }}>SearchPrex</div>
              <div className="px-6 py-4 text-center">Generic agency</div>
              <div className="px-6 py-4 text-center">In-house team</div>
            </div>
            {comparison.map((row, i) => (
              <div key={row.label} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b text-sm last:border-0"
                style={{ borderColor: BORDER, background: i % 2 === 1 ? BG_SOFT : "white" }}>
                <div className="px-6 py-4 font-medium" style={{ color: INK }}>{row.label}</div>
                <Cell v={row.us} accent />
                <Cell v={row.agency} />
                <Cell v={row.inhouse} />
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* PROCESS */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>How we work</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Audit to implementation in 4 weeks</h2>
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
 
      {/* CASE STUDY */}
      <section id="case-studies" className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Case study · Michigan Outdoor Sports</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>+476% clicks. +285% indexing rate.</h2>
          </div>
 
          <div className="mb-8 grid gap-8 rounded-lg border bg-white p-8 md:grid-cols-3" style={{ borderColor: BORDER }}>
            <Row label="Challenge" body="Brand pages never properly submitted to GSC, thin content caused mass non-indexing, and crawl budget was being wasted — thousands of pages invisible." />
            <Row label="Solution"  body="Sitemaps submitted directly to GSC, indexation blocks and crawl waste fixed, brand pages rewritten with unique content, resubmitted in batches." />
            <Row label="Outcome"   body="+476% organic clicks and +285% indexing rate within 90 days — 12,000+ pages indexed from near-zero, with no ad spend." />
          </div>
 
          <div className="grid gap-6 md:grid-cols-2">
            {VIDEOS.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: BORDER }}>
                <div className="group relative aspect-video cursor-pointer bg-[#0a0f2e]" onClick={() => setActiveVideo(v.id)}>
                  <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold text-white" style={{ background: ACCENT }}>
                    <Youtube className="h-3 w-3" /> Live walkthrough
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full shadow-xl transition-transform group-hover:scale-105" style={{ background: ACCENT }}>
                      <Play className="ml-1 h-7 w-7 fill-white text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-semibold" style={{ color: INK }}>{v.title}</h3>
                  <p className="text-sm" style={{ color: MUTED }}>{v.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* 2026 CORE UPDATE */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Built for the 2026 algorithm</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Technical SEO tuned for AI search</h2>
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
 
      {/* AUTHOR */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-lg border bg-white p-8 sm:flex sm:items-center sm:gap-8" style={{ borderColor: BORDER }}>
            <div className="relative mx-auto mb-6 h-24 w-24 shrink-0 overflow-hidden rounded-md sm:mb-0" style={{ border: `1px solid ${BORDER}` }}>
              <Image src="/images/mubashar-shahzad.jpg" alt="Mubashar Shahzad — Founder & Lead Technical SEO Strategist" fill className="object-cover object-top" />
            </div>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold" style={{ color: INK }}>Mubashar Shahzad</h3>
                <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest" style={{ background: `${ACCENT}15`, color: ACCENT_DARK }}>
                  <BadgeCheck className="h-3 w-3" /> Verified SEO expert
                </span>
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>Founder & Lead Technical SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: MUTED }}>
                &quot;Technical SEO is where I&apos;ve done my deepest work — crawl budget, indexation recovery, Core Web Vitals, schema. I personally took Michigan Outdoor Sports from near-zero indexing to 12K+ pages and +476% clicks, all verified in GSC.&quot;
              </p>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                style={{ borderColor: BORDER }}>
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
 
      {/* FAQ */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="mb-10">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>FAQ</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Technical SEO questions, answered</h2>
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
 
      {/* FINAL CTA */}
      <section className="bg-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Ready to fix the foundation?</div>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Great content deserves<br />great technical health.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
            Free technical audit — the founder personally crawls your site, identifies your biggest indexation, speed, and architecture issues, and delivers a prioritized fix plan within 48 hours.
          </p>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Link href="/free-audit"
              className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
              style={{ background: ACCENT }}>
              Get free technical audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+923106526316"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5">
              <Phone className="h-4 w-4" /> +92 310 652 6316
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            {["48hr audit delivery", "No contracts", "Founder does the audit"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />{t}
              </span>
            ))}
          </div>
        </div>
      </section>
 
      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white" aria-label="Close video">
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-md bg-black">
              <iframe className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="Michigan technical SEO case study" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>
      )}
 
    </main>
  );
}
 
function Cell({ v, accent = false }: { v: boolean | string; accent?: boolean }) {
  if (v === true) return <div className="px-6 py-4 text-center"><Check className="mx-auto h-5 w-5" style={{ color: accent ? ACCENT : "#16a34a" }} /></div>;
  if (v === false) return <div className="px-6 py-4 text-center"><X className="mx-auto h-5 w-5" style={{ color: "#9ca3af" }} /></div>;
  return <div className="px-6 py-4 text-center text-sm font-medium" style={{ color: accent ? ACCENT_DARK : MUTED }}>{v}</div>;
}
 
function Row({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>{label}</div>
      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p>
    </div>
  );
}
 