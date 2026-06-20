"use client";
 
// components/NicheSEOProPromo.tsx
// Semrush-style SaaS advertisement for NicheSEOPro. Dark gradient + baked-in
// aurora, feature checklist, 7-day free-trial CTA -> nichesepro.com, and an
// animated product dashboard mockup. Self-animated.
 
import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight, FileText, Search, Gauge, Bot } from "lucide-react";
 
const NICHESEOPRO_URL = "https://nichesepro.com";
 
const FEATURES = [
  { icon: FileText, text: "People-first AI content at scale" },
  { icon: Search, text: "Live keyword research & difficulty" },
  { icon: Gauge, text: "Bulk on-page audits & fixes" },
  { icon: Bot, text: "AI-visibility tracking (ChatGPT, Gemini)" },
];
 
export default function NicheSEOProPromo() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] py-20 sm:py-28">
      {/* baked-in aurora */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="np-blob np-blob-1" />
        <span className="np-blob np-blob-2" />
      </div>
 
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* ── left: copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#8b86e0]">
            <Sparkles className="h-3.5 w-3.5" /> AI SEO Platform
          </div>
 
          <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Run your whole SEO workflow on{" "}
            <span className="bg-gradient-to-r from-[#7F77DD] to-[#3eb489] bg-clip-text text-transparent">
              NicheSEOPro.
            </span>
          </h2>
 
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
            The same AI suite we use to rank our own clients — content generation,
            keyword research, audits and AI-visibility tracking, all in one place.
          </p>
 
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <li key={f.text} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3eb489]/15">
                    <Check className="h-3 w-3 text-[#3eb489]" />
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-300">
                    <Icon className="h-3.5 w-3.5 text-slate-500" />
                    {f.text}
                  </span>
                </li>
              );
            })}
          </ul>
 
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={NICHESEOPRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#534AB7] to-[#3eb489] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start your 7-day free trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-xs text-slate-400">No credit card required</span>
          </div>
        </motion.div>
 
        {/* ── right: product mockup ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1538] shadow-2xl">
            {/* faux app top bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-slate-400">nichesepro.com</span>
            </div>
 
            {/* body */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Content Generator</span>
                <span className="rounded-md bg-[#534AB7]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8b86e0]">
                  AI
                </span>
              </div>
 
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/5">
                  <div className="text-2xl font-black text-white">1,240</div>
                  <div className="text-[11px] text-slate-400">Pages generated</div>
                </div>
                <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/5">
                  <div className="text-2xl font-black text-[#3eb489]">+476%</div>
                  <div className="text-[11px] text-slate-400">Organic clicks</div>
                </div>
              </div>
 
              <div className="mt-4 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/5">
                <div className="np-chart">
                  {[40, 55, 48, 70, 62, 82, 90].map((hgt, i) => (
                    <span key={i} className="np-cbar" style={{ height: `${hgt}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
 
              <div className="np-glow mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#534AB7] to-[#3eb489] py-2.5 text-sm font-bold text-white">
                <Sparkles className="h-4 w-4" /> Generate 50 pages
              </div>
            </div>
          </div>
        </motion.div>
      </div>
 
      <style>{`
        .np-blob { position: absolute; border-radius: 9999px; filter: blur(90px); will-change: transform; }
        .np-blob-1 { width: 45%; height: 60%; left: -12%; top: -20%; background: #534AB7; opacity: 0.28; animation: np-d1 21s ease-in-out infinite alternate; }
        .np-blob-2 { width: 42%; height: 55%; right: -10%; bottom: -22%; background: #3eb489; opacity: 0.20; animation: np-d2 25s ease-in-out infinite alternate; }
        @keyframes np-d1 { from { transform: translate(0,0) scale(1); } to { transform: translate(14%,10%) scale(1.18); } }
        @keyframes np-d2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-12%,-8%) scale(1.15); } }
        .np-chart { display: flex; align-items: flex-end; gap: 5px; height: 70px; }
        .np-cbar { flex: 1; border-radius: 4px 4px 2px 2px; background: linear-gradient(to top, #534AB7, #3eb489); animation: np-bar 1.8s ease-in-out infinite; }
        @keyframes np-bar { 0%, 100% { opacity: 0.65; } 50% { opacity: 1; } }
        .np-glow { animation: np-pulse 2.4s ease-in-out infinite; }
        @keyframes np-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(83,74,183,0); } 50% { box-shadow: 0 0 26px 2px rgba(83,74,183,0.38); } }
        @media (prefers-reduced-motion: reduce) { .np-blob, .np-cbar, .np-glow { animation: none; } }
      `}</style>
    </section>
  );
}