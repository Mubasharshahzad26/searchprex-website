// app/guides/law-firm-seo-audit-checklist.pdf/route.ts
//
// The printable PDF of the law firm SEO audit checklist — the download behind
// the GuideMagnet on the law firm pages. Built from lib/law-firm-checklist.ts at
// build time (force-static), so it can never drift from the web version at
// /resources/law-firm-seo-audit-checklist, which stays free and ungated. The
// layout lives in lib/checklist-pdf.ts, shared with the other checklist PDFs.

import { renderChecklistPdf } from "@/lib/checklist-pdf";
import { CHECKLIST_PILLARS, CRITICAL_CHECKS, TOTAL_CHECKS } from "@/lib/law-firm-checklist";

export const dynamic = "force-static";

export function GET() {
  return renderChecklistPdf({
    title: `The ${TOTAL_CHECKS}-Point Law Firm SEO Audit Checklist`,
    subject: "Law firm SEO audit checklist and scoring sheet",
    intro:
      "The checks I run on a law firm's site across five pillars: the Map Pack, organic rankings, AI visibility, legal E-E-A-T and practice-area content. Every check is something you can verify yourself in a few minutes, without buying a tool.",
    pillars: CHECKLIST_PILLARS,
    total: TOTAL_CHECKS,
    critical: CRITICAL_CHECKS,
    closeTitle: "Want it run against your firm instead?",
    closeBody:
      "Send your site to searchprex.com/free-audit and I will check it against the firms above you in your city, and send back what to fix first — free, within 24 hours. — Mubashar Sharif",
    footer: "searchprex.com/resources/law-firm-seo-audit-checklist",
    fileName: "law-firm-seo-audit-checklist.pdf",
  });
}
