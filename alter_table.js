const { Client } = require("pg");
require("dotenv").config({ path: ".env.local" });
const client = new Client({ connectionString: process.env.DATABASE_URL });

async function run() {
  await client.connect();

  const queries = [
    `ALTER TABLE "MarketingBlog" ADD COLUMN IF NOT EXISTS "canonicalUrl" TEXT;`,
    `ALTER TABLE "MarketingBlog" ADD COLUMN IF NOT EXISTS "schemaType" TEXT;`,
    `ALTER TABLE "MarketingBlog" ADD COLUMN IF NOT EXISTS "ogTitle" TEXT;`,
    `ALTER TABLE "MarketingBlog" ADD COLUMN IF NOT EXISTS "ogDescription" TEXT;`,
    `ALTER TABLE "MarketingBlog" ADD COLUMN IF NOT EXISTS "twitterTitle" TEXT;`,
    `ALTER TABLE "MarketingBlog" ADD COLUMN IF NOT EXISTS "twitterDescription" TEXT;`
  ];

  for (const q of queries) {
    try {
      await client.query(q);
      console.log("Executed:", q);
    } catch (e) {
      console.error("Error executing:", q, e.message);
    }
  }

  await client.end();
}

run().catch(console.error);
