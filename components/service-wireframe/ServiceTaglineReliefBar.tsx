"use client";

import React from "react";

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
      className={`w-full bg-neutral-950 text-white py-3 px-4 border-y border-neutral-800 font-sans ${className}`}
    >
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 font-bold tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
          <span>{message}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
          <span>{subText}</span>
        </div>
      </div>
    </div>
  );
}
