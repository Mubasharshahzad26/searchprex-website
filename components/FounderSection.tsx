"use client";
 
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ExternalLink, Star, Users, Clock } from "lucide-react";
 
const credentials = [
  { label: "Google Analytics Certified", sub: "Verified 2025", color: "#185FA5", bg: "#E6F1FB" },
  { label: "Semrush Academy", sub: "SEO Fundamentals", color: "#1D9E75", bg: "#E1F5EE" },
  { label: "Upwork Top Rated", sub: "SEO Expert", color: "#27500A", bg: "#EAF3DE" },
];
 
const whyFounder = [
  { icon: Users, title: "Direct founder access", sub: "Talk to me — not a junior exec or account manager" },
  { icon: Star,  title: "100% transparent", sub: "Real GSC + GA4 data every month, no fluff" },
  { icon: Clock, title: "24hr reply guarantee", sub: "Your success is my reputation on the line" },
];
 
export default function FounderSection() {
  return (
    <section className="relative bg-[#f0f4ff] py-20">
      {/* Subtle grid bg */}
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#534AB7] to-[#185FA5] text-2xl font-black text-white shadow-md">
                  M
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0a0f2e]">Mubashar Shahzad</h3>
                  <p className="text-sm font-semibold text-[#185FA5]">Founder &amp; CEO · SearchPrex</p>
                  <p className="text-xs text-[#64748b]">SEO Analyst · 4+ years experience</p>
                </div>
              </div>
 
              {/* Quote */}
              <blockquote className="mb-6 border-l-4 border-[#534AB7] pl-4 text-sm leading-relaxed text-[#374151] italic">
                "I started SearchPrex because too many law firms and local businesses get burned by generic agencies that assign junior staff and disappear after onboarding. Every strategy we run is built on real GSC data, first-hand testing, and transparent monthly reporting — no fluff, no AI-spun content, no excuses."
              </blockquote>
 
              {/* Credentials */}
              <div className="mb-6 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-3 py-2"
                    style={{ background: c.bg }}
                  >
                    <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: c.color }} />
                    <div>
                      <div className="text-xs font-semibold" style={{ color: c.color }}>{c.label}</div>
                      <div className="text-[10px] text-[#64748b]">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
 
              {/* Authority links */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://www.linkedin.com/in/mubashar-shahzad-seo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#E6F1FB] px-4 py-2 text-xs font-semibold text-[#0C447C] transition-colors hover:bg-[#B5D4F4]"
                >
                  <svg className="h-4 w-4 fill-[#0C447C]" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn Profile
                  <ExternalLink className="h-3 w-3" />
                </Link>
 
                <Link
                  href="https://www.researchgate.net/profile/Mubashar-Shahzad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-[#FAECE7] px-4 py-2 text-xs font-semibold text-[#712B13] transition-colors hover:bg-[#F5C4B3]"
                >
                  <svg className="h-4 w-4 fill-[#712B13]" viewBox="0 0 24 24"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53c.025.147.064.294.112.437.243.744.65 1.303 1.213 1.68.565.376 1.255.564 2.073.564.818 0 1.508-.188 2.073-.563.563-.377.97-.937 1.213-1.68a3.193 3.193 0 0 0 .112-.438c.036-.168.06-.346.078-.529a9 9 0 0 0 .05-.727c.01-.282.013-.622.013-1.017 0-.395-.003-.734-.013-1.016a9 9 0 0 0-.05-.727 7.99 7.99 0 0 0-.078-.53 3.193 3.193 0 0 0-.112-.437c-.243-.744-.65-1.303-1.213-1.68C21.094.19 20.404 0 19.586 0zm0 1.396c.476 0 .87.1 1.177.298.306.198.532.502.674.912.043.13.075.263.095.397a7.549 7.549 0 0 1 .06.46c.01.194.015.432.015.715 0 .282-.004.52-.015.715a7.549 7.549 0 0 1-.06.46 2.29 2.29 0 0 1-.095.397c-.142.41-.368.714-.674.912-.308.198-.701.298-1.177.298-.477 0-.87-.1-1.178-.298-.306-.198-.532-.502-.673-.912a2.29 2.29 0 0 1-.096-.397 7.549 7.549 0 0 1-.06-.46 12.048 12.048 0 0 1-.014-.715c0-.283.004-.52.015-.715.007-.16.027-.317.06-.46.02-.134.052-.267.095-.397.141-.41.367-.714.673-.912.308-.198.701-.298 1.178-.298zM8.217 4.026c-1.244 0-2.27.373-3.076 1.12-.807.746-1.21 1.72-1.21 2.924 0 1.178.37 2.14 1.111 2.882.739.74 1.731 1.111 2.975 1.111.516 0 .985-.07 1.41-.21.422-.14.784-.34 1.084-.596v.636h1.523V4.26h-1.523v.596a3.82 3.82 0 0 0-1.085-.595 3.975 3.975 0 0 0-1.21-.235zm0 1.396c.768 0 1.399.247 1.893.74.495.495.742 1.133.742 1.908 0 .776-.247 1.413-.742 1.908-.494.495-1.125.74-1.893.74-.769 0-1.4-.245-1.894-.74-.494-.495-.741-1.132-.741-1.908 0-.775.247-1.413.741-1.908.494-.493 1.125-.74 1.894-.74zM.667 11.855v1.395H4.26v-1.395H.667zm0 2.79v1.394H4.26v-1.395H.667zm0 2.789v1.394H4.26v-1.394H.667zm5.58 0v1.394h3.592v-1.394H6.247zm5.579 0v1.394h3.592v-1.394h-3.592zm5.58 0v1.394h3.591v-1.394h-3.592z"/></svg>
                  ResearchGate
                  <ExternalLink className="h-3 w-3" />
                </Link>
 
                <div className="flex items-center gap-2 rounded-lg bg-[#EAF3DE] px-4 py-2 text-xs font-semibold text-[#27500A]">
                  <Star className="h-3.5 w-3.5" />
                  4+ Years Experience
                </div>
              </div>
            </div>
          </motion.div>
 
          {/* RIGHT — Why founder-led */}
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
 













