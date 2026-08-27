"use client";
 
// components/AIVisibilityShowcase.tsx
// Premium "AI search visibility (AEO)" credibility section.
// Evidence is a real Google AI Overview citing a real client, not a mockup.
// The previous version of this section rendered an invented dashboard with
// fabricated mention counts, which undercut the very capability it claimed.
 
import Link from "next/link";
import ProofImage from "@/components/ProofImage";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { OFFER_HREF, OFFER_CTA } from "@/lib/offer";
 
const GREEN = "#3eb489";

const points = [
  "Track every mention across ChatGPT, Gemini, Perplexity & Google AI Overviews",
  "Find the prompts where competitors get cited — and you don't",
  "Fix the content & entity signals that make AI trust and recommend you",
];
 
export default function AIVisibilityShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-[#534AB7] opacity-20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#3eb489] opacity-10 blur-[120px]" />
      </div>
 
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/85">
            <Sparkles className="h-3.5 w-3.5" /> AEO · AI Search Visibility
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            AI Search Visibility (AEO) for US Businesses.<br />
            <span className="bg-gradient-to-r from-[#7F77DD] to-[#3eb489] bg-clip-text text-transparent">Are you the answer?</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            AI Overviews now appear across nearly half of all industries — and a growing share of buyers act
            on what the AI tells them. If ChatGPT, Gemini &amp; Google&apos;s AI don&apos;t mention you, you&apos;re invisible to them.
          </p>
        </motion.div>
 
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-2xl font-black leading-snug text-white">
              We don&apos;t just rank you on Google. We make sure the AI replacing it recommends you.
            </h3>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(62,180,137,0.2)" }}>
                    <Check className="h-3 w-3" style={{ color: GREEN }} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Was a separate "Check your AI visibility — free" CTA pointing at
                  /ai-visibility. That was a second ask competing with the audit;
                  AI visibility is now part of the one offer, not a rival to it. */}
              <Link href={OFFER_HREF} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#0a0f2e] transition-transform hover:-translate-y-0.5">
                {OFFER_CTA} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services/law-firm-seo" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/85 transition-colors hover:text-white">
                How AEO works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
 
          {/* Right — REAL AI Overview evidence.
              This slot used to hold an invented dashboard: a 72/100 gauge,
              1,240 "AI mentions", a made-up engine split, labelled "Sample
              dashboard — illustrative figures". Claiming AEO capability with
              fabricated AEO data was the weakest thing on the page. This is a
              live Google AI Overview citing a real client instead. */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <ProofImage
              src="/images/proof/remit-ai-overview-ghana.png"
              alt="Google AI Overview for the query 'send money to ghana zero fees', citing Remit Choice alongside LemFi and Taptap Send."
              width={1355}
              height={609}
              stage="Cited in a Google AI Overview"
              stageTone="#7F77DD"
              caption="Query: “send money to ghana zero fees”"
              note="Remit Choice cited by name inside Google's AI Overview, alongside LemFi and Taptap Send."
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <ProofImage
              src="/images/proof/remit-rank-1-pakistan.png"
              alt="Google search results for 'free of cost money transfer to Pakistan from uk' with Remit Choice ranking first, above Meezan Bank, Xoom and Wise."
              width={1359}
              height={609}
              stage="Organic position #1"
              stageTone="#7F77DD"
              caption="Query: “free of cost money transfer to Pakistan from uk”"
              note="Ranking above Xoom and Wise — both far larger brands."
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </motion.div>
        </div>

        {/* ── Remit Choice, 2024 in Search Console ──
            Deliberately framed as SCALE and as RATE improvements, not as a
            growth percentage.

            WHY: the two captures cover very different window lengths — the
            2023 one spans roughly 82 days (29 Sep – 19 Dec) and the 2024 one
            roughly 343 days (1 Jan – 9 Dec). 36K clicks against 113K clicks
            therefore is NOT a like-for-like comparison, and quoting it as
            "+214%" would be arithmetic that falls apart the moment a prospect
            reads the date axis.

            Average CTR and average position ARE comparable across unequal
            windows, because they are rates rather than totals. Those are the
            two improvements claimed here. */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-black text-white">
              Remit Choice: 113K clicks and 5.76M impressions across 2024
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/85">
              A fintech account at real scale, with average CTR at 2.0% and average
              position 43.4 for the year. The walkthrough below runs through the
              Search Console account month by month.
            </p>
          </div>

          {/* 2024 walkthrough — self-hosted, 1.8 MB, no third-party embed */}
          <figure className="m-0 mt-10">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#7F77DD]">
              2024 performance walkthrough
            </p>
            <video
              controls
              preload="none"
              playsInline
              poster="/images/proof/poster-remit-2024.png"
              className="w-full max-w-3xl rounded-2xl border border-white/10"
            >
              <source src="/video/remit-choice-2024-performance.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <figcaption className="mt-2 text-xs text-white/70">
              Screen recording of the Remit Choice Search Console account across 2024.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}