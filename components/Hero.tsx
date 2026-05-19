"use client";
 
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Star, Shield, Award, Calendar, Clock, Video } from "lucide-react";
import { useEffect } from "react";
 
const trustBadges = [
  { icon: Shield, text: "Google Partner" },
  { icon: Star, text: "5-Star Reviews" },
  { icon: Award, text: "Top SEO Agency 2026" },
];
 
const meetingPerks = [
  { icon: Clock, text: "30-min free strategy call" },
  { icon: Video, text: "Google Meet — no download needed" },
  { icon: CheckCircle, text: "No commitment · Reply in 24hrs" },
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
  heroImage?: any;
}
 
export default function Hero({
  headline = "Dominate Search.",
  subheadline = "I've spent 5+ years fixing what big agencies break — bloated strategies, junior handoffs, and zero accountability. At SearchPrex, I work directly on your SEO. No account managers. No templates. Just founder-led strategy built for law firms, local businesses, and ecommerce stores ready to grow.",
  ctaText = "Get Free SEO Audit",
  stat1Number = "285%",
  stat1Label = "Indexed Pages Growth",
  stat2Number = "+75%",
  stat2Label = "Revenue Increased",
  stat3Number = "5+",
  stat3Label = "Years Experience",
  heroImage,
}: HeroProps) {
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
 
  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/contact-searchprex/30min",
      });
    }
  };
 
  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
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
                  FOUNDER-LED SEO. NO JUNIORS. NO FLUFF.
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
 
            {/* Right Content - Calendly Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-2xl">
 
                {/* Card Header */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-4 py-2">
                  <Calendar className="h-4 w-4 text-[#534AB7]" />
                  <span className="text-xs font-bold text-[#534AB7]">Free 30-Min Strategy Call</span>
                </div>
 
                <h3 className="mb-2 text-2xl font-black text-[#0a0f2e]">
                  Talk directly with the founder
                </h3>
                <p className="mb-6 text-sm text-[#64748b]">
                  No sales reps. No junior staff. Just Mubashar — your SEO strategy, built around your goals.
                </p>
 
                {/* Meeting perks */}
                <div className="mb-6 flex flex-col gap-3">
                  {meetingPerks.map((perk) => (
                    <div key={perk.text} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEEDFE]">
                        <perk.icon className="h-4 w-4 text-[#534AB7]" />
                      </div>
                      <span className="text-sm text-[#374151]">{perk.text}</span>
                    </div>
                  ))}
                </div>
 
                {/* Calendly Button */}
                <button
                  onClick={openCalendly}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#3d35a0]"
                >
                  <Calendar className="h-4 w-4" />
                  Book Free Strategy Call
                </button>
 
                {/* Secondary CTA */}
                <Link
                  href="#ai-tool"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#e5e7eb] px-6 py-3 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#0a0f2e]"
                >
                  Get Free SEO Audit Instead →
                </Link>
 
                {/* Social proof */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-[#534AB7] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">{["L", "E", "M"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-[#64748b]">20+ businesses served across the US</span>
                </div>
 
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>
    </>
  );
}