"use client";
 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
 
const faqs = [
  {
    question: "How long does SEO take to show results?",
    answer:
      "Most clients see significant shifts in rankings within 60-90 days. Competitive niche results (like Dallas Family Law) typically hit full stride around the 6-month mark.",
  },
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
  {
    question: "Do you require long-term contracts?",
    answer:
      "No. We work on a monthly basis. Our results are the contract. Most of our clients have been with us since 2022 because of the ROI.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing is custom based on competition and site scale. Typically, Law Firm partners spend $2k-$5k/mo and Shopify stores $3k-$7k/mo.",
  },
  {
    question: "Will I work directly with a senior expert?",
    answer:
      "Yes. SearchPrex is 100% senior-led. You communicate directly with the person doing the work.",
  },
  {
    question: "Do you offer guarantees?",
    answer:
      "We guarantee professional excellence and industry-leading strategy. Since search algorithms vary, we don't fix-guarantee rankings, but we do guarantee a path to ROI.",
  },
  {
    question: "How do you report results?",
    answer:
      "You get a custom live dashboard. We focus on 'Money Metrics': rank improvements for high-intent terms, organic traffic, and lead attribution.",
  },
];
 
/* FAQPage schema — built from the SAME array as the visible accordion,
   so structured data always matches on-page content (Google's requirement).
   Eligible for FAQ rich results + AI Overviews. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};
 
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
 
  return (
    <section className="bg-white py-24">
      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
 
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-black text-[#0a0f2e] sm:text-5xl">
            Common Questions
          </h2>
          <p className="text-lg text-[#64748b]">
            Clear answers on how we deliver ROI.
          </p>
        </motion.div>
 
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="pr-4 font-bold text-[#0a0f2e]">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 flex-shrink-0 text-[#3eb489]" />
                ) : (
                  <Plus className="h-5 w-5 flex-shrink-0 text-[#64748b]" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-[#e5e7eb] px-6 py-5">
                      <p className="text-[#64748b]">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
 































































