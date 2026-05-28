import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ChatWidget from "@/components/ChatWidget";
import { motion } from "framer-motion"; // remove if SSR issue — use client below
import {
  Check, ArrowRight, Phone, Shield, Clock, Star,
  Search, FileText, BarChart2, MessageSquare, Zap,
} from "lucide-react";
 
export const metadata: Metadata = {
  title: "SEO Pricing — SearchPrex | Custom Strategy First",
  description:
    "No generic packages. We audit your site first, understand your goals, then quote a custom plan. Get your free SEO audit today.",
  alternates: { canonical: "https://searchprex.com/pricing" },
  openGraph: {
    title: "SEO Pricing — SearchPrex",
    description: "Custom SEO pricing based on your actual needs — not cookie-cutter packages.",
    url: "https://searchprex.com/pricing",
    type: "website",
  },
};
 
export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="bg-white pt-20">
 
        {/* ── HERO ── */}
        <section className="border-b border-[#e2e8f0] bg-white py-20 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <span className="mb-4 inline-block rounded-full bg-[#f5f3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
              Transparent Pricing
            </span>
            <h1 className="mb-5 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
              No Cookie-Cutter Packages.<br />
              <span className="text-[#534AB7]">Just What You Actually Need.</span>
            </h1>
            <p className="mb-8 text-lg text-[#64748b] leading-relaxed">
              Every business is different. A law firm in Dallas has different SEO needs than a Shopify store in Chicago. We audit your site first — then build a custom plan with transparent pricing based on your actual goals.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-[#534AB7] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all hover:bg-[#3C3489] hover:-translate-y-0.5"
              >
                Get Free Audit First <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-7 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
              >
                <Phone className="h-4 w-4" /> Talk to Founder
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {["Free audit — no obligation", "24hr turnaround", "Founder does the audit"].map((t) => (
                <span key={t} className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Check className="h-4 w-4 text-[#16a34a]" />{t}
                </span>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── WHY CUSTOM PRICING ── */}
        <section className="bg-[#f8fafc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                Why We Don't Do Fixed Packages
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-[#64748b] leading-relaxed">
                Most agencies sell you the same $1,500/mo package whether you have 10 pages or 10,000. We think that's wrong. Here's why custom pricing works better for you.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Search,
                  color: "#534AB7", bg: "#f5f3ff",
                  title: "Audit reveals the real problem",
                  body: "We find your actual issues first — crawl budget waste, thin content, GBP problems — then price based on what it actually takes to fix them. No guessing.",
                },
                {
                  icon: BarChart2,
                  color: "#059669", bg: "#ecfdf5",
                  title: "You only pay for what you need",
                  body: "A local plumber doesn't need the same SEO as a 10,000-product ecommerce store. Custom pricing means you're not paying for services that don't apply to you.",
                },
                {
                  icon: FileText,
                  color: "#0891b2", bg: "#ecfeff",
                  title: "Tied to your revenue goals",
                  body: "We size every engagement based on your revenue target, not an arbitrary package tier. The plan is built around what it takes to hit your number.",
                },
                {
                  icon: Shield,
                  color: "#d97706", bg: "#fffbeb",
                  title: "Full transparency always",
                  body: "You see exactly what's included, what it costs, and what outcome to expect. No hidden fees, no auto-renewals, no surprise charges.",
                },
                {
                  icon: Zap,
                  color: "#7c3aed", bg: "#f5f3ff",
                  title: "No long-term contracts",
                  body: "We earn your business every month with results. Stay because it works — not because you're locked in. Cancel anytime with 30 days notice.",
                },
                {
                  icon: MessageSquare,
                  color: "#be185d", bg: "#fdf2f8",
                  title: "Direct founder communication",
                  body: "You talk to the person doing the work. Not an account manager. Not a junior. The founder — who understands your niche and treats your revenue like their own.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: item.bg }}>
                    <item.icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-black text-[#0a0f2e]">{item.title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── HOW PRICING WORKS ── */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-[#f5f3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                Our Process
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                How Custom Pricing Works
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Free Audit",        body: "Submit your URL. The founder personally audits your site — technical issues, content gaps, competitor analysis.", icon: "🔍" },
                { step: "02", title: "Strategy Call",     body: "We walk through findings together and discuss your revenue goals, timeline, and what it actually takes to get there.", icon: "📞" },
                { step: "03", title: "Custom Proposal",   body: "You receive a detailed proposal — scope, deliverables, timeline, and transparent monthly cost. No surprises.", icon: "📋" },
                { step: "04", title: "Start & Report",    body: "We start work immediately. Weekly reports, direct access, and real results — measured in revenue, not just rankings.", icon: "🚀" },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#534AB7] text-sm font-black text-white">{s.step}</div>
                  <div className="mb-2 text-2xl">{s.icon}</div>
                  <h3 className="mb-2 font-black text-[#0a0f2e]">{s.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── WHAT'S ALWAYS INCLUDED ── */}
        <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                What's Always Included
              </h2>
              <p className="mt-3 text-base text-[#64748b]">Regardless of scope, every SearchPrex engagement includes these non-negotiables.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Founder works your account personally — zero juniors",
                "Weekly SEO reports — plain English, every Monday",
                "Direct GSC + GA4 access — your data, always live",
                "No contracts — cancel anytime with 30 days notice",
                "Revenue-focused KPIs — leads, calls & sales tracked",
                "E-E-A-T content strategy aligned to your niche",
                "Competitor gap analysis — updated monthly",
                "Priority email & call access to the founder directly",
                "Transparent change log — every action documented",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-[#e2e8f0] bg-white p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" />
                  <span className="text-sm text-[#374151]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── TYPICAL RANGES (transparency) ── */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block rounded-full bg-[#f5f3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                Ballpark Ranges
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                Typical Investment Ranges
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-[#64748b]">
                Exact pricing depends on your audit findings. These ranges give you a realistic idea of what to expect.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  niche: "Local SEO",
                  range: "$800 – $1,500 / mo",
                  color: "#059669", bg: "#ecfdf5", border: "#d1fae5",
                  includes: ["GBP optimization", "Citation building", "Local content", "Review strategy", "Weekly reports"],
                  best: "Local service businesses, single-location",
                },
                {
                  niche: "Law Firm SEO",
                  range: "$1,200 – $2,500 / mo",
                  color: "#534AB7", bg: "#f5f3ff", border: "#DDD6FE",
                  includes: ["Practice area pages", "Local pack targeting", "E-E-A-T content", "Attorney schema", "Link building"],
                  best: "Solo attorneys to multi-partner firms",
                  featured: true,
                },
                {
                  niche: "Ecommerce SEO",
                  range: "$1,500 – $4,000 / mo",
                  color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc",
                  includes: ["Product page optimization", "Technical SEO at scale", "Category page content", "Schema markup", "GSC resubmission"],
                  best: "Shopify & WooCommerce stores",
                },
              ].map((plan) => (
                <div
                  key={plan.niche}
                  className={`relative rounded-2xl border-2 p-6 ${plan.featured ? "border-[#534AB7] shadow-lg shadow-[#534AB7]/10" : "border-[#e2e8f0]"}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#534AB7] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">Most popular</span>
                    </div>
                  )}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-lg px-3 py-1 text-xs font-bold" style={{ backgroundColor: plan.bg, color: plan.color }}>{plan.niche}</span>
                  </div>
                  <div className="mb-1 text-2xl font-black text-[#0a0f2e]">{plan.range}</div>
                  <p className="mb-5 text-xs text-[#64748b]">Best for: {plan.best}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                        <Check className="h-4 w-4 shrink-0" style={{ color: plan.color }} />{item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/free-audit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all"
                    style={plan.featured
                      ? { backgroundColor: "#534AB7", color: "#fff" }
                      : { backgroundColor: plan.bg, color: plan.color }}
                  >
                    Get Custom Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-[#64748b]">
              * All prices are starting ranges. Final pricing is determined after your free audit.
            </p>
          </div>
        </section>
 
        {/* ── TRUST ── */}
        <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Shield, text: "No contracts · Cancel anytime" },
                { icon: Clock,  text: "24hr audit turnaround" },
                { icon: Star,   text: "5.0 · 24 client reviews" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Icon className="h-4 w-4 text-[#534AB7]" />{text}
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── FINAL CTA ── */}
        <section className="bg-[#534AB7] py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c4b5fd]">Ready to get started?</p>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-white">
              Start With a Free Audit.<br />Pay Only If It Makes Sense.
            </h2>
            <p className="mb-8 text-base text-[#c4b5fd] leading-relaxed">
              No commitment, no credit card, no sales pressure. Get a real audit by the founder — then decide if we're the right fit.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#534AB7] shadow-lg transition-all hover:bg-[#f5f3ff] hover:-translate-y-0.5"
              >
                Claim Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +92 310 652 6316
              </a>
            </div>
          </div>
        </section>
 
      </main>
      <ChatWidget />
    </>
  );
}
 













