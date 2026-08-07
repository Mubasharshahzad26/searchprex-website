// app/refund/page.tsx
// This page had no metadata export at all — not because it was a client
// component, but because one was never added. It inherited the root layout's
// homepage title, and the CMS row for /refund was going unused.
//
// It also rendered its own Logo and full-screen shell, duplicating the branding
// the root layout already provides.

import type { Metadata } from "next";
import { getPageSEO } from "@/lib/admin-seo";
import { PageHero, Prose, Section } from "@/components/layout";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/refund`;

const baseMetadata: Metadata = {
  title: "Refund Policy",
  description:
    "SearchPrex refund policy — terms for the SEO Growth Roadmap audit, NicheSEOPro subscriptions, and how to request a refund.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Refund Policy | SearchPrex",
    description: "Refund terms for SearchPrex audits and subscriptions.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/refund", baseMetadata);
}

export default function RefundPolicyPage() {
  return (
    <main id="main-content">
      <PageHero
        centered
        eyebrow="Legal"
        title="Refund Policy"
        subtitle="Terms for our audits and subscriptions, and how to request a refund."
      />

      <Section width="reading" bordered={false}>
        <Prose meta="Last updated: June 2026">
          <h2>SEO Growth Roadmap ($2 Audit)</h2>
          <p>
            This is a digital report delivered to your email within 24 hours of payment.
            Because the product is digital and delivered quickly, refunds are not offered
            once the report has been sent. If you do not receive your audit within 48 hours
            of payment, contact us for a full refund.
          </p>

          <h2>NicheSEOPro AI (Subscriptions)</h2>
          <p>
            Refund terms for NicheSEOPro AI subscription plans will be displayed at checkout
            once the product is live.
          </p>

          <h2>How to Request a Refund</h2>
          <p>
            Email us at <a href="mailto:contact@searchprex.com">contact@searchprex.com</a> with
            your order email and reason for the request. Approved refunds are processed within
            5&ndash;10 business days to your original payment method.
          </p>

          <h2>Payment Processing</h2>
          <p>
            All payments are processed securely by Paddle.com, our payment provider and
            Merchant of Record. Charges on your statement will appear as &ldquo;Paddle.net&rdquo;.
          </p>
        </Prose>
      </Section>
    </main>
  );
}
