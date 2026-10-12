"use client";

import React from "react";
import { Landmark, MapPin, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function KatyVsHoustonPillars() {
  const pillars = [
    {
      icon: Landmark,
      title: "Name the County Courts",
      desc: "Harris, Fort Bend, and Waller courts must be explicitly named where each applies. When prospective clients and AI scrapers see exact judicial districts cited, you establish undeniable jurisdictional competence.",
      benefit: "Displaces generic Houston mega-firms who lump Katy into vague 'Greater Houston' pages.",
      color: "text-neutral-900",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300",
    },
    {
      icon: MapPin,
      title: "Own the Communities",
      desc: "Cinco Ranch, Fulshear, Firethorne, and Brookshire are searched on their own by high-income residents. Separate, genuinely localized pages win these queries while competitors ignore them.",
      benefit: "Captures high-net-worth divorce, wealth preservation, and family law searches close to home.",
      color: "text-neutral-800",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300",
    },
    {
      icon: Sparkles,
      title: "Be the Citable Answer",
      desc: "We write answer-first legal definitions backed by LegalService and FAQPage schema so that Google AI Overviews, Perplexity, and ChatGPT directly quote your firm as the leading local authority.",
      benefit: "Secures top citations in generative AI engine summaries before users ever click organic links.",
      color: "text-neutral-900",
      bgColor: "bg-[#262626]/10",
      borderColor: "border-[#262626]/30",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Katy, Not Houston · Local Positioning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Katy Clients Search for Katy. Houston Firms Answer.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Downtown Houston law firms hold rankings on legacy domain strength, but they don&apos;t understand Katy. Three strategic differentiators allow local practices to claim the market.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${p.bgColor} ${p.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    Competitive Advantage:
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    {p.benefit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
