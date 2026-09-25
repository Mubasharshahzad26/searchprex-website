// app/home-page-test/page.tsx
//
// The CRO wireframe in previews/home-cro-wireframe.html, built with the real
// brand tokens, the real screenshots and the real location data.
//
// This is a TEST page. It does not touch app/page.tsx, and it is noindex +
// nofollow: two near-identical homepages competing for the same terms is the
// duplicate-content problem this site has been cleaning up, so the test copy
// stays out of the index. It is also listed in NOINDEX_ROUTES in app/sitemap.ts
// so the sitemap cannot pick it up from a CMS row either.
//
// Nine blocks, against fifteen on the live homepage:
//
//   01 header      the global Nav, for now — trimming it to 4 items is a change
//                  to components/Nav.tsx and would affect every page, so it is
//                  not made here. The friction it causes is real and noted.
//   02 hero        HeroTest.tsx — one form, two fields, proof above the fold
//   03 doors       three services, three internal links
//   04 proof       three screenshots in one row, dated, each linked
//   05 coverage    the block that does not exist on the live homepage: the
//                  homepage to every state hub to every city page
//   06 founder     who does the work, above pricing rather than below the FAQ
//   07 process     + price, side by side
//   08 reviews     + FAQ with FAQPage schema
//   09 close       the same offer, third and final ask
//
// Deliberately absent, and why: the persona tab-switcher (two of three tabs
// replace the lead form with a YouTube embed), the second hero form, the
// eight-badge "Verified & Listed On" strip (six pills say "Registered" and are
// not clickable), the "2 Spots Remaining This Month" bar (nothing decrements
// it), and FreeResources + BlogTeaser as the last two blocks (the final
// impression should be the offer, not a reading list).

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Star,
} from "lucide-react";

