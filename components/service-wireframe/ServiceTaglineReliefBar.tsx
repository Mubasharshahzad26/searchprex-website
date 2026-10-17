"use client";

import React from "react";
import { HeartHandshake, ShieldCheck } from "lucide-react";

interface ServiceTaglineReliefBarProps {
  message?: string;
  subText?: string;
  className?: string;
}

export default function ServiceTaglineReliefBar({
  message = "We are here to provide you a source of relief — we know your pain, and we have the solution.",
  subText = "Direct Founder Access · Weekly Revenue & Lead Reports · 7-Day Free Trial Available",
  className = "",
}: ServiceTaglineReliefBarProps) {
  return (
    <div
      className={`w-full bg-neutral-950 text-white py-3.5 px-4 border-y border-neutral-800 ${className}`}
    >
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 font-bold tracking-wide">
          <HeartHandshake className="h-4 w-4 text-slate-300 shrink-0" aria-hidden />
          <span>{message}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300">
          <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" aria-hidden />
          <span>{subText}</span>
        </div>
      </div>
    </div>
  );
}
