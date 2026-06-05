
"use client";
 
import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2, ShieldCheck, Clock } from "lucide-react";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
export default function LeadCaptureForm() {
  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
 
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
 
  const handleSubmit = async () => {
    setError("");
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage-lead-form" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email hello@searchprex.com.");
    }
  };
 
  return (
    <section id="free-audit-form" className="bg-[#0a0f2e] py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
 
        {/* Left — value proposition */}
        <div>
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3eb489]">
            Free SEO Audit
          </span>
          <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            See exactly why you&apos;re<br className="hidden sm:block" /> not ranking yet.
          </h2>
          <p className="mb-6 text-base leading-relaxed text-white/70">
            Drop your site below. The founder personally reviews it and sends a prioritized fix list within 24 hours — free, no obligation, no sales pressure.
          </p>
          <ul className="space-y-3">
            {[
              "Technical issues, content gaps & competitor analysis",
              "A prioritized P1 / P2 / P3 fix list — not a generic PDF",
              "Reviewed by the founder, not a junior or a bot",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-white/80">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
 
        {/* Right — the form card */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          {status === "success" ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "#dcf2ea" }}>
                <CheckCircle className="h-7 w-7" style={{ color: GREEN_DARK }} />
              </div>
              <h3 className="mb-2 text-xl font-black text-[#0a0f2e]">You&apos;re all set!</h3>
              <p className="text-sm text-[#64748b]">
                Your audit request is in. The founder will personally review your site and reply within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#64748b]">Name</label>
                <input
                  id="lead-name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0a0f2e] outline-none transition-all focus:border-[#534AB7] focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#64748b]">Email *</label>
                <input
                  id="lead-email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0a0f2e] outline-none transition-all focus:border-[#534AB7] focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="lead-website" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#64748b]">Website</label>
                <input
                  id="lead-website"
                  type="url"
                  value={form.website}
                  onChange={update("website")}
                  placeholder="https://yoursite.com"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#0a0f2e] outline-none transition-all focus:border-[#534AB7] focus:bg-white"
                />
              </div>
 
              {error && <p className="text-xs font-semibold text-[#dc2626]">{error}</p>}
 
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-70"
                style={{ background: GREEN }}
              >
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                ) : (
                  <>Get my free audit <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
 
              <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                <span className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]"><ShieldCheck className="h-3.5 w-3.5" /> No spam, ever</span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]"><Clock className="h-3.5 w-3.5" /> 24hr reply</span>
              </div>
            </div>
          )}
        </div>
 
      </div>
    </section>
  );
}
