import type { Metadata } from "next";
import About from "@/components/About";
import ChatWidget from "@/components/ChatWidget";
import { CardGrid, Section, SectionHeading } from "@/components/layout";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
 
import { getPageSEO } from "@/lib/admin-seo";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.searchprex.com'
const aboutUrl = `${siteUrl}/about`
 
const baseMetadata: Metadata = {
  title: 'About Us — Founder-Led USA SEO Agency | Niche-Focused Strategies',
  description: 'Meet Mubashar Shahzad, founder of SearchPrex. 5+ years of senior-led SEO for law firms, ecommerce, and local businesses. Founder-executed, algorithm-proof strategies. No juniors, no fluff.',
  keywords: [
    'SearchPrex founder',
    'SEO agency founder',
    'Mubashar Shahzad',
    'founder-led SEO',
    'niche-focused SEO strategy',
    'USA SEO expert',
    'law firm SEO specialist',
    'ecommerce SEO consultant',
    'senior SEO consultant',
    'founder-executed SEO',
    'SEO agency no juniors',
    'revenue-focused SEO',
    'algorithm-proof SEO strategy'
  ],
  authors: [{ name: 'Mubashar Shahzad', url: siteUrl }],
  creator: 'SearchPrex',
  publisher: 'SearchPrex',
  category: 'SEO Services',
  alternates: {
    canonical: aboutUrl,
    languages: {
      'en-US': aboutUrl,
    },
  },
  openGraph: {
    title: 'About SearchPrex — Founder-Led USA SEO Agency',
    description: 'Meet Mubashar Shahzad. Founder-led SEO for law firms, ecommerce, and local businesses. 5+ years of proven results.',
    url: aboutUrl,
    siteName: 'SearchPrex',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SearchPrex - Founder-Led SEO Agency',
      },
    ],
    
  },
  twitter: {
    card: 'summary_large_image',
    site: '@searchprex',
    creator: '@searchprex',
    title: 'About SearchPrex — Founder-Led USA SEO Agency',
    description: 'Meet Mubashar Shahzad, founder of SearchPrex. Founder-executed SEO for law firms, ecommerce & local business.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/about", baseMetadata);
}
 
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
  // ── Enhanced Schema.org Structured Data ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}/#webpage`,
        "url": aboutUrl,
        "name": "About SearchPrex",
        "description": "Founder-led SEO agency specializing in law firms, ecommerce, and local businesses across all 50 US states.",
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "inLanguage": "en-US",
        "mainEntity": { "@id": `${siteUrl}/#organization` }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "SearchPrex",
        "url": siteUrl,
        "email": "contact@searchprex.com",
        "telephone": "+92-310-652-6316",
        "founder": {
          "@type": "Person",
          "@id": "#founder",
          "name": "Mubashar Shahzad",
          "jobTitle": "Founder & Lead SEO Strategist",
          "email": "contact@searchprex.com",
          "image": `${siteUrl}/images/mubashar-shahzad.jpg`,
          "sameAs": [
            "https://linkedin.com/in/mubashar-shahzad-seo",
            "https://twitter.com/searchprex"
          ],
          "affiliation": { "@id": `${siteUrl}/#organization` }
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1250 Executive Place, Suite 450",
          "addressLocality": "Geneva",
          "addressRegion": "IL",
          "postalCode": "60134",
          "addressCountry": "US"
        },
        "areaServed": [
          { "@type": "State", "name": "California" },
          { "@type": "State", "name": "Texas" },
          { "@type": "State", "name": "Florida" },
          { "@type": "State", "name": "New York" },
          { "@type": "State", "name": "Illinois" },
          { "@type": "Country", "name": "United States" }
        ],
        "knowsAbout": [
          "Search Engine Optimization",
          "Law Firm SEO",
          "Ecommerce SEO",
          "Local SEO",
          "Technical SEO",
          "Content Strategy",
          "Link Building"
        ],
        "sameAs": [
          "https://twitter.com/searchprex",
          "https://linkedin.com/company/searchprex",
          "https://instagram.com/searchprex"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "SearchPrex",
        "description": "Founder-led USA SEO agency for law firms, ecommerce, and local businesses",
        "publisher": { "@id": `${siteUrl}/#organization` },
        "inLanguage": "en-US"
      }
    ]
  };
 
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="bg-white pt-20">
 
        {/* ── About component (CEO card + stats + reasons + EEAT) ── */}
        <About />
 
        {/* ── Our Values ── */}
        <Section tone="surface">
          <SectionHeading variant="center" eyebrow="Our Values" title="What We Stand For" />
          <CardGrid variant="cards" columns={2}>
            {values.map((value, index) => (
              <div
                key={value.title}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#534AB7] text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#0a0f2e]">{value.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748b]">{value.description}</p>
              </div>
            ))}
          </CardGrid>
        </Section>
 
        {/* ── Contact / Location ── */}
        <Section bordered={false}>
          <SectionHeading variant="center" eyebrow="Contact Us" title="Get in Touch" />
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm sm:p-10">
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
                  <address className="text-sm text-[#374151] not-italic">
                    1250 Executive Place, Suite 450<br />Geneva, IL 60134, USA
                  </address>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                    <Phone className="h-4 w-4 text-[#534AB7]" />
                  </div>
                  <a
                    href="tel:+923106526316"
                    className="text-sm text-[#475569] transition-colors hover:text-[#534AB7]"
                    title="Call SearchPrex"
                  >
                    +92 310 652 6316
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                    <Mail className="h-4 w-4 text-[#534AB7]" />
                  </div>
                  <a 
                    href="mailto:contact@searchprex.com" 
                    className="text-sm text-[#374151] hover:text-[#534AB7] transition-colors"
                    title="Email SearchPrex"
                  >
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
        </Section>
 
      </main>
      <ChatWidget />
    </>
  );
}
 