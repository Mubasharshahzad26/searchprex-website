// app/guides/ecommerce-indexing-playbook.pdf/route.ts
//
// "The 35,000-Product Indexing Playbook" — the download behind the GuideMagnet
// on the ecommerce pages. Built at build time (force-static) with pdf-lib.
//
// Rules for this document, the same as the site's:
//   - Every figure is one already published on the SMK Store and Michigan
//     Sports & Outdoor case studies, with the period it covers, and each is
//     backed by a screenshot embedded here. Nothing is extrapolated.
//   - The method is what was done on those two stores (STORE_FIXES in
//     app/case-studies/details.ts, MSO_RECOVERY_PHASES in RecoveryStory) plus
//     standard, verifiable Search Console practice. No promised outcomes.
//   - The setback is included. MSO lost ground before it recovered.
// Both clients gave permission for their screenshots to appear in this PDF.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";

export const dynamic = "force-static";

const W = 612;
const HGT = 792;
const M = 54;
const INK = rgb(0.04, 0.06, 0.18);
const BODY = rgb(0.36, 0.39, 0.45);
const PURPLE = rgb(0.33, 0.29, 0.72);
const GREEN = rgb(0.1, 0.49, 0.35);
const LINE = rgb(0.85, 0.87, 0.91);

const REPLACE: Record<string, string> = { "→": "->", "≈": "~", "×": "x", " ": " ", " ": " " };

function clean(font: PDFFont, s: string): string {
  let out = "";
  for (const ch of s) {
    const c = REPLACE[ch] ?? ch;
    try {
      font.widthOfTextAtSize(c, 10);
      out += c;
    } catch {
      // not encodable in WinAnsi
    }
  }
  return out;
}

