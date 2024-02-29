import { prisma } from 'prisma/client';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');

    try {
        return await prisma.character.findFirst({
            where: {
                slug,
            },
        });
    } catch (error: any) {
        return error;
    }
});
