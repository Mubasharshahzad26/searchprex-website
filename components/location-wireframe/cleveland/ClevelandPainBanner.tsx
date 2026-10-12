"use client";

import React from "react";
import { ArrowDown, AlertCircle, Sparkles } from "lucide-react";

interface ClevelandPainBannerProps {
  id?: string;
  variant?: "top" | "bottom";
}

export default function ClevelandPainBanner({ id = "painband-top", variant = "top" }: ClevelandPainBannerProps) {
  const scrollToDiagnose = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("diagnose");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id={id}
      className="relative overflow-hidden border-y border-slate-800 bg-slate-900 border-y border-slate-800 py-6 sm:py-7 text-white"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 hidden rounded-full blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-2.5 transition-transform hover:scale-105">
          <Sparkles className="h-3.5 w-3.5 text-slate-400" />
          <span>Interactive Cleveland Legal SEO Diagnosis</span>
        </div>

        <h2 className="!text-white text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
          {variant === "top"
            ? "Stagnant Law Firm Rankings in Cleveland?"
            : "Predictable Case Acquisition in Cuyahoga County"}
        </h2>

        <div className="mt-3">
          <a
            href="#diagnose"
            onClick={scrollToDiagnose}
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-white hover:text-white underline underline-offset-4 transition-all hover:scale-105 cursor-pointer"
          >
            <span>
              {variant === "top"
                ? "Select your practice challenge to see the solution ↓"
                : "Start with a complimentary diagnosis and 7-day trial ↓"}
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce text-slate-400 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
