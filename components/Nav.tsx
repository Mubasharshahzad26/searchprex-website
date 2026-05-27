"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
 
const navLinks = [
  {
    href: "#services",
    label: "Services",
    hasDropdown: true,
    dropdownItems: [
      { href: "/services/law-firm-seo",  label: "Law Firm SEO" },
      { href: "/services/ecommerce-seo", label: "Ecommerce SEO" },
      { href: "/services/local-seo",     label: "Local SEO" },
      { href: "/services/technical-seo", label: "Technical SEO" },
      { href: "/services/content-seo",   label: "Content SEO" },
    ],
  },
  { href: "#pricing",      label: "Pricing" },
  { href: "#results",      label: "Results" },
  {
    href: "/about",
    label: "About",
    hasDropdown: true,
    dropdownItems: [
      { href: "/about",   label: "About Us" },
      { href: "/experts", label: "Meet the Founder" },
      { href: "/why-us",  label: "Why SearchPrex" },
    ],
  },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog",         label: "Blog" },
  { href: "/tools",        label: "Tools" },
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* ── Main nav ── */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
 
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="md" variant="dark" />
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
 
            {/* Desktop right — Login | Try Tool | Get Audit */}
            <div className="hidden items-center gap-2 lg:flex">
 
              {/* 1. Log in — ghost */}
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f7f8fc] hover:text-[#534AB7]"
              >
                Log in
              </Link>
 
              {/* 2. Try NicheSEO Pro — outline */}
              <Link
                href="/tools"
                className="flex items-center gap-1.5 rounded-lg border border-[#534AB7]/40 px-4 py-2 text-sm font-semibold text-[#534AB7] transition-all hover:border-[#534AB7] hover:bg-[#EEEDFE]"
              >
                Try NicheSEO Pro
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M2 9L9 2M9 2H4M9 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
 
              {/* 3. Get Free Audit — primary */}
              <Link
                href="/free-audit"
                className="relative flex items-center gap-2 overflow-hidden rounded-lg bg-[#534AB7] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#3C3489] hover:shadow-[0_0_28px_rgba(83,74,183,0.5)] hover:-translate-y-px"
              >
                <span
                  className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#22d3ee]"
                  style={{ animation: "sp-pulse 2s ease-in-out infinite" }}
                />
                <style>{`
                  @keyframes sp-pulse {
                    0%,100% { opacity:.7; transform:scale(1);   }
                    50%     { opacity:1; transform:scale(1.35); }
                  }
                `}</style>
                Get Free Audit
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
 
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[#374151] transition-colors hover:bg-[#f7f8fc] lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X    className="h-6 w-6" />
                : <Menu className="h-6 w-6" />}
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
 
                {/* Mobile: auth + CTA */}
                <div className="mt-4 flex flex-col gap-3 border-t border-[#e5e7eb] pt-4">
 
                  {/* Log in */}
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg border border-[#534AB7]/40 py-2.5 text-center text-sm font-semibold text-[#534AB7] transition-colors hover:bg-[#EEEDFE]"
                  >
                    Log in
                  </Link>
 
                  {/* Try NicheSEO Pro — outline */}
                  <Link
                    href="/tools"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[#534AB7] py-2.5 text-center text-sm font-semibold text-[#534AB7] transition-colors hover:bg-[#EEEDFE]"
                  >
                    Try NicheSEO Pro
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                      <path d="M2 9L9 2M9 2H4M9 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
 
                  {/* Get Free Audit — primary */}
                  <Link
                    href="/free-audit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg bg-[#534AB7] px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#3C3489]"
                  >
                    Get Free Audit →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
 



