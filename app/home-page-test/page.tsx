// app/home-page-test/page.tsx
//
// Redesigned home page, built here first so it can be compared with the live
// one on localhost before anything changes at "/". Noindex + nofollow, and in
// NOINDEX_ROUTES in app/sitemap.ts: two near-identical home pages must not
// compete for the same searches.
//
// Why it looks the way it does (September 2026 review of the live home page):
//
//   - The live page is 21,482px (about 28 laptop screens) with 17 sections and
//     ONE lead form, in the hero. Semrush's home page is 8,535px; NicheSEO
//     Pro's 15,163px. This one aims for roughly 8,500px with three forms.
//   - The full proof stories (6,298px on the live page) live on the case study
//     pages already. Here they are a four-card bento of evidence cards, each
//     linking to its study.
//   - One action throughout: the free tear-down. The hero is the live one
//     (HeroV2); the later forms are a pill that asks for the website first
//     and the email second (PillForm). The action is green everywhere.
//   - Three audiences become one tabbed section instead of three stacked ones.
//   - One visual system: the site's Inter throughout, rounded 24px cards, pill controls, soft tinted sections, one primary
//     colour for every CTA. No reveal-on-scroll animations, which kept
//     content invisible until scrolled to.
//   - One floating element (the sticky mobile CTA); no chat widget.
//
// Every figure is read from app/case-studies (data.ts and details.ts) or
// lib/pricing, never typed here.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, FileText, Newspaper, Star } from "lucide-react";

import ClientLogos from "@/components/ClientLogos";
import HeroV2 from "@/components/HeroV2";
import ProofImage from "@/components/ProofImage";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { VideoGallery } from "@/components/layout";
import { RECORDED_VIDEOS } from "@/components/VideoProof";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { CASE_DETAILS, EXTRA_PROOF, type ProofShot } from "@/app/case-studies/details";
import { credentials } from "@/lib/credentials";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { LOCATION_CITY_COUNT, LOCATION_STATES } from "@/lib/locations";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

import AudienceTabs, { type AudienceTab } from "./AudienceTabs";
import FaqAccordion from "./FaqAccordion";
import PillForm from "./PillForm";


export const metadata: Metadata = {
  title: "Home page redesign test — SearchPrex (internal)",
  description: "Internal test of the redesigned home page. Not for indexing.",
  robots: { index: false, follow: false },
};

const LAST_REVIEWED = "2026-09-26";
// One typeface site-wide (Inter, from the root layout); headings only change weight.
const H = "font-black";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";

// ── Data, read from the case studies ──────────────────────────────────────

const byClient = (client: string) => caseStudies.find((c) => c.slug.client === client);
const shot = (client: string, i: number): ProofShot | undefined =>
  (CASE_DETAILS[client]?.proof ?? EXTRA_PROOF[client] ?? [])[i];

const BENTO = [
  { client: "smk-store", shot: 1, wide: true, tag: "Ecommerce · WooCommerce", title: "$5,832 → $19,100 a month", line: "Monthly net sales, April to June 2026, after thin content, indexing and site quality were rebuilt." },
  { client: "michigan-outdoor-sports", shot: 0, wide: false, tag: "Ecommerce · Recovery", title: "12.2K pages indexed", line: "Up from about 4,000 at the end of May 2026." },
  { client: "dolls-cleaning", shot: 0, wide: false, tag: "Local · Cleaning", title: "Named first in Google's AI Overview", line: "And #1 organically below it, for post-construction cleaning in Chesterfield, MI." },
  { client: "remit-choice", shot: 2, wide: true, tag: "International · Fintech", title: "#1 above Wise and Xoom", line: "For “free of cost money transfer to Pakistan from uk”, from international SEO introduced in 2023." },
].map((b) => ({ ...b, cs: byClient(b.client), proof: shot(b.client, b.shot) }));

const hvac = byClient("local-hvac-services");
const smk = byClient("smk-store");

