import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
    prisma?: PrismaClient;
};

export const prisma: PrismaClient =
    globalForPrisma.prisma || new PrismaClient();

if (import.meta.env.DEV) {
    globalForPrisma.prisma = prisma;
}