"use client";

import { motion } from "framer-motion";
import { Linkedin, ExternalLink, Quote } from "lucide-react";
import Image from "next/image";

export default function CEOMessage() {
  return (
    <section className="bg-[#f7f8fc] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
            From Our Founder
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
            A Message From Our CEO
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white p-8 shadow-xl sm:p-12">
            {/* Quote Icon */}
            <Quote className="absolute right-8 top-8 h-24 w-24 text-[#2563eb]/5" />

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
              {/* CEO Photo */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="h-40 w-40 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3c8f] to-[#2563eb]">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt="Mubashar Shahzad - CEO & Founder of SearchPrex"
                      width={160}
                      height={160}
                      className="h-full w-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 rounded-xl bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    CEO & Founder
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 text-center lg:text-left">
                <blockquote className="text-lg leading-relaxed text-[#374151] sm:text-xl">
                  <span className="font-medium text-[#0a0f2e]">
                    &ldquo;When I founded SearchPrex, I had one mission:
                  </span>{" "}
                  to bring enterprise-level SEO expertise to businesses of all sizes, 
                  without the enterprise-level price tag or the agency runaround.
                </blockquote>

                <p className="mt-6 text-[#64748b] leading-relaxed">
                  After a decade of working with Fortune 500 companies and seeing how 
                  small businesses struggled to compete in search, I knew there had to be 
                  a better way. That&apos;s why every client at SearchPrex works directly 
                  with senior strategists who have 10+ years of experience — no junior 
                  account managers, no outsourced work, no excuses.
                </p>

                <p className="mt-4 text-[#64748b] leading-relaxed">
                  We&apos;ve helped over 500 businesses across the USA dominate their local 
                  markets and outrank national competitors. From family law attorneys 
                  in California to Shopify stores in New York, our results speak for 
                  themselves. I personally guarantee that you&apos;ll see measurable progress 
                  within 90 days, or we&apos;ll work for free until you do.
                </p>

                <p className="mt-4 font-medium text-[#0a0f2e]">
                  Let&apos;s talk about how we can help your business grow.
                </p>

                {/* Signature */}
                <div className="mt-8 flex flex-col items-center gap-4 border-t border-[#e5e7eb] pt-8 lg:flex-row lg:justify-between">
                  <div>
                    <p className="text-xl font-bold text-[#0a0f2e]">
                      Mubashar Shahzad
                    </p>
                    <p className="text-sm text-[#64748b]">
                      CEO & Founder, SearchPrex
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/in/mubi00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-all hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href="https://researchgate.net/profile/Mubashar-Shahzad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-all hover:border-[#00d0af] hover:bg-[#00d0af] hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      ResearchGate
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-[#e5e7eb] pt-8">
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                10+ Years Experience
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                500+ Clients Served
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                87 Five-Star Reviews
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
