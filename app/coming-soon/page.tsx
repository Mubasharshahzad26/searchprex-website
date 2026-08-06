// app/coming-soon/page.tsx
// Server Component. Owns metadata; the waitlist form lives in ComingSoonClient.
//
// Previously "use client" and therefore served the root layout's default
// (homepage) title. This page is also deliberately noindex — an unreleased
// tools page competing in search only splits relevance away from /tools.

import type { Metadata } from "next";
import ComingSoonClient from "./ComingSoonClient";

const SITE = "https://www.searchprex.com";

export const metadata: Metadata = {
  title: "Coming Soon — New SEO Tools",
  description:
    "New free SEO tools from SearchPrex are on the way — content audits, link analysis, and reporting. Join the waitlist to hear first.",
  alternates: { canonical: `${SITE}/coming-soon` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ComingSoonClient />;
}
