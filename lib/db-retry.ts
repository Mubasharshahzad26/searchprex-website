// lib/db-retry.ts

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      const msg = e.message || '';
      const isColdStart =
        e.code === 'P1001' ||
        e.code === 'ECONNREFUSED' ||
        e.code === 'ETIMEDOUT' ||
        e.code === 'ENOTFOUND' ||
        msg.includes("Can't reach database server") ||
        msg.includes('Connection terminated') ||
        msg.includes('Connection refused') ||
        msg.includes('ECONNREFUSED');

      if (isColdStart && i < retries - 1) {
        const wait = 3000 * (i + 1); // 3s, 6s, 9s
        console.log(`[withRetry] Neon cold-start (${e.code || 'unknown'}), waiting ${wait}ms, retry ${i + 1}/${retries}...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw e;
    }
  }
  throw new Error('withRetry: unreachable');
}