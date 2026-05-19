"use client";
 
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ExternalLink, Star, Users, Clock } from "lucide-react";
 
const credentials = [
  {
    label: "Technical SEO & AI Search",
    sub: "Expires Oct 2026",
    color: "#185FA5",
    bg: "#E6F1FB",
    href: "https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf",
  },
  {
    label: "AI-Powered Marketer",
    sub: "Expires Oct 2026",
    color: "#1D9E75",
    bg: "#E1F5EE",
    href: "https://static.semrush.com/academy/certificates/e2cb11d7cb/mubashar-shahzad_26.pdf",
  },
  {
    label: "Digital PR with Brian Dean",
    sub: "Expires Oct 2026",
    color: "#27500A",
    bg: "#EAF3DE",
    href: "https://static.semrush.com/academy/certificates/7ec9b0d154/mubashar-shahzad_2.pdf",
  },
  {
    label: "PPC Automation",
    sub: "Semrush Academy",
    color: "#712B13",
    bg: "#FAECE7",
    href: "https://static.semrush.com/academy/certificates/0053423184/mubashar-shahzad_2.pdf",
  },
];
 
const whyFounder = [
  { icon: Users, title: "Direct founder access", sub: "Talk to me — not a junior exec or account manager" },
  { icon: Star, title: "100% transparent", sub: "Real GSC + GA4 data every month, no fluff" },
  { icon: Clock, title: "24hr reply guarantee", sub: "Your success is my reputation on the line" },
];
 
const profileLinks = [
  {
    href: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
    label: "LinkedIn",
    bg: "#E6F1FB",
    textColor: "#0C447C",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.upwork.com/freelancers/~01400266ea842005be",
    label: "Upwork",
    bg: "#EAF3DE",
    textColor: "#27500A",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.438-5.439-5.438z" />
      </svg>
    ),
  },
  {
    href: "https://www.researchgate.net/profile/Mubashar-Shahzad-4",
    label: "ResearchGate",
    bg: "#FAECE7",
    textColor: "#712B13",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53c.025.147.064.294.112.437.243.744.65 1.303 1.213 1.68.565.376 1.255.564 2.073.564.818 0 1.508-.188 2.073-.563.563-.377.97-.937 1.213-1.68a3.193 3.193 0 0 0 .112-.438c.036-.168.06-.346.078-.529a9 9 0 0 0 .05-.727c.01-.282.013-.622.013-1.017 0-.395-.003-.734-.013-1.016a9 9 0 0 0-.05-.727 7.99 7.99 0 0 0-.078-.53 3.193 3.193 0 0 0-.112-.437c-.243-.744-.65-1.303-1.213-1.68C21.094.19 20.404 0 19.586 0z" />
      </svg>
    ),
  },
  {
    href: "https://medium.com/@mubasharshahzad726",
    label: "Medium",
    bg: "#F1EFE8",
    textColor: "#2C2C2A",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    href: "https://www.remotehub.com/mubashar.shahzad",
    label: "RemoteHub",
    bg: "#EEEDFE",
    textColor: "#3C3489",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3a7 7 0 100 14A7 7 0 0012 7z" />
      </svg>
    ),
  },
];
 
export default function FounderSection() {
  return (
    <section className="relative bg-[#f0f4ff] py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
 
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B5D4F4] bg-[#E6F1FB] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0C447C]">
            <CheckCircle className="h-3.5 w-3.5" />
            Founder-led agency · E-E-A-T verified
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            Meet the founder
          </h2>
          <p className="mt-3 text-[#64748b]">
            You work directly with me — not a rotating team of juniors
          </p>
        </motion.div>
 
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
 
          {/* LEFT — CEO card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-[#B5D4F4] bg-white p-8 shadow-sm">
 
              {/* Avatar + name */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#534AB7] shadow-md">
                  <Image
                    src="/images/mubashar-shahzad.jpg"
                    alt="Mubashar Shahzad - Founder & CEO SearchPrex"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0a0f2e]">Mubashar Shahzad</h3>
                  <p className="text-sm font-semibold text-[#185FA5]">Founder &amp; CEO · SearchPrex</p>
                  <p className="text-xs text-[#64748b]">SEO Analyst · 5+ years experience</p>
                  <div className="mt-1 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#EF9F27] text-[#EF9F27]" />
                    ))}
                    <span className="ml-1 text-[10px] text-[#64748b]">Upwork Top Rated</span>
                  </div>
                </div>
              </div>
 
              {/* Quote */}
              <blockquote className="mb-6 border-l-4 border-[#534AB7] pl-4 text-sm leading-relaxed text-[#374151] italic">
                "I started SearchPrex because too many law firms and local businesses get burned by generic agencies that assign junior staff and disappear after onboarding. Every strategy we run is built on real GSC data, first-hand testing, and transparent monthly reporting — no fluff, no AI-spun content, no excuses."
              </blockquote>
 
              {/* Semrush Certificates — clickable */}
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#64748b]">
                Semrush Certified — Click to Verify ↗
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-3 py-2 transition-opacity hover:opacity-75"
                    style={{ background: c.bg }}
                  >
                    <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: c.color }} />
                    <div>
                      <div className="text-xs font-semibold" style={{ color: c.color }}>{c.label}</div>
                      <div className="text-[10px] text-[#64748b]">{c.sub} · View ↗</div>
                    </div>
                  </Link>
                ))}
              </div>
 
              {/* Profile Links */}
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#64748b]">
                Find me online
              </p>
              <div className="flex flex-wrap gap-2">
                {profileLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-75"
                    style={{ background: link.bg, color: link.textColor }}
                  >
                    {link.icon}
                    {link.label}
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </Link>
                ))}
              </div>
 
            </div>
          </motion.div>
 
          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-black text-[#0a0f2e]">
                Why work directly with the founder?
              </h3>
              <div className="flex flex-col gap-4">
                {whyFounder.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#EEEDFE]">
                      <item.icon className="h-5 w-5 text-[#534AB7]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0f2e]">{item.title}</p>
                      <p className="text-sm text-[#64748b]">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "5+", label: "Years Experience" },
                { num: "20+", label: "Clients Served" },
                { num: "100%", label: "Founder-Led" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#534AB7]">{stat.num}</p>
                  <p className="mt-1 text-[10px] font-medium text-[#64748b]">{stat.label}</p>
                </div>
              ))}
            </div>
 
            {/* Mini CTA */}
            <div className="rounded-2xl bg-[#0a0f2e] p-6 text-white">
              <p className="mb-2 text-sm font-semibold text-white/60 uppercase tracking-widest">Ready to talk?</p>
              <p className="mb-4 text-lg font-black">Get a free 30-min strategy call</p>
              <Link
                href="#ai-tool"
                className="inline-flex items-center gap-2 rounded-lg bg-[#534AB7] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#3C3489]"
              >
                Book Consultation
              </Link>
              <p className="mt-3 text-xs text-white/40">No commitment · Reply within 24hrs</p>
            </div>
          </motion.div>
 
        </div>
      </div>
    </section>
  );
}