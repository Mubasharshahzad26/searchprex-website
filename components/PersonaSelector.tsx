"use client";
 
// components/PersonaSelector.tsx
// "Build Your Free SEO Game Plan" — a 2-tap, low-friction lead-capture agent.
// Pick business + goal → instant tailored plan → inline email capture (/api/leads).
// Real per-category icons, smooth framer-motion, routes to the relevant service.
 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale, MapPin, ShoppingCart, Stethoscope, Home, Briefcase,
  TrendingUp, Users, Search, PhoneCall, Wrench, Target,
  CheckCircle2, ArrowRight, Sparkles, Calendar, Loader2, Mail,
} from "lucide-react";
 
const PURPLE = "#534AB7";
const GREEN = "#1D9E75";
 
type Item = { id: string; label: string; icon: typeof Scale; color: string; bg: string };
 
const businessTypes: Item[] = [
  { id: "law-firm", label: "Law Firm", icon: Scale, color: "#7F77DD", bg: "#EEEDFE" },
  { id: "local", label: "Local Business", icon: MapPin, color: "#1D9E75", bg: "#E1F5EE" },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart, color: "#D85A30", bg: "#FAECE7" },
  { id: "medical", label: "Medical / Health", icon: Stethoscope, color: "#E24B4A", bg: "#FCEBEB" },
  { id: "real-estate", label: "Real Estate", icon: Home, color: "#185FA5", bg: "#E6F1FB" },
  { id: "other", label: "Other Business", icon: Briefcase, color: "#888780", bg: "#F1EFE8" },
];
 
const goalTypes: Item[] = [
  { id: "rankings", label: "Higher Rankings", icon: TrendingUp, color: "#534AB7", bg: "#EEEDFE" },
  { id: "traffic", label: "More Traffic", icon: Users, color: "#1D9E75", bg: "#E1F5EE" },
  { id: "audit", label: "Free SEO Audit", icon: Search, color: "#185FA5", bg: "#E6F1FB" },
  { id: "leads", label: "More Leads / Calls", icon: PhoneCall, color: "#D85A30", bg: "#FAECE7" },
  { id: "technical", label: "Fix Technical Issues", icon: Wrench, color: "#BA7517", bg: "#FAEEDA" },
  { id: "strategy", label: "Full SEO Strategy", icon: Target, color: "#534AB7", bg: "#EEEDFE" },
];
 
const focusByBusiness: Record<string, { service: string; serviceHref: string; bullets: string[] }> = {
  "law-firm": {
    service: "Law Firm SEO", serviceHref: "/services/law-firm-seo",
    bullets: [
      "Rank your practice-area pages in the local pack",
      "E-E-A-T content that turns searches into signed cases",
      "24/7 AI intake so you never miss a lead",
    ],
  },
  "local": {
    service: "Local SEO", serviceHref: "/services/local-seo",
    bullets: [
      "Dominate the Google Map Pack in your service area",
      "Optimize your Google Business Profile & reviews",
      "Build location pages that actually convert",
    ],
  },
  "ecommerce": {
    service: "Ecommerce SEO", serviceHref: "/services/ecommerce-seo",
    bullets: [
      "Recover mass non-indexed product pages",
      "Unique product & category content at scale",
      "Fix schema, faceted nav & Core Web Vitals",
    ],
  },
  "medical": {
    service: "Local SEO", serviceHref: "/services/local-seo",
    bullets: [
      "Build trust with E-E-A-T & YMYL-safe content",
      "Rank for local 'near me' patient searches",
      "Optimize your Google Business Profile & reviews",
    ],
  },
  "real-estate": {
    service: "Local SEO", serviceHref: "/services/local-seo",
    bullets: [
      "Rank for high-intent local property searches",
      "Build neighborhood & listing landing pages",
      "Capture leads with location-based content",
    ],
  },
  "other": {
    service: "Technical SEO", serviceHref: "/services/technical-seo",
    bullets: [
      "Start with a full technical + content audit",
      "Target your highest-intent keywords",
      "Build pages that convert visitors into leads",
    ],
  },
};
 
const goalPhrase: Record<string, string> = {
  rankings: "climb the rankings",
  traffic: "grow organic traffic",
  audit: "get a clear audit",
  leads: "get more leads & calls",
  technical: "fix technical issues",
  strategy: "build a full SEO strategy",
};
 
