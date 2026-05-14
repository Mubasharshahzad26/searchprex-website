"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Beginning",
    description: "Perfect for startups and small businesses starting their SEO journey",
    price: "1,500",
    period: "/month",
    icon: Star,
    featured: false,
    features: [
      "Up to 20 target keywords",
      "Monthly technical SEO audit",
      "On-page optimization",
      "Google Business Profile setup",
      "Basic link building (5 links/mo)",
      "Monthly performance report",
      "Email support",
      "1 content piece/month",
    ],
    notIncluded: [
      "Dedicated account manager",
      "Competitor analysis",
      "Advanced analytics",
    ],
    cta: "Get Started",
    ctaLink: "#cta",
  },
  {
    name: "Agency Level",
    description: "For growing businesses requiring comprehensive SEO management",
    price: "3,500",
    period: "/month",
    icon: Zap,
    featured: true,
    badge: "Most Popular",
    features: [
      "Up to 50 target keywords",
      "Weekly technical SEO audits",
      "Advanced on-page optimization",
      "Google Business Profile management",
      "Quality link building (15 links/mo)",
      "Weekly performance reports",
      "Dedicated account manager",
      "4 content pieces/month",
      "Competitor analysis",
      "Conversion rate optimization",
      "Schema markup implementation",
      "Phone & email support",
    ],
    notIncluded: [],
    cta: "Start Free Trial",
    ctaLink: "#cta",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations with complex needs",
    price: "Custom",
    period: "",
    icon: Building2,
    featured: false,
    features: [
      "Unlimited target keywords",
      "Daily technical monitoring",
      "Full-site optimization",
      "Multi-location SEO",
      "Premium link building",
      "Real-time reporting dashboard",
      "Senior SEO strategist",
      "Unlimited content",
      "Advanced competitor intelligence",
      "Full CRO program",
      "Custom integrations",
      "24/7 priority support",
      "Quarterly strategy sessions",
      "API access",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    ctaLink: "#cta",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
            Pricing Plans
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            Transparent Pricing, <span className="text-[#2563eb]">Real Results</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#64748b]">
            No hidden fees, no long-term contracts. Choose the plan that fits your business 
            and scale as you grow. All plans include a 90-day money-back guarantee.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border-2 ${
                tier.featured
                  ? "border-[#2563eb] bg-white shadow-2xl shadow-[#2563eb]/10"
                  : "border-[#e5e7eb] bg-white"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-[#2563eb] px-3 py-1 text-xs font-bold text-white">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Icon & Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      tier.featured ? "bg-[#2563eb]" : "bg-[#f7f8fc]"
                    }`}
                  >
                    <tier.icon
                      className={`h-6 w-6 ${
                        tier.featured ? "text-white" : "text-[#2563eb]"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0a0f2e]">
                      {tier.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm text-[#64748b]">{tier.description}</p>

                {/* Price */}
                <div className="mt-6 flex items-baseline">
                  {tier.price === "Custom" ? (
                    <span className="text-4xl font-bold text-[#0a0f2e]">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-lg font-medium text-[#64748b]">$</span>
                      <span className="text-5xl font-bold text-[#0a0f2e]">
                        {tier.price}
                      </span>
                      <span className="ml-1 text-[#64748b]">{tier.period}</span>
                    </>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={tier.ctaLink}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    tier.featured
                      ? "bg-[#2563eb] text-white hover:bg-[#1a3c8f]"
                      : "border-2 border-[#0a0f2e] bg-white text-[#0a0f2e] hover:bg-[#0a0f2e] hover:text-white"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Features */}
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
                    What&apos;s included:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span className="text-sm text-[#374151]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.notIncluded.length > 0 && (
                    <>
                      <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
                        Not included:
                      </p>
                      <ul className="mt-4 space-y-3">
                        {tier.notIncluded.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-[#94a3b8]"
                          >
                            <span className="mt-0.5 h-4 w-4 flex-shrink-0 text-center">
                              —
                            </span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[#64748b]">
            Not sure which plan is right for you?{" "}
            <Link href="#cta" className="font-medium text-[#2563eb] hover:underline">
              Get a free consultation
            </Link>{" "}
            and we&apos;ll help you choose.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-[#64748b]">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              90-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              No Long-Term Contracts
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Cancel Anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
