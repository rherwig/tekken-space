import { defineEventHandler, getRouterParam } from 'h3';
import { prisma } from 'prisma/client';

export default defineEventHandler(async (event) => {
    const handle = getRouterParam(event, 'handle');

    try {
        const user = await prisma.user.findUnique({
            where: {
                handle,
            },
        });

        if (!user) {
            return {
                statusCode: 404,
                body: 'User not found',
            };
        }

        return await prisma.moveList.findMany({
            where: {
                authorId: user.id,
            },
            include: {
                character: true,
                moves: true,
            },
        });
    } catch (error: any) {
        return error;
    }
});
