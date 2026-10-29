"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Globe } from "lucide-react";

const PRACTICE_PILLS = [
  { label: "Personal Injury SEO", href: "/services/law-firm-seo/personal-injury" },
  { label: "Family Law & Divorce SEO", href: "/services/law-firm-seo/family-law" },
  { label: "Criminal Defense SEO", href: "/services/law-firm-seo/criminal-defense" },
  { label: "Estate Planning & Probate", href: "/services/law-firm-seo/estate-planning" },
  { label: "Mass Torts SEO", href: "/services/law-firm-seo/mass-torts" },
  { label: "GBP for Lawyers", href: "/services/law-firm-seo/google-business-profile-for-lawyers" },
];

export default function LawFirmSemrushHero() {
  const [daDomain, setDaDomain] = useState("");

  const handleDaCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = daDomain.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    const targetUrl = clean
      ? `https://nicheseopro.com/authority-checker?domain=${encodeURIComponent(clean)}`
      : "https://nicheseopro.com/authority-checker";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden bg-white text-neutral-950 pt-10 pb-16 md:pt-14 md:pb-22 border-b border-slate-200 font-sans">
      {/* Subtle Light Grey Ambient Dot Grid — Matches Location Pages Design */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-neutral-950 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-neutral-950 transition">
              Services
            </Link>
            <span>/</span>
            <span className="text-neutral-950 font-bold">USA Law Firm SEO</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clean Location-Style Light Hero Content */}
          <div className="lg:col-span-7 space-y-5 pt-1">
            {/* Eyebrow Badges — Clean Monochrome Like Location Pages */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-900 text-xs font-bold uppercase tracking-wider">
                <span>Law Firm SEO &middot; United States</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-900 text-xs font-semibold">
                <span>1-Firm Practice Exclusivity &middot; $1,200–$2,500/Mo</span>
              </div>
            </div>

            {/* H1 Headline: Solid Black Bold with Clean Underline Accent */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 leading-[1.14] tracking-tight">
              USA Law Firm SEO Services Built to Win the{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Google Map Pack, AI Overviews &amp; Signed Cases.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              We are here to provide you a source of relief — we know your pain, and our{" "}
              <strong className="text-neutral-950">USA law firm SEO services</strong> are built to solve it. Stop burning{" "}
              <strong className="text-neutral-950">$150–$300+ per Google Ads click</strong> or paying agencies for partial reports and meaningless DA numbers. Our founder-led{" "}
              <strong className="text-neutral-950">attorney SEO</strong> builds practice-area silos, Google Map Pack Top 3 authority, and AI Overview citations for US law firms.
            </p>

            {/* 3 Clean Metric Cards — Matching Location Pages Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-lg sm:text-xl font-black text-neutral-950 tracking-tight">#1 on Google</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  For &ldquo;Law Firm SEO Cleveland Ohio&rdquo;
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-lg sm:text-xl font-black text-neutral-950 tracking-tight">Top 3</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Google Map Pack &amp; AI Overviews
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-lg sm:text-xl font-black text-neutral-950 tracking-tight">7-Day Trial</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Zero Long-Term Lock-In
                </p>
              </div>
            </div>

            {/* CHECK DOMAIN AUTHORITY SEARCH BAR CTA -> https://nicheseopro.com/authority-checker */}
            <div className="pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-950 mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
                <span>Free Instant Check: Test Your Law Firm&apos;s Domain Authority &amp; SEO Health</span>
              </p>
              <form
                onSubmit={handleDaCheck}
                className="flex items-center justify-between gap-2 rounded-full border border-slate-300 bg-white p-1.5 pl-4 shadow-sm transition focus-within:border-neutral-950 focus-within:ring-2 focus-within:ring-neutral-950/10"
              >
                <div className="flex flex-1 items-center gap-2.5 min-w-0">
                  <Globe className="h-4 w-4 text-slate-500 shrink-0" aria-hidden />
                  <input
                    type="text"
                    value={daDomain}
                    onChange={(e) => setDaDomain(e.target.value)}
                    placeholder="yourlawfirm.com"
                    aria-label="Enter your law firm domain to check authority"
                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-neutral-950 placeholder-slate-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xs transition-all cursor-pointer"
                >
                  <span>Check Domain Authority</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </form>
            </div>

            {/* Practice Area Pills — Clickable Contextual Links with Black Bullet Points */}
            <div className="pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Specialized US Legal SEO Services We Offer:
              </p>
              <div className="flex flex-wrap gap-2">
                {PRACTICE_PILLS.map((pill) => (
                  <Link
                    key={pill.href}
                    href={pill.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 hover:border-neutral-950 hover:bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
                    <span>{pill.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href="#7-day-trial"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 px-6 py-3.5 text-sm font-bold text-white shadow-xs transition cursor-pointer"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="h-4 w-4 text-white" aria-hidden />
              </Link>

              <Link
                href="#relief-video"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 px-5 py-3.5 text-sm font-semibold text-neutral-950 transition"
              >
                <Play className="h-3.5 w-3.5 text-neutral-900 fill-neutral-900" aria-hidden />
                <span>Watch 9-Sec Relief Video</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Light-Theme Visual + Monochrome Interactive Floating Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Main Hero WebP Image Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg">
                <Image
                  src="/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp"
                  alt="Modern USA law firm managing partner office overlooking American city skyline with SearchPrex Legal SEO, Google Map Pack Top 3, and AI Overview analytics dashboard"
                  width={1400}
                  height={788}
                  priority
                  className="w-full h-auto object-cover"
                />

                {/* Bottom Bar Inside Frame — Clean Monochrome */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 border-t border-slate-200 text-xs">
                  <span className="font-bold text-neutral-950">
                    AEO + GEO + Local Map Pack Architecture
                  </span>
                  <span className="text-slate-600 font-semibold">
                    OH &middot; TX &middot; MI &middot; PA &middot; AZ &middot; CA &middot; LA &middot; NM &middot; KS
                  </span>
                </div>
              </div>

              {/* Floating Card 1: Top-Left (Corrected Ohio #1 Claim) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:flex items-center gap-3 absolute -top-5 -left-4 z-20 rounded-xl border border-slate-300 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-md"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-xs font-black text-white shrink-0">
                  #1
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Verified Google Ranking Proof
                  </p>
                  <p className="text-xs font-black text-neutral-950">
                    Ranked #1 on Google for &ldquo;law firm SEO Cleveland Ohio&rdquo;
                  </p>
                </div>
              </motion.div>

              {/* Floating Card 2: Bottom-Right (Signed Retainer Focus) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="hidden sm:flex items-center gap-3 absolute -bottom-5 -right-3 z-20 rounded-xl border border-slate-300 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-md"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-xs font-black text-white shrink-0">
                  01
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Signed Retainer Focus
                  </p>
                  <p className="text-xs font-black text-neutral-950">
                    Zero Vanity DA/PA &middot; Direct Founder Execution
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

