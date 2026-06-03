
"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, ExternalLink, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
 
/* ─── Palette — matches Toptal exactly ─── */
const CHARCOAL  = "#1c1c24";
const BODY      = "#5b6472";
const GREEN     = "#3eb489";
const GREEN_DK  = "#2f9670";
const PURPLE    = "#534AB7";
 
/* ─── Personas ─── */
const personas = [
  {
    id: "law-firm",
    label: "Law Firm SEO",
    headline: "Rank Your Firm.",
    emphasis: "Win More Cases.",
    sub: "We help law firms dominate local and national search results — more qualified leads, more signed clients, less wasted ad spend.",
    cta: "Get Law Firm SEO Audit",
  },
  {
    id: "ecommerce",
    label: "eCommerce SEO",
    headline: "Rank Higher.",
    emphasis: "Sell More. Grow Faster.",
    sub: "From product pages to category architecture — we build eCommerce SEO strategies that drive revenue, not just traffic.",
    cta: "Get eCommerce SEO Audit",
  },
  {
    id: "local",
    label: "Local SEO",
    headline: "Own Your City.",
    emphasis: "Get Found First.",
    sub: "Dominate Google Maps and local search in your area. We help local businesses get more calls, more visits, and more customers.",
    cta: "Get Local SEO Audit",
  },
];
 
