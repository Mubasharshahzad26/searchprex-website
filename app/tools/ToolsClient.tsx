"use client";

// app/tools/ToolsClient.tsx
// Tools page UI, assembled from components/layout primitives.
//
// Card order is live → pro → soon so dead cards don't sit mid-grid, the stats
// read as strengths rather than "1 live now", and the mid-page audit CTA
// converts tool users (hot leads) into audits.
//
// The per-tool accent colours below are categorical — they identify a tool at a
// glance, the way a chart palette identifies a series. They never appear on
// headings, links or buttons, which all come from the design tokens.

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, Search, FileText, Bot, TrendingUp, CheckCircle, ArrowRight,
  Sparkles, Zap, Lock, BarChart3, Target,
} from "lucide-react";

import {
  AuthorCard,
  Breadcrumb,
  CtaButton,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  Accent,
  type Faq,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import SolutionsCarousel from "@/components/SolutionsCarousel";

const tools = [
  {
    id: "keyword-research",
    icon: Sparkles,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    accentColor: "#534AB7",
    label: "AI Keyword Research",
    desc: "Enter a topic and get keywords grouped by theme, the search intent behind each, and the page to build for it.",
    tags: ["Keyword Ideas", "Search Intent", "Content Angles"],
    // Genuinely live: /tools/keyword-research is deployed and its API returns
    // real model output. It shows no search volume or difficulty, because those
    // require a paid data provider and inventing them is what the SERP Checker
    // used to do.
    status: "live",
    href: "/tools/keyword-research",
    stats: "No signup",
  },
  {
    id: "serp-checker",
    icon: Target,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    accentColor: "#534AB7",
    label: "SERP Checker",
    desc: "See which SERP features own a query and what the top 10 looks like. Live position tracking arrives when the data provider is connected.",
    tags: ["Rank Tracking", "SERP Analysis", "Competitors"],
    // "preview", not "soon" and not "live".
    //
    // "soon" was wrong: the page IS deployed (200 in production) and rendered a
    // dead "Coming Soon" button, so the tool hub gave Google no crawlable link
    // to a page that is already earning impressions.
    //
    // "live" would also be wrong: without DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD
    // the API cannot read Google, so the page runs in preview mode and reports
    // no position at all. Promote this to "live" once
    // `npx tsx scripts/verify-dataforseo.ts` passes.
    status: "preview",
    href: "/tools/serp-checker",
    stats: "Up to 5 keywords",
  },
  {
    id: "schema-generator",
    icon: Code2,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    accentColor: "#534AB7",
    label: "Schema Markup Generator",
    desc: "Generate JSON-LD schema for Local Business, Law Firm, Product, FAQ, Article & Review — instantly.",
    tags: ["JSON-LD", "Rich Results", "Structured Data"],
    // "soon", not "live". /tools/schema-generator returns 200 but the page is a
    // stub that says "Coming soon." — the card was promising a working tool and
    // "6 schema types" to anyone who clicked. Flip back once the page is built.
    status: "soon",
    href: "/tools/schema-generator",
    stats: "6 schema types",
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

const stats = [
  { num: "100%", label: "Free to use" },
  { num: "0", label: "Signup required" },
  { num: "Daily", label: "Used on client work" },
  { num: "GSC", label: "Verified workflows" },
];

const proFeatures = [
  "Bulk schema for 1,000+ pages",
  "AI content rewriting at scale",
  "GSC + Indexing API automation",
  "White-label SEO reports",
];

export default function ToolsClient({ faqs }: { faqs: Faq[] }) {
  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free SEO Tools" }]} />

      <PageHero
        compactTop
        eyebrow="Free SEO Toolkit"
        title={<>Free SEO Tools <br /><Accent>Built for Practitioners</Accent></>}
        subtitle="No signup. No paywalls. Just fast, accurate SEO tools built by an analyst who uses them daily. Schema generators, SERP simulators, meta analyzers — all free."
        aside={<HeroStats />}
      />

      {/* ── TOOLS GRID (live → pro → soon) ── */}
      <Section tone="surface">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <div className="absolute right-4 top-4 z-10">
                <StatusBadge status={tool.status} />
              </div>

              <div
                className={`flex h-full flex-col overflow-hidden ${radius.card} border bg-white transition-all duration-200 ${
                  tool.status === "soon"
                    ? "opacity-70"
                    : "hover:-translate-y-1 hover:shadow-lg"
                }`}
                style={{
                  borderColor: tool.status === "soon" ? color.border : `${color.primary}4d`,
                }}
              >
                <div className="h-1 w-full" style={{ background: tool.accentColor }} aria-hidden />

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center ${radius.chip}`}
                      style={{ background: tool.iconBg }}
                    >
                      <tool.icon className="h-5 w-5" style={{ color: tool.iconColor }} aria-hidden />
                    </span>
                    <span
                      className="rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                      style={{ background: tool.iconBg, borderColor: tool.iconBg, color: tool.iconColor }}
                    >
                      {tool.stats}
                    </span>
                  </div>

                  <h2 className={`${heading.h4} mb-2 pr-16`} style={{ color: color.ink }}>
                    {tool.label}
                  </h2>
                  <p className={`${text.small} mb-4 flex-1`} style={{ color: color.muted }}>
                    {tool.desc}
                  </p>

                  <ul className="mb-5 flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`${radius.chip} border px-2.5 py-1 text-[10px] font-medium`}
                        style={{ background: color.surface, borderColor: color.border, color: color.muted }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <ToolAction status={tool.status} href={tool.href} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-page CTA — tool users are hot leads. */}
        <div
          className={`mt-12 flex flex-col items-center gap-3 ${radius.card} border bg-white p-8 text-center`}
          style={{ borderColor: color.border }}
        >
          <p className={heading.h3} style={{ color: color.ink }}>
            Tools find the problem. The audit fixes it.
          </p>
          <p className={`${text.small} max-w-xl`} style={{ color: color.muted }}>
            If a tool just surfaced an issue on your site, get the founder to review the whole
            picture — free, with a 90-day roadmap, within 24 hours.
          </p>
          <CtaButton
            href="/free-audit"
            className="mt-2"
            icon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            <BarChart3 className="h-4 w-4" aria-hidden /> Get Free SEO Audit
          </CtaButton>
        </div>
      </Section>

      {/* ── FOUNDER E-E-A-T ── */}
      <Section tone="surface" width="narrow" tight>
        <AuthorCard
          name="Mubashar Shahzad"
          role="Founder & Lead SEO Strategist · 5+ years"
          quote="These are the same utilities I use on real client projects — the ones behind the verified case studies on this site. Nothing here is a lead-capture gimmick."
          imageSrc="/images/mubashar-shahzad.jpg"
          imageAlt="Mubashar Shahzad — Founder & Lead SEO Strategist"
          linkedinUrl="https://www.linkedin.com/in/mubashar-shahzad-seo/"
          badges={["Semrush certified", "HubSpot certified"]}
        />
      </Section>

      {/* ── SOLUTIONS ──
          Moved here from the homepage. These six are products in their own
          right (AI visibility, AI search, case calculator, intake assistant,
          content suite, keyword data) and they complement the seven utilities
          above rather than duplicating them. On the homepage they were a
          seventh "here is another thing we do" section interrupting the sales
          narrative; here they are what the visitor came for. */}
      <SolutionsCarousel />

      {/* ── FAQ ── */}
      <Section tone="surface" width="reading">
        <SectionHeading variant="center" eyebrow="FAQ" title="Quick Answers" />
        <FaqList faqs={faqs} name="tools-faq" />
      </Section>

      {/* ── NICHESEO PRO ── */}
      <Section bordered={false}>
        <div
          className={`${radius.card} px-8 py-10 lg:flex lg:items-center lg:justify-between lg:gap-8`}
          style={{ background: color.ink }}
        >
          <div className="text-center lg:text-left">
            <span
              className={`${heading.eyebrow} mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2`}
              style={{ borderColor: `${color.primary}66`, color: "#A79FED" }}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden /> NicheSEO Pro
            </span>
            <h2 className={`${heading.h2} mb-3 text-white`}>Need these tools at scale?</h2>
            <p className={`${text.lead} max-w-xl text-white/60`}>
              NicheSEO Pro automates everything — bulk schema generation, content rewriting, GSC
              integration, and indexing API — for 10,000+ pages at once.
            </p>
          </div>

          <div className="mt-8 w-full shrink-0 space-y-3 lg:mt-0 lg:w-auto">
            {proFeatures.map((f) => (
              <p key={f} className={`flex items-center gap-2 ${text.small} text-white/70`}>
                <CheckCircle className="h-4 w-4 shrink-0" style={{ color: color.success }} aria-hidden />
                {f}
              </p>
            ))}
            <CtaButton
              href="/tools/keyword-research"
              className="mt-4 w-full justify-center lg:w-auto"
              icon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Sparkles className="h-4 w-4" aria-hidden /> Try NicheSEO Pro Free
            </CtaButton>
          </div>
        </div>
      </Section>

      {/* ── FLOATING CTA ── */}
      <Link
        href="/free-audit"
        className={`fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 ${text.small} font-semibold text-white shadow-2xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5`}
        style={{ background: color.primary }}
      >
        <BarChart3 className="h-4 w-4" aria-hidden /> Reality Check
      </Link>
    </main>
  );
}

/* ─── Pieces ─── */

function HeroStats() {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${radius.control} border bg-white px-5 py-4 text-center shadow-sm`}
          style={{ borderColor: color.border }}
        >
          <dd className="text-2xl font-bold" style={{ color: color.ink }}>{stat.num}</dd>
          <dt className={`${text.caption} mt-1`} style={{ color: color.muted }}>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "live") {
    return (
      <span
        className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
        style={{ borderColor: "#a7e8cf", background: "#eafaf3", color: color.successDark }}
      >
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: color.success }}
          aria-hidden
        />
        Live
      </span>
    );
  }

  if (status === "pro") {
    return (
      <span
        className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
        style={{ borderColor: "#AFA9EC", background: color.primarySoft, color: color.primary }}
      >
        <Lock className="h-2.5 w-2.5" aria-hidden /> Pro
      </span>
    );
  }

  // Usable now, but not yet doing the headline job. Deliberately distinct from
  // "Live" so the badge never overstates what the visitor is about to get.
  if (status === "preview") {
    return (
      <span
        className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
        style={{ borderColor: "#f5d9a8", background: "#fdf6e8", color: "#8a5a0b" }}
      >
        Preview
      </span>
    );
  }

  return (
    <span
      className="rounded-full border px-2.5 py-1 text-[10px] font-semibold"
      style={{ borderColor: color.border, background: color.surface, color: color.muted }}
    >
      Coming Soon
    </span>
  );
}

function ToolAction({ status, href }: { status: string; href: string }) {
  if (status === "live") {
    return (
      <CtaButton href={href} compact className="w-full justify-center" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
        Use Tool Free
      </CtaButton>
    );
  }

  if (status === "pro") {
    return (
      <Link
        href={href}
        className={`flex w-full items-center justify-center gap-2 ${radius.control} border px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#534AB7] hover:text-white`}
        style={{ borderColor: "#AFA9EC", background: color.primarySoft, color: color.primary }}
      >
        <Sparkles className="h-4 w-4" aria-hidden /> Get NicheSEO Pro
      </Link>
    );
  }

  // A real, crawlable link — the whole point of the "preview" status. The wording
  // sets the expectation the page then meets.
  if (status === "preview") {
    return (
      <CtaButton href={href} compact className="w-full justify-center" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
        Open Preview
      </CtaButton>
    );
  }

  return (
    <p
      className={`flex w-full cursor-not-allowed items-center justify-center gap-2 ${radius.control} border px-5 py-3 text-sm font-semibold`}
      style={{ borderColor: color.border, background: color.surface, color: color.subtle }}
      aria-disabled="true"
    >
      Coming Soon
    </p>
  );
}
