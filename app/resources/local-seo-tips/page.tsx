import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardCheck, Newspaper, PhoneCall, SearchCheck } from "lucide-react";
import { SITE, founderRef, ORGANIZATION_ID } from "@/lib/site-schema";

const PAGE_URL = `${SITE}/resources/local-seo-tips`;
// The root layout appends " | SearchPrex" to page titles.
const TITLE = "Local SEO Checklist for Small Businesses";
const SOCIAL_TITLE = `${TITLE} | SearchPrex`;
const H1 = "Local SEO Checklist for Small Businesses: 5 Practical Steps";
const DESCRIPTION = "Follow this local SEO checklist to improve your Google Business Profile, build useful local pages, earn customer trust, and track calls and leads.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: SOCIAL_TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "SearchPrex", type: "article", images: [{ url: `${SITE}/images/locations/cleveland-legal-district.webp`, width: 1600, height: 900, alt: "A walkable business district with local shops and services" }] },
  twitter: { card: "summary_large_image", title: SOCIAL_TITLE, description: DESCRIPTION, images: [`${SITE}/images/locations/cleveland-legal-district.webp`] },
};

const eventDates = [
  { date: "October 31, 2026", name: "Halloween", idea: "Promote a real seasonal service, event or community activity; update hours only if they differ." },
  { date: "November 11, 2026", name: "Veterans Day", idea: "Share a genuine community resource or service detail where it is relevant. Avoid using the day as a generic sales hook." },
  { date: "November 26, 2026", name: "Thanksgiving", idea: "Confirm holiday hours across your Business Profile, website and customer communications." },
  { date: "November 27, 2026", name: "Black Friday", idea: "Use only for businesses with a real offer or changed availability; give the offer its own clear landing page." },
  { date: "November 28, 2026", name: "Small Business Saturday", idea: "Highlight a real local partnership, event or service and make the next step easy to find." },
  { date: "December 25, 2026", name: "Christmas Day", idea: "Publish accurate holiday hours and clarify emergency or after-hours service availability." },
  { date: "January 1, 2027", name: "New Year’s Day", idea: "Review opening hours and refresh time-sensitive service information before the new year." },
];

