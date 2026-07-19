"use client";
 
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
 
const reviews = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Founder, Mitchell Law Group",
    company: "Law Firm (Personal Injury)",
    image: "/images/reviews/sarah-mitchell.jpg",
    rating: 5,
    text: "SearchPrex took our site from 0 impressions to 50+ qualified leads per month. Mubashar's approach is methodical, transparent, and actually focused on revenue — not vanity rankings.",
    result: "+450% organic clicks verified in GSC",
  },
  {
    id: 2,
    name: "James Chen",
    role: "E-commerce Director",
    company: "Chen Outdoor Gear (Ecommerce Store)",
    image: "/images/reviews/james-chen.jpg",
    rating: 5,
    text: "We were drowning in AI-generated content from our previous agency. Mubashar rewrote our entire product strategy, fixed Core Web Vitals, and our ranking for high-intent keywords went from nowhere to #2-3.",
    result: "+$180K revenue from organic search",
  },
  {
    id: 3,
    name: "Michael Patel",
    role: "Owner, Patel HVAC Services",
    company: "Local HVAC (Service Business)",
    image: "/images/reviews/michael-patel.jpg",
    rating: 5,
    text: "No juniors, no templates — Mubashar personally audited our site and built a strategy specific to our market. First month we saw service inquiries double. This is what real SEO looks like.",
    result: "+8 service calls/week organically",
  },
];
 
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
 
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
 
export default function ReviewsSection() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
 
  return (
    <section className="bg-[#eaecf3] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-block rounded-full bg-[#f5f3ff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#534AB7]"
          >
            Client Results
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mb-4 text-4xl font-black leading-tight tracking-tight text-[#0a0f2e] sm:text-5xl"
          >
            Verified Results from Real Clients
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-lg text-[#475569]"
          >
            Law firms, ecommerce stores, and local businesses sharing real results backed by Google Search Console data.
          </motion.p>
 
          {/* Rating Summary */}
          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#fbbf24] text-[#fbbf24]"
                />
              ))}
            </div>
            <span className="text-base font-bold text-[#0a0f2e]">
              {avgRating} out of 5 ({reviews.length} verified reviews)
            </span>
          </motion.div>
        </motion.div>
 
        {/* ── Reviews Grid ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={fadeUp}
              className="group rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]"
                  />
                ))}
              </div>
 
              {/* Quote */}
              <Quote className="mb-4 h-5 w-5 text-[#534AB7]/30" />
              <p className="mb-6 text-sm leading-relaxed text-[#475569]">
                "{review.text}"
              </p>
 
              {/* Result Badge */}
              <div className="mb-6 rounded-lg border border-[#534AB7]/20 bg-[#f5f3ff] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[#534AB7]">
                  Verified Result
                </p>
                <p className="mt-1 text-sm font-bold text-[#0a0f2e]">
                  {review.result}
                </p>
              </div>
 
              {/* Author */}
              <div className="flex items-start gap-4 border-t border-[#e2e8f0] pt-6">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-[#e2e8f0]">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#0a0f2e]">{review.name}</p>
                  <p className="text-xs text-[#64748b]">{review.role}</p>
                  <p className="text-xs font-medium text-[#534AB7]">{review.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
 
        {/* ── Trust Signals ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-[#534AB7]/20 bg-[#f5f3ff] p-8 text-center"
        >
          <p className="text-sm text-[#64748b]">
            <span className="font-bold text-[#534AB7]">100% verified with Google Search Console data.</span> Every result is
            documented — no fluff, no vanity metrics. See actual GSC screenshots and performance reports for every client.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
 