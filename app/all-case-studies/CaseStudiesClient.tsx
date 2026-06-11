"use client";
 
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, CheckCircle, Play, X, Phone, Sparkles, ShieldCheck,
  Linkedin, BadgeCheck, Filter, MapPin, ChevronDown, BarChart3, Bot,
  Youtube, RotateCcw,
} from "lucide-react";
import {
  caseStudies, featuredStudies, seoTypeOptions, industryOptions,
  detailUrl, FAQS, type CaseStudy,
} from "./data";
 
/* ── Brand ── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
const NAVY = "#0a0f2e";
 
const PHONE = "+923106526316";
const PHONE_DISPLAY = "+92 310 652 6316";
 
/* ── Proof band: 4 big numbers + capability pills (agency-style) ── */
const bigStats = [
  { v: "20+", l: "Clients worldwide" },
  { v: "+476%", l: "Organic clicks" },
  { v: "+285%", l: "Indexing rate" },
  { v: "12K+", l: "Pages indexed" },
];
 
const capabilities = [
  { label: "Ranked in Google AI Overviews", icon: Sparkles },
  { label: "Cited by LLMs · AEO optimized", icon: Bot },
  { label: "AI chatbot developer", icon: BarChart3 },
];
 
/* ── Motion ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
 
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
 
type FormState = "idle" | "sending" | "sent" | "error";
 
export default function CaseStudiesClient({ linkedinUrl }: { linkedinUrl: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
 
  const typeFilter = sp.get("type") ?? "all";
  const industryFilter = sp.get("industry") ?? "all";
  const isFiltering = typeFilter !== "all" || industryFilter !== "all";
 
  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value === "all" || params.get(key) === value) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
 
  const clearFilters = () => router.replace(pathname, { scroll: false });
 
  const matches = (cs: CaseStudy) =>
    (typeFilter === "all" || slugify(cs.seoType) === typeFilter) &&
    (industryFilter === "all" || slugify(cs.industry) === industryFilter);
 
  const filtered = useMemo(() => caseStudies.filter(matches), [typeFilter, industryFilter]);
  const featured = featuredStudies();
  const gridStudies = isFiltering ? filtered : caseStudies.filter((c) => !c.featured);
 
  /* Modal + form */
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", website: "", phone: "" });
  const [formState, setFormState] = useState<FormState>("idle");
 
  const openModal = () => { setFormState("idle"); setShowModal(true); };
 
  const submit = async () => {
    setFormState("sending");
    try {
      const res = await fetch("/api/reality-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormState("sent");
      setTimeout(() => {
        setShowModal(false);
        setForm({ name: "", email: "", website: "", phone: "" });
        setFormState("idle");
      }, 2200);
    } catch {
      setFormState("error");
    }
  };
 
  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-[#e2e8f0] outline-none focus:ring-2 focus:ring-[#3eb489] transition-shadow";
 
  const CTA = ({ className = "", label = "Reality Check" }: { className?: string; label?: string }) => (
    <button
      onClick={openModal}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all hover:scale-[1.03] ${className}`}
      style={{ background: GREEN }}
    >
      <BarChart3 className="h-5 w-5" />
      {label}
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </button>
  );
 
  return (
    <main className="bg-gradient-to-b from-[#f8fafc] to-white">
 
      {/* ━━━ 1 · HERO ━━━ */}
      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${GREEN}, transparent)` }} />
          <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${PURPLE}, transparent)` }} />
        </div>
 
        <motion.div initial="hidden" animate="show" variants={stagger}
          className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
            <ShieldCheck className="h-4 w-4" style={{ color: GREEN }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN_DARK }}>
              Verified GSC data · real clients
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp}
            className="mb-5 text-4xl font-black leading-tight text-[#0a0f2e] sm:text-5xl md:text-6xl">
            SEO Case Studies That Drive <span style={{ color: GREEN }}>Real Revenue</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mb-8 text-lg leading-relaxed text-[#475569]">
            Filter real results by industry and SEO type. No vanity metrics — just clicks, rankings,
            indexing, leads and revenue, all backed by Google Search Console.
          </motion.p>
          <motion.div variants={fadeUp}>
            <CTA className="px-8 py-4 text-lg" />
          </motion.div>
        </motion.div>
      </section>
 
      {/* ━━━ 2 · PROOF BAND (dark navy, big numbers + capability pills) ━━━ */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="relative overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-12"
            style={{ background: NAVY }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
 
            {/* Big numbers row */}
            <div className="relative grid grid-cols-2 gap-x-6 gap-y-8 text-center md:grid-cols-4">
              {bigStats.map((s, i) => (
                <div key={i} className={i > 0 ? "md:border-l md:border-white/10" : ""}>
                  <p className="text-3xl font-black sm:text-4xl md:text-5xl" style={{ color: GREEN }}>{s.v}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/60">{s.l}</p>
                </div>
              ))}
            </div>
 
            {/* Capability pills */}
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              {capabilities.map(({ label, icon: Icon }) => (
                <span key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90">
                  <Icon className="h-3.5 w-3.5" style={{ color: GREEN }} />
                  {label}
                </span>
              ))}
            </div>
 
            <p className="relative mt-7 text-center text-sm text-white/50">
              Recovered from near-zero GSC visibility — every number verified in Google Search Console.
            </p>
          </motion.div>
        </div>
      </section>
 
      {/* ━━━ 3 · FILTER BAR (URL-synced) ━━━ */}
      <section className="border-y border-[#e2e8f0] bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2">
            <Filter className="h-4 w-4" style={{ color: PURPLE }} />
            <span className="text-sm font-bold text-[#0a0f2e]">Filter by SEO type</span>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            <FilterPill active={typeFilter === "all"} onClick={() => setParam("type", "all")} label="All types" />
            {seoTypeOptions().map((t) => (
              <FilterPill key={t} active={typeFilter === slugify(t)}
                onClick={() => setParam("type", slugify(t))} label={t} />
            ))}
          </div>
 
          <div className="mb-5 flex items-center gap-2">
            <MapPin className="h-4 w-4" style={{ color: PURPLE }} />
            <span className="text-sm font-bold text-[#0a0f2e]">Filter by industry</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterPill active={industryFilter === "all"} onClick={() => setParam("industry", "all")} label="All industries" />
            {industryOptions().map((ind) => (
              <FilterPill key={ind} active={industryFilter === slugify(ind)}
                onClick={() => setParam("industry", slugify(ind))} label={ind} />
            ))}
          </div>
 
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-[#64748b]">
              Showing <span className="font-bold text-[#0a0f2e]">{filtered.length}</span> of {caseStudies.length} case studies
            </p>
            {isFiltering && (
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: PURPLE }}>
                <RotateCcw className="h-4 w-4" /> Clear all
              </button>
            )}
          </div>
        </div>
      </section>
 
      {/* ━━━ 4 · FEATURED (only when not filtering) ━━━ */}
      {!isFiltering && (
        <section className="bg-[#f8f9fc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: GREEN }}>Success stories</p>
              <h2 className="text-4xl font-black text-[#0a0f2e] md:text-5xl">Featured Results</h2>
            </div>
            <div className="space-y-10">
              {featured.map((cs, index) => {
                const videoLeft = index % 2 === 0;
                return (
                  <motion.article key={cs.id}
                    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="grid items-stretch overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm lg:grid-cols-2">
                    <div className={videoLeft ? "" : "lg:order-2"}>
                      {cs.video && (
                        <div className="group relative h-full min-h-[300px] cursor-pointer bg-[#0a0f2e]"
                          onClick={() => setActiveVideo(cs.video!)}>
                          <img src={`https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`}
                            alt={`${cs.client} SEO case study`}
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${cs.video}/hqdefault.jpg`; }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-[#0a0f2e]/20 to-transparent" />
                          <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white"
                            style={{ background: GREEN }}>
                            <Youtube className="h-3 w-3" /> Watch on YouTube
                          </div>
                          <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-lg transition-all group-hover:scale-110"
                              style={{ background: GREEN }}>
                              <Play className="ml-1 h-7 w-7 fill-white text-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                            <p className="text-sm font-bold text-white">{cs.client} — {cs.location}</p>
                            <p className="text-xs text-white/70">Live GSC screen recording</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`flex flex-col p-8 lg:p-10 ${videoLeft ? "" : "lg:order-1"}`}>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-widest"
                          style={{ backgroundColor: cs.badgeBg, color: cs.badgeColor }}>{cs.seoType}</span>
                        <span className="flex items-center gap-1 text-xs text-[#64748b]">
                          <MapPin className="h-3.5 w-3.5" />{cs.location}
                        </span>
                      </div>
                      <h3 className="mb-6 text-xl font-black leading-snug text-[#0a0f2e]">{cs.headline}</h3>
                      <div className="space-y-4">
                        <FSO label="Challenge" color="#ef4444" text={cs.challenge} />
                        <FSO label="Solution" color={GREEN_DARK} text={cs.solution} />
                        <FSO label="Outcome" color={PURPLE} text={cs.outcome} />
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {cs.metrics.map((m) => (
                          <span key={m.l} className="inline-flex items-baseline gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold"
                            style={{ borderColor: "rgba(62,180,137,0.3)", background: "rgba(62,180,137,0.08)", color: GREEN_DARK }}>
                            <span className="text-sm font-black">{m.v}</span> {m.l}
                          </span>
                        ))}
                      </div>
                      <Link href={detailUrl(cs)}
                        className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                        style={{ background: NAVY }}>
                        Read full case study <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}
 
      {/* ━━━ 5 · FILTERED GRID ━━━ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!isFiltering && (
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: GREEN }}>More results</p>
              <h2 className="text-4xl font-black text-[#0a0f2e] md:text-5xl">Complete Portfolio</h2>
            </div>
          )}
 
          {gridStudies.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-[#e2e8f0] bg-white p-10 text-center">
              <p className="mb-2 text-lg font-bold text-[#0a0f2e]">No case studies match these filters yet.</p>
              <p className="mb-6 text-sm text-[#64748b]">Clear the filters to see everything, or get a free reality check on your own site.</p>
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all hover:scale-[1.03]"
                style={{ borderColor: PURPLE, color: PURPLE }}>
                <RotateCcw className="h-4 w-4" /> Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {gridStudies.map((cs) => (
                  <motion.div key={cs.id} layout
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <Link href={detailUrl(cs)}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0f2e]">
                        {cs.video ? (
                          <img src={`https://img.youtube.com/vi/${cs.video}/hqdefault.jpg`} alt={cs.client}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        ) : cs.image ? (
                          <img src={cs.image} alt={cs.client}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${PURPLE}, #3C3489)` }}>
                            <span className="text-xl font-black text-white">{cs.client}</span>
                          </div>
                        )}
                        <span className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                          style={{ backgroundColor: cs.badgeBg, color: cs.badgeColor }}>{cs.seoType}</span>
 
                        {/* Overlay CTA — always visible on mobile (no hover on touch), hover-reveal on desktop */}
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0a0f2e]/90 via-[#0a0f2e]/30 to-transparent pb-5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                          <span className="inline-flex translate-y-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 sm:translate-y-3 sm:group-hover:translate-y-0"
                            style={{ background: GREEN }}>
                            View Full Case Study <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="mb-1 flex items-center gap-1 text-xs text-[#64748b]">
                          <MapPin className="h-3 w-3" />{cs.location}
                        </p>
                        <h3 className="mb-4 text-base font-bold leading-snug text-[#0a0f2e]">{cs.headline}</h3>
 
                        {/* Hero metric (big) + secondary chips — agency style */}
                        <div className="mt-auto">
                          <div className="flex items-baseline gap-2 border-t border-[#f1f5f9] pt-4">
                            <span className="text-3xl font-black leading-none" style={{ color: GREEN }}>
                              {cs.metrics[0].v}
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                              {cs.metrics[0].l}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {cs.metrics.slice(1, 3).map((m) => (
                              <span key={m.l} className="rounded-md px-2 py-1 text-[11px] font-semibold"
                                style={{ background: "rgba(62,180,137,0.1)", color: GREEN_DARK }}>
                                <span className="font-black">{m.v}</span> {m.l}
                              </span>
                            ))}
                          </div>
                        </div>
 
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold transition-colors"
                          style={{ color: GREEN_DARK }}>
                          View case study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
 
      {/* ━━━ 6 · FAQ ━━━ */}
      <section className="bg-[#f8f9fc] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: GREEN }}>Good to know</p>
            <h2 className="text-3xl font-black text-[#0a0f2e] md:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
 
      {/* ━━━ 7 · FOUNDER · E-E-A-T BLOCK (last) ━━━ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-8 md:p-10">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-3xl font-black text-white"
                style={{ background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})` }}>MS</div>
              <div className="flex-1">
                <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
                  <h3 className="text-2xl font-black text-[#0a0f2e]">Mubashar Shahzad</h3>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-bold transition-all hover:scale-105"
                    style={{ borderColor: "#0a66c2", color: "#0a66c2" }}>
                    <Linkedin className="h-3.5 w-3.5" /> Verified on LinkedIn
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold"
                    style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified SEO Expert
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold"
                    style={{ background: "rgba(83,74,183,0.12)", color: PURPLE }}>Content Strategist</span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#475569]">
                  Founder of SearchPrex. Over 5 years delivering results for local, ecommerce and service
                  businesses across the US and worldwide — specializing in local, international, technical,
                  ecommerce and law firm SEO, plus AEO and AI Overview optimization.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-xs font-semibold text-[#475569]">Semrush certified</span>
                  <span className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-xs font-semibold text-[#475569]">HubSpot certified</span>
                  <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-xs font-semibold text-[#475569] transition-colors hover:border-green-300">
                    <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ━━━ 8 · FINAL CTA ━━━ */}
      <section className="relative overflow-hidden py-20"
        style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})` }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">Want results like these?</h2>
          <p className="mb-10 text-lg text-white/90">
            Get a free reality check — the founder personally reviews your site and shows you exactly
            what&apos;s holding it back, with a 90-day growth plan. No tools, no juniors, no fluff.
          </p>
          <button onClick={openModal}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#0a0f2e] transition-all hover:scale-[1.03]">
            <BarChart3 className="h-5 w-5" /> Reality Check
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>
 
      {/* ━━━ FLOATING STICKY CTA ━━━ */}
      <button onClick={openModal}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5"
        style={{ background: GREEN }}>
        <BarChart3 className="h-4 w-4" /> Reality Check
      </button>
 
      {/* ━━━ REALITY CHECK MODAL ━━━ */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white p-8">
              {formState !== "sent" ? (
                <>
                  <div className="mb-2 flex justify-end">
                    <button onClick={() => setShowModal(false)} className="text-[#64748b] hover:text-[#0a0f2e]" aria-label="Close">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-3xl font-black text-[#0a0f2e]">Reality Check</h2>
                    <p className="text-[#475569]">Get a free, founder-reviewed SEO audit of your site within 24 hours.</p>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Your name" className={inputCls}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input type="email" placeholder="Email address" className={inputCls}
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input type="url" placeholder="Website URL" className={inputCls}
                      value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                    <input type="tel" placeholder="Phone number" className={inputCls}
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    {formState === "error" && (
                      <p className="text-sm font-semibold text-red-600">
                        Something went wrong sending that. Please try again, or email contact@searchprex.com.
                      </p>
                    )}
                    <button onClick={submit} disabled={formState === "sending"}
                      className="w-full rounded-lg py-3 font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                      style={{ background: GREEN }}>
                      {formState === "sending" ? "Sending…" : "Get my reality check →"}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12" style={{ color: GREEN }} />
                  <h3 className="mb-2 text-2xl font-black text-[#0a0f2e]">Request received</h3>
                  <p className="text-[#475569]">Check your email within 24 hours for your reality check report.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* ━━━ VIDEO MODAL ━━━ */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="SearchPrex case study"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
 
/* ── Small presentational helpers ── */
function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick}
      className="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
      style={
        active
          ? { background: PURPLE, color: "#fff" }
          : { background: "#fff", color: "#475569", border: "1px solid #e2e8f0" }
      }>
      {label}
    </button>
  );
}
 
function FSO({ label, color, text }: { label: string; color: string; text?: string }) {
  if (!text) return null;
  return (
    <div>
      <p className="mb-1 text-sm font-bold" style={{ color }}>{label}</p>
      <p className="text-sm leading-relaxed text-[#475569]">{text}</p>
    </div>
  );
}
 
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-bold text-[#0a0f2e]">{q}</span>
        <ChevronDown className={`h-5 w-5 flex-shrink-0 text-[#64748b] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#475569]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 