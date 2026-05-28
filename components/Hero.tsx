"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle, Star, Calendar, Clock, Video,
  ArrowRight, TrendingUp, Users, Zap,
  BarChart2, Target, DollarSign, FileText, ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";
 
const keyFeatures = [
  { icon: FileText,     text: "Weekly SEO Reports"                          },
  { icon: Target,       text: "Understand Your Business Niche"              },
  { icon: BarChart2,    text: "SEO Strategy Based on Your Business Need"    },
  { icon: DollarSign,   text: "Revenue Generation Focused"                  },
  { icon: ShoppingCart, text: "Double Your Sales"                           },
];
 
const meetingPerks = [
  { icon: Clock,        text: "30-min free strategy call"        },
  { icon: Video,        text: "Google Meet — no download needed" },
  { icon: CheckCircle,  text: "No commitment · Reply in 24hrs"   },
];
 
const eeatLinks = [
  { label: "Trustpilot", sub: "Reviews",  href: "https://www.trustpilot.com/review/searchprex.com", color: "#00b67a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch",     sub: "5.0 ★",   href: "https://clutch.co/profile/searchprex",              color: "#d97706",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB",        sub: "A+ Listed",href: "https://www.bbb.org/us/il/chicago/profile/searchprex", color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text></svg> },
  { label: "G2",         sub: "Approved", href: "https://www.g2.com/sellers/searchprex",             color: "#ff492c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms",  sub: "Verified", href: "https://www.goodfirms.co/company/searchprex",       color: "#534AB7",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed",   href: "https://www.crunchbase.com/organization/searchprex",color: "#0288d1",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency",   href: "https://www.designrush.com/agency/searchprex",      color: "#e11d48",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn",   sub: "Company",  href: "https://www.linkedin.com/company/searchprex/",      color: "#0a66c2",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];
 
const quickStats = [
  { icon: TrendingUp, value: "+285%", label: "Avg. Revenue Growth", color: "#534AB7" },
  { icon: Users,      value: "20+",   label: "US Clients Served",   color: "#059669" },
  { icon: Zap,        value: "5+",    label: "Years Experience",    color: "#d97706" },
];
 
interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}
 
export default function Hero({
  headline = "Stop Paying Per Click.",
  subheadline = "Tired of burning your budget on Google Ads and Meta? We build organic visibility that reaches every corner of your local market — compounding month after month without paying per click.",
  ctaText = "Get Free SEO Audit",
}: HeroProps) {
 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
 
  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: "https://calendly.com/contact-searchprex/30min",
      });
    }
  };
 
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
 
      <style>{`
        @keyframes sp-float-1  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.05)} }
        @keyframes sp-float-2  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(0.97)} }
        @keyframes sp-float-3  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.03)} }
        @keyframes sp-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes sp-particle { 0%{transform:translateY(0);opacity:0} 10%{opacity:.55} 90%{opacity:.35} 100%{transform:translateY(-120vh);opacity:0} }
        @keyframes sp-blink    { 0%,100%{opacity:1} 50%{opacity:.1} }
        .sp-orb      { position:absolute;border-radius:50%;pointer-events:none;filter:blur(70px); }
        .sp-orb-1    { width:500px;height:500px;top:-140px;left:-100px;background:#534AB7;opacity:.06;animation:sp-float-1 8s ease-in-out infinite; }
        .sp-orb-2    { width:360px;height:360px;top:35%;right:-80px;background:#22d3ee;opacity:.04;animation:sp-float-2 10s ease-in-out infinite; }
        .sp-orb-3    { width:300px;height:300px;bottom:-80px;left:30%;background:#a855f7;opacity:.05;animation:sp-float-3 9s ease-in-out infinite; }
        .sp-ring     { position:absolute;border-radius:50%;pointer-events:none;animation:sp-spin linear infinite; }
        .sp-ring-1   { width:700px;height:700px;top:-250px;left:-250px;border:1px solid rgba(83,74,183,.07);animation-duration:40s; }
        .sp-ring-2   { width:460px;height:460px;top:8%;right:-180px;border:1px solid rgba(34,211,238,.06);animation-duration:55s;animation-direction:reverse; }
        .sp-ring-3   { width:240px;height:240px;bottom:4%;left:4%;border:1px solid rgba(168,85,247,.06);animation-duration:30s; }
        .sp-dot      { position:absolute;border-radius:50%;pointer-events:none;animation:sp-blink ease-in-out infinite; }
        .sp-particle { position:absolute;border-radius:50%;pointer-events:none;animation:sp-particle linear infinite; }
      `}</style>
 
      <section className="relative min-h-screen overflow-hidden bg-white pt-20">
 
        {/* Pure white — only animated effects, no gradient overlay */}
 
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:"linear-gradient(rgba(83,74,183,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(83,74,183,.06) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
 
        {/* Floating orbs */}
        <div className="sp-orb sp-orb-1" />
        <div className="sp-orb sp-orb-2" />
        <div className="sp-orb sp-orb-3" />
 
        {/* Spinning rings */}
        <div className="sp-ring sp-ring-1" />
        <div className="sp-ring sp-ring-2" />
        <div className="sp-ring sp-ring-3" />
 
        {/* Blinking dots */}
        {[
          {top:"18%",left:"8%", size:4,color:"#534AB7",op:.3, dur:"3.2s"},
          {top:"35%",left:"92%",size:3,color:"#22d3ee",op:.25,dur:"4.1s"},
          {top:"65%",left:"5%", size:5,color:"#a855f7",op:.2, dur:"2.8s"},
          {top:"80%",left:"88%",size:3,color:"#534AB7",op:.28,dur:"3.7s"},
          {top:"12%",left:"54%",size:2,color:"#22d3ee",op:.35,dur:"5s"  },
          {top:"50%",left:"49%",size:4,color:"#a855f7",op:.18,dur:"4.5s"},
          {top:"90%",left:"30%",size:3,color:"#534AB7",op:.25,dur:"3.5s"},
        ].map((d,i) => (
          <div key={i} className="sp-dot" style={{ top:d.top, left:d.left, width:d.size, height:d.size, background:d.color, opacity:d.op, animationDuration:d.dur, animationDelay:`${i*0.4}s` }} />
        ))}
 
        {/* Rising particles */}
        {[
          {left:"12%",size:2,  color:"#534AB7",dur:"12s",delay:"0s"},
          {left:"28%",size:1.5,color:"#22d3ee",dur:"16s",delay:"3s"},
          {left:"45%",size:2,  color:"#a855f7",dur:"14s",delay:"6s"},
          {left:"62%",size:1.5,color:"#534AB7",dur:"18s",delay:"1s"},
          {left:"78%",size:2,  color:"#22d3ee",dur:"13s",delay:"8s"},
          {left:"90%",size:1,  color:"#a855f7",dur:"15s",delay:"4s"},
        ].map((p,i) => (
          <div key={i} className="sp-particle" style={{ bottom:"-10px", left:p.left, width:p.size, height:p.size, background:p.color, opacity:.45, animationDuration:p.dur, animationDelay:p.delay }} />
        ))}
 
        {/* Diagonal accent */}
        <div className="absolute pointer-events-none" style={{ top:0, left:"55%", width:"1px", height:"45%", background:"linear-gradient(to bottom,transparent,rgba(83,74,183,.1),transparent)", transform:"rotate(15deg)", transformOrigin:"top" }} />
 
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
 
            {/* ── LEFT ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Live pill */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                  Founder-Led SEO · No Juniors · No Fluff
                </span>
              </div>
 
              {/* H1 */}
              <h1 className="mb-4 text-5xl font-black leading-[1.0] tracking-tight text-[#0a0f2e] sm:text-6xl lg:text-7xl">
                {headline}
                <br />
                <span className="text-[#534AB7]">Own Your Market.</span>
              </h1>
 
              <p className="mx-auto mb-6 max-w-xl text-lg text-[#64748b] leading-relaxed lg:mx-0">
                {subheadline}
              </p>
 
              {/* ── Key Features ── */}
              <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {keyFeatures.map((f) => (
                  <div key={f.text} className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 shadow-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                      <f.icon className="h-4 w-4 text-[#534AB7]" />
                    </div>
                    <span className="text-sm font-semibold text-[#374151]">{f.text}</span>
                  </div>
                ))}
              </div>
 
              {/* CTAs */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/free-audit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all hover:bg-[#3C3489] hover:-translate-y-0.5"
                >
                  {ctaText} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#e2e8f0] bg-white px-7 py-3.5 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  View Services
                </Link>
              </div>
 
              {/* Micro trust */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
                {["No contracts", "Reply in 24hrs", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-[#64748b]">
                    <CheckCircle className="h-3.5 w-3.5 text-[#16a34a]" />{t}
                  </span>
                ))}
              </div>
 
              {/* EEAT verified platforms */}
              <div className="mb-8 rounded-xl border border-[#e2e8f0] bg-white px-4 py-4 shadow-sm">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                  Verified &amp; Listed On
                </p>
                <div className="flex flex-wrap gap-2">
                  {eeatLinks.map((platform) => (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`SearchPrex on ${platform.label}`}
                      className="group flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 transition-all hover:border-[#534AB7] hover:shadow-sm"
                    >
                      <span className="flex-shrink-0 transition-transform group-hover:scale-110">
                        {platform.icon}
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold leading-none text-[#0a0f2e]">{platform.label}</p>
                        <p className="text-[10px] font-medium leading-tight" style={{ color: platform.color }}>{platform.sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
 
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#e2e8f0] pt-6">
                {quickStats.map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="flex items-center justify-center gap-1.5 lg:justify-start">
                      <s.icon className="h-4 w-4" style={{ color: s.color }} />
                      <p className="text-2xl font-black sm:text-3xl" style={{ color: s.color }}>{s.value}</p>
                    </div>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-[#64748b]">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
 
            {/* ── RIGHT — Calendly Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full max-w-md">
 
                {/* Urgency badge */}
                <div className="mb-3 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d1fae5] bg-[#f0fdf4] px-4 py-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a]" />
                    </span>
                    <span className="text-xs font-bold text-[#15803d]">Only 3 audit spots left this month</span>
                  </div>
                </div>
 
                {/* Main card */}
                <div className="rounded-2xl border-2 border-[#534AB7]/20 bg-white p-7 shadow-2xl shadow-[#534AB7]/10">
 
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f5f3ff] px-4 py-2">
                    <Calendar className="h-4 w-4 text-[#534AB7]" />
                    <span className="text-xs font-bold text-[#534AB7]">Free 30-Min Strategy Call</span>
                  </div>
 
                  <h3 className="mb-2 text-2xl font-black tracking-tight text-[#0a0f2e]">
                    Talk Directly With<br />the Founder
                  </h3>
                  <p className="mb-5 text-sm text-[#64748b] leading-relaxed">
                    No sales reps. No junior staff. Just Mubashar — your SEO strategy, built around your niche and revenue goals.
                  </p>
 
                  <div className="mb-5 flex flex-col gap-3">
                    {meetingPerks.map((perk) => (
                      <div key={perk.text} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                          <perk.icon className="h-4 w-4 text-[#534AB7]" />
                        </div>
                        <span className="text-sm text-[#374151]">{perk.text}</span>
                      </div>
                    ))}
                  </div>
 
                  {/* ✅ Book Free Strategy Call — Calendly popup */}
                  <button
                    onClick={openCalendly}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold text-white shadow-md shadow-[#534AB7]/30 transition-all hover:bg-[#3C3489] hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Free Strategy Call
                  </button>
 
                  <div className="my-3 flex items-center gap-3 text-xs text-[#94a3b8]">
                    <div className="h-px flex-1 bg-[#e2e8f0]" />or<div className="h-px flex-1 bg-[#e2e8f0]" />
                  </div>
 
                  {/* ✅ Get Free SEO Audit Instead — /free-audit */}
                  <Link
                    href="/free-audit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#e2e8f0] px-6 py-3 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                  >
                    Get Free SEO Audit Instead →
                  </Link>
 
                  {/* Social proof */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#e2e8f0] pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {["L", "E", "M"].map((letter, i) => (
                          <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#534AB7]">
                            <span className="text-[9px] font-black text-white">{letter}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-[#64748b]">20+ US businesses growing</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                      <span className="ml-1 text-xs font-medium text-[#64748b]">5.0</span>
                    </div>
                  </div>
                </div>
 
                <p className="mt-3 text-center text-xs text-[#94a3b8]">
                  🔒 Your information is 100% confidential — never shared or sold.
                </p>
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>
    </>
  );
}
 















