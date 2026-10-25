"use client";
 
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { CITY_PAGES } from "@/lib/city-pages";
import LocalSeoNewsSubscriptionBar from "@/components/news/LocalSeoNewsSubscriptionBar";
 
/** `sub` = a spoke page, shown indented under the pillar above it. */
type DropItem = { href: string; label: string; badge?: string; sub?: boolean };
type NavLink = {
  href: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: DropItem[];
  /** false = label is a dropdown trigger only, doesn't navigate anywhere on its own */
  linkable?: boolean;
};
 
const navLinks: NavLink[] = [
  {
    href: "/services",
    label: "Services",
    hasDropdown: true,
    dropdownItems: [
      // Pillars, each followed by its spoke pages (hub and spoke).
      { href: "/services/law-firm-seo",  label: "Law Firm SEO" },
      { href: "/services/law-firm-seo/google-business-profile-for-lawyers", label: "Google Business Profile for Lawyers", sub: true },
      { href: "/services/ecommerce-seo", label: "Ecommerce SEO" },
      { href: "/services/ecommerce-seo/product-page-seo", label: "Product Page SEO", sub: true },
      { href: "/services/local-seo",     label: "Local SEO" },
      { href: "/services/local-seo/google-business-profile-optimization", label: "Google Business Profile Optimization", sub: true },
      { href: "/services/local-seo/google-business-profile-suspended", label: "GBP Suspension Help", sub: true },
      { href: "/services/technical-seo", label: "Technical SEO" },
      { href: "/services/technical-seo/technical-seo-audit", label: "Technical SEO Audit", sub: true },
      { href: "/services/technical-seo/indexing-recovery", label: "Indexing Recovery", sub: true },
      { href: "/industries",             label: "Industries We Serve" },
    ],
  },
  {
    href: "/locations",
    label: "Locations",
    hasDropdown: true,
    // Linkable now that /locations exists; it was a bare dropdown trigger
    // because the hub used to 404.
    dropdownItems: [
      { href: "/locations", label: "All locations" },
      ...CITY_PAGES.map((c) => ({
        href: `/locations/${c.stateSlug}/${c.citySlug}`,
        label: `${c.city}, ${c.stateAbbr}`,
      })),
      { href: "/locations/kansas", label: "Kansas — all cities" },
    ],
  },
  {
    href: "/about",
    label: "About",
    hasDropdown: true,
    dropdownItems: [
      { href: "/about",   label: "About Us" },
      { href: "/experts", label: "Meet Our SEO Experts" },
      { href: "/why-us",  label: "Why SearchPrex" },
    ],
  },
  {
    href: "/case-studies",
    label: "Case Studies",
  },
  {
    href: "/resources",
    label: "Resources",
    hasDropdown: true,
    dropdownItems: [
      { href: "/resources",                                   label: "All Resources" },
      { href: "/resources/news",                              label: "01. Industry News Desk", badge: "Live" },
      { href: "/resources/discussions",                       label: "02. SEO Discussion Forum", badge: "New" },
      { href: "/resources/solutions",                         label: "03. Issues & Solutions Library", badge: "New" },
      { href: "/resources/learning-hub",                      label: "04. SEO Learning Hub", badge: "New" },
      { href: "/resources/gsc-regex-library",                 label: "GSC Regex Library" },
      { href: "/resources/law-firm-seo-audit-checklist",      label: "Law Firm SEO Checklist" },
      { href: "/resources/technical-seo-checklist",           label: "Technical SEO Checklist" },
      { href: "/resources/woocommerce-seo-checklist",         label: "WooCommerce SEO Checklist" },
      { href: "/resources/google-business-profile-checklist", label: "GBP Local Checklist" },
      { href: "/guides/ecommerce-indexing-playbook.pdf",      label: "35K-Product Indexing Playbook" },
      { href: "/blog",                                        label: "Blog" },
    ],
  },
  {
    href: "/resources/news",
    label: "SEO News",
    hasDropdown: true,
    dropdownItems: [
      // Dedicated pillar spokes receive sitewide internal links directly to their URLs
      // rather than parameterized ?category= URLs, eliminating redirect hops and consolidating PageRank.
      { href: "/resources/news",                                    label: "All Latest News" },
      { href: "/resources/news/llm-seo-news-2026",                 label: "LLM SEO News" },
      { href: "/resources/news/ai-sge-seo-news",                   label: "AI & GEO SEO News" },
      { href: "/resources/news/local-seo-updates",                  label: "Local SEO News" },
      { href: "/resources/news/technical-seo-news-2026",           label: "Technical SEO News" },
      { href: "/resources/news/ecommerce-seo-news-2026",           label: "Ecommerce SEO News" },
      { href: "/resources/news/seo-tools-news-2026",               label: "SEO Tools News" },
      { href: "/resources/news?category=Law+Firm+SEO+News",         label: "Law Firm SEO News" },
      { href: "/resources/news?category=Shopify+Store+News",        label: "Shopify Store News" },
      { href: "/resources/news?category=WordPress+News",            label: "WordPress News" },
    ],
  },
  {
    href: "/tools",
    label: "Solutions",
    hasDropdown: true,
    dropdownItems: [
      // Was http://localhost:3005 — a developer machine address shipped to
      // production, so the entry was dead for every real visitor. /intake-assistant
      // is the deployed page for the same product.
      { href: "/tools/llms-txt-generator", label: "llms.txt & AI Bot Generator", badge: "New" },
      { href: "/intake-assistant",         label: "AI Intake Assistant", badge: "Free" },
      { href: "/case-calculator",          label: "Lost Case Calculator" },
      // Law Firm Scorecard is out of the menu until Google Search grounding is
      // available on the Gemini keys: without it the "audit" of a named firm
      // would be written from nothing. See GroundingUnavailableError.
      { href: "/tools/keyword-research",   label: "Law Firm Keyword Research" },
      { href: "/tools/schema-generator",   label: "Schema Markup Generator" },
      { href: "/tools/serp-simulator",     label: "SERP Simulator" },
      { href: "/ai-search",                label: "AI Search" },
      { href: "/tools/serp-checker",       label: "SERP Checker", badge: "Live" },
      { href: "/tools",                    label: "All Tools" },
    ],
  },
];
 
