import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CEOMessage from "@/components/CEOMessage";
import ChatWidget from "@/components/ChatWidget";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - SearchPrex USA SEO Agency",
  description:
    "Learn about SearchPrex, a US-Focused SEO agency founded by Mubashar Shahzad. 10+ years of experience serving law firms, ecommerce stores, and local businesses across all 50 states.",
  alternates: {
    canonical: "https://searchprex.com/about",
  },
  openGraph: {
    title: "About Us - SearchPrex USA SEO Agency",
    description:
      "Learn about SearchPrex, a US-Focused SEO agency founded by Mubashar Shahzad.",
    url: "https://searchprex.com/about",
    type: "website",
  },
};

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "87", label: "Five-Star Reviews" },
  { value: "50", label: "States Covered" },
];

const values = [
  {
    title: "Transparency",
    description:
      "No black-box tactics. We show you exactly what we're doing and why. Monthly reports include every action taken on your behalf.",
  },
  {
    title: "Results-Driven",
    description:
      "We measure success by your success. Revenue growth, qualified leads, and market share — not just rankings.",
  },
  {
    title: "Senior-Led Execution",
    description:
      "No junior account managers or outsourced work. Every client works directly with experienced SEO strategists.",
  },
  {
    title: "US-Focused Support",
    description:
      "Our entire team is based in the United States. When you call, you speak to someone who understands your market.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SearchPrex",
    "description": "Learn about SearchPrex, a US-Focused SEO agency.",
    "url": "https://searchprex.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "SearchPrex",
      "founder": {
        "@type": "Person",
        "name": "Mubashar Shahzad",
        "sameAs": [
          "https://linkedin.com/in/mubi00",
          "https://researchgate.net/profile/Mubashar-Shahzad"
        ]
      }
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
        <section className="bg-white pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                About SearchPrex
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Your Growth is Our Mission
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#64748b]">
                SearchPrex is a US-Focused SEO agency dedicated to helping law firms, 
                ecommerce stores, and local businesses dominate search results and 
                grow their revenue.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-[#2563eb] sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[#64748b]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <CEOMessage />

        {/* Our Values */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                Our Values
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
                What We Stand For
              </h2>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[#e5e7eb] bg-white p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] text-xl font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#0a0f2e]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[#64748b] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Location */}
        <section className="bg-[#f7f8fc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                Contact Us
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#0a0f2e] sm:text-4xl">
                Our USA Headquarters
              </h2>
            </div>

            <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-8 shadow-lg sm:p-12">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#2563eb]">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a0f2e]">
                    SearchPrex Headquarters
                  </h3>
                  <p className="mt-1 text-[#64748b]">USA Virtual Address</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-[#2563eb]" />
                  <p className="text-[#374151]">
                    1250 Executive Place, Suite 450
                    <br />
                    Geneva, IL 60134, USA
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-[#2563eb]" />
                  <a
                    href="tel:+18005551234"
                    className="text-[#374151] hover:text-[#2563eb]"
                  >
                    +92 310 652 6316
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-[#2563eb]" />
                  <a
                    href="mailto:hello@searchprex.com"
                    className="text-[#374151] hover:text-[#2563eb]"
                  >
                    hello@searchprex.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-[#2563eb]" />
                  <p className="text-[#374151]">
                    Mon - Fri: 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-[#f7f8fc] p-4 text-center">
                <p className="text-sm text-[#64748b]">
                  Serving clients in all{" "}
                  <span className="font-bold text-[#0a0f2e]">50 US States</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
