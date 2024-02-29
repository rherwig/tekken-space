import { prisma } from 'prisma/client';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
    try {
        return await prisma.character.findMany();
    } catch (error: any) {
        return error;
    }
});
