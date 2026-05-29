"use client";
 
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, ArrowRight, Check, Star, Loader2 } from "lucide-react";
 
/* ── Floating case study data, per persona ── */
type PersonaKey = "law" | "ecom" | "local";
 
interface CaseCard {
  client: string;
  tag: string;
  val: string;
  label: string;
  spark: number[];
}
 
const CASE_DATA: Record<PersonaKey, CaseCard[]> = {
  law: [
    { client: "Morrison Family Law", tag: "Dallas, TX", val: "#1", label: "Local ranking", spark: [3, 4, 3, 5, 6, 7, 8] },
    { client: "Hartley Injury Group", tag: "Houston, TX", val: "47", label: "Leads / month", spark: [2, 2, 3, 4, 4, 6, 7] },
    { client: "Bexar Defense", tag: "San Antonio", val: "+380%", label: "Organic visibility", spark: [1, 2, 2, 4, 5, 6, 8] },
    { client: "Collin Probate Law", tag: "Plano, TX", val: "6 wks", label: "To page one", spark: [1, 1, 2, 3, 5, 7, 8] },
  ],
  ecom: [
    { client: "Michigan Sports", tag: "Shopify Store", val: "+476%", label: "GSC clicks", spark: [1, 2, 2, 3, 5, 7, 9] },
    { client: "TrailGear Co.", tag: "Outdoor Retail", val: "+285%", label: "Revenue growth", spark: [2, 3, 3, 4, 5, 6, 8] },
    { client: "Urban Knives", tag: "900+ SKUs", val: "12K", label: "Pages indexed", spark: [1, 2, 3, 4, 6, 7, 8] },
    { client: "PeakFitness", tag: "DTC Brand", val: "$124K", label: "Added revenue", spark: [1, 1, 2, 4, 5, 7, 9] },
  ],
  local: [
    { client: "Dallas Plumbing Co.", tag: "Service Area", val: "+5.7x", label: "Clicks 60 days", spark: [1, 2, 2, 4, 5, 7, 9] },
    { client: "Collin HVAC", tag: "Local Service", val: "#1", label: "Map pack", spark: [2, 3, 4, 4, 5, 6, 8] },
    { client: "Metro Remodel", tag: "Contractor", val: "3.8K", label: "Pages indexed", spark: [1, 2, 3, 5, 6, 7, 8] },
    { client: "QuickFix Electric", tag: "Emergency", val: "98%", label: "Client retention", spark: [3, 4, 5, 6, 7, 7, 8] },
  ],
};
 
const PERSONA_LABELS: { key: PersonaKey; label: string }[] = [
  { key: "law", label: "Law Firms" },
  { key: "ecom", label: "E-Commerce" },
  { key: "local", label: "Local Business" },
];
 
const TRUST = ["Trustpilot", "Clutch 5.0★", "BBB A+", "G2", "GoodFirms"];
 
const STATS = [
  { v: "+285%", l: "Avg Revenue Growth" },
  { v: "+476%", l: "GSC Click Growth" },
  { v: "98%", l: "Client Retention" },
];
 
