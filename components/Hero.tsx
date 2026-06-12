"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, ExternalLink, Linkedin, Play, BadgeCheck, Briefcase, PenLine, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import Certifications, { credentials } from "@/components/Certifications";
 
/* ─── Toptal-like palette ─── */
const CHARCOAL = "#1c1c24";   // Toptal heading charcoal (softer than navy)
const BODY = "#5b6472";       // Toptal body grey
const GREEN = "#3eb489";      // CTA green (matches site + Toptal)
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";     // brand accent for credential card
 
// ── Service personas ──────────────────────────────────────────────────
type Persona = {
  id: string;
  label: string;
  headline: string;
  emphasis: string;
  sub: string;
  cta: string;
  media: "photo" | "case";
  video?: { id: string; caption: string };
  clients?: string[];
};
 
const personas: Persona[] = [
  {
    id: "law-firm",
    label: "Law Firm SEO",
    headline: "Rank Your Firm.",
    emphasis: "Win More Cases.",
    sub: "We help law firms dominate local and national search results — more qualified leads, more signed clients, less wasted ad spend.",
    cta: "Get Law Firm SEO Audit",
    media: "photo" as const,
  },
  {
    id: "ecommerce",
    label: "eCommerce SEO",
    headline: "Rank Higher.",
    emphasis: "Sell More. Grow Faster.",
    sub: "From product pages to category architecture — we build eCommerce SEO strategies that drive revenue, not just traffic.",
    cta: "Get eCommerce SEO Audit",
    media: "case" as const,
    video: { id: "gFod-dTY-bg", caption: "How SMK Store grew US organic revenue +75% in two months." },
    clients: ["Adscarry", "SMK Store", "Michigan Outdoor Sports"],
  },
  {
    id: "local",
    label: "Local SEO",
    headline: "Own Your City.",
    emphasis: "Get Found First.",
    sub: "Dominate Google Maps and local search in your area. We help local businesses get more calls, more visits, and more customers.",
    cta: "Get Local SEO Audit",
    media: "case" as const,
    video: { id: "g_1TfDU4YeA", caption: "How HVAC Services Team reached the Google Map Pack Top 3 and an AI Overview." },
    clients: ["AAA Mobile Tyres", "Door Doctor", "HVAC Services Team"],
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
  const [activePersona, setActivePersona] = useState(0);
 
  // Toptal-style sync: hero card + credentials carousel rotate together
  const [credIndex, setCredIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCredIndex((i) => (i + 1) % credentials.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  const activeCred = credentials[credIndex];
 
  // Direct Calendly link — opens instantly in a new tab (no slow popup iframe)
  const CALENDLY_URL = "https://calendly.com/contact-searchprex/30min";
 
  const current = personas[activePersona];
 
  return (
    <>
      <section className="relative overflow-hidden bg-[#e9ebf0] pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
          {/* ── "I'm looking for" Toggle — Toptal style ── */}
          <div className="relative z-20 flex justify-center pt-2 pb-0">
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
          <div className="grid items-start gap-8 pt-2 pb-0 lg:grid-cols-2 lg:gap-12 lg:pt-2">
 
            {/* ── Left Content — Toptal-minimal: headline, paragraph, one button ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:pt-3 lg:text-left"
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
 
              {/* ── Dynamic H1 — Toptal-style thick underline on the emphasis line ── */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
                  style={{ color: CHARCOAL }}
                >
                  {current.headline}
                  <br />
                  <span
                    className="inline-block border-b-[5px] pb-1"
                    style={{ borderColor: CHARCOAL }}
                  >
                    {current.emphasis}
                  </span>
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
                  className="mx-auto mb-7 max-w-xl text-base leading-relaxed lg:mx-0 lg:text-lg"
                  style={{ color: BODY }}
                >
                  {current.sub}
                </motion.p>
              </AnimatePresence>
 
              {/* Single CTA — persona-driven (Toptal style, instant) */}
              <div className="flex justify-center lg:justify-start">
                {current.media === "photo" ? (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                    style={{ background: GREEN }}
                  >
                    <Calendar className="h-4 w-4" /> Book Free Strategy Call
                  </a>
                ) : (
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                    style={{ background: GREEN }}
                  >
                    View Case Studies <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
 
              {/* Secondary link + trust note — one quiet line each (Toptal whitespace) */}
              {current.media === "photo" ? (
                <div className="mt-4 flex justify-center lg:justify-start">
                  <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5" style={{ color: GREEN_DARK }}>
                    View our case studies <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : (
                <div className="mt-4 flex justify-center lg:justify-start">
                  <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5" style={{ color: GREEN_DARK }}>
                    Explore our services <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
 
              <div className="mt-3 flex items-center justify-center gap-1.5 lg:justify-start">
                <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                <span className="text-sm" style={{ color: BODY }}>
                  Free 30-min call · No commitment · Reply in 24hrs
                </span>
              </div>
            </motion.div>
 
            {/* ── Right: persona-driven — photo+card (Law Firm) OR video+clients (eCommerce/Local) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <AnimatePresence mode="wait">
                {current.media === "photo" ? (
                  /* ── Law Firm: Mubashar photo + credential card ── */
                  <motion.div
                    key="photo-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-start lg:gap-4"
                  >
                    {/* Photo + floating GSC-proof chips (CRO: verified numbers in first viewport) */}
                    <div className="relative z-0 shrink-0 lg:-mt-28">
                      <div className="relative aspect-[3/4] w-[330px] sm:w-[390px] lg:w-[460px]">
                        <Image
                          src="/images/mubashar-transparent.png"
                          alt="Mubashar Shahzad — Founder & Certified SEO Expert at SearchPrex"
                          fill
                          priority
                          className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
                        />
 
                        {/* Chip 1 — clicks (top-left of portrait) */}
                        <motion.div
                          animate={{ y: [0, -7, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-0 top-[26%] z-10 hidden -translate-x-1/3 lg:block"
                        >
                          <Link
                            href="/case-studies/ecommerce/michigan-outdoor-sports"
                            className="flex items-center gap-2 rounded-xl border border-[#e8eaf0] bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5"
                            title="Michigan Outdoor Sports case study"
                          >
                            <TrendingUp className="h-4 w-4 shrink-0" style={{ color: GREEN_DARK }} />
                            <span>
                              <span className="block text-sm font-black leading-none" style={{ color: GREEN_DARK }}>+476%</span>
                              <span className="mt-0.5 block text-[9px] leading-tight text-[#94a3b8]">Organic clicks · GSC verified</span>
                            </span>
                          </Link>
                        </motion.div>
 
                        {/* Chip 2 — revenue (lower-left of portrait) */}
                        <motion.div
                          animate={{ y: [0, -7, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                          className="absolute bottom-[22%] left-0 z-10 hidden -translate-x-1/4 lg:block"
                        >
                          <Link
                            href="/case-studies/ecommerce/smk-store"
                            className="flex items-center gap-2 rounded-xl border border-[#e8eaf0] bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5"
                            title="SMK Store case study"
                          >
                            <BadgeCheck className="h-4 w-4 shrink-0" style={{ color: GREEN }} />
                            <span>
                              <span className="block text-sm font-black leading-none" style={{ color: GREEN_DARK }}>+75%</span>
                              <span className="mt-0.5 block text-[9px] leading-tight text-[#94a3b8]">US revenue · 2 months</span>
                            </span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
 
                    {/* Credential card — Toptal anatomy: map · name · verified · role · previously-at */}
                    <div className="relative z-10 w-64 shrink-0 rounded-lg border border-[#e8eaf0] bg-white p-5 shadow-xl lg:-ml-12 lg:mt-2">
                      {/* Dotted world-map area (tall, like Toptal) */}
                      <div className="relative mb-4 h-24 w-full">
                        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)", backgroundSize: "6px 6px" }} />
                        <span className="absolute left-[30%] top-[42%] h-2 w-2 rounded-full" style={{ background: "#2f6fed" }} />
                      </div>
 
                      <p className="text-[15px] font-bold" style={{ color: PURPLE }}>Mubashar Shahzad</p>
 
                      {/* Rotating credential line — synced with the carousel below (Toptal effect) */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={credIndex}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <a
                            href={activeCred.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 flex items-center gap-1.5 transition-opacity hover:opacity-80"
                          >
                            {activeCred.isArticle ? (
                              <PenLine className="h-4 w-4 shrink-0" style={{ color: PURPLE }} />
                            ) : (
                              <BadgeCheck className="h-4 w-4 shrink-0" style={{ color: GREEN }} />
                            )}
                            <span className="text-[11px] font-bold" style={{ color: activeCred.isArticle ? PURPLE : GREEN_DARK }}>
                              {activeCred.isArticle ? (
                                <>Published Author <span className="font-medium" style={{ color: BODY }}>on {activeCred.source}</span></>
                              ) : (
                                <>Verified Expert <span className="font-medium" style={{ color: BODY }}>in {activeCred.specialty}</span></>
                              )}
                            </span>
                          </a>
                        </motion.div>
                      </AnimatePresence>
 
                      <a
                        href="https://www.linkedin.com/in/mubashar-shahzad-seo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center gap-1.5 transition-opacity hover:opacity-80"
                      >
                        <Briefcase className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
                        <span className="text-[11px] font-medium" style={{ color: BODY }}>Founder &amp; SEO Strategist</span>
                      </a>
 
                      <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Previously At</p>
                      <a
                        href="https://www.timetechnologiesllc.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-black tracking-tight text-[#1c1c24] transition-colors hover:text-[#534AB7]"
                      >
                        Time Technologies LLC
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* ── eCommerce / Local: video case study + client logos (no Mubashar) ── */
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
                    <p className="mt-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
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
 
        {/* ── Credentials carousel — overlaps the photo bottom, exactly like
            Toptal's expert cards. Overlap only on the photo persona; the video
            personas keep normal flow so client logos aren't covered. ── */}
        <div className={`relative z-10 ${current.media === "photo" ? "-mt-4 sm:-mt-10 lg:-mt-24" : "mt-0"}`}>
          <Certifications index={credIndex} onIndexChange={setCredIndex} />
        </div>
 
        {/* ── EEAT strip — quiet row below the carousel ── */}
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
          <p className="mb-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
            Verified &amp; Listed On
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
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
      </section>
    </>
  );
}
 