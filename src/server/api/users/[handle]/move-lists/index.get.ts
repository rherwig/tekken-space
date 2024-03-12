import { createError, defineEventHandler, getRouterParam } from 'h3';
import { prisma } from 'prisma/client';

import * as moveListsService from '~/server/services/move-lists';

export default defineEventHandler(async (event) => {
    const handle = getRouterParam(event, 'handle');

    const user = await prisma.user.findUnique({
        where: {
            handle,
        },
    });

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User Not Found',
        });
    }

    return moveListsService.getByAuthorId(user.id);
});
