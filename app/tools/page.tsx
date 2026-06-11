"use client";
 
// app/tools/ToolsClient.tsx
// Tools page UI. Improvements over the old version:
// 1. Cards sorted live → pro → soon (dead cards no longer sit mid-grid)
// 2. Stats reframed (no more "1 live now" underselling)
// 3. Founder E-E-A-T strip with case-study link
// 4. Mid-page audit CTA — converts tool users (hot leads) into audits
// 5. FAQ (matches FAQPage schema in page.tsx) + floating Reality Check CTA
 
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, Search, FileText, Bot, TrendingUp, CheckCircle, ArrowRight,
  Sparkles, Zap, Lock, Linkedin, BadgeCheck, BarChart3, ChevronDown,
} from "lucide-react";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
 
const tools = [
  {
    id: "schema-generator",
    icon: Code2,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    accentColor: "#534AB7",
    label: "Schema Markup Generator",
    desc: "Generate JSON-LD schema for Local Business, Law Firm, Product, FAQ, Article & Review — instantly.",
    tags: ["JSON-LD", "Rich Results", "Structured Data"],
    status: "live",
    href: "/tools/schema-generator",
    stats: "6 schema types",
  },
  {
    id: "content-generator",
    icon: Sparkles,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    accentColor: "#534AB7",
    label: "SEO Content Generator",
    desc: "Generate SEO-optimized product descriptions, meta tags, and blog outlines — powered by AI.",
    tags: ["AI Content", "Product Descriptions", "Meta Tags"],
    status: "pro",
    href: "/nicheseopro",
    stats: "NicheSEO Pro",
  },
  {
    id: "serp-simulator",
    icon: Search,
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    accentColor: "#185FA5",
    label: "SERP Simulator",
    desc: "Preview exactly how your page looks in Google search results — title, description, URL, rich snippets.",
    tags: ["SERP Preview", "CTR", "Meta Tags"],
    status: "soon",
    href: "/tools/serp-simulator",
    stats: "Desktop + Mobile",
  },
  {
    id: "meta-tag-analyzer",
    icon: FileText,
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    accentColor: "#1D9E75",
    label: "Meta Tag Analyzer",
    desc: "Audit any URL's title tag, meta description, Open Graph, and Twitter Card tags in one click.",
    tags: ["Title Tag", "Meta Description", "OG Tags"],
    status: "soon",
    href: "/tools/meta-tag-analyzer",
    stats: "Any URL",
  },
  {
    id: "robots-txt-tester",
    icon: Bot,
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    accentColor: "#BA7517",
    label: "Robots.txt Tester",
    desc: "Test if Googlebot can crawl any URL on your site. Paste your robots.txt and check any path instantly.",
    tags: ["Crawl Budget", "Googlebot", "Indexing"],
    status: "soon",
    href: "/tools/robots-txt-tester",
    stats: "Any domain",
  },
  {
    id: "keyword-difficulty",
    icon: TrendingUp,
    iconBg: "#FAECE7",
    iconColor: "#993C1D",
    accentColor: "#D85A30",
    label: "Keyword Difficulty Checker",
    desc: "Estimate how hard it is to rank for any keyword based on SERP competition and search intent signals.",
    tags: ["KD Score", "Search Intent", "SERP Analysis"],
    status: "soon",
    href: "/tools/keyword-difficulty",
    stats: "Any keyword",
  },
];
 
// Reframed: leads with strengths instead of "1 live now"
const stats = [
  { num: "100%", label: "Free to use" },
  { num: "0", label: "Signup required" },
  { num: "Daily", label: "Used on client work" },
  { num: "GSC", label: "Verified workflows" },
];
 
type Faq = { q: string; a: string };
 
