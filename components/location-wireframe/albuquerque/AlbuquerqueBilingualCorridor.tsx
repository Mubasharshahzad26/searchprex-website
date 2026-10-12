"use client";

import React from "react";
import Link from "next/link";
import { Languages, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function AlbuquerqueBilingualCorridor() {
  const sampleSearches = [
    { es: '"abogado de DWI en Albuquerque"', en: "DWI lawyer in Albuquerque", intent: "Urgent arrest defense" },
    { es: '"divorcio bienes comunitarios Nuevo México"', en: "Community property divorce New Mexico", intent: "High-value asset division" },
    { es: '"abogado de accidentes cerca de mí"', en: "Accident lawyer near me", intent: "Immediate collision intake" },
    { es: '"abogado de lesiones personales Albuquerque"', en: "Personal injury lawyer Albuquerque", intent: "Contingency injury claim" },
    { es: '"custodia de hijos abogado Nuevo México"', en: "Child custody lawyer New Mexico", intent: "Family court petition" },
    { es: '"defensa criminal abogado Bernalillo"', en: "Criminal defense lawyer Bernalillo", intent: "Metropolitan Court docket" },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Languages className="w-3.5 h-3.5" />
              <span>Two Languages · One Legal Community</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-5 leading-tight">
              Spanish-Speaking Clients Are Searching in Albuquerque. Almost No Law Firms Answer.
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              With <strong className="text-slate-900 font-bold">49.8% of New Mexico&apos;s population identifying as Hispanic or Latino</strong>, bilingual search demand is not an afterthought — it is half the market. Yet nearly every Albuquerque law firm website is 100% English only, leaving thousands of urgent legal searches uncontested.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900 font-bold">Native-Speaker Review:</strong> Every Spanish page is reviewed and calibrated by native Spanish speakers — never machine-translated gibberish that harms your firm&apos;s dignity.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900 font-bold">Proper Hreflang Tagging:</strong> Precise bidirectional <code className="text-xs bg-slate-100 text-neutral-900 px-1.5 py-0.5 rounded font-mono">hreflang=&quot;es&quot;</code> and <code className="text-xs bg-slate-100 text-neutral-900 px-1.5 py-0.5 rounded font-mono">hreflang=&quot;en&quot;</code> architecture prevents duplicate content penalties and instructs Google exactly which audience to serve.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900 font-bold">Spanish LegalService Schema:</strong> Structured data entities declaring Spanish language capabilities directly to Google AI Overviews and Gemini search engines.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#reality-check"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-md shadow-sm transition-all"
              >
                <span>Audit Your Bilingual Search Gap</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Card: High-Intent Spanish Searches */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-5">
                <div>
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Untapped High-Intent Search Queries
                  </span>
                  <h3 className="text-lg font-bold text-neutral-950">
                    Albuquerque Spanish Practice Keywords
                  </h3>
                </div>
                <span className="text-xs font-bold text-neutral-800 bg-slate-100 px-2.5 py-1 rounded-full">
                  High Volume · Low Competition
                </span>
              </div>

              <div className="grid gap-3">
                {sampleSearches.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">
                        {item.es}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.en}
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-900 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
                      {item.intent}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-neutral-800" />
                  Includes Spanish Click-to-Call Intake Routing
                </span>
                <span>Bernalillo County</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
