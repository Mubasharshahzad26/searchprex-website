"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, CheckCircle, Play, X, Phone, ShieldCheck,
  Linkedin, BadgeCheck, Filter, MapPin, ChevronDown, BarChart3,
  Youtube, RotateCcw, ExternalLink,
} from "lucide-react";
import {
  caseStudies, featuredStudies, seoTypeOptions, industryOptions,
  detailUrl, FAQS, type CaseStudy,
} from "./data";

/* ── Brand (Semrush-style: neutral base, green as single accent) ── */
const ACCENT = "#3eb489";
const ACCENT_DARK = "#2f9670";
const INK = "#191a1f";       // near-black text
const SLATE = "#65676e";     // secondary text
const LINE = "#e6e7eb";      // hairline borders
const PAPER = "#f7f7f8";     // section backgrounds

const PHONE = "+923106526316";
const PHONE_DISPLAY = "+92 310 652 6316";

/* Fallback stock images (Unsplash) for case studies without cs.image */
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
];
const fallbackFor = (seed: string | number) => {
  const s = String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[h % FALLBACK_IMAGES.length];
};
const cardImage = (cs: CaseStudy) =>
  cs.video
    ? `https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`
    : cs.image ?? fallbackFor(cs.id);

const bigStats = [
  { v: "20+", l: "Clients worldwide" },
  { v: "+476%", l: "Organic clicks" },
  { v: "+285%", l: "Indexing rate" },
  { v: "12K+", l: "Pages indexed" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
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
    "w-full px-4 py-3 rounded-md border border-[#e6e7eb] outline-none focus:ring-2 focus:ring-[#3eb489] transition-shadow text-sm";

  const CTA = ({ className = "", label = "Get a reality check" }: { className?: string; label?: string }) => (
    <button
      onClick={openModal}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition-all hover:opacity-90 ${className}`}
      style={{ background: INK }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );

  return (
    <main className="bg-white">

      {/* ━━━ 1 · HERO (minimal, Semrush-style) ━━━ */}
      <section className="border-b border-[#e6e7eb] pt-24 pb-16 sm:pt-28">
        <motion.div initial="hidden" animate="show" variants={stagger}
          className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6e7eb] px-4 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#65676e]">
              Verified Google Search Console data
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp}
            className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#191a1f] sm:text-5xl md:text-[56px]">
            Customer stories worth exploring
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-[#65676e]">
            Real clients, real clicks, real revenue — filter by industry and SEO
            type to see exactly how we do it.
          </motion.p>
          <motion.div variants={fadeUp}>
            <CTA className="px-7 py-3.5 text-[15px]" />
          </motion.div>
        </motion.div>

        {/* Stat strip */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 px-4 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {bigStats.map((s, i) => (
            <div key={i} className={i > 0 ? "sm:border-l sm:border-[#e6e7eb]" : ""}>
              <p className="text-3xl font-bold text-[#191a1f] sm:text-4xl">{s.v}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-[#65676e]">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ━━━ 2 · FILTER BAR ━━━ */}
      <section className="border-b border-[#e6e7eb] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-[#65676e]" />
            <span className="text-xs font-semibold uppercase tracking-wide text-[#65676e]">SEO type</span>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            <FilterPill active={typeFilter === "all"} onClick={() => setParam("type", "all")} label="All types" />
            {seoTypeOptions().map((t) => (
              <FilterPill key={t} active={typeFilter === slugify(t)}
                onClick={() => setParam("type", slugify(t))} label={t} />
            ))}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#65676e]" />
            <span className="text-xs font-semibold uppercase tracking-wide text-[#65676e]">Industry</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterPill active={industryFilter === "all"} onClick={() => setParam("industry", "all")} label="All industries" />
            {industryOptions().map((ind) => (
              <FilterPill key={ind} active={industryFilter === slugify(ind)}
                onClick={() => setParam("industry", slugify(ind))} label={ind} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-[#65676e]">
              Showing <span className="font-semibold text-[#191a1f]">{filtered.length}</span> of {caseStudies.length}
            </p>
            {isFiltering && (
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#191a1f] transition-opacity hover:opacity-70">
                <RotateCcw className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ━━━ 3 · FEATURED — large image cards (Semrush hero-card style) ━━━ */}
      {!isFiltering && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-2xl font-bold text-[#191a1f] sm:text-3xl">Featured results</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((cs, i) => (
                <motion.div key={cs.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
                  <FeaturedCard cs={cs} tall={i === 0} onPlay={() => cs.video && setActiveVideo(cs.video)} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ 4 · GRID — full portfolio ━━━ */}
      <section className="py-20" style={{ background: PAPER }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!isFiltering && (
            <h2 className="mb-10 text-2xl font-bold text-[#191a1f] sm:text-3xl">More wins worth exploring</h2>
          )}

          {gridStudies.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-[#e6e7eb] bg-white p-10 text-center">
              <p className="mb-2 text-lg font-bold text-[#191a1f]">No case studies match these filters yet.</p>
              <p className="mb-6 text-sm text-[#65676e]">Clear the filters to see everything, or get a free reality check on your own site.</p>
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#191a1f] px-5 py-2.5 text-sm font-bold text-[#191a1f] transition-all hover:opacity-80">
                <RotateCcw className="h-4 w-4" /> Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {gridStudies.map((cs) => (
                  <motion.div key={cs.id} layout
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
                    <GridCard cs={cs} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ━━━ 5 · FAQ ━━━ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#191a1f] sm:text-3xl">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ━━━ 6 · FOUNDER ━━━ */}
      <section className="border-t border-[#e6e7eb] py-20" style={{ background: PAPER }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#e6e7eb] bg-white p-8 md:p-10">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: INK }}>MS</div>
              <div className="flex-1">
                <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
                  <h3 className="text-xl font-bold text-[#191a1f]">Mubashar Shahzad</h3>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e7eb] px-3 py-1 text-xs font-semibold text-[#0a66c2] transition-all hover:bg-[#f0f6fc]">
                    <Linkedin className="h-3.5 w-3.5" /> Verified on LinkedIn
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: "rgba(62,180,137,0.12)", color: ACCENT_DARK }}>
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified SEO Expert
                  </span>
                  <span className="rounded-full border border-[#e6e7eb] px-3 py-1 text-xs font-semibold text-[#65676e]">Content Strategist</span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#65676e]">
                  Founder of SearchPrex. Over 5 years delivering results for local, ecommerce and service
                  businesses across the US and worldwide — specializing in local, international, technical,
                  ecommerce and law firm SEO, plus AEO and AI Overview optimization.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-full border border-[#e6e7eb] px-3 py-1.5 text-xs font-semibold text-[#65676e]">Semrush certified</span>
                  <span className="rounded-full border border-[#e6e7eb] px-3 py-1.5 text-xs font-semibold text-[#65676e]">HubSpot certified</span>
                  <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e7eb] px-3 py-1.5 text-xs font-semibold text-[#65676e] transition-colors hover:border-[#3eb489]">
                    <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 7 · FINAL CTA (minimal, black band) ━━━ */}
      <section className="py-24" style={{ background: INK }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Want results like these?</h2>
          <p className="mb-9 text-[17px] leading-relaxed text-white/70">
            Get a free reality check — the founder personally reviews your site and shows you exactly
            what&apos;s holding it back, with a 90-day growth plan.
          </p>
          <button onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#191a1f] transition-all hover:opacity-90">
            Reality Check <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </section>

      {/* ━━━ FLOATING STICKY CTA ━━━ */}
      <button onClick={openModal}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:opacity-90 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5"
        style={{ background: INK }}>
        <BarChart3 className="h-4 w-4" /> Reality Check
      </button>

      {/* ━━━ REALITY CHECK MODAL ━━━ */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-8">
              {formState !== "sent" ? (
                <>
                  <div className="mb-2 flex justify-end">
                    <button onClick={() => setShowModal(false)} className="text-[#65676e] hover:text-[#191a1f]" aria-label="Close">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-[#191a1f]">Reality Check</h2>
                    <p className="text-[#65676e]">Get a free, founder-reviewed SEO audit of your site within 24 hours.</p>
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
                      className="w-full rounded-full py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: INK }}>
                      {formState === "sending" ? "Sending…" : "Get my reality check →"}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12" style={{ color: ACCENT }} />
                  <h3 className="mb-2 text-2xl font-bold text-[#191a1f]">Request received</h3>
                  <p className="text-[#65676e]">Check your email within 24 hours for your reality check report.</p>
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

/* ── Featured card (large, image-first, stat overlay — Semrush style) ── */
function FeaturedCard({ cs, tall, onPlay }: { cs: CaseStudy; tall: boolean; onPlay: () => void }) {
  const img = cardImage(cs);
  const CardInner = (
    <div className={`group relative w-full overflow-hidden rounded-2xl bg-[#191a1f] ${tall ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-[4/3]"}`}>
      <img src={img} alt={cs.client}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { (e.target as HTMLImageElement).src = fallbackFor(cs.id); }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {cs.video && (
        <button onClick={(e) => { e.preventDefault(); onPlay(); }}
          className="absolute left-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:scale-110">
          <Play className="ml-0.5 h-4 w-4 fill-[#191a1f] text-[#191a1f]" />
        </button>
      )}

      <span className="absolute right-5 top-5 z-20 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#191a1f] backdrop-blur">
        {cs.seoType}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-20 p-6">
        <p className="mb-2 flex items-center gap-1 text-xs text-white/70">
          <MapPin className="h-3 w-3" />{cs.location}
        </p>
        <h3 className="mb-4 text-xl font-bold leading-snug text-white sm:text-2xl">{cs.headline}</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {cs.metrics.slice(0, 3).map((m) => (
            <span key={m.l} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <span className="font-bold" style={{ color: ACCENT }}>{m.v}</span> {m.l}
            </span>
          ))}
        </div>
        {cs.demoLink && (
          <a href={cs.demoLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
            Live demo <ExternalLink className="h-3 w-3" />
          </a>
        )}
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
          Read full case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );

  return <Link href={detailUrl(cs)}>{CardInner}</Link>;
}

/* ── Grid card (compact, image-first) ── */
function GridCard({ cs }: { cs: CaseStudy }) {
  const img = cardImage(cs);
  return (
    <Link href={detailUrl(cs)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e6e7eb] bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#191a1f]">
        <img src={img} alt={cs.client}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackFor(cs.id); }} />
        {cs.video && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90">
              <Play className="ml-0.5 h-4 w-4 fill-[#191a1f] text-[#191a1f]" />
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#191a1f]">
          {cs.seoType}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 flex items-center gap-1 text-xs text-[#65676e]">
          <MapPin className="h-3 w-3" />{cs.location}
        </p>
        <h3 className="mb-4 text-[15px] font-bold leading-snug text-[#191a1f]">{cs.headline}</h3>
        <div className="mt-auto flex items-baseline gap-2 border-t border-[#f1f1f2] pt-4">
          <span className="text-2xl font-bold leading-none" style={{ color: ACCENT_DARK }}>
            {cs.metrics[0].v}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-[#65676e]">
            {cs.metrics[0].l}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#191a1f] transition-opacity group-hover:opacity-70">
          View case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ── Small presentational helpers ── */
function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
      style={
        active
          ? { background: "#191a1f", color: "#fff" }
          : { background: "#fff", color: "#65676e", border: "1px solid #e6e7eb" }
      }>
      {label}
    </button>
  );
}

function FAQItem({ q, a }: { q: string; a?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-[#e6e7eb] bg-white">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-semibold text-[#191a1f]">{q}</span>
        <ChevronDown className={`h-5 w-5 flex-shrink-0 text-[#65676e] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#65676e]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}