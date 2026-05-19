"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const serviceLinks = [
  { href: "#services", label: "Law Firm SEO" },
  { href: "#services", label: "Shopify & Ecommerce SEO" },
  { href: "#services", label: "Local SEO" },
  { href: "#services", label: "Home Services SEO" },
  { href: "#services", label: "Enterprise SEO" },
  { href: "#services", label: "Technical SEO Audit" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/experts", label: "Meet Our Experts" },
  { href: "/why-us", label: "Why Call Us" },
  { href: "#results", label: "Case Studies" },
  { href: "#process", label: "Our Process" },
];

const resourceLinks = [
  { href: "#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const industries = [
  "Family Law Firms",
  "Personal Injury Attorneys",
  "Criminal Defense Lawyers",
  "Shopify Stores",
  "DTC Ecommerce",
  "Local Restaurants",
  "Dental Practices",
  "HVAC Contractors",
  "Plumbers",
  "Electricians",
  "Auto Repair Shops",
  "Salons & Spas",
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
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-white">SearchPrex</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm text-white/70">
              USA&apos;s leading niche SEO agency specializing in law firm SEO, ecommerce SEO, and local SEO for small businesses. Senior-led execution with zero intermediaries.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@searchprex.com" className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
                <Mail className="h-4 w-4" />
                hello@searchprex.com
              </a>
              <a href="tel:+18005551234" className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
                <Phone className="h-4 w-4" />
                +92 310 652 6316
              </a>
              <p className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  1250 Executive Place, Suite 450<br />
                  Geneva, IL 60134, USA
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
              Ready to dominate search? Get your free SEO audit in 48 hours.
            </p>
            <Link
              href="#cta"
              className="inline-block rounded-lg bg-[#2563eb] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
            >
              Free SEO Audit
            </Link>
          </div>
        </div>

        {/* Industries & States */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Industries Served */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">
                Industries We Serve
              </h4>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
                  >
                    {industry}
                  </span>
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
              © {currentYear} SearchPrex. All rights reserved. US-Focused SEO Agency.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/50">
                Google Partner • Semrush Certified • Ahrefs Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
