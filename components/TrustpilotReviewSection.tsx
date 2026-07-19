"use client";
 
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import Image from "next/image";
 
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
 
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
 
export default function TrustpilotReviewSection() {
  const trustpilotUrl = "https://www.trustpilot.com/review/searchprex.com";
  const reviewDate = "July 17, 2026";
 
  return (
    <section className="bg-white py-20 border-t border-[#e2e8f0]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-block rounded-full bg-[#f5f3ff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#534AB7]"
          >
            Verified Review
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e]"
          >
            Real Client Results
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base text-[#64748b]"
          >
            Verified on Trustpilot by Michigan Sports & Outdoor Inc
          </motion.p>
        </motion.div>
 
        {/* ── Review Card ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-2xl border-2 border-[#534AB7]/20 bg-[#f9f9ff] p-8 shadow-lg"
        >
          {/* Trustpilot Badge */}
          <div className="mb-6 flex items-center gap-3">
            <a
              href={trustpilotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#534AB7]/30 bg-white px-4 py-2 transition-all hover:border-[#534AB7]"
            >
              <span className="text-lg">⭐</span>
              <span className="text-xs font-bold text-[#0a0f2e]">Verified on Trustpilot</span>
              <ExternalLink className="h-3 w-3 text-[#64748b]" />
            </a>
          </div>
 
          {/* Star Rating */}
          <div className="mb-4 flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]"
              />
            ))}
            <span className="ml-2 text-sm font-bold text-[#0a0f2e]">5 out of 5</span>
          </div>
 
          {/* Review Title */}
          <h3 className="mb-4 text-xl font-black text-[#0a0f2e]">
            Highly recommend for any e-commerce business looking to scale
          </h3>
 
          {/* Review Body */}
          <blockquote className="mb-6 border-l-4 border-[#534AB7] pl-6 text-base leading-relaxed text-[#475569]">
            "Highly recommend for any e-commerce business looking to scale. They are an expert at optimizing for competitive retail niches and have helped Michigan Sports Outdoor substantially increase our online visibility. Very professional, results-oriented, and easy to work with."
          </blockquote>
 
          {/* Reviewer Info */}
          <div className="mb-6 flex items-start gap-4 border-t border-[#e2e8f0] pt-6">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#534AB7] text-white font-bold">
                M
              </div>
            </div>
            <div>
              <p className="font-bold text-[#0a0f2e]">Michigan Sports & Outdoor Inc</p>
              <p className="text-sm text-[#64748b]">E-commerce Business • USA</p>
              <p className="mt-1 text-xs font-medium text-[#534AB7]">
                Unverified review • {reviewDate}
              </p>
            </div>
          </div>
 
          {/* CTA */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={trustpilotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#534AB7] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#3d3580]"
            >
              Read Full Review on Trustpilot
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={trustpilotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#534AB7] px-6 py-3 text-sm font-bold text-[#534AB7] transition-all hover:bg-[#f5f3ff]"
            >
              See Our Trustpilot Profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
 
        {/* ── Trust Signal ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 rounded-xl bg-[#f0fdf4] px-6 py-4 text-center border border-[#86efac]/30"
        >
          <p className="text-sm text-[#166534]">
            <span className="font-bold">✓ Verified & Unsponsored Review</span><br/>
            This review is independently verified by Trustpilot. Results are verified with real GSC data and client documentation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
 