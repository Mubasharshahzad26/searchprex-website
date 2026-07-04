import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

// Lazy init — PrismaClient sirf pehli baar USE hone pe banega, import pe nahe.
// Isliye build-time page data collection kabhi crash nahe karegi.
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient()
    }
    return (globalForPrisma.prisma as any)[prop]
  },
})