import ProofImage from "@/components/ProofImage";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { credentials } from "@/lib/credentials";
import { LOCATION_CITY_COUNT, LOCATION_STATES } from "@/lib/locations";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { CALL_HREF, OFFER_HREF } from "@/lib/offer";
import { FOUNDER_ID, SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

import HeroV2 from "@/components/HeroV2";
import CoverageSection from "@/components/CoverageSection";
import { DOORS, FAQS, PHONE_DISPLAY, PHONE_HREF, PROCESS, PROOF } from "./data";

const INK = "#0a0f2e";
const BODY = "#5b6472";
const GREEN = "#1a7d59";
const GREEN_DARK = "#196b4d";
const PURPLE = "#534AB7";
const LINE = "#cdd2dd";

export const metadata: Metadata = {
  title: "Homepage CRO test — SearchPrex (internal)",
  description:
    "Internal layout test of the conversion-optimised homepage. Not for indexing.",
  robots: { index: false, follow: false },
};

const STATES_WITH_PAGES = LOCATION_STATES.length;

/**
 * When a person last read this page and stood behind what it says.
 *
 * Deliberately a hardcoded date and not `new Date()`. A "last reviewed" stamp
 * that moves on every request is the same lie as the sitemap lastmod this repo
 * already fixed — it claims a human checked the page when all that happened was
 * a page load. Change it by hand when you actually review the page.
 */
const LAST_REVIEWED = "2026-09-25";
const LAST_REVIEWED_LABEL = "25 September 2026";

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p
        className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]"
        style={{ color: PURPLE }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-2xl font-black tracking-tight sm:text-3xl lg:text-[2.1rem]"
        style={{ color: INK }}
      >
        {title}
      </h2>
      {sub ? (
        <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export default function HomePageTest() {
  // ── Schema ──
  // Organization, the founder Person and WebSite come from lib/site-schema.ts
  // via the root layout; this graph refers to them by @id and never redefines
  // them. What it adds is the E-E-A-T wiring the live homepage does not have:
  //
  //   author / reviewedBy   a named, verifiable person is accountable for this
  //                         page. The live homepage's WebPage node has neither,
  //                         so the founder Person node sits in the graph
  //                         unconnected to any page he is responsible for.
  //   dateModified          when this was last checked. Without it there is no
  //                         accountability signal and no freshness signal.
  //   hasCredential         the five Semrush certificates and the published
  //                         article, as EducationalOccupationalCredential nodes
  //                         with a public URL each. Nothing self-awarded.
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}/home-page-test#webpage`,
        url: `${SITE}/home-page-test`,
        name: "SEO Agency for Law Firms & Local Businesses",
        isPartOf: websiteRef,
        about: organizationRef,
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/opengraph-image` },
      },
      // Adds credentials to the founder node defined in the layout. Same @id,
      // so this is an addition to that entity, not a second person.
      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        hasCredential: credentials
          .filter((c) => !c.isArticle)
          .map((c) => ({
            "@type": "EducationalOccupationalCredential",
            name: `${c.specialty} — ${c.source}`,
            credentialCategory: "certificate",
            recognizedBy: { "@type": "Organization", name: c.source },
            url: c.href,
          })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/home-page-test#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const featured = caseStudies.filter((cs) => cs.featured);
  const rest = caseStudies.filter((cs) => !cs.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <main id="main-content">
        {/* ── 02 HERO ── */}
        <HeroV2 />

        {/* ── 03 THREE DOORS ── */}
        <section className="border-y bg-white py-16 sm:py-20" style={{ borderColor: "#e5e7eb" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Pick your situation"
              title="Four kinds of work. Yours is one of them."
              sub="Self-selection without hiding anything: every door is a link, not a tab that swaps out two thirds of the page."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {DOORS.map((door) => (
                <Link
                  key={door.href}
                  href={door.href}
                  className="group flex flex-col rounded-2xl border bg-[#f8f9fc] p-6 transition-all hover:-translate-y-1 hover:border-[#1a7d59] hover:shadow-lg"
                  style={{ borderColor: LINE }}
                >
                  <h3 className="text-xl font-black tracking-tight" style={{ color: INK }}>
                    {door.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
                    {door.blurb}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {door.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs" style={{ color: BODY }}>
                        <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: GREEN }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-3"
                    style={{ color: GREEN_DARK }}
                  >
                    {door.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 PROOF ── */}
        <section className="bg-[#eaecf3] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Proof, not adjectives"
              title="Three screenshots. Click any of them and read the numbers yourself."
              sub="The live homepage spends four full-height sections and roughly 2,600px on this before it asks for anything. Same evidence, one screen — the long version is one click away on each case study."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {PROOF.map((p) => (
                <div key={p.src} className="flex flex-col">
                  <ProofImage
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    frameAspect="16 / 10"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  <p className="mt-3 text-sm font-black" style={{ color: GREEN_DARK }}>
                    {p.headline}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: BODY }}>
                    {p.caption}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2.5"
                    style={{ color: PURPLE }}
                  >
                    Read the case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04b EVERY CASE STUDY ──
            Three screenshots carry the argument, but three is not the inventory.
            Ten studies exist, each with its own metrics and most with a GSC
            video or screenshot, and that volume IS the Experience half of
            E-E-A-T: one impressive result is luck, ten across four industries
            is a track record. Rendered from app/case-studies/data.ts so a new
            study appears here without anyone remembering to add it. */}
        <section className="border-t bg-white py-16 sm:py-20" style={{ borderColor: "#e5e7eb" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={`${caseStudies.length} case studies`}
              title="Every client result on this site, in one place"
              sub="Four industries, US and international. Each card links to the full study with the challenge, the work and the Search Console evidence — several include screen recordings rather than screenshots, because a recording is harder to fake."
            />

            {/* Featured first, with their headline. */}
            <div className="grid gap-5 md:grid-cols-3">
              {featured.map((cs) => (
                <Link
                  key={cs.id}
                  href={detailUrl(cs)}
                  className="group flex flex-col rounded-2xl border bg-[#f8f9fc] p-5 transition-all hover:-translate-y-1 hover:border-[#1a7d59] hover:shadow-lg"
                  style={{ borderColor: LINE }}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: cs.badgeBg, color: cs.badgeColor }}
                    >
                      {cs.seoType}
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: BODY }}>
                      {cs.industry}
                    </span>
                    {cs.video ? (
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase"
                        style={{ color: GREEN_DARK }}
                      >
                        <PlayCircle className="h-3 w-3" aria-hidden="true" /> GSC recording
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm font-black" style={{ color: INK }}>
                    {cs.client}
                  </p>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed" style={{ color: BODY }}>
                    {cs.headline}
                  </p>
                  <div
                    className="mt-4 grid grid-cols-3 gap-2 border-t pt-3"
                    style={{ borderColor: "#eef0f4" }}
                  >
                    {cs.metrics.map((m) => (
                      <div key={m.l}>
                        <span className="block text-sm font-black leading-none" style={{ color: GREEN_DARK }}>
                          {m.v}
                        </span>
                        <span className="mt-1 block text-[10px] leading-tight" style={{ color: BODY }}>
                          {m.l}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Timeframe renders only when the study states one — see the
                      `period` comment in app/case-studies/data.ts. A figure with
                      no window is not evidence, and inventing one is worse. */}
                  {cs.period ? (
                    <p className="mt-2.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: PURPLE }}>
                      Measured over {cs.period}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>

            {/* The rest, compact — client, type, metrics. */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((cs) => (
                <Link
                  key={cs.id}
                  href={detailUrl(cs)}
                  className="group flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 transition-all hover:border-[#1a7d59] hover:shadow-md"
                  style={{ borderColor: LINE }}
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black" style={{ color: INK }}>
                      {cs.client}
                    </p>
                    <p className="mt-0.5 text-[10px]" style={{ color: BODY }}>
                      {cs.seoType} · {cs.industry}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-1">
                    <span className="text-sm font-black leading-none" style={{ color: GREEN_DARK }}>
                      {cs.metrics[0]?.v}
                    </span>
                    <span className="text-[10px]" style={{ color: BODY }}>
                      {cs.metrics[0]?.l}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
              style={{ color: PURPLE }}
            >
              All case studies with the full data <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ── 05 COVERAGE — shared with the live homepage (components/CoverageSection). ── */}
        <CoverageSection />

        {/* ── 06 FOUNDER ── */}
        <section className="bg-[#eaecf3] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 lg:grid-cols-[200px_1fr] lg:gap-12">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif, founder and lead SEO analyst at SearchPrex"
                width={400}
                height={400}
                className="w-full max-w-[200px] rounded-2xl object-cover shadow-lg"
              />
              <div>
                <p
                  className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: PURPLE }}
                >
                  Who actually does the work
                </p>
                <h2
                  className="text-2xl font-black tracking-tight sm:text-3xl"
                  style={{ color: INK }}
                >
                  Mubashar Sharif — owner, and the person on your account
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
                  Every audit, every page and every Monday report on this site was written by one
                  person. That is the whole offer: you are not handed to a junior after the sales
                  call, because there is no sales call and no junior. It also caps how many clients
                  SearchPrex can take, which is where the one-client-per-city rule comes from rather
                  than it being a scarcity tactic.
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
                  What I will not do: promise a position I cannot control, report on impressions when
                  you asked about calls, or put a number on this site that has no screenshot behind it.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/", external: true },
                    { label: "About SearchPrex", href: "/about", external: false },
                    { label: "Case studies", href: "/case-studies", external: false },
                    { label: "The SEO news desk I write", href: "/resources/news", external: false },
                  ].map((l) =>
                    l.external ? (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border bg-white px-3.5 py-1.5 text-xs font-semibold transition-all hover:border-[#1a7d59]"
                        style={{ borderColor: LINE, color: INK }}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        key={l.label}
                        href={l.href}
                        className="rounded-full border bg-white px-3.5 py-1.5 text-xs font-semibold transition-all hover:border-[#1a7d59]"
                        style={{ borderColor: LINE, color: INK }}
                      >
                        {l.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 PROCESS + PRICE ── */}
        <section className="border-y bg-white py-16 sm:py-20" style={{ borderColor: "#e5e7eb" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <SectionHeading eyebrow="No mystery" title="What happens after you send the URL" />
                <ol className="space-y-3">
                  {PROCESS.map((step) => (
                    <li
                      key={step.when}
                      className="rounded-xl border bg-[#f8f9fc] p-4"
                      style={{ borderColor: LINE }}
                    >
                      <span
                        className="text-xs font-black uppercase tracking-wide"
                        style={{ color: GREEN_DARK }}
                      >
                        {step.when}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>
                        {step.what}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <SectionHeading eyebrow="No discovery call needed to hear a number" title="What it costs" />
                <div className="space-y-3">
                  {RETAINER_PLANS.map((plan) => (
                    <div
                      key={plan.niche}
                      className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border p-4"
                      style={{ borderColor: plan.featured ? plan.accent : LINE, background: plan.bg }}
                    >
                      <div>
                        <p className="text-sm font-black" style={{ color: INK }}>
                          {plan.niche}
                        </p>
                        <p className="mt-0.5 text-xs" style={{ color: BODY }}>
                          {plan.best} · {plan.includes.join(" · ")}
                        </p>
                      </div>
                      <p className="text-sm font-black" style={{ color: plan.accent }}>
                        {formatRange(plan)}
                        <span className="text-xs font-semibold" style={{ color: BODY }}>
                          {" "}
                          / mo
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed" style={{ color: BODY }}>
                  Ranges, because the number depends on how many pages and cities the plan covers. No
                  lock-in language, and no countdown timer telling you two spots are left.
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
                  style={{ color: PURPLE }}
                >
                  Full pricing detail <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 08 REVIEWS + FAQ ── */}
        <section className="bg-[#eaecf3] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
              <div>
                <SectionHeading eyebrow="Verified on Trustpilot" title="What a client said" />
                <figure
                  className="rounded-2xl border bg-white p-6 shadow-sm"
                  style={{ borderColor: LINE }}
                >
                  <div className="mb-3 flex gap-0.5" aria-label="5 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-4 w-4" fill="#00b67a" stroke="none" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed" style={{ color: INK }}>
                    “Highly recommend for any e-commerce business looking to scale. They are an expert
                    at optimizing for competitive retail niches and have helped Michigan Sports
                    Outdoor substantially increase our online visibility. Very professional,
                    results-oriented, and easy to work with.”
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-bold" style={{ color: BODY }}>
                    Michigan Sports &amp; Outdoor Inc · E-commerce, USA · 17 July 2026
                  </figcaption>
                </figure>
                {/* One review, because one review is what is live on the profile.
                    components/TrustpilotReviewSection.tsx explains why a second,
                    unpublished testimonial was removed from the live page. */}
                <p className="mt-3 text-xs leading-relaxed" style={{ color: BODY }}>
                  One review, because one is what is published on the profile. Getting that number up
                  is item 10 in the 30-day plan, not something to pad here.
                </p>
                <a
                  href="https://www.trustpilot.com/review/searchprex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: GREEN_DARK }}
                >
                  See it on Trustpilot <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div>
                <SectionHeading
                  eyebrow="Straight answers"
                  title="Questions people actually ask"
                  sub="Each answer says the thing in the first sentence — that is what an AI Overview lifts, and what a busy person reads."
                />
                <div className="space-y-2.5">
                  {FAQS.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-xl border bg-white px-5 py-4"
                      style={{ borderColor: LINE }}
                    >
                      <summary
                        className="cursor-pointer list-none text-sm font-bold marker:hidden"
                        style={{ color: INK }}
                      >
                        {f.q}
                      </summary>
                      <p className="mt-2.5 text-sm leading-relaxed" style={{ color: BODY }}>
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
                <Link
                  href="/faq"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
                  style={{ color: PURPLE }}
                >
                  All FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 08b E-E-A-T — the block that was missing entirely ──
            The live homepage asserts expertise and never evidences it. The four
            signals Google's own guidance asks for, in the order it asks for them:

              Experience  the case study grid above (block 04b) and the dated
                          screenshots in block 04
              Expertise   five verifiable credentials, each a link a stranger can
                          open — these existed on /about only, behind a carousel
              Authority   named author, named reviewer, review date, bio link
              Trust       a real postal address, a real phone, a real email, and
                          a plain statement about where the business actually is

            The last one is the uncomfortable one and it is why this block exists.
            The schema has a Daska, Punjab address while the page sells US SEO,
            and the live homepage shows neither the address nor the phone
            anywhere in the body. A visitor who finds the mismatch on their own
            has found something you hid. A visitor who reads it here has read a
            fact you volunteered. Same fact, opposite effect on trust. */}
        <section className="border-y bg-white py-16 sm:py-20" style={{ borderColor: "#e5e7eb" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Who stands behind this page"
              title="Everything here is checkable, including the awkward parts"
            />
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
              {/* Expertise + Authority */}
              <div>
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border bg-[#f8f9fc] px-4 py-3 text-xs"
                  style={{ borderColor: LINE, color: BODY }}
                >
                  <BadgeCheck className="h-4 w-4 flex-shrink-0" style={{ color: GREEN }} aria-hidden="true" />
                  <span>
                    Written and reviewed by{" "}
                    <Link href="/about" className="font-bold underline" style={{ color: INK }}>
                      Mubashar Sharif
                    </Link>
                    , Founder &amp; SEO Strategist
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Last reviewed{" "}
                    <time dateTime={LAST_REVIEWED} className="font-bold" style={{ color: INK }}>
                      {LAST_REVIEWED_LABEL}
                    </time>
                  </span>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: PURPLE }}>
                  Verifiable credentials
                </p>
                <ul className="mt-3 space-y-2">
                  {credentials.map((c) => (
                    <li key={c.href}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border bg-white px-4 py-2.5 transition-all hover:border-[#1a7d59] hover:shadow-sm"
                        style={{ borderColor: LINE }}
                      >
                        <span
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-black text-white"
                          style={{ background: c.isArticle ? PURPLE : "#ff642d" }}
                          aria-hidden="true"
                        >
                          {c.isArticle ? "AR" : "Sr"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-bold" style={{ color: INK }}>
                            {c.specialty}
                          </span>
                          <span className="block text-[11px]" style={{ color: BODY }}>
                            {c.credType} {c.source}
                          </span>
                        </span>
                        <ExternalLink
                          className="h-3.5 w-3.5 flex-shrink-0 transition-transform group-hover:scale-110"
                          style={{ color: BODY }}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] leading-relaxed" style={{ color: BODY }}>
                  Every one opens the issuing document. There are no badge images on this page without
                  a link behind them, and no self-awarded titles.
                </p>
              </div>

              {/* Trust */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: PURPLE }}>
                  Where the business actually is
                </p>
                <div
                  className="mt-3 rounded-2xl border bg-[#f8f9fc] p-5"
                  style={{ borderColor: LINE }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                    SearchPrex is remote-first. It is registered and operated from{" "}
                    <strong style={{ color: INK }}>Daska, Punjab, Pakistan</strong>, and works US
                    business hours across the Eastern, Central and Pacific timezones. There is no US
                    office and no US staff — the work is done by one person, which is the offer, not a
                    disclaimer.
                  </p>
                  <ul className="mt-4 space-y-2.5 border-t pt-4" style={{ borderColor: "#e2e5ec" }}>
                    <li className="flex items-start gap-2.5 text-xs" style={{ color: BODY }}>
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
                      <span>
                        Mohalla Raham Colony, Near Altaf Cold Storage, Opposite Chungi No. 1, Daska,
                        Punjab 51010, Pakistan
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs">
                      <Phone className="h-4 w-4 flex-shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
                      <a href={PHONE_HREF} className="font-bold" style={{ color: INK }}>
                        {PHONE_DISPLAY}
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs">
                      <Mail className="h-4 w-4 flex-shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
                      <a href="mailto:contact@searchprex.com" className="font-bold" style={{ color: INK }}>
                        contact@searchprex.com
                      </a>
                    </li>
                  </ul>
                  <p className="mt-4 text-[11px] leading-relaxed" style={{ color: BODY }}>
                    The same address and number are in this site&apos;s structured data. Matching what a
                    visitor reads to what a crawler reads is the whole point.
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: "Trustpilot", href: "https://www.trustpilot.com/review/searchprex.com" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/" },
                    { label: "YouTube", href: "https://www.youtube.com/@SearchPrex" },
                    { label: "Clutch", href: "https://clutch.co/profile/searchprex" },
                  ].map((p) => (
                    <a
                      key={p.label}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-[11px] font-bold transition-all hover:border-[#1a7d59]"
                      style={{ borderColor: LINE, color: INK }}
                    >
                      {p.label}
                      <ExternalLink className="h-3 w-3" style={{ color: BODY }} aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="mt-2.5 text-[11px] leading-relaxed" style={{ color: BODY }}>
                  Four profiles that are actually populated. The live homepage shows eight badges,
                  six of which say only &ldquo;Registered&rdquo; and do not link anywhere — an empty
                  profile behind a badge is worse than no badge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 09 CLOSE — same offer, same wording, same destination ── */}
        <section className="py-16 sm:py-20" style={{ background: INK }}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
              Send me your URL. I will tell you what is wrong with it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Two fields, a reply within 24 hours, written by me. If your city is already taken, I
              will tell you that too instead of selling you something.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={OFFER_HREF}
                className="w-full rounded-xl px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 sm:w-auto"
                style={{ background: GREEN }}
              >
                Get my free tear-down <span aria-hidden="true">→</span>
              </Link>
              <a
                href={CALL_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border-2 border-white/25 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white/50 sm:w-auto"
              >
                Book a 30-min call
              </a>
            </div>
            <a
              href={PHONE_HREF}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_DISPLAY} — you get Mubashar, not a rep
            </a>
          </div>
        </section>

        {/* Internal marker so nobody mistakes this for the live homepage. */}
        <p className="bg-[#fff5f7] py-3 text-center text-xs" style={{ color: "#7a1026" }}>
          Internal layout test · noindex, nofollow · the live homepage is{" "}
          <Link href="/" className="font-bold underline">
            {SITE.replace("https://www.", "")}
          </Link>
        </p>
      </main>
    </>
  );
}
