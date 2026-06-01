"use client";
 
import { motion } from "framer-motion";
import { Search, Phone, ArrowRight, Wrench, Sparkles } from "lucide-react";
import Link from "next/link";
 
/* Toptal green accent */
const GREEN = "#3eb489";
 
const ctaCards = [
  {
    icon: Search,
    title: "Get Free SEO Audit",
    description: "A comprehensive, founder-led analysis of your website's SEO health with prioritized, actionable recommendations.",
    buttonText: "Start Free Audit",
    buttonLink: "/free-audit",
    color: "bg-[#3eb489]",
    features: ["200+ technical checks", "Competitor gap analysis", "24-hour delivery"],
  },
  {
    icon: Wrench,
    title: "Free SEO Tools",
    description: "Fast, accurate SEO tools built by an analyst who uses them daily — schema generators, SERP simulators, and more. No signup.",
    buttonText: "Explore Free Tools",
    buttonLink: "/tools",
    color: "bg-[#534AB7]",
    features: ["No signup required", "100% free to use", "Built for practitioners"],
  },
  {
    icon: Sparkles,
    title: "NicheSEO Pro",
    description: "Our AI-powered, multi-agent SEO suite that audits, rewrites, links, and indexes your pages at scale. Launching soon.",
    buttonText: "Join the Waitlist",
    buttonLink: "/coming-soon",
    color: "bg-[#0891b2]",
    features: ["AI content audit", "Multi-agent SEO", "E-E-A-T optimized"],
  },
];
 
export default function MultipleCTAs() {
  return (
    <section className="bg-[#eaecf3] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-sm" style={{ color: "#2f9670" }}>
            Free Resources
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
            Start Growing Your Organic Traffic Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#475569]">
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
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${cta.color}`}>
                <cta.icon className="h-7 w-7 text-white" />
              </div>
 
              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-[#0a0f2e]">{cta.title}</h3>
              <p className="mt-3 text-[#64748b]">{cta.description}</p>
 
              {/* Features */}
              <ul className="mt-6 space-y-2">
                {cta.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[#374151]">
                    <svg className="h-4 w-4" style={{ color: GREEN }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#cbd0db] bg-white p-8 sm:flex-row sm:gap-6"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a0f2e]">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-[#0a0f2e]">
              Prefer to talk to a human?
            </p>
            <p className="text-[#64748b]">
              Call the founder directly at{" "}
              <a href="tel:+923106526316" className="font-bold hover:underline" style={{ color: "#2f9670" }}>
                +92 310 652 6316
              </a>{" "}
              — Mon–Fri, US business hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 






















































