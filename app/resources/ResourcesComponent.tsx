"use client";

// app/resources/ResourcesComponent.tsx
// Assembled from components/layout primitives. The local GREEN/GREEN_DARK/PURPLE
// theme block is gone — green now means "verified/live" only, and actions use
// the brand primary like the rest of the site.
//
// Copy is unchanged from the previous version.

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, BookOpen, GraduationCap, Newspaper, ListChecks,
  ArrowRight, Clock, ExternalLink, Terminal, ShoppingBag, MapPin, Wrench,
  Bot, Sparkles, Code2, Search, Target, Calculator, MessageSquare, Layers,
} from "lucide-react";
import {
  CardGrid,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";

/* ─── RESOURCE CATEGORIES (CHECKLISTS, VAULTS & PLAYBOOKS) ─── */
type ResourceCard = {
  id: string;
  icon: any;
  title: string;
  desc: string;
  status: string;
  href: string | null;
  cta?: string;
};

const hardcodedCategories: ResourceCard[] = [
  {
    id: "hc-regex",
    icon: Terminal,
    title: "GSC Regex Library & Filter Builder",
    desc: "25+ copy-paste RE2 regex filters for Google Search Console — isolate AI Overview conversational queries, non-branded traffic, law firm case intent, ecommerce SKUs, and indexing bloat.",
    status: "live",
    href: "/resources/gsc-regex-library",
    cta: "Open regex library",
  },
  {
    id: "hc-0",
    icon: ListChecks,
    title: "Law Firm SEO Audit Checklist",
    desc: "The 40 checks run on a law firm's site across Map Pack, organic, AI visibility, legal E-E-A-T and practice-area content. Ungated — no email, no download wall.",
    status: "live",
    href: "/resources/law-firm-seo-audit-checklist",
    cta: "Open the checklist",
  },
  {
    id: "hc-tech",
    icon: Wrench,
    title: "Technical SEO Audit Checklist",
    desc: "Interactive technical SEO workbook covering crawling, indexing recovery, redirects, rendering, Core Web Vitals (LCP/INP/CLS) and AI crawlers. Runs on free Google tools.",
    status: "live",
    href: "/resources/technical-seo-checklist",
    cta: "Open technical checklist",
  },
  {
    id: "hc-woo",
    icon: ShoppingBag,
    title: "WooCommerce & Ecommerce SEO Checklist",
    desc: "Built from our 35,000-product SMK Store and Michigan Outdoor Sports campaigns: stop parameter crawl waste, fix product non-indexing, and structure categories that rank.",
    status: "live",
    href: "/resources/woocommerce-seo-checklist",
    cta: "Open ecommerce checklist",
  },
  {
    id: "hc-gbp",
    icon: MapPin,
    title: "Google Business Profile Checklist",
    desc: "The local Map Pack optimization checklist for HVAC, roofing, legal and home service businesses: primary categories, suspension-safe setup, review velocity and local pages.",
    status: "live",
    href: "/resources/google-business-profile-checklist",
    cta: "Open GBP checklist",
  },
  {
    id: "hc-playbook",
    icon: FileText,
    title: "The 35,000-Product Indexing Playbook (PDF)",
    desc: "The 8-step Search Console indexing recovery playbook behind SMK Store ($5,832 to $19,100/mo) and Michigan Sports & Outdoor (~3,000 to 11,549 indexed pages). Instant PDF.",
    status: "live",
    href: "/guides/ecommerce-indexing-playbook.pdf",
    cta: "Download PDF playbook",
  },
  {
    id: "hc-4",
    icon: Newspaper,
    title: "Latest SEO & Google Update News",
    desc: "Curated, plain-English breakdowns of Google core updates, algorithm shifts, and AI-search changes that affect your site.",
    status: "live",
    href: "/resources/news",
    cta: "Browse news",
  },
];

/* ─── INTERACTIVE TOOLS & NICHESEO PRO FEATURES ─── */
const interactiveTools: ResourceCard[] = [
  {
    id: "tool-llms",
    icon: Bot,
    title: "llms.txt & AI Crawler Generator",
    desc: "Generate a spec-compliant /llms.txt Markdown file and AI crawler robots.txt rules (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended).",
    status: "live",
    href: "/tools/llms-txt-generator",
    cta: "Open generator",
  },
  {
    id: "tool-kw",
    icon: Sparkles,
    title: "AI Keyword Research Tool",
    desc: "Enter any niche or practice area and get keywords grouped by theme, search intent, and the exact page type to build.",
    status: "live",
    href: "/tools/keyword-research",
    cta: "Run keyword research",
  },
  {
    id: "tool-serp-checker",
    icon: Target,
    title: "Live Google SERP & Rank Checker",
    desc: "Check your live Google ranking position for any keyword and country, see which SERP features own the page, and inspect the top 10.",
    status: "live",
    href: "/tools/serp-checker",
    cta: "Check live rankings",
  },
  {
    id: "tool-schema",
    icon: Code2,
    title: "JSON-LD Schema Markup Generator",
    desc: "Generate spec-valid JSON-LD structured data for Law Firm, Local Business, Product, FAQ, Article & Review in seconds.",
    status: "live",
    href: "/tools/schema-generator",
    cta: "Generate schema",
  },
  {
    id: "tool-serp-sim",
    icon: Search,
    title: "Google SERP Snippet Simulator",
    desc: "Preview your title tag and meta description on desktop and mobile measured in exact pixels before you publish.",
    status: "live",
    href: "/tools/serp-simulator",
    cta: "Simulate snippet",
  },
  {
    id: "tool-case-calc",
    icon: Calculator,
    title: "Personal Injury Lost Case Calculator",
    desc: "Estimate how many signed cases and fees a personal injury firm loses to Map Pack visibility gaps and slow intake.",
    status: "live",
    href: "/case-calculator",
    cta: "Calculate lost cases",
  },
  {
    id: "tool-intake",
    icon: MessageSquare,
    title: "24/7 AI Legal Intake Assistant",
    desc: "Interactive live demo of our AI intake assistant that qualifies law firm leads 24/7 so no after-hours case is lost.",
    status: "live",
    href: "/intake-assistant",
    cta: "Try live demo",
  },
  {
    id: "tool-content-suite",
    icon: Layers,
    title: "NicheSEO Pro: AI Content & Bulk Suite",
    desc: "Generate E-E-A-T-driven SEO briefs, full HTML articles, meta tags, FAQs, and JSON-LD schema for single pages or in bulk.",
    status: "live",
    href: "/content-generator",
    cta: "Open AI Content Suite",
  },
];

/* 🔮 FEATURED (real, published) 🔮 */
const featured = {
  title: "Best Time to Install a New AC Near Me — California 2026",
  type: "Published Article",
  desc: "A full, first-hand SEO content piece written and published for a real client — ranking for high-intent local search.",
  href: "https://www.hvacservicesteam.com/blog/best-time-to-install-a-new-ac-near-me-california-2026",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const iconMap: Record<string, any> = {
  FileText: FileText,
  BookOpen: BookOpen,
  GraduationCap: GraduationCap,
  Newspaper: Newspaper,
};

export default function ResourcesPageComponent({ initialResources = [] }: { initialResources?: any[] }) {
  const dbResourcesFormatted = initialResources.map((r: any) => ({
    id: r.id,
    icon: iconMap[r.icon] || FileText,
    title: r.title,
    desc: r.description,
    status: r.status,
    href: r.fileUrl || (r.slug ? `/resources/${r.slug}` : null),
    cta: "Open resource",
  }));

  const categories = [...dbResourcesFormatted, ...hardcodedCategories];

  const renderCard = (cat: ResourceCard) => {
    const Icon = cat.icon;
    const isLive = cat.status === "live";

    const inner = (
      <>
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`flex h-11 w-11 items-center justify-center ${radius.chip}`}
            style={{ background: color.primarySoft }}
          >
            <Icon className="h-5 w-5" style={{ color: color.primary }} aria-hidden />
          </span>
          {isLive ? (
            <span
              className={`${heading.eyebrow} inline-flex items-center gap-1 rounded-full px-2.5 py-1`}
              style={{ background: "#eafaf3", color: color.successDark }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: color.success }}
                aria-hidden
              />
              Live
            </span>
          ) : (
            <span
              className={`${heading.eyebrow} inline-flex items-center gap-1 rounded-full px-2.5 py-1`}
              style={{ background: color.surface, color: color.subtle }}
            >
              <Clock className="h-3 w-3" aria-hidden /> Coming Soon
            </span>
          )}
        </div>
        <h3 className={`${heading.h4} mb-2`} style={{ color: color.ink }}>
          {cat.title}
        </h3>
        <p className={text.small} style={{ color: color.muted }}>
          {cat.desc}
        </p>
        {isLive ? (
          <span
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
            style={{ color: color.primary }}
          >
            {cat.cta || "Open"} <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </>
    );

    return cat.href ? (
      <motion.div key={cat.id || cat.title} variants={fadeUp}>
        <Link
          href={cat.href}
          className={`group block h-full ${radius.card} border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl`}
          style={{ borderColor: color.border }}
        >
          {inner}
        </Link>
      </motion.div>
    ) : (
      <motion.div
        key={cat.id || cat.title}
        variants={fadeUp}
        className={`h-full ${radius.card} border bg-white p-6 opacity-90`}
        style={{ borderColor: color.border }}
      >
        {inner}
      </motion.div>
    );
  };

  return (
    <main>
      <PageHero
        centered
        eyebrow="Free Resources & Tools · No Signup"
        title={<>SEO Resources, Checklists &amp; <Accent>Free Tools</Accent></>}
        subtitle="Practitioner checklists, Google Search Console regex vaults, indexing playbooks, and interactive AI SEO tools — built from real client campaigns, completely ungated."
      />

      {/* ── 1. CHECKLISTS, REGEX VAULT & PLAYBOOKS ── */}
      <Section width="narrow">
        <SectionHeading
          eyebrow="Checklists, Playbooks & Vaults"
          title="Step-by-step SEO Audit Checklists & GSC Regex Vault"
          subtitle="Run the exact audits and Search Console regex filters we use on law firms, 35,000-product ecommerce catalogues, and local service businesses."
        />
        <motion.div className="mt-8" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <CardGrid variant="cards" columns={2}>
            {categories.map(renderCard)}
          </CardGrid>
        </motion.div>
      </Section>

      {/* ── 2. INTERACTIVE SEO & AI TOOLS (NICHESEO PRO FEATURES) ── */}
      <Section tone="surface" width="narrow">
        <SectionHeading
          eyebrow="Interactive SEO & AI Tools"
          title="Free SEO Tools & NicheSEO Pro Utilities"
          subtitle="Generate llms.txt files, JSON-LD schema, pixel-accurate SERP previews, AI keyword clusters, live Google rank checks, and E-E-A-T content."
        />
        <motion.div className="mt-8" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <CardGrid variant="cards" columns={2}>
            {interactiveTools.map(renderCard)}
          </CardGrid>
        </motion.div>
      </Section>

      {/* ── 3. FEATURED PUBLISHED CLIENT PIECE ── */}
      <Section width="narrow" tight>
        <motion.a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`group block overflow-hidden ${radius.card} p-8 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl`}
          style={{ background: color.ink }}
        >
          <span
            className={`${heading.eyebrow} mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-white/80`}
          >
            <FileText className="h-3 w-3" aria-hidden /> {featured.type}
          </span>
          <h2 className={`${heading.h3} mb-2 text-white`}>{featured.title}</h2>
          <p className={`${text.small} mb-4 max-w-2xl text-white/60`}>{featured.desc}</p>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
            style={{ color: color.success }}
          >
            Read the published article <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </span>
        </motion.a>
      </Section>

      <CtaBand
        eyebrow="Skip the generic guides"
        title="Want SEO advice tailored to your site?"
        body="Skip the generic guides — get a free, founder-led audit of your exact situation."
        actions={[
          {
            href: "/free-audit",
            label: "Get Free SEO Audit",
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          },
        ]}
      />
    </main>
  );
}
