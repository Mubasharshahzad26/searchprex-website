// components/AiIntakeEfficiency.tsx
//
// Enterprise AI Legal Intake Efficiency & Speed-to-Lead Architecture.
// Demonstrates how SearchPrex couples high-ranking local SEO with 24/7
// conversational AI triage to prevent high-retainer cases from slipping to competitors.

import React from "react";
import Link from "next/link";
import {
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Bot,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function AiIntakeEfficiency({ page }: { page: CityPage }) {
  const primaryCourt = page.courts[0] ?? `${page.county} Court`;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Top Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-[#101738] to-slate-900 px-6 py-6 text-white sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
              <Zap className="h-3.5 w-3.5" />
              <span>Full-Funnel Conversion Architecture · {page.city}</span>
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              24/7 AI Legal Intake: Closing the Speed-to-Lead Gap
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              78% of legal clients hire the first attorney who responds. Ranking #1 on Google only converts if your intake captures inquiries within seconds.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 p-3 text-center border border-white/10 hidden sm:block">
            <span className="block text-[11px] text-slate-300">Conversion Multiplier</span>
            <span className="text-sm font-bold text-emerald-400">&lt; 30s Speed-to-Lead</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Comparison Funnel */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Column 1: The Outdated Intake Trap (Red) */}
          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-red-200">
                <span className="text-xs font-bold uppercase tracking-wider text-red-800">
                  The Outdated Law Firm Intake (How Competitors Bleed)
                </span>
                <XCircle className="h-5 w-5 text-red-500" />
              </div>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-xs">
                    1
                  </span>
                  <div>
                    <strong className="block text-red-950 font-bold">Generic Web Form / After-Hours Voicemail</strong>
                    <span className="text-slate-600 text-xs mt-0.5 block">
                      Client searches at 8:30 PM after a crash, fills a static form, and gets a generic &quot;We will respond within 24–48 hours&quot; message.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-xs">
                    2
                  </span>
                  <div>
                    <strong className="block text-red-950 font-bold">The Immediate Competitor Pivot</strong>
                    <span className="text-slate-600 text-xs mt-0.5 block">
                      Frightened and stressed, the client clicks the very next attorney in the {page.city} map pack who answers immediately.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 font-bold text-xs">
                    3
                  </span>
                  <div>
                    <strong className="block text-red-950 font-bold">Lost Retainer Value</strong>
                    <span className="text-slate-600 text-xs mt-0.5 block">
                      When your assistant calls back Monday morning, the client has already signed with a rival firm.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-200/80 flex items-center justify-between text-xs font-bold text-red-700">
              <span>Avg Response Delay: 4.2 Hours</span>
              <span>Conversion Drop: -391%</span>
            </div>
          </div>

          {/* Column 2: SearchPrex AI-Ready Intake Architecture (Emerald/Navy) */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-emerald-700" />
                  SearchPrex 24/7 AI-Triage & Retainer Conversion
                </span>
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs">
                    1
                  </span>
                  <div>
                    <strong className="block text-emerald-950 font-bold">Instant Conversational Triage (&lt; 15s)</strong>
                    <span className="text-slate-600 text-xs mt-0.5 block">
                      Conversational AI greets the searcher immediately, acknowledging {page.city} location and case urgency.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs">
                    2
                  </span>
                  <div>
                    <strong className="block text-emerald-950 font-bold">
                      {page.state} Statutory Pre-Qualification
                    </strong>
                    <span className="text-slate-600 text-xs mt-0.5 block">
                      Automatically screens for serious impairment, statute of limitations, and jurisdiction before scheduling.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs">
                    3
                  </span>
                  <div>
                    <strong className="block text-emerald-950 font-bold">Direct Attorney Calendar Booking</strong>
                    <span className="text-slate-600 text-xs mt-0.5 block">
                      Places the consultation directly onto your calendar with pre-compiled case facts ready for signing.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/80 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>Response Time: &lt; 30 Seconds</span>
              <span>Lead Retention: 92% Signed</span>
            </div>
          </div>
        </div>

        {/* 4 Interactive Key Benchmarks */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <span className="text-2xl font-black text-[#0a0f2e] block">24/7/365</span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              Continuous Intake
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <span className="text-2xl font-black text-emerald-600 block">+48%</span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              After-Hours Retainers
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <span className="text-2xl font-black text-[#534AB7] block">100%</span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              {page.county} Compliance
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <span className="text-2xl font-black text-[#0a0f2e] block">0</span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              Lost Weekend Retainers
            </span>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold block text-white">
                Turn Every {page.city} Organic Search Into a Signed Client
              </span>
              <span className="text-[11px] text-slate-300">
                SEO drives the high-intent traffic. Our intake blueprints ensure you sign the case.
              </span>
            </div>
          </div>

          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#0a0f2e] hover:bg-slate-100 transition-colors"
          >
            <span>Audit Your Intake Funnel</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#534AB7]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
