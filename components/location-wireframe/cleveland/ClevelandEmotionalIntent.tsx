"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeartHandshake, ArrowRight, ShieldCheck, Heart, User } from "lucide-react";

const EMOTIONS = [
  {
    name: "Workers' comp",
    feels: "Fear for household income, disability benefits, and retaliation from their employer.",
    searches: ['"injured at work Ohio what to do"', '"BWC claim denied appeal lawyer"', '"Ohio workers comp average settlement"'],
    needs: "A step-by-step, plain-English roadmap explaining the Bureau of Workers' Compensation claim filing, Industrial Commission hearing protocol, and how allowed conditions work in Ohio.",
    tone: "Direct, reassuring, and procedural.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Workers' Comp & Injury SEO",
  },
  {
    name: "Personal injury",
    feels: "Intense physical pain, stacking medical bills, and confusion dealing with aggressive insurance adjusters.",
    searches: ['"truck accident Cleveland what to do"', '"who pays hospital bills after car crash OH"', '"how long do I have to file lawsuit Cuyahoga"'],
    needs: "Clear, urgent next steps to preserve evidence, understand Ohio's comparative fault rules, and secure immediate medical lien guidance without sales pressure.",
    tone: "Empathetic, clear, and reassuring.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Personal injury SEO",
  },
  {
    name: "OVI & criminal defense",
    feels: "Acute panic, intense embarrassment, and anxiety over driver's license suspension or job loss.",
    searches: ['"OVI first offense Ohio penalties"', '"administrative license suspension appeal Cleveland"', '"Cuyahoga County court arraignment lawyer"'],
    needs: "Non-judgmental, immediate procedural instructions detailing the 30-day ALS appeal deadline, Cleveland Municipal Court expectations, and rights preservation.",
    tone: "Steady, objective, and non-judgmental.",
    href: "/services/law-firm-seo/criminal-defense",
    linkLabel: "Criminal defense SEO",
  },
  {
    name: "Medical malpractice",
    feels: "Profound grief, betrayal, and lingering doubt following an unexpected surgical or hospital tragedy.",
    searches: ['"hospital error lawyer Cleveland"', '"how to prove surgical negligence Ohio"', '"statute of limitations medical malpractice OH"'],
    needs: "Credible legal-medical standards, explanation of Ohio's 180-day 1-year statute and Affidavit of Merit requirements, handled with deep institutional credibility.",
    tone: "Serious, compassionate, and clinically grounded.",
    href: "/services/law-firm-seo/personal-injury",
    linkLabel: "Medical malpractice SEO",
  },
];

export default function ClevelandEmotionalIntent() {
  const [selectedEmotion, setSelectedEmotion] = useState(0);
  const current = EMOTIONS[selectedEmotion];

  return (
    <section id="feel" className="scroll-mt-20 border-b border-slate-200 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            09 · Client Psychological Intent
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Client Search Intent: Converting High-Pressure Legal Inquiries
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Cleveland residents searching after a workplace accident or an urgent legal dispute seek clear authority and rapid resolution. Learn how our{" "}
            <Link href="/services/law-firm-seo" className="font-semibold text-[#534AB7] underline hover:text-[#3C3489]">
              legal content architecture
            </Link>{" "}
            converts distressed searchers into retained clients.
          </p>
        </div>

        {/* Emotion selector tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {EMOTIONS.map((emo, idx) => {
            const isSelected = selectedEmotion === idx;
            return (
              <button
                key={emo.name}
                onClick={() => setSelectedEmotion(idx)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/30 scale-[1.02]"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 hover:scale-[1.01]"
                }`}
              >
                {emo.name}
              </button>
            );
          })}
        </div>

        {/* 4-Column emotional analysis display with card animations */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: What they feel */}
          <div className="group rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/40 hover:-translate-y-1.5 transition-all duration-300">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Emotional State
            </span>
            <h4 className="text-base font-bold text-[#0a0f2e] mb-2 group-hover:text-[#534AB7] transition-colors">
              What They Feel
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {current.feels}
            </p>
          </div>

          {/* Card 2: What they quietly search */}
          <div className="group rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:shadow-[#534AB7]/10 hover:border-[#534AB7]/40 hover:-translate-y-1.5 transition-all duration-300 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-1">
              Private Search Queries
            </span>
            <h4 className="text-base font-bold text-[#0a0f2e] mb-2 group-hover:text-[#534AB7] transition-colors">
              They Quietly Type
            </h4>
            {current.searches.map((s, i) => (
              <div key={i} className="text-xs font-mono text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 group-hover:bg-indigo-50/20 transition-colors">
                {s}
              </div>
            ))}
          </div>

          {/* Card 3: What they need to read */}
          <div className="group rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:shadow-[#1a7d59]/10 hover:border-[#1a7d59]/40 hover:-translate-y-1.5 transition-all duration-300">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a7d59] block mb-2">
              Content Expectation
            </span>
            <h4 className="text-base font-bold text-[#0a0f2e] mb-2 group-hover:text-[#1a7d59] transition-colors">
              They Need to Read
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {current.needs}
            </p>
          </div>

          {/* Card 4: Our page tone & practice link */}
          <div className="group rounded-3xl border-2 border-[#534AB7] bg-gradient-to-br from-[#EEEDFE]/80 via-white to-white p-6 shadow-md hover:shadow-2xl hover:shadow-[#534AB7]/20 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-2">
                Conversion Copywriting
              </span>
              <h4 className="text-base font-bold text-[#0a0f2e] mb-1">
                Our Page Tone
              </h4>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                {current.tone}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#534AB7]/20">
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#534AB7] hover:underline"
              >
                <span>{current.linkLabel}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
