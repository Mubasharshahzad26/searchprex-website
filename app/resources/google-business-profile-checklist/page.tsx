// app/resources/google-business-profile-checklist/page.tsx
//
// The ungated web version of the Google Business Profile checklist
// ("google business profile optimization checklist" is a common search). Same
// data as the PDF offered on the local pages (lib/gbp-checklist.ts), rendered
// as the interactive workbook.

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Accent } from "@/components/layout";
import ChecklistWorkbook from "@/components/ChecklistWorkbook";
import { color, text, radius } from "@/lib/design-tokens";
import { GBP_CHECKLIST_PILLARS, GBP_CRITICAL_CHECKS, GBP_TOTAL_CHECKS } from "@/lib/gbp-checklist";
import { OFFER_CTA_BY_PERSONA } from "@/lib/offer";
import { SITE, founderRef } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/resources/google-business-profile-checklist`;
const TITLE = "Google Business Profile Optimization Checklist";
const DESCRIPTION = `${GBP_TOTAL_CHECKS} Google Business Profile checks for local service businesses: setup, content, reviews, consistency and monitoring. Free, no email, written to Google's rules.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: `${TITLE} | SearchPrex`, description: DESCRIPTION, url: PAGE_URL, siteName: "SearchPrex", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function GbpChecklistPage() {
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
        dateModified: "2026-09-27",
        about: [{ "@type": "Thing", name: "Google Business Profile" }, { "@type": "Thing", name: "Local SEO" }],
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#sections`,
        name: "Google Business Profile checklist sections",
        numberOfItems: GBP_CHECKLIST_PILLARS.length,
        itemListElement: GBP_CHECKLIST_PILLARS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${PAGE_URL}#${p.id}` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Google Business Profile Checklist", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        centered
        eyebrow="Free resource · No email required"
        title={
          <>
            The {GBP_TOTAL_CHECKS}-point <Accent>Google Business Profile</Accent> optimization checklist
          </>
        }
        subtitle={
          <>
            For HVAC, roofing, cleaning, home service and remodeling businesses — anyone whose calls come from the map
            results. Every check follows Google&apos;s own guidelines. {GBP_CRITICAL_CHECKS} are marked{" "}
            <strong>fix first</strong>: they are the ones that get profiles suspended or ignored.
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-4 pb-2 sm:px-6 lg:px-8">
        <div className={`${radius.card} border p-5 sm:p-6`} style={{ borderColor: color.border, background: color.surface }}>
          <p className={text.small} style={{ color: color.muted }}>
            <strong style={{ color: color.ink }}>How to use this.</strong> Open your profile in another tab and tick what
            is true today. Progress is saved in this browser. Prefer a printable version with a scoring sheet? It is on
            the <Link href="/services/local-seo" className="font-semibold underline">local SEO page</Link>, or use
            &ldquo;Save as PDF&rdquo; above.
          </p>
        </div>
      </div>

      <ChecklistWorkbook
        pillars={GBP_CHECKLIST_PILLARS}
        storageKey="sp-gbp-checklist-v1"
        closerTitle="Ran the checklist and want your profile compared with the top three?"
        closerBody="This is the same audit I run on a local business's profile, written out so you can do it yourself. If you would rather I checked your profile, reviews and pages against the businesses above you, that is the offer below — free, within 24 hours."
        ctaLabel={OFFER_CTA_BY_PERSONA.local}
        disclaimer="Google changes its Business Profile rules from time to time. Where a check quotes a limit or a policy, confirm it against Google's current guidelines."
      />
    </main>
  );
}
