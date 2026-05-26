"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
 
const NAV_LINKS = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about", hasDropdown: true },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Tools", href: "/tools" },
];
 
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <>
      {/* ── Top Bar ── */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-badges">
            <span>🇺🇸 US-Focused SEO Agency</span>
            <span className="divider">|</span>
            <span>Serving All 50 States</span>
            <span className="divider">|</span>
            <span>Semrush Certified Agency</span>
          </div>
          <a href="tel:+923108526316" className="top-bar-phone">
            📞 +92 310 852 6316
          </a>
        </div>
      </div>
 
      {/* ── Main Navbar ── */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar-inner">
 
          {/* Logo */}
          <Link href="/" className="logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 14L14 4L24 14L14 24L4 14Z" fill="#2563EB" />
              <path d="M9 14L14 9L19 14L14 19L9 14Z" fill="white" />
            </svg>
            <span>Searchprex</span>
          </Link>
 
          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>
 
          {/* Desktop CTA Group */}
          <div className="cta-group">
            {/* Login — existing clients */}
            <Link href="/login" className="btn-ghost">
              Log in
            </Link>
 
            {/* Client Portal — replaces Sign up, clearer for existing clients */}
            <Link href="/dashboard" className="btn-outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Client Portal
            </Link>
 
            {/* Primary CTA — high-converting copy */}
            <Link href="/book-consultation" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Free Call
              <span className="btn-badge">30-min</span>
            </Link>
          </div>
 
          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? "bar bar--top open" : "bar bar--top"} />
            <span className={menuOpen ? "bar bar--mid open" : "bar bar--mid"} />
            <span className={menuOpen ? "bar bar--bot open" : "bar bar--bot"} />
          </button>
        </div>
 
        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-cta-group">
              <Link href="/login" className="mobile-btn-ghost" onClick={() => setMenuOpen(false)}>
                Log in
              </Link>
              <Link href="/dashboard" className="mobile-btn-outline" onClick={() => setMenuOpen(false)}>
                Client Portal
              </Link>
              <Link href="/book-consultation" className="mobile-btn-primary" onClick={() => setMenuOpen(false)}>
                Book Free Call — 30 min
              </Link>
            </div>
          </div>
        )}
      </nav>
 
      {/* ── Styles ── */}
      <style jsx>{`
        /* ── Top Bar ── */
        .top-bar {
          background: #0f172a;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 0 24px;
        }
        .top-bar-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 36px;
        }
        .top-bar-badges {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .divider {
          color: #334155;
        }
        .top-bar-phone {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .top-bar-phone:hover {
          color: #fff;
        }
 
        /* ── Navbar ── */
        .navbar {
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: box-shadow 0.3s ease;
        }
        .navbar--scrolled {
          box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
        }
        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 32px;
        }
 
        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }
        .logo:hover {
          color: #2563eb;
        }
 
        /* ── Nav Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: #2563eb;
          background: #eff6ff;
        }
 
        /* ── CTA Group ── */
        .cta-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
 
        /* Ghost — Log in */
        .btn-ghost {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .btn-ghost:hover {
          color: #0f172a;
          background: #f1f5f9;
        }
 
        /* Outline — Client Portal */
        .btn-outline {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          border: 1.5px solid #2563eb;
          border-radius: 8px;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .btn-outline:hover {
          background: #2563eb;
          color: #fff;
        }
 
        /* Primary — Book Free Call */
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          background: #0f172a;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
          position: relative;
        }
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
        }
        .btn-badge {
          font-size: 10px;
          font-weight: 700;
          background: #2563eb;
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.04em;
          margin-left: 2px;
          transition: background 0.2s;
        }
        .btn-primary:hover .btn-badge {
          background: rgba(255,255,255,0.25);
        }
 
        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }
        .bar {
          display: block;
          width: 22px;
          height: 2px;
          background: #0f172a;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .bar--top.open { transform: translateY(7px) rotate(45deg); }
        .bar--mid.open { opacity: 0; }
        .bar--bot.open { transform: translateY(-7px) rotate(-45deg); }
 
        /* ── Mobile Menu ── */
        .mobile-menu {
          border-top: 1px solid #e2e8f0;
          padding: 16px 24px 24px;
          background: #fff;
        }
        .mobile-nav-links {
          list-style: none;
          margin: 0 0 16px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-nav-link {
          display: block;
          padding: 10px 12px;
          font-size: 15px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.15s;
        }
        .mobile-nav-link:hover {
          background: #eff6ff;
          color: #2563eb;
        }
        .mobile-cta-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }
        .mobile-btn-ghost {
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 8px;
          text-align: center;
          background: #f8fafc;
        }
        .mobile-btn-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          font-size: 14px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          border: 1.5px solid #2563eb;
          border-radius: 8px;
          text-align: center;
        }
        .mobile-btn-primary {
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          background: #0f172a;
          border-radius: 8px;
          text-align: center;
        }
 
        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .cta-group { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 640px) {
          .top-bar-badges span:not(:first-child) { display: none; }
          .divider { display: none; }
        }
      `}</style>
    </>
  );
}
 
