// lib/autopilot/mso-lock.ts
//
// A cross-instance lock for the MSO batch.
//
// An in-process flag is not enough here. The batch is triggered by an external
// scheduler hitting a serverless endpoint, and Vercel is free to answer two
// calls with two different instances — each with its own module state, each
// seeing `running === false`. Both then start a batch, and because a queue row
// is only flagged 'processing' after it is selected, both can pick the same
// product and publish it twice to a live storefront.
//
// So the lock lives in the database both engines already share. It carries its
// own expiry, because a run that dies mid-batch (the usual way: a function
// hitting its time limit) never gets to release anything, and a lock nobody can
// release would stop the autopilot until someone noticed.

import { db } from '@/lib/db';

const LOCK_KEY = 'mso_searchprex_lock';

/**
 * Takes the lock if it is free or expired. `ttlSeconds` should comfortably
 * exceed the longest batch — the lock expiring under a running batch is the
 * one case that reintroduces the double-publish it exists to prevent.
 */
export async function acquireMsoLock(ttlSeconds = 290): Promise<boolean> {
  const now = new Date().toISOString();
  const expiry = new Date(Date.now() + ttlSeconds * 1000).toISOString();

  //  One statement, so two instances racing here cannot both win: Postgres
  //  serialises the conflicting upserts and the WHERE clause fails for
  //  whichever arrives second.
  const rows = await db.$executeRaw`
    INSERT INTO mso_cloud_config (key, value)
    VALUES (${LOCK_KEY}, ${expiry})
    ON CONFLICT (key) DO UPDATE
       SET value = ${expiry}
     WHERE mso_cloud_config.value < ${now}
  `;

  return rows > 0;
}

export async function releaseMsoLock(): Promise<void> {
  //  Set to a past timestamp rather than deleting the row, so the next
  //  acquire is a plain conflict-update on a row that already exists.
  await db.$executeRaw`
    UPDATE mso_cloud_config
       SET value = ${new Date(0).toISOString()}
     WHERE key = ${LOCK_KEY}
  `;
}

/** Seconds until the current lock expires, or 0 when it is free. */
export async function msoLockHeldFor(): Promise<number> {
  const rows = await db.$queryRaw<Array<{ value: string }>>`
    SELECT value FROM mso_cloud_config WHERE key = ${LOCK_KEY}
  `;
  const expiry = rows?.[0]?.value;
  if (!expiry) return 0;
  return Math.max(0, Math.ceil((new Date(expiry).getTime() - Date.now()) / 1000));
}
