import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import DocketHubPreview from "@/components/DocketHubPreview";
import PersonalInjuryExecutiveView from "@/components/PersonalInjuryExecutiveView";
import PracticeLocationsMap from "@/components/PracticeLocationsMap";
import PracticePageTracker from "@/components/PracticePageTracker";
import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
import { AuthorCard, FaqList } from "@/components/layout";
import { Band, BandIntro, FaqBand, GuaranteeCard, ServiceHero } from "@/components/ServiceBands";
import { CITY_PAGES } from "@/lib/city-pages";
import type { IndustryPage } from "@/lib/industry-pages";
import { CALL_HREF } from "@/lib/offer";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const PRIMARY_CTA_EVENT = (page: IndustryPage) => /trial/i.test(page.primaryCta.label) ? "trial_click" : undefined;
const SUCCESS_COPY: Record<string, string> = {
  "personal-injury": "I’ll review your injury search path and email the trial next steps within 24 hours.",
  "family-law": "I’ll email your private written audit within 24 hours. I won’t call unless you ask.",
  "criminal-defense": "I’ll review the charge-page and call path, then email the next step within 24 hours.",
  "estate-planning": "I’ll map the life-event and probate search paths and email your Search Map within 24 hours.",
  "mass-torts": "I’ll review docket readiness and email the audit next step within 24 hours.",
};

function localizeTerm(term: string, city: { city: string; state: string; county: string }) {
  return term
    .replaceAll("[city]", city.city)
    .replaceAll("[state]", city.state)
    .replaceAll("[county]", city.county);
}