/* ─── EEAT links ─── */
const eeatLinks = [
  { label: "Trustpilot", sub: "Reviews",   href: "https://www.trustpilot.com/review/searchprex.com", color: "#00b67a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch",     sub: "5.0 ★",    href: "https://clutch.co/profile/searchprex",              color: "#d97706",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB",        sub: "A+ Listed", href: "https://www.bbb.org/us/il/chicago/profile/searchprex", color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text></svg> },
  { label: "G2",         sub: "Approved",  href: "https://www.g2.com/sellers/searchprex",             color: "#ff492c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms",  sub: "Verified",  href: "https://www.goodfirms.co/company/searchprex",       color: PURPLE,
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill={PURPLE}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed",    href: "https://www.crunchbase.com/organization/searchprex", color: "#0288d1",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency",    href: "https://www.designrush.com/agency/searchprex",      color: "#e11d48",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn",   sub: "Company",   href: "https://www.linkedin.com/company/searchprex/",      color: "#0a66c2",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];
 
/* ─── Cert strip data ─── */
const certs = [
  { href: "https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf", org: "Semrush", orgColor: "#FF6B35", bg: "#FFF0E8", letter: "S", name: "SEO Toolkit", type: "Certified Professional" },
  { href: "https://static.semrush.com/academy/certificates/0053423184/mubashar-shahzad_2.pdf",  org: "Semrush", orgColor: "#FF6B35", bg: "#FFF0E8", letter: "S", name: "Content Marketing", type: "Certified Professional" },
  { href: "https://static.semrush.com/academy/certificates/7ec9b0d154/mubashar-shahzad_2.pdf",  org: "Semrush", orgColor: "#FF6B35", bg: "#FFF0E8", letter: "S", name: "Keyword Research", type: "Certified Professional" },
  { href: "https://static.semrush.com/academy/certificates/e2cb11d7cb/mubashar-shahzad_26.pdf", org: "Semrush", orgColor: "#FF6B35", bg: "#FFF0E8", letter: "S", name: "Technical SEO", type: "Certified Professional" },
  { href: "https://academy.hubspot.com", org: "HubSpot", orgColor: "#FF7A59", bg: "#FFF3F0", letter: "H", name: "Inbound Marketing", type: "Certified Professional" },
  { href: "https://researchgate.net/profile/Mubashar-Shahzad", org: "ResearchGate", orgColor: "#00AAFF", bg: "#EAF5FF", letter: "RG", name: "Content Strategist", type: "Published Researcher" },
];
 
interface HeroProps {
  heroImage?: unknown;
}
 
export default function Hero({ heroImage }: HeroProps) {
  const [activePersona, setActivePersona] = useState(0);
  const [certIdx, setCertIdx] = useState(0);
  const visible = 3;
  const maxStep = certs.length - visible;
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
 
  // Auto-advance certs
  useEffect(() => {
    const t = setInterval(() => setCertIdx(i => i >= maxStep ? 0 : i + 1), 3000);
    return () => clearInterval(t);
  }, [maxStep]);
 
  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: "https://calendly.com/contact-searchprex/30min" });
    }
  };
 
  const current = personas[activePersona];
 
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
 
      {/* ══ MAIN HERO ══ */}
      <section className="relative overflow-hidden bg-[#e9ebf0] pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
          {/* ── Toggle ── */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm border border-white/80">
              <span className="text-xs font-medium text-[#64748b] whitespace-nowrap">I&apos;m looking for</span>
              <div className="flex items-center gap-1">
                {personas.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePersona(i)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      activePersona === i
                        ? "border border-[#cdd2dd] bg-white text-[#1c1c24] shadow-sm"
                        : "border border-transparent text-[#64748b] hover:text-[#1c1c24]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
 
          {/* ── 3-Column Grid: Left copy | Center photo | Right card ── */}
          <div className="grid items-end gap-0 py-4 lg:grid-cols-[1fr_320px_260px] lg:gap-6 lg:py-6">
 
            {/* ── LEFT: Copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col pb-6 text-center lg:text-left"
            >
              {/* Live pill */}
              <div className="mb-4 inline-flex items-center gap-2 self-center rounded-full bg-white/70 px-4 py-1.5 lg:self-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GREEN_DK }}>
                  Founder-Led SEO. No Juniors. No Fluff.
                </span>
              </div>
 
              {/* H1 */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl"
                  style={{ color: CHARCOAL }}
                >
                  {current.headline}
                  <br />
                  <span>{current.emphasis}</span>
                </motion.h1>
              </AnimatePresence>
 
              {/* Sub */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id + "-sub"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 max-w-lg text-base leading-relaxed"
                  style={{ color: BODY }}
                >
                  {current.sub}
                </motion.p>
              </AnimatePresence>
 
              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  onClick={openCalendly}
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}
                >
                  <Calendar className="h-4 w-4" /> Book Free Strategy Call
                </button>
                <Link
                  href="/free-audit"
                  className="inline-flex items-center justify-center rounded-lg border-2 px-7 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:bg-white"
                  style={{ borderColor: "#cdd2dd", color: CHARCOAL }}
                >
                  {current.cta}
                </Link>
              </div>
 
              <div className="mt-3 flex justify-center lg:justify-start">
                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN_DK }}>
                  View our case studies <span>→</span>
                </Link>
              </div>
 
              <div className="mt-3 mb-5 flex items-center justify-center gap-1.5 lg:justify-start">
                <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />
                <span className="text-sm" style={{ color: BODY }}>Free 30-min call · No commitment · Reply in 24hrs</span>
              </div>
 
              {/* EEAT badges */}
              <div className="rounded-xl border border-white/60 bg-white/50 px-3 py-3 backdrop-blur-sm">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Verified &amp; Listed On</p>
                <div className="flex flex-wrap gap-1.5">
                  {eeatLinks.map(p => (
                    <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-1.5 shadow-sm transition-all hover:border-[#3eb489] hover:shadow-md">
                      <span className="flex-shrink-0 transition-transform group-hover:scale-110">{p.icon}</span>
                      <div>
                        <p className="text-[10px] font-semibold leading-none text-[#0a0f2e]">{p.label}</p>
                        <p className="text-[9px] font-medium leading-tight" style={{ color: p.color }}>{p.sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
 
            {/* ── CENTER: Founder photo — transparent PNG blending into bg (Toptal exact) ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative hidden lg:flex lg:items-end lg:justify-center"
            >
              {/* 5+ yrs chip — top-left, just like Toptal */}
              <div className="absolute left-0 top-10 z-10 rounded-lg border border-[#e8eaf0] bg-white px-3 py-2 shadow-lg">
                <p className="text-base font-black tracking-tight" style={{ color: GREEN_DK }}>5+ yrs</p>
                <p className="text-[9px] text-[#64748b]">SEO experience</p>
              </div>
 
              {/* Photo — no card/border, blends straight into bg like Toptal */}
              <div className="relative h-[420px] w-[300px]">
                <Image
                  src="/images/mubashar-transparent.png"
                  alt="Mubashar Shahzad — Founder & Lead SEO Strategist at SearchPrex"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
                />
              </div>
            </motion.div>
 
            {/* ── RIGHT: Toptal-exact credential card ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="hidden lg:flex lg:items-center lg:pb-6"
            >
              <div className="relative w-full rounded-2xl border border-[#e0e2ea] bg-white p-5 shadow-2xl">
 
                {/* World-map dot pattern — Toptal signature */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)",
                    backgroundSize: "8px 8px",
                  }}
                />
 
                <div className="relative">
                  {/* Name */}
                  <p className="text-[15px] font-bold" style={{ color: PURPLE }}>Mubashar Shahzad</p>
 
                  {/* Verified Expert — green checkmark, exactly Toptal */}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: GREEN }} />
                    <p className="text-[11px]">
                      <span className="font-bold" style={{ color: GREEN_DK }}>Verified Expert</span>
                      <span className="font-medium text-[#475569]"> in SEO Strategy</span>
                    </p>
                  </div>
 
                  {/* Role + LinkedIn inline */}
                  <div className="mt-1 flex items-center gap-2">
                    {/* small bar icon like Toptal role icon */}
                    <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <path d="M18 20V10M12 20V4M6 20v-6" />
                    </svg>
                    <p className="text-[10px] font-medium text-[#64748b]">Founder &amp; Certified SEO Expert</p>
                    <a
                      href="https://www.linkedin.com/in/mubi00"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                      style={{ background: "#0a66c2" }}
                    >
                      <Linkedin className="h-3 w-3 text-white" />
                    </a>
                  </div>
 
                  <hr className="my-3 border-[#eef0f4]" />
 
                  {/* Previously At — Toptal exact */}
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">Previously At</p>
                  <p className="text-[17px] font-black tracking-tight" style={{ color: CHARCOAL }}>
                    Times Technologies LLC
                  </p>
 
                  <hr className="my-3 border-[#eef0f4]" />
 
                  {/* Verified result */}
                  <Link
                    href="/case-studies"
                    className="block rounded-xl p-3 transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(62,180,137,0.08)", border: "1px solid rgba(62,180,137,0.2)" }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Verified Result</p>
                    <p className="mt-0.5 text-[15px] font-black" style={{ color: CHARCOAL }}>+476% organic clicks</p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: GREEN_DK }}>
                      View case study <span>→</span>
                    </span>
                  </Link>
 
                  {/* Cert row */}
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href="https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all hover:opacity-80"
                      style={{ background: "rgba(62,180,137,0.12)" }}
                    >
                      <CheckCircle className="h-3 w-3" style={{ color: GREEN }} />
                      <span className="text-[10px] font-bold" style={{ color: GREEN_DK }}>Semrush Certified</span>
                      <ExternalLink className="h-2.5 w-2.5" style={{ color: GREEN_DK }} />
                    </a>
                    <a
                      href="https://researchgate.net/profile/Mubashar-Shahzad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all hover:opacity-80"
                      style={{ background: "rgba(0,170,255,0.10)" }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: "#00AAFF" }}>ResearchGate</span>
                      <ExternalLink className="h-2.5 w-2.5" style={{ color: "#00AAFF" }} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
 
          </div>
        </div>
 
        {/* ══ TOPTAL-EXACT CERT STRIP — below hero, full width ══ */}
        <div className="relative overflow-hidden border-t border-[#d4d8e2] bg-[#dde0ea]">
 
          {/* Left/right fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#dde0ea] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#dde0ea] to-transparent" />
 
          {/* Prev arrow */}
          <button
            onClick={() => setCertIdx(i => Math.max(0, i - 1))}
            className="absolute left-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#c8cdd8] bg-white shadow-md transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
            aria-label="Previous"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
 
          {/* Next arrow */}
          <button
            onClick={() => setCertIdx(i => Math.min(maxStep, i + 1))}
            className="absolute right-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#c8cdd8] bg-white shadow-md transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
            aria-label="Next"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
 
          {/* Track */}
          <div className="overflow-hidden px-12 py-3">
            <div
              className="flex gap-3 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{ transform: `translateX(calc(-${certIdx} * (220px + 12px)))` }}
            >
              {certs.map((c, idx) => (
                <a
                  key={idx}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-[220px] flex-shrink-0 overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md ${
                    idx === certIdx + 1 ? "border-[#334a8f] shadow-sm" : "border-transparent"
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  {/* Left: coloured logo block */}
                  <div className="flex w-[72px] flex-shrink-0 items-center justify-center" style={{ background: c.bg }}>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-white"
                      style={{ background: c.orgColor, fontSize: c.letter.length > 1 ? "11px" : "18px" }}
                    >
                      {c.letter}
                    </div>
                  </div>
 
                  {/* Right: text */}
                  <div className="flex flex-col justify-center gap-0.5 py-3 pl-3 pr-3">
                    <p className="text-[11px] font-semibold leading-tight text-[#1e293b]">Mubashar Shahzad</p>
                    <div className="flex items-center gap-1">
                      <svg className="h-2.5 w-2.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={c.orgColor} strokeWidth="2.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      </svg>
                      <p className="text-[9.5px] text-[#64748b]">{c.name}</p>
                    </div>
                    <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#94a3b8]">Certified by</p>
                    <p className="text-[13px] font-black leading-tight tracking-tight" style={{ color: c.orgColor }}>{c.org}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
 
      </section>
    </>
  );
}
 