const TABS: AudienceTab[] = [
  {
    id: "law",
    label: "Law firms",
    title: "Found for the cases you want",
    problem:
      "People search by practice area and city, often at night, and call whoever answers first. Most firm sites have one practice page, a thin Business Profile and no answer to the questions clients actually type.",
    work: [
      "Practice-area and city pages, written to bar advertising rules",
      "Business Profile and local pack work",
      "Answers AI Overviews can quote, approved by your firm",
      "An AI intake assistant, so a 2am enquiry is not lost",
    ],
    proof: {
      text: "No law firm client has been published yet. The practice-area pages show the plan, and the free tear-down lets you test me on your own firm first.",
      href: "/services/law-firm-seo",
      honest: true,
    },
    hub: { href: "/services/law-firm-seo", label: "Law firm SEO" },
    pages: INDUSTRY_PAGES.map((p) => ({ href: `/services/law-firm-seo/${p.slug}`, label: p.name })),
  },
  {
    id: "local",
    label: "Local businesses",
    title: "The map pack, and the phone ringing",
    problem:
      "When someone searches “near me”, they call one of the three businesses in the map pack. A profile set up as an afterthought and a single services page keep good businesses out of it.",
    work: [
      "Business Profile rebuilt for the searches that bring calls",
      "A page for every service and area you actually cover",
      "Genuine reviews, asked for the same way after every job",
      "Answers Google's AI Overviews can name you in",
    ],
    proof: {
      text: hvac
        ? `${hvac.client}: top 3 in the map pack and named in Google's AI Overview, within 60 days.`
        : "Top 3 in the map pack within 60 days.",
      href: hvac ? detailUrl(hvac) : "/case-studies",
    },
    hub: { href: "/services/local-seo", label: "Local SEO" },
    pages: LOCAL_INDUSTRIES.map((i) => ({ href: `/services/local-seo/${i.slug}`, label: i.name })),
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    title: "Every product page earning its keep",
    problem:
      "Large catalogues fail in the same places: thin manufacturer copy, thousands of pages Google never indexes, and templates that make every product slow at once.",
    work: [
      "Thin product and brand pages rewritten at scale",
      "Crawling and indexing fixed, batch by batch, in Search Console",
      "Speed fixed at the template, so every product gets faster",
      "Product, brand and category pages linked on purpose",
    ],
    proof: {
      text: smk
        ? `${smk.client}: monthly net sales from $5,832 to $19,100 in two months, per its WooCommerce dashboard.`
        : "Monthly net sales from $5,832 to $19,100 in two months.",
      href: smk ? detailUrl(smk) : "/case-studies",
    },
    hub: { href: "/services/ecommerce-seo", label: "Ecommerce SEO" },
    pages: ECOMMERCE_INDUSTRIES.map((i) => ({ href: `/services/ecommerce-seo/${i.slug}`, label: i.name })),
  },
];

const STEPS = [
  { n: "1", title: "Send your URL", body: "A written tear-down within 24 hours: what is holding the site back, and the competitors above you." },
  { n: "2", title: "I do the work", body: "Month to month. Technical fixes, pages, profile and content, in the order that moves revenue first." },
  { n: "3", title: "Monday report", body: "What changed, what moved and what is next, in plain English, every week." },
];

const plan = (niche: string) => RETAINER_PLANS.find((p) => p.niche === niche);
const local = plan("Local SEO");
const law = plan("Law Firm SEO");
const ecom = plan("Ecommerce SEO");

