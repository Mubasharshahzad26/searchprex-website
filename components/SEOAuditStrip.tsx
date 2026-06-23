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
import { Search, MapPin, Scale, ShoppingCart, Bot, Calculator, Check } from "lucide-react";
 
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
 
/* ─── countries list ─── */
const COUNTRIES = [
  { code: "US", name: "United States, Google", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
];
 
export default function SEOAuditStrip() {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
 
  /* ─── country dropdown state ─── */
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
 
  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
  /* focus search input when dropdown opens */
  useEffect(() => {
    if (countryOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [countryOpen]);
 
  /* filtered countries */
  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );
 
  /* mouse-tracking spotlight */
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
      ? `/ai-visibility?url=${encodeURIComponent(url)}&country=${selectedCountry.code}`
      : "/ai-visibility";
    router.push(dest);
  };
 
  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: "linear-gradient(135deg, #e8eaf6 0%, #d4f5e9 55%, #e0e8ff 100%)",
        padding: "96px 24px",
      }}
    >
      {/* mouse-reactive spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <Orb cx="20%" cy="30%" r="260" color="#534AB7" />
        <Orb cx="80%" cy="70%" r="220" color="#3eb489" />
        <Orb cx="55%" cy="10%" r="180" color="#7c3aed" />
      </svg>
 
      {/* main card */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
 
        {/* eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-xs font-semibold text-[#534AB7] shadow-sm backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" />
          Free AI Visibility Check
        </motion.div>
 
        {/* headline */}
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
 
        {/* sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#475569]"
        >
          The founder-led SEO platform that turns search visibility into signed
          clients, recovered carts, and booked appointments.
        </motion.p>
 
        {/* URL input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative mx-auto flex max-w-xl items-center rounded-full bg-white shadow-xl"
          style={{
            border: focused || countryOpen ? "2px solid #534AB7" : "2px solid transparent",
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
 
          {/* ─── country selector ─── */}
          <div ref={countryRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setCountryOpen((prev) => !prev);
                setCountrySearch("");
              }}
              className="flex items-center gap-1.5 border-l border-[#e5e7eb] px-4 py-4 text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer select-none"
              style={{ borderRadius: 0 }}
            >
              <span>{selectedCountry.flag}</span>
              <span className="hidden sm:inline">{selectedCountry.code}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                style={{
                  transform: countryOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </button>
 
            {/* ✅ FIXED: bottom-full mb-2 — upar khulega, pills cover nahi honge */}
            {countryOpen && (
              <div
                className="absolute right-0 bottom-full mb-2 w-64 rounded-xl border border-[#e5e7eb] bg-white shadow-2xl"
                style={{ zIndex: 9999 }}
              >
                {/* search */}
                <div className="border-b border-[#f1f5f9] p-2">
                  <div className="flex items-center gap-2 rounded-lg bg-[#f8fafc] px-3 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Enter country"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-[#0a0f2e] outline-none placeholder:text-[#94a3b8]"
                    />
                  </div>
                </div>
 
                {/* list */}
                <ul className="max-h-52 overflow-y-auto py-1">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <li key={country.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryOpen(false);
                            setCountrySearch("");
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f5f3ff] transition-colors"
                        >
                          <span className="text-base">{country.flag}</span>
                          <span className="flex-1 text-left">{country.name}</span>
                          {selectedCountry.code === country.code && (
                            <Check className="h-3.5 w-3.5 text-[#534AB7]" strokeWidth={2.5} />
                          )}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-center text-sm text-[#94a3b8]">
                      No countries found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
 
          {/* submit */}
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
 
        {/* trust micro-line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-4 text-xs text-[#64748b]"
        >
          Free · No credit card · Results in 30 seconds
        </motion.p>
 
        {/* social proof avatars */}
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
 
      {/* bottom solutions pills */}
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
 