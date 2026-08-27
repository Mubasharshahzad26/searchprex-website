"use client";

// components/Process.tsx
// "What happens after you submit."
//
// The homepage asked for an email three times without ever explaining the
// engagement. This section answers the first question every buyer holds —
// what actually happens next — and it sits between the services and the proof,
// so the offer is understood before it is evidenced.
//
// The numbering here is real: these are sequential stages, and the order is
// information the reader needs. Previously this component used an off-brand
// blue palette, promised 48 hours where the rest of the site promises 24, and
// linked to an anchor (#cta) that does not exist on any page.

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Map, LineChart, ArrowRight } from "lucide-react";
import { OFFER_HREF, OFFER_CTA, OFFER_MICROCOPY } from "@/lib/offer";

const PURPLE = "#534AB7";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Share your URL",
    timing: "Takes 60 seconds",
    description:
      "One field. No call required, no discovery questionnaire, nothing to install.",
  },
  {
    number: "02",
    icon: Map,
    title: "Quick reality check report",
    timing: "Back within 24 hours",
    description:
      "I audit the site myself and send a reality check report — indexing, technical issues, content gaps and where your US competitors are beating you, as a prioritized P1 / P2 / P3 list. Not a generic PDF, and not written by a junior.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Roadmap, then I start work",
    timing: "No contract, month to month",
    description:
      "You get the 90-day roadmap either way — run it yourself or I execute it personally, with weekly reporting on revenue, not vanity rankings. Pricing is set only after you have seen the work.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-y border-[#e9ecf5] bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header — left-aligned on purpose. Almost every other section on this
            page is centered; the variety is what tells a reader they've moved. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: PURPLE }}>
            How it works
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            What happens after you send me your URL
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5b6472]">
            Three steps, no surprises. You will know exactly what is wrong with your site
            before anyone asks you for a budget.
          </p>
        </motion.div>

        {/* Steps */}
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector — sits behind the icon, stops before the last item */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-14 top-6 hidden h-px w-full bg-[#e9ecf5] md:block"
                  aria-hidden="true"
                />
              )}

              <div className="relative mb-5 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${PURPLE}14` }}
                >
                  <step.icon className="h-5 w-5" style={{ color: PURPLE }} />
                </span>
                <span
                  className="text-sm font-black tabular-nums"
                  style={{ color: PURPLE }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-black text-[#0a0f2e]">{step.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#196b4d]">
                {step.timing}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#5b6472]">{step.description}</p>
            </motion.li>
          ))}
        </ol>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-start gap-3 border-t border-[#e9ecf5] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm font-semibold text-[#5b6472]">
            Step one takes about a minute.
          </p>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <Link
              href={OFFER_HREF}
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: PURPLE }}
            >
              {OFFER_CTA} <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-[#5b6472]">{OFFER_MICROCOPY}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