const FAQS = [
  {
    q: "How much does SEO cost with SearchPrex?",
    a: `${local ? `Local SEO runs ${formatRange(local)} a month` : ""}${law ? `, law firm SEO ${formatRange(law)}` : ""}${ecom ? ` and ecommerce SEO ${formatRange(ecom)}` : ""}, depending on how many pages, locations and practice areas the plan covers. It is month to month, and the free tear-down comes first.`,
  },
  {
    q: "How long does SEO take to show results?",
    a: "Local results can move within weeks once the profile and pages are fixed — the HVAC client in the case studies reached the map pack's top three in 60 days. Competitive and ecommerce work usually takes three to six months. The tear-down gives you a realistic read for your market.",
  },
  {
    q: "Who actually does the work?",
    a: "Mubashar Sharif, the founder — every audit, page and report. There are no account managers or juniors, which is also why SearchPrex takes one client per city.",
  },
  {
    q: "Can you get my business into Google's AI Overviews?",
    a: "Nobody controls what Google's AI cites, but clear answers, structured data and a strong local presence make it far more likely. D.O.L.L.S. Cleaning, HVAC Services Team and Remit Choice are each named in AI Overviews for searches in their markets.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and nobody honestly can — Google decides rankings. What is guaranteed is the process: the tear-down within 24 hours, the work done by me, and a plain report every Monday.",
  },
  {
    q: "Where is SearchPrex based?",
    a: "Remote-first, run from Daska, Pakistan, and working US business hours across Eastern, Central and Pacific time. Most client work is for US businesses.",
  },
];

const LEARN = [
  { href: "/resources/law-firm-seo-audit-checklist", icon: FileText, kind: "Free checklist", title: "The law firm SEO audit checklist", body: "The checks I run on a firm's site, to work through yourself." },
  { href: "/resources/news", icon: Newspaper, kind: "Updated weekly", title: "What changed in search this week", body: "Google and AI search updates in plain English, with a source for every claim." },
  { href: "/case-studies", icon: BookOpen, kind: "Case studies", title: "Every result, with the screenshots", body: "The full story behind each number on this page." },
];

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#534AB7]">{eyebrow}</p>
      <h2 className={`${H} mt-3 text-3xl  tracking-[-0.02em] text-[#0a0f2e] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]`}>{title}</h2>
      {sub ? <p className="mt-4 text-base leading-relaxed text-[#5b6472]">{sub}</p> : null}
    </div>
  );
}

