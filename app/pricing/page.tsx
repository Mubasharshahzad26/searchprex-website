import type { Metadata } from "next";
import Link from "next/link";
import Pricing from "@/components/Pricing";
import ChatWidget from "@/components/ChatWidget";
import { BillingOverviewSection } from "@/components/PaymentTrustBadges";
import { Phone, ShieldCheck } from "lucide-react";
import {
  CtaBand,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  Accent,
  type Faq,
} from "@/components/layout";

import { getPageSEO } from "@/lib/admin-seo";
import { LOWEST_RETAINER, RETAINER_PLANS, formatUsd } from "@/lib/pricing";

// The 90-day money-back guarantee, as /terms section 4 states it and the
// founder confirmed in Sept 2026: no measurable progress in 90 days → the
// work continues at no extra cost, or the fees for those 90 days are
// refunded. Same wording as /why-us, /refund and components/WhySearchPrex.
// There is no ranking guarantee. The "from $1,500" starting price was also
// wrong against the ranges this page renders, which start at $800.
const GUARANTEE =
  "If you don't see measurable progress within 90 days, I either keep working at no extra cost until you do, or refund what you paid for those 90 days.";
const DESCRIPTION = `SEO retainers: ${RETAINER_PLANS.map(
  (p) => `${p.niche.replace(" SEO", "").toLowerCase()} from ${formatUsd(p.min)}`
).join(", ")}. Month to month, no long-term contract, 90-day money-back guarantee.`;

const baseMetadata: Metadata = {
  title: "SEO Pricing Plans — USA SEO Agency",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.searchprex.com/pricing",
  },
  openGraph: {
    title: "SEO Pricing Plans - SearchPrex USA SEO Agency",
    description: `Monthly SEO retainers from ${formatUsd(LOWEST_RETAINER)}, set after a free audit. No long-term contract, 90-day money-back guarantee.`,
    url: "https://www.searchprex.com/pricing",
    type: "website",
  },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/pricing", baseMetadata);
}

const faqs: Faq[] = [
  {
    q: "Are there any setup fees?",
    a: "No hidden setup fees. The monthly price you see is the price you pay. We include onboarding and initial setup in all plans.",
  },
  {
    // Same answer as the homepage FAQ, word for word, so the two pages cannot
    // make different promises again.
    q: "Do you offer guarantees?",
    a: `Not on rankings — nobody can honestly guarantee a position, and any agency that does is telling you what you want to hear. What I do guarantee is progress: ${GUARANTEE} Your reality check report lands within 24 hours, or I tell you why not before the deadline rather than after it. You also get one client per city per practice area, so I am never optimising your competitor at the same time.`,
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, and downgrades apply to the next billing cycle.",
  },
  {
    q: "Do you offer custom packages?",
    a: "Yes! Enterprise clients receive custom pricing based on their specific needs. Contact us for a tailored proposal.",
  },
  {
    q: "How do I pay, and what payment methods do you accept?",
    a: "All payments are processed securely via official Stripe Invoicing. We accept all major Credit and Debit Cards (Visa, Mastercard, American Express), Apple Pay, direct US Bank ACH Direct Debit, and international wire transfers via Wise. You receive an itemized, tax-deductible invoice immediately upon payment.",
  },
  {
    q: "Are retainers billed monthly or upfront with a contract?",
    a: "Retainers are billed month-to-month. There are no mandatory 6-month or 12-month lock-in contracts. You can pause or cancel anytime before your next billing cycle with zero friction.",
  },
];

export default function PricingPage() {
  // Built from the same ranges the page renders. Each is a monthly range, not a
  // fixed price, so it is a priceSpecification with min and max.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SEO Pricing Plans",
    "description": DESCRIPTION,
    "url": "https://www.searchprex.com/pricing",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": RETAINER_PLANS.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Offer",
          "name": `${p.niche} retainer`,
          "description": `Monthly ${p.niche} for ${p.best.toLowerCase()}. Exact scope set after a free audit.`,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "minPrice": p.min,
            "maxPrice": p.max,
            "priceCurrency": "USD",
            "unitText": "MONTH",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <PageHero
          centered
          eyebrow="Simple Pricing"
          title={<>Invest in Growth, <br className="hidden sm:block" /><Accent>Not Guesswork</Accent></>}
          subtitle="Clear, honest pricing with no hidden fees. Choose the plan that fits your business and scale as you grow."
        />

        <Pricing />

        {/* Transparent B2B Billing & Payment Methods */}
        <BillingOverviewSection />

        {/* The 90-day guarantee, next to the prices it applies to. */}
        <Section width="reading" tight>
          <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-[#1a7d59]/30 bg-[#ecfdf5] p-6 text-center sm:flex-row sm:text-left">
            <ShieldCheck className="h-10 w-10 flex-shrink-0 text-[#1a7d59]" aria-hidden />
            <div>
              <h2 className="text-lg font-black text-[#0a0f2e]">90-day money-back guarantee</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#374151]">
                {GUARANTEE} It is a guarantee on measurable progress in rankings, traffic or leads — not on a particular
                ranking, because nobody can honestly promise a Google position.{" "}
                <Link href="/terms" className="font-semibold underline">
                  Full terms
                </Link>
                .
              </p>
            </div>
          </div>
        </Section>

        <Section tone="surface" width="reading">
          <SectionHeading variant="center" eyebrow="FAQ" title="Pricing FAQs" />
          <FaqList faqs={faqs} name="pricing-faq" />
        </Section>

        {/* This band used to set white text on a #eeeef5 background — the copy
            was invisible. It now runs on the brand ink like every other closer. */}
        <CtaBand
          eyebrow="Not sure which plan?"
          title="Not Sure Which Plan is Right?"
          body="Talk to our team for a free consultation. We'll analyze your needs and recommend the best plan for your business."
          actions={[
            { href: "/free-audit", label: "Get Free Consultation" },
            {
              href: "tel:+923059158010",
              label: "+92 305 9158010",
              variant: "onDark",
              icon: <Phone className="h-4 w-4" aria-hidden />,
            },
          ]}
          trustPoints={["Free audit first", "Monthly, no long-term contract", "90-day money-back guarantee"]}
        />
      </main>
      <ChatWidget />
    </>
  );
}
