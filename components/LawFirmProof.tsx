// components/LawFirmProof.tsx
// The law-firm half of the problem -> proof pattern.
//
// WHY THIS SECTION SAYS "I DON'T HAVE ONE YET".
//
// The homepage runs on one rule: every problem it names is answered with an
// artefact, not an adjective. Ecommerce gets RevenueProof, local gets
// LocalSeoProof, de-indexing gets RecoveryStory. The law-firm persona had a
// problem header and then no evidence at all — it handed out a free SaaS trial
// instead, which is the one place on the page where a claim went unbacked.
//
// There is no law-firm capture in public/images/proof/. Every asset there is
// ecommerce (mso-*, smk-*), local service (local-hvac-*, local-dolls-*,
// local-mammoth-*) or fintech (remit-*). Nothing has been produced for an
// attorney client yet.
//
// So this section states that plainly. The alternative — dressing methodology
// up as a result, or borrowing a number from another vertical and letting the
// layout imply it was a law firm — would contradict the standard the rest of
// this page is built on. components/ProofStrip.tsx refuses to publish a +476%
// peak because the account later regressed; components/LocalSeoProof.tsx names
// two local screenshots it threw out because the trend ran backwards. A
// fabricated law-firm win would make every one of those honest calls worthless.
//
// WHEN A LAW-FIRM CASE STUDY EXISTS: replace the `absence` block with the
// evidence and keep everything else. The section is built so that swap is
// additive — the transferable-work cards and the offer stay exactly as they
// are.

import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck, Scale } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_MICROCOPY } from "@/lib/offer";

// What I can evidence today, and the honest distance between it and a law
// firm. Each card points at proof that already exists elsewhere on this page,
// so the visitor can go and check it rather than take the transfer on trust.
const transferable = [
  {
    icon: FileSearch,
    title: "Mass de-indexing recovery",
    body:
      "A 35,000-URL catalogue went from roughly 3,000 indexed pages to 11,549. Crawl-budget collapse, canonical architecture and forced re-indexing are the same mechanics whether the URLs are products or practice-area pages.",
    evidence: "Published in full, including the months it went backwards",
    href: "#recovery",
  },
  {
    icon: ShieldCheck,
    title: "Named inside Google's AI Overview",
    body:
      "Two different local service clients, in two different states, cited by name in AI Overviews for their money queries. That is entity and E-E-A-T work — the same work that decides whether Google names your firm or the directory that outranks you.",
    evidence: "Screenshots above, openable at full resolution",
    href: "#local-seo-proof-heading",
  },
];

export default function LawFirmProof() {
  return (
    <section
      id="law-firm-proof"
      className="border-y py-16 lg:py-24"
      style={{ background: color.surface, borderColor: color.border }}
      aria-labelledby="law-firm-proof-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ── The absence, stated first ── */}
        <div
          className={`border p-8 sm:p-10 ${radius.card}`}
          style={{ background: color.white, borderColor: color.borderStrong }}
        >
          <p
            className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#185FA5" }}
          >
            <Scale className="h-4 w-4" aria-hidden="true" />
            Law Firm SEO · Where the evidence stands
          </p>

          <h2
            id="law-firm-proof-heading"
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: color.ink }}
          >
            I don&apos;t have a law firm case study yet. Here&apos;s what I do have.
          </h2>

          <p className="mt-5 text-lg leading-relaxed" style={{ color: color.muted }}>
            Every other section on this page puts a screenshot behind its claim. I&apos;m not
            going to break that rule here by showing you a number from a different industry
            and letting the layout imply it was an attorney. No firm has come through this
            practice yet that I can publish.
          </p>

          <p className="mt-4 text-lg leading-relaxed" style={{ color: color.muted }}>
            What I can tell you is which parts of the work above transfer, and which parts
            you should make me prove on your own site before you pay me anything.
          </p>
        </div>

        {/* ── What transfers, with a route to the proof ── */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {transferable.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`border p-6 sm:p-7 ${radius.card}`}
                style={{ background: color.white, borderColor: color.border }}
              >
                <Icon className="h-6 w-6" style={{ color: "#185FA5" }} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold" style={{ color: color.ink }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: color.muted }}>
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: "#185FA5" }}
                >
                  {item.evidence}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── The offer: test me before you trust me ── */}
        <div
          className={`mt-8 border p-8 sm:p-10 ${radius.card}`}
          style={{ background: "#185FA510", borderColor: "#185FA530" }}
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: "#185FA5" }}
          >
            So test me at zero risk
          </p>
          <h3 className="text-2xl font-bold" style={{ color: color.ink }}>
            A free 30-day AI Intake Assistant — before you discuss an SEO retainer.
          </h3>
          <p className="mt-4 text-base leading-relaxed" style={{ color: color.muted }}>
            Ranking organically for &apos;Family Law Attorney&apos; or &apos;Personal Injury
            Lawyer&apos; is the only durable way to replace $150-a-click PPC. But you have no
            reason to believe that from me yet. So start with the intake assistant: it
            qualifies your cases 24/7, it costs you nothing for 30 days, and it shows you how
            I work before any money changes hands.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/intake-assistant"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 ${radius.control}`}
              style={{ background: "#185FA5" }}
            >
              Start the free 30-day trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services/law-firm-seo"
              className={`inline-flex items-center justify-center gap-2 border px-7 py-3.5 text-sm font-semibold transition-colors ${radius.control}`}
              style={{ borderColor: color.borderStrong, color: color.ink }}
            >
              See the law firm methodology
            </Link>
          </div>

          <p className="mt-4 text-xs" style={{ color: color.subtle }}>
            {OFFER_MICROCOPY}
          </p>
        </div>
      </div>
    </section>
  );
}
