import { prisma } from 'prisma/client';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');

    return prisma.character.findFirst({
        where: {
            slug,
        },
    });
});
