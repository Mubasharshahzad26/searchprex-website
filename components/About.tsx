
"use client";
 
import { motion } from "framer-motion";
import { Shield, Award, Users, TrendingUp, CheckCircle, Star, Mail, Linkedin } from "lucide-react";
import Image from "next/image";
 
const reasons = [
  {
    number: "01",
    title: "We Understand Your Business Niche Better",
    description:
      "We don't do generic SEO. We study your industry, your buyers' journey, your competitors, and your market — then build a strategy designed specifically for your niche. This is our biggest strength.",
  },
  {
    number: "02",
    title: "Revenue Growth Focused SEO Strategy",
    description:
      "We don't chase rankings for vanity. Every decision maps back to one question: does this grow revenue? We target buyer-intent keywords, optimize conversion paths, and measure success in leads and sales.",
  },
  {
    number: "03",
    title: "USA Market Mastery",
    description:
      "Strategically built for US SERPs across all 50 states. We understand local search dynamics, Google's US algorithm preferences, and city-level competition patterns.",
  },
  {
    number: "04",
    title: "Algorithm-Proof Strategy",
    description:
      "Every campaign follows Google's 2026 guidelines, E-E-A-T principles, and AI-ready optimization. We build assets that compound — not tactics that disappear with the next update.",
  },
];
 
const stats = [
  { value: "+75%",  label: "Avg. Visibility Growth",    icon: TrendingUp },
  { value: "20+",   label: "US Clients Served",          icon: Users      },
  { value: "5+",    label: "Years of Experience",        icon: Award      },
  { value: "100%",  label: "Revenue Growth Focused",     icon: Shield, highlight: true },
];
 
const certifications = [
  "Google Partner",
  "Semrush Certified",
  "Ahrefs Certified",
  "HubSpot Certified",
];
 
const eeats = [
  { label: "Experience",       desc: "5+ years executing SEO at scale for real US businesses" },
  { label: "Expertise",        desc: "Deep niche knowledge across law, ecommerce, and local markets" },
  { label: "Authoritativeness",desc: "Verified results published with real GSC data — no vanity metrics" },
  { label: "Trustworthiness",  desc: "No contracts, transparent reporting, founder works every account" },
];
 
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* ── Section header ── */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="mb-4 inline-block rounded-full bg-[#f5f3ff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
            Why SearchPrex
          </motion.span>
          <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black leading-tight tracking-tight text-[#0a0f2e] sm:text-5xl">
            Founder-Led. Niche-Focused.<br />
            <span className="text-[#534AB7]">Revenue-Obsessed.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-[#64748b]">
            Every account is handled personally by the founder — no juniors, no account managers, no templates. We understand your business niche better than any generalist agency ever could.
          </motion.p>
        </motion.div>
 
        {/* ── CEO + Why Us ── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 mb-20">
 
          {/* Left — CEO Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* CEO profile card */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-lg">
              {/* Top purple banner */}
              <div className="h-24 bg-gradient-to-r from-[#534AB7] to-[#7c3aed]" />
              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-12 mb-4 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-md">
                  <Image
                    src="/images/mubashar-shahzad.jpg"
                    alt="Mubashar Shahzad — Founder & Lead SEO Strategist at SearchPrex"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#0a0f2e]">Mubashar Shahzad</h3>
                    <p className="text-sm font-semibold text-[#534AB7]">Founder & Lead SEO Strategist</p>
                    <p className="mt-1 text-xs text-[#64748b]">Works personally on every client account</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="mailto:contact@searchprex.com"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
                      aria-label="Email Mubashar"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/mubasharshahzad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
 
                {/* Quote */}
                <blockquote className="mt-5 border-l-2 border-[#534AB7] pl-4 text-sm italic text-[#64748b] leading-relaxed">
                  "I started SearchPrex because I was tired of watching business owners get burned — by bad agencies, expensive ads, and cookie-cutter strategies. Every client I take on, I treat their revenue like it's my own."
                </blockquote>
 
                {/* Certs */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span key={cert} className="flex items-center gap-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-xs font-medium text-[#374151]">
                      <CheckCircle className="h-3 w-3 text-[#16a34a]" />{cert}
                    </span>
                  ))}
                </div>
 
                {/* Stars */}
                <div className="mt-5 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />)}
                  </div>
                  <span className="text-xs font-medium text-[#64748b]">5.0 · 24 client reviews</span>
                </div>
              </div>
            </div>
 
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-2xl p-5 ${
                    stat.highlight
                      ? "bg-[#534AB7] text-white"
                      : "bg-[#f8fafc] text-[#0a0f2e] border border-[#e2e8f0]"
                  }`}
                >
                  <stat.icon className={`mb-3 h-5 w-5 ${stat.highlight ? "text-[#c4b5fd]" : "text-[#534AB7]"}`} />
                  <p className="mb-1 text-2xl font-black">{stat.value}</p>
                  <p className={`text-xs font-medium uppercase tracking-widest ${stat.highlight ? "text-white/80" : "text-[#64748b]"}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
 
          {/* Right — Why us reasons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#534AB7]">What makes us different</p>
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-5 hover:border-[#534AB7]/30 transition-colors"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#534AB7] text-xs font-black text-white">
                    {reason.number}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-black text-[#0a0f2e]">{reason.title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
 
        {/* ── E-E-A-T Section ── */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-2xl border border-[#534AB7]/20 bg-[#f5f3ff] p-8"
        >
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#534AB7]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-[#0a0f2e]">Google E-E-A-T Compliant Agency</h3>
              <p className="text-sm text-[#64748b]">Every strategy we build is grounded in the four signals Google uses to evaluate trust and quality</p>
            </div>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eeats.map((e) => (
              <motion.div key={e.label} variants={fadeUp} className="rounded-xl bg-white border border-[#AFA9EC]/40 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#534AB7]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#534AB7]">{e.label}</span>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
      </div>
    </section>
  );
}
 