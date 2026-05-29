"use client";
 
import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake, Globe, Search, Check, Building2, UserRound,
  ShoppingCart, MapPin, Target, ShieldCheck, TrendingUp,
  Store, Calendar, Loader2, AlertCircle, TrendingDown,
  Package, Ban, MapPinned, PhoneOff, EyeOff, Users, FileSearch,
} from "lucide-react";
 
/* ── Per-audience accent colors (theme-aligned, purple primary) ── */
const THEMES = {
  law:    { accent: "#2563eb", soft: "#eff6ff", border: "#bfdbfe", ring: "rgba(37,99,235,.12)" },
  lawyer: { accent: "#534AB7", soft: "#f5f3ff", border: "#ddd6fe", ring: "rgba(83,74,183,.12)" },
  eco:    { accent: "#0d9488", soft: "#f0fdfa", border: "#99f6e4", ring: "rgba(13,148,136,.12)" },
  loc:    { accent: "#ea580c", soft: "#fff7ed", border: "#fed7aa", ring: "rgba(234,88,12,.12)" },
} as const;
 
type ThemeKey = keyof typeof THEMES;
 
/* ── URL drop input (reusable) ── */
function UrlDrop({ placeholder, accent, cta }: { placeholder: string; accent: string; cta: string }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
 
  const submit = () => {
    if (!value.trim()) { setState("error"); return; }
    setState("loading");
    setTimeout(() => setState("done"), 1300);
  };
 
  return (
    <div
      className="flex items-center gap-2 rounded-xl border bg-white p-1.5 pl-3 transition-colors"
      style={{ borderColor: state === "error" ? "#ef4444" : accent + "55" }}
    >
      <Globe className="h-4 w-4 shrink-0" style={{ color: accent + "99" }} />
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value); if (state === "error") setState("idle"); }}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={placeholder}
        className="flex-1 border-none bg-transparent text-sm text-[#0a0f2e] outline-none placeholder:text-[#94a3b8]"
      />
      <button
        onClick={submit}
        disabled={state === "loading" || state === "done"}
        className="flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5 disabled:cursor-default"
        style={{ background: state === "done" ? "#16a34a" : accent }}
      >
        {state === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {state === "done" && <Check className="h-3.5 w-3.5" />}
        {(state === "idle" || state === "error") && <Search className="h-3.5 w-3.5" />}
        {state === "loading" ? "Analysing..." : state === "done" ? "Got it — reply in 24hrs" : cta}
      </button>
    </div>
  );
}
 
interface Pain { icon: React.ElementType; bold: string; text: string; }
interface Result { v: string; l: string; }
 
interface AudienceProps {
  themeKey: ThemeKey;
  reverse?: boolean;
  tagIcon: React.ElementType;
  tagText: string;
  headline: React.ReactNode;
  emphasis: string;
  paragraph: React.ReactNode;
  pains: Pain[];
  urlPlaceholder: string;
  urlCta: string;
  solIcon: React.ElementType;
  solTag: string;
  solTitle: string;
  solText: string;
  results?: Result[];
  features: string[];
  solCta: string;
  solCtaIcon: React.ElementType;
}
 
