import { createError, defineEventHandler, getRouterParam, readBody } from 'h3';
import { prisma } from 'prisma/client';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';
import { isAdmin } from '~/server/utils/permissions';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    const session = await getServerSession(event, authOptions);
    if (!session?.user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

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
        throw createError({
            statusCode: 404,
            statusMessage: 'Move list not found',
        });
    }

    const { characterId, authorId } = moveList;
    if (!characterId) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Character not found',
        });
    }

    if (!authorId) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Author not found',
        });
    }

    if (authorId !== session.user.id && !isAdmin(session.user)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        });
    }

    return prisma.move.create({
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
});
