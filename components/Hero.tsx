"use client";
 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Play, Globe } from "lucide-react";
import { useState } from "react";
import { color } from "@/lib/design-tokens";
import {
  OFFER_HREF,
  OFFER_CTA,
  OFFER_CTA_BY_PERSONA,
  OFFER_MICROCOPY,
  CALL_HREF,
  CALL_CTA,
} from "@/lib/offer";
 
/* ─── Toptal-like palette ─── */
const CHARCOAL = color.ink;
const BODY = "#5b6472";       // Toptal body grey
const GREEN = "#1a7d59";      // CTA green (5.1:1 contrast with white)
const GREEN_DARK = "#196b4d";
const PURPLE = "#534AB7";     // brand accent for credential card
 
// ── Service personas ──────────────────────────────────────────────────
type Persona = {
  id: string;
  label: string;
  hook: string;
  sub: string;
  media: "photo" | "case";
  video?: { id: string; caption: string };
  clients?: string[];
};
 
const personas: Persona[] = [
  {
    id: "law-firm",
    label: "Law Firm SEO",
    hook: "One Firm Per City · Direct Founder Execution",
    sub: "No juniors, no hand-offs. I take one practice per city and show you real Search Console data behind every case inquiry.",
    media: "photo" as const,
  },
  {
    id: "ecommerce",
    label: "Ecommerce SEO",
    hook: "+227% Verified Revenue Growth · GSC Proof Included",
    sub: "From $5,832 to $19,100/mo in net sales. Technical fixes that recover lost products and drive real store revenue.",
    media: "case" as const,
    video: {
      id: "gFod-dTY-bg",
      caption: "Watch me pull the exact GSC data behind a 227% revenue increase.",
    },
    clients: ["SMK Store", "Michigan Outdoor", "Global Brands"],
  },
  {
    id: "local",
    label: "Local SEO",
    hook: "Map Pack Top 3 · AI Overview Placement",
    sub: "GBP, citations, and service-area pages — all handled by me. I report on calls and leads, not vanity metrics.",
    media: "case" as const,
    video: { id: "g_1TfDU4YeA", caption: "Watch how I pushed HVAC Services Team to the Map Pack Top 3." },
    clients: ["AAA Mobile Tyres", "Door Doctor", "HVAC Services Team"],
  },
];
 
