"use client";

import React, { useState } from "react";
import { HeartHandshake, HelpCircle, Clock, FileText, CheckCircle2 } from "lucide-react";

export default function AlbuquerqueEmotionalIntent() {
  const [selectedArea, setSelectedArea] = useState<number>(0);

  const practiceData = [
    {
      name: "DWI Defense",
      tagline: "Arrested on Coors Blvd or I-25 · License Clock Ticking",
      feeling: "Fear, embarrassment, and panic about immediate job loss",
      search2am: '"DWI lawyer Albuquerque open now", "will I lose my license in New Mexico MVD hearing"',
      needsToRead: "A calm, non-judgmental explanation of the 10-day MVD hearing deadline, ignition interlock requirements, and immediate bail steps.",
      tone: "Steady, reassuring, and procedural. Zero scare tactics. Clear instructions on what to do tonight.",
    },
    {
      name: "Divorce & Family Law",
      tagline: "Marital Breakdown · Home & Child Custody Stakes",
      feeling: "Severe emotional overwhelm, grief, and financial uncertainty",
      search2am: '"community property divorce New Mexico", "what happens to my home in Albuquerque"',
      needsToRead: "A clear, empathetic breakdown of how New Mexico's 50/50 community property statute applies to marital debts, retirement accounts, and parenting plans.",
      tone: "Warm, measured, and highly practical. Concise sentences with an answer-first clarity that reduces anxiety.",
    },
    {
      name: "Personal Injury",
      tagline: "Severe Crash on Paseo del Norte or I-40 Corridor",
      feeling: "Physical pain, shock, and rising terror about unpaid medical bills",
      search2am: '"who pays medical bills after a crash Albuquerque", "car accident lawyer near me"',
      needsToRead: "Reassurance that they will not be alone against aggressive insurance adjusters, pure comparative fault rules, and zero upfront fee clarity.",
      tone: "Empathetic, firm, and protective. Direct explanations of insurance claim limits and medical lien resolution.",
    },
    {
      name: "Criminal Defense",
      tagline: "Second Judicial District Court Arraignment",
      feeling: "Fear for family, personal liberty, and long-term reputation",
      search2am: '"bail Bernalillo County Metropolitan Court", "criminal defense attorney near me"',
      needsToRead: "Calm procedural competence outlining what happens at the first appearance, pretrial conditions of release, and rapid attorney contact.",
      tone: "Composed, authoritative, and direct. Zero false promises. Rapid and accessible click-to-call routing.",
    },
  ];

  const current = practiceData[selectedArea];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Search Psychology &amp; Emotional Intent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            People Do Not Search for a Lawyer. They Search at Their Lowest Moment.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Albuquerque is a relationship city. When someone faces an urgent legal crisis, aggressive billboard slogans cause skepticism. The firm whose website speaks calmly, explains New Mexico law in plain English and Spanish, and demonstrates empathy wins the retainer.
          </p>
        </div>

        {/* Practice Area Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {practiceData.map((item, idx) => {
            const isActive = selectedArea === idx;
            return (
              <button
                key={item.name}
                onClick={() => setSelectedArea(idx)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isActive
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: What they feel */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <HelpCircle className="w-4 h-4 text-[#534AB7]" />
                <span>What They Feel</span>
              </div>
              <h3 className="text-lg font-bold text-[#0a0f2e] mb-2 leading-snug">
                {current.feeling}
              </h3>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/80 mt-4">
              {current.tagline}
            </div>
          </div>

          {/* Card 2: What they search at 2 a.m. */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Clock className="w-4 h-4 text-[#534AB7]" />
                <span>Searched at 2 A.M.</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 italic bg-white p-3.5 rounded-xl border border-slate-200/60 leading-relaxed">
                {current.search2am}
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/80 mt-4">
              High commercial intent
            </div>
          </div>

          {/* Card 3: What they need to read */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4 text-[#1a7d59]" />
                <span>What They Need to Read</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.needsToRead}
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/80 mt-4">
              Procedural certainty
            </div>
          </div>

          {/* Card 4: Our Content Tone (Highlighted) */}
          <div className="rounded-2xl p-6 bg-[#0a0f2e] text-white border border-[#3C3489] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#EEEDFE] uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Our Content Tone</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {current.tone}
              </p>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-slate-800 mt-4 flex items-center justify-between">
              <span>Bilingual Review</span>
              <span className="text-emerald-400 font-bold">100% Native Checked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
