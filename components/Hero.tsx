"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Star, Shield, Award } from "lucide-react";

const specialists = [
  {
    name: "Sarah Jenkins",
    role: "Lead SEO Strategist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    available: true,
  },
  {
    name: "Marcus Thorne",
    role: "Technical SEO Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    available: true,
  },
  {
    name: "Elena Rodriguez",
    role: "Local SEO Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    available: false,
  },
  {
    name: "David Chen",
    role: "Content Strategist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    available: true,
  },
];

const trustBadges = [
  { icon: Shield, text: "Google Partner" },
  { icon: Star, text: "5-Star Reviews" },
  { icon: Award, text: "Top SEO Agency 2026" },
];

interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  stat1Number?: string;
  stat1Label?: string;
  stat2Number?: string;
  stat2Label?: string;
  stat3Number?: string;
  stat3Label?: string;
}

export default function Hero({
  headline = "Dominate Search.",
  subheadline = "SearchPrex delivers senior-led SEO for law firms, ecommerce stores, local businesses, and enterprise companies across all 50 US states.",
  ctaText = "Get Free SEO Audit",
  stat1Number = "200+",
  stat1Label = "US Clients",
  stat2Number = "+380%",
  stat2Label = "Avg. Traffic Growth",
  stat3Number = "50",
  stat3Label = "States Served",
}: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Trust Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#f7f8fc] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a3c8f]">
                USA&apos;s #1 Niche SEO Agency
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-black leading-[1.0] tracking-tight text-[#0a0f2e] sm:text-6xl lg:text-7xl">
              <span className="text-balance">{headline}</span>
              <br />
              <span className="text-[#1a3c8f]">Grow Revenue.</span>
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-lg text-[#64748b] lg:mx-0 lg:text-xl">
              {subheadline}
            </p>

            {/* Trust Badges */}
            <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {trustBadges.map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5">
                  <badge.icon className="h-4 w-4 text-[#1a3c8f]" />
                  <span className="text-xs font-medium text-[#374151]">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="#cta"
                className="inline-flex items-center justify-center rounded-lg bg-[#0a0f2e] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
              >
                {ctaText}
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#e5e7eb] bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0f2e] transition-all hover:border-[#0a0f2e]"
              >
                View Services
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#e5e7eb] pt-8">
              <div>
                <p className="text-2xl font-black text-[#0a0f2e] sm:text-3xl">{stat1Number}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{stat1Label}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#0a0f2e] sm:text-3xl">{stat2Number}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{stat2Label}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#0a0f2e] sm:text-3xl">{stat3Number}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{stat3Label}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f7f8fc]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
                  alt="SearchPrex Senior SEO Strategist"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -left-4 top-8 rounded-xl bg-white p-4 shadow-xl sm:-left-8"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
                      alt="Sarah Jenkins"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#0a0f2e]">Sarah Jenkins</p>
                    <div className="flex items-center gap-1 text-xs text-[#22c55e]">
                      <CheckCircle className="h-3 w-3" />
                      <span className="font-medium uppercase">Verified Expert</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#64748b]">10+ years SEO experience</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -right-2 top-4 rounded-lg bg-[#22c55e] px-3 py-2 text-white shadow-lg sm:-right-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider">March 2026 Ready</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Specialist Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-[#64748b]">
            Meet Our Senior SEO Specialists
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {specialists.map((specialist) => (
              <article
                key={specialist.name}
                className="group relative overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-4 transition-all hover:shadow-lg"
              >
                <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-[#f7f8fc]">
                  <Image
                    src={specialist.image}
                    alt={`${specialist.name} - ${specialist.role}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {specialist.available && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#22c55e] px-2 py-1 text-[10px] font-bold uppercase text-white">
                      Available
                    </span>
                  )}
                </div>
                <p className="font-bold text-[#0a0f2e]">{specialist.name}</p>
                <p className="text-sm text-[#64748b]">{specialist.role}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}