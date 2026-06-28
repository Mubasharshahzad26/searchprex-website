"use client";
 
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, CheckCircle, Play, X,
  ChevronDown, BarChart3, ChevronLeft, ChevronRight,
} from "lucide-react";
 
/* ── Brand ── */
const GREEN  = "#3eb489";
const PURPLE = "#7c5cfc";
const NAVY   = "#0d0d14";
 
/* ── Case Studies Data ── */
const STUDIES = [
  {
    id: 1, featured: true,
    client: "SMK Store",
    headline: "SMK Store scales US organic revenue by 75% after fixing 35,000-SKU catalog",
    excerpt: "Mass non-indexing, duplicate content and broken faceted navigation were killing visibility. A technical SEO overhaul indexed 12K+ pages and drove +75% revenue in 60 days.",
    seoType: "eCommerce SEO", industry: "Retail", location: "United States",
    metrics: [{ v: "+75%", l: "Revenue" }, { v: "+285%", l: "Indexing rate" }, { v: "12K+", l: "Pages indexed" }],
    video: "gFod-dTY-bg",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1a1f2e",
  },
  {
    id: 2, featured: true,
    client: "Michigan Sports Outdoor",
    headline: "Michigan Sports Outdoor recovers from zero visibility — +476% organic clicks",
    excerpt: "A botched migration wiped 5 years of rankings overnight. A full technical audit, redirect mapping and content rebuild recovered them in 90 days.",
    seoType: "Technical SEO", industry: "Sports & Outdoor", location: "Michigan, USA",
    metrics: [{ v: "+476%", l: "Organic clicks" }, { v: "+285%", l: "Indexing" }, { v: "12K+", l: "Pages" }],
    video: "Y5PxSECNGP0",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1a2414",
  },
  {
    id: 3, featured: true,
    client: "HVAC Services Team",
    headline: "HVAC Services Team hits Top 3 Map Pack and Google AI Overview in 60 days",
    excerpt: "From invisible in local search to featured in Google's AI Overview for high-intent HVAC queries. Full GBP + citation strategy delivered +5.7× organic calls.",
    seoType: "Local SEO", industry: "Home Services", location: "United States",
    metrics: [{ v: "Top 3", l: "Map Pack" }, { v: "+5.7×", l: "Organic calls" }, { v: "AI", l: "Overview" }],
    video: "g_1TfDU4YeA",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop",
    cardBg: "#14201a",
  },
  {
    id: 4, featured: false,
    client: "Dolls Cleaning",
    headline: "Dolls Cleaning ranks #1 local — 264 clicks from zero in 90 days",
    excerpt: "GBP optimization, local citations and suburb-level landing pages pushed Dolls Cleaning to position #1 for cleaning services in Chesterfield, MI.",
    seoType: "Local SEO", industry: "Cleaning Services", location: "Chesterfield, MI",
    metrics: [{ v: "+264", l: "Clicks" }, { v: "106K", l: "Impressions" }, { v: "#1", l: "Ranking" }],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1e1a2e",
  },
  {
    id: 5, featured: false,
    client: "AAA Mobile Tyres",
    headline: "AAA Mobile Tyres dominates local search for mobile fitting across service areas",
    excerpt: "Multi-location GBP strategy, structured schema and review velocity system drove consistent top-3 local rankings across 6 service areas.",
    seoType: "Local SEO", industry: "Automotive", location: "United Kingdom",
    metrics: [{ v: "Top 3", l: "Local pack" }, { v: "6", l: "Areas ranked" }, { v: "+180%", l: "Calls" }],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1a1a14",
  },
  {
    id: 6, featured: false,
    client: "TS Cleaning",
    headline: "TS Cleaning grows map pack presence — from page 3 to top results",
    excerpt: "Citation cleanup, GBP photo strategy and consistent review velocity moved TS Cleaning from page 3 obscurity to prominent local pack placement.",
    seoType: "Local SEO", industry: "Cleaning Services", location: "United States",
    metrics: [{ v: "Top 5", l: "Local pack" }, { v: "+3×", l: "Profile views" }, { v: "+90%", l: "Clicks" }],
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1e1e1e",
  },
  {
    id: 7, featured: false,
    client: "Adscarry",
    headline: "Adscarry builds organic traffic channel alongside paid — reducing CAC by 40%",
    excerpt: "Content architecture, keyword clustering and technical fixes built a sustainable organic channel that reduced dependency on paid ads and cut CAC significantly.",
    seoType: "eCommerce SEO", industry: "Digital Products", location: "United States",
    metrics: [{ v: "-40%", l: "CAC" }, { v: "+220%", l: "Organic traffic" }, { v: "Page 1", l: "Rankings" }],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1a1428",
  },
  {
    id: 8, featured: false,
    client: "OrlandoWebPros",
    headline: "OrlandoWebPros ranks for competitive web design keywords in saturated Florida market",
    excerpt: "Local authority building, E-E-A-T content and competitor gap analysis carved out consistent page-1 rankings in one of Florida's most competitive digital markets.",
    seoType: "Technical SEO", industry: "Web Services", location: "Orlando, FL",
    metrics: [{ v: "Page 1", l: "12 keywords" }, { v: "+340%", l: "Organic clicks" }, { v: "+2×", l: "Leads" }],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop",
    cardBg: "#141c1e",
  },
  {
    id: 9, featured: false,
    client: "FarmGhar",
    headline: "FarmGhar builds organic discovery for niche agri-products in South Asian market",
    excerpt: "Category architecture, multilingual keyword strategy and product schema drove first-page rankings for competitive agricultural product terms.",
    seoType: "eCommerce SEO", industry: "Agriculture", location: "South Asia",
    metrics: [{ v: "+180%", l: "Organic traffic" }, { v: "Page 1", l: "8 categories" }, { v: "+2.4×", l: "Orders" }],
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80&auto=format&fit=crop",
    cardBg: "#141e14",
  },
  {
    id: 10, featured: false,
    client: "Effortless Shed",
    headline: "Effortless Shed ranks for high-intent shed & storage keywords across US",
    excerpt: "Long-tail keyword strategy, optimized product descriptions and local service-area pages built consistent rankings for commercial and residential shed searches.",
    seoType: "Local SEO", industry: "Home & Garden", location: "United States",
    metrics: [{ v: "+210", l: "Monthly clicks" }, { v: "Top 6", l: "Position" }, { v: "45K", l: "Impressions" }],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop",
    cardBg: "#1a1e14",
  },
];
 
