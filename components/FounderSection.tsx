"use client";
 
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ExternalLink, Star, Users, Clock, TrendingUp, Award, ArrowRight } from "lucide-react";
import { OFFER_HREF, OFFER_CTA, OFFER_MICROCOPY } from "@/lib/offer";
 
/* Toptal green accent */
const GREEN = "#3eb489";
 
const credentials = [
  {
    label: "Technical SEO & AI Search",
    sub: "Expires Oct 2026",
    color: "#185FA5",
    bg: "#E6F1FB",
    href: "https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf",
  },
  {
    label: "AI-Powered Marketer",
    sub: "Expires Oct 2026",
    color: "#196b4d",
    bg: "#E1F5EE",
    href: "https://static.semrush.com/academy/certificates/e2cb11d7cb/mubashar-shahzad_26.pdf",
  },
  {
    label: "Digital PR with Brian Dean",
    sub: "Expires Oct 2026",
    color: "#27500A",
    bg: "#EAF3DE",
    href: "https://static.semrush.com/academy/certificates/7ec9b0d154/mubashar-shahzad_2.pdf",
  },
  {
    label: "PPC Automation",
    sub: "Semrush Academy",
    color: "#712B13",
    bg: "#FAECE7",
    href: "https://static.semrush.com/academy/certificates/0053423184/mubashar-shahzad_2.pdf",
  },
];
 
/* Real, first-hand case results — E-E-A-T "Experience" signal */
const caseResults = [
  {
    client: "Michigan Sports Outdoor",
    tag: "Ecommerce · USA",
    metric: "+285%",
    label: "Indexed pages (≈3K → 11.5K, May–Jul 2026)",
  },
  {
    // Was "+75% revenue growth in 2 months", which no export supported. The
    // client's own WooCommerce captures show $5,832.02 -> $19,100.71 monthly
    // net sales, so the real figure is +227%. Note this is TOTAL store
    // revenue, not US-only — the dashboard does not segment by country.
    client: "SMK Store",
    tag: "Tactical Gear · USA",
    metric: "+227%",
    label: "Monthly store revenue ($5,832 → $19,100)",
  },
  {
    client: "Local HVAC Services",
    tag: "Local SEO · USA",
    metric: "Top 3",
    label: "Map pack + AI Overview placement",
  },
];
 
const whyFounder = [
  { icon: Users, title: "You talk to me, not an account manager", sub: "Direct line to the person doing the work — no juniors, no hand-offs" },
  { icon: Clock, title: "Weekly reporting, not monthly", sub: "Every week: what I did, what moved, what is next — from real GSC and GA4 data" },
  { icon: TrendingUp, title: "Measured on revenue, not rankings", sub: "SMK Store went $5,832 → $19,100 monthly. That is the number that counts" },
];
 
const profileLinks = [
  {
    href: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
    label: "LinkedIn",
    bg: "#E6F1FB",
    textColor: "#0C447C",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.upwork.com/freelancers/~01400266ea842005be",
    label: "Upwork",
    bg: "#EAF3DE",
    textColor: "#27500A",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.438-5.439-5.438z" />
      </svg>
    ),
  },
  {
    href: "https://www.researchgate.net/profile/Mubashar-Shahzad-4",
    label: "ResearchGate",
    bg: "#FAECE7",
    textColor: "#712B13",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53c.025.147.064.294.112.437.243.744.65 1.303 1.213 1.68.565.376 1.255.564 2.073.564.818 0 1.508-.188 2.073-.563.563-.377.97-.937 1.213-1.68a3.193 3.193 0 0 0 .112-.438c.036-.168.06-.346.078-.529a9 9 0 0 0 .05-.727c.01-.282.013-.622.013-1.017 0-.395-.003-.734-.013-1.016a9 9 0 0 0-.05-.727 7.99 7.99 0 0 0-.078-.53 3.193 3.193 0 0 0-.112-.437c-.243-.744-.65-1.303-1.213-1.68C21.094.19 20.404 0 19.586 0z" />
      </svg>
    ),
  },
  {
    href: "https://medium.com/@mubasharshahzad726",
    label: "Medium",
    bg: "#F1EFE8",
    textColor: "#2C2C2A",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    href: "https://www.remotehub.com/mubashar.shahzad",
    label: "RemoteHub",
    bg: "#EEEDFE",
    textColor: "#3C3489",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3a7 7 0 100 14A7 7 0 0012 7z" />
      </svg>
    ),
  },
];
 
