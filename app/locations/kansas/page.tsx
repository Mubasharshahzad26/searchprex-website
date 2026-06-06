// app/locations/kansas/[city]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Scale, Gavel, ArrowRight, CheckCircle, Calendar,
  ArrowUpRight, ChevronDown, Landmark, Users, Building2, ShieldCheck,
} from "lucide-react";
import { getCityBySlug, getAllCitySlugs } from "@/lib/kansas-cities";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const NAVY = "#0a0f2e";
 
// ── Static params (pre-render every city) ───────────────────────────────────
export function generateStaticParams() {
  return getAllCitySlugs(); // [{ city: "wichita" }, ...]
}
 
// ── Per-city metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Location Not Found | SearchPrex" };
  const url = `https://searchprex.com/locations/kansas/${city.slug}`;
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: city.metaTitle, description: city.metaDescription, url, type: "website" },
  };
}
 
export default async function KansasCityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
 
  const url = `https://searchprex.com/locations/kansas/${city.slug}`;
 
  // ── JSON-LD: service + FAQ + breadcrumb + founder (E-E-A-T & rich results) ──
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}#service`,
        name: `SearchPrex — Law Firm SEO in ${city.name}, KS`,
        url,
        description: city.metaDescription,
        areaServed: { "@type": "City", name: `${city.name}, Kansas` },
        knowsAbout: ["Law Firm SEO", "Family Law SEO", "Local SEO", "Google Business Profile optimization", "Attorney E-E-A-T"],
        founder: { "@id": "https://searchprex.com/#founder" },
      },
      {
        "@type": "Person",
        "@id": "https://searchprex.com/#founder",
        name: "Mubashar Shahzad",
        jobTitle: "Founder & Senior SEO Strategist",
        sameAs: [
          "https://www.linkedin.com/in/mubashar-shahzad-seo/",
          "https://www.upwork.com/freelancers/~01400266ea842005be",
          "https://medium.com/@mubasharshahzad726",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Kansas", item: "https://searchprex.com/locations/kansas" },
          { "@type": "ListItem", position: 3, name: city.name, item: url },
        ],
      },
    ],
  };
 
  const services = [
    { icon: Scale, title: "Law Firm SEO", desc: city.lawFirmDesc, features: ["Practice-area & geo-targeted pages", "Google Business Profile & map pack", "Technical SEO & Core Web Vitals"] },
    { icon: Gavel, title: "Family Law SEO", desc: city.familyLawDesc, features: ["Divorce & custody content strategy", "Attorney E-E-A-T & YMYL schema", "County-specific landing pages"] },
  ];
 
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 
      {/* ── HERO ── */}
      <section className="bg-[#eaecf3] px-4 pb-20 pt-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center justify-center gap-2 text-xs font-semibold text-[#64748b]">
            <Link href="/" className="transition-colors hover:text-[#0a0f2e]">Home</Link>
            <span>/</span>
            <Link href="/locations/kansas" className="transition-colors hover:text-[#0a0f2e]">Kansas</Link>
            <span>/</span>
            <span className="text-[#0a0f2e]">{city.name}</span>
          </nav>
 
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ borderColor: "rgba(62,180,137,0.35)", color: GREEN_DARK, background: "rgba(62,180,137,0.10)" }}>
            <MapPin className="h-3 w-3" /> {city.county}
          </div>
 
          <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
            {city.heroHeadline}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#475569] sm:text-xl">{city.heroSub}</p>
 
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://calendly.com/contact-searchprex/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#3eb489] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2f9670]">
              <Calendar className="h-4 w-4" /> Book a free strategy call
            </a>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] px-8 py-3.5 text-sm font-bold text-[#0a0f2e] transition-colors hover:border-[#0a0f2e]">
              View results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── QUICK FACTS ── */}
      <section className="border-b border-[#e2e8f0] bg-white px-4 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            { icon: Users, label: "Population", value: city.population },
            { icon: Landmark, label: "County", value: city.county.replace(" County", "") },
            { icon: Scale, label: "Local Courts", value: String(city.courts.length) },
            { icon: ShieldCheck, label: "Founder-Executed", value: "100%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon className="mb-1 h-5 w-5" style={{ color: GREEN }} />
              <p className="text-xl font-black text-[#0a0f2e] sm:text-2xl">{value}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">{label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── OVERVIEW + LOCAL MAP ── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>The {city.name} Market</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              SEO built for {city.name}, not &quot;Kansas&quot;
            </h2>
            <p className="text-[#475569] leading-relaxed">{city.overview}</p>
            {city.localInsight && (
              <div className="mt-5 rounded-xl border-l-4 border-[#3eb489] bg-[#f8f9fc] p-4">
                <p className="text-sm leading-relaxed text-[#475569]">{city.localInsight}</p>
              </div>
            )}
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] shadow-[0_20px_50px_-20px_rgba(10,15,46,0.25)]">
            <iframe
              title={`SearchPrex service area — ${city.name}, KS`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(city.name + ", KS")}&z=11&ie=UTF8&iwloc=&output=embed`}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
 
      {/* ── SERVICES (city-specific copy) ── */}
      <section className="bg-[#eaecf3] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Services in {city.name}</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">How We Help {city.name} Law Firms</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border-2 border-[#e2e8f0] bg-white p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(10,15,46,0.06)" }}>
                  <s.icon className="h-6 w-6" style={{ color: NAVY }} />
                </div>
                <h3 className="mb-2 text-xl font-black tracking-tight text-[#0a0f2e]">{s.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#475569]">{s.desc}</p>
                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569]">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── LOCAL LEGAL LANDSCAPE (local-expert signal) ── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Local Knowledge</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">The {city.name} Legal Landscape</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#475569]">
              We optimize around the courts, communities, and search patterns specific to {city.county}.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Courts */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4" style={{ color: GREEN }} />
                <h3 className="text-sm font-black text-[#0a0f2e]">Courts We Target Around</h3>
              </div>
              <ul className="space-y-2">
                {city.courts.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs leading-relaxed text-[#475569]">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: GREEN }} />{c}
                  </li>
                ))}
              </ul>
            </div>
            {/* Bar association */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="mb-3 flex items-center gap-2">
                <Landmark className="h-4 w-4" style={{ color: GREEN }} />
                <h3 className="text-sm font-black text-[#0a0f2e]">Local Bar</h3>
              </div>
              <p className="text-xs leading-relaxed text-[#475569]">{city.barAssociation}</p>
            </div>
            {/* Nearby areas */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" style={{ color: GREEN }} />
                <h3 className="text-sm font-black text-[#0a0f2e]">Nearby Areas Served</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {city.nearbyAreas.map((a) => (
                  <span key={a} className="rounded-md border border-[#e5e7eb] bg-white px-2 py-0.5 text-[11px] font-semibold text-[#64748b]">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── PRACTICE AREAS + NEIGHBORHOODS (local demand + geo) ── */}
      {city.practiceAreas && (
        <section className="bg-[#eaecf3] px-4 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Practice Areas</p>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">Where {city.name} Firms Win Clients</h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#475569]">
                The practice areas with the strongest, most consistent search demand across {city.county}.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {city.practiceAreas.map((pa) => (
                <div key={pa.name} className="rounded-2xl border border-[#e2e8f0] bg-white p-6">
                  <h3 className="mb-1.5 text-base font-black text-[#0a0f2e]">{pa.name}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{pa.demand}</p>
                </div>
              ))}
            </div>
            {city.neighborhoods && (
              <div className="mt-10 text-center">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#94a3b8]">Neighborhoods we optimize for</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {city.neighborhoods.map((n) => (
                    <span key={n} className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#475569]">{n}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
 
      {/* ── LOCAL GUIDANCE (people-first, helpful) ── */}
      {city.localGuide && (
        <section className="bg-white px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Local Guidance</p>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">Hiring a Lawyer in {city.name}?</h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#475569]">
                Straight, useful advice for anyone searching for legal help in {city.name} — whether or not you ever work with us.
              </p>
            </div>
            <div className="space-y-5">
              {city.localGuide.map((g) => (
                <div key={g.heading} className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
                  <h3 className="mb-2 text-base font-black text-[#0a0f2e]">{g.heading}</h3>
                  <p className="text-sm leading-relaxed text-[#475569]">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
 
      {/* ── FAQ (native <details> — no JS, server-safe, FAQ schema above) ── */}
      <section className="bg-[#eaecf3] px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Common Questions</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">{city.name} Law Firm SEO — FAQs</h2>
          </div>
          <div className="space-y-4">
            {city.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-[#e2e8f0] bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0a0f2e]">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#534AB7] transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#475569]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── E-E-A-T AUTHOR BOX ── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white" style={{ background: NAVY }}>MS</div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-[#0a0f2e]">Strategy led by Mubashar Shahzad</h3>
              <p className="mb-3 text-sm font-semibold" style={{ color: GREEN_DARK }}>Founder &amp; Senior SEO Strategist, SearchPrex</p>
              <p className="mb-4 text-sm leading-relaxed text-[#475569]">
                Your {city.name} campaign is personally executed by the founder — a Semrush- and HubSpot-certified SEO strategist with 5+ years in law firm, ecommerce, and local SEO. No juniors, no outsourcing.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]">
                  <CheckCircle className="h-3 w-3 text-[#16a34a]" /> Semrush Certified
                </a>
                <a href="https://app.hubspot.com/academy/achievements/tc8vffrw/en/1/mubashar-shahzad/seo-ii" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]">
                  <CheckCircle className="h-3 w-3 text-[#16a34a]" /> HubSpot Certified
                </a>
                <a href="https://www.linkedin.com/in/mubashar-shahzad-seo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]">
                  Verify on LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── CTA STRIP ── */}
      <section className="px-4 py-16" style={{ background: "#534AB7" }}>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="mb-1 text-lg font-bold text-white sm:text-xl">Ready to rank your {city.name} law firm?</p>
            <p className="text-sm text-white/70">Book a free 30-minute strategy call — no commitment, no sales pitch.</p>
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <a href="https://calendly.com/contact-searchprex/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#3eb489] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2f9670]">
              <Calendar className="h-4 w-4" /> Book free call
            </a>
            <Link href="/locations/kansas" className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white">
              All Kansas cities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
 































































