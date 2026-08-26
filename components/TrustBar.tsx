"use client";

import { motion } from "framer-motion";

const states = ["CALIFORNIA", "TEXAS", "FLORIDA", "NEW YORK", "ILLINOIS"];

export default function TrustBar() {
  return (
    <section className="border-y border-[#e5e7eb] bg-[#f8f9fc] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left Text */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#566070]">
            Serving Law Firms & Stores in:
          </p>

          {/* States Ticker */}
          <div className="flex items-center gap-4 overflow-hidden">
            <motion.div
              className="flex items-center gap-4"
              initial={{ x: 0 }}
              // -50%, not -100%. The row below renders the states list twice,
              // so translating by half its width lands the second copy exactly
              // where the first started — a seamless loop. -100% scrolled both
              // copies off screen and snapped back with a visible jump.
              animate={{ x: "-50%" }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...states, ...states].map((state, index) => (
                <span
                  key={`${state}-${index}`}
                  className="flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#0a0f2e]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1a3c8f]" />
                  {state}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Availability.
              This used to read "2 Spots Remaining This Month" — a hardcoded
              string with a live-looking pulse animation that never changed. A
              returning visitor sees the same "2" forever, which teaches them
              that our urgency signals are theatre. Replaced with the exclusivity
              policy we already state in the FAQ: true without maintenance, and
              genuinely differentiating. Static dot, because nothing is live. */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#15803d]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#15803d]">
              One Client Per City, Per Practice Area
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
