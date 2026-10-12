"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  ShieldCheck,
  ArrowRight,
  Scale,
  Clock,
  Lock,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface SanJoseHeroProps {
  page?: CityPage;
}

const SILICON_SECTORS = [
  {
    name: "RSU & Tech Equity Divorce",
    venue: "Santa Clara Family Justice Center (201 N First St)",
    summary: "Unvested stock options, Hug & Nelson time-rule formulas, venture capital partnership interests, and high-value Cupertino/Palo Alto real estate.",
  },
  {
    name: "Executive Employment & IP",
    venue: "Downtown Superior Court & N.D. Cal Federal",
    summary: "California Bus. & Prof. Code § 16600 non-compete defense, trade secret litigation, wrongful termination, and founder equity disputes.",
  },
  {
    name: "US-101 & I-280 Catastrophic Injury",
    venue: "Old Courthouse / Downtown Civil Division",
    summary: "Commercial corridor collisions, autonomous/rideshare liability, and traumatic injury claims across San Jose, Sunnyvale, and Santa Clara.",
  },
];

export default function SanJoseHero({ page }: SanJoseHeroProps) {
  const [activeSector, setActiveSector] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("2-10 attorneys");
  const [practiceArea, setPracticeArea] = useState("Family & RSU divorce");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !email) {
      setErrorMessage("Please enter both your firm website URL and email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "San Jose Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "san-jose:hero-lead-form",
          notes: `Requested San Jose Hero Audit. Sector: ${SILICON_SECTORS[activeSector].name}, Size: ${firmSize}, Practice: ${practiceArea}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed.");
      setStatus("success");
    } catch {
      setErrorMessage("Unable to submit request. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase bg-slate-100 text-neutral-800 border border-slate-300">
                <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                Law Firm SEO · San Jose, CA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-neutral-800 border border-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Practice Exclusivity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.14]">
              San Jose Law Firm SEO:{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Capture Silicon Valley Legal Demand
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              San Jose law firm SEO connects Santa Clara County practices with engineers, founders, and families who research counsel via Google Search, ChatGPT, and Perplexity before calling. We build statutory silos for RSU divorce, tech employment, probate, and catastrophic injury across San Jose, Sunnyvale, Cupertino, and Mountain View.
            </p>

            {/* Silicon Valley Sector Selector + WebP Thumbnail */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
                {SILICON_SECTORS.map((s, idx) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setActiveSector(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeSector === idx
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src="/images/locations/san-jose-legal-district.webp"
                    alt="Downtown San Jose judicial district near Santa Clara County Superior Court"
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> First St Court Hub
                  </span>
                </div>
                <div className="sm:col-span-8 space-y-1.5">
                  <p className="text-xs font-bold text-neutral-950">
                    Venue: {SILICON_SECTORS[activeSector].venue}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {SILICON_SECTORS[activeSector].summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">AI + GEO</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">ChatGPT & Perplexity</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">EN/ES/VI</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">South Bay Multilingual</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Zero</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Long-Term Lock-In</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HERO LEAD CAPTURE FORM */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
              <div className="pb-4 mb-5 border-b border-slate-200">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 mb-1.5">
                  <Clock className="w-3 h-3 text-neutral-800" />
                  Free 24-Hour Santa Clara Audit
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                  Get Your San Jose Reality Check
                </h2>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-white border border-slate-200 text-center space-y-3 my-4">
                  <CheckCircle2 className="w-10 h-10 text-neutral-900 mx-auto" />
                  <h3 className="text-base font-bold text-neutral-950">Audit Request Received</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you. Mubashar will audit your San Jose search rankings, AI citation rate, and Santa Clara County competitors within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Firm Website *</label>
                    <input
                      type="text"
                      required
                      placeholder="sanjoselawfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@sanjoselawfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Firm Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Solo", "2-10 attorneys"] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFirmSize(size)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                            firmSize === size
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Practice Area</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Family & RSU divorce", "Employment & IP", "Personal injury", "Estate & trusts", "Criminal", "Other"].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setPracticeArea(area)}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            practiceArea === area
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                  {status === "error" && <p className="text-xs text-red-600 font-medium">{errorMessage}</p>}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>{status === "submitting" ? "Submitting..." : "Send My Free 24-Hour Audit"}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>100% Confidential · Reviewed personally by Founder</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
