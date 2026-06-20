"use client";
 
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
 
/* ─── floating badge data ─── */
const BADGES = [
  { label: "+476%", sub: "Organic Clicks",   top: "18%", left: "8%",  delay: 0    },
  { label: "Top 3", sub: "Map Pack",          top: "65%", left: "4%",  delay: 0.15 },
  { label: "+75%",  sub: "Revenue",           top: "20%", right: "6%", delay: 0.3  },
  { label: "24/7",  sub: "AI Intake",         top: "68%", right: "4%", delay: 0.45 },
];
 
/* ─── pill tabs ─── */
const TABS = ["Law Firm SEO", "eCommerce SEO", "Local SEO", "Technical SEO"] as const;
 
/* ─── gradient orb ─── */
function Orb({ cx, cy, r, color }: { cx: string; cy: string; r: string; color: string }) {
  return (
    <circle cx={cx} cy={cy} r={r} fill={color} style={{ filter: "blur(70px)", opacity: 0.22 }} />
  );
}
 
export default function SEOAuditStrip() {
  const [activeTab, setActiveTab]   = useState(0);
  const [url,       setUrl]         = useState("");
  const [focused,   setFocused]     = useState(false);
  const router                      = useRouter();
  const sectionRef                  = useRef<HTMLElement>(null);
  const inView                      = useInView(sectionRef, { once: true, margin: "-80px" });
 
  /* mouse-tracking gradient shift */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
 
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top)  / rect.height);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = url.trim()
      ? `/free-audit?url=${encodeURIComponent(url)}`
      : "/free-audit";
    router.push(dest);
  };
 
  /* headline per tab */
  const HEADLINES = [
    { top: "Rank your firm.", bot: "Win more cases." },
    { top: "Rank higher.",    bot: "Sell more." },
    { top: "Own your city.",  bot: "Get found first." },
    { top: "Fix the issues.", bot: "Climb the rankings." },
  ];
  const h = HEADLINES[activeTab];
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8eaf6 0%, #d4f5e9 55%, #e0e8ff 100%)",
        padding: "96px 24px",
      }}
    >
      {/* ── SVG background orbs (mouse-reactive) ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${springX.get() * 100}% ${springY.get() * 100}%, rgba(83,74,183,0.18) 0%, transparent 70%)`,
        }}
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <Orb cx="20%"  cy="30%"  r="260" color="#534AB7" />
        <Orb cx="80%"  cy="70%"  r="220" color="#3eb489" />
        <Orb cx="55%"  cy="10%"  r="180" color="#7c3aed" />
      </svg>
 
      {/* ── floating badges ── */}
      {BADGES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: b.delay + 0.4, duration: 0.6, ease: "easeOut" }}
          className="absolute hidden lg:flex flex-col items-center rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-sm"
          style={{
            top:   b.top,
            left:  (b as any).left,
            right: (b as any).right,
            minWidth: 90,
          }}
        >
          <span className="text-xl font-black" style={{ color: "#534AB7" }}>{b.label}</span>
          <span className="mt-0.5 text-[10px] font-semibold text-[#6b7090]">{b.sub}</span>
        </motion.div>
      ))}
 
      {/* ── main card ── */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
 
        {/* ── tab switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-1 rounded-full bg-white/60 p-1.5 shadow-sm backdrop-blur-sm border border-white/80"
        >
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className="relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
              style={{ color: activeTab === i ? "#0a0f2e" : "#6b7090" }}
            >
              {activeTab === i && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </motion.div>
 
        {/* ── headline ── */}
        <div className="mb-6 overflow-hidden">
          <motion.h2
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-5xl font-black leading-[1.08] tracking-tight text-[#0a0f2e] sm:text-6xl lg:text-7xl"
          >
            {h.top}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #534AB7 0%, #3eb489 100%)" }}
            >
              {h.bot}
            </span>
          </motion.h2>
        </div>
 
        {/* ── sub ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#475569]"
        >
          The founder-led SEO platform that turns search visibility into signed
          clients, recovered carts, and booked appointments.
        </motion.p>
 
        {/* ── URL input — Semrush style ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative mx-auto flex max-w-xl items-center rounded-full bg-white shadow-xl"
          style={{
            border: focused ? "2px solid #534AB7" : "2px solid transparent",
            transition: "border-color .2s",
          }}
        >
          {/* domain icon */}
          <span className="pl-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </span>
 
          <input
            type="url"
            placeholder="Enter your website URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent py-4 pl-3 pr-2 text-sm text-[#0a0f2e] outline-none placeholder:text-[#94a3b8]"
          />
 
          {/* country selector stub */}
          <div className="flex items-center gap-1.5 border-l border-[#e5e7eb] px-4 py-4 text-sm font-medium text-[#374151]">
            <span>🇺🇸</span>
            <span className="hidden sm:inline">US</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <path d="M2 4l3 3 3-3"/>
            </svg>
          </div>
 
          <button
            type="submit"
            className="m-1.5 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #534AB7 0%, #3eb489 100%)" }}
          >
            Get Insights
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 6.5h9M8 3l3.5 3.5L8 10"/>
            </svg>
          </button>
        </motion.form>
 
        {/* ── trust micro-line ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-4 text-xs text-[#64748b]"
        >
          Free · No credit card · Results in 30 seconds
        </motion.p>
 
        {/* ── social proof avatars ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {["#534AB7","#3eb489","#d97706","#ef4444"].map((c, i) => (
              <div key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
                style={{ background: c }}>
                {["JD","SM","RK","AL"][i]}
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-[#475569]">
            Joined by <span className="font-bold text-[#0a0f2e]">20+ firms</span> this month
          </span>
        </motion.div>
      </div>
 
      {/* ── bottom solutions pills ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-3"
      >
        {[
          { icon: "🔍", label: "AI SEO Audit",         href: "/free-audit" },
          { icon: "🗺️", label: "Map Pack Rankings",    href: "/services/local-seo" },
          { icon: "⚖️", label: "Law Firm SEO",         href: "/services/law-firm-seo" },
          { icon: "🛒", label: "eCommerce SEO",        href: "/services/ecommerce-seo" },
          { icon: "🤖", label: "AI Intake Assistant",  href: "/tools/ai-intake" },
          { icon: "📊", label: "Lost Case Calculator", href: "/case-calculator" },
        ].map((pill, i) => (
          <motion.a
            key={pill.label}
            href={pill.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.85 + i * 0.06 }}
            whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(83,74,183,0.18)" }}
            className="flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2.5 text-sm font-semibold text-[#374151] backdrop-blur-sm transition-colors hover:border-[#534AB7]/40 hover:text-[#534AB7]"
            style={{ textDecoration: "none" }}
          >
            <span>{pill.icon}</span>
            {pill.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
