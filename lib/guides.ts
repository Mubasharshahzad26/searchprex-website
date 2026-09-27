// lib/guides.ts
//
// The downloadable guides offered by components/GuideMagnet. Each guide is a
// real file on this site; the counts are read from the data the file is built
// from, so the offer can never promise more than the PDF contains.
//
// Server-side only: pages import a guide from here and pass it to GuideMagnet
// as a prop, so the checklist data never ships in client JavaScript.

import { CHECKLIST_PILLARS, CRITICAL_CHECKS, TOTAL_CHECKS } from "@/lib/law-firm-checklist";

export interface Guide {
  id: string;
  title: string;
  /** Where the file is served. */
  href: string;
  fileName: string;
  points: string[];
  /** The ungated web version, when there is one. */
  webHref?: string;
}

export const LAW_CHECKLIST_GUIDE: Guide = {
  id: "law-checklist",
  title: `The ${TOTAL_CHECKS}-point law firm SEO audit checklist`,
  href: "/guides/law-firm-seo-audit-checklist.pdf",
  fileName: "law-firm-seo-audit-checklist.pdf",
  points: [
    `${TOTAL_CHECKS} checks across ${CHECKLIST_PILLARS.length} pillars: Map Pack, organic, AI visibility, E-E-A-T, content`,
    `The ${CRITICAL_CHECKS} critical checks flagged, so you know where to start`,
    "A scoring sheet and tick boxes to run it with your team",
  ],
  webHref: "/resources/law-firm-seo-audit-checklist",
};

// Figures match the SMK Store and Michigan Sports & Outdoor case studies and
// the screenshots embedded in the PDF (app/guides/ecommerce-indexing-playbook.pdf).
export const ECOMMERCE_PLAYBOOK_GUIDE: Guide = {
  id: "ecommerce-playbook",
  title: "The 35,000-product indexing playbook",
  href: "/guides/ecommerce-indexing-playbook.pdf",
  fileName: "ecommerce-indexing-playbook.pdf",
  points: [
    "The 8 steps in order, from Search Console diagnosis to batch resubmission",
    "SMK Store: $5,832 → $19,100 a month, with the dashboards",
    "Michigan Sports & Outdoor: ~3,000 → 11,549 indexed pages, setback included",
  ],
};
