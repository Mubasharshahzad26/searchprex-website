import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NicheSEOPro from "@/components/NicheSEOPro";
import ChatWidget from "@/components/ChatWidget";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NicheSEOPro - SEO Tool for Law Firms & Ecommerce | Free Trial",
  description:
    "NicheSEOPro is the SEO tool built specifically for law firms, ecommerce stores, and local businesses. Get a 14-day free trial with no credit card required.",
  alternates: {
    canonical: "https://searchprex.com/tool",
  },
  openGraph: {
    title: "NicheSEOPro - SEO Tool for Niche Businesses",
    description:
      "The SEO tool built for law firms and ecommerce. 14-day free trial.",
    url: "https://searchprex.com/tool",
    type: "website",
  },
};

const features = [
  {
    title: "Industry-Specific Audits",
    description:
      "Unlike generic tools, NicheSEOPro understands your industry. Get audits tailored to law firm websites, ecommerce stores, or local businesses.",
  },
  {
    title: "Competitor Intelligence",
    description:
      "See exactly what your competitors are ranking for, their backlink strategies, and content gaps you can exploit.",
  },
  {
    title: "Local SEO Tracking",
    description:
      "Track your Google Business Profile rankings, local pack positions, and review metrics across multiple locations.",
  },
  {
    title: "ROI Dashboard",
    description:
      "Connect your CRM to see which keywords and pages are driving actual leads and revenue, not just traffic.",
  },
  {
    title: "Content Recommendations",
    description:
      "Get AI-powered content suggestions based on what's working in your specific industry and market.",
  },
  {
    title: "White-Label Reports",
    description:
      "Generate beautiful, branded reports for your clients or stakeholders with one click.",
  },
];

export default function ToolPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NicheSEOPro",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "14-day free trial"
    },
    "description": "SEO tool built for law firms, ecommerce stores, and local businesses.",
    "url": "https://searchprex.com/tool"
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
        <section className="bg-white pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                NicheSEOPro Tool
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                The SEO Tool Built for <br className="hidden sm:block" />
                <span className="text-[#2563eb]">Your Industry</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#64748b]">
                Generic SEO tools give generic advice. NicheSEOPro understands law firms, 
                ecommerce stores, and local businesses — delivering insights that actually 
                move the needle.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#cta"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#features"
                  className="rounded-xl border-2 border-[#0a0f2e] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0f2e] transition-all hover:bg-[#0a0f2e] hover:text-white"
                >
                  See Features
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-[#64748b]">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  14-Day Free Trial
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  No Credit Card Required
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Cancel Anytime
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* NicheSEOPro Component */}
        <NicheSEOPro />

        {/* Features Grid */}
        <section id="features" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
                Everything You Need to Dominate Search
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#64748b]">
                NicheSEOPro combines powerful analysis tools with industry-specific 
                intelligence to give you an unfair advantage.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-[#e5e7eb] p-8">
                  <h3 className="text-xl font-bold text-[#0a0f2e]">{feature.title}</h3>
                  <p className="mt-3 text-[#64748b] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#2563eb] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Try NicheSEOPro?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Start your 14-day free trial today. No credit card required, no commitment.
            </p>
            <Link
              href="#cta"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0f2e] transition-all hover:bg-[#f7f8fc]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