function OptionButton({ item, selected, onClick }: { item: Item; selected: boolean; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-2.5 rounded-xl border-2 p-3 text-left transition-all duration-200 ${
        selected ? "border-[#534AB7] shadow-sm" : "border-[#e5e7eb] hover:border-[#534AB7]/40"
      }`}
      style={{ background: selected ? item.bg : "#fff" }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105"
        style={{ background: selected ? "rgba(255,255,255,0.7)" : item.bg, color: item.color }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs font-semibold leading-tight" style={{ color: selected ? "#0D1B54" : "#374151" }}>
        {item.label}
      </span>
      {selected && <CheckCircle2 className="absolute right-2 top-2 h-4 w-4" style={{ color: PURPLE }} />}
    </button>
  );
}
 
export default function PersonaSelector() {
  const [business, setBusiness] = useState<string>("law-firm");
  const [goal, setGoal] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch {}
    };
  }, []);
 
  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: "https://calendly.com/contact-searchprex/30min" });
    }
  };
 
  const bizLabel = businessTypes.find((b) => b.id === business)?.label ?? "";
  const goalLabel = goalTypes.find((g) => g.id === goal)?.label ?? "";
  const plan = focusByBusiness[business];
  const ready = Boolean(business && goal);
 
  const submitLead = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${bizLabel} · ${goalLabel}`,
          email,
          website: "",
          source: "persona-selector",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };
 
  return (
    <section className="relative w-full overflow-hidden bg-[#0D1B54] py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#534AB7] opacity-20 blur-[120px]" />
      </div>
 
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60">
            <Sparkles className="h-3.5 w-3.5" /> Free · 2 taps · No signup
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Build Your Free SEO Game Plan</h2>
          <p className="mt-3 text-sm text-white/50">Tell us two things — we&apos;ll show you exactly where we&apos;d start.</p>
        </motion.div>
 
        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
 
          {/* Step 1 — business */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#534AB7] text-xs font-bold text-white">1</span>
              <p className="text-sm font-bold text-[#0D1B54]">My business is&hellip;</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {businessTypes.map((item) => (
                <OptionButton key={item.id} item={item} selected={business === item.id} onClick={() => setBusiness(item.id)} />
              ))}
            </div>
          </div>
 
          {/* Step 2 — goal */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white transition-colors ${goal ? "bg-[#534AB7]" : "bg-[#cbd5e1]"}`}>2</span>
              <p className="text-sm font-bold text-[#0D1B54]">My main goal is&hellip;</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {goalTypes.map((item) => (
                <OptionButton key={item.id} item={item} selected={goal === item.id} onClick={() => setGoal(item.id)} />
              ))}
            </div>
          </div>
 
          {/* Result + inline lead capture */}
          <AnimatePresence mode="wait">
            {ready && plan ? (
              <motion.div key={`${business}-${goal}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-6">
                <div className="rounded-xl border border-[#e5e7eb] bg-gradient-to-br from-[#f8f9fc] to-[#eef0fb] p-5">
                  <p className="mb-3 text-sm font-bold text-[#0D1B54]">
                    For a {bizLabel} looking to {goalPhrase[goal!]}, here&apos;s where we&apos;d start:
                  </p>
                  <ul className="space-y-2">
                    {plan.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#374151]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /> {b}
                      </li>
                    ))}
                  </ul>
 
                  {/* Inline email capture */}
                  {status === "done" ? (
                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#E1F5EE] px-4 py-3 text-sm font-semibold text-[#0f7a52]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" /> On its way! We&apos;ll send your full plan &amp; free audit within 24 hours.
                    </div>
                  ) : (
                    <div className="mt-5">
                      <label className="mb-1.5 block text-xs font-bold text-[#0D1B54]">
                        Want the full 90-day plan + a free audit? Drop your email:
                      </label>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative flex-1">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                            onKeyDown={(e) => { if (e.key === "Enter") submitLead(); }}
                            placeholder="you@company.com"
                            className="w-full rounded-lg border-2 border-[#e5e7eb] py-2.5 pl-9 pr-3 text-sm text-[#0D1B54] outline-none transition-colors focus:border-[#534AB7]"
                          />
                        </div>
                        <button
                          onClick={submitLead}
                          disabled={status === "loading"}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#534AB7] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#3C3489] disabled:opacity-60"
                        >
                          {status === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending</>) : (<>Send my plan <ArrowRight className="h-4 w-4" /></>)}
                        </button>
                      </div>
                      {status === "error" && (
                        <p className="mt-1.5 text-xs font-semibold text-[#dc2626]">
                          Enter a valid email, or just <a href="mailto:contact@searchprex.com" className="underline">email us</a>.
                        </p>
                      )}
                    </div>
                  )}
                </div>
 
                {/* Secondary actions */}
                <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
                  <button onClick={openCalendly} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#534AB7] transition-opacity hover:opacity-70">
                    <Calendar className="h-3.5 w-3.5" /> Prefer to talk? Book a 30-min call
                  </button>
                  <a href={plan.serviceHref} className="inline-flex items-center gap-1 text-xs font-bold text-[#64748b] transition-colors hover:text-[#0D1B54]">
                    See our {plan.service} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 text-center text-sm font-medium text-[#94a3b8]">
                👆 Pick your main goal to see your free game plan
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
 
        {/* Trust badges */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {["Free 30-min call", "No commitment", "Reply in 24hrs"].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" style={{ color: "#1D9E75" }} />
              <span className="text-xs font-medium text-white/40">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
 