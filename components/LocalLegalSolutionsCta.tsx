"use client";

// components/LocalLegalSolutionsCta.tsx
//
// Clean, professional, executive Solution CTA Section.
// Aligns directly with SearchPrex's core slogan:
// "We Came with Solution, Not Just Traditional SEO"
// Positions against high PPC ad burn ($250+/click) and delivers qualified leads
// for Solo Practitioners and Mid-Size Law Firms in the city.
// Provides a focused primary SEO Solution (Local Map 3-Pack & SERP Checker)
// with a clean tab switcher for secondary solutions (Lost Case Recovery, 24/7 AI Intake).
// Includes high-contrast dual CTAs: SearchPrex Reality Check + NicheSEO Pro SEO Brain.

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Calculator,
  Bot,
  ArrowRight,
  ExternalLink,
  Target,
  Zap,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Scale,
  MapPin,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function LocalLegalSolutionsCta({ page }: { page: CityPage }) {
  const topPractice = page.practiceDemand[0]?.area ?? "Personal Injury";
  const primaryCourt = page.courts[0] ?? `${page.county} Court`;

  const [activeTab, setActiveTab] = useState<"serp" | "lost-cases" | "ai-intake">("serp");

  const solutions = {
    serp: {
      id: "serp",
      tabLabel: "Local 3-Pack & SERP Checker",
      badge: "Primary Legal SEO Solution",
      icon: Search,
      title: `${page.city} Local Map 3-Pack & SERP Diagnostic`,
      problemAddressed: "Overspending $15,000–$30,000/mo on Google Ads PPC ($250+/click)",
      psychologyHeadline: `Understanding ${page.city} Searcher Psychology & Demographics`,
      psychologyBody: `Prospective legal clients in ${page.county} facing injury, accident, or criminal allegations do not scroll past the local map pack to click $300 ads. They call the top 3 verified firms with immediate court authority. We map their psychological urgency directly to localized practice silos that outrank TV mega-firms and directory aggregators.`,
      deliverables: [
        `Geofenced Google Map 3-pack optimization targeting high-intent ${topPractice.toLowerCase()} searchers across ${page.county}`,
        `Statutory practice silos tailored to ${primaryCourt} procedures and state rules (eliminating thin, generic pages)`,
        `AEO & GEO optimization: positioning your firm as the primary cited answer in Google Gemini and ChatGPT`,
      ],
      impact: "Captures 74% of high-intent mobile calls at $0 cost-per-click",
      ctaText: `Request Free ${page.city} SERP Audit`,
      ctaHref: "/free-audit",
    },
    "lost-cases": {
      id: "lost-cases",
      tabLabel: "Lost Case Revenue Recovery",
      badge: "Case Acquisition Solution",
      icon: Calculator,
      title: "Lost Retainer & Case Opportunity Recovery",
      problemAddressed: "Losing high-value retainers to TV mega-firms & directory brokers",
      psychologyHeadline: "Converting Statutory Research into Retained Clients",
      psychologyBody: `When prospective clients research complex statutory hurdles in ${page.state}, generic law firm websites give shallow answers that cause visitors to bounce. We structure deep authoritative answers that solve the client's immediate legal anxieties, converting hesitant researchers into signed consultation retainers.`,
      deliverables: [
        "In-depth analysis of high-value cases currently lost to out-of-town competitor referral networks",
        "Statute-specific conversion funnels answering local liability, damages, and filing deadlines",
        "Clear ROI tracking comparing organic retainer acquisition against paid PPC campaigns",
      ],
      impact: "Recovers $20,000–$80,000/mo in missed client retainers",
      ctaText: "Calculate Case Potential",
      ctaHref: "/free-audit",
    },
    "ai-intake": {
      id: "ai-intake",
      tabLabel: "24/7 AI Speed-to-Lead Intake",
      badge: "Conversion Automation",
      icon: Bot,
      title: "24/7 AI Speed-to-Lead Legal Intake Architecture",
      problemAddressed: "Missed after-hours inquiries calling competing firms",
      psychologyHeadline: "Immediate Reassurance for Crisis Searchers",
      psychologyBody: `In legal emergencies occurring at night or on weekends, the firm that responds first secures the representation. Our automated intake qualifying systems connect with crisis searchers in under 60 seconds, scheduling priority consultations on your calendar before competitors even open their office.`,
      deliverables: [
        "Instant multi-channel response (SMS, web intake, and live booking) within 60 seconds",
        "Case qualification screening: filters out tire-kickers and surfaces high-value retainers immediately",
        "Seamless calendar booking integration directly into your firm's practice management software",
      ],
      impact: "Under 60-second response time increases consultation conversions by 390%",
      ctaText: "Explore Intake Systems",
      ctaHref: "/free-audit",
    },
  };

  const current = solutions[activeTab];
  const CurrentIcon = current.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      {/* Header & Core Philosophy */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#534AB7] border border-indigo-100/80">
            <Zap className="h-3.5 w-3.5 text-[#534AB7]" />
            <span>SearchPrex Growth Philosophy · Local SEO · Law Firm SEO</span>
          </div>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0a0f2e] sm:text-3xl lg:text-4xl">
            &ldquo;We Came with Solution, Not Just Traditional SEO&rdquo;
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#566070]">
            Law firms in {page.city} are burned out from spending $15,000 to $30,000 every month on Google Ads PPC campaigns with diminishing returns. We understand local {page.county} demographics, searcher psychology, and deliver qualified leads to Solo Attorneys and Mid-Size Law Firms through precision SEO, GEO, and AEO architecture.
          </p>
        </div>

        {/* Clean Solution Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200/70 pb-3">
          {(Object.keys(solutions) as Array<keyof typeof solutions>).map((key) => {
            const item = solutions[key];
            const isActive = activeTab === key;
            const TabIcon = item.icon;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0a0f2e] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Relevant Solution Spotlight */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#534AB7] border border-indigo-100">
                <CurrentIcon className="h-5 w-5" />
              </span>
              <div>
                <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  {current.badge}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#0a0f2e] mt-0.5">
                  {current.title}
                </h4>
              </div>
            </div>

            <div className="rounded-lg bg-rose-50 border border-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">
              Fixes: {current.problemAddressed}
            </div>
          </div>

          {/* Psychology & Demographics Box */}
          <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0a0f2e]">
              {current.psychologyHeadline}
            </h5>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
              {current.psychologyBody}
            </p>
          </div>

          {/* Key Strategic Deliverables */}
          <div className="mt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block mb-3">
              Strategic Architecture Deployed:
            </span>
            <ul className="space-y-2.5">
              {current.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Action Bar for Current Solution */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
              <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{current.impact}</span>
            </div>

            <Link
              href={current.ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0f2e] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#1a2366] transition-colors"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Strategic Dual CTA Conversion Banner */}
        <div className="mt-8 rounded-2xl border border-slate-900 bg-[#0a0f2e] p-6 sm:p-8 text-white shadow-md">
          <div className="grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                SEO + GEO + AEO Multi-Engine Dominance
              </span>
              <h4 className="mt-2.5 text-xl sm:text-2xl font-bold text-white leading-tight">
                Get Qualified Leads via Our SEO Strategy
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Stop wasting retainer budget on unqualified PPC clicks. We combine Google Map 3-Pack authority, statutory practice silos, and Google AI Overview citations into one single-firm growth engine for {page.city}.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/free-audit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xs hover:bg-emerald-400 transition-colors text-center"
              >
                <span>GET FREE REALITY CHECK</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href="https://nicheseopro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-colors text-center"
              >
                <Cpu className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>GET LATEST SEO BRAIN</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
