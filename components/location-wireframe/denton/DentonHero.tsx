"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  MapPin,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface DentonHeroProps {
  page?: CityPage;
}

export default function DentonHero({ page }: DentonHeroProps) {
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
          name: name || "Denton Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "denton:hero-lead-form",
          notes: `Requested Denton Hero Audit. Firm Size: ${firmSize}, Practice: ${practiceArea}`,
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
                Law Firm SEO · Denton, TX
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Practice Exclusivity
              </div>
            </div>

            {/* H1 Headline: Solid Black on Light White Background */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 leading-[1.14] tracking-tight">
              Denton Law Firm SEO:{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Qualified Cases Without the Ad Burden
              </span>
            </h1>

            {/* Subheading (Focus Keyword in First 100 Words) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Denton law firm SEO replaces rising pay-per-click ad bills and quiet Mondays with compounding Denton County retainers. We engineer local Map Pack dominance, page-one authority, and AI citations across Denton Square, Corinth, Flower Mound, and the UNT/TWU corridors so injured and urgent clients call your practice first.
            </p>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Denton Co.</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Courthouse Venue Silos</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">60,000+</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">UNT & TWU Corridor</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">90-Day</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Performance Guarantee</p>
              </div>
            </div>

            {/* Secondary Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#talk-to-me"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-950 border border-slate-300 font-semibold text-sm transition-all"
              >
                <span>Talk to Founder Directly</span>
                <ArrowRight className="w-4 h-4 text-neutral-700" />
              </a>
              <a
                href="#guarantee"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 underline underline-offset-4"
              >
                <span>See the 90-Day Guarantee</span>
              </a>
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
                Founder-led execution
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
                    Free 24-Hour Denton County Audit
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    Get Your Denton Reality Check
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
                    Thank you. Mubashar will personally review your Denton website, Google Business Profile, and local search competitors, and email your 24-hour teardown directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Firm Website <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="dentonlawfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@dentonlawfirm.com"
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
                      {["Personal injury","DWI / Criminal","Family law","Student defense","Estate","Other"].map((area) => (
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
                      <span>{status === "submitting" ? "Submitting Request..." : "Send My Free 24-Hour Audit"}</span>
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
