"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { OFFER_HREF, OFFER_CTA } from "@/lib/offer";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { PaymentIconsRow } from "./PaymentTrustBadges";
 
const DARK_GREY = "#171717";
 
// Ranges come from lib/pricing.ts, which /pricing's schema and meta
// description also read, so the numbers cannot drift between them.
const plans = RETAINER_PLANS;
 
export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-24 border-y border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* Header — meaningful, specific */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-900">
            Pricing
          </span>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
            Transparent Monthly Retainers Based on What Your Site Actually Needs
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            No fixed tiers. I set your exact plan after a free audit — here&apos;s a realistic monthly ballpark by service.
          </p>
        </motion.div>
 
        {/* 3 concise range cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.niche}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border-2 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                p.featured ? "border-neutral-900 shadow-lg" : "border-slate-200"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-neutral-900 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    Most popular
                  </span>
                </div>
              )}
              <span className="rounded-lg px-3 py-1 text-xs font-bold" style={{ backgroundColor: p.bg, color: p.accent }}>
                {p.niche}
              </span>
              <div className="mt-4 text-2xl font-black text-neutral-950">
                {formatRange(p)}<span className="text-sm font-bold text-slate-500"> / mo</span>
              </div>
              <p className="mb-5 mt-1 text-xs text-slate-600">Best for: {p.best}</p>
              <ul className="mb-6 space-y-2">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 shrink-0 text-neutral-900" />{item}
                  </li>
                ))}
              </ul>
              <Link
                href={OFFER_HREF}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={p.featured ? { backgroundColor: DARK_GREY, color: "#fff" } : { backgroundColor: p.bg, color: p.accent }}
              >
                Start with a free audit <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
 
        {/* Link to full pricing page — keeps homepage concise */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link
            href={OFFER_HREF}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            {OFFER_CTA} <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-xs text-slate-600">
            Final pricing is set after your free audit · month-to-month, no lock-in
          </p>
          <div className="mt-2 flex flex-col items-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Accepted B2B Payment Methods
            </p>
            <PaymentIconsRow className="scale-90" />
          </div>
          <Link
            href="/pricing"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-neutral-950 transition-all hover:gap-2.5"
          >
            See what&apos;s included, my process &amp; FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
 
      </div>
    </section>
  );
}
