"use client";

import React from "react";
import { ShieldCheck, Calendar, Zap, CheckCircle2 } from "lucide-react";

const RISK_ITEMS = [
  {
    icon: ShieldCheck,
    title: "You own it 100%",
    desc: "Your Google Business Profile, analytics, CallRail numbers, and all published content stay in your accounts. If we ever part ways, everything stays live on your domain.",
    highlight: "Zero proprietary lock-in",
  },
  {
    icon: Calendar,
    title: "Month-to-month agreements",
    desc: "No 12-month handcuffs. We operate entirely on month-to-month retainers. We have to earn your renewal every 30 days through signed case data.",
    highlight: "Cancel anytime with 30 days notice",
  },
  {
    icon: Zap,
    title: "Ads stay on until proven",
    desc: "We never ask you to cut your paid ads or disrupt intake before organic leads prove themselves in your CallRail dashboard. You scale ads down only when data supports it.",
    highlight: "Safe transition without intake dip",
  },
  {
    icon: CheckCircle2,
    title: "No guarantees we can't keep",
    desc: "In compliance with MRPC Rule 7 and ethical search standards, we do not promise fictional #1 rankings. We provide clear milestone deliverables and verifiable monthly intake logs.",
    highlight: "MRPC Rule 7 compliant transparency",
  },
];

export default function GrandRapidsRiskReversal() {
  return (
    <section className="bg-slate-50/70 py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            RISK REVERSAL
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mt-4 tracking-tight">
            What You Keep, No Matter What
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Most legal marketing agencies hold your website or Google Business Profile hostage. Here is our explicit commitment to Grand Rapids attorneys:
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RISK_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-neutral-800 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-950 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-6 text-xs font-bold text-neutral-800">
                  • {item.highlight}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
