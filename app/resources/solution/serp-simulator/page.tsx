import type { Metadata } from "next";
import Link from "next/link";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { Breadcrumb, FaqList, PageHero, Section, SectionHeading, Accent } from "@/components/layout";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import SerpSimulatorClient from "@/app/tools/serp-simulator/SerpSimulatorClient";

const PAGE_URL = `${SITE}/resources/solution/serp-simulator`;
const TITLE = "Free SERP Simulator & Google Snippet Generator";
const DESCRIPTION =
  "Free SERP simulator: preview your title and meta description as Google shows them on desktop and mobile, with pixel-width checks and keyword bolding.";
const LAST_REVIEWED = "2026-11-12";

const link = "underline underline-offset-2 hover:text-neutral-950 font-medium";

const DOCS = {
  titles: "https://developers.google.com/search/docs/appearance/title-link",
  snippets: "https://developers.google.com/search/docs/appearance/snippet",
  faqChange: "https://developers.google.com/search/blog/2023/08/howto-faq-changes",
  faqDoc: "https://developers.google.com/search/docs/appearance/structured-data/faqpage",
  reviews: "https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful",
};

const FAQS = [
  {
    q: "What is a SERP simulator?",
    a: "A SERP simulator shows how a page's title tag, meta description and URL are likely to look in Google's search results before you publish them. This one measures each line in pixels, shows where Google would cut it on desktop and mobile, and bolds your keyword the way Google bolds the words someone searched for.",
  },
  {
    q: "How long can a title tag be in Google?",
    a: "Google has no character limit; it cuts titles by width. On desktop, titles wider than roughly 600 pixels are usually cut with \"...\", which is about 50 to 60 characters depending on the letters. Put the words that matter first so a cut costs you nothing.",
  },
  {
    q: "How long should a meta description be?",
    a: "Google shows about two lines on desktop, which works out to around 990 pixels or roughly 150 to 160 characters. Longer descriptions are cut. Google can also ignore your description and show text from the page when that matches the search better.",
  },
  {
    q: "Why does Google show a different title from mine?",
    a: "Google writes its own title link when it thinks the title tag does not describe the page well: titles that are empty, stuffed with keywords, the same across many pages, or out of date. It may use the page's main heading, other prominent text or links pointing to the page instead.",
  },
  {
    q: "Can I get review stars or FAQ dropdowns in my result?",
    a: "Review stars, only in some cases: they appear for certain page types, such as products, recipes and software, and not for reviews a business publishes about itself. FAQ dropdowns, no: Google stopped showing FAQ rich results in Search on 7 May 2026. FAQPage markup can stay on your pages, but it no longer earns a rich result.",
  },
  {
    q: "Is anything I type stored or sent anywhere?",
    a: "No. The simulator runs entirely in your browser. Nothing you type is sent to SearchPrex or anyone else. The share link puts your title and description in the link itself, so only share it where you are happy for them to be seen.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} | SearchPrex`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function SerpSimulatorSolutionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#app`,
        name: "SearchPrex SERP Simulator",
        url: PAGE_URL,
        description: DESCRIPTION,
        applicationCategory: "SEOApplication",
        operatingSystem: "Any (browser-based)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: organizationRef,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        isPartOf: websiteRef,
        mainEntity: { "@id": `${PAGE_URL}#app` },
        author: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
          { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
          { "@type": "ListItem", position: 4, name: "SERP Simulator", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-24 sm:pt-28">
        <PageHero
          pillText="Free SEO Snippet Tool"
          title={
            <>
              Google SERP simulator &amp; <Accent color="teal">pixel-width preview</Accent>
            </>
          }
          subtitle="See how your title tag and meta description look in Google on desktop and mobile, measured in pixels before you publish."
          date="Updated November 2026 • Real-time Pixel Width Engine"
        />

        <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Solutions", href: "/resources/solution" },
              { label: "SERP Simulator" },
            ]}
          />
        </div>

        <section id="simulator" className="py-8 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SerpSimulatorClient />
          </div>
        </section>

        <Section width="reading">
          <SectionHeading eyebrow="Why pixels" title="Google cuts titles by width, not by characters" />
          <div className="space-y-4 text-base leading-relaxed text-[#374151]">
            <p>
              A character count is only a guess. Letters take different amounts of space: a title full of W and M runs out of
              room far sooner than one full of i and l, so two 55-character titles can end in very different places. That is
              why this simulator measures each line in pixels, in the font Google uses for results, and cuts it at a word
              boundary the way Google does.
            </p>
            <p>
              The limits it uses — about 600 pixels for a desktop title and about 990 pixels for a desktop description — are
              approximations. Google does not publish them and adjusts its layout from time to time. Treat a line that is close
              to the limit as at risk, and keep your most important words at the start.
            </p>
          </div>
        </Section>

        <Section tone="surface" width="reading">
          <SectionHeading eyebrow="What Google actually shows" title="When Google rewrites your title or snippet" />
          <div className="space-y-4 text-base leading-relaxed text-[#374151]">
            <p>
              Your title tag is Google&apos;s main source for the blue link, but not its only one. According to{" "}
              <a href={DOCS.titles} className={link} rel="noopener" target="_blank">
                Google&apos;s documentation on title links
              </a>
              , it can also use the page&apos;s main heading, other prominent text, anchor text and links pointing to the page.
            </p>
            <p>
              Descriptions work the same way. Google&apos;s{" "}
              <a href={DOCS.snippets} className={link} rel="noopener" target="_blank">
                snippet documentation
              </a>{" "}
              says it uses the meta description when that describes the page better than text taken from the page itself.
            </p>
          </div>
        </Section>

        <Section width="reading">
          <SectionHeading eyebrow="FAQ" title="SERP simulator questions, answered" />
          <FaqList faqs={FAQS} name="serp-simulator-solution-faq" />
        </Section>

        <ArticleLeadMagnet
          variant="bottom"
          source="solution:serp-simulator"
          copy={{
            headline: "Snippets fixed, still no clicks? Send me your URL.",
            sub: "I’ll look at what you rank for, what the results above you do better, and what to change first — written by me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
