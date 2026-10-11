"use client";

import React from "react";
import { Handshake, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AlbuquerqueHonestyPledge() {
  const pillars = [
    {
      title: "You Bring the Community",
      desc: "Your courtroom stories, trial victories, attorney bios, and Bernalillo County relationships shape every page. We interview your attorneys personally and never invent superficial local claims.",
      highlight: "Authentic Local Depth",
    },
    {
      title: "We Bring the Technical Engine",
      desc: "High-volume bilingual search data, Google AI Overview reverse-engineering, schema architecture, and technical local SEO — run personally by Founder Mubashar Sharif.",
      highlight: "Founder-Led Execution",
    },
    {
      title: "Proof Before Long-Term Trust",
      desc: "Transparent month-to-month terms, monthly call attribution reports, and zero lock-in contracts. If we do not generate qualified case inquiries, you are free to leave at any time.",
      highlight: "Zero Lock-In Contracts",
    },
  ];

  return (
    <section className="py-20 bg-[#0a0f2e] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-[#EEEDFE] text-xs font-bold uppercase tracking-wider mb-3">
            <Handshake className="w-3.5 h-3.5 text-[#EEEDFE]" />
            <span>Our Honesty Pledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            We Are a Remote Team. We Will Not Pretend to Be Your Neighbors.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            In a legal market built on personal reputation and genuine trust, you deserve complete transparency about who you hire. We do not maintain a superficial vanity office on Lomas Blvd. We deliver superior legal search rankings because we combine your courtroom expertise with elite technical execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#534AB7]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#EEEDFE] uppercase tracking-wider bg-[#534AB7]/20 px-2.5 py-1 rounded-md inline-block mb-4">
                  {pillar.highlight}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 mt-6 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1a7d59]" />
                <span>Verified in Client Agreement</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
