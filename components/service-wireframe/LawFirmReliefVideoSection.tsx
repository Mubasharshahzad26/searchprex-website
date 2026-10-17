"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Volume2,
  ArrowRight,
  Clock,
} from "lucide-react";

interface VideoScene {
  id: number;
  timeRange: string;
  startSec: number;
  endSec: number;
  badge: string;
  headline: string;
  subline: string;
  imageSrc: string;
  imageAlt: string;
  statLabel: string;
  statValue: string;
  accentClass: string;
}

const VIDEO_SCENES: VideoScene[] = [
  {
    id: 0,
    timeRange: "0:00 – 0:03",
    startSec: 0,
    endSec: 3,
    badge: "Scene 1 · Why We Understand Your Pain",
    headline: "Exhausted by $200+ Google Ads Clicks & Agencies That Deliver Nothing?",
    subline:
      "Managing partners come to us after burning $8,000+/month on generic SEO retainers, junior account managers, partial PDFs, and practice pages buried on page 3.",
    imageSrc: "/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp",
    imageAlt: "US law firm partner reviewing Search Console and Map Pack diagnostics",
    statLabel: "Typical US Legal PPC Click",
    statValue: "$150 – $300+ / click",
    accentClass: "bg-rose-600 text-white",
  },
  {
    id: 1,
    timeRange: "0:03 – 0:06",
    startSec: 3,
    endSec: 6,
    badge: "Scene 2 · Your Source of Relief",
    headline: "#1 Ranked Cleveland, OH Mastery & State-Specific Legal Silos",
    subline:
      "We build ABA Rule 7.1-compliant practice & suburb silos across Cleveland (OH), Sugar Land & The Woodlands (TX), Detroit (MI), Philadelphia (PA), and major US metros.",
    imageSrc: "/images/services/law-firm/usa-served-cities-cleveland-sugarland-woodlands.webp",
    imageAlt: "Cleveland Ohio, Sugar Land Texas, and The Woodlands Texas legal markets",
    statLabel: "Verified US Local Authority",
    statValue: "#1 Ranked Cleveland, OH",
    accentClass: "bg-emerald-600 text-white",
  },
  {
    id: 2,
    timeRange: "0:06 – 0:09",
    startSec: 6,
    endSec: 9,
    badge: "Scene 3 · Test Us Risk-Free for 7 Days",
    headline: "Direct Founder Execution, Weekly Monday Reports & 7-Day Free Trial",
    subline:
      "No partial reporting, no junior hand-offs, and no vanity DA/PA games. We track qualified phone calls and signed consultations every Monday.",
    imageSrc: "/images/services/law-firm/law-firm-relief-from-ppc-burnout.webp",
    imageAlt: "Relieved US managing partner reviewing upward organic case consultations",
    statLabel: "Risk-Free Onboarding",
    statValue: "7-Day Free Trial + 90-Day Guarantee",
    accentClass: "bg-sky-600 text-white",
  },
];

const CORE_PAIN_POINTS = [
  {
    title: "Paying $150–$300+ per click on Google Ads",
    detail: "Personal injury, family law, and criminal defense clicks stop the hour your ad budget pauses. Organic Map Pack & practice silos compound month after month.",
  },
  {
    title: "Practice-area pages buried below aggregator directories",
    detail: "When a single generic page tries to rank for Car Accidents, Truck Crashes, Divorce, and Custody, Google ranks Justia and Avvo above your firm.",
  },
  {
    title: "Invisible in the Google Map Pack outside 1 mile",
    detail: "Wrong primary GBP categories ('Law Firm' instead of 'Personal Injury Attorney' or 'Family Law Attorney') and missing suburb silos cost you local phone calls.",
  },
  {
    title: "Skipped by Google AI Overviews & ChatGPT Search",
    detail: "Without 45–60 word statutory Answer Capsules, attorney bar schema, and /llms.txt entity feeds, AI search cites competing firms in your county.",
  },
];

