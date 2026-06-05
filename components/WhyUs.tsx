
"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
const rows = [
  {
    criteria: "Who does the work",
    us: "The founder — senior, every time",
    agency: "Junior account managers",
    diy: "You, learning as you go",
  },
  {
    criteria: "Specialization",
    us: "Niche specialist — law, ecommerce & local",
    agency: "Generalist, any industry",
    diy: "General knowledge",
  },
  {
    criteria: "Contracts",
    us: "Monthly — cancel anytime",
    agency: "6–12 month lock-in",
    diy: "—",
  },
  {
    criteria: "Communication",
    us: "Direct with the founder",
    agency: "Layers of account managers",
    diy: "—",
  },
  {
    criteria: "Reporting",
    us: "Live GSC / GA4 dashboard — money metrics",
    agency: "Vanity ranking PDFs",
    diy: "Manual guesswork",
  },
  {
    criteria: "Pricing",
    us: "Custom — audit-first",
    agency: "Fixed cookie-cutter packages",
    diy: "Tool & time cost",
  },
  {
    criteria: "What we optimize for",
    us: "Revenue — leads, calls & sales",
    agency: "Rankings & traffic",
    diy: "Trial and error",
  },
];
 
export default function WhyUs() {
  return (
    <section className="bg-[#eaecf3] py-24" id="why-us">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" style={{ color: GREEN }} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0a0f2e]">Why SearchPrex</span>
          </div>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            The difference is <span style={{ color: GREEN }}>who does the work</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#475569]">
            Most agencies sell you a senior pitch, then hand your account to a junior. Here&apos;s how a founder-led approach actually compares.
          </p>
        </motion.div>
 
        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[680px] overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_20px_50px_-20px_rgba(10,15,46,0.15)]">
 
            {/* Header row */}
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr]">
              <div className="px-6 py-5" />
              <div className="relative px-6 py-5 text-center" style={{ background: "#0a0f2e" }}>
                <span className="absolute -top-0 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white sm:block" style={{ background: GREEN }}>
                  Recommended
                </span>
                <p className="text-base font-black text-white">SearchPrex</p>
                <p className="mt-0.5 text-[11px] text-white/60">Founder-led</p>
              </div>
              <div className="px-6 py-5 text-center">
                <p className="text-base font-black text-[#0a0f2e]">Typical Agency</p>
                <p className="mt-0.5 text-[11px] text-[#94a3b8]">Generalist</p>
              </div>
              <div className="px-6 py-5 text-center">
                <p className="text-base font-black text-[#0a0f2e]">DIY / In-house</p>
                <p className="mt-0.5 text-[11px] text-[#94a3b8]">On your own</p>
              </div>
            </div>
 
            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.criteria}
                className={`grid grid-cols-[1.3fr_1fr_1fr_1fr] border-t border-[#f1f5f9] ${i % 2 === 1 ? "bg-[#fbfcfe]" : "bg-white"}`}
              >
                <div className="flex items-center px-6 py-4 text-sm font-bold text-[#0a0f2e]">
                  {row.criteria}
                </div>
 
                {/* SearchPrex — highlighted column */}
                <div className="flex items-start gap-2 px-6 py-4" style={{ background: "rgba(62,180,137,0.07)" }}>
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN_DARK }} />
                  <span className="text-sm font-semibold text-[#0a0f2e]">{row.us}</span>
                </div>
 
                {/* Typical Agency */}
                <div className="flex items-start gap-2 px-6 py-4">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#cbd5e1]" />
                  <span className="text-sm text-[#64748b]">{row.agency}</span>
                </div>
 
                {/* DIY */}
                <div className="flex items-start gap-2 px-6 py-4">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#cbd5e1]" />
                  <span className="text-sm text-[#64748b]">{row.diy}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
 
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/free-audit"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
            style={{ background: GREEN }}
          >
            See the difference — free audit <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
            style={{ color: GREEN_DARK }}
          >
            Or see real results <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
 
      </div>
    </section>
  );
}
 