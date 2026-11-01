import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/app/blog/[slug]/posts";
import { caseStudies, detailUrl } from "@/app/case-studies/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";
const PROFILE_URL = `${SITE}/author/mubashar-sharif`;
const LINKEDIN_URL = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";

export const metadata: Metadata = {
  title: "Mubashar Sharif | U.S. Market SEO Specialist",
  description:
    "Mubashar Sharif is a Semrush-certified U.S. market SEO specialist with 5+ years of experience in technical SEO, local SEO, law firm SEO, and ecommerce SEO.",
  authors: [{ name: "Mubashar Sharif", url: PROFILE_URL }],
  creator: "Mubashar Sharif",
  alternates: { canonical: PROFILE_URL },
  openGraph: {
    title: "Mubashar Sharif | U.S. Market SEO Specialist",
    description:
      "U.S. market SEO strategy backed by hands-on work and published case studies across ecommerce, local services, and home services.",
    url: PROFILE_URL,
    type: "profile",
    images: [{ url: `${SITE}/images/mubashar-sharif.jpg`, alt: "Mubashar Sharif, founder of SearchPrex" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashar Sharif | U.S. Market SEO Specialist",
    description:
      "Semrush-certified SEO specialist with 5+ years of experience helping U.S. businesses improve technical, local, law firm, and ecommerce SEO.",
    images: [{ url: `${SITE}/images/mubashar-sharif.jpg`, alt: "Mubashar Sharif, founder of SearchPrex" }],
  },
};

const featuredCaseStudies = [
  {
    key: "ecommerce/smk-store",
    client: "SMK Store",
    market: "U.S. ecommerce",
    focus: "Technical SEO across a large WooCommerce catalog, including crawl efficiency, indexing, product content, and site quality.",
    image: "/images/clients/smk-store.png",
    imageAlt: "SMK Store client logo",
  },
  {
    key: "hvac/local-hvac-services",
    client: "HVAC Services Team",
    market: "Simi Valley, California",
    focus: "Local search work that earned a Google AI Overview citation and page-one visibility for local AC installation searches.",
    image: "/images/clients/hvac-services-team.webp",
    imageAlt: "HVAC Services Team client logo",
  },
  {
    key: "cleaning/dolls-cleaning",
    client: "Doll's Cleaning",
    market: "Chesterfield, Michigan",
    focus: "Local SEO built around nearby service intent, Google Business Profile signals, and verified Search Console growth.",
    image: "/images/case-studies/dolls-cleaning-local-van.webp",
    imageAlt: "Doll's Cleaning service van",
  },
  {
    key: "ecommerce/michigan-outdoor-sports",
    client: "Michigan Sports & Outdoor",
    market: "Michigan, United States",
    focus: "Indexing recovery and crawl improvements for a large ecommerce catalog, measured in Google Search Console.",
    image: "/images/clients/michigan-sports-outdoor.png",
    imageAlt: "Michigan Sports & Outdoor client logo",
  },
  {
    key: "home-services/door-doctor",
    client: "Door Doctor",
    market: "U.S. multi-location home services",
    focus: "Google Business Profile work for a multi-location door repair business, with interactions checked against its profile report.",
    image: "/images/clients/door-doctor.png",
    imageAlt: "Door Doctor client logo",
  },
];

const expertise = [
  {
    title: "Technical SEO Audits and Indexing Recovery",
    description: "Find the crawl, indexing, architecture, and performance issues that stop valuable pages from earning visibility.",
    href: "/services/technical-seo/technical-seo-audit",
    linkText: "Explore technical SEO audits",
  },
  {
    title: "Local SEO for U.S. Service Businesses",
    description: "Connect service pages, local search intent, and Google Business Profile signals to the places a business actually serves.",
    href: "/services/local-seo",
    linkText: "Explore local SEO services",
  },
  {
    title: "Law Firm SEO for U.S. Attorneys",
    description: "Build clear practice-area and location pages that answer prospective clients' questions and make the next step easy.",
    href: "/services/law-firm-seo",
    linkText: "Explore law firm SEO",
  },
  {
    title: "Ecommerce SEO for U.S. Online Stores",
    description: "Improve product discovery and organic performance by strengthening catalog structure, indexability, and useful product content.",
    href: "/services/ecommerce-seo",
    linkText: "Explore ecommerce SEO",
  },
];

export default function MubasharAuthorPage() {
  const studies = featuredCaseStudies.flatMap((selection) => {
    const study = caseStudies.find(
      (candidate) => `${candidate.slug.industry}/${candidate.slug.client}` === selection.key,
    );
    return study ? [{ ...selection, study }] : [];
  });

  const authoredPosts = posts
    .filter((post) => post.author.name.toLowerCase().includes("mubashar"))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${PROFILE_URL}/#profile`,
    url: PROFILE_URL,
    name: "Mubashar Sharif — Author Profile",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE}/#founder`,
      name: "Mubashar Sharif",
      url: PROFILE_URL,
      image: `${SITE}/images/mubashar-sharif.jpg`,
      jobTitle: "Founder & U.S. Market SEO Specialist",
      worksFor: { "@id": `${SITE}/#organization` },
      knowsAbout: [
        "Technical SEO",
        "U.S. market SEO",
        "Crawlability and indexation",
        "Local SEO",
        "Law firm SEO",
        "Ecommerce SEO",
        "Google Business Profile optimization",
      ],
      sameAs: [LINKEDIN_URL],
      hasCredential: { "@type": "EducationalOccupationalCredential", name: "Semrush SEO Certification" },
    },
  };

  return (
    <main className="min-h-screen bg-white pt-24 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <section className="border-b border-slate-200 bg-slate-50 text-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 md:flex-row-reverse md:justify-between md:gap-12">
          <div className="w-full max-w-2xl text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">SearchPrex founder and U.S. market SEO specialist</p>
            <h1 className="font-sans text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">Mubashar Sharif</h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Practical SEO for American law firms, local service companies, and ecommerce brands, informed by hands-on work in U.S. search markets.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">Semrush certified</span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">5+ years in SEO</span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">U.S. market experience</span>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-100">
                View LinkedIn profile
              </a>
              <a href="#case-studies" className="inline-flex rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">
                Read U.S. case studies
              </a>
            </div>
          </div>
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-slate-200 sm:h-48 sm:w-48">
            <Image src="/images/mubashar-sharif.jpg" alt="Mubashar Sharif, founder of SearchPrex and U.S. market SEO specialist" fill priority sizes="(max-width: 640px) 160px, 192px" className="object-cover object-top" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:gap-14">
          <article>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">About the author</p>
            <h2 className="mt-2 max-w-3xl font-sans text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">U.S. Market SEO Expert</h2>
            <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-slate-600">
              <p>Mubashar Sharif is the founder of SearchPrex and a Semrush-certified SEO specialist with more than five years of hands-on experience. He works with U.S. businesses on technical SEO, local visibility, law firm marketing, and ecommerce search.</p>
              <p>Based in Pakistan and working remotely with American clients, Mubashar focuses on the details that shape U.S. search performance: the services a business offers, the locations it genuinely serves, the way its website can be crawled, and the questions people ask before they call or buy. His work includes <Link href="/services/technical-seo/technical-seo-audit" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">technical SEO audits</Link>, <Link href="/services/local-seo" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">local SEO</Link>, and <Link href="/services/law-firm-seo" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">SEO for law firms</Link>.</p>
              <p>He documents results with the evidence available for each project. The case studies below identify the client, market, measured outcome, timeframe, and source where those details are recorded, so readers can see what a result does and does not establish.</p>
            </div>
          </article>
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Market and specialties</p>
            <h2 className="mt-2 font-sans text-xl font-black tracking-tight text-slate-950">U.S. SEO Services and Areas of Expertise</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Remote, founder-led SEO for businesses serving American customers, from local service areas to nationwide ecommerce catalogs.</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li>Technical SEO and indexation</li>
              <li>Local SEO and Google Business Profiles</li>
              <li>Law firm and practice-area SEO</li>
              <li>Ecommerce SEO for large catalogs</li>
            </ul>
            <Link href="/locations" className="mt-5 inline-block text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">See U.S. service locations</Link>
          </aside>
        </div>
      </section>

      <section id="case-studies" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">U.S. market evidence</p>
              <h2 className="mt-2 font-sans text-3xl font-black tracking-tight text-slate-950">U.S. SEO Case Studies and Client Results</h2>
              <p className="mt-3 leading-7 text-slate-600">Ecommerce, local services, and home-service projects, each linked to its full case study and supporting details.</p>
            </div>
            <Link href="/case-studies" className="text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">Browse all case studies</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {studies.map(({ study, client, market, focus, image, imageAlt }) => (
              <Link key={study.id} href={detailUrl(study)} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-400 hover:shadow-md sm:p-6">
                <div className="flex min-h-16 items-center gap-4">
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <Image src={image} alt={imageAlt} fill sizes="64px" className="object-contain p-1" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{market}</p>
                    <h3 className="mt-1 font-sans text-lg font-black tracking-tight text-slate-950">{client}</h3>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{focus}</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <span key={`${study.id}-${metric.l}`} className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700"><strong className="text-slate-950">{metric.v}</strong> {metric.l}</span>
                  ))}
                </div>
                <span className="mt-4 text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 group-hover:decoration-slate-700">Read the full case study</span>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-6 text-slate-600">SearchPrex also lists Garage Door Pros MI among its U.S. client work. For related guidance, see our <Link href="/services/local-seo" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">local SEO services</Link> for service-area businesses and the published <Link href="/case-studies/home-services/door-doctor" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">Door Doctor case study</Link>.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">How he helps</p>
          <h2 className="mt-2 font-sans text-3xl font-black tracking-tight text-slate-950">SEO Services for U.S. Law Firms, Local Businesses, and Ecommerce</h2>
          <p className="mt-3 leading-7 text-slate-600">Start with the search problem your business needs to solve, then explore the relevant service and practical resources.</p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {expertise.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-sans text-lg font-black tracking-tight text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <Link href={item.href} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">{item.linkText}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-semibold uppercase tracking-widest text-slate-500">By Mubashar Sharif</p><h2 className="mt-2 font-sans text-3xl font-black tracking-tight text-slate-950">SEO Guides and Articles by Mubashar Sharif</h2></div>
            <Link href="/blog" className="text-sm font-semibold text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700">Explore the blog</Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {authoredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400 hover:shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{post.category}</p>
                <h3 className="mt-2 font-sans font-black leading-6 tracking-tight text-slate-950">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Work with SearchPrex</p>
            <h2 className="mt-2 font-sans text-2xl font-black tracking-tight text-slate-950">Get a U.S. SEO Audit from Mubashar Sharif</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Request a founder-led review of your website, local search presence, and the next steps worth prioritizing.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/free-audit" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Request a free SEO audit</Link>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">Connect on LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}