export default function LawFirmReliefVideoSection() {
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const DURATION_MS = 9000;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        if (prev + 100 >= DURATION_MS) {
          return 0; // seamless loop of the 9-second story
        }
        return prev + 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentSec = Math.min(9, Math.floor(elapsedMs / 1000));
  const sceneIndex = Math.min(2, Math.floor(elapsedMs / 3000));
  const activeScene = VIDEO_SCENES[sceneIndex];
  const progressPct = Math.min(100, (elapsedMs / DURATION_MS) * 100);

  function jumpToScene(idx: number) {
    setElapsedMs(idx * 3000);
    setIsPlaying(true);
  }

  return (
    <section
      id="relief-video"
      className="scroll-mt-20 border-b border-slate-200 bg-white py-16 sm:py-24 font-sans"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + AI Overview Answer Capsule */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Clock className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
            <span>9-Second Briefing · Why We Understand Your Pain &amp; How We Bring Relief</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            Why Managing Partners Are Exhausted — And How We Provide Immediate Relief
          </h2>

          <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed">
            Most US law firms lose organic cases to four fixable problems: $200+ PPC dependence, consolidated practice pages, wrong Google Business Profile categories, and missing AI Overview schema. Watch our 9-second briefing below to see how our founder-led system replaces agency frustration with signed retainers.
          </p>
        </div>

        {/* Main Grid: 9-Second Interactive Video Player (Left 7 cols) + Attorney Relief Card & 4 Pain Checks (Right 5 cols) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 9-Second Interactive Story Player */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-slate-900 bg-slate-950 text-white overflow-hidden shadow-xl">
            {/* Top Player Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  SearchPrex 9-Second Law Firm Relief Briefing
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                <Volume2 className="h-3.5 w-3.5" aria-hidden />
                <span>0:0{currentSec} / 0:09</span>
              </div>
            </div>

            {/* Video Viewport with Ken Burns Motion */}
            <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene.id}
                  initial={{ opacity: 0.25, scale: 1.0 }}
                  animate={{ opacity: 1, scale: 1.06 }}
                  exit={{ opacity: 0.25 }}
                  transition={{ duration: 2.9, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeScene.imageSrc}
                    alt={activeScene.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dark Cinema Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/20" />

              {/* Top-Left Scene Badge & Top-Right Metric Pill */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider shadow-md ${activeScene.accentClass}`}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  <span>{activeScene.badge}</span>
                </span>

                <div className="rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/15 px-3 py-1.5 text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {activeScene.statLabel}
                  </p>
                  <p className="text-xs font-black text-emerald-400">{activeScene.statValue}</p>
                </div>
              </div>

              {/* Bottom Caption & Story Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/15 p-4 sm:p-5">
                <p className="text-base sm:text-xl font-black text-white leading-snug">
                  {activeScene.headline}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeScene.subline}
                </p>
              </div>
            </div>

            {/* 9-Second Timeline Scrubber & Controls */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800">
              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-emerald-400 to-sky-400 transition-all duration-100"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Play/Pause/Replay */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-3.5 py-2 text-xs font-black text-slate-950 transition cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3.5 w-3.5" aria-hidden />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" aria-hidden />
                        <span>Play</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setElapsedMs(0);
                      setIsPlaying(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-bold text-slate-200 transition cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    <span>Replay 9s</span>
                  </button>
                </div>

                {/* 3 Clickable Scene Chapters */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {VIDEO_SCENES.map((sc, idx) => (
                    <button
                      type="button"
                      key={sc.id}
                      onClick={() => jumpToScene(idx)}
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                        sceneIndex === idx
                          ? "bg-white text-slate-950"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {sc.timeRange}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Attorney Relief Visual + 4 Core Pain Checks */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Compressed WebP Editorial Card */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
              <div className="relative h-44 w-full">
                <Image
                  src="/images/services/law-firm/law-firm-relief-from-ppc-burnout.webp"
                  alt="Relieved US law firm partner reviewing upward organic case consultations and Map Pack calls"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    From PPC Burnout to Predictable Retainers
                  </p>
                  <p className="text-sm font-black">
                    “We stopped renting $250 clicks and built permanent county &amp; practice authority.”
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Concise Pain Cards */}
            <div className="space-y-3">
              {CORE_PAIN_POINTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 hover:border-slate-300 transition"
                >
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <h3 className="text-sm font-black text-neutral-950">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#diagnose"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />
              <span>Diagnose My Law Firm’s Market Below</span>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
