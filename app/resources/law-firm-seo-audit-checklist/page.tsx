import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import { PageHero, Accent } from "@/components/layout";
import { color, text, radius } from "@/lib/design-tokens";
import { CHECKLIST_PILLARS, TOTAL_CHECKS, CRITICAL_CHECKS } from "@/lib/law-firm-checklist";
import ChecklistClient from "./ChecklistClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";
const pageUrl = `${siteUrl}/resources/law-firm-seo-audit-checklist`;

const TITLE = `The ${TOTAL_CHECKS}-Point Law Firm SEO Audit Checklist (Free, No Email)`;
const DESCRIPTION = `The ${TOTAL_CHECKS} checks I run on a law firm's site across Map Pack, organic, AI visibility, legal E-E-A-T and practice-area content. Free, ungated, and written so you can run it yourself.`;

const baseMetadata: Metadata = {
  // No " | SearchPrex" suffix here — the root layout already applies the
  // '%s | SearchPrex' title template, and adding it produces a doubled brand.
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "law firm SEO checklist",
    "law firm SEO audit",
    "attorney SEO checklist",
    "legal SEO audit checklist",
    "law firm local SEO",
    "law firm Google Business Profile",
    "legal E-E-A-T",
    "attorney schema markup",
    "law firm AI visibility",
    "AEO for law firms",
  ],
  authors: [{ name: "Mubashar Shahzad", url: siteUrl }],
  creator: "SearchPrex",
  publisher: "SearchPrex",
  category: "SEO Resources",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: pageUrl,
    siteName: "SearchPrex",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@searchprex",
    creator: "@searchprex",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/resources/law-firm-seo-audit-checklist", baseMetadata);
}

export default function LawFirmChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        author: { "@type": "Person", name: "Mubashar Shahzad", url: siteUrl },
        publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: [
          { "@type": "Thing", name: "Law firm SEO" },
          { "@type": "Thing", name: "Local SEO" },
          { "@type": "Thing", name: "Answer engine optimisation" },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#pillars`,
        name: "Law firm SEO audit pillars",
        numberOfItems: CHECKLIST_PILLARS.length,
        itemListElement: CHECKLIST_PILLARS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          description: p.blurb,
          url: `${pageUrl}#${p.id}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${siteUrl}/resources` },
          { "@type": "ListItem", position: 3, name: "Law Firm SEO Audit Checklist", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        centered
        eyebrow="Free resource · No email required"
        title={
          <>
            The {TOTAL_CHECKS}-point <Accent>law firm SEO</Accent> audit checklist
          </>
        }
        subtitle={
          <>
            These are the checks I actually run, across the five things that decide whether a firm
            gets found: the Map Pack, organic rankings, whether AI answers name you, legal E-E-A-T,
            and the practice-area pages themselves. {CRITICAL_CHECKS} of them are marked{" "}
            <strong>fix first</strong> — those gate everything else in their section.
          </>
        }
      />

      {/* How to use it — short, because the checklist is the point. */}
      <div className="mx-auto max-w-4xl px-4 pb-2 sm:px-6 lg:px-8">
        <div
          className={`${radius.card} border p-5 sm:p-6`}
          style={{ borderColor: color.border, background: color.surface }}
        >
          <p className={text.small} style={{ color: color.muted }}>
            <strong style={{ color: color.ink }}>How to use this.</strong> Work down it with your own
            site open in another tab and tick what is genuinely true — not what you intended to do.
            Your progress is saved in this browser, so you can leave and come back. When you are
            done, the unticked <strong>fix first</strong> items are your quarter. Print or save it as
            a PDF at any point using the button in the bar above.
          </p>
        </div>
      </div>

      <ChecklistClient />
    </main>
  );
}
