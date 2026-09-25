// components/TrustStrap.tsx
//
// The directory strap — Trustpilot, Clutch, BBB, GoodFirms, LinkedIn,
// YouTube — as links a visitor can actually open.
//
// The hero used to carry an eight-badge "Verified & Listed On" strip. Six of
// those pills said only "Registered" and were not clickable, which is the
// problem with a trust badge: one that cannot be checked invites the question
// of why. This keeps the E-E-A-T signal and fixes that:
//
//   - every badge links to the profile it names (the same URLs as the
//     Organization `sameAs` in lib/site-schema.ts, so what a visitor can click
//     and what a crawler reads are one list)
//   - each label says what is actually there — "1 verified review", "Company
//     profile" — never "Verified" or a rating the profile does not show
//
// It sits below the client marquee rather than in the hero, so it supports the
// proof instead of pushing the offer off the first screen.
//
// Server component: plain links, no interactivity.

import { ExternalLink } from "lucide-react";

import { TRUSTPILOT_REVIEW_COUNT, TRUSTPILOT_URL } from "@/lib/hero-content";

type Profile = { name: string; label: string; href: string; mark: React.ReactNode };

const PROFILES: Profile[] = [
  {
    name: "Trustpilot",
    label: TRUSTPILOT_REVIEW_COUNT === 1 ? "1 verified review" : `${TRUSTPILOT_REVIEW_COUNT} verified reviews`,
    href: TRUSTPILOT_URL,
    mark: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#00b67a" d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 18.94l-6.64 5.17 2.76-8.47L1 10.47h8.24z" />
      </svg>
    ),
  },
  {
    name: "Clutch",
    label: "Company profile",
    href: "https://clutch.co/profile/searchprex",
    mark: (
      <span className="flex h-5 w-5 items-center justify-center rounded bg-[#17313b] text-[10px] font-black text-white" aria-hidden="true">
        C
      </span>
    ),
  },
  {
    name: "BBB",
    label: "Business profile",
    href: "https://www.bbb.org/us/il/chicago/profile/searchprex",
    mark: (
      <span className="flex h-5 w-5 items-center justify-center rounded bg-[#005a78] text-[8px] font-black text-white" aria-hidden="true">
        BBB
      </span>
    ),
  },
  {
    name: "GoodFirms",
    label: "Company profile",
    href: "https://www.goodfirms.co/company/searchprex",
    mark: (
      <span className="flex h-5 w-5 items-center justify-center rounded bg-[#534AB7] text-[10px] font-black text-white" aria-hidden="true">
        G
      </span>
    ),
  },
  {
    name: "LinkedIn",
    label: "Company page",
    href: "https://www.linkedin.com/company/searchprex/",
    mark: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#0a66c2"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    label: "Case-study walkthroughs",
    href: "https://www.youtube.com/@SearchPrex",
    mark: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#ff0000" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8z" />
        <path fill="#fff" d="M9.6 15.6V8.4l6.3 3.6z" />
      </svg>
    ),
  },
];

export default function TrustStrap() {
  return (
    <section aria-labelledby="trust-strap-heading" className="border-t border-[#e5e7eb] bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="trust-strap-heading"
          className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#5b6472]"
        >
          Find SearchPrex on
        </h2>
        <ul className="flex flex-wrap justify-center gap-2">
          {PROFILES.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 shadow-sm transition-all hover:border-[#1a7d59] hover:shadow-md"
              >
                {p.mark}
                <span>
                  <span className="block text-xs font-bold leading-none text-[#0a0f2e]">{p.name}</span>
                  <span className="mt-0.5 block text-[10px] leading-tight text-[#5b6472]">{p.label}</span>
                </span>
                <ExternalLink className="h-3 w-3 text-[#94a3b8] transition-colors group-hover:text-[#1a7d59]" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
