// lib/black-friday-offer.ts
//
// Black Friday & Cyber Week 2026 campaign configuration.
// Runs through end of Cyber Week (December 5, 2026).
// Controls the seasonal promo visibility across Cleveland location page.

export const BLACK_FRIDAY_2026_END = Date.parse("2026-12-05T04:00:00Z");
export const BLACK_FRIDAY_DISCOUNT_PERCENT = 25;
export const BLACK_FRIDAY_LEAD_SOURCE = "cleveland:black-friday-2026";

/**
 * Returns true if Black Friday 2026 offer is active.
 * Set FORCE_ENABLE = true for testing or early launch.
 */
export function isBlackFridayOfferLive(now: number = Date.now()): boolean {
  // Allow manual override via env if needed, otherwise compare with end date
  if (process.env.NEXT_PUBLIC_FORCE_BLACK_FRIDAY === "true") return true;
  return now < BLACK_FRIDAY_2026_END;
}

export interface BlackFridayOfferDetails {
  title: string;
  badge: string;
  discount: string;
  bonus: string;
  urgency: string;
}

export const CLEVELAND_BF_OFFER: BlackFridayOfferDetails = {
  title: "Cleveland Law Firm Black Friday Exclusive",
  badge: "🖤 Black Friday & Cyber Week 2026",
  discount: "25% Off Any Law Firm SEO Tier for 3 Months",
  bonus: "Free 24h Cuyahoga County Competitor Court Silo & Case Leak Audit ($950 Value)",
  urgency: "Strict 1-Firm Per Practice Exclusivity · Only 3 Firm Slots for Cuyahoga County",
};