export default function Nav() {
  const pathname = usePathname();
  const showClevelandOffer = pathname === "/locations/ohio/cleveland";
  const showLocalSeoNewsSubscription = pathname === "/resources/news/local-seo-updates";
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown,   setActiveDropdown]   = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  // Close an open dropdown on outside click / tap, and on Escape.
  useEffect(() => {
    if (!activeDropdown) return;
 
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeDropdown]);

  // Hide nav on admin pages
  if (pathname?.startsWith("/admin")) return null;

  // Dedicated conversion page: minimal header with no exit-leak dropdowns or duplicate CTA
  if (pathname === "/free-audit") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <Link href="/" className="inline-flex flex-shrink-0 items-center" aria-label="Searchprex Home">
            <Logo size="md" variant="dark" />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-neutral-900" aria-hidden="true" />
              Founder-reviewed in 24 hours
            </span>
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 transition-colors hover:text-neutral-950 sm:text-sm"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${
          isScrolled
            ? "border-slate-200/90 shadow-xs"
            : "border-slate-200/60"
        }`}
      >
        {showLocalSeoNewsSubscription && <LocalSeoNewsSubscriptionBar />}
        {showClevelandOffer && !isScrolled && (
          <div
            role="region"
            aria-label="Cleveland law firm offer"
            className="h-9 bg-neutral-900 text-white"
          >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-center gap-3 px-3 text-xs sm:gap-5 sm:px-6">
              <span className="font-semibold">7-Day Free Trial</span>
              <span className="hidden text-white/75 sm:inline">No credit card · No auto-charge</span>
              <a
                href="#cleveland-trial"
                className="font-bold text-white underline underline-offset-2 hover:text-slate-200"
              >
                <span className="sm:hidden">View trial</span>
                <span className="hidden sm:inline">See what&apos;s included</span>
              </a>
              <a
                href="tel:+923059158010"
                aria-label="Call SearchPrex at +92 305 915 8010"
                className="rounded-md bg-white px-2.5 py-1 font-bold text-neutral-950 hover:bg-slate-100 sm:px-3"
              >
                <span className="sm:hidden">Call</span>
                <span className="hidden sm:inline">Call +92 305 915 8010</span>
              </a>
            </div>
          </div>
        )}

        {/* Main nav */}
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
 
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 inline-flex items-center" aria-label="Searchprex Home">
              <Logo size="md" variant="dark" />
            </Link>
 
            {/* Desktop links */}
            <div ref={desktopNavRef} className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => {
                const isOpen = activeDropdown === link.label;
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.linkable === false ? (
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onClick={() => setActiveDropdown(isOpen ? null : link.label)}
                        className="flex items-center gap-1 text-sm font-medium text-[#374151] transition-colors hover:text-neutral-950"
                      >
                        {link.label}
                        {link.hasDropdown && (
                          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-1 text-sm font-medium text-[#374151] transition-colors hover:text-neutral-950"
                      >
                        {link.label}
                        {link.hasDropdown && (
                          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        )}
                      </Link>
                    )}
 
                    {link.hasDropdown && (
                      <div
                        className={`absolute left-0 top-full z-50 ${link.dropdownItems?.some((i) => i.sub) ? "w-72" : "w-56"} pt-2 transition-all duration-150 ${
                          isOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible pointer-events-none translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                          {link.dropdownItems?.map((item) => {
                            const isExternal = item.href.startsWith("http");
                            
                            const content = (
                              <>
                                <span>{item.label}</span>
                                {item.badge && (
                                  <span className="rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-900">
                                    {item.badge}
                                  </span>
                                )}
                              </>
                            );

                            if (isExternal) {
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-[#374151] transition-colors hover:bg-slate-50 hover:text-neutral-950"
                                >
                                  {content}
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center justify-between gap-2 rounded-lg transition-colors hover:bg-slate-50 hover:text-neutral-950 ${
                                  item.sub
                                    ? "py-1.5 pl-7 pr-3 text-[13px] text-slate-600"
                                    : `px-3 py-2 text-sm ${link.dropdownItems?.some((i) => i.sub) ? "font-semibold text-neutral-950" : "text-[#374151]"}`
                                }`}
                              >
                                {content}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
 
            {/* Desktop right */}
            <div className="hidden items-center gap-2 lg:flex">
 
              {/* Get My Free Audit — primary CTA */}
              <Link
                href="/free-audit"
                className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-all hover:bg-neutral-800 hover:-translate-y-px"
              >
                Get My Free Audit
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
 
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[#374151] transition-colors hover:bg-slate-50 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X    className="h-6 w-6" />
                : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
 
        {/* Mobile menu */}
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
                    {link.linkable === false ? (
                      <span className="block px-3 py-2.5 text-base font-medium text-[#374151]">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-base font-medium text-[#374151] transition-colors hover:bg-slate-50 hover:text-neutral-950"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                        {link.dropdownItems?.map((item) => {
                          const isExternal = item.href.startsWith("http");
                          
                          const content = (
                            <>
                              {item.label}
                              {item.badge && (
                                <span className="rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-900">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          );

                          if (isExternal) {
                            return (
                              <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 py-1.5 text-sm text-slate-600 hover:text-neutral-950"
                              >
                                {content}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center gap-2 hover:text-neutral-950 ${
                                item.sub ? "py-1 pl-4 text-[13px] text-slate-500" : "py-1.5 text-sm text-slate-600"
                              }`}
                            >
                              {content}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
 
                {/* Mobile: CTAs */}
                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4">
                  <Link
                    href="/free-audit"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl bg-neutral-900 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-neutral-800"
                  >
                    Get My Free Audit →
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
