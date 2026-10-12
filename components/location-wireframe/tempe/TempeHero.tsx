"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  ArrowRight,
  Scale,
  Clock,
  Lock,
  CheckCircle2,
  Building,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface TempeHeroProps {
  page?: CityPage;
}

const CORRIDORS = [
  {
    name: "Mill Ave & ASU District",
    court: "Tempe Municipal Court (140 E 5th St)",
    focus: "Extreme DUI (ARS § 28-1382), student disciplinary defense, misdemeanor assault, and pedestrian/scooter injury claims.",
  },
  {
    name: "Loop 101 & US-60 Junction",
    court: "Maricopa County Superior Court",
    focus: "High-velocity commercial trucking collisions, multi-vehicle commuter crashes, and wrongful death litigation.",
  },
  {
    name: "Tempe Town Lake Corporate Hub",
    court: "Commercial & Employment Venue",
    focus: "Executive severance, non-compete disputes, startup IP protection, and high-asset marital dissolution.",
  },
];

export default function TempeHero({ page }: TempeHeroProps) {
  const [activeCorridor, setActiveCorridor] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("Solo");
  const [practiceArea, setPracticeArea] = useState("Personal injury");
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
          name: name || "Tempe Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "tempe:hero-lead-form",
          notes: `Requested Tempe Hero Audit. Corridor: ${CORRIDORS[activeCorridor].name}, Size: ${firmSize}, Practice: ${practiceArea}`,
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
                Law Firm SEO · Tempe, AZ
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-neutral-800 border border-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Practice Exclusivity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.14]">
              Tempe Law Firm SEO:{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Dominate East Valley Search
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Tempe law firm SEO is engineered for East Valley attorneys who want signed retainers rather than vanity clicks. We build technical search authority across Tempe, Mesa, Chandler, and Maricopa County — capturing urgent Extreme DUI defense near ASU, Loop 101 collision litigation, and corporate disputes around Tempe Town Lake.
            </p>

            {/* Interactive Corridor Switcher + Real City Image Thumbnail */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  East Valley Legal Corridor Explorer
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CORRIDORS.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActiveCorridor(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        activeCorridor === idx
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src="/images/locations/tempe-legal-district.webp"
                    alt="Downtown Tempe Mill Avenue commercial and legal district near Maricopa County courts"
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white flex items-center gap-1">
                    <Building className="w-3 h-3" /> Mill Ave Corridor
                  </span>
                </div>
                <div className="sm:col-span-8 space-y-1.5">
                  <p className="text-xs font-bold text-neutral-950">
                    Venue: {CORRIDORS[activeCorridor].court}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {CORRIDORS[activeCorridor].focus}
                  </p>
                </div>
              </div>
            </div>

            {/* Fast Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">ARS § 28</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Statutory Content Silos</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Top 3</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">East Valley Map Pack</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Zero</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Long-Term Lock-In</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 border-t border-slate-200">
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
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
              <div className="pb-4 mb-5 border-b border-slate-200">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 mb-1.5">
                  <Clock className="w-3 h-3 text-neutral-800" />
                  Free 24-Hour East Valley Audit
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                  Request Your Tempe Reality Check
                </h2>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-white border border-slate-200 text-center space-y-3 my-4">
                  <CheckCircle2 className="w-10 h-10 text-neutral-900 mx-auto" />
                  <h3 className="text-base font-bold text-neutral-950">Audit Request Received</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you. Mubashar will review your Tempe rankings, Google Business Profile, and Maricopa County competitors within 24 hours.
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
                      placeholder="tempelawfirm.com"
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
                      placeholder="you@tempelawfirm.com"
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
                      {["Personal injury", "Extreme DUI", "Student defense", "Family law", "Business", "Other"].map((area) => (
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
