"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, ExternalLink, Linkedin } from "lucide-react";
import { useState } from "react";
 
/* ─── Toptal-like palette ─── */
const CHARCOAL = "#1c1c24";   // Toptal heading charcoal (softer than navy)
const BODY = "#5b6472";       // Toptal body grey
const GREEN = "#3eb489";      // CTA green (matches site + Toptal)
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";     // brand accent for credential card
 
// ── Service personas ──────────────────────────────────────────────────
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
 
// ── EEAT platform links ───────────────────────────────────────────────
const eeatLinks = [
  { label: "Trustpilot", sub: "Registered",  href: "https://www.trustpilot.com/review/searchprex.com", color: "#00b67a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch",     sub: "Registered",   href: "https://clutch.co/profile/searchprex",              color: "#d97706",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB",        sub: "Registered",href: "https://www.bbb.org/us/il/chicago/profile/searchprex", color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text></svg> },
  { label: "G2",         sub: "Registered", href: "https://www.g2.com/sellers/searchprex",             color: "#ff492c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms",  sub: "Registered", href: "https://www.goodfirms.co/company/searchprex",       color: "#534AB7",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed",   href: "https://www.crunchbase.com/organization/searchprex", color: "#0288d1",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency",   href: "https://www.designrush.com/agency/searchprex",      color: "#e11d48",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn",   sub: "Company",  href: "https://www.linkedin.com/company/searchprex/",      color: "#0a66c2",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];
 
interface HeroProps {
  heroImage?: unknown;
}
 
export default function Hero({ heroImage }: HeroProps) {
  const [activePersona, setActivePersona] = useState(0);
 
  // Direct Calendly link — opens instantly in a new tab (no slow popup iframe)
  const CALENDLY_URL = "https://calendly.com/contact-searchprex/30min";
 
  const current = personas[activePersona];
 
  return (
    <>
      {/* Speed up Calendly load in the new tab */}
      <link rel="preconnect" href="https://calendly.com" />
      <link rel="preconnect" href="https://assets.calendly.com" />
      <section className="relative overflow-hidden bg-[#e9ebf0] pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
          {/* ── "I'm looking for" Toggle — Toptal style ── */}
          <div className="flex justify-center pt-4 pb-1">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm border border-white/80">
              <span className="text-xs font-medium text-[#64748b] whitespace-nowrap">
                I&apos;m looking for
              </span>
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
 
          {/* ── 2-Column Grid ── */}
          <div className="grid items-center gap-8 py-6 lg:grid-cols-2 lg:gap-12 lg:py-8">
 
            {/* ── Left Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Live pill */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GREEN_DARK }}>
                  Founder-Led SEO. No Juniors. No Fluff.
                </span>
              </div>
 
              {/* ── Dynamic H1 — simple charcoal (no underline) ── */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl"
                  style={{ color: CHARCOAL }}
                >
                  {current.headline}
                  <br />
                  <span>{current.emphasis}</span>
                </motion.h1>
              </AnimatePresence>
 
              {/* ── Dynamic subtext ── */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id + "-sub"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto mb-4 max-w-xl text-base leading-relaxed lg:mx-0"
                  style={{ color: BODY }}
                >
                  {current.sub}
                </motion.p>
              </AnimatePresence>
 
              {/* Single CTA — Toptal style (instant link, no slow popup) */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}
                >
                  <Calendar className="h-4 w-4" /> Book Free Strategy Call
                </a>
              </div>
 
              {/* View case studies link */}
              <div className="mt-3 flex justify-center lg:justify-start">
                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5" style={{ color: GREEN_DARK }}>
                  View our case studies <span aria-hidden="true">→</span>
                </Link>
              </div>
 
              {/* Sub-note */}
              <div className="mt-3 mb-6 flex items-center justify-center gap-1.5 lg:justify-start">
                <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                <span className="text-sm" style={{ color: BODY }}>
                  Free 30-min call · No commitment · Reply in 24hrs
                </span>
              </div>
 
              {/* EEAT Badges */}
              <div className="rounded-xl border border-white/60 bg-white/50 px-3 py-3 backdrop-blur-sm">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                  Verified &amp; Listed On
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {eeatLinks.map((platform) => (
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
                  ))}
                </div>
              </div>
            </motion.div>
 
            {/* ── Right: Toptal-style photo + separate credential card ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-center lg:gap-4"
            >
              {/* Photo — transparent PNG, bottom fades into bg (Toptal style), BIGGER */}
              <div className="relative shrink-0">
                <div className="relative aspect-[3/4] w-[330px] sm:w-[390px]">
                  <Image
                    src="/images/mubashar-transparent.png"
                    alt="Mubashar Shahzad — Founder & Certified SEO Expert at SearchPrex"
                    fill
                    priority
                    className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                  />
                </div>
              </div>
 
              {/* Credential card — Toptal structure + delivered stats (SMALLER) */}
              <div className="relative w-52 shrink-0 rounded-xl border border-[#e8eaf0] bg-white p-4 shadow-xl">
                {/* World-map dots — Toptal style (top of card) */}
                <div className="relative mb-3 h-10 w-full">
                  <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)", backgroundSize: "7px 7px" }} />
                  <span className="absolute left-[22%] top-[35%] h-1.5 w-1.5 rounded-full" style={{ background: PURPLE }} />
                </div>
 
                {/* Name */}
                <p className="text-sm font-bold" style={{ color: PURPLE }}>Mubashar Shahzad</p>
 
                {/* Verified — Founder & Certified SEO Expert (clickable → Semrush cert) */}
                <a
                  href="https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-start gap-1.5 transition-opacity hover:opacity-80"
                >
                  <CheckCircle className="mt-0.5 h-3 w-3 shrink-0" style={{ color: GREEN }} />
                  <span className="text-[11px] font-bold leading-snug" style={{ color: GREEN_DARK }}>
                    Founder &amp; Certified SEO Expert
                    <ExternalLink className="ml-1 inline h-2.5 w-2.5" />
                  </span>
                </a>
 
                {/* LinkedIn — verify experience */}
                <a
                  href="https://www.linkedin.com/in/mubashar-shahzad-seo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-center gap-1.5 transition-opacity hover:opacity-80"
                >
                  <Linkedin className="h-3 w-3 shrink-0" style={{ color: "#0a66c2" }} />
                  <span className="text-[11px] font-medium" style={{ color: "#0a66c2" }}>Verify on LinkedIn</span>
                </a>
 
                {/* Delivered stats — what Mubashar has achieved */}
                <div className="mt-3 grid grid-cols-3 gap-1 border-t border-[#eef0f5] pt-3">
                  <div>
                    <p className="text-sm font-black leading-none" style={{ color: GREEN_DARK }}>5+</p>
                    <p className="mt-0.5 text-[8px] leading-tight text-[#94a3b8]">Years Exp.</p>
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none" style={{ color: GREEN_DARK }}>+476%</p>
                    <p className="mt-0.5 text-[8px] leading-tight text-[#94a3b8]">Clicks</p>
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none" style={{ color: GREEN_DARK }}>+75%</p>
                    <p className="mt-0.5 text-[8px] leading-tight text-[#94a3b8]">Revenue</p>
                  </div>
                </div>
 
                {/* Previously at */}
                <p className="mt-3 text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Previously At</p>
                <p className="text-xs font-black text-[#0a0f2e]">Time Technologies LLC</p>
 
                {/* Toptal-style notch/fold at bottom-left */}
                <div className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 border-b border-r border-[#e8eaf0] bg-white" />
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>
    </>
  );
}
 





























































