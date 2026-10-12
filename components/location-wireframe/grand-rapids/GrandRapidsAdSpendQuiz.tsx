"use client";

import React, { useState } from "react";
import { Check, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

const QUIZ_ITEMS = [
  {
    id: 1,
    text: "I pay for the click whether or not they call",
    desc: "Google charges you $75 to $250+ the second an accidental or tire-kicker visitor taps your link.",
  },
  {
    id: 2,
    text: "Ad costs keep rising but signed cases do not",
    desc: "Kent County auction bids inflate year over year while conversion rates stay flat or decline.",
  },
  {
    id: 3,
    text: "Directory leads are shared with other firms",
    desc: "Lead services like Avvo, FindLaw, or Justia distribute the same phone call to 3–5 competing attorneys.",
  },
  {
    id: 4,
    text: "The phone goes quiet the day I pause ads",
    desc: "Because paid traffic owns zero domain authority, stopping your ad credit card halts all incoming calls.",
  },
  {
    id: 5,
    text: "I cannot tell which spend produced a signed case",
    desc: "You receive raw click numbers and impressions from your agency, but zero closed retainer attribution.",
  },
];

export default function GrandRapidsAdSpendQuiz() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const count = checkedIds.length;

  const getDiagnosis = () => {
    if (count === 0) {
      return {
        badge: "Mostly fine",
        badgeColor: "bg-slate-100 text-neutral-700 border-slate-200",
        message:
          "Organic search can still add a second lead source that does not depend on an ongoing pay-per-click ad budget.",
        ctaText: "Explore Organic Growth",
      };
    }
    if (count <= 2) {
      return {
        badge: "Leaking ad spend",
        badgeColor: "bg-slate-200 text-neutral-800 border-slate-300",
        message:
          "You are paying the platform tax on cases you could own organically. Local Map Pack and high-intent practice pages will lower your blended cost per signed case.",
        ctaText: "Diagnose Leaking Clicks",
      };
    }
    if (count <= 4) {
      return {
        badge: "Ad treadmill trap",
        badgeColor: "bg-neutral-700 text-white border-neutral-700",
        message:
          "High PPC waste. You are stuck renting visibility in West Michigan — every paused dollar stops your intake cold without building permanent equity.",
        ctaText: "Break The Ad Treadmill",
      };
    }
    return {
      badge: "Severe PPC dependency",
      badgeColor: "bg-neutral-900 text-white border-neutral-900",
      message:
        "Critical waste alert. Your firm is spending thousands on low-intent clicks and shared leads with zero case attribution. An organic pivot is essential.",
      ctaText: "Request Emergency Audit",
    };
  };

  const diagnosis = getDiagnosis();

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-neutral-700 tracking-widest uppercase bg-white px-3 py-1 rounded-full border border-slate-200">
            SOUND FAMILIAR?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 tracking-tight text-neutral-950">
            Is Your Grand Rapids Ad Spend Leaking?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            No judgment. Most Grand Rapids firms we talk to check at least three.
          </p>
        </div>

        {/* 2-Column Quiz Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Checkbox List */}
          <div className="lg:col-span-7 space-y-3">
            {QUIZ_ITEMS.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all flex items-start gap-4 ${
                    isChecked
                      ? "bg-white border-neutral-900 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-neutral-900 border-neutral-900 text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-neutral-950 leading-snug">
                      {item.text}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Live Diagnosis Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-neutral-950 shadow-xl border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                YOUR RESULT
              </div>

              {/* Dynamic Score Indicator */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl sm:text-6xl font-black text-neutral-950 tracking-tight">
                  {count}
                </span>
                <span className="text-2xl sm:text-3xl font-semibold text-slate-400">
                  / 5
                </span>
              </div>

              {/* Dynamic Status Badge */}
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${diagnosis.badgeColor}`}
                >
                  {diagnosis.badge}
                </span>
              </div>

              {/* Dynamic Diagnosis Copy */}
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {diagnosis.message}
              </p>

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-100 mt-6">
                <a
                  href="#ppc-audit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 !text-white font-semibold text-sm shadow-md transition-all"
                >
                  <span>{diagnosis.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Free 24-hour Kent County PPC Waste teardown · No sales pitch
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
