"use client";
 
// components/AIVisibilityShowcase.tsx
// Premium "AI search visibility (AEO)" credibility section.
// Original dashboard mockup (gauge + metrics + engine distribution) inspired by
// common AEO-dashboard patterns — NOT a clone of any product. Numbers are an
// illustrative preview; the real tool lives at /ai-visibility.
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check, Search } from "lucide-react";
import CountUp from "@/components/CountUp";
 
const GREEN = "#3eb489";
 
const engines = [
  { name: "ChatGPT", pct: 68, color: "#10a37f" },
  { name: "Google AI Overviews", pct: 54, color: "#4285F4" },
  { name: "Perplexity", pct: 41, color: "#20808d" },
  { name: "Gemini", pct: 33, color: "#8e7bff" },
];
 
const points = [
  "Track every mention across ChatGPT, Gemini, Perplexity & Google AI Overviews",
  "Find the prompts where competitors get cited — and you don't",
  "Fix the content & entity signals that make AI trust and recommend you",
];
 
function Gauge({ value }: { value: number }) {
  return (
    <div className="relative h-[110px] w-[200px]">
      <svg viewBox="0 0 200 110" className="h-full w-full">
        <defs>
          <linearGradient id="aivGauge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#534AB7" />
            <stop offset="100%" stopColor="#3eb489" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#eef0f4" strokeWidth="14" strokeLinecap="round" />
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#aivGauge)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-1 text-center">
        <span className="text-3xl font-black text-[#0a0f2e]">{value}</span>
        <span className="text-sm font-bold text-[#94a3b8]">/100</span>
      </div>
    </div>
  );
}
 
function Metric({ label, to, delta }: { label: string; to: number; delta: string }) {
  return (
    <div className="rounded-xl border border-[#eef0f4] bg-[#fafbff] p-3">
      <p className="text-[11px] font-semibold text-[#64748b]">{label}</p>
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="text-xl font-black text-[#0a0f2e]"><CountUp to={to} /></span>
        <span className="text-[11px] font-bold text-[#1D9E75]">{delta}</span>
      </div>
    </div>
  );
}
 
export default function AIVisibilityShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-[#534AB7] opacity-20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#3eb489] opacity-10 blur-[120px]" />
      </div>
 
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
            <Sparkles className="h-3.5 w-3.5" /> AEO · AI Search Visibility
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your customers are asking AI.<br />
            <span className="bg-gradient-to-r from-[#7F77DD] to-[#3eb489] bg-clip-text text-transparent">Are you the answer?</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            AI Overviews now appear across nearly half of all industries — and a growing share of buyers act
            on what the AI tells them. If ChatGPT, Gemini &amp; Google&apos;s AI don&apos;t mention you, you&apos;re invisible to them.
          </p>
        </motion.div>
 
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-black leading-snug text-white">
              We don&apos;t just rank you on Google. We make sure the AI replacing it recommends you.
            </h3>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(62,180,137,0.2)" }}>
                    <Check className="h-3 w-3" style={{ color: GREEN }} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/ai-visibility" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#0a0f2e] transition-transform hover:-translate-y-0.5">
                Check your AI visibility — free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services/law-firm-seo" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 transition-colors hover:text-white">
                How AEO works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
 
          {/* Right dashboard mockup */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:p-6">
              {/* query bar */}
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#f8f9fc] px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-[#94a3b8]" />
                <span className="truncate text-xs font-medium text-[#475569]">&ldquo;best personal injury lawyer in Chicago&rdquo;</span>
                <span className="ml-auto shrink-0 rounded-full bg-[#EEEDFE] px-2 py-0.5 text-[10px] font-bold text-[#534AB7]">4 AI engines</span>
              </div>
 
              <div className="grid gap-4 sm:grid-cols-2">
                {/* gauge */}
                <div className="flex flex-col items-center justify-center rounded-xl border border-[#eef0f4] bg-[#fafbff] p-4">
                  <Gauge value={72} />
                  <p className="mt-1 text-xs font-bold text-[#0a0f2e]">AI Visibility Score</p>
                  <p className="text-[11px] text-[#64748b]">Strong — and climbing</p>
                </div>
 
                {/* metric tiles */}
                <div className="grid grid-cols-1 gap-2.5">
                  <Metric label="AI Mentions" to={1240} delta="+12%" />
                  <Metric label="Citations" to={312} delta="+8%" />
                  <Metric label="Cited Pages" to={47} delta="+5%" />
                </div>
              </div>
 
              {/* distribution */}
              <div className="mt-5">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">Where you&apos;re cited, by engine</p>
                <div className="space-y-2.5">
                  {engines.map((e, i) => (
                    <div key={e.name} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 text-xs font-semibold text-[#374151] sm:w-36">{e.name}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef0f4]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${e.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: e.color }}
                        />
                      </div>
                      <span className="w-9 shrink-0 text-right text-xs font-bold text-[#0a0f2e]">{e.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
 
              <p className="mt-4 text-center text-[10px] text-[#94a3b8]">
                Illustrative preview — your real dashboard reflects your own brand &amp; queries.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}