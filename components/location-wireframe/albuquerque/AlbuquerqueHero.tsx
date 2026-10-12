"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Languages,
  CheckCircle2,
  Lock,
  Clock,
  MapPin,
  Scale,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface AlbuquerqueHeroProps {
  page: CityPage;
}

export default function AlbuquerqueHero({ page }: AlbuquerqueHeroProps) {
  const [lang, setLang] = useState<"en" | "es">("en");

  // Hero Lead Form State
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("Solo");
  const [practiceArea, setPracticeArea] = useState<string>("Personal injury");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copy = {
    en: {
      tag: "Law Firm SEO · Albuquerque, NM",
      h1Prefix: "Albuquerque Law Firm SEO:",
      h1Highlight: "Be the Lawyer Your Community Trusts",
      sub: "Albuquerque law firm SEO translates your hard-earned Bernalillo County courtroom reputation into Google Map Pack dominance, page-one rankings, and bilingual AI answers in English and Spanish — so injured and high-stakes New Mexico clients call your office first.",
      cta1: "Get My Free Reality Check",
      cta2: "See Bilingual Strategy",
      note: "One firm per practice area · Month-to-month terms · Founder-led strategy",
    },
    es: {
      tag: "SEO para Abogados · Albuquerque, NM",
      h1Prefix: "SEO para Abogados en Albuquerque:",
      h1Highlight: "Que Su Comunidad lo Encuentre Primero",
      sub: "El SEO para abogados en Albuquerque lleva su reputación en el Condado de Bernalillo al Map Pack de Google, la primera página orgánica y respuestas de IA en inglés y español para atraer casos calificados mes a mes.",
      cta1: "Quiero Mi Diagnóstico Gratis",
      cta2: "Ver Cómo Funciona",
      note: "Exclusividad por área de práctica · Términos mes a mes · Dirigido por el fundador",
    },
  };

  const current = copy[lang];

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
          name: name || "Albuquerque Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "albuquerque:hero-lead-form",
          notes: `Requested Albuquerque Hero Reality Check (${lang.toUpperCase()}). Firm Size: ${firmSize}, Practice: ${practiceArea}`,
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bilingual Language Switcher */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                lang === "en"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-neutral-950"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                lang === "es"
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-neutral-950"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              Español
            </button>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {lang === "en" ? "Bilingual EN/ES search architecture" : "Estrategia bilingüe EN/ES activa"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                {current.tag}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                1-Firm Practice Exclusivity
              </div>
            </div>

            {/* Solid Black H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.14]">
              {current.h1Prefix}{" "}
              <span className="underline decoration-slate-300 decoration-2 underline-offset-8">
                {current.h1Highlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {current.sub}
            </p>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">2nd Jud.</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Bernalillo Court Silos</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">EN + ES</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Dual-Language Intake</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">Zero</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Long-Term Lock-In</p>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#reality-check"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-950 border border-slate-300 font-semibold text-sm transition-all"
              >
                <span>{current.cta1}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#bilingual-edge"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:text-neutral-950 underline underline-offset-4"
              >
                <span>{current.cta2}</span>
              </a>
            </div>

            {/* Trust points */}
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
                Founder-led strategy
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HERO LEAD CAPTURE FORM */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 mb-1.5">
                    <Clock className="w-3 h-3 text-neutral-800" />
                    Free 24-Hour Bernalillo Audit
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                    Get Your Albuquerque Reality Check
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
                    Thank you. Mubashar will personally audit your Albuquerque rankings, bilingual search visibility, and local competitors, and email your 24-hour teardown directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="abq-hero-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="abq-hero-name"
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="abq-hero-website" className="block text-xs font-semibold text-slate-700 mb-1">
                      Firm Website <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      id="abq-hero-website"
                      type="text"
                      required
                      placeholder="abqlawfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="abq-hero-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      id="abq-hero-email"
                      type="email"
                      required
                      placeholder="you@abqlawfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900"
                    />
                  </div>

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

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Primary Practice Area
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Personal injury", "Criminal defense", "Family law", "Med mal", "Estate", "Other"].map((area) => (
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
                    <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                  )}

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
