"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Clock,
  MapPin,
  BarChart3,
} from "lucide-react";

export default function GrandRapidsHero() {
  const [selectedPersona, setSelectedPersona] = useState<"solo" | "mid">("solo");

  // Lead Capture Form State
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("Solo");
  const [practiceArea, setPracticeArea] = useState<string>("Injury");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePersonaChange = (persona: "solo" | "mid") => {
    setSelectedPersona(persona);
    setFirmSize(persona === "solo" ? "Solo" : "2-10 attorneys");
  };

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
          name: name || "Grand Rapids Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "grand-rapids:hero-lead-form",
          notes: `Requested Grand Rapids Hero Audit. Persona: ${selectedPersona}, Firm Size: ${firmSize}, Practice: ${practiceArea}`,
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
                Law Firm SEO · Grand Rapids, MI
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Practice Exclusivity
              </div>
            </div>

            {/* H1 Headline: Solid Black on Light White Background */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 leading-[1.14] tracking-tight">
              Grand Rapids Law Firm SEO:{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Qualified Leads Without the PPC Bill
              </span>
            </h1>

            {/* Subheading (Focus Keyword in First 100 Words) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Grand Rapids law firm SEO is built for solo attorneys and mid-size firms tired of paying for rented ad clicks that never sign. We engineer permanent Kent County Map Pack, page-one organic, and AI-answer visibility across Grand Rapids, Wyoming, and Kentwood that keeps delivering signed retainers long after the ad budget stops.
            </p>

            {/* Persona Switcher Buttons */}
            <div className="pt-1">
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => handlePersonaChange("solo")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    selectedPersona === "solo"
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-neutral-950"
                  }`}
                >
                  I&apos;m a solo attorney
                </button>
                <button
                  type="button"
                  onClick={() => handlePersonaChange("mid")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    selectedPersona === "mid"
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-neutral-950"
                  }`}
                >
                  I run a mid-size firm
                </button>
              </div>

              {/* Persona Context Helper */}
              <p className="text-xs text-slate-500 mt-2.5">
                {selectedPersona === "solo"
                  ? "Tailored for solo practitioners who need phone-ready Kent County calls without managing an agency."
                  : "Tailored for 2–10 attorney partnerships managing associate caseloads across West Michigan."}
              </p>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">17th Cir.</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Kent County Venue Silos</p>
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
              <a
                href="#roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-950 border border-slate-300 font-semibold text-sm transition-all"
              >
                <BarChart3 className="w-4 h-4 text-neutral-700" />
                Calculate Cost Per Signed Case
              </a>
              <a
                href="#ppc-audit"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 underline underline-offset-4"
              >
                See full audit breakdown
                <ArrowRight className="w-4 h-4" />
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
                <Zap className="w-4 h-4 text-neutral-900" />
                You own everything we build
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
                    Free 24-Hour Kent County Teardown
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    Get Your Free PPC Waste & SEO Audit
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
                    Thank you. Mubashar will personally review your Grand Rapids website, Google Business Profile, and Kent County competitors, and email your 24-hour video teardown directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="gr-hero-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="gr-hero-name"
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="gr-hero-website" className="block text-xs font-semibold text-slate-700 mb-1">
                      Firm Website <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      id="gr-hero-website"
                      type="text"
                      required
                      placeholder="yourfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label htmlFor="gr-hero-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      id="gr-hero-email"
                      type="email"
                      required
                      placeholder="you@yourfirm.com"
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
                      {["Injury", "Family law", "Criminal defense", "Estate", "Other"].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setPracticeArea(area)}
                          className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
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
