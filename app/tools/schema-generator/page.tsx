import type { Metadata } from "next";
import Link from "next/link";
import { getPageSEO } from "@/lib/admin-seo";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { CardGrid, FaqList, FeatureCard, Section, SectionHeading } from "@/components/layout";
import { SITE, organizationRef, websiteRef } from "@/lib/site-schema";
import SchemaGeneratorClient from "./SchemaGeneratorClient";

/**
 * The working generator used to live at `app/tools/schema generator/` — a
 * directory name with a space, which Next served as `/tools/schema%20generator`
 * while this route held an eight-line "Coming soon" placeholder. So the real
 * tool sat on an unlinked, un-sitemapped URL and the advertised one was empty.
 *
 * The implementation now lives here, split into a client component so this file
 * can stay a Server Component and export metadata. Below the tool, the page
 * explains which schema each kind of business needs and Google's current rules
 * (FAQ rich results ended 7 May 2026; review stars are not shown for a business
 * reviewing itself), with a visible FAQ that its FAQPage markup mirrors.
 */
const PAGE_URL = `${SITE}/tools/schema-generator`;
const TITLE = "Free JSON-LD Schema Markup Generator";
const DESCRIPTION =
  "Generate JSON-LD for local businesses, law firms, products, articles, reviews and FAQs, in line with Google's current rules. Free, no signup.";

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/schema-generator", baseMetadata);
}

const WHICH = [
  { title: "Law firms", body: "LegalService (the generator's Law Firm option) with your address, phone, the area you serve and your practice areas, plus a Person for each attorney on their bio page." },
  { title: "Local service businesses", body: "LocalBusiness — or a more specific type such as Plumber or HVACBusiness — with the same name, address and phone as your Google Business Profile, and your opening hours." },
  { title: "Online stores", body: "Product on every product page, with price, currency and availability in the offer. Add a rating only when it comes from genuine reviews shown on the page." },
  { title: "Blogs and guides", body: "Article with the author's name and profile link and the published and updated dates. Google lists these as recommended rather than required." },
];

const RULES = [
  { title: "Markup must match the page", body: "Everything you mark up has to be visible on the page. Marking up content visitors cannot see breaks Google's structured data guidelines." },
  { title: "FAQ rich results have ended", body: "Google stopped showing FAQ rich results on 7 May 2026. FAQPage markup is still valid and harmless, but it no longer adds dropdowns to your listing." },
  { title: "No stars for reviewing yourself", body: "Google does not show review stars for reviews a business publishes about itself. Review markup suits products, books and software reviewed on the page." },
  { title: "Test before and after", body: "Run the page through Google's Rich Results Test, fix every error, and watch the enhancement reports in Search Console after you publish." },
];

const FAQS = [
  {
    q: "What is schema markup?",
    a: "Structured data, usually written as JSON-LD, that tells search engines what a page is about in a fixed vocabulary from schema.org — that this page is a law firm with this address, or a product with this price. Google uses it to understand pages and to decide whether they are eligible for rich results.",
  },
  {
    q: "Which schema should a law firm use?",
    a: "LegalService for the firm, with the name, address, phone, area served and practice areas, and a Person for each attorney on their own page. The generator's Law Firm option produces LegalService, with practice areas as knowsAbout and the city as areaServed.",
  },
  {
    q: "Does schema markup improve rankings?",
    a: "Not directly. Google uses structured data to understand a page and to show rich results such as product prices or review stars where a page is eligible. Accurate markup helps Google read the page correctly; it does not promise a higher position.",
  },
  {
    q: "Do FAQ rich results still work?",
    a: "No. Google stopped showing FAQ rich results in Search on 7 May 2026. FAQPage markup can stay on your pages without harm, but it no longer earns dropdowns in results.",
  },
  {
    q: "How do I add and test the generated code?",
    a: "Paste the JSON-LD into the page's head or body — Google reads it in either — then test the live URL in Google's Rich Results Test and the Schema Markup Validator. After publishing, check Search Console's enhancement reports for errors.",
  },
];

export default function SchemaGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#app`,
        name: "SearchPrex Schema Markup Generator",
        url: PAGE_URL,
        description: DESCRIPTION,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
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
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
          { "@type": "ListItem", position: 3, name: "Schema Markup Generator", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const link = "font-semibold text-[#534AB7] underline underline-offset-2";

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SchemaGeneratorClient />

      <Section>
        <SectionHeading
          eyebrow="Which schema"
          title="Which schema markup does your business need?"
          intro="Start with the one type that describes your business, on the page it belongs to. More markup is not better markup."
        />
        <CardGrid columns={2}>
          {WHICH.map((w) => (
            <FeatureCard key={w.title} title={w.title} body={w.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Google's rules" title="Four rules that decide whether markup helps" />
        <CardGrid columns={2}>
          {RULES.map((r) => (
            <FeatureCard key={r.title} title={r.title} body={r.body} />
          ))}
        </CardGrid>
        <p className="mt-6 text-sm leading-relaxed text-[#5b6472]">
          Structured data is one of 26 checks in the free{" "}
          <Link href="/resources/technical-seo-checklist" className={link}>
            technical SEO checklist
          </Link>
          . For stores, the{" "}
          <Link href="/resources/woocommerce-seo-checklist" className={link}>
            WooCommerce SEO checklist
          </Link>{" "}
          covers Product markup in detail, and our news article on{" "}
          <Link href="/resources/news/video-structured-data-creator-property" className={link}>
            video structured data
          </Link>{" "}
          covers the newest VideoObject properties.
        </p>
      </Section>

      <Section width="reading">
        <SectionHeading eyebrow="FAQ" title="Schema markup questions, answered" />
        <FaqList faqs={FAQS} name="schema-generator-faq" />
      </Section>

      <ArticleLeadMagnet
        variant="bottom"
        source="schema-generator"
        copy={{
          headline: "Not sure your markup is doing anything? Send me your URL.",
          sub: "I'll check your structured data, your pages and the sites outranking you, and send back what to fix first — within 24 hours.",
        }}
      />
    </main>
  );
}
