"use client";

import React from "react";
import { ArrowDown, Wrench } from "lucide-react";

interface PhiladelphiaPainBannerProps {
  id?: string;
  variant?: "top" | "bottom";
}

export default function PhiladelphiaPainBanner({
  id = "painband-top",
  variant = "top",
}: PhiladelphiaPainBannerProps) {
  const scrollToDiagnose = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("diagnose");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isTop = variant === "top";

  return (
    <div
      id={id}
      className="relative overflow-hidden border-y border-neutral-950/20 bg-neutral-900 border-y border-neutral-800 py-8 text-white shadow-inner"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-200 backdrop-blur-xs">
          <Wrench className="h-3.5 w-3.5 text-slate-300" />
          <span>{isTop ? "Immediate Strategic Remedy" : "7-Day Risk-Free Trial Available"}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight !text-white leading-tight">
          Facing Stagnant Philadelphia Rankings? We Engineer the Fix.
        </h2>

        <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto">
          Tired of seeing national aggregators take case calls while your site spins on page two? Tell us your bottleneck, and we will diagnose the exact technical hurdles.
        </p>

        <div className="pt-2">
          <a
            href="#diagnose"
            onClick={scrollToDiagnose}
            className="inline-flex items-center gap-2 font-bold text-white underline underline-offset-4 hover:text-slate-200 transition-colors cursor-pointer group text-sm sm:text-base"
          >
            <span>{isTop ? "Identify your law firm's bottlenecks below" : "Claim your free 24-hour reality check now"}</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
