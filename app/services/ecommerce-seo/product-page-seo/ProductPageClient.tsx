"use client";

// app/services/ecommerce-seo/product-page-seo/ProductPageClient.tsx
//
// Product page SEO — a spoke of /services/ecommerce-seo, on the ServiceBands
// layout. Copy and FAQ live in ./data.ts.

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import TrustStrap from "@/components/TrustStrap";
import UsTileMap, { type MapClient } from "@/components/UsTileMap";
import { RETAINER_PLANS } from "@/lib/pricing";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  Band,
  BandIntro,
  CheckList,
  CheckPanel,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  PriceCard,
  ProofPanel,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

import { CAPSULES, FAQS, INCLUDED, META, METHOD, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:ecommerce-seo/product-page-seo";
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");
const SMK_CASE = "/case-studies/ecommerce/smk-store";
const MSO_CASE = "/case-studies/ecommerce/michigan-outdoor-sports";

/** Only a store with a published US state is pinned; SMK Store is named below the map. */
const MAP_CLIENTS: MapClient[] = [
  {
    state: "MI",
    name: "Michigan Outdoor Sports",
    place: "Michigan · WooCommerce store",
    result: "Thin brand and product pages rewritten; about 3,000 → 11,549 indexed pages (May–July 2026).",
    href: MSO_CASE,
  },
];

const PROCESS = [
  { when: "Day 1", title: "Free store tear-down", body: "Your store URL in, a written look back within 24 hours: which product pages Google skips, and why." },
  { when: "Weeks 1–2", title: "Catalog map", body: "Products grouped by brand and type, ranked by revenue, with a copy template for each type." },
  { when: "Weekly batches", title: "Rewrite & publish", body: "Unique copy, titles, schema and images shipped batch by batch — never the whole catalog at once." },
  { when: "Every Monday", title: "Measure & report", body: "Indexed pages, impressions, clicks and revenue per batch — what moved, and what gets rewritten next." },
];

const RELATED = [
  { href: "/blog/ecommerce-product-page-seo", title: "Product page SEO at scale", body: "Writing product pages for 10,000+ SKUs without thin or duplicate copy." },
  { href: "/blog/shopify-products-not-showing-on-google", title: "Shopify products not showing on Google", body: "The usual reasons, and how to check each one." },
  { href: "/blog/ecommerce-organic-traffic-drop", title: "Why your store’s organic traffic dropped", body: "What to check first when sales from Google fall." },
  { href: "/resources/woocommerce-seo-checklist", title: "WooCommerce SEO checklist", body: "25 checks in the order the case-study work was done." },
];

export default function ProductPageClient() {
  return (
    <main>
      <ServiceHero
        crumb="Product Page SEO"
        parent={{ label: "Ecommerce SEO", href: "/services/ecommerce-seo" }}
        eyebrow="Product page SEO"
        title={META.h1}
        accent={META.accent}
        subtitle="Thousands of products with the manufacturer’s description, a model number for a title and no structured data — so Google indexes your competitors instead. I rewrite product pages at catalog scale for US Shopify and WooCommerce stores, and measure every batch."
        primary={{ href: "#proof", label: "See store results" }}
        secondary={{ href: "#method", label: "How it scales" }}
        trustPoints={["The founder does the work", "90-day money-back guarantee", "Month to month"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free store tear-down",
              sub: "Send your store URL. I’ll check which product pages Google is skipping and why — and send back what to fix first, within 24 hours.",
            }}
          />
        }
      />

      <ServiceProofStrip
        id="proof"
        title="A 35,000-product store, before and after"
        moreHref={SMK_CASE}
        moreLabel="Read the SMK Store case study"
        shots={[
          {
            src: "/images/proof/smk-revenue-before-v2.png",
            alt: "SMK Store WooCommerce dashboard for April 2026, showing $5,832.02 net sales for the month.",
            width: 1366,
            height: 607,
            figure: "$5,832",
            figureLabel: "Net sales, April 2026",
            caption: "SMK Store — WooCommerce dashboard, before the product page rewrite.",
          },
          {
            src: "/images/proof/smk-revenue-after-v2.png",
            alt: "SMK Store WooCommerce dashboard for June 2026, showing $19,100.71 net sales for the month.",
            width: 863,
            height: 350,
            figure: "$19,100",
            figureLabel: "Net sales, June 2026",
            caption: "Two months later. Total store revenue, alongside indexing and speed fixes.",
          },
        ]}
      />

      <TrustStrap />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why your product pages don’t rank"
          lead="Six checks you can run on your own store in ten minutes. Each one that fails is costing you sales."
        />
        <RuleGrid columns={2}>
          {PROBLEMS.map((p) => (
            <RuleItem
              key={p.title}
              icon={<ShoppingCart className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={p.title}
              body={
                <>
                  <p className="text-[#374151]"><strong>Check:</strong> {p.check}</p>
                  <p className="mt-1">{p.costs}</p>
                </>
              }
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT'S INCLUDED */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="What’s included"
          title="What product page SEO covers"
          lead="Every product page gets a reason for Google to index it and a reason for a shopper to buy from you."
        />
        <RuleGrid>
          {INCLUDED.map((i) => (
            <RuleItem key={i.title} dark title={i.title} body={i.body} />
          ))}
        </RuleGrid>
      </Band>

      {/* METHOD */}
      <Band id="method">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>How it scales</Eyebrow>
            <H2>Thousands of product pages, written one batch at a time</H2>
            <Lead>
              Writing 35,000 descriptions by hand isn’t realistic, and pasting the same template with the name swapped is what got the pages ignored. The work sits between the two: a template per product type, real detail per product, and a measurement after every batch.
            </Lead>
            <Lead>The highest-revenue products go first, so the work pays back before it is finished.</Lead>
            <TextLink href="/services/technical-seo/indexing-recovery">Pages not indexed at all? Start with indexing recovery</TextLink>
          </div>
          <CheckPanel title="What I do" items={METHOD} />
        </div>
      </Band>

      {/* PLATFORMS */}
      <Band muted>
        <BandIntro
          eyebrow="Platforms & niches"
          title="Set up for your kind of store"
          lead="Product pages break differently on Shopify and WooCommerce, and specialist catalogs need specialist copy."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ECOMMERCE_INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              href={`/services/ecommerce-seo/${i.slug}`}
              className="group rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-lg font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{i.h1}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6472]">{i.accent}</p>
              <span className="mt-4 inline-flex text-xs font-bold text-[#534AB7]">See {i.name} SEO →</span>
            </Link>
          ))}
        </div>
      </Band>

      {/* CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Product page work in action</Eyebrow>
            <H2 dark>SMK Store: 35,000+ products, rewritten</H2>
            <Lead dark>
              Thin, near-identical boilerplate descriptions had triggered Google’s duplicate filters and most product pages were barely indexed. Product copy was rewritten brand by brand with unique descriptions, Product schema added, crawl budget and Core Web Vitals fixed, and pages resubmitted in batches.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "Monthly net sales $5,832 (April 2026) → $19,100 (June 2026), WooCommerce dashboard",
                  "Michigan Outdoor Sports: about 3,000 → 11,549 indexed pages, May–July 2026",
                ]}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6">
              <TextLink dark href={SMK_CASE}>SMK Store case study</TextLink>
              <TextLink dark href={MSO_CASE}>Michigan Outdoor Sports case study</TextLink>
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Revenue is total store sales; it moved alongside the indexing and speed fixes, not from copy alone.
            </p>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              stage="Michigan Outdoor Sports · Search Console"
              caption="About 3,000 → 11,549 pages indexed, May–July 2026"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* MAP */}
      <Band>
        <BandIntro
          eyebrow="Where this work has run"
          title="Product pages for US stores"
          lead="Highlighted is where a published store case study is set. SMK Store sells online across the United States, so it has no state to pin. The work is done remotely, for any state."
        />
        <div className="mt-12">
          <UsTileMap clients={MAP_CLIENTS} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to product pages that sell" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free store tear-down" }} />
      </Band>

      {/* WHY SEARCHPREX */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why choose SearchPrex</Eyebrow>
            <H2>Built for catalogs, priced in plain sight</H2>
            <Lead>
              You work with the person who maps your catalog and ships the batches. Priorities are ranked by revenue, and every batch is measured in Google’s own reports.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "Done on a 35,000-product store, not just a 50-product demo",
                  "Every batch measured before the next one ships",
                  "A plain-English report every Monday",
                  "Month to month, no long contract",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {ECOM_PLAN ? (
              <PriceCard
                plan={ECOM_PLAN}
                label="Product pages + ecommerce SEO"
                note="Product page work is part of the ecommerce SEO plan. Where a store lands in the range depends on catalog size, technical scope and content volume."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;Big catalogs fail in the same place: thousands of products with copy Google has already seen elsewhere. I built a content autopilot to rewrite them at scale, and I measure every batch so nothing goes live untested.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="Product page guides" />
        <RuleGrid columns={4}>
          {RELATED.map((r) => (
            <RuleItem key={r.href} dark {...r} />
          ))}
        </RuleGrid>
        <div className="mt-10 text-center">
          <TextLink dark href="/services/ecommerce-seo">See the full ecommerce SEO service</TextLink>
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Product page SEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="product-page-seo-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your store URL. I’ll tell you which product pages Google is ignoring.",
            sub: "Two fields. Which products are indexed, which aren’t and why — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
