// app/guides/google-business-profile-checklist.pdf/route.ts
//
// The Google Business Profile checklist for local service businesses — the
// download behind the GuideMagnet on the local SEO pages. Built from
// lib/gbp-checklist.ts at build time (force-static); layout shared with the
// other checklist PDFs in lib/checklist-pdf.ts.

import { renderChecklistPdf } from "@/lib/checklist-pdf";
import { GBP_CHECKLIST_PILLARS, GBP_CRITICAL_CHECKS, GBP_TOTAL_CHECKS } from "@/lib/gbp-checklist";

export const dynamic = "force-static";

export function GET() {
  return renderChecklistPdf({
    title: `The ${GBP_TOTAL_CHECKS}-Point Google Business Profile Checklist`,
    subject: "Google Business Profile checklist for local service businesses",
    intro:
      "For HVAC, roofing, cleaning, home service and remodeling businesses — anyone whose calls come from the map results. Every check follows Google's own guidelines and can be verified from your profile in a few minutes.",
    pillars: GBP_CHECKLIST_PILLARS,
    total: GBP_TOTAL_CHECKS,
    critical: GBP_CRITICAL_CHECKS,
    closeTitle: "Want your profile checked against the businesses above you?",
    closeBody:
      "Send your site to searchprex.com/free-audit and I will compare your profile, reviews and pages with the top three in your area, and send back what to fix first — free, within 24 hours. — Mubashar Sharif",
    footer: "searchprex.com · Google Business Profile checklist",
    fileName: "google-business-profile-checklist.pdf",
  });
}
