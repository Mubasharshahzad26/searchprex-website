"use client";

// components/QuickAuditBar.tsx
// A one-field capture, high on the page.
//
// Why this is safe to add when the whole point of Phase 1 was "one form":
// this is not a second OFFER. It is the same free audit, under the same name,
// posting to the same endpoint as the full form at the bottom of the page. The
// only difference is that it asks for one thing instead of three.
//
// It replaces the AI-visibility strip that used to sit in this slot, which
// pitched a DIFFERENT product (/ai-visibility) three sections before the AI
// section pitched the same product again.
//
// The full wizard still exists lower down for people who scroll. This exists
// because the form used to be at ~85% scroll depth and most visitors never
// reached it.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_MICROCOPY, OFFER_HREF, OFFER_HOOK } from "@/lib/offer";

export default function QuickAuditBar() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error" | "unqualified">("idle");

  const valid = /\S+@\S+\.\S+/.test(email) && website.length > 3 && industry !== "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    
    // Simple frontend qualification logic (for demonstration/UX)
    if (industry === "other") {
      setStatus("unqualified");
      return;
    }
    
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email, website, industry, source: "homepage-quick-bar" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @keyframes glitter {
          0% { transform: translateX(-150%) skewX(-20deg); }
          10% { transform: translateX(300%) skewX(-20deg); }
          100% { transform: translateX(300%) skewX(-20deg); }
        }
        .animate-glitter {
          animation: glitter 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      <section
        className="border-y py-16"
      style={{ background: color.surface, borderColor: color.border }}
      aria-labelledby="quick-audit-heading"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {status === "done" ? (
          <div className="flex flex-col items-center gap-2">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: `${color.success}22` }}
            >
              <Check className="h-6 w-6" style={{ color: color.successDark }} />
            </span>
            <p className="text-lg font-black" style={{ color: color.ink }}>
              Got it — your Tear-Down is queued.
            </p>
            <p className="text-sm" style={{ color: color.muted }}>
              Mubashar will review your competitors personally and reply within 24 hours.
            </p>
          </div>
        ) : status === "unqualified" ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-black" style={{ color: color.ink }}>
              Thank you for your interest.
            </p>
            <p className="mt-3 text-sm text-[#5b6472]">
              At this time, I only partner with specific industries to ensure I can guarantee results. 
              If you fall outside these categories, you can still use our AI tools or check the blog.
            </p>
          </div>
        ) : (
          <>
            <h2
              id="quick-audit-heading"
              className="text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: color.ink }}
            >
              Does Your Firm Qualify?
            </h2>
            <p className="mt-3 text-sm" style={{ color: color.muted }}>
              I only partner with firms where I know I can dominate the market. Drop your details below to see if you qualify.
            </p>

            <form
              onSubmit={submit}
              className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {/* Website URL */}
              <div className="relative">
                <label htmlFor="quick-site" className="sr-only">Website URL</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
                  </svg>
                </div>
                <input
                  id="quick-site"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website URL"
                  className={`block w-full border pl-10 pr-4 py-3.5 text-sm outline-none transition-colors focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] ${radius.control}`}
                  style={{ borderColor: color.border, color: color.ink, backgroundColor: "#f8f9fc" }}
                  required
                />
              </div>
              
              {/* Industry */}
              <div className="relative">
                <label htmlFor="quick-industry" className="sr-only">Industry</label>
                <select
                  id="quick-industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={`block w-full border px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] ${radius.control} appearance-none cursor-pointer`}
                  style={{ borderColor: color.border, color: industry ? color.ink : "#94a3b8", backgroundColor: "#f8f9fc" }}
                  required
                >
                  <option value="" disabled>Select Industry</option>
                  <option value="law-firm">Law Firm / Attorney</option>
                  <option value="ecommerce">eCommerce / Retail</option>
                  <option value="home-service">Home Services (HVAC, Roofers)</option>
                  <option value="b2b-saas">B2B / SaaS</option>
                  <option value="other">Other / General</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="quick-email" className="sr-only">Work Email</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
                </div>
                <input
                  id="quick-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work Email"
                  className={`block w-full border pl-10 pr-4 py-3.5 text-sm outline-none transition-colors focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] ${radius.control}`}
                  style={{ borderColor: color.border, color: color.ink, backgroundColor: "#f8f9fc" }}
                />
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  disabled={!valid || status === "loading"}
                  className={`relative overflow-hidden inline-flex w-full h-full shrink-0 items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none ${radius.control}`}
                  style={{ background: color.primary }}
                >
                  {/* Glittering Shimmer Element */}
                  <div className="absolute inset-0 z-0 w-1/2 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glitter pointer-events-none" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Checking...
                      </>
                    ) : (
                      <>
                        Check Qualification <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            {status === "error" && (
              <p className="mt-4 text-sm font-semibold" style={{ color: "#a32218" }}>
                Something went wrong.{" "}
                <Link href={OFFER_HREF} className="underline">
                  Use the full form instead
                </Link>
                , or email contact@searchprex.com.
              </p>
            )}

            <p className="mt-5 text-xs" style={{ color: color.muted }}>
              {OFFER_MICROCOPY}
            </p>
          </>
        )}
      </div>
    </section>
    </>
  );
}