export default function ToolsClient({ faqs }: { faqs: Faq[] }) {
  return (
    <main className="bg-transparent min-h-screen">
 
      {/* ── Hero ── */}
      <section className="bg-[#eeeef5] pt-28 pb-16 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[#64748b] text-sm hover:text-[#0a0f2e] transition-colors">Home</Link>
            <span className="text-[#94a3b8]">›</span>
            <span className="text-[#534AB7] text-sm font-semibold">Free SEO Tools</span>
          </div>
 
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EEEDFE] border border-[#534AB7]/30 rounded-full px-4 py-2 mb-5">
                <Zap className="h-3.5 w-3.5 text-[#534AB7]" />
                <span className="text-xs font-bold text-[#534AB7] uppercase tracking-widest">Free SEO Toolkit</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#0a0f2e] mb-4 leading-tight">
                Free SEO Tools <br />
                <span className="text-[#534AB7]">Built for Practitioners</span>
              </h1>
              <p className="text-[#64748b] text-lg max-w-2xl leading-relaxed">
                No signup. No paywalls. Just fast, accurate SEO tools built by an analyst who uses them daily. Schema generators, SERP simulators, meta analyzers — all free.
              </p>
            </div>
 
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#0a0f2e]">{stat.num}</p>
                  <p className="text-[#64748b] text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Tools Grid (sorted: live → pro → soon) ── */}
      <section className="py-16 bg-[#eeeef5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4 z-10">
                  {tool.status === "live" && (
                    <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  )}
                  {tool.status === "soon" && (
                    <span className="bg-[#f1f5f9] border border-[#e5e7eb] text-[#64748b] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                  {tool.status === "pro" && (
                    <span className="flex items-center gap-1 bg-[#EEEDFE] border border-[#AFA9EC] text-[#534AB7] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <Lock className="h-2.5 w-2.5" />
                      Pro
                    </span>
                  )}
                </div>
 
                {/* Card */}
                <div className={`bg-white rounded-2xl border overflow-hidden flex flex-col h-full transition-all duration-200
                    ${tool.status === "live"
                      ? "border-[#534AB7]/30 hover:border-[#534AB7] hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                      : tool.status === "pro"
                      ? "border-[#534AB7]/30 hover:border-[#534AB7] hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                      : "border-[#e5e7eb] opacity-70"
                    }`}
                >
                  <div className="h-1 w-full" style={{ background: tool.accentColor }} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: tool.iconBg }}>
                        <tool.icon className="h-5 w-5" style={{ color: tool.iconColor }} />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                        style={{ background: tool.iconBg, borderColor: tool.iconBg, color: tool.iconColor }}>
                        {tool.stats}
                      </span>
                    </div>
                    <h2 className="text-base font-black text-[#0a0f2e] mb-2 pr-16">{tool.label}</h2>
                    <p className="text-sm text-[#64748b] leading-relaxed mb-4 flex-1">{tool.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {tool.status === "live" ? (
                      <Link href={tool.href} className="flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3d35a0] text-white font-bold py-3 rounded-xl transition-colors text-sm">
                        Use Tool Free <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : tool.status === "pro" ? (
                      <Link href={tool.href} className="flex items-center justify-center gap-2 bg-[#EEEDFE] hover:bg-[#534AB7] text-[#534AB7] hover:text-white font-bold py-3 rounded-xl transition-colors text-sm border border-[#AFA9EC]">
                        <Sparkles className="h-4 w-4" /> Get NicheSEO Pro
                      </Link>
                    ) : (
                      <div className="flex items-center justify-center gap-2 bg-[#f8f9fc] text-[#94a3b8] font-bold py-3 rounded-xl text-sm border border-[#e5e7eb] cursor-not-allowed">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
 
          {/* ── Mid CTA — converts tool users into audit leads (CRO) ── */}
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center">
            <p className="text-xl font-black text-[#0a0f2e]">Tools find the problem. The audit fixes it.</p>
            <p className="max-w-xl text-sm text-[#64748b]">
              If a tool just surfaced an issue on your site, get the founder to review the whole picture —
              free, with a 90-day roadmap, within 24 hours.
            </p>
            <Link href="/free-audit"
              className="group mt-2 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: GREEN }}>
              <BarChart3 className="h-4 w-4" /> Get Free SEO Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── Founder E-E-A-T strip ── */}
      <section className="pb-16 bg-[#eeeef5]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-7 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-black text-white"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})` }}>MS</div>
            <div className="flex-1">
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
                <p className="font-black text-[#0a0f2e]">Built by Mubashar Shahzad — the analyst behind +476% organic growth</p>
                <a href="https://www.linkedin.com/in/mubashar-shahzad-seo/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition-all hover:scale-105"
                  style={{ borderColor: "#0a66c2", color: "#0a66c2" }}>
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </div>
              <p className="mt-1.5 text-sm text-[#64748b]">
                These are the same utilities used on real client projects — see the{" "}
                <Link href="/all-case-studies" className="font-bold underline-offset-2 hover:underline" style={{ color: GREEN_DARK }}>
                  verified case studies
                </Link>{" "}
                they helped produce.
              </p>
              <div className="mt-2.5 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified SEO Expert
                </span>
                <span className="rounded-lg border border-[#e2e8f0] px-2.5 py-1 text-xs font-semibold text-[#475569]">Semrush certified</span>
                <span className="rounded-lg border border-[#e2e8f0] px-2.5 py-1 text-xs font-semibold text-[#475569]">HubSpot certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── FAQ (matches FAQPage schema) ── */}
      <section className="pb-16 bg-[#eeeef5]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-2xl font-black text-[#0a0f2e]">Quick Answers</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#e5e7eb] bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0a0f2e]">
                  {f.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#64748b] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── NicheSEO Pro Banner ── */}
      <section className="py-16 bg-[#eeeef5] border-t border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0f2e] rounded-2xl px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#EEEDFE]/20 border border-[#534AB7]/40 rounded-full px-4 py-2 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#534AB7]" />
                <span className="text-xs font-bold text-[#534AB7] uppercase tracking-widest">NicheSEO Pro</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-3">Need these tools at scale?</h2>
              <p className="text-blue-200 text-lg max-w-xl">
                NicheSEO Pro automates everything — bulk schema generation, content rewriting, GSC integration, and indexing API — for 10,000+ pages at once.
              </p>
            </div>
            <div className="flex-shrink-0 space-y-3 w-full lg:w-auto">
              {["Bulk schema for 1,000+ pages", "AI content rewriting at scale", "GSC + Indexing API automation", "White-label SEO reports"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-blue-200">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
              <Link href="/nicheseopro" className="flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3d35a0] text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm mt-4 w-full lg:w-auto">
                <Sparkles className="h-4 w-4" />
                Try NicheSEO Pro Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── Floating CTA ── */}
      <Link href="/free-audit"
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5"
        style={{ background: GREEN }}>
        <BarChart3 className="h-4 w-4" /> Reality Check
      </Link>
 
    </main>
  );
}