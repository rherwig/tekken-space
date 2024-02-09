import { prisma } from '~/prisma/client';

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
