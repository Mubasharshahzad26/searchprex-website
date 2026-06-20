"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const businessTypes = [
  { id: "law-firm", label: "Law Firm", color: "#7F77DD", bg: "#EEEDFE" },
  { id: "local", label: "Local Business", color: "#1D9E75", bg: "#E1F5EE" },
  { id: "ecommerce", label: "E-Commerce", color: "#D85A30", bg: "#FAECE7" },
  { id: "medical", label: "Medical / Health", color: "#E24B4A", bg: "#FCEBEB" },
  { id: "real-estate", label: "Real Estate", color: "#185FA5", bg: "#E6F1FB" },
  { id: "other", label: "Other Business", color: "#888780", bg: "#F1EFE8" },
];

const needTypes = [
  { id: "rankings", label: "Higher Rankings", color: "#534AB7", bg: "#EEEDFE" },
  { id: "traffic", label: "More Organic Traffic", color: "#1D9E75", bg: "#E1F5EE" },
  { id: "audit", label: "Free SEO Audit", color: "#185FA5", bg: "#E6F1FB" },
  { id: "leads", label: "More Leads / Calls", color: "#D85A30", bg: "#FAECE7" },
  { id: "technical", label: "Fix Technical Issues", color: "#BA7517", bg: "#FAEEDA" },
  { id: "strategy", label: "Full SEO Strategy", color: "#534AB7", bg: "#EEEDFE" },
];

export default function PersonaSelector() {
  const [activeTab, setActiveTab] = useState<"business" | "need">("business");
  const [selectedBusiness, setSelectedBusiness] = useState("law-firm");
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch (e) {}
    };
  }, []);

  const handleCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: "https://calendly.com/contact-searchprex/30min" });
    }
  };

  const currentItems = activeTab === "business" ? businessTypes : needTypes;
  const selectedId = activeTab === "business" ? selectedBusiness : selectedNeed;
  const selectedItem = currentItems.find((i) => i.id === selectedId);

  return (
    <section className="relative w-full overflow-hidden bg-[#0D1B54] py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#534AB7] opacity-20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60">✨ Personalized for you</div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Tell us about yourself</h2>
          <p className="mt-3 text-sm text-white/50">We'll show you exactly what SEO strategy fits your business</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex gap-1 bg-[#f4f5f7] p-1.5">
            {(["business", "need"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`relative flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${activeTab === tab ? "bg-white text-[#0D1B54] shadow-sm" : "text-[#64748b] hover:text-[#0D1B54]"}`}>
                {tab === "business" ? "My business is…" : "I need…"}
                {activeTab === tab && <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#534AB7]" />}
              </button>
            ))}
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="grid grid-cols-3 gap-3">
                {currentItems.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <motion.button key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }} onClick={() => activeTab === "business" ? setSelectedBusiness(item.id) : setSelectedNeed(item.id)} className={`group relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 text-center transition-all duration-200 ${isSelected ? "border-[#534AB7] shadow-md" : "border-[#e5e7eb] hover:border-[#534AB7]/40"}`} style={{ background: isSelected ? item.bg : "#fff" }}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ background: isSelected ? "rgba(255,255,255,0.7)" : item.bg, color: item.color }}>🎯</div>
                      <span className="text-sm font-semibold leading-tight" style={{ color: isSelected ? "#0D1B54" : "#374151" }}>{item.label}</span>
                      {isSelected && <motion.div layoutId="selectedDot" className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#534AB7]" />}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4">
              <button onClick={handleCalendly} className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-[#3C3489] hover:shadow-lg active:scale-[0.98]">✨ Get My Free SEO Strategy →</button>
              {selectedItem && <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2.5 text-center text-xs text-[#94a3b8]">{activeTab === "business" ? `We'll build a custom SEO strategy for your ${selectedItem.label.toLowerCase()}` : `We'll focus on "${selectedItem.label}" for your business`}</motion.p>}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-6 flex items-center justify-center gap-6 flex-wrap">
          {["Free 30-min call", "No commitment", "Reply in 24hrs"].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              <span className="text-xs font-medium text-white/40">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}