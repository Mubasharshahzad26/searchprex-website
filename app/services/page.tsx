import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ChatWidget from "@/components/ChatWidget";
import {
  ArrowRight, Check, Shield, BarChart2, MapPin,
  Settings, FileText, Zap, Star, Clock, Phone,
} from "lucide-react";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
export const metadata: Metadata = {
  title: "SEO Services — SearchPrex | Law Firm, Ecommerce & Local SEO",
  description:
    "Specialist SEO services for law firms, ecommerce stores, and local businesses. Technical SEO, local SEO, content SEO — founder-led, revenue-focused, zero juniors.",
  alternates: { canonical: "https://searchprex.com/services" },
  openGraph: {
    title: "SEO Services — SearchPrex",
    description: "Law Firm SEO, Ecommerce SEO, Local SEO, Technical SEO — all founder-led, revenue-focused.",
    url: "https://searchprex.com/services",
    type: "website",
  },
};
 
const services = [
  {
    icon: Shield,
    color: "#534AB7",
    bg:    "#f5f3ff",
    border: "#DDD6FE",
    label: "Law Firm SEO",
    tagline: "Get More Cases From Google",
    desc: "We help attorneys rank #1 in their city — E-E-A-T content, local pack domination, attorney schema, and practice area pages that convert searchers into clients.",
    href: "/services/law-firm-seo",
    stats: ["#1 rankings in 6 weeks", "+380% visibility avg", "47 leads/month"],
    badge: "Most popular",
  },
  {
    icon: BarChart2,
    color: "#0891b2",
    bg:    "#ecfeff",
    border: "#a5f3fc",
    label: "Ecommerce SEO",
    tagline: "Turn Your Store Into a Revenue Machine",
    desc: "Product page optimization at scale, crawl budget fixes, Core Web Vitals, category page SEO, and content that brings buyers — not just browsers.",
    href: "/services/ecommerce-seo",
    stats: ["+75% revenue (SMK)", "+285% indexing", "12K+ pages indexed"],
  },
  {
    icon: MapPin,
    color: "#059669",
    bg:    "#ecfdf5",
    border: "#d1fae5",
    label: "Local SEO",
    tagline: "Own Every Corner of Your City",
    desc: "GBP optimization, citation building across 50+ directories, neighborhood-level content, and review velocity programs that put you in the local pack.",
    href: "/services/local-seo",
    stats: ["Top 3 Maps pack", "AI Overview featured", "+5.7x organic calls"],
  },
  {
    icon: Settings,
    color: "#7c3aed",
    bg:    "#f5f3ff",
    border: "#DDD6FE",
    label: "Technical SEO",
    tagline: "Fix the Foundation. Make Google Love Your Site.",
    desc: "Full site crawl, Core Web Vitals (LCP/INP/CLS), schema markup, indexation recovery, redirect audits, and site architecture — all implemented, not just reported.",
    href: "/services/technical-seo",
    stats: ["+476% impressions", "+285% indexing rate", "48hr audit delivery"],
  },
  {
    icon: FileText,
    color: "#d97706",
    bg:    "#fffbeb",
    border: "#fde68a",
    label: "Content SEO",
    tagline: "Content That Ranks, Converts & Compounds",
    desc: "E-E-A-T aligned content strategy — buyer-intent blog posts, pillar pages, FAQ schema, topical authority clusters — written for your niche, not for word counts.",
    href: "/services/content-seo",
    stats: ["Topical authority", "Featured snippets", "AI citation optimized"],
  },
  {
    icon: Zap,
    color: "#be185d",
    bg:    "#fdf2f8",
    border: "#fbcfe8",
    label: "AI & GEO Optimization",
    tagline: "Get Found in ChatGPT, Perplexity & Google AI",
    desc: "Generative Engine Optimization — get your brand cited in AI Overviews, ChatGPT answers, and Perplexity results when your ideal customers ask questions in your niche.",
    href: "/services/content-seo",
    stats: ["AI citation building", "Answer engine opt.", "LLMs SEO"],
    badge: "New",
  },
];
 
