// app/services/local-seo/google-business-profile-suspended/data.ts
//
// Copy for the suspension-help spoke. The step-by-step DIY guide is the blog
// post /blog/google-business-profile-suspended (informational intent); this
// page is for owners who want it handled (commercial intent) and links to the
// guide rather than repeating it.
//
// Honesty notes:
//   - SearchPrex has no published reinstatement case study, so no success
//     rate or reinstatement count is claimed. Competitors advertise "98%" and
//     "99%" rates; this page says plainly it can't promise an outcome — only
//     Google reinstates profiles.
//   - Google's rules are quoted from its own help pages, the same quotes the
//     blog post cites.
//   - No price is published for suspension work (lib/pricing has none), and
//     the 90-day money-back guarantee is not offered here.

export interface QA {
  q: string;
  a: string;
}

export const META = {
  title: "Google Business Profile Suspended? Reinstatement Help | SearchPrex",
  description:
    "Google Business Profile suspended? I find the real violation, fix the profile, check your evidence matches it, and handle the appeal — founder-led, no fake success rates. Free 24-hour review.",
  h1: "Google Business Profile Suspension Help",
  accent: "that fixes the cause first",
};

/** The usual causes, each in Google's own words where it has them. */
export const CAUSES: Array<{ title: string; rule: string; fix: string }> = [
  {
    title: "Keywords in the business name",
    rule: "The name should be your real-world name — Google’s own example of a violation is “Regal Pizzeria Open 24 hours”.",
    fix: "Change it to exactly what is on your sign, license and paperwork.",
  },
  {
    title: "A virtual office or mailbox",
    rule: "Google: a rented mailing address you don’t operate from “isn’t eligible”, and P.O. boxes “aren’t acceptable”.",
    fix: "Use a staffed location, or switch to a service-area profile with the address hidden.",
  },
  {
    title: "A coworking address",
    rule: "It only counts if it “maintains clear signage, receives customers at the location during business hours, and is staffed”.",
    fix: "Meet all three, or become a service-area business.",
  },
  {
    title: "A service-area business showing its address",
    rule: "Google: “If you’re a service-area business, you should hide your business address from customers.”",
    fix: "Hide the address and list the towns you serve instead.",
  },
  {
    title: "Duplicate profiles",
    rule: "Google: “There should only be one profile per business.”",
    fix: "Find every duplicate — including old ones from a previous agency — and remove or merge them.",
  },
  {
    title: "The whole account restricted",
    rule: "Google: “As a result of an account restriction, the Business Profiles you manage are suspended.”",
    fix: "When every profile went down at once, the appeal is about the account, not one listing.",
  },
];

/** What the work covers. */
export const INCLUDED: Array<{ title: string; body: string }> = [
  { title: "Find the real violation", body: "The reason in Google’s appeals tool, checked against every line of the profile — and against duplicates and the account it sits in." },
  { title: "Fix the profile first", body: "Name, address, service areas and categories brought inside Google’s guidelines before anything is submitted." },
  { title: "Evidence that matches", body: "Your license, registration or utility bills checked so the business name and address match the profile exactly." },
  { title: "The appeal, done once and properly", body: "Submitted through Google’s appeals tool with the right evidence, instead of a rushed appeal that gets denied." },
  { title: "No new profile while you wait", body: "Creating a replacement profile during a review makes things worse. You get a plan for the calls in the meantime instead." },
  { title: "Prevention afterwards", body: "Suggested edits monitored and the profile kept inside the rules, so it doesn’t happen again." },
];

/** The free review checks. */
export const CHECKS: string[] = [
  "The violation reason shown in Google’s appeals tool",
  "Business name against your sign, license and registration",
  "Address type: storefront, service area, virtual office or coworking",
  "Duplicate profiles under your name, phone or address",
  "Whether the account or just the profile is restricted",
  "Which documents you have, and whether they match the profile",
  "Your website’s name, address and phone against the profile",
];

export const CAPSULES: QA[] = [
  {
    q: "Why was my Google Business Profile suspended?",
    a: "Because Google believes it breaks the guidelines for representing a business. The most common reasons are keywords in the business name, a virtual office or P.O. box, a coworking address that isn’t staffed, a service-area business showing its address, and duplicate profiles. Google’s appeals tool shows the violation reason for your profile.",
  },
  {
    q: "How do I get a suspended Google Business Profile reinstated?",
    a: "Find the violation reason in Google’s appeals tool, fix the profile so it follows the guidelines, gather documents — business registration, license, tax certificate or utility bills — that show the same name and address as the profile, then submit the appeal there. Don’t create a new profile while the appeal is under review.",
  },
  {
    q: "Can you guarantee my profile will be reinstated?",
    a: "No. Only Google reinstates profiles, and any service quoting a guaranteed outcome or a near-perfect success rate is promising something it doesn’t control. What I can do is make sure the profile follows the guidelines and the evidence matches it before the appeal goes in — the two things Google’s own appeal instructions focus on.",
  },
];

export const FAQS: QA[] = [
  {
    q: "Should I create a new profile while my appeal is under review?",
    a: "No. A second profile for the same business is a duplicate, which is itself against Google’s guidelines — the same rule that suspends many profiles in the first place. Use your website, ads or directories for calls while you wait.",
  },
  {
    q: "What evidence does Google accept for an appeal?",
    a: "Google lists official business registration, a business license, tax certificates and utility bills for the business such as electricity, phone, water or internet. Whatever you send, the business name and address must match the profile.",
  },
  {
    q: "My appeal was denied. What now?",
    a: "Read the reason again and look for what still doesn’t match — usually the name, the address type or the documents. A second appeal with the same profile and the same evidence rarely gets a different answer; fix what caused the denial first.",
  },
  {
    q: "Is a ranking drop the same as a suspension?",
    a: "No. A suspended profile disappears from Search and Maps and you can’t edit it. If your profile is still visible but showing up lower, that is a ranking problem with different fixes.",
  },
  {
    q: "How much does suspension help cost?",
    a: "The first review is free: a written answer within 24 hours on what caused the suspension and what has to change. If you want me to handle the fix and the appeal, you see the price before any work starts.",
  },
  {
    q: "How do I stop it happening again?",
    a: "Keep the name exactly as your real-world name, use only a staffed address or hide it as a service-area business, keep one profile per business, and watch for suggested edits — Google gives owners four days to reject one once notified.",
  },
];
