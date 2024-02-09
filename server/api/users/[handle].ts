import { prisma } from '~/prisma/client';

export default defineEventHandler(async (event) => {
    const handle = getRouterParam(event, 'handle');

    try {
        return await prisma.user.findFirst({
            where: {
                handle,
            },
            include: {
                moveLists: {
                    include: {
                        character: true,
                        moves: true,
                    },
                },
            },
        });
    } catch (error: any) {
        return error;
    }
});