function wrap(font: PDFFont, text: string, size: number, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ── Content ────────────────────────────────────────────────────────────────

const STEPS: Array<{ title: string; why: string; do: string[] }> = [
  {
    title: "Diagnose it in Search Console first",
    why: "Before changing anything, find out which pages Google is skipping and which templates they come from. Most large catalogues have one or two templates responsible for most of the problem.",
    do: [
      "Open Indexing > Pages. Note the counts for “Discovered – currently not indexed” (found, not yet crawled) and “Crawled – currently not indexed” (crawled, then left out).",
      "Export the example URLs for each and group them by template: product, brand, category, tag, filter or search URLs.",
      "Write down today's indexed-page count. Every later step is measured against it.",
    ],
  },
  {
    title: "Stop the crawl waste",
    why: "Filter, sort, search and cart URLs multiply a catalogue many times over. Google spends its visits on them instead of the products that sell.",
    do: [
      "Keep sort, filter, search and add-to-cart parameters (on WooCommerce: ?orderby=, ?filter_…, ?s=, ?add-to-cart=) out of the crawl with robots.txt rules or by not linking them as crawlable URLs.",
      "Point near-duplicate URLs at the version you want indexed with a canonical tag.",
      "Do not block a page in robots.txt and also expect Google to see its noindex tag — a blocked page cannot be read, so the noindex is never seen.",
    ],
  },
  {
    title: "Make the sitemap tell the truth",
    why: "A sitemap full of redirects, noindexed pages and duplicates teaches Google to trust it less.",
    do: [
      "List only canonical, indexable pages that return 200.",
      "Split it by page type (products, brands, categories, posts) so the Pages report shows which type is failing.",
      "Submit it in Search Console and re-check the submitted-versus-indexed numbers after each batch of fixes.",
    ],
  },
  {
    title: "Rewrite thin and duplicate copy — in batches",
    why: "Manufacturer descriptions are shared by every dealer, and thin brand pages give Google nothing to rank. On both stores, thin and near-duplicate copy was a main reason pages were left out of the index.",
    do: [
      "Start with brand pages: one brand page links to many products, so each rewrite helps a whole group.",
      "Then products that already earn impressions, then the rest. Keep specs from your product data; rewrite the description around what a buyer compares.",
      "Publish in batches and re-measure the Pages report before the next one. On these stores the rewriting was done with SearchPrex's content autopilot (now part of NicheSEO Pro), batch by batch.",
    ],
  },
  {
    title: "Fix speed and structure at the template",
    why: "A slow product template is slow on every product at once, and fixing it once fixes all of them.",
    do: [
      "Run a product, a category and a brand page through PageSpeed Insights on mobile and fix what the template causes: plugin scripts, oversized images, layout shift.",
      "Make each template say clearly what the page is for: product name, key specs, price and availability visible without scrolling.",
    ],
  },
  {
    title: "Link the catalogue on purpose",
    why: "Pages with no internal links pointing at them are the ones Google finds last and indexes least.",
    do: [
      "Link brands to their categories and best products, categories to brands, and products back to both.",
      "Find orphan pages (in the sitemap, linked from nowhere) and give each at least one link from a related page.",
    ],
  },
  {
    title: "One clean set of structured data",
    why: "Two plugins each printing their own Product markup is common, and conflicting markup is worse than none.",
    do: [
      "Output Product, Offer (price, availability) and BreadcrumbList from one source, matching what the page shows.",
      "Check a few pages in Google's Rich Results Test after every theme or plugin change.",
    ],
  },
  {
    title: "Resubmit in batches, and verify",
    why: "Indexing follows crawling. The job is to make the important pages easy to reach, then confirm they actually went in.",
    do: [
      "Use the updated sitemaps and internal links to bring Google back; use URL Inspection's “Request indexing” sparingly, for the most important pages.",
      "Do not rely on the Indexing API for products: Google limits it to job postings and livestream events.",
      "Check the Pages report weekly and keep a dated log. That log is what tells you which fix worked.",
    ],
  },
];

interface Shot {
  file: string;
  caption: string;
}

const SHOTS: Array<{ heading: string; text: string; shots: Shot[] }> = [
  {
    heading: "SMK Store — monthly net sales, April vs June 2026",
    text: "A 35,000-product WooCommerce store. Net sales went from $5,832.02 in April to $19,100.71 in June 2026 (+227%). Top seller: 200 units, then 300. These are total store figures from the store's own dashboard, not split by country.",
    shots: [
      { file: "images/proof/smk-revenue-before-v2.png", caption: "April 2026 · net sales $5,832.02" },
      { file: "images/proof/smk-revenue-after-v2.png", caption: "June 2026 · net sales $19,100.71" },
    ],
  },
  {
    heading: "Michigan Sports & Outdoor — the setback and the recovery",
    text: "This store peaked in March 2026, then lost ground as pages dropped out of the index, to roughly 3,000 indexed pages. Repeating the steps above, batch by batch, brought it to 11,549 indexed pages by 25 July 2026 (3,723 of them newly indexed between 11 and 25 July). In the United States, clicks were 224 from 1 April to 12 June and 322 from 13 June to 29 August 2026, with CTR 3.7% then 5.1%.",
    shots: [
      { file: "images/proof/mso-gsc-indexing-full.png", caption: "Search Console page indexing · ~3,000 -> 11,549 (18 May - 25 Jul 2026)" },
      { file: "images/clicks-comaprsion-after-run-mso-autopilot.PNG", caption: "US performance · 1 Apr - 12 Jun vs 13 Jun - 29 Aug 2026" },
    ],
  },
  {
    heading: "What the recovery did to MSO's store revenue",
    text: "Net sales on the store's WooCommerce dashboard: $0.00 on 20 July 2026, $206.63 on 6 August, and $523.49 month to date on 25 September. Small numbers, honestly reported — the point is the direction once the pages were back in the index.",
    shots: [
      { file: "images/proof/mso-revenue-1-jul20-v2.png", caption: "20 Jul 2026 · $0.00 this month" },
      { file: "images/proof/mso-revenue-2-aug06-v2.png", caption: "6 Aug 2026 · $206.63 this month" },
      { file: "images/proof/mso-revenue-3-sep25-v2.png", caption: "25 Sep 2026 · $523.49 month to date" },
    ],
  },
];

// ── Build ──────────────────────────────────────────────────────────────────

export async function GET() {
  const doc = await PDFDocument.create();
  doc.setTitle("The 35,000-Product Indexing Playbook");
  doc.setAuthor("Mubashar Sharif, SearchPrex");
  doc.setSubject("How two WooCommerce stores got their catalogues back into Google");
  doc.setCreator("searchprex.com");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([W, HGT]);
  let y = HGT - M;
  const newPage = () => {
    page = doc.addPage([W, HGT]);
    y = HGT - M;
  };
  const ensure = (h: number) => {
    if (y - h < M + 30) newPage();
  };
  const text = (s: string, o: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; x?: number; gap?: number } = {}) => {
    const font = o.font ?? regular;
    const size = o.size ?? 10;
    const x = o.x ?? M;
    for (const l of wrap(font, clean(font, s), size, W - M - x)) {
      ensure(size + 4);
      page.drawText(l, { x, y: y - size, size, font, color: o.color ?? INK });
      y -= size + (o.gap ?? 4);
    }
  };
  // maxH keeps every screenshot of an evidence block on the same page as its text.
  const image = async (file: string, caption: string, maxW: number, maxH: number, x = M) => {
    const bytes = await readFile(path.join(process.cwd(), "public", file));
    const img: PDFImage = await doc.embedPng(bytes);
    const scale = Math.min(maxW / img.width, maxH / img.height, 1);
    const w = img.width * scale;
    const h = img.height * scale;
    ensure(h + 26);
    page.drawRectangle({ x: x - 1, y: y - h - 1, width: w + 2, height: h + 2, borderColor: LINE, borderWidth: 1 });
    page.drawImage(img, { x, y: y - h, width: w, height: h });
    y -= h + 6;
    page.drawText(clean(bold, caption), { x, y: y - 8, size: 8, font: bold, color: BODY });
    y -= 20;
  };

  // Cover
  text("SEARCHPREX · FREE GUIDE", { font: bold, size: 9, color: PURPLE });
  y -= 6;
  text("The 35,000-Product Indexing Playbook", { font: bold, size: 26, gap: 6 });
  y -= 2;
  text("How two WooCommerce stores got their catalogues back into Google — the steps in order, with the Search Console and dashboard screenshots.", { size: 12, color: BODY, gap: 5 });
  y -= 14;
  text("What happened on the two stores", { font: bold, size: 12 });
  y -= 2;
  for (const line of [
    "SMK Store: monthly net sales $5,832 -> $19,100, April to June 2026 (+227%).",
    "Michigan Sports & Outdoor: ~3,000 -> 11,549 indexed pages, 18 May to 25 July 2026, after a de-indexing setback.",
    "Every figure is on a screenshot at the back of this guide, with its date.",
  ]) {
    text(`•  ${line}`, { size: 10, color: BODY, x: M + 6 });
  }
  y -= 12;
  text("Who this is for", { font: bold, size: 12 });
  text("Store owners and SEOs with thousands of products where Search Console shows large numbers of pages “Discovered” or “Crawled – currently not indexed”. Shopify stores face the same problems; where the steps say WooCommerce, the fix is made in the theme and apps instead.", { size: 10, color: BODY, gap: 5 });
  y -= 12;
  text("What it is not", { font: bold, size: 12 });
  text("A promise. These are two stores' results, reported with their periods; yours depend on your catalogue, your competition and how deep the problems go.", { size: 10, color: BODY, gap: 5 });
  y -= 16;
  text("— Mubashar Sharif, founder, SearchPrex", { font: bold, size: 10, color: INK });

  // Steps
  newPage();
  text("THE STEPS, IN ORDER", { font: bold, size: 9, color: PURPLE });
  y -= 4;
  STEPS.forEach((s, i) => {
    ensure(70);
    y -= 6;
    text(`${i + 1}. ${s.title}`, { font: bold, size: 14, gap: 5 });
    text(s.why, { size: 10, color: BODY, gap: 4 });
    y -= 2;
    for (const d of s.do) text(`•  ${d}`, { size: 10, x: M + 8, gap: 4 });
    y -= 8;
  });

  // Evidence
  for (const block of SHOTS) {
    newPage();
    text("THE EVIDENCE", { font: bold, size: 9, color: GREEN });
    y -= 2;
    text(block.heading, { font: bold, size: 15, gap: 5 });
    text(block.text, { size: 10, color: BODY, gap: 5 });
    y -= 10;
    const maxH = block.shots.length > 2 ? 140 : 245;
    for (const s of block.shots) await image(s.file, s.caption, W - M * 2, maxH);
  }

  // Close
  ensure(90);
  y -= 6;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.5, color: LINE });
  y -= 16;
  text("Want these steps run on your store?", { font: bold, size: 13 });
  text("Send your store to searchprex.com/free-audit. I will check indexing, product copy and speed against the stores above you, and send back what to fix first — free, within 24 hours. — Mubashar Sharif", { size: 10, color: BODY, gap: 5 });

  const pages = doc.getPages();
  pages.forEach((pg, i) => {
    pg.drawText("searchprex.com · The 35,000-Product Indexing Playbook", { x: M, y: 30, size: 8, font: regular, color: BODY });
    const label = `${i + 1} / ${pages.length}`;
    pg.drawText(label, { x: W - M - regular.widthOfTextAtSize(label, 8), y: 30, size: 8, font: regular, color: BODY });
  });

  const bytes = await doc.save();
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="ecommerce-indexing-playbook.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
