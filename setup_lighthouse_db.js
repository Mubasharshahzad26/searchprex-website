const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log("Connected to Neon.");
    await client.query('ALTER TABLE "AiSdrLead" ADD COLUMN "lighthouseScore" INTEGER;');
    console.log("Added lighthouseScore column.");
  } catch (err) {
    if (err.code === '42701') {
      console.log("Column already exists.");
    } else {
      console.error("Error updating schema:", err);
    }
  } finally {
    await client.end();
  }
}

main();
