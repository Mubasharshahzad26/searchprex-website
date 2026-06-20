"use client";
 
// components/AdvantageBand.tsx
// Semrush "Bigger scale. Bigger advantage." inspired (NOT a clone) dark
// "why us" section for SearchPrex. Baked-in animated aurora gradient +
// animated equalizer bars + differentiators + CTA. Self-animated.
 
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, LineChart, Bot, ArrowRight } from "lucide-react";
 
const POINTS = [
  {
    icon: ShieldCheck,
    title: "Founder-led, never handed off",
    desc: "You work directly with the strategist who builds your plan — no junior teams, no account-manager telephone game.",
  },
  {
    icon: LineChart,
    title: "Verified Search Console results",
    desc: "Real GSC wins like +476% organic clicks and top-3 map-pack rankings — proof, not vanity dashboards.",
  },
  {
    icon: Bot,
    title: "Built for the AI-search era",
    desc: "We engineer your site to get cited by AI Overviews, ChatGPT, Gemini & Perplexity — not just rank blue links.",
  },
];
 
const BAR_COUNT = 16;
 
export default function AdvantageBand() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] py-20 sm:py-28">
      {/* baked-in aurora — guaranteed to show on this dark bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="ab-blob ab-blob-1" />
        <span className="ab-blob ab-blob-2" />
      </div>
 
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* ── left: copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8b86e0]">
            Why SearchPrex
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Bigger results.{" "}
            <span className="bg-gradient-to-r from-[#7F77DD] to-[#3eb489] bg-clip-text text-transparent">
              Without the big-agency overhead.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
            Most agencies hand you to a junior team and a dashboard full of vanity
            metrics. We do the opposite — senior, accountable, and obsessed with the
            numbers that actually grow your business.
          </p>
 
          <div className="mt-9 space-y-6">
            {POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-[#3eb489]" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
 
          <Link
            href="/free-audit"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0a0f2e] transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#534AB7]/30"
          >
            See how we&apos;d grow your site
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
 
        {/* ── right: animated equalizer ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
            <div className="ab-eq">
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <span
                  key={i}
                  className="ab-bar"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    animationDuration: `${1.2 + (i % 3) * 0.3}s`,
                  }}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Search demand we help you capture
              </span>
              <span className="text-sm font-bold text-[#3eb489]">▲ Growing</span>
            </div>
          </div>
        </motion.div>
      </div>
 
      <style>{`
        .ab-blob { position: absolute; border-radius: 9999px; filter: blur(90px); will-change: transform; }
        .ab-blob-1 { width: 45%; height: 60%; left: -10%; top: -20%; background: #534AB7; opacity: 0.30; animation: ab-drift-1 20s ease-in-out infinite alternate; }
        .ab-blob-2 { width: 40%; height: 55%; right: -8%; bottom: -25%; background: #3eb489; opacity: 0.22; animation: ab-drift-2 24s ease-in-out infinite alternate; }
        @keyframes ab-drift-1 { from { transform: translate(0,0) scale(1); } to { transform: translate(14%,10%) scale(1.18); } }
        @keyframes ab-drift-2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-12%,-9%) scale(1.15); } }
 
        .ab-eq { display: flex; align-items: flex-end; justify-content: space-between; gap: 6px; height: 220px; }
        .ab-bar {
          flex: 1;
          min-width: 6px;
          border-radius: 6px 6px 2px 2px;
          background: linear-gradient(to top, #534AB7 0%, #6d63d6 55%, #3eb489 100%);
          animation-name: ab-eq-bounce;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          height: 30%;
        }
        @keyframes ab-eq-bounce {
          0%, 100% { height: 22%; }
          50%      { height: 92%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-blob { animation: none; }
          .ab-bar { animation: none; height: 55%; }
        }
      `}</style>
    </section>
  );
}
 