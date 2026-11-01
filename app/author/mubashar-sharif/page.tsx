import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/app/blog/[slug]/posts";
import { caseStudies, detailUrl } from "@/app/case-studies/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";
const PROFILE_URL = `${SITE}/author/mubashar-sharif`;
const LINKEDIN_URL = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";

export const metadata: Metadata = {
  title: "Mubashar Sharif, Technical SEO Analyst & SearchPrex Founder",
  description:
    "Meet Mubashar Sharif, founder of SearchPrex and a Semrush-certified SEO analyst with 5+ years of experience in technical SEO. Explore his case studies and articles.",
  alternates: { canonical: PROFILE_URL },
  openGraph: {
    title: "Mubashar Sharif | SearchPrex Author & Founder",
    description:
      "Technical SEO insights, documented case studies, and practical search guidance from Mubashar Sharif, founder of SearchPrex.",
    url: PROFILE_URL,
    type: "profile",
    images: [{ url: `${SITE}/images/mubashar-sharif.jpg`, alt: "Mubashar Sharif, founder of SearchPrex" }],
  },
};

export default function MubasharAuthorPage() {
  const authoredPosts = posts
    .filter((post) => post.author.name.toLowerCase().includes("mubashar"))
    .sort((a, b) => b.date.localeCompare(a.date));
  const studies = caseStudies
    .filter((study) => study.seoType === "Technical SEO" || study.client === "Michigan Outdoor Sports")
    .slice(0, 3);

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
      jobTitle: "Founder & Technical SEO Analyst",
      worksFor: { "@id": `${SITE}/#organization` },
      knowsAbout: ["Technical SEO", "Crawlability", "Indexing", "Site architecture", "Law firm SEO", "Local SEO"],
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">SearchPrex author and founder</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Mubashar Sharif</h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Technical SEO guidance grounded in real website problems, careful analysis, and documented work.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">Semrush Certified</span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">5+ years in SEO</span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">Technical SEO</span>
            </div>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-100">
              View LinkedIn profile
            </a>
          </div>
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-slate-200 sm:h-48 sm:w-48">
            <Image src="/images/mubashar-sharif.jpg" alt="Mubashar Sharif, founder of SearchPrex and technical SEO analyst" fill priority sizes="(max-width: 640px) 160px, 192px" className="object-cover object-top" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,1fr)_300px]">
        <article className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">About the author</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Making technical SEO easier to act on</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
              <p>Mubashar Sharif is the founder of SearchPrex and a Semrush-certified SEO analyst with more than five years of hands-on experience. His work focuses on technical SEO: finding the crawl, indexing, site-structure, and performance issues that can keep useful pages out of search.</p>
              <p>His articles turn those investigations into practical guidance for business owners and marketing teams. When discussing results, he points readers to the related case study and its stated evidence so they can understand what changed, how it was measured, and what the figures do—and do not—show.</p>
              <p>At SearchPrex, Mubashar also works across local search and law firm SEO, connecting technical foundations with the questions real customers ask before they choose a business or contact a firm.</p>
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Selected work</p><h2 className="mt-2 text-2xl font-bold">Case studies</h2></div>
              <Link href="/case-studies" className="hidden text-sm font-semibold text-slate-700 hover:text-slate-950 sm:inline-flex">All case studies</Link>
            </div>
            <div className="grid gap-4">
              {studies.map((study) => (
                <Link key={study.id} href={detailUrl(study)} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-400 hover:shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{study.seoType} | {study.location}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">{study.client}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{study.headline}</p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-widest text-slate-500">By Mubashar</p><h2 className="mt-2 text-2xl font-bold">Articles and practical guides</h2></div>
            </div>
            <div className="grid gap-3">
              {authoredPosts.slice(0, 8).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-slate-400 hover:bg-slate-50">
                  <span><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{post.category}</span><span className="mt-1 block font-semibold text-slate-900">{post.title}</span></span>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="mt-5 inline-flex font-semibold text-slate-700 hover:text-slate-950">Explore all articles</Link>
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold">Areas of focus</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li><strong className="text-slate-900">Technical SEO:</strong> crawling, indexation, architecture, and site health.</li>
              <li><strong className="text-slate-900">Local SEO:</strong> useful location signals and Google Business Profile visibility.</li>
              <li><strong className="text-slate-900">Law firm SEO:</strong> clear, trustworthy pages aligned with legal search intent.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">Work with SearchPrex</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Need help finding the technical issues holding your site back?</p>
            <Link href="/free-audit" className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Request a free SEO audit</Link>
          </div>
          <Link href="/about" className="block rounded-2xl border border-slate-200 p-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400">More about SearchPrex</Link>
        </aside>
      </section>
    </main>
  );
}
