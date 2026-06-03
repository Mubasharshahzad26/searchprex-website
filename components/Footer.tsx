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
  { href: "/resources", label: "Resources" },
  { href: "/resources/news", label: "SEO News" },
  { href: "/faq", label: "FAQ" },
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
 
/*
  ─── SOCIAL LINKS ───
  ⚠️ 3 links REPLACE karne hain (Twitter/X, Facebook, YouTube) — apne real URLs daalo.
  Jab tak real URL na ho, us line ko delete kar do (dead link mat chhodo).
*/
const socials = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/searchprex/",        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "X",         href: "https://x.com/REPLACE_USERNAME",                       path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Facebook",  href: "https://www.facebook.com/REPLACE_USERNAME",            path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "YouTube",   href: "https://www.youtube.com/@SearchPrex",                  path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { label: "Medium",    href: "https://medium.com/@mubasharshahzad726",               path: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" },
  { label: "Upwork",    href: "https://www.upwork.com/freelancers/~01400266ea842005be", path: "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06a2.705 2.705 0 0 1 2.703 2.703 2.707 2.707 0 0 1-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112a2.551 2.551 0 0 1-2.547 2.548 2.551 2.551 0 0 1-2.548-2.548V3.492H0v7.112a5.16 5.16 0 0 0 5.281 5.16 5.16 5.16 0 0 0 5.157-5.16v-1.142c.531 1.105 1.184 2.234 1.978 3.232l-1.675 7.875h2.79l1.214-5.71c1.063.679 2.285 1.109 3.687 1.109a5.276 5.276 0 0 0 5.265-5.265 5.277 5.277 0 0 0-5.286-5.265z" },
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
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="text-xs text-white/50">
              © {currentYear} SearchPrex. All rights reserved. US-Market SEO Agency.
            </p>
 
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-[#3eb489] hover:bg-[#3eb489] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
 
            <span className="text-center text-xs text-white/50 md:text-right">
              Semrush Certified • Ahrefs Certified • Google Analytics Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
 





























































