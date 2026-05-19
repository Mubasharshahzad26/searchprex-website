import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import ChatWidget from "@/components/ChatWidget";
import { Check, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
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
      <Nav />
      <main id="main-content" className="pt-32">
        {/* Hero */}
        <section className="bg-white pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                Simple Pricing
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Invest in Growth, <br className="hidden sm:block" />
                <span className="text-[#2563eb]">Not Guesswork</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#64748b]">
                Clear, honest pricing with no hidden fees. Choose the plan that fits your 
                business and scale as you grow.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Component */}
        <Pricing />

        {/* FAQ Section */}
        <section className="bg-[#f7f8fc] py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-[#0a0f2e]">
              Pricing FAQs
            </h2>
            <div className="mt-12 space-y-6">
              {[
                {
                  q: "Are there any setup fees?",
                  a: "No hidden setup fees. The monthly price you see is the price you pay. We include onboarding and initial setup in all plans."
                },
                {
                  q: "What's included in the 90-day guarantee?",
                  a: "If you don't see measurable improvement in rankings, traffic, or leads within 90 days, we'll work for free until you do — or provide a full refund."
                },
                {
                  q: "Can I upgrade or downgrade my plan?",
                  a: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, and downgrades apply to the next billing cycle."
                },
                {
                  q: "Do you offer custom packages?",
                  a: "Yes! Enterprise clients receive custom pricing based on their specific needs. Contact us for a tailored proposal."
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-[#0a0f2e]">{item.q}</h3>
                  <p className="mt-2 text-[#64748b]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a0f2e] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Not Sure Which Plan is Right?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Talk to our team for a free consultation. We&apos;ll analyze your needs and 
              recommend the best plan for your business.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#cta"
                className="rounded-xl bg-[#2563eb] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
              >
                Get Free Consultation
              </Link>
              <a
                href="tel:+18005551234"
                className="flex items-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white hover:text-[#0a0f2e]"
              >
                <Phone className="h-4 w-4" />
                +92 310 652 6316
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                Cancel Anytime
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                90-Day Guarantee
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