/* ── Sparkline mini-chart ── */
function Sparkline({ data }: { data: number[] }) {
  const w = 168, h = 24;
  const max = Math.max(...data);
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(" ");
  return (
    <svg className="mt-2 h-6 w-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
 
/* ── One floating card ── */
function FloatCard({ card, position, anim }: { card: CaseCard; position: string; anim: string }) {
  return (
    <div className={`absolute z-[5] hidden w-[200px] rounded-2xl border border-[#e8eaf0] bg-white p-4 text-left shadow-[0_12px_32px_-8px_rgba(83,74,183,0.16)] lg:block ${position} ${anim}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
        <div>
          <div className="text-[11px] font-bold leading-tight text-[#0a0f2e]">{card.client}</div>
          <div className="text-[9px] font-semibold uppercase tracking-wide text-[#64748b]">{card.tag}</div>
        </div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-black leading-none tracking-tight text-[#534AB7]">{card.val}</span>
        <span className="text-[10px] font-medium text-[#64748b]">{card.label}</span>
      </div>
      <Sparkline data={card.spark} />
    </div>
  );
}
 
interface HeroProps {
  headline?: string;
  subheadline?: string;
}
 
export default function Hero({
  headline = "Stop Paying Per Click.",
  subheadline = "We build organic visibility that brings purchasing-intent customers straight to your door — compounding month after month, without paying per click.",
}: HeroProps) {
  const [persona, setPersona] = useState<PersonaKey>("law");
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
 
  /* auto-rotate persona every 5s */
  useEffect(() => {
    const order: PersonaKey[] = ["law", "ecom", "local"];
    const id = setInterval(() => {
      setPersona((cur) => order[(order.indexOf(cur) + 1) % order.length]);
    }, 5000);
    return () => clearInterval(id);
  }, []);
 
  const submitAudit = useCallback(() => {
    if (!url.trim()) { setState("error"); return; }
    setState("loading");
    setTimeout(() => setState("done"), 1300);
  }, [url]);
 
  const cards = CASE_DATA[persona];
  const positions = [
    "top-[15%] left-[4%]",
    "top-[22%] right-[4%]",
    "bottom-[18%] left-[6%]",
    "bottom-[22%] right-[5%]",
  ];
  const anims = ["sp-floaty1", "sp-floaty2", "sp-floaty3", "sp-floaty1"];
 
  return (
    <section className="relative flex min-h-[calc(100vh-68px)] flex-col items-center justify-center overflow-hidden bg-white px-6 py-16 text-center">
      <style>{`
        @keyframes sp-floaty1{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes sp-floaty2{0%,100%{transform:translateY(0)}50%{transform:translateY(12px)}}
        @keyframes sp-floaty3{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .sp-floaty1{animation:sp-floaty1 7s ease-in-out infinite}
        .sp-floaty2{animation:sp-floaty2 8s ease-in-out infinite}
        .sp-floaty3{animation:sp-floaty3 6.5s ease-in-out infinite}
        @keyframes sp-ping{0%{transform:scale(1);opacity:.6}80%,100%{transform:scale(2.6);opacity:0}}
        @keyframes sp-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
        @keyframes sp-glow{0%,100%{opacity:0;transform:scale(1)}50%{opacity:.25;transform:scale(1.015)}}
        @keyframes sp-draw{to{stroke-dashoffset:0}}
        .sp-bob{animation:sp-bob 1.6s ease-in-out infinite;display:inline-block}
        .sp-underline path{stroke-dasharray:420;stroke-dashoffset:420;animation:sp-draw 1s ease-out 1s forwards}
        .sp-glowring::before{content:'';position:absolute;inset:-2px;border-radius:16px;border:2px solid #534AB7;opacity:0;animation:sp-glow 3s ease-in-out infinite;pointer-events:none}
      `}</style>
 
      {/* Floating case study cards (transition on persona change) */}
      {cards.map((card, i) => (
        <motion.div
          key={`${persona}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className="contents"
        >
          <FloatCard card={card} position={positions[i]} anim={anims[i]} />
        </motion.div>
      ))}
 
      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-[840px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#e8eaf0] bg-white px-[18px] py-2 text-xs font-semibold shadow-[0_4px_16px_rgba(10,15,46,0.04)]"
        >
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inset-0 rounded-full bg-[#22c55e]" style={{ animation: "sp-ping 1.8s infinite" }} />
            <span className="relative inset-0 rounded-full bg-[#22c55e]" />
          </span>
          Founder-Led SEO
          <span className="h-3 w-px bg-[#e8eaf0]" />
          <span className="tracking-[1px] text-[#f59e0b]">★★★★★</span>
          <span>5.0 · 20+ US Clients</span>
        </motion.div>
 
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-[22px] text-5xl font-black leading-none tracking-[-0.035em] text-[#0a0f2e] sm:text-6xl lg:text-[70px]"
        >
          {headline}
          <br />
          <span className="relative inline-block text-[#534AB7]">
            Own Your Market.
            <svg className="sp-underline absolute -bottom-3.5 left-[-2%] h-3.5 w-[104%]" viewBox="0 0 400 14" preserveAspectRatio="none">
              <path d="M3 9 Q100 3 200 7 Q300 12 397 6" stroke="#534AB7" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>
 
        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-9 max-w-[600px] text-lg font-normal leading-relaxed text-[#64748b]"
        >
          We build organic visibility that brings <strong className="font-semibold text-[#0a0f2e]">purchasing-intent customers</strong> straight to your door — compounding month after month, without paying per click.
        </motion.p>
 
        {/* CRO Audit bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="mb-3.5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#534AB7]">
            <span className="sp-bob">↓</span> See what&apos;s blocking your rankings — free
          </div>
 
          <div className="sp-glowring relative mx-auto mb-4 flex max-w-[560px] items-center gap-2 rounded-2xl border-2 border-[#534AB7] bg-white p-2 shadow-[0_24px_60px_-12px_rgba(83,74,183,0.35)]">
            <span className="flex pl-3.5 pr-1.5 text-[#534AB7]">
              <Globe className="h-5 w-5" />
            </span>
            <input
              value={url}
              onChange={(e) => { setUrl(e.target.value); if (state === "error") setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && submitAudit()}
              placeholder="Enter your website URL — e.g. yoursite.com"
              className="flex-1 border-none bg-transparent text-base text-[#0a0f2e] outline-none placeholder:text-[#94a3b8]"
            />
            <button
              onClick={submitAudit}
              disabled={state === "loading" || state === "done"}
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-[#534AB7] px-7 py-[15px] text-[15px] font-bold text-white transition-all hover:bg-[#3C3489] hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-90"
              style={{ background: state === "done" ? "#16a34a" : undefined }}
            >
              {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              {state === "done" && <Check className="h-4 w-4" />}
              {state === "loading" ? "Analysing..." : state === "done" ? "Got it — 24hr reply" : (
                <>Get Free Audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </div>
 
          <div className="mb-9 flex flex-wrap justify-center gap-5 text-[12.5px] text-[#64748b]">
            {["Founder reviews personally", "Reply in 24 hours", "No login · 100% free"].map((m) => (
              <span key={m} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#16a34a]" /> {m}
              </span>
            ))}
          </div>
        </motion.div>
 
        {/* Trust logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <span className="mr-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">Verified on</span>
          {TRUST.map((t) => (
            <span key={t} className="rounded-lg border border-[#e8eaf0] bg-white px-[13px] py-1.5 text-xs font-semibold text-[#64748b] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]">
              {t}
            </span>
          ))}
        </motion.div>
 
        {/* Persona pills — control floating cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-[30px] flex flex-wrap justify-center gap-2"
        >
          {PERSONA_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPersona(key)}
              className={`rounded-full border px-[14px] py-1.5 text-[11px] font-semibold transition-all ${
                persona === key
                  ? "border-[#534AB7] bg-[#534AB7] text-white"
                  : "border-[#e8eaf0] bg-white text-[#64748b] hover:border-[#534AB7] hover:text-[#534AB7]"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
 
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-13 flex flex-wrap justify-center gap-x-14 gap-y-8 border-t border-[#e8eaf0] pt-9"
          style={{ marginTop: "52px" }}
        >
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-[38px] font-black leading-none tracking-tight text-[#534AB7]">{s.v}</div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#64748b]">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
 






