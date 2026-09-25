// lib/credentials.ts
//
// The founder's verifiable credentials, in one place.
//
// Same reason lib/pricing.ts exists: this list used to live inside
// components/Certifications.tsx, which is "use client", so a server component
// could not read it. That kept the credentials on /about (the only page that
// renders that carousel) and off every other page — including the homepage,
// where the Expertise half of E-E-A-T needs them most.
//
// Every href resolves to a document a stranger can open and check. Nothing goes
// in this file that cannot be verified from outside: no self-awarded titles, no
// "10+ years" claims, no badge images without a link behind them.

export interface Credential {
  /** What the credential is in. */
  specialty: string;
  /** "Certified by" or "Published on". */
  credType: string;
  /** Who issued or published it. */
  source: string;
  /** True for a published article rather than a certification. */
  isArticle: boolean;
  /** The public document. */
  href: string;
}

export const credentials: Credential[] = [
  {
    specialty: "SEO Fundamentals",
    credType: "Certified by",
    source: "Semrush",
    isArticle: false,
    href: "https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf",
  },
  {
    specialty: "On-Page & Technical SEO",
    credType: "Certified by",
    source: "Semrush",
    isArticle: false,
    href: "https://static.semrush.com/academy/certificates/0053423184/mubashar-shahzad_2.pdf",
  },
  {
    specialty: "Content Strategy · SEO",
    credType: "Published on",
    source: "HVAC Services Team",
    isArticle: true,
    href: "https://www.hvacservicesteam.com/blog/best-time-to-install-a-new-ac-near-me-california-2026",
  },
  {
    specialty: "Keyword Research",
    credType: "Certified by",
    source: "Semrush",
    isArticle: false,
    href: "https://static.semrush.com/academy/certificates/7ec9b0d154/mubashar-shahzad_2.pdf",
  },
  {
    specialty: "Local SEO",
    credType: "Certified by",
    source: "Semrush",
    isArticle: false,
    href: "https://static.semrush.com/academy/certificates/e2cb11d7cb/mubashar-shahzad_26.pdf",
  },
];
