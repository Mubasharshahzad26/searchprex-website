"use client";
 
// components/SolutionsCarousel.tsx
// Semrush "GET SEEN. GET CITED." inspired (NOT a clone) solutions carousel that
// showcases SearchPrex's free tools as solutions. Header + prev/next arrows,
// horizontal snap-scroll, light gradient cards with diagonal texture and a mini
// dashboard mockup per tool. Mobile-swipeable. Arrows auto-disable at the ends.
 
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Search, Sparkles } from "lucide-react";
 
type Mockup = "visibility" | "search" | "revenue" | "intake" | "content" | "keyword";
 
type Solution = {
  category: string;
  title: string;
  desc: string;
  href: string;
  mockup: Mockup;
};
 
const SOLUTIONS: Solution[] = [
  {
    category: "AI Visibility · AEO",
    title: "Grow your AI visibility",
    desc: "See if ChatGPT, Perplexity & Google AI Overviews recommend you — and exactly how to get cited.",
    href: "/ai-visibility",
    mockup: "visibility",
  },
  {
    category: "AI Search",
    title: "Instant answers to any SEO question",
    desc: "Plain-English AI answers to any SEO or AI-search question in seconds.",
    href: "/ai-search",
    mockup: "search",
  },
  {
    category: "Calculator",
    title: "See the revenue you're leaking",
    desc: "Quantify exactly how much revenue you lose from SEO and intake gaps every month.",
    href: "/case-calculator",
    mockup: "revenue",
  },
  {
    category: "AI Intake · New",
    title: "Capture & qualify every lead",
    desc: "A 24/7 assistant that captures and qualifies every lead in seconds — so you never miss a case.",
    href: "/intake-assistant",
    mockup: "intake",
  },
  {
    category: "Content Suite",
    title: "People-first content at scale",
    desc: "Generate E-E-A-T-aligned, people-first content across thousands of pages.",
    href: "/content-generator",
    mockup: "content",
  },
  {
    category: "Keyword Magic",
    title: "Real keyword data, live",
    desc: "Real keyword volume and difficulty pulled from live data — not stale estimates.",
    href: "/tools/keyword-research",
    mockup: "keyword",
  },
];
 
/* ---------- mini dashboard mockups ---------- */
 
function MockVisibility() {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="mb-2 flex flex-wrap gap-2 text-[9px] font-semibold text-slate-600">
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />AI visibility</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" />ChatGPT</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" />AI mode</span>
      </div>
      <svg viewBox="0 0 200 70" className="h-20 w-full" aria-hidden="true">
        <line x1="0" y1="60" x2="200" y2="60" stroke="#e2e8f0" />
        <polyline points="5,55 50,50 100,40 150,25 195,12" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
        <polyline points="5,58 50,54 100,48 150,38 195,28" fill="none" stroke="#3eb489" strokeWidth="2" strokeLinecap="round" />
        <polyline points="5,60 50,57 100,52 150,46 195,38" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
 
function MockSearch() {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1.5">
        <Search className="h-3 w-3 text-slate-400" />
        <span className="text-[9px] text-slate-500">Ask any SEO question…</span>
      </div>
      <div className="mt-2 space-y-1.5">
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-5/6 rounded bg-slate-200" />
        <div className="h-1.5 w-4/6 rounded bg-neutral-900/30" />
      </div>
    </div>
  );
}
 
function MockRevenue() {
  const bars = [40, 55, 48, 70, 62, 82];
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">Revenue leaked / mo</div>
      <div className="text-2xl font-black text-neutral-950">$48,200</div>
      <div className="mt-2 flex h-10 items-end gap-1">
        {bars.map((h, i) => (
          <span key={i} className="flex-1 rounded-t bg-neutral-900" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
 
function MockIntake() {
  return (
    <div className="space-y-2 rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="flex justify-start">
        <div className="rounded-lg rounded-tl-none bg-slate-100 px-2 py-1 text-[9px] text-slate-700">Hi! What do you need help with?</div>
      </div>
      <div className="flex justify-end">
        <div className="rounded-lg rounded-tr-none bg-neutral-900 px-2 py-1 text-[9px] text-white">Car accident case</div>
      </div>
      <div className="flex justify-start">
        <div className="rounded-lg rounded-tl-none bg-slate-100 px-2 py-1 text-[9px] text-slate-700">Got it — let&apos;s grab your details.</div>
      </div>
    </div>
  );
}
 
function MockContent() {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="space-y-1.5">
        <div className="h-2 w-1/2 rounded bg-neutral-900" />
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="h-1.5 w-4/5 rounded bg-slate-200" />
      </div>
      <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2 py-1 text-[9px] font-bold text-white">
        <Sparkles className="h-2.5 w-2.5" /> Generate
      </div>
    </div>
  );
}
 
function MockKeyword() {
  const rows: [string, number][] = [["seo agency", 90], ["law firm seo", 70], ["local seo", 55]];
  return (
    <div className="space-y-2 rounded-lg bg-white p-3 shadow-sm ring-1 ring-black/5">
      {rows.map(([kw, v]) => (
        <div key={kw} className="flex items-center gap-2">
          <span className="w-16 truncate text-[9px] text-slate-700">{kw}</span>
          <div className="h-1.5 flex-1 rounded bg-slate-100">
            <div className="h-full rounded bg-neutral-900" style={{ width: `${v}%` }} />
          </div>
          <span className="text-[9px] font-semibold text-slate-600">{v}K</span>
        </div>
      ))}
    </div>
  );
}
 
function Mock({ type }: { type: Mockup }) {
  if (type === "visibility") return <MockVisibility />;
  if (type === "search") return <MockSearch />;
  if (type === "revenue") return <MockRevenue />;
  if (type === "intake") return <MockIntake />;
  if (type === "content") return <MockContent />;
  return <MockKeyword />;
}
 
/* ----------------------------- carousel ----------------------------- */
 
export default function SolutionsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
 
  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };
 
  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);
 
  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 380);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
 
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-y border-slate-200" id="solutions">
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="flex items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-600">
              Solutions · {SOLUTIONS.length} free tools
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              Free tools.{" "}
              <span className="text-neutral-900">
                Unfair advantage.
              </span>
            </h2>
          </motion.div>
 
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              onClick={() => scroll(-1)}
              disabled={!canLeft}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-neutral-950 transition-all hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canRight}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-neutral-950 transition-all hover:border-neutral-900 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
 
        {/* track */}
        <div ref={trackRef} className="sp-sol-track mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:w-[340px]"
            >
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">{s.category}</span>
                  <Link
                    href={s.href}
                    aria-label={`Open ${s.title}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Link>
                </div>
 
                <h3 className="mt-3 text-lg font-black leading-snug text-neutral-950">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.desc}</p>
 
                <div className="mt-4">
                  <Mock type={s.mockup} />
                </div>
 
                <Link
                  href={s.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-neutral-950 transition-all group-hover:gap-2"
                >
                  Try it free <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
 
      <style>{`
        .sp-sol-track { scrollbar-width: none; -ms-overflow-style: none; }
        .sp-sol-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
 