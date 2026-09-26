// lib/proof-meta.ts
//
// Where each proof screenshot was taken, keyed by its path under public/.
// components/ProofImage reads this, so every capture on the site gets the same
// source badge and browser frame without each page repeating it — the home
// page, the service pages and the case studies all show the same file.
//
// Facts about the capture only: the tool, the property and, where the
// screenshot or its caption shows it, the date or period. The figure a capture
// proves depends on the page it sits on and is passed there.
//
// A path missing from this map still renders, as a plain framed capture.

import type { ProofSource } from "@/components/ProofImage";

export interface ProofMeta {
  source: ProofSource;
  domain?: string;
  when?: string;
}

const MSO = "michigansportsoutdoor.com";

export const PROOF_META: Record<string, ProofMeta> = {
  // SMK Store — WooCommerce dashboard
  "/images/proof/smk-revenue-before.png": { source: "WooCommerce", domain: "smkstore.com", when: "April 2026" },
  "/images/proof/smk-revenue-after.png": { source: "WooCommerce", domain: "smkstore.com", when: "June 2026" },

  // Michigan Sports & Outdoor
  "/images/proof/mso-gsc-indexing-full.png": { source: "Google Search Console", domain: MSO, when: "25 Jul 2026" },
  "/images/indexing-comparsion-before-mso-autopilot.png": { source: "Google Search Console", domain: MSO, when: "21 Aug 2026" },
  "/images/clicks-comaprsion-after-run-mso-autopilot.PNG": { source: "Google Search Console", domain: MSO, when: "13 Jun–29 Aug 2026" },
  "/images/proof/mso-revenue-1-jul20.png": { source: "WooCommerce", domain: MSO, when: "20 Jul 2026" },
  "/images/proof/mso-revenue-2-aug06.png": { source: "WooCommerce", domain: MSO, when: "6 Aug 2026" },
  "/images/proof/mso-revenue-3-sep25.png": { source: "WooCommerce", domain: MSO, when: "25 Sep 2026" },

  // Local HVAC Services
  "/images/proof/local-hvac-ai-overview.png": { source: "Google AI Overview" },
  "/images/proof/local-hvac-blog-rank1.png": { source: "Google Search" },
  "/images/proof/local-hvac-simi-valley.png": { source: "Google Search" },

  // Remit Choice
  "/images/proof/remit-gsc-2023.png": { source: "Google Search Console", domain: "remitchoice.com", when: "Late Aug–Dec 2023" },
  "/images/proof/remit-gsc-2024.png": { source: "Google Search Console", domain: "remitchoice.com", when: "2024" },
  "/images/proof/remit-rank-1-pakistan.png": { source: "Google Search" },
  "/images/proof/remit-ai-overview-ghana.png": { source: "Google AI Overview" },
  "/images/proof/remit-rank-zero-fee.png": { source: "Google Search" },

  // D.O.L.L.S. Cleaning
  "/images/proof/local-dolls-ai-overview-rank1.png": { source: "Google AI Overview" },
  "/images/proof/local-dolls-rank-1-and-2.png": { source: "Google Search" },
  "/images/proof/local-dolls-gsc-comparison.jpg": { source: "Google Search Console", when: "July vs June 2025" },

  // Other local projects
  "/images/mammoth-roofing-gsc.JPG": { source: "Google Search Console" },
  "/images/mammoth-roofing-comparison.JPG": { source: "Google Search Console" },
  "/images/proof/local-mammoth-texas.png": { source: "Google Search" },
  "/images/carpet-cleaning-service.JPG": { source: "Google Search" },
  "/images/door-doctor-google-my-business.JPG": { source: "Google Business Profile" },
  "/images/glendora-kitchens-gsc-perofrmance-states.JPG": { source: "Google Search Console" },
  "/images/glendora-kitchens-top-raking.JPG": { source: "Google Search" },
  "/images/hvac-ranking.JPG": { source: "Google Search" },
  "/images/rank-hvac.JPG": { source: "Google Search" },
};
