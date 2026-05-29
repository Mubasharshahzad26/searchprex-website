"use client";
 
import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { X, Check, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
 
const ppcTrap = [
  { title: "Surging Bid Auctions", text: "Every year competitive keywords cost more. You pay more to capture fewer calls, crushing already-thin margins in a race you can never win." },
  { title: "Zero Value Accumulation", text: "The moment your card declines, your visibility evaporates. You've built nothing — no compounding asset, no residual traffic, no equity." },
  { title: "Platform Dependency", text: "Google and Meta hold your audience hostage. One algorithm shift or policy change away from zero — you never truly own your traffic." },
];
 
const seoBuild = [
  { title: "Zero-Cost Organic Traffic", text: "Your schema files and authority signals reside permanently in search engines — generating qualified visits for free, month after month." },
  { title: "Compounding Equity Value", text: "Every link built and canonical node mapped adds permanent equity to your domain — increasing resale value and pipeline simultaneously." },
  { title: "Principal Founder Delivery", text: "No junior handoffs. Every code rewrite, canonical rule, and schema is mapped personally by Mubashar. Daily Slack updates." },
];
 
export default function Comparison() {
  const { data } = usePersona();
 
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#534AB7]">
            Exposure Rental vs Brand Equity
          </span>
          <h2 className="text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            Paying rent <span className="text-[#94a3b8]">vs</span> <span className="text-[#534AB7]">building equity.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#64748b]">
            When you buy ads, you rent visibility from a tech giant. Stop paying and it vanishes. Organic search is an asset you own permanently.
          </p>
        </div>
 
        <div className="grid gap-6 lg:grid-cols-2">
          {/* PPC Trap */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-[#fecaca] bg-[#fef2f2]/40 p-8"
          >
            <h3 className="mb-6 flex items-center gap-2 border-b border-[#fecaca] pb-3 text-base font-black uppercase tracking-wider text-[#dc2626]">
              <X className="h-5 w-5" /> The Paid Traffic Trap
            </h3>
            <div className="space-y-6">
              {ppcTrap.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
                  <div>
                    <div className="mb-1 text-sm font-bold text-[#0a0f2e]">{item.title}</div>
                    <p className="text-xs leading-relaxed text-[#64748b]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-3 text-[11px] font-bold text-[#b91c1c]">
              🚩 PPC Reality: High overheads, volatile returns, zero equity built.
            </div>
          </motion.div>
 
          {/* SEO Build */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="rounded-3xl border-2 border-[#534AB7]/20 bg-[#f5f3ff]/40 p-8"
          >
            <h3 className="mb-6 flex items-center gap-2 border-b border-[#534AB7]/20 pb-3 text-base font-black uppercase tracking-wider text-[#534AB7]">
              <Check className="h-5 w-5" /> SearchPrex Organic Build
            </h3>
            <div className="space-y-6">
              {seoBuild.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-[#534AB7]" />
                  <div>
                    <div className="mb-1 text-sm font-bold text-[#0a0f2e]">{item.title}</div>
                    <p className="text-xs leading-relaxed text-[#64748b]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[#534AB7]/20 bg-[#f5f3ff] p-3 text-[11px] font-bold text-[#534AB7]">
              🚀 SEO Outcome: Solid margins, self-sustaining pipeline, assets owned outright.
            </div>
          </motion.div>
        </div>
 
        {/* Persona-aware proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:flex-row"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">{data.emoji}</div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                Real {data.label} Result
              </span>
              <p className="text-sm font-bold text-[#0a0f2e]">
                {data.caseStudy.client} — <span className="text-[#534AB7]">{data.caseStudy.big}</span> {data.caseStudy.bigLabel.toLowerCase()}
              </p>
            </div>
          </div>
          <a
            href="#results"
            className="group flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] transition hover:text-[#3C3489]"
          >
            See Full Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
 