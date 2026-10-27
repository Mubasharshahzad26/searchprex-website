// lib/halloween-offer.ts
//
// Halloween 2026: a free Google Business Profile "Fright Check" for US local
// businesses. It is the free audit (founder-reviewed, PDF within 24 hours)
// with a seasonal checklist, so it promises nothing the free audit doesn't.
//
// Every surface that shows it — the top bar, the offer cards and the landing
// page — reads OFFER_END, so the offer switches itself off at midnight
// Eastern on 31 October (still EDT; clocks change on 1 November). After that
// the landing page redirects to /free-audit, which stays free.

export const HALLOWEEN_OFFER_END = Date.parse("2026-11-01T04:00:00Z");
export const HALLOWEEN_OFFER_PATH = "/offers/halloween-gbp-check";
export const HALLOWEEN_LEAD_SOURCE = "halloween-2026:gbp-fright-check";

export function isHalloweenOfferLive(now: number = Date.now()): boolean {
  return now < HALLOWEEN_OFFER_END;
}

/** What the Fright Check looks at — the usual reasons a profile underperforms. */
export const FRIGHT_CHECK_ITEMS: { title: string; detail: string }[] = [
  {
    title: "The wrong primary category",
    detail: "Your primary category shapes which searches your profile appears for. A near-miss category can keep you out of the ones that matter.",
  },
  {
    title: "Name, address and phone that don't match",
    detail: "Your profile, website and directory listings should show the same details. Mismatches confuse customers and weaken the signals that point to your business.",
  },
  {
    title: "Keywords stuffed into the business name",
    detail: "Google's guidelines forbid it, and it can get a profile suspended.",
  },
  {
    title: "Reviews left without a reply",
    detail: "How many reviews you have, how recent they are, and whether you answer them.",
  },
  {
    title: "Edits you didn't make",
    detail: "Anyone can suggest changes to a profile. We check whether your hours, phone or category were changed by someone else.",
  },
  {
    title: "A ghost-town profile",
    detail: "Old photos, no recent posts, and empty services and description fields.",
  },
  {
    title: "A website link that leaks credit",
    detail: "Where the profile sends people, and whether you can tell those visits apart in Google Analytics.",
  },
];
