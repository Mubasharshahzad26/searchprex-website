"use client";
import { Favicon } from "@/components/Logo";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
const serviceLinks = [
  { href: "/services/law-firm-seo",   label: "Law Firm SEO" },
  { href: "/services/ecommerce-seo",  label: "Shopify & Ecommerce SEO" },
  { href: "/services/local-seo",      label: "Local SEO" },
  { href: "/services/technical-seo",  label: "Technical SEO Audit" },
  { href: "/services",                label: "All Services" },
];
 
const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/experts", label: "Meet Our Experts" },
  { href: "/why-us", label: "Why Call Us" },
  { href: "/case-studies", label: "Case Studies" },
];
 
const resourceLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];
 
/* Each industry → its relevant service page (SEO-safe, no duplicate pages) */
const industries = [
  { label: "Family Law Firms",         href: "/services/law-firm-seo" },
  { label: "Personal Injury Attorneys", href: "/services/law-firm-seo" },
  { label: "Criminal Defense Lawyers",  href: "/services/law-firm-seo" },
  { label: "Shopify Stores",            href: "/services/ecommerce-seo" },
  { label: "DTC Ecommerce",             href: "/services/ecommerce-seo" },
  { label: "Local Restaurants",         href: "/services/local-seo" },
  { label: "Dental Practices",          href: "/services/local-seo" },
  { label: "HVAC Contractors",          href: "/services/local-seo" },
  { label: "Plumbers",                  href: "/services/local-seo" },
  { label: "Electricians",              href: "/services/local-seo" },
  { label: "Auto Repair Shops",         href: "/services/local-seo" },
  { label: "Salons & Spas",             href: "/services/local-seo" },
];
 
const states = [
  "California", "Texas", "Florida", "New York", "Illinois",
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
];
 
export default function Footer() {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="bg-[#0a0f2e] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Favicon & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Favicon />
            </Link>
            <p className="mb-6 max-w-sm text-sm text-white/70">
              Founder-led SEO. No juniors. No fluff. Specializing in law firm SEO, ecommerce SEO, and local SEO for US businesses — senior-led execution with zero intermediaries.
            </p>
 
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@searchprex.com" className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
                <Mail className="h-4 w-4" />
                contact@searchprex.com
              </a>
              <a href="tel:+923106526316" className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
                <Phone className="h-4 w-4" />
                +92 310 652 6316
              </a>
              <p className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Remote-first SEO agency serving clients across all 50 U.S. states — with a focus on CA, TX, FL, NY, IL.
                </span>
              </p>
            </div>
          </div>
 
          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-6 text-sm font-bold uppercase tracking-widest text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* CTA */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Get Started
            </h3>
            <p className="mb-4 text-sm text-white/70">
              Ready to dominate search? Get your free SEO audit in 24 hours.
            </p>
            <Link
              href="/free-audit"
              className="inline-block rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all"
              style={{ background: GREEN }}
            >
              Free SEO Audit
            </Link>
          </div>
        </div>
 
        {/* Industries & States */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Industries Served — now clickable links */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
                Industries We Serve
              </h4>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Link
                    key={industry.label}
                    href={industry.href}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60 transition-colors hover:border-[#3eb489] hover:text-white"
                  >
                    {industry.label}
                  </Link>
                ))}
              </div>
            </div>
 
            {/* States Served */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
                Top States Served
              </h4>
              <div className="flex flex-wrap gap-2">
                {states.map((state) => (
                  <span
                    key={state}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
                  >
                    {state}
                  </span>
                ))}
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60">
                  + 40 more states
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/50">
              © {currentYear} SearchPrex. All rights reserved. US-Market SEO Agency.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/50">
                Semrush Certified • Ahrefs Certified • Google Analytics Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}