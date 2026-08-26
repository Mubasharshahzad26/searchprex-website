"use client";
 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
 
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
 
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
 
const TRUSTPILOT_URL = "https://www.trustpilot.com/review/searchprex.com";
 
// ── All verified reviews — add new ones here as they come in on Trustpilot ──
const REVIEWS = [
  {
    rating: 5,
    title: "Highly recommend for any e-commerce business looking to scale",
    body: "Highly recommend for any e-commerce business looking to scale. They are an expert at optimizing for competitive retail niches and have helped Michigan Sports Outdoor substantially increase our online visibility. Very professional, results-oriented, and easy to work with.",
    author: "Michigan Sports & Outdoor Inc",
    role: "E-commerce Business • USA",
    date: "July 17, 2026",
    initial: "M",
  },
  {
    rating: 5,
    title: "Great experience working with Searchprex",
    body: "Great experience working with Searchprex. Their team is professional, responsive, and knowledgeable about SEO and digital marketing. We've seen solid improvements since partnering with them and would definitely recommend their services to other businesses.",
    author: "Orlando Web Pros",
    role: "Web Services • USA",
    date: "April 6, 2026",
    initial: "O",
  },
];
 
// Number of reviews shown below. Deliberately derived, never hardcoded.
//
// There is no AGGREGATE_RATING constant any more. The old one claimed 3.8 out
// of 5 while the two reviews rendered directly beneath it were both rated 5 —
// visibly contradictory, and 3.8 is below the level where showing an average
// helps rather than hurts. If you want to display an average again, read the
// real number off the live Trustpilot profile and keep it in sync with
// lib/trustpilot-review-schema.tsx.
const AGGREGATE_COUNT = REVIEWS.length;
 
// Trustpilot Green Checkmark SVG Badge
const TrustpilotBadge = () => (
  <div className="flex items-center gap-2 rounded-lg border border-[#00A651]/30 bg-white px-4 py-2 transition-all hover:border-[#00A651] hover:shadow-md">
    <svg className="h-5 w-5 text-[#00A651]" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
    </svg>
    <span className="text-xs font-bold text-[#0a0f2e]">Verified on Trustpilot</span>
    <ExternalLink className="h-3 w-3 text-[#566070]" />
  </div>
);
 
export default function TrustpilotReviewSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
 
  const total = REVIEWS.length;
  const review = REVIEWS[index];
 
  const goTo = (newIndex: number) => {
    setDirection(newIndex > index ? 1 : -1);
    setIndex((newIndex + total) % total);
  };
 
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
 
  // Auto-rotate, pausable. WCAG 2.2.2 requires a pause mechanism for content
  // that auto-moves for more than five seconds; there was none. Stops on
  // hover, on keyboard focus, and under prefers-reduced-motion.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (total <= 1 || paused) return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, 7000);
    return () => clearInterval(t);
  }, [total, paused]);
 
  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };
 
  return (
    <section
      className="bg-white py-20 border-t border-[#e2e8f0]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
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
            Verified Reviews
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e]"
          >
            Real Client Results
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base text-[#566070]">
            {AGGREGATE_COUNT} verified {AGGREGATE_COUNT === 1 ? "review" : "reviews"} from real
            clients — published on Trustpilot, not on this site
          </motion.p>
        </motion.div>
 
        {/* ── Review Card (slider) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative rounded-2xl border-2 border-[#534AB7]/20 bg-[#f9f9ff] p-8 shadow-lg"
        >
          {/* Trustpilot Badge */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <TrustpilotBadge />
            </a>
 
            {/* Slide position indicator */}
            {total > 1 && (
              <span className="text-xs font-semibold text-[#566070]">
                {index + 1} / {total}
              </span>
            )}
          </div>
 
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {/* Star Rating */}
                <div className="mb-4 flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? "fill-[#fbbf24] text-[#fbbf24]" : "fill-[#e2e8f0] text-[#e2e8f0]"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#0a0f2e]">{review.rating}.0 out of 5</span>
                </div>
 
                {/* Review Title */}
                <h3 className="mb-4 text-xl font-black text-[#0a0f2e]">{review.title}</h3>
 
                {/* Review Body */}
                <blockquote className="mb-6 border-l-4 border-[#534AB7] pl-6 text-base leading-relaxed text-[#475569]">
                  &quot;{review.body}&quot;
                </blockquote>
 
                {/* Reviewer Info */}
                <div className="mb-2 flex items-start gap-4 border-t border-[#e2e8f0] pt-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#534AB7] text-white font-bold">
                      {review.initial}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[#0a0f2e]">{review.author}</p>
                    <p className="text-sm text-[#566070]">{review.role}</p>
                    <p className="mt-1 text-xs font-medium text-[#196b4d]">
                      ✓ Verified on Trustpilot • {review.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
 
          {/* Slider controls */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#534AB7] transition-all hover:border-[#534AB7] hover:bg-[#f5f3ff]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
 
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-[#534AB7]" : "w-2 bg-[#cbd0db]"
                    }`}
                  />
                ))}
              </div>
 
              <button
                onClick={next}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#534AB7] transition-all hover:border-[#534AB7] hover:bg-[#f5f3ff]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
 
          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 border-t border-[#e2e8f0] pt-6 sm:flex-row">
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#534AB7] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#3d3580]"
            >
              Read All Reviews on Trustpilot
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={TRUSTPILOT_URL}
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
            <span className="font-bold">✓ Verified & Unsponsored Reviews</span>
            <br />
            These reviews are independently verified by Trustpilot. Results are verified with real GSC data and
            client documentation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
 