// ── EEAT platform badges ──────────────────────────────────────────────
// Only Trustpilot opens externally (verified reviews); other directory
// listings are rendered as non-clickable verification pills so high-intent
// visitors don't leak out of the hero before seeing the proof below.
const eeatLinks = [
  { label: "Trustpilot", sub: "Verified reviews", href: "https://www.trustpilot.com/review/searchprex.com", color: "#05704a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch", sub: "Registered", color: "#8a5b08",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB", sub: "Registered", color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="14.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#1d4ed8">BBB</text></svg> },
  { label: "G2", sub: "Registered", color: "#b23219",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms", sub: "Registered", color: "#534AB7",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed", color: "#01699c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency", color: "#b8123a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn", sub: "Company", color: "#0a4f96",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

interface HeroProps {
  heroImage?: unknown;
}
 
/* ── Video case study card (thumbnail → embeds on click, performance-safe) ── */
function VideoCard({ id, caption }: { id: string; caption: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#e8eaf0] bg-white shadow-xl">
      <div className="relative aspect-video w-full bg-black">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title="SearchPrex case study video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlay(true)}
            aria-label="Play case study video"
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" style={{ color: GREEN_DARK }} fill={GREEN_DARK} />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug text-[#0a0f2e]">{caption}</p>
      </div>
    </div>
  );
}
 
export default function Hero({ heroImage }: HeroProps) {
  const router = useRouter();
  const [activePersona, setActivePersona] = useState(0);
  const [websiteInput, setWebsiteInput] = useState("");
 
  const current = personas[activePersona];
  const primaryCtaLabel = OFFER_CTA_BY_PERSONA[current.id] ?? OFFER_CTA;

  function handleHeroAuditSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = websiteInput.trim();
    if (trimmed) {
      router.push(`${OFFER_HREF}?website=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(OFFER_HREF);
    }
  }
 
  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden bg-[#eaecf3] pt-20"
      >
        {/* ── Semrush-style aurora background ── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="hero-aurora hero-aurora-1" />
          <span className="hero-aurora hero-aurora-2" />
          <style>{`
            .hero-aurora { position:absolute; border-radius:9999px; filter:blur(100px); will-change:transform; }
            .hero-aurora-1 { width:50%; height:70%; left:-12%; top:-10%; background:#534AB7; opacity:0.14; animation: hero-d1 22s ease-in-out infinite alternate; }
            .hero-aurora-2 { width:45%; height:65%; right:-12%; top:5%; background:#3eb489; opacity:0.12; animation: hero-d2 26s ease-in-out infinite alternate; }
            @keyframes hero-d1 { from{transform:translate(0,0) scale(1);} to{transform:translate(12%,8%) scale(1.15);} }
            @keyframes hero-d2 { from{transform:translate(0,0) scale(1);} to{transform:translate(-10%,6%) scale(1.12);} }
            @media (prefers-reduced-motion: reduce){ .hero-aurora{animation:none;} }
          `}</style>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
 
          {/* ── "I'm looking for" Toggle — Toptal style ── */}
          <div className="relative z-20 flex justify-center pt-2 pb-3">
            <div className="inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm border border-white/90 sm:gap-3 sm:px-5 sm:py-2.5">
              <span className="hidden text-xs font-medium text-[#566070] whitespace-nowrap sm:inline">
                I&apos;m looking for
              </span>
              <div role="tablist" aria-label="Choose the service you're looking for" className="flex items-center gap-1">
                {personas.map((p, i) => (
                  <button
                    key={p.id}
                    id={`persona-tab-${p.id}`}
                    role="tab"
                    type="button"
                    aria-selected={activePersona === i}
                    aria-controls="persona-panel"
                    tabIndex={activePersona === i ? 0 : -1}
                    onClick={() => setActivePersona(i)}
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                      e.preventDefault();
                      const next =
                        e.key === "ArrowRight"
                          ? (i + 1) % personas.length
                          : (i - 1 + personas.length) % personas.length;
                      setActivePersona(next);
                      document.getElementById(`persona-tab-${personas[next].id}`)?.focus();
                    }}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2 sm:px-4 ${
                      activePersona === i
                        ? "border border-[#cdd2dd] bg-white text-[#1c1c24] shadow-sm"
                        : "border border-transparent text-[#566070] hover:text-[#1c1c24]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
 
          {/* ── 2-Column Grid — the tabpanel for the persona tablist ── */}
          <div
            id="persona-panel"
            role="tabpanel"
            aria-labelledby={`persona-tab-${current.id}`}
            className="grid items-start gap-10 pt-4 pb-0 lg:grid-cols-2 lg:gap-12 lg:pt-6"
          >
 
            {/* ── Left Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:pt-2 lg:text-left"
            >


              {/* ── H1 ── */}
              <h1 className="mb-3 font-black tracking-tight" style={{ color: CHARCOAL }}>
                <span className="block text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                  US SEO Agency
                </span>
                <span
                  className="mt-1 block text-[1.75rem] leading-[1.15] text-balance sm:text-[2.125rem] lg:text-[2.75rem]"
                >
                  That Drives Revenue, Not Just Rankings
                </span>
              </h1>

              {/* ── Outcome hook — replaces the redundant repeated persona title ── */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id + "-hook"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mb-3 text-sm font-bold uppercase tracking-wider sm:text-base"
                  style={{ color: GREEN_DARK }}
                >
                  {current.hook}
                </motion.p>
              </AnimatePresence>
 
              {/* ── Dynamic subtext ── */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id + "-sub"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto mb-6 max-w-lg text-sm leading-relaxed lg:mx-0 lg:text-base"
                  style={{ color: BODY }}
                >
                  {current.sub}
                </motion.p>
              </AnimatePresence>
 
              {/* ── Inline Micro-Commitment Form + Persona-Specific CTA ── */}
              <form
                onSubmit={handleHeroAuditSubmit}
                className="mx-auto flex max-w-xl flex-col gap-3 lg:mx-0"
              >
                <div className="relative">
                  <Globe
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7a8494]"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={websiteInput}
                    onChange={(e) => setWebsiteInput(e.target.value)}
                    placeholder="Enter your website URL (e.g. yoursite.com)"
                    aria-label="Enter your website URL for a free competitor tear-down"
                    className="w-full rounded-xl border border-[#cdd2dd] bg-white py-4 pl-12 pr-4 text-base text-[#0a0f2e] shadow-sm outline-none transition-all placeholder:text-[#7a8494] focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 sm:text-base"
                  style={{ background: GREEN }}
                >
                  {primaryCtaLabel} <span aria-hidden="true">→</span>
                </button>
              </form>

              {/* Secondary action — Book a call */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
                <a
                  href={CALL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
                  style={{ color: GREEN_DARK }}
                >
                  <Calendar className="h-4 w-4" /> {CALL_CTA}
                </a>
                <span className="hidden text-[#cdd2dd] sm:inline" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm" style={{ color: BODY }}>
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                  {OFFER_MICROCOPY}
                </span>
              </div>
            </motion.div>
 
            {/* ── Right: persona-driven — photo+card (Law Firm) OR video+clients (eCommerce/Local) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:min-h-[480px]"
            >
              <AnimatePresence mode="wait">
                {current.media === "photo" ? (
                  /* ── Law Firm: Simple Lead Capture Form ── */
                  <motion.div
                    key="lead-form-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-full max-w-md rounded-2xl border border-[#e8eaf0] bg-white p-6 shadow-xl sm:p-8">
                      <div className="mb-5 flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full"
                          style={{ background: "rgba(26,125,89,0.12)" }}
                        >
                          <CheckCircle className="h-5 w-5" style={{ color: GREEN }} />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-[#0a0f2e]">Free Competitor Tear-Down</p>
                          <p className="text-xs text-[#566070]">I&apos;ll personally analyze your site</p>
                        </div>
                      </div>

                      <form
                        onSubmit={handleHeroAuditSubmit}
                        className="flex flex-col gap-3"
                      >
                        <div className="relative">
                          <Globe
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a8494]"
                            aria-hidden="true"
                          />
                          <input
                            type="text"
                            value={websiteInput}
                            onChange={(e) => setWebsiteInput(e.target.value)}
                            placeholder="yoursite.com"
                            aria-label="Enter your website URL"
                            className="w-full rounded-lg border border-[#cdd2dd] bg-[#f8f9fc] py-3 pl-10 pr-4 text-sm text-[#0a0f2e] outline-none transition-all placeholder:text-[#7a8494] focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-lg px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5"
                          style={{ background: GREEN }}
                        >
                          {primaryCtaLabel} <span aria-hidden="true">→</span>
                        </button>
                      </form>

                      {/* Trust signals */}
                      <div className="mt-4 flex flex-col gap-2">
                        {["Free — no credit card required", "Reply within 24 hours", "One client per city exclusivity"].map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} />
                            <span className="text-xs text-[#566070]">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Proof stats */}
                      <div className="mt-5 flex items-stretch gap-3 border-t border-[#eef0f4] pt-4">
                        <Link
                          href="/case-studies/ecommerce/smk-store"
                          className="flex-1 transition-opacity hover:opacity-80"
                          title="SMK Store revenue case study"
                        >
                          <span className="block text-base font-black leading-none" style={{ color: GREEN_DARK }}>+227%</span>
                          <span className="mt-1 block text-[11px] leading-tight text-[#566070]">Revenue · $5.8k → $19.1k</span>
                        </Link>
                        <span className="w-px shrink-0 bg-[#eef0f4]" />
                        <Link
                          href="/case-studies/ecommerce/michigan-outdoor-sports"
                          className="flex-1 transition-opacity hover:opacity-80"
                          title="Michigan Outdoor Sports case study"
                        >
                          <span className="block text-base font-black leading-none" style={{ color: GREEN_DARK }}>+285%</span>
                          <span className="mt-1 block text-[11px] leading-tight text-[#566070]">Pages indexed · GSC verified</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* ── eCommerce / Local: video case study + client logos ── */
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto w-full max-w-md"
                  >
                    <VideoCard key={current.video?.id} id={current.video?.id ?? ""} caption={current.video?.caption ?? ""} />
 
                    {/* Client logos */}
                    <p className="mt-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#566070]">
                      Trusted by clients like
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {(current.clients ?? []).map((name) => (
                        <div
                          key={name}
                          className="flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-2 py-3 text-center text-[11px] font-bold leading-tight text-[#475569]"
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
 
          </div>
 
        </div>
 
        {/* ── EEAT strip — compact row below the hero ── */}
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
          <p className="mb-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#566070]">
            Verified &amp; Listed On
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {eeatLinks.map((platform) =>
              platform.href ? (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`SearchPrex on ${platform.label}`}
                  className="group flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-1.5 shadow-sm transition-all hover:border-[#3eb489] hover:shadow-md"
                >
                  <span className="flex-shrink-0 transition-transform group-hover:scale-110">
                    {platform.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold leading-none text-[#0a0f2e]">{platform.label}</p>
                    <p className="text-[9px] font-medium leading-tight" style={{ color: platform.color }}>{platform.sub}</p>
                  </div>
                </a>
              ) : (
                <div
                  key={platform.label}
                  className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white/90 px-2.5 py-1.5 shadow-sm"
                >
                  <span className="flex-shrink-0">
                    {platform.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold leading-none text-[#0a0f2e]">{platform.label}</p>
                    <p className="text-[9px] font-medium leading-tight" style={{ color: platform.color }}>{platform.sub}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

 