export default function LocalSeoTipsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        mainEntityOfPage: PAGE_URL,
        headline: H1,
        description: DESCRIPTION,
        image: `${SITE}/images/locations/cleveland-legal-district.webp`,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        author: founderRef,
        publisher: { "@id": ORGANIZATION_ID },
        dateModified: "2026-10-25",
        about: [{ "@type": "Thing", name: "Local SEO" }, { "@type": "Thing", name: "Google Business Profile" }, { "@type": "Thing", name: "Local lead generation" }],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Local SEO Tips", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <main className="bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-500"><Link href="/resources" className="hover:text-slate-900">Resources</Link><span className="mx-2">/</span><span className="font-medium text-slate-800">Local SEO Tips</span></nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Local SEO field guide · Updated October 25, 2026</p>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">{H1}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Clear steps for making your local business easier to find, trust and contact—plus a dated U.S. seasonal calendar and a way to measure whether the work is producing real enquiries.</p>
            <a href="#local-seo-checklist" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start with the checklist <ArrowRight className="h-4 w-4" /></a>
          </div>
          <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image src="/images/locations/cleveland-legal-district.webp" alt="A walkable business district with local shops and services" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <figcaption className="sr-only">A local business owner welcomes a customer at her storefront.</figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
        <article className="min-w-0">
          <section aria-labelledby="quick-summary" className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-900">Quick summary</p>
            <h2 id="quick-summary" className="text-lg font-bold text-slate-950">What should a local business do first?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">Keep your Google Business Profile accurate, build useful pages around the services and places you genuinely serve, make trust evidence easy to verify, and remove friction from calling or enquiring. Track qualified calls and leads against a baseline. These steps can improve the path from local discovery to contact, but no ranking or lead increase is guaranteed.</p>
          </section>

          <div className="mb-8 flex flex-wrap gap-2 text-sm">
            <a href="#local-seo-checklist" className="rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:border-emerald-700">Core checklist</a>
            <a href="#seasonal-calendar" className="rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:border-emerald-700">Upcoming dates</a>
            <a href="#lead-growth" className="rounded-full border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:border-emerald-700">Lead growth process</a>
          </div>

          <section id="local-seo-checklist" className="scroll-mt-24">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">Start with the controllables</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">A Local SEO checklist that connects visibility to a customer action</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">Google says local results are mainly shaped by relevance, distance and prominence. A business can strengthen accurate, relevant information and its reputation; it cannot change how far a searcher is from the business or buy a better local rank. <a href="https://support.google.com/business/answer/7091?hl=en" target="_blank" rel="noreferrer" className="font-semibold text-emerald-900 underline underline-offset-4">Read Google’s local ranking guidance.</a></p>
            <ol className="mt-5 space-y-4">
              {[
                ["Make the Business Profile complete and accurate", "Check primary and secondary categories, service details, hours, phone, website, service areas and current photos. Keep special hours current when they change."],
                ["Build pages for real services and markets", "Give each important service a useful page. Add location pages only where you can provide distinct local proof, service details and customer information—not just a swapped city name."],
                ["Earn trust with verifiable evidence", "Ask customers for honest feedback without incentives, respond helpfully, and show real credentials, examples, team details and policies where they support the decision."],
                ["Make calling and booking easy on mobile", "Put the next step where visitors expect it, keep phone numbers and forms usable on small screens, and explain what happens after someone contacts you."],
                ["Measure qualified actions, not just rankings", "Record calls, booked consultations and qualified forms alongside Search Console clicks and impressions. Compare equivalent periods and keep a note of other marketing changes."],
              ].map(([title, body], index) => (
                <li key={title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-900">{index + 1}</span>
                  <div><h3 className="font-semibold text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{body}</p></div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-6 text-slate-700">Use the free <Link href="/resources/google-business-profile-checklist" className="font-semibold text-emerald-900 underline underline-offset-4">Google Business Profile checklist</Link> to review profile basics. For practical profile conversion advice, see <Link href="/blog/get-more-calls-from-google-business-profile" className="font-semibold text-emerald-900 underline underline-offset-4">how to get more calls from your Business Profile</Link>.</p>
          </section>

          <section id="seasonal-calendar" className="mt-12 scroll-mt-24">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-800"><CalendarDays className="h-5 w-5" /></span>
              <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">Dated planning aid</p><h2 className="mt-1 text-2xl font-bold text-slate-950">Upcoming U.S. dates: plan only for events that fit your business</h2></div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">Use events to serve a real customer need or prepare accurate operating details. These are prompts, not a recommendation to create a promotion for every holiday. Dates reviewed October 25, 2026.</p>
            <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {eventDates.map((event) => (
                <article key={event.name} className="grid gap-1 p-4 sm:grid-cols-[145px_1fr] sm:gap-4 sm:p-5">
                  <time className="text-xs font-semibold text-emerald-900">{event.date}</time>
                  <div><h3 className="font-semibold text-slate-950">{event.name}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{event.idea}</p></div>
                </article>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">Thanksgiving and Veterans Day follow the U.S. government holiday calendar; Small Business Saturday’s date is listed by American Express. Recheck dates and local event details before publishing: <a href="https://www.usa.gov/holidays" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2">USAGov holidays</a> · <a href="https://www.americanexpress.com/us/small-business/shop-small/promote" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2">American Express Shop Small</a>.</p>
          </section>

          <section id="lead-growth" className="mt-12 scroll-mt-24">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">A measurable working process</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">How to work toward more local leads without promising a magic number</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">SearchPrex’s approach is to find the gap between local visibility and a completed contact: map the service and market, check what searchers see, improve the relevant profile or page, and measure qualified enquiries. The first step is to record a baseline—calls, form submissions, booked appointments and lead quality—then test one meaningful change at a time.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-950">First: establish the baseline</h3><p className="mt-1 text-sm leading-6 text-slate-600">Choose a consistent period and define what counts as a qualified lead before changing pages or tracking.</p></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-semibold text-slate-950">Then: fix the highest-friction step</h3><p className="mt-1 text-sm leading-6 text-slate-600">Use query, call and form evidence to decide whether the main issue is reach, trust, page relevance or contact flow.</p></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">A “double your leads” outcome is not promised here. Any such result should be shown only with a documented case, defined lead metric, comparable before-and-after periods and relevant context.</p>
          </section>

          <section aria-labelledby="local-seo-next-steps" className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">Put the tips into practice</p>
            <h2 id="local-seo-next-steps" className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">Choose your next Local SEO step</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Start with the part of local visibility you need to improve: profile accuracy, a focused strategy, or staying current with verified changes.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link href="/resources/google-business-profile-checklist" className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-700/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-800"><ClipboardCheck className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-3 font-semibold text-slate-950">Check your Business Profile</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">Review categories, hours, contact details, photos and customer trust signals.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-900">Open the free checklist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link href="/services/local-seo" className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-700/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-800"><SearchCheck className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-3 font-semibold text-slate-950">Build a local visibility plan</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">Connect your service pages, local relevance and customer enquiry path.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-900">Explore Local SEO strategy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link href="/resources/news/local-seo-updates" className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-700/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-800"><Newspaper className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-3 font-semibold text-slate-950">Keep up with local search changes</h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">See dated Google Business Profile and Maps updates before changing your routine.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-900">Read Local SEO news <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            </div>
          </section>

          <p className="mt-8 text-xs leading-5 text-slate-500">SearchPrex provides these steps as general marketing guidance. Local results vary by searcher location, competition, business details and many other factors. Track your own outcomes; no ranking or lead result is guaranteed.</p>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">On this page</p>
            <nav className="mt-3 flex flex-col gap-3 text-sm">
              <a href="#local-seo-checklist" className="font-medium text-slate-700 hover:text-emerald-900">Local SEO checklist</a>
              <a href="#seasonal-calendar" className="font-medium text-slate-700 hover:text-emerald-900">Upcoming dates</a>
              <a href="#lead-growth" className="font-medium text-slate-700 hover:text-emerald-900">Measurable lead process</a>
            </nav>
            <div className="mt-5 border-t border-slate-100 pt-5">
              <PhoneCall className="h-5 w-5 text-emerald-800" aria-hidden="true" />
              <p className="mt-2 font-semibold text-slate-950">Want a second set of eyes?</p>
              <p className="mt-1 text-sm leading-5 text-slate-600">Request a free, founder-reviewed Local SEO audit.</p>
              <Link href="/free-audit" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-900 underline underline-offset-4">Request an audit <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
