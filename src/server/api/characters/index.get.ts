import { prisma } from 'prisma/client';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
    return prisma.character.findMany();
});
