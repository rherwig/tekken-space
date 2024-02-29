import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { prisma } from 'prisma/client';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    try {
        const moveList = await prisma.moveList.findUnique({
            where: {
                id,
            },
            include: {
                character: true,
                moves: true,
            },
        });

        if (!moveList) {
            return {
                status: 404,
                body: 'Move List Not Found',
            };
        }

        const { characterId, authorId } = moveList;
        if (!characterId || !authorId) {
            return {
                status: 400,
                body: 'Character ID and Author ID are required',
            };
        }

        return await prisma.move.create({
            data: {
                authorId,
                characterId,
                movesListId: moveList.id,
                notation: body.notation,
                damage: {
                    base: body.damage?.base,
                },
                metadata: {
                    difficulty: body.metadata?.difficulty,
                },
            },
        });
    } catch (error: any) {
        return error;
    }
});
