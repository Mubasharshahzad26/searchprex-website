// app/resources/technical-seo-checklist/page.tsx
//
// The ungated technical SEO audit checklist. Data in
// lib/technical-seo-checklist.ts, rendered as the interactive workbook. The
// page links to the technical SEO case studies rather than quoting numbers
// inside the checks.

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Accent } from "@/components/layout";
import ChecklistWorkbook from "@/components/ChecklistWorkbook";
import { color, text, radius } from "@/lib/design-tokens";
import { TECH_CHECKLIST_PILLARS, TECH_CRITICAL_CHECKS, TECH_TOTAL_CHECKS } from "@/lib/technical-seo-checklist";
import { OFFER_CTA } from "@/lib/offer";
import { SITE, founderRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/resources/technical-seo-checklist`;
const TITLE = "Technical SEO Audit Checklist, Free to Run";
const DESCRIPTION = `${TECH_TOTAL_CHECKS} technical SEO checks: crawling, indexing, redirects, rendering, Core Web Vitals and AI crawlers. Free, no email, run with free Google tools.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: `${TITLE} | SearchPrex`, description: DESCRIPTION, url: PAGE_URL, siteName: "SearchPrex", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function TechnicalChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        author: founderRef,
        publisher: { "@id": `${SITE}/#organization` },
        isPartOf: { "@id": `${SITE}/#website` },
        dateModified: "2026-09-28",
        about: [{ "@type": "Thing", name: "Technical SEO" }, { "@type": "Thing", name: "SEO audit" }],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#sections`,
        name: "Technical SEO checklist sections",
        numberOfItems: TECH_CHECKLIST_PILLARS.length,
        itemListElement: TECH_CHECKLIST_PILLARS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${PAGE_URL}#${p.id}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Technical SEO Checklist", item: PAGE_URL },
        ],
      },
    ],
  };

  const link = "font-semibold underline";

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        centered
        eyebrow="Free resource · No email required"
        title={
          <>
            The {TECH_TOTAL_CHECKS}-point <Accent>technical SEO</Accent> audit checklist
          </>
        }
        subtitle={
          <>
            For any website on any platform. Every check runs on free tools — Search Console, URL Inspection, PageSpeed
            Insights, the Rich Results Test and your robots.txt. {TECH_CRITICAL_CHECKS} are marked <strong>fix first</strong>:
            they decide whether Google can crawl and keep your pages at all.
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-4 pb-2 sm:px-6 lg:px-8">
        <div className={`${radius.card} border p-5 sm:p-6`} style={{ borderColor: color.border, background: color.surface }}>
          <p className={text.small} style={{ color: color.muted }}>
            <strong style={{ color: color.ink }}>Where this comes from.</strong> It is the audit behind the technical SEO
            case studies:{" "}
            <Link href="/case-studies/ecommerce/michigan-outdoor-sports" className={link}>
              Michigan Outdoor Sports
            </Link>{" "}
            (indexing rebuilt after a de-indexing event) and{" "}
            <Link href="/case-studies/fintech/remit-choice" className={link}>
              Remit Choice
            </Link>{" "}
            (international SEO for a UK remittance brand). Tick what is true today; progress is saved in this browser. Running
            a WooCommerce store? The{" "}
            <Link href="/resources/woocommerce-seo-checklist" className={link}>
              WooCommerce checklist
            </Link>{" "}
            covers the platform specifics. For the service itself, see{" "}
            <Link href="/services/technical-seo" className={link}>
              technical SEO
            </Link>
            .
          </p>
        </div>
      </div>

      <ChecklistWorkbook
        pillars={TECH_CHECKLIST_PILLARS}
        storageKey="sp-tech-checklist-v1"
        closerTitle="Found problems you can't trace to a cause?"
        closerBody="This is the audit I run before any technical work starts, written out so you can do it yourself. If you would rather I found what is holding your site back and in what order to fix it, that is the offer below — free, within 24 hours."
        ctaLabel={OFFER_CTA}
        disclaimer="Google updates its crawling, indexing and page experience documentation from time to time. Where a check quotes a limit or threshold, confirm it against Google Search Central."
      />
    </main>
  );
}
