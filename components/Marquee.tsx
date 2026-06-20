"use client";
 
import type { ReactNode } from "react";
 
/**
 * Marquee — seamless infinite horizontal scroll (logos, client names, badges).
 *
 *   <Marquee speed={28}>
 *     <img src="/clients/smk.svg" className="h-8" />
 *     <img src="/clients/michigan.svg" className="h-8" />
 *     …
 *   </Marquee>
 *
 * - children render once; the component duplicates them for a seamless loop.
 * - fadeColor must match the section background so the edges fade cleanly.
 * - pauses on hover, and respects prefers-reduced-motion.
 */
export default function Marquee({
  children,
  speed = 30,
  fadeColor = "#ffffff",
  className,
}: {
  children: ReactNode;
  speed?: number;
  fadeColor?: string;
  className?: string;
}) {
  return (
    <div className={`sp-marquee group relative w-full overflow-hidden ${className ?? ""}`}>
      {/* edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
      />
 
      {/* track: duplicated children, animated -50% for a seamless loop */}
      <div className="sp-marquee-track flex w-max items-center" style={{ animationDuration: `${speed}s` }}>
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
          {children}
        </div>
      </div>
 
      <style>{`
        @keyframes sp-marquee-scroll { to { transform: translateX(-50%); } }
        .sp-marquee-track {
          animation-name: sp-marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .sp-marquee:hover .sp-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .sp-marquee-track { animation: none; transform: none; }
        }
      `}</style>
    </div>
  );
}