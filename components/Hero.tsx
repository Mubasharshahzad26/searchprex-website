
"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle, Star, Calendar, Clock, Video,
  ArrowRight, TrendingUp, Users, Zap,
  BarChart2, Target, DollarSign, FileText, ShoppingCart, Shield,
} from "lucide-react";
import { useEffect } from "react";
 
const keyFeatures = [
  { icon: FileText,     text: "Weekly SEO Reports"                       },
  { icon: Target,       text: "Understand Your Business Niche"           },
  { icon: BarChart2,    text: "Strategy Based on Your Business Need"     },
  { icon: DollarSign,   text: "Revenue Generation Focused"               },
  { icon: ShoppingCart, text: "Double Your Sales"                        },
];
 
const meetingPerks = [
  { icon: Clock,       text: "30-min free strategy call"        },
  { icon: Video,       text: "Google Meet — no download needed" },
  { icon: CheckCircle, text: "No commitment · Reply in 24hrs"   },
];
 
const eeatLinks = [
  { label: "Trustpilot", sub: "Reviews",   href: "https://www.trustpilot.com/review/searchprex.com",           color: "#00b67a",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#00b67a" aria-label="Trustpilot"><path d="M12 2l2.76 8.47H23l-7.12 5.17 2.76 8.47L12 19 3.36 24.11l2.76-8.47L-1 8.47h8.24z"/></svg> },
  { label: "Clutch",     sub: "5.0 ★",    href: "https://clutch.co/profile/searchprex",                        color: "#d97706",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#d97706" aria-label="Clutch"><path d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.27l-4.77 2.44.91-5.32L4.27 7.62l5.34-.78z"/></svg> },
  { label: "BBB",        sub: "A+ Listed", href: "https://www.bbb.org/us/il/chicago/profile/searchprex",        color: "#1d4ed8",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="BBB"><circle cx="12" cy="12" r="10" stroke="#1d4ed8" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">A+</text></svg> },
  { label: "G2",         sub: "Approved",  href: "https://www.g2.com/sellers/searchprex",                       color: "#ff492c",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="G2"><circle cx="12" cy="12" r="10" fill="#ff492c"/><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">G2</text></svg> },
  { label: "GoodFirms",  sub: "Verified",  href: "https://www.goodfirms.co/company/searchprex",                 color: "#534AB7",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#534AB7" aria-label="GoodFirms"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.58L19 8.5l-8 8z"/></svg> },
  { label: "Crunchbase", sub: "Listed",    href: "https://www.crunchbase.com/organization/searchprex",          color: "#0288d1",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0288d1" aria-label="Crunchbase"><path d="M21 10.5A8.5 8.5 0 1 1 12.5 2H21v8.5z"/><circle cx="12.5" cy="12.5" r="4" fill="#fff"/></svg> },
  { label: "DesignRush", sub: "Agency",    href: "https://www.designrush.com/agency/searchprex",                color: "#e11d48",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-label="DesignRush"><rect x="2" y="2" width="20" height="20" rx="4" fill="#e11d48"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">DR</text></svg> },
  { label: "LinkedIn",   sub: "Company",   href: "https://www.linkedin.com/company/searchprex/",                color: "#0a66c2",
    icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#0a66c2" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];
 
const quickStats = [
  { icon: TrendingUp, value: "+285%", label: "Avg. Revenue Growth", color: "#534AB7" },
  { icon: Users,      value: "20+",   label: "US Clients Served",   color: "#059669" },
  { icon: Zap,        value: "5+",    label: "Years Experience",    color: "#d97706" },
];
 
const tickerItems = [
  "Morrison Family Law — #1 Dallas County (6 wks)",
  "Michigan Sports Outdoor — +476% GSC Click Growth",
  "98% Client Retention Rate",
  "$45K+/mo Ad Spend Replaced With Organic",
  "Zero Junior Handoffs — Founder On Every Account",
  "20+ US Businesses Growing Organically",
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
        /* ── Ticker ── */
        @keyframes sp-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .sp-ticker-track { animation: sp-ticker 32s linear infinite; display:inline-flex; }
 
        /* ── Background effects ── */
        @keyframes sp-float-1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-28px) scale(1.05)} }
        @keyframes sp-float-2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-18px) scale(0.97)} }
        @keyframes sp-float-3 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.03)} }
        @keyframes sp-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes sp-rise    { 0%{transform:translateY(0);opacity:0} 10%{opacity:.5} 90%{opacity:.25} 100%{transform:translateY(-120vh);opacity:0} }
        @keyframes sp-blink   { 0%,100%{opacity:1} 50%{opacity:.1} }
 
        .sp-orb   { position:absolute;border-radius:50%;pointer-events:none;filter:blur(70px); }
        .sp-orb-1 { width:500px;height:500px;top:-140px;left:-100px;background:#534AB7;opacity:.06;animation:sp-float-1 8s ease-in-out infinite; }
        .sp-orb-2 { width:360px;height:360px;top:35%;right:-80px;background:#22d3ee;opacity:.04;animation:sp-float-2 10s ease-in-out infinite; }
        .sp-orb-3 { width:300px;height:300px;bottom:-80px;left:30%;background:#a855f7;opacity:.05;animation:sp-float-3 9s ease-in-out infinite; }
 
        .sp-ring   { position:absolute;border-radius:50%;pointer-events:none;animation:sp-spin linear infinite; }
        .sp-ring-1 { width:700px;height:700px;top:-250px;left:-250px;border:1px solid rgba(83,74,183,.07);animation-duration:40s; }
        .sp-ring-2 { width:460px;height:460px;top:8%;right:-180px;border:1px solid rgba(34,211,238,.06);animation-duration:55s;animation-direction:reverse; }
        .sp-ring-3 { width:240px;height:240px;bottom:4%;left:4%;border:1px solid rgba(168,85,247,.06);animation-duration:30s; }
 
        .sp-dot      { position:absolute;border-radius:50%;pointer-events:none;animation:sp-blink ease-in-out infinite; }
        .sp-particle { position:absolute;border-radius:50%;pointer-events:none;animation:sp-rise linear infinite; }
 
        /* ── Feature pill hover ── */
        .sp-feat { transition: border-color .2s, background .2s, box-shadow .2s; }
        .sp-feat:hover { border-color:#534AB7 !important; background:#f5f3ff !important; box-shadow:0 0 0 3px rgba(83,74,183,.08); }
        .sp-feat:hover .sp-feat-icon { background:#534AB7 !important; }
        .sp-feat:hover .sp-feat-icon-svg { color:#fff !important; }
        .sp-feat:hover .sp-feat-arrow { color:#534AB7 !important; }
 
        /* ── EEAT pill hover ── */
        .sp-eeat { transition: border-color .2s, box-shadow .2s; }
        .sp-eeat:hover { border-color:#534AB7 !important; box-shadow:0 0 0 3px rgba(83,74,183,.08); }
 
        /* ── Stat card hover ── */
        .sp-stat { transition: border-color .2s, box-shadow .2s, transform .2s; }
        .sp-stat:hover { border-color:#534AB7 !important; box-shadow:0 4px 20px rgba(83,74,183,.12); transform:translateY(-2px); }
 
        /* ── Diagonal accent ── */
        .sp-diag { position:absolute;pointer-events:none;top:0;left:55%;width:1px;height:45%;
          background:linear-gradient(to bottom,transparent,rgba(83,74,183,.12),transparent);
          transform:rotate(15deg);transform-origin:top; }
      `}</style>
 
      {/* ── TICKER STRIP ── */}
      <div className="overflow-hidden border-b border-[#e2e8f0] bg-[#534AB7] py-2.5">
        <div className="sp-ticker-track whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="inline-flex items-center gap-10 px-6">
              {tickerItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/90">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
 
      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-white pt-8">
 
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(83,74,183,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(83,74,183,.06) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
 
        {/* Orbs */}
        <div className="sp-orb sp-orb-1" />
        <div className="sp-orb sp-orb-2" />
        <div className="sp-orb sp-orb-3" />
 
        {/* Rings */}
        <div className="sp-ring sp-ring-1" />
        <div className="sp-ring sp-ring-2" />
        <div className="sp-ring sp-ring-3" />
 
        {/* Diagonal */}
        <div className="sp-diag" />
 
        {/* Blinking dots */}
        {[
          { top:"18%", left:"8%",  size:4, color:"#534AB7", op:.3,  dur:"3.2s" },
          { top:"35%", left:"92%", size:3, color:"#22d3ee", op:.25, dur:"4.1s" },
          { top:"65%", left:"5%",  size:5, color:"#a855f7", op:.2,  dur:"2.8s" },
          { top:"80%", left:"88%", size:3, color:"#534AB7", op:.28, dur:"3.7s" },
          { top:"12%", left:"54%", size:2, color:"#22d3ee", op:.35, dur:"5s"   },
          { top:"50%", left:"49%", size:4, color:"#a855f7", op:.18, dur:"4.5s" },
        ].map((d, i) => (
          <div key={i} className="sp-dot" style={{ top:d.top, left:d.left, width:d.size, height:d.size, background:d.color, opacity:d.op, animationDuration:d.dur, animationDelay:`${i*0.4}s` }} />
        ))}
 
        {/* Rising particles */}
        {[
          { left:"12%", s:2,   color:"#534AB7", dur:"12s", delay:"0s" },
          { left:"28%", s:1.5, color:"#22d3ee", dur:"16s", delay:"3s" },
          { left:"45%", s:2,   color:"#a855f7", dur:"14s", delay:"6s" },
          { left:"62%", s:1.5, color:"#534AB7", dur:"18s", delay:"1s" },
          { left:"78%", s:2,   color:"#22d3ee", dur:"13s", delay:"8s" },
        ].map((p, i) => (
          <div key={i} className="sp-particle" style={{ bottom:"-10px", left:p.left, width:p.s, height:p.s, background:p.color, opacity:.45, animationDuration:p.dur, animationDelay:p.delay }} />
        ))}
 
        <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
 
          {/* ── TOP SOCIAL PROOF BADGES ── */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-3"
          >
            {/* Live pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-5 py-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                Founder-Led · No Juniors · No Fluff
              </span>
            </div>
 
            {/* Stars */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#fde68a] bg-[#fffbeb] px-4 py-2">
              {[...Array(5)].map((_,i) => (
                <Star key={i} className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
              <span className="ml-1 text-xs font-bold text-[#92400e]">5.0 · 20+ US Clients</span>
            </div>
 
            {/* Urgency */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d1fae5] bg-[#f0fdf4] px-4 py-2">
              <Shield className="h-3.5 w-3.5 text-[#16a34a]" />
              <span className="text-xs font-bold text-[#15803d]">Only 3 audit spots left this month</span>
            </div>
          </motion.div>
 
          {/* ── HEADLINE — CENTERED FULL WIDTH ── */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.08 }}
            className="mb-3 text-center"
          >
            <h1 className="mx-auto max-w-5xl text-5xl font-black leading-[1.0] tracking-tight text-[#0a0f2e] sm:text-6xl lg:text-[78px]">
              {headline}
              <br />
              <span className="relative inline-block text-[#534AB7]">
                Own Your Market.
                {/* Underline accent */}
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 400 6" fill="none" preserveAspectRatio="none">
                  <path d="M0 5 Q100 1 200 5 Q300 9 400 5" stroke="#534AB7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.3"/>
                </svg>
              </span>
            </h1>
          </motion.div>
 
          <motion.p
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.14 }}
            className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-[#64748b]"
          >
            {subheadline}
          </motion.p>
 
          {/* ── TWO COLUMN ── */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
 
            {/* ── LEFT ── */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.2 }}
            >
              {/* Key features */}
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">What You Get</p>
              <div className="mb-8 flex flex-col gap-2">
                {keyFeatures.map((f, i) => (
                  <motion.div
                    key={f.text}
                    initial={{ opacity:0, x:-14 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.22 + i*0.07, duration:0.4 }}
                    className="sp-feat flex cursor-default items-center gap-4 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="sp-feat-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff] transition-colors duration-200">
                      <f.icon className="sp-feat-icon-svg h-4 w-4 text-[#534AB7] transition-colors duration-200" />
                    </div>
                    <span className="flex-1 text-sm font-semibold text-[#374151]">{f.text}</span>
                    <ArrowRight className="sp-feat-arrow h-3.5 w-3.5 text-[#e2e8f0] transition-colors duration-200" />
                  </motion.div>
                ))}
              </div>
 
              {/* CTAs */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/free-audit"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all hover:bg-[#3C3489] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#534AB7]/30"
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#e2e8f0] bg-white px-7 py-4 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  View Services
                </Link>
              </div>
 
              {/* Trust line */}
              <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                {["No contracts", "Reply in 24hrs", "Founder works your account"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-[#64748b]">
                    <CheckCircle className="h-3.5 w-3.5 text-[#16a34a]" />{t}
                  </span>
                ))}
              </div>
 
              {/* Stats cards */}
              <div className="mb-8 grid grid-cols-3 gap-3">
                {quickStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity:0, y:16 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.5 + i*0.08 }}
                    className="sp-stat cursor-default rounded-2xl border border-[#e2e8f0] bg-white px-4 py-5 text-center shadow-sm"
                  >
                    <s.icon className="mx-auto mb-1.5 h-5 w-5" style={{ color:s.color }} />
                    <p className="text-3xl font-black leading-none" style={{ color:s.color }}>{s.value}</p>
                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">{s.label}</p>
                  </motion.div>
                ))}
              </div>
 
              {/* EEAT */}
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
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
                      className="sp-eeat group flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2"
                    >
                      <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                        {platform.icon}
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold leading-none text-[#0a0f2e]">{platform.label}</p>
                        <p className="text-[10px] font-medium leading-tight" style={{ color:platform.color }}>{platform.sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
 
            {/* ── RIGHT — Booking card (sticky) ── */}
            <motion.div
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.25, ease:[0.22,1,0.36,1] }}
              className="lg:sticky lg:top-24"
            >
              {/* Urgency badge above card */}
              <div className="mb-3 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d1fae5] bg-[#f0fdf4] px-4 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a]" />
                  </span>
                  <span className="text-xs font-bold text-[#15803d]">Only 3 audit spots left this month</span>
                </div>
              </div>
 
              {/* Card */}
              <div className="overflow-hidden rounded-3xl border-2 border-[#534AB7]/15 bg-white shadow-2xl shadow-[#534AB7]/10">
                {/* Purple top accent bar */}
                <div className="h-1.5 w-full bg-[#534AB7]" />
 
                <div className="p-7">
                  {/* Header row */}
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f5f3ff] px-3 py-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#534AB7]" />
                        <span className="text-xs font-bold text-[#534AB7]">Free 30-Min Strategy Call</span>
                      </div>
                      <h3 className="text-2xl font-black leading-tight tracking-tight text-[#0a0f2e]">
                        Talk Directly With<br />
                        <span className="text-[#534AB7]">the Founder</span>
                      </h3>
                    </div>
                    {/* MS Avatar */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[#534AB7]/20 bg-[#f5f3ff] text-lg font-black text-[#534AB7]">
                      MS
                    </div>
                  </div>
 
                  <p className="mb-6 text-sm leading-relaxed text-[#64748b]">
                    No sales reps. No junior staff. Just Mubashar — your SEO strategy, built around your niche and revenue goals.
                  </p>
 
                  {/* Perks */}
                  <div className="mb-6 space-y-3">
                    {meetingPerks.map((perk) => (
                      <div key={perk.text} className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] px-4 py-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f3ff]">
                          <perk.icon className="h-4 w-4 text-[#534AB7]" />
                        </div>
                        <span className="text-sm font-medium text-[#374151]">{perk.text}</span>
                      </div>
                    ))}
                  </div>
 
                  {/* Primary CTA — Calendly */}
                  <button
                    onClick={openCalendly}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/30 transition-all hover:bg-[#3C3489] hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Free Strategy Call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
 
                  <div className="my-4 flex items-center gap-3 text-xs text-[#cbd5e1]">
                    <div className="h-px flex-1 bg-[#e2e8f0]" />
                    <span className="text-[#94a3b8]">or</span>
                    <div className="h-px flex-1 bg-[#e2e8f0]" />
                  </div>
 
                  {/* Secondary CTA */}
                  <Link
                    href="/free-audit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#e2e8f0] px-6 py-3 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#534AB7] hover:text-[#534AB7]"
                  >
                    Get Free SEO Audit Instead →
                  </Link>
 
                  {/* Social proof footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#f1f5f9] pt-5">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {["L", "E", "M"].map((letter, i) => (
                          <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#534AB7]">
                            <span className="text-[10px] font-black text-white">{letter}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-[#64748b]">20+ US businesses growing</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-[#64748b]">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Confidentiality note */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#94a3b8]">
                <CheckCircle className="h-3.5 w-3.5 text-[#16a34a]" />
                Your information is 100% confidential — never shared or sold
              </div>
            </motion.div>
 
          </div>
        </div>
      </section>
    </>
  );
}