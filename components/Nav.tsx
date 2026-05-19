"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
 
const navLinks = [
  {
    href: "#services",
    label: "Services",
    hasDropdown: true,
    dropdownItems: [
      { href: "/services/law-firm-seo",   label: "Law Firm SEO" },
      { href: "/services/ecommerce-seo",  label: "Ecommerce SEO" },
      { href: "/services/local-seo",      label: "Local SEO" },
      { href: "/services/technical-seo",  label: "Technical SEO" },
      { href: "/services/content-seo",    label: "Content SEO" },
    ],
  },
  { href: "#pricing",      label: "Pricing" },
  { href: "#results",      label: "Results" },
  {
    href: "/about",
    label: "About",
    hasDropdown: true,
    dropdownItems: [
      { href: "/about",    label: "About Us" },
      { href: "/experts",  label: "Meet the Founder" },
      { href: "/why-us",   label: "Why SearchPrex" },
    ],
  },
  { href: "/case-studies", label: "Case Studies" },
];
 
export default function Nav() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);
 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      {/* ── Top trust bar ── */}
      <div className="hidden border-b border-[#e5e7eb]/50 bg-[#0a0f2e] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-xs text-white/80">
            <span>US-Focused SEO Agency</span>
            <span className="text-white/40">|</span>
            <span>Serving All 50 States</span>
            <span className="text-white/40">|</span>
            <span>Google Partner Certified</span>
          </div>
          <a
            href="tel:+18005551234"
            className="flex items-center gap-2 text-xs font-medium text-white hover:text-white/80 transition-colors"
          >
            <Phone className="h-3 w-3" />
            +92 310 652 6316
          </a>
        </div>
      </div>
 
      {/* ── Main nav ── */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
 
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>
 
          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-[#374151] transition-colors hover:text-[#1a3c8f]"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="h-3 w-3" />}
                </Link>
 
                {link.hasDropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-xl"
                  >
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-[#374151] transition-colors hover:bg-[#f7f8fc] hover:text-[#1a3c8f]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
 
          {/* Desktop right — auth buttons + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Log in */}
            <Link
              href="/login"
              className="rounded-lg border border-[#7F77DD] px-4 py-2 text-sm font-semibold text-[#534AB7] transition-colors hover:bg-[#EEEDFE]"
            >
              Log in
            </Link>
 
            {/* Sign up */}
            <Link
              href="/register"
              className="rounded-lg border-2 border-[#534AB7] bg-white px-4 py-2 text-sm font-semibold text-[#534AB7] transition-colors hover:bg-[#EEEDFE]"
            >
              Sign up
            </Link>
 
            {/* Book Consultation — primary CTA */}
            <Link
              href="#ai-tool"
              className="flex items-center gap-2 rounded-lg bg-[#534AB7] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-[#3C3489] hover:shadow-md"
            >
              Book Consultation
            </Link>
          </div>
 
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-[#374151] hover:bg-[#f7f8fc] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen
              ? <X    className="h-6 w-6" />
              : <Menu className="h-6 w-6" />
            }
          </button>
        </div>
      </nav>
 
      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white shadow-lg lg:hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-3">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-[#374151] transition-colors hover:bg-[#f7f8fc] hover:text-[#1a3c8f]"
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-[#e5e7eb] pl-3">
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 text-sm text-[#64748b] hover:text-[#1a3c8f]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
 
              {/* Mobile: divider + auth + CTA */}
              <div className="border-t border-[#e5e7eb] pt-4 mt-4 flex flex-col gap-3">
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-2 px-3 text-base font-medium text-[#374151]"
                >
                  <Phone className="h-4 w-4" />
                  +92 310 652 6316
                </a>
 
                {/* Mobile auth row */}
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-lg border border-[#7F77DD] py-2.5 text-center text-sm font-semibold text-[#534AB7] hover:bg-[#EEEDFE] transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 rounded-lg border-2 border-[#534AB7] py-2.5 text-center text-sm font-semibold text-[#534AB7] hover:bg-[#EEEDFE] transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
 
                {/* Mobile CTA */}
                <Link
                  href="#ai-tool"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg bg-[#534AB7] px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-[#3C3489] transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
 













