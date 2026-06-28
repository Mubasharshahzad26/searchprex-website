"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqCategories = [
  {
    category: "Getting started",
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Most clients see significant shifts in rankings within 60-90 days. Competitive niche results (like Dallas Family Law) typically hit full stride around the 6-month mark.",
      },
      {
        question: "Will I work directly with a senior expert?",
        answer:
          "Yes. SearchPrex is 100% senior-led. You communicate directly with the person doing the work.",
      },
    ],
  },
  {
    category: "Services & specialties",
    faqs: [
      {
        question: "Do you only work with family law firms?",
        answer:
          "While Family Law is our specialty, we work with various legal practices. However, we only take on one client per city per practice area to avoid conflicts of interest.",
      },
      {
        question: "What makes SearchPrex different?",
        answer:
          "We are niche-specialists, not generalists. Every client works directly with a senior SEO strategist. No junior account managers, no outsourced fluff.",
      },
    ],
  },
  {
    category: "Pricing & terms",
    faqs: [
      {
        question: "How much does it cost?",
        answer:
          "Pricing is custom based on competition and site scale. Typically, local businesses run $800–$1,500/mo, law firms invest $1,200-$2,500/mo, and Shopify stores $1,500-$4,000/mo. Final pricing is set after your free audit.",
      },
      {
        question: "Do you require long-term contracts?",
        answer:
          "No. We work on a monthly basis. Our results are the contract. Most of our clients have been with us since 2022 because of the ROI.",
      },
    ],
  },
  {
    category: "Results & reporting",
    faqs: [
      {
        question: "How do you report results?",
        answer:
          "You get a custom live dashboard. We focus on 'Money Metrics': rank improvements for high-intent terms, organic traffic, and lead attribution.",
      },
      {
        question: "Do you offer guarantees?",
        answer:
          "We guarantee professional excellence and industry-leading strategy. Since search algorithms vary, we don't fix-guarantee rankings, but we do guarantee a path to ROI.",
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://searchprex.com/#faq",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16 lg:mb-20 text-center"
          >
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a0f2e]">
              Frequently asked
            </h2>
            <p className="text-base sm:text-lg text-[#64748b] max-w-2xl mx-auto">
              Everything you need to know about how we deliver ROI and why we're different from other SEO agencies.
            </p>
          </motion.div>

          <div className="grid gap-10 lg:gap-12">
            {faqCategories.map((categoryGroup, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: categoryIndex * 0.1 }}
              >
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-[#534AB7] bg-opacity-10 text-[#534AB7] text-sm font-semibold rounded-full">
                    {categoryGroup.category}
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {categoryGroup.faqs.map((faq, faqIndex) => {
                    const key = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openIndex === key;

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: faqIndex * 0.05,
                        }}
                        className="group overflow-hidden rounded-lg border border-[#e5e7eb] bg-white hover:border-[#534AB7] hover:shadow-lg transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFaq(key)}
                          className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between gap-4 hover:bg-[#f8fafc] transition-colors duration-200"
                        >
                          <span className="pr-2 font-semibold text-[#0a0f2e] text-sm sm:text-base leading-snug">
                            {faq.question}
                          </span>
                          <div className="flex-shrink-0 mt-0.5">
                            {isOpen ? (
                              <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 180 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Minus className="h-5 w-5 text-[#534AB7] flex-shrink-0" />
                              </motion.div>
                            ) : (
                              <Plus className="h-5 w-5 text-[#94a3b8] group-hover:text-[#534AB7] transition-colors" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[#e5e7eb] px-5 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-[#f8fafc] to-white">
                                <p className="leading-relaxed text-[#475569] text-sm sm:text-base">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 sm:mt-20 lg:mt-24 rounded-2xl bg-gradient-to-r from-[#534AB7] to-[#6d5fc7] p-8 sm:p-10 lg:p-12 text-center text-white"
          >
            <h3 className="mb-3 text-2xl sm:text-3xl font-bold">Still have questions?</h3>
            <p className="mb-6 text-blue-100 text-sm sm:text-base">
              Let's talk. Book a free 20-minute strategy call to discuss your specific SEO needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-white text-[#534AB7] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Schedule a call
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}