const SEO_TYPES  = ["All", "Local SEO", "eCommerce SEO", "Technical SEO"];
const INDUSTRIES = ["All industries", "Cleaning Services", "Retail", "Home Services", "Automotive", "Sports & Outdoor", "Agriculture", "Web Services", "Home & Garden", "Digital Products"];
 
type FormState = "idle" | "sending" | "sent" | "error";
 
/* ── Animated wave bars (Semrush signature) ── */
function WaveBars() {
  const bars = 80;
  return (
    <div style={{ width: "100%", height: 90, overflow: "hidden", display: "flex", alignItems: "flex-end", gap: 3, padding: "0 0 0 0" }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.4)) * 60 + Math.abs(Math.cos(i * 0.25)) * 20;
        const pct = i / bars;
        const r1 = Math.round(124 + (62 - 124) * pct);
        const g1 = Math.round(92  + (180 - 92) * pct);
        const b1 = Math.round(252 + (137 - 252) * pct);
        return (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: [h * 0.4, h, h * 0.6, h * 0.9, h * 0.5, h] }}
            transition={{ duration: 3 + i * 0.05, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.03 }}
            style={{ flex: 1, background: `rgb(${r1},${g1},${b1})`, borderRadius: "2px 2px 0 0", minWidth: 6 }}
          />
        );
      })}
    </div>
  );
}
 
/* ── Client logo / name overlay card ── */
function ClientCard({ cs, onClick }: { cs: typeof STUDIES[0]; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Link href={`/case-studies/${cs.id}`} style={{ textDecoration: "none", display: "block" }}>
        {/* Image block */}
        <div style={{
          position: "relative", aspectRatio: "4/3", borderRadius: 12,
          overflow: "hidden", marginBottom: 16, background: cs.cardBg,
          transition: "transform 0.3s",
          transform: hov ? "scale(1.02)" : "scale(1)",
        }}>
          <img src={cs.image} alt={cs.client} style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: hov ? 0.7 : 0.5, transition: "opacity 0.3s",
          }} />
          {/* Gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
 
          {/* Client name — Semrush style: centered large text */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <span style={{
              fontSize: 28, fontWeight: 900, color: "#fff",
              textAlign: "center", letterSpacing: "-0.5px",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              lineHeight: 1.1,
            }}>
              {cs.client}
            </span>
          </div>
 
          {/* Video play */}
          {cs.video && (
            <div style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={14} fill="white" color="white" style={{ marginLeft: 2 }} />
            </div>
          )}
 
          {/* Top metric */}
          <div style={{ position: "absolute", bottom: 14, left: 14 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: GREEN }}>{cs.metrics[0].v}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", display: "block", fontWeight: 600 }}>{cs.metrics[0].l}</span>
          </div>
 
          {/* SEO type badge */}
          <span style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999,
            padding: "3px 10px", fontSize: 10, fontWeight: 700,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            {cs.seoType}
          </span>
        </div>
 
        {/* Text below card — Semrush exact */}
        <h3 style={{
          fontSize: 15, fontWeight: 700, color: hov ? PURPLE : "#e2e8f0",
          lineHeight: 1.45, margin: "0 0 8px",
          transition: "color 0.2s",
        }}>
          {cs.headline}
        </h3>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {cs.excerpt}
        </p>
      </Link>
    </motion.div>
  );
}
 
