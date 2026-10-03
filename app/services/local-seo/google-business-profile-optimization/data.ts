// app/services/local-seo/google-business-profile-optimization/data.ts
//
// Copy for the Google Business Profile optimization spoke, kept out of the
// client component so page.tsx builds the FAQPage schema from the same arrays
// the page renders.
//
// Honesty notes:
//   - There is no map pack (local 3-pack) screenshot on the site. The proof is
//     organic rankings, an AI Overview citation and Search Console, from local
//     work that included the Business Profile — and it is labelled that way.
//     Nothing here claims a map pack position.
//   - Door Doctor's 490 Business Profile interactions (Apr–May 2025) are down
//     4.9% on the same months of 2024 in the screenshot, so they are not used
//     as a growth result here.
//   - Google's ranking factors are quoted from Google's own help page.

import { RETAINER_PLANS, formatRange } from "@/lib/pricing";

export interface QA {
  q: string;
  a: string;
}

const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

export const META = {
  title: "Google Business Profile Optimization Services | SearchPrex",
  description:
    "Google Business Profile optimization for US local businesses: categories, services, reviews, photos and suggested-edit monitoring — founder-led, month to month, 90-day guarantee.",
  h1: "Google Business Profile Optimization Services",
  accent: "that turn Maps views into calls",
};

/** Six things an owner can check on their own profile today. */
export const PROBLEMS: Array<{ title: string; check: string; costs: string }> = [
  {
    title: "A primary category that is too broad",
    check: "Open your profile → Edit profile → Business category. Is it “Contractor” when you are a “Roofing contractor”?",
    costs: "The primary category is the strongest relevance signal you control. Too broad, and you are left out of the searches that bring jobs.",
  },
  {
    title: "Service areas set up like a storefront",
    check: "If customers never visit you, is your address hidden and are the towns you drive to listed as service areas?",
    costs: "Service-area settings decide where the profile can show. Getting them wrong can also put the profile at risk of suspension.",
  },
  {
    title: "Few recent reviews, and no replies",
    check: "Count your reviews from the last 90 days and compare with the top three businesses in the map pack.",
    costs: "Recency moves the map pack as much as the star rating — and a reply to every review is what the next customer reads.",
  },
  {
    title: "Hours and phone that disagree with your website",
    check: "Compare the hours, phone and address on your profile with your website, Yelp and Apple Maps.",
    costs: "Google now uses your website to judge edits the public suggests to your profile. If the two disagree, a stranger’s edit can win.",
  },
  {
    title: "No photos of real work, no recent posts",
    check: "When did your profile last get a new photo of a finished job, your team or your vehicles?",
    costs: "A stale profile looks closed. Real job photos are what convince a customer to call you instead of the next listing.",
  },
  {
    title: "A business name with keywords stuffed in",
    check: "Is the name on your profile exactly the name on your sign and paperwork — or “Best Plumber Dallas Cheap”?",
    costs: "Google’s guidelines ban keywords in the name. It is one of the most common reasons profiles get suspended.",
  },
];

/** What the work covers, shown on the dark "included" band. */
export const INCLUDED: Array<{ title: string; body: string }> = [
  { title: "Category & service audit", body: "Primary and secondary categories checked against the three businesses above you, and every service you want calls for listed in the words customers search." },
  { title: "Profile details, to Google’s rules", body: "Name, hours, attributes and service areas set up exactly as Google’s guidelines require — nothing that puts the profile at risk." },
  { title: "Photos & posts", body: "Real photos of your jobs, team and vehicles, and regular posts so the profile never looks abandoned." },
  { title: "Review routine & replies", body: "A simple, policy-safe way to ask happy customers for reviews, and a reply to every review — good or bad." },
  { title: "Suggested-edit monitoring", body: "Edits the public suggests are caught inside Google’s four-day window, before they publish themselves." },
  { title: "Website & citations to match", body: "Your website and the main directories made to agree with the profile, so Google trusts the details it shows." },
];

/** The "What I check" list beside the profile band. */
export const CHECKS: string[] = [
  "Primary and secondary categories against the top three in your map pack",
  "Every service listed, in the words customers actually search",
  "Service areas, or a storefront address — never both by mistake",
  "Hours, phone and address identical to your website",
  "Photo count and freshness against your competitors",
  "Review count, recency and reply rate",
  "Pending suggested edits and recent changes Google made",
  "Calls, direction requests and website clicks in the Performance report",
];

