"use client";

import { motion } from "framer-motion";
import { color, radius } from "@/lib/design-tokens";

const questions = [
  {
    issue: "Why did my Shopify store lose 50% of its indexed pages overnight?",
    answer: "Your Shopify store lost indexation likely due to a crawl budget collapse caused by faceted navigation filters or unmanaged parameter URLs. When Googlebot encounters infinite filter combinations, it stops crawling new products and drops older pages from the index.",
    bullets: [
      "Audit robots.txt to block faceted filter parameter URLs.",
      "Ensure canonical tags on collection pages point to the root collection.",
      "Check Google Search Console for 'Discovered - currently not indexed' spikes."
    ]
  },
  {
    issue: "Why did my Law Firm drop out of the Google Map Pack?",
    answer: "Your law firm dropped from the Map Pack because of proximity filtering, NAP (Name, Address, Phone) inconsistency across local aggregators, or a lack of localized entity authority. Google prioritizes physical proximity and verifiable trust signals above raw reviews.",
    bullets: [
      "Verify exact NAP match across major data aggregators (Data Axle, Localeze).",
      "Ensure your primary GBP category is exact (e.g., 'Personal Injury Attorney', not 'Lawyer').",
      "Build localized service-area pages linked to your GBP profile."
    ]
  },
  {
    issue: "How long does it take to recover from a Google Core Update?",
    answer: "Recovery from a Google Core Update takes an average of 3 to 6 months. Because Core Updates evaluate site-wide E-E-A-T signals rather than single pages, you must overhaul content quality and wait for the next broad algorithmic refresh for Google to reassess the domain.",
    bullets: [
      "Prune or consolidate thin, low-value pages that dilute domain authority.",
      "Inject verifiable author credentials and first-hand experience into content.",
      "Do not rely on quick technical fixes; focus on comprehensive content overhauls."
    ]
  }
];

export default function TroubleshootingAEO() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.issue,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${q.answer} ${q.bullets.map(b => `- ${b}`).join(" ")}`
      }
    }))
  };

  return (
    <section className="border-y py-20 sm:py-24 bg-white" style={{ borderColor: color.border }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
