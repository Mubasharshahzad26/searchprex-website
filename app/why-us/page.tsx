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
  title: "Why Call SearchPrex - USA SEO Agency Benefits",
  description:
    "Discover why 500+ businesses trust SearchPrex for their SEO needs. USA-based team, senior-led execution, transparent pricing, and guaranteed results.",
  alternates: {
    canonical: "https://searchprex.com/why-us",
  },
  openGraph: {
    title: "Why Call SearchPrex - USA SEO Agency Benefits",
    description:
      "Discover why 500+ businesses trust SearchPrex for their SEO needs.",
    url: "https://searchprex.com/why-us",
    type: "website",
  },
};

const reasons = [
  {
    icon: Users,
    title: "Senior-Led Execution",
    description:
      "No junior account managers or outsourced work. Every client works directly with SEO strategists who have 10+ years of experience.",
    stats: "10+ Years Experience",
  },
  {
    icon: Shield,
    title: "90-Day Money-Back Guarantee",
    description:
      "If you don't see measurable progress within 90 days, we'll work for free until you do. We're that confident in our process.",
    stats: "100% Risk-Free",
  },
  {
    icon: Clock,
    title: "48-Hour Response Time",
    description:
      "No waiting weeks for reports or answers. Our team responds to all client inquiries within 48 hours, usually much faster.",
    stats: "< 48 Hour Response",
  },
  {
    icon: Target,
    title: "Niche Specialization",
    description:
      "We only work with law firms, ecommerce stores, and local service businesses. This deep specialization means better results for you.",
    stats: "500+ Niche Clients",
  },
  {
    icon: Award,
    title: "Certified Experts",
    description:
      "Our team holds certifications from Google, Semrush, Ahrefs, and more. We stay ahead of algorithm changes so you don't have to.",
    stats: "15+ Certifications",
  },
  {
    icon: MapPin,
    title: "USA-Based Support",
    description:
      "Our entire team is based in the United States. When you call, you speak to someone who understands your market and timezone.",
    stats: "All 50 States",
  },
];

const comparisons = [
  { feature: "Senior SEO Strategists", us: true, others: false },
  { feature: "90-Day Guarantee", us: true, others: false },
  { feature: "No Long-Term Contracts", us: true, others: false },
  { feature: "USA-Based Team", us: true, others: false },
  { feature: "Niche Industry Expertise", us: true, others: false },
  { feature: "Transparent Reporting", us: true, others: "Sometimes" },
  { feature: "Direct Communication", us: true, others: false },
  { feature: "Custom Strategies", us: true, others: "Template-based" },
];

export default function WhyUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Why Call SearchPrex",
    "description": "Discover why 500+ businesses trust SearchPrex for their SEO needs.",
    "url": "https://searchprex.com/why-us",
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
                Why SearchPrex
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Why 500+ Businesses <br className="hidden sm:block" />
                <span className="text-[#2563eb]">Trust SearchPrex</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#64748b]">
                We&apos;re not your typical SEO agency. No smoke and mirrors, no 
                vanity metrics — just real results from a team that genuinely 
                cares about your success.
              </p>
            </div>
          </div>
        </section>

        {/* Reasons Grid */}
        <section className="bg-[#f7f8fc] py-20">
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
                  <p className="mt-4 inline-block rounded-full bg-[#f7f8fc] px-4 py-1.5 text-sm font-bold text-[#2563eb]">
                    {reason.stats}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
                SearchPrex vs. Other Agencies
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#64748b]">
                See how we stack up against the competition. Spoiler: we do things differently.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-[#e5e7eb]">
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

        {/* Call CTA */}
        <section className="bg-[#2563eb] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Phone className="mx-auto h-16 w-16 text-white/20" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Ready to Talk?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Our USA-based team is standing by to answer your questions and 
              discuss how we can help grow your business.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:+18005551234"
                className="flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#0a0f2e] transition-all hover:bg-[#f7f8fc]"
              >
                <Phone className="h-5 w-5" />
                (800) 555-1234
              </a>
              <Link
                href="#cta"
                className="flex items-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#0a0f2e]"
              >
                Request Callback
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Mon-Fri, 9 AM - 6 PM EST • No sales pressure, just answers
            </p>
          </div>
        </section>

        {/* Address */}
        <section className="bg-[#f7f8fc] py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 text-[#64748b]">
              <MapPin className="h-5 w-5" />
              <p>
                <strong>USA Headquarters:</strong> 1250 Executive Place, Suite 450, Geneva, IL 60134
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
