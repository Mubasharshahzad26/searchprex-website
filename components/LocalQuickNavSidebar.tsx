"use client";

// components/LocalQuickNavSidebar.tsx
//
// Desktop sticky quick-navigation / table-of-contents sidebar.
// Replicated directly from the desktop wireframe layout.
// Allows prospective legal clients to instantly jump to relevant data sections.

import React from "react";
import Link from "next/link";
import {
  List,
  ShieldCheck,
  ArrowRight,
  Scale,
  AlertCircle,
  FileText,
  MapPin,
  Bot,
  HelpCircle,
  BarChart3,
  Zap,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function LocalQuickNavSidebar({ page }: { page: CityPage }) {
  const navItems = [
    { label: "Free Domain Authority", href: "#da-checker", icon: BarChart3 },
    { label: "Local Keyword Demand", href: "#practice-areas", icon: Scale },
    { label: "The Situation & Burnout", href: "#the-situation", icon: AlertCircle },
    { label: "Competitor Gap Matrix", href: "#competitor-gap", icon: FileText },
    { label: "Teardown Report Sample", href: "#report-sample", icon: FileText },
    { label: "Statutory Reality", href: "#jurisdiction", icon: Scale },
    { label: "SEO Solutions & CTAs", href: "#solutions", icon: Zap },
    { label: "Court Corridor & Map", href: "#map-corridor", icon: MapPin },
    { label: "AI Overview Citation", href: "#ai-overview", icon: Bot },
    { label: "Common Questions (FAQ)", href: "#faq", icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* Navigation Box */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <List className="h-3.5 w-3.5 text-[#534AB7]" />
            <span>Table of Contents</span>
          </div>

          <nav className="mt-2.5 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#566070] hover:bg-slate-50 hover:text-[#0a0f2e] transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Exclusivity Sticky Card */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-white to-emerald-50/20 p-5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Market Exclusivity</span>
          </div>
          <h4 className="mt-2 text-sm font-bold text-[#0a0f2e]">
            1 Firm Per Practice in {page.city}
          </h4>
          <p className="mt-1 text-xs text-[#566070] leading-relaxed">
            We will never represent your direct competitor. Once a practice area is claimed in {page.county}, that territory is locked.
          </p>

          <Link
            href="/free-audit"
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0a0f2e] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1a2366] transition-colors"
          >
            <span>Claim Territory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
