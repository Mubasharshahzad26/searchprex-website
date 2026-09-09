// lib/autopilot/reclaim-stale.ts
//
// A queue row is flipped to 'processing' before the work starts and moved on
// after it finishes. When a run dies in between — a Vercel function hitting
// its 300s ceiling is the usual way — the row stays 'processing' forever and
// the product is never picked up again. There are hundreds of those sitting in
// the MSO queue from runs that were killed mid-batch.
//
// Nothing else reclaims them, so a scheduled run does it before it starts.

import { db } from '@/lib/db';

/**
 * Puts orphaned 'processing' rows back in the queue.
 *
 * A row is left alone if an AutopilotPage for the same URL was created inside
 * `staleAfterMinutes` — that is the signature of a run still working on it, and
 * reclaiming those is how you get two engines publishing the same product.
 */
export async function reclaimStaleProcessing(
  clientId: string,
  staleAfterMinutes = 30
): Promise<number> {
  const reclaimed = await db.$executeRaw`
    UPDATE "IndexingQueue" q
       SET status = 'queued'
     WHERE q."clientId" = ${clientId}
       AND q.status = 'processing'
       AND NOT EXISTS (
         SELECT 1
           FROM "AutopilotPage" p
          WHERE p."pageUrl" = q.url
            AND p."createdAt" > NOW() - (${staleAfterMinutes} * INTERVAL '1 minute')
       )
  `;

  if (reclaimed > 0) {
    console.log(`[autopilot] Reclaimed ${reclaimed} stale 'processing' rows back to the queue.`);
  }

  return reclaimed;
}
