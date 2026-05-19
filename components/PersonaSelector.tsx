"use client";
 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
 
// ── Icons as inline SVGs to avoid lucide dependency issues ──
const icons = {
  gavel: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 13-7.5 7.5a1.93 1.93 0 0 1-2.72-2.72L11.28 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>
    </svg>
  ),
  mapPin: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  cart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  ),
  heart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  home: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  dots: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
    </svg>
  ),
  search: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  chart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  zap: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  award: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  settings: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  arrowRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
};
 
const businessTypes = [
  { id: "law-firm",       label: "Law Firm",         icon: "gavel",   color: "#7F77DD", bg: "#EEEDFE", href: "/services/law-firm-seo" },
  { id: "local",          label: "Local Business",   icon: "mapPin",  color: "#1D9E75", bg: "#E1F5EE", href: "/services/local-seo" },
  { id: "ecommerce",      label: "E-Commerce",       icon: "cart",    color: "#D85A30", bg: "#FAECE7", href: "/services/ecommerce-seo" },
  { id: "medical",        label: "Medical / Health", icon: "heart",   color: "#E24B4A", bg: "#FCEBEB", href: "/services/medical-seo" },
  { id: "real-estate",    label: "Real Estate",      icon: "home",    color: "#185FA5", bg: "#E6F1FB", href: "/services/real-estate-seo" },
  { id: "other",          label: "Other Business",   icon: "dots",    color: "#888780", bg: "#F1EFE8", href: "/services" },
];
 
const needTypes = [
  { id: "rankings",    label: "Higher Rankings",      icon: "chart",    color: "#534AB7", bg: "#EEEDFE" },
  { id: "traffic",     label: "More Organic Traffic", icon: "zap",      color: "#1D9E75", bg: "#E1F5EE" },
  { id: "audit",       label: "Free SEO Audit",       icon: "search",   color: "#185FA5", bg: "#E6F1FB" },
  { id: "leads",       label: "More Leads / Calls",   icon: "award",    color: "#D85A30", bg: "#FAECE7" },
  { id: "technical",   label: "Fix Technical Issues", icon: "settings", color: "#BA7517", bg: "#FAEEDA" },
  { id: "strategy",    label: "Full SEO Strategy",    icon: "sparkle",  color: "#534AB7", bg: "#EEEDFE" },
];
 
type TabId = "business" | "need";
 
export default function PersonaSelector() {
  const [activeTab, setActiveTab] = useState<TabId>("business");
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>("law-firm");
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
 
  const currentItems = activeTab === "business" ? businessTypes : needTypes;
  const selectedId = activeTab === "business" ? selectedBusiness : selectedNeed;
  const setSelected = activeTab === "business" ? setSelectedBusiness : setSelectedNeed;
 
  const selectedItem = currentItems.find((i) => i.id === selectedId);
 
  const getCtaHref = () => {
    if (activeTab === "business" && selectedBusiness) {
      const item = businessTypes.find((b) => b.id === selectedBusiness);
      return item?.href ?? "#cta";
    }
    return "#cta";
  };
 
  return (
    <section className="relative w-full overflow-hidden bg-[#0D1B54] py-20">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
 
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#534AB7] opacity-20 blur-[120px]" />
      </div>
 
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60">
            {icons.sparkle}
            <span>Personalized for you</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Tell us about yourself
          </h2>
          <p className="mt-3 text-sm text-white/50">
            We'll show you exactly what SEO strategy fits your business
          </p>
        </motion.div>
 
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* Tab switcher */}
          <div className="flex gap-1 bg-[#f4f5f7] p-1.5">
            {(["business", "need"] as TabId[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-[#0D1B54] shadow-sm"
                    : "text-[#64748b] hover:text-[#0D1B54]"
                }`}
              >
                {tab === "business" ? "My business is…" : "I need…"}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#534AB7]"
                  />
                )}
              </button>
            ))}
          </div>
 
          {/* Grid */}
          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-3 gap-3"
              >
                {currentItems.map((item, idx) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15, delay: idx * 0.04 }}
                      onClick={() => setSelected(item.id)}
                      className={`group relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 text-center transition-all duration-200 ${
                        isSelected
                          ? "border-[#534AB7] shadow-md"
                          : "border-[#e5e7eb] hover:border-[#534AB7]/40 hover:shadow-sm"
                      }`}
                      style={{
                        background: isSelected ? item.bg : "#fff",
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200"
                        style={{
                          background: isSelected ? "rgba(255,255,255,0.7)" : item.bg,
                          color: item.color,
                        }}
                      >
                        {icons[item.icon as keyof typeof icons]}
                      </div>
 
                      {/* Label */}
                      <span
                        className="text-sm font-semibold leading-tight transition-colors duration-200"
                        style={{ color: isSelected ? "#0D1B54" : "#374151" }}
                      >
                        {item.label}
                      </span>
 
                      {/* Selected dot */}
                      {isSelected && (
                        <motion.div
                          layoutId="selectedDot"
                          className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#534AB7]"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
 
            {/* CTA Button */}
            <div className="mt-4">
              <Link
                href={getCtaHref()}
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-[#3C3489] hover:shadow-lg hover:shadow-[#534AB7]/30 active:scale-[0.98]"
              >
                <span className="text-white/70">{icons.sparkle}</span>
                Get My Free SEO Strategy
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {icons.arrowRight}
                </span>
              </Link>
 
              {selectedItem && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 text-center text-xs text-[#94a3b8]"
                >
                  {activeTab === "business"
                    ? `We'll build a custom SEO strategy for your ${selectedItem.label.toLowerCase()}`
                    : `We'll focus on "${selectedItem.label}" for your business`}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
 
        {/* Bottom trust signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-6"
        >
          {["Free 30-min call", "No commitment", "Reply in 24hrs"].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span className="text-xs font-medium text-white/40">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
 













