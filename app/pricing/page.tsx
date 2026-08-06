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
const baseMetadata: Metadata = {
  title: "SEO Pricing Plans - SearchPrex USA SEO Agency",
  description:
    "Transparent SEO pricing for law firms, ecommerce stores, and local businesses. Starting at $1,500/month. No long-term contracts. 90-day money-back guarantee.",
  alternates: {
    canonical: "https://searchprex.com/pricing",
  },
  openGraph: {
    title: "SEO Pricing Plans - SearchPrex USA SEO Agency",
    description:
      "Transparent SEO pricing starting at $1,500/month. No contracts, 90-day guarantee.",
    url: "https://searchprex.com/pricing",
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
    q: "What's included in the 90-day guarantee?",
    a: "If you don't see measurable improvement in rankings, traffic, or leads within 90 days, we'll work for free until you do — or provide a full refund.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SEO Pricing Plans",
    "description": "Transparent SEO pricing for businesses of all sizes.",
    "url": "https://searchprex.com/pricing",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Offer",
            "name": "Beginning Plan",
            "price": "1500",
            "priceCurrency": "USD",
            "description": "For startups and small businesses starting their SEO journey"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Offer",
            "name": "Agency Level Plan",
            "price": "3500",
            "priceCurrency": "USD",
            "description": "For growing businesses requiring comprehensive SEO management"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Offer",
            "name": "Enterprise Plan",
            "description": "Custom solutions for large organizations with complex needs"
          }
        }
      ]
    }
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
              href: "tel:+923106526316",
              label: "+92 310 652 6316",
              variant: "onDark",
              icon: <Phone className="h-4 w-4" aria-hidden />,
            },
          ]}
          trustPoints={["No Credit Card Required", "Cancel Anytime", "90-Day Guarantee"]}
        />
      </main>
      <ChatWidget />
    </>
  );
}
