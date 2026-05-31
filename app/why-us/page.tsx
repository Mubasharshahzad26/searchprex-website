import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import {
  Phone,
  Users,
  Shield,
  Clock,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  MapPin
} from "lucide-react";
import Link from "next/link";
 
export const metadata: Metadata = {
  title: "Why Choose SearchPrex - USA SEO Agency Benefits",
  description:
    "Discover why 20+ businesses trust SearchPrex for their SEO needs. Founder-led execution, senior strategy, transparent pricing, and real results.",
  alternates: {
    canonical: "https://searchprex.com/why-us",
  },
  openGraph: {
    title: "Why Choose SearchPrex - USA SEO Agency Benefits",
    description: "Discover why 20+ businesses trust SearchPrex for their SEO needs.",
    url: "https://searchprex.com/why-us",
    type: "website",
  },
};
 
const reasons = [
  {
    icon: Users,
    title: "Founder-Led Execution",
    description:
      "No junior account managers or outsourced work. Every client works directly with the founder — a senior SEO strategist with 5+ years of hands-on experience.",
    stats: "5+ Years Experience",
  },
  {
    icon: Shield,
    title: "90-Day Progress Guarantee",
    description:
      "If you don't see measurable progress within 90 days, we keep working at no extra cost until you do. We're that confident in our process.",
    stats: "100% Risk-Free",
  },
  {
    icon: Clock,
    title: "24-Hour Response Time",
    description:
      "No waiting weeks for reports or answers. We respond to all client inquiries within 24 hours, usually much faster.",
    stats: "< 24 Hour Response",
  },
  {
    icon: Target,
    title: "Niche Specialization",
    description:
      "We only work with law firms, ecommerce stores, and local service businesses. This deep specialization means better results for you.",
    stats: "20+ Niche Clients",
  },
  {
    icon: Award,
    title: "Certified Expertise",
    description:
      "Certified across Google Analytics, Semrush, and Ahrefs. We stay ahead of algorithm changes so you don't have to.",
    stats: "Google · Semrush · Ahrefs",
  },
  {
    icon: MapPin,
    title: "US-Market Focused",
    description:
      "We work US business hours and know US search dynamics across all 50 states — your market, your timezone, your customers.",
    stats: "All 50 States",
  },
];
 
const comparisons = [
  { feature: "Senior SEO Strategist (Founder)", us: true, others: false },
  { feature: "90-Day Progress Guarantee", us: true, others: false },
  { feature: "No Long-Term Contracts", us: true, others: false },
  { feature: "US-Market Focused", us: true, others: false },
  { feature: "Niche Industry Expertise", us: true, others: false },
  { feature: "Transparent Reporting", us: true, others: "Sometimes" },
  { feature: "Direct Communication", us: true, others: false },
  { feature: "Custom Strategies", us: true, others: "Template-based" },
];
 
export default function WhyUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Choose SearchPrex",
    "description": "Discover why 20+ businesses trust SearchPrex for their SEO needs.",
    "url": "https://searchprex.com/why-us",
  };
 
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      {/* GREY page background */}
      <main id="main-content" className="bg-[#eaecf3] pt-32">
        {/* Hero — grey */}
        <section className="bg-[#eaecf3] pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                Why SearchPrex
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Why Businesses <br className="hidden sm:block" />
                <span className="text-[#2563eb]">Trust SearchPrex</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#475569]">
                We&apos;re not your typical SEO agency. No smoke and mirrors, no
                vanity metrics — just real results from a founder who genuinely
                cares about your success.
              </p>
            </div>
          </div>
        </section>
 
        {/* Reasons Grid — grey bg, white cards */}
        <section className="bg-[#eaecf3] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-3xl bg-white p-8 shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                    <reason.icon className="h-7 w-7 text-[#2563eb]" />
                  </div>
                  <h2 className="mt-6 text-xl font-bold text-[#0a0f2e]">
                    {reason.title}
                  </h2>
                  <p className="mt-3 text-[#64748b] leading-relaxed">
                    {reason.description}
                  </p>
                  <p className="mt-4 inline-block rounded-full bg-[#f1f3f9] px-4 py-1.5 text-sm font-bold text-[#2563eb]">
                    {reason.stats}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* Comparison Table — grey bg, dark table header keeps white text (correct) */}
        <section className="bg-[#eaecf3] py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
                SearchPrex vs. Other Agencies
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#64748b]">
                See how we stack up against the competition. Spoiler: we do things differently.
              </p>
            </div>
 
            <div className="mt-12 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
              <table className="w-full">
                <thead className="bg-[#0a0f2e]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-white">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white">
                      SearchPrex
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white/60">
                      Other Agencies
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {comparisons.map((row) => (
                    <tr key={row.feature} className="hover:bg-[#f7f8fc]">
                      <td className="px-6 py-4 text-[#374151]">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.us === true ? (
                          <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                        ) : (
                          <span className="text-[#64748b]">{String(row.us)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.others === true ? (
                          <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                        ) : row.others === false ? (
                          <span className="text-2xl text-red-400">×</span>
                        ) : (
                          <span className="text-sm text-[#64748b]">
                            {row.others}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
 
        {/* Call CTA — blue bg, white text is CORRECT, kept */}
        <section className="bg-[#2563eb] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Phone className="mx-auto h-16 w-16 text-white/20" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Ready to Talk?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Reach out and the founder will personally answer your questions and
              discuss how we can help grow your business.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:+923106526316"
                className="flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#0a0f2e] transition-all hover:bg-[#f7f8fc]"
              >
                <Phone className="h-5 w-5" />
                +92 310 652 6316
              </a>
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#0a0f2e]"
              >
                Request Callback
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Mon-Fri · US business hours · No sales pressure, just answers
            </p>
          </div>
        </section>
 
        {/* Location — grey bg */}
        <section className="bg-[#eaecf3] py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 text-[#64748b]">
              <MapPin className="h-5 w-5" />
              <p>
                <strong className="text-[#0a0f2e]">Serving businesses remotely</strong> across all 50 U.S. states · Remote-first SEO
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
 






















