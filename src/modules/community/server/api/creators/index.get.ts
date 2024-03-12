import { defineEventHandler } from 'h3';
import { prisma } from 'prisma/client';

export default defineEventHandler(async () => {
    return prisma.user.findMany({
        where: {
            id: {
                not: 'tekken',
            },
            handle: {
                not: null,
            },
        },
    });
});
