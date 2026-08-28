"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, ExternalLink, Linkedin, Play, BadgeCheck, Briefcase, PenLine } from "lucide-react";
import { useState, useEffect } from "react";
import Certifications, { credentials } from "@/components/Certifications";
import { color } from "@/lib/design-tokens";
import {
  OFFER_HREF,
  OFFER_CTA_BY_PERSONA,
  OFFER_MICROCOPY,
  CALL_HREF,
  CALL_CTA,
} from "@/lib/offer";
 
/* ─── Toptal-like palette ─── */
// Heading colour comes from the shared token now. This was #1c1c24 while
// every other section used #0a0f2e — two near-blacks a few points apart,
// which reads as an inconsistency rather than a choice.
const CHARCOAL = color.ink;
const BODY = "#5b6472";       // Toptal body grey
const GREEN = "#1a7d59";      // CTA green. Was #3eb489, on which white text is 2.59:1 — the primary button failed AA. This is 5.1:1.
const GREEN_DARK = "#196b4d";
const PURPLE = "#534AB7";     // brand accent for credential card
 
// ── Service personas ──────────────────────────────────────────────────
type Persona = {
  id: string;
  label: string;
  headline: string;
  emphasis: string;
  sub: string;
  media: "photo" | "case";
  video?: { id: string; caption: string };
  clients?: string[];
  aside?: { label: string; href: string };
};
 
const personas: Persona[] = [
  {
    id: "law-firm",
    label: "Law Firm SEO",
    headline: "Law Firm SEO",
    emphasis: "for US Practices.",
    sub: "It's me doing the work. Not a junior, not an account manager you've never met. I take one firm per city, so I'm never working for the practice across town at the same time, and when I tell you something moved I'll send you the Search Console export that shows it.",
    // Law firms only: the AI intake assistant is a separate product, so it
    // gets one quiet line here rather than a competing section.
    aside: { label: "Also for law firms: AI Intake Assistant — qualify every case 24/7", href: "/intake-assistant" },
    media: "photo" as const,
  },
  {
    id: "ecommerce",
    label: "Ecommerce SEO",
    headline: "Ecommerce SEO",
    emphasis: "for US Online Stores.",
    sub: "A client's 35,000-product catalog fell out of Google. Getting it back in took months of unglamorous technical work, and their monthly revenue went from $5,832 to $19,100. I kept every dashboard. Ask me and I'll walk you through what actually moved.",
    aside: { label: "Read how I scale Ecommerce", href: "/services/ecommerce-seo" },
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
    headline: "Local SEO",
    emphasis: "for US Service Businesses.",
    sub: "Ranking first is worth nothing if the phone stays quiet. I handle your Google Business Profile, your citations and your service-area pages myself, and I report on calls and direction requests. Those are the numbers you actually get paid on.",
    aside: { label: "Read how I rank Local Businesses", href: "/services/local-seo" },
    media: "case" as const,
    video: { id: "g_1TfDU4YeA", caption: "Watch how I pushed HVAC Services Team to the Map Pack Top 3." },
    clients: ["AAA Mobile Tyres", "Door Doctor", "HVAC Services Team"],
  },
];
 
