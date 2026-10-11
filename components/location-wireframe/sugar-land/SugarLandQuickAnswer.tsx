"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, UserCheck, ShieldCheck } from "lucide-react";

export default function SugarLandQuickAnswer() {
  const jumpLinks = [
    { label: "Client Needs", href: "#archetypes" },
    { label: "The Rescue Plan", href: "#feelings-rescue" },
    { label: "4-Step Process", href: "#rescue-steps" },
    { label: "Pricing & PPC Comparison", href: "#pricing" },
    { label: "Fort Bend Submarkets", href: "#nearby" },
    { label: "Legal Keywords", href: "#keywords" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Answer Definition Card */}
        <div className="rounded-3xl border-2 border-[#534AB7]/30 bg-[#EEEDFE]/20 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Answer-First Architecture · Built for Google AI Overviews &amp; Perplexity</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            What is law firm SEO in Sugar Land?
          </h2>

          <p className="text-base sm:text-lg text-slate-800 leading-relaxed mb-6 font-medium">
            <strong>Law firm SEO in Sugar Land is the disciplined process of making your practice appear in Google&apos;s Local 3-Pack, organic search results, and AI answers when residents in Sugar Land, Missouri City, Stafford, and Richmond seek legal representation.</strong> SearchPrex engineers dedicated Fort Bend County jurisdictional hubs, optimizes your{" "}
            <Link
              href="/services/law-firm-seo/google-business-profile-for-lawyers"
              className="text-[#534AB7] underline decoration-[#534AB7]/40 underline-offset-4 font-bold hover:text-[#3C3489]"
            >
              Google Business Profile
            </Link>{" "}
            for local radius, and tracks your firm&apos;s citation frequency across{" "}
            <Link
              href="/ai-search"
              className="text-[#534AB7] underline decoration-[#534AB7]/40 underline-offset-4 font-bold hover:text-[#3C3489]"
            >
              generative AI search platforms
            </Link>
            . Monthly plans range from $1,200 to $2,500 on simple month-to-month terms, backed by an exclusive market guarantee: one firm per practice area. Explore{" "}
            <Link
              href="/services/law-firm-seo"
              className="text-[#534AB7] underline decoration-[#534AB7]/40 underline-offset-4 font-bold hover:text-[#3C3489]"
            >
              how law firm SEO works
            </Link>
            .
          </p>

          {/* E-E-A-T Attribution Badge */}
          <div className="pt-4 border-t border-indigo-200/50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#534AB7]" />
              <span>
                Authored by{" "}
                <Link
                  href="/experts"
                  className="font-bold text-[#0a0f2e] hover:underline"
                >
                  Mubashar Sharif, Certified SEO Analyst
                </Link>{" "}
                · Founder &amp; Principal Strategist
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1a7d59]" />
              <span>Fort Bend Legal Review · Month-to-Month Retainer</span>
            </div>
          </div>
        </div>

        {/* Quick jump navigation chips */}
        <div className="mt-8 flex items-center gap-2 flex-wrap text-xs sm:text-sm">
          <span className="font-extrabold text-[#0a0f2e] mr-2">Jump to section:</span>
          {jumpLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-[#534AB7] text-slate-700 font-semibold border border-slate-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
