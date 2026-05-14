"use client";

import { motion } from "framer-motion";

const states = ["CALIFORNIA", "TEXAS", "FLORIDA", "NEW YORK", "ILLINOIS"];

export default function TrustBar() {
  return (
    <section className="border-y border-[#e5e7eb] bg-[#f7f8fc] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left Text */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#64748b]">
            Serving Law Firms & Stores in:
          </p>

          {/* States Ticker */}
          <div className="flex items-center gap-4 overflow-hidden">
            <motion.div
              className="flex items-center gap-4"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
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

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#22c55e]">
              2 Spots Remaining This Month
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
