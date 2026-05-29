"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowLeft, Check, Loader2, Bell,
  FileSearch, Link2, BarChart3, FileText, Bot, Send,
} from "lucide-react";
 
const features = [
  { icon: FileSearch, title: "AI Content Audit", desc: "Detect thin & non-indexed pages instantly" },
  { icon: Bot, title: "Multi-Agent SEO", desc: "Specialized agents for every SEO task" },
  { icon: FileText, title: "Content Rewriter", desc: "Generate unique, E-E-A-T optimized content" },
  { icon: Link2, title: "Internal Linking", desc: "Automated link map suggestions" },
  { icon: Send, title: "GSC Submission", desc: "Bulk URL indexing & resubmission" },
  { icon: BarChart3, title: "White-Label Reports", desc: "Client-ready PDF reporting with GSC data" },
];
 
export default function ToolsComingSoon() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
 
  const submit = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) { setState("error"); return; }
    setState("loading");
    // TODO: wire to your waitlist API / form endpoint
    setTimeout(() => setState("done"), 1200);
  };
 
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center">
      <style>{`
        @keyframes sp-floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes sp-pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.7;transform:scale(1.05)}}
        .sp-floaty{animation:sp-floaty 6s ease-in-out infinite}
      `}</style>
 
      {/* soft purple glow blobs */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-[#534AB7] opacity-[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[12%] h-80 w-80 rounded-full bg-[#7F77DD] opacity-[0.06] blur-3xl" />
 
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "linear-gradient(rgba(83,74,183,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(83,74,183,.04) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 75%)",
        }}
      />
 
      <div className="relative z-10 w-full max-w-2xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ddd6fe] bg-[#f5f3ff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#534AB7]"
        >
          <Sparkles className="h-3.5 w-3.5" /> Launching Soon
        </motion.div>
 
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-5xl font-black leading-none tracking-tight text-[#0a0f2e] sm:text-6xl"
        >
          NicheSEO <span className="text-[#534AB7]">Pro</span>
        </motion.h1>
 
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-[#64748b]"
        >
          An AI-powered, multi-agent SEO suite that audits, rewrites, links, and indexes
          your pages at scale — built by an SEO founder, for serious growth.
        </motion.p>
 
        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-4 max-w-md"
        >
          {state === "done" ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#d1fae5] bg-[#f0fdf4] px-6 py-4 text-sm font-semibold text-[#15803d]">
              <Check className="h-5 w-5" /> You&apos;re on the list! We&apos;ll notify you at launch.
            </div>
          ) : (
            <>
              <div
                className="flex items-center gap-2 rounded-2xl border-2 bg-white p-2 pl-4 shadow-[0_12px_40px_-12px_rgba(83,74,183,0.3)] transition-colors"
                style={{ borderColor: state === "error" ? "#ef4444" : "#534AB7" }}
              >
                <Bell className="h-5 w-5 shrink-0 text-[#534AB7]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Enter your email for early access"
                  className="flex-1 border-none bg-transparent text-[15px] text-[#0a0f2e] outline-none placeholder:text-[#94a3b8]"
                />
                <button
                  onClick={submit}
                  disabled={state === "loading"}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-[#534AB7] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#3C3489] hover:-translate-y-0.5 disabled:opacity-80"
                >
                  {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
                </button>
              </div>
              {state === "error" && (
                <p className="mt-2 text-xs font-medium text-red-500">Please enter a valid email address.</p>
              )}
            </>
          )}
          <p className="mt-3 text-xs text-[#94a3b8]">No spam — just one email when we launch.</p>
        </motion.div>
 
        {/* Feature preview grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl border border-[#e8eaf0] bg-white p-4 shadow-sm transition-all hover:border-[#534AB7] hover:shadow-md"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5f3ff]">
                <f.icon className="h-4 w-4 text-[#534AB7]" />
              </div>
              <h3 className="mb-1 text-sm font-bold text-[#0a0f2e]">{f.title}</h3>
              <p className="text-xs leading-relaxed text-[#64748b]">{f.desc}</p>
            </div>
          ))}
        </motion.div>
 
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] transition-colors hover:text-[#534AB7]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
 














