"use client";

// components/location-wireframe/DetroitHero.tsx
//
// Matches user's exact specification:
// - Background: High-quality Detroit geography/skyline image (/images/locations/detroit-skyline-hero.jpg)
// - H1: Revenue First Approach SEO in Detroit, Michigan
// - Subheading: Be the Firm Injured Clients See First
// - Right Column: Replicated exact Service Page Lead Collection Form (from LawFirmSEOClient / ArticleLeadMagnet)
//   with Website + Work Email fields, in-place submit to /api/send-audit, 24h founder review pledge.

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Globe, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";
import { CALL_HREF } from "@/lib/offer";
import { trackLead } from "@/lib/track";

export default function DetroitHero({ page }: { page: CityPage }) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [attribution, setAttribution] = useState({ utmSource: "", utmCampaign: "", referrer: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setAttribution({
        utmSource: params.get("utm_source") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
        referrer: document.referrer || "",
      });
    }
  }, []);

  const handleHeroAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || !website.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: website.trim(),
          email: email.trim(),
          source: `location-hero-${page.slug}`,
          ...attribution,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead("tear_down", `location-hero-${page.slug}`);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] text-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* ── High-Quality Local Detroit Geography Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/locations/detroit-skyline-hero.jpg"
          alt="Downtown Detroit Woodward Avenue & Legal District Skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        {/* Layered dark gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2e] via-[#0a0f2e]/90 to-[#0a0f2e]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e] via-transparent to-[#0a0f2e]/70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#534AB7]/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a594fd] bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#3eb489] animate-pulse" />
              <span>LAW FIRM SEO · {page.city.toUpperCase()}, {page.state.toUpperCase()}</span>
            </div>

            {/* H1 & Subheading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
                Revenue First Approach SEO in {page.city}, {page.state}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#a594fd]">
                Be the Firm Injured Clients See First
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {page.city} clients search in panic, on mobile, minutes after an accident or an arrest. We put your firm in the Map Pack and page one so the call comes to you, not the firm above you.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#growth-plan"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all cursor-pointer"
              >
                <span>Check Your Firm&apos;s Ranking</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#see-approach"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-all cursor-pointer backdrop-blur-xs"
              >
                <span>See Our Approach</span>
              </a>
            </div>

            {/* Badges / Trust strip */}
            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-200">Target Practice Focus:</span>
              <span>Built for personal injury, criminal defense, family and employment law firms across {page.county}.</span>
            </div>
          </div>

          {/* Right Column: Replicated Service Page Lead Collection Form */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border-2 border-[#1a7d59]/40 bg-white p-6 shadow-2xl sm:p-7 text-slate-900">
              
              {/* Form Header matching service page */}
              <div className="mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1a7d59]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1a7d59]">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Free Law Firm Tear-Down</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">· 24h Turnaround</span>
                </div>
                <p className="text-base sm:text-lg font-black text-[#0a0f2e]">
                  Free law firm tear-down
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">
                  Send your URL. I’ll check your practice-area pages, Business Profile and the firms outranking you in {page.city} — within 24 hours.
                </p>
              </div>

              {/* Lead Submission Form or Success State */}
              {status === "done" ? (
                <div className="rounded-xl border border-[#1a7d59] p-4 text-center bg-[#1a7d59]/5 space-y-2">
                  <CheckCircle className="mx-auto h-7 w-7 text-[#1a7d59]" />
                  <p className="text-sm font-bold text-[#0a0f2e]">
                    Got it — on its way.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    I&apos;ll read <span className="font-bold text-[#0a0f2e]">{website.trim()}</span> myself and reply to{" "}
                    <strong className="text-[#0a0f2e]">{email.trim()}</strong> within 24 hours.
                  </p>
                  <a
                    href={CALL_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#1a7d59] hover:bg-[#196b4d] px-4 py-2 text-xs font-bold text-white transition-opacity"
                  >
                    Want to talk sooner? Book 30 min →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleHeroAuditSubmit} className="flex flex-col gap-2.5">
                  <div className="relative">
                    <Globe
                      className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="yourlawfirm.com"
                      aria-label="Your website URL"
                      className="w-full rounded-lg border border-slate-200 bg-[#f8f9fc] py-2.5 pl-9 pr-3 text-xs text-[#0a0f2e] outline-none transition-all placeholder:text-slate-400 focus:border-[#1a7d59] focus:bg-white focus:ring-2 focus:ring-[#1a7d59]/20"
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="attorney@yourfirm.com"
                      aria-label="Your work email address"
                      className="w-full rounded-lg border border-slate-200 bg-[#f8f9fc] py-2.5 pl-9 pr-3 text-xs text-[#0a0f2e] outline-none transition-all placeholder:text-slate-400 focus:border-[#1a7d59] focus:bg-white focus:ring-2 focus:ring-[#1a7d59]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-lg py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#196b4d] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70"
                    style={{ background: "#1a7d59" }}
                  >
                    <span>{status === "loading" ? "Sending…" : "Send my free tear-down →"}</span>
                  </button>

                  {status === "error" ? (
                    <p
                      className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800"
                      role="alert"
                    >
                      <AlertCircle className="mt-px h-4 w-4 shrink-0" />
                      <span>
                        That didn&apos;t send — email{" "}
                        <a href="mailto:contact@searchprex.com" className="font-bold underline">
                          contact@searchprex.com
                        </a>{" "}
                        instead.
                      </span>
                    </p>
                  ) : null}
                </form>
              )}

              {/* Trust signals & Exclusivity */}
              <div className="mt-3.5 flex flex-col gap-1.5 pt-2 border-t border-slate-100 text-xs">
                {[
                  `One firm per practice area in ${page.city} exclusivity`,
                  "The founder reviews your site personally",
                  "Zero spam, zero sales pressure",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#1a7d59]" />
                    <span className="text-[11px] sm:text-xs text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct Booking Link */}
              <a
                href={CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-xs font-bold text-[#196b4d] hover:underline"
              >
                Prefer to talk sooner? Book 30 min →
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
