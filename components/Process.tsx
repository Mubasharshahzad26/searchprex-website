"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Target, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Free SEO Audit",
    description:
      "Full technical + keyword analysis delivered in 48 hours, completely free.",
  },
  {
    number: "02",
    icon: Target,
    title: "Custom Strategy",
    description:
      "City targets, competitor gaps, content roadmaps built for your niche.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Execute & Report",
    description:
      "We handle everything. Monthly reports tied to leads and revenue metrics.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#f7f8fc] py-24">
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
            SEO Made Simple.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#64748b]">
            Results built for your specific business goals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-[#e5e7eb] md:block" />
              )}

              {/* Icon */}
              <div className="relative mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#1a3c8f] text-sm font-bold text-white">
                  {step.number}
                </span>
                <step.icon className="h-10 w-10 text-[#1a3c8f]" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-[#0a0f2e]">
                {step.title}
              </h3>
              <p className="text-[#64748b]">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="#cta"
            className="inline-block rounded-lg bg-[#2563eb] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
          >
            Start With a Free Audit →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
