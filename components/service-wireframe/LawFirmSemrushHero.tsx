"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  MapPin,
  Play,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const PRACTICE_PILLS = [
  "Personal Injury & Auto",
  "Family Law & High-Asset Divorce",
  "Criminal Defense & DUI/OVI",
  "Estate Planning & Probate",
  "Workers’ Compensation",
  "Immigration & Employment",
];

export default function LawFirmSemrushHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1d] text-white pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-800">
      {/* Subtle Semrush-style radial glow & grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(16, 185, 129, 0.28), transparent 45%), radial-gradient(circle at 82% 30%, rgba(56, 189, 248, 0.22), transparent 48%), radial-gradient(circle at 50% 90%, rgba(99, 102, 241, 0.18), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb + Top Authority Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <span>/</span>
            <span className="text-emerald-400 font-bold">USA Law Firm SEO</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <Award className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
            <span>#1 Ranked in Cleveland, OH · USA Legal SEO &amp; AEO Mastery</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Relief Promise, Practice Pills & CTAs */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 mb-4">
                <Scale className="h-3.5 w-3.5 text-sky-400" aria-hidden />
                <span>ABA Model Rule 7.1 Compliant · YMYL Legal Entity SEO</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.12]">
                Law Firm SEO Services in the USA{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                  Built for Signed Cases
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                We are here to provide you a source of relief — we know your pain, and we have the solution. Stop burning{" "}
                <strong className="text-white">$150–$300+ per Google Ads click</strong> or paying agencies for partial reports and meaningless DA numbers. We build practice-area silos, Google Map Pack Top 3 authority, and AI Overview citations for US attorneys.
              </p>

              {/* Practice Area Pills */}
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Engineered for High-Stakes US Legal Practice Areas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRACTICE_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 px-2.5 py-1 text-xs font-semibold text-slate-200"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" aria-hidden />
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="#7-day-trial"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <span>Start 7-Day Free Trial</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>

                <Link
                  href="#relief-video"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/80 hover:bg-slate-800 px-5 py-3.5 text-sm font-bold text-white transition"
                >
                  <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" aria-hidden />
                  <span>Watch 9-Sec Relief Video</span>
                </Link>
              </div>

              {/* Trust Strip */}
              <div className="mt-7 pt-6 border-t border-slate-800/90 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-black text-white text-sm">5+ Years</p>
                  <p className="text-slate-400">Founder Technical &amp; Local SEO Mastery</p>
                </div>
                <div>
                  <p className="font-black text-emerald-400 text-sm">7-Day Free Trial</p>
                  <p className="text-slate-400">Test Our Execution Before Retainer</p>
                </div>
                <div>
                  <p className="font-black text-sky-400 text-sm">Weekly Reports</p>
                  <p className="text-slate-400">Every Monday · Calls &amp; Consults</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Semrush-Style Visual Showcase + Floating Animated Elements */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mx-auto max-w-xl lg:max-w-none"
            >
              {/* Main Hero WebP Image Frame */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-slate-700/80 bg-slate-900 shadow-2xl">
                <Image
                  src="/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp"
                  alt="Modern USA law firm managing partner office overlooking American city skyline with SearchPrex Legal SEO, Google Map Pack Top 3, and AI Overview analytics dashboard"
                  width={1400}
                  height={788}
                  priority
                  className="w-full h-auto object-cover"
                />
                <div className=" inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-60 pointer-events-none absolute" />

                {/* Bottom Overlay Bar Inside Frame */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-4 py-3 border-t border-slate-800 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    <span>AEO + GEO + Local Map Pack Architecture</span>
                  </span>
                  <span className="text-slate-300 font-semibold">
                    Serving OH · TX · MI · PA · AZ · CA · LA · NM · KS
                  </span>
                </div>
              </div>

              {/* Floating Animated Card 1: Top-Left (#1 Cleveland OH Mastery) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:flex items-center gap-3 absolute -top-5 -left-5 z-20 rounded-2xl border border-emerald-500/40 bg-slate-950/95 backdrop-blur-md px-4 py-3 shadow-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Verified US Local Proof
                  </p>
                  <p className="text-xs font-black text-white">
                    #1 Ranked in Cleveland, OH · Map Pack &amp; AI Overviews
                  </p>
                </div>
              </motion.div>

              {/* Floating Animated Card 2: Bottom-Right (ABA Rule 7.1 & Signed Case Focus) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="hidden sm:flex items-center gap-3 absolute -bottom-6 -right-4 z-20 rounded-2xl border border-sky-500/40 bg-slate-950/95 backdrop-blur-md px-4 py-3 shadow-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                  <TrendingUp className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    Signed Retainer Focus
                  </p>
                  <p className="text-xs font-black text-white">
                    Zero Vanity DA/PA · Direct Founder Execution
                  </p>
                </div>
              </motion.div>

              {/* Floating Animated Pill 3: Mid-Right (YMYL & Bar Credentials) */}
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="hidden xl:flex items-center gap-2 absolute top-1/3 -right-6 z-20 rounded-full border border-white/20 bg-slate-900/95 px-3.5 py-2 shadow-lg"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden />
                <span className="text-xs font-bold text-white">ABA Rule 7.1 Safe</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
