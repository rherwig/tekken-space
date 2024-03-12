import { createError, defineEventHandler, readBody } from 'h3';
import { prisma } from 'prisma/client';
import { createId } from '@paralleldrive/cuid2';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';
import { isAdmin } from '~/server/utils/permissions';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id, name, characterId, authorId: _authorId } = body;

    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name is required',
        });
    }

    if (!characterId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Character Id is required',
        });
    }

    const session = await getServerSession(event, authOptions);
    if (!session?.user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    if (_authorId && _authorId !== session.user.id && !isAdmin(session.user)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        });
    }

    const authorId = _authorId ?? session.user.id;

    const moveList = await prisma.moveList.upsert({
        where: {
            id: id ?? createId(),
        },
        update: {
            name,
            characterId,
        },
        create: {
            name,
            characterId,
            authorId,
        },
    });

    return prisma.moveList.findUnique({
        where: {
            id: moveList.id,
        },
        include: {
            character: true,
            moves: true,
        },
    });
});
