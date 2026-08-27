const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Neon DB.");

    // Add emailCount (default 0) and lastEmailedAt (nullable DateTime)
    await client.query(`
      ALTER TABLE "AiSdrLead" 
      ADD COLUMN IF NOT EXISTS "emailCount" INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "lastEmailedAt" TIMESTAMP(3);
    `);
    
    // For existing leads that have been emailed, let's set count to 1 and lastEmailedAt to their updated at time
    await client.query(`
      UPDATE "AiSdrLead"
      SET "emailCount" = 1,
          "lastEmailedAt" = "updatedAt"
      WHERE "status" IN ('emailed', 'opened', 'clicked') AND "emailCount" = 0;
    `);

    console.log("Successfully altered AiSdrLead table for Drip Campaigns!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

main();
