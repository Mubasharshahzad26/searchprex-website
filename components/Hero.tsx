"use client";
 
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock, Video } from "lucide-react";
import { useEffect, useState } from "react";
 
const meetingPerks = [
  { icon: Clock, text: "30-min free strategy call" },
  { icon: Video, text: "Google Meet — no download needed" },
  { icon: CheckCircle, text: "No commitment · Reply in 24hrs" },
];
 
// ── Service personas ──────────────────────────────────────────────────
const personas = [
  {
    id: "law-firm",
    label: "Law Firm SEO",
    headline: "Rank Your Firm.",
    headlineBlue: "Win More Cases.",
    sub: "We help law firms dominate local and national search results — more qualified leads, more signed clients, less wasted ad spend.",
    cta: "Get Law Firm SEO Audit",
  },
  {
    id: "ecommerce",
    label: "eCommerce SEO",
    headline: "Rank Higher.",
    headlineBlue: "Sell More. Grow Faster.",
    sub: "From product pages to category architecture — we build eCommerce SEO strategies that drive revenue, not just traffic.",
    cta: "Get eCommerce SEO Audit",
  },
  {
    id: "local",
    label: "Local SEO",
    headline: "Own Your City.",
    headlineBlue: "Get Found First.",
    sub: "Dominate Google Maps and local search in your area. We help local businesses get more calls, more visits, and more customers.",
    cta: "Get Local SEO Audit",
  },
];
 
// ── EEAT platform links ───────────────────────────────────────────────
const eeatLinks = [
  { label: "Trustpilot", sub: "Reviews",  href: "https://www.trustpilot.com/review/searchprex.com", color: "#00b67a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch",     sub: "5.0 ★",   href: "https://clutch.co/profile/searchprex",              color: "#d97706",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB",        sub: "A+ Listed",href: "https://www.bbb.org/us/il/chicago/profile/searchprex", color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text></svg> },
  { label: "G2",         sub: "Approved", href: "https://www.g2.com/sellers/searchprex",             color: "#ff492c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms",  sub: "Verified", href: "https://www.goodfirms.co/company/searchprex",       color: "#534AB7",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed",   href: "https://www.crunchbase.com/organization/searchprex", color: "#0288d1",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency",   href: "https://www.designrush.com/agency/searchprex",      color: "#e11d48",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn",   sub: "Company",  href: "https://www.linkedin.com/company/searchprex/",      color: "#0a66c2",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];
 
interface HeroProps {
  heroImage?: any;
}
 
export default function Hero({ heroImage }: HeroProps) {
  const [activePersona, setActivePersona] = useState(0);
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
 
  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/contact-searchprex/30min",
      });
    }
  };
 
  const current = personas[activePersona];
 
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <section className="relative min-h-screen overflow-hidden bg-[#eeeef5] pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
          {/* ── "I'm looking for" Toggle — centered, Toptal style ── */}
          <div className="flex justify-center pt-8 pb-2">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm border border-white/80">
              <span className="text-xs font-medium text-[#64748b] whitespace-nowrap">
                I'm looking for
              </span>
              <div className="flex items-center gap-1">
                {personas.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePersona(i)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      activePersona === i
                        ? "border-2 border-[#1a3c8f] bg-white text-[#1a3c8f] shadow-sm"
                        : "border border-transparent text-[#64748b] hover:text-[#0a0f2e]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
 
          {/* ── 2-Column Grid ── */}
          <div className="grid items-center gap-12 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
 
            {/* ── Left Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Live pill */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1a3c8f]">
                  FOUNDER-LED SEO. NO JUNIORS. NO FLUFF.
                </span>
              </div>
 
              {/* ── Dynamic H1 based on selected persona ── */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl"
                >
                  {current.headline}
                  <br />
                  <span className="text-[#1a3c8f]">{current.headlineBlue}</span>
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
                  className="mx-auto mb-7 max-w-xl text-lg text-[#64748b] lg:mx-0"
                >
                  {current.sub}
                </motion.p>
              </AnimatePresence>
 
              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0a0f2e] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
                >
                  {current.cta}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#0a0f2e]/20 bg-white/60 px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0f2e] backdrop-blur-sm transition-all hover:border-[#0a0f2e] hover:bg-white"
                >
                  View Services
                </Link>
              </div>
 
              {/* Sub-note */}
              <div className="mt-4 mb-6 flex items-center justify-center gap-1.5 lg:justify-start">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                <span className="text-sm text-[#64748b]">
                  Free 30-min call · No commitment · Reply in 24hrs
                </span>
              </div>
 
              {/* EEAT Badges */}
              <div className="rounded-xl border border-white/60 bg-white/50 px-4 py-4 backdrop-blur-sm">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                  Verified &amp; Listed On
                </p>
                <div className="flex flex-wrap gap-2">
                  {eeatLinks.map((platform) => (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`SearchPrex on ${platform.label}`}
                      className="group flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 shadow-sm transition-all hover:border-[#534AB7] hover:shadow-md"
                    >
                      <span className="flex-shrink-0 transition-transform group-hover:scale-110">
                        {platform.icon}
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold leading-none text-[#0a0f2e]">{platform.label}</p>
                        <p className="text-[10px] font-medium leading-tight" style={{ color: platform.color }}>{platform.sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
 
            {/* ── Right: Calendly Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-md rounded-2xl border border-white/80 bg-white p-8 shadow-2xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-4 py-2">
                  <Calendar className="h-4 w-4 text-[#534AB7]" />
                  <span className="text-xs font-bold text-[#534AB7]">Free 30-Min Strategy Call</span>
                </div>
                <h3 className="mb-2 text-2xl font-black text-[#0a0f2e]">Talk directly with the founder</h3>
                <p className="mb-6 text-sm text-[#64748b]">
                  No sales reps. No junior staff. Just Mubashar — your SEO strategy, built around your goals.
                </p>
                <div className="mb-6 flex flex-col gap-3">
                  {meetingPerks.map((perk) => (
                    <div key={perk.text} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEEDFE]">
                        <perk.icon className="h-4 w-4 text-[#534AB7]" />
                      </div>
                      <span className="text-sm text-[#374151]">{perk.text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={openCalendly}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#3d35a0]"
                >
                  <Calendar className="h-4 w-4" />
                  Book Free Strategy Call
                </button>
                <Link
                  href="#ai-tool"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#e5e7eb] px-6 py-3 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#0a0f2e]"
                >
                  Get Free SEO Audit Instead →
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-[#534AB7] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">{["L", "E", "M"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-[#64748b]">20+ businesses served across the US</span>
                </div>
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>
    </>
  );
}
 




