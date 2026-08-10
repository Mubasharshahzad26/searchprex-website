import { config } from 'dotenv'
config({ path: '.env.local' })
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

/**
 * prisma/schema.prisma declares `datasource db` with a provider but no `url`.
 * In Prisma 7 that is the driver-adapter setup: the connection is supplied at
 * runtime instead of by the schema, and `new PrismaClient()` with no options
 * throws PrismaClientInitializationError ("needs to be constructed with a
 * non-empty, valid PrismaClientOptions"). So the adapter is required, not an
 * optimisation.
 *
 * DATABASE_URL is the pooled Neon endpoint; DATABASE_URL_UNPOOLED is the direct
 * one. Pooled is correct for app queries — the direct URL is for migrations,
 * which the Prisma CLI reads from prisma.config.ts, not from here.
 */
function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    // Fail with the cause rather than letting Prisma report a generic options
    // error three frames deeper. A missing env var is the likeliest reason to
    // land here, and it is not obvious from Prisma's own message.
    throw new Error(
      'DATABASE_URL is not set. Add it to .env.local (Neon pooled connection string).'
    )
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
}

// Lazy Proxy: nothing connects until the first property access, so importing
// this module in a route that never queries costs nothing. The global cache
// keeps `next dev`'s hot reloads from opening a new pool each time.
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createClient()
    }
    return (globalForPrisma.prisma as any)[prop]
  },
})