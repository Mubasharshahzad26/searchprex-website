"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    category: "ECOMMERCE SEO · USA",
    metric: "+75%",
    metricLabel: "Revenue increase in 2 months",
    client: "SMK Store, United States",
    detail: 'Tactical gear sales $300 → $525 in 2 months',
    color: "bg-[#1a3c8f]",
  },
  {
    category: "TECHNICAL SEO · MICHIGAN",
    metric: "+285%",
    metricLabel: "Indexed pages growth",
    client: "Michigan Sports Outdoor, USA",
    detail: "7K → 27K indexed pages in 1.5 months",
    color: "bg-[#2563eb]",
  },
  {
    category: "LOCAL SEO · CALIFORNIA",
    metric: "53",
    metricLabel: "Daily organic users from zero",
    client: "HVAC Services, Simi Valley CA",
    detail: "0 → 1,500 impressions, AI Overview appearance",
    color: "bg-[#0a0f2e]",
  },
];

export default function Results() {
  return (
    <section id="results" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
        >
          <div>
            <h2 className="mb-4 text-4xl font-black text-[#0a0f2e] sm:text-5xl">
              Real Numbers. Real Clients.
            </h2>
            <p className="text-lg text-[#64748b]">
              We let our tracking data do the talking. No fluff, just results.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2563eb] transition-colors hover:text-[#1a3c8f]"
          >
            Explore All Metrics
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white transition-all hover:shadow-xl"
            >
              {/* Header */}
              <div className={`${study.color} px-6 py-4`}>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                  {study.category}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="mb-1 text-4xl font-black text-[#0a0f2e]">
                  {study.metric}
                </p>
                <p className="mb-4 text-sm text-[#64748b]">{study.metricLabel}</p>

                <div className="mb-4 border-t border-[#e5e7eb] pt-4">
                  <p className="mb-1 text-sm font-semibold text-[#0a0f2e]">
                    {study.client}
                  </p>
                  <p className="text-sm text-[#64748b]">{study.detail}</p>
                </div>

                <Link
                  href="/case-studies"
                  className="group/link inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2563eb] transition-colors hover:text-[#1a3c8f]"
                >
                  Read Case Study
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
