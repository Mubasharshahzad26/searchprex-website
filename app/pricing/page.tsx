import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import ChatWidget from "@/components/ChatWidget";
import { Phone } from "lucide-react";
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

// No "90-day money-back guarantee" anywhere on this page. It used to be in the
// meta description, the Open Graph copy, an FAQ answer and the closing band,
// while the homepage FAQ says — correctly — that rankings are not guaranteed
// and no refund is offered. The "from $1,500" starting price was also wrong
// against the ranges this page renders, which start at $800.
const DESCRIPTION = `Transparent monthly SEO retainers: ${RETAINER_PLANS.map(
  (p) => `${p.niche.replace(" SEO", "").toLowerCase()} from ${formatUsd(p.min)}`
).join(", ")}. Exact scope set after a free audit. Monthly, no long-term contracts.`;

const baseMetadata: Metadata = {
  title: "SEO Pricing Plans — USA SEO Agency",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.searchprex.com/pricing",
  },
  openGraph: {
    title: "SEO Pricing Plans - SearchPrex USA SEO Agency",
    description: `Monthly SEO retainers from ${formatUsd(LOWEST_RETAINER)}, set after a free audit. No long-term contracts.`,
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
    a: "Not on rankings — nobody can honestly guarantee a position, and any agency that does is telling you what you want to hear. What I do guarantee is process: your reality check report lands within 24 hours, or I tell you why not before the deadline rather than after it. You also get one client per city per practice area, so I am never optimising your competitor at the same time.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, and downgrades apply to the next billing cycle.",
  },
  {
    q: "Do you offer custom packages?",
    a: "Yes! Enterprise clients receive custom pricing based on their specific needs. Contact us for a tailored proposal.",
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
          trustPoints={["No Credit Card Required", "Monthly, no long-term contract", "Free audit first"]}
        />
      </main>
      <ChatWidget />
    </>
  );
}