const whyUs = [
  { icon: Shield, text: "Founder works every account — zero juniors" },
  { icon: BarChart2, text: "Revenue-focused KPIs, not vanity metrics" },
  { icon: Clock, text: "Weekly reports, every Monday" },
  { icon: Star, text: "No contracts — cancel anytime" },
];
 
export default function ServicesPage() {
  return (
    <>
      <Nav />
      {/* GREY page bg */}
      <main className="bg-[#eaecf3] pt-20">
 
        {/* ── HERO — grey ── */}
        <section className="border-b border-[#d4d8e3] bg-[#eaecf3] py-20 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-sm"
              style={{ color: GREEN_DARK }}
            >
              Specialist SEO Services
            </span>
            <h1 className="mb-5 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
              Deep Expertise.<br />
              <span style={{ color: GREEN }}>Not a Menu of Options.</span>
            </h1>
            <p className="mb-8 text-lg text-[#475569] leading-relaxed">
              Every service connects to one outcome — growing your revenue organically. We go deep in your niche, not broad across every industry. Pick your service or get a free audit first.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: "0 10px 25px -5px rgba(62,180,137,0.4)" }}
              >
                Get Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+923106526316"
                className="flex items-center gap-2 rounded-xl border border-[#cbd0db] bg-white px-7 py-3.5 text-sm font-bold text-[#374151] transition-all hover:border-[#3eb489] hover:text-[#2f9670]"
              >
                <Phone className="h-4 w-4" /> Talk to Founder
              </a>
            </div>
          </div>
        </section>
 
        {/* ── SERVICES GRID — grey ── */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-3 text-base text-[#64748b]">
                Click any service to see full details, case studies, and our proven process.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((svc) => (
                <Link
                  key={svc.label}
                  href={svc.href}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(10,15,46,0.18)]"
                >
                  {/* Badge */}
                  {svc.badge && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: svc.bg, color: svc.color }}>
                        {svc.badge}
                      </span>
                    </div>
                  )}
 
                  {/* Top color bar */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: svc.color }} />
 
                  <div className="flex flex-1 flex-col p-6">
                    {/* Icon + label */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: svc.bg }}>
                        <svc.icon className="h-5 w-5" style={{ color: svc.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest" style={{ color: svc.color }}>{svc.label}</div>
                        <div className="text-sm font-black text-[#0a0f2e] leading-tight">{svc.tagline}</div>
                      </div>
                    </div>
 
                    {/* Description */}
                    <p className="mb-5 text-sm text-[#64748b] leading-relaxed flex-1">{svc.desc}</p>
 
                    {/* Stats pills */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {svc.stats.map((s) => (
                        <span key={s} className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium" style={{ borderColor: svc.border, color: svc.color, backgroundColor: svc.bg }}>
                          <Check className="h-3 w-3" />{s}
                        </span>
                      ))}
                    </div>
 
                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-3" style={{ color: svc.color }}>
                      View full details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── WHY SEARCHPREX — white ── */}
        <section className="border-t border-[#d4d8e3] bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyUs.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(62,180,137,0.12)" }}>
                    <Icon className="h-4 w-4" style={{ color: GREEN_DARK }} />
                  </div>
                  <p className="text-sm font-medium text-[#374151]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── FINAL CTA — dark navy + green ── */}
        <section className="bg-[#0a0f2e] py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Not sure which service you need?</p>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-white">
              Start With a Free Audit.<br />We&apos;ll Tell You Exactly What to Fix.
            </h2>
            <p className="mb-8 text-base text-white/70 leading-relaxed">
              The founder personally reviews your site and tells you exactly which service will move the needle most — with no obligation to hire us.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Get Free Audit <ArrowRight className="h-4 w-4" />
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
 
















































