import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

// Lazy init — PrismaClient sirf pehli baar USE hone pe banega, import pe nahe.
// Prisma 7: driver adapter pattern — PrismaPg adapter DATABASE_URL se connect karta hai.
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      })
      globalForPrisma.prisma = new PrismaClient({ adapter })
    }
    return (globalForPrisma.prisma as any)[prop]
  },
})