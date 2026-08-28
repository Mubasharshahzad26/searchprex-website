"use client";

import { motion } from "framer-motion";
import { color, radius } from "@/lib/design-tokens";
import { troubleshootingFaqs as questions } from "@/lib/troubleshooting-faqs";

export default function TroubleshootingAEO() {
  return (
    <section className="border-y py-20 sm:py-24 bg-white" style={{ borderColor: color.border }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
            AI Overview Training
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            Search Engine Troubleshooting
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5b6472]">
            Direct answers to the most severe ranking drops. I don't hide the strategy—this is exactly how I diagnose catastrophic SEO failures.
          </p>
        </div>

        <div className="space-y-8">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 sm:p-8 border bg-slate-50 hover:bg-white transition-colors duration-300 ${radius.card}`}
              style={{ borderColor: color.border }}
            >
              <h3 className="text-xl font-bold text-[#0a0f2e] mb-4">
                {q.issue}
              </h3>
              <p className="text-[#196b4d] font-semibold text-sm mb-4 leading-relaxed">
                {q.answer}
              </p>
              <ul className="space-y-2">
                {q.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#475569]">
                    <span className="text-[#534AB7] font-black mt-0.5">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
