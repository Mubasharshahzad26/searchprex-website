"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { 
    href: "#services", 
    label: "Services",
    hasDropdown: true,
    dropdownItems: [
      { href: "#services", label: "Law Firm SEO" },
      { href: "#services", label: "Ecommerce SEO" },
      { href: "#services", label: "Local SEO" },
      { href: "#services", label: "Home Services SEO" },
      { href: "#services", label: "Enterprise SEO" },
    ]
  },
  { href: "#pricing", label: "Pricing" },
  { href: "#results", label: "Results" },
  { 
    href: "/about", 
    label: "About",
    hasDropdown: true,
    dropdownItems: [
      { href: "/about", label: "About Us" },
      { href: "/experts", label: "Meet Our Experts" },
      { href: "/why-us", label: "Why Call Us" },
    ]
  },
  { href: "/case-studies", label: "Case Studies" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Top Bar - Trust Signal */}
      <div className="hidden border-b border-[#e5e7eb]/50 bg-[#0a0f2e] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-xs text-white/80">
            <span>USA-Based SEO Agency</span>
            <span className="text-white/40">|</span>
            <span>Serving All 50 States</span>
            <span className="text-white/40">|</span>
            <span>Google Partner Certified</span>
          </div>
          <a href="tel:+18005551234" className="flex items-center gap-2 text-xs font-medium text-white">
            <Phone className="h-3 w-3" />
            (800) 555-1234
          </a>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a3c8f]">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#0a0f2e]">SearchPrex</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-[#64748b] sm:block">
                USA SEO Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                
                {/* Dropdown */}
                {link.hasDropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full z-50 mt-2 w-48 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-xl"
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

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 text-sm font-medium text-[#374151] transition-colors hover:text-[#1a3c8f]"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
            <Link
              href="#cta"
              className="rounded-lg bg-[#2563eb] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
            >
              Free SEO Audit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#0a0f2e]" />
            ) : (
              <Menu className="h-6 w-6 text-[#0a0f2e]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <div className="space-y-4 px-4 pb-6 pt-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-[#374151] transition-colors hover:text-[#1a3c8f]"
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.dropdownItems?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-[#64748b] hover:text-[#1a3c8f]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 border-t border-[#e5e7eb] pt-4">
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-2 text-base font-medium text-[#374151]"
                >
                  <Phone className="h-4 w-4" />
                  (800) 555-1234
                </a>
                <Link
                  href="#cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg bg-[#2563eb] px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-white"
                >
                  Free SEO Audit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
