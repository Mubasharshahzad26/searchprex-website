"use client";
 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, Zap, ArrowRight } from "lucide-react";
 
const ANXIETIES = [
  {
    emoji: "👥",
    badge: "Founder-Led Assurance",
    worry: "My account will be handed to a junior intern overseas.",
    context: "You sign a premium contract with a charismatic director, then never hear from them again. Your rankings get handed to interns who've never pushed a line of schema.",
    remedyTitle: "1-on-1 Founder Commitment",
    remedyText: "You work exclusively with Mubashar Shahzad. Your GSC tracking, schema configuration, and content pipelines are hand-executed by a certified senior practitioner. No junior handoffs. Ever.",
  },
  {
    emoji: "🤖",
    badge: "Quality Protection",
    worry: "They'll dump AI-generated articles and get us penalized.",
    context: "Cheap agencies flood your subdomain with automated content. The short-term climb vanishes on the next core update — taking your reputation with it.",
    remedyTitle: "Entity-Aware Authentic Content",
    remedyText: "We construct content aligned with Google's exact E-E-A-T guidelines. Physical coordinates, registered details, and product specs embedded into canonical nodes — real, verified, permanent.",
  },
  {
    emoji: "🔒",
    badge: "Total Brand Freedom",
    worry: "I'll be locked into a 12-month contract I can't escape.",
    context: "Corporate agencies trap you in rigid retainer minimums. Performance drops in month three — you keep paying thousands with no escape route.",
    remedyTitle: "Zero Contract Bloat. Cancel Anytime.",
    remedyText: "If we don't deliver visible indexing growth and ranking progress within your first 30 days, leave immediately — no penalty terms, no questions asked.",
  },
  {
    emoji: "📊",
    badge: "Outcome Accuracy",
    worry: "I'll get 50-page reports on impressions, not actual sales.",
    context: "Agencies hide quiet phones behind charts about 'impressions' and 'raw search share.' But impressions don't pay your bills.",
    remedyTitle: "High-Intent Consultation Metrics",
    remedyText: "We track exclusively commercial intents: click volume, phone inquiries, booked consultations, and checkouts. Zero fluff — every metric maps to revenue.",
  },
];
 
export default function AnxietyResolver() {
  const [active, setActive] = useState(0);
  const a = ANXIETIES[active];
 
  return (
    <section className="relative overflow-hidden border-y border-[#e2e8f0] bg-[#f8fafc] py-20">
      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: "linear-gradient(rgba(83,74,183,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(83,74,183,.04) 1px,transparent 1px)", backgroundSize: "32px 32px" }}
      />
 
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#534AB7]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">Human Accountability Shield</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            We know why you&apos;re worried.
            <br />
            <span className="text-[#534AB7]">We have answers.</span>
          </h2>
          <p className="mt-4 text-lg text-[#64748b]">
            Most business owners have been burned before by glossy presentations and empty promises. Click a concern to reveal exactly how we handle it.
          </p>
        </div>
 
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left — anxiety buttons */}
          <div className="space-y-3 lg:col-span-5">
            {ANXIETIES.map((item, idx) => {
              const isActive = active === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`relative flex w-full gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#534AB7] bg-white shadow-md shadow-[#534AB7]/5"
                      : "border-[#e2e8f0] bg-white/60 hover:border-[#cbd5e1] hover:bg-white"
                  }`}
                >
                  {isActive && <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#534AB7]" />}
                  <div className="shrink-0 pt-0.5 text-2xl">{item.emoji}</div>
                  <div>
                    <span className={`mb-1 block text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-[#534AB7]" : "text-[#94a3b8]"}`}>
                      Concern 0{idx + 1} · {item.badge}
                    </span>
                    <h4 className={`text-sm font-bold leading-snug ${isActive ? "text-[#0a0f2e]" : "text-[#374151]"}`}>
                      &ldquo;{item.worry}&rdquo;
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
 
          {/* Right — solution */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-xl shadow-[#534AB7]/5 sm:p-8"
              >
                {/* status */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f5f9] pb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1fae5] bg-[#f0fdf4] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#15803d]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                    </span>
                    Remedy Verified
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-[#94a3b8]">Founder Account Protection Guaranteed</span>
                </div>
 
                {/* worry context */}
                <div className="mb-5 rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-4">
                  <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#b91c1c]">
                    <AlertTriangle className="h-3.5 w-3.5" /> What&apos;s Keeping You Up At Night
                  </span>
                  <p className="text-sm leading-relaxed text-[#991b1b]">{a.context}</p>
                </div>
 
                {/* remedy */}
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-black text-[#0a0f2e]">
                    <Zap className="h-5 w-5 shrink-0 text-[#534AB7]" />
                    {a.remedyTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#64748b]">{a.remedyText}</p>
                </div>
 
                {/* CTA + signoff */}
                <div className="flex flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">Founder Direct Support</span>
                    <p className="text-xs text-[#64748b]">We&apos;ll map a specific mitigation plan for your domain — free on our call.</p>
                  </div>
                  <Link
                    href="/free-audit"
                    className="group flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0a0f2e] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#534AB7]"
                  >
                    Resolve This Fear
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
 
                {/* founder quote */}
                <div className="mt-6 flex items-start gap-4 border-t border-[#f1f5f9] pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#534AB7]/30 bg-[#534AB7] text-xs font-black text-white">
                    MS
                  </div>
                  <div>
                    <p className="text-xs italic leading-relaxed text-[#64748b]">
                      &ldquo;I built SearchPrex precisely to bypass the frustrating legacy agency game. I personally stand behind your results and work on your search profile every morning.&rdquo;
                    </p>
                    <span className="mt-1 block text-[10px] font-bold text-[#0a0f2e]">— Mubashar Shahzad, Founder</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
 