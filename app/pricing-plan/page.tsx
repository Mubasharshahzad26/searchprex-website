import type { Metadata } from "next";
import Link from "next/link";
import { getPageSEO } from "@/lib/admin-seo";
import { Logo } from "@/components/Logo";

const GREEN = "#3eb489";

// This page had no metadata at all, so it inherited the root layout's title and
// canonical and shipped as a duplicate of the homepage.
const baseMetadata: Metadata = {
  title: "SEO Pricing Plans",
  description:
    "Transparent SEO pricing from SearchPrex — a $2 founder-reviewed SEO Growth Roadmap, and monthly plans for law firms, ecommerce stores and local businesses. No contracts, no hidden fees.",
  alternates: { canonical: "https://www.searchprex.com/pricing-plan" },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/pricing-plan", baseMetadata);
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#eaecf3] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex mb-10">
          <Logo size="md" variant="dark" />
        </Link>

        <h1 className="text-3xl font-black text-[#0a0f2e] mb-3">Pricing</h1>
        <p className="text-[#64748b] text-sm mb-10">
          Simple, transparent pricing. No hidden fees.
        </p>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold text-[#0a0f2e] mb-2">SEO Growth Roadmap</h2>
          <p className="text-[#64748b] text-sm mb-4">
            A personalized, founder-reviewed audit covering technical SEO, content gaps,
            and ranking opportunities for your website. Delivered to your email within 24 hours.
          </p>
          <div className="text-3xl font-black mb-4" style={{ color: GREEN }}>$2</div>
          <Link
            href="/free-audit"
            className="inline-block rounded-lg px-5 py-2.5 text-sm font-bold text-white"
            style={{ background: GREEN }}
          >
            Get My Growth Roadmap →
          </Link>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold text-[#0a0f2e] mb-2">NicheSEOPro AI</h2>
          <p className="text-[#64748b] text-sm mb-2">
            AI-powered SEO content, keyword research, and on-page optimization suite.
            Subscription plans launching soon.
          </p>
          <span className="inline-block text-xs font-semibold text-[#534AB7] bg-[#EEEDFE] px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#0a0f2e] mb-2">Full SEO Services</h2>
          <p className="text-[#64748b] text-sm mb-4">
            Ongoing SEO management for law firms, ecommerce, and local businesses.
            Pricing depends on scope — book a call for a custom quote.
          </p>
          <Link href="/free-audit" className="text-sm font-semibold" style={{ color: GREEN }}>
            Talk to us →
          </Link>
        </div>
      </div>
    </div>
  );
}