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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#534AB7]/20 border border-[#534AB7]/40 px-3 py-1 text-xs font-bold text-[#EEEDFE] mb-2.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Interactive AI Problem Diagnosis</span>
        </div>

        <h2 className="!text-white text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
          We are here for the solution because we can feel your pain.
        </h2>

        <div className="mt-3">
          <a
            href="#diagnose"
            onClick={scrollToDiagnose}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
          >
            <span>
              {variant === "top"
                ? "Tell us what is wrong and we will show you the fix ↓"
                : "Start with a free diagnosis and a 7-day trial ↓"}
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </div>
  );
}
