/**
 * One-off: converts SEO News spoke bodies from HTML to Markdown and writes the
 * result to scripts/seo-news-content/<slug>.md, which the seed script then
 * reads. See scripts/html-to-markdown.mjs for why.
 *
 * Safety: every conversion is round-tripped back through markdown-it and the
 * visible text is compared against the original. Any article whose text changes
 * is reported and left alone rather than written.
 *
 *   node scripts/convert-news-to-markdown.mjs          # dry run, reports only
 *   node scripts/convert-news-to-markdown.mjs --write  # writes files + DB
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import MarkdownIt from "markdown-it";
import { htmlToMarkdown } from "./html-to-markdown.mjs";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
const md = new MarkdownIt({ html: true, linkify: false, breaks: false, typographer: false });

const WRITE = process.argv.includes("--write");
const OUT_DIR = path.join("scripts", "seo-news-content");

/** Visible text only, whitespace-normalised — what a reader actually sees. */
const visibleText = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

/** Every href in document order — catches a dropped or rewritten link. */
const hrefs = (html) => [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);

async function main() {
  const spokes = await db.marketingBlog.findMany({
    where: { category: { contains: "SEO News", mode: "insensitive" } },
    orderBy: { slug: "asc" },
  });

  if (WRITE) fs.mkdirSync(OUT_DIR, { recursive: true });

  let ok = 0;
  let failed = 0;

  for (const spoke of spokes) {
    const original = spoke.content || "";

    if (!/^\s*</.test(original)) {
      console.log(`  skip     ${spoke.slug} (already Markdown)`);
      continue;
    }

    const markdown = htmlToMarkdown(original);
    const rendered = md.render(markdown);

    const textBefore = visibleText(original);
    const textAfter = visibleText(rendered);
    const linksBefore = hrefs(original);
    const linksAfter = hrefs(rendered);

    const textSame = textBefore === textAfter;
    const linksSame = JSON.stringify(linksBefore) === JSON.stringify(linksAfter);

    if (!textSame || !linksSame) {
      failed++;
      console.log(`  FAIL     ${spoke.slug}`);
      if (!textSame) {
        const i = [...textBefore].findIndex((c, n) => c !== textAfter[n]);
        console.log(`    text diverges at char ${i}`);
        console.log(`    before: ...${textBefore.slice(Math.max(0, i - 60), i + 60)}...`);
        console.log(`    after : ...${textAfter.slice(Math.max(0, i - 60), i + 60)}...`);
      }
      if (!linksSame) {
        const lost = linksBefore.filter((l) => !linksAfter.includes(l));
        const gained = linksAfter.filter((l) => !linksBefore.includes(l));
        if (lost.length) console.log(`    lost links: ${lost.join(", ")}`);
        if (gained.length) console.log(`    new links: ${gained.join(", ")}`);
      }
      continue;
    }

    ok++;
    console.log(
      `  ok       ${spoke.slug}  ${original.length} chars HTML -> ${markdown.length} chars Markdown`
    );

    if (WRITE) {
      fs.writeFileSync(path.join(OUT_DIR, `${spoke.slug}.md`), markdown, "utf8");
      await db.marketingBlog.update({
        where: { slug: spoke.slug },
        data: { content: markdown },
      });
    }
  }

  console.log(`\n${ok} converted cleanly, ${failed} failed.`);
  if (!WRITE) console.log("Dry run — pass --write to apply.");
  await db.$disconnect();
  if (failed) process.exit(1);
}

main().catch(async (err) => {
  console.error(err);
  await db.$disconnect();
  process.exit(1);
});
