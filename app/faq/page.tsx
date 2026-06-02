"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown, ChevronUp, ArrowRight, Phone, Search,
  Sparkles, Shield, HelpCircle,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
/* ─── FAQ DATA — grouped, 2026 core-update aware ─── */
const faqGroups = [
  {
    category: "Google 2026 Core Updates",
    icon: Sparkles,
    faqs: [
      {
        q: "How do the March and May 2026 Google core updates affect my rankings?",
        a: "Google rolled out two broad core updates in quick succession — the March 2026 update (March 27 to April 8) and the May 2026 update (started May 21, completing in early June). Both reward the same thing: original, people-first content from a verifiable expert. Sites that publish first-hand experience, proprietary data, and real case studies gained; thin, generic, or aggregated content that simply repeats what others say lost ground. Our entire approach is built around these exact signals.",
      },
      {
        q: "My traffic dropped after the 2026 core updates — can you help recover it?",
        a: "Yes. Core updates don't penalize sites — they re-weight quality signals and promote content that better demonstrates expertise and originality. Recovery comes from genuinely improving content quality, strengthening E-E-A-T, and removing thin or duplicate pages — not quick fixes. We audit exactly which pages and signals were affected using your Search Console data, then rebuild around what the 2026 algorithm rewards. Meaningful recovery typically takes a few weeks to a few months as Google recrawls.",
      },
      {
        q: "What is E-E-A-T and why does it matter more in 2026?",
        a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. The 2026 core updates made it clear that Google is less confident ranking content it can't attribute to a credible, named source. Content from authors with verifiable credentials and a consistent publishing history wins; anonymous or generic-profile content loses regardless of quality. We attribute every piece to a real, credentialed author and back it with first-hand experience signals.",
      },
      {
        q: "Does Google penalize AI-generated content after the 2026 updates?",
        a: "Not categorically. The March 2026 update does not penalize AI-assisted content by default. What loses is content with nothing original — no first-hand perspective, data, or expertise that exists nowhere else. Content that is AI-assisted but substantially shaped, edited, and verified by a named human expert, grounded in original insight, can still rank well. We write people-first content with genuine expertise, never mass-produced filler.",
      },
    ],
  },
  {
    category: "AI Search, AI Overviews & GEO",
    icon: Search,
    faqs: [
      {
        q: "What is AI Overview optimization (GEO / AIO)?",
        a: "Generative Engine Optimization (GEO) and AI Optimization (AIO) mean structuring your content, schema, and authority signals so your business gets cited in AI answers — Google AI Overviews, ChatGPT, Perplexity, and Gemini. With AI Overviews now serving billions of monthly users, being cited in AI answers is becoming as important as ranking #1 in traditional search. We optimize for both.",
      },
      {
        q: "Will AI Overviews reduce my organic clicks?",
        a: "AI Overviews change how clicks are distributed — for some informational queries, users get answers without clicking. That's exactly why we focus on getting your brand cited inside those AI answers, and on high-intent, transactional queries where users still click through to act. The goal is visibility everywhere your customers look, not just blue links.",
      },
      {
        q: "How do you get a business cited in ChatGPT or Google AI Overviews?",
        a: "AI engines cite sources they trust and can clearly understand. We build that trust through structured data (schema), clear entity signals, verifiable author credentials, consistent NAP and brand information, and genuinely authoritative content. The same E-E-A-T foundation that wins core updates is what gets you cited in AI answers.",
      },
    ],
  },
  {
    category: "Working With SearchPrex",
    icon: Shield,
    faqs: [
      {
        q: "What makes SearchPrex different from other SEO agencies?",
        a: "Founder-led execution — no juniors, no outsourcing. The founder personally works on your account, with verifiable Semrush certifications and real, GSC-backed client results (like +476% organic clicks and +75% revenue growth). In a post-2026 world where Google rewards proven expertise over generic agencies, that hands-on, credentialed approach is exactly what moves rankings.",
      },
      {
        q: "How long before I see SEO results?",
        a: "Most clients see early movement in 30–60 days, with stronger ranking and traffic gains over 90 days and beyond. SEO is a long-term investment — the 2026 updates reward consistent, genuine quality improvements over time, not overnight tricks. We report progress transparently every Monday so you always know where things stand.",
      },
      {
        q: "Do you provide reports and proof of work?",
        a: "Yes — plain-English reports every Monday covering rankings, traffic, indexing, and next steps, all backed by real Google Search Console and Analytics data. No vanity metrics. You see exactly what's working and what's next.",
      },
      {
        q: "Is there a long-term contract?",
        a: "No long-term contracts. We earn your business every month with results — more visibility, more leads, more revenue. You can adjust or cancel anytime.",
      },
      {
        q: "Which industries and locations do you serve?",
        a: "We specialize in law firms, ecommerce/Shopify stores, and local service businesses (HVAC, dental, restaurants, contractors, and more) across all 50 U.S. states, with a focus on CA, TX, FL, NY, and IL. Every strategy is tailored to your industry and target market.",
      },
    ],
  },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
 
/* ─── PAGE ─── */
export default function FAQPage() {
  const [open, setOpen] = useState<string | null>("0-0");
 
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#d4d8e3] bg-[#eaecf3] pt-28 pb-14">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition-colors hover:text-[#534AB7]">
            ← Back to Home
          </Link>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
            <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            SEO Questions, Answered
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#475569] leading-relaxed">
            Everything you need to know about SEO in the AI-search era — built around Google&apos;s March &amp; May 2026 core updates, E-E-A-T, and AI Overviews.
          </p>
        </div>
      </section>
 
      {/* ── FAQ GROUPS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {faqGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-10"
              >
                {/* Group header */}
                <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(62,180,137,0.12)" }}>
                    <Icon className="h-4 w-4" style={{ color: GREEN_DARK }} />
                  </div>
                  <h2 className="text-lg font-black tracking-tight text-[#0a0f2e]">{group.category}</h2>
                </motion.div>
 
                {/* FAQ items */}
                <motion.div variants={fadeUp} className="divide-y divide-[#e2e8f0] overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
                  {group.faqs.map((f, fi) => {
                    const id = `${gi}-${fi}`;
                    const isOpen = open === id;
                    return (
                      <div key={id}>
                        <button
                          onClick={() => setOpen(isOpen ? null : id)}
                          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f8fafc]"
                        >
                          <span className="font-bold text-[#0a0f2e]">{f.q}</span>
                          {isOpen
                            ? <ChevronUp className="h-4 w-4 shrink-0" style={{ color: GREEN_DARK }} />
                            : <ChevronDown className="h-4 w-4 shrink-0 text-[#64748b]" />}
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-5 text-sm leading-relaxed text-[#64748b]">{f.a}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>
 
      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>
              Still have questions?
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-4xl font-black tracking-tight text-white">
              Let&apos;s Talk About Your SEO.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70 leading-relaxed">
              Get a free SEO audit — the founder personally reviews your site against the latest 2026 core updates and delivers a clear growth roadmap within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Get Free SEO Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +92 310 652 6316
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
 
    </main>
  );
}
 





























































