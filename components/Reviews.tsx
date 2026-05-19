"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    headline: "Finally rankedFOUNDER-LED SEO. NO JUNIORS. NO FLUFF. for our main keyword",
    quote:
      "We tried two other agencies before SearchPrex. Within 3 months of working with them, our firm was ranking on page one for 'family law attorney Houston.' The leads speak for themselves.",
    author: "Michael R.",
    role: "Managing Partner",
    company: "Family Law Firm, Houston TX",
    initials: "MR",
  },
  {
    headline: "Best ROI from any marketing channel",
    quote:
      "Our Shopify store was getting 1,200 visitors/month. 6 months later we're at 9,400. The revenue impact has been significant. They know Shopify SEO cold.",
    author: "Jake K.",
    role: "Founder",
    company: "Tactical Gear Store, Chicago IL",
    initials: "JK",
  },
  {
    headline: "Transparent, senior-level work",
    quote:
      "I knew exactly what they were doing and why at every step. No fluff, no account manager intermediary — just real strategy and execution.",
    author: "Sarah C.",
    role: "COO",
    company: "Ecommerce Brand, California",
    initials: "SC",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-[#f7f8fc] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-black text-[#0a0f2e] sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mb-6 text-lg text-[#64748b]">
            Senior-level SEO delivery. Industry-leading results.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#facc15] text-[#facc15]"
                />
              ))}
            </div>
            <span className="font-bold text-[#0a0f2e]">5.0</span>
            <span className="text-sm text-[#64748b]">— TRUSTED AGENCY</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-8"
            >
              {/* Stars */}
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#facc15] text-[#facc15]"
                  />
                ))}
              </div>

              {/* Headline */}
              <h3 className="mb-4 text-xl font-bold text-[#0a0f2e]">
                &quot;{review.headline}&quot;
              </h3>

              {/* Quote */}
              <p className="mb-6 text-[#64748b]">&quot;{review.quote}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a3c8f] text-sm font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-[#0a0f2e]">{review.author}</p>
                  <p className="text-sm text-[#64748b]">
                    {review.role} | {review.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
