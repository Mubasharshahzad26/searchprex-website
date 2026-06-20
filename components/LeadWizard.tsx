"use client";
 
// components/LeadWizard.tsx
// Premium Semrush-style lead-capture wizard. Dark gradient + baked-in aurora,
// value-prop copy on the left, a 2-step wizard card on the right (business type
// -> contact details). POSTs to /api/leads. Self-animated.
 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  ShoppingCart,
  MapPin,
  Wrench,
  Building2,
  Briefcase,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  type LucideIcon,
} from "lucide-react";
 
type BizType = { value: string; label: string; desc: string; icon: LucideIcon };
 
const BUSINESS_TYPES: BizType[] = [
  { value: "law-firm", label: "Law Firm", desc: "Personal injury, family, criminal", icon: Scale },
  { value: "ecommerce", label: "Ecommerce / Shopify", desc: "Online retail & DTC brands", icon: ShoppingCart },
  { value: "local-service", label: "Local Service", desc: "Dentist, salon, restaurant", icon: MapPin },
  { value: "home-services", label: "Home Services", desc: "Contractor, plumber, HVAC", icon: Wrench },
  { value: "small-business", label: "Small Business", desc: "Local brick & mortar", icon: Building2 },
  { value: "enterprise", label: "Mid-Size / Enterprise", desc: "Multi-location or large-scale", icon: Briefcase },
];
 
export default function LeadWizard() {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
 
  const canSubmit = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
 
  const submit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website, source: `lead-wizard:${business}` }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };
 
  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] py-20 sm:py-28" id="get-started">
      {/* baked-in aurora */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="lw-blob lw-blob-1" />
        <span className="lw-blob lw-blob-2" />
      </div>
 
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* ── left copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8b86e0]">
            Free · 60 seconds
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get your custom{" "}
            <span className="bg-gradient-to-r from-[#7F77DD] to-[#3eb489] bg-clip-text text-transparent">
              SEO game plan.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
            Tell us about your business and we&apos;ll send a tailored, founder-reviewed
            roadmap — no obligation, no sales pitch.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Tailored to your exact business type",
              "Verified GSC strategies, not generic advice",
              "Delivered free within 48 hours",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-slate-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3eb489]/15">
                  <Check className="h-3 w-3 text-[#3eb489]" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
 
        {/* ── right wizard card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        >
          {status === "done" ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#534AB7] to-[#3eb489]">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a0f2e]">You&apos;re all set!</h3>
              <p className="mt-2 text-[#64748b]">
                Your custom game plan is on its way — check your inbox within 48 hours.
              </p>
            </div>
          ) : (
            <>
              {/* progress */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#0a0f2e]">Step {step} of 2</span>
                  <span className="text-[#64748b]">{step === 1 ? "50" : "100"}% complete</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#f1f3f9]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#534AB7] to-[#3eb489]"
                    initial={false}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
 
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="mb-1 text-lg font-bold text-[#0a0f2e]">
                      What type of business are you?
                    </h3>
                    <p className="mb-5 text-sm text-[#64748b]">Pick the closest match.</p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {BUSINESS_TYPES.map((b) => {
                        const Icon = b.icon;
                        const active = business === b.value;
                        return (
                          <button
                            key={b.value}
                            type="button"
                            onClick={() => setBusiness(b.value)}
                            className={`flex items-start gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                              active
                                ? "border-[#534AB7] bg-[#534AB7]/5"
                                : "border-[#e5e7eb] hover:border-[#c7c3ec]"
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                active ? "bg-[#534AB7] text-white" : "bg-[#f1f3f9] text-[#64748b]"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-bold text-[#0a0f2e]">{b.label}</span>
                              <span className="block text-[11px] text-[#94a3b8]">{b.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="mb-1 text-lg font-bold text-[#0a0f2e]">Where should we send it?</h3>
                    <p className="mb-3 text-sm text-[#64748b]">
                      Your free roadmap arrives within 48 hours.
                    </p>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-[#0a0f2e] outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/15"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Work email"
                      className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-[#0a0f2e] outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/15"
                    />
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      type="url"
                      placeholder="Website URL (optional)"
                      className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm text-[#0a0f2e] outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/15"
                    />
                    {status === "error" && (
                      <p className="text-sm text-red-500">Something went wrong — please try again.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
 
              {/* nav */}
              <div className="mt-6 flex gap-3">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#e5e7eb] px-5 py-3 text-sm font-bold text-[#374151] transition-colors hover:border-[#0a0f2e]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
                {step === 1 ? (
                  <button
                    type="button"
                    disabled={!business}
                    onClick={() => setStep(2)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#534AB7] to-[#3eb489] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canSubmit || status === "loading"}
                    onClick={submit}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#534AB7] to-[#3eb489] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Get my game plan <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
 
              <p className="mt-4 text-center text-xs text-[#94a3b8]">
                No spam. No obligation. Unsubscribe anytime.
              </p>
            </>
          )}
        </motion.div>
      </div>
 
      <style>{`
        .lw-blob { position: absolute; border-radius: 9999px; filter: blur(90px); will-change: transform; }
        .lw-blob-1 { width: 45%; height: 60%; left: -12%; top: -20%; background: #534AB7; opacity: 0.28; animation: lw-d1 21s ease-in-out infinite alternate; }
        .lw-blob-2 { width: 42%; height: 55%; right: -10%; bottom: -22%; background: #3eb489; opacity: 0.20; animation: lw-d2 25s ease-in-out infinite alternate; }
        @keyframes lw-d1 { from { transform: translate(0,0) scale(1); } to { transform: translate(14%,10%) scale(1.18); } }
        @keyframes lw-d2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-12%,-8%) scale(1.15); } }
        @media (prefers-reduced-motion: reduce) { .lw-blob { animation: none; } }
      `}</style>
    </section>
  );
}
 