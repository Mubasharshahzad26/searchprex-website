"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export default function DentonBurdenLifted() {
  const [selectedBurdens, setSelectedBurdens] = useState<boolean[]>([false, false, false, false, false, false]);

  const burdens = [
    {
      title: "The ad bills keep coming and the signed cases do not",
      solution: "Handled: I build permanent organic leads that compound over time, running alongside your ads until conversion numbers prove you can trim ad spend.",
    },
    {
      title: "Dallas–Fort Worth mega-firms sit above me on Google",
      solution: "Handled: We build hyper-local Denton County pages, campus student defense guides, and local court procedural content they will never write.",
    },
    {
      title: "Quiet Mondays and stressful feast-or-famine months",
      solution: "Handled: Steady, compounding organic visibility that brings continuous inquiries regardless of whether an ad auction budget is active.",
    },
    {
      title: "My last agency promised big numbers and disappeared",
      solution: "Handled: Direct access to Founder Mubashar Sharif, weekly Monday progress updates, and a written 90-day money-back milestone guarantee.",
    },
    {
      title: "I do not have time to manage complex SEO tasks",
      solution: "Handled: I do the heavy technical lifting. You give me one brief kickoff call, review our monthly reports, and approve the copy.",
    },
    {
      title: "I don't understand how AI search and ChatGPT work for lawyers",
      solution: "Handled: We implement structured schema and track whether Google AI Overviews, ChatGPT, and Gemini cite your firm, explained in plain English.",
    },
  ];

  const toggleBurden = (index: number) => {
    const updated = [...selectedBurdens];
    updated[index] = !updated[index];
    setSelectedBurdens(updated);
  };

  const count = selectedBurdens.filter(Boolean).length;
  const progressPercent = Math.round((count / burdens.length) * 100);

  const getMessage = () => {
    if (count === 0) return "Click the items that feel true to your firm. I will show you how each one gets solved.";
    if (count <= 3) return "That is meaningful weight lifted already. You shouldn't have to carry client acquisition alone.";
    if (count <= 5) return "Almost there. Your focus belongs in the courtroom helping Denton clients, not fighting Google algorithms.";
    return "All 6 burdens handled. Now let me prove it with our 90-day guarantee.";
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Attorney Stress Relief</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Take a Breath. Tell Me What&apos;s Heavy, and I&apos;ll Show You Who Carries It.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Running a solo or boutique practice in Denton County is demanding enough without the added anxiety of quiet phones and wasteful marketing invoices. Click your current frustrations below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Interactive Burden Buttons */}
          <div className="lg:col-span-7 space-y-3">
            {burdens.map((item, idx) => {
              const isSelected = selectedBurdens[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleBurden(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-[#EEEDFE]/50 border-[#534AB7] shadow-sm"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#534AB7]" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-base font-bold ${
                          isSelected ? "text-[#0a0f2e]" : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {isSelected && (
                        <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed animate-in fade-in-50 duration-200">
                          <strong className="text-[#1a7d59]">How I Carry It:</strong>{" "}
                          {item.solution}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Weight Lifted Summary Card */}
          <div className="lg:col-span-5 bg-[#0a0f2e] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 sticky top-24">
            <div className="text-xs font-bold text-[#EEEDFE] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Weight Lifted Tracker</span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white mb-2">
              {count} / 6 <span className="text-lg font-normal text-slate-400">Burdens Handled</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden my-4">
              <div
                className="h-full bg-gradient-to-r from-[#534AB7] to-[#1a7d59] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {getMessage()}
            </p>

            <div className="pt-5 border-t border-slate-800 flex flex-col gap-3">
              <a
                href="#talk-to-me"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Hand This Off to Mubashar Sharif</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-center text-slate-400">
                Backed by our 90-day money-back milestone guarantee.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
