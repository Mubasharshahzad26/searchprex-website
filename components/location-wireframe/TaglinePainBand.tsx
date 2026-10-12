'use client';

import React from 'react';
import { HeartHandshake } from 'lucide-react';

interface TaglinePainBandProps {
  className?: string;
}

export default function TaglinePainBand({ className = '' }: TaglinePainBandProps) {
  return (
    <div
      className={`w-full bg-[#534AB7] text-white py-3.5 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md shadow-indigo-950/20 ${className}`}
    >
      <HeartHandshake className="w-5 h-5 text-indigo-200 shrink-0" />
      <span>We are here for the solution because we can feel your pain.</span>
    </div>
  );
}
