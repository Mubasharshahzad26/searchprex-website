"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  MapPin,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface PhiladelphiaHeroProps {
  page: CityPage;
}

const NEIGHBORHOOD_STOPS = [
  { name: "Center City", line: "Market-Frankford / Broad", desc: "Courthouse-adjacent, urgent 'near me' inquiries for injury, defense, and complex commercial matters." },
  { name: "South Philly", line: "Broad Street Line", desc: "Close-knit, multi-generational community that cross-checks local Google reviews before calling." },
  { name: "Northeast", line: "Roosevelt Blvd Corridor", desc: "Dense residential volume with heavy search demand for workers' comp, auto claims, and estate probate." },
  { name: "Fishtown", line: "Frankford Ave Corridor", desc: "Rapidly growing neighborhood generating modern tenancy, employment, and personal injury searches." },
  { name: "University City", line: "West Philly Tech & Med", desc: "Major hospital campuses (Penn, CHOP) generating specialized medical malpractice and employment claims." },
  { name: "Manayunk", line: "Schuylkill Valley Corridor", desc: "Distinct local neighborhood search volume that out-of-state national firms never target." },
  { name: "Delaware Co. / Suburbs", line: "Regional Rail Hub", desc: "Suburban commuters injured in Philadelphia whose claims cross county court boundaries." },
];

export default function PhiladelphiaHero({ page }: PhiladelphiaHeroProps) {
  const [selectedStop, setSelectedStop] = useState(0);
  const current = NEIGHBORHOOD_STOPS[selectedStop];

  // Hero Lead Form State
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("Solo");
  const [practiceArea, setPracticeArea] = useState<string>("Personal injury");
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
          name: name || "Philadelphia Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "philadelphia:hero-lead-form",
          notes: `Requested Philadelphia Hero Reality Check. Stop: ${current.name}, Size: ${firmSize}, Practice: ${practiceArea}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit request. Please try again.");
      }

      setStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      {/* Subtle Light Grey Ambient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            
            {/* Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                Law Firm SEO · Philadelphia, PA
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Practice Exclusivity
              </div>
            </div>

            {/* H1 Headline: Solid Black on Light White Background */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 leading-[1.14] tracking-tight">
              Philadelphia Law Firm SEO:{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Out-Local the National Advertisers
              </span>
            </h1>

            {/* Subheading (Focus Keyword in First 100 Words) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Philadelphia law firm SEO helps Pennsylvania attorneys dominate the local Map Pack, organic rankings, and generative AI answers without entering endless pay-per-click bidding wars with national directories. We engineer Center City and neighborhood silos across Philadelphia, Delaware County, and Montgomery County that deliver verified signed retainers.
            </p>

            {/* Neighborhood Stop Selector */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Philadelphia Neighborhood Intelligence
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Select a legal territory
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {NEIGHBORHOOD_STOPS.map((st, idx) => (
                  <button
                    key={st.name}
                    type="button"
                    onClick={() => setSelectedStop(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedStop === idx
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200/80">
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-neutral-900">{current.name} ({current.line}): </span>
                  {current.desc}
                </p>
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">City Hall</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Court Venue Silos</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Top 3</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Google Map Pack Focus</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Zero</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Long-Term Lock-In</p>
              </div>
            </div>

            {/* Secondary Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection("cost-ledger")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-950 border border-slate-300 font-semibold text-sm transition-all"
              >
                <BarChart3 className="w-4 h-4 text-neutral-700" />
                See the Cost Ledger
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("reality-check")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 underline underline-offset-4"
              >
                Get Free 24h Reality Check
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-neutral-900" />
                One firm per practice area
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-neutral-900" />
                Month-to-month contracts
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Scale className="w-4 h-4 text-neutral-900" />
                CEO-led execution
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HERO LEAD CAPTURE FORM */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 relative">
              
              {/* Top Form Badge */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 mb-1.5">
                    <Clock className="w-3 h-3 text-neutral-800" />
                    Free 24-Hour Philadelphia Audit
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    Get Your Philadelphia Reality Check
                  </h2>
                </div>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-white border border-slate-200 text-center space-y-3 my-4">
                  <CheckCircle2 className="w-10 h-10 text-neutral-900 mx-auto" />
                  <h3 className="text-base font-bold text-neutral-950">
                    Audit Request Received
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you. Mubashar will personally audit your Philadelphia rankings, Google Business Profile, and regional competitors, and email your 24-hour video review directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="ph-hero-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="ph-hero-name"
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="ph-hero-website" className="block text-xs font-semibold text-slate-700 mb-1">
                      Firm Website <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      id="ph-hero-website"
                      type="text"
                      required
                      placeholder="phillylawfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label htmlFor="ph-hero-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      id="ph-hero-email"
                      type="email"
                      required
                      placeholder="you@phillylawfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Firm Size */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Firm Size
                    </label>
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

                  {/* Practice Area */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Primary Practice Area
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Personal injury", "Workers' comp", "Med mal", "Criminal defense", "Employment", "Estate", "Other"].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setPracticeArea(area)}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                            practiceArea.toLowerCase().includes(area.toLowerCase().slice(0, 5))
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      <span>{status === "submitting" ? "Submitting Request..." : "Send My Free 24-Hour Reality Check"}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Confidentiality Note */}
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
