"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tabs = ["STRATEGY", "TECHNICAL", "ECOMMERCE", "CONTENT"];

const specialists = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Lead Strategist",
    previousCompany: "Baker McKenzie",
    bio: "Specializes in hyper-local legal SEO and high-intent practice area dominance.",
    win: "+75%",
    winLabel: "Organic Visibility",
    expertise: ["Market Gap Analysis", "Lead Gen", "Entity SEO"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    category: "STRATEGY",
    available: true,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "SEO Architect",
    previousCompany: "Gymshark",
    bio: "Expert in technical eCommerce scaling and custom Shopify schema deployments.",
    win: "+285%",
    winLabel: "Monthly Revenue",
    expertise: ["Crawl Optimization", "Schema.org", "Node.js"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    category: "TECHNICAL",
    available: true,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "SEO Director",
    previousCompany: "Wayfair",
    bio: "Scale-focused specialist for multi-state retailers with complex URL architectures.",
    win: "53",
    winLabel: "Pages Indexed",
    expertise: ["Large Scale SEO", "Core Web Vitals", "Data Mining"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    category: "ECOMMERCE",
    available: false,
  },
  {
    id: 4,
    name: "David Chen",
    role: "Content Specialist",
    previousCompany: "Forbes",
    bio: "Editorial-first SEO expert focusing on semantic depth and E-E-A-T building.",
    win: "1.2M",
    winLabel: "Monthly Readers",
    expertise: ["Topical Authority", "Editorial Flow", "Semantic SEO"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    category: "CONTENT",
    available: true,
  },
];

export default function Specialists() {
  const [activeTab, setActiveTab] = useState("STRATEGY");

  const filteredSpecialists = specialists.filter(
    (s) => activeTab === "STRATEGY" || s.category === activeTab
  );

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-black text-[#0a0f2e] sm:text-5xl">
            Meet Specialists in Our Network
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#64748b]">
            Verified experts who have scaled the world&apos;s most aggressive brands.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-[#0a0f2e] text-white"
                  : "bg-[#f7f8fc] text-[#64748b] hover:bg-[#e5e7eb]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Specialists Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSpecialists.map((specialist, index) => (
            <motion.div
              key={specialist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-all hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f8fc]">
                <Image
                  src={specialist.image}
                  alt={specialist.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {specialist.available && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#22c55e] px-3 py-1 text-xs font-bold uppercase text-white">
                    Available
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold text-[#0a0f2e]">
                  {specialist.name}
                </h3>
                <p className="mb-2 text-sm text-[#64748b]">{specialist.role}</p>
                <p className="mb-4 text-xs text-[#64748b]">
                  Previously at{" "}
                  <span className="font-semibold text-[#0a0f2e]">
                    {specialist.previousCompany}
                  </span>
                </p>

                {/* Win Metric */}
                <div className="mb-4 rounded-lg bg-[#f7f8fc] p-3">
                  <p className="text-2xl font-black text-[#1a3c8f]">
                    {specialist.win}
                  </p>
                  <p className="text-xs text-[#64748b]">{specialist.winLabel}</p>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1">
                  {specialist.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#f7f8fc] px-2 py-1 text-[10px] font-medium text-[#64748b]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Discover More Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center rounded-xl bg-[#0a0f2e] p-8 text-center"
          >
            <p className="mb-4 text-3xl font-black text-white">200+</p>
            <p className="mb-6 text-white">More Verified Specialists</p>
            <button className="group flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]">
              Discover All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