// ── EEAT platform links ───────────────────────────────────────────────
// Full list. These were trimmed to three during the design pass on the
// grounds that "Registered" is not a credential. That was the wrong call for
// this site: the breadth of verified, checkable listings is itself an E-E-A-T
// signal, and every entry here is a real profile a visitor can open.
const eeatLinks = [
  { label: "Trustpilot", sub: "Verified reviews", href: "https://www.trustpilot.com/review/searchprex.com", color: "#05704a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch", sub: "Registered", href: "https://clutch.co/profile/searchprex", color: "#8a5b08",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB", sub: "Accredited", href: "https://www.bbb.org/us/il/chicago/profile/searchprex", color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text></svg> },
  { label: "G2", sub: "Registered", href: "https://www.g2.com/sellers/searchprex", color: "#b23219",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms", sub: "Registered", href: "https://www.goodfirms.co/company/searchprex", color: "#534AB7",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed", href: "https://www.crunchbase.com/organization/searchprex", color: "#01699c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency", href: "https://www.designrush.com/agency/searchprex", color: "#b8123a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn", sub: "Company", href: "https://www.linkedin.com/company/searchprex/", color: "#0a4f96",
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
 
  // No rotation. The credential line in the hero card and the carousel below
  // used to advance on a timer; a credential that slides away before it can be
  // read communicates less than one that stays put. The carousel keeps its
  // manual prev/next controls, so nothing is unreachable — it simply no longer
  // moves on its own.
  const [credIndex, setCredIndex] = useState(0);
  const activeCred = credentials[credIndex];
 
 
  const current = personas[activePersona];
 
  return (
    <>
      {/* Ground unified to the token surfaceAlt (#eaecf3). The hero was on
          #e9ebf0 — three points from the value used by two other sections,
          which is the kind of difference that reads as a mistake, not a
          choice. The aurora above it supplies the actual variation. */}
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
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">
 
          {/* ── "I'm looking for" Toggle — Toptal style ── */}
          <div className="relative z-20 flex justify-center pt-4 pb-3">
            <div className="inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-full bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm border border-white/80 sm:gap-3 sm:px-5 sm:py-3">
              <span className="hidden text-xs font-medium text-[#566070] whitespace-nowrap sm:inline">
                I&apos;m looking for
              </span>
              {/* A real tablist. These were three bare <button>s with no
                  role, no aria-selected and no arrow-key handling, so a
                  screen reader announced three unlabelled buttons and gave no
                  indication which one was active. */}
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
            className="grid items-start gap-12 pt-6 pb-0 lg:grid-cols-2 lg:gap-12 lg:pt-6"
          >
 
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
                <span className="text-[10px] font-bold uppercase tracking-widest sm:text-xs" style={{ color: GREEN_DARK }}>
                  Founder-Led SEO · Every Number Has a Screenshot
                </span>
              </div>
 
              {/* ── H1 — the visible headline IS the h1.
                  It used to be an sr-only h1 with the real headline marked up
                  as an h2 below it. That buys nothing: it hides the strongest
                  on-page signal from Google behind a string no visitor reads,
                  and it left the largest visible text on the page outranked by
                  the section below the fold. ── */}
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
 
              {/* Primary CTA — same offer and same destination for every
                  persona, only the noun changes. Previously the law-firm
                  persona booked a Calendly call while eCommerce and Local got
                  "View Case Studies", which is a browsing action, not a
                  conversion — two of three segments had nothing to convert on
                  in the most valuable space on the site. */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  href={OFFER_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                  style={{ background: GREEN }}
                >
                  {OFFER_CTA_BY_PERSONA[current.id]} <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Secondary action — the same conversation, for people who would
                  rather talk than fill in a form. Not a competing offer. */}
              <div className="mt-4 flex justify-center lg:justify-start">
                <a
                  href={CALL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
                  style={{ color: GREEN_DARK }}
                >
                  <Calendar className="h-4 w-4" /> {CALL_CTA}
                </a>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 lg:justify-start">
                <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                <span className="text-sm" style={{ color: BODY }}>
                  {OFFER_MICROCOPY}
                </span>
              </div>

              {current.aside && (
                <div className="mt-4 flex justify-center lg:justify-start">
                  <Link
                    href={current.aside.href}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:bg-white"
                    style={{ borderColor: "#d4d8e3", color: PURPLE }}
                  >
                    {current.aside.label} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </motion.div>
 
            {/* ── Right: persona-driven — photo+card (Law Firm) OR video+clients (eCommerce/Local) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:min-h-[520px]"
            >
              <AnimatePresence mode="wait">
                {current.media === "photo" ? (
                  /* ── Law Firm: Mubashar photo + credential card (clean, no floating chips) ── */
                  <motion.div
                    key="photo-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-start lg:gap-4"
                  >
                    {/* Clean portrait — Toptal-style, proof now lives inside the card */}
                    <div className="relative z-0 shrink-0 lg:-mt-20">
                      <div className="relative aspect-[3/4] w-[270px] sm:w-[340px] lg:w-[440px]">
                        <Image
                          src="/images/mubashar-transparent.png"
                          alt="Mubashar Shahzad — Founder & Certified SEO Expert at SearchPrex"
                          fill
                          priority
                          className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
                        />
                      </div>
                    </div>
 
                    {/* Credential card — Toptal anatomy: map · name · verified · role · previously-at · proof */}
                    <div className="relative z-10 w-full max-w-[300px] shrink-0 rounded-lg border border-[#e8eaf0] bg-white p-5 shadow-xl lg:w-64 lg:-ml-12 lg:mt-2">
                      {/* Dotted world-map area (tall, like Toptal) */}
                      <div className="relative mb-4 h-24 w-full">
                        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #566070 1px, transparent 0)", backgroundSize: "6px 6px" }} />
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
                        <Briefcase className="h-3.5 w-3.5 shrink-0 text-[#566070]" />
                        <span className="text-[11px] font-medium" style={{ color: BODY }}>Founder &amp; SEO Strategist</span>
                      </a>
 
                      <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-[#566070]">Previously At</p>
                      <a
                        href="https://www.timetechnologiesllc.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-black tracking-tight text-[#1c1c24] transition-colors hover:text-[#534AB7]"
                      >
                        Time Technologies LLC
                      </a>
 
                      {/* ── Verified case-study proof (moved here from the floating chips) ── */}
                      <div className="mt-4 flex items-stretch gap-3 border-t border-[#eef0f4] pt-3">
                        <Link
                          href="/case-studies/ecommerce/michigan-outdoor-sports"
                          className="flex-1 transition-opacity hover:opacity-80"
                          title="Michigan Outdoor Sports case study"
                        >
                          <span className="block text-base font-black leading-none" style={{ color: GREEN_DARK }}>+285%</span>
                          <span className="mt-1 block text-[11px] leading-tight text-[#566070]">Pages indexed · GSC verified</span>
                        </Link>
                        <span className="w-px shrink-0 bg-[#eef0f4]" />
                        <Link
                          href="/case-studies/ecommerce/smk-store"
                          className="flex-1 transition-opacity hover:opacity-80"
                          title="SMK Store case study"
                        >
                          <span className="block text-base font-black leading-none" style={{ color: GREEN_DARK }}>+83%</span>
                          <span className="mt-1 block text-[11px] leading-tight text-[#566070]">US organic clicks · GSC</span>
                        </Link>
                      </div>
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
 
        {/* ── Credentials carousel — sits cleanly below the hero. Gentle overlap on
            desktop (photo persona); positive margin on mobile so it never crashes
            into the credential card. ── */}
        {/* Fixed offset for every persona. This used to flip between lg:-mt-12 and
            mt-0 depending on which persona was active, so switching tabs
            reflowed everything below it. */}
        <div className="relative z-10 mt-10 sm:mt-6">
          <Certifications index={credIndex} onIndexChange={setCredIndex} />
        </div>
 
        {/* ── EEAT strip — quiet row below the carousel ── */}
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">
          <p className="mb-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#566070]">
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
 