'use client';

import React from 'react';
import { HeartHandshake } from 'lucide-react';

interface TaglinePainBandProps {
  className?: string;
}

export default function TaglinePainBand({ className = '' }: TaglinePainBandProps) {
  return (
    <div
      className={`w-full bg-slate-900 text-white py-3.5 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-sm border-y border-slate-800 ${className}`}
    >
      <HeartHandshake className="w-5 h-5 text-slate-300 shrink-0" />
      <span>We are here for the solution because we can feel your pain.</span>
    </div>
  );
}
