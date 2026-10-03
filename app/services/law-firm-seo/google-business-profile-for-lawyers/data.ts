// app/services/law-firm-seo/google-business-profile-for-lawyers/data.ts
//
// Copy for the law firm Google Business Profile spoke, kept out of the client
// component so page.tsx builds the FAQPage schema from the same arrays.
//
// The honesty rule of the law firm pages applies here (see
// ../data.ts): SearchPrex has not completed a law firm engagement, so no
// legal result is claimed, and every capture on the page is from another
// industry and labelled as such. Law firm marketing also answers to ABA Model
// Rule 7.1 — no position, timeline or outcome is promised.
//
// Sources for the ethics lines (checked 4 Oct 2026):
//   - NYSBA Committee on Professional Ethics, Opinion 1286 (29 Sep 2025): a
//     lawyer may ask a former client for a Google review and offer a nominal
//     gift, if the lawyer doesn't draft it or condition the gift on content.
//   - ABA Formal Opinion 496 (13 Jan 2021): a reply to a negative review must
//     not disclose information relating to the representation.
//   - Google's review policy prohibits offering anything in exchange for a
//     review, so this page recommends no incentives even where a bar allows a
//     nominal gift.

import { RETAINER_PLANS, formatRange } from "@/lib/pricing";

export interface QA {
  q: string;
  a: string;
}

const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

export const META = {
  title: "Google Business Profile Optimization for Law Firms | SearchPrex",
  description:
    "Google Business Profile optimization for US law firms: practice-area categories, attorney listings, reviews inside bar ethics rules, and protection from suspensions and spam competitors. Founder-led.",
  h1: "Google Business Profile for Lawyers",
  accent: "built for the map pack and the bar rules",
};

/** Six checks a managing partner can run on the firm's profile. */
export const PROBLEMS: Array<{ title: string; check: string; costs: string }> = [
  {
    title: "“Law firm” as the primary category",
    check: "Is your primary category the generic “Law firm” — or your main practice, such as “Personal injury attorney” or “Family law attorney”?",
    costs: "The specific category is what makes the profile eligible for “car accident lawyer near me”. Generic categories lose those searches.",
  },
  {
    title: "Attorney profiles that compete with the firm",
    check: "Search each attorney’s name. Does a separate profile appear with its own reviews and a different phone number?",
    costs: "Duplicate or badly set up attorney listings split reviews and confuse Google about which listing to show.",
  },
  {
    title: "A satellite office nobody staffs",
    check: "Does every office on Google have staff there during the hours listed — or is one a virtual or shared address?",
    costs: "Google’s guidelines don’t allow unstaffed virtual offices. It is one of the most common reasons law firm profiles are suspended.",
  },
  {
    title: "Few recent reviews",
    check: "Count reviews from the last 90 days against the three firms above you for your main practice search.",
    costs: "Recency moves the map pack — and a prospective client reading two-year-old reviews calls the firm with last month’s.",
  },
  {
    title: "Replies that reveal too much",
    check: "Read your replies to negative reviews. Do any mention the client’s case, outcome or circumstances?",
    costs: "ABA Formal Opinion 496 warns that a reply disclosing anything about the representation can breach confidentiality.",
  },
  {
    title: "Keyword-stuffed competitors above you",
    check: "Look at the firms in your map pack. Is a name like “Smith Law – Car Accident Lawyer Houston” on their sign?",
    costs: "Names stuffed with keywords break Google’s guidelines and can be reported. Leaving them there costs you a place in the top three.",
  },
];

/** What the work covers — the dark band. */
export const INCLUDED: Array<{ title: string; body: string }> = [
  { title: "Practice-area categories", body: "Primary and secondary categories matched to the cases you want — checked against the firms ranking above you." },
  { title: "Practice areas as services", body: "Each practice listed as a service, in the words clients search, linked to its own practice-area page on your site." },
  { title: "Attorney listings", body: "Individual attorney profiles set up — or merged — so reviews and calls aren’t split between duplicates." },
  { title: "Review routine inside bar rules", body: "A simple way to ask former clients for reviews that fits your state’s rules and Google’s policy, plus replies that never reveal client information." },
  { title: "Suspension & edit protection", body: "Office addresses, hours and names kept within Google’s guidelines, and suggested edits caught inside Google’s four-day window." },
  { title: "Spam competitor reporting", body: "Keyword-stuffed names and fake listings in your map pack documented and reported through Google’s redressal process." },
];

