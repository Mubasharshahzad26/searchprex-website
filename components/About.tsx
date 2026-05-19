"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

const reasons = [
  {
    number: "01",
    title: "Niche Expertise",
    description:
      "We specialize in law firms, ecommerce, and local businesses. Deep industry knowledge means faster results.",
  },
  {
    number: "02",
    title: "USA Market Mastery",
    description:
      "Strategically built for US SERPs across all 50 states. We understand local search dynamics.",
  },
  {
    number: "03",
    title: "Transparent Reporting",
    description:
      "Monthly reports tied to real business metrics like leads, calls, and revenue attribution.",
  },
  {
    number: "04",
    title: "Algorithm-Proof Strategy",
    description:
      "Every campaign follows Google&apos;s March 2026 guidelines, E-E-A-T principles, and AI-ready optimization.",
  },
];

const stats = [
  { value: "+75%", label: "Avg. Visibility Growth", icon: TrendingUp },
  { value: "200+", label: "US Clients Served", icon: Users },
  { value: "10+", label: "Years Combined Experience", icon: Award },
  { value: "100%", label: "US-Focused Team", icon: Shield, highlight: true },
];

const certifications = [
  "Google Partner",
  "Semrush Certified",
  "Ahrefs Certified",
  "HubSpot Certified",
];

const teamMembers = [
  {
    name: "Sarah Jenkins",
    title: "Founder & Lead Strategist",
    bio: "10+ years in enterprise SEO. Former Head of SEO at a Fortune 500 company.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Marcus Thorne",
    title: "Technical SEO Director",
    bio: "Expert in Shopify technical SEO. Has audited 500+ ecommerce sites.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-block rounded-full bg-[#f7f8fc] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#1a3c8f]">
              Why SearchPrex
            </span>
            <h2 className="mb-4 text-4xl font-black leading-tight text-[#0a0f2e] sm:text-5xl">
              <span className="text-balance">Senior Expertise. Zero Intermediaries.</span>
            </h2>
            <p className="mb-8 text-lg text-[#64748b]">
              Every campaign is led by senior SEO professionals with 10+ years of experience. No account managers, no junior staff learning on your dime.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">
                    {reason.number}
                  </span>
                  <div>
                    <h3 className="mb-1 font-bold text-[#0a0f2e]">
                      {reason.title}
                    </h3>
                    <p className="text-[#64748b]">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-8 border-t border-[#e5e7eb] pt-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#64748b]">
                Certifications & Partners
              </p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full border border-[#e5e7eb] bg-[#f7f8fc] px-3 py-1 text-xs font-medium text-[#374151]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`rounded-2xl p-6 ${
                    stat.highlight
                      ? "bg-[#0a0f2e] text-white"
                      : "bg-[#f7f8fc] text-[#0a0f2e]"
                  }`}
                >
                  <stat.icon className={`mb-3 h-6 w-6 ${stat.highlight ? "text-[#2563eb]" : "text-[#1a3c8f]"}`} />
                  <p className="mb-1 text-3xl font-black">{stat.value}</p>
                  <p
                    className={`text-xs font-medium uppercase tracking-widest ${
                      stat.highlight ? "text-white/80" : "text-[#64748b]"
                    }`}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Team Section - EEAT Expertise Signal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6"
            >
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#64748b]">
                Meet Our Leadership
              </h3>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#0a0f2e]">{member.name}</p>
                      <p className="text-sm font-medium text-[#2563eb]">{member.title}</p>
                      <p className="mt-1 text-xs text-[#64748b]">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* EEAT Compliance Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-2xl bg-[#1a3c8f] p-6 text-white"
            >
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 flex-shrink-0 text-[#2563eb]" />
                <div>
                  <h3 className="mb-2 font-bold">Google E-E-A-T Compliant</h3>
                  <p className="text-sm text-white/80">
                    Our strategies are built around Experience, Expertise, Authoritativeness, and Trustworthiness - the core signals Google uses to evaluate content quality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
