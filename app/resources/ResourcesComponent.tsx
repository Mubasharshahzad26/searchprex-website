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
  FileText, BookOpen, GraduationCap, Newspaper,
  ArrowRight, Clock, ExternalLink,
} from "lucide-react";
import {
  CardGrid,
  CtaBand,
  PageHero,
  Section,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";

/* ─── RESOURCE CATEGORIES ─── */
const hardcodedCategories = [
  {
    id: "hc-1",
    icon: FileText,
    title: "White Papers",
    desc: "In-depth, data-backed reports on SEO strategy, technical audits, and ranking systems — built from real client work.",
    status: "coming",
    href: null,
  },
  {
    id: "hc-2",
    icon: BookOpen,
    title: "Research & Guides",
    desc: "Original research, step-by-step guides, and frameworks covering technical SEO, E-E-A-T, AI Overviews, and GEO.",
    status: "coming",
    href: null,
  },
  {
    id: "hc-3",
    icon: GraduationCap,
    title: "What I'm Learning",
    desc: "First-hand experiments, test results, and lessons from optimizing real sites — what actually moves rankings in 2026.",
    status: "coming",
    href: null,
  },
  {
    id: "hc-4",
    icon: Newspaper,
    title: "Latest SEO News",
    desc: "Curated, plain-English breakdowns of Google core updates, algorithm shifts, and AI-search changes that affect your site.",
    status: "live",
    href: "/resources/news",
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
  }));

  const categories = [...dbResourcesFormatted, ...hardcodedCategories];

  return (
    <main>
      <PageHero
        centered
        eyebrow="Resources"
        title={<>SEO Resources &amp; <Accent>Insights</Accent></>}
        subtitle="White papers, original research, real-world learnings, and curated industry news — everything to help you win in search and AI-powered results."
      />

      {/* ── FEATURED ── */}
      <Section tone="surface" width="narrow" tight>
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

      {/* ── CATEGORIES ── */}
      <Section width="narrow">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <CardGrid variant="cards" columns={2}>
            {categories.map((cat) => {
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
                      Browse news <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  ) : null}
                </>
              );

              return cat.href ? (
                <motion.div key={cat.title} variants={fadeUp}>
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
                  key={cat.title}
                  variants={fadeUp}
                  className={`h-full ${radius.card} border bg-white p-6 opacity-90`}
                  style={{ borderColor: color.border }}
                >
                  {inner}
                </motion.div>
              );
            })}
          </CardGrid>
        </motion.div>

        <p className={`${text.small} mt-8 text-center`} style={{ color: color.subtle }}>
          New white papers, research, and guides are in the works — published from real client
          results, not generic theory.
        </p>
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
