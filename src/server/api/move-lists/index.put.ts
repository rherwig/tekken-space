import { defineEventHandler, readBody } from 'h3';
import { prisma } from 'prisma/client';
import { createId } from '@paralleldrive/cuid2';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';
import { assertAdmin, assertAuthenticated, isOwner } from '~/server/utils/permissions';
import { assertDefined } from '~/server/utils/validations';

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);

    assertAuthenticated(session?.user);

    const body = await readBody(event);
    const { name, characterId } = body;

    assertDefined(name, 'name');
    assertDefined(characterId, 'characterId');

    if (!isOwner(session.user, body)) {
        assertAdmin(session.user);
    }

    const authorId = body.authorId ?? session.user.id;

    const moveList = await prisma.moveList.upsert({
        where: {
            id: body.id ?? createId(),
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
