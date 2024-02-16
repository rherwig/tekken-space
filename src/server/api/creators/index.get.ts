import { defineEventHandler } from 'h3';
import { prisma } from 'prisma/client';

export default defineEventHandler(async () => {
    try {
        return await prisma.user.findMany();
    } catch (error: any) {
        return error;
    }
});
