import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from 'prisma/client';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';
import { assertAdmin, assertAuthenticated, isOwner } from '~/server/utils/permissions';
import { assertDefined, assertFound } from '~/server/utils/validations';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    assertDefined(id, 'id');

    const session = await getServerSession(event, authOptions);
    assertAuthenticated(session.user);

    const body = await readBody(event);

    const moveList = await prisma.moveList.findUnique({
        where: {
            id,
        },
        include: {
            character: true,
            moves: true,
        },
    });

    assertFound(moveList, 'MoveList');

    const { characterId, authorId } = moveList;

    assertFound(characterId, 'Character');
    assertFound(authorId, 'Author');

    if (!isOwner(authorId, session.user)) {
        assertAdmin(session.user);
    }

    return prisma.move.upsert({
        where: {
            id: body.id ?? createId(),
        },
        update: {
            notation: body.notation,
            damage: {
                total: body.damage?.total,
            },
            metadata: {
                difficulty: body.metadata?.difficulty,
            },
        },
        create: {
            authorId,
            characterId,
            movesListId: moveList.id,
            notation: body.notation,
            damage: {
                total: body.damage?.total,
            },
            metadata: {
                difficulty: body.metadata?.difficulty,
            },
        },
    });
});
