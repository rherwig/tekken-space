import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
    prisma?: PrismaClient;
};

/**
 * Returns a new PrismaClient instance, or an existing one if it already exists.
 * This is used to avoid creating multiple instances of PrismaClient during development (hot reloading).
 */
export const prisma: PrismaClient = globalForPrisma.prisma || new PrismaClient();

if (import.meta.env.DEV) {
    globalForPrisma.prisma = prisma;
}
