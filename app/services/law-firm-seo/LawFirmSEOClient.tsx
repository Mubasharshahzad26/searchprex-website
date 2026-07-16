"use client";
 
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check, X, ArrowRight, Phone, ChevronDown, ChevronUp,
  Linkedin, BadgeCheck, Scale,
} from "lucide-react";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
 
/* ─── SEMRUSH-STYLE THEME ─── */
const ACCENT = "#ff642d";
const ACCENT_DARK = "#e5501c";
const INK = "#0f0f0f";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const BG_SOFT = "#fafafa";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
/* ─── DATA ─── */
const heroIncludes = [
  "Rank #1 for your city's practice-area keywords",
  "Dominate the Google Maps local pack",
  "Get cited in Google AI Overviews & ChatGPT",
  "Attorney E-E-A-T content (YMYL compliant)",
  "Replace expensive Google Ads with organic leads",
];
 
const services = [
  { title: "Technical SEO",       body: "Site speed, Core Web Vitals, attorney schema, indexation, and mobile optimization for legal sites." },
  { title: "Local SEO",           body: "GBP optimization, citations, local pack rankings, and review generation for your city." },
  { title: "Practice Area Pages", body: "Keyword-optimized pages for each practice area and target city, written for real client search intent." },
  { title: "Legal Link Building", body: "Legal directory listings, digital PR, and authority backlinks built specifically for law firms." },
  { title: "Weekly Reporting",    body: "Plain-English reports every Monday — rankings, traffic, leads, and next action items." },
  { title: "GEO / AIO / LLMs SEO", body: "Get cited in Google AI Overviews, ChatGPT, and Perplexity for local legal queries." },
];
 
const comparison = [
  { label: "Attorney E-E-A-T (YMYL)",           us: true, ppc: false, generic: "sometimes" },
  { label: "AI Overview + ChatGPT citations",   us: true, ppc: false, generic: false },
  { label: "Local map pack top 3",              us: true, ppc: false, generic: "sometimes" },
  { label: "Practice area × city pages",        us: true, ppc: false, generic: "sometimes" },
  { label: "Ranks that hold when you pause",    us: true, ppc: false, generic: "sometimes" },
  { label: "Founder-led (no juniors)",          us: true, ppc: false, generic: false },
  { label: "Cost per qualified lead",           us: "Down", ppc: "Up", generic: "Flat" },
];
 
const process = [
  { step: "01", week: "Week 1–2", title: "Deep audit",           body: "Site, competitors, and local legal landscape — mapped into a city-specific ranking strategy." },
  { step: "02", week: "Week 3–4", title: "Foundation fix",       body: "Technical SEO, attorney + FAQ schema, GBP optimization, and citation cleanup." },
  { step: "03", week: "Week 5–8", title: "Content & authority", body: "Practice-area pages, city pages, E-E-A-T legal content, and authority link building in parallel." },
  { step: "04", week: "Week 9+",  title: "Rankings & cases",     body: "Keywords climb, qualified consultations increase, plain-English reports every Monday." },
];
 
const coreUpdate2026 = [
  { title: "Attorney E-E-A-T (YMYL)",       body: "Legal content is Your-Money-Your-Life — we surface attorney credentials, bar admissions, real case experience, and author authority on every page." },
  { title: "AI Overview legal citations",   body: "Google's 2026 AI Overviews answer 'best lawyer near me' directly. We structure content, reviews, and schema so your firm is the one cited." },
  { title: "GEO & LLM visibility",          body: "Generative Engine Optimization gets your firm referenced in ChatGPT, Perplexity, and Gemini when clients research legal help." },
  { title: "People-first legal content",    body: "Every page genuinely helps prospective clients — never thin, keyword-stuffed pages the Helpful Content system demotes." },
];
 
