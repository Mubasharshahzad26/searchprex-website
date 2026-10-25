import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

export type LocalSeoNewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
};

export default function LocalSeoNewsPosts({ posts }: { posts: LocalSeoNewsPost[] }) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="published-local-seo-news" className="mb-10">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Published local search coverage</p>
          <h2 id="published-local-seo-news" className="text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
            Google Business Profile and Map Pack news
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Read the full reports behind these changes, with source notes and practical guidance for local businesses.
          </p>
        </div>
        <Link href="/services/local-seo" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950">
          Explore Local SEO services <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-800/40 hover:shadow-lg">
            <Link href={`/resources/news/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-700" aria-label={`Read: ${post.title}`}>
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-800 shadow-sm">
                Google Business Profile
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                <time dateTime={post.date} className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold leading-snug text-slate-950 sm:text-xl">
                <Link href={`/resources/news/${post.slug}`} className="decoration-emerald-300 underline-offset-4 group-hover:underline focus-visible:underline">{post.title}</Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
              <Link href={`/resources/news/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-950">
                Read the full update <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
        Need help applying these changes to a real business? Our <Link href="/services/local-seo" className="font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4">Local SEO service</Link> covers Business Profile accuracy, reviews, local landing pages and the path from search to a customer call. Use the <Link href="/resources/google-business-profile-checklist" className="font-semibold text-emerald-900 underline decoration-emerald-300 underline-offset-4">free Google Business Profile checklist</Link> to start on your own.
      </p>
    </section>
  );
}
