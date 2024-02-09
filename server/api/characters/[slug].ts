import { prisma } from '~/prisma/client';

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
