import { defineEventHandler, getRouterParam } from 'h3';
import { prisma } from 'prisma/client';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';
import { assertAdmin, assertAuthenticated, isOwner } from '~/server/utils/permissions';
import { assertDefined, assertFound } from '~/server/utils/validations';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    assertDefined(id, 'id');

    const session = await getServerSession(event, authOptions);

    assertAuthenticated(session?.user);

    const move = await prisma.move.findUnique({
        where: {
            id,
        },
    });

    assertFound(move, 'Move');

    if (!isOwner(session.user, move)) {
        assertAdmin(session.user);
    }

    return prisma.move.delete({
        where: {
            id,
        },
    });
});
