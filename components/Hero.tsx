"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Star, Shield, Award, Calendar, Clock, Video } from "lucide-react";
import { useEffect } from "react";
 
const trustBadges = [
  { icon: Shield, text: "Google Partner" },
  { icon: Star, text: "5-Star Reviews" },
  { icon: Award, text: "Top SEO Agency 2026" },
];
 
const meetingPerks = [
  { icon: Clock, text: "30-min free strategy call" },
  { icon: Video, text: "Google Meet — no download needed" },
  { icon: CheckCircle, text: "No commitment · Reply in 24hrs" },
];
 
// ── All 9 EEAT platform links ─────────────────────────────────────────
const eeatLinks = [
  {
    label: "Trustpilot",
    sub: "Reviews",
    href: "https://www.trustpilot.com/review/searchprex.com",
    color: "#00b67a",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot">
        <path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/>
      </svg>
    ),
  },
  {
    label: "Clutch",
    sub: "5.0 ★",
    href: "https://clutch.co/profile/searchprex",
    color: "#d97706",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch">
        <path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/>
      </svg>
    ),
  },
  {
    label: "BBB",
    sub: "A+ Listed",
    href: "https://www.bbb.org/us/il/chicago/profile/searchprex",
    color: "#1d4ed8",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB">
        <circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/>
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text>
      </svg>
    ),
  },
  {
    label: "G2",
    sub: "Approved",
    href: "https://www.g2.com/sellers/searchprex",
    color: "#ff492c",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2">
        <circle cx="12" cy="12" r="10" fill="#ff492c"/>
        <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text>
      </svg>
    ),
  },
  {
    label: "GoodFirms",
    sub: "Verified",
    href: "https://www.goodfirms.co/company/searchprex",
    color: "#534AB7",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/>
      </svg>
    ),
  },
  {
    label: "Crunchbase",
    sub: "Listed",
    href: "https://www.crunchbase.com/organization/searchprex",
    color: "#0288d1",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase">
        <path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/>
        <circle cx="12.5" cy="12.5" r="4" fill="#fff"/>
      </svg>
    ),
  },
  {
    label: "DesignRush",
    sub: "Agency",
    href: "https://www.designrush.com/agency/searchprex",
    color: "#e11d48",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/>
        <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text>
      </svg>
    ),
  },
  {
    label: "Alignable",
    sub: "Network",
    href: "https://www.alignable.com/chicago-il/searchprex",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#f59e0b" aria-label="Alignable">
        <path d="M12 2L2 19h20L12 2zm0 3.5L19.5 17h-15L12 5.5z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    sub: "Company",
    href: "https://www.linkedin.com/company/searchprex/",
    color: "#0a66c2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2" aria-label="LinkedIn">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];
 
interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
  heroImage?: any;
}
 
export default function Hero({
  headline = "Dominate Search.",
  subheadline = "I've spent 5+ years fixing what big agencies break — bloated strategies, junior handoffs, and zero accountability. At SearchPrex, I work directly on your SEO. No account managers. No templates. Just founder-led strategy built for law firms, local businesses, and ecommerce stores ready to grow.",
  ctaText = "Get Free SEO Audit",
  stat1Number = "285%",
  stat1Label = "Indexed Pages Growth",
  stat2Number = "+75%",
  stat2Label = "Revenue Increased",
  stat3Number = "5+",
  stat3Label = "Years Experience",
  heroImage,
}: HeroProps) {
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
 
  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/contact-searchprex/30min",
      });
    }
  };
 
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <section className="relative min-h-screen overflow-hidden bg-white pt-20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
 
            {/* ── Left Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Live pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#f7f8fc] px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1a3c8f]">
                  FOUNDER-LED SEO. NO JUNIORS. NO FLUFF.
                </span>
              </div>
 
              {/* H1 */}
              <h1 className="mb-6 text-5xl font-black leading-[1.0] tracking-tight text-[#0a0f2e] sm:text-6xl lg:text-7xl">
                <span className="text-balance">{headline}</span>
                <br />
                <span className="text-[#1a3c8f]">Grow Revenue.</span>
              </h1>
 
              <p className="mx-auto mb-6 max-w-xl text-lg text-[#64748b] lg:mx-0 lg:text-xl">
                {subheadline}
              </p>
 
              {/* Trust Badges row */}
              <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                {trustBadges.map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5">
                    <badge.icon className="h-4 w-4 text-[#1a3c8f]" />
                    <span className="text-xs font-medium text-[#374151]">{badge.text}</span>
                  </div>
                ))}
              </div>
 
              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0a0f2e] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
                >
                  {ctaText}
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#e5e7eb] bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0f2e] transition-all hover:border-[#0a0f2e]"
                >
                  View Services
                </Link>
              </div>
 
              {/* Sub-text */}
              <div className="mt-4 mb-5 flex items-center justify-center gap-1.5 lg:justify-start">
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                <span className="text-sm text-[#64748b]">
                  Free 30-min call · No commitment · Reply in 24hrs
                </span>
              </div>
 
              {/* ── EEAT: VERIFIED BY — 9 Clickable Platform Badges ── */}
              <div className="mb-8 rounded-xl border border-[#e5e7eb] bg-[#f8f9fc] px-4 py-4">
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
                        <p className="text-[11px] font-semibold leading-none text-[#0a0f2e]">
                          {platform.label}
                        </p>
                        <p
                          className="text-[10px] font-medium leading-tight"
                          style={{ color: platform.color }}
                        >
                          {platform.sub}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
 
              {/* Quick Stats */}
              <div className="mt-2 grid grid-cols-3 gap-4 border-t border-[#e5e7eb] pt-8">
                <div>
                  <p className="text-2xl font-black text-[#0a0f2e] sm:text-3xl">{stat1Number}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{stat1Label}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0a0f2e] sm:text-3xl">{stat2Number}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{stat2Label}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0a0f2e] sm:text-3xl">{stat3Number}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{stat3Label}</p>
                </div>
              </div>
            </motion.div>
 
            {/* ── Right Content - Calendly Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-2xl">
 
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-4 py-2">
                  <Calendar className="h-4 w-4 text-[#534AB7]" />
                  <span className="text-xs font-bold text-[#534AB7]">Free 30-Min Strategy Call</span>
                </div>
 
                <h3 className="mb-2 text-2xl font-black text-[#0a0f2e]">
                  Talk directly with the founder
                </h3>
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
 



