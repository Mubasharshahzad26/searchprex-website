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
    // Published prices are a selling point; buyers look for them first.
    href: "/pricing",
    label: "Pricing",
  },
  {
    // A direct link: the blog used to sit at the bottom of the Resources menu.
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/resources",
    label: "Resources",
    hasDropdown: true,
  },
];

const INTERNATIONAL_RESOURCES = [
  { href: "/resources/news", label: "Industry News Desk", badge: "Live", desc: "Dated & verified Google core & spam updates" },
  { href: "/resources/solution", label: "Issues & Solutions Library", badge: "5 Tools", desc: "SERP Checker, Schema, llms.txt & issue fixes" },
  { href: "/resources/forum", label: "SEO Discussion Forum", badge: "New", desc: "Practitioner Q&A and technical benchmarks" },
  { href: "/resources/learning-hub", label: "SEO Learning Hub", badge: "New", desc: "Masterclasses for Core SEO, Shopify & WP" },
];

const USA_RESOURCES = [
  { href: "/resources/news/usa", label: "USA News Engine", desc: "State-level Map Pack shifts & US local radar" },
  { href: "/resources/solution/usa", label: "USA Solutions Dashboard", badge: "3 Tools", desc: "Law firm intake, lost cases & state keywords" },
  { href: "/resources/forum/usa", label: "USA Discussion Boards", desc: "US metro & state practitioner threads" },
  { href: "/resources/learning-hub/usa", label: "USA Learning Hub Playbooks", desc: "Local 3-Pack domination & legal playbooks" },
];

const INTERNATIONAL_TOOLS = [
  { href: "/resources/solution/serp-checker", label: "SERP Checker" },
  { href: "/resources/solution/schema-generator", label: "Schema Generator" },
  { href: "/resources/solution/llms-txt-generator", label: "llms.txt Generator" },
  { href: "/resources/solution/serp-simulator", label: "SERP Simulator" },
  { href: "/resources/solution/ai-search", label: "AI Search Diagnostic" },
];

const USA_TOOLS = [
  { href: "/resources/solution/intake-assistant", label: "AI Intake Assistant" },
  { href: "/resources/solution/case-calculator", label: "Lost Case Calculator" },
  { href: "/resources/solution/keyword-research", label: "Law Firm Keywords" },
];

