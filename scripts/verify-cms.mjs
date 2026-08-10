/**
 * Proves the CMS is wired to the public site: writes a recognisable value into
 * the /about row, and prints the row back. Combined with a page fetch, this
 * shows the DB value reaching the rendered <head>.
 *
 * Restores the original values afterwards when run with `restore`.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const SLUG = "/about";
const PROBE_TITLE = "CMS PROBE TITLE — about";
const PROBE_DESC = "CMS probe description proving the database value reaches the rendered head.";

const mode = process.argv[2];

if (mode === "restore") {
  await db.page.update({
    where: { slug: SLUG },
    data: {
      title: "About SearchPrex — Founder-Led USA SEO Agency | Niche-Focused Strategies",
      metaDescription:
        "Meet Mubashar Shahzad, founder of SearchPrex. 5+ years of senior-led SEO for law firms, ecommerce, and local businesses.",
    },
  });
  console.log("restored /about");
} else {
  const before = await db.page.findUnique({ where: { slug: SLUG } });
  console.log("BEFORE:", { title: before?.title, status: before?.status });
  const after = await db.page.update({
    where: { slug: SLUG },
    data: { title: PROBE_TITLE, metaDescription: PROBE_DESC },
  });
  console.log("AFTER: ", { title: after.title, description: after.metaDescription });
}

await db.$disconnect();
