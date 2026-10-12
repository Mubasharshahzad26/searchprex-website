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
  Landmark,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface BatonRougeHeroProps {
  page?: CityPage;
}

const PARISH_PILLARS = [
  {
    name: "I-10 / I-12 Bridge & Freight",
    venue: "19th Judicial District Court (300 North Blvd)",
    desc: "Mississippi River bridge bottlenecks, commercial 18-wheeler collisions, and La. Civ. Code Art. 2315 delictual liability claims.",
  },
  {
    name: "Petrochemical & Plant Injury",
    venue: "19th JDC & Middle District of LA Federal",
    desc: "Refinery explosions, chemical exposure, maritime/Jones Act river claims, and industrial third-party contractor litigation.",
  },
  {
    name: "Successions & Family Law",
    venue: "East Baton Rouge Family Court",
    desc: "Louisiana forced heirship, usufruct, community property partitions, and tutorship proceedings across EBR, Ascension, and Livingston parishes.",
  },
];

export default function BatonRougeHero({ page }: BatonRougeHeroProps) {
  const [activePillar, setActivePillar] = useState(0);
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
          name: name || "Baton Rouge Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "baton-rouge:hero-lead-form",
          notes: `Requested Baton Rouge 19th JDC Audit. Pillar: ${PARISH_PILLARS[activePillar].name}, Size: ${firmSize}, Practice: ${practiceArea}`,
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
                Law Firm SEO · Baton Rouge, LA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-neutral-800 border border-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Parish Exclusivity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.14]">
              Baton Rouge Law Firm SEO:{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                Civil Law & Capital Region Authority
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Baton Rouge law firm SEO gives local Capital Region attorneys an unfair advantage over national directories and out-of-market billboard spenders. We engineer Louisiana Civil Code practice silos, 19th Judicial District Court venue guides, and Map Pack dominance across East Baton Rouge, Ascension, and Livingston parishes.
            </p>

            {/* Capital Region Selector + Baton Rouge Photo */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
                {PARISH_PILLARS.map((p, idx) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setActivePillar(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activePillar === idx
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src="/images/locations/baton-rouge-legal-district.webp"
                    alt="Downtown Baton Rouge judicial district near the 19th Judicial District Court and State Capitol"
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white flex items-center gap-1">
                    <Landmark className="w-3 h-3" /> 19th JDC Corridor
                  </span>
                </div>
                <div className="sm:col-span-8 space-y-1.5">
                  <p className="text-xs font-bold text-neutral-950">
                    Venue: {PARISH_PILLARS[activePillar].venue}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {PARISH_PILLARS[activePillar].desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Art. 3493.11</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">2-Yr Prescription Silos</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">19th JDC</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Parish Court Authority</p>
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
                  Free 24-Hour Capital Region Audit
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                  Get Your Baton Rouge Reality Check
                </h2>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-white border border-slate-200 text-center space-y-3 my-4">
                  <CheckCircle2 className="w-10 h-10 text-neutral-900 mx-auto" />
                  <h3 className="text-base font-bold text-neutral-950">Audit Request Received</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you. Mubashar will audit your Baton Rouge rankings, 19th JDC entity signals, and Capital Region competitors within 24 hours.
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
                      placeholder="batonrougelawfirm.com"
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
                      placeholder="you@batonrougelawfirm.com"
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
                      {["Personal injury", "Trucking / I-10", "Plant / Industrial", "Successions", "Family law", "Other"].map((area) => (
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
