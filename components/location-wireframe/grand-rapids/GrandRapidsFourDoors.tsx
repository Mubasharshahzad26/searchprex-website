"use client";

import React from "react";
import { MapPin, FileText, Sparkles, Star, ArrowUpRight } from "lucide-react";

const DOORS = [
  {
    icon: MapPin,
    title: "Map Pack",
    desc: "Top-three local visibility for searches like 'divorce lawyer near me' or 'car accident attorney Grand Rapids'. Phone-ready traffic directly from Google Maps.",
    badge: "Direct Phone Calls",
  },
  {
    icon: FileText,
    title: "Practice pages",
    desc: "One dedicated page per case type and Kent County suburb that directly answers the exact statutory question the prospective client typed into search.",
    badge: "High-Intent Retainers",
  },
  {
    icon: Sparkles,
    title: "AI answers",
    desc: "Entity-backed content architecture structured so Google AI Overviews, Perplexity, and ChatGPT cite your attorneys as the authoritative West Michigan source.",
    badge: "Future-Proof Visibility",
  },
  {
    icon: Star,
    title: "Reviews and referrals",
    desc: "In a tight-knit West Michigan community, neighbors verify reviews and trial reputations before calling. We build systems that turn clients into 5-star advocates.",
    badge: "Social Trust Proof",
  },
];

export default function GrandRapidsFourDoors() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#534AB7] uppercase tracking-wider bg-[#EEEDFE] px-3 py-1 rounded-full border border-[#534AB7]/20">
            FOUR DOORS CLIENTS KNOCK ON
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0f2e] mt-4 tracking-tight">
            Leads that arrive at your door, not your ad dashboard
          </h2>
          <p className="text-[#566070] text-sm sm:text-base mt-2">
            Instead of buying ephemeral clicks from Google Ads auctions, we construct four permanent acquisition assets for your firm.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOORS.map((door, idx) => {
            const Icon = door.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-[#534AB7]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#EEEDFE] border border-slate-200 group-hover:border-[#534AB7]/20 text-[#534AB7] flex items-center justify-center mb-5 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a7d59] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {door.badge}
                  </span>

                  <h3 className="text-lg font-bold text-[#0a0f2e] mt-3 group-hover:text-[#534AB7] transition-colors">
                    {door.title}
                  </h3>

                  <p className="text-sm text-[#566070] mt-2.5 leading-relaxed">
                    {door.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-200/60 mt-6 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#534AB7] transition-colors">
                  <span>Door {idx + 1}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
