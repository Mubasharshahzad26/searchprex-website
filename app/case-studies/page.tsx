"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, Users, DollarSign, Globe } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

const caseStudies = [
  {
    id: 1,
    category: "LAW FIRM SEO",
    location: "TEXAS",
    title: "Morrison Family Law",
    subtitle: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    metrics: [
      { icon: TrendingUp, value: "+75%", label: "Organic Visibility" },
      { icon: Users, value: "47", label: "New Leads/Month" },
      { icon: Globe, value: "#1", label: "Dallas Family Law" },
    ],
    challenge:
      "Morrison Family Law was struggling to compete against larger firms in the Dallas market. Their website had technical SEO issues and their content strategy was unfocused.",
    solution:
      "We implemented a comprehensive local SEO strategy targeting high-intent family law keywords, optimized their Google Business Profile, and created E-E-A-T focused content highlighting attorney credentials.",
    results: [
      "Ranked #1 for 'family law attorney Dallas' within 6 weeks",
      "380% increase in organic visibility",
      "47 new client consultations per month from organic search",
      "Established authority for custody, divorce, and adoption keywords",
    ],
  },
  {
    id: 2,
    category: "SHOPIFY SEO",
    location: "ILLINOIS",
    title: "TacticalEdge Store",
    subtitle: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    metrics: [
      { icon: DollarSign, value: "+285%", label: "Monthly Revenue" },
      { icon: Users, value: "9,400", label: "Monthly Visitors" },
      { icon: TrendingUp, value: "+683%", label: "Traffic Growth" },
    ],
    challenge:
      "TacticalEdge was getting minimal organic traffic to their Shopify store. Their site had crawlability issues, missing schema markup, and poor Core Web Vitals scores.",
    solution:
      "We performed a complete technical audit, implemented product schema, optimized collection pages for target keywords, and built niche-relevant backlinks.",
    results: [
      "Traffic grew from 1,200 to 9,400 monthly visitors",
      "$124K in additional organic revenue within 6 months",
      "Core Web Vitals scores improved to 'Good' on all metrics",
      "200+ product pages now ranking for long-tail keywords",
    ],
  },
  {
    id: 3,
    category: "TECHNICAL SEO",
    location: "MULTI-STATE",
    title: "RetailHub USA",
    subtitle: "Nationwide Operations",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    metrics: [
      { icon: Globe, value: "53", label: "Pages Optimized" },
      { icon: TrendingUp, value: "+290%", label: "Indexed Pages" },
      { icon: Users, value: "12", label: "States Covered" },
    ],
    challenge:
      "RetailHub had over 50,000 product pages but less than 20% were indexed by Google. Complex URL structures and duplicate content plagued their site.",
    solution:
      "We developed custom scripts for schema deployment at scale, implemented proper canonical tags, and created a faceted navigation strategy that preserved crawl budget.",
    results: [
      "53 product pages fully optimized with schema",
      "Indexation rate improved from 18% to 94%",
      "Custom scripting reduced page load times by 40%",
      "Organic traffic increased 290% across all markets",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="bg-[#0a0f2e] pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="mb-6 text-5xl font-black text-white sm:text-6xl lg:text-7xl">
              Case Studies
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Real results from real clients. See how we&apos;ve helped law firms and
              ecommerce stores dominate their markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-[#f7f8fc] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-video overflow-hidden rounded-2xl ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-[#1a3c8f] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
                      {study.category} · {study.location}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <h2 className="mb-2 text-3xl font-black text-[#0a0f2e] sm:text-4xl">
                    {study.title}
                  </h2>
                  <p className="mb-8 text-lg text-[#64748b]">{study.subtitle}</p>

                  {/* Metrics */}
                  <div className="mb-8 grid grid-cols-3 gap-4">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl bg-white p-4 text-center shadow-sm"
                      >
                        <metric.icon className="mx-auto mb-2 h-6 w-6 text-[#2563eb]" />
                        <p className="text-2xl font-black text-[#0a0f2e]">
                          {metric.value}
                        </p>
                        <p className="text-xs text-[#64748b]">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Challenge */}
                  <div className="mb-6">
                    <h3 className="mb-2 font-bold text-[#0a0f2e]">The Challenge</h3>
                    <p className="text-[#64748b]">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h3 className="mb-2 font-bold text-[#0a0f2e]">Our Solution</h3>
                    <p className="text-[#64748b]">{study.solution}</p>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="mb-2 font-bold text-[#0a0f2e]">Key Results</h3>
                    <ul className="space-y-2">
                      {study.results.map((result) => (
                        <li
                          key={result}
                          className="flex items-center gap-2 text-sm text-[#64748b]"
                        >
                          <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#22c55e]" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