const faqs = [
  { q: "How long before I see results?", a: "Most law firms see ranking improvements in 30–60 days. First-page and local pack rankings typically follow in 60–90 days, depending on city and practice area competition." },
  { q: "Do you work with all practice areas?", a: "Yes — family law, personal injury, criminal defense, estate planning, immigration, employment law, and more. Every strategy is tailored to your specific practice and city." },
  { q: "What is GEO / AIO / LLMs optimization?", a: "It's optimizing so your firm gets cited in AI answers — Google AI Overviews, ChatGPT, Perplexity, and Gemini. As more clients research lawyers through AI, this is becoming as important as ranking #1." },
  { q: "Are you compliant with Google's 2026 core updates?", a: "Completely. Legal content is YMYL, so we build every page around E-E-A-T — attorney credentials, real experience, authoritative sourcing, and people-first content that survives every core update." },
  { q: "Can I keep running Google Ads?", a: "You can, but our goal is to replace that spend with free organic traffic. Most clients significantly reduce ad spend within months as organic leads grow." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results — more qualified consultations, more local visibility, more cases." },
];
 
/* ─── PAGE ─── */
export default function LawFirmSEOClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
 
  return (
    <main className="bg-white" style={{ ["--ink" as any]: INK, ["--muted" as any]: MUTED, ["--border" as any]: BORDER }}>
 
      {/* HERO */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
                <span className="h-px w-8" style={{ background: ACCENT }} /> Law Firm SEO
              </div>
              <h1 className="mb-6 text-[44px] font-bold leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px]" style={{ color: INK }}>
                Get more cases from<br />
                <span style={{ color: ACCENT }}>Google in 2026.</span>
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
                While you pay $80 per click on Google Ads, competitors get free organic traffic. We help law firms rank #1 in their city and get cited in Google&apos;s 2026 AI Overviews — so qualified clients call you first.
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
                <Link href="/free-audit"
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
                  style={{ background: ACCENT }}>
                  Claim free law firm audit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#approach"
                  className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-sm font-semibold hover:bg-[#fafafa]"
                  style={{ borderColor: BORDER, color: INK }}>
                  See our approach
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: MUTED }}>
                {["No contracts", "Results in 60–90 days", "Founder works your account"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} />{t}
                  </span>
                ))}
              </div>
            </div>
 
            {/* Right — what's included card */}
            <div className="lg:pt-2">
              <div className="rounded-lg border bg-white" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: BORDER }}>
                  <div className="flex items-center gap-2">
                    <Scale className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: INK }}>Built for law firms</span>
                  </div>
                  <span className="text-xs" style={{ color: MUTED }}>2026 aligned</span>
                </div>
                <div className="p-6">
                  <div className="space-y-3.5">
                    {heroIncludes.map((t) => (
                      <div key={t} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: ACCENT }}>
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm" style={{ color: INK }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t px-5 py-3 text-xs" style={{ borderColor: BORDER, color: MUTED }}>
                  YMYL E-E-A-T · GEO · AIO · LLMs
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
            { v: "5+",   l: "Years SEO experience" },
            { v: "20+",  l: "Businesses served" },
            { v: "60d",  l: "Median time to top 3" },
            { v: "24hr", l: "Audit turnaround" },
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
              <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>What&apos;s in your<br />Law Firm SEO package</h2>
            </div>
            <p className="text-base leading-relaxed lg:mt-2" style={{ color: MUTED }}>
              Every deliverable is built around legal YMYL standards — attorney credentials, real experience, and content that both Google and prospective clients trust.
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
              Most law firms cycle between Google Ads and generic SEO agencies. Here&apos;s what actually delivers durable legal visibility.
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
 
      {/* PROCESS */}
      <section id="approach" className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>How we work</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>From audit to more cases in 90 days</h2>
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
 
      {/* LIVE INTAKE ASSISTANT DEMO */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-10 text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Live demo · AI Intake Assistant</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>
              Getting found is half the battle.<br />Capturing every lead is the other half.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed" style={{ color: MUTED }}>
              Ranking #1 means nothing if a 2 a.m. call goes to voicemail. Play a potential client below and watch our 24/7 AI intake assistant qualify the lead in seconds.
            </p>
          </div>
          <IntakeAssistant embedded />
        </div>
      </section>
 
      {/* CASE STUDY CTA (honest — no fake data) */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Selective law firm partnerships</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Be our first law firm case study</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
              We&apos;ve delivered GSC-verified results in ecommerce, local, and technical SEO — including a local service business reaching the top 3 map pack and a Google AI Overview placement in 60 days. Now we&apos;re bringing that same methodology to law firms.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border bg-white lg:grid lg:grid-cols-2" style={{ borderColor: BORDER }}>
            <div className="p-8 lg:p-10">
              <Scale className="mb-4 h-8 w-8" style={{ color: ACCENT }} />
              <h3 className="mb-4 text-xl font-semibold" style={{ color: INK }}>Proven methodology, applied to your firm</h3>
              <div className="space-y-3.5">
                {[
                  "Proven local pack + AI Overview methodology",
                  "Founder-led — not handed to a junior",
                  "Transparent GSC reporting from day one",
                  "YMYL E-E-A-T aligned every step",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} strokeWidth={2.5} />
                    <span className="text-sm" style={{ color: INK }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center border-t p-8 lg:border-l lg:border-t-0 lg:p-10" style={{ borderColor: BORDER, background: BG_SOFT }}>
              <h4 className="mb-3 text-lg font-semibold" style={{ color: INK }}>Your firm could be the next #1 in your city.</h4>
              <p className="mb-6 text-sm leading-relaxed" style={{ color: MUTED }}>
                We&apos;re selectively partnering with law firms ready to own their local market organically. Free audit shows exactly what it takes to rank — and get cited in AI answers — in your city and practice area.
              </p>
              <Link href="/free-audit"
                className="inline-flex w-fit items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
                style={{ background: ACCENT }}>
                Claim free law firm audit <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs" style={{ color: MUTED }}>No obligation · 24-hour turnaround · Founder reviews it personally</p>
            </div>
          </div>
        </div>
      </section>
 
      {/* 2026 CORE UPDATE */}
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>SEO · GEO · AIO · LLMs · 2026 core update</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Legal SEO built for the AI answer era</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
              Legal is YMYL — Google holds it to the highest trust bar, and AI Overviews now answer legal questions directly. Here&apos;s how we keep your firm visible everywhere clients look.
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
 
      {/* AUTHOR */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-lg border bg-white p-8 sm:flex sm:items-center sm:gap-8" style={{ borderColor: BORDER }}>
            <div className="relative mx-auto mb-6 h-24 w-24 shrink-0 overflow-hidden rounded-md sm:mb-0" style={{ border: `1px solid ${BORDER}` }}>
              <Image src="/images/mubashar-shahzad.jpg" alt="Mubashar Shahzad — Founder & Lead SEO Strategist" fill className="object-cover object-top" />
            </div>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold" style={{ color: INK }}>Mubashar Shahzad</h3>
                <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest" style={{ background: `${ACCENT}15`, color: ACCENT_DARK }}>
                  <BadgeCheck className="h-3 w-3" /> Verified SEO expert
                </span>
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: MUTED }}>Founder & Lead SEO Strategist · 5+ years</p>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: MUTED }}>
                &quot;Law firm SEO is won on trust — real attorney credentials, genuine reviews, and content built to Google&apos;s YMYL E-E-A-T standards. I&apos;ve taken local service businesses to the top 3 map pack and Google AI Overview placements, and I bring that exact methodology to every firm I work with.&quot;
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
      <section className="border-b bg-[color:var(--bg-soft)]" style={{ ["--bg-soft" as any]: BG_SOFT, borderColor: BORDER }}>
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="mb-10">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>FAQ</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: INK }}>Law firm SEO questions, answered</h2>
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
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>Ready to get more cases?</div>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Stop paying per click.<br />Start owning your market.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
            Free law firm SEO audit — the founder personally reviews your site, local rankings, and AI search visibility, and delivers a 90-day growth roadmap within 24 hours.
          </p>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Link href="/free-audit"
              className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
              style={{ background: ACCENT }}>
              Claim free law firm audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+923106526316"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5">
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
 
    </main>
  );
}
 
/* ─── Helpers ─── */
function Cell({ v, accent = false }: { v: boolean | string; accent?: boolean }) {
  if (v === true) return <div className="px-6 py-4 text-center"><Check className="mx-auto h-5 w-5" style={{ color: accent ? ACCENT : "#16a34a" }} /></div>;
  if (v === false) return <div className="px-6 py-4 text-center"><X className="mx-auto h-5 w-5" style={{ color: "#9ca3af" }} /></div>;
  return <div className="px-6 py-4 text-center text-sm font-medium" style={{ color: accent ? ACCENT_DARK : MUTED }}>{v}</div>;
}