// app/resources/woocommerce-seo-checklist/page.tsx
//
// The ungated WooCommerce SEO checklist. Data in lib/woocommerce-checklist.ts,
// rendered as the interactive workbook. Both SearchPrex ecommerce case studies
// are WooCommerce stores, and the page links to them rather than quoting
// numbers inside the checks.

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Accent } from "@/components/layout";
import ChecklistWorkbook from "@/components/ChecklistWorkbook";
import { color, text, radius } from "@/lib/design-tokens";
import { WOO_CHECKLIST_PILLARS, WOO_CRITICAL_CHECKS, WOO_TOTAL_CHECKS } from "@/lib/woocommerce-checklist";
import { OFFER_CTA_BY_PERSONA } from "@/lib/offer";
import { SITE, founderRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/resources/woocommerce-seo-checklist`;
const TITLE = "WooCommerce SEO Checklist for Growing Stores";
const DESCRIPTION = `${WOO_TOTAL_CHECKS} WooCommerce SEO checks: indexing, product pages, structured data, categories, speed and monitoring. Free, no email, built from real store work.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: `${TITLE} | SearchPrex`, description: DESCRIPTION, url: PAGE_URL, siteName: "SearchPrex", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function WooChecklistPage() {
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
        about: [{ "@type": "Thing", name: "WooCommerce" }, { "@type": "Thing", name: "Ecommerce SEO" }],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#sections`,
        name: "WooCommerce SEO checklist sections",
        numberOfItems: WOO_CHECKLIST_PILLARS.length,
        itemListElement: WOO_CHECKLIST_PILLARS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${PAGE_URL}#${p.id}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "WooCommerce SEO Checklist", item: PAGE_URL },
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
            The {WOO_TOTAL_CHECKS}-point <Accent>WooCommerce SEO</Accent> checklist
          </>
        }
        subtitle={
          <>
            For WooCommerce stores with hundreds or thousands of products. Every check can be run with Search Console, the
            WooCommerce admin or Google&apos;s Rich Results Test. {WOO_CRITICAL_CHECKS} are marked <strong>fix first</strong>:
            they decide whether your products get indexed at all.
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-4 pb-2 sm:px-6 lg:px-8">
        <div className={`${radius.card} border p-5 sm:p-6`} style={{ borderColor: color.border, background: color.surface }}>
          <p className={text.small} style={{ color: color.muted }}>
            <strong style={{ color: color.ink }}>Where this comes from.</strong> Both SearchPrex ecommerce case studies are
            WooCommerce stores, and these checks are in the order that work was done:{" "}
            <Link href="/case-studies/ecommerce/smk-store" className={link}>
              SMK Store
            </Link>{" "}
            (a 35,000-product catalogue) and{" "}
            <Link href="/case-studies/ecommerce/michigan-outdoor-sports" className={link}>
              Michigan Outdoor Sports
            </Link>{" "}
            (recovered after a de-indexing event). Tick what is true today; progress is saved in this browser. Checking
            titles? Use the{" "}
            <Link href="/tools/serp-simulator" className={link}>
              SERP simulator
            </Link>

            , and for the platform-independent checks, the{" "}
            <Link href="/resources/technical-seo-checklist" className={link}>
              technical SEO checklist
            </Link>
            . Want the full method with screenshots? It is on the{" "}
            <Link href="/services/ecommerce-seo/woocommerce" className={link}>
              WooCommerce SEO page
            </Link>
            .
          </p>
        </div>
      </div>

      <ChecklistWorkbook
        pillars={WOO_CHECKLIST_PILLARS}
        storageKey="sp-woo-checklist-v1"
        closerTitle="Ran the checklist and found more than you can fix?"
        closerBody="This is the audit I run on a WooCommerce store before any work starts, written out so you can do it yourself. If you would rather I checked your store's indexing, product pages and structured data against the stores above you, that is the offer below — free, within 24 hours."
        ctaLabel={OFFER_CTA_BY_PERSONA.ecommerce}
        disclaimer="WooCommerce, WordPress and Google change their behaviour from time to time. Where a check describes a default setting or a Google rule, confirm it against the current documentation."
      />
    </main>
  );
}
