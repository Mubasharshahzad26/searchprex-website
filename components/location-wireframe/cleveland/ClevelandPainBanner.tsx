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
      className="relative overflow-hidden border-y border-[#534AB7]/30 bg-[#0a0f2e] py-6 sm:py-7 text-white"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-[#534AB7]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#534AB7]/30 border border-[#534AB7]/50 px-3.5 py-1 text-xs font-bold text-[#EEEDFE] mb-2.5 transition-transform hover:scale-105">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
          <span>Interactive Cleveland Legal SEO Diagnosis</span>
        </div>

        <h2 className="!text-white text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
          {variant === "top"
            ? "Facing Stagnant Law Firm Rankings in Cleveland? We Engineer the Fix."
            : "Ready for Predictable Case Acquisition Across Cuyahoga County?"}
        </h2>

        <div className="mt-3">
          <a
            href="#diagnose"
            onClick={scrollToDiagnose}
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-white hover:text-[#EEEDFE] underline underline-offset-4 transition-all hover:scale-105 cursor-pointer"
          >
            <span>
              {variant === "top"
                ? "Select your practice challenge to see the solution ↓"
                : "Start with a complimentary diagnosis and 7-day trial ↓"}
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce text-indigo-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
