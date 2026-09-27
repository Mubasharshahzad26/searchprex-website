// lib/gbp-checklist.ts
// The Google Business Profile checklist for local service businesses, as data.
// Rendered as a PDF at /guides/google-business-profile-checklist.pdf and
// offered by GuideMagnet on the local SEO pages.
//
// Same rules as lib/law-firm-checklist.ts:
//   1. Every check can be verified by the owner in a few minutes, free.
//   2. No invented statistics and no client numbers.
//   3. Where a limit or rule is stated (750-character description, up to 20
//      service areas, no incentives for reviews, no virtual offices), it is
//      Google's own published rule — re-check it if Google changes it.

import type { ChecklistPillar } from "@/lib/law-firm-checklist";

export const GBP_CHECKLIST_PILLARS: ChecklistPillar[] = [
  {
    id: "setup",
    name: "The profile itself",
    icon: "MapPin",
    blurb:
      "The fields that decide which searches the profile can appear for at all. Get these wrong and nothing else on this list matters.",
    checks: [
      {
        id: "gbp-1",
        title: "The profile is claimed and verified — one profile per real location",
        critical: true,
        how: "Search your business name and city. If Google offers “Own this business?”, it is unclaimed. Duplicate profiles for the same location split your reviews and signals; merge or remove them.",
      },
      {
        id: "gbp-2",
        title: "The business name is your real-world name, with no added keywords",
        critical: true,
        how: "It should match your signage, invoices and website exactly. Adding service or city words (“Best HVAC Plano”) breaks Google's guidelines and is a common reason profiles are suspended.",
      },
      {
        id: "gbp-3",
        title: "The primary category is the most specific one for your main service",
        critical: true,
        how: "“HVAC contractor”, “Roofing contractor”, “House cleaning service” — not a generic category. Add the other services you genuinely offer as secondary categories; Google allows several.",
      },
      {
        id: "gbp-4",
        title: "Service-area set up correctly for how you work",
        how: "If you travel to customers and don't serve them at your address, hide the address and list the areas you serve (Google allows up to 20). If customers visit you, show the address.",
      },
      {
        id: "gbp-5",
        title: "Hours are accurate, including holiday and special hours",
        how: "Wrong hours send customers to a closed door and lead to bad reviews. Set special hours ahead of every public holiday.",
      },
      {
        id: "gbp-6",
        title: "The website link goes to the most relevant page, not just the homepage",
        how: "For a single-location business the homepage is fine; for several locations, link each profile to that location's page. Add UTM tags so profile visits show up separately in your analytics.",
      },
    ],
  },
  {
    id: "content",
    name: "What the profile says",
    icon: "FileText",
    blurb: "The content that turns a view into a call, and tells Google what you actually do.",
    checks: [
      {
        id: "gbp-7",
        title: "Every service you offer is listed, each with a short description",
        how: "List the individual jobs people search for — “AC installation”, “furnace repair”, “roof inspection” — not just one broad service.",
      },
      {
        id: "gbp-8",
        title: "The description is plain, specific and within 750 characters",
        how: "Say what you do, where, and what makes you different. Google's rules don't allow links or promotional pricing in the description.",
      },
      {
        id: "gbp-9",
        title: "Real photos of your work, team and vehicles — added regularly",
        how: "Before-and-after job photos, the team, the van, the storefront. No stock photos. Fresh photos show the business is active.",
      },
      {
        id: "gbp-10",
        title: "Posts are published every week or two",
        how: "Updates, offers, seasonal reminders, recent jobs. They appear on the profile and show a customer the business is still operating.",
      },
      {
        id: "gbp-11",
        title: "Attributes are filled in where they apply",
        how: "Things like online estimates, onsite services or accessibility. Only claim what is true.",
      },
    ],
  },
  {
    id: "reviews",
    name: "Reviews",
    icon: "Star",
    blurb: "What customers read before they call, and one of the strongest signals for the local results.",
    checks: [
      {
        id: "gbp-12",
        title: "Every customer is asked for a review, the same way, after every job",
        critical: true,
        how: "Use the review link from your profile's “Ask for reviews” option, in a text or email after the job. Asking only happy customers (review gating) and offering anything in return for a review both break Google's policies.",
      },
      {
        id: "gbp-13",
        title: "Reviews arrive steadily, not in bursts",
        how: "Count your reviews from the last 90 days against the three businesses at the top of the map results. A steady flow looks natural; fifty in one week does not.",
      },
      {
        id: "gbp-14",
        title: "Every review gets a reply — including the bad ones",
        how: "Thank the good ones briefly and specifically. Answer criticism calmly, without customer details, and offer to put it right offline. Future customers read the replies.",
      },
      {
        id: "gbp-15",
        title: "Fake or policy-breaking reviews are reported, not argued with",
        how: "Use the report option on the review for spam, conflicts of interest or off-topic content. Argue in the reply and you only draw attention to it.",
      },
    ],
  },
  {
    id: "consistency",
    name: "Consistency across the web",
    icon: "Link",
    blurb: "Google checks your details against your website and other listings. Disagreement weakens the profile.",
    checks: [
      {
        id: "gbp-16",
        title: "Name, address and phone are identical everywhere",
        critical: true,
        how: "Website footer and contact page, Apple Business Connect, Bing Places, Yelp, Facebook and your trade directories. “Suite 200” versus “Ste 200” is the kind of difference to fix.",
      },
      {
        id: "gbp-17",
        title: "Your website has a page for each main service and area",
        how: "The services and areas on the profile should each have a matching page on the site. Google uses your website to judge the profile — and the suggested edits made to it.",
      },
      {
        id: "gbp-18",
        title: "LocalBusiness structured data on the website matches the profile",
        how: "Name, address, phone, hours and service area in your site's structured data should say exactly what the profile says. Check it with Google's Rich Results Test.",
      },
      {
        id: "gbp-19",
        title: "No virtual office, PO box or mailbox as the address",
        critical: true,
        how: "Google's guidelines don't allow them. If you work from home and travel to customers, set up as a service-area business with the address hidden instead.",
      },
    ],
  },
  {
    id: "monitoring",
    name: "Watching and protecting it",
    icon: "Eye",
    blurb: "A profile is not set-and-forget. Anyone can suggest changes to it, and Google can apply them.",
    checks: [
      {
        id: "gbp-20",
        title: "Suggested edits are checked and wrong ones rejected quickly",
        how: "Google notifies owners of edits suggested by others and can publish them if nobody responds. Check the profile at least weekly.",
      },
      {
        id: "gbp-21",
        title: "The Performance report is read every month",
        how: "Calls, direction requests, website clicks and the searches that found you. It shows which services and areas bring the most enquiries.",
      },
      {
        id: "gbp-22",
        title: "Only current staff have access to the profile",
        how: "Review the owners and managers list and remove anyone who has left. Keep at least two owners so you are never locked out.",
      },
      {
        id: "gbp-23",
        title: "Big changes are made one at a time",
        how: "Changing the name, address and categories all at once can trigger re-verification. Make one change, wait for it to settle, then the next.",
      },
    ],
  },
];

export const GBP_TOTAL_CHECKS = GBP_CHECKLIST_PILLARS.reduce((n, p) => n + p.checks.length, 0);
export const GBP_CRITICAL_CHECKS = GBP_CHECKLIST_PILLARS.reduce(
  (n, p) => n + p.checks.filter((c) => c.critical).length,
  0,
);
