"use client";
 
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Search, MapPin, Scale, ShoppingCart, Bot, Calculator } from "lucide-react";
 
/* ─── gradient orb ─── */
function Orb({ cx, cy, r, color }: { cx: string; cy: string; r: string; color: string }) {
  return (
    <circle cx={cx} cy={cy} r={r} fill={color} style={{ filter: "blur(70px)", opacity: 0.22 }} />
  );
}
 
/* ─── bottom solution pills ─── */
const PILLS = [
  { icon: Search, label: "AI SEO Audit", href: "/free-audit" },
  { icon: MapPin, label: "Map Pack Rankings", href: "/services/local-seo" },
  { icon: Scale, label: "Law Firm SEO", href: "/services/law-firm-seo" },
  { icon: ShoppingCart, label: "eCommerce SEO", href: "/services/ecommerce-seo" },
  { icon: Bot, label: "AI Intake Assistant", href: "/tools/ai-intake" },
  { icon: Calculator, label: "Lost Case Calculator", href: "/case-calculator" },
];
 
export default function SEOAuditStrip() {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
 
  /* mouse-tracking spotlight gradient (reactive via useMotionTemplate) */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const xPct = useTransform(springX, (v) => v * 100);
  const yPct = useTransform(springY, (v) => v * 100);
  const spotlight = useMotionTemplate`radial-gradient(ellipse 60% 50% at ${xPct}% ${yPct}%, rgba(83,74,183,0.18) 0%, transparent 70%)`;
 
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = url.trim()
      ? `/ai-visibility?url=${encodeURIComponent(url)}`
      : "/ai-visibility";
    router.push(dest);
  };
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8eaf6 0%, #d4f5e9 55%, #e0e8ff 100%)",
        padding: "96px 24px",
      }}
    >
      {/* ── mouse-reactive spotlight ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <Orb cx="20%" cy="30%" r="260" color="#534AB7" />
        <Orb cx="80%" cy="70%" r="220" color="#3eb489" />
        <Orb cx="55%" cy="10%" r="180" color="#7c3aed" />
      </svg>
 
      {/* ── main card ── */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
 
        {/* ── eyebrow pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-xs font-semibold text-[#534AB7] shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" />
          Free AI Visibility Check
        </motion.div>
 
        {/* ── headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-5xl font-black leading-[1.08] tracking-tight text-[#0a0f2e] sm:text-6xl lg:text-7xl"
        >
          See where you rank.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #534AB7 0%, #3eb489 100%)" }}
          >
            Win more clients.
          </span>
        </motion.h2>
 
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
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </span>
 
          <input
            type="url"
            placeholder="Enter your website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent py-4 pl-3 pr-2 text-sm text-[#0a0f2e] outline-none placeholder:text-[#94a3b8]"
          />
 
          {/* country selector stub */}
          <div className="flex items-center gap-1.5 border-l border-[#e5e7eb] px-4 py-4 text-sm font-medium text-[#374151]">
            <span>🇺🇸</span>
            <span className="hidden sm:inline">US</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <path d="M2 4l3 3 3-3" />
            </svg>
          </div>
 
          <button
            type="submit"
            className="m-1.5 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #534AB7 0%, #3eb489 100%)" }}
          >
            Get Insights
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 6.5h9M8 3l3.5 3.5L8 10" />
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
            {["#534AB7", "#3eb489", "#d97706", "#ef4444"].map((c, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
                style={{ background: c }}
              >
                {["JD", "SM", "RK", "AL"][i]}
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-[#475569]">
            Joined by <span className="font-bold text-[#0a0f2e]">20+ firms</span> this month
          </span>
        </motion.div>
      </div>
 
      {/* ── bottom solutions pills (professional lucide icons) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative z-10 mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-3"
      >
        {PILLS.map((pill, i) => {
          const Icon = pill.icon;
          return (
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
              <Icon className="h-4 w-4" strokeWidth={2} />
              {pill.label}
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}
 