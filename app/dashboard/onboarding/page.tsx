"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const router   = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState<string | null>(null);

  async function pickRole(role: "agency_client" | "pro_user") {
    setLoading(role);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    await supabase
      .from("profiles")
      .update({ role })
      .eq("id", user.id);

    if (role === "agency_client") router.push("/dashboard/agency");
    else                          router.push("/dashboard/pro");
  }

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#534AB7]/10 border border-[#534AB7]/20 rounded-full px-4 py-1.5 text-xs font-medium text-[#818cf8] mb-4">
            ✨ Almost there — one quick question
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
            What brings you to SearchPrex?
          </h1>
          <p className="text-white/40 text-base">
            We'll set up your dashboard based on your choice. You can always switch later.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Agency Client */}
          <button
            onClick={() => pickRole("agency_client")}
            disabled={loading !== null}
            className="group relative text-left bg-white/[0.03] hover:bg-[#534AB7]/10 border border-white/[0.08] hover:border-[#534AB7]/40 rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(83,74,183,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#534AB7] to-[#818cf8] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-12 h-12 rounded-xl bg-[#534AB7]/15 border border-[#534AB7]/25 flex items-center justify-center mb-5 text-2xl">
              🏢
            </div>

            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#818cf8] mb-2">
              Done-For-You
            </div>
            <h2 className="text-lg font-bold text-white mb-2 tracking-tight">
              SEO Agency Client
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              I want SearchPrex to handle my SEO — I'll get weekly reports, keyword rankings, and real-time data from my dedicated dashboard.
            </p>

            <ul className="space-y-2 text-sm text-white/50 mb-6">
              {["Weekly SEO Reports", "Live Keyword Rankings", "GSC Traffic & Clicks", "Monthly Work Log", "Direct Founder Access"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#534AB7]">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/30 font-medium">Book a free strategy call</span>
              <span className="text-[#818cf8] text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
                {loading === "agency_client" ? "Setting up…" : "Continue →"}
              </span>
            </div>
          </button>

          {/* NicheSEO Pro */}
          <button
            onClick={() => pickRole("pro_user")}
            disabled={loading !== null}
            className="group relative text-left bg-white/[0.03] hover:bg-[#0f766e]/10 border border-white/[0.08] hover:border-[#14b8a6]/40 rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(20,184,166,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#14b8a6] to-[#22d3ee] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/25 flex items-center justify-center mb-5 text-2xl">
              🤖
            </div>

            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#14b8a6] mb-2">
              Do-It-Yourself
            </div>
            <h2 className="text-lg font-bold text-white mb-2 tracking-tight">
              NicheSEO Pro Tool
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              I want to do SEO myself using AI-powered tools — site audits, content generator, rank tracker, and more.
            </p>

            <ul className="space-y-2 text-sm text-white/50 mb-6">
              {["AI Site Audit", "Content Generator", "Rank Tracker", "Keyword Research", "Competitor Analysis"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[#14b8a6]">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/30 font-medium">Start free trial — no card needed</span>
              <span className="text-[#14b8a6] text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
                {loading === "pro_user" ? "Setting up…" : "Continue →"}
              </span>
            </div>
          </button>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          You can switch between plans anytime from your dashboard settings.
        </p>
      </div>
    </div>
  );
}
