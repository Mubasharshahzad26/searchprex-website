"use client";

import React from "react";
import { UserCheck, Code2, Users, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export default function DentonWhyIUnderstand() {
  const pillars = [
    {
      title: "I Run on the Same Engine",
      desc: "I run my own founder-led agency, so I understand the visceral stress of payroll, overhead, and quiet consultation phones. I don't treat your marketing budget like monopoly money.",
      icon: UserCheck,
    },
    {
      title: "I Work at the Crawl Level",
      desc: "Over 5 years of deep technical and local SEO. I don't guess based on surface symptoms; I diagnose canonical tags, schema trees, crawl budgets, and geo-grid coordinates.",
      icon: Code2,
    },
    {
      title: "I Studied Your Real Searcher",
      desc: "The panicked mother calling from Houston or Midland when her child is booked into Denton County Jail. The stressed UNT student. The newcomer without family recommendations.",
      icon: Users,
    },
    {
      title: "I Never Work Against You",
      desc: "Strict exclusivity: one firm per practice area in Denton County. When you partner with SearchPrex, I will never accept your courtroom competitor down the hall as a client.",
      icon: ShieldAlert,
    },
    {
      title: "I Track Generative AI Search",
      desc: "Search isn't just blue links anymore. We monitor entity citations across Google AI Overviews, Gemini, and ChatGPT to ensure your firm is recommended directly.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Strategic Alignment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Why I Understand Your Problem: Not Because I Say So. Because of Where I Stand.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Five concrete reasons why SearchPrex approaches legal growth with authentic accountability, deep technical rigor, and zero conflicts of interest.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#534AB7]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#534AB7]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#534AB7]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0a0f2e] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#1a7d59] mt-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Principle</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
