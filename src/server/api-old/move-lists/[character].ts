import { prisma } from 'prisma/client';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    const characterId = getRouterParam(event, 'character');

    if (!characterId) {
        return [];
    }

    try {
        return await prisma.moveList.findMany({
            where: {
                characterId,
            },
            include: {
                moves: true,
                character: true,
            },
        });
    } catch (error: any) {
        return error;
    }
});