function Audience(p: AudienceProps) {
  const t = THEMES[p.themeKey];
  const Tag = p.tagIcon;
  const SolIcon = p.solIcon;
  const CtaIcon = p.solCtaIcon;
 
  return (
    <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white py-16">
      {/* soft blob */}
      <div
        className="pointer-events-none absolute h-80 w-80 rounded-full opacity-60 blur-3xl"
        style={{ background: t.soft, top: -80, [p.reverse ? "left" : "right"]: "3%" } as React.CSSProperties}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className={`grid items-start gap-9 lg:grid-cols-2 ${p.reverse ? "lg:[direction:rtl]" : ""}`}>
          {/* ── LEFT — copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:[direction:ltr]"
          >
            <div
              className="mb-4 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: t.soft, border: `1px solid ${t.border}`, color: t.accent }}
            >
              <Tag className="h-3.5 w-3.5" /> {p.tagText}
            </div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#94a3b8]">— Speaking directly to you</div>
            <h2 className="mb-3 text-3xl font-black leading-tight tracking-tight text-[#0a0f2e]">
              {p.headline}
            </h2>
            <p className="mb-3 border-l-[3px] pl-4 text-base font-bold leading-relaxed text-[#374151]" style={{ borderColor: t.accent + "80" }}>
              {p.emphasis}
            </p>
            <p className="mb-5 max-w-md text-sm leading-relaxed text-[#64748b]">{p.paragraph}</p>
 
            {/* pains */}
            <div className="mb-5 flex flex-col gap-1.5">
              {p.pains.map((pain) => {
                const PainIcon = pain.icon;
                return (
                  <div key={pain.bold} className="flex items-start gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2.5">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ background: t.soft }}
                    >
                      <PainIcon className="h-3.5 w-3.5" style={{ color: t.accent }} />
                    </span>
                    <div>
                      <strong className="block text-xs font-bold text-[#0a0f2e]">{pain.bold}</strong>
                      <span className="text-xs leading-relaxed text-[#64748b]">{pain.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
 
            <UrlDrop placeholder={p.urlPlaceholder} accent={t.accent} cta={p.urlCta} />
          </motion.div>
 
          {/* ── RIGHT — solution card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-lg lg:[direction:ltr]"
            style={{ borderColor: t.border, boxShadow: `0 12px 40px ${t.ring}` }}
          >
            <div className="absolute left-0 right-0 top-0 h-1" style={{ background: t.accent }} />
            <div className="mb-2.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: t.accent, fontFamily: "monospace" }}>
              <SolIcon className="h-3.5 w-3.5" /> {p.solTag}
            </div>
            <h3 className="mb-2 text-base font-extrabold leading-snug text-[#0a0f2e]">{p.solTitle}</h3>
            <p className="mb-4 text-xs leading-relaxed text-[#64748b]">{p.solText}</p>
 
            {/* results grid */}
            {p.results && (
              <div className="mb-4 grid grid-cols-2 gap-1.5">
                {p.results.map((r) => (
                  <div key={r.l} className="rounded-lg bg-[#f8fafc] px-2.5 py-2 text-center">
                    <div className="font-mono text-lg font-black leading-none" style={{ color: t.accent }}>{r.v}</div>
                    <div className="mt-1 text-[9px] uppercase tracking-wide text-[#94a3b8]">{r.l}</div>
                  </div>
                ))}
              </div>
            )}
 
            {/* features */}
            <div className="mb-4 flex flex-col gap-1.5">
              {p.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-[11px] text-[#64748b]">
                  <Check className="h-3.5 w-3.5 shrink-0" style={{ color: t.accent }} /> {f}
                </div>
              ))}
            </div>
 
            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-3 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: t.accent }}
            >
              <CtaIcon className="h-4 w-4" /> {p.solCta}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
 
/* ════════════════════════════════════════════════════════════ */
export default function AudienceSections() {
  return (
    <>
      {/* ── INTRO ── */}
      <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ backgroundImage: "linear-gradient(rgba(83,74,183,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(83,74,183,.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ddd6fe] bg-[#f5f3ff] px-3.5 py-1.5 text-[10px] font-semibold tracking-wide text-[#534AB7]">
              <HeartHandshake className="h-3 w-3" /> We understand your concerns — we came with solutions
            </div>
            <h2 className="mb-3 text-4xl font-black leading-tight tracking-tight text-[#0a0f2e]">
              We Know You&apos;re Stuck.{" "}
              <span className="text-[#534AB7]">We&apos;re Here</span> to Fix That.
            </h2>
            <p className="mb-7 max-w-xl text-sm leading-loose text-[#64748b]">
              You didn&apos;t start your business to worry about Google rankings, ad spend, or why competitors keep showing up above you.{" "}
              <strong className="text-[#0a0f2e]">You started it to grow, serve clients, and build something real.</strong>{" "}
              That&apos;s exactly what we help you do — through SEO that brings purchasing-intent customers straight to your door, every single month.
            </p>
 
            {/* URL DROP BOX */}
            <div className="max-w-xl rounded-2xl border border-[#ddd6fe] bg-[#fafaff] p-6">
              <div className="mb-1 text-sm font-bold text-[#0a0f2e]">We already know what&apos;s holding your website back.</div>
              <p className="mb-4 text-xs leading-relaxed text-[#64748b]">
                Drop your URL right here — we&apos;ll analyse it personally and tell you exactly where you&apos;re stuck, what&apos;s blocking your growth, and how we&apos;ll fix it.{" "}
                <strong className="text-[#0a0f2e]">No tools. No templates. Founder writes it personally.</strong>
              </p>
              <UrlDrop placeholder="Drop your website URL here — e.g. yoursite.com" accent="#534AB7" cta="Show me what's wrong" />
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-[#94a3b8]">
                {["Founder reviews personally", "Reply within 24 hours", "No login needed", "100% free"].map((m) => (
                  <span key={m} className="flex items-center gap-1"><Check className="h-3 w-3 text-[#16a34a]" /> {m}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
 
      {/* ── LAW FIRM OWNERS ── */}
      <Audience
        themeKey="law"
        tagIcon={Building2}
        tagText="Law Firm Owners"
        headline={<>Your competitors are stealing your clients <span style={{ color: "#2563eb" }}>on Google. Daily.</span></>}
        emphasis="You didn't go to law school to chase leads. You went to win cases. But if your firm isn't ranking on Google — someone else is getting the call."
        paragraph={<>You have an exceptional firm. You win cases. But when a family in Dallas searches &ldquo;family law attorney near me&rdquo; at 11pm in desperation — they call whoever ranks #1. Right now, that&apos;s your competitor. <strong className="text-[#0a0f2e]">We&apos;re here to change that permanently.</strong></>}
        pains={[
          { icon: TrendingDown, bold: "Stuck at the same revenue month after month?", text: "Your website gets traffic but barely any calls. Something's broken — you just don't know what." },
          { icon: AlertCircle, bold: "Burning $4K/mo on Google Ads with no ROI?", text: "The moment you pause, leads vanish. You're renting visibility — not owning it." },
          { icon: Building2, bold: "Smaller firms outranking you locally?", text: "You have the experience, the reviews, the credentials — yet they show up first. That ends today." },
        ]}
        urlPlaceholder="Drop your law firm URL — we'll find every gap" urlCta="Analyse my firm"
        solIcon={Target} solTag="Our Solution for Law Firms"
        solTitle="We Bring Purchasing-Intent Clients to Your Phone — Organically"
        solText='We rank your firm for the exact keywords people search when they NEED a lawyer right now — "personal injury attorney [city]", "divorce lawyer near me". High intent. Ready to hire. Coming to YOU.'
        results={[
          { v: "#1", l: "Dallas Family Law" }, { v: "47", l: "Leads/month" },
          { v: "+380%", l: "Organic visibility" }, { v: "6wks", l: "To rank #1" },
        ]}
        features={["Legal E-E-A-T content Google trusts", "Attorney schema + Google Business Profile", "Local map pack domination in your city", "Weekly ranking reports — full transparency"]}
        solCta="Book Free Law Firm SEO Call" solCtaIcon={Calendar}
      />
 
      {/* ── INDIVIDUAL LAWYERS ── */}
      <Audience
        themeKey="lawyer" reverse
        tagIcon={UserRound}
        tagText="Individual Lawyers"
        headline={<>You&apos;re the expert. Google should say <span style={{ color: "#534AB7" }}>so too.</span></>}
        emphasis="You've built your reputation case by case. But online, your reputation means nothing if Google can't find you. Your next 10 clients are searching right now — and not finding you."
        paragraph={<>Solo practitioners face the hardest SEO battle — big firms with big budgets dominate page one. But <strong className="text-[#0a0f2e]">Google rewards authority, relevance, and trust — not budget.</strong> We build exactly that around you personally.</>}
        pains={[
          { icon: Users, bold: "Big firms dominating your local search?", text: "You have the expertise they don't — but their SEO budget buries you. We level the playing field." },
          { icon: TrendingDown, bold: "Relying purely on referrals?", text: "Referrals dry up. Google never does. We build you a 24/7 lead channel that works while you're in court." },
          { icon: FileSearch, bold: "No online presence worth mentioning?", text: "If a potential client Googles your name and finds nothing compelling — they move on. We fix that." },
        ]}
        urlPlaceholder="Drop your website URL — we'll show you what clients see" urlCta="Analyse my profile"
        solIcon={ShieldCheck} solTag="Our Solution for Solo Lawyers"
        solTitle="We Build Your Personal Authority Online — So Clients Choose You, Not the Big Firm"
        solText="We create a powerful personal brand online — optimized attorney profile, targeted local keywords, review strategy, and Google Business Profile that positions YOU as the go-to expert in your city."
        features={["Personal brand SEO — YOU rank, not just your firm", "Practice-area keyword domination in your city", "Google review strategy — build trust at scale", "Outrank big firms with smarter E-E-A-T signals", "24/7 lead channel — works while you're in court"]}
        solCta="Book My Free Strategy Call" solCtaIcon={Calendar}
      />
 
      {/* ── ECOMMERCE ── */}
      <Audience
        themeKey="eco"
        tagIcon={ShoppingCart}
        tagText="Ecommerce Store Owners"
        headline={<>Your ad spend is a leak. SEO <span style={{ color: "#0d9488" }}>is the fix.</span></>}
        emphasis="You're spending $5,000/mo on Meta and Google Ads just to break even. And every month, that number has to go up to get the same results. There is a better way — and it pays you back forever."
        paragraph={<>The best Shopify stores don&apos;t rely on paid ads forever. They build organic traffic that compounds — products ranking on Google, <strong className="text-[#0a0f2e]">customers finding you without you paying for every single click.</strong></>}
        pains={[
          { icon: AlertCircle, bold: "Paying for every click with shrinking margins?", text: "Meta CPMs up 40%. Google Ads more competitive than ever. Organic SEO costs once — earns forever." },
          { icon: Package, bold: "Products sitting invisible on Google?", text: "You have great products — but if they're not indexed and ranked, they might as well not exist online." },
          { icon: Ban, bold: "Shopify SEO too technical to figure out?", text: "Collection pages, product schema, crawl budget, Core Web Vitals — we handle all of it." },
        ]}
        urlPlaceholder="Drop your store URL — we'll find every revenue leak" urlCta="Analyse my store"
        solIcon={TrendingUp} solTag="Our Solution for Ecommerce"
        solTitle="We Turn Google Into Your Highest-ROI Sales Channel — Forever"
        solText="We fix your Shopify SEO foundation, rank your collection and product pages for buying-intent keywords, and build the authority that brings in customers who are ready to purchase — not just browse."
        results={[
          { v: "+285%", l: "Revenue growth" }, { v: "9.4K", l: "Visitors/month" },
          { v: "+683%", l: "Traffic growth" }, { v: "$124K", l: "Added revenue" },
        ]}
        features={["Shopify technical SEO — crawlability & indexation", "Product & collection schema at scale", "Buying-intent keyword strategy per category", "Core Web Vitals — speed that converts"]}
        solCta="Double My Store Revenue" solCtaIcon={Calendar}
      />
 
      {/* ── LOCAL BUSINESSES ── */}
      <Audience
        themeKey="loc" reverse
        tagIcon={MapPin}
        tagText="Local Business Founders"
        headline={<>Your city has customers ready. <span style={{ color: "#ea580c" }}>They can&apos;t find you.</span></>}
        emphasis="You built a great local business. You serve your community well. But if someone in Dallas searches for what you offer right now — are they finding YOU or your competitor? We'll make sure it's you."
        paragraph={<>People in your city are searching for exactly what you offer — right now, on Google Maps. <strong className="text-[#0a0f2e]">We get your business in front of them at the exact moment they&apos;re ready to buy.</strong> Local SEO. Map pack. Done right.</>}
        pains={[
          { icon: MapPinned, bold: "Not showing up on Google Maps?", text: "70% of local searches end in a store visit within 24 hours. If you're not on the map — you're invisible." },
          { icon: PhoneOff, bold: "Phone not ringing despite good reviews?", text: "If your Google Business Profile isn't optimized, you're still buried under competitors with fewer reviews." },
          { icon: EyeOff, bold: "Your brand invisible in your own city?", text: "Your message should reach every corner of Dallas — every neighborhood, every search. Right now it doesn't." },
        ]}
        urlPlaceholder="Drop your business URL — we'll audit your local presence" urlCta="Find my blind spots"
        solIcon={Store} solTag="Our Solution for Local Businesses"
        solTitle="We Put Your Business In Front of Ready-to-Buy Customers In Your City — Every Day"
        solText="We dominate your local search presence — Google Maps, Business Profile, local keywords, citation networks across Dallas TX. Your brand reaches every corner of your city, multiplying visibility and revenue."
        results={[
          { v: "+5.7x", l: "Clicks in 60 days" }, { v: "3.85K", l: "Pages indexed" },
          { v: "#1", l: "Local map pack" }, { v: "98%", l: "Client retention" },
        ]}
        features={["Google Business Profile — full optimization", "Local map pack domination in your area", "Citation network — every directory in your city", "Reputation management & review strategy", "Buyer-intent local keywords — neighbourhood level"]}
        solCta="Own My City on Google" solCtaIcon={MapPin}
      />
    </>
  );
}