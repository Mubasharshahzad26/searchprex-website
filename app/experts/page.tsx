import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import { Linkedin, Award, BadgeCheck, Clock } from "lucide-react";
 
export const metadata: Metadata = {
  title: "Meet Our Experts - SearchPrex SEO Team",
  description:
    "Meet Mubashar Shahzad, founder of SearchPrex. A senior SEO strategist with 5+ years of experience helping law firms, ecommerce stores, and local businesses dominate search.",
  alternates: {
    canonical: "https://searchprex.com/experts",
  },
  openGraph: {
    title: "Meet Our Experts - SearchPrex SEO Team",
    description:
      "Meet Mubashar Shahzad, founder of SearchPrex — senior-led SEO with proven results.",
    url: "https://searchprex.com/experts",
    type: "website",
  },
};
 
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  certifications: string[];
  specialties: string[];
  joining?: boolean;
}
 
const team: TeamMember[] = [
  {
    name: "Mubashar Shahzad",
    role: "CEO & Founder",
    bio: "5+ years of hands-on SEO experience across large-scale ecommerce, law firm, and local SEO. Founded SearchPrex to deliver senior-led, founder-driven SEO with zero junior handoffs.",
    image: "/images/mubashar-shahzad.jpg",
    linkedin: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
    certifications: ["Google Analytics", "Semrush", "Ahrefs"],
    specialties: ["Ecommerce SEO", "Technical SEO", "Strategy"],
  },
  {
    name: "Sarah Mitchell",
    role: "Director of Law Firm SEO",
    bio: "Specialist in legal industry SEO — family law, personal injury, and competitive local legal keywords.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Google Partner", "HubSpot"],
    specialties: ["Family Law SEO", "Personal Injury SEO", "Legal Content"],
    joining: true,
  },
  {
    name: "Michael Chen",
    role: "Head of Ecommerce SEO",
    bio: "Shopify Plus specialist focused on product-page optimization, schema, and revenue-driven ecommerce SEO.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Shopify Expert", "Google Merchant", "GTM"],
    specialties: ["Shopify SEO", "Product Page Optimization", "Schema"],
    joining: true,
  },
  {
    name: "Emily Rodriguez",
    role: "Local SEO Specialist",
    bio: "Focused on helping local businesses dominate Google Maps and multi-location local search.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Google Business Profile", "Yext", "BrightLocal"],
    specialties: ["Local SEO", "GBP Optimization", "Review Management"],
    joining: true,
  },
  {
    name: "David Thompson",
    role: "Technical SEO Lead",
    bio: "Web development and technical SEO specialist — Core Web Vitals, site architecture, and enterprise migrations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Google Developer", "Screaming Frog", "Cloudflare"],
    specialties: ["Technical Audits", "Site Speed", "JavaScript SEO"],
    joining: true,
  },
  {
    name: "Jennifer Adams",
    role: "Content Strategy Director",
    bio: "Content strategist creating SEO content that ranks and converts for competitive industries.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    certifications: ["Clearscope", "SurferSEO", "MarketMuse"],
    specialties: ["Content Strategy", "E-E-A-T", "Topic Clusters"],
    joining: true,
  },
];
 
export default function ExpertsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Meet Our Experts",
    "description": "Meet Mubashar Shahzad, founder of SearchPrex.",
    "url": "https://searchprex.com/experts",
    "mainEntity": {
      "@type": "Person",
      "name": "Mubashar Shahzad",
      "jobTitle": "CEO & Founder",
      "description": team[0].bio,
      "worksFor": { "@type": "Organization", "name": "SearchPrex" },
    },
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
                Our Team
              </span>
              <h1 className="mt-4 text-4xl font-bold text-[#0a0f2e] sm:text-5xl lg:text-6xl">
                Meet Our SEO Experts
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-[#475569]">
                Every SearchPrex client works directly with the founder — a senior strategist
                with 5+ years of hands-on experience. No junior account managers, no outsourced work.
              </p>
            </div>
          </div>
        </section>
 
        {/* Team Grid — grey bg, white cards */}
        <section className="bg-[#eaecf3] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => {
                const isJoining = member.joining;
                return (
                  <article
                    key={member.name}
                    className={`overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-xl ${
                      isJoining ? "opacity-95" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-[#1a3c8f] to-[#2563eb]">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role} at SearchPrex`}
                        fill
                        className={`object-cover transition-all duration-300 ${
                          isJoining
                            ? "blur-[6px] grayscale scale-105"
                            : "object-top hover:scale-105"
                        }`}
                      />
 
                      {/* Founder badge — white text on blue is CORRECT, kept */}
                      {!isJoining && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                          <BadgeCheck className="h-4 w-4" />
                          Founder
                        </div>
                      )}
 
                      {/* Joining Soon overlay */}
                      {isJoining && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f2e]/40">
                          <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2563eb] shadow-lg">
                            <Clock className="h-4 w-4" />
                            Joining Soon
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-[#0a0f2e]">{member.name}</h2>
                          <p className="text-sm text-[#2563eb]">{member.role}</p>
                        </div>
                        {!isJoining ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#64748b] transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                            aria-label={`${member.name} LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        ) : (
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#cbd5e1]"
                            aria-hidden="true"
                          >
                            <Linkedin className="h-5 w-5" />
                          </span>
                        )}
                      </div>
 
                      <p className="mt-4 text-sm leading-relaxed text-[#64748b]">{member.bio}</p>
 
                      <div className="mt-4 flex flex-wrap gap-2">
                        {member.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="rounded-full bg-[#f1f3f9] px-3 py-1 text-xs font-medium text-[#374151]"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
 
                      <div className="mt-4 flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
                        <Award className="h-4 w-4 text-[#f59e0b]" />
                        <p className="text-xs text-[#64748b]">{member.certifications.join(" • ")}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
 
        {/* CTA — DARK navy so white text is visible & pops */}
        <section className="bg-[#0a0f2e] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Work With Our Experts?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Schedule a free consultation with the founder to discuss your SEO goals
              and create a custom growth plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/free-audit"
                className="rounded-xl bg-[#2563eb] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
              >
                Get Free Consultation
              </a>
              <a
                href="tel:+923106526316"
                className="rounded-xl border-2 border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white hover:text-[#0a0f2e]"
              >
                Call +92 310 652 6316
              </a>
            </div>
          </div>
        </section>
      </main>
 
      <ChatWidget />
    </>
  );
}
 






















