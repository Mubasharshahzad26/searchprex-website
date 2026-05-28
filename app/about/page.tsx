
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import About from "@/components/About";
import ChatWidget from "@/components/ChatWidget";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
 
export const metadata: Metadata = {
  title: "About Us — SearchPrex Founder-Led SEO Agency",
  description:
    "Meet Mubashar Shahzad — Founder & Lead SEO Strategist at SearchPrex. 5+ years of niche-focused SEO for law firms, ecommerce stores, and local businesses across all 50 US states.",
  alternates: {
    canonical: "https://searchprex.com/about",
  },
  openGraph: {
    title: "About Us — SearchPrex Founder-Led SEO Agency",
    description:
      "Meet Mubashar Shahzad — Founder & Lead SEO Strategist at SearchPrex. Revenue-focused SEO for law firms, ecommerce, and local businesses.",
    url: "https://searchprex.com/about",
    type: "website",
  },
};
 
const values = [
  {
    title: "We Value Your Money",
    description:
      "No bloated retainers, no vanity deliverables. Every dollar has a clear purpose and a clear expected outcome. We treat your budget like it's our own.",
  },
  {
    title: "Revenue Growth Focused",
    description:
      "We measure success in leads, calls, and sales — not just rankings. Every campaign decision maps back to one question: does this grow revenue?",
  },
  {
    title: "Niche-First Strategy",
    description:
      "We study your industry, your buyers' journey, and your competitors before planning a single piece of content. This niche understanding is our biggest competitive edge.",
  },
  {
    title: "Full Transparency",
    description:
      "Weekly reports, direct GSC access, and plain-English explanations of everything we do. No black-box tactics — you see exactly what we're doing and why.",
  },
];
 
export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About SearchPrex",
    "description": "Founder-led SEO agency specializing in law firms, ecommerce, and local businesses across all 50 US states.",
    "url": "https://searchprex.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "SearchPrex",
      "url": "https://searchprex.com",
      "email": "contact@searchprex.com",
      "telephone": "+923106526316",
      "founder": {
        "@type": "Person",
        "name": "Mubashar Shahzad",
        "jobTitle": "Founder & Lead SEO Strategist",
        "email": "contact@searchprex.com",
        "sameAs": [
          "https://linkedin.com/in/mubi00",
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
      <main id="main-content" className="bg-white pt-20">
 
        {/* ── About component (CEO card + stats + reasons + EEAT) ── */}
        <About />
 
        {/* ── Our Values ── */}
        <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-[#f5f3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                Our Values
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                What We Stand For
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-7 transition-all hover:border-[#534AB7]/30 hover:shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#534AB7] text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 text-lg font-black text-[#0a0f2e]">{value.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── Contact / Location ── */}
        <section className="border-t border-[#e2e8f0] bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block rounded-full bg-[#f5f3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                Contact Us
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
                Get in Touch
              </h2>
            </div>
 
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm sm:p-10">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#534AB7]">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0a0f2e]">SearchPrex</h3>
                  <p className="text-sm text-[#64748b]">US-Focused SEO Agency · Serving All 50 States</p>
                </div>
              </div>
 
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                    <MapPin className="h-4 w-4 text-[#534AB7]" />
                  </div>
                  <p className="text-sm text-[#374151]">
                    1250 Executive Place, Suite 450<br />Geneva, IL 60134, USA
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                    <Phone className="h-4 w-4 text-[#534AB7]" />
                  </div>
                  <a href="tel:+923106526316" className="text-sm text-[#374151] hover:text-[#534AB7] transition-colors">
                    +92 310 652 6316
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                    <Mail className="h-4 w-4 text-[#534AB7]" />
                  </div>
                  <a href="mailto:contact@searchprex.com" className="text-sm text-[#374151] hover:text-[#534AB7] transition-colors">
                    contact@searchprex.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                    <Clock className="h-4 w-4 text-[#534AB7]" />
                  </div>
                  <p className="text-sm text-[#374151]">Mon – Fri: 9:00 AM – 6:00 PM EST</p>
                </div>
              </div>
 
              <div className="mt-8 rounded-xl border border-[#534AB7]/20 bg-[#f5f3ff] px-5 py-4 text-center">
                <p className="text-sm font-medium text-[#534AB7]">
                  Proudly serving clients in all <strong>50 US States</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
 
      </main>
      <ChatWidget />
    </>
  );
}
 