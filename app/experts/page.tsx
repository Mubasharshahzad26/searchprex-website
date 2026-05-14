import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import { Linkedin, Award, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Our Experts - SearchPrex SEO Team",
  description:
    "Meet the senior SEO strategists at SearchPrex. Our USA-based team has 10+ years of experience helping law firms, ecommerce stores, and local businesses dominate search.",
  alternates: {
    canonical: "https://searchprex.com/experts",
  },
  openGraph: {
    title: "Meet Our Experts - SearchPrex SEO Team",
    description:
      "Meet the senior SEO strategists at SearchPrex with 10+ years of combined experience.",
    url: "https://searchprex.com/experts",
    type: "website",
  },
};

const team = [
  {
    name: "Mubashar Shahzad",
    role: "CEO & Founder",
    bio: "10+ years of SEO experience. Former SEO lead at Fortune 500 companies. Founded SearchPrex to bring enterprise-level SEO to businesses of all sizes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/mubi00",
    certifications: ["Google Analytics", "Semrush", "Ahrefs"],
    specialties: ["Enterprise SEO", "Technical SEO", "Strategy"],
  },
  {
    name: "Sarah Mitchell",
    role: "Director of Law Firm SEO",
    bio: "8 years specializing in legal industry SEO. Has helped 100+ law firms achieve first-page rankings for competitive keywords.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Google Partner", "HubSpot"],
    specialties: ["Family Law SEO", "Personal Injury SEO", "Legal Content"],
  },
  {
    name: "Michael Chen",
    role: "Head of Ecommerce SEO",
    bio: "Former Shopify Plus partner. 9 years of ecommerce SEO experience. Managed SEO for stores generating $100M+ in annual revenue.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Shopify Expert", "Google Merchant", "GTM"],
    specialties: ["Shopify SEO", "Product Page Optimization", "Schema"],
  },
  {
    name: "Emily Rodriguez",
    role: "Local SEO Specialist",
    bio: "7 years helping local businesses dominate Google Maps and local search. Expert in multi-location SEO strategies.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Google Business Profile", "Yext", "BrightLocal"],
    specialties: ["Local SEO", "GBP Optimization", "Review Management"],
  },
  {
    name: "David Thompson",
    role: "Technical SEO Lead",
    bio: "12 years in web development and technical SEO. Expert in Core Web Vitals, site architecture, and enterprise migrations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Google Developer", "Screaming Frog", "Cloudflare"],
    specialties: ["Technical Audits", "Site Speed", "JavaScript SEO"],
  },
  {
    name: "Jennifer Adams",
    role: "Content Strategy Director",
    bio: "Former journalist turned SEO content strategist. 8 years creating content that ranks and converts for competitive industries.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Clearscope", "SurferSEO", "MarketMuse"],
    specialties: ["Content Strategy", "E-E-A-T", "Topic Clusters"],
  },
];

export default function ExpertsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Meet Our Experts",
    "description": "Meet the senior SEO strategists at SearchPrex.",
    "url": "https://searchprex.com/experts",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": team.map((member, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": member.name,
          "jobTitle": member.role,
          "description": member.bio,
          "worksFor": {
            "@type": "Organization",
            "name": "SearchPrex"
          }
        }
      }))
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
        <section className="bg-white pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                Our Team
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Meet Our SEO Experts
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#64748b]">
                Every SearchPrex client works directly with senior strategists who 
                have 10+ years of experience. No junior account managers, no outsourced work.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="bg-[#f7f8fc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-[#1a3c8f] to-[#2563eb]">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role} at SearchPrex`}
                      fill
                      className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                    />
                    {member.name === "Mubashar Shahzad" && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white">
                        <BadgeCheck className="h-4 w-4" />
                        Founder
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-[#0a0f2e]">
                          {member.name}
                        </h2>
                        <p className="text-sm text-[#2563eb]">{member.role}</p>
                      </div>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#64748b] transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                        aria-label={`${member.name} LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>

                    <p className="mt-4 text-sm text-[#64748b] leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Specialties */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-[#f7f8fc] px-3 py-1 text-xs font-medium text-[#374151]"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="mt-4 flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
                      <Award className="h-4 w-4 text-[#f59e0b]" />
                      <p className="text-xs text-[#64748b]">
                        {member.certifications.join(" • ")}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a0f2e] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Work With Our Experts?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Schedule a free consultation with one of our senior strategists to 
              discuss your SEO goals and create a custom growth plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#cta"
                className="rounded-xl bg-[#2563eb] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
              >
                Get Free Consultation
              </a>
              <a
                href="tel:+18005551234"
                className="rounded-xl border-2 border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white hover:text-[#0a0f2e]"
              >
                Call (800) 555-1234
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