/** The "What I check" list. */
export const CHECKS: string[] = [
  "Primary and secondary categories against the top three for your main practice",
  "Every practice area listed as a service and linked to its page",
  "Attorney listings: duplicates, phone numbers and review splits",
  "Each office staffed at the hours shown — no virtual addresses",
  "Firm name exactly as on your sign and letterhead",
  "Review count, recency and replies checked for confidentiality",
  "Consultation booking link and phone tracking",
  "Calls, direction requests and website clicks from the Performance report",
];

export const CAPSULES: QA[] = [
  {
    q: "How do law firms rank in the Google Maps pack?",
    a: "Google says local results are “mainly based on relevance, distance, and popularity.” For a law firm that means the right practice-area category, practice areas listed as services, a website with a page for each practice and city, consistent firm details across legal directories, and a steady flow of genuine client reviews. Distance to the searcher you cannot change.",
  },
  {
    q: "Can lawyers ask clients for Google reviews?",
    a: "In many states, yes — but the rules vary, so check your state bar. New York’s ethics committee (Opinion 1286, 2025) says a lawyer may ask a former client for a Google review, provided the lawyer doesn’t write it for them. Google’s own policy bans offering anything in exchange for a review, so it is safest never to offer a gift or discount, even where a bar would allow a small one.",
  },
  {
    q: "Do you have law firm Business Profile results?",
    a: "Not yet. SearchPrex has not completed a law firm engagement, so no legal result is published. The same Business Profile and local work has local service businesses named in Google’s AI Overviews and ranking #1 organically — shown on this page and labelled as not law firms.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How should a lawyer respond to a negative Google review?",
    a: "Carefully, or not at all. ABA Formal Opinion 496 says a reply must not disclose information relating to the client’s representation. A short, polite response inviting the reviewer to get in touch privately — with no details about the matter — is the safe pattern.",
  },
  {
    q: "Should each attorney have their own Google Business Profile?",
    a: "It depends on how the firm presents itself. Google’s guidelines allow individual practitioners a profile, but duplicates and attorney listings with the firm’s main number can split reviews and calls. The tear-down checks what you have now and whether to keep, merge or set up attorney profiles.",
  },
  {
    q: "Can I list an office address I don’t staff?",
    a: "No. Google’s guidelines require the location to be staffed during the business hours shown; virtual offices and unstaffed shared spaces aren’t eligible, and using one is a common cause of suspension. If you serve an area without an office there, a city page on your website is the safer way to reach it.",
  },
  {
    q: "How much does law firm Google Business Profile work cost?",
    a: LAW_PLAN
      ? `It is part of law firm SEO, which runs ${formatRange(LAW_PLAN)} a month depending on how many practice areas and cities the plan covers. It starts with a free tear-down, it is month to month, and it is one firm per city and practice area.`
      : "It is part of law firm SEO, priced by how many practice areas and cities the plan covers. It starts with a free tear-down, and it is month to month.",
  },
  {
    q: "How long does it take a law firm to rank higher on Google Maps?",
    a: "Category and service fixes can change which searches the profile shows for within weeks. Moving up against established firms in a competitive city takes longer, and nobody can honestly promise a position or a date. The free tear-down gives a realistic read for your market.",
  },
  {
    q: "Can I post case results on my Business Profile?",
    a: "Check your state’s advertising rules first: many require a disclaimer that past results don’t guarantee future outcomes, and some restrict how results are presented. Practice-area guides, firm news and community work are safer posts.",
  },
  {
    q: "What can I do about competitors with fake or keyword-stuffed listings?",
    a: "Suggest an edit to the listing in Google Maps, and for a pattern of violations use Google’s Business Redressal Complaint Form with screenshots. It takes evidence and patience, but a removed spam listing frees a place in the map pack.",
  },
  {
    q: "Do you work with competing firms in my city?",
    a: "No. One firm per city and practice area, so I am never ranking you against another client.",
  },
];
