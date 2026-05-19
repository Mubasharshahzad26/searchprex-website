"use client";

import { motion } from "framer-motion";
import { FileText, Search, Phone, ArrowRight, Download, BarChart3 } from "lucide-react";
import Link from "next/link";

const ctaCards = [
  {
    icon: Search,
    title: "Get Free SEO Audit",
    description: "Comprehensive analysis of your website's SEO health with actionable recommendations.",
    buttonText: "Start Free Audit",
    buttonLink: "#cta",
    color: "bg-[#2563eb]",
    features: ["200+ technical checks", "Competitor analysis", "48-hour delivery"],
  },
  {
    icon: FileText,
    title: "Get White Paper",
    description: "Download our 2026 SEO Strategy Guide with insights from 500+ successful campaigns.",
    buttonText: "Download Free",
    buttonLink: "#whitepaper",
    color: "bg-[#059669]",
    features: ["50+ pages of insights", "Case studies included", "Actionable strategies"],
  },
  {
    icon: BarChart3,
    title: "ROI Calculator",
    description: "See exactly how much revenue SEO can generate for your business.",
    buttonText: "Calculate ROI",
    buttonLink: "#roi",
    color: "bg-[#7c3aed]",
    features: ["Industry benchmarks", "Custom projections", "Instant results"],
  },
];

export default function MultipleCTAs() {
  return (
    <section className="bg-[#f7f8fc] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
            Free Resources
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
            Start Growing Your Organic Traffic Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#64748b]">
            Choose your path to SEO success. All resources are completely free with no strings attached.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {ctaCards.map((cta, index) => (
            <motion.div
              key={cta.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
            >
              {/* Icon */}
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${cta.color}`}
              >
                <cta.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-[#0a0f2e]">{cta.title}</h3>
              <p className="mt-3 text-[#64748b]">{cta.description}</p>

              {/* Features */}
              <ul className="mt-6 space-y-2">
                {cta.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[#374151]">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                href={cta.buttonLink}
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl ${cta.color} py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:opacity-90`}
              >
                {cta.title.includes("White Paper") ? (
                  <Download className="h-4 w-4" />
                ) : null}
                {cta.buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Phone CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#e5e7eb] bg-white p-8 sm:flex-row sm:gap-6"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a0f2e]">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-[#0a0f2e]">
              Prefer to talk to a human?
            </p>
            <p className="text-[#64748b]">
              Call us directly at{" "}
              <a href="tel:+18005551234" className="font-bold text-[#2563eb] hover:underline">
                +92 310 652 6316
              </a>{" "}
              — we&apos;re here Mon-Fri, 9 AM - 6 PM EST
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