/* ── CTA card in grid ── */
function CTACard({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 12, background: hov ? "#1a1a2e" : "#141420",
        border: `1px solid ${hov ? PURPLE : "rgba(255,255,255,0.08)"}`,
        padding: "40px 28px", display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "flex-end",
        cursor: "pointer", transition: "all 0.2s", minHeight: 280,
      }}
    >
      <p style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
        Ready to create your own success story?
      </p>
      <button style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "10px 20px", borderRadius: 999,
        background: hov ? PURPLE : "rgba(124,92,252,0.2)",
        border: `1px solid ${PURPLE}`,
        color: "#fff", fontWeight: 700, fontSize: 14,
        cursor: "pointer", transition: "all 0.2s",
      }}>
        Book a consultation <ArrowRight size={14} />
      </button>
    </div>
  );
}
 
export default function CaseStudiesClient({ linkedinUrl = "https://linkedin.com/in/mubi00" }: { linkedinUrl?: string }) {
  const [typeFilter,     setTypeFilter]     = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All industries");
  const [industryOpen,   setIndustryOpen]   = useState(false);
  const [showModal,      setShowModal]      = useState(false);
  const [activeVideo,    setActiveVideo]    = useState<string | null>(null);
  const [form,           setForm]           = useState({ name: "", email: "", website: "", phone: "" });
  const [formState,      setFormState]      = useState<FormState>("idle");
  const [showMore,       setShowMore]       = useState(false);
 
  const filtered = useMemo(() => {
    return STUDIES.filter(cs => {
      const t = typeFilter === "All"             || cs.seoType  === typeFilter;
      const i = industryFilter === "All industries" || cs.industry === industryFilter;
      return t && i;
    });
  }, [typeFilter, industryFilter]);
 
  const visible = showMore ? filtered : filtered.slice(0, 9);
 
  const submit = async () => {
    setFormState("sending");
    await new Promise(r => setTimeout(r, 1000));
    setFormState("sent");
    setTimeout(() => { setShowModal(false); setFormState("idle"); setForm({ name: "", email: "", website: "", phone: "" }); }, 2000);
  };
 
  return (
    <main style={{ background: NAVY, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
 
      {/* ══ 1. HERO ══ */}
      <section style={{ padding: "100px 24px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: PURPLE, textTransform: "uppercase", marginBottom: 20 }}>
            Case Studies
          </p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, color: "#fff", lineHeight: 1.08, margin: "0 0 20px", letterSpacing: "-0.03em" }}>
            Real results from<br />remarkable clients.
          </h1>
          <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 48px" }}>
            Every result is backed by Google Search Console data. No vanity metrics — clicks, rankings, indexing, and revenue.
          </p>
        </div>
 
        {/* Animated wave */}
        <WaveBars />
      </section>
 
      {/* ══ 2. FILTER BAR ══ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 24px", background: "#0d0d14" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e2e8f0", margin: "0 0 20px" }}>
            Wins worth exploring
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
 
            {/* SEO type pills */}
            {SEO_TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                border: typeFilter === t ? "none" : "1px solid rgba(255,255,255,0.12)",
                background: typeFilter === t ? PURPLE : "transparent",
                color: typeFilter === t ? "#fff" : "#94a3b8",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {t === "All" ? "Show all" : t}
              </button>
            ))}
 
            {/* Industry dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setIndustryOpen(!industryOpen)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                border: industryFilter !== "All industries" ? `1px solid ${PURPLE}` : "1px solid rgba(255,255,255,0.12)",
                background: industryFilter !== "All industries" ? `${PURPLE}22` : "transparent",
                color: industryFilter !== "All industries" ? PURPLE : "#94a3b8",
                cursor: "pointer",
              }}>
                {industryFilter === "All industries" ? "By industry" : industryFilter}
                <ChevronDown size={14} style={{ transform: industryOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              <AnimatePresence>
                {industryOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    style={{
                      position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50,
                      background: "#1a1a28", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12, padding: 8, minWidth: 200,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                    }}>
                    {INDUSTRIES.map(ind => (
                      <button key={ind} onClick={() => { setIndustryFilter(ind); setIndustryOpen(false); }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "8px 14px", borderRadius: 8, border: "none",
                        background: industryFilter === ind ? `${PURPLE}30` : "transparent",
                        color: industryFilter === ind ? PURPLE : "#94a3b8",
                        fontSize: 13, fontWeight: 500, cursor: "pointer",
                      }}>
                        {ind}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
 
            <span style={{ fontSize: 12, color: "#475569", marginLeft: 8 }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>
 
      {/* ══ 3. CARDS GRID ══ */}
      <section style={{ padding: "60px 24px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="cs-grid">
            <AnimatePresence mode="popLayout">
              {visible.map((cs, i) => (
                <>
                  {/* CTA card after 6 */}
                  {i === 6 && (
                    <motion.div key="cta-card" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <CTACard onClick={() => setShowModal(true)} />
                    </motion.div>
                  )}
                  <ClientCard key={cs.id} cs={cs as any} onClick={cs.video ? () => setActiveVideo(cs.video!) : undefined} />
                </>
              ))}
            </AnimatePresence>
          </motion.div>
 
          {/* Show more */}
          {!showMore && filtered.length > 9 && (
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button onClick={() => setShowMore(true)} style={{
                padding: "12px 32px", borderRadius: 999,
                border: "1px solid #e2e8f0", background: "#fff",
                color: "#0a0f2e", fontWeight: 700, fontSize: 14,
                cursor: "pointer", transition: "all 0.2s",
              }}>
                Show more
              </button>
            </div>
          )}
        </div>
      </section>
 
      {/* ══ 4. FOUNDER CTA — Semrush "Ready to get started?" dark section ══ */}
      <section style={{
        background: "radial-gradient(ellipse at 30% 50%, #1a1f3a 0%, #0d0d14 60%)",
        padding: "80px 24px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", bottom: -100, left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(62,180,137,0.15), transparent 70%)", pointerEvents: "none" }} />
 
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="cta-section-grid">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: PURPLE, textTransform: "uppercase", margin: "0 0 14px" }}>
              NEW ENGAGEMENT
            </p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, margin: "0 0 28px" }}>
              The founder personally reviews your site within 24 hours and sends you a prioritized fix list. No juniors. No bots. No fluff.
            </p>
            <a href="https://calendly.com/contact-searchprex/30min" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 10, background: "#fff",
              color: "#0a0f2e", fontWeight: 800, fontSize: 15, textDecoration: "none",
            }}>
              Book free consultation
            </a>
          </div>
 
          {/* Form — Semrush style */}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20, padding: "36px 32px",
          }}>
            {formState !== "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { ph: "First name",    k: "name",    t: "text"  },
                  { ph: "Business email",k: "email",   t: "email" },
                  { ph: "Website URL",   k: "website", t: "url"   },
                  { ph: "Phone number",  k: "phone",   t: "tel"   },
                ].map(f => (
                  <input key={f.k} type={f.t} placeholder={f.ph}
                    value={form[f.k as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                    style={{
                      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14,
                      outline: "none", fontFamily: "inherit",
                    }}
                  />
                ))}
                <button onClick={submit} disabled={formState === "sending"} style={{
                  padding: "14px", borderRadius: 10, border: "none",
                  background: formState === "sending" ? "#475569" : PURPLE,
                  color: "#fff", fontWeight: 800, fontSize: 14,
                  cursor: formState === "sending" ? "wait" : "pointer", marginTop: 4,
                }}>
                  {formState === "sending" ? "Sending…" : "Request free audit →"}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle size={48} color={GREEN} style={{ margin: "0 auto 14px" }} />
                <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Received!</p>
                <p style={{ fontSize: 14, color: "#64748b" }}>Expect a reply within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </section>
 
      {/* ══ VIDEO MODAL ══ */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)", padding: 16 }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 920 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setActiveVideo(null)} style={{
                position: "absolute", top: -42, right: 0, display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontWeight: 600, fontSize: 14,
              }}>
                Close <X size={18} />
              </button>
              <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", background: "#000" }}>
                <iframe style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                  title="Case study video" allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      <style>{`
        @media (max-width: 900px) {
          .cs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cta-section-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .cs-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </main>
  );
}
 