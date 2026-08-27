// components/AuditWalkthrough.tsx
// "Watch me actually do the work."
//
// Every other proof block on this page is an artefact — a chart, a dashboard,
// a SERP. This one is the method: a recorded walkthrough of a real audit, so a
// prospect can judge the thinking rather than only the outcome. For a
// founder-led agency that is the most differentiating asset available, because
// it is the one thing a competitor cannot copy from a screenshot.
//
// PERFORMANCE: the file is 14 MB, so `preload="none"` is not optional — it
// means the browser fetches nothing until the visitor presses play. A poster
// frame stands in until then, so the section costs one small image on load.

import Link from "next/link";
import { ArrowRight, PlayCircle, ListChecks, FileSearch, Gauge } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_CTA, OFFER_MICROCOPY } from "@/lib/offer";

const covers = [
  {
    icon: FileSearch,
    title: "How the site gets read",
    body: "Crawl and index coverage first — what Google can reach, what it is ignoring, and why.",
  },
  {
    icon: ListChecks,
    title: "How issues get ranked",
    body: "Every finding sorted P1 / P2 / P3 by revenue impact, not by how easy it is to fix.",
  },
  {
    icon: Gauge,
    title: "What the first 90 days look like",
    body: "The roadmap that comes out the other side, in the order I would actually work it.",
  },
];

export default function AuditWalkthrough() {
  return (
    <section
      id="audit-walkthrough"
      className="py-20 sm:py-24"
      style={{ background: color.ink }}
      aria-labelledby="audit-walkthrough-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8b86e0]">
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Watch the actual work
          </p>
          <h2
            id="audit-walkthrough-heading"
            className="text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            See How I Audit a US Website — Full Walkthrough
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            This is a complete audit recording, start to finish. Not a highlight reel and not a
            sales demo — the same review I run before quoting any US law firm, store or local
            business. Judge the method before you judge the numbers.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <figure className="m-0">
            <video
              controls
              preload="none"
              playsInline
              poster="/images/proof/poster-audit-walkthrough.png"
              className={`w-full border border-white/10 ${radius.card}`}
              style={{ background: "#000" }}
            >
              <source src="/video/seo-audit-walkthrough.mp4" type="video/mp4" />
              Your browser does not support embedded video. You can
              <a href="/video/seo-audit-walkthrough.mp4"> open the recording directly</a>.
            </video>
            <figcaption className="mt-3 text-xs leading-relaxed text-white/70">
              Full audit walkthrough · 14 MB · nothing downloads until you press play.
            </figcaption>
          </figure>

          <div>
            <ul className="space-y-6">
              {covers.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="flex gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "rgba(139,134,224,0.16)" }}
                    >
                      <Icon className="h-5 w-5 text-[#8b86e0]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-black text-white">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/85">{c.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm font-semibold text-white/85">
                Want this run on your site?
              </p>
              <Link
                href={OFFER_HREF}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
                style={{ color: color.ink }}
              >
                {OFFER_CTA} <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-xs text-white/70">{OFFER_MICROCOPY}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