export default function FounderSection() {
  return (
    // Reworked into the same language as the rest of the page: flat token
    // ground, hairline-bordered white cards at 12px with the soft
    // 0 2px 12px shadow, and one accent instead of five.
    //
    // What went, and why:
    //   - two gradient top-bars (purple -> green) and a gradient CTA button.
    //     Semrush uses flat solid fills; a gradient reads as dated chrome next
    //     to everything else here.
    //   - the blurred blob behind the CTA card. Decoration on a credibility
    //     block buys nothing.
    //   - four pastel certificate chips and five pastel profile chips, each in
    //     its own hue. Nine background colours in one section made a list of
    //     verifiable credentials look like a sticker sheet; they are neutral
    //     rows now, which reads as a record.
    <section className="border-y border-[#e6e8f0] bg-[#f8f9fc] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">
            Founder-led &middot; E-E-A-T verified
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            You&apos;ll be working with me, not a team
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#566070]">
            Every strategy here comes from campaigns I ran myself for US ecommerce, law firm
            and local clients &mdash; and every credential below opens the certificate that
            proves it.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-[#e6e8f0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
          >
            <div className="border-b border-[#eef0f6] p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/mubashar-shahzad.jpg"
                    alt="Mubashar Shahzad, Founder and CEO of SearchPrex"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-[#0a0f2e]">Mubashar Shahzad</h3>
                  <p className="text-sm text-[#566070]">
                    Founder &amp; CEO &middot; SearchPrex &mdash; SEO Analyst, 5+ years
                  </p>
                  <div className="mt-1.5 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#EF9F27] text-[#EF9F27]" />
                    ))}
                    <span className="ml-1 text-xs text-[#566070]">Upwork Top Rated</span>
                  </div>
                </div>
              </div>

              <blockquote
                className="mt-6 border-l-2 pl-4 text-sm leading-relaxed text-[#566070]"
                style={{ borderColor: GREEN }}
              >
                &ldquo;Over the last 5+ years I&apos;ve personally fixed mass non-indexing on a
                35,000-product ecommerce catalog and taken Michigan Outdoor Sports from roughly
                3,000 to 11,549 indexed pages between May and July 2026 &mdash; a 285% increase,
                with US organic clicks up 83% over the same period. Every number I publish comes
                from a Search Console export I can show you.&rdquo;
              </blockquote>
            </div>

            {/* Certificates: a checkable list, not a sticker sheet */}
            <div className="border-b border-[#eef0f6] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                Semrush certified &mdash; click to verify
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {credentials.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 rounded-lg border border-[#e6e8f0] bg-white px-3 py-2.5 transition-colors hover:border-[#534AB7]/40 hover:bg-[#fafbfd]"
                  >
                    <CheckCircle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: c.color }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-snug text-[#0a0f2e]">
                        {c.label}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-[#566070]">
                        {c.sub}
                        <ExternalLink className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                Find me online
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profileLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#e6e8f0] px-3 py-2 text-xs font-bold text-[#0a0f2e] transition-colors hover:border-[#534AB7]/40 hover:bg-[#fafbfd]"
                  >
                    <span style={{ color: link.textColor }}>{link.icon}</span>
                    {link.label}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results, reasons, offer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col gap-6"
          >
            <div className="overflow-hidden rounded-xl border border-[#e6e8f0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 border-b border-[#eef0f6] px-6 py-4">
                <Award className="h-4 w-4" style={{ color: "#196b4d" }} aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#0a0f2e]">
                  Real results I&apos;ve delivered
                </h3>
              </div>
              <div className="divide-y divide-[#eef0f6]">
                {caseResults.map((c) => (
                  <div key={c.client} className="flex items-center gap-4 px-6 py-4">
                    <span
                      className="w-[76px] shrink-0 text-2xl font-black tabular-nums tracking-tight"
                      style={{ color: "#196b4d" }}
                    >
                      {c.metric}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-[#0a0f2e]">{c.client}</span>
                      <span className="mt-0.5 block text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                        {c.tag}
                      </span>
                      <span className="mt-1 block text-xs text-[#566070]">{c.label}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#eef0f6] bg-[#fafbfd] px-6 py-3.5">
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center gap-1.5 text-sm font-bold"
                  style={{ color: "#196b4d" }}
                >
                  See full case studies
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-[#e6e8f0] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:p-7">
              <h3 className="text-xl font-bold text-[#0a0f2e]">
                Why work directly with the founder?
              </h3>
              <div className="mt-5 flex flex-col gap-5">
                {whyFounder.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "rgba(62,180,137,0.12)" }}
                    >
                      <item.icon className="h-[18px] w-[18px]" style={{ color: "#196b4d" }} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-[#0a0f2e]">{item.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-[#566070]">
                        {item.sub}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer: flat ink panel, solid button */}
            <div className="rounded-xl bg-[#0a0f2e] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                Want me to look at your site?
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                I&apos;ll audit it myself and send the fix list
              </p>
              <Link
                href={OFFER_HREF}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a7d59] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#196b4d]"
              >
                {OFFER_CTA}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-white/70">{OFFER_MICROCOPY}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
