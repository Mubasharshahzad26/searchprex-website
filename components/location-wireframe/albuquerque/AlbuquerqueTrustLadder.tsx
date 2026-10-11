"use client";

import React, { useState } from "react";
import { TrendingUp, UserCheck, ShieldCheck, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";

export default function AlbuquerqueTrustLadder() {
  const [selectedRung, setSelectedRung] = useState<number>(0);

  const rungs = [
    {
      step: 1,
      name: "Stranger",
      progress: "12%",
      icon: UserCheck,
      clientThinks: '"I have an urgent legal problem in Albuquerque, and I don\'t know who to trust."',
      buildsTrust: "A clear, grounded, human first impression on Google rather than an aggressive billboard ad.",
      whatSearchPrexDoes: "We write title tags, meta descriptions, and Google Business Profile narratives that sound like a trustworthy local counselor, not an automated template.",
    },
    {
      step: 2,
      name: "Searches",
      progress: "32%",
      icon: Sparkles,
      clientThinks: '"Let me ask Google or an AI tool what happens under New Mexico law."',
      buildsTrust: "Direct, answer-first explanations written in plain English and Spanish matching their specific search query.",
      whatSearchPrexDoes: "We architect question-and-answer silos optimized for Google AI Overviews and Gemini citations, citing exact NM statutes and court venues.",
    },
    {
      step: 3,
      name: "Compares",
      progress: "55%",
      icon: TrendingUp,
      clientThinks: '"Who are these firms? Which attorney is an authentic part of our community?"',
      buildsTrust: "Authentic client reviews, local business citations, and genuine neighborhood presence across Bernalillo County.",
      whatSearchPrexDoes: "We build compliant review acquisition workflows and local citations that prove deep local roots in Nob Hill, Westside, and Downtown.",
    },
    {
      step: 4,
      name: "Checks",
      progress: "78%",
      icon: ShieldCheck,
      clientThinks: '"Do they actually know the Second Judicial District Court and New Mexico practice?"',
      buildsTrust: "Attorney credentials, courtroom familiarity, and transparent explanations of legal procedures.",
      whatSearchPrexDoes: "We structure attorney bios with Schema.org markup, highlight local bar memberships, and showcase proven track records.",
    },
    {
      step: 5,
      name: "Calls",
      progress: "100%",
      icon: PhoneCall,
      clientThinks: '"I feel secure enough to pick up the phone and schedule a consultation."',
      buildsTrust: "A frictionless, responsive way to speak with an attorney without waiting on hold or getting lost in automated menus.",
      whatSearchPrexDoes: "We implement Whisper call tracking, instant missed-call text-back, and bilingual intake reviews so zero inquiries leak.",
    },
  ];

  const current = rungs[selectedRung];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>The Trust Ladder Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            In a Community Market, Trust is Earned One Rung at a Time
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Out-of-state directory giants skip the trust ladder and rely on brute force ad spend. In Albuquerque, a local firm that climbs each rung systematically wins the client&apos;s confidence before they even make the phone call.
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <span>Client Conversion Journey</span>
            <span className="text-[#534AB7]">Stage {current.step} of 5 ({current.progress} Trust Built)</span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-[#534AB7] to-[#1a7d59] transition-all duration-500 rounded-full"
              style={{ width: current.progress }}
            />
          </div>

          {/* Rung Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {rungs.map((item, idx) => {
              const isActive = selectedRung === idx;
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedRung(idx)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    isActive
                      ? "bg-[#534AB7] text-white border-[#534AB7] shadow-md shadow-[#534AB7]/20"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#534AB7]"}`} />
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                      Step {item.step}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm sm:text-base">
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Detail Columns for Selected Rung */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Col 1: The Client Thinks */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                1. The Client Thinks
              </div>
              <p className="text-base sm:text-lg font-bold text-[#0a0f2e] italic leading-relaxed">
                {current.clientThinks}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 mt-6">
              Searcher mental friction point
            </div>
          </div>

          {/* Col 2: What Builds Trust */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#1a7d59] uppercase tracking-wider mb-3">
                2. What Builds Trust
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {current.buildsTrust}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 mt-6">
              Reassurance criteria
            </div>
          </div>

          {/* Col 3: What SearchPrex Does */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#534AB7] shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#534AB7] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#534AB7]" />
                <span>3. What SearchPrex Executes</span>
              </div>
              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                {current.whatSearchPrexDoes}
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-100 text-xs text-[#534AB7] font-bold mt-6">
              Included in our monthly retainer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