/** Who the work is set up for — each needs the profile configured differently. */
export const BUSINESS_TYPES: Array<{ title: string; body: string; href?: string }> = [
  {
    title: "Service-area businesses",
    body: "HVAC, cleaning, roofing, garage doors — you go to the customer. Address hidden, towns listed, a page on your site for each service.",
    href: "/services/local-seo/hvac",
  },
  {
    title: "Storefront businesses",
    body: "Clinics, shops, studios — customers come to you. Address, opening hours, parking and accessibility attributes, and photos of the inside and outside.",
  },
  {
    title: "Multiple locations",
    body: "One profile per real location, each with its own page, hours and phone — standardised so no location contradicts another.",
  },
];

export const CAPSULES: QA[] = [
  {
    q: "What is Google Business Profile optimization?",
    a: "It is the work of setting up and maintaining your free Google Business Profile — categories, services, hours, service areas, photos, posts and reviews — so Google shows it for the searches that matter to you and customers choose to call. It is one part of local SEO; the website and citations behind the profile are the other part.",
  },
  {
    q: "How does Google rank Business Profiles in the map pack?",
    a: "Google says local results are “mainly based on relevance, distance, and popularity.” Relevance is how well your profile matches the search, distance is how far you are from the searcher, and prominence is how well known the business is, including its reviews. You can improve relevance and prominence; you cannot change distance.",
  },
  {
    q: "What results have SearchPrex local clients seen?",
    a: "D.O.L.L.S. Cleaning in Michigan, whose work included its Business Profile, holds #1 and #2 for carpet cleaning in Clawson, is named first in Google’s AI Overview for post-construction cleaning in Chesterfield, and went from 192 to 264 monthly clicks in Search Console. HVAC Services Team in Simi Valley, California is named in Google’s AI Overview for an AC installation search. These are organic and AI Overview results, each with its screenshot on the case study.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How much does Google Business Profile optimization cost?",
    a: LOCAL_PLAN
      ? `It is part of local SEO, which runs ${formatRange(LOCAL_PLAN)} a month depending on how many locations and service areas the plan covers. It starts with a free tear-down of your profile, and it is month to month.`
      : "It is part of local SEO, priced by how many locations and service areas the plan covers. It starts with a free tear-down of your profile, and it is month to month.",
  },
  {
    q: "How long does it take to rank higher on Google Maps?",
    a: "Profile fixes such as the right category and services can change which searches you show for within weeks. Moving up against established competitors takes longer and depends on your market, so nobody can honestly promise a date. The free tear-down gives you a realistic read for your area.",
  },
  {
    q: "Can you guarantee a top-three map pack position?",
    a: "No, and nobody honestly can — Google decides rankings. What is guaranteed is the work and the result of it: if you don’t see measurable progress within 90 days, I either keep working at no extra cost until you do, or refund what you paid for those 90 days.",
  },
  {
    q: "Do I still need a website if I have a Business Profile?",
    a: "Yes. Google checks your website to judge how relevant the profile is and to decide on suggested edits, and the profile links to it when a customer wants to know more before calling.",
  },
  {
    q: "What if my Google Business Profile gets suspended?",
    a: "Find the cause before you appeal — a keyword-stuffed name, a virtual-office address or a service-area setting are the usual ones — fix it, then request reinstatement with evidence of the real business. The guide linked on this page walks through it.",
  },
  {
    q: "Do you work with businesses that don’t have a storefront?",
    a: "Yes. Service-area businesses are most of my local work — HVAC, cleaning, roofing and door repair. The address is hidden, the towns you serve are listed, and each service gets its own page on your site.",
  },
  {
    q: "Can you manage profiles for more than one location?",
    a: "Yes. Each real location gets its own profile, page, hours and phone, standardised so no location contradicts another. I have done this for a multi-location door repair business.",
  },
  {
    q: "Is there a contract?",
    a: "No. Month to month, with the free tear-down first so you can see what the work would focus on before paying anything.",
  },
];
