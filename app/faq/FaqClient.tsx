"use client";

// app/faq/FaqClient.tsx
// The interactive half of /faq. Split out of page.tsx so that page.tsx can be a
// Server Component and export metadata — a "use client" page cannot, which is
// why this route was serving the root layout's default (homepage) title.

import { motion } from "framer-motion";
import { ArrowRight, Phone, Search, Sparkles, Shield } from "lucide-react";
import {
  CtaBand,
  FaqList,
  PageHero,
  Section,
  Accent,
  type Faq,
} from "@/components/layout";
import { color, heading, radius } from "@/lib/design-tokens";

export interface FaqGroup {
  category: string;
  icon: "sparkles" | "search" | "shield";
  faqs: Faq[];
}

const ICONS = { sparkles: Sparkles, search: Search, shield: Shield };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FaqClient({ groups }: { groups: FaqGroup[] }) {
  return (
    <main>
      <PageHero
        centered
        eyebrow="Frequently Asked Questions"
        title={<>SEO Questions, <Accent>Answered</Accent></>}
        subtitle="Everything you need to know about SEO in the AI-search era — built around Google's March & May 2026 core updates, E-E-A-T, and AI Overviews."
      />

      <Section tone="surface" width="reading">
        {groups.map((group, i) => {
          const Icon = ICONS[group.icon];
          return (
            <motion.div
              key={group.category}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={i > 0 ? "mt-14" : undefined}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center ${radius.chip}`}
                  style={{ background: color.primarySoft }}
                >
                  <Icon className="h-4 w-4" style={{ color: color.primary }} aria-hidden />
                </span>
                <h2 className={heading.h3} style={{ color: color.ink }}>
                  {group.category}
                </h2>
              </div>

              {/* Each group is its own exclusive accordion, so opening a question
                  in one category doesn't close the one you were reading in another. */}
              <FaqList
                faqs={group.faqs}
                name={`faq-group-${i}`}
                defaultOpen={i === 0 ? 0 : null}
              />
            </motion.div>
          );
        })}
      </Section>

      <CtaBand
        eyebrow="Still have questions?"
        title="Let's Talk About Your SEO."
        body="Get a free SEO audit — the founder personally reviews your site against the latest 2026 core updates and delivers a clear growth roadmap within 24 hours."
        actions={[
          { href: "/free-audit", label: "Get Free SEO Audit", icon: <ArrowRight className="h-4 w-4" aria-hidden /> },
          { href: "tel:+923106526316", label: "+92 310 652 6316", variant: "onDark", icon: <Phone className="h-4 w-4" aria-hidden /> },
        ]}
      />
    </main>
  );
}