function SectionCards({ items }: { items: IndustryPage["journey"] }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => (
        <article key={`${item.stage}-${i}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{item.stage}</p>
          <p className="mt-3 text-sm font-bold leading-relaxed text-slate-950">“{item.query}”</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.response}</p>
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm font-semibold leading-relaxed text-slate-800">Next: {item.next}</p>
        </article>
      ))}
    </div>
  );
}

export default function PracticePage({ page }: { page: IndustryPage }) {
  const source = `service:law-firm-seo/${page.slug}`;
  const sourcePage = `/services/law-firm-seo/${page.slug}`;
  const cities = page.locationsMentioned
    .map((slug) => CITY_PAGES.find((city) => city.citySlug === slug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city));
  const privateAudit = page.slug === "family-law";
  const primaryTarget = page.primaryCta.target === "#get-started" ? "#hero-form" : page.primaryCta.target;
  const localizedTerms = cities.flatMap((city) => page.keywordMap.local.slice(0, 2).map((term) => localizeTerm(term, city)));

  if (page.slug === "personal-injury") {
    return (
      <main className="pb-20 md:pb-0">
        <PracticePageTracker practiceArea={page.slug} />
        <PersonalInjuryExecutiveView page={page} cities={cities} />
      </main>
    );
  }

  return (
    <main className="pb-20 md:pb-0">
      <PracticePageTracker practiceArea={page.slug} />
      <ServiceHero
        crumb={page.name}
        parent={{ label: "Law Firm SEO", href: "/services/law-firm-seo" }}
        eyebrow={`Law firm SEO · ${page.name}`}
        title={page.h1}
        accent=""
        subtitle={page.heroSub}
        primary={{ href: primaryTarget, label: page.primaryCta.label, event: PRIMARY_CTA_EVENT(page) }}
        secondary={{ href: page.secondaryCta.target, label: page.secondaryCta.label, event: page.secondaryCta.event }}
        trustPoints={["One firm per city", "Founder replies within 24 hours", "90-day money-back guarantee"]}
        aside={
          <div id="hero-form" className="scroll-mt-24">
            <ArticleLeadMagnet
              variant="sidebar"
              source={source}
              sourcePage={sourcePage}
              practiceArea={page.slug}
              buttonText={page.primaryCta.label}
              hideBookingLink={privateAudit}
              copy={{
                eyebrow: page.slug === "family-law" ? "Private · email only" : "Founder-reviewed next step",
                headline: page.primaryCta.label,
                sub: page.slug === "estate-planning"
                  ? "Send your firm URL and email. I’ll map the life-event and probate searches your site can answer, then reply within 24 hours."
                  : page.slug === "mass-torts"
                    ? "Send your URL and email for a docket-readiness review. I’ll reply within 24 hours with the next step."
                    : "Send your URL and work email. I’ll review the search path and reply within 24 hours.",
                success: SUCCESS_COPY[page.slug],
              }}
            />
          </div>
        }
      />

      <section id="quick-answer" className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">A direct answer</p>
            <p className="mt-3 text-base leading-relaxed text-slate-800">{page.answerCapsule}</p>
            <p className="mt-5 text-xs font-medium text-slate-500">By Mubashar Sharif · Last reviewed October 31, 2026</p>
          </div>
        </div>
      </section>

      <Band>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Illustrative scenario, not a client case</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{page.story.title}</h2>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-slate-800">{page.story.close}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{ label: page.story.leftLabel, body: page.story.leftBody }, { label: page.story.rightLabel, body: page.story.rightBody }].map((column) => (
              <div key={column.label} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">{column.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{column.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-7 text-center">
          <Link href="#practice-framework" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4">
            See how the page turns this moment into a useful search path <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Band>

      <Band>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{page.visual.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{page.visual.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">{page.visual.caption}</p>
            <Link href="#keyword-map" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4">
              See the U.S. search intent map <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image src={page.visual.src} alt={page.visual.alt} width={1365} height={768} sizes="(max-width: 1024px) 100vw, 48vw" className="h-auto w-full object-cover" />
          </figure>
        </div>
      </Band>

      <Band id="keyword-map" dark>
        <BandIntro eyebrow={page.name} title={page.journeyTitle} lead="This map turns a prospective client's questions into focused pages, accurate answers and contact options. It helps the firm plan useful content across the decision journey without assuming search volume, legal outcomes or guaranteed conversions." />
        <SectionCards items={page.journey} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { label: "Ready to compare", terms: page.keywordMap.commercial },
            { label: "Problem-aware questions", terms: page.keywordMap.problem },
            { label: "Local U.S. intent", terms: localizedTerms.length ? localizedTerms : page.keywordMap.local },
          ].map((group) => (
            <div key={group.label} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{group.label}</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-100">
                {group.terms.map((term) => <li key={term}>“{term}”</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-relaxed text-slate-500">{page.keywordMap.note}</p>
        <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-relaxed text-slate-500">
          Search examples are illustrative, not search-volume claims. Validate them in Search Console or the <Link className="font-bold underline" href="/tools/keyword-research">law firm keyword research tool</Link>. Any sample legal copy requires attorney review before publishing.
        </p>
      </Band>

      <Band>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">A clear reason to choose the approach</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{page.usp.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{page.usp.body}</p>
            <Link href="#get-started" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">Ask for the practice-area audit <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {page.usp.points.map((point, index) => (
              <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black text-slate-400">0{index + 1}</p>
                <p className="mt-3 text-sm font-bold leading-relaxed text-slate-900">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band dark>
        <BandIntro eyebrow="Make the trade-off visible" title={page.comparison.title} lead={page.comparison.intro} />
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="hidden grid-cols-[1.1fr_0.8fr_1.4fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-500 md:grid">
            <span>Approach</span><span>Strength</span><span>Trade-off</span>
          </div>
          {page.comparison.rows.map((row) => (
            <div key={row.option} className="grid gap-2 border-b border-slate-200 px-5 py-5 last:border-b-0 md:grid-cols-[1.1fr_0.8fr_1.4fr] md:gap-4">
              <p className="font-black text-slate-950">{row.option}</p>
              <p className="text-sm font-semibold text-slate-800"><span className="mr-2 text-xs uppercase tracking-wide text-slate-400 md:hidden">Strength:</span>{row.strength}</p>
              <p className="text-sm leading-relaxed text-slate-600"><span className="mr-2 text-xs uppercase tracking-wide text-slate-400 md:hidden">Trade-off:</span>{row.tradeoff}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band id="practice-framework">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{page.module.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{page.module.title}</h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700">{page.module.answer}</p>
          {page.slug === "mass-torts" ? (
            <DocketHubPreview items={page.module.items} />
          ) : (
            <div className={`mt-8 grid gap-4 ${page.module.items.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
              {page.module.items.map((item) => (
                <article key={`${item.label}-${item.title}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">{item.label}</p>
                  <h3 className="mt-2 text-base font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          )}
          {page.module.note ? <p className="mt-5 text-sm leading-relaxed text-slate-500">{page.module.note}</p> : null}
          {page.module.link ? <Link href={page.module.link.href} data-track-event={page.module.link.href === "/intake-assistant" ? "intake_demo_start" : undefined} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 underline underline-offset-4">{page.module.link.label} <ArrowRight className="h-4 w-4" aria-hidden /></Link> : null}
          {page.module.link?.href === "/intake-assistant" ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
              <p className="mb-4 text-sm font-semibold text-slate-700">Live illustrative demo. It does not provide legal advice or replace your firm's approved intake process.</p>
              <div data-track-event="intake_demo_start" data-track-once="true"><IntakeAssistant embedded /></div>
            </div>
          ) : null}
          <div className="mt-8 rounded-2xl border-l-4 border-slate-900 bg-slate-50 p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Named framework · {page.framework.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">{page.framework.definition}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">Source: {page.framework.source} · Framework dated {page.framework.date}. Listed in <Link href="/llms.txt" className="font-bold underline">SearchPrex llms.txt</Link>.</p>
          </div>
        </div>
      </Band>

      <ServiceProofStrip
        id="proof"
        title="Relevant SEO work, shown with its actual industry and period"
        intro="The examples below show SearchPrex work in local services, with the client type and reporting period named. They can demonstrate SEO execution and AI visibility in those industries, but they do not establish legal rankings, consultations or case volume."
        moreHref="/case-studies"
        moreLabel="See the verified case studies"
        shots={[
          { src: "/images/proof/local-dolls-gsc-comparison.jpg", alt: "Google Search Console comparison for D.O.L.L.S. Cleaning in Michigan: 192 clicks and 41K impressions in June 2025, then 264 clicks and 106K impressions in July 2025.", width: 626, height: 239, figure: "192 → 264", figureLabel: "monthly organic clicks · June to July 2025", caption: "Source: Google Search Console for D.O.L.L.S. Cleaning, a Michigan local-service business. June–July 2025." },
          { src: "/images/proof/local-hvac-ai-overview.png", alt: "Google AI Overview naming HVAC Services Team for a Simi Valley air-conditioning installation query.", width: 717, height: 292, caption: "Google AI Overview example for HVAC Services Team, a local-service business; not a law-firm result." },
        ]}
        footnote="SearchPrex has no published law-firm case study yet. These examples are from local-service businesses and do not establish a legal ranking or case-volume outcome."
      />

      <Band id="trial" dark>
        <BandIntro eyebrow="A seven-day working trial" title="A small, reviewable first step before an ongoing engagement" lead="The trial is a short diagnostic and planning sprint with a defined review at the end of seven days. It does not promise rankings, cases or outcomes; sample legal copy remains subject to the firm's attorney approval before publication." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {page.trialSteps.map((step) => (
            <article key={step.when} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">{step.when}</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-500">Month to month · 90-day money-back guarantee · No guaranteed rankings or case volume.</p>
      </Band>

      <Band>
        <BandIntro eyebrow="Why SearchPrex" title="One person accountable for the work" lead="SearchPrex is remote-first, founder-led and works US business hours. There is no published law-firm case study yet; the proof above is labeled by industry, and the attorney reviews legal copy before it goes live." />
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg font-semibold leading-relaxed text-slate-800">{page.founderAngle}</p>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          <a className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50" href="https://clutch.co/profile/searchprex" target="_blank" rel="noopener noreferrer">Clutch company profile</a>
          <a className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50" href="https://www.trustpilot.com/review/searchprex.com" target="_blank" rel="noopener noreferrer">Trustpilot profile</a>
          <a className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50" href="https://www.linkedin.com/company/searchprex" target="_blank" rel="noopener noreferrer">SearchPrex on LinkedIn</a>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <AuthorCard name="Mubashar Sharif" role="Founder · SEO strategist" quote="I will show you the work and its source, and I will label results from other industries clearly. You work directly with me on the audit and plan." imageSrc="/images/mubashar-sharif.jpg" imageAlt="Mubashar Sharif, Founder of SearchPrex" linkedinUrl={LINKEDIN} badges={["Semrush certified", "HubSpot certified"]} />
        </div>
      </Band>

      <Band id="pricing" dark>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Transparent pricing</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950">{page.name} SEO: ${page.priceRange.min.toLocaleString()}–${page.priceRange.max.toLocaleString()} per month</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">The final scope depends on practice areas, locations and content volume. Work is month to month. The 7-day trial is a bounded planning sprint; the 90-day money-back guarantee applies to ongoing work as described in the written engagement terms.</p>
            <Link href="/pricing" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4">Review full pricing and terms <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[{ label: "First step", value: "7 days", detail: "Bounded diagnostic and review" }, { label: "Ongoing", value: `$${page.priceRange.min.toLocaleString()}–$${page.priceRange.max.toLocaleString()}`, detail: "Month-to-month scope" }, { label: "Protection", value: "90 days", detail: "Money-back terms in writing" }].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-black text-slate-950">{item.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <GuaranteeCard />
        </div>
      </Band>

      <Band>
        <BandIntro eyebrow="Local relevance" title={`${page.name} SEO where the site has local pages`} lead="Each linked location page covers a local market and venue separately. The practice page explains the service and content method, while a location page covers local searches, courts and context; both pages link to the other where the connection is useful." />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <Link key={city.citySlug} href={`/locations/${city.stateSlug}/${city.citySlug}`} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-slate-500">
              <MapPin className="h-4 w-4" aria-hidden />
              {page.name} SEO in {city.city}, {city.stateAbbr}
            </Link>
          ))}
          {page.showAllLocations ? <Link href="/locations" className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-slate-500">Browse all locations</Link> : null}
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-slate-600">Where the local page has matching practice demand, it links back here with a descriptive practice-area anchor.</p>
      </Band>

      <Band dark>
        <BandIntro eyebrow="Local service area" title={`${page.name} SEO in the markets we serve`} lead="Each map below is a real served-market reference point, not a claim that SearchPrex has an office there. Use the linked city page for local context, then ask for a practice-area audit built around your firm’s actual service area." />
        <div className="mt-10"><PracticeLocationsMap practiceName={page.name} cities={cities} /></div>
      </Band>

      <Band dark>
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">Related practice</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">When this work overlaps with {page.lateralLink.slug.replaceAll("-", " ")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{page.lateralLink.reason} The pages stay distinct: each serves its own search intent and links across only when the next resource helps a reader understand the relationship between these practice areas.</p>
          <Link href={`/services/law-firm-seo/${page.lateralLink.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 underline underline-offset-4">{page.lateralLink.anchor} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {page.resourceLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-400">
              <span className="text-sm font-black text-slate-950">{link.label}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">{link.context}</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center"><Link href="/services/law-firm-seo" className="text-sm font-bold text-slate-900 underline underline-offset-4">Back to the law firm SEO hub</Link></p>
      </Band>

      <ServiceBlogTeaser topic="law-firm" />
      <FaqBand title={`${page.name} SEO questions, answered`}>
        <FaqList faqs={[...page.capsules, ...page.faqs]} name={`law-firm-seo-${page.slug}-faq`} />
      </FaqBand>

      <section id="get-started" className="scroll-mt-20">
        <ArticleLeadMagnet
          variant="bottom"
          source={source}
          sourcePage={sourcePage}
          practiceArea={page.slug}
          buttonText={page.primaryCta.label}
          hideBookingLink={privateAudit}
          copy={{
            eyebrow: "No ranking or case-volume promises",
            headline: page.slug === "mass-torts" ? "Request a docket-readiness audit" : page.slug === "estate-planning" ? "Get your free estate-planning Search Map" : page.primaryCta.label,
            sub: privateAudit
              ? "Send your website and email. I’ll reply with a private written audit within 24 hours; I won’t call unless you ask."
              : page.slug === "estate-planning"
                ? "Send your website and email. The founder will review the life-event and probate search paths, then reply within 24 hours with the next step."
                : "Send your website and work email. The founder will review the request and reply within 24 hours with next steps, including the 90-day terms and scope if the fit is right.",
            success: SUCCESS_COPY[page.slug],
          }}
        />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <a href={CALL_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-800">Book a call</a>
        <Link href={primaryTarget} data-track-event={PRIMARY_CTA_EVENT(page)} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-950 px-3 text-center text-xs font-bold leading-tight text-white">{page.primaryCta.label}</Link>
      </div>
    </main>
  );
}