const PRACTITIONER_VAULTS = [
  { href: "/resources/gsc-regex-library", label: "GSC Regex Library" },
  { href: "/resources/technical-seo-checklist", label: "Technical SEO Checklist" },
  { href: "/resources/woocommerce-seo-checklist", label: "WooCommerce SEO Checklist" },
  { href: "/resources/law-firm-seo-audit-checklist", label: "Law Firm SEO Checklist" },
  { href: "/resources/google-business-profile-checklist", label: "Google Business Profile Checklist" },
  { href: "/resources/local-seo-tips", label: "Local SEO Field Guide" },
  { href: "/guides/ecommerce-indexing-playbook.pdf", label: "35K Product Indexing Playbook" },
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
      {/* Same height as the announcement bar, so the bar never covers the top of a page. */}
      {!showLocalSeoNewsSubscription ? <div aria-hidden className="h-8" /> : null}
      <header
        data-local-seo-news-header={showLocalSeoNewsSubscription ? "true" : undefined}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${
          isScrolled
            ? "border-slate-200/90 shadow-xs"
            : "border-slate-200/60"
        }`}
      >
        {/* Announcement bar: the trial and the two direct ways to reach the
            founder. Shown at the top of the page only, so it never sits over
            content while reading; the local news hub has its own bar. */}
        {!showLocalSeoNewsSubscription && !isScrolled && (
          <div className="flex h-8 items-center justify-center whitespace-nowrap bg-neutral-950 px-4 text-[12px] font-semibold text-white sm:text-[13px]">
            <span className="text-emerald-300">Free 7-day trial</span>
            <span className="mx-2 text-white/40" aria-hidden>·</span>
            <a href="https://wa.me/923059158010" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emerald-200">
              WhatsApp the founder
            </a>
            <span className="mx-2 hidden text-white/40 sm:inline" aria-hidden>·</span>
            <a href="https://calendly.com/contact-searchprex/30min" target="_blank" rel="noopener noreferrer" className="hidden underline underline-offset-2 hover:text-emerald-200 sm:inline">
              Book a 30-min call
            </a>
          </div>
        )}
        {showLocalSeoNewsSubscription && !isScrolled && (
          <div className="lg:hidden">
            <LocalSeoNewsSubscriptionBar />
          </div>
        )}
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
                href="https://calendly.com/contact-searchprex/30min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free 30-minute call with SearchPrex"
                className="rounded-md bg-white px-2.5 py-1 font-bold text-neutral-950 hover:bg-slate-100 sm:px-3"
              >
                <span className="sm:hidden">Book a call</span>
                <span className="hidden sm:inline">Book a free 30-min call</span>
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
            <div ref={desktopNavRef} className="hidden items-center gap-4 whitespace-nowrap xl:flex">
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
                      link.label === "Resources" ? (
                        <div
                          className={`absolute right-0 top-full z-50 w-[840px] pt-2 transition-all duration-150 ${
                            isOpen
                              ? "visible translate-y-0 opacity-100"
                              : "invisible pointer-events-none translate-y-2 opacity-0"
                          }`}
                        >
                          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                            <div className="grid grid-cols-3 gap-6 divide-x divide-slate-100">
                              {/* Column 1: International */}
                              <div>
                                <div className="flex items-center gap-1.5 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-slate-100 mb-3">
                                  <span>🌐</span> International Resources
                                </div>
                                <div className="space-y-2">
                                  {INTERNATIONAL_RESOURCES.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="group block rounded-lg p-2 transition-colors hover:bg-slate-50"
                                    >
                                      <div className="flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-emerald-700">
                                        <span>{item.label}</span>
                                        {item.badge && (
                                          <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-[#6c727f] mt-0.5 line-clamp-1">{item.desc}</p>
                                    </Link>
                                  ))}
                                </div>

                                {/* Quick International Tools */}
                                <div className="mt-3 pt-2.5 border-t border-slate-100">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                                    Free International Tools:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {INTERNATIONAL_TOOLS.map((tool) => (
                                      <Link
                                        key={tool.href}
                                        href={tool.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-neutral-900 hover:text-white"
                                      >
                                        {tool.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Column 2: USA-Centric */}
                              <div className="pl-6">
                                <div className="flex items-center gap-1.5 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-slate-100 mb-3">
                                  <span>🇺🇸</span> USA-Centric Recovery
                                </div>
                                <div className="space-y-2">
                                  {USA_RESOURCES.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="group block rounded-lg p-2 transition-colors hover:bg-slate-50"
                                    >
                                      <div className="flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-emerald-700">
                                        <span>{item.label}</span>
                                        {item.badge && (
                                          <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-[#6c727f] mt-0.5 line-clamp-1">{item.desc}</p>
                                    </Link>
                                  ))}
                                </div>

                                {/* Quick USA Tools */}
                                <div className="mt-3 pt-2.5 border-t border-slate-100">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                                    USA Law Firm Tools:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {USA_TOOLS.map((tool) => (
                                      <Link
                                        key={tool.href}
                                        href={tool.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-neutral-900 hover:text-white"
                                      >
                                        {tool.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Column 3: Practitioner Vaults & Checklists */}
                              <div className="pl-6">
                                <div className="flex items-center gap-1.5 pb-3 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-slate-100 mb-3">
                                  <span>📋</span> Practitioner Vaults
                                </div>
                                <div className="space-y-1">
                                  {PRACTITIONER_VAULTS.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center text-xs font-medium text-[#4b5563] py-1.5 px-2 rounded-md hover:bg-slate-50 hover:text-neutral-950 transition-colors"
                                    >
                                      • {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Footer Hub Link inside Mega Menu */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span className="text-[#6c727f]">Central intelligence &amp; practitioner playbooks</span>
                              <Link
                                href="/resources"
                                onClick={() => setActiveDropdown(null)}
                                className="font-bold text-neutral-950 hover:underline flex items-center gap-1"
                              >
                                View All Resources Hub →
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
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
                      )
                    )}
                  </div>
                );
              })}
            </div>
 
            {/* Desktop right */}
            <div className="hidden items-center gap-2 whitespace-nowrap xl:flex">
 
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
              className="rounded-lg p-2 text-[#374151] transition-colors hover:bg-slate-50 xl:hidden"
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
              className="overflow-hidden bg-white shadow-lg xl:hidden"
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
                      link.label === "Resources" ? (
                        <div className="ml-4 mt-2 space-y-3 border-l border-slate-200 pl-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                              🌐 International Resources
                            </span>
                            <div className="mt-1 space-y-1">
                              {INTERNATIONAL_RESOURCES.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center justify-between py-1 text-sm text-slate-700 hover:text-neutral-950"
                                >
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold text-neutral-900">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {INTERNATIONAL_TOOLS.map((tool) => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700 hover:bg-neutral-900 hover:text-white"
                                >
                                  {tool.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                              🇺🇸 USA-Centric
                            </span>
                            <div className="mt-1 space-y-1">
                              {USA_RESOURCES.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center justify-between py-1 text-sm text-slate-700 hover:text-neutral-950"
                                >
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="rounded-full border border-slate-200 bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold text-neutral-900">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {USA_TOOLS.map((tool) => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700 hover:bg-neutral-900 hover:text-white"
                                >
                                  {tool.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                              📋 Practitioner Vaults
                            </span>
                            <div className="mt-1 space-y-1">
                              {PRACTITIONER_VAULTS.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-1 text-xs text-slate-600 hover:text-neutral-950"
                                >
                                  • {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
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
                      )
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