export default function HomePageTest() {
  const certCount = credentials.filter((c) => !c.isArticle).length;
  const review = {
    body: "Highly recommend for any e-commerce business looking to scale. They are an expert at optimizing for competitive retail niches and have helped Michigan Sports Outdoor substantially increase our online visibility. Very professional, results-oriented, and easy to work with.",
    author: "Michigan Sports & Outdoor Inc",
    date: "17 July 2026",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}/home-page-test#webpage`,
        url: `${SITE}/home-page-test`,
        name: "Revenue-focused SEO for law firms, local businesses and ecommerce",
        isPartOf: websiteRef,
        about: organizationRef,
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/home-page-test#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main id="main-content" className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1 · HERO — the live home page's hero, kept on purpose: the form card carries the founder's face and name (people hire a person, not a tool), both fields are visible so the 24-hour human reply is clear up front, proof and a phone number sit on the first screen, and it is proven in production. */}
      <HeroV2 />

      {/* 2 · PROOF STRIP */}
      <ClientLogos />

      {/* 3 · RESULTS BENTO */}
      <section className="bg-[#f7f7fc] px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Results"
            title="Real clients. Their own dashboards."
            sub="Every figure below is on a screenshot from the client's own account. Click one to read it full size, or open the case study for the whole story."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {BENTO.map((b) =>
              b.cs && b.proof ? (
                <article key={b.client} className={`flex flex-col rounded-3xl border border-[#e7e8f0] bg-white p-6 sm:p-7 ${b.wide ? "lg:col-span-2" : ""}`}>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">{b.tag}</p>
                  <h3 className={`${H} mt-2 text-2xl  tracking-tight text-[#0a0f2e]`}>{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5b6472]">{b.line}</p>
                  <div className="mt-5 flex-1">
                    <ProofImage
                      src={b.proof.src}
                      alt={b.proof.alt}
                      width={b.proof.width}
                      height={b.proof.height}
                      frameAspect={b.wide ? "16 / 7" : "4 / 3"}
                      sizes={b.wide ? "(max-width: 1024px) 100vw, 740px" : "(max-width: 1024px) 100vw, 360px"}
                    />
                  </div>
                  <Link href={detailUrl(b.cs)} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#534AB7]">
                    {b.cs.client} case study <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {/* 4 · MID FORM */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#dcdaf6] bg-[#f6f5ff] px-6 py-10 text-center sm:px-10">
          <h2 className={`${H} text-2xl  tracking-tight text-[#0a0f2e] sm:text-3xl`}>Want to know where your site stands?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#5b6472]">
            The same checks behind the results above, run on your site and your competitors. Free, written by me.
          </p>
          <div className="mt-7">
            <PillForm source="homepage-v3:mid" cta="Check my site" />
          </div>
        </div>
      </section>

      {/* 5 · WHO IT'S FOR */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="Who it's for" title="Three kinds of business. One way of working." />
          <AudienceTabs tabs={TABS} />
        </div>
      </section>

      {/* 6 · RECORDED LIVE */}
      <section className="bg-[#f7f7fc] px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Recorded live"
            title="Don't take the screenshots on trust — watch them"
            sub="Screen recordings made inside each client's own accounts. A screenshot can be edited; a live session in the real account is far harder to fake."
          />
          <VideoGallery videos={RECORDED_VIDEOS} badge="Recorded live" columns={3} />
        </div>
      </section>

      {/* 7 · HOW IT WORKS */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="How it works" title="From your URL to a Monday report" />
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-3xl border border-[#e7e8f0] bg-white p-7">
                <span className={`${H} flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f0fb] text-lg  text-[#534AB7]`}>{s.n}</span>
                <h3 className={`${H} mt-5 text-xl  text-[#0a0f2e]`}>{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#5b6472]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 · FOUNDER + REVIEW */}
      <section className="bg-[#0a0f2e] px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Image
              src="/images/mubashar-sharif.jpg"
              alt="Mubashar Sharif, founder of SearchPrex"
              width={320}
              height={320}
              className="h-32 w-32 flex-shrink-0 rounded-3xl object-cover sm:h-40 sm:w-40"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a79fed]">Who does the work</p>
              <h2 className={`${H} mt-2 text-3xl  tracking-tight text-white`}>Mubashar Sharif</h2>
              <p className="mt-1 text-sm text-white/65">
                Founder · 5+ years in SEO · {certCount} Semrush certificates
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                Every audit, page and Monday report is mine. No sales team, no account managers, no juniors — which is why SearchPrex takes one client per city. What I won&apos;t do: promise a ranking, or put a number on this site without a screenshot behind it.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { label: "LinkedIn", href: LINKEDIN },
                  { label: "Trustpilot", href: "https://www.trustpilot.com/review/searchprex.com" },
                  { label: "YouTube", href: "https://www.youtube.com/@SearchPrex" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white/85 transition-colors hover:border-white/50"
                  >
                    {l.label} <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ))}
                <Link href="/about" className="inline-flex items-center rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white/85 transition-colors hover:border-white/50">
                  About SearchPrex
                </Link>
              </div>
            </div>
          </div>

          <figure className="rounded-3xl bg-white p-7 text-[#0a0f2e]">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed">&ldquo;{review.body}&rdquo;</blockquote>
            <figcaption className="mt-5 flex items-center justify-between gap-3 text-sm">
              <span>
                <strong className="block">{review.author}</strong>
                <span className="text-[#5b6472]">Ecommerce, USA · {review.date}</span>
              </span>
              <a
                href="https://www.trustpilot.com/review/searchprex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1a7d59]"
              >
                On Trustpilot →
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 9 · PRICING */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="Pricing" title="A number before any call" sub="Month to month. The figure within each range depends on how many pages, locations and practice areas the plan covers." />
          <div className="grid gap-5 md:grid-cols-3">
            {RETAINER_PLANS.map((p) => (
              <div
                key={p.niche}
                className={`flex flex-col rounded-3xl border p-7 ${p.featured ? "border-[#534AB7] shadow-[0_12px_40px_rgba(83,74,183,0.15)]" : "border-[#e7e8f0]"}`}
              >
                <p className="text-sm font-bold text-[#0a0f2e]">{p.niche}</p>
                <p className="mt-1 text-xs text-[#5b6472]">{p.best}</p>
                <p className={`${H} mt-5 text-3xl  tracking-tight text-[#0a0f2e]`}>
                  {formatRange(p)}
                  <span className="text-sm font-semibold text-[#5b6472]"> / mo</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-[#374151]">
                  {p.includes.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
                <a
                  href="#get-started"
                  className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    p.featured ? "bg-[#1a7d59] text-white hover:bg-[#196b4d]" : "border border-[#dcdfea] text-[#0a0f2e] hover:border-[#534AB7]"
                  }`}
                >
                  Start with the free tear-down
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · COVERAGE — every state and city page, compact */}
      <section className="bg-[#f7f7fc] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="Where" title={`Law firm and local SEO in ${LOCATION_STATES.length} states, ${LOCATION_CITY_COUNT} cities`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATION_STATES.map((s) => (
              <div key={s.slug} className="rounded-2xl border border-[#e7e8f0] bg-white px-5 py-4">
                {s.hubHref ? (
                  <Link href={s.hubHref} className="text-sm font-bold text-[#0a0f2e] hover:text-[#534AB7]">
                    {s.name}
                  </Link>
                ) : (
                  <p className="text-sm font-bold text-[#0a0f2e]">{s.name}</p>
                )}
                <p className="mt-1.5 text-sm leading-relaxed">
                  {s.cities.map((c, i) => (
                    <span key={c.href}>
                      <Link href={c.href} className="text-[#5b6472] hover:text-[#534AB7]">
                        {c.name}
                      </Link>
                      {i < s.cities.length - 1 ? <span className="text-[#c4c8d4]"> · </span> : null}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link href="/locations" className="inline-flex items-center gap-1 text-sm font-bold text-[#534AB7]">
              All locations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="FAQ" title="Straight answers" />
          <FaqAccordion faqs={FAQS} />
          <p className="mt-6 text-center">
            <Link href="/faq" className="inline-flex items-center gap-1 text-sm font-bold text-[#534AB7]">
              More questions <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* 12 · CLOSE */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#0a0f2e] px-6 py-14 text-center sm:px-12">
          <h2 className={`${H} mx-auto max-w-2xl text-3xl  tracking-tight text-white sm:text-4xl`}>
            Send me your URL. I&apos;ll tell you what&apos;s holding it back.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            A written tear-down of your site and the competitors above you, within 24 hours.
          </p>
          <div className="mt-8">
            <PillForm source="homepage-v3:close" tone="dark" />
          </div>
        </div>
      </section>

      {/* 13 · LEARN */}
      <section className="border-t border-[#eef0f4] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.16em] text-[#534AB7]">Free to read</p>
          <div className="grid gap-5 md:grid-cols-3">
            {LEARN.map((l) => {
              const Icon = l.icon;
              return (
                <Link key={l.href} href={l.href} className="group rounded-3xl border border-[#e7e8f0] p-6 transition-all hover:border-[#534AB7] hover:shadow-md">
                  <Icon className="h-5 w-5 text-[#534AB7]" aria-hidden />
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#5b6472]">{l.kind}</p>
                  <p className={`${H} mt-1 text-lg  text-[#0a0f2e] group-hover:text-[#534AB7]`}>{l.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5b6472]">{l.body}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <p className="bg-[#fff5f7] py-3 text-center text-xs text-[#7a1026]">
        Internal redesign test · noindex · the live home page is{" "}
        <Link href="/" className="font-bold underline">
          /
        </Link>
      </p>

      <StickyMobileCTA />
    </main>
  